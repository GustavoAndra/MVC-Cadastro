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
          res.json(resultado);
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

    listarFuncionario: async (req, res) => {
      const { id } = req.params;
      const result = await funcionarioModel.listarFuncionarioPorId(id);
      res.json(result);
    }
  }
};