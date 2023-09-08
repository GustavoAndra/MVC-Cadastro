const funcionarioModel = require('../models/funcionarioModel');

// Controlador para exibir a página de edição de um funcionário
async function showfuncionario(req, res) {
  const { id } = req.params;
  try {
    // Obtenha os detalhes do funcionário pelo ID
    const funcionario = await funcionarioModel.obterFuncionario(id);
    
    if (!funcionario) {
      // Se o funcionário não for encontrado, redirecione para a página inicial
      res.redirect('/HomePage');
    } else {
      // Renderize a página de edição com os detalhes do funcionário
      res.render('edite', { funcionario });
    }
  } catch (error) {
    // Lida com erros de servidor
    res.status(500).send('Erro ao carregar a página de edição dos funcionários.');
  }
}

// Controlador para atualizar os detalhes de um funcionário
async function atualizarFuncionario(req, res) {
  const { id } = req.params;
  const { nome, pis, rg, cpf, telefone, email } = req.body;
  const arquivo = req.file; // Obtenha o arquivo enviado (imagem)

  try {
    const newData = {
      nome,
      pis,
      rg,
      cpf,
      telefone,
      email,
      arquivo
    };

    // Atualize os detalhes do funcionário usando o modelo
    await funcionarioModel.atualizarFuncionario(id, newData, req);

    // Redireciona para a página desejada após a atualização (por exemplo, a página de detalhes do funcionário)
    res.redirect(`/HomePage`);
  } catch (error) {
    // Lida com erros de servidor
    console.error('Erro ao editar o funcionário:', error);
    res.status(500).send('Erro ao editar o funcionário. Por favor, tente novamente mais tarde.');
  }
}

module.exports = { showfuncionario, atualizarFuncionario };