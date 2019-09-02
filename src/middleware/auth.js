const jwt = require("jsonwebtoken");
const User = require("../models/user");



const auth = async (req,res, next) =>{
  try{
      const token = req.header("Authorization").replace("Bearer ", "") //looking for header user provided
       const decoded = jwt.verify(token, "qwertyuiop")                 // validate tyhe header
       const user = await User.findById({ _id: decoded._id, "tokens.token":token}) //finds the associated users
 
       if(!user) {
           throw new Error()
       }
        
       req.token = token, 
       req.user = user,
       next()

  }catch(e){
      res.status(401).send({ "error" : "please authenticate"})

  }
}

module.exports = auth;