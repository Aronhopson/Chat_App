require("../src/db/mongoose");
const Task = require("../src/models/task");

Task.findByIdAndRemove("5d662d2f25e6ea20a0de0b25").then((task) =>{
    console.log(task)
    return Task.countDocuments({ completed :false})
}).then((result) =>{
console.log(result)
}).catch((e) =>{
    console.log(e)
})