const mongoose = require('mongoose');

//creating schema, which will be a collection model in the DB
const citySchema = new mongoose.Schema({
    city_name: { type: String, required : true },
    country: { type: String, required : false },
},{timestamps: true});


module.exports = mongoose.model('cities', citySchema);