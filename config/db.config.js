const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/business-app',()=>{
    console.log('connected');
},e=> console.log(e.message));