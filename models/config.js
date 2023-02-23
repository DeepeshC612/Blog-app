const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

mongoose.set('strictQuery', false)

mongoose.connect(`${process.env.URL}`,{
    useNewUrlParser: "true",
})
mongoose.connection.on("error",(err)=>{
    console.log("mongoose connection error" + err)
})
mongoose.connection.on("connected",(err,res)=>{
    console.log("mongoose is connected")
})