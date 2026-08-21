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
          businessDescription: "Representar digitalmente um ativo ou direito para permitir identificação, registro, transferência ou novas formas de utilização.",
          practicalExample: "Exemplo: transformar um direito em unidade digital para facilitar comprovação e rastreabilidade.",
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
              sourceUrl: "https://www.franklintempleton.com/investments/options/mutual-funds/products/2296/SINGLCLASS/franklin-onchain-us-government-money-fund/FOBXX"
            }
          ]
        },
        {
          id: "prova_propriedade",
          title: "Prova de propriedade/titularidade",
          businessDescription: "Comprovar quem é o titular e qual é o histórico de posse/transferência de um ativo ou direito.",
          practicalExample: "Exemplo: validar titularidade de um documento ou direito em auditoria.",
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
              sourceUrl: "https://www.circle.com/usdc"
            }
          ]
        },
        {
          id: "credenciais_verificaveis",
          title: "Credenciais verificáveis",
          businessDescription: "Emitir credenciais com autenticidade verificável para reduzir dúvidas sobre origem e validade.",
          practicalExample: "Exemplo: comprovar autenticidade de um certificado ou declaração sem depender só de arquivo local.",
          firstStepHint: "Liste uma credencial crítica e identifique quem valida hoje, como valida e onde há retrabalho.",
          realCases: []
        },
        {
          id: "custodia_digital",
          title: "Custódia digital",
          businessDescription: "Organizar guarda, acesso e responsabilidade sobre ativos digitais com trilha verificável.",
          practicalExample: "Exemplo: controlar quem pode acessar, aprovar ou transferir determinado ativo digital.",
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
          businessDescription: "Manter uma visão comum e verificável de eventos entre organizações participantes.",
          practicalExample: "Exemplo: registrar marcos de um processo de forma que todas as partes consultem a mesma base.",
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
              sourceUrl: "https://www.bis.org/about/bisih/topics/cbdc/mcbdc_bridge.htm"
            }
          ]
        },
        {
          id: "rastreabilidade_entre_orgs",
          title: "Rastreabilidade entre organizações",
          businessDescription: "Acompanhar a trajetória de informações/ativos ao longo das organizações envolvidas.",
          practicalExample: "Exemplo: rastrear quando um documento foi criado, validado e compartilhado entre partes.",
          firstStepHint: "Mapeie uma transferência de informação e identifique os pontos sem rastreio confiável.",
          realCases: []
        },
        {
          id: "coordenacao_participantes",
          title: "Coordenação entre participantes",
          businessDescription: "Padronizar validações e regras para reduzir retrabalho e conflitos entre participantes.",
          practicalExample: "Exemplo: sincronizar aprovações entre escritório, cliente e parceiro com o mesmo critério de validação.",
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
              sourceUrl: "https://www.circle.com/case-studies/immersve"
            }
          ]
        },
        {
          id: "liquidacao_organizacoes",
          title: "Transação/liquidação entre organizações",
          businessDescription: "Estruturar registros de troca de valor entre organizações com confirmação verificável.",
          practicalExample: "Exemplo: confirmar etapas de uma liquidação entre partes com menos reconciliação manual.",
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
