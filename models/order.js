const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ordersSchema = new Schema({
    email: {type:String, required:true},
    ProductName:{type: String, required: true},
    Description:{type: String, required: true},
    price:{type: String, required: true},
    Quantity : {type: Number}
})


const Order = mongoose.model("Order", ordersSchema);

module.exports = Order;