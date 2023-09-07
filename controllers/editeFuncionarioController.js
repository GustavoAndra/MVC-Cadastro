const funcionarioModel = require('../models/funcionarioModel');

async function showfuncionario(req, res) {
  const { id } = req.params;
  try {
      const funcionario = await funcionarioModel.obterFuncionario(id);
      if (!funcionario) {
        res.redirect('/HomePage'); 
    } else {
        res.render('editefuncionario', { funcionario }); 
    }
  } catch (error) {
      res.status(500).send('Erro ao carregar a página de edição dos funcionários.');
  }
}

async function atualizarFuncionario(req, res) {
  const { id } = req.params;
  const { nome, pis, rg, cpf, telefone, email, arquivo } = req.body;
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

    await funcionarioModel.atualizarFuncionario(id, newData);

    res.redirect('/HomePage');
  } catch (error) {
    res.status(500).send('Erro ao editar o funcionário.');
  }
}

module.exports = {showfuncionario, atualizarFuncionario};