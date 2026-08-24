const CANONICAL_AREAS = {
  contabilidade_servicos: {
    id: "contabilidade_servicos",
    name: "Contabilidade / Financeiro",
    description: "Contexto de escritórios contábeis, finanças e operações que dependem de registros, liquidação e conciliação."
  },
  comercio_varejo: {
    id: "comercio_varejo",
    name: "Comércio / Varejo",
    description: "Contexto de vendas, recebimentos, relacionamentos com clientes e fluxos de mercadoria."
  },
  servicos: {
    id: "servicos",
    name: "Serviços / Profissionais",
    description: "Contexto de prestação de serviços, autoria, entregas, contratos e validações entre partes."
  },
  industria: {
    id: "industria",
    name: "Indústria",
    description: "Contexto de produção, cadeia de suprimentos, fornecedores, certificações e rastreabilidade."
  },
  agronegocio: {
    id: "agronegocio",
    name: "Agronegócio",
    description: "Contexto de origem, safra, certificação, transporte e liquidação entre vários elos."
  },
  tecnologia_digital: {
    id: "tecnologia_digital",
    name: "Tecnologia / Negócios Digitais",
    description: "Contexto de plataformas, produtos digitais, credenciais, monetização e acesso programável."
  },
  outros: {
    id: "outros",
    name: "Outros",
    description: "Contexto transversal usado quando o participante não se reconhece em um setor específico."
  }
};

const AREA_ALIASES = {
  escritorio_contabil: "contabilidade_servicos",
  empresario: "outros",
  profissional_liberal: "servicos"
};

function areaKey(areaId) {
  return AREA_ALIASES[areaId] || areaId || "outros";
}

function areaContext(label, signals, possibility, capacity, infrastructure, explain, contextualizacao, impact, test, measure, trava) {
  return {
    situacao: label,
    sinaisAsIs: signals,
    possibilidade: possibility,
    capacidadeNecessaria: capacity,
    infraestrutura: infrastructure,
    explicacaoSimplesInfraestrutura: explain,
    contextualizacaoPorArea: contextualizacao,
    impactoPotencial: impact,
    oQueTestar: test,
    oQueMedir: measure,
    trava
  };
}

const FAMILY_TEMPLATES = [
  {
    id: "opp-family-payments",
    name: "Pagamentos e Liquidação",
    description: "Quando existe fricção relevante na circulação ou liquidação de valor.",
    externalPriorityRank: 1,
    dominantComponent: "06",
    components: {
      opportunities: [{ num: "06", trigger: "low" }, { num: "11", trigger: "low" }],
      levers: ["05"],
      limiters: ["07"]
    },
    contexts: {
      contabilidade_servicos: areaContext(
        "Cobranças, honorários e conciliações ainda exigem muitos passos.",
        ["dificuldade para pagar/receber", "muitos intermediários", "conciliação manual", "demora"],
        "Adicionar nova infraestrutura para circulação/liquidação de valor.",
        "Transferir valor digitalmente com disponibilidade, alcance ou programabilidade.",
        "Blockchain + Bitcoin/stablecoins + infraestrutura financeira digital.",
        "A infraestrutura funciona como um trilho digital para mover valor com registro e liquidação mais diretos.",
        "No escritório contábil, isso aparece em repasses, boletos, honorários e conciliação bancária.",
        ["menos tempo de espera", "menos intermediários", "melhor conciliação"],
        "Executar uma transação pequena e comparar com o fluxo atual.",
        ["tempo", "custo total", "intermediários", "dificuldade operacional", "conciliação", "experiência"],
        "Não recomendar apenas porque a empresa realiza pagamentos."
      ),
      comercio_varejo: areaContext(
        "O caixa, o checkout e os repasses ainda concentram atrito.",
        ["pagamento na borda do processo", "muitos intermediários", "custo de transação", "demora na liquidação"],
        "Adicionar nova infraestrutura para circulação/liquidação de valor.",
        "Mover valor com menos fricção entre cliente, loja, marketplace e parceiro.",
        "Blockchain + stablecoins + trilhos digitais de pagamento.",
        "É um trilho digital para receber e repassar valor com mais previsibilidade operacional.",
        "No varejo, isso aparece em checkout, marketplace, repasses e antecipações.",
        ["menos fricção no checkout", "melhor repasse", "menos dependência de janelas bancárias"],
        "Testar uma venda pequena com trilho alternativo e comparar com o fluxo atual.",
        ["tempo de recebimento", "custo total", "passos", "intermediários", "experiência do cliente"],
        "Não recomendar só porque há pagamentos frequentes."
      ),
      servicos: areaContext(
        "Honorários, adiantamentos e recebimentos de serviço ainda travam a operação.",
        ["dificuldade para receber", "muitos intermediários", "demora", "conciliação", "disputas"],
        "Adicionar nova infraestrutura para circulação/liquidação de valor.",
        "Receber e pagar com mais previsibilidade e menos fricção.",
        "Blockchain + stablecoins + infraestrutura de pagamento digital.",
        "É um trilho para movimentar valor sem depender apenas de processos bancários tradicionais.",
        "Em serviços, isso aparece em honorários, adiantamentos e confirmação de recebimento.",
        ["menos espera", "mais previsibilidade", "menos reconciliação"],
        "Testar um recebimento pequeno e observar o fluxo completo.",
        ["tempo", "custo", "etapas", "intermediários", "conciliação"],
        "Não recomendar apenas porque o negócio presta serviços."
      ),
      industria: areaContext(
        "Pagamentos a fornecedores e por lote ainda geram espera e conferência.",
        ["pagamentos por etapa", "muitos intermediários", "demora", "conciliação de notas", "custos"],
        "Adicionar nova infraestrutura para circulação/liquidação de valor.",
        "Movimentar valor com menos etapas e melhor disponibilidade.",
        "Blockchain + stablecoins + trilhos digitais de liquidação.",
        "É uma infraestrutura para acerto de valor entre produção, compra e logística.",
        "Na indústria, isso aparece em pagamentos a fornecedores, adiantamentos e liquidação de lotes.",
        ["menos espera", "menos intermediários", "liquidação mais clara"],
        "Comparar uma liquidação pequena no fluxo atual e em trilho alternativo.",
        ["tempo", "custo total", "reconciliação", "etapas", "experiência operacional"],
        "Não recomendar sem fricção real de liquidação."
      ),
      agronegocio: areaContext(
        "Compra de insumos, safra e liquidação entre elos ainda dependem de repasses lentos.",
        ["pagamentos entre elos", "liquidação tardia", "intermediários", "custos", "prazo"],
        "Adicionar nova infraestrutura para circulação/liquidação de valor.",
        "Movimentar valor com mais alcance e previsibilidade entre os elos.",
        "Blockchain + stablecoins + infraestrutura financeira digital.",
        "É um trilho para movimentar valor entre produtores, fornecedores e compradores.",
        "No agro, isso aparece em insumos, safra, recebimento e acertos entre elos.",
        ["menos espera", "menos fricção entre elos", "melhor previsibilidade"],
        "Testar uma liquidação pequena entre partes e comparar com o processo atual.",
        ["tempo", "custo", "intermediários", "conciliação", "disponibilidade"],
        "Não recomendar apenas porque existe atividade financeira."
      ),
      tecnologia_digital: areaContext(
        "Assinaturas, microtransações e operações globais ainda pedem trilhos mais flexíveis.",
        ["micropagamentos", "recebimento global", "custo de transação", "intermediários", "disponibilidade"],
        "Adicionar nova infraestrutura para circulação/liquidação de valor.",
        "Mover valor digitalmente em escala e com programabilidade.",
        "Blockchain + stablecoins + infraestrutura financeira digital.",
        "É um trilho para monetização e circulação de valor em produtos digitais.",
        "Em negócios digitais, isso aparece em assinaturas, marketplace e pagamentos globais.",
        ["menos atrito", "mais alcance", "melhor disponibilidade"],
        "Testar um fluxo digital pequeno com trilho alternativo.",
        ["tempo", "custo", "etapas", "intermediários", "experiência"],
        "Não recomendar sem um caso claro de circulação de valor."
      ),
      outros: areaContext(
        "Quando existe fricção para receber, pagar ou conciliar, a nova infraestrutura merece atenção.",
        ["dificuldade para pagar/receber", "muitos intermediários", "demora", "conciliação"],
        "Adicionar nova infraestrutura para circulação/liquidação de valor.",
        "Mover valor digitalmente com menos fricção.",
        "Blockchain + stablecoins + infraestrutura financeira digital.",
        "É um trilho digital para movimentar valor com mais direções e disponibilidade.",
        "Em qualquer contexto, isso aparece quando o dinheiro ou o valor criam atrito operacional.",
        ["menos fricção", "melhor experiência", "menos intermediários"],
        "Executar uma transação pequena e comparar com o fluxo atual.",
        ["tempo", "custo", "intermediários", "conciliacao"],
        "Não recomendar sem evidência de fricção financeira."
      )
    }
  },
  {
    id: "opp-family-programmability",
    name: "Programabilidade e Automação",
    description: "Quando uma condição verificável pode disparar uma ação previamente definida.",
    externalPriorityRank: 2,
    dominantComponent: "04",
    components: {
      opportunities: [{ num: "04", trigger: "low" }],
      levers: ["05", "06"],
      limiters: ["10"]
    },
    contexts: {
      contabilidade_servicos: areaContext(
        "Aprovações, conciliações e conferências continuam manuais.",
        ["repetição", "aprovação", "conferência", "condição objetiva"],
        "Fazer uma condição verificável disparar uma ação definida.",
        "Transformar regras operacionais em regras executáveis.",
        "Smart contracts + registros verificáveis + oráculos quando necessários.",
        "É uma forma de automatizar um passo quando a condição já pode ser conferida.",
        "No escritório, isso aparece em conferências e repasses que dependem de validação manual.",
        ["menos intervenção humana", "menos erro", "mais previsibilidade"],
        "Escolher uma condição objetiva e testar SE X então Y.",
        ["tempo", "intervenções humanas", "erros", "exceções", "reconciliação"],
        "Não tratar julgamento subjetivo como automação natural."
      ),
      comercio_varejo: areaContext(
        "Promoções, repasses e liberações ainda dependem de conferência manual.",
        ["condição objetiva", "aprovação", "repetição", "repasse"],
        "Fazer uma condição verificável disparar uma ação definida.",
        "Automatizar regras de venda, repasse ou liberação.",
        "Smart contracts + automação condicional + registros verificáveis.",
        "É uma forma de acionar algo quando um evento comprovado acontece.",
        "No varejo, isso aparece em descontos, cashback, repasses e liberações.",
        ["menos espera", "menos erro", "mais consistência"],
        "Testar uma regra simples em um fluxo de venda.",
        ["tempo", "intervenções", "erros", "exceções", "reconciliação"],
        "Não automatizar o que depende de julgamento humano subjetivo."
      ),
      servicos: areaContext(
        "Entregas, aprovações e pagamentos ainda são coordenados manualmente.",
        ["repetição", "aprovação", "conferência", "repasse", "execução após evento"],
        "Fazer uma condição verificável disparar uma ação definida.",
        "Executar regras de serviço em função de eventos comprovados.",
        "Smart contracts + registros verificáveis + automação condicional.",
        "É uma forma de disparar uma ação quando o serviço já foi comprovado.",
        "Em serviços, isso aparece em entrega, aceite e cobrança condicionada.",
        ["menos retrabalho", "menos espera", "menos disputa"],
        "Escolher uma condição objetiva ligada a entrega ou aceite.",
        ["tempo", "intervenções", "erros", "exceções", "reconciliação"],
        "Não recomendar quando a regra depende de avaliação humana."
      ),
      industria: areaContext(
        "Liberação de lote, inspeção e repasse ainda dependem de validação manual.",
        ["aprovação", "conferência", "condição objetiva", "execução após evento"],
        "Fazer uma condição verificável disparar uma ação definida.",
        "Transformar etapas industriais em regras executáveis.",
        "Smart contracts + oráculos + registros verificáveis.",
        "É um gatilho digital para liberar algo quando o evento certo acontece.",
        "Na indústria, isso aparece em inspeção, aprovação e liberação de lote.",
        ["menos atraso", "menos erro", "mais previsibilidade"],
        "Testar uma condição simples em um lote ou processo de aprovação.",
        ["tempo", "intervenções humanas", "erros", "exceções", "reconciliação"],
        "Não automatizar sem uma condição objetiva verificável."
      ),
      agronegocio: areaContext(
        "Certificação, repasse e etapas de safra ainda exigem conferências manuais.",
        ["condição objetiva", "aprovação", "repetição", "repasse"],
        "Fazer uma condição verificável disparar uma ação definida.",
        "Executar regras operacionais ligadas à safra ou à certificação.",
        "Smart contracts + registros verificáveis + oráculos quando necessários.",
        "É uma forma de liberar algo quando um evento comprovado acontece.",
        "No agro, isso aparece em certificações, safra e repasses entre elos.",
        ["menos espera", "menos disputa", "mais previsibilidade"],
        "Escolher uma condição objetiva ligada a safra, certificação ou repasse.",
        ["tempo", "intervenções", "erros", "exceções", "reconciliação"],
        "Não recomendar para situações dependentes de julgamento subjetivo."
      ),
      tecnologia_digital: areaContext(
        "Licenças, acesso e repasses digitais frequentemente dependem de regra verificável.",
        ["condição objetiva", "execução após evento", "repetição", "aprovação"],
        "Fazer uma condição verificável disparar uma ação definida.",
        "Automatizar acesso, licença ou repasse.",
        "Smart contracts + regras executáveis + registros verificáveis.",
        "É uma forma de programar uma ação quando o evento certo acontece.",
        "Em negócios digitais, isso aparece em licenças, assinaturas e acesso.",
        ["menos intervenção", "mais escala", "menos erro"],
        "Testar uma condição simples de acesso, licença ou repasse.",
        ["tempo", "intervenções", "erros", "exceções", "reconciliação"],
        "Não recomendar quando a regra depende de avaliação humana."
      ),
      outros: areaContext(
        "Quando existe condição verificável antes da próxima ação, a automação merece atenção.",
        ["condição objetiva", "aprovação", "execução após evento"],
        "Fazer uma condição verificável disparar uma ação definida.",
        "Transformar regras em execuções programáveis.",
        "Smart contracts + oráculos + registros verificáveis.",
        "É uma forma de automatizar algo quando a condição foi comprovada.",
        "Em qualquer contexto, isso aparece quando existe uma regra clara a disparar.",
        ["menos intervenção", "menos erro", "mais previsibilidade"],
        "Escolher uma condição objetiva e testar SE X então Y.",
        ["tempo", "intervenções", "erros", "exceções"],
        "Não automatizar se a condição for subjetiva."
      )
    }
  },
  {
    id: "opp-family-traceability",
    name: "Rastreabilidade e Proveniência",
    description: "Quando origem, trajetória ou histórico precisam ser comprovados entre diferentes participantes.",
    externalPriorityRank: 3,
    dominantComponent: "05",
    components: {
      opportunities: [{ num: "05", trigger: "low" }, { num: "07", trigger: "low" }],
      levers: ["04", "06"],
      limiters: ["10"]
    },
    contexts: {
      contabilidade_servicos: areaContext(
        "Documentos, certificados e histórico fiscal ainda exigem conferência manual.",
        ["origem", "histórico", "certificação", "múltiplas organizações"],
        "Criar histórico verificável dos eventos relevantes.",
        "Comprovar origem, trajetória e eventos de um ativo ou documento.",
        "Blockchain/ledger + identidade digital de ativos + registros verificáveis.",
        "É um histórico digital para provar de onde algo veio e o que aconteceu com ele.",
        "No escritório, isso aparece em certificados, documentos, fiscal e registros.",
        ["mais auditabilidade", "menos tempo para localizar provas", "menos inconsistência"],
        "Mapear um documento/ativo e seus eventos críticos.",
        ["tempo para localizar evidências", "fontes consultadas", "inconsistências", "capacidade de comprovação"],
        "Não recomendar se banco de dados convencional resolver bem."
      ),
      comercio_varejo: areaContext(
        "Origem, garantia e autenticidade de produto pedem prova visível.",
        ["origem", "lote", "histórico", "certificação", "cadeia"],
        "Criar histórico verificável dos eventos relevantes.",
        "Comprovar origem e trajetória do produto.",
        "Blockchain/ledger + identidade digital + registros verificáveis.",
        "É um histórico digital para provar origem, lote e eventos relevantes.",
        "No varejo, isso aparece em origem do produto, garantia e autenticidade.",
        ["mais confiança", "menos fraude", "melhor prova de origem"],
        "Mapear um produto e seus eventos críticos.",
        ["tempo para localizar evidências", "inconsistências", "fontes consultadas"],
        "Não recomendar sem necessidade real de prova."
      ),
      servicos: areaContext(
        "Entregas e autoria precisam ser comprovadas com menos disputa.",
        ["histórico", "certificação", "múltiplas partes", "autoria"],
        "Criar histórico verificável dos eventos relevantes.",
        "Comprovar entrega, autoria e validação entre partes.",
        "Blockchain/ledger + credenciais + registros verificáveis.",
        "É um histórico digital para provar autoria, entrega e aprovação.",
        "Em serviços, isso aparece na entrega, no aceite e na autoria da produção.",
        ["menos disputa", "mais prova", "melhor confiança"],
        "Mapear uma entrega e seus eventos críticos.",
        ["tempo para localizar evidências", "inconsistências", "retrabalho"],
        "Não recomendar quando a comprovação já é trivial."
      ),
      industria: areaContext(
        "Lote, insumo, certificado e cadeia de suprimentos cruzam vários atores.",
        ["origem", "lote", "cadeia", "certificação", "múltiplas organizações"],
        "Criar histórico verificável dos eventos relevantes.",
        "Comprovar origem, processo e trajetória de um item.",
        "Blockchain/ledger + rastreabilidade + registros verificáveis.",
        "É um histórico digital para provar o caminho de um ativo ao longo da cadeia.",
        "Na indústria, isso aparece em insumo, produção, certificado e logística.",
        ["mais rastreabilidade", "menos disputa", "mais confiança"],
        "Mapear um lote e seus 3 a 5 eventos críticos.",
        ["tempo para localizar evidências", "inconsistências", "capacidade de comprovação"],
        "Não recomendar se um banco de dados central resolver com clareza."
      ),
      agronegocio: areaContext(
        "Safra, origem e certificação passam por vários elos antes do comprador final.",
        ["origem", "lote", "cadeia", "certificação", "histórico"],
        "Criar histórico verificável dos eventos relevantes.",
        "Comprovar origem, safra e trajetória do produto.",
        "Blockchain/ledger + rastreabilidade + registros verificáveis.",
        "É um histórico digital para provar origem, safra e certificações.",
        "No agro, isso aparece em lote, transporte, certificação e comercialização.",
        ["mais confiança", "menos disputa", "melhor prova de origem"],
        "Mapear um lote e seus eventos críticos.",
        ["tempo para localizar evidências", "fontes consultadas", "inconsistências"],
        "Não recomendar sem cadeia real a comprovar."
      ),
      tecnologia_digital: areaContext(
        "Versão, uso e direitos digitais precisam de trilha auditável.",
        ["histórico", "versão", "uso", "auditoria", "múltiplos participantes"],
        "Criar histórico verificável dos eventos relevantes.",
        "Comprovar trajetória, uso e autorização digital.",
        "Blockchain/ledger + identidade digital + registros verificáveis.",
        "É um histórico digital para provar o que aconteceu com um ativo digital.",
        "Em negócios digitais, isso aparece em acesso, versão, licença e uso.",
        ["mais auditabilidade", "menos fraude", "mais confiança"],
        "Mapear um ativo digital e seus eventos relevantes.",
        ["tempo para localizar evidências", "inconsistências", "facilidade de auditoria"],
        "Não recomendar sem necessidade de prova entre participantes."
      ),
      outros: areaContext(
        "Quando origem ou trajetória precisam ser comprovadas, a rastreabilidade merece atenção.",
        ["origem", "trajetória", "histórico", "certificação"],
        "Criar histórico verificável dos eventos relevantes.",
        "Comprovar origem e trajetória de algo valioso.",
        "Blockchain/ledger + registros verificáveis.",
        "É um histórico digital para provar o caminho percorrido.",
        "Em qualquer contexto, isso aparece quando a prova de origem importa.",
        ["mais auditabilidade", "menos dúvida", "mais confiança"],
        "Mapear um item e seus eventos críticos.",
        ["tempo para localizar evidências", "inconsistências", "capacidade de comprovação"],
        "Não recomendar sem necessidade de prova."
      )
    }
  },
  {
    id: "opp-family-identity",
    name: "Identidade e Credenciais",
    description: "Quando alguém precisa provar quem é, o que pode fazer ou o que possui.",
    externalPriorityRank: 4,
    dominantComponent: "08",
    components: {
      opportunities: [{ num: "08", trigger: "any" }],
      levers: ["06", "07"],
      limiters: ["09"]
    },
    contexts: {
      contabilidade_servicos: areaContext(
        "Cadastro de cliente, autorização e credencial ainda pedem conferência repetida.",
        ["cadastro repetido", "autorização", "certificação", "identidade"],
        "Apresentar e verificar credenciais digitais.",
        "Comprovar uma afirmação de forma portátil.",
        "Identidade digital + credenciais verificáveis + blockchain quando aplicável.",
        "É uma credencial digital para provar algo sem depender só de papel.",
        "No escritório, isso aparece em cadastro, autorização e documentos recorrentes.",
        ["menos retrabalho", "mais confiança", "menos burocracia"],
        "Escolher uma credencial crítica e mapear quem valida hoje.",
        ["tempo", "etapas", "documentos", "retrabalho"],
        "Não registrar dados sensíveis indiscriminadamente em Blockchain."
      ),
      comercio_varejo: areaContext(
        "Conta, acesso e confiança do consumidor ainda pedem checagens repetidas.",
        ["cadastro repetido", "autorização", "identidade", "acesso"],
        "Apresentar e verificar credenciais digitais.",
        "Comprovar identidade e acesso de forma portátil.",
        "Identidade digital + credenciais verificáveis + blockchain quando aplicável.",
        "É uma credencial digital para provar quem está autorizado.",
        "No varejo, isso aparece em programas de fidelidade, acesso e suporte.",
        ["menos fricção", "mais segurança", "melhor experiência"],
        "Testar uma credencial simples com consumidor ou parceiro.",
        ["tempo", "etapas", "documentos", "retrabalho"],
        "Não registrar dados excessivos em Blockchain."
      ),
      servicos: areaContext(
        "Autorização, assinatura e credencial profissional ainda pedem prova repetida.",
        ["autorização", "credencial", "identidade", "verificação"],
        "Apresentar e verificar credenciais digitais.",
        "Comprovar autorização e qualificação de forma portátil.",
        "Identidade digital + credenciais verificáveis.",
        "É uma credencial para provar autorização ou qualificação.",
        "Em serviços, isso aparece em assinatura, autorização e comprovação profissional.",
        ["menos retrabalho", "mais confiança", "menos envio manual"],
        "Escolher uma credencial profissional e mapear o fluxo atual.",
        ["tempo", "etapas", "documentos", "retrabalho"],
        "Não recomendar se a prova já é simples e suficiente."
      ),
      industria: areaContext(
        "Fornecedor, operador ou certificador precisam provar habilitação repetidamente.",
        ["habilitação", "certificação", "identidade", "autorização"],
        "Apresentar e verificar credenciais digitais.",
        "Comprovar habilitação e autorização de forma portátil.",
        "Identidade digital + credenciais verificáveis + blockchain quando aplicável.",
        "É uma credencial para provar habilitação entre vários participantes.",
        "Na indústria, isso aparece em fornecedor, auditoria e operação.",
        ["menos checagem", "mais confiança", "mais velocidade"],
        "Testar uma credencial de habilitação em um fornecedor ou operador.",
        ["tempo", "etapas", "documentos", "retrabalho"],
        "Não recomendar sem fluxo recorrente de checagem."
      ),
      agronegocio: areaContext(
        "Produtor, cooperativa e certificador precisam provar origem e qualificação.",
        ["identidade", "certificação", "autorização", "verificação"],
        "Apresentar e verificar credenciais digitais.",
        "Comprovar origem e qualificação de forma portátil.",
        "Identidade digital + credenciais verificáveis + blockchain quando aplicável.",
        "É uma credencial para provar origem ou habilitação no agro.",
        "No agro, isso aparece em produtor, certificação e comercialização.",
        ["menos checagem", "mais confiança", "mais rastreabilidade"],
        "Testar uma credencial de produtor ou certificação.",
        ["tempo", "etapas", "documentos", "retrabalho"],
        "Não recomendar sem necessidade real de validação."
      ),
      tecnologia_digital: areaContext(
        "Login, carteira e credencial ainda ficam presos a cada plataforma.",
        ["identidade", "login", "autorização", "portabilidade"],
        "Apresentar e verificar credenciais digitais.",
        "Comprovar identidade e permissões entre plataformas.",
        "Identidade auto-soberana + credenciais verificáveis + blockchain.",
        "É uma credencial para atravessar plataformas sem repetir cadastro.",
        "Em negócios digitais, isso aparece em login, acesso e portabilidade.",
        ["menos cadastro", "mais portabilidade", "mais confiança"],
        "Testar uma credencial entre duas plataformas.",
        ["tempo", "etapas", "documentos", "retrabalho"],
        "Não recomendar se o dado pessoal não puder ser protegido."
      ),
      outros: areaContext(
        "Quando alguém precisa provar quem é ou o que pode fazer, a credencial importa.",
        ["identidade", "autorização", "credencial", "verificação"],
        "Apresentar e verificar credenciais digitais.",
        "Comprovar algo de forma portátil e verificável.",
        "Identidade digital + credenciais verificáveis.",
        "É uma credencial digital para reduzir prova manual.",
        "Em qualquer contexto, isso aparece quando há repetição de validação.",
        ["menos retrabalho", "mais confiança", "mais portabilidade"],
        "Escolher uma credencial crítica e mapear a validação atual.",
        ["tempo", "etapas", "documentos", "retrabalho"],
        "Não recomendar sem recorrência de validação."
      )
    }
  },
  {
    id: "opp-family-tokenization",
    name: "Tokenização e Direitos",
    description: "Quando um ativo, direito ou recebível pode ganhar representação digital com utilidade econômica real.",
    externalPriorityRank: 5,
    dominantComponent: "05",
    components: {
      opportunities: [{ num: "05", trigger: "low" }, { num: "11", trigger: "low" }],
      levers: ["04", "07"],
      limiters: ["06", "09"]
    },
    contexts: {
      contabilidade_servicos: areaContext(
        "Recebíveis, cotas, direitos e certificados podem virar representação digital.",
        ["ativo", "recebível", "direito", "propriedade", "baixa liquidez"],
        "Representar digitalmente um ativo ou direito.",
        "Criar representação digital confiável ligada ao direito econômico.",
        "Blockchain + tokenização + smart contracts + estrutura jurídica quando aplicável.",
        "É uma forma de transformar um direito em unidade digital rastreável.",
        "No escritório, isso aparece em recebíveis, cotas, certificados e direitos.",
        ["mais liquidez", "mais portabilidade", "mais controle"],
        "Mapear qual ativo/direito teria um problema econômico real.",
        ["ganho econômico esperado", "viabilidade", "aceitação", "risco operacional"],
        "Não recomendar simplesmente porque existe um ativo."
      ),
      comercio_varejo: areaContext(
        "Fidelidade, voucher e direitos de uso podem ganhar representação digital.",
        ["ativo", "direito", "acesso", "propriedade", "baixa liquidez"],
        "Representar digitalmente um ativo ou direito.",
        "Criar representação digital confiável de benefício ou acesso.",
        "Blockchain + tokenização + direitos digitais.",
        "É uma forma de representar digitalmente um benefício que pode circular.",
        "No varejo, isso aparece em programas de fidelidade, vouchers e acesso.",
        ["mais engajamento", "mais portabilidade", "mais rastreio"],
        "Escolher um benefício ou direito com problema econômico real.",
        ["ganho econômico esperado", "adaptação do cliente", "risco operacional"],
        "Não recomendar sem problema econômico claro."
      ),
      servicos: areaContext(
        "Crédito de serviço, acesso e contrato podem virar direito digital.",
        ["direito", "acesso", "propriedade", "recebível", "baixa liquidez"],
        "Representar digitalmente um ativo ou direito.",
        "Criar representação digital de acesso, direito ou crédito.",
        "Blockchain + tokenização + smart contracts.",
        "É uma forma de representar digitalmente algo que hoje só existe em papel ou sistema fechado.",
        "Em serviços, isso aparece em crédito de serviço, acesso e contrato.",
        ["mais portabilidade", "mais liquidez", "mais controle"],
        "Mapear um direito econômico que hoje não circula bem.",
        ["ganho econômico esperado", "viabilidade", "risco operacional"],
        "Não recomendar sem problema econômico real."
      ),
      industria: areaContext(
        "Ativo físico, estoque ou recebível podem ser fracionados ou representados digitalmente.",
        ["ativo", "recebível", "propriedade", "financiamento", "baixa liquidez"],
        "Representar digitalmente um ativo ou direito.",
        "Criar representação digital confiável de ativo industrial.",
        "Blockchain + tokenização + estrutura jurídica quando aplicável.",
        "É uma forma de representar digitalmente um ativo com utilidade econômica.",
        "Na indústria, isso aparece em estoque, recebíveis e ativos físicos.",
        ["mais liquidez", "mais controle", "mais transparência"],
        "Mapear um ativo com problema econômico real.",
        ["ganho econômico esperado", "viabilidade jurídica", "risco operacional"],
        "Não recomendar apenas porque o ativo existe."
      ),
      agronegocio: areaContext(
        "Produção futura, safra e crédito rural podem ser representados digitalmente.",
        ["ativo", "recebível", "propriedade", "financiamento", "baixa liquidez"],
        "Representar digitalmente um ativo ou direito.",
        "Criar representação digital confiável de produção ou crédito.",
        "Blockchain + tokenização + smart contracts + estrutura jurídica.",
        "É uma forma de representar digitalmente produção futura ou crédito.",
        "No agro, isso aparece em safra, crédito e direitos econômicos.",
        ["mais liquidez", "mais acesso", "mais clareza"],
        "Mapear um direito com problema econômico real.",
        ["ganho econômico esperado", "viabilidade jurídica", "risco operacional"],
        "Não recomendar sem benefício econômico comprovado."
      ),
      tecnologia_digital: areaContext(
        "Licenças, assinaturas e direitos de uso ganham portabilidade digital.",
        ["direito", "acesso", "propriedade", "licença", "baixa liquidez"],
        "Representar digitalmente um ativo ou direito.",
        "Criar representação digital confiável de licença ou uso.",
        "Blockchain + tokenização + direitos programáveis.",
        "É uma forma de representar digitalmente uso, licença ou acesso.",
        "Em negócios digitais, isso aparece em licenças, assinaturas e acesso.",
        ["mais portabilidade", "mais monetização", "mais controle"],
        "Mapear um direito digital com problema econômico real.",
        ["ganho econômico esperado", "viabilidade", "aceitação do mercado"],
        "Não recomendar apenas para usar a tecnologia."
      ),
      outros: areaContext(
        "Quando um direito ou ativo não circula bem, a tokenização pode fazer sentido.",
        ["ativo", "direito", "propriedade", "baixa liquidez"],
        "Representar digitalmente um ativo ou direito.",
        "Criar representação digital confiável ligada ao direito econômico.",
        "Blockchain + tokenização + smart contracts.",
        "É uma forma de representar algo valioso em formato digital.",
        "Em qualquer contexto, isso aparece quando o direito tem problema econômico real.",
        ["mais liquidez", "mais portabilidade", "mais rastreabilidade"],
        "Mapear um ativo/direito com problema econômico real.",
        ["ganho econômico esperado", "viabilidade", "risco operacional"],
        "Não recomendar sem problema econômico claro."
      )
    }
  },
  {
    id: "opp-family-coordination",
    name: "Coordenação e Reconciliação",
    description: "Quando duas ou mais partes mantêm versões da mesma informação e precisam reconciliá-las.",
    externalPriorityRank: 6,
    dominantComponent: "07",
    components: {
      opportunities: [{ num: "04", trigger: "low" }, { num: "07", trigger: "low" }],
      levers: ["06", "09"],
      limiters: ["10"]
    },
    contexts: {
      contabilidade_servicos: areaContext(
        "Escritório, cliente, banco e sistema ainda mantêm versões diferentes.",
        ["informação duplicada", "múltiplos sistemas", "conferências", "reconciliação"],
        "Criar uma referência verificável compartilhada.",
        "Coordenar informações entre participantes sem múltiplas versões permanentes.",
        "Ledger compartilhado/Blockchain + integrações.",
        "É uma base comum para reduzir reconciliação manual entre partes.",
        "No escritório, isso aparece em trocas com cliente, banco e sistema.",
        ["menos reconciliação", "menos divergência", "mais visibilidade"],
        "Escolher uma informação compartilhada entre duas organizações.",
        ["tempo de reconciliação", "divergências", "retrabalho", "número de bases"],
        "Não recomendar se não houver problema real de coordenação."
      ),
      comercio_varejo: areaContext(
        "ERP, gateway e loja precisam reconciliar pedidos, estoque e pagamento.",
        ["informação duplicada", "múltiplos sistemas", "reconciliação", "retrabalho"],
        "Criar uma referência verificável compartilhada.",
        "Coordenar dados entre os sistemas sem duplicar versões.",
        "Ledger compartilhado/Blockchain + integrações.",
        "É uma base comum para manter pedido, pagamento e estoque coerentes.",
        "No varejo, isso aparece entre loja, ERP, gateway e marketplace.",
        ["menos erro", "menos divergência", "mais visibilidade"],
        "Escolher um fluxo entre sistemas e mapear divergências atuais.",
        ["tempo de reconciliação", "divergências", "retrabalho", "número de bases"],
        "Não recomendar sem reconciliação real."
      ),
      servicos: areaContext(
        "Prestador e cliente precisam concordar sobre status e entrega.",
        ["status divergente", "reconciliação", "múltiplas versões", "conferência"],
        "Criar uma referência verificável compartilhada.",
        "Coordenar informações de entrega e aceite sem versões divergentes.",
        "Ledger compartilhado/Blockchain + integrações.",
        "É uma base comum para acordar status, entrega e aceite.",
        "Em serviços, isso aparece entre prestador, cliente e financeiro.",
        ["menos disputa", "mais visibilidade", "menos retrabalho"],
        "Escolher um fluxo de entrega e mapear divergências.",
        ["tempo de reconciliação", "divergências", "retrabalho", "bases envolvidas"],
        "Não recomendar se não houver versão divergente a reconciliar."
      ),
      industria: areaContext(
        "Fornecedor, fábrica e logística precisam do mesmo registro.",
        ["informação duplicada", "múltiplos sistemas", "conferências", "reconciliação"],
        "Criar uma referência verificável compartilhada.",
        "Coordenar informações entre os participantes sem múltiplas bases.",
        "Ledger compartilhado/Blockchain + integrações.",
        "É uma base comum para alinhar o estado entre os participantes.",
        "Na indústria, isso aparece entre fornecedor, fábrica, estoque e logística.",
        ["menos divergência", "mais rastreio", "menos retrabalho"],
        "Escolher uma informação compartilhada e mapear divergências.",
        ["tempo de reconciliação", "divergências", "retrabalho", "bases"],
        "Não recomendar sem divergência real entre participantes."
      ),
      agronegocio: areaContext(
        "Produção, transporte, certificação e comprador precisam sincronizar.",
        ["versões divergentes", "reconciliação", "múltiplos atores", "conferência"],
        "Criar uma referência verificável compartilhada.",
        "Coordenar informações entre os elos sem múltiplas versões.",
        "Ledger compartilhado/Blockchain + integrações.",
        "É uma base comum para manter o estado do fluxo sincronizado.",
        "No agro, isso aparece entre produção, transporte, certificação e compra.",
        ["menos divergência", "mais visibilidade", "menos retrabalho"],
        "Escolher um fluxo entre elos e mapear divergências atuais.",
        ["tempo de reconciliação", "divergências", "retrabalho"],
        "Não recomendar sem reconciliação entre partes."
      ),
      tecnologia_digital: areaContext(
        "Plataformas e parceiros precisam compartilhar estado e evento.",
        ["múltiplos sistemas", "estado divergente", "reconciliação", "conferência"],
        "Criar uma referência verificável compartilhada.",
        "Coordenar o estado entre plataformas sem versões desconectadas.",
        "Ledger compartilhado/Blockchain + integrações.",
        "É uma base comum para sincronizar estado e evento entre partes.",
        "Em negócios digitais, isso aparece em APIs, parceiros e plataformas.",
        ["menos divergência", "mais escalabilidade", "mais confiança"],
        "Escolher um estado compartilhado e mapear divergências.",
        ["tempo de reconciliação", "divergências", "bases envolvidas"],
        "Não recomendar sem múltiplas fontes a reconciliar."
      ),
      outros: areaContext(
        "Quando versões diferentes da mesma informação geram retrabalho, a coordenação importa.",
        ["versões divergentes", "reconciliação", "múltiplas bases"],
        "Criar uma referência verificável compartilhada.",
        "Coordenar informação entre partes com menos divergência.",
        "Ledger compartilhado/Blockchain + integrações.",
        "É uma base comum para sincronizar informação entre participantes.",
        "Em qualquer contexto, isso aparece quando há retrabalho por versões distintas.",
        ["menos divergência", "mais visibilidade", "menos retrabalho"],
        "Escolher uma informação compartilhada e mapear divergências.",
        ["tempo de reconciliação", "divergências", "retrabalho"],
        "Não recomendar sem problema real de coordenação."
      )
    }
  },
  {
    id: "opp-family-new-value-models",
    name: "Novos Modelos de Valor",
    description: "Quando valor continua produzindo relação econômica depois da transação inicial.",
    externalPriorityRank: 7,
    dominantComponent: "11",
    components: {
      opportunities: [{ num: "03", trigger: "low" }, { num: "08", trigger: "low" }, { num: "11", trigger: "low" }],
      levers: ["06", "07", "09"],
      limiters: ["10"]
    },
    contexts: {
      contabilidade_servicos: areaContext(
        "Valor pode continuar depois da entrega em forma de recorrência, participação ou acesso.",
        ["receita", "impacto positivo", "relacionamento", "recorrência"],
        "Criar novas relações econômicas com acesso, propriedade, participação ou benefício.",
        "Transformar valor em relação econômica contínua.",
        "Tokens, smart contracts, identidade e wallets quando aderente.",
        "É uma forma de fazer o valor continuar depois da transação.",
        "No escritório, isso aparece em assinatura, recorrência, participação e direito.",
        ["mais recorrência", "mais monetização", "mais portabilidade"],
        "Perguntar que direito ou relação econômica pode continuar existindo.",
        ["valor percebido", "adesão", "recorrência", "viabilidade"],
        "Não inventar token, comunidade ou programa sem valor real."
      ),
      comercio_varejo: areaContext(
        "Compra pode virar acesso, comunidade ou benefício programável.",
        ["receita", "benefício", "relacionamento", "recorrência"],
        "Criar novas relações econômicas com acesso, propriedade ou participação.",
        "Transformar compra em vínculo econômico contínuo.",
        "Tokens, smart contracts e direitos programáveis.",
        "É uma forma de continuar monetizando a relação após a venda.",
        "No varejo, isso aparece em fidelidade, comunidade e benefícios.",
        ["mais recorrência", "mais engajamento", "mais valor percebido"],
        "Perguntar que relação econômica pode continuar depois da venda.",
        ["valor percebido", "adesão", "recorrência", "viabilidade"],
        "Não inventar programa sem aderência do cliente."
      ),
      servicos: areaContext(
        "Serviço pode virar assinatura, uso recorrente ou acesso contínuo.",
        ["receita", "relacionamento", "recorrência", "benefício"],
        "Criar novas relações econômicas com assinatura, acesso ou participação.",
        "Transformar serviço em vínculo econômico contínuo.",
        "Tokens, identidade, wallets e smart contracts quando aderente.",
        "É uma forma de o serviço continuar gerando valor depois da entrega inicial.",
        "Em serviços, isso aparece em assinatura, recorrência e acesso contínuo.",
        ["mais recorrência", "mais monetização", "mais retenção"],
        "Perguntar que relação econômica pode continuar depois do serviço.",
        ["valor percebido", "adesão", "recorrência", "viabilidade"],
        "Não recomendar sem possibilidade real de continuidade."
      ),
      industria: areaContext(
        "Produto pode carregar serviço, garantia ou monetização posterior.",
        ["receita", "produto", "garantia", "recorrência"],
        "Criar novas relações econômicas em torno do produto.",
        "Transformar produto em relação econômica contínua.",
        "Tokens, smart contracts e direitos programáveis.",
        "É uma forma de o produto continuar gerando valor depois da venda.",
        "Na indústria, isso aparece em garantia, serviço, reposição e acesso.",
        ["mais pós-venda", "mais monetização", "mais valor percebido"],
        "Perguntar que relação econômica pode continuar após a venda.",
        ["valor percebido", "adesão", "recorrência", "viabilidade"],
        "Não inventar modelo sem problema econômico real."
      ),
      agronegocio: areaContext(
        "Produção pode gerar crédito, rastreabilidade monetizável ou participação.",
        ["receita", "impacto positivo", "participação", "recorrência"],
        "Criar novas relações econômicas ligadas à produção.",
        "Transformar produção em vínculo econômico contínuo.",
        "Tokens, smart contracts e direitos programáveis.",
        "É uma forma de prolongar a relação econômica depois da entrega.",
        "No agro, isso aparece em crédito, rastreio monetizável e participação.",
        ["mais monetização", "mais acesso", "mais rastreabilidade"],
        "Perguntar que relação econômica pode continuar após a safra.",
        ["valor percebido", "adesão", "recorrência", "viabilidade"],
        "Não recomendar sem valor econômico claro."
      ),
      tecnologia_digital: areaContext(
        "Produto digital pode gerar royalties, acesso programável ou monetização contínua.",
        ["receita", "recorrência", "licença", "participação"],
        "Criar novas relações econômicas digitais.",
        "Transformar produto em relação econômica contínua.",
        "Tokens, wallets, smart contracts e direitos programáveis.",
        "É uma forma de o produto digital continuar produzindo valor.",
        "Em negócios digitais, isso aparece em royalties, acesso e monetização contínua.",
        ["mais monetização", "mais portabilidade", "mais recorrência"],
        "Perguntar que relação econômica pode continuar depois do uso inicial.",
        ["valor percebido", "adesão", "recorrência", "viabilidade"],
        "Não recomendar apenas para usar a tecnologia."
      ),
      outros: areaContext(
        "Quando o valor continua depois da transação, o modelo pode mudar.",
        ["receita", "relacionamento", "recorrência", "participação"],
        "Criar novas relações econômicas com acesso, propriedade ou participação.",
        "Transformar a transação em relação econômica contínua.",
        "Tokens, smart contracts e direitos programáveis.",
        "É uma forma de o valor continuar após a venda.",
        "Em qualquer contexto, isso aparece quando há recorrência, comunidade ou acesso.",
        ["mais recorrência", "mais monetização", "mais valor percebido"],
        "Perguntar que relação econômica pode continuar depois da transação.",
        ["valor percebido", "adesão", "recorrência", "viabilidade"],
        "Não recomendar sem aderência econômica real."
      )
    }
  }
];

function buildFamily(areaId, family) {
  const canonicalArea = areaKey(areaId);
  const context = family.contexts[canonicalArea] || family.contexts.outros;
  return {
    id: family.id,
    name: family.name,
    description: family.description,
    externalPriorityRank: family.externalPriorityRank,
    dominantComponent: family.dominantComponent,
    situation: context.situacao,
    signalsAsIs: context.sinaisAsIs,
    possibility: context.possibilidade,
    capacityNeeded: context.capacidadeNecessaria,
    infrastructure: context.infraestrutura,
    infrastructureExplain: context.explicacaoSimplesInfraestrutura,
    contextualizationByArea: context.contextualizacaoPorArea,
    impactPotential: context.impactoPotencial,
    whatToTest: context.oQueTestar,
    whatToMeasure: context.oQueMedir,
    notRecommendWhen: context.trava,
    possibilities: [
      {
        id: `${family.id}-${canonicalArea}`,
        name: family.name,
        description: context.possibilidade,
        blockchainTransformation: [family.id],
        components: family.components,
        apply: true,
        offer: true,
        entrepreneur: true,
        solutionTags: [family.id],
        situation: context.situacao,
        signalsAsIs: context.sinaisAsIs,
        possibility: context.possibilidade,
        capacityNeeded: context.capacidadeNecessaria,
        infrastructure: context.infraestrutura,
        infrastructureExplain: context.explicacaoSimplesInfraestrutura,
        contextualizationByArea: context.contextualizacaoPorArea,
        impactPotential: context.impactoPotencial,
        whatToTest: context.oQueTestar,
        whatToMeasure: context.oQueMedir,
        notRecommendWhen: context.trava,
        dominantComponent: family.dominantComponent
      }
    ]
  };
}

function buildArea(areaId, areaDef) {
  return {
    id: areaDef.id,
    name: areaDef.name,
    description: areaDef.description,
    families: FAMILY_TEMPLATES.map(family => buildFamily(areaId, family))
  };
}

const areas = Object.fromEntries(
  Object.entries(CANONICAL_AREAS).map(([areaId, areaDef]) => [areaId, buildArea(areaId, areaDef)])
);

Object.entries(AREA_ALIASES).forEach(([aliasId, targetId]) => {
  const targetArea = CANONICAL_AREAS[targetId] || CANONICAL_AREAS.outros;
  areas[aliasId] = buildArea(targetId, {
    ...targetArea,
    id: aliasId,
    name: targetArea.name,
    description: targetArea.description
  });
});

module.exports = {
  kbVersion: "kb-v1-7-families",
  areas
};
