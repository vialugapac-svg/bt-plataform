// Opportunity Engine V1 (deterministic, no text analysis)
const kbModule = require('./blockchain-kb-opportunities');
const compDict = require('./component-dictionary');

const ENGINE_VERSION = 'ft-op-engine-v1.0';

function familyContext(family, areaId) {
  return {
    areaId,
    situation: family?.situation || "",
    signalsAsIs: family?.signalsAsIs || [],
    possibility: family?.possibility || "",
    capacityNeeded: family?.capacityNeeded || "",
    infrastructure: family?.infrastructure || "",
    infrastructureExplain: family?.infrastructureExplain || "",
    contextualizationByArea: family?.contextualizationByArea || "",
    impactPotential: family?.impactPotential || [],
    whatToTest: family?.whatToTest || "",
    whatToMeasure: family?.whatToMeasure || [],
    notRecommendWhen: family?.notRecommendWhen || "",
    dominantComponent: family?.dominantComponent || null
  };
}

function buildFamilyPayload(fs, areaId, role, confidence) {
  const family = fs.family || {};
  const best = fs.best || { score: 0, evidence: [], leverages: [], attentionPoints: [] };
  const context = familyContext(family, areaId);
  const supportingEvidence = (best.evidence || []).map(e => ({
    componentNum: e.componentNum,
    reasonCode: e.reasonCode,
    value: e.value
  }));

  return {
    id: family.id,
    name: family.name,
    role,
    confidence,
    rationale: supportingEvidence.length ? 'Derivado de evidências internas do AS-IS' : 'Sinal contextual complementar',
    familyId: family.id,
    familyName: family.name,
    score: best.score || 0,
    supportingEvidence,
    situation: context.situation,
    signalsAsIs: context.signalsAsIs,
    possibility: context.possibility,
    capacityNeeded: context.capacityNeeded,
    infrastructure: context.infrastructure,
    infrastructureExplain: context.infrastructureExplain,
    contextualizationByArea: context.contextualizationByArea || "",
    areaContext: context.contextualizationByArea || "",
    impactPotential: context.impactPotential,
    whatToTest: context.whatToTest,
    whatToMeasure: context.whatToMeasure,
    notRecommendWhen: context.notRecommendWhen,
    dominantComponent: context.dominantComponent,
    leverages: best.leverages || [],
    attentionPoints: best.attentionPoints || []
  };
}

function evaluateOpportunities(diagnostico, areaId, profile) {
  const kb = kbModule;
  const result = {
    businessOpportunity: null,
    businessOpportunityEvidence: [],
    tensionEvidence: [],
    captureEvidence: [],
    blockchainPossibilities: [],
    leverages: [],
    attentionPoints: [],
    opportunityFamilyId: null,
    opportunityFamilyName: null,
    possibilities: [],
    secondaryOpportunityId: null,
    entryDoor: null,
    entryReasons: [],
    area: areaId,
    profile: profile || null,
    opportunityOrigin: 'UNDETERMINED',
    externalOpportunity: false,
    solutionMatches: [],
    engineVersion: ENGINE_VERSION,
    knowledgeBaseVersion: kb.kbVersion,
    timestamp: new Date().toISOString()
  };

  if (!diagnostico || !diagnostico.componentes) return result;
  const components = diagnostico.componentes;
  const families = (kb.areas[areaId] && kb.areas[areaId].families) || [];
  const familyScores = [];

  const reasonCodeMap = {
    '01': 'PURPOSE',
    '02': 'PROBLEM',
    '03': 'VALUE_PROPOSITION',
    '04': 'PROCESS',
    '05': 'ASSET',
    '06': 'CHANNEL',
    '07': 'ECOSYSTEM',
    '08': 'CUSTOMERS',
    '09': 'JOURNEY',
    '10': 'COST_STRUCTURE',
    '11': 'REVENUE'
  };

  families.forEach(family => {
    let familyBest = null;

    (family.possibilities || []).forEach(poss => {
      let score = 0;
      const evidence = [];
      const leverages = [];
      const attentionPoints = [];
      const oppEvidenceItems = [];
      const leverItems = [];
      const limiterItems = [];

      (poss.components.opportunities || []).forEach(item => {
        const num = item.num;
        const trigger = item.trigger || 'any';
        const comp = components[num];
        const compScore = comp && typeof comp.pontuacao === 'number' ? comp.pontuacao : null;
        if (compScore === null) return;
        const base = reasonCodeMap[num] || 'COMPONENT';

        if (trigger === 'low' && compScore > 2) return;
        if (trigger === 'strong' && compScore < 4) return;

        if (compScore >= 5) {
          leverItems.push({ componentNum: num, value: compScore, role: 'LEVER', reasonCode: base + '_CAPACITY_LEVER' });
        } else if (compScore <= 2) {
          oppEvidenceItems.push({ componentNum: num, trigger, value: compScore, role: 'OPPORTUNITY', reasonCode: base + '_GAP' });
        } else if (compScore === 4) {
          oppEvidenceItems.push({ componentNum: num, trigger, value: compScore, role: 'OPPORTUNITY', reasonCode: base + '_STRONG_EVIDENCE' });
        } else {
          oppEvidenceItems.push({ componentNum: num, trigger, value: compScore, role: 'OPPORTUNITY', reasonCode: base + '_EVIDENCE' });
        }
      });

      (poss.components.levers || []).forEach(num => {
        const comp = components[num];
        const compScore = comp && typeof comp.pontuacao === 'number' ? comp.pontuacao : null;
        if (compScore !== null && compScore >= 4) {
          leverItems.push({ componentNum: num, value: compScore, role: 'LEVER', reasonCode: 'POTENTIAL_LEVER' });
        } else if (compScore !== null && compScore <= 2) {
          limiterItems.push({ componentNum: num, value: compScore, role: 'LIMITER', reasonCode: 'POTENTIAL_LEVER_WEAK' });
        }
      });

      (poss.components.limiters || []).forEach(num => {
        const comp = components[num];
        const compScore = comp && typeof comp.pontuacao === 'number' ? comp.pontuacao : null;
        if (compScore !== null && compScore <= 2) {
          const rcode = (reasonCodeMap[num] || 'COMPONENT') + '_LIMITER';
          limiterItems.push({ componentNum: num, value: compScore, role: 'LIMITER', reasonCode: rcode });
        }
      });

      ['04', '05', '09'].forEach(num => {
        const comp = components[num];
        const compScore = comp && typeof comp.pontuacao === 'number' ? comp.pontuacao : null;
        if (compScore !== null && compScore <= 2) {
          const exists = limiterItems.find(l => l.componentNum === num);
          if (!exists) {
            const rcode = (reasonCodeMap[num] || 'COMPONENT') + '_LIMITER';
            limiterItems.push({ componentNum: num, value: compScore, role: 'LIMITER', reasonCode: rcode });
          }
        }
      });

      let configScore = 0;
      const oppEvidenceCount = oppEvidenceItems.length;
      const leverCount = leverItems.length;
      const limiterCount = limiterItems.length;

      if (oppEvidenceCount >= 2) configScore += 4;
      else if (oppEvidenceCount === 1 && leverCount >= 1) configScore += 3;
      else if (oppEvidenceCount === 1 && oppEvidenceItems[0] && oppEvidenceItems[0].trigger === 'any' && leverCount >= 2) configScore += 2;
      else configScore -= 1;
      configScore += leverCount;
      configScore -= limiterCount;

      const marketCanal = components['06'] && components['06'].pontuacao ? components['06'].pontuacao : 0;
      const marketEco = components['07'] && components['07'].pontuacao ? components['07'].pontuacao : 0;
      const proposta = components['03'] && components['03'].pontuacao ? components['03'].pontuacao : 0;
      if (family.id === 'opp-family-accounting-professional-services') {
        const hasPropGap = (oppEvidenceItems || []).some(e => e.componentNum === '03' || e.componentNum === '11');
        const marketProxy = marketCanal >= 4 || marketEco >= 4 || ((components['08'] && components['08'].pontuacao) >= 4);
        if (hasPropGap && marketProxy) configScore += 4;
      }
      if (family.id === 'opp-family-identity') {
        const hasIdentitySignals = (oppEvidenceItems || []).some(e => e.componentNum === '08' || e.componentNum === '06');
        if (hasIdentitySignals) configScore += 2;
      }
      if (family.id === 'opp-family-new-value-models') {
        const hasValueSignals = (oppEvidenceItems || []).some(e => e.componentNum === '03' || e.componentNum === '11' || e.componentNum === '08');
        if (hasValueSignals) configScore += 2;
      }

      score += configScore;
      evidence.push(...oppEvidenceItems.map(e => ({ componentNum: e.componentNum, role: e.role, reasonCode: e.reasonCode, value: e.value })));
      leverages.push(...leverItems.map(l => ({ componentNum: l.componentNum, role: l.role, reasonCode: l.reasonCode, value: l.value })));
      attentionPoints.push(...limiterItems.map(l => ({ componentNum: l.componentNum, role: l.role, reasonCode: l.reasonCode, value: l.value })));

      const record = { possibility: poss, score, evidence, leverages, attentionPoints };

      if (family.id === 'opp-family-tokenization') {
        const onlyAssetOrRevenue = oppEvidenceItems.length > 0 && oppEvidenceItems.every(e => e.componentNum === '05' || e.componentNum === '11');
        if (onlyAssetOrRevenue && leverCount < 1 && oppEvidenceItems.length < 2) {
          record.score = (record.score || 0) - 6;
        }
      }

      const techFamilies = ['opp-family-tokenization', 'opp-family-programmability', 'opp-family-coordination', 'opp-family-payments'];
      if (techFamilies.includes(family.id) && oppEvidenceCount < 2 && leverCount < 1) {
        record.score = (record.score || 0) - 3;
      }

      if (family.id === 'opp-family-education') {
        const hasMarketLevers = (leverItems || []).some(l => ['08', '06', '09'].includes(l.componentNum));
        if (hasMarketLevers) record.score = (record.score || 0) + 2;
        else record.score = (record.score || 0) - 2;
      }

      if (!familyBest || record.score > familyBest.score) familyBest = record;
    });

    familyScores.push({ family, best: familyBest });
  });

  const scoresArr = Object.keys(components).map(k => (components[k] && components[k].pontuacao) || 0);
  const avg = scoresArr.length ? (scoresArr.reduce((a, b) => a + b, 0) / scoresArr.length) : 0;

  familyScores.sort((a, b) => {
    const sa = a.best ? a.best.score : -999;
    const sb = b.best ? b.best.score : -999;
    return sb - sa;
  });

  let chosenFamilyRecord = familyScores[0] || null;
  const allHaveNoGaps = familyScores.every(fs => !(fs.best && fs.best.evidence && fs.best.evidence.length > 0));
  if (avg >= 4 && allHaveNoGaps) {
    let bestRank = Number.POSITIVE_INFINITY;
    let ranked = null;
    familyScores.forEach(fs => {
      const rank = (fs.family && typeof fs.family.externalPriorityRank === 'number') ? fs.family.externalPriorityRank : Number.POSITIVE_INFINITY;
      if (rank < bestRank) {
        bestRank = rank;
        ranked = fs;
      }
    });
    if (ranked) chosenFamilyRecord = ranked;
  }

  if (chosenFamilyRecord && chosenFamilyRecord.best) {
    const family = chosenFamilyRecord.family;
    const best = chosenFamilyRecord.best;

    const familyToBusinessOpp = {
      'opp-family-accounting-professional-services': 'Ampliar e estruturar novos serviços profissionais para capturar valor',
      'opp-family-payments': 'Melhorar circulação e mecanismos de captura/transferência de valor',
      'opp-family-programmability': 'Automatizar processos e reduzir fricções operacionais',
      'opp-family-traceability': 'Aumentar confiança, verificabilidade e auditabilidade de registros',
      'opp-family-identity': 'Reduzir fricção de autenticação, autorização e credenciais',
      'opp-family-tokenization': 'Criar novas fontes de receita e explorar modelos de propriedade e liquidez',
      'opp-family-coordination': 'Sincronizar versões e reduzir reconciliação entre participantes',
      'opp-family-new-value-models': 'Criar novas relações econômicas e ampliar captura de valor'
    };

    const tensions = [];
    Object.keys(components).forEach(k => {
      const v = components[k] && typeof components[k].pontuacao === 'number' ? components[k].pontuacao : null;
      if (v !== null && v <= 2) {
        tensions.push({ componentNum: k, value: v, severity: v === 1 ? 'critical' : 'high' });
      }
    });

    const leverPower = (best.leverages || []).reduce((s, l) => s + (l.value || 0), 0);
    const marketProxyAvg = (((components['06'] && components['06'].pontuacao) || 0) + ((components['07'] && components['07'].pontuacao) || 0) + ((components['08'] && components['08'].pontuacao) || 0)) / 3;
    const operationCapacityAvg = (((components['03'] && components['03'].pontuacao) || 0) + ((components['04'] && components['04'].pontuacao) || 0) + ((components['05'] && components['05'].pontuacao) || 0)) / 3;
    const captureEvidence = [
      ...((best.leverages || []).map(l => ({ componentNum: l.componentNum, value: l.value, type: 'captureLever' }))),
      { componentNum: '06', value: marketProxyAvg, type: 'marketProxy' },
      { componentNum: '03', value: operationCapacityAvg, type: 'operationCapacity' }
    ];

    const chosenScore = best.score || 0;
    const MIN_OPPORTUNITY_SCORE = 3;
    const strongEvidenceVals = (best.evidence || []).filter(e => typeof e.value === 'number' && (e.value <= 2 || e.value >= 4));
    const strongEvidenceCount = strongEvidenceVals.length;
    const topScore = familyScores[0] && familyScores[0].best ? (familyScores[0].best.score || 0) : 0;
    const secondScore = familyScores[1] && familyScores[1].best ? (familyScores[1].best.score || 0) : -999;
    const margin = topScore - secondScore;
    const hasExternalInfrastructureSignal = avg >= 4 && leverPower >= 4 && (
      tensions.length === 0 ||
      (tensions.length > 0 && operationCapacityAvg >= 4)
    );

    if (chosenScore >= MIN_OPPORTUNITY_SCORE && (strongEvidenceCount >= 2 || leverPower >= 5 || margin >= 2 || hasExternalInfrastructureSignal)) {
      result.opportunityFamilyId = family.id;
      result.opportunityFamilyName = family.name;
      result.businessOpportunity = familyToBusinessOpp[family.id] || family.name;
      result.businessOpportunityEvidence = best.evidence || [];
      result.captureEvidence = captureEvidence;
    } else {
      result.opportunityFamilyId = null;
      result.opportunityFamilyName = null;
      result.businessOpportunity = null;
      result.businessOpportunityEvidence = [];
      result.captureEvidence = captureEvidence;
    }

    result.tensionEvidence = tensions;

    if (result.businessOpportunity) {
      if (tensions.length > 0) {
        result.opportunityOrigin = hasExternalInfrastructureSignal ? 'MIXED' : 'INTERNAL';
      } else if (hasExternalInfrastructureSignal) {
        result.opportunityOrigin = 'EXTERNAL';
      } else {
        result.opportunityOrigin = 'INTERNAL';
      }
    } else {
      result.opportunityOrigin = 'UNDETERMINED';
    }

    result.externalOpportunity = (result.opportunityOrigin === 'EXTERNAL');

    const outputFamilies = [familyScores[0], familyScores[1], familyScores[2]]
      .filter(Boolean)
      .filter((fs, idx) => idx === 0 || (fs.best && fs.best.score > 0));

    result.blockchainPossibilities = outputFamilies.map((fs, idx) => {
      const b = fs.best || { score: 0, evidence: [], leverages: [], attentionPoints: [] };
      const evidenceVals = (b.evidence || []).map(e => e.value || 0);
      const evidenceAvg = evidenceVals.length ? (evidenceVals.reduce((a, b) => a + b, 0) / evidenceVals.length) : 0;
      const leverCount = (b.leverages || []).length;
      let confidence = 'low';
      if (idx === 0) {
        if (b.score >= 4 && (evidenceAvg >= 3.5 || leverCount >= 1) && (b.score - secondScore) >= 1.5) confidence = 'high';
        else if (b.score >= 3 && (evidenceAvg >= 3 || leverCount >= 1)) confidence = 'medium';
      } else if (b.score >= 4 && evidenceAvg >= 4 && leverCount >= 1) {
        confidence = 'medium';
      }
      return buildFamilyPayload(fs, areaId, idx === 0 ? 'PRIMARY' : 'COMPLEMENTARY', confidence);
    });

    result.leverages = best.leverages || [];
    result.attentionPoints = best.attentionPoints || [];
    result.tensions = tensions;
    result.captureCapacity = { leverPower, marketProxyAvg, operationCapacityAvg };

    const secondary = outputFamilies.find(fs => fs.family && fs.family.id !== family.id);
    result.secondaryOpportunityId = secondary ? secondary.family.id : null;
    result.possibilities = (family.possibilities || []).map(p => ({ id: p.id, name: p.name }));
  }

  return result;
}

module.exports = { evaluateOpportunities };
