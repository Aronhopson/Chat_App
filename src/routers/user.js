const express = require("express")
const User = require("../models/user");
const router = new express.Router()//creatin new router

//USER CREATE API
router.post("/users", async(req,res) => { 
    const user = new User(req.body)
    try{
       await user.save()
       const token = await user.generateTokenAuth()
       res.status(201).send({user, token })
     
     }catch(e){
        res.status(404).send(e)
    }
 });

 router.post("/users/login", async (req, res) =>{
     try{
         const user = await User.findbyCredentials(req.body.email, req.body.password)
         const token  = await user.generateTokenAuth()
         res.send({user,token})

     }catch(e){
            res.status(404).send()
     }  
 })
  
 //USER READ API (fetching multiple)
 router.get("/users", async(req, res ) =>{
 
     try{
         const user = await User.find({})
         res.send(user)
 
     }catch(e){
         res.status(500).send(e)
     }
 })
 //USER READ API (fetching by id)
 router.get("/users/:id", async(req, res)=>{
    const _id = req.params.id
     
    try{
         const user = await User.findById(_id)
 
             if(!user){
               return res.status(404).send()
           }
         res.send(user)
     } catch(e){
      res.status(500).send(e)
 }
 })
 //USER UPDATE Patch
 router.patch("/users/:id" , async(req, res) =>{
 const updates = Object.keys(req.body)
 const allowupdates = ["name", "age", "email", "password"]
 const invalidOperation = updates.every((update) => allowupdates.includes(update))
 if(!invalidOperation){
     return res.status(404).send({error: "invalid updates"})
 }
 
     try{
         const user = await User.findById(req.params.id)
         updates.forEach((update) =>  user[update] =req.body[update])

         await user.save()
    
         if(!user){
             res.status(404).send()
         }
         res.send(user)
 
     }catch(e){
          res.status(400).send(e)
     }
 })
 
 //DELETE HTTP user
 router.delete("/users/:id", async(req, res) =>{
     try{
          const user = await User.findOneAndDelete(req.params.id)
          if(!user){
              res.status(404).send()
          }
          res.send(user)
     }catch(e){
           res.status(500).send(e)
     }
 })

module.exports = router;