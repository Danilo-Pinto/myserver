const express = require('express');
const serverless = require('serverless-http');
const cron = require('node-cron');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


app.get('/users', (req, res) => {

    const logDirectory = path.join(__dirname, 'logs');

    if (!fs.existsSync(logDirectory)) {
        fs.mkdirSync(logDirectory);
    }

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
