const mongoose = require('mongoose');


//creating schema, which will be a collection model in the DB
const categorySchema = new mongoose.Schema({
    type: { type: String, required: true }
},{timestamps: true});


module.exports = mongoose.model('categories', categorySchema);