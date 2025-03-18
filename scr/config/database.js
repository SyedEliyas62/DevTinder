const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://syedeliyas62:WNgBG2aZ97VluMwj@learnnodejs.iq9k7.mongodb.net/devTinder"
  );
};
module.exports = connectDB;
