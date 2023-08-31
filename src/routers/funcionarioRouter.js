const express = require('express');
const router = express.Router();
const funcionarioController = require('../controllers/funcionarioController');

// Rota para exibir a página de cadastro de funcionários
router.get('/cadastro', funcionarioController.showHomePage);

// Rota para inserir um novo funcionário
router.post('/cadastro', funcionarioController.funcionarioController.inserirFuncionario);

// Rota para editar um funcionário pelo ID
router.put('/editar/:id', funcionarioController.funcionarioController.editarFuncionario);

// Rota para excluir um funcionário pelo ID
router.delete('/delete/:id', funcionarioController.funcionarioController.excluirFuncionario);

// Rota para listar um funcionário pelo ID
router.get('/listar/:id', funcionarioController.funcionarioController.listarFuncionario);

module.exports = router;