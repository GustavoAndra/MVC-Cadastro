const mysql = require('mysql2/promise');
const connectionConfig = {
    host: 'containers-us-west-37.railway.app',
    user: 'root',
    password: 'Iax6uC5rPPFtZoeDYPOv',
    database: 'railway',
    port: 7103
};

const inserirFuncionario = async (nome, pis, rg, cpf, telefone, email, arquivo, usuarioId) => {
    const connection = await mysql.createConnection(connectionConfig);

    try {
        if (!nome || !cpf || !email) {
            return { success: false, message: 'Campos obrigatórios não preenchidos.' };
        }

        const [cpfResult] = await connection.query('SELECT * FROM funcionario WHERE cpf = ?', [cpf]);

        if (cpfResult.length > 0) {
            return { success: false, message: 'Funcionário já existe.' };
        }

        const [insertResult] = await connection.execute(
            'INSERT INTO funcionario (nome, pis, rg, cpf, telefone, email, arquivo, usuario_idusuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [nome, pis, rg, cpf, telefone, email, arquivo, usuarioId]
        );
        
        if (insertResult.affectedRows === 1) {
            return { success: true, message: 'Funcionário inserido com sucesso.' };
        } else {
            return { success: false, message: 'Erro ao inserir funcionário.'};
        }
    } catch (error) {
        
        console.error('Erro no modelo ao inserir funcionário:', error);    
        return { success: false, message: 'Erro ao inserir funcionário.' };
    } 
    finally {
        connection.end();
    }
};

const excluirFuncionarioPorId = async (funcionarioId) => {
    const connection = await mysql.createConnection(connectionConfig);

    try {
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
    } finally {
        connection.end();
    }
};

const listarFuncionarioPorUsuario = async (usuarioId) => {
    const connection = await mysql.createConnection(connectionConfig);

    try {
        const [rows] = await connection.execute(
            'SELECT * FROM funcionario WHERE usuario_idusuario = ?',
            [usuarioId]
        );

        return { success: true, funcionarios: rows }; // Retornar a matriz completa
    } catch (error) {
        console.error('Erro ao listar funcionários:', error);
        return { success: false, message: 'Erro ao listar funcionários.' };
    } finally {
        connection.end();
    }
};

const atualizarFuncionario = async (nome, pis, rg, cpf, telefone, email, arquivo, idfuncionario) => {
    const connection = await mysql.createConnection(connectionConfig); 

    const sql = `UPDATE funcionario SET nome = ?, pis = ?, rg = ?, cpf = ?, telefone = ?, email = ?, arquivo = ? WHERE idfuncionario = ?`;
    const values = [nome, pis, rg, cpf, telefone, email, arquivo, idfuncionario]; 

    try {
        // Não declare a variável connection novamente aqui, use a que já foi declarada acima
        const [rows] = await connection.query(sql, values);

        if (rows.length === 1) {
            // Retorna a pessoa encontrada
            return rows[0];
        } else {
            // Retorna null se a pessoa não for encontrada
            return null;
        }
    } catch (error) {
        console.error('Erro ao buscar pessoa por ID:', error);
        throw error;
    }
};


const Publicacao = async (id) => {
    try {
      const connection = await mysql.createConnection(connectionConfig);
      const query = 'SELECT * FROM funcionario WHERE idfuncionario = ?';
      const [rows] = await connection.execute(query, [id]);
  
      if (rows.length === 1) {
        return rows[0];
      } else {
        return null; 
      }
    } catch (error) {
      console.error(`Erro ao buscar a publicação com ID ${id}:`, error);
      throw error;
    }
  };
  
  async function obterPessoaPorId(idfuncionario) {
    const sql = 'SELECT * FROM funcionario WHERE idfuncionario = ?';
    const values = [idfuncionario];
  
    try {
      const connection = await mysql.createConnection(connectionConfig);
      const [rows] = await connection.query(sql, values);
  
      if (rows.length === 1) {
        // Retorna o funcionário encontrado
        return rows[0];
      } else {
        // Retorna null se o funcionário não for encontrado
        return null;
      }
    } catch (error) {
      console.error('Erro ao buscar funcionario por ID:', error);
      throw error;
    }
  };
  
module.exports = {
    inserirFuncionario,
    excluirFuncionarioPorId,
    listarFuncionarioPorUsuario,
    atualizarFuncionario,
    Publicacao,
    obterPessoaPorId
};