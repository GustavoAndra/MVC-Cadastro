const funcionarioModel = require('../models/funcionarioModel');

async function getEditarCardapio(req, res) {
  const { id } = req.params;
  try {
      const funcionario = await funcionarioModel.obterPessoaPorId(id);
      if (!funcionario) {
        res.redirect('/HomePage'); 
    } else {
        res.render('edite-funcionario', { funcionario }); 
    }
  } catch (error) {
      res.status(500).send('Erro ao carregar a página de edição de cardápio.');
  }
}

async function postEditarCardapio(req, res) {
  const { id } = req.params;
  const { nome, pis, rg, cpf, telefone, email, arquivo } = req.body;
  try {
    const newData = {
      nome, pis, rg, cpf, telefone, email, arquivo
    };

    await funcionarioModel.atualizarFuncionario(id, newData);

    res.redirect('/HomePage');
  } catch (error) {
    res.status(500).send('Erro ao editar o cardápio.');
  }
}

module.exports = {getEditarCardapio, postEditarCardapio};