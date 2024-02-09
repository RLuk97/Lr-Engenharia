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
  
  const quiz = document.querySelector('#quiz')
  const template = document.querySelector('template')
  
  const corretas = new Set()
  const totalDePerguntas = perguntas.length
  const mostratTotal = document.querySelector('#acertos span')
  mostratTotal.textContent = corretas.size + ' de ' + totalDePerguntas
  
  
  //Loop ou laço de repetição
  for (const item of perguntas) {
    const quizItem = template.content.cloneNode(true) // Clonar um nó cloneNode()
    quizItem.querySelector('h3').textContent = item.pergunta //Modifica o h3
  
    for (let resposta of item.respostas) {
      const dt = quizItem.querySelector('dl dt').cloneNode(true)
      dt.querySelector('span').textContent = resposta
      dt.querySelector('input').setAttribute('name','pergunta-' + perguntas.indexOf(item))
      dt.querySelector('input').value = item.respostas.indexOf(resposta)
      dt.querySelector('input').onchange = (event) => {
        const estaCorreta = event.target.value == item.correta // True
        
        corretas.delete(item) //deleta o primeiro item marcado correto ou incorreto
        if(estaCorreta){
          corretas.add(item)
        }
        mostratTotal.textContent = corretas.size + ' de ' + totalDePerguntas
      }
      quizItem.querySelector('dl').appendChild(dt)
    }
  
    quizItem.querySelector('dl dt').remove()
  
    quiz.appendChild(quizItem) //Coloca a pergunta na tela
  }