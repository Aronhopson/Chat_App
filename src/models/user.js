const mongoose =require("mongoose");
const validator =require("validator");
const bycrypt = require("bcryptjs"); //creating middle ware
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
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
          unique: true, //avoid login with same email
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
    },
tokens : [{
    token:{
        type:String,
        required : true 
    }
}]
}) 

userSchema.methods.generateTokenAuth = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString()}, "qwertyuiop")

    user.tokens = user.tokens.concat({token})
    await user.save()
    
    return token;


}


//Middle ware
userSchema.statics.findbyCredentials = async( email, password) =>{
    const user = await User.findOne({email})
    if(!user) {
        throw new Error("Unable to login")
    }
    const isMatch = await bycrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error("unable to login")
    }
    return user
}

//Hash the plain text before saving
userSchema.pre("save", async function (next) { 
         const user = this
         
         if(user.isModified("password")){
             user.password = await bycrypt.hash(user.password, 8)
         }
         next()
})

const User = mongoose.model("User", userSchema )

module.exports = User;