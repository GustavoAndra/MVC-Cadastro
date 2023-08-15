const usuarioModel = require('../model/usuario');
const jwt = require("jsonwebtoken");

class UsuarioController {
    async mostrarFormularioLogin(req, res) {
        res.render('login');
    }
    async fazerLogin(req, res) {
        const { email, senha} = req.body;

        try {
            const usuario = await usuarioModel.verificarExistenciaEmailSenha(email, senha);
            console.log("Resultado da verificação:", usuario);
            if (usuario) {
                const token = jwt.sign({ id: usuario.id }, "mySecretKey", { expiresIn: "1h" });

                return res.json({ autenticado: true, token });
            } else {
                return res.status(401).json({ autenticado: false, mensagem: "Credenciais inválidas" });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensagem: "Erro no servidor" });
        }
    }
}

module.exports = new UsuarioController();