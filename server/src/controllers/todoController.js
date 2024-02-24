const TodoModel = require("../model/Todo")

const addTodo = async (req, res) => {
    try {
        console.log("req body:", req.body);
        const data = req.body.data
        await TodoModel.create({ ...data, createAt: Date.now() })
        return res.send({ status: 201, data: data })
    } catch (err) {
        return res.send({ status: 400 })
    }
}

const getTodos = async (_req, res) => {
    try {
        const data = await TodoModel.find();
        return res.send({ status: 200, data: data })
    } catch (err) {
        return res.send({ status: 404, message: "Error get todos" })
    }
}

const deleteTodo = async (req, res) => {
    try {
        const { id } = req.query

        await TodoModel.findByIdAndDelete(id)
        return res.send({ status: 201 })
    } catch (err) {
        return res.send({ status: 404 })
    }
}

const updateTodo = async (req, res) => {
    try {
        console.log("Req:", req.body.data);

        const { difficult, title, desc, isDone, createAt, _id } = req.body.data
        console.log("Title:", title);
        console.log("ID:", _id);

        const setNew = await TodoModel.findByIdAndUpdate(_id, { difficult: difficult, title: title, desc: desc, isDone: isDone, createAt: createAt })
        console.log("New item:", setNew);

        return res.send({ status: 201 })

    } catch (err) {
        return res.send({ status: 404 })
    }
}

module.exports = {
    addTodo,
    getTodos,
    deleteTodo,
    updateTodo,
}