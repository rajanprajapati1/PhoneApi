const product = require('../models/product');

const getAllProducts = async (req, res) => {
    const { company, name, price, featured, sort, select } = req.query;
    const queryObject = {};
    if (company) {
        queryObject.company = company;
    }
    if (price) {
        queryObject.price = price;
    }
    if (featured) {
        queryObject.featured = featured;
    }
    if (name) {
        queryObject.name = { $regex: name, $options: "i" };
    }

    let apidata = product.find(queryObject);
    if (sort) {
        let sortdata = sort.split(",",).join(" ");
        apidata = apidata.sort(sortdata);
    }
    if (select) {
        let selectdata = select.split(",",).join(" ");
        apidata = apidata.select(selectdata);
    }

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 3;
    let skip = (page - 1) * limit;

    apidata = apidata.skip(skip).limit(limit);

    console.log(queryObject)
    const mydata = await apidata;
    res.status(202).json({ mydata, TotalPage: mydata.length });
}

const getAllProductsTesting = async (req, res) => {
    const mydata = await product.find(req.query).select("name company");
    res.status(202).json({ mydata })
}

module.exports = { getAllProducts, getAllProductsTesting };