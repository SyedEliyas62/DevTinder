const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");


app.use(express.json())


//Get user by email
app.get("/user", async (req,res) =>{
    const userEmail = req.body.emailId;

    try {
        const user = await User.findOne({emailId:userEmail});
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

app.get("/feed", async (req,res) =>{
   
    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        res.status(400).send("someting want wrong");
    }
});





app.post("/signup", async (req, res) =>{

   
    //Creating a new instance of the User model
    const user = new User(req.body);

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



