document.addEventListener("DOMContentLoaded", () => {
        const tbody = document.getElementById("tbody");
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
        `;
        tbody.appendChild(row);
    });
}
