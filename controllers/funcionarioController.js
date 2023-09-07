const funcionarioModel = require('../models/funcionarioModel');
const isAuthenticated = require('./midlewareController');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: './imagens', filename: (req, file, cb) => { 
    const hash = Math.random().toString(36).substring(7);
    const filename = `${hash}_${file.originalname}`;
    cb(null, filename);  // função cb
  }
});

const upload = multer({ storage });

module.exports = {
  showHomePage: (req, res, next) => {
    isAuthenticated(req, res, () => {
      res.render('cadastroFuncionario', { pageTitle: 'cadastroFuncionario' });
    });
  },

  inserirFuncionario: async (req, res) => {
    const { nome, pis, rg, cpf, telefone, email, arquivo } = req.body;
  
    isAuthenticated(req, res, async () => {
      const usuarioId = req.session?.user?.idusuario;
  
      if (usuarioId !== undefined) {
        const resultado = await funcionarioModel.inserirFuncionario(nome, pis, rg, cpf, telefone, email, arquivo, usuarioId);
  
        if (resultado.success) {
          // Redirecione para a página '/Homepage' com uma mensagem de sucesso.
          res.redirect('/Homepage?message=Funcionário cadastrado com sucesso');
        } else {
          res.redirect('/Homepage?message=Erro ao cadastrar o funcionário');
        }
      } else {
        res.status(401).json({ message: 'ID de usuário ausente na sessão.' });
      }
    });
  },
    
  listarDetalhesFuncionario: async (req, res) => {
      try {
          const usuarioId = req.session?.user?.idusuario;
          const result = await funcionarioModel.listarFuncionarioPorUsuario(usuarioId);
          res.json(result);
      } catch (error) {
          console.error('Erro ao listar detalhes do funcionário:', error);
          res.status(500).json({ success: false, message: 'Erro ao listar detalhes do funcionário.' });
      }
  },
  
  excluirFuncionario: async (req, res) => {
      try {
          const { id } = req.params;
          const result = await funcionarioModel.excluirFuncionarioPorId(id);
  
          if (result.success) {
              // Redirecionar para a página inicial após a exclusão
              res.redirect('/HomePage');
          } else {
              res.status(404).json(result); // Ou use outro código de status apropriado para funcionário não encontrado
          }
      } catch (error) {
          console.error('Erro ao excluir funcionário:', error);
          res.status(500).json({ success: false, message: 'Erro interno do servidor' });
      }
  },

}; 