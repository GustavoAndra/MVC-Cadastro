const usuarioModel = require('../model/usuarioModel');

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
                    id_usuario: resp.id_usuario,
                    email: resp.email,
                    nome: resp.nome
                };
                
                res.redirect('/HomePage'); // Redireciona para a página de logados
            } else {
                res.redirect('/login'); // Senha incorreta ou usuário não encontrado
            }
        } catch (error) {
            console.log(error);
            res.redirect('/login');
        }
    }
}

module.exports = new UsuarioController();