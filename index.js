const perguntas = [
  {
    pergunta: "O que é JavaScript?",
    respostas: [
      "Uma linguagem de marcação para estruturar páginas web",
      "Uma linguagem de programação usada para criar interatividade em páginas web",
      "Um estilo de folha de cascata usado para estilizar páginas web"
    ],
    correta: 1
  },
  {
    pergunta: "Qual é a sintaxe correta para declarar uma variável em JavaScript?",
    respostas: [
      "var myVar = 10;",
      "myVar = 10;",
      "variável myVar = 10;"
    ],
    correta: 0
  },
  {
    pergunta: "Qual método é usado para exibir uma mensagem de alerta na tela?",
    respostas: [
      "console.log('Hello, world!');",
      "alert('Hello, world!');",
      "document.write('Hello, world!');"
    ],
    correta: 1
  },
  {
    pergunta: "Qual operador é usado para concatenar strings em JavaScript?",
    respostas: [
      "+",
      "-",
      "*"
    ],
    correta: 0
  },
  {
    pergunta: "Qual é a função do operador ternário em JavaScript?",
    respostas: [
      "Executar uma ação se uma condição for verdadeira",
      "Executar uma ação se uma condição for falsa",
      "Substituir um loop for"
    ],
    correta: 0
  },
  {
    pergunta: "Qual método é usado para converter uma string em um número inteiro?",
    respostas: [
      "parseInt()",
      "parseFloat()",
      "toFixed()"
    ],
    correta: 0
  },
  {
    pergunta: "Qual é a diferença entre '==' e '===' em JavaScript?",
    respostas: [
      "'==' compara apenas o valor, enquanto '===' compara o valor e o tipo de dados",
      "'==' compara o valor e o tipo de dados, enquanto '===' compara apenas o valor",
      "Não há diferença, ambos fazem a mesma coisa"
    ],
    correta: 0
  },
  {
    pergunta: "Qual método é usado para adicionar um elemento ao final de um array?",
    respostas: [
      "push()",
      "pop()",
      "shift()"
    ],
    correta: 0
  },
  {
    pergunta: "Qual é a função do operador 'typeof' em JavaScript?",
    respostas: [
      "Verificar se uma variável está definida",
      "Retornar o tipo de dados de uma variável",
      "Converter uma variável para string"
    ],
    correta: 1
  },
  {
    pergunta: "Qual é a saída do seguinte código? \n\n```javascript\n const x = 10;\nif (x > 5) {\n  console.log('Maior que 5');\n} else {\n  console.log('Menor ou igual a 5');\n}\n```",
    respostas: [
      "Maior que 5",
      "Menor ou igual a 5",
      "Nenhuma das opções acima"
    ],
    correta: 0
  }
];

// Modal
const modalInicio = document.createElement('div');
modalInicio.setAttribute('id', 'modalInicio');
modalInicio.style.display = 'none'; // Inicialmente oculto
document.body.appendChild(modalInicio);

// Conteúdo do modal
const modalContent = document.createElement('div');
modalContent.setAttribute('class', 'modal-content1');
modalInicio.appendChild(modalContent);

// Mensagem
const p = document.createElement('p');
p.textContent = "Preste bastante atenção nas perguntas, pois você só terá uma única chance de marcar. Analise bem e marque a que você tem a convicção de que esteja correta!";
modalContent.appendChild(p);

// Botão para fechar o modal
const closeButton = document.createElement('button');
closeButton.textContent = 'Começar o Quiz';
closeButton.onclick = function() {
  modalInicio.style.display = 'none';
};
modalContent.appendChild(closeButton);

// Irá exibir o modal antes do início do quiz
window.onload = function() {
  modalInicio.style.display = 'block';
  // Usar o setTimeout para adicionar um pequeno atraso
  setTimeout(function() {
    window.scrollTo(0, 0);
  }, 100); 
};

const quiz = document.querySelector('#quiz')
const template = document.querySelector('template')

const corretas = new Set()
const totalDePerguntas = perguntas.length
const mostratTotal = document.querySelector('#acertos span')
mostratTotal.textContent = corretas.size + ' de ' + totalDePerguntas

let respondidas = 0;

for (const item of perguntas) {
  const quizItem = template.content.cloneNode(true)
  quizItem.querySelector('h3').textContent = item.pergunta

  const inputs = []

  for (let resposta of item.respostas) {
    const dt = quizItem.querySelector('dl dt').cloneNode(true)
    dt.querySelector('span').textContent = resposta
    const input = dt.querySelector('input')
    input.setAttribute('name', 'pergunta-' + perguntas.indexOf(item))
    input.value = item.respostas.indexOf(resposta)
    input.onchange = (event) => {
      const estaCorreta = event.target.value == item.correta
      corretas.delete(item)
      if (estaCorreta) {
        corretas.add(item)
      }
      mostratTotal.textContent = corretas.size + ' de ' + totalDePerguntas

      // Desativar todos os inputs para esta pergunta
      for (let inp of inputs) {
        inp.disabled = true
      }

      respondidas++;

      // Verificar se todas as perguntas foram respondidas
      if (respondidas === totalDePerguntas) {
        setTimeout(() => exibirMensagem(corretas.size / totalDePerguntas), 0)
      }
    }
    inputs.push(input)
    quizItem.querySelector('dl').appendChild(dt)
  }

  quizItem.querySelector('dl dt').remove()

  quiz.appendChild(quizItem)
}

function exibirMensagem(porcentagem) {
  let mensagem = ''
  if (porcentagem === 1) {
    mensagem = 'Parabéns, você arrebenta em JS'
  } else if (porcentagem >= 0.7) {
    mensagem = 'Você se saiu bem, continue estudando para chegar no 10!'
  } else if (porcentagem >= 0.5) {
    mensagem = 'Hmmmm, estude mais um pouco'
  } else {
    mensagem = 'Iiiiiihhh, reveja seus estudos e se esforce um pouco mais para aprender!'
  }

  // Exibir a mensagem na caixa modal no final do quiz
  const modal = document.getElementById('myModal')
  const span = document.getElementsByClassName('close')[0]
  const text = document.getElementById('modal-text')

  text.textContent = mensagem
  modal.style.display = 'block'

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none'
      location.reload()
    }
  }
}