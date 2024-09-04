const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const db = new sqlite3.Database('../database/vehicles.db');

app.use(cors());
app.use(express.json());

// Criação da tabela
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS vehicles (id INTEGER PRIMARY KEY, modelo TEXT, marca TEXT, ano INTEGER, cor TEXT)");
});

// Rota para adicionar um veículo
app.post('/adicionar-veiculo', (req, res) => {
    const { modelo, marca, ano, cor } = req.body;
    db.run("INSERT INTO vehicles (modelo, marca, ano, cor) VALUES (?, ?, ?, ?)", [modelo, marca, ano, cor], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID });
    });
});

// Rota para listar todos os veículos
app.get('/listar-veiculos', (req, res) => {
    db.all("SELECT * FROM vehicles", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Rota para consultar veículo por ID
app.get('/consultar-veiculo/:id', (req, res) => {
    const { id } = req.params;
    db.get("SELECT * FROM vehicles WHERE id = ?", [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(row);
    });
});

// Rota para atualizar um veículo
app.put('/atualizar-veiculo/:id', (req, res) => {
    const { id } = req.params;
    const { modelo, marca, ano, cor } = req.body;
    db.run("UPDATE vehicles SET modelo = ?, marca = ?, ano = ?, cor = ? WHERE id = ?", [modelo, marca, ano, cor, id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ changedRows: this.changes });
    });
});

// Rota para deletar um veículo
app.delete('/deletar-veiculo/:id', (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM vehicles WHERE id = ?", [id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ deletedRows: this.changes });
    });
});

// Inicia o servidor
app.listen(3001, () => {
    console.log('Servidor backend rodando na porta 3001');
});
