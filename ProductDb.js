require('dotenv').config();
const product = require('./models/product');
const connectDB = require('./src/db/connection');
const productjson = require('./products.json');

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URL);
        // await product.deleteMany();
        await product.create(productjson);
        console.log("sucess");
    } catch (error) {
        console.log(error)
    }
}
start();