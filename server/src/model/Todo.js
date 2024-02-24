const { default: mongoose } = require("mongoose");


const TodoScheme = new mongoose.Schema({
    difficult: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    desc: String,
    isDone: {
        type: Boolean,
        default: false
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
})

const TodoModel = mongoose.model("Todo", TodoScheme);

module.exports = TodoModel;
