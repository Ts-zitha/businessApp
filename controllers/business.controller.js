const { json } = require('body-parser');
const businessModel = require('../models/business.model');
const Business = require('../models/business.model');
const categoryModel = require('../models/category.model');
const City = require('../models/city.model');


//getting all business
exports.getBusiness = (req, res)=>{
    Business.find()
    .populate('city', 'city_name')
    .populate('category', 'type')
    .exec()
    .then(data => {
        if(data.length == 0){
            res.status(200).json({msg: 'No businesse in the collection'})
        }else{
            res.status(200).json(data);
        }}).catch(err=>res.status(500).json({msg: 'Error while fetching business', err}));
};

//create a business
exports.createBusiness = (req, res)=>{
    const business = new Business(req.body);
    business.save()
    .then(data=> res.status(200).json({msg : "business create", data}))
    .catch(err => res.status(500).json({msg:"error while creating business in the DD", err}));
};
//get businesses by category//join by category
exports.getBusinessByCategory = (req, res)=>{
    categoryModel.find()
    .where('type')
    .equals(req.params.cat_name)
    .then(category =>{
        cat_id = category[0]._id;
        Business.find().where('category', '_id')
        .equals(cat_id)
        .select('name  description est')
        .populate('category', 'type')
        .populate('city', 'city_name')
        .exec()
        .then(data=>{
            if(data.length == 0){
                res.status(200).json({msg: 'No busineses mapped with that category'})
            }else{
                res.status(200).json(data);
            }}).catch(err=>{
            res.status(500).json({msg: 'Error while while fetching business in that category'});
        });
    }).catch(err=>{
        res.status(404).json({ msg: 'category does not exists '});
    });
};
//join business by city
exports.getBusinessByCity = (req, res)=>{
    City.find()
    .where('city_name')
    .equals(req.params.city_name)
    .then(city =>{
        city_id = city[0]._id;
        Business.find().where('city', '_id')
        .equals(city_id)
        .select('name  description est')
        .populate('category', 'type')
        .populate('city', 'city_name')
        .exec()
        .then(data=>{
            if(data.length == 0){
                res.status(200).json({msg: 'No busineses mapped with this city'});
            }else{
                res.status(200).json(data);
            }}).catch(err=>{
                res.status(500).json({msg: 'Error while while fetching business in that city'});
            });
    }).catch(err=>{
        res.status(404).json({msg:'City does not exist from collection'});
    });
}

//join by city and category
exports.getBusinessByCategoryCity= (req, res)=>{
    City.find()
    .where('city_name')
    .equals(req.params.city)
    .then(city =>{
        categoryModel.find().where('type')
        .equals(req.params.cat)
        .then(category=>{
            city_id = city[0]._id;
            cat_id = category[0]._id;
            Business.find().where('city', '_id')
            .equals(city_id)
            .where('category', '_id')
            .equals(cat_id)
            .select('name  description est')
            .populate('category', 'type')
            .populate('city', 'city_name')
            .exec()
            .then(data =>{
                if(data.length == 0){
                    res.status(200).json({msg:`No business mapped with ${req.params.city} city and ${req.params.cat} category`})
                }else{
                    res.status(200).json(data);
                }}).catch(err=>{
                res.status(500).json({msg:`error while getting businesses mapped to ${req.param.cat} category and ${req.param.city}`})
            });
        }).catch(err=>{
            res.status(404).json({msg: 'Category or City  does not exist from collection'});
        });
    }).catch(err=>{
        res.status(404).json(err);
    });
}

//get Business byId
exports.getBusinessById = (req, res)=>{
    Business.findById(req.params.id)
    .then(business=>{
        if(!business){
            res.status(404).json({msg:'No business with that id'});
        }else{
            res.status(200).json(business);
        }
    }).catch(err=>{
        if(err.name == 'CastError'){
            res.status(404).json({ msg : 'Error id type'});
        }else{
            res.status(500).json({msg : err})
        }
    });
};

//update business
exports.updateBusiness = (req, res)=>{
    Business.findByIdAndUpdate(req.params.id, req.body, {new : true})
    .then(data =>{
        if(!data){
            res.status(404).json({msg:'No Business with that id'});
        }else{
            res.status(200).json(data)
        }}).catch(err=>{
            if(err.name == 'CastError'){
                res.status(404).json({ msg : 'Error id type'})
            }else{
                res.status(500).json({msg : err})
            }
        });
};