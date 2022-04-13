const router = require("express").Router();
const fs = require('fs');
const path = require('path');
const data = require("../data1.json");
let rawdata;
fs.readFile('./data1.json',"utf8", function(err, data){
    if(err){
        console.log(err);
    }else if(data){
        rawdata = data;
    }
});

router.get("/", async (req, res)=>{
    try{
        if(req){
           return res.send(JSON.parse(rawdata));
        }
        res.send("working")
    }
    catch(err){
        console.log(err)
        res.json(err)
    }
})

module.exports = router;