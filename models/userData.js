const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
    BillingAddres: [
        {
            _id : false,
            
            FirstName : {
                type: String,
                required: true
            },
            SurName : {
              type: String,
              required: true
            },
            Locality : {
                type: String,
                required: true
            },
            Address : {
                type: String,
                required: true
            },
            Pincode : {
                type: Number,
                required: true
            },
            PhoneNumber : {
                type: Number,
                required: true
            },
            City : {
                type: String,
                required: true
            },
            State : {
                type: String,
                required: true
            }
        }
      ]
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  console.log(this.password);
});

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
