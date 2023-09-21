const jwt = require('jsonwebtoken');
const Owner = require("../models/Owner")
const User = require("../models/User")

require('dotenv').config()

exports.login = async (req, res) => {
    try {
        const { email, name, avatar, role } = req.body
        let isNew = false
        if (role === "USER") {
            const owner = await Owner.findOne({ email: email })
            if (owner) { res.status(401).json({ success: false, message: "This email is a owner" }) }
            else {
                const user = await User.findOne({ email: email })
                if (!user) {
                    const newUser = new User({
                        email: email,
                        name: name,
                        avatar: avatar,
                        createdAt: Date.now(),
                        updatedAt: Date.now()
                    })
                    await newUser.save()
                    isNew = true
                }

                const token = jwt.sign(
                    {
                        email,
                        name,
                        avatar,
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '1h' }
                );


                res.send({
                    success: true, data: {
                        token: token,
                        isNew: isNew
                    }
                })
            }


        } else if (role === "OWNER") {
            const user = await User.findOne({ email: email })
            if (user) { res.status(401).json({ success: false, message: "This  email is a user" }) }
            else {
                const owner = await Owner.findOne({ email: email })
                if (!owner) {
                    const newOwner = new Owner({
                        email: email,
                        name: name,
                        avatar: avatar,
                        createdAt: Date.now(),
                        updatedAt: Date.now()
                    })
                    await newOwner.save()
                    isNew = true
                }


                const token = jwt.sign(
                    {
                        email,
                        name,
                        avatar,
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '1h' }

                );


                res.send({
                    success: true, data: {
                        token: token,
                        isNew: isNew
                    }
                })
            }

        } else {
            res.status(402).json({ success: false, message: "Invalid role" })
        }
    } catch (error) {
        res.status(402).json({ success: false, message: error.message })
    }
}