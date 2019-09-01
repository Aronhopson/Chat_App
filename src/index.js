const express = require("express");
require("./db/mongoose");  //not to grab anything but to ensure the file run and connects to mongoose
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task")

 
const app = express();
const port = process.env.PORT || 3000


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
    console.log("The server has Started  " + port)
});

// //bycrypt
// const bycrypt = require("bcryptjs")

// const myFunction = async () =>{
// const password = "red12345"
// const passwordHashed = await bycrypt.hash(password, 8)

// console.log(password)
// console.log(passwordHashed)

// const isMatch = await bycrypt.compare("red123456", passwordHashed)
// console.log(isMatch)
// }
const jwt = require("jsonwebtoken")

const  myFunction = async () =>{
    const token = jwt.sign( {_id: "qwerty12"}, "qwertyuiop" , {expiresIn: "2 seconds"})
    console.log(token)

    const data = jwt.verify(token, "qwertyuiop")
    console.log(data)
}
myFunction()

