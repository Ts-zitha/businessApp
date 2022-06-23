const Business = require('../models/business.model');


//getting all business
exports.getBusiness = async (req, res)=>{

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
//get businesses by category
exports.getBusinessByCategory = (req, res)=>{
    
    Business.find().where('category', '_id')
    .equals(req.params.id)
    .select('name')
    .populate('category')
    .populate('city description est') 
    .exec()
    .then(data=> {
        if(data.length == 0){
            res.status(404).json({ msg : 'Category not mapped to any Business'});
        }else{
            res.status(200).json(data);
        }
    })
    .catch(err=> res.status(500).json({msg: 'error while getting businesses by category'}))
};

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
            res.status(404).json({ msg : 'Error id type'})
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