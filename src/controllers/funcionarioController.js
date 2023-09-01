const funcionarioModel = require('../models/funcionarioModel');
const isAuthenticated = require('./midlewareController'); // Verifique a ortografia

module.exports = {
  showHomePage: (req, res, next) => {
    isAuthenticated(req, res, () => {
      res.render('cadastroFuncionario', { pageTitle: 'cadastroFuncionario' });
    });
  },

  funcionarioController: {
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
            res.status(500).json({ message: 'Erro ao cadastrar o funcionário.' });
          }
        } else {
          res.status(401).json({ message: 'ID de usuário ausente na sessão.' });
        }
      });
    },
    

    editarFuncionario: async (req, res) => {
      const { id } = req.params;
      const { nome, pis, rg, cpf, telefone, email, arquivo } = req.body;

      const result = await funcionarioModel.editarFuncionarioPorId(id, nome, pis, rg, cpf, telefone, email, arquivo);
      res.json(result);
    },

    excluirFuncionario: async (req, res) => {
      const { id } = req.params;
      const result = await funcionarioModel.excluirFuncionarioPorId(id);
      res.json(result);
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
  }
  
  }
};