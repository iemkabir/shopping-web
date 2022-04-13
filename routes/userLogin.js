require("dotenv").config();
const router = require("express").Router();
const bCrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../models/userData");

router.post("/login", async (req, res) => {
    try{
        const user = await Users.find({email:req.body.email});
        console.log(user)
        const match = await bCrypt.compare(req.body.password, user[0].password);
        if(match){
            const token = jwt.sign(JSON.stringify(user), process.env.SECRET_KEY);
            console.log(user)
            res.status(200).json({"token": token, "user": user[0].BillingAddres});   
        }
    }catch(err){
        console.log(err, "hello");
        res.status(401).json(err);
    }
});

module.exports = router;