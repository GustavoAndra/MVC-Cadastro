const db = require('./db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
    checkEmailExists: async (email) => {
        const connection = await db.connect();
        const [rows] = await connection.query('SELECT * FROM usuario WHERE email = ?', [email]);
        return rows.length > 0;
    },

    inserirUsuario: async (nome, email, senha) => {
        const connection = await db.connect();
        const hashedSenha = await bcrypt.hash(senha, 10); // Hash da senha usando bcrypt
        const [result] = await connection.query('INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)', [nome, email, hashedSenha]);
        return result;
    },

    gerarToken: (usuario) => {
        // Aqui, você pode gerar um token JWT com os dados do usuário
        const token = jwt.sign(
            {
                id: usuario.id, // Adicione os campos necessários do usuário que deseja incluir no token
                nome: usuario.nome,
                email: usuario.email,
            },
            process.env.JWT_SECRET, 
            {
                expiresIn: '280000', 
            }
        );
        return token;
    },

    verificarExistenciaEmailSenha: async (email, senha) => {
        const connection = await db.connect();
        const [rows] = await connection.query('SELECT * FROM usuario WHERE email = ?', [email]);

        if (rows.length === 0) {
            return null;
        }
        const usuario = rows[0];

        // Compare a senha fornecida com a senha armazenada usando bcrypt
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
        if (senhaCorreta) {
            usuario.token = module.exports.gerarToken(usuario); // Gere e atribua um token ao usuário
            return usuario;
        } else {
            return null;
        }
    },
};
