const mongoose = require('mongoose');

const connectDB = (uri) => {
    console.log("connect to mongoDb ")
    return mongoose.connect(uri);
}

module.exports = connectDB;


