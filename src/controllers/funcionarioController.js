const funcionarioModel = require('../models/funcionarioModel');
const isAuthenticated = require('./midlewareController'); // Verifique a ortografia

module.exports = {
  showHomePage: (req, res, next) => {
    isAuthenticated(req, res, () => {
      res.render('cadastroFuncionario', { pageTitle: 'cadastroFuncionario' });
    });
  },
   
  // Controlador para inserir um funcionário
  inserirFuncionarioController: async (req, res) => {
    const { nome, pis, rg, cpf, telefone, email, arquivo } = req.body;

    // Verifica se o usuário está autenticado
    isAuthenticated(req, res, async () => {
      // Obtem o ID do usuário da sessão, usando a expressão de cadeia opcional
      const usuarioId = req.session?.user?.idusuario;

      if (usuarioId !== undefined) {
        const resultado = await funcionarioModel.inserirFuncionario(nome, pis, rg, cpf, telefone, email, arquivo, usuarioId);

        res.json(resultado);
      } else {
        res.status(401).json({ message: 'ID de usuário ausente na sessão.' });
      }
    });
  }
}
