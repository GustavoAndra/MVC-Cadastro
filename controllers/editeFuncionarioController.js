
const editarModel = require('../models/funcionarioModel');

async function showFormulario(req, res) {
    const idfuncionario = req.params.id;

    try {
        const funcionario = await editarModel.obterPessoaPorId(idfuncionario);

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
    const idfuncionario = req.params.id;
    const nome = req.body.nome;
    const pis = req.body.pis;
    const rg = req.body.rg;
    const cpf = req.body.cpf;
    const telefone= req.body.telefone;
    const email = req.body.email;
    const arquivo = req.body.arquivo;
    try {
        await editarModel.atualizarFuncionario(idfuncionario,nome, pis, rg, cpf, telefone, email, arquivo);
        res.redirect('/HomePage');
    } catch (error) {
        console.error('Erro ao atualizar funcionario:', error);
        res.status(500).send('Erro interno');
    }
}

module.exports = {showFormulario, editarPessoa};