const jwt = require("jsonwebtoken");
require('dotenv').config()

function auth (req, res, next) {
    const authToken = req.headers['authorization']

    if (authToken != undefined) {
        const bearer = authToken.split(" ");
        const token = bearer[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
            if (err) {
                res.statusCode = 401;
                res.json({status: false, msg: "Token invalido"})
            } else {
                next()
            }
        })
    } else {
        res.statusCode = 401;
        res.json({status: false, msg: "Token invalido"})
    }
}

module.exports = auth;