const db = require('./db');

// Função para inserir um novo funcionário no banco de dados
const inserirFuncionario = async (nome, pis, rg, cpf, telefone, email, arquivo, usuarioId) => {
    try {
        const connection = await db.connect();
        const [insertResult] = await connection.execute(
            'INSERT INTO funcionario (nome, pis, rg, cpf, telefone, email, arquivo, usuario_idusuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [nome, pis, rg, cpf, telefone, email, arquivo, usuarioId]
        );

        if (insertResult.affectedRows === 1) {
            return { success: true, message: 'Funcionário inserido com sucesso.' };
        } else {
            return { success: false, message: 'Erro ao inserir funcionário.' };
        }
    } catch (error) {
        console.error('Erro no modelo ao inserir funcionário:', error);
        throw error;
    }
};

// Função para excluir um funcionário por ID
const excluirFuncionarioPorId = async (funcionarioId) => {
    try {
        const connection = await db.connect();
        const [deleteResult] = await connection.execute(
            'DELETE FROM funcionario WHERE idfuncionario = ?',
            [funcionarioId]
        );

        if (deleteResult.affectedRows === 1) {
            return { success: true, message: 'Funcionário excluído com sucesso.' };
        } else {
            return { success: false, message: 'Funcionário não encontrado.' };
        }
    } catch (error) {
        console.error('Erro ao excluir funcionário:', error);
        throw error;
    }
};

// Função para listar funcionários por ID de usuário
const listarFuncionarioPorUsuario = async (usuarioId) => {
    try {
        const connection = await db.connect();
        const [rows] = await connection.execute(
            'SELECT * FROM funcionario WHERE usuario_idusuario = ?',
            [usuarioId]
        );

        return { success: true, funcionarios: rows };
    } catch (error) {
        console.error('Erro ao listar funcionários:', error);
        throw error;
    }
};

// Função para atualizar os dados de um funcionário
const atualizarFuncionario = async (id, newData, req) => {
    const { nome, pis, rg, cpf, telefone, email } = newData;
    const connection = await db.connect();
    const arquivo = req.file;

    try {
        let updateQuery = 'UPDATE funcionario SET nome = ?, pis = ?, rg = ?, cpf = ?, telefone = ?, email = ?';
        const updateValues = [nome, pis, rg, cpf, telefone, email];

        if (arquivo) {
            updateQuery += ', arquivo = ?';
            updateValues.push(arquivo.filename);
        }

        updateQuery += ' WHERE idfuncionario = ?';
        updateValues.push(id);

        await connection.execute(updateQuery, updateValues);
    } catch (error) {
        console.error('Erro ao editar funcionário:', error);
        throw error;
    }
};

// Função para obter um funcionário por ID
async function obterFuncionario(idfuncionario) {
    const sql = 'SELECT * FROM funcionario WHERE idfuncionario = ?';
    const values = [idfuncionario];

    try {
        const connection = await db.connect();
        const [rows] = await connection.query(sql, values);

        if (rows.length === 1) {
            return rows[0];
        } else {
            return null;
        }
    } catch (error) {
        console.error('Erro ao buscar funcionário por ID:', error);
        throw error;
    }
}

module.exports = {
    inserirFuncionario,
    excluirFuncionarioPorId,
    listarFuncionarioPorUsuario,
    atualizarFuncionario,
    obterFuncionario
};
