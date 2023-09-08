const funcionarioModel = require('../models/funcionarioModel');

async function showfuncionario(req, res) {
  const { id } = req.params;
  try {
      const funcionario = await funcionarioModel.obterFuncionario(id);
      if (!funcionario) {
        res.redirect('/HomePage'); 
    } else {
        res.render('edite', { funcionario }); 
    }
  } catch (error) {
      res.status(500).send('Erro ao carregar a página de edição dos funcionários.');
  }
}

async function atualizarFuncionario(req, res) {
  const { id } = req.params;
  const { nome, pis, rg, cpf, telefone, email} = req.body;
  const arquivo = req.file;

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

    await funcionarioModel.atualizarFuncionario(id, newData, req);

    // Redireciona para a página desejada após a atualização (por exemplo, a página de detalhes do funcionário)
    res.redirect(`/HomePage`);
  } catch (error) {
    console.error('Erro ao editar o funcionário:', error);
    res.status(500).send('Erro ao editar o funcionário. Por favor, tente novamente mais tarde.');
  }
}

module.exports = {showfuncionario, atualizarFuncionario};