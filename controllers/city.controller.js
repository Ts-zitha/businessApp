
const City = require('../models/city.model');


exports.fetchCities =(req, res)=>{
   City.find()
   .then(cities=>{
    if(cities.length == 0){
        res.status(200).json({msg : 'The are no cities'})
    }else{
        res.status(200).json(cities);
    }}).catch(error=> res.status(500).json({msg : error}))
};