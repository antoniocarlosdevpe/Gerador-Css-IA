require('dotenv').config();
// No topo do arquivo: require('dotenv').config();
const apiKey = process.env.GROQ_API_KEY;
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

// 👉 SERVIR O SITE
app.use(express.static(path.join(__dirname, 'public')));

// rota IA
app.post('/gerar', async (req, res) => {
    const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

    const resposta = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.API_KEY}`
        },
        body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: req.body.messages
        })
    });

    const dados = await resposta.json();
    res.json(dados);
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000 🚀");
});
