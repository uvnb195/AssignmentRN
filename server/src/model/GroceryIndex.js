const { default: mongoose } = require("mongoose");

const GroceryIndex = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    createAt: {
        type: Date,
        require: true
    }
})

const GroceryIndexModel = mongoose.model("GroceryIndex", GroceryIndex);

module.exports = GroceryIndexModel;