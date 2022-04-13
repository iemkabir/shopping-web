require("dotenv").config();
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Users = require("../models/userData");

function authUser(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token2 = authHeader.split(" ");
  const token = token2[1];
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded;
     if(req.user){
      next();
     }
    }catch(err){
      console.log(err, "error at auth");
      res.status(401).send("Invalid user",err);
    }
}

module.exports = authUser;