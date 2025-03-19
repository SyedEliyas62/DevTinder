const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const {validateSignUpData} = require("./utils/validation")
const bcrypt = require("bcrypt");

app.use(express.json());

//Get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const user = await User.findOne({ emailId: userEmail });
    res.send(user);
    // const users  = await User.find({emailId : userEmail})
    // if(users.length === 0){
    //     res.status(404).send("User not wrong");
    // }else{
    //     res.send(users);
    // }
  } catch (error) {
    res.status(400).send("Someing want wrong.");
  }
});

// Feed API -GET/feed - get all the users from the databases

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(400).send("someting want wrong");
  }
});

app.post("/signup", async (req, res) => {


  try {
      // Validation of data
  validateSignUpData(req);

  const {firstName,lastName,emailId, password} = req.body;

  const passwordHash = await bcrypt.hash(password,10);
  console.log(passwordHash);
  //Creating a new instance of the User model
  const user = new User({
    firstName,
    lastName,
    emailId,
    password : passwordHash,
  });
    await user.save();
    res.send("User added Successfully!");
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
  }
});


app.post("/login", async (req,res) => {
  try {
    const {emailId, password} = req.body;
    const user = await User.findOne({emailId: emailId});
    if(!user){
      throw new Error("EmailId is not present in DB");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(isPasswordValid){
      res.send("Login Sucessfully!!");
    }else{
      throw new Error("Passwors is not correct");
    }

  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
    
  }
});





app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("user deleted Sucessfully.");
  } catch (error) {
    res.status(400).send("Something want wrong.");
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  
  try {
    const ALLOWED_UPDATE = ["photoUrl", "about", "gender", "age", "skills"];

  const isUpdatedAllowed = Object.keys(data).every((k) =>
    ALLOWED_UPDATE.includes(k)
  );
  if(!isUpdatedAllowed){
    throw new Error("Update not allowed");
  }
  if(data?.skills.length > 10){
    throw new Error("Skills cnnot be more than 10.")
  }

    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "before",
      runValidators:true,
      
    });
    console.log(user);
    res.send("User updated sucessfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

connectDB()
  .then(() => {
    console.log("Database connection establised....");

    app.listen(7777, () => {
      console.log("Server is successfully listerning on port 7777...");
    });
  })
  .catch((err) => {
    console.error("Database connot be connected");
  });
