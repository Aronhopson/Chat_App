//CRUD =-= Create Read Update Delete

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID


const connectionUrl = "mongodb://127.0.0.1:27017"
 const databaseName = "task_manager"
//=================OBJECTID====================================================
//  const id = new ObjectID()
//  console.log(id.id.length)
//  console.log(id.toHexString().length)
//  console.log(id.getTimestamp())
//==============================================================================

//USING CONNECT METHOD TO CONNECT TO SPECIFIC SERVER
 MongoClient.connect(connectionUrl, {useNewUrlParser: true, useUnifiedTopology:true}, (error, client) => {
    if(error) {
        return console.log("unable to connect to database")
    }
    //use db method ON CLIENT FOR SPECIFIC CONNECTION
    const db = client.db(databaseName)  
//CREATE ======================================================================================
    //INSERT DOCUMENT AND VIEW IT
    // db.collection("users").insertOne({
    //     name : "Aron Hopson",
    //     age: 24
    // },(error,result) => {
    //     if(error) {
    //      return   console.log("unable to insert")
    //     }

    //     console.log(result.ops)
    // })
//==============================================================================================
//READ DOCUMENT
//=================================================================
// db.collection("users").findOne({name : "Aron" , age: 2}, (error, user) => {
//     if(error){
//        return console.log("unable to fetch")
//     }

// console.log(user)
// })

// db.collection("tasks").find({ completd :false}).toArray((error, s) => {
//     console.log(s)
// })

//=======================================================================================
//UPDATE DOCUMENT using Promise

// db.collection("users").updateOne({
//      _id: new ObjectID("5d63fc881644bd325cc298c8")
// }, {
//     $inc: {            //increment in number  ($set = change in variable name)
//         age: 1
//     }
// }).then((result) =>{
// console.log(result)
// }).catch((error) =>{
//     console.log(error)
// })

// })

// db.collection("tasks").updateMany({
//   completd : true
// }, {
//     $set:{
//         completd : false,
//     }
    
// }).then((result) => {
//  console.log(result.modifiedCount)
// }).catch((error) => {
//     console.log(error)
// })
//============================================================
//DELETE DOCUMENT

db.collection("users").deleteMany({
    age :22
}).then((result) => {
    console.log(result)
}).catch((error) =>{
    console.log(error)
})

db.collection("tasks").deleteOne({
    _id: new ObjectID("5d64dd54627f830ee070dce4")
}).then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
})
 })