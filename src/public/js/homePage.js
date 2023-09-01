document.getElementById('formulario-cadastro').addEventListener('submit', function (event) {
    // Valide se os campos estão preenchidos e com o comprimento correto.
    const nome = document.getElementById('nome').value;
    const pis = document.getElementById('pis').value;
    const rg = document.getElementById('rg').value;
    const cpf = document.getElementById('cpf').value;

    if (nome === '' || pis === '' || rg === '' || cpf === '') {
      event.preventDefault(); // Impede o envio do formulário se algum campo estiver em branco.
      alert('Por favor, preencha todos os campos.');
    }

    if (pis.length !== 11) {
      event.preventDefault(); // Impede o envio do formulário se o comprimento do PIS não for o correto.
      document.getElementById('pis-error').textContent = 'O PIS deve ter 11 dígitos.';
    } else {
      document.getElementById('pis-error').textContent = ''; // Limpa a mensagem de erro se estiver correta.
    }

    if (rg.length !== 10) {
      event.preventDefault(); // Impede o envio do formulário se o comprimento do RG não for o correto.
      document.getElementById('rg-error').textContent = 'O RG deve ter 10 dígitos.';
    } else {
      document.getElementById('rg-error').textContent = ''; // Limpa a mensagem de erro se estiver correta.
    }

    if (cpf.length !== 12) {
      event.preventDefault(); // Impede o envio do formulário se o comprimento do CPF não for o correto.
      document.getElementById('cpf-error').textContent = 'O CPF deve ter 12 dígitos.';
    } else {
      document.getElementById('cpf-error').textContent = ''; // Limpa a mensagem de erro se estiver correta.
    }
  });