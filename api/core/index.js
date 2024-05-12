const express = require('express');
const serverless = require('serverless-http');
const cron = require('node-cron');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para permitir o uso de JSON no corpo das requisições
app.use(express.json());

// Definir o diretório onde os arquivos de log serão armazenados
const logDirectory = path.join(__dirname, 'logs');

// Certificar-se de que o diretório de logs exista
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
}

// Rota para listar as datas dos arquivos de log
app.get('/users', (req, res) => {
    // Ler o diretório de logs
    fs.readdir(logDirectory, (err, files) => {
        if (err) {
            console.error('Erro ao ler o diretório de logs:', err);
            return res.status(500).send('Erro ao ler o diretório de logs');
        }

        // Filtrar apenas os arquivos com extensão .txt
        const logFiles = files.filter(file => file.endsWith('.txt'));

        // Extrair as datas dos nomes dos arquivos
        const dates = logFiles.map(file => {
            const fileName = path.parse(file).name; // Remover extensão do arquivo
            return new Date(fileName).toLocaleDateString();
        });

        res.json(dates);
    });
});

module.exports.handler = serverless(app);
