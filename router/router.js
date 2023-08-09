const express = require('express');
const router = express.Router();
const empresaController = require('../controller/empresaController');

router.get('/', empresaController.showCadastroForm);

router.post('/cadastro', empresaController.cadastrarEmpresa);

module.exports = router;