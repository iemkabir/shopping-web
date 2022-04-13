const router = require("express").Router();
const authUser = require("./authUser");
const Cart = require("../models/cart"); 

router.delete("/deleteItem", authUser, async (req,res)=>{
    try{
        if(req.user){
        const cartData = await Cart.findOneAndDelete({_id: req.body._id});
      res.status(200).send("data deleted"); 
        } 
    }catch(error){
        console.log(error, "hello");
        res.status(204).json("hello guys");
    }
})

module.exports = router;