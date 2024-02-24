const express = require('express')
const cors = require('cors')

const app = express()

const connectDb = require('./src/configs/connectDb');
const { register, getUserByEmail, signIn, handleCheckpoint } = require('./src/controllers/authController');
const { addToDb, getGroceryIndex, addItem, getGroceryItem, getProducts, findStorage, addFavorites, removeFavourite } = require('./src/controllers/productController');
const { addTodo, getTodos, deleteTodo, updateTodo } = require('./src/controllers/todoController');
// const UserModel = require('./src/model/User');
connectDb();

const PORT = '3070'

app.use(express.json())
app.use(cors())

app.get('/home', (_req, res) => {
    res.send('<h1>Đào Hữu Quân</h1>')

})

app.post('/register', register)

// get user by email
app.get('/user', getUserByEmail)
app.get('/addData', addToDb)
app.get('/index', getGroceryIndex)
app.get('/add', addItem)
app.get('/item', getGroceryItem)
app.post('/signIn', signIn)
app.post('/checkpoint', handleCheckpoint)
app.post('/products', getProducts)
app.get('/storage', findStorage)
app.post('/favourites', addFavorites)
app.post('/favourites/remove', removeFavourite)

app.get('/todo', getTodos)
app.put('/todo/add', addTodo)
app.post('/todo/delete', deleteTodo)
app.post('/todo/item', updateTodo)


app.listen(PORT, (error) => {
    if (error) {
        console.log('>>> Error: ', error);
        return
    }

    console.log(`Server starting at http://localhost:${PORT}`);

})