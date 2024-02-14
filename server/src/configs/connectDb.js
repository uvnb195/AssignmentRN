
require('dotenv').config()
const mongoose = require('mongoose')

const dbUri = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@assignmentrn.m8czqdv.mongodb.net/?retryWrites=true&w=majority`

const ConnectDb = async () => {
    try {
        const connection = await mongoose.connect(dbUri);
        console.log(connection.connection.host);
    } catch (e) {
        console.log(e);
    }
}

module.exports = ConnectDb;