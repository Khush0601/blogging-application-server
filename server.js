const AppConfig=require('./configs/app_configs')
const express=require('express')
const dbConfig=require('./configs/db_configs')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const cors=require('cors')
const app=express()

//middleware for converting js objects into json
app.use(bodyParser.json())
app.use(cors())


//plugging routes to app
require('./routes/user.routes')(app)

//connection to DB:
 mongoose.connect(dbConfig. DB_URL)
 const db=mongoose.connection
 db.on('error',()=>{
    console.log('error while connecting to db')
 })
 db.once('open',()=>{
    console.log('connected to database')
 })

//connection to server:
app.listen(AppConfig.PORT,()=>{
    console.log('server started on Port:',AppConfig.PORT)
})