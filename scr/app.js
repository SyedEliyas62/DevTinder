const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");



const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");




app.use(express.json());
app.use(cookieParser());

app.use("/",authRouter);
app.use("/", profileRouter);
app.use("/",requestRouter);

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
