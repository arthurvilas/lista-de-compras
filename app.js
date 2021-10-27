require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();

// Fornecer front-end estático
app.use(express.static('./public'));

// Ler 'body' das requisições
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Conectar à base de dados
mongoose.connect(process.env.MONGO_URI, () => console.log('Conectado à base de dados...'));

// Controladores
const {
    pegarTodosItens,
    adicionarItem,
    atualizarItem,
    deletarItem
} = require('./controladores/itens');

// Mostra toda a lista ou items pesquisados por nome
app.get('/api', pegarTodosItens);

// Adiconar Item
app.post('/api', adicionarItem);

// Atualizar Item
app.patch('/api/:id', atualizarItem);

// Deletar Item
app.delete('/api/:id', deletarItem);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Ouvindo na porta ${port}...`));