const express = require('express');
const router = express.Router();
const funcionarioController = require('../controllers/funcionarioController');
const editeController = require('../controllers/editeFuncionarioController');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: './img', filename: (req, file, cb) => { 
    const hash = Math.random().toString(36).substring(7);
    const filename = `${hash}_${file.originalname}`;
    cb(null, filename);  // função cb
  }
});

const upload = multer({ storage });

// Rota para exibir a página de cadastro de funcionários
router.get('/funcionario',funcionarioController.showHomePage);

// Rota para inserir um novo funcionário
router.post('/register/funcionario', upload.single('arquivo'),funcionarioController.inserirFuncionario);

// Rota para listar um funcionário pelo ID
router.get('/listar/funcionario', funcionarioController.listarDetalhesFuncionario);

// Rota para excluir um funcionário pelo ID
router.post('/funcionario/delete/:id', funcionarioController.excluirFuncionario);

// Rota para excluir um funcionário pelo ID
router.get('/funcionario/editar/:id', editeController.showFormulario);

// Rota para excluir um funcionário pelo ID
router.post('/funcionario/atualizar/:id', editeController.editarPessoa);

module.exports = router;