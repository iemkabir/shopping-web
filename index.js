
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const data = require("./data1.json");
cors = require('cors')


const port = process.env.PORT || 4000;

app.use("/public", express.static("./public/"));
//app.set("view engine", "ejs");
const connectDb = require("./database/dbConnection");

connectDb();

app.use((req, res, next) => {
  //allow access from every, elminate CORS
  res.setHeader('Access-Control-Allow-Origin','*');
  res.removeHeader('x-powered-by');
  //set the allowed HTTP methods to be requested
  res.setHeader('Access-Control-Allow-Methods','POST');
  //headers clients can use in their requests
  res.setHeader('Access-Control-Allow-Headers','Content-Type');
  //allow reqnodeuest to continue and be handled by routes
  next();
});

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/api", require("./routes/home"));
app.use("/api/user", require("./routes/RegisterUser"));
app.use("/api/user", require("./routes/userLogin"));
app.use("/api/user", require("./routes/authUser"));
app.use("/api/user", require("./routes/check"));
app.use("/api/user", require("./routes/cartdata"));
app.use("/api/user", require("./routes/addItem"));
app.use("/api/user", require("./routes/deleteItem"));
app.use("/api/user", require("./routes/Address"));


app.listen(port, function(){
    console.log("listeining to port ");
});