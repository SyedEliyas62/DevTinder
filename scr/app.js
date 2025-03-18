const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");


app.post("/signup", async (req, res) =>{
    const userObj = {
        firstName : "sachin",
        lastName : "Tendulkar",
        emailId:"sachin@123.com",
        password:"sachin@123",
        
    }
    //Creating a new instance of the User model
    const user = new User(userObj);

    try {  
   await user.save();
   res.send("User added Successfully!");
    } catch (err) {
        res.status(400).send("Error saving the user:" + err.message);
        
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
    console.error("Database connot be connected")
})



