const express = require('express');
const serverless = require('serverless-http');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
let users = [];

// Rota para listar todos os usuários
app.get('/users', (req, res) => {
    res.json(users);
});

// Rota para criar um novo usuário
app.post('/users', (req, res) => {
    const { user } = req.body;
    users.push(user);
    res.status(201).send('Usuário criado com sucesso.');
});

// Função para adicionar um novo usuário a cada minuto
function addNewUser() {
    const newUser = { name: 'Novo Usuário', email: 'novousuario@example.com' };
    users.push(newUser);
    console.log('Novo usuário adicionado:', newUser);
}

// Executa a função para adicionar um novo usuário a cada minuto
setInterval(addNewUser, 60000); // 60000 milissegundos = 1 minuto

module.exports.handler = serverless(app);
