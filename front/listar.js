document.addEventListener("DOMContentLoaded", () => {
    listar()
});

  async function listar() {
    const tbody = document.getElementById("tbody");

    if (!tbody) {
        console.error("Erro: Elemento tbody não encontrado!");
        return;
    }

    const response = await fetch("http://localhost:3000/listar");
    const data = await response.json();
    tbody.innerHTML = ""; // Limpa a tabela antes de adicionar os novos itens

    data.carro.forEach((carro) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${carro.placa}</td>
            <td>${carro.tipo}</td>
            <td>${carro.dono}</td>
            <td>${carro.cpf}</td>
            <td>${carro.vaga}</td>
            <td class="delete-btn" onclick="excluir('${carro.placa}')">✖</td>
            <td class="editar-btn" onclick="abrirModal('${carro.dono}', '${carro.placa}', '${carro.cpf}', '${carro.tipo}', '${carro.vaga}')">Editar</td>
        `;
        tbody.appendChild(row);
    });
}

async function excluir(placa) {
    const response = await fetch(`http://localhost:3000/deletar/${placa}`, {
        method: 'DELETE'
    });

    const result = await response.json();
    if (result.success) {
        alert('Carro removido com sucesso!');
        listarGaragem(); // Recarrega a lista após a exclusão
    } else {
        alert(result.message || 'Erro ao remover o carro!');
    }
}

// Função para abrir o modal e preencher os campos
function abrirModal(dono, placa, cpf, tipo, vaga, placaAntigaParam) {
    placaAntiga = placaAntigaParam; 
    document.getElementById('dono').value = dono;
    document.getElementById('placa').value = placa;
    document.getElementById('cpf').value = cpf;
    document.getElementById('tipo').value = tipo;
    document.getElementById('vaga').value = vaga;

    // Exibir o modal
    document.getElementById('modal').style.display = 'flex';
    
}

// Função para fechar o modal
function fecharModal() {
    document.getElementById('modal').style.display = 'none';
}

async function editar() {
    const dono = document.getElementById('dono').value;
    const placaNova = document.getElementById('placa').value;
    const cpf = document.getElementById('cpf').value;
    const tipo = document.getElementById('tipo').value;
    const vaga = document.getElementById('vaga').value;

    console.log('Dados enviados:', { dono, placa, cpf, tipo, vaga });

    const response = await fetch(`http://localhost:3000/editar/${placaAntiga}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({placaAntiga, dono, placaNova, cpf, tipo, vaga })
    });

    const result = await response.json();
    if (result.success) {
        alert('Carro editado com sucesso!');
        listar();
        fechar(); 
    } else {
        alert(result.message || 'Erro ao editar o carro!');
    }
}