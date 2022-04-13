const router = require("express").Router();
const authUser = require("./authUser");
const Cart = require("../models/cart");

router.post("/additem", authUser, async (req, res)=>{
    console.log(req.user)
        try{
            if(req.user){
                const carts = new Cart({
                    email: req.user[0].email,
                    image: req.body.image,
                    ProductName: req.body.ProductName,
                    Description: req.body.Description,
                    price: req.body.price
                });
                 await carts.save();
                 res.json({"Data":"item saved"});
            }else{
                res.json({"error": "user Not valid"});
            }
            
        }catch(error){
            console.log(error, "hello");
            res.json("hello guys");
        }
})

module.exports = router;