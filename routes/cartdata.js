const router = require("express").Router();
const authUser = require("./authUser");
const cart = require("../models/cart");

router.get("/cart", authUser, async (req, res)=>{
    try {
        const email = req.user[0].email;
        if(email){
            const data = await cart.find({email: email},{email: 0});
            console.log(data);
            res.json({"data": data});
        }
    }
    catch(err) {
        console.log("Cart Error:", err)
    }
});

module.exports = router;