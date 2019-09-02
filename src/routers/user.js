const express = require("express")
const User = require("../models/user");
const  auth = require("../middleware/auth"); 
const router = new express.Router()//creatin new router

//USER CREATE API  (signing up)
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

 //login
 router.post("/users/login", async (req, res) =>{
     try{
         const user = await User.findbyCredentials(req.body.email, req.body.password)
         const token  = await user.generateTokenAuth()
         res.send({user ,token})

     }catch(e){
            res.status(404).send()
     }   
 })

 //LOUGOUT INDIVIDUAL
 router.post("/users/logout", auth, async(req, res) =>{
     try{
         req.user.tokens = req.user.tokens.filter((token) =>{
             return token.token !== req.token
         })
         await req.user.save()

         res.send()
     }catch (e){
         res.status(500).send()
     }
 })

 //LOGOUTALL
 router.post("/users/logoutAll", auth, async(req, res) =>{
     
    try{
        req.user.tokens = []
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
 })
  
 //USER READ API (fetching multiple) 
 //setup middleware funtion to run this specific route to lock down with authentication.
 //pass in middleware(auth) as second argument and route handler as third
 router.get("/users/me", auth,  async(req, res ) =>{ 
 
     res.send(req.user)
 })


 //USER UPDATE Profile
 router.patch("/users/me" ,auth,  async(req, res) =>{
 const updates = Object.keys(req.body)
 const allowupdates = ["name", "age", "email", "password"]
 const invalidOperation = updates.every((update) => allowupdates.includes(update))
 if(!invalidOperation){
     return res.status(404).send({error: "invalid updates"})
 }
 
     try{

         updates.forEach((update) =>  req.user[update] =req.body[update])

         await req.user.save()  
         res.send(req.user)
 
     }catch(e){
          res.status(400).send(e)
     }
 })
 
 //USER ABLE TO DELETe OWN PROFILE
  router.delete("/users/me",auth,  async(req, res) =>{
     try{
         await req.user.remove()
          res.send(req.user)

     }catch(e){
           res.status(500).send(e)
     }
 })

module.exports = router;