document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("cadastrar").addEventListener("click", cadastrar);
});


async function cadastrar(event){
    event.preventDefault();

    const placa = document.getElementById("placa").value;
    const dono = document.getElementById("dono").value;
    const cpf = document.getElementById("cpf").value;
    const tipo = document.getElementById("tipo").value;
    const vaga = document.getElementById("vaga").value;

    console.log(dono, cpf, placa, tipo, vaga);

    try {
        const response = await fetch("http://localhost:3000/cadastrar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ placa, dono, cpf, tipo, vaga }),
        });

        const result = await response.json();

        if (result.success) {
            alert("Cadastro feito com sucesso");
            document.getElementById("cadastroForm").reset();
        } else {
            alert(result.message || "Houve um erro ao cadastrar");
        }
    } catch (error) {
        console.error("Erro ao cadastrar:", error);
        alert("Erro ao cadastrar. Verifique a conexão com o servidor.");
    } 
}
