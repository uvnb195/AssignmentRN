const express = require('express')

const app = express()

const connectDb = require('./src/configs/connectDb');
const { register, getUserByEmail } = require('./src/controllers/authController');
// const UserModel = require('./src/model/User');
connectDb();

const PORT = '3070'

app.get('/home', (_req, res) => {
    res.send('<h1>Đào Hữu Quân</h1>')

})

app.use(express.json())

app.post('/register', register)

// get user by email
app.get('/user', getUserByEmail)

app.listen(PORT, (error) => {
    if (error) {
        console.log('>>> Error: ', error);
        return
    }

    console.log(`Server starting at http://localhost:${PORT}`);

})