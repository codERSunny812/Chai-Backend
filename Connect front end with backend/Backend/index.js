// import express from 'express'
const express = require('express')
require('dotenv').config()

const App = express()

App.get('/',(req,res)=>{
    res.send("helllllo from the server ")
});

const port = process.env.PORT || 3000

App.get('/api/jokes',(req,res)=>{
    const jokes = [
        {
            id:1,
            title:'jokes 1',
            description:"This is the joke 1 "
        },
        {
            id: 2,
            title: 'jokes 2',
            description: "This is the joke 2 "
        },
        {
            id: 3,
            title: 'jokes 3',
            description: "This is the joke 3 "
        }
    ];

    res.send(jokes);
});


App.listen(port,()=>{
    console.log(`this port is running at port number ${port}`);
})

