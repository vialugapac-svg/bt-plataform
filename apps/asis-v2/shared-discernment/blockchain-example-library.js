const BLOCKCHAIN_EXAMPLE_LIBRARY = {
  version: "ft-example-library-v1",
  description: "Piloto da biblioteca de exemplos reais para FT View.",
  components: {
    "05": {
      componentId: "05",
      componentName: "Ativos",
      transitionPrompt: "Existe algo na sua empresa que hoje depende de conferência manual, arquivo original ou confiança em uma única organização?",
      genericFirstStep: "Escolha um caso pequeno e registre como esse processo funciona hoje antes de testar uma alternativa.",
      adherences: [
        {
          id: "tokenizacao",
          title: "Tokenização",
          businessDescription: "Representar digitalmente um bem ou direito para facilitar registro, transferência e comprovação.",
          practicalExample: "Exemplo: transformar um direito em formato digital para rastrear titularidade e histórico.",
          firstStepHint: "Mapeie um ativo/direito pequeno que hoje tem controle manual e descreva as validações atuais.",
          realCases: [
            {
              name: "Franklin OnChain U.S. Government Money Fund (FOBXX/BENJI)",
              year: "2021+",
              sourceName: "Franklin Templeton",
              sourceType: "Site oficial da gestora",
              problem: "Aplicações em renda fixa tradicionalmente ficam presas a janelas operacionais e processos pouco digitais.",
              howItWorks: "A gestora oferece um fundo de mercado monetário com operações registradas em infraestrutura digital, mantendo o produto em formato regulado.",
              blockchainRole: "A Blockchain é usada como trilho de registro para representar cotas/posições de forma digital e auditável.",
              result: "",
              lesson: "Ativos financeiros podem ganhar nova forma operacional sem mudar o objetivo econômico do produto.",
              firstStep: "Escolha um ativo financeiro simples do seu contexto e mapeie como registro, transferência e conciliação funcionam hoje.",
              whatTheyDid: "Um fundo de investimento passou a registrar cotas em infraestrutura Blockchain, mantendo o produto regulado.",
              whyHere: "Este caso aparece em Tokenização porque a cota do fundo representa um direito econômico que passou a ser representado digitalmente.",
              thinkQuestion: "Existe algum bem, direito, crédito, certificado ou documento cuja propriedade precisa ser registrada ou comprovada?",
              sourceUrl: "https://www.franklintempleton.com/investments/options/mutual-funds/products/2296/SINGLCLASS/franklin-onchain-us-government-money-fund/FOBXX"
            }
          ]
        },
        {
          id: "prova_propriedade",
          title: "Prova de propriedade/titularidade",
          businessDescription: "Comprovar de quem é alguma coisa e acompanhar seu histórico de titularidade.",
          practicalExample: "Exemplo: mostrar quem era o titular de um documento em cada momento.",
          firstStepHint: "Escolha um item com histórico sensível e descreva como a titularidade é comprovada hoje.",
          realCases: [
            {
              name: "USDC com reservas e atestações públicas",
              year: "Contínuo",
              sourceName: "Circle",
              sourceType: "Site oficial + transparência institucional",
              problem: "Muitas organizações precisam de um ativo digital com comprovação clara de lastro e regras de emissão/resgate.",
              howItWorks: "O USDC é emitido com política de reservas e divulgação pública de informações de transparência.",
              blockchainRole: "A Blockchain mantém o ativo digital circulando com rastreabilidade técnica, enquanto a governança de reservas sustenta a confiança empresarial.",
              result: "",
              lesson: "Prova de titularidade e confiança em ativo digital dependem de trilho tecnológico + governança e transparência.",
              firstStep: "Defina qual ativo/direito do seu negócio exigiria prova de titularidade mais robusta e quais evidências hoje faltam.",
              whatTheyDid: "A Circle mantém um dólar digital com reservas e informações públicas para sustentar confiança no ativo.",
              whyHere: "Este caso aparece em Prova de propriedade/titularidade porque a circulação do ativo depende de comprovar quem possui o saldo e seu histórico.",
              thinkQuestion: "No seu negócio, qual ativo, direito ou documento exige comprovação clara de titularidade ao longo do tempo?",
              sourceUrl: "https://www.circle.com/usdc"
            }
          ]
        },
        {
          id: "credenciais_verificaveis",
          title: "Credenciais verificáveis",
          businessDescription: "Permitir que alguém comprove que um documento ou informação é autêntico.",
          practicalExample: "Exemplo: validar um certificado sem depender apenas de envio manual de arquivo.",
          firstStepHint: "Liste uma credencial crítica e identifique quem valida hoje, como valida e onde há retrabalho.",
          realCases: []
        },
        {
          id: "custodia_digital",
          title: "Custódia digital",
          businessDescription: "Controlar quem pode guardar, acessar ou movimentar um ativo digital.",
          practicalExample: "Exemplo: definir regras de acesso e movimentação para reduzir risco operacional.",
          firstStepHint: "Selecione um ativo digital relevante e mapeie as regras atuais de acesso e responsabilidade.",
          realCases: [
            {
              name: "PayPal USD (PYUSD), emitido pela Paxos",
              year: "2023+",
              sourceName: "PayPal + Paxos",
              sourceType: "Comunicado oficial + página institucional do emissor",
              problem: "Empresas e usuários precisavam mover valor digital em dólar com mais previsibilidade do que criptoativos voláteis.",
              howItWorks: "O PYUSD foi lançado como stablecoin em dólar, com emissão pela Paxos e uso no ecossistema PayPal.",
              blockchainRole: "A Blockchain permite transferência programável e trilha de movimentação do ativo digital, enquanto o emissor declara estrutura de reservas e resgate.",
              result: "",
              lesson: "Custódia e movimentação de ativos digitais exigem integração entre operação de pagamentos e controles de emissão/reserva.",
              firstStep: "Escolha um fluxo em que sua empresa guarda ou transfere valor digital e identifique controles mínimos de custódia necessários.",
              whatTheyDid: "O PayPal passou a operar um dólar digital, emitido pela Paxos, com uso integrado ao seu ecossistema de pagamentos.",
              whyHere: "Este caso aparece em Custódia digital porque envolve regras de guarda, acesso e movimentação de um ativo digital.",
              thinkQuestion: "Quais controles de acesso e responsabilidade seriam necessários para guardar e mover um ativo digital no seu contexto?",
              sourceUrl: "https://newsroom.paypal-corp.com/2023-08-07-PayPal-Launches-U-S-Dollar-Stablecoin"
            }
          ]
        }
      ]
    },
    "07": {
      componentId: "07",
      componentName: "Ecossistema",
      transitionPrompt: "Existe alguma troca entre organizações que hoje depende de múltiplas conferências, versões de documento ou reconciliação manual?",
      genericFirstStep: "Escolha um fluxo entre duas partes e registre como cada uma valida informações hoje antes de testar uma alternativa.",
      adherences: [
        {
          id: "registro_compartilhado",
          title: "Registro compartilhado",
          businessDescription: "Manter o mesmo registro de eventos para todas as organizações envolvidas.",
          practicalExample: "Exemplo: todas as partes consultam o mesmo histórico de etapas de um processo.",
          firstStepHint: "Escolha um fluxo entre duas áreas/organizações e mapeie as divergências de registro atuais.",
          realCases: [
            {
              name: "Project mBridge (BIS Innovation Hub + bancos centrais)",
              year: "2021-2024",
              sourceName: "Bank for International Settlements (BIS)",
              sourceType: "Instituição pública internacional",
              problem: "Pagamentos internacionais sofrem com custo alto, lentidão e complexidade operacional entre jurisdições.",
              howItWorks: "O mBridge testou uma plataforma DLT compartilhada entre bancos centrais e bancos comerciais para pagamentos e câmbio transfronteiriços.",
              blockchainRole: "A Blockchain funciona como infraestrutura comum de registro e liquidação entre organizações de diferentes países.",
              result: "O projeto atingiu estágio de MVP em 2024 e realizou pilotos com transações de valor real.",
              lesson: "Quando várias organizações precisam confiar no mesmo registro, um trilho compartilhado pode reduzir fricção operacional.",
              firstStep: "Mapeie um fluxo multiempresa do seu negócio e identifique onde hoje cada parte mantém um registro diferente.",
              whatTheyDid: "Bancos centrais e bancos comerciais testaram uma plataforma compartilhada para pagamentos internacionais.",
              whyHere: "Este caso aparece em Registro compartilhado porque as organizações passaram a consultar uma base comum de registro.",
              thinkQuestion: "Onde hoje seu processo depende de conciliar versões diferentes do mesmo registro entre organizações?",
              sourceUrl: "https://www.bis.org/about/bisih/topics/cbdc/mcbdc_bridge.htm"
            }
          ]
        },
        {
          id: "rastreabilidade_entre_orgs",
          title: "Rastreabilidade entre organizações",
          businessDescription: "Acompanhar o caminho de informações ou ativos quando passam por várias organizações.",
          practicalExample: "Exemplo: saber quando um documento foi criado, validado e repassado entre partes.",
          firstStepHint: "Mapeie uma transferência de informação e identifique os pontos sem rastreio confiável.",
          realCases: []
        },
        {
          id: "coordenacao_participantes",
          title: "Coordenação entre participantes",
          businessDescription: "Padronizar regras entre participantes para reduzir conflitos e retrabalho.",
          practicalExample: "Exemplo: usar o mesmo critério de validação entre escritório, cliente e parceiro.",
          firstStepHint: "Escolha uma validação com ruído frequente e registre onde as regras divergem entre participantes.",
          realCases: [
            {
              name: "Immersve + Mastercard + USDC (Circle)",
              year: "2024+",
              sourceName: "Circle case study",
              sourceType: "Relato institucional do parceiro de infraestrutura",
              problem: "Usuários e empresas tinham dificuldade para usar ativos digitais no dia a dia sem processos demorados de conversão.",
              howItWorks: "A Immersve conecta uso de USDC a uma rede global de pagamentos, com liquidação operacional integrada ao ecossistema tradicional.",
              blockchainRole: "A Blockchain permite movimentar o ativo digital entre participantes, enquanto a rede de pagamentos mantém a experiência comercial para lojistas e clientes.",
              result: "A solução reporta alcance de aceitação em rede com mais de 90 milhões de estabelecimentos.",
              lesson: "Coordenação entre participantes melhora quando cada parte mantém seu papel, mas com trilho financeiro interoperável.",
              firstStep: "Escolha um fluxo com parceiro externo e avalie onde a coordenação atual exige reconciliação manual recorrente.",
              whatTheyDid: "A Immersve conectou uso de USDC à rede Mastercard para permitir pagamentos em estabelecimentos da rede.",
              whyHere: "Este caso aparece em Coordenação entre participantes porque depende de regras alinhadas entre emissores, rede de pagamentos e participantes.",
              thinkQuestion: "Quais pontos hoje exigem confirmar manualmente se todos os participantes estão seguindo a mesma regra?",
              sourceUrl: "https://www.circle.com/case-studies/immersve"
            }
          ]
        },
        {
          id: "liquidacao_organizacoes",
          title: "Transação/liquidação entre organizações",
          businessDescription: "Confirmar troca de valor entre organizações com registro verificável.",
          practicalExample: "Exemplo: reduzir reconciliação manual em liquidação entre duas empresas.",
          firstStepHint: "Escolha um fluxo de transação entre duas partes e documente tempos e etapas de conciliação atuais.",
          realCases: [
            {
              name: "Visa: liquidação com USDC (pilotos com emissores e adquirentes)",
              year: "2021-2023",
              sourceName: "Visa newsroom",
              sourceType: "Comunicado oficial de instituição de pagamentos",
              problem: "Liquidação internacional entre instituições pode depender de janelas bancárias e transferências mais lentas.",
              howItWorks: "A Visa testou e expandiu liquidação com USDC em trilhos Blockchain (Ethereum e Solana), incluindo pilotos com adquirentes e emissores.",
              blockchainRole: "A Blockchain foi usada como trilho para movimentar USDC entre parceiros de liquidação.",
              result: "A Visa informou já ter movimentado milhões de USDC em pilotos de liquidação.",
              lesson: "Blockchain pode atuar como infraestrutura financeira de bastidor, sem exigir mudança completa da operação comercial.",
              firstStep: "Mapeie uma liquidação recorrente da sua empresa e compare tempo/custo atuais com uma hipótese de trilho digital alternativo.",
              whatTheyDid: "A Visa testou liquidação com USDC entre instituições para acelerar transferências de valor entre parceiros.",
              whyHere: "Este caso aparece em Transação/liquidação entre organizações porque trata da liquidação de valor entre instituições em trilho Blockchain.",
              thinkQuestion: "Onde sua operação de liquidação entre organizações perde tempo por causa de reconciliação ou janela bancária?",
              sourceUrl: "https://usa.visa.com/about-visa/newsroom/press-releases.releaseId.19881.html"
            },
            {
              name: "Thunes: pagamentos internacionais com USDC",
              year: "2024-2025",
              sourceName: "Circle case study",
              sourceType: "Relato institucional do parceiro de infraestrutura",
              problem: "Pré-funding e liquidação internacional em trilhos tradicionais consumiam capital e tempo.",
              howItWorks: "A Thunes integrou USDC em sua operação para permitir liquidação contínua e reduzir dependência de janelas bancárias.",
              blockchainRole: "A Blockchain foi utilizada para suportar movimentação de valor e liquidação quase em tempo real em uma rede global de pagamentos.",
              result: "O caso reporta redução de janelas de funding de T+2 para T+0 em alguns corredores e crescimento de uso mês a mês.",
              lesson: "Em ecossistemas com múltiplas partes e países, o trilho financeiro pode ser testado por etapas sem trocar todo o modelo de negócio.",
              firstStep: "Escolha um corredor de pagamento B2B e registre prazos de liquidação atuais antes de testar uma alternativa controlada.",
              whatTheyDid: "A Thunes integrou USDC para reduzir dependência de janelas bancárias em parte da liquidação internacional.",
              whyHere: "Este caso aparece em Transação/liquidação entre organizações porque mostra troca e liquidação de valor entre participantes em trilho digital.",
              thinkQuestion: "Qual corredor de pagamento entre empresas faria sentido testar em pequena escala para comparar prazo e custo?",
              sourceUrl: "https://www.circle.com/case-studies/thunes"
            }
          ]
        }
      ]
    }
  }
};

module.exports = {
  BLOCKCHAIN_EXAMPLE_LIBRARY
};
