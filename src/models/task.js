const mongoose = require("mongoose");
const bycrypt = require("bcryptjs")

//Createing middle ware
const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        trim: true,
        required: true
    }, 
      completed:  {
         type:Boolean,
         default: false,
    }
})
//DATA  Definig a Model
taskSchema.pre("save", async function (next) { 
    const task = this
    
    if(task.isModified("password")){
        task.password = await bycrypt.hash(task.password, 8)
    }
    next()
})


const Task = mongoose.model("Task", taskSchema )

module.exports = Task;