const mongoose = require('mongoose');

//business schema
const BusinessSchema = new mongoose.Schema({
    name : {type: String, required: true},
    description: { type: String, required: false},
    est: {type: Number, required: false },
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'categories', required: true},
    city: { type: mongoose.Schema.Types.ObjectId, ref: 'cities', required: true}
},{timestamps: true});


module.exports = mongoose.model('businesses', BusinessSchema);