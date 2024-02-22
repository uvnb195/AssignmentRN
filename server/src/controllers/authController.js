const UserModel = require("../model/User")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const env = require('dotenv').config()

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
        if (newUser) {

            res.status(201).json({ message: "User created successfully", user: newUser })
        } else {
            res.status(500).json({ message: "Failed to create new user" })
        }
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

const signIn = async (req, res) => {

    try {
        const { email, password, rememberLogin } = req.body.data
        const check = await UserModel.findOne({ email: email })
        if (check && password) {
            const result = await bcrypt.compare(password, check.password)
            console.log("Result check: ", result);
            if (result && rememberLogin) {
                const token = jwt.sign({ id: check.id }, process.env.SECRET_JWT_KEY, { expiresIn: '1d' })
                res.status(201).json({ message: "Create token successfully", token: token })
            } else {
                res.status(400).json({ message: "Error create token" })
            }
        }

    } catch (err) {
        console.log(">>>Error sign in: ", err);
        return err.response

    }

}

const checkpoint = async (token) => {
    try {
        const check = jwt.verify(token, process.env.SECRET_JWT_KEY)
        return check
    } catch (err) {
        return false
    }
}

const handleCheckpoint = async (req, res) => {
    try {
        const token = req.body.data
        const check = await checkpoint(token)
        if (!check || check == false)
            res.status(404).json({ message: "Token error" })
        console.log("Valid token");

        res.status(200).json({ message: "valid token" })
    } catch (err) {
        console.log(err.message);
        res.status(400).json({ message: "Token out dated/ error" })
        return err.response
    }
}

module.exports = {
    register,
    getUserByEmail: findUserByEmail,
    signIn,
    handleCheckpoint,
    checkpoint
}