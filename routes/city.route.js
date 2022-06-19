const express = require('express');
const cityController = require('../controllers/city.controller');

//init Router instance
const router = express.Router();

router.get('/',cityController.fetchCities);




module.exports = router;