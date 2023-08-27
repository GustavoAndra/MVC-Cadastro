const mysql = require('mysql2');

const inserirFuncionario = async (nome, pis, rg, cpf, telefone, email, arquivo, usuarioId) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'janela1434',
        database: 'mvc'
    });

    try {
        const [rows] = await connection.execute(
            'INSERT INTO funcionario (nome, pis, rg, cpf, telefone, email, arquivo, usuario_idusuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [nome, pis, rg, cpf, telefone, email, arquivo, usuarioId]
        );

        if (rows.affectedRows === 1) {
            return { success: true, message: 'Funcionário inserido com sucesso.' };
        } else {
            return { success: false, message: 'Erro ao inserir funcionário.' };
        }
    } catch (error) {
        console.error('Erro no modelo ao inserir funcionário:', error);
        return { success: false, message: 'Erro ao inserir funcionário.' };
    } finally {
        connection.end();
    }
};

module.exports = {
    inserirFuncionario
};