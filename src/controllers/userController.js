const usuarioModel = require('../models/usuarioModel');

class UsuarioController {
    async mostrarFormularioLogin(req, res) {
        res.render('login');
    }

    async fazerLogin(req, res) {
        const { email, senha } = req.body;
        
        try {
            // Verifica se o email existe e busca o usuário correspondente
            const resp = await usuarioModel.verificarExistenciaEmailSenha(email, senha);
            
            if (resp) {
                // Se a senha estiver correta, cria uma sessão para o usuário
                req.session.user = {
                    idusuario: resp.idusuario,
                    email: resp.email,
                    nome: resp.nome
                };
        
                res.redirect('/HomePage'); // Redireciona para a página de logados
            } else {
                res.redirect('/user'); // Senha incorreta ou usuário não encontrado
            }
        } catch (error) {
            console.log(error);
            res.redirect('/user');
        }
    }
}

module.exports = new UsuarioController();