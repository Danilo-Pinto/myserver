const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para permitir o uso de JSON no corpo das requisi��es
app.use(express.json());

let users = [];

// Rota para listar todos os usu�rios
app.get('/users', (req, res) => {
    res.json(users);
});

// Rota para criar um novo usu�rio
app.post('/users', (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    res.status(201).send('Usu�rio criado com sucesso.');
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
