const express = require('express');
const app = express();

// this will match only GET API calls to /user
app.get('/user',(req,res)=>{
    console.log(req.query)
    res.send({firstName:'Anmol',lastName:'Gulati'})
})

// http://localhost:3000/user?name=anmol&age=20
// req.query = {name:'anmol',age:20}

app.get('/user/:id',(req,res)=>{
    console.log(req.params)
    res.send({firstName:'Anmol',lastName:'Gulati'})
})
// http://localhost:3000/user/123
// req.params = {id:'123'}

app.get('/user/:id/book/:bookId',(req,res)=>{
    console.log(req.params)
    res.send({firstName:'Anmol',lastName:'Gulati'})
})
// http://localhost:3000/user/123/book/456
// req.params = {id:'123',bookId:'456'}


// this will match only POST API calls to /user
app.post('/user',(req,res)=>{
    res.send('Post API called')
})

// this will match only DELETE API calls to /user
app.delete('/user',(req,res)=>{
    res.send('Delete API called')
})

// this will match all the http methods API calls to /test
app.use("/test",(req,res)=>{
    res.send('Hello World anmol')
})

app.listen(3000)