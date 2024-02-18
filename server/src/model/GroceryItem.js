const { default: mongoose, Schema } = require("mongoose");

const GroceryItem = new mongoose.Schema({
    index: {
        type: Schema.Types.ObjectId,
        ref: 'GroceryIndex',
        require: true
    },
    name: {
        type: String,
        require: true
    },
    desc: String,
    quantity: {
        type: Number,
        require: true
    },
    price: {
        type: Number,
        require: true,
    },
    createAt: {
        type: Date,
        require: true
    },
    updateAt: {
        type: Date,
        require: true
    },
})

const GroceryItemModel = mongoose.model("GroceryItem", GroceryItem);

module.exports = GroceryItemModel;