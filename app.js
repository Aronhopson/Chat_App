const mongodb = require("mongodb")
const MongoClient = mongodb.MongoClient

const connectionUrl = "mongodb://127.0.0.1:27017"
const databaseName = "task_manager"

MongoClient.connect(connectionUrl, {useNewUrlParser: true}, (error, client) => {
    if(error) {
        return console.log("unable to connect to database")
    }
    const db = client.db(databaseName)

    db.collection("users").insertOne({
        name : "Aron",
        age: 22
    })
})