const mongoose = require("mongoose");

//DATA  Definig a Model

const Task = mongoose.model("Task", {
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

module.exports = Task;