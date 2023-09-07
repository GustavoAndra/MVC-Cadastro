const isAuthenticated = require('./midlewareController');
const funcionarioModel = require('../models/funcionarioModel');

module.exports = {
  HomePage: [
    isAuthenticated, 
    async (req, res) => {
      
      try {
        const usuarioId = req.session?.user?.idusuario;
        const resultado = await funcionarioModel.listarFuncionarioPorUsuario(usuarioId);

        if (resultado.success) {
          const funcionarios = resultado.funcionarios;
          res.render('HomePage', { pageTitle: 'HomePage', success: true, funcionarios });
        } else {
          res.render('HomePage', { pageTitle: 'HomePage', success: false });
        }
      } catch (error) {
        console.error('Erro ao carregar funcionários:', error);
        res.render('HomePage', { pageTitle: 'HomePage', success: false });
      }
    }
  ]
};