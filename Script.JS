// Filas separadas por tipo de senha
let filaSP = [];
let filaSG = [];
let filaSE = [];
let guichesDisponiveis = ['Guichê 1', 'Guichê 2', 'Guichê 3'];
// Histórico das últimas senhas chamadas
let historicoChamadas = [];

// Contador por tipo de senha(Gera codigo sequencial)
let contadorSP = 0;
let contadorSG = 0;
let contadorSE = 0;

// controle de prioridade de chamada
let passoCiclo = 0;

function guichealeatorio() {
    const dispo = guichesDisponiveis[Math.floor(Math.random() * guichesDisponiveis.length)];
    return dispo;
}

// formatação da senha para AAAAMMDD-TIPO-SEQ 
function gerarCodigoSenha(tipo) {
  const agora = new Date();
  const ano = agora.getFullYear();
  const mes = String(agora.getMonth() + 1).padStart(2, '0');
  const dia = String(agora.getDate()).padStart(2, '0');

  let seq;

  if (tipo === 'SP') {
    contadorSP++;
    seq = String(contadorSP).padStart(3, '0');
  } else if (tipo === 'SG') {
    contadorSG++;
    seq = String(contadorSG).padStart(3, '0');
  } else if (tipo === 'SE') {
    contadorSE++;
    seq = String(contadorSE).padStart(3, '0');
  }

  return `${ano}${mes}${dia}-${tipo}-${seq}`;
}

// Função chamada pelos botões do totem
function emitirSenha(tipo) {
  const codigo = gerarCodigoSenha(tipo);

  const senha = {
    tipo: tipo,
    codigo: codigo,
    dataHoraEmissao: new Date()
  };

  // Colocar na fila
  if (tipo === 'SP') {
    filaSP.push(senha);
  } else if (tipo === 'SG') {
    filaSG.push(senha);
  } else if (tipo === 'SE') {
    filaSE.push(senha);
  }

  const ultimaSenhaEmitida = document.getElementById('ultimaSenhaEmitida');
  ultimaSenhaEmitida.textContent = `${senha.codigo}`;

  console.log('Fila SP:', filaSP);
  console.log('Fila SG:', filaSG);
  console.log('Fila SE:', filaSE);
}

// Função para chamar a próxima senha
function chamarProximaSenha() {
  const guiche = guichealeatorio();

  let senhaSelecionada = null;

  for (let i = 0; i < 4; i++) {
    const passo = passoCiclo % 4;

    if (passo === 0 || passo === 2) {
      if (filaSP.length > 0) {
        senhaSelecionada = filaSP.shift();
        passoCiclo++;
        break;
      } else {
        passoCiclo++;
        continue;
      }
    } else {
      if (filaSE.length > 0) {
        senhaSelecionada = filaSE.shift();
        passoCiclo++;
        break;
      } else if (filaSG.length > 0) {
        senhaSelecionada = filaSG.shift();
        passoCiclo++;
        break;
      } else {
        passoCiclo++;
        continue;
      }
    }
  }

  if (!senhaSelecionada) {
    alert('Não há senhas na fila para chamar.');
    return;
  }

 //atualiza senha que esta em atendimento
  const senhaEmAtendimento = document.getElementById('senhaEmAtendimento');
  senhaEmAtendimento.textContent = `${senhaSelecionada.codigo} - ${guiche}`;

  // Adiciona ao histórico
  historicoChamadas.unshift({
    codigo: senhaSelecionada.codigo,
    guiche: guiche,
    dataHoraChamada: new Date()
  });

  if (historicoChamadas.length > 5) {
    historicoChamadas.pop();
  }

  atualizarPainel();
}

function atualizarPainel() {
  const listaPainel = document.getElementById('listaPainel');
  listaPainel.innerHTML = '';

  historicoChamadas.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.codigo} - ${item.guiche}`;
    listaPainel.appendChild(li);
  });
}
