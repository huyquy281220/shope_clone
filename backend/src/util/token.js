const jwt = require("jsonwebtoken");

module.exports = {
    //access token
    accessToken: (user) => {
        const accToken = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.SECRET_KEY, {
            expiresIn: "12h",
        });
        return accToken;
    },
    //refresh token
    refreshToken: (user) => {
        const rfToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.REFRESH_KEY,
            { expiresIn: "365d" }
        );
        return rfToken;
    },
};
