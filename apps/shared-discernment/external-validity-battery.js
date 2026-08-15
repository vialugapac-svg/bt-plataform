const oppEngine = require('./opportunity-engine');
const entryEngine = require('./entry-engine');
const profileAdapter = require('./profile-adapter');
const compDict = require('./component-dictionary');

const canonicalOrder = ['01','02','03','04','05','06','07','08','09','10','11'];

const personas = [
  {
    id: 'persona-a-tradicional-fragil',
    narrative: 'Empresa pequena, dependente do proprietário, processos manuais, baixa diferenciação, pouca integração tecnológica, poucos parceiros e dificuldade em gerar novas receitas.',
    expectedHumanAssessment: {
      tensions: ['04','05','09','10','11','02','03'],
      businessOpportunity: null,
      captureCapacity: 'LOW',
      opportunityOrigin: 'UNDETERMINED',
      expectedEntryDoor: 'PREPARAR',
      blockchainRole: 'EXPLORATORY',
      reasoning: 'Muitas fragilidades operacionais e baixa capacidade de capturar qualquer nova oportunidade; nenhum negócio dominante claro.'
    },
    scoreMap: {
      '01': 2,
      '02': 2,
      '03': 2,
      '04': 1,
      '05': 1,
      '06': 2,
      '07': 2,
      '08': 2,
      '09': 1,
      '10': 1,
      '11': 1
    },
    rationale: {
      '01': 'propósito pouco claro e dependente do dono',
      '02': 'problema e oportunidade não são estruturados',
      '03': 'proposta pouco diferenciada',
      '04': 'processos manuais e frágeis',
      '05': 'ativos baixos e pouco aproveitados',
      '06': 'canais e acesso limitados',
      '07': 'ecossistema precário',
      '08': 'clientes e relacionamento pouco escaláveis',
      '09': 'jornada pouco estruturada',
      '10': 'custos externos e fricção alta',
      '11': 'receitas pouco diversificadas'
    }
  },
  {
    id: 'persona-b-bom-negocio-operacao-limitante',
    narrative: 'Cliente e reputação fortes, proposta relativamente clara e mercado acessível, mas processos, jornada e capacidade operacional dificultam o crescimento.',
    expectedHumanAssessment: {
      tensions: ['04','09','10'],
      businessOpportunity: 'ampliar serviços ou melhorar oferta',
      captureCapacity: 'MEDIUM',
      opportunityOrigin: 'INTERNAL',
      expectedEntryDoor: 'EXPERIMENTAR',
      blockchainRole: 'EXPLORATORY',
      reasoning: 'Há uma direção de negócio plausível, mas a operação ainda precisa ser validada para crescer sem quebrar o modelo.'
    },
    scoreMap: {
      '01': 4,
      '02': 4,
      '03': 3,
      '04': 2,
      '05': 3,
      '06': 4,
      '07': 4,
      '08': 4,
      '09': 2,
      '10': 2,
      '11': 3
    },
    rationale: {
      '01': 'identidade e propósito já claros',
      '02': 'problema e oportunidade reconhecidos',
      '03': 'proposta ainda não totalmente escalável',
      '04': 'processos limitam crescimento',
      '05': 'ativos razoáveis, mas sem escala',
      '06': 'canais fortes',
      '07': 'ecossistema bom',
      '08': 'clientes bem segmentados',
      '09': 'jornada exige melhoria regional',
      '10': 'custos e externalidades precisam atenção',
      '11': 'receita ainda pouco amadurecida'
    }
  },
  {
    id: 'persona-c-operacao-forte-captura-valor-fraca',
    narrative: 'Empresa organizada, processos maduros, boa equipe, clientes e parceiros, mas proposta comercial e/ou novas receitas ainda pouco desenvolvidas.',
    expectedHumanAssessment: {
      tensions: ['03','11'],
      businessOpportunity: 'desenvolvernova oferta ou nova receita',
      captureCapacity: 'HIGH',
      opportunityOrigin: 'INTERNAL',
      expectedEntryDoor: 'EXPERIMENTAR',
      blockchainRole: 'EXPLORATORY',
      reasoning: 'A estrutura operacional é forte, mas a captura de valor e a proposta comercial ainda não estão na mesma maturidade.'
    },
    scoreMap: {
      '01': 4,
      '02': 4,
      '03': 2,
      '04': 5,
      '05': 4,
      '06': 4,
      '07': 4,
      '08': 4,
      '09': 4,
      '10': 3,
      '11': 2
    },
    rationale: {
      '01': 'propósito claro',
      '02': 'problema e oportunidade reconhecidos',
      '03': 'proposta de valor ainda fraca',
      '04': 'processos fortes',
      '05': 'ativos sólidos',
      '06': 'canais e distribuição relevantes',
      '07': 'ecossistema bom',
      '08': 'clientes e time com relevância',
      '09': 'jornada razoável',
      '10': 'custos controláveis',
      '11': 'receita pouco diferenciada'
    }
  },
  {
    id: 'persona-d-modelo-forte-diante-da-nova-infraestrutura',
    narrative: 'Empresa muito bem estruturada: propósito claro, proposta forte, processos maduros, ativos e canais relevantes, ecossistema e relacionamento robustos, receitas saudáveis; não há problema interno dominante, mas a mudança de infraestrutura pode abrir novos espaços.',
    expectedHumanAssessment: {
      tensions: [],
      businessOpportunity: 'explorar o espaço criado pela transformação externa de infraestrutura',
      captureCapacity: 'HIGH',
      opportunityOrigin: 'EXTERNAL',
      expectedEntryDoor: 'EXPLORAR',
      blockchainRole: 'PLAUSIBLE',
      reasoning: 'A empresa está forte e sem internal gaps relevantes; a principal questão é se a transformação externa cria uma oportunidade que vale explorar.'
    },
    scoreMap: {
      '01': 5,
      '02': 4,
      '03': 5,
      '04': 5,
      '05': 4,
      '06': 4,
      '07': 4,
      '08': 5,
      '09': 4,
      '10': 4,
      '11': 4
    },
    rationale: {
      '01': 'propósito e direção muito fortes',
      '02': 'sinal de oportunidade já existente, mas sem problema dominante',
      '03': 'proposta forte',
      '04': 'processos maduros',
      '05': 'ativos bons',
      '06': 'canais relevantes',
      '07': 'ecossistema robusto',
      '08': 'clientes e pessoas fortes',
      '09': 'jornada madura',
      '10': 'custos e externalidades controlados',
      '11': 'receitas saudáveis'
    }
  },
  {
    id: 'persona-e-oportunidade-interna-mas-sem-capacidade',
    narrative: 'Empresa percebe demanda e possíveis novos serviços, mas possui processos frágeis, ativos insuficientes, baixa integração e pouca capacidade de execução.',
    expectedHumanAssessment: {
      tensions: ['02','03','04','05','09','10'],
      businessOpportunity: 'há uma direção plausível de novas ofertas',
      captureCapacity: 'LOW',
      opportunityOrigin: 'INTERNAL',
      expectedEntryDoor: 'PREPARAR',
      blockchainRole: 'EXPLORATORY',
      reasoning: 'Há demanda e possibilidade real, mas a capacidade operacional ainda é insuficiente para capturá-la com segurança.'
    },
    scoreMap: {
      '01': 3,
      '02': 4,
      '03': 4,
      '04': 1,
      '05': 2,
      '06': 3,
      '07': 2,
      '08': 3,
      '09': 2,
      '10': 2,
      '11': 3
    },
    rationale: {
      '01': 'propósito ainda pouco estruturado',
      '02': 'oportunidade reconhecida',
      '03': 'proposta ainda não pronta',
      '04': 'processos frágeis',
      '05': 'ativos insuficientes',
      '06': 'canais medianos',
      '07': 'ecossistema fraco',
      '08': 'clientes e pessoas ainda pouco alinhados',
      '09': 'jornada pouco madura',
      '10': 'custos e riscos altos',
      '11': 'receita ainda não consolidada'
    }
  },
  {
    id: 'persona-f-transformacao-mista',
    narrative: 'Empresa forte em vários componentes e com capacidade de execução. Há simultaneamente uma tensão legítima interna e uma transformação externa de infraestrutura capaz de ampliar a oportunidade.',
    expectedHumanAssessment: {
      tensions: ['10'],
      businessOpportunity: 'oportunidade interna real ampliada por uma transformação externa',
      captureCapacity: 'HIGH',
      opportunityOrigin: 'MIXED',
      expectedEntryDoor: 'EXPERIMENTAR',
      blockchainRole: 'PLAUSIBLE',
      reasoning: 'Existem uma oportunidade interna relevante e uma mudança externa que pode ampliar o espaço, sem ser uma mera solução tecnológica.'
    },
    scoreMap: {
      '01': 4,
      '02': 4,
      '03': 4,
      '04': 5,
      '05': 4,
      '06': 5,
      '07': 5,
      '08': 5,
      '09': 4,
      '10': 2,
      '11': 5
    },
    rationale: {
      '01': 'estratégia clara',
      '02': 'problema e oportunidade bem reconhecidos',
      '03': 'proposta forte',
      '04': 'processos fortes',
      '05': 'ativos e capacidades relevantes',
      '06': 'canais muito fortes',
      '07': 'ecossistema forte',
      '08': 'clientes bem conectados',
      '09': 'jornada madura',
      '10': 'uma tensão específica em custos ainda existe',
      '11': 'receita forte'
    }
  }
];

function makeDiagnostico(scores) {
  const componentes = {};
  canonicalOrder.forEach(k => {
    componentes[k] = { pontuacao: scores[k] };
  });
  return { componentes };
}

function summarizeOutput(result) {
  return {
    tensions: (result.tensions || []).map(t => ({ componentNum: t.componentNum, value: t.value })),
    businessOpportunity: result.businessOpportunity || null,
    businessOpportunityEvidence: (result.businessOpportunityEvidence || []).map(e => ({ componentNum: e.componentNum, value: e.value, reasonCode: e.reasonCode })),
    captureCapacity: result.captureCapacity || null,
    leverages: (result.leverages || []).map(l => ({ componentNum: l.componentNum, value: l.value })),
    attentionPoints: (result.attentionPoints || []).map(a => ({ componentNum: a.componentNum, value: a.value })),
    opportunityOrigin: result.opportunityOrigin || 'UNDETERMINED',
    entryDoor: result.entryDoor || null,
    entryReasons: result.entryReasons || [],
    blockchainPossibilities: (result.blockchainPossibilities || []).slice(0, 3).map(p => ({ id: p.id, name: p.name, confidence: p.confidence }))
  };
}

function comparePersona(persona, motorResult) {
  const exp = persona.expectedHumanAssessment;
  const alignment = {
    tensionAlignment: 'PASS',
    businessOpportunityAlignment: 'PASS',
    captureCapacityAlignment: 'PASS',
    opportunityOriginAlignment: 'PASS',
    entryDoorAlignment: 'PASS',
    blockchainLayerAlignment: 'PASS'
  };

  if (exp.tensions && exp.tensions.length && !(motorResult.tensions || []).length) {
    alignment.tensionAlignment = 'PARTIAL';
  }
  if (exp.businessOpportunity && exp.businessOpportunity !== 'null' && !motorResult.businessOpportunity) {
    alignment.businessOpportunityAlignment = 'PARTIAL';
  }
  if (exp.captureCapacity === 'LOW' && (motorResult.captureCapacity && motorResult.captureCapacity.leverPower > 0)) {
    alignment.captureCapacityAlignment = 'PARTIAL';
  }
  if (exp.opportunityOrigin === 'EXTERNAL' && motorResult.opportunityOrigin !== 'EXTERNAL') {
    alignment.opportunityOriginAlignment = 'PARTIAL';
  }
  if (exp.expectedEntryDoor === 'PREPARAR' && motorResult.entryDoor !== 'PREPARAR') {
    alignment.entryDoorAlignment = 'PARTIAL';
  }
  if (exp.blockchainRole === 'NONE' && (motorResult.blockchainPossibilities || []).length > 0) {
    alignment.blockchainLayerAlignment = 'PARTIAL';
  }

  return alignment;
}

function runBattery() {
  const results = personas.map(persona => {
    const diagnostico = makeDiagnostico(persona.scoreMap);
    const profile = profileAdapter.adaptProfile('Empresário');
    const opRes = oppEngine.evaluateOpportunities(diagnostico, 'escritorio_contabil', profile);
    const entry = entryEngine.decideEntryDoor(opRes, diagnostico);
    const motorResult = Object.assign({}, summarizeOutput(opRes), { entryDoor: entry.entryDoor, entryReasons: entry.entryReasons || [], opportunityOrigin: opRes.opportunityOrigin || 'UNDETERMINED', externalOpportunity: opRes.externalOpportunity || false });
    return {
      personaId: persona.id,
      narrative: persona.narrative,
      expectedHumanAssessment: persona.expectedHumanAssessment,
      asIs: persona.scoreMap,
      rationale: persona.rationale,
      motorResult,
      alignment: comparePersona(persona, motorResult)
    };
  });

  return results;
}

if (require.main === module) {
  const battery = runBattery();
  console.log(JSON.stringify(battery, null, 2));
}

module.exports = { personas, runBattery, makeDiagnostico };
