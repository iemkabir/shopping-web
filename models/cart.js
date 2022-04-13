const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartsSchema = Schema({
    email: {type:String, required:true},
    image:{type: String, required: true},
    ProductName:{type: String, required: true},
    Description:{type: String, required: true},
    price:{type: String, required: true}
})


const Cart = mongoose.model("Cart", cartsSchema);

module.exports = Cart;