const express = require("express");
const cors = require("cors");
const connection = require("./db_config");
const app = express();
 
app.use(cors());
app.use(express.json());
 
const port = 3000;
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));

app.post("/cadastrar", (req, res) => {
  const { placa, dono, cpf, tipo, vaga } = req.body;

  if (!placa || !dono || !cpf || !tipo || !vaga) {
      return res.status(400).json({ success: false, message: "Todos os campos são obrigatórios." });
  }

  connection.query("SELECT * FROM usuario WHERE vaga = ?", [vaga], (err, results) => {
      if (err) {
          console.error("Erro ao verificar vaga:", err);
          return res.status(500).json({ success: false, message: "Erro ao verificar vaga." });
      }

      if (results.length > 0) {
          return res.status(400).json({ success: false, message: "Vaga já ocupada." });
      }

      const query = "INSERT INTO usuario (placa, dono, cpf, tipo, vaga) VALUES (?, ?, ?, ?, ?)";
      connection.query(query, [placa, dono, cpf, tipo, vaga], (err) => {
          if (err) {
              console.error("Erro ao cadastrar carro:", err);
              return res.status(500).json({ success: false, message: "Erro ao cadastrar carro." });
          }
          res.json({ success: true, message: "Cadastro realizado com sucesso" });
      });
  });
});

  app.get('/listar', (req, res) => {
    const query = 'SELECT * FROM usuario';
    connection.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Erro ao buscar carros na garagem.' });
      }
      res.json({ success: true, carro: results });
    });

  });
  app.delete('/excluir/:placa', (req, res) => {
    const {placa} = req.params;
    const query = 'DELETE FROM usuario WHERE placa = ?';
    connection.query(query, [placa], (err) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Erro ao remover carro.' });
      }
      res.json({ success: true, message: 'Carro removido com sucesso!' });
    });
  });

app.delete('/deletar/:placa', (req, res) => {
    const {placa } = req.params;
    const query = 'DELETE FROM usuario WHERE placa = ?';
    connection.query(query, [placa], (err) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Erro ao remover carro.' });
      }
      res.json({ success: true, message: 'Carro removido com sucesso!' });
    });
});

app.put('/editar/:placa', (req, res) => {
  const placaAntiga = req.params.placa;
  const {dono, placaNova, cpf, tipo, vaga } = req.body;

  console.log('Recebendo requisição para editar:', { placaAntiga, dono, placaNova, cpf, tipo, vaga });

  const query = 'UPDATE usuario SET placa=?, dono=?, cpf=?, tipo=?, vaga=? WHERE placa=?';
  connection.query(query, [placaNova, dono, cpf, tipo, vaga, placaAntiga], (err) => {
      if (err) {
          console.error('Erro no banco de dados:', err);
          return res.status(500).json({ success: false, message: 'Erro ao atualizar carro.' });
      }
      res.json({ success: true, message: 'Carro atualizado com sucesso!' });
  });
});
