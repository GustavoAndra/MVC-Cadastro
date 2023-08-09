// controller/empresaController.js
const empresaModel = require('../model/empresa');

exports.showCadastroForm = (req, res) => {
    res.render('cadastro');
};

exports.cadastrarEmpresa = async (req, res, next) => {
    const { email, senha, cnpj } = req.body;

    try {
        const emailExists = await empresaModel.checkEmailExists(email);
        if (emailExists) {
            return res.status(400).send('Email já cadastrado');
        }

        await empresaModel.insertEmpresa(email, senha, cnpj);
        console.log('Empresa cadastrada com sucesso');
        res.redirect('/');
    } catch (err) {
        next(err);
    }
};