
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

//get city by id
exports.fetchCityById = (req, res)=>{
    City.findById(req.params.id)
    .then(city=> {
        if(!city){
            res.status(404).json({msg:'No city with that id'});
        }else{
            res.status(200).json(city)
        }
    })
    .catch(err=> {
        if(err.name == 'CastError'){
            res.status(404).json({ msg : 'Error id type'})
        }else{
            res.status(500).json({msg : err})
        }
        
    });
}
// update city
exports.updateCity = (req, res)=>{
    City.findByIdAndUpdate(req.params.id, req.body, {new : true})
    .then(data =>{
        if(!data){
            res.status(404).json({msg:'No city with that id'});
        }else{
            res.status(200).json(data)
        }}).catch(err=>{
            if(err.name == 'CastError'){
                res.status(404).json({ msg : 'Error id type'})
            }else{
                res.status(500).json({msg : err})
            }
        })
}