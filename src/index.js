const express = require("express");
require("./db/mongoose");  //not to grab anything but to ensure the file run and connects to mongoose
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task")

 
const app = express();
const port = process.env.PORT || 3000

//without middleware : new request  -> run route handler

//with middleware : new request  -> do something-> run route handler
// app.use((req,res, next) =>{
//     if(req.method === "GET"){
//         res.send("GET requset is disable")
//     } else {
//         next()
//     }
// })

// app.use((req, res, next) =>{
//     res.status(503).send("server under maintainance")
// })


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)





app.listen(port, () => {
    console.log("The server has Started  " + port)
});

// //bycrypt TEST
// const bycrypt = require("bcryptjs")

// const myFunction = async () =>{
// const password = "red12345"
// const passwordHashed = await bycrypt.hash(password, 8)

// console.log(password)
// console.log(passwordHashed)

// const isMatch = await bycrypt.compare("red123456", passwordHashed)
// console.log(isMatch)
// }

//JWT TEST
// const jwt = require("jsonwebtoken")

// const  myFunction = async () =>{
//     const token = jwt.sign( {_id: "qwerty12"}, "qwertyuiop" , {expiresIn: "2 seconds"})
//     console.log(token   )

//     const data = jwt.verify(token, "qwertyuiop")
//     console.log(data)
// }
// myFunction()

//MESS AROUND TASK

const  Task = require("./models/task");
const User = require("./models/user");

const main =async () =>{
// const task = await Task.findById("5d6d3c0ab51f432f5ce836be")
// await task.populate("owner").execPopulate()   //go off and gonna find the user who is associated with this task
// console.log(task.owner)

const user = await User.findById("5d6d3bffb51f432f5ce836bc")
await user.populate("tasks").execPopulate()
console.log(user.tasks)
}

main()
