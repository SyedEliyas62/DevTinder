const express = require('express');
const { validateSignUpData } = require('../utils/validation');
const User = require('../models/user');
const bcrypt = require("bcrypt");


const authRouter = express.Router();



authRouter.post("/signup", async (req, res) => {
  try {
    // Validation of data
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);
    //Creating a new instance of the User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("User added Successfully!");
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
    try {
      const { emailId, password } = req.body;
      const user = await User.findOne({ emailId: emailId });
      if (!user) {
        throw new Error("EmailId is not present in DB");
      }
      const isPasswordValid = await user.validatePassword(password);
      if (isPasswordValid) {
        const token = await user.getJWT();
  
        res.cookie("token", token, {
          expires: new Date(Date.now() + 1 * 3600000),
        });
        res.send("Login Sucessfully!!");
      } else {
        throw new Error("Passwors is not correct");
      }
    } catch (err) {
      res.status(400).send("ERROR :" + err.message);
    }
  });


authRouter.post("/logout", async (req,res) => {
    res.cookie("token", null,{
      expires : new Date(Date.now()),
    });
    res.send("Logout Successful");
  });

module.exports = authRouter;