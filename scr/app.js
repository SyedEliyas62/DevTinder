const express = require("express");
const app = express();


app.use("/", (req,res) =>{
    res.send("Hello world from india");
});

app.listen(3000);