const funcionarioModel = require('../models/funcionarioModel');

async function showFormulario(req, res) {
    const idfuncionario = req.params.id;

    try {
        const funcionario = await funcionarioModel.obterPessoaPorId(idfuncionario);

        if (!funcionario) {
            res.redirect('/HomePage'); 
        } else {
            res.render('edite-funcionario', { funcionario }); 
        }
    } catch (error) {
        console.error('Erro ao buscar funcionario:', error);
        res.status(500).send('Erro interno');
    }
}

async function editarPessoa(req, res) {
  const { id } = req.params;
  const {nome, pis, rg, cpf, telefone, email, arquivo } = req.body;
  try {
    const newData = {
        nome, pis, rg, cpf, telefone, email, arquivo
    };

    await funcionarioModel.atualizarFuncionario(id, newData);

    res.redirect('/HomePage');
  } catch (error) {
    res.status(500).send('Erro ao editar o funcionario.');
  }
}

module.exports = {showFormulario, editarPessoa};