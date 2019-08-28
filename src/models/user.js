const mongoose =require("mongoose");
const validator =require("validator");

const User = mongoose.model("User", {
    name: {
        type: String,
        required: true,
        trim : true
    }, 
    password: {
         type: String,
         required: true,
         trim: true,
         minlength:7,
         validate(value){
             if (value.toLowerCase().includes("password")) {
                 throw new Error("invalid password")
             }
         }

    },
    email:{
          type: String,
          required :true,
          trim: true,
          lowercase: true,
          validate(value){
              if(!validator.isEmail(value)){
                  throw new Error("email is invalid")
              }
          }
    },
  age:  {
         type: Number,
         default: 0,    //DATA SANITIZATION ALLOW US TO ALTER BEFORE SAVING IT
         validate(value){
             if(value<0){
                 throw new Error("age must be positive number")
             }
         }
    }
})

module.exports = User;