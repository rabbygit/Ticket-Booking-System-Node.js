const Admin = require("../../../models/Admin")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const register = async (req, res, next) => {
    try {
        let email = req.body.email
        let phone = req.body.phoneNumber

        let existAdmin = await Admin.findOne({ $or: [{ email: email }, { phoneNumber: phone }] })

        if (existAdmin) {
            res.status(200).json({
                message: "exist"
            })
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    res.json({
                        error: err
                    })
                }

                const newAdmin = new Admin({
                    name: req.body.name,
                    email: email,
                    phoneNumber: phone,
                    password: hash,
                    role: req.body.role
                })

                let admin = newAdmin.save()
                if (admin) {
                    res.status(201).json({
                        message: true
                    })
                }
            })
        }
    } catch (error) {
        next(error)
    }
}


// Login
const login = async (req, res, next) => {
    const email = req.body.email
    const password = req.body.password

    try {
        let message
        let admin = await Admin.findOne({ email: email })
        if (admin) {
            const result = await bcrypt.compare(password, admin.password)

            if (result) {
                const token = jwt.sign({ id: admin._id, email: admin.email, role: admin.role }, 'SECRET', { expiresIn: '1d' })
                const updateToken = await Admin.findByIdAndUpdate({ _id: admin._id }, { $set: { 'access_token': token } })
                if (updateToken) {
                    res.status(200).json({
                        message: true,
                        token
                    })
                } else {
                    res.status(204).json({
                        message: false
                    })
                }
            } else {
                res.status(204).json({
                    message: false
                })
            }

        } else {
            res.status(204).json({
                message: false
            })
        }
    } catch (error) {
        next(error)
    }
}


// Logout
const logout = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, 'SECRET')

        let admin = await Admin.findOne({ $and: [{ _id: decode.id }, { email: decode.email }, { role: decode.role }] })
        if (admin) {
            const updateToken = await Admin.findByIdAndUpdate({ _id: decode.id }, { $set: { 'access_token': null } })
            if (updateToken) {
                res.status(200).json({
                    message: true
                })
            }
        }

    } catch (error) {
        next(error)
    }
}


module.exports = {
    register,
    login,
    logout
}