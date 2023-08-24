const express = require('express');
const HomePage = express.Router();
const dashboardController = require('../controller/HomePageController');

HomePage.get('/HomePage', dashboardController.HomePage);

module.exports = HomePage;