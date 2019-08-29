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