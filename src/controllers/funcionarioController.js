const funcionarioModel = require('../models/funcionarioModel');
const isAuthenticated = require('./midlewareController'); // Verifique a ortografia

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
            res.status(500).json({ message: 'Erro ao cadastrar o funcionário.' });
          }
        } else {
          res.status(401).json({ message: 'ID de usuário ausente na sessão.' });
        }
      });
    },
    
    excluirFuncionario: async (req, res) => {
      try {
          const { id } = req.params;
          const result = await funcionarioModel.excluirFuncionarioPorId(id);
  
          if (result.success) {
              // Redirecionar para a página inicial após a exclusão
              res.redirect('/homePage');
          } else {
              res.status(404).json(result); // Ou use outro código de status apropriado para funcionário não encontrado
          }
      } catch (error) {
          console.error('Erro ao excluir funcionário:', error);
          res.status(500).json({ success: false, message: 'Erro interno do servidor' });
      }
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
  
   // Controller para mostrar o formulário de edição
   mostrarFormularioEdicao: async (req, res) => {
    const idPessoa = req.params.id;
  
    try {
        const pessoa = await funcionarioModel.editarFuncionarioPorId(idPessoa);
  
        if (!pessoa) {
            res.redirect('/homepage'); // Redirecionar se a pessoa não for encontrada
        } else {
            res.render('edite-funcionario', { funcionario: pessoa }); // Passar a variável pessoa para o template EJS
        }
    } catch (error) {
        console.error('Erro ao buscar funcionario:', error);
        res.status(500).send('Erro interno');
    }
  },
  

editarPessoa: async (req, res) => {
  const idPessoa = req.params.id;
  const {nome, pis, rg, cpf, telefone, email, arquivo} = req.body; // Use chaves para extrair os dados diretamente

  try {
      await funcionarioModel.atualizarPessoa(idPessoa, nome, pis, rg, cpf, telefone, email, arquivo);
      res.redirect('/homepage'); 
  } catch (error) {
      console.error('Erro ao atualizar pessoa:', error);
      res.status(500).send('Erro interno');
  }
},

  showEditePage: (req, res, next) => {
    isAuthenticated(req, res, () => {
      res.render('funcionario', {funcionario});
    });
  },
}; 