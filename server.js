var express= require('express');
var app = express();
const port = 8080;

app.get('/', (req, res)=>{
    res.send('Express and nodemon');
});
app.listen(port, ()=>{
    console.log(`App is running on port ${port}`)
})