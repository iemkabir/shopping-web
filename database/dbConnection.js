require("dotenv").config();
const mongoose = require("mongoose");

function connectDb() {
  mongoose
    .connect(process.env.MANGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("connected");
    })
    .catch((e) => {
      console.log("Something went wrong", e);
    });
}

module.exports = connectDb;
