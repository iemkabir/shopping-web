const router = require("express").Router();
const authUser = require("./authUser");

router.post("/logout", authUser, async (req, res)=>{
    if(req.user){
        
    }
})