const usuarioModel = require('../models/usuarioModel');

class CadastroController {
    async showCadastroForm(req, res) {
        res.render('login', { successMessage: req.flash('successMessage') });
    }

    async cadastrarEmpresa(req, res, next) {
        const { nome, email, senha } = req.body;

        try {
            const emailExists = await usuarioModel.checkEmailExists(email);
            if (emailExists) {
                req.flash('errorMessage', 'Este email já está cadastrado.');
                res.redirect('/register');
                return;
            }

            await usuarioModel.inserirUsuario(nome, email, senha);
            console.log('Empresa cadastrada com sucesso');
            req.flash('successMessage', 'Conta criada com sucesso.');
            res.redirect('/user');
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new CadastroController();