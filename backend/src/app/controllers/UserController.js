const User = require("../models/User");
const RefreshToken = require("../models/RefreshToken");
const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");
const { accessToken, refreshToken } = require("../../util/token");
const ObjectId = require("mongodb").ObjectID;

class UserController {
    //[POST] user/validate-email
    async validateEmail(req, res, next) {
        try {
            const requestEmail = req.body.email;
            const checkEmail = await User.findOne({ email: requestEmail });
            return res.status(409).json(checkEmail.email ? checkEmail.email : null);
        } catch (err) {
            return res.status(200).json("successfully");
        }
    }

    // [POST] user/register
    async register(req, res) {
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJs.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
        });
        try {
            const newUser = await user.save();
            res.status(201).json(newUser);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    // [POST] /user/login
    async login(req, res, next) {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) return res.status(404).json("wrong email");

            const bytes = CryptoJs.AES.decrypt(user.password, process.env.SECRET_KEY);
            const originalPassword = bytes.toString(CryptoJs.enc.Utf8);

            if (originalPassword !== req.body.password) {
                return res.status(401).json("wrong password");
            }

            const accessTokenAuth = accessToken(user);
            const refreshTokenAuth = refreshToken(user);
            const a = new RefreshToken({
                token: refreshTokenAuth,
                user: user,
            });
            await a.save();

            res.cookie("refreshToken", refreshTokenAuth, {
                httpOnly: true,
                secure: false,
                sameSite: "strict",
                maxAge: 86400 * 365 * 1000,
            });

            const { password, ...info } = user._doc;

            res.status(200).json({ ...info, accessTokenAuth });
        } catch (err) {
            res.status(500).json("error" + err);
        }
    }

    // [POST] /user/logout
    async logout(req, res, next) {
        const userId = req.body._id;
        RefreshToken.deleteOne({ user: ObjectId(userId) })
            .then(() => {
                res.clearCookie("refreshToken");
                res.status(200).json("Logged out");
            })
            .catch((err) => res.json(err));
    }

    //[PUT] /user/update/:id
    update(req, res, next) {
        User.updateOne({ _id: req.params.id }, req.body)
            .then(res.status(200).json("update successfully"))
            .catch((err) => console.log(err));
    }

    //[POST] /refresh
    async requestRefreshToken(req, res, next) {
        try {
            const OldRefreshToken = req.cookies.refreshToken;
            if (!OldRefreshToken) return res.status(401).json("you're not authenticated");

            jwt.verify(OldRefreshToken, process.env.REFRESH_KEY, (err, user) => {
                if (err) {
                    console.log(err);
                }
                const newAccessToken = accessToken(user);
                const newRefreshToken = refreshToken(user);
                const storeRefreshTokenInDb = res.cookie("refreshToken", newRefreshToken, {
                    httpOnly: true,
                    secure: false,
                    sameSite: "strict",
                });

                RefreshToken.updateOne({ user: ObjectId(user.id) }, { token: newRefreshToken });

                res.status(200).json({ accessTokenAuth: newAccessToken });
            });
        } catch (err) {
            res.status(500).json("error" + err);
        }
    }
}

module.exports = new UserController();
