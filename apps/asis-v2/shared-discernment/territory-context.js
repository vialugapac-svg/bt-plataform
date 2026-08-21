const componentDictionary = require('./component-dictionary');

const CANONICAL_COMPONENT_IDS = Object.keys(componentDictionary.components).sort();

function asNumber(value) {
  const num = Number(value);
  return Number.isFinite(num) ? num : 0;
}

function uniqueNonEmpty(values) {
  return Array.from(new Set((values || []).map(value => String(value || '').trim()).filter(Boolean)));
}

function normalizeReferences(references) {
  if (!references || typeof references !== 'object') return {};
  return Object.fromEntries(Object.entries(references).map(([key, value]) => [String(key), value]));
}

function selectedReferenceKeys(references) {
  return Object.entries(normalizeReferences(references))
    .filter(([, value]) => value === true)
    .map(([key]) => key)
    .sort((left, right) => Number(left) - Number(right));
}

function inferComponentIdFromAsisKey(key, entry) {
  if (entry && entry.numComponente && componentDictionary.components[entry.numComponente]) {
    return entry.numComponente;
  }
  const numericKey = Number(key);
  if (Number.isInteger(numericKey) && numericKey >= 0 && numericKey < 11) {
    return String(numericKey + 1).padStart(2, '0');
  }
  const normalizedKey = String(key || '').padStart(2, '0');
  return componentDictionary.components[normalizedKey] ? normalizedKey : null;
}

function buildAsisComponentMap(participant) {
  const source = participant && participant.asis && participant.asis.componentes;
  if (!source || typeof source !== 'object') return {};

  return Object.entries(source).reduce((acc, [key, value]) => {
    const componentId = inferComponentIdFromAsisKey(key, value);
    if (!componentId) return acc;
    acc[componentId] = value || {};
    return acc;
  }, {});
}

function buildComponentContext(componentId, participant, diagnostico, asisMap) {
  const meta = componentDictionary.components[componentId];
  const diagnosticoComponent = (diagnostico.componentes || {})[componentId] || {};
  const diagnosticoResponse = (diagnostico.respostas || {})[componentId] || {};
  const asisComponent = asisMap[componentId] || {};

  const insight = uniqueNonEmpty([
    diagnosticoComponent.insight,
    diagnosticoResponse.insight,
    asisComponent.observacao
  ])[0] || '';

  const relevantTexts = uniqueNonEmpty([
    diagnosticoComponent.insight,
    diagnosticoResponse.insight,
    asisComponent.observacao,
    diagnosticoResponse.percepcao,
    asisComponent.percepcao
  ]);

  const references = normalizeReferences(diagnosticoResponse.referencias || asisComponent.refs);

  return {
    componentId,
    componentName: meta.shortName,
    score: asNumber(diagnosticoComponent.pontuacao),
    classification: diagnosticoComponent.classificacao || '',
    insight,
    perception: String(diagnosticoResponse.percepcao || asisComponent.percepcao || '').trim(),
    perceptionValue: asNumber(diagnosticoResponse.percepcaoValor || asisComponent.percepcaoValor),
    references,
    selectedReferenceKeys: selectedReferenceKeys(references),
    relevantTexts,
    textCorpus: relevantTexts.join('\n'),
    persistedTexts: {
      diagnosticoInsight: String(diagnosticoComponent.insight || ''),
      respostaInsight: String(diagnosticoResponse.insight || ''),
      observacao: String(asisComponent.observacao || ''),
      perception: String(diagnosticoResponse.percepcao || asisComponent.percepcao || '')
    },
    raw: {
      diagnosticoComponent,
      diagnosticoResponse,
      asisComponent
    }
  };
}

function buildTerritoryContext(participant) {
  const normalizedParticipant = participant || {};
  const diagnostico = normalizedParticipant.diagnostico || {};
  const asisMap = buildAsisComponentMap(normalizedParticipant);
  const components = CANONICAL_COMPONENT_IDS.map(componentId =>
    buildComponentContext(componentId, normalizedParticipant, diagnostico, asisMap)
  );

  return {
    version: 'territory-context-v1',
    participantId: normalizedParticipant.participanteId || normalizedParticipant.id || null,
    participantName: normalizedParticipant.participante || normalizedParticipant.nome || null,
    areaLabel: diagnostico.setor || normalizedParticipant.setor || null,
    generatedAt: new Date().toISOString(),
    components,
    componentMap: Object.fromEntries(components.map(component => [component.componentId, component])),
    overall: {
      averageScore: components.length
        ? Number((components.reduce((sum, component) => sum + component.score, 0) / components.length).toFixed(2))
        : 0,
      classification: diagnostico.classificacaoGeral || '',
      executiveSummary: diagnostico.resumoExecutivo || null
    },
    source: {
      diagnostico,
      hasAsisComponentPayload: Object.keys(asisMap).length > 0
    }
  };
}

module.exports = {
  CANONICAL_COMPONENT_IDS,
  buildTerritoryContext
};
