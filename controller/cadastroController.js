const usuarioModel = require('../model/usuario');

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

            await usuarioModel.insertEmpresa(nome, email, senha);
            console.log('Empresa cadastrada com sucesso');
            res.redirect('/');
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new CadastroController();