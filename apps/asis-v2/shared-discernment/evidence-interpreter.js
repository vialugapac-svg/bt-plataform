const SIGNAL_FAMILIES = [
  {
    id: 'pagamentos_recebimentos',
    label: 'Pagamentos e recebimentos',
    patterns: [/pagament\w*/i, /recebiment\w*/i, /cobran\w*/i, /fatura\w*/i, /\bpix\b/i, /boleto\w*/i]
  },
  {
    id: 'circulacao_valor',
    label: 'Circulacao e transferencia de valor',
    patterns: [/transfer\w*\s+de\s+valor/i, /circula\w*\s+de\s+valor/i, /repasse\w*/i, /remessa\w*/i, /transfer\w*/i]
  },
  {
    id: 'liquidacao_conciliacao',
    label: 'Liquidacao e conciliacao',
    patterns: [/liquida\w*/i, /concilia\w*/i, /reconcilia\w*/i, /fechamento\w*/i, /baixa\w*\s+financeir\w*/i]
  },
  {
    id: 'intermediarios',
    label: 'Intermediarios',
    patterns: [/intermedi[áa]ri\w*/i, /atravessador\w*/i, /terceir\w*\s+para\s+validar/i, /depende\w*\s+de\s+terceir\w*/i]
  },
  {
    id: 'registros_rastreabilidade',
    label: 'Registros e rastreabilidade',
    patterns: [/registro\w*/i, /rastre\w*/i, /trilha\w*\s+de\s+auditoria/i, /audit\w*/i, /comprov\w*/i]
  },
  {
    id: 'autenticacao_identidade',
    label: 'Autenticacao e identidade',
    patterns: [/autentic\w*/i, /identidade\w*/i, /credencia\w*/i, /assinatura\w*\s+digital/i, /valida\w*\s+de\s+acesso/i]
  },
  {
    id: 'contratos_autorizacoes',
    label: 'Contratos e autorizacoes',
    patterns: [/contrat\w*/i, /autoriza\w*/i, /aprova\w*/i, /assinatura\w*/i, /condiciona\w*\s+pagament\w*/i]
  },
  {
    id: 'ativos_propriedade_direitos',
    label: 'Ativos, propriedade e direitos',
    patterns: [/ativo\w*/i, /propriedad\w*/i, /direit\w*/i, /certificad\w*/i, /document\w*/i, /titularidad\w*/i]
  },
  {
    id: 'parceiros_fornecedores',
    label: 'Parceiros e fornecedores',
    patterns: [/parceir\w*/i, /fornecedor\w*/i, /ecossistema\w*/i, /distribuidor\w*/i, /rede\w*\s+de\s+parceir\w*/i]
  },
  {
    id: 'operacao_internacional',
    label: 'Operacao internacional e fronteiras',
    patterns: [/internacion\w*/i, /fronteir\w*/i, /c[aâ]mbio/i, /exterior/i, /outro\w*\s+pa[ií]s/i]
  },
  {
    id: 'custos_taxas_retrabalho',
    label: 'Custos, taxas e retrabalho',
    patterns: [/cust\w*/i, /taxa\w*/i, /tarifa\w*/i, /retrabalh\w*/i, /demora\w*/i, /espera\w*/i]
  },
  {
    id: 'receitas_monetizacao',
    label: 'Receitas e monetizacao',
    patterns: [/receita\w*/i, /monetiza\w*/i, /cobr\w*\s+recorrente/i, /nova\w*\s+fonte\w*\s+de\s+receita/i, /micropagament\w*/i]
  },
  {
    id: 'incentivos',
    label: 'Incentivos',
    patterns: [/incentiv\w*/i, /recompens\w*/i, /bonifica\w*/i, /engajament\w*\s+remunerad\w*/i]
  },
  {
    id: 'impactos_verificaveis',
    label: 'Impactos verificaveis',
    patterns: [/impact\w*/i, /comprov\w*\s+de\s+impacto/i, /evid[êe]ncia\w*\s+de\s+resultado/i, /resultado\w*\s+verific[áa]vel/i]
  }
];

const NEGATION_PATTERN = /\b(n[aã]o|sem|nunca|nenhum|nenhuma|inexistente|ausente)\b/i;

function unique(items) {
  return Array.from(new Set(items));
}

function splitText(text) {
  return String(text || '')
    .split(/[\n\r.!?;]+/)
    .map(fragment => fragment.trim())
    .filter(Boolean);
}

function inferInfluence(fragment, matchedTerms) {
  const normalizedFragment = fragment.toLowerCase();
  const hasNegation = NEGATION_PATTERN.test(normalizedFragment);
  if (!hasNegation) return 'reinforces';

  const matched = matchedTerms.some(term => normalizedFragment.includes(term.toLowerCase()));
  return matched ? 'weakens' : 'reinforces';
}

function interpretTerritoryEvidence(context) {
  const allEvidence = [];

  (context.components || []).forEach(component => {
    (component.relevantTexts || []).forEach((text, textIndex) => {
      splitText(text).forEach(fragment => {
        SIGNAL_FAMILIES.forEach(family => {
          const matchedTerms = family.patterns
            .map(pattern => {
              const match = fragment.match(pattern);
              return match ? match[0] : null;
            })
            .filter(Boolean);

          if (!matchedTerms.length) return;

          allEvidence.push({
            componentId: component.componentId,
            componentName: component.componentName,
            sourceField: textIndex === 0 ? 'primary-text' : 'supporting-text',
            familyId: family.id,
            familyLabel: family.label,
            matchedTerms: unique(matchedTerms),
            snippet: fragment,
            influence: inferInfluence(fragment, matchedTerms)
          });
        });
      });
    });
  });

  const evidenceByComponent = (context.components || []).reduce((acc, component) => {
    acc[component.componentId] = allEvidence.filter(item => item.componentId === component.componentId);
    return acc;
  }, {});

  return {
    version: 'evidence-interpreter-v1',
    signalFamilies: SIGNAL_FAMILIES.map(family => ({ id: family.id, label: family.label })),
    allEvidence,
    evidenceByComponent,
    countsByFamily: allEvidence.reduce((acc, item) => {
      acc[item.familyId] = (acc[item.familyId] || 0) + 1;
      return acc;
    }, {})
  };
}

module.exports = {
  SIGNAL_FAMILIES,
  interpretTerritoryEvidence
};
