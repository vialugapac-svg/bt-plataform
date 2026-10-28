// Opportunity Engine V1 (deterministic, no text analysis)
const kbModule = require('./blockchain-kb-opportunities');
const compDict = require('./component-dictionary');

const ENGINE_VERSION = 'ft-op-engine-v1.0';

function evaluateOpportunities(diagnostico, areaId, profile) {
  const kb = kbModule;
  const result = {
    // New contract fields
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
  const components = diagnostico.componentes; // expects { "01": {pontuacao: number}, ... }

  const families = (kb.areas[areaId] && kb.areas[areaId].families) || [];
  const familyScores = [];

  // helper reason maps
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
    let familyBest = null; // { possibility, score, evidence, levers, limiters }

    (family.possibilities || []).forEach(poss => {
      let score = 0;
      const evidence = [];
      const leverages = [];
      const attentionPoints = [];

      // evaluate possibility components
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

        if (compScore >= 5) {
          // very strong component -> lever role (require top value to auto-promote)
          leverItems.push({ componentNum: num, value: compScore, role: 'LEVER', reasonCode: base + '_CAPACITY_LEVER' });
        } else if (compScore <= 2) {
          // weak/critical -> opportunity/gap
          oppEvidenceItems.push({ componentNum: num, trigger, value: compScore, role: 'OPPORTUNITY', reasonCode: base + '_GAP' });
        } else if (compScore === 4) {
          // clear evidence but not automatic lever; treat as strong evidence
          oppEvidenceItems.push({ componentNum: num, trigger, value: compScore, role: 'OPPORTUNITY', reasonCode: base + '_STRONG_EVIDENCE' });
        } else {
          // mid-range (3): neutral evidence
          oppEvidenceItems.push({ componentNum: num, trigger, value: compScore, role: 'OPPORTUNITY', reasonCode: base + '_EVIDENCE' });
        }
      });

      // levers defined explicitly in possibility
      // NOTE: only treat clear high scores (>=4) as strong levers. 3 is neutral and must not be auto-promoted to LEVER.
      (poss.components.levers || []).forEach(num => {
        const comp = components[num];
        const compScore = comp && typeof comp.pontuacao === 'number' ? comp.pontuacao : null;
        if (compScore !== null && compScore >= 4) {
          // semantic lever (require clearly high score)
          leverItems.push({ componentNum: num, value: compScore, role: 'LEVER', reasonCode: 'POTENTIAL_LEVER' });
        } else if (compScore !== null && compScore <= 2) {
          // if a declared lever is weak, surface as limiter
          limiterItems.push({ componentNum: num, value: compScore, role: 'LIMITER', reasonCode: 'POTENTIAL_LEVER_WEAK' });
        } else {
          // neutral (3) — do not classify automatically as lever or limiter
        }
      });

      // limiters declared
      (poss.components.limiters || []).forEach(num => {
        const comp = components[num];
        const compScore = comp && typeof comp.pontuacao === 'number' ? comp.pontuacao : null;
        if (compScore !== null && compScore <= 2) {
          const rcode = (reasonCodeMap[num] || 'COMPONENT') + '_LIMITER';
          limiterItems.push({ componentNum: num, value: compScore, role: 'LIMITER', reasonCode: rcode });
        }
      });

      // ensure criticals surfaced as limiters when low
      ['04','05','09'].forEach(num => {
        const comp = components[num];
        const compScore = comp && typeof comp.pontuacao === 'number' ? comp.pontuacao : null;
        if (compScore !== null && compScore <= 2) {
          const exists = limiterItems.find(l=>l.componentNum===num);
          if (!exists) {
            const rcode = (reasonCodeMap[num] || 'COMPONENT') + '_LIMITER';
            limiterItems.push({ componentNum: num, value: compScore, role: 'LIMITER', reasonCode: rcode });
          }
        }
      });

      // scoring rules (configuration based)
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

      // special boost for professional services family when market strong + proposal weak
      const marketCanal = components['06'] && components['06'].pontuacao ? components['06'].pontuacao : 0;
      const marketEco = components['07'] && components['07'].pontuacao ? components['07'].pontuacao : 0;
      const proposta = components['03'] && components['03'].pontuacao ? components['03'].pontuacao : 0;
      if (marketCanal >= 4 && marketEco >= 4 && proposta <= 2 && family.name && family.name.toLowerCase().includes('novos serviços profissionais')) {
        configScore += 3;
      }

      score += configScore;

      // build structured outputs
      evidence.push(...oppEvidenceItems.map(e=>({ componentNum: e.componentNum, role: e.role, reasonCode: e.reasonCode, value: e.value })));
      leverages.push(...leverItems.map(l=>({ componentNum: l.componentNum, role: l.role, reasonCode: l.reasonCode, value: l.value })));
      attentionPoints.push(...limiterItems.map(l=>({ componentNum: l.componentNum, role: l.role, reasonCode: l.reasonCode, value: l.value })));

      const record = { possibility: poss, score, evidence, leverages, attentionPoints };

      // semantic tuning per family before choosing familyBest
      // count evidence and levers
      const involvedComponents = Array.from(new Set([].concat((oppEvidenceItems||[]).map(i=>i.componentNum),(leverItems||[]).map(i=>i.componentNum))));

      // tokenization should not be selected solely by Asset(05) or Revenue(11) gaps
      if (family.id === 'opp-family-tokenization') {
        const onlyAssetOrRevenue = oppEvidenceItems.length > 0 && oppEvidenceItems.every(e => e.componentNum === '05' || e.componentNum === '11');
        if (onlyAssetOrRevenue && leverCount < 1 && oppEvidenceItems.length < 2) {
          record.score = (record.score || 0) - 6; // strong penalty
        }
      }

      // technology-specific families conservative rule
      const techFamilies = ['opp-family-tokenization','opp-family-smart_contracts','opp-family-ledger','opp-family-payments'];
      if (techFamilies.includes(family.id)) {
        if (oppEvidenceCount < 2 && leverCount < 1) {
          record.score = (record.score || 0) - 3;
        }
      }

      // promote Novos serviços profissionais when proposition or revenue gap + market access
      if (family.id === 'opp-family-accounting-professional-services') {
        const hasPropGap = (oppEvidenceItems||[]).some(e => e.componentNum === '03' || e.componentNum === '11');
        // treat 3 as neutral; require stronger market signal (>=4) to be considered an enabling proxy
        const marketProxy = (components['06'] && components['06'].pontuacao>=4) || (components['07'] && components['07'].pontuacao>=4) || (components['08'] && components['08'].pontuacao>=4);
        if (hasPropGap && marketProxy) {
          record.score = (record.score || 0) + 4;
        }
      }

      // education family: require levers in Customers(08), Channels(06) or Journey(09)
      if (family.id === 'opp-family-education') {
        const hasMarketLevers = (leverItems||[]).some(l => ['08','06','09'].includes(l.componentNum));
        if (hasMarketLevers) record.score = (record.score || 0) + 2;
        else record.score = (record.score || 0) - 2;
      }

      if (!familyBest || record.score > familyBest.score) familyBest = record;
    });

    // store family best
    familyScores.push({ family, best: familyBest });
  });

  // compute global avg to detect externalOpportunity
  const scoresArr = Object.keys(components).map(k => (components[k] && components[k].pontuacao) || 0);
  const avg = scoresArr.length ? (scoresArr.reduce((a,b)=>a+b,0)/scoresArr.length) : 0;

  // decide chosen family: sort families by score desc and pick top
  familyScores.sort((a,b)=>{
    const sa = a.best ? a.best.score : -999; const sb = b.best ? b.best.score : -999; return sb - sa;
  });
  let chosenFamilyRecord = familyScores[0] || null;

  // If externalOpportunity scenario (avg>=4 and no internal gaps), prefer externalPriorityRank
  const allHaveNoGaps = familyScores.every(fs => !(fs.best && fs.best.evidence && fs.best.evidence.length>0));
  if (avg >= 4 && allHaveNoGaps) {
    // pick family with lowest externalPriorityRank (explicit), fallback to previously chosen
    let bestRank = Number.POSITIVE_INFINITY; let ranked = null;
    familyScores.forEach(fs => {
      const rank = (fs.family && typeof fs.family.externalPriorityRank === 'number') ? fs.family.externalPriorityRank : Number.POSITIVE_INFINITY;
      if (rank < bestRank) { bestRank = rank; ranked = fs; }
    });
    if (ranked) chosenFamilyRecord = ranked;
  }

  // Apply chosenFamilyRecord (computed earlier) to result
  if (chosenFamilyRecord && chosenFamilyRecord.best) {
    const family = chosenFamilyRecord.family;
    const best = chosenFamilyRecord.best;

    // Map family to businessOpportunity concept
    const familyToBusinessOpp = {
      'opp-family-accounting-professional-services': 'Ampliar e estruturar novos serviços profissionais para capturar valor',
      'opp-family-payments': 'Melhorar circulação e mecanismos de captura/transferência de valor',
      'opp-family-tokenization': 'Criar novas fontes de receita e explorar modelos de propriedade e liquidez',
      'opp-family-ledger': 'Aumentar confiança, verificabilidade e auditabilidade de registros',
      'opp-family-smart_contracts': 'Automatizar processos e reduzir fricções operacionais',
      'opp-family-education': 'Preparar e capacitar clientes/mercados para adoção da nova infraestrutura'
    };

    // compute tensions (components with low scores)
    const tensions = [];
    Object.keys(components).forEach(k => {
      const v = components[k] && typeof components[k].pontuacao === 'number' ? components[k].pontuacao : null;
      if (v !== null && v <= 2) {
        tensions.push({ componentNum: k, value: v, severity: v === 1 ? 'critical' : 'high' });
      }
    });

    // compute capture capacity metrics (used later by Entry Engine)
    const leverPower = (best.leverages || []).reduce((s,l)=> s + (l.value || 0), 0);
    const marketProxyAvg = ((components['06'] && components['06'].pontuacao)||0 + (components['07'] && components['07'].pontuacao)||0 + (components['08'] && components['08'].pontuacao)||0) / 3;
    const operationCapacityAvg = (((components['03'] && components['03'].pontuacao)||0) + ((components['04'] && components['04'].pontuacao)||0) + ((components['05'] && components['05'].pontuacao)||0)) / 3;
    const captureEvidence = [
      ...((best.leverages || []).map(l => ({ componentNum: l.componentNum, value: l.value, type: 'captureLever' }))),
      { componentNum: '06', value: marketProxyAvg, type: 'marketProxy' },
      { componentNum: '03', value: operationCapacityAvg, type: 'operationCapacity' }
    ];

    // decide whether there's sufficient evidence for a dominant business opportunity
    const chosenScore = best.score || 0;
    const MIN_OPPORTUNITY_SCORE = 3; // conservative threshold: require clear configuration

    // compute discriminative signals
    const strongEvidenceVals = (best.evidence || []).filter(e => typeof e.value === 'number' && (e.value <= 2 || e.value >= 4));
    const strongEvidenceCount = strongEvidenceVals.length;
    const topScore = familyScores[0] && familyScores[0].best ? (familyScores[0].best.score || 0) : 0;
    const secondScore = familyScores[1] && familyScores[1].best ? (familyScores[1].best.score || 0) : -999;
    const margin = topScore - secondScore;
    const hasExternalInfrastructureSignal = avg >= 4 && (
      tensions.length === 0 ||
      (tensions.length > 0 && operationCapacityAvg >= 4 && leverPower >= 4)
    );

    // require either multiple discriminative signals, lever power, margin, or external signal to declare a business opportunity
    if (chosenScore >= MIN_OPPORTUNITY_SCORE && (strongEvidenceCount >= 2 || leverPower >= 5 || margin >= 2 || hasExternalInfrastructureSignal)) {
      // consider as a valid business opportunity
      result.opportunityFamilyId = family.id;
      result.opportunityFamilyName = family.name;
      result.possibilities = (family.possibilities || []).map(p => ({ id: p.id, name: p.name }));
      result.businessOpportunity = familyToBusinessOpp[family.id] || family.name;
      result.businessOpportunityEvidence = best.evidence || [];
      result.captureEvidence = captureEvidence;
    } else {
      // insufficient evidence to declare a dominant business opportunity
      result.opportunityFamilyId = null;
      result.opportunityFamilyName = null;
      result.possibilities = (family.possibilities || []).map(p => ({ id: p.id, name: p.name }));
      result.businessOpportunity = null;
      result.businessOpportunityEvidence = [];
      result.captureEvidence = captureEvidence;
    }

    // semantic separation of tension, opportunity, capacity, and origin
    result.tensionEvidence = tensions;

    if (result.businessOpportunity) {
      if (tensions.length > 0) {
        result.opportunityOrigin = hasExternalInfrastructureSignal ? 'MIXED' : 'INTERNAL';
      } else if (hasExternalInfrastructureSignal) {
        result.opportunityOrigin = 'EXTERNAL';
      } else {
        result.opportunityOrigin = 'INTERNAL';
      }
    } else if (hasExternalInfrastructureSignal) {
      result.opportunityOrigin = 'EXTERNAL';
    } else {
      result.opportunityOrigin = 'UNDETERMINED';
    }

    result.externalOpportunity = (result.opportunityOrigin === 'EXTERNAL');

    // blockchain possibilities: compute confidence more conservatively and require discriminative signals for HIGH
    const top = familyScores[0] || null;
    const next = familyScores[1] || null;
    const topScoreVal = top && top.best ? (top.best.score || 0) : 0;
    const secondScoreVal = next && next.best ? (next.best.score || 0) : -999;

    result.blockchainPossibilities = familyScores.map((fs, idx) => {
      const b = fs.best || { score: 0, evidence: [], leverages: [], attentionPoints: [] };
      const evidenceVals = (b.evidence || []).map(e => e.value || 0);
      const evidenceAvg = evidenceVals.length ? (evidenceVals.reduce((a,b)=>a+b,0)/evidenceVals.length) : 0;
      const leverCount = (b.leverages || []).length;

      // only the top family can reach HIGH confidence, and only with discriminative evidence or clear lever support and margin vs next
      let confidence = 'low';
      if (idx === 0) {
        if (b.score >= 4 && (evidenceAvg >= 3.5 || leverCount >= 1) && (b.score - secondScoreVal) >= 1.5) confidence = 'high';
        else if (b.score >= 3 && (evidenceAvg >= 3 || leverCount >= 1)) confidence = 'medium';
      } else {
        // non-top families are conservative: medium only if clear evidence + lever
        if (b.score >= 4 && evidenceAvg >= 4 && leverCount >= 1) confidence = 'medium';
        else confidence = 'low';
      }

      return {
        id: fs.family.id,
        name: fs.family.name,
        confidence,
        rationale: b && (b.evidence && b.evidence.length>0) ? 'Derivado de evidências internas do AS-IS' : 'Sinal externo/priority',
        supportingEvidence: (b.evidence || []).map(e => ({ componentNum: e.componentNum, reasonCode: e.reasonCode, value: e.value }))
      };
    });

    result.leverages = best.leverages || [];
    result.attentionPoints = best.attentionPoints || [];

    // attach tensions and captureCapacity to the result for auditability
    result.tensions = tensions;
    result.captureCapacity = { leverPower, marketProxyAvg, operationCapacityAvg };

    // find a secondary family with positive score and different id
    for (let i=0;i<familyScores.length;i++) {
      const fs = familyScores[i];
      if (fs.family && fs.family.id !== family.id && fs.best && fs.best.score > 0) {
        result.secondaryOpportunityId = fs.family.id; break;
      }
    }
  }

  return result;
}

module.exports = { evaluateOpportunities };

module.exports = { evaluateOpportunities };
