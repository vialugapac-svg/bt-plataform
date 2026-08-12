// ─── DADOS DOS COMPONENTES ───────────────────────────────────────────────────
const COR = {
  proposito:  { bg: "#4A4A4A", light: "#EBEBEB" },
  oque:       { bg: "#1B4F9B", light: "#E3EBF7" },
  como:       { bg: "#C85A1E", light: "#FAE9DF" },
  quem:       { bg: "#2E7D3C", light: "#E2F0E5" },
  quanto:     { bg: "#C4920A", light: "#FAF0D7" }
};

const comps = [
  { num:"01", nome:"Propósito", grupo:"Por Quê", cor: COR.proposito,
    negocio:{
      def:"A razão de existir do negócio — o porquê que orienta decisões, prioridades, investimentos e relações.",
      pergunta:"Qual é o propósito central deste negócio e ele está claro na prática?",
      refs:["O propósito do negócio está claramente definido","O propósito orienta decisões e prioridades","As pessoas envolvidas compreendem esse propósito","Há evidências de que o propósito gera impacto real","O propósito diferencia o negócio no mercado","O propósito permanece coerente com a realidade atual"]
    },
    atuacao_profissional:{
      def:"A razão que dá sentido à sua atuação profissional — o porquê que orienta escolhas, prioridades, desenvolvimento e forma de servir.",
      pergunta:"Qual é o meu propósito profissional e ele está claro na forma como atuo hoje?",
      refs:["Meu propósito profissional está claramente definido","Meu propósito orienta minhas decisões de carreira","Minha atuação diária é coerente com esse propósito","Consigo explicar com clareza por que realizo este trabalho","Há evidências de que minha atuação gera impacto real","Meu propósito continua coerente com o momento atual da minha carreira"]
    }},
  { num:"02", nome:"Problema / Oportunidade", grupo:"O Quê", cor: COR.oque,
    negocio:{
      def:"O problema real, necessidade ou oportunidade que justifica a existência do negócio e sustenta sua relevância.",
      pergunta:"Qual problema ou oportunidade real este negócio está atendendo hoje?",
      refs:["O problema atendido está claramente definido","Conhecemos quem vive esse problema","A solução responde à necessidade identificada","Monitoramos mudanças nessa necessidade","Existem oportunidades ainda não exploradas","O problema atendido está conectado ao propósito do negócio"]
    },
    atuacao_profissional:{
      def:"O problema, necessidade ou oportunidade que sua atuação profissional ajuda a resolver para clientes, organizações ou pessoas.",
      pergunta:"Qual problema ou oportunidade real minha atuação profissional está atendendo hoje?",
      refs:["Sei claramente qual problema profissional ajudo a resolver","Conheço quem precisa dessa solução","Minha atuação responde a uma necessidade real","Percebo mudanças nas demandas do meu mercado","Identifico oportunidades profissionais ainda não exploradas","O problema que resolvo está conectado ao meu propósito profissional"]
    }},
  { num:"03", nome:"Proposta de Valor", grupo:"O Quê", cor: COR.oque,
    negocio:{
      def:"O conjunto de benefícios que torna o negócio relevante, reconhecível e diferente de outras alternativas.",
      pergunta:"Qual valor este negócio entrega e por que alguém o escolheria?",
      refs:["A proposta de valor está clara","O diferencial é percebido pelos clientes","A entrega corresponde ao que é prometido","A proposta está alinhada ao propósito","A proposta é atualizada quando o contexto muda","O valor entregue gera transformação percebida"]
    },
    atuacao_profissional:{
      def:"O conjunto de benefícios, competências e resultados que torna sua atuação profissional relevante e diferenciada.",
      pergunta:"Qual valor eu entrego profissionalmente e por que alguém escolheria trabalhar comigo?",
      refs:["Consigo explicar claramente o valor que entrego","Meu diferencial profissional é percebido","Minhas entregas correspondem ao que prometo","Minha atuação é coerente com meu propósito","Atualizo minha proposta profissional conforme o mercado muda","Os resultados que gero são percebidos por quem atendo"]
    }},
  { num:"04", nome:"Processos", grupo:"Como", cor: COR.como,
    negocio:{
      def:"As formas repetíveis e organizadas pelas quais o negócio transforma intenção em resultado.",
      pergunta:"Como os processos deste negócio estão estruturados e funcionando hoje?",
      refs:["Os principais processos estão definidos","Os processos estão integrados","Há pouco retrabalho desnecessário","Os resultados são relativamente previsíveis","Os processos são acompanhados por indicadores","Os processos não dependem apenas de uma pessoa"]
    },
    atuacao_profissional:{
      def:"As rotinas, métodos e formas de trabalho que você utiliza para transformar conhecimento e esforço em resultados.",
      pergunta:"Como organizo e executo hoje meu trabalho profissional?",
      refs:["Minhas principais rotinas de trabalho estão definidas","Utilizo métodos consistentes para executar minhas entregas","Evito retrabalho e perda de tempo","Consigo manter qualidade de forma previsível","Acompanho meus resultados profissionais","Meu trabalho não depende apenas de improvisação"]
    }},
  { num:"05", nome:"Ativos", grupo:"Como", cor: COR.como,
    negocio:{
      def:"Os recursos, conhecimentos, competências, tecnologias e capacidades disponíveis para sustentar o negócio.",
      pergunta:"Quais ativos sustentam este negócio e como estão sendo utilizados?",
      refs:["Os principais ativos estão identificados","Os recursos disponíveis são bem utilizados","As competências necessárias estão disponíveis","Os ativos estão alinhados ao propósito","Há desenvolvimento contínuo de capacidades","Existem ativos subutilizados ou desperdiçados"]
    },
    atuacao_profissional:{
      def:"Os conhecimentos, competências, experiências, relacionamentos, ferramentas e recursos que sustentam sua atuação.",
      pergunta:"Quais ativos profissionais possuo e como estou utilizando cada um deles?",
      refs:["Conheço minhas principais competências e conhecimentos","Utilizo bem minha experiência profissional","Tenho as ferramentas necessárias para atuar","Meus ativos estão alinhados ao meu propósito profissional","Desenvolvo continuamente minhas capacidades","Existem talentos, conhecimentos ou contatos que ainda utilizo pouco"]
    }},
  { num:"06", nome:"Canais", grupo:"Como", cor: COR.como,
    negocio:{
      def:"Os meios usados pelo negócio para comunicar, alcançar, vender, atender e manter relacionamento.",
      pergunta:"Como este negócio alcança e se relaciona com as pessoas que atende?",
      refs:["Os canais alcançam o público desejado","A comunicação é clara e consistente","Os canais são adequados a cada público","A mensagem comunica a proposta de valor","A efetividade dos canais é acompanhada","Existem canais relevantes ainda não utilizados"]
    },
    atuacao_profissional:{
      def:"Os meios pelos quais você se apresenta, comunica seu valor, encontra oportunidades e mantém relacionamentos profissionais.",
      pergunta:"Como me apresento, encontro oportunidades e me relaciono profissionalmente?",
      refs:["Meus canais alcançam as pessoas certas","Minha comunicação profissional é clara","Utilizo canais adequados ao meu público","Consigo comunicar meu valor profissional","Acompanho quais canais geram oportunidades","Existem canais que ainda não utilizo e poderiam ampliar minha atuação"]
    }},
  { num:"07", nome:"Ecossistema", grupo:"Quem", cor: COR.quem,
    negocio:{
      def:"As parcerias, fornecedores, comunidades e relações externas que ampliam a capacidade e a sustentabilidade do negócio.",
      pergunta:"Quais relações externas sustentam ou ampliam este negócio?",
      refs:["As parcerias relevantes estão identificadas","Os relacionamentos externos são cultivados","As parcerias estão alinhadas ao propósito","Existe benefício mútuo nas relações","Há conexões estratégicas ainda ausentes","As parcerias geram resultados sustentáveis"]
    },
    atuacao_profissional:{
      def:"A rede de relacionamentos, parceiros, comunidades, mentores e instituições que influencia e amplia sua atuação profissional.",
      pergunta:"Quem compõe meu ecossistema profissional e como essas relações contribuem para minha atuação?",
      refs:["Conheço as pessoas e organizações estratégicas para minha carreira","Cultivo relacionamentos profissionais de forma intencional","Minha rede está alinhada aos meus objetivos","Contribuo genuinamente para as pessoas da minha rede","Há conexões importantes que ainda preciso desenvolver","Meu ecossistema gera oportunidades e aprendizado mútuo"]
    }},
  { num:"08", nome:"Clientes / Pessoas", grupo:"Quem", cor: COR.quem,
    negocio:{
      def:"As pessoas atendidas, influenciadas ou beneficiadas pela entrega do negócio.",
      pergunta:"Quem são as pessoas atendidas por este negócio e quanto conhecemos suas necessidades?",
      refs:["O público atendido está claramente definido","As necessidades dos clientes são conhecidas","Existe escuta e relacionamento contínuo","As pessoas percebem valor no atendimento","A evolução dos clientes é acompanhada","Existem públicos relevantes ainda não atendidos"]
    },
    atuacao_profissional:{
      def:"As pessoas, clientes, equipes ou organizações que recebem, utilizam ou são impactadas pelo seu trabalho.",
      pergunta:"Quem são as pessoas que atendo profissionalmente e quanto conheço suas necessidades?",
      refs:["Sei claramente quem se beneficia do meu trabalho","Conheço as necessidades das pessoas que atendo","Escuto ativamente clientes, colegas ou organizações","As pessoas percebem valor na minha atuação","Acompanho os resultados gerados para quem atendo","Existem pessoas ou públicos que eu poderia atender e ainda não alcanço"]
    }},
  { num:"09", nome:"Jornada", grupo:"Quem", cor: COR.quem,
    negocio:{
      def:"A experiência completa vivida pelas pessoas desde o primeiro contato com o negócio até o resultado percebido.",
      pergunta:"Como é a experiência de quem se relaciona com este negócio?",
      refs:["A jornada do cliente está compreendida","Os pontos de contato são coerentes","As pessoas encontram o que precisam","Existe continuidade após a entrega inicial","A experiência é acompanhada","Pontos de abandono ou frustração são conhecidos"]
    },
    atuacao_profissional:{
      def:"A experiência que as pessoas vivem ao entrar em contato, contratar, trabalhar ou se relacionar profissionalmente com você.",
      pergunta:"Como é a experiência de quem se relaciona com minha atuação profissional?",
      refs:["Compreendo a jornada de quem procura meu trabalho","Meus pontos de contato são claros e coerentes","As pessoas sabem o que esperar da minha atuação","Existe acompanhamento após a entrega inicial","Busco compreender a experiência de quem atendo","Conheço pontos de frustração ou abandono nessa jornada"]
    }},
  { num:"10", nome:"Custos / Externalidades", grupo:"Quanto", cor: COR.quanto,
    negocio:{
      def:"Os recursos consumidos para operar e os efeitos positivos ou negativos produzidos pelo negócio em seu entorno.",
      pergunta:"Quais custos sustentam este negócio e quais impactos indiretos ele produz?",
      refs:["Os principais custos são conhecidos","Os recursos são administrados com responsabilidade","Impactos negativos são identificados","Há ações para reduzir externalidades negativas","Gastos e investimentos estão alinhados às prioridades","Existe transparência sobre o uso dos recursos"]
    },
    atuacao_profissional:{
      def:"O tempo, energia, dinheiro e outros recursos consumidos por sua atuação, além dos efeitos que ela produz sobre você e ao seu redor.",
      pergunta:"Quais custos sustentam minha atuação profissional e quais impactos ela produz em mim e nos outros?",
      refs:["Conheço os principais custos da minha atuação","Administro bem meu tempo, energia e recursos financeiros","Reconheço impactos negativos gerados pela forma como trabalho","Busco reduzir desgastes e efeitos indesejados","Meus investimentos profissionais estão alinhados às prioridades","Existe equilíbrio sustentável entre trabalho, resultado e vida pessoal"]
    }},
  { num:"11", nome:"Receitas e Prosperidade", grupo:"Quanto", cor: COR.quanto,
    negocio:{
      def:"As receitas, a sustentabilidade, a continuidade e a prosperidade gerada pelo negócio para os envolvidos.",
      pergunta:"Quais resultados econômicos e formas de prosperidade este negócio gera hoje?",
      refs:["As fontes de receita estão claramente identificadas","O negócio possui sustentabilidade econômica","Os resultados permitem continuidade e evolução","A prosperidade alcança clientes, parceiros ou comunidade","Os resultados estão alinhados ao propósito e à proposta de valor","Os indicadores econômicos e de impacto são acompanhados"]
    },
    atuacao_profissional:{
      def:"Os ganhos financeiros, oportunidades, desenvolvimento, autonomia e prosperidade produzidos por sua atuação profissional.",
      pergunta:"Quais resultados econômicos e formas de prosperidade minha atuação profissional gera hoje?",
      refs:["Minhas fontes de renda profissional estão claramente identificadas","Minha atuação possui sustentabilidade econômica","Os resultados permitem continuidade e desenvolvimento","Minha atuação amplia minha autonomia e minhas oportunidades","A prosperidade gerada também beneficia pessoas ao meu redor","Acompanho meus resultados financeiros e profissionais"]
    }}
];

const postits = { ms:"#43A047", sa:"#7CB342", in:"#FDD835", fr:"#FB8C00", cr:"#E53935" };
const postNames = {
  ms:"Muito saudável — post-it verde escuro · escreva a observação antes de colar",
  sa:"Saudável — post-it verde claro · escreva a observação antes de colar",
  in:"Instável — post-it amarelo · escreva a observação antes de colar",
  fr:"Frágil — post-it laranja · escreva a observação antes de colar",
  cr:"Crítico — post-it vermelho · escreva a observação antes de colar"
};
const percValor = { ms:5, sa:4, in:3, fr:2, cr:1 };
const refValor = { sim:5, parcial:3, nao:1 };

function corDiagnostico(valor) {
  if (valor >= 4.5) return "#2E7D32";
  if (valor >= 3.5) return "#7CB342";
  if (valor >= 2.5) return "#F9A825";
  if (valor >= 1.5) return "#EF6C00";
  return "#C62828";
}
function classificacaoDiagnostico(valor) {
  if (valor >= 4.5) return "Muito saudável";
  if (valor >= 3.5) return "Saudável";
  if (valor >= 2.5) return "Instável";
  if (valor >= 1.5) return "Frágil";
  return "Crítico";
}
function pontuacaoComponente(i) {
  const r = respostas[i];
  if (!r || !r.refs) return 0;
  const valores = Object.values(r.refs).map(v => refValor[v] || 0);
  if (!valores.length) return 0;
  return valores.reduce((a,b) => a+b, 0) / valores.length;
}

let equipe = "";
let workshop = "";
let email = "";
let contextoTipo = "";
let contextoNome = "";
let setor = "";
let participanteId = "";
let concluidos = new Set();
let respostas = {};

function normalizarChave(valor) {
  return valor.toLowerCase().replace(/[^a-zA-Z0-9]/g, "_");
}

function selecionarContexto(btn, tipo) {
  contextoTipo = tipo;
  document.querySelectorAll(".context-option").forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");
  const campo = document.getElementById("contexto-input");
  campo.placeholder = tipo === "negocio"
    ? "Nome da empresa, escritório ou negócio"
    : "Como deseja identificar sua atuação profissional?";
}

function emailValido(valor) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
}

// ─── PARTICIPANTE E CONTEXTO ────────────────────────────────────────────────
async function confirmarEquipe() {
  const workshopVal = document.getElementById('workshop-input').value.trim().toUpperCase();
  const nomeVal = document.getElementById('nome-input').value.trim().replace(/\s+/g, ' ');
  const emailVal = document.getElementById('email-input').value.trim().toLowerCase();
  const contextoVal = document.getElementById('contexto-input').value.trim().replace(/\s+/g, ' ');
  const setorVal = document.getElementById('setor-input').value;
  const confirmado = document.getElementById('confirmacao-contexto').checked;

  if (workshopVal.length < 5) { alert("Informe o código válido da Imersão."); return; }
  if (nomeVal.length < 3) { alert("Informe seu nome completo."); return; }
  if (!emailValido(emailVal)) { alert("Informe um endereço de e-mail válido."); return; }
  if (!contextoTipo) { alert("Escolha o contexto que será analisado."); return; }
  if (contextoVal.length < 3) { alert("Informe o nome do contexto que será analisado."); return; }
  if (!setorVal) { alert("Selecione a Área de atuação da empresa ou atuação profissional analisada."); return; }
  if (!confirmado) { alert("Confirme o contexto antes de iniciar."); return; }
  if (!window._db || !window._dbRef || !window._dbGet || !window._dbSet || !window._dbUpdate) {
    alert("O sistema está indisponível no momento. Verifique sua internet e tente novamente.");
    return;
  }

  workshop = workshopVal;
  equipe = nomeVal;
  email = emailVal;
  contextoNome = contextoVal;
  setor = setorVal;
  participanteId = normalizarChave(workshop + ":" + email);
  localStorage.setItem("asis_session", JSON.stringify({ workshop, equipe, email, contextoTipo, contextoNome, setor, participanteId }));

  try {
    const base = `workshops/${workshop}/participantes/${participanteId}`;
    const snap = await window._dbGet(window._dbRef(window._db, base));
    if (snap.exists()) {
      const dados = snap.val();
      await window._dbSet(window._dbRef(window._db, base + "/setor"), setor);
      contextoTipo = dados.contextoTipo || contextoTipo;
      contextoNome = dados.contextoNome || contextoNome;
      respostas = (dados.asis && dados.asis.componentes) || {};
      concluidos = new Set(
        Object.keys(respostas)
          .filter(k => respostas[k] && respostas[k].concluido)
          .map(k => parseInt(k, 10))
      );
    } else {
      await window._dbSet(window._dbRef(window._db, base), {
        nome: equipe,
        email,
        contextoTipo,
        contextoNome,
        setor,
        status: "iniciado",
        progresso: 0,
        componentesConcluidos: 0,
        versaoAplicacao: "ASIS-2.0",
        iniciadoEm: new Date().toISOString(),
        ultimoAcessoEm: new Date().toISOString()
      });
    }
  } catch (e) {
    console.error(e);
    alert("Não foi possível conectar ao sistema. Verifique sua internet e tente novamente.");
    return;
  }

  const tipo = contextoTipo === "negocio" ? "Negócio analisado" : "Atuação analisada";
  document.getElementById('equipe-tag').innerHTML =
    `<span>${tipo}</span><strong>${contextoNome}</strong><span style="display:block;margin-top:4px">${equipe}</span>`;

  document.getElementById('screen-equipe').classList.remove('active');
  document.getElementById('screen-home').classList.add('active');
  renderList();
  atualizarProgresso();
}

// ─── PROGRESSO ───────────────────────────────────────────────────────────────
function atualizarProgresso() {
  const pct = Math.round((concluidos.size / 11) * 100);
  document.getElementById('prog-fill').style.width = pct + '%';
  document.getElementById('prog-text').textContent = concluidos.size + ' de 11 concluídos';
  const wrap = document.getElementById('result-btn-wrap');
  if (wrap) wrap.classList.toggle('show', concluidos.size === 11);
}

// ─── LISTA ───────────────────────────────────────────────────────────────────
function renderList() {
  const list = document.getElementById('comp-list');
  list.innerHTML = '';
  comps.forEach((c, i) => {
    const done = concluidos.has(i);
    const btn = document.createElement('button');
    btn.className = 'comp-btn';
    btn.style.borderColor = done ? c.cor.bg : '#e0ddd5';
    btn.style.background = done ? c.cor.light : '#fff';
    const conteudo = c[contextoTipo] || c.negocio;
    btn.innerHTML = `
      <div class="num-badge" style="background:${c.cor.bg}">${c.num}</div>
      <div class="comp-info">
        <div class="comp-nome">${c.nome}</div>
        <div class="comp-def">${c.grupo} · ${conteudo.def.substring(0,55)}…</div>
      </div>
      <div class="done-circle" style="background:${done ? c.cor.bg : '#e0ddd5'};border-color:${done ? c.cor.bg : '#e0ddd5'}"></div>
    `;
    btn.onclick = () => abrirFicha(i);
    list.appendChild(btn);
  });
}

// ─── FICHA ───────────────────────────────────────────────────────────────────
function abrirFicha(i) {
  const c = comps[i];
  const conteudo = c[contextoTipo] || c.negocio;
  document.getElementById('screen-home').classList.remove('active');
  document.getElementById('screen-ficha').classList.add('active');

  document.getElementById('ficha-content').innerHTML = `
    <div class="ficha-cabecalho" style="background:${c.cor.light}">
      <div class="eyebrow" style="color:${c.cor.bg}">Componente ${c.num} · ${c.grupo}</div>
      <h2 style="color:${c.cor.bg}">${c.nome}</h2>
    </div>
    <div class="bloco">
      <div class="bloco-label">O que é este componente</div>
      <div class="def-texto">${conteudo.def}</div>
    </div>
    <div class="bloco">
      <div class="bloco-label">AS-IS — como estamos hoje</div>
      <div class="pergunta" style="border-left-color:${c.cor.bg}">${conteudo.pergunta}</div>
      ${conteudo.refs.map((r,ri) => `
        <div class="ref-row">
          <span class="ref-text">${r}</span>
          <div class="pill-g">
            <button class="pl s ${respostas[i]?.refs?.[ri] === 'sim' ? 'on' : ''}" onclick="this.closest('.pill-g').querySelectorAll('.pl').forEach(p=>p.classList.remove('on'));this.classList.add('on');salvarRef(${i},${ri},'sim')">Sim</button>
            <button class="pl p ${respostas[i]?.refs?.[ri] === 'parcial' ? 'on' : ''}" onclick="this.closest('.pill-g').querySelectorAll('.pl').forEach(p=>p.classList.remove('on'));this.classList.add('on');salvarRef(${i},${ri},'parcial')">Parcial</button>
            <button class="pl n ${respostas[i]?.refs?.[ri] === 'nao' ? 'on' : ''}" onclick="this.closest('.pill-g').querySelectorAll('.pl').forEach(p=>p.classList.remove('on'));this.classList.add('on');salvarRef(${i},${ri},'nao')">Não</button>
          </div>
        </div>`).join('')}
      <div class="perc-wrap">
        <div class="perc-label">Sua percepção atual</div>
        <div class="perc-grid">
          <button class="pb ${respostas[i]?.percepcao === 'ms' ? 'ms' : ''}" onclick="selP(this,'ms',${i})">Muito saudável</button>
          <button class="pb ${respostas[i]?.percepcao === 'sa' ? 'sa' : ''}" onclick="selP(this,'sa',${i})">Saudável</button>
          <button class="pb ${respostas[i]?.percepcao === 'in' ? 'in' : ''}" onclick="selP(this,'in',${i})">Instável</button>
          <button class="pb ${respostas[i]?.percepcao === 'fr' ? 'fr' : ''}" onclick="selP(this,'fr',${i})">Frágil</button>
          <button class="pb ${respostas[i]?.percepcao === 'cr' ? 'cr' : ''}" onclick="selP(this,'cr',${i})">Crítico</button>
        </div>
      </div>
      <div class="obs-wrap">
        <div class="obs-label">Principal insight ou evidência </div>
        <textarea class="obs-textarea" id="obs-${i}" placeholder="Registre o principal insight, fato ou evidência deste componente.">${respostas[i]?.observacao || ''}</textarea>
        <div class="obs-hint">Registre fatos, práticas ou evidências que ajudem a compreender a situação atual.</div>
      </div>
      <div class="postit-hint">
        <div class="postit-dot" id="pdot" style="background:#e0ddd5;border-color:#e0ddd5"></div>
        <span id="ptxt" style="font-size:12px;color:#888">Selecione a percepção para ver a cor do post-it</span>
      </div>
      <div class="salvo-badge" id="salvo-badge">✓ Dados salvos em tempo real</div>
    </div>
    <button class="concluir-btn" style="background:${c.cor.bg}" onclick="concluir(${i})">✓ Concluído — voltar ao menu</button>
  `;
  window.scrollTo(0,0);
}

function selP(btn, cls, i) {
  btn.closest('.perc-grid').querySelectorAll('.pb').forEach(b => b.className = 'pb');
  btn.classList.add(cls);
  const dot = document.getElementById('pdot');
  const txt = document.getElementById('ptxt');
  if (dot) { dot.style.background = postits[cls]; dot.style.borderColor = postits[cls]; }
  if (txt) { txt.textContent = postNames[cls]; txt.style.color = '#444'; }
  salvarPercepcao(i, cls);
}

function salvarRef(compIdx, refIdx, valor) {
  if (!respostas[compIdx]) respostas[compIdx] = { refs: {} };
  if (!respostas[compIdx].refs) respostas[compIdx].refs = {};
  respostas[compIdx].refs[refIdx] = valor;
  salvarFirebase(compIdx);
}

function salvarPercepcao(compIdx, cls) {
  if (!respostas[compIdx]) respostas[compIdx] = {};
  respostas[compIdx].percepcao = cls;
  respostas[compIdx].percepcaoValor = percValor[cls];
  respostas[compIdx].nomeComponente = comps[compIdx].nome;
  respostas[compIdx].numComponente = comps[compIdx].num;
  salvarFirebase(compIdx);
}

function salvarFirebase(compIdx) {
  if (!window._db || !window._dbRef || !window._dbSet || !participanteId) {
    return Promise.reject(new Error("Firebase indisponível."));
  }
  const obs = document.getElementById('obs-' + compIdx);
  if (!respostas[compIdx]) respostas[compIdx] = {};
  respostas[compIdx].observacao = obs ? obs.value : "";
  respostas[compIdx].participante = equipe;
  respostas[compIdx].email = email;
  respostas[compIdx].contextoTipo = contextoTipo;
  respostas[compIdx].contextoNome = contextoNome;
  respostas[compIdx].nomeComponente = comps[compIdx].nome;
  respostas[compIdx].numComponente = comps[compIdx].num;
  respostas[compIdx].timestamp = new Date().toISOString();

  const badge = document.getElementById('salvo-badge');
  if (badge) {
    badge.textContent = "Salvando...";
    badge.classList.add('show');
  }
  const r = window._dbRef(window._db, `workshops/${workshop}/participantes/${participanteId}/asis/componentes/${compIdx}`);
  return window._dbSet(r, respostas[compIdx]).then(() => {
    if (badge) {
      badge.textContent = "✓ Dados salvos em tempo real";
      badge.classList.add('show');
      setTimeout(() => badge.classList.remove('show'), 2000);
    }
  }).catch(error => {
    if (badge) badge.textContent = "Não foi possível salvar.";
    throw error;
  });
}

async function concluir(i) {
  if (!respostas[i] || !respostas[i].refs || Object.keys(respostas[i].refs).length < (comps[i][contextoTipo] || comps[i].negocio).refs.length) {
    alert("Responda todas as referências antes de concluir.");
    return;
  }
  if (!respostas[i].percepcao) {
    alert("Selecione a percepção atual antes de concluir.");
    return;
  }
  const obs = document.getElementById('obs-' + i);
  const botaoConcluir = document.querySelector('.concluir-btn');
  if (obs) respostas[i].observacao = obs.value;
  respostas[i].concluido = true;
  if (botaoConcluir) {
    botaoConcluir.disabled = true;
    botaoConcluir.textContent = "Salvando...";
  }
  try {
    await salvarFirebase(i);
    concluidos.add(i);

    if (window._db && window._dbRef && window._dbUpdate && participanteId) {
      const base = `workshops/${workshop}/participantes/${participanteId}`;
      await window._dbUpdate(window._dbRef(window._db, base), {
        progresso: Math.round((concluidos.size / 11) * 100),
        componentesConcluidos: concluidos.size,
        ultimoAcessoEm: new Date().toISOString()
      });
    }
  } catch (error) {
    console.error(error);
    respostas[i].concluido = false;
    if (botaoConcluir) {
      botaoConcluir.disabled = false;
      botaoConcluir.textContent = "✓ Concluído — voltar ao menu";
    }
    alert("Não foi possível salvar a conclusão. Verifique sua internet e tente novamente.");
    return;
  }

  if (concluidos.size === 11) {
    abrirResultado();
  } else {
    voltarHome();
  }
}

function voltarHome() {
  document.getElementById('screen-ficha').classList.remove('active');
  document.getElementById('screen-home').classList.add('active');
  renderList();
  atualizarProgresso();
  window.scrollTo(0,0);
}


function atualizarEstadoResultado(texto, tipo = "") {
  const estado = document.getElementById("result-sync-status");
  if (!estado) return;
  estado.hidden = false;
  estado.textContent = texto;
  estado.className = `result-sync-status ${tipo}`.trim();
}

function abrirResultado() {
  if (concluidos.size < 11) {
    alert("Conclua os 11 componentes para visualizar o diagnóstico.");
    return;
  }

  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-resultado').classList.add('active');
  atualizarEstadoResultado("Salvando...");

  const itens = comps.map((c,i) => {
    const score = pontuacaoComponente(i);
    return { i, c, score, classe: classificacaoDiagnostico(score), cor: corDiagnostico(score) };
  });

  const media = itens.reduce((s,x) => s + x.score, 0) / itens.length;
  const fortes = [...itens].sort((a,b) => b.score-a.score).slice(0,3);
  const atencao = [...itens].sort((a,b) => a.score-b.score).slice(0,3);
  const maiorDestaque = [...itens].sort((a,b) => b.score-a.score)[0];
  const menorDestaque = [...itens].sort((a,b) => a.score-b.score)[0];
  const resumoExecutivo = media >= 4.5 ? {
    nivel: "Alta",
    texto: "O contexto analisado demonstra elevada consistência em seus componentes e uma base madura para sustentar sua evolução. As práticas atuais revelam integração, clareza e capacidade de gerar resultados de forma confiável. O próximo movimento é preservar os pontos fortes enquanto se identificam oportunidades de inovação e expansão."
  } : media >= 3.5 ? {
    nivel: "Boa",
    texto: "O diagnóstico indica uma estrutura saudável, com fundamentos bem estabelecidos e resultados positivos na maior parte dos componentes. Há condições favoráveis para avançar com segurança, embora alguns aspectos ainda possam ganhar consistência. O aperfeiçoamento desses pontos ampliará a solidez e a capacidade de evolução do contexto analisado."
  } : media >= 2.5 ? {
    nivel: "Intermediária",
    texto: "O contexto analisado apresenta fundamentos relevantes, mas ainda convive com oscilações entre seus componentes. Existem práticas que já contribuem para os resultados, ao lado de aspectos que precisam de maior integração e regularidade. O diagnóstico oferece uma base clara para priorizar melhorias e construir uma evolução mais consistente."
  } : media >= 1.5 ? {
    nivel: "Baixa",
    texto: "O diagnóstico revela uma estrutura ainda pouco consolidada, com fragilidades que limitam a previsibilidade dos resultados. Alguns elementos estão presentes, porém demandam maior clareza, organização e conexão entre si. Este cenário representa uma oportunidade concreta para estabelecer prioridades e fortalecer progressivamente o contexto analisado."
  } : {
    nivel: "Muito Baixa",
    texto: "O contexto analisado apresenta fundamentos iniciais e um nível elevado de vulnerabilidade entre seus componentes. A ausência de práticas consistentes reduz a capacidade de sustentar resultados e direcionar decisões. O diagnóstico torna visíveis os pontos essenciais que precisam ser estruturados para iniciar uma jornada segura de transformação."
  };
  const tipo = contextoTipo === "negocio" ? "Negócio analisado" : "Atuação analisada";

  document.getElementById('resultado-content').innerHTML = `
    <div class="context-tag">
      <span>${tipo}</span>
      <strong>${contextoNome}</strong>
      <span style="display:block;margin-top:4px">${equipe}</span>
    </div>
    <div class="result-summary">
      <div class="result-label">Maturidade Geral</div>
      <div class="result-score">${Math.round((media/5)*100)}%</div>
      <div class="result-level">Nível: ${classificacaoDiagnostico(media)}</div>
    </div>
    <section class="priority-card">
      <h2>Prioridades</h2>
      <ol class="priority-list">
        ${atencao.map(x => `<li><span>${x.c.nome}</span><strong>${x.score.toFixed(1)} de 5</strong></li>`).join("")}
      </ol>
    </section>
    <section class="result-section executive-section">
      <h2>Resumo Executivo</h2>
      <div class="executive-level">${resumoExecutivo.nivel}</div>
      <div class="executive-blocks">
        <div class="executive-block">
          <h3>✅ Pontos fortes</h3>
          <p>${fortes.map(x => x.c.nome).join(", ")} concentram os melhores resultados do diagnóstico atual.</p>
        </div>
        <div class="executive-block">
          <h3>⚠ Pontos de atenção</h3>
          <p>${atencao.map(x => x.c.nome).join(", ")} apresentam as menores pontuações e merecem atenção prioritária.</p>
        </div>
        <div class="executive-block">
          <h3>🎯 Próximo passo recomendado</h3>
          <p>Utilize os componentes prioritários como referência para interpretar as oportunidades de transformação na próxima etapa do Workshop.</p>
        </div>
      </div>
    </section>
    <section class="result-section">
      <h2>Principais Destaques</h2>
      <div class="highlights-grid">
        <div class="highlight-card highlight-strong">
          <span class="highlight-label">Componente com maior nota</span>
          <span class="highlight-value">${maiorDestaque.c.nome} · ${maiorDestaque.score.toFixed(1)}</span>
        </div>
        <div class="highlight-card highlight-critical">
          <span class="highlight-label">Componente com menor nota</span>
          <span class="highlight-value">${menorDestaque.c.nome} · ${menorDestaque.score.toFixed(1)}</span>
        </div>
        <div class="highlight-card">
          <span class="highlight-label">Média geral</span>
          <span class="highlight-value">${media.toFixed(1)} de 5</span>
        </div>
      </div>
    </section>
    <div class="result-legend">
      <div class="legend-item"><span class="legend-dot" style="background:#2E7D32"></span>Muito saudável</div>
      <div class="legend-item"><span class="legend-dot" style="background:#7CB342"></span>Saudável</div>
      <div class="legend-item"><span class="legend-dot" style="background:#F9A825"></span>Instável</div>
      <div class="legend-item"><span class="legend-dot" style="background:#EF6C00"></span>Frágil</div>
      <div class="legend-item"><span class="legend-dot" style="background:#C62828"></span>Crítico</div>
    </div>
    <section class="model-panel">
      <div class="panel-heading">
        <h2>Painel dos Componentes</h2>
        <p>Visão consolidada das 11 dimensões analisadas</p>
      </div>
      <div class="model-grid">
        ${itens.map(x => `
          <div class="model-card" style="background:${x.cor}">
            <div class="model-num">Componente ${x.c.num}</div>
            <div class="model-name">${x.c.nome}</div>
            <div class="model-score">${x.score.toFixed(1)} · ${x.classe}</div>
          </div>
        `).join("")}
      </div>
    </section>
    <div class="result-list result-strong"><h3>Componentes mais fortes</h3><ul>
      ${fortes.map(x => `<li><strong>${x.c.nome}</strong> — ${x.score.toFixed(1)} · ${x.classe}</li>`).join("")}
    </ul></div>
    <div class="result-list result-critical"><h3>Componentes que exigem maior atenção</h3><ul>
      ${atencao.map(x => `<li><strong>${x.c.nome}</strong> — ${x.score.toFixed(1)} · ${x.classe}</li>`).join("")}
    </ul></div>
    <div class="result-note">
      Este resultado representa o <strong>AS IS</strong>: a fotografia de como seu negócio ou sua atuação profissional funciona hoje. Ele ainda não define o futuro desejado nem apresenta um plano de transformação.
    </div>
    <section class="result-section">
      <h2>Próxima etapa da Jornada</h2>
      <p class="journey-text">Você concluiu o Diagnóstico AS-IS.\n\nNa próxima etapa do Workshop você aprenderá o FT Model.\n\nApós essa apresentação o Mentor liberará automaticamente a visualização do impacto das transformações sobre seu modelo de negócio.</p>
    </section>
    <button class="mentor-wait-btn" id="ft-view-access-button" type="button" disabled>SALVANDO...</button>
    <p class="ft-wait-message" id="ft-wait-message" hidden>Seu diagnóstico foi enviado ao mentor.\n\nPermaneça nesta tela.\n\nO botão será liberado automaticamente após a aula do FT Model.</p>
    <p class="final-message">Este diagnóstico representa apenas a fotografia do estado atual (AS-IS).\n\nDurante o Workshop você aprenderá a interpretar este resultado sob a ótica da Nova Economia utilizando o FT View e o Future of Transformation Model.</p>
  `;

  if (window._db && window._dbRef && window._dbUpdate && participanteId) {
    const pontosFortes = fortes.map(x => ({
      numero: x.c.num,
      nome: x.c.nome,
      pontuacao: Number(x.score.toFixed(2)),
      classificacao: x.classe
    }));
    const pontosAtencao = atencao.map(x => ({
      numero: x.c.num,
      nome: x.c.nome,
      pontuacao: Number(x.score.toFixed(2)),
      classificacao: x.classe
    }));
    const diagnostico = {
      setor,
      mediaGeral: Number(media.toFixed(2)),
      percentualGeral: Math.round((media/5)*100),
      classificacaoGeral: classificacaoDiagnostico(media),
      componentes: Object.fromEntries(itens.map(x => [x.c.num, {
        nome: x.c.nome,
        pontuacao: Number(x.score.toFixed(2)),
        classificacao: x.classe,
        insight: respostas[x.i]?.observacao || ""
      }])),
      respostas: Object.fromEntries(itens.map(x => [x.c.num, {
        referencias: respostas[x.i]?.refs || {},
        percepcao: respostas[x.i]?.percepcao || "",
        percepcaoValor: respostas[x.i]?.percepcaoValor || 0,
        insight: respostas[x.i]?.observacao || "",
        concluido: respostas[x.i]?.concluido === true,
        timestamp: respostas[x.i]?.timestamp || ""
      }])),
      resumoExecutivo: {
        nivel: resumoExecutivo.nivel,
        textoInstitucional: resumoExecutivo.texto,
        pontosFortes,
        pontosAtencao,
        proximoPasso: "Utilize os componentes prioritários como referência para interpretar as oportunidades de transformação na próxima etapa do Workshop."
      },
      destaques: {
        maiorPontuacao: pontosFortes[0],
        menorPontuacao: pontosAtencao[0]
      },
      relatorioFinal: {
        versao: "ASIS-2.1",
        html: document.getElementById('resultado-content').innerHTML,
        css: [...document.querySelectorAll('head style')].map(style => style.textContent).join("\n")
      },
      geradoEm: new Date().toISOString()
    };
    const base = `workshops/${workshop}/participantes/${participanteId}`;
    const atualizacoes = Object.fromEntries(
      Object.entries(diagnostico).map(([chave, valor]) => [`diagnostico/${chave}`, valor])
    );
    atualizacoes.status = "concluido";
    atualizacoes.ultimoAcessoEm = new Date().toISOString();

    window._dbUpdate(window._dbRef(window._db, base), atualizacoes)
      .then(() => {
        atualizarEstadoResultado("Diagnóstico enviado ao mentor.", "ready");
        const mensagemEspera = document.getElementById("ft-wait-message");
        const botaoAcesso = document.getElementById("ft-view-access-button");
        if (mensagemEspera) mensagemEspera.hidden = false;
        if (botaoAcesso) botaoAcesso.textContent = "Aguardando liberação.";
        observarLiberacaoFtView();
      })
      .catch(error => {
        console.error("Não foi possível persistir o relatório final.", error);
        atualizarEstadoResultado("Não foi possível enviar o diagnóstico ao mentor. Verifique sua internet e tente novamente.", "error");
        const botaoAcesso = document.getElementById("ft-view-access-button");
        if (botaoAcesso) botaoAcesso.textContent = "ENVIO NÃO CONCLUÍDO";
      });
  } else {
    atualizarEstadoResultado("Não foi possível enviar o diagnóstico ao mentor. Verifique sua internet e tente novamente.", "error");
  }
  window.scrollTo(0,0);
}

async function observarLiberacaoFtView() {
  const conteudo = document.getElementById("resultado-content");
  const botaoAcesso = document.getElementById("ft-view-access-button");
  if (!conteudo || !botaoAcesso || !window._db || !window._dbRef || !participanteId) return;
  const mensagemEspera = document.getElementById("ft-wait-message");

  if (typeof conteudo._cancelarFtView === "function") conteudo._cancelarFtView();

  try {
    const { onValue } = await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js");
    const referencia = window._dbRef(window._db, `workshops/${workshop}/participantes/${participanteId}/diagnostico/ftViewLiberado`);
    conteudo._cancelarFtView = onValue(referencia, snapshot => {
      const liberado = snapshot.val() === true;
      botaoAcesso.disabled = !liberado;
      botaoAcesso.textContent = liberado ? "Abrir FT View" : "Aguardando liberação.";
      botaoAcesso.classList.toggle("ft-view-ready", liberado);
      atualizarEstadoResultado(liberado ? "FT View liberado." : "Diagnóstico enviado ao mentor.", "ready");
      if (mensagemEspera) mensagemEspera.hidden = liberado;
    }, error => {
      console.error("Não foi possível consultar a liberação do FT View.", error);
      atualizarEstadoResultado("Não foi possível consultar a liberação. Verifique sua internet e tente novamente.", "error");
    });
  } catch (error) {
    console.error("Não foi possível iniciar a consulta do FT View.", error);
    atualizarEstadoResultado("Não foi possível consultar a liberação. Verifique sua internet e tente novamente.", "error");
  }
}

document.addEventListener("click", event => {
  const botaoAcesso = event.target.closest("#ft-view-access-button");
  if (!botaoAcesso || botaoAcesso.disabled) return;
  const params = new URLSearchParams({ workshop, participante: participanteId });
  const url = `./ft-view.html?${params.toString()}`;

  window.location.href = url;
});

function voltarHomeResultado() {
  document.getElementById('screen-resultado').classList.remove('active');
  document.getElementById('screen-home').classList.add('active');
  renderList();
  atualizarProgresso();
  window.scrollTo(0,0);
}

function restaurarSessaoLocal() {
  try {
    const raw = localStorage.getItem("asis_session");
    if (!raw) return;
    const sessao = JSON.parse(raw);
    if (!sessao || !sessao.contextoTipo) return;
    workshop = sessao.workshop || "";
    equipe = sessao.equipe || "";
    email = sessao.email || "";
    contextoTipo = sessao.contextoTipo || "";
    contextoNome = sessao.contextoNome || "";
    setor = sessao.setor || "";
    participanteId = sessao.participanteId || "";
    document.getElementById("workshop-input").value = workshop;
    document.getElementById("nome-input").value = equipe;
    document.getElementById("email-input").value = email;
    document.getElementById("contexto-input").value = contextoNome;
    document.getElementById("setor-input").value = setor;
    const btn = document.querySelector(`.context-option[data-context="${contextoTipo}"]`);
    if (btn) btn.classList.add("selected");
  } catch (e) {
    console.warn("Não foi possível restaurar a sessão local.", e);
  }
}
restaurarSessaoLocal();

const workshopQuery = new URLSearchParams(window.location.search).get("workshop");
if (workshopQuery) document.getElementById("workshop-input").value = workshopQuery.toUpperCase();

document.getElementById('contexto-input').addEventListener('keypress', e => {
  if (e.key === 'Enter') confirmarEquipe();
});
