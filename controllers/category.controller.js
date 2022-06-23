const categoryModel = require('../models/category.model');



//getting all business categories
exports.getCategories = (req, res)=>{
    categoryModel.find()
    .then(data=>{
        if(data.length == 0){
            res.status(200).json({msg: "Category data is empty"})
        }else{
            res.status(200).json({data});
        }
        
    }).catch(err=>res.send(err));
};

//creating a business category in the DB
exports.createCategory = (req, res)=>{
    const category = new categoryModel(req.body);
    category.save()
    .then(data=> res.status(200).json({msg : "category create", data}))
    .catch(err => res.status(500).json({msg:"error while creating category in the DD", err}));
};

//get category byId
exports.getCategoryById = (req, res)=>{
    categoryModel.findById(req.params.id)
    .then(category=>{
        if(!category){
            res.status(404).json({msg:'No category with that id'});
        }else{
            res.status(200).json(category)
        }
    }).catch(err=>{
        if(err.name == 'CastError'){
            res.status(404).json({ msg : 'Error id type'})
        }else{
            res.status(500).json({msg : err})
        }
    });
};

//update category
exports.updateCategory = (req, res)=>{
    categoryModel.findByIdAndUpdate(req.params.id, req.body, {new : true})
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
        });
};