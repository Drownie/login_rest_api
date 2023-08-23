const jwt = require("jsonwebtoken");

const verify_token = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).json({success: false, data: {}, message: "A token is required"});
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
    } catch(err) {
        return res.status(401).status({success: false, data: {}, message: "Invalid Token"});
    }
    return next();
}

module.exports = verify_token;