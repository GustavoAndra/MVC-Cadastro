const usuarioModel = require('../models/usuarioModel');

class UsuarioController {
    //Função para mostrar o formulário de login
    async mostrarFormularioLogin(req, res) {
        res.render('login');
    }
//Função para fazer o login do usuário
    async fazerLogin(req, res) { 
        const { email, senha } = req.body;
    
        try {
            // Verifica se o email existe e busca o usuário correspondente
            const resp = await usuarioModel.verificarExistenciaEmailSenha(email, senha);
    
            if (resp) {
                const token = usuarioModel.gerarToken(resp);
    
                // Se a senha estiver correta, cria uma sessão para o usuário com o token
                req.session.user = {
                    idusuario: resp.idusuario,
                    email: resp.email,
                    nome: resp.nome,
                    token: token
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
    
    //Função para deslogar o usuário
    async logout(req, res) {
        delete req.session.user;
        res.redirect('/HomePage');
    }
}

module.exports = new UsuarioController();