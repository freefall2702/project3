const jwt = require('jsonwebtoken');

require('dotenv').config()

const verifyToken = (req, res, next) => {
    // const header = req.header('Authorization')
    // // Authorization: Bearer token

    // const token = header && header.split(' ')[1]

    // if (!token) {
    //     res.status(401).send({ success: false, message: 'Token is required' })
    // } else {
    //     try {
    //         const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    //         console.log(JSON.stringify(decoded))
    //         req.user = decoded.userId
            next()
    //     } catch (error) {
    //         console.log(error)
    //         res.status(403).json({ success: false, message: "Invalid token" })
    //     }
    // }
}

module.exports = verifyToken