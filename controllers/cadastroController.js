const usuarioModel = require('../models/usuarioModel');

// Controlador para exibir o formulário de cadastro
class CadastroController {
    async showCadastroForm(req, res) {
        // Renderiza a página de login e passe a mensagem de sucesso como parâmetro se houver
        res.render('login', { successMessage: req.flash('successMessage') });
    }

    async cadastrarEmpresa(req, res, next) {
        const { nome, email, senha } = req.body;

        try {
            // Verifique se o email já existe no banco de dados
            const emailExists = await usuarioModel.checkEmailExists(email);
            if (emailExists) {
                // Se o email já estiver cadastrado, exiba uma mensagem de erro
                req.flash('errorMessage', 'Este email já está cadastrado.');
                res.redirect('/register');
                return;
            }

            // Insire a empresa no banco de dados
            await usuarioModel.inserirUsuario(nome, email, senha);
            console.log('Empresa cadastrada com sucesso');
            // Exiba uma mensagem de sucesso e redirecione para a página de login
            req.flash('successMessage', 'Conta criada com sucesso.');
            res.redirect('/user');
        } catch (err) {
            next(err); 
        }
    }
}


module.exports = new CadastroController();