const { default: mongoose, Schema } = require("mongoose");

const favoriteSchema = new mongoose.Schema({
    itemId: {
        type: Schema.Types.ObjectId,
        ref: "GroceryItem"
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
})

const storageSchema = new mongoose.Schema({
    uid: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    favourites: {
        type: [favoriteSchema]
    }
})

const StorageModel = mongoose.model("Storage", storageSchema)

module.exports = StorageModel