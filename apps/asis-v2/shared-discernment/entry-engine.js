// Entry Engine V1
// Determines PREPARAR / EXPERIMENTAR / OFERECER / EMPREENDER / EXPLORAR

const compDict = require('./component-dictionary');
const CRITICAL_COMPONENTS = ["04","05","09"]; // Processos, Ativos, Jornada

function nameOf(num) {
  try { return compDict.components[num].shortName; } catch(e) { return num; }
}

function decideEntryDoor(opResult, diagnostico) {
  // opResult: result from opportunity-engine (includes attentionPoints, leverages)
  // diagnostico: component state
  const attention = opResult.attentionPoints || [];
  const levers = opResult.leverages || [];
  const components = diagnostico.componentes || {};

  // compute critical limiters among attention points
  const criticalLimiters = attention.filter(a => CRITICAL_COMPONENTS.includes(a.componentNum));

  // compute average score
  const scores = Object.keys(components).map(k => (components[k] && components[k].pontuacao) || 0);
  const avg = scores.length ? (scores.reduce((a,b)=>a+b,0)/scores.length) : 0;

  // compute fragility: consider quantity and intensity of low-scoring components
  const fragilityItems = Object.keys(components).filter(k=> components[k] && typeof components[k].pontuacao === 'number' && components[k].pontuacao <= 2).map(k=>({ num: k, score: components[k].pontuacao }));
  let fragilityScore = 0;
  fragilityItems.forEach(it => {
    const base = (3 - it.score); // 1 for score=2, 2 for score=1
    const criticalMultiplier = CRITICAL_COMPONENTS.includes(it.num) ? 1.5 : 1.0;
    fragilityScore += base * criticalMultiplier;
  });

  // compute lever power (sum of lever values provided by Opportunity Engine)
  const leverPower = (levers || []).reduce((s,l)=> s + (l.value || 0), 0);

  // market proxies and operational capacity
  const marketProxyAvg = ((components['06'] && components['06'].pontuacao)||0 + (components['07'] && components['07'].pontuacao)||0 + (components['08'] && components['08'].pontuacao)||0) / 3;
  const operationCapacityAvg = (((components['03'] && components['03'].pontuacao)||0) + ((components['04'] && components['04'].pontuacao)||0) + ((components['05'] && components['05'].pontuacao)||0)) / 3;

  // A business opportunity exists when the engine declared a businessOpportunity or a valid origin
  // (INTERNAL/EXTERNAL/MIXED). Entry Door is a posture, not a determination of origin.
  const hasOpportunity = !!(opResult && (opResult.businessOpportunity || (opResult.opportunityOrigin && ['INTERNAL','EXTERNAL','MIXED'].includes(opResult.opportunityOrigin))));

  // No longer use simple count rule. PREPARAR only when fragilidade sistêmica combinada + insuficiência de alavancas/mercado/capacidade
  if (!hasOpportunity) {
    // If there is no identified business opportunity and no systemic fragility or attention points,
    // prefer EXPLORAR (investigate external signals) rather than assuming readiness to offer.
    if (fragilityScore === 0 && (opResult.attentionPoints || []).length === 0) {
      return { entryDoor: 'EXPLORAR', entryReasons: ['Modelo sem fragilidades internas significativas; explorar sinais externos e oportunidades.'], opportunityOrigin: opResult.opportunityOrigin || 'UNDETERMINED' };
    }

    if (fragilityScore >= 4 && leverPower < 3 && marketProxyAvg < 3 && operationCapacityAvg < 3) {
      const comps = fragilityItems.map(i => nameOf(i.num));
      const reason = `Preparar o modelo de negócio para capturar oportunidades da nova infraestrutura; fragilidades sistêmicas em ${comps.join(', ')} combinadas com alavancas insuficientes.`;
      return { entryDoor: 'PREPARAR', entryReasons: [reason] };
    }
  }

  // If there is an opportunity identified, reason about systemic fragility vs levers/market/capacity
  if (hasOpportunity) {
    // EMPREENDER: strong proposal/capacity + market + lever power
    if (operationCapacityAvg >= 4 && marketProxyAvg >= 4 && leverPower >= 4) {
      const reason = 'Proposta e capacidade operacionais fortes, com alavancas e acesso ao mercado para estruturar entrega e crescimento.';
      return { entryDoor: 'EMPREENDER', entryReasons: [reason] };
    }

    // OFERECER: existência de alavancas e acesso ao mercado com fragilidade controlável
    if (leverPower >= 4 && marketProxyAvg >= 4 && fragilityScore <= 3) {
      const leverNames = levers.map(l => nameOf(l.componentNum));
      const reason = `Existem alavancas (${leverNames.join(', ')}) e acesso ao mercado suficientes para ofertar, com pontos de atenção controláveis.`;
      return { entryDoor: 'OFERECER', entryReasons: [reason] };
    }

    // EXPERIMENTAR: oportunidade identificada, há alavancas ou mercado, mas existem limitadores operacionais que precisam validação
    if (leverPower >= 2 && (fragilityScore > 0 || attention.length > 0)) {
      const attentionNames = (opResult.attentionPoints || []).map(a => nameOf(a.componentNum));
      const reason = `Oportunidade identificada, porém existem pontos a validar: ${attentionNames.join(', ') || 'limitadores operacionais'}; recomenda-se experimentar.`;
      return { entryDoor: 'EXPERIMENTAR', entryReasons: [reason] };
    }

    // EXPLORAR: strong model and no internal attention points. This does not define opportunityOrigin;
    // it only reflects a conservative posture of exploration.
    if (attention.length === 0 && avg >= 4) {
      const reason = 'Modelo estruturalmente forte sem gap interno determinante; a postura adequada é explorar sem assumir origem única da oportunidade.';
      return { entryDoor: 'EXPLORAR', entryReasons: [reason], opportunityOrigin: opResult.opportunityOrigin || 'UNDETERMINED' };
    }

    // If there are attention points but no lever power -> PREPARAR
    if (attention.length > 0 && leverPower < 2) {
      const comps = (opResult.attentionPoints || []).map(a => nameOf(a.componentNum));
      const reason = `Preparar o modelo de negócio para capturar a oportunidade; atenção necessária em ${comps.join(', ')} e alavancas insuficientes.`;
      return { entryDoor: 'PREPARAR', entryReasons: [reason] };
    }

    // Default when opportunity exists: if some lever power, experiment; else prepare
    if (leverPower >= 2) return { entryDoor: 'EXPERIMENTAR', entryReasons: ['Existem alavancas suficientes para experimentação.'] };
    return { entryDoor: 'PREPARAR', entryReasons: ['Fragilidades e alavancas insuficientes para avançar sem preparação.'] };
  }

  // If no critical limiters and there are levers
  if ((attention.length === 0) && levers.length > 0) {
    const canal = components['06'] && components['06'].pontuacao ? components['06'].pontuacao : 0;
    const eco = components['07'] && components['07'].pontuacao ? components['07'].pontuacao : 0;
    const ativos = components['05'] && components['05'].pontuacao ? components['05'].pontuacao : 0;
    const proposta = components['03'] && components['03'].pontuacao ? components['03'].pontuacao : 0;

    // EMPREENDER: proposal strong + operational capacity + market proxies + opportunity
    if (opResult.opportunityId && proposta >= 4 && ativos >= 3 && (canal >=4 || eco >=4)) {
      const reason = 'Proposta de Valor forte, capacidade operacional razoável e acesso ao mercado; oportunidade externa permite empreender mesmo com receitas instáveis.';
      return { entryDoor: 'EMPREENDER', entryReasons: [reason] };
    }

    // OFERECER: levers + market access
    if ((canal >= 4 || eco >= 4) && levers.length > 0) {
      const leverNames = levers.map(l => nameOf(l.componentNum));
      const reason = `Existem alavancas (${leverNames.join(', ')}) e acesso ao mercado suficientes para ofertar.`;
      return { entryDoor: 'OFERECER', entryReasons: [reason] };
    }

    // Otherwise, EXPERIMENTAR to validate market/operations
    return { entryDoor: 'EXPERIMENTAR', entryReasons: ['Existem alavancas mas acesso ao mercado ou operações precisam validação'] };
  }

  // Default conservative, but make reason specific if there are attention points
  if (attention.length > 0) {
    const comps = attention.map(a => nameOf(a.componentNum));
    const reason = `Pontos de atenção em: ${comps.join(', ')} que requerem mitigação antes de avançar.`;
    return { entryDoor: 'PREPARAR', entryReasons: [reason] };
  }

  return { entryDoor: 'PREPARAR', entryReasons: ['Recomenda-se preparar antes de avançar devido a incertezas'] };
}

module.exports = { decideEntryDoor };
