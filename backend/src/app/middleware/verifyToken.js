const jwt = require("jsonwebtoken");

const middlewareVerify = {
    verifyToken: (req, res, next) => {
        const authHeader = req.headers.token;
        if (authHeader) {
            const token = authHeader.split(" ")[1];

            jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
                if (err) {
                    res.status(403).json("token not valid");
                }
                req.user = user;
                next();
            });
        } else {
            res.status(401).json("you're not authenticated");
        }
    },
    verifyAdmin: (req, res, next) => {
        middlewareVerify.verifyToken(req, res, () => {
            if (req.user.isAdmin) {
                next();
            } else {
                res.status(403).json("not allowed");
            }
        });
    },
};

module.exports = middlewareVerify;
