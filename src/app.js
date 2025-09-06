const express = require('express');
const app = express();

// this will match only GET API calls to /user
app.get('/user',(req,res,next)=>{
    console.log('This is the first req')
    next()
},
(req,res)=>{
    console.log('This is the second callback')
    res.send({firstName:'John',lastName:'Doe'})
}
)

app.listen(3000)