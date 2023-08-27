const express = require('express');
const router = express.Router();
const funcionarioController = require('../controllers/funcionarioController'); // Substitua pelo caminho correto do seu controller

router.get('/funcionario/cadastro', funcionarioController.showHomePage);

router.post('/funcionario/cadastro', funcionarioController.inserirFuncionarioController);

module.exports = router;