const express = require('express');
const router = express.Router();
const funcionarioController = require('../controllers/funcionarioController');

// Rota para exibir a página de cadastro de funcionários
router.get('/funcionario', funcionarioController.showHomePage);

// Rota para inserir um novo funcionário
router.post('/register/funcionario', funcionarioController.inserirFuncionario);

// Rota para listar um funcionário pelo ID
router.get('/listar/funcionario', funcionarioController.listarDetalhesFuncionario);

// Rota para excluir um funcionário pelo ID
router.post('/funcionario/delete/:id', funcionarioController.excluirFuncionario);

// Rota para mostrar o formulário do funcionário
router.get('/funcionario/editar/:id', funcionarioController.mostrarFormularioEdicao);

// Rota para editar um funcionário pelo ID
router.post('/funcionario/editar/:id', funcionarioController.listarDetalhesFuncionario);

module.exports = router;