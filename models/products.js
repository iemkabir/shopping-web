const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    ProductName: String,
    Category: String,
    Price: Number,
    image: String,
    Description: String
});

const Products = mongoose.model("Products", productSchema);

module.exports = Products;