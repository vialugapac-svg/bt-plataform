const adherenceMatrix = require('./blockchain-adherence-matrix');
const { interpretTerritoryEvidence } = require('./evidence-interpreter');

const ADHERENCE_POINTS = {
  BAIXA: 1,
  BAIXA_MEDIA: 2,
  MEDIA: 2,
  MEDIA_ALTA: 3,
  ALTA: 3,
  MUITO_ALTA: 4
};

function byCanonicalOrder(left, right) {
  return left.componentId.localeCompare(right.componentId);
}

function needSignal(score) {
  if (score <= 2) {
    return { level: 'ALTA', points: 3, rationale: `Pontuacao ${score.toFixed(2)} indica necessidade clara de atencao.` };
  }
  if (score < 4) {
    return { level: 'MODERADA', points: 2, rationale: `Pontuacao ${score.toFixed(2)} indica espaco concreto para aprendizado e melhoria.` };
  }
  if (score < 5) {
    return { level: 'BAIXA', points: 1, rationale: `Pontuacao ${score.toFixed(2)} mostra um componente saudavel, mas ainda observavel.` };
  }
  return { level: 'BAIXA', points: 0, rationale: `Pontuacao ${score.toFixed(2)} mostra um componente muito saudavel; ele nao vence por necessidade.` };
}

function adherenceSignal(componentId) {
  const entry = adherenceMatrix.components[componentId];
  const points = ADHERENCE_POINTS[entry.adherenceLevel] || 0;
  return {
    level: entry.adherenceLevel,
    points,
    rationale: entry.summary,
    signalFamilies: entry.signalFamilies,
    capabilities: entry.capabilities,
    experimentTypes: entry.experimentTypes,
    observationCriteria: entry.observationCriteria
  };
}

function summarizeMatchedFamilies(evidenceItems) {
  return Array.from(new Set((evidenceItems || []).map(item => item.familyId)));
}

function evidenceSignal(component, evidenceResult, matrixEntry) {
  const componentEvidence = evidenceResult.evidenceByComponent[component.componentId] || [];
  const relatedEvidence = evidenceResult.allEvidence.filter(item =>
    matrixEntry.signalFamilies.includes(item.familyId)
  );
  const ownRelatedEvidence = relatedEvidence.filter(item => item.componentId === component.componentId);
  const crossRelatedEvidence = relatedEvidence.filter(item => item.componentId !== component.componentId);
  const positiveOwn = ownRelatedEvidence.filter(item => item.influence === 'reinforces');
  const positiveCross = crossRelatedEvidence.filter(item => item.influence === 'reinforces');
  const negativeOwn = ownRelatedEvidence.filter(item => item.influence === 'weakens');

  const diversityBonus = summarizeMatchedFamilies(positiveOwn).length >= 2 ? 1 : 0;
  const points = Math.max(0, (positiveOwn.length * 2) + positiveCross.length + diversityBonus - (negativeOwn.length * 2));

  let level = 'AUSENTE';
  if (points >= 4) level = 'FORTE';
  else if (points >= 2) level = 'MODERADA';
  else if (points >= 1) level = 'INICIAL';
  else if (negativeOwn.length > 0) level = 'ENFRAQUECIDA';

  return {
    level,
    points,
    ownEvidence: ownRelatedEvidence,
    crossEvidence: crossRelatedEvidence,
    usedEvidence: relatedEvidence,
    matchedFamilies: summarizeMatchedFamilies(relatedEvidence),
    rationale: buildEvidenceRationale(level, positiveOwn.length, positiveCross.length, negativeOwn.length)
  };
}

function buildEvidenceRationale(level, positiveOwnCount, positiveCrossCount, negativeOwnCount) {
  if (level === 'FORTE') {
    return `Ha evidencia textual forte no proprio componente (${positiveOwnCount}) e/ou convergencia com outros componentes (${positiveCrossCount}).`;
  }
  if (level === 'MODERADA') {
    return `Ha sinais textuais relevantes, mas ainda sem detalhamento suficiente para afirmar uma aplicacao especifica.`;
  }
  if (level === 'INICIAL') {
    return `Existe ao menos um sinal textual inicial relacionado a este territorio.`;
  }
  if (level === 'ENFRAQUECIDA') {
    return `Os textos mencionam este territorio de forma negada ou insuficiente (${negativeOwnCount} ocorrencias).`;
  }
  return 'Nao ha evidencia textual suficiente para sustentar uma aplicacao especifica neste territorio.';
}

function classifyTerritory(need, adherence, evidence) {
  const textualEvidenceCapped = Math.min(evidence.points, 4);
  const weightedStructured = 3 * need.points;
  const weightedAdherence = 3 * adherence.points;
  const structuredAdherenceScore = weightedStructured + weightedAdherence;

  if (structuredAdherenceScore >= 18) {
    if (textualEvidenceCapped >= 2) return { territoryType: 'RECOMENDADO', confidenceLevel: 'ALTA' };
    return { territoryType: 'RECOMENDADO', confidenceLevel: 'MODERADA' };
  }

  if (structuredAdherenceScore >= 15) {
    if (textualEvidenceCapped >= 1) return { territoryType: 'RECOMENDADO', confidenceLevel: 'MODERADA' };
    return { territoryType: 'RECOMENDADO', confidenceLevel: 'MODERADA' };
  }

  if (structuredAdherenceScore >= 12 && textualEvidenceCapped >= 3) {
    return { territoryType: 'RECOMENDADO', confidenceLevel: 'MODERADA' };
  }

  return { territoryType: 'EXPLORATORIO', confidenceLevel: 'EXPLORATORIA' };
}

function buildReasons(component, need, adherence, evidence) {
  const reasons = [
    `${component.componentName}: ${need.rationale}`,
    `${component.componentName}: ${adherence.rationale}`,
    `${component.componentName}: ${evidence.rationale}`
  ];

  if (evidence.ownEvidence.length > 0) {
    const families = evidence.matchedFamilies.join(', ');
    reasons.push(`Os textos do proprio componente sinalizam: ${families}.`);
  } else if (evidence.crossEvidence.length > 0) {
    const supportingComponents = Array.from(new Set(evidence.crossEvidence.map(item => item.componentName)));
    reasons.push(`Outros componentes reforcam este territorio, especialmente: ${supportingComponents.join(', ')}.`);
  } else {
    reasons.push('Ainda faltam evidencias textuais mais concretas para especificar a aplicacao.');
  }

  return reasons;
}

function buildEvidenceGaps(adherence, evidenceResult) {
  return adherence.signalFamilies
    .filter(familyId => !evidenceResult.matchedFamilies.includes(familyId))
    .slice(0, 3);
}

function chooseExperimentFocus(evidenceResult, adherence) {
  const firstMatchedFamily = evidenceResult.matchedFamilies[0];
  if (firstMatchedFamily) return firstMatchedFamily;
  return adherence.signalFamilies[0] || null;
}

function buildSuggestedExperiment(component, adherence, evidenceResult) {
  const focus = chooseExperimentFocus(evidenceResult, adherence);
  const experimentLead = adherence.experimentTypes[0] || 'Escolher um fluxo pequeno e observavel ligado a este componente.';

  return {
    title: `Experimento inicial em ${component.componentName}`,
    focusFamily: focus,
    description: experimentLead,
    steps: [
      `Escolher um fluxo real e pequeno ligado a ${component.componentName}.`,
      'Descrever como ele funciona hoje, incluindo etapas, validacoes, custos e intermediarios.',
      'Simular ou testar uma versao controlada com a nova infraestrutura, sem mexer no restante da operacao.',
      'Comparar os resultados obtidos e decidir se vale aprofundar.'
    ],
    safeguards: ['pequeno', 'reversivel', 'observavel', 'comparavel', 'seguro para a operacao']
  };
}

function buildObservationCriteria(adherence, evidenceResult) {
  const criteria = adherence.observationCriteria.slice(0, 5);
  if (evidenceResult.matchedFamilies.includes('pagamentos_recebimentos') && !criteria.includes('tempo de recebimento')) {
    criteria.push('tempo de recebimento');
  }
  if (evidenceResult.matchedFamilies.includes('registros_rastreabilidade') && !criteria.includes('rastreabilidade')) {
    criteria.push('rastreabilidade');
  }
  return Array.from(new Set(criteria));
}

function buildComponentAnalysis(component, evidenceResult) {
  const adherence = adherenceSignal(component.componentId);
  const need = needSignal(component.score);
  const evidence = evidenceSignal(component, evidenceResult, adherence);
  const textualEvidenceCapped = Math.min(evidence.points, 4);
  const classification = classifyTerritory(need, adherence, evidence);
  const priorityScore = (3 * need.points) + (3 * adherence.points) + (1 * textualEvidenceCapped);

  return {
    componentId: component.componentId,
    componentName: component.componentName,
    score: component.score,
    territoryType: classification.territoryType,
    confidenceLevel: classification.confidenceLevel,
    structuredSignal: need.points,
    adherenceSignal: adherence.points,
    textualEvidenceRaw: evidence.points,
    textualEvidenceCapped,
    priorityScore,
    need,
    adherence,
    evidence,
    reasons: buildReasons(component, need, adherence, evidence),
    evidenceUsed: evidence.usedEvidence,
    evidenceGaps: buildEvidenceGaps(adherence, evidence),
    suggestedExperiment: buildSuggestedExperiment(component, adherence, evidence),
    observationCriteria: buildObservationCriteria(adherence, evidence)
  };
}

function toTerritorySummary(analysis, summaryType) {
  if (!analysis) return null;
  return {
    componentId: analysis.componentId,
    componentName: analysis.componentName,
    score: analysis.score,
    territoryType: summaryType || analysis.territoryType,
    confidenceLevel: analysis.confidenceLevel,
    structuredSignal: analysis.structuredSignal,
    adherenceSignal: analysis.adherenceSignal,
    textualEvidenceRaw: analysis.textualEvidenceRaw,
    textualEvidenceCapped: analysis.textualEvidenceCapped,
    priorityScore: analysis.priorityScore,
    reasons: analysis.reasons,
    evidenceUsed: analysis.evidenceUsed,
    evidenceGaps: analysis.evidenceGaps,
    suggestedExperiment: analysis.suggestedExperiment,
    observationCriteria: analysis.observationCriteria,
    signals: {
      need: analysis.need,
      adherence: {
        level: analysis.adherence.level,
        capabilities: analysis.adherence.capabilities,
        signalFamilies: analysis.adherence.signalFamilies
      },
      evidence: {
        level: analysis.evidence.level,
        matchedFamilies: analysis.evidence.matchedFamilies
      }
    }
  };
}

function shouldExposeAlternative(primary, secondary) {
  if (!primary || !secondary) return false;
  if (secondary.priorityScore <= 0) return false;
  const closeScore = (primary.priorityScore - secondary.priorityScore) <= 4;
  const hasRelevantStructure = secondary.structuredSignal >= 2 && secondary.adherenceSignal >= 2;
  const hasSupport = secondary.textualEvidenceCapped >= 1 || (secondary.structuredSignal + secondary.adherenceSignal) >= 6;
  return closeScore && hasRelevantStructure && hasSupport;
}

function evaluateTerritories(context) {
  if (!context || !Array.isArray(context.components) || !context.components.length) {
    throw new Error('Territory Engine requires a normalized context with 11 components.');
  }

  const evidenceResult = interpretTerritoryEvidence(context);
  const componentAnalyses = context.components
    .map(component => buildComponentAnalysis(component, evidenceResult))
    .sort((left, right) =>
      right.priorityScore - left.priorityScore
      || right.evidence.points - left.evidence.points
      || right.adherence.points - left.adherence.points
      || right.need.points - left.need.points
      || byCanonicalOrder(left, right)
    );

  const primary = componentAnalyses[0];
  const secondary = componentAnalyses[1];
  const alternative = shouldExposeAlternative(primary, secondary) ? secondary : null;

  return {
    engineVersion: 'territory-engine-v1.1',
    question: 'Considerando o estado atual deste negocio, onde faz mais sentido comecar a experimentar a nova infraestrutura?',
    areaLabel: context.areaLabel || null,
    territoryType: primary.territoryType,
    confidenceLevel: primary.confidenceLevel,
    recommendedTerritory: toTerritorySummary(primary, primary.territoryType),
    alternativeTerritory: alternative ? toTerritorySummary(alternative, 'ALTERNATIVO') : null,
    reasons: primary.reasons,
    evidenceUsed: primary.evidenceUsed,
    evidenceGaps: primary.evidenceGaps,
    suggestedExperiment: primary.suggestedExperiment,
    observationCriteria: primary.observationCriteria,
    componentAnalyses,
    evidenceCatalog: evidenceResult.allEvidence
  };
}

module.exports = {
  evaluateTerritories
};
