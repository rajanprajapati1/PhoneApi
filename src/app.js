const express = require('express');
require('dotenv').config();
const app = express();
const Port = process.env.PORT || 4000;
const products_routes = require('../Routes/products');
const connectDb = require('./db/connection')

app.get("/", (req, res) => {
    res.status(201).send("hello express");
})

app.use("/api/products", products_routes)

const start = async () => {
    try {
        await connectDb(process.env.MONGODB_URL);
        app.listen(Port, () => {
            console.log(`Running on Port No ${Port}`)
        })
    } catch (error) {
        console.log(error)
    }
}
start();