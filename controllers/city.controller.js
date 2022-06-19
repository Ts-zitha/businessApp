
const City = require('../models/city.model');


//fetching all cities
exports.fetchCities = (req, res)=>{
   City.find()
   .then(cities=>{
    if(cities.length == 0){
        res.status(200).json({msg : 'The are no cities'})
    }else{
        res.status(200).json(cities);
    }}).catch(error=> res.status(500).json({msg : error}))
};

//creating a city
exports.createCity = (req, res)=>{
    const city = new City(req.body);
    city.save()
    .then(data=> res.status(200).json({msg : 'city created', data}))
    .catch(err=>res.status(400).json({msg: 'error while creating city', err}));
}