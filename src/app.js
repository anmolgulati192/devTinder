const express = require('express');
const app = express();
app.use("/test",(req,res)=>{
    res.send('Hello World anmol')
})
app.use((req,res)=>{
    res.send('Hi there')
})
app.listen(3000)