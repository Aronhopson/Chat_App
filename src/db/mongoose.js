const mongoose =require("mongoose");
const validator =require("validator")

mongoose.connect("mongodb://127.0.0.1:27017/task-managerAPI", {
    useNewUrlParser: true,
})  

const User = mongoose.model("User", {
    name: {
        type: String,
        required: true,
        trim : true
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
         default: 0,
         validate(value){
             if(value<0){
                 throw new Error("age must be positive number")
             }
         }
    }
})

const me = new User({
    name: "   Aron kahu  ",
    age : 55,
    email: "aronKSJJSg@gmail.com"
})

me.save().then(() => {
    console.log(me)
}).catch((error) => {
   console.log("error",  error)
})

//DATA VALIDATION Definig a Model

// const Task = mongoose.model("Task", {
//     description: {
//         type: String
//     }, 
//   completed:  {
//          type:Boolean
//     }
// })

// //CREATING INSTANCE OF IT
// const task = new Task({
//    description: "Aron is a great man",
//     completed : true
// })

// //SAVING INSTANCE IN DATABASE
// task.save().then(() => {
//     console.log(task)
// }).catch((error) => {
//    console.log("error",  error)
// })