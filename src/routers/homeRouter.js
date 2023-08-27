const express = require('express');
const homerouter = express.Router();
const homeController = require('../controllers/homeController');

// Rota para a página inicial
homerouter.get('/', homeController.showHomePage);

module.exports = homerouter;