const express = require('express');
const businessController = require('../controllers/business.controller');

//router instance 
const router = express.Router();


//route to get all business in the DB
router.get('/', businessController.getBusiness);
router.post('/', businessController.createBusiness);
router.get('/businessBycategory/:cat_name', businessController.getBusinessByCategory);
router.get('/businessByCity/:city_name', businessController.getBusinessByCity);
router.get('/businessByCityCategory/:city/:cat', businessController.getBusinessByCategoryCity);
router.get('/:id', businessController.getBusinessById);
router.put('/:id', businessController.updateBusiness);

module.exports = router;