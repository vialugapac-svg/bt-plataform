// Test harness for FT Opportunity + Entry Engine
const oppEngine = require('./opportunity-engine');
const entryEngine = require('./entry-engine');
const profileAdapter = require('./profile-adapter');
const compDict = require('./component-dictionary');

// Integrity checks: component-dictionary.js must be the single source of truth
// Canonical list (must match compDict.components shortName exactly)
const canonical = {
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

(function validateComponentDictionary() {
  const comps = compDict && compDict.components ? compDict.components : {};
  const ids = Object.keys(comps || {});
  // 1) must have exactly 11 components
  if (ids.length !== 11) {
    console.error('COMPONENT DICTIONARY INTEGRITY FAIL: expected 11 components, got', ids.length);
    process.exit(3);
  }
  // 2) all IDs 01..11 present and unique
  for (let i=1;i<=11;i++) {
    const id = String(i).padStart(2,'0');
    if (!comps[id]) {
      console.error('COMPONENT DICTIONARY INTEGRITY FAIL: missing id', id);
      process.exit(3);
    }
    // 3) shortName must match canonical
    const short = comps[id].shortName || comps[id].nome || comps[id].name;
    if (short !== canonical[id]) {
      console.error(`COMPONENT DICTIONARY INTEGRITY FAIL: id ${id} shortName mismatch. expected "${canonical[id]}", got "${short}"`);
      process.exit(3);
    }
  }
  // if reached here, pass
  console.log('Component dictionary integrity: PASS');
})();

function makeDiagnostico(scores) {
  // scores: object mapping num -> pontuacao
  const componentes = {};
  Object.keys(scores).forEach(k => { componentes[k] = { pontuacao: scores[k] }; });
  return { componentes };
}

const fs = require('fs');
const path = require('path');
const kbModule = require('./blockchain-kb-opportunities');

const tests = [];

// 1) modelo estruturalmente frágil
tests.push({
  id: 'case-1-fragil',
  area: 'escritorio_contabil',
  profile: 'Empresário',
  diagnostico: makeDiagnostico({
    '01':2,'02':2,'03':2,'04':1,'05':1,'06':2,'07':2,'08':2,'09':1,'10':1,'11':1
  })
});

// 2) mercado forte / oferta fraca
tests.push({
  id: 'case-2-mercado-forte-oferta-fraca',
  area: 'escritorio_contabil',
  profile: 'Empresário',
  diagnostico: makeDiagnostico({
    '01':4,'02':4,'03':2,'04':2,'05':3,'06':4,'07':4,'08':3,'09':3,'10':3,'11':2
  })
});

// 3) mercado forte / operação frágil
tests.push({
  id: 'case-3-mercado-forte-operacao-fragil',
  area: 'escritorio_contabil',
  profile: 'Profissional Liberal',
  diagnostico: makeDiagnostico({
    '01':4,'02':4,'03':4,'04':2,'05':2,'06':4,'07':4,'08':4,'09':2,'10':2,'11':3
  })
});

// 4) modelo estruturado / receitas fracas
tests.push({
  id: 'case-4-estruturado-receitas-fracas',
  area: 'escritorio_contabil',
  profile: 'Empresário',
  diagnostico: makeDiagnostico({
    '01':4,'02':4,'03':4,'04':4,'05':4,'06':3,'07':3,'08':4,'09':4,'10':3,'11':2
  })
});

// 5) modelo forte sem gap determinante
tests.push({
  id: 'case-5-modelo-forte',
  area: 'escritorio_contabil',
  profile: 'Executivo/Gestor',
  diagnostico: makeDiagnostico({
    '01':5,'02':4,'03':5,'04':5,'05':4,'06':4,'07':4,'08':5,'09':4,'10':4,'11':4
  })
});

// 6) oportunidade comercial forte com limitadores operacionais críticos
tests.push({
  id: 'case-6-oportunidade-comercial-com-limitadores',
  area: 'escritorio_contabil',
  profile: 'Empreendedor em formação',
  diagnostico: makeDiagnostico({
    '01':3,'02':4,'03':4,'04':2,'05':2,'06':4,'07':3,'08':4,'09':2,'10':2,'11':4
  })
});

// 7) proteção semântica: Ativos muito baixos mas modelo forte
tests.push({
  id: 'case-7-protecao-asset-low',
  area: 'escritorio_contabil',
  profile: 'Empresário',
  diagnostico: makeDiagnostico({
    '01':5,'02':5,'03':5,'04':5,'05':1,'06':5,'07':5,'08':5,'09':5,'10':5,'11':5
  })
});

// 8) modelo mediano sem gap dominante
tests.push({
  id: 'case-8-mediano',
  area: 'escritorio_contabil',
  profile: 'Empresário',
  diagnostico: makeDiagnostico({
    '01':3,'02':3,'03':3,'04':3,'05':3,'06':3,'07':3,'08':3,'09':3,'10':3,'11':3
  })
});

// 11) quase neutro: majority 3 and a single 4 (no discriminative evidence expected)
tests.push({
  id: 'case-11-quase-neutro',
  area: 'escritorio_contabil',
  profile: 'Empresário',
  diagnostico: makeDiagnostico({
    '01':3,'02':3,'03':3,'04':3,'05':3,'06':3,'07':3,'08':3,'09':3,'10':3,'11':4
  })
});

// 12) tensão sem capacidade: múltiplas tensões internas relevantes, poucas alavancas e baixa capacidade de captura
// Expectation: tensions present, low captureCapacity, entryDoor = PREPARAR
tests.push({
  id: 'case-12-tensao-sem-capacidade',
  area: 'escritorio_contabil',
  profile: 'Empresário',
  diagnostico: makeDiagnostico({
    '01':3,'02':2,'03':2,'04':1,'05':2,'06':3,'07':2,'08':3,'09':2,'10':2,'11':3
  })
});

// 13) mixed: internal tension + relevant external infrastructure signal
// This validates that the engine distinguishes MIXED from pure INTERNAL or EXTERNAL.
tests.push({
  id: 'case-13-mixed',
  area: 'escritorio_contabil',
  profile: 'Empresário',
  diagnostico: makeDiagnostico({
    '01':4,'02':4,'03':4,'04':5,'05':4,'06':5,'07':5,'08':5,'09':4,'10':2,'11':5
  })
});
 
// 9) proposta forte + mercado fraco
tests.push({
  id: 'case-9-proposta-forte-mercado-fraco',
  area: 'escritorio_contabil',
  profile: 'Empresário',
  diagnostico: makeDiagnostico({
    '01':4,'02':4,'03':5,'04':4,'05':4,'06':2,'07':2,'08':3,'09':3,'10':3,'11':3
  })
});

// 10) operação forte + proposta e receita fracas
tests.push({
  id: 'case-10-operacao-forte-proposta-receita-fracas',
  area: 'escritorio_contabil',
  profile: 'Empresário',
  diagnostico: makeDiagnostico({
    '01':4,'02':4,'03':2,'04':5,'05':4,'06':4,'07':4,'08':4,'09':4,'10':3,'11':2
  })
});

function runTest(t) {
  const diag = t.diagnostico;
  const area = t.area;
  const profile = profileAdapter.adaptProfile(t.profile);

  // Validate that diagnostico component numbers exist in component dictionary
  const compKeys = Object.keys(diag.componentes || {});
  for (let k of compKeys) {
    if (!compDict.components[k]) {
      console.error(`TEST HARNESS ERROR: diagnostico references unknown component id ${k} in test ${t.id}`);
      process.exit(5);
    }
  }

  const opRes = oppEngine.evaluateOpportunities(diag, area, profile);
  // Run entry engine to decide door
  const entry = entryEngine.decideEntryDoor(opRes, diag);
  const out = {
    testId: t.id,
    businessOpportunity: opRes.businessOpportunity || null,
    businessOpportunityEvidence: opRes.businessOpportunityEvidence || [],
    tensionEvidence: opRes.tensionEvidence || [],
    blockchainPossibilities: opRes.blockchainPossibilities || [],
    leverages: opRes.leverages || [],
    attentionPoints: opRes.attentionPoints || [],
    tensions: opRes.tensions || [],
    captureCapacity: opRes.captureCapacity || { leverPower:0, marketProxyAvg:0, operationCapacityAvg:0 },
    captureEvidence: opRes.captureEvidence || [],
    opportunityOrigin: opRes.opportunityOrigin || 'UNDETERMINED',
    entryDoor: entry.entryDoor,
    entryReasons: entry.entryReasons,
    externalOpportunity: opRes.externalOpportunity || false
  };
  return out;
}

console.log('Running FT Engine V1 tests\n');

// Additional static validations before execution
// 1) Ensure KB references only valid component IDs
const kb = kbModule || {};
const kbAreas = kb.areas || {};
const kbInvalidRefs = [];
Object.keys(kbAreas).forEach(areaId => {
  const families = (kbAreas[areaId].families || []);
  families.forEach(f => {
    (f.possibilities || []).forEach(p => {
      const comps = (p.components || {});
      ['opportunities','levers','limiters'].forEach(section => {
        (comps[section] || []).forEach(item => {
          const num = (typeof item === 'string') ? item : (item.num || null);
          if (num && !compDict.components[num]) kbInvalidRefs.push({ area: areaId, family: f.id, possibility: p.id, section, num });
        });
      });
    });
  });
});
if (kbInvalidRefs.length>0) {
  console.error('KB VALIDATION FAIL: KB references unknown component IDs:');
  console.error(JSON.stringify(kbInvalidRefs, null, 2));
  process.exit(6);
}

// 2) Ensure no engine file or KB contains hard-coded test case IDs (simple heuristic)
const suspectFiles = [path.join(__dirname,'opportunity-engine.js'), path.join(__dirname,'entry-engine.js')];
for (let f of suspectFiles) {
  const content = fs.readFileSync(f,'utf8');
  if (/case-\d/.test(content)) {
    console.error('HARDCODE DETECTED: file', f, 'contains test case identifiers (case-#). Aborting.');
    process.exit(7);
  }
}

// Run tests once
const results = tests.map(runTest);

// Validation: fail if businessOpportunity contains forbidden blockchain technology terms
const forbidden = ['blockchain','bitcoin','token','tokenização','tokenizacao','ativos digitais','smart contract','smart contracts','contrato inteligente','contratos inteligentes','stablecoin','stablecoins','ledger','liqpay','liq-pay','custódia','custodia'];
const failures = [];
results.forEach(r=>{
  const bo = (r.businessOpportunity||'').toLowerCase();
  forbidden.forEach(f=>{ if (bo.indexOf(f) !== -1) failures.push({ testId: r.testId, businessOpportunity: r.businessOpportunity, term: f }); });
});
if (failures.length>0) {
  console.error('TEST FAILURE: businessOpportunity contains forbidden technology terms');
  console.error(JSON.stringify(failures, null, 2));
  process.exit(2);
}

// Determinism: run the same tests again and compare results
const results2 = tests.map(runTest);
function normalize(resArr) {
  return JSON.stringify(resArr, null, 2);
}
if (normalize(results) !== normalize(results2)) {
  console.error('TEST FAILURE: Non-deterministic outputs between runs');
  process.exit(4);
}

// Additional methodological protections
const methodAlerts = [];
const neutralVectorPredicate = (diag) => {
  const values = Object.values(diag.componentes || {}).map(c => Number(c.pontuacao));
  return values.length === 11 && values.every(v => v >= 2 && v <= 4) && values.filter(v => v === 3).length >= 8 && values.filter(v => v === 4).length <= 1;
};

results.forEach(r => {
  const testDef = tests.find(t => t.id === r.testId);
  const diag = testDef ? testDef.diagnostico : null;

  // A) businessOpportunity == null + multiple HIGH possibilities -> alert/fail
  const highPoss = (r.blockchainPossibilities || []).filter(p => p.confidence === 'high');
  if (!r.businessOpportunity && highPoss.length >= 2) {
    methodAlerts.push({ testId: r.testId, issue: 'No businessOpportunity declared but multiple blockchain possibilities with HIGH confidence', highPossibilities: highPoss.map(p=>p.id) });
  }

  // B) no discriminant evidence + OFERECER/EMPREENDER => fail
  const noDiscriminant = (!r.businessOpportunity && (!r.businessOpportunityEvidence || r.businessOpportunityEvidence.length===0) && (!r.tensions || r.tensions.length===0));
  if (noDiscriminant && (r.entryDoor === 'OFERECER' || r.entryDoor === 'EMPREENDER')) {
    methodAlerts.push({ testId: r.testId, issue: `Configuration without discriminant evidence produced entryDoor=${r.entryDoor}` });
  }

  // C) neutral value (3) must not be counted as LEVER strong
  (r.leverages || []).forEach(l => {
    if ((l.value || 0) === 3) {
      methodAlerts.push({ testId: r.testId, issue: 'A component with value 3 was treated as a strong LEVER', componentNum: l.componentNum });
    }
  });

  // D) HIGH confidence must be supported by discriminative evidence or lever support
  (r.blockchainPossibilities || []).forEach(p => {
    if (p.confidence === 'high') {
      const supp = p.supportingEvidence || [];
      const hasStrongSupp = supp.length>0 && supp.some(s => (s.value || 0) >= 4 || (s.value || 0) <= 2);
      const hasLeverSupport = (r.leverages || []).length > 0;
      if (!hasStrongSupp && !hasLeverSupport) {
        methodAlerts.push({ testId: r.testId, issue: `Possibility ${p.id} marked HIGH without discriminative supporting evidence or lever support` });
      }
    }
  });

  // E) neutral/near-neutral configurations must not fabricate a dominant business opportunity or EXTERNAL origin
  if (diag && neutralVectorPredicate(diag)) {
    if (r.businessOpportunity) {
      methodAlerts.push({ testId: r.testId, issue: 'Neutral configuration fabricated a dominant business opportunity', businessOpportunity: r.businessOpportunity });
    }
    if (r.opportunityOrigin === 'EXTERNAL') {
      methodAlerts.push({ testId: r.testId, issue: 'Neutral configuration fabricated EXTERNAL opportunity origin', opportunityOrigin: r.opportunityOrigin });
    }
  }

  // F) EXPLORAR is not automatically EXTERNAL; it can remain exploratory without implying infrastructure-led origin
  if (r.entryDoor === 'EXPLORAR' && r.opportunityOrigin === 'EXTERNAL' && (!r.businessOpportunity || !(r.captureCapacity && r.captureCapacity.leverPower >= 4))) {
    methodAlerts.push({ testId: r.testId, issue: 'EXPLORAR is being equated with EXTERNAL without sufficient evidence' });
  }
});

if (methodAlerts.length>0) {
  console.error('METHODOLOGICAL ALERTS / FAILS:');
  console.error(JSON.stringify(methodAlerts, null, 2));
  // exit with non-zero so user can inspect
  process.exit(8);
}

// All good — print summarized results
console.log(JSON.stringify(results, null, 2));
