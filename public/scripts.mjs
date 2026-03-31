let botao = document.querySelector(".botao-gerar");
let endereco = "http://localhost:3000/gerar";

async function gerarCodigo() {

    let textoUsuario = document.querySelector(".caixa-texto").value;
    let blocoCodigo = document.querySelector(".bloco-codigo");
    let resultadoCodigo = document.querySelector(".resultado-codigo");

    let resposta = await fetch(endereco, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            messages: [
                {
                    role: "system",
                    content: "Você é um gerador de código HTML e CSS. Responda SOMENTE com código puro. NUNCA use crases, markdown ou explicações. Formato: primeiro <style> com o CSS, depois o HTML. Siga EXATAMENTE o que o usuário pedir. Se pedir algo quicando, use translateY no @keyframes. Se pedir algo girando, use rotate."
                },
                {
                    role: "user",
                    content: textoUsuario
                }
            ]
        })
    });

    console.log(resposta.status);

    let dados = await resposta.json();

    console.log(dados);

    if (dados.choices && dados.choices.length > 0) {
        let resultado = dados.choices[0].message.content;

        blocoCodigo.textContent = resultado;
        resultadoCodigo.srcdoc = resultado;

    } else {
        blocoCodigo.textContent = "Não foi possível gerar o código. Tente novamente.";
    }
}

botao.addEventListener("click", gerarCodigo);

console.log("clicou no botão");
