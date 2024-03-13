const express = require('express')
let app = express();
const {connectDB, checkConnected}=require('./db.js')
const routes = require('./routes')

let port = 8081;

connectDB()

app.get("/",(req,res)=>{
    if(checkConnected()){
        res.send("Data base connection successful!!")
    }
    else{
        res.send("Connection Failed")
    }
});
app.use(express.json());
app.use('/api', routes)

app.listen(port,()=>{
    console.log(`we are at port ${port}`)
})
module.exports= {app}