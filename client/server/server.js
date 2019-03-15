const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 5000
//const cors= require('cors')
const mongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID
const url = 'mongodb://root:root123@ds131765.mlab.com:31765/ooad_kob'
const dbName = 'ooad_kob';
app.use(bodyParser.json())
//app.use(cors())

//disable cors due to the server will not using cross origin feature.


app.post('/user',(req,res) => {
    mongoClient.connect(url,(err,client) => {
        const db = client.db(dbname)
        db.collection('User').findOne({user:req.body.email,password:req.body.password},(err,data) =>{

            if(data != null){
                res.status(200)
                res.jason({status:true,id:data._id})
            }else{
                res.sendStatus(401)
            }
        })
    })
})


app.listen(port, () => {
    console.log(`App listening on ${port}`)
})