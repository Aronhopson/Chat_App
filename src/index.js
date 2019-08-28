const express = require("express");
require("./db/mongoose");  //not to grab anything but to ensure the file run and connects to mongoose
const User = require("./models/user")
const Task = require("./models/task")

 
const app = express();
const port = process.env.PORT || 3000


app.use(express.json())

//USER CREATE API
app.post("/users",( req,res) => { 
   const user = new User(req.body)
   
   user.save().then(() => {
       res.status(201).send(user)
   }).catch((e) => {
       res.status(400).send(e)
   });
});

//USER READ API (fetching multiple)
app.get("/users", (req, res ) =>{
    User.find({}).then((users) =>{
        res.send(users)
    }).catch((e) =>{
       res.status(500).send()
    })
})
//USER READ API (fetching by id)
app.get("/users/:id", (req, res)=>{
   const _id = req.params.id

   User.findById(_id).then((user) =>{
       if(!user){
          return res.status(404).send()
       }
       res.send(user)
   
    }).catch((e) =>{
       res.status(500).send()
   })
})

//TASK CREATE API
app.post("/tasks", (req, res) =>{
    const task = new Task(req.body)

    task.save().then(() =>{
        res.status(201).send(task) 
    }).catch((e) =>{
        res.status(400).send(e)
    })
})
//TASK READ API (fetching multiple)
app.get("/tasks", (req, res ) =>{
    Task.find({}).then((tasks) =>{
        res.send(tasks)
    }).catch((e) =>{
       res.status(500).send()
    })
})
//TASK READ API (fetching by id)
app.get("/tasks/:id", (req, res)=>{
    const _id = req.params.id
 
    Task.findById(_id).then((task) =>{
        if(!task){
           return res.status(404).send()
        }
        res.send(task)
    
     }).catch((e) =>{
        res.status(500).send()
    })
 })


app.listen(port, () => {
    console.log("The server has Started  " + port)
});