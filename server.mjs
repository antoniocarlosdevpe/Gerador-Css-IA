import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

// 👉 SERVIR O SITE
app.use(express.static(path.join(__dirname, 'public')));

// Pega a API Key corretamente
const apiKey = process.env.GROQ_API_KEY;
console.log(apiKey);

app.post('/gerar', async (req, res) => {
    const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

    const resposta = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}` // Usando a chave carregada corretamente
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
