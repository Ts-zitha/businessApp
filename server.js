const express = require('express');
const body_parser = require('body-parser');
require('./config/db.config');


//init app instance
const app = express();

//json parser middlewares


//routes middleware


const PORT = process.env.PORT || 8080
//test route
app.get('/', (req, res)=>{
    res.status(200).json({msg:"Yo welcome to the mongoose-express crud api"});
});

//make server listen to client request at port 8080
app.listen(PORT,()=>{
    console.log(`express server started at port http://localhost:${PORT}`);
});