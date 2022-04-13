const router = require("express").Router();
const bCrypt = require("bcrypt");
const Users = require("../models/userData");

router.post("/Register", async (req, res) => {
  try {
    const userEmail = await Users.find({ email: req.body.email });

    if (userEmail.length != 0) {
      return res.status(400).send("email already registered");
    }else {
      const user = new Users({
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password
      });
      await user.save();
       res.status(200).send("data saved");
    }
  } catch (error) {
    console.log("error happened", error);
  }
});

module.exports = router;
