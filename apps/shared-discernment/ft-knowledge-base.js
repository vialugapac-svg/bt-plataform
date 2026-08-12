export const FT_KNOWLEDGE_BASE = [
  {
    id: "escritorio_contabil",
    nome: "Escritório Contábil/Contador",
    infraestruturaFoco: {
      name: "Blockchain",
      explain: "Blockchain/Web3 pode impactar registros de propriedade, provisão de identidade digital, automação de tarefas contábeis por contratos inteligentes e tokenização de ativos — por isso merece atenção no Workshop."
    },
    outrosMovimentos: [
      "Inteligência Artificial",
      "Open Finance",
      "APIs Financeiras",
      "Assinatura Digital",
      "Identidade Digital"
    ],
    // Para compatibilidade com o código existente que espera `infraestruturas` como array,
    // mantemos um campo `infraestruturas` com Blockchain como primeiro item seguido dos demais.
    infraestruturas: [
      "Blockchain",
      "Inteligência Artificial",
      "Open Finance",
      "APIs Financeiras",
      "Assinatura Digital",
      "Identidade Digital"
    ]
  },
  {
    id: "empresario",
    nome: "Empresário",
    infraestruturaFoco: {
      name: "Blockchain",
      explain: "Blockchain/Web3 pode abrir novas formas de contratos, registros confiáveis e modelos de financiamento coletivo (tokenização), impactando estrutura de negócios e relações com clientes."
    },
    outrosMovimentos: [
      "Computação em Nuvem",
      "Comércio Digital",
      "APIs",
      "Identidade Digital",
      "Inteligência Artificial"
    ],
    infraestruturas: [
      "Blockchain",
      "Computação em Nuvem",
      "Comércio Digital",
      "APIs",
      "Identidade Digital",
      "Inteligência Artificial"
    ]
  },
  {
    id: "profissional_liberal",
    nome: "Profissional Liberal",
    infraestruturaFoco: {
      name: "Blockchain",
      explain: "Blockchain/Web3 pode oferecer identidade auto-soberana, registros verificáveis de credenciais e novos canais de monetização direta (por exemplo via tokens), tornando-se relevante para profissionais autônomos."
    },
    outrosMovimentos: [
      "Identidade Digital",
      "Assinatura Digital",
      "Computação em Nuvem",
      "Plataformas de Serviços",
      "APIs"
    ],
    infraestruturas: [
      "Blockchain",
      "Identidade Digital",
      "Assinatura Digital",
      "Computação em Nuvem",
      "Plataformas de Serviços",
      "APIs"
    ]
  },
  {
    id: "outros",
    nome: "Outros",
    infraestruturaFoco: {
      name: "Blockchain",
      explain: "Mesmo em setores variados, Blockchain/Web3 pode afetar confiança, rastreabilidade e modelos de valor — por isso aparece como infraestrutura em foco para reflexão no Workshop."
    },
    outrosMovimentos: [
      "Inteligência Artificial",
      "Computação em Nuvem",
      "Internet das Coisas",
      "APIs"
    ],
    infraestruturas: [
      "Blockchain",
      "Inteligência Artificial",
      "Computação em Nuvem",
      "Internet das Coisas",
      "APIs"
    ]
  }
];

// Para compatibilidade com chamadas que importavam SECTOR_TRANSFORMATION,
// exportamos também com esse nome apontando para a mesma estrutura.
export const SECTOR_TRANSFORMATION = FT_KNOWLEDGE_BASE;
