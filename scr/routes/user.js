const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const userRouter = express.Router();


const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate(
      "fromUserId", USER_SAFE_DATA
    );

    res.json({
      message: "Data fetched sucessfully",
      data: connectionRequest,
    });
  } catch (err) {
    req.statusCode(400).send("ERROR: " + err.message);
  }
});


userRouter.get("/user/connections", userAuth, async (req,res)=>{
    try {
        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequest.find({
            $or:[
                {toUserId:loggedInUser._id, status:"accepted"},
                {fromUserId:loggedInUser._id, status:"accepted"},
            
            ],
        })
        .populate("fromUserId",USER_SAFE_DATA)
        .populate("toUserId",USER_SAFE_DATA);

        const data = connectionRequest.map((row) => {
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
               return  row.toUserId;
            }
            row.fromUserId
        });
        res.json({data});
    } catch (err) {
        res.status(400).send({message: err.message});
        
    }
})

module.exports = userRouter;
