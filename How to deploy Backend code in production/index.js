require('dotenv').config()
const express = require('express')
const app = express();

console.log(process.env.PORT);

port = process.env.PORT| 3000;

app.get('/',(req,res)=>{
res.send("hello from home route")
});

app.get('/about', (req, res) => {
    res.send("<h1>hello from the about route </h1>")
});

app.get('/contact', (req, res) => {
    res.send("<h1>Hello from the contact route</h1>")
});

app.get('/ptanhi', (req, res) => {
    res.send("<h1>Hello from the pta nhi route</h1>")
});


app.listen(port, () => console.log(`Listening on port ${port}`));

