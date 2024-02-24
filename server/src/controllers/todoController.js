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

module.exports = {
    addTodo,
    getTodos
}