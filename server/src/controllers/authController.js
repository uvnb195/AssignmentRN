const UserModel = require("../model/User")
const bcrypt = require('bcrypt')

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body.data
        let hashPassword
        await bcrypt.hash(password, 10)
            .then(result => {
                hashPassword = result
            })
            .catch(err => {
                console.log('>>>Error hashing password ', err);
                res.status(501).json({ message: "Failed to create new user", error: err })
            })

        const newUser = await UserModel.create({
            name: name,
            email: email,
            password: hashPassword
        })
        res.status(201).json({ message: "User created successfully", user: newUser })
    } catch (error) {
        res.status(500).json({ message: "Failed to create new user", error: error.message })
    }
}

const findUserByEmail = async (req, res) => {
    try {
        const { email, password } = req.query;
        if (!email) return res.status(400).json({ message: 'Email is required' })
        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        } else if (password) {
            const match = await bcrypt.compare(password, user.password);

            console.log("Password status:", match);
            if (match) {
                return res.status(200).json({ message: "Password match", user: user })
            } else {
                return res.status(400).json({ message: "Password does not match" })
            }

        }
        else return res.status(200).json({ message: "User found.", user: user })
    } catch (e) {
        console.log('Error getting user by email', e);
        return (res.status(500).json({ message: "Server error" }))
    }
}

module.exports = {
    register,
    getUserByEmail: findUserByEmail
}