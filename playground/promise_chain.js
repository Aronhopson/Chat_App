require("../src/db/mongoose")
const User = require("../src/models/user")

User.findByIdAndUpdate("5d663f5b0082551114ebb6b5", {age : 24}).then((user) =>{
    console.log(user)
    return User.countDocuments({ age: 24})
}).then((result) =>{
console.log(result)
}).catch((e) =>{
    console.log(e)
})