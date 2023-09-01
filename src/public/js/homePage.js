async function carregarDetalhesFuncionario() {
    try {
        const response = await fetch('/listar'); // Rota personalizada para carregar os detalhes dos funcionários associados ao usuário logado
        const data = await response.json();

        const funcionarioInfo = document.getElementById('funcionario-info');

        if (data.success) {
            const funcionarios = data.funcionarios;

            if (funcionarios.length > 0) {
                funcionarioInfo.innerHTML = funcionarios.map(funcionario => `
                    <div class="card">
                        <img src="${funcionario.arquivo}" alt="Foto do funcionário">
                        <p>Nome: ${funcionario.nome}</p>
                        <p>Email: ${funcionario.email}</p>
                        <p>PIS: ${funcionario.pis}</p>
                        <p>RG: ${funcionario.rg}</p>
                        <p>CPF: ${funcionario.cpf}</p>
                        <p>Telefone: ${funcionario.telefone}</p>
                       
                        <div class="card-buttons">
                            <button class="btn-editar" type="button" data-id="${funcionario.id}">Editar</button>
                            <button class="btn-excluir" type="button" data-id="${funcionario.id}">Excluir</button>
                        </div>
                    </div>
                `).join('');
            } else {
                funcionarioInfo.innerHTML = '<p>Nenhum funcionário cadastrado.</p>';
            }
        } else {
            funcionarioInfo.textContent = 'Erro ao carregar funcionários.';
        }
    } catch (error) {
        console.error('Erro ao carregar detalhes dos funcionários:', error);
    }
}

carregarDetalhesFuncionario();