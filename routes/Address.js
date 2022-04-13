const router = require("express").Router();
const authUser = require("./authUser");
const Users = require("../models/userData");
const { findOneAndUpdate } = require("../models/userData");

router.post("/Address", authUser, async (req, res) => {
    try{
        if(!req.body){
            return res.send("Details are required");
        }

        console.log(req.user)

    const user = await Users.findOneAndUpdate({email : req.user[0].email}, {$push: {BillingAddres : req.body}}, {new: true, password: 0})

    console.log(user.BillingAddres, "hello")
    res.json({"user": user.BillingAddres});
    }
    catch(err){
        console.log(err)
        res.send(err);
    }
})

module.exports = router;