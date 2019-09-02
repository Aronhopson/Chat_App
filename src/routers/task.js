const express = require("express");
const Task = require("../models/task");
const auth = require("../middleware/auth");
const router = new express.Router()//creatin new router


//TASK CREATE API
router.post("/tasks", auth, async(req, res) =>{
    const task = new Task({
        ...req.body,            //ES6 spread operator
         owner : req.user._id
    })

    try{
        await task.save()
        res.status(201).send(task)

    }catch(e){
        res.status(404).send(e)
    }
})
//TASK READ API (fetching multiple)
router.get("/tasks",auth,  async (req, res ) =>{

    try{
        // const task = await Task.find({owner: req.user._id})//or
        await req.user.populate("tasks").excPopulate()
        res.send(req.user.task)
    }catch(e){
         res.status(500).send()
    }
    
})
//TASK READ API (fetching by id)
router.get("/tasks/:id", auth, async(req, res)=>{
    const _id = req.params.id
   
    try{
        const task = await Task.findOne({_id, owner:req.user._id}) 
        if(!task){
            return res.status(404).send()
        }
        res.send(task)

    }catch(e){
        res.status(500).send(e)
        
    }
 })

 //TASK UPDATE Patch
 router.patch("/tasks/:id" , async(req, res) =>{
    const updates = Object.keys(req.body)
    const allowupdates = ["description", "completed"]
    const invalidOperation = updates.every((update) => allowupdates.includes(update))
    if(!invalidOperation){
        return res.status(400).send({error: "invalid updates"})
    }
    
        try{    
            const task = await Task.findById(req.params.id)
         updates.forEach((update) =>  task[update] =req.body[update])

         await task.save()

            if(!task){
                res.status(404).send()
            }
            res.send(task)
    
        }catch(e){
             res.status(400).send(e)
        }
    })

    //DELETE HTTP TASK
router.delete("/tasks/:id", async(req, res) =>{
    try{
         const task = await Task.findOneAndDelete(req.params.id)
         if(!task){
             res.status(404).send()
         }
         res.send(task)
    }catch(e){
          res.status(500).send(e)
    }
})

module.exports = router;
