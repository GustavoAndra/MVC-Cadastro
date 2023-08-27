const usuarioModel = require('../models/usuarioModel');

class CadastroController {
    async showCadastroForm(req, res) {
        res.render('cadastro');
    }

    async cadastrarEmpresa(req, res, next) {
        const {nome, email, senha} = req.body;

        try {
            const emailExists = await usuarioModel.checkEmailExists(email);
            if (emailExists) {
                return res.status(400).send('Email já cadastrado');
            }

            await usuarioModel.inserirUsuario(nome, email, senha);
            console.log('Empresa cadastrada com sucesso');
            res.redirect('/login');
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new CadastroController();