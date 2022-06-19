const express = require('express');
const body_parser = require('body-parser');
const cityRouter = require('./routes/city.route');
require('./config/db.config');



//init app instance
const app = express();

//json parser middlewares
app.use(body_parser.json())
app.use(body_parser.urlencoded({extended:true}));

//routes middleware
app.use('/api/city', cityRouter);


const PORT = process.env.PORT || 8080
//test route
app.get('/', (req, res)=>{
    res.status(200).json({msg:"Yo welcome to the mongoose-express crud api"});
});

//make server listen to client request at port 8080
app.listen(PORT,()=>{
    console.log(`express server started at port http://localhost:${PORT}`);
});