const UserModel = require("../model/User")

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body.data
        const newUser = await UserModel.create({
            name: name,
            email: email,
            password: password
        })
        res.status(201).json({ message: "User created successfully", user: newUser })
    } catch (error) {
        res.status(500).json({ message: "Failed to create new user", error: error.message })
    }
}

const getUserByEmail = async (req, res) => {
    try {
        const { email } = req.query;
        if (!email) return res.status(400).json({ message: 'Email is required' })
        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        } else {
            return res.status(200).json({ email: "User found." })
        }
    } catch (e) {
        console.log('Error getting user by email', e);
        return (res.status(500).json({ message: "Server error" }))

    }
}

module.exports = {
    register,
    getUserByEmail
}