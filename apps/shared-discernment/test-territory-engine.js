const assert = require('assert');
const componentDictionary = require('./component-dictionary');
const { buildTerritoryContext } = require('./territory-context');
const { evaluateTerritories } = require('./territory-engine');

const CANONICAL = {
  '01': 'Propósito',
  '02': 'Problema / Oportunidade',
  '03': 'Proposta de Valor',
  '04': 'Processos',
  '05': 'Ativos',
  '06': 'Canais',
  '07': 'Ecossistema',
  '08': 'Clientes / Pessoas',
  '09': 'Jornada',
  '10': 'Custos e Externalidades Negativas',
  '11': 'Receitas e Impactos Positivos'
};

function validateDictionaryIntegrity() {
  const keys = Object.keys(componentDictionary.components).sort();
  assert.deepStrictEqual(keys, Object.keys(CANONICAL).sort(), 'Canonical component IDs changed.');
  keys.forEach(key => {
    assert.strictEqual(componentDictionary.components[key].shortName, CANONICAL[key], `Canonical name changed for ${key}.`);
  });
}

function makeScores(defaultScore, overrides) {
  return Object.keys(CANONICAL).reduce((acc, key) => {
    acc[key] = Object.prototype.hasOwnProperty.call(overrides || {}, key) ? overrides[key] : defaultScore;
    return acc;
  }, {});
}

function makeParticipant(id, config) {
  const scores = config.scores || makeScores(3, {});
  const insights = config.insights || {};
  const perceptions = config.perceptions || {};

  const diagnostico = {
    setor: config.areaLabel || 'Empresário',
    componentes: {},
    respostas: {}
  };

  const asisComponentes = {};

  Object.keys(CANONICAL).forEach((componentId, index) => {
    diagnostico.componentes[componentId] = {
      nome: CANONICAL[componentId],
      pontuacao: scores[componentId],
      insight: insights[componentId] || ''
    };
    diagnostico.respostas[componentId] = {
      insight: insights[componentId] || '',
      percepcao: perceptions[componentId] || '',
      percepcaoValor: 0,
      referencias: {}
    };
    asisComponentes[String(index)] = {
      numComponente: componentId,
      nomeComponente: CANONICAL[componentId],
      observacao: insights[componentId] || '',
      percepcao: perceptions[componentId] || '',
      refs: {}
    };
  });

  return {
    id,
    participante: id,
    diagnostico,
    asis: {
      componentes: asisComponentes
    }
  };
}

const baseScenarios = [
  {
    id: 'case-1-fraco-evidencia-forte',
    title: 'Componente fraco + evidencia forte',
    participant: makeParticipant('case-1', {
      scores: makeScores(4, { '04': 2, '09': 3, '10': 3 }),
      insights: {
        '04': 'Os pagamentos chegam por canais diferentes, a conciliacao e manual, existe retrabalho e varias autorizacoes para concluir o processo.',
        '09': 'O cliente espera a confirmacao do pagamento para seguir.'
      }
    }),
    assert(result) {
      assert.strictEqual(result.recommendedTerritory.componentId, '04');
      assert.strictEqual(result.territoryType, 'RECOMENDADO');
      assert.ok(['ALTA', 'MODERADA'].includes(result.confidenceLevel));
    }
  },
  {
    id: 'case-2-saudavel-evidencia-forte',
    title: 'Componente saudavel + evidencia forte',
    participant: makeParticipant('case-2', {
      scores: makeScores(4, { '04': 2, '07': 4, '10': 2 }),
      insights: {
        '07': 'Temos parceiros, fornecedores e validacoes compartilhadas. Existem pagamentos internacionais entre empresas e conciliacao entre varias partes.',
        '04': 'Ainda precisamos organizar rotinas internas.'
      }
    }),
    assert(result) {
      assert.strictEqual(result.recommendedTerritory.componentId, '04');
      assert.strictEqual(result.territoryType, 'RECOMENDADO');
    }
  },
  {
    id: 'case-3-fraco-evidencia-insuficiente',
    title: 'Componente fraco + evidencia insuficiente',
    participant: makeParticipant('case-3', {
      scores: makeScores(4, { '05': 2 }),
      insights: {
        '05': 'Os recursos disponiveis ainda estao dispersos e pouco organizados.'
      }
    }),
    assert(result) {
      assert.strictEqual(result.recommendedTerritory.componentId, '05');
      assert.strictEqual(result.territoryType, 'RECOMENDADO');
      assert.strictEqual(result.recommendedTerritory.textualEvidenceRaw, 0);
    }
  },
  {
    id: 'case-4-empresa-saudavel',
    title: 'Empresa saudavel em todos os componentes',
    participant: makeParticipant('case-4', {
      scores: makeScores(4, { '01': 5, '03': 5, '04': 5, '08': 5 }),
      insights: {
        '06': 'Recebemos de clientes em outro pais, ha taxas de pagamento e intermediarios para concluir cada recebimento.',
        '07': 'Alguns parceiros apoiam a distribuicao, mas o ponto mais sensivel ainda esta nos recebimentos.'
      }
    }),
    assert(result) {
      assert.strictEqual(result.recommendedTerritory.componentId, '07');
      assert.strictEqual(result.territoryType, 'RECOMENDADO');
    }
  },
  {
    id: 'case-5-empate',
    title: 'Empate entre dois territorios',
    participant: makeParticipant('case-5', {
      scores: makeScores(4, { '04': 2, '07': 2 }),
      insights: {
        '04': 'Os pagamentos dependem de conciliacao manual, autorizacoes e retrabalho.',
        '07': 'Parceiros e fornecedores fazem validacoes compartilhadas, repasses entre varias empresas, registros comuns e operacoes com outro pais.'
      }
    }),
    assert(result) {
      assert.strictEqual(result.recommendedTerritory.componentId, '04');
      assert.ok(result.alternativeTerritory, 'Expected alternative territory in tie scenario.');
      assert.strictEqual(result.alternativeTerritory.componentId, '07');
    }
  },
  {
    id: 'case-6-sem-aplicacao-especifica',
    title: 'Nenhuma aplicacao especifica sustentada pelas evidencias',
    participant: makeParticipant('case-6', {
      scores: makeScores(3, { '01': 4, '02': 4, '03': 4 }),
      insights: {
        '01': 'O time quer evoluir com mais clareza.',
        '04': 'Ainda buscamos mais consistencia interna.',
        '07': 'As relacoes externas sao importantes, mas sem um caso concreto definido.'
      }
    }),
    assert(result) {
      assert.strictEqual(result.recommendedTerritory.componentId, '04');
      assert.strictEqual(result.territoryType, 'RECOMENDADO');
      assert.strictEqual(result.confidenceLevel, 'MODERADA');
      assert.strictEqual(result.evidenceUsed.length, 0);
    }
  }
];

const recalibrationScenarios = [
  {
    id: 'case-a-estruturado-vazio',
    title: 'A) Respostas iguais + texto vazio',
    participant: makeParticipant('case-a', {
      scores: makeScores(4, { '04': 2, '07': 2 }),
      insights: {}
    }),
    assert(result) {
      assert.strictEqual(result.recommendedTerritory.componentId, '04');
      assert.strictEqual(result.recommendedTerritory.textualEvidenceRaw, 0);
      assert.strictEqual(result.territoryType, 'RECOMENDADO');
    }
  },
  {
    id: 'case-b-estruturado-superficial',
    title: 'B) Respostas iguais + texto superficial',
    participant: makeParticipant('case-b', {
      scores: makeScores(4, { '04': 2, '07': 2 }),
      insights: {
        '04': 'precisamos melhorar',
        '07': 'precisamos melhorar'
      }
    }),
    assert(result, outputsById) {
      const base = outputsById['case-a-estruturado-vazio'].output;
      assert.strictEqual(result.recommendedTerritory.componentId, base.recommendedTerritory.componentId);
      assert.strictEqual(result.recommendedTerritory.priorityScore, base.recommendedTerritory.priorityScore);
      assert.strictEqual(result.recommendedTerritory.textualEvidenceRaw, 0);
    }
  },
  {
    id: 'case-c-estruturado-concreto',
    title: 'C) Respostas iguais + evidência concreta',
    participant: makeParticipant('case-c', {
      scores: makeScores(4, { '04': 2, '07': 2 }),
      insights: {
        '07': 'Parceiros e fornecedores fazem validacoes compartilhadas, repasses entre varias empresas e operacoes com outro pais.'
      }
    }),
    assert(result) {
      assert.strictEqual(result.recommendedTerritory.componentId, '07');
      assert.ok(result.recommendedTerritory.textualEvidenceCapped >= 1);
    }
  },
  {
    id: 'case-d-saudavel-texto-extremo',
    title: 'D) Componente saudável + texto extremamente aderente',
    participant: makeParticipant('case-d', {
      scores: makeScores(4, { '03': 5, '04': 2 }),
      insights: {
        '03': 'Pagamentos, recebimentos, conciliacao, autorizacoes, registros, identidade, ativos e propriedade com parceiros em operacao internacional geram retrabalho e intermediarios.'
      }
    }),
    assert(result) {
      assert.strictEqual(result.recommendedTerritory.componentId, '04');
      const component03 = result.componentAnalyses.find(item => item.componentId === '03');
      const component04 = result.componentAnalyses.find(item => item.componentId === '04');
      assert.ok(component03, 'Expected component 03 analysis.');
      assert.ok(component04, 'Expected component 04 analysis.');
      assert.ok(component04.priorityScore > component03.priorityScore, 'Text-only signal should not overpower structured + adherence.');
    }
  },
  {
    id: 'case-e-sem-texto-forte-estrutura',
    title: 'E) Componente sem texto + estruturado/aderência fortes',
    participant: makeParticipant('case-e', {
      scores: makeScores(4, { '05': 2 }),
      insights: {}
    }),
    assert(result) {
      assert.strictEqual(result.recommendedTerritory.componentId, '05');
      assert.strictEqual(result.recommendedTerritory.textualEvidenceRaw, 0);
      assert.strictEqual(result.territoryType, 'RECOMENDADO');
    }
  },
  {
    id: 'case-f-estrutural-proximo-desempate-texto',
    title: 'F) Territórios próximos + texto concreto como desempate',
    participant: makeParticipant('case-f', {
      scores: makeScores(4, { '04': 2, '10': 2 }),
      insights: {
        '10': 'Ha custo alto, taxas, retrabalho, conciliacao e demora para fechar cada recebimento.'
      }
    }),
    assert(result) {
      assert.strictEqual(result.recommendedTerritory.componentId, '10');
      assert.ok(result.alternativeTerritory, 'Expected alternative territory for close structural scenario.');
      assert.strictEqual(result.alternativeTerritory.componentId, '04');
    }
  }
];

const scenarios = [...baseScenarios, ...recalibrationScenarios];

function runScenario(scenario) {
  const context = buildTerritoryContext(scenario.participant);
  const result = evaluateTerritories(context);
  return {
    scenarioId: scenario.id,
    title: scenario.title,
    output: result
  };
}

function summarizeTerritory(territory) {
  if (!territory) return null;
  return {
    componentId: territory.componentId,
    territoryType: territory.territoryType,
    confidenceLevel: territory.confidenceLevel,
    structuredSignal: territory.structuredSignal,
    adherenceSignal: territory.adherenceSignal,
    textualEvidenceRaw: territory.textualEvidenceRaw,
    textualEvidenceCapped: territory.textualEvidenceCapped,
    priorityScore: territory.priorityScore
  };
}

function summarizeScenarioOutput(output) {
  return {
    recommendedTerritory: summarizeTerritory(output.recommendedTerritory),
    alternativeTerritory: summarizeTerritory(output.alternativeTerritory)
  };
}

function main() {
  validateDictionaryIntegrity();
  const outputs = scenarios.map(runScenario);
  const outputsById = outputs.reduce((acc, item) => {
    acc[item.scenarioId] = item;
    return acc;
  }, {});

  scenarios.forEach(scenario => {
    scenario.assert(outputsById[scenario.id].output, outputsById);
  });

  console.log(JSON.stringify({
    status: 'PASS',
    scenarioCount: outputs.length,
    outputs: outputs.map(item => ({
      scenarioId: item.scenarioId,
      title: item.title,
      summary: summarizeScenarioOutput(item.output)
    }))
  }, null, 2));
}

main();
