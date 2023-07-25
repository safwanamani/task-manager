const JWT = require('jsonwebtoken')
const config = require("../../config.json")
const accessTokenSecret = config.JWT_TOKEN_SECRET
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        JWT.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.status(401).json({
                    status: false,
                    message: "Invalid token."
                })
            }
            req.user = user
            next();
        })
    } else {
        return res.status(401).json({
            status: false,
            message: "Invalid token"
        })
    }
}

module.exports = authenticateJWT