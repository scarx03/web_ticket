# web_ticket

Protótipo de sistema de atendimento por senhas desenvolvido para a disciplina de Front-end e FrameWorks

## Objetivo

Simular o fluxo de atendimento por senhas, com:

- Totem de emissão de senhas:
  - SP: Senha prioritária
  - SG: Senha geral
  - SE: Senha para exames
- Guichê do atendente para chamar a próxima senha
- Painel com as últimas senhas chamadas

O foco do projeto é o **frontend** (HTML, CSS e JavaScript).  
Não há integração com backend: os dados da sessão são mantidos em variáveis em memória, conforme permitido no enunciado.

## Linguagens usadas

- HTML5
- CSS3
- JavaScript (vanilla, sem frameworks)

## Funcionalidades

- Emissão de senha por tipo (SP, SG, SE)
- Filas separadas por tipo
- Regra de prioridade:
  - ciclo de 4 passos com preferência para SP
  - SE/SG são chamadas alternadamente quando não há SP
- Sorteio automático de guichê para cada senha chamada
- Painel exibindo as últimas 5 senhas chamadas

## Como executar

1. Baixe este repositorio
2. Abra o arquivo `index.html` em um navegador moderno
3. Use os botões do totem para emitir senhas.
4. Use o botão de guichê para chamar a próxima senha e ver o painel sendo atualizado.

## Limitações e futuras melhorias

- Os dados são armazenados apenas em memória. Ao recarregar a página, tudo é perdido.
- Não há autenticação de atendentes.
- Não há integração com backend ou banco de dados.

Possíveis evoluções:

- Persistência em banco de dados (SQLite, MySQL, etc.)
- API backend para controlar emissão e chamada
- Painel em tempo real usando WebSockets
- Layout responsivo e melhorias de acessibilidade
