const express = require('express');
const router = express.Router();
const funcionarioController = require('../controllers/funcionarioController');
const editeController = require('../controllers/editeFuncionarioController');
const multer = require('multer');
const upload = multer({ dest: './img' }); 

// Rota para exibir a página de cadastro de funcionários
router.get('/funcionario',funcionarioController.showHomePage);

// Rota para inserir um novo funcionário
router.post('/register/funcionario', upload.single('arquivo'),funcionarioController.inserirFuncionario);

// Rota para listar um funcionário pelo ID
router.get('/listar/funcionario', funcionarioController.listarDetalhesFuncionario);

// Rota para excluir um funcionário pelo ID
router.post('/funcionario/delete/:id', funcionarioController.excluirFuncionario);

// Rota para exibir o formulário de edição de um funcionário pelo ID
router.get('/editar/:id', editeController.showfuncionario);

// Rota para processar a atualização de um funcionário pelo ID
router.post('/editar/:id', upload.single('arquivo'), editeController.atualizarFuncionario);

module.exports = router;