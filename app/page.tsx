import Image from "next/image";
import Link from "next/link";

import { CategoryIcon, TrustIcon, WhatsappIcon } from "@/components/icons";
import { SimulatorForm } from "@/components/simulator-form";
import { SiteHeader } from "@/components/site-header";
const categories = [
  {
    slug: "consorcio-de-imoveis",
    label: "Imóvel",
    copy: "Casa, apê ou terreno na planta ou pronto.",
    icon: "home",
  },
  {
    slug: "consorcio-de-carro",
    label: "Carro",
    copy: "Novo, seminovo ou usado até 10 anos.",
    icon: "car",
  },
  {
    slug: "consorcio-de-moto",
    label: "Moto",
    copy: "Nacional ou importada. Partiu.",
    icon: "moto",
  },
  {
    slug: "consorcio-de-caminhoes",
    label: "Caminhões",
    copy: "Para renovar ou ampliar a frota.",
    icon: "truck",
  },
  {
    slug: "construcao-e-reforma",
    label: "Reformas",
    copy: "Construa, reforme ou amplie sem juros.",
    icon: "spark",
  },
];

const contactInfo = {
  whatsappNumber: "5585998614541",
  whatsappDisplay: "(85) 99861-4541",
  whatsappMessage: "Olá! Quero simular um consórcio com a Multiplic.",
};

const trustPoints = [
  {
    icon: "shield",
    title: "Regulado por lei",
    copy: "Consórcio é regulamentado pela Lei 11.795/2008 e fiscalizado pelo Banco Central do Brasil.",
  },
  {
    icon: "check",
    title: "Sem entrada, sem juros",
    copy: "Planejamento por consórcio, com taxas previstas em contrato — sem juros de financiamento.",
  },
  {
    icon: "chat",
    title: "Atendimento consultivo",
    copy: "Um consultor confirma tabela, regras e documentação antes de qualquer contratação.",
  },
  {
    icon: "clock",
    title: "Simulação gratuita",
    copy: "Sem compromisso: simule quantas vezes quiser antes de decidir.",
  },
  {
    icon: "lock",
    title: "Nunca pague terceiros",
    copy: "Confirme sempre dados oficiais da proposta e do contrato antes de qualquer pagamento.",
  },
  {
    icon: "spark",
    title: "Contemplação por sorteio ou lance",
    copy: "Nenhuma contemplação é garantida antecipadamente — desconfie de quem promete isso.",
  },
];

const navGroups = [
  {
    label: "Escolha o seu sonho",
    items: [
      { label: "Imóveis", href: "/guias/consorcio-de-imoveis" },
      { label: "Carros", href: "/guias/consorcio-de-carro" },
      { label: "Motos", href: "/guias/consorcio-de-moto" },
      { label: "Pesados", href: "/guias/consorcio-de-caminhoes" },
      { label: "Reformas", href: "/guias/construcao-e-reforma" },
    ],
  },
  {
    label: "O que é consórcio?",
    items: [
      { label: "Bê-á-bá do consórcio", href: "/guias/be-a-ba-do-consorcio" },
      { label: "Como comprar?", href: "/guias/como-comprar-com-consorcio" },
    ],
  },
  {
    label: "Precisa de ajuda?",
    items: [
      { label: "Quem somos", href: "/guias/quem-somos" },
      { label: "Segurança na compra", href: "/guias/seguranca-na-compra" },
    ],
  },
];

const longFaqs = [
  {
    question: "O que é consórcio?",
    answer:
      "Consórcio é uma compra planejada em grupo. Os participantes pagam parcelas mensais para formar um fundo comum e, ao longo do tempo, recebem cartas de crédito por sorteio ou lance.",
  },
  {
    question: "Consórcio tem juros?",
    answer:
      "Não funciona como financiamento tradicional. Em vez de juros, há taxa de administração e outros custos previstos em contrato, como fundo de reserva ou seguros quando aplicáveis.",
  },
  {
    question: "O que é carta de crédito?",
    answer:
      "É o valor disponibilizado ao participante contemplado para compra do bem ou serviço previsto no contrato do consórcio.",
  },
  {
    question: "Como acontece a contemplação?",
    answer:
      "A contemplação pode ocorrer por sorteio ou por lance, conforme as regras do grupo. Antes dela, você segue pagando as parcelas normalmente.",
  },
  {
    question: "O que é lance?",
    answer:
      "Lance é uma oferta feita pelo participante para tentar antecipar a contemplação. Existem regras diferentes para lance livre, fixo ou embutido, dependendo do grupo.",
  },
  {
    question: "Contemplação é garantida no início?",
    answer:
      "Não. A contemplação depende de sorteio, lance e regras do grupo. Promessas de contemplação imediata devem ser tratadas com cautela.",
  },
  {
    question: "Posso simular por valor da carta ou por parcela?",
    answer:
      "Sim. Você pode começar pelo crédito desejado ou informar uma parcela de referência para encontrar faixas compatíveis com o orçamento.",
  },
  {
    question: "Os valores do simulador são finais?",
    answer:
      "Não. A simulação é uma prévia. A proposta final depende da tabela vigente, disponibilidade de grupo, análise e regras comerciais aplicáveis.",
  },
  {
    question: "Preciso dar entrada?",
    answer:
      "Em geral, consórcio não exige entrada como uma compra financiada. Porém, podem existir taxas, primeira parcela e regras específicas do contrato.",
  },
  {
    question: "Posso usar FGTS no consórcio de imóvel?",
    answer:
      "O uso do FGTS depende das regras vigentes, do tipo de operação e das condições do participante. O consultor orienta quais cenários podem ser analisados.",
  },
  {
    question: "Consórcio serve para imóvel usado?",
    answer:
      "Pode servir, desde que o bem e a documentação atendam às regras da administradora e do contrato. A aprovação ocorre após análise.",
  },
  {
    question: "Posso comprar carro usado com consórcio?",
    answer:
      "Em muitos casos sim, respeitando idade, documentação e critérios da administradora. Esses detalhes devem ser confirmados na proposta.",
  },
  {
    question: "O que acontece se eu atrasar parcelas?",
    answer:
      "Atrasos podem gerar encargos, impedir participação em assembleias e afetar direitos do participante. O contrato define consequências e prazos.",
  },
  {
    question: "Posso cancelar um consórcio?",
    answer:
      "O cancelamento segue regras contratuais. Pode haver devolução conforme normas do grupo, prazos e assembleias. Leia o contrato antes de contratar.",
  },
  {
    question: "Qual a diferença entre consórcio e financiamento?",
    answer:
      "No financiamento você normalmente recebe o bem no início e paga juros. No consórcio, você participa de um grupo e usa a carta após contemplação.",
  },
  {
    question: "Como escolher o melhor plano?",
    answer:
      "Compare crédito, parcela, prazo, taxa, objetivo e estratégia de contemplação. A menor parcela nem sempre é a melhor escolha.",
  },
  {
    question: "A Multiplic Consórcios recebe pagamento direto?",
    answer:
      "Antes de qualquer pagamento, confirme os dados oficiais da proposta e do contrato com o atendimento. Não pague terceiros sem conferência.",
  },
  {
    question: "Por que falar com consultor depois da simulação?",
    answer:
      "Porque o consultor confirma tabela, regras, documentação e disponibilidade. A simulação orienta; a proposta formal precisa de validação.",
  },
];

const whatsappHref = `https://wa.me/${contactInfo.whatsappNumber}?text=${encodeURIComponent(
  contactInfo.whatsappMessage,
)}`;

const benefits = [
  {
    number: "01",
    title: "Escolha o bem",
    copy: "Imóvel, carro, moto ou pesados: a simulação começa com o objetivo real da compra.",
  },
  {
    number: "02",
    title: "Ajuste crédito ou parcela",
    copy: "O cliente pode partir do valor da carta ou da parcela que cabe no orçamento.",
  },
  {
    number: "03",
    title: "Compare planos",
    copy: "A prévia mostra parcela, crédito, prazo e taxa para facilitar a decisão com um consultor.",
  },
];

export default function HomePage() {
  return (
    <main className="page-shell">
      <SiteHeader />

      <section className="hero">
        <span className="hero-blob" aria-hidden="true" />
        <div className="container hero-grid">
          <div className="hero-content">
            <span className="offer-badge">Ofertas Multiplic</span>
            <h1 className="hero-title">
              Consórcio sob medida <mark>para sua próxima conquista.</mark>
            </h1>
            <p className="hero-copy">
              Simule por crédito ou parcela, compare planos em poucos passos e
              fale com um consultor para ajustar a melhor estratégia para sua
              conquista.
            </p>

            <div className="hero-actions">
              <a className="primary-button" href="#simulador">
                Começar simulação
              </a>
              <a
                aria-label="Falar no WhatsApp"
                className="whatsapp-button"
                href={whatsappHref}
                rel="noopener noreferrer"
                target="_blank"
              >
                <WhatsappIcon />
              </a>
              <a className="ghost-link" href="#como-funciona">
                Ver como funciona
              </a>
            </div>

            <ul className="trust-grid">
              {trustPoints.slice(0, 6).map((point) => (
                <li key={point.title}>
                  <TrustIcon name={point.icon} />
                  {point.title}
                </li>
              ))}
            </ul>
          </div>

          <div className="hero-simulator-wrap" id="simulador">
            <span className="hero-panel" aria-hidden="true" />
            <div className="promo-card promo-card--float">
              <small>Simulação em segundos</small>
              <strong>compare crédito ou parcela</strong>
            </div>
            <SimulatorForm />
          </div>
        </div>
      </section>

      <section className="section categories-section">
        <div className="container">
          <div className="section-head">
            <span className="section-kicker">Sua próxima conquista</span>
            <h2 className="section-title">
              Já sabe o que você quer planejar?
            </h2>
            <p className="section-copy">
              Escolha um objetivo para ver como o consórcio se encaixa na sua
              vida — cada guia foi escrito pela Multiplic Consórcios.
            </p>
          </div>

          <div className="category-grid">
            {categories.map((category) => (
              <Link
                className="category-card"
                href={`/guias/${category.slug}`}
                key={category.slug}
              >
                <span className="category-icon">
                  <CategoryIcon name={category.icon} />
                </span>
                <strong>{category.label}</strong>
                <p>{category.copy}</p>
                <span className="category-link">
                  Saiba mais <i aria-hidden="true">→</i>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="como-funciona">
        <div className="container">
          <div className="section-head">
            <span className="section-kicker">Como funciona</span>
            <h2 className="section-title">
              Uma jornada objetiva para decidir melhor.
            </h2>
            <p className="section-copy">
              A Multiplic Consórcios combina simulação objetiva, captura de
              contato e atendimento consultivo para transformar intenção em
              uma proposta mais clara.
            </p>
          </div>

          <div className="stepper">
            {benefits.map((benefit) => (
              <article className="stepper-item" key={benefit.number}>
                <span className="stepper-node">{benefit.number}</span>
                <div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container comparison-band">
          <span className="comparison-texture" aria-hidden="true" />
          <div>
            <span className="section-kicker">Por que simular antes?</span>
            <h2 className="section-title">
              Menos achismo. Mais conversa com números na mesa.
            </h2>
          </div>
          <div className="comparison-list">
            <article>
              <strong>Crédito</strong>
              <span>Você entende a faixa de carta compatível com o bem.</span>
            </article>
            <article>
              <strong>Parcela</strong>
              <span>Você visualiza cenários a partir do orçamento mensal.</span>
            </article>
            <article>
              <strong>Plano</strong>
              <span>
                Você compara prazo, taxa e estratégia de contemplação.
              </span>
            </article>
          </div>
        </div>
      </section>

      <section className="section faq-section" id="faq">
        <div className="container">
          <div className="section-head section-head--center">
            <span className="section-kicker">Perguntas frequentes</span>
            <h2 className="section-title">O essencial antes de avançar.</h2>
            <p className="section-copy">
              Respostas rápidas para entender a lógica do consórcio antes de
              falar com o atendimento.
            </p>
          </div>

          <div className="faq-columns">
            {longFaqs.map((faq) => (
              <details className="faq-item" key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container affiliate-band">
          <div>
            <span className="eyebrow">Programa de afiliados</span>
            <h2 className="section-title">
              Influenciadores com contrato e rastreio.
            </h2>
            <p>
              O afiliado entende as regras, entra com Google, assina o contrato
              em PDF e recebe confirmação por e-mail antes de gerar cupom e
              link.
            </p>
          </div>
          <Link className="primary-button" href="/afiliados">
            Ver parceria
          </Link>
        </div>
      </section>

      <section className="section trust-band">
        <div className="container trust-band-grid">
          <div className="trust-band-cta">
            <span className="section-kicker">Fale com um especialista</span>
            <h2>Tire dúvidas antes de decidir.</h2>
            <p>
              Prefere conversar em vez de preencher formulário? Chame nosso
              time no WhatsApp e receba orientação para simular o consórcio
              ideal para você.
            </p>
            <a
              className="trust-band-whatsapp"
              href={whatsappHref}
              rel="noopener noreferrer"
              target="_blank"
            >
              <WhatsappIcon />
              WhatsApp {contactInfo.whatsappDisplay}
            </a>
          </div>

          <ul className="trust-band-list">
            {trustPoints.map((point) => (
              <li key={point.title}>
                <TrustIcon name={point.icon} />
                <div>
                  <strong>{point.title}</strong>
                  <span>{point.copy}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container footer-top">
          <div className="footer-brand">
            <Image
              alt="Multiplic Consórcios"
              className="footer-logo"
              height={872}
              src="/brand/logo-horizontal-branco.png"
              width={3537}
            />
            <p>
              Multiplic Consórcios oferece simulação e atendimento consultivo
              para quem quer planejar crédito com mais clareza.
            </p>
            <Link className="secondary-button" href="/#simulador">
              Simular agora
            </Link>
          </div>

          {navGroups.map((group) => (
            <div className="footer-links" key={group.label}>
              <strong>{group.label}</strong>
              <ul>
                {group.items.slice(0, 6).map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="container footer-bottom">
          <div className="footer-registry">
            <strong>Dados cadastrais</strong>
            <span>MULTIPLIC CORRETORA DE SEGUROS LTDA</span>
            <span>CNPJ 23.974.875/0001-90 · Matriz</span>
          </div>

          <p className="footer-note">
            Valores apresentados são estimativas sujeitas à tabela vigente,
            análise, disponibilidade de grupo e regras comerciais aplicáveis.
          </p>
        </div>
      </footer>
    </main>
  );
}
