require("../src/db/mongoose");
const Task = require("../src/models/task");

// Task.findByIdAndRemove("5d662d2f25e6ea20a0de0b25").then((task) =>{
//     console.log(task)
//     return Task.countDocuments({ completed :false})
// }).then((result) =>{
// console.log(result)
// }).catch((e) =>{
//     console.log(e)
// })

const updateAndDelete = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed : true})
    return count
}

updateAndDelete("5d662d4c767f3e378c1167cd").then((s) =>{
    console.log(s)
}).catch((e) =>{
    console.log(e)
})
