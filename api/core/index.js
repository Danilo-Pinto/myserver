const express = require('express');
const serverless = require('serverless-http');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para permitir o uso de JSON no corpo das requisições
app.use(express.json());

let users = [];

// Rota para listar todos os usuários
app.get('/users', (req, res) => {
    res.json(users);
});

// Rota para criar um novo usuário
app.post('/users', (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    res.status(201).send('Usuário criado com sucesso.');
});

module.exports.handler = serverless(app);
