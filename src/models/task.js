const mongoose = require("mongoose");
// const bycrypt = require("bcryptjs")

//Createing middle ware
const Task = mongoose.model("Task" , {
    description: {
        type: String,
        trim: true,
        required: true
    }, 
      completed:  { 
         type:Boolean,
         default: false,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : "User"
    }
})
// //DATA  Definig a Model
// taskSchema.pre("save", async function (next) { 
//     const task = this
    
//     if(task.isModified("password")){
//         task.password = await bycrypt.hash(task.password, 8)
//     }
//     next()
// })


// const Task = mongoose.model("Task", taskSchema )

module.exports = Task