const express = require('express');
const router = express.Router();
const funcionarioController = require('../controllers/funcionarioController');

// Rota para exibir a página de cadastro de funcionários
router.get('/register/funcionario', funcionarioController.showHomePage);

// Rota para inserir um novo funcionário
router.post('/register/funcionario', funcionarioController.inserirFuncionario);

// Rota para a página de edição de um funcionário

// Rota para excluir um funcionário pelo ID
router.post('/funcionario/delete/:id', funcionarioController.excluirFuncionario);

// Rota para listar um funcionário pelo ID
router.get('/listar/funcionario', funcionarioController.listarDetalhesFuncionario);

module.exports = router;