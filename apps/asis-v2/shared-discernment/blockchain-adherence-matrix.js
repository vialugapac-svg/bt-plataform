const componentDictionary = require('./component-dictionary');

const BLOCKCHAIN_ADHERENCE_MATRIX = {
  version: 'blockchain-adherence-matrix-v1',
  components: {
    '01': {
      componentId: '01',
      componentName: componentDictionary.components['01'].shortName,
      adherenceLevel: 'BAIXA_MEDIA',
      adherenceRank: 2,
      summary: 'Blockchain tende a ser menos operacional aqui, mas pode dialogar com transparencia, confianca, inclusao e verificabilidade do impacto.',
      signalFamilies: ['autenticacao_identidade', 'registros_rastreabilidade', 'impactos_verificaveis'],
      capabilities: ['transparencia verificavel', 'identidade digital', 'prova auditavel de impacto'],
      experimentTypes: [
        'Testar um registro verificavel de promessas, credenciais ou evidencias de impacto ligadas ao proposito.'
      ],
      observationCriteria: ['clareza', 'confianca percebida', 'comprovacao', 'facilidade de acesso']
    },
    '02': {
      componentId: '02',
      componentName: componentDictionary.components['02'].shortName,
      adherenceLevel: 'ALTA',
      adherenceRank: 3,
      summary: 'Problemas envolvendo acesso, confianca, demora, fronteiras e intermediarios costumam ter contato natural com novas infraestruturas de valor.',
      signalFamilies: ['intermediarios', 'operacao_internacional', 'custos_taxas_retrabalho', 'circulacao_valor'],
      capabilities: ['transacoes diretas', 'reducoes de friccao', 'liquidacao mais simples', 'confianca entre partes'],
      experimentTypes: [
        'Escolher um problema real de acesso, friccao ou intermediacao e comparar o fluxo atual com um fluxo alternativo apoiado pela nova infraestrutura.'
      ],
      observationCriteria: ['tempo', 'friccao', 'numero de intermediarios', 'facilidade de acesso']
    },
    '03': {
      componentId: '03',
      componentName: componentDictionary.components['03'].shortName,
      adherenceLevel: 'ALTA',
      adherenceRank: 3,
      summary: 'A proposta de valor pode ganhar confianca, autenticidade, velocidade ou novos atributos de propriedade e verificabilidade.',
      signalFamilies: ['pagamentos_recebimentos', 'registros_rastreabilidade', 'autenticacao_identidade', 'ativos_propriedade_direitos'],
      capabilities: ['autenticidade', 'propriedade digital', 'provas de origem', 'reducao de friccao'],
      experimentTypes: [
        'Escolher uma entrega concreta e testar se verificabilidade, autenticidade ou propriedade programavel mudam a percepcao de valor.'
      ],
      observationCriteria: ['percepcao de valor', 'confianca', 'friccao da entrega', 'diferenciacao']
    },
    '04': {
      componentId: '04',
      componentName: componentDictionary.components['04'].shortName,
      adherenceLevel: 'MUITO_ALTA',
      adherenceRank: 4,
      summary: 'Processos sao um dos territorios mais naturais para experimentacao quando ha pagamentos, conciliacao, registros, autorizacoes ou retrabalho.',
      signalFamilies: ['pagamentos_recebimentos', 'liquidacao_conciliacao', 'contratos_autorizacoes', 'registros_rastreabilidade', 'custos_taxas_retrabalho'],
      capabilities: ['programabilidade', 'automacao condicional', 'registro compartilhado', 'rastreamento operacional'],
      experimentTypes: [
        'Escolher um processo real com pagamentos, validacoes ou conciliacao e simular a execucao com menos intermediacao e maior rastreabilidade.'
      ],
      observationCriteria: ['tempo', 'retrabalho', 'erros', 'reconciliacao', 'seguranca operacional']
    },
    '05': {
      componentId: '05',
      componentName: componentDictionary.components['05'].shortName,
      adherenceLevel: 'MUITO_ALTA',
      adherenceRank: 4,
      summary: 'Ativos, documentos, direitos e certificados costumam aderir fortemente a estruturas verificaveis e programaveis.',
      signalFamilies: ['ativos_propriedade_direitos', 'registros_rastreabilidade', 'autenticacao_identidade'],
      capabilities: ['tokenizacao', 'prova de propriedade', 'credenciais verificaveis', 'custodia digital'],
      experimentTypes: [
        'Selecionar um ativo, direito, documento ou certificado relevante e testar uma representacao verificavel antes de qualquer implementacao definitiva.'
      ],
      observationCriteria: ['prova de propriedade', 'facilidade de auditoria', 'acesso', 'seguranca documental']
    },
    '06': {
      componentId: '06',
      componentName: componentDictionary.components['06'].shortName,
      adherenceLevel: 'ALTA',
      adherenceRank: 3,
      summary: 'Canais podem se transformar quando recebimentos, pagamentos diretos, transacoes digitais e operacoes internacionais entram em jogo.',
      signalFamilies: ['pagamentos_recebimentos', 'circulacao_valor', 'operacao_internacional'],
      capabilities: ['novos trilhos de pagamento', 'liquidacao digital', 'transacoes diretas', 'alcance internacional'],
      experimentTypes: [
        'Escolher um canal de recebimento ou relacionamento e testar um fluxo alternativo com menor friccao para pagamento ou confirmacao.'
      ],
      observationCriteria: ['tempo de recebimento', 'custo de transacao', 'friccao para o cliente', 'alcance geográfico']
    },
    '07': {
      componentId: '07',
      componentName: componentDictionary.components['07'].shortName,
      adherenceLevel: 'MUITO_ALTA',
      adherenceRank: 4,
      summary: 'Ecossistemas com varios atores, confianca compartilhada, validacoes cruzadas e parceiros tendem a ser territórios fortes para experimentacao.',
      signalFamilies: ['parceiros_fornecedores', 'intermediarios', 'registros_rastreabilidade', 'operacao_internacional', 'circulacao_valor'],
      capabilities: ['registro compartilhado', 'validacao entre organizacoes', 'redução de assimetria de informacao', 'liquidacao multiparte'],
      experimentTypes: [
        'Escolher um fluxo entre duas ou mais organizacoes e testar um registro compartilhado ou uma validacao comum sem mexer na operacao central.'
      ],
      observationCriteria: ['tempo entre partes', 'confianca compartilhada', 'necessidade de reconciliacao', 'visibilidade do fluxo']
    },
    '08': {
      componentId: '08',
      componentName: componentDictionary.components['08'].shortName,
      adherenceLevel: 'MEDIA_ALTA',
      adherenceRank: 3,
      summary: 'Clientes e pessoas podem se beneficiar de identidade, acesso, propriedade, credenciais e novos meios de pagamento.',
      signalFamilies: ['autenticacao_identidade', 'pagamentos_recebimentos', 'ativos_propriedade_direitos'],
      capabilities: ['identidade digital', 'credenciais verificaveis', 'pagamentos diretos', 'propriedade de ativos digitais'],
      experimentTypes: [
        'Selecionar uma interacao com clientes ou pessoas e testar identidade verificavel, comprovacao de credencial ou um novo fluxo de pagamento.'
      ],
      observationCriteria: ['experiencia', 'tempo de validacao', 'confianca', 'adocao']
    },
    '09': {
      componentId: '09',
      componentName: componentDictionary.components['09'].shortName,
      adherenceLevel: 'ALTA',
      adherenceRank: 3,
      summary: 'Jornada ganha aderencia quando existem etapas manuais, espera, validacoes, intermediarios ou transferencia de valor entre etapas.',
      signalFamilies: ['pagamentos_recebimentos', 'liquidacao_conciliacao', 'intermediarios', 'custos_taxas_retrabalho', 'contratos_autorizacoes'],
      capabilities: ['encurtamento de etapas', 'validacoes programaveis', 'redução de espera', 'rastreamento entre momentos da jornada'],
      experimentTypes: [
        'Mapear uma jornada real, identificar uma etapa de espera ou validacao e testar uma versao menor com nova infraestrutura.'
      ],
      observationCriteria: ['tempo de espera', 'quantidade de passos', 'confirmacoes manuais', 'satisfacao']
    },
    '10': {
      componentId: '10',
      componentName: componentDictionary.components['10'].shortName,
      adherenceLevel: 'MUITO_ALTA',
      adherenceRank: 4,
      summary: 'Custos, fraudes, taxas, reconciliacao e retrabalho sao sinais frequentes de que vale testar uma infraestrutura diferente.',
      signalFamilies: ['custos_taxas_retrabalho', 'intermediarios', 'liquidacao_conciliacao', 'registros_rastreabilidade'],
      capabilities: ['reducao de conciliacao', 'auditoria mais simples', 'menos friccao operacional', 'melhor rastreabilidade'],
      experimentTypes: [
        'Escolher um custo recorrente, taxa ou ponto de retrabalho e comparar o fluxo atual com uma alternativa menor e observavel.'
      ],
      observationCriteria: ['custo', 'taxas', 'fraude', 'retrabalho', 'tempo de conciliacao']
    },
    '11': {
      componentId: '11',
      componentName: componentDictionary.components['11'].shortName,
      adherenceLevel: 'MUITO_ALTA',
      adherenceRank: 4,
      summary: 'Receitas e impactos positivos podem ganhar novos fluxos por micropagamentos, monetizacao direta, incentivos e impacto verificavel.',
      signalFamilies: ['receitas_monetizacao', 'incentivos', 'impactos_verificaveis', 'pagamentos_recebimentos', 'ativos_propriedade_direitos'],
      capabilities: ['novos fluxos de receita', 'micropagamentos', 'incentivos programaveis', 'impacto auditavel'],
      experimentTypes: [
        'Escolher uma transacao ou proposta de monetizacao pequena e testar se a nova infraestrutura cria um fluxo novo ou mais observavel.'
      ],
      observationCriteria: ['nova receita', 'adesao', 'custo de captura', 'impacto observavel']
    }
  }
};

module.exports = BLOCKCHAIN_ADHERENCE_MATRIX;
