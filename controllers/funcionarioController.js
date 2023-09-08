// Importar o modelo de funcionário e os middlewares necessários
const funcionarioModel = require('../models/funcionarioModel');
const isAuthenticated = require('./midlewareController'); 
const multer = require('multer'); // Importe o multer para lidar com o upload de arquivos

// Configurar o armazenamento para o Multer
const storage = multer.diskStorage({
  destination: './img', // Diretório de destino para armazenar as imagens enviadas
  filename: (req, file, cb) => {
    // Gera um nome de arquivo único para evitar colisões
    const hash = Math.random().toString(36).substring(7);
    const filename = `${hash}_${file.originalname}`;
    cb(null, filename);
  },
});

module.exports = {
  // Controlador para exibir a página inicial
  showHomePage: (req, res, next) => {
    // Verifique se o usuário está autenticado usando o middleware de autenticação
    isAuthenticated(req, res, () => {
      // Se autenticado, renderiza a página de cadastro de funcionário
      res.render('cadastroFuncionario', { pageTitle: 'cadastroFuncionario' });
    });
  },

  // Controlador para inserir um novo funcionário
  inserirFuncionario: async (req, res) => {
    const { nome, pis, rg, cpf, telefone, email } = req.body;

    // Verifique se foi feito o upload de uma imagem
    if (!req.file) {
      return res.status(400).json({ message: 'Imagem não enviada.' });
    }

    const arquivo = req.file.filename; // Nome do arquivo gerado pelo Multer

    // Verifique se o usuário está autenticado usando o middleware de autenticação
    isAuthenticated(req, res, async () => {
      const usuarioId = req.session?.user?.idusuario;

      if (usuarioId !== undefined) {
        try {
          // Insira o funcionário no banco de dados usando o modelo de funcionário
          const resultado = await funcionarioModel.inserirFuncionario(
            nome,
            pis,
            rg,
            cpf,
            telefone,
            email,
            arquivo,
            usuarioId
          );
          if (resultado.success) {
            req.session.successMessage = 'Funcionário criado com sucesso';
          } else {
            req.session.errorMessage = 'Houve um problema ao adicionar seu funcionário';
          }

          // Redireciona de volta para a página inicial após a conclusão
          res.redirect('/HomePage');

        } catch (error) {
          console.error('Erro ao inserir funcionário:', error);
          res.status(500).json({ message: 'Erro ao inserir funcionário.' });
        }
      } else {
        res.status(401).json({ message: 'ID de usuário ausente na sessão.' });
      }
    });
  },

  // Controlador para listar detalhes de funcionário
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

  // Controlador para excluir um funcionário por ID
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