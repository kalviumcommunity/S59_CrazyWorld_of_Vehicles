const express = require('express')
let app = express();
const cors = require('cors')
const {connectDB, checkConnected}=require('./db.js')
const routes = require('./Routes/WeirdyRoutes')

let port = 8081;

connectDB()
app.use(cors())
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