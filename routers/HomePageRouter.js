const express = require('express');
const HomePage = express.Router();
const dashboardController = require('../controllers/HomePageController');
//Rota que leva a homepage
HomePage.get('/HomePage', dashboardController.HomePage);

module.exports = HomePage;