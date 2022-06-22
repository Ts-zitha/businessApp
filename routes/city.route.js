const express = require('express');
const cityController = require('../controllers/city.controller');

//init Router instance
const router = express.Router();

router.get('/', cityController.fetchCities);
router.post('/', cityController.createCity);
router.get('/:id', cityController.fetchCityById);
router.put('/:id', cityController.updateCity);




module.exports = router;