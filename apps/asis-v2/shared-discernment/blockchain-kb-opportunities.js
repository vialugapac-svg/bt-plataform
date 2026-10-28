// Minimal Blockchain KB for Contabilidade / Finanças
// Structure redesigned: families[] with possibilities[] (possibilities are examples)
module.exports = {
  kbVersion: 'kb-cont-fin-v1.1',
  areas: {
    "escritorio_contabil": {
      id: "escritorio_contabil",
      name: "Escritório Contábil/Contador",
      description: "Oportunidades de Blockchain/Web3 relevantes para escritórios contábeis e atores de finanças.",
      families: [
        {
          id: 'opp-family-accounting-professional-services',
          name: 'Novos serviços profissionais',
          description: 'Serviços profissionais emergentes habilitados por Blockchain para clientes e empresas.',
          externalPriorityRank: 2,
          possibilities: [
            {
              id: "op-cnt-005",
              name: "Serviços de token custodianship e compliance para clientes",
              description: "Oferecer serviços de custódia, compliance e reporting para clientes que usam ativos digitais.",
              blockchainTransformation: ["custody","compliance"],
              components: {
                opportunities: [ { num: "03", trigger: "any" } ],
                levers: [ "07", "06" ],
                limiters: [ "05", "10" ]
              },
              apply: false,
              offer: true,
              entrepreneur: true,
              solutionTags: ["custody"]
            }
          ]
        },
        {
          id: 'opp-family-payments',
          name: 'Pagamentos e circulação de valor',
          description: 'Melhorias em pagamentos, liquidação e circulação de valor.',
          externalPriorityRank: 4,
          possibilities: [
            {
              id: "op-cnt-004",
              name: "Novos mecanismos de pagamentos e liquidação",
              description: "Integração de rails de liquidação distribuída e stablecoins para melhorar velocidade e reduzir custos de transferência.",
              blockchainTransformation: ["payments","stablecoins"],
              components: {
                opportunities: [ { num: "06", trigger: "low" }, { num: "11", trigger: "low" } ],
                levers: [ "05" ],
                limiters: [ "07" ]
              },
              apply: true,
              offer: true,
              entrepreneur: false,
              solutionTags: ["payments"]
            }
          ]
        },
        {
          id: 'opp-family-tokenization',
          name: 'Ativos Digitais e Tokenização',
          description: 'Tokenização de ativos e novos modelos de propriedade.',
          externalPriorityRank: 5,
          possibilities: [
            {
              id: "op-cnt-001",
              name: "Tokenização de ativos para liquidez e frações de propriedade",
              description: "Tokenizar ativos permite criar unidades negociáveis, melhorar liquidez e abrir novos modelos de custódia e serviços contábeis.",
              blockchainTransformation: ["tokenization"],
              components: {
                opportunities: [ { num: "05", trigger: "low" }, { num: "11", trigger: "low" } ],
                levers: [ "04", "07" ],
                limiters: [ "06", "09" ]
              },
              apply: true,
              offer: true,
              entrepreneur: true,
              solutionTags: ["tokenization"]
            }
          ]
        },

        {
          id: 'opp-family-ledger',
          name: 'Registros, controles e verificabilidade',
          description: 'Ledgers distribuídos para registros confiáveis e auditáveis.',
          externalPriorityRank: 1,
          possibilities: [
            {
              id: "op-cnt-002",
              name: "Registros contábeis imutáveis e verificação de transações",
              description: "Uso de ledger distribuído para registros confiáveis e auditáveis, reduzindo fraude e aumentando confiança.",
              blockchainTransformation: ["immutability","auditability"],
              components: {
                opportunities: [ { num: "05", trigger: "any" } ],
                levers: [ "01", "03" ],
                limiters: [ "10" ]
              },
              apply: true,
              offer: true,
              entrepreneur: false,
              solutionTags: ["ledger"]
            }
          ]
        },
        {
          id: 'opp-family-smart-contracts',
          name: 'Automação e programabilidade',
          description: 'Contratos programáveis e automação de processos financeiros.',
          externalPriorityRank: 3,
          possibilities: [
            {
              id: "op-cnt-003",
              name: "Contratos programáveis para automação de processos financeiros",
              description: "Contratos inteligentes para automatizar pagamentos, reconciliação e execuções condicionais.",
              blockchainTransformation: ["smart-contracts"],
              components: {
                opportunities: [ { num: "04", trigger: "low" } ],
                levers: [ "05", "06" ],
                limiters: [ "10" ]
              },
              apply: true,
              offer: true,
              entrepreneur: true,
              solutionTags: ["smart-contracts"]
            }
          ]
        },
        {
          id: 'opp-family-education',
          name: 'Educação e preparação de clientes',
          description: 'Programas de educação e capacitação sobre ativos digitais.',
          externalPriorityRank: 6,
          possibilities: [
            {
              id: "op-cnt-006",
              name: "Programas de educação financeira e digital para clientes",
              description: "Capacitar clientes/usuários sobre ativos digitais, riscos e oportunidades, criando demanda por serviços especializados.",
              blockchainTransformation: ["education"],
              components: {
                opportunities: [ { num: "08", trigger: "any" } ],
                levers: [ "03", "06" ],
                limiters: [ "09" ]
              },
              apply: false,
              offer: true,
              entrepreneur: false,
              solutionTags: ["education"]
            }
          ]
        }
      ]
    }
  }
};
