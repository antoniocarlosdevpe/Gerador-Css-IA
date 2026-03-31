require('dotenv').config();

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const apiKey = process.env.API_KEY;

async function rodarIA() {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "user", content: "Fala como um dev de Recife raiz 😎" }
      ]
    })
  });

  const data = await response.json();
  console.log(data.choices[0].message.content);
}

rodarIA();
