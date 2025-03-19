const mongoose = require("mongoose")
const validator = require("validator");
const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: {
    type : String,
    required: true,
    minLength : 4,
    maxLength : 50,
  },
  lastName : {
    type : String,
    required: true,
  },
  emailId : {
    type : String,
    lowercase:true,
    required: true,
    unique:true,
    trim:true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("Invalid eamil address: " + value);
      }
    }
  },
  password : {
    type : String,
    required: true,
    validate(value){
      if(!validator.isStrongPassword(value)){
        throw new Error("Enter a Strong Password: " + value);
      }
    }
  },
  age : {
    type : Number,
    min:18,
    
  },
  gender : {
    type : String,
    validate(value){
      if(!["male","female", "others"].includes(value)){
        throw new Error("Gender data is not valid");
      }
    }
  },
  photoUrl : {
    type : String,
    default:"https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg",
    validate(value){
      if(!validator.isURL(value)){
        throw new Error("Invalid Photo Url address: " + value);
      }
    }
  },
  about : {
    type: String,
    default : "This is a default about of the user!"
  },
  skills : {
    type:[String]
  }
},
{
  timestamps:true,
});

module.exports = mongoose.model("User",UserSchema);

