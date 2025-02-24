const express = require("express");
const app = express();


app.get("/user", (req,res) =>{
    res.send( {firstName:"Syed", lastName: "Eliyas"});
});

app.post("/user", (req,res) =>{
    console.log(req.body);
    res.send("Data sucessfully saved to the database");
});

app.delete("/user", (req,res) => { 
    res.send("Deleted sucessfully");
})

app.use("/test", (req,res)=>{
    res.send("Hello from the sever.")
})


app.listen(7777, () =>{
    console.log("Server is successfully listerning on port 7777...")
});