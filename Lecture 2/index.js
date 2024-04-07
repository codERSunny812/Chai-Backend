const express = require('express');

const app = express();

const PORT = 4001;


app.get('/',(req,res)=>{
    res.send("<h1>hello world</h1>")
});

app.get('/youtube',(req,res)=>{
    res.send("<h2>this is youtube route</h2>")
})



app.listen(PORT,()=>{
    console.log("server is running")
})