const express = require('express');
const HomePage = express.Router();
const dashboardController = require('../controllers/HomePageController');

HomePage.get('/homePage', dashboardController.HomePage);

module.exports = HomePage;