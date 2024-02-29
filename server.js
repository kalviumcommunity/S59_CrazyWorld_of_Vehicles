const express = require('express')
let app = express();
const {connectDB, checkConnected}=require('./db.js')

connectDB()

app.get("/",(req,res)=>{
    if(checkConnected()){
        res.send("Data base connection successful!!")
    }
    else{
        res.send("Connection Failed")
    }
});

let port = 8080;

app.listen(port,()=>{
    console.log(`we are at port ${port}`)
})

module.exports= {app}