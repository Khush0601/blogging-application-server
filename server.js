const AppConfig=require('./configs/app_configs')
const express=require('express')
const dbConfig=require('./configs/db_configs')
const mongoose=require('mongoose')
const app=express()

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