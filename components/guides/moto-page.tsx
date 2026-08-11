import Link from 'next/link'

import { CategoryIcon, TrustIcon } from '@/components/icons'
import { SiteHeader } from '@/components/site-header'
import type { GuidePage } from './types'

const highlightIcons = ['check', 'spark', 'shield', 'chat', 'clock', 'lock'] as const

function Illustration() {
  return (
    <div className="gd-illustration-wrap">
      <CategoryIcon name="moto" />
    </div>
  )
}

const categories = [
  { slug: 'consorcio-de-imoveis', label: 'Imóvel', copy: 'Casa, apê ou terreno na planta ou pronto.', icon: 'home' },
  { slug: 'consorcio-de-carro', label: 'Carro', copy: 'Novo, seminovo ou usado até 10 anos.', icon: 'car' },
  { slug: 'consorcio-de-moto', label: 'Moto', copy: 'Nacional ou importada. Partiu.', icon: 'moto' },
  { slug: 'consorcio-de-caminhoes', label: 'Caminhões', copy: 'Para renovar ou ampliar a frota.', icon: 'truck' },
  { slug: 'construcao-e-reforma', label: 'Reformas', copy: 'Construa, reforme ou amplie sem juros.', icon: 'spark' },
]

const contactInfo = {
  whatsappNumber: '5585998614541',
  whatsappDisplay: '(85) 99861-4541',
  whatsappMessage: 'Olá! Quero simular um consórcio com a Multiplic.',
}

const page: GuidePage = {
  slug: "consorcio-de-moto",
  title: "Consórcio de Motos",
  eyebrow: "Produtos",
  description: "Sua moto sem entrada e sem juros",
  sections: [
    {
      title: "Compensa fazer um consórcio de motos?",
      paragraphs: [
        "Se você quer comprar uma moto, mas não tem dinheiro suficiente no momento, o consórcio de motos da Multiplic Consórcios vale muito a pena! Aqui você garante sua conquista com economia e planejamento: não paga entrada nem juros. Com o crédito na mão você terá flexibilidade para escolher qualquer marca ou modelo de moto, e ainda negociar o valor com os vendedores. O consórcio não é dívida, é investimento: você poupa enquanto planeja o futuro!",
      ],
    },
  ],
  detail: {
    breadcrumbLabel: "Motos",
    heroTagline: "Sua moto sem entrada e sem juros",
    anchors: [
      {
        id: "como-funciona",
        label: "Como funciona",
      },
      {
        id: "x-financiamento",
        label: "Consórcio x financiamento",
      },
      {
        id: "carta-de-credito",
        label: "Carta de crédito",
      },
      {
        id: "sorteio-e-lance",
        label: "Sorteio e assembleias",
      },
      {
        id: "vantagens",
        label: "Vantagens",
      },
      {
        id: "faq",
        label: "Perguntas frequentes",
      },
    ],
    howItWorks: {
      title: "Como funciona o consórcio de motos?",
      paragraphs: [
        "O consórcio de motos da Multiplic Consórcios é pensado para quem sonha em conquistar uma moto nova ou seminova, mas não quer se prender a juros altos e dívidas. Fazer um consórcio de motos é a melhor escolha para quem quer trocar de moto, comprar a primeira motocicleta ou, até mesmo, aumentar a frota. Você pode comprar qualquer marca ou modelo, nacional ou importada!",
        "Não é empréstimo nem financiamento. E ainda bem.",
        "Funciona da seguinte maneira: você se reúne com um grupo de pessoas com o mesmo objetivo, conforme suas opções de crédito e prazo. Mensalmente acontecem as assembleias e você pode chegar à contemplação por sorteio ou aumentar as chances através dos lances. Pense no futuro e faça uma simulação para seu consórcio de motos. Comece agora mesmo a trajetória rumo ao seu sonho!",
      ],
    },
    compareBanner: {
      title: "Compare o consórcio da Multiplic Consórcios com o financiamento e comprove.",
      subtitle: "Quando você não possui o valor à vista para adquirir uma moto nova ou seminova, há duas opções para atingir essa meta: consórcio ou financiamento.",
      ctaLabel: "Simule seu consórcio",
    },
    comparison: {
      title: "Consórcio x Financiamento",
      cards: [
        {
          title: "1",
          body: "Embora ambos tenham o objetivo de facilitar sua compra, o consórcio e o financiamento apresentam suas próprias particularidades, com vantagens e desvantagens. Apesar das burocracias com documentos, o financiamento geralmente permite a obtenção da moto de maneira mais rápida.",
        },
        {
          title: "2",
          body: "Já o consórcio funciona como uma compra programada. Nesse formato, você adquire uma cota de consórcio de motos, que se ajusta ao seu orçamento, e participa de sorteios mensais para contemplação.",
        },
        {
          title: "3",
          body: "Quando contemplado, você recebe o valor para usar na moto nova ou usada — sem os juros do financiamento tradicional.",
        },
      ],
    },
    creditCard: {
      title: "Como funciona a carta de crédito para moto?",
      paragraphs: [
        "Após a contemplação, que pode ocorrer por sorteio ou lance, você recebe a carta de crédito do valor integral contratado no seu consórcio. Com ela, você pode comprar uma moto nova ou seminova totalmente sem juros e sem entrada.",
        "A carta funciona como um pagamento à vista, o que aumenta seu poder de negociação com os vendedores! Você escolhe onde e quando comprar sua motocicleta. Pode optar por qualquer marca ou modelo, nacional ou importada, desde que se enquadre no crédito do plano contratado. Além disso, você consegue usar parte da sua carta de crédito para realizar outros pagamentos relacionados à sua moto como documentação, emplacamento, seguro, etc.",
      ],
      cardLabel: "Carta de crédito",
      cardValue: "Moto nacional ou importada",
      facts: [
        {
          label: "Pagamento",
          value: "À vista",
        },
        {
          label: "Uso da carta",
          value: "Moto, documentação e seguro",
        },
        {
          label: "Contemplação",
          value: "Sorteio ou lance",
        },
      ],
    },
    raffle: {
      title: "Sorteio e assembleias",
      cards: [
        {
          title: "Como é feito o sorteio do consórcio de motos?",
          body: "Os sorteios são realizados através da extração da Loteria Federal imediatamente anterior à data da assembleia do grupo. Todos que estiverem com o pagamento das parcelas em dia participam automaticamente dos sorteios todos os meses.",
        },
        {
          title: "Quantas pessoas são contempladas por mês no consórcio de motos?",
          body: "Todo mês, pelo menos um participante é contemplado nos sorteios do consórcio de motos.",
        },
        {
          title: "Quantas pessoas fazem parte de um grupo de consórcio?",
          body: "Na Multiplic Consórcios você pode conseguir a carta de crédito de forma mais rápida ofertando lance fixo ou lance livre.",
        },
      ],
      ctaLabel: "Simule seu consórcio",
    },
    bidding: {
      title: "Como funciona o lance de consórcio?",
      intro: "Existem duas modalidades de lance no consórcio de motos: lance fixo e lance livre. Ambos funcionam como uma oportunidade extra para tentar acelerar a contemplação da sua carta de crédito.",
      livre: {
        title: "Lance Livre",
        body: "Esse tipo de lance é para quem tem uma reserva própria e pode ofertar um valor maior à vista. Nesse caso, não existe limite e o maior percentual ofertado vence e, consequentemente, recebe o crédito.",
      },
      fixo: {
        title: "Lance Fixo",
        body: "Esse lance consiste na oferta de um percentual fixo, estabelecido pela administradora em conjunto com o grupo. Se duas ou mais pessoas ofertarem o lance nessa mesma modalidade, o critério de desempate será a cota cuja numeração for mais próxima da sorteada no período.",
      },
      note: "As regras e percentuais de lances variam conforme o produto e o plano contratado. Vale lembrar que só paga o lance quem for o ganhador ou ganhadora. Todo o valor pago como lance é abatido do saldo devedor, conforme as regras do contrato. Dica: uma forma de fazer o pagamento do lance é utilizar também uma parte do crédito — o chamado lance embutido (facilitado). Se você for o vencedor, o percentual do lance embutido utilizado será descontado do valor do crédito que você irá receber.",
    },
    advantages: {
      title: "Vantagens do consórcio de motos",
      paragraphs: [
        "O consórcio de motos oferece uma série de benefícios, incluindo a oportunidade de uma compra programada e a economia garantida pela ausência de juros. Confira como é vantajoso fazer um consórcio de moto com a Multiplic Consórcios:",
      ],
      cards: [
        {
          title: "Utilize sua moto usada",
          body: "Você pode usar a venda da sua motocicleta usada para ofertar como lance e, dessa forma, tentar antecipar sua contemplação.",
        },
        {
          title: "Aproveite sua carta",
          body: "Com a carta de crédito você também pode fazer outros pagamentos como documentação, emplacamento ou seguro.",
        },
        {
          title: "Flexibilidade",
          body: "Desde que se enquadre no valor da sua carta de crédito, você pode comprar uma moto de qualquer marca ou modelo, nacional ou importada.",
        },
        {
          title: "Possibilidade de lucro",
          body: "Utilize a carta de crédito para adquirir a motocicleta desejada ou venda-a para obter um lucro de ágio.",
        },
        {
          title: "Escolha seu preço",
          body: "Com o valor para fazer o pagamento à vista, você adquire maior poder de negociação com os vendedores.",
        },
        {
          title: "Praticidade",
          body: "Garanta mais praticidade e liberdade no dia a dia com uma moto adquirida de forma fácil e barata.",
        },
      ],
    },
    rate: {
      value: "0,15% ao mês*",
      label: "Taxa mensal a partir de",
      title: "Taxa de administração do plano",
      body: "Consulte com a Multiplic Consórcios as condições vigentes do plano, a taxa de administração aplicável e todos os custos previstos em contrato antes de contratar.",
      ctaLabel: "Fazer simulação gratuita",
    },
    faqs: [
      {
        question: "Como funciona um consórcio de motos?",
        answer: "O consórcio de motos é uma maneira econômica de conquistar sua moto sem entrada e sem juros. Com a carta de crédito para moto da Multiplic Consórcios, você pode adquirir o modelo que deseja, com parcelas e prazos flexíveis que cabem no seu orçamento.",
      },
      {
        question: "O que é preciso para entrar em um consórcio de motos?",
        answer: "Basta escolher um dos planos disponíveis, com as parcelas que cabem no seu bolso e o prazo que for mais adequado. Você participará de um grupo de consórcio, onde contribuições mensais acumulam o valor necessário para contemplações por sorteio ou lance.",
      },
      {
        question: "Como funciona a carta de crédito para veículos?",
        answer: "Após a contemplação, você recebe a carta de crédito para moto para realizar a compra do modelo desejado.",
      },
    ],
    crossSell: true,
  },
}

export default function MotoPage() {
  const detail = page.detail
  const otherCategories = categories.filter((category) => category.slug !== page.slug)
  const whatsappHref = `https://wa.me/${contactInfo.whatsappNumber}?text=${encodeURIComponent(
    contactInfo.whatsappMessage,
  )}`

  return (
    <main className="page-shell gd-shell">
      <SiteHeader />

      <section className="gd-hero">
        <div className="container gd-hero-grid">
          <div className="gd-hero-copy">
            <span className="gd-breadcrumb">Home » {detail?.breadcrumbLabel ?? page.title}</span>
            <h1 className="gd-title">{page.title}</h1>
            <p className="gd-hero-tagline">{detail?.heroTagline ?? page.description}</p>
            {detail?.heroIntro?.map((paragraph) => (
              <p className="gd-hero-body" key={paragraph}>
                {paragraph}
              </p>
            ))}
            <div className="gd-hero-actions">
              <Link className="primary-button primary-button--light" href="/#simulador">
                Simule seu consórcio
              </Link>
              <a className="gd-hero-link" href="#conteudo-guia">
                Ver conteúdo
              </a>
            </div>
          </div>

          <div className="gd-hero-visual" aria-hidden="true">
            <span className="gd-hero-orb gd-hero-orb--one" />
            <span className="gd-hero-orb gd-hero-orb--two" />
            <div className="gd-hero-shape">
              <Illustration />
            </div>
            <div className="gd-hero-card">
              <small>{detail?.creditCard?.cardLabel ?? 'Carta de crédito'}</small>
              <strong>{detail?.creditCard?.cardValue ?? detail?.breadcrumbLabel ?? page.title}</strong>
            </div>
          </div>
        </div>
      </section>

      {detail?.anchors && detail.anchors.length > 0 && (
        <nav className="gd-anchor-nav" aria-label="Seções do guia">
          <div className="container gd-anchor-nav-inner">
            {detail.anchors.map((anchor) => (
              <a key={anchor.id} href={`#${anchor.id}`}>
                {anchor.label}
              </a>
            ))}
          </div>
        </nav>
      )}

      <div id="conteudo-guia" />

      {detail?.howItWorks && (
        <section className="section gd-section" id="como-funciona">
          <div className="container gd-split">
            <div>
              <h2 className="gd-section-title">{detail.howItWorks.title}</h2>
              {detail.howItWorks.paragraphs?.map((paragraph) => (
                <p className="gd-copy" key={paragraph}>
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="gd-illustration-card" aria-hidden="true">
              <Illustration />
            </div>
          </div>
        </section>
      )}

      {detail?.compareBanner && (
        <section className="section gd-section gd-section--compact">
          <div className="container">
            <div className="gd-compare-banner" id="comparativo-destaque">
              <h2>{detail.compareBanner.title}</h2>
              <p>{detail.compareBanner.subtitle}</p>
              <Link className="primary-button" href="/#simulador">
                {detail.compareBanner.ctaLabel}
              </Link>
            </div>
          </div>
        </section>
      )}

      {detail?.comparison && (
        <section className="section gd-section" id="x-financiamento">
          <div className="container">
            <h2 className="gd-section-title gd-section-title--center">{detail.comparison.title}</h2>
            {detail.comparison.paragraphs?.map((paragraph) => (
              <p className="gd-copy gd-copy--center" key={paragraph}>
                {paragraph}
              </p>
            ))}
            <div className="gd-compare-grid">
              {detail.comparison.cards?.map((card, index) => (
                <article className="gd-compare-card" key={`${card.title}-${index}`}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {detail?.creditCard && (
        <section className="section gd-section gd-section--compact" id="carta-de-credito">
          <div className="container">
            <div className="gd-credit-box">
              <div>
                <h2 className="gd-section-title">{detail.creditCard.title}</h2>
                {detail.creditCard.paragraphs?.map((paragraph) => (
                  <p className="gd-copy" key={paragraph}>
                    {paragraph}
                  </p>
                ))}
                {detail.creditCard.table && (
                  <div className="gd-table-wrap">
                    <table className="gd-table">
                      <thead>
                        <tr>
                          <th>{detail.creditCard.table.headers[0]}</th>
                          <th>{detail.creditCard.table.headers[1]}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {detail.creditCard.table.rows.map((row) => (
                          <tr key={row.label}>
                            <td>{row.label}</td>
                            <td>{row.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {detail.creditCard.table.note && <p className="gd-note">{detail.creditCard.table.note}</p>}
                  </div>
                )}
              </div>
              <aside className="gd-credit-card-visual" aria-hidden="true">
                <small>{detail.creditCard.cardLabel ?? 'Carta de crédito'}</small>
                <strong>{detail.creditCard.cardValue ?? detail.breadcrumbLabel ?? page.title}</strong>
                {detail.creditCard.facts?.map((fact) => (
                  <div className="gd-credit-fact" key={fact.label}>
                    <span>{fact.label}</span>
                    <b>{fact.value}</b>
                  </div>
                ))}
              </aside>
            </div>
          </div>
        </section>
      )}

      {detail?.raffle && (
        <section className="section gd-section" id="sorteio-e-lance">
          <div className="container gd-split">
            <div>
              <h2 className="gd-section-title">{detail.raffle.title}</h2>
              {detail.raffle.paragraphs?.map((paragraph) => (
                <p className="gd-copy" key={paragraph}>
                  {paragraph}
                </p>
              ))}
              <div className="gd-qa-stack">
                {detail.raffle.cards?.map((card) => (
                  <article className="gd-qa-card" key={card.title}>
                    <h3>{card.title}</h3>
                    <p>{card.body}</p>
                  </article>
                ))}
              </div>
              {detail.raffle.note && <p className="gd-note">{detail.raffle.note}</p>}
              {detail.raffle.ctaLabel && (
                <Link className="primary-button" href="/#simulador">
                  {detail.raffle.ctaLabel}
                </Link>
              )}
            </div>
            <div className="gd-illustration-card" aria-hidden="true">
              <Illustration />
            </div>
          </div>
        </section>
      )}

      {detail?.bidding && (
        <section className="section gd-section gd-section--alt" id="lances">
          <div className="container">
            <h2 className="gd-section-title gd-section-title--center">{detail.bidding.title}</h2>
            {detail.bidding.intro && <p className="gd-copy gd-copy--center">{detail.bidding.intro}</p>}
            <div className="gd-bidding-grid">
              {[detail.bidding.livre, detail.bidding.fixo].map((card) => (
                <article className="gd-bidding-card" key={card.title}>
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </article>
              ))}
            </div>
            {detail.bidding.note && <p className="gd-note gd-note--center">{detail.bidding.note}</p>}
          </div>
        </section>
      )}

      {detail?.advantages && (
        <section className="section gd-section" id="vantagens">
          <div className="container">
            <h2 className="gd-section-title">{detail.advantages.title}</h2>
            {detail.advantages.paragraphs?.map((paragraph) => (
              <p className="gd-copy" key={paragraph}>
                {paragraph}
              </p>
            ))}
            <div className="gd-advantages-grid">
              {detail.advantages.cards?.map((card, index) => (
                <article className="gd-advantage-card" key={card.title}>
                  <span className="gd-advantage-icon" aria-hidden="true">
                    <TrustIcon name={highlightIcons[index % highlightIcons.length]} />
                  </span>
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {detail?.rate && (
        <section className="section gd-section gd-section--compact">
          <div className="container">
            <div className="gd-rate-box">
              <div className="gd-rate-stat">
                <small>{detail.rate.label}</small>
                <strong>{detail.rate.value}</strong>
              </div>
              <div>
                <h2 className="gd-section-title">{detail.rate.title}</h2>
                <p className="gd-copy">{detail.rate.body}</p>
                <Link className="primary-button" href="/#simulador">
                  {detail.rate.ctaLabel}
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {page.sections.length > 0 && (
        <section className="section gd-section">
          <div className="container">
            <div className="gd-copy-grid">
              {page.sections.map((section) => (
                <article className="gd-copy-card" key={section.title}>
                  <h2>{section.title}</h2>
                  {section.paragraphs?.map((paragraph) => (
                    <p className="gd-copy" key={paragraph}>
                      {paragraph}
                    </p>
                  ))}
                  {section.items && (
                    <ul className="gd-list">
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {section.cards && (
                    <div className="gd-inline-cards">
                      {section.cards.map((card) => (
                        <div className="gd-inline-card" key={card.title}>
                          <h3>{card.title}</h3>
                          <p>{card.body}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {section.table && (
                    <div className="gd-table-wrap">
                      <table className="gd-table">
                        <thead>
                          <tr>
                            <th>{section.table.headers[0]}</th>
                            <th>{section.table.headers[1]}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {section.table.rows.map((row) => (
                            <tr key={row.label}>
                              <td>{row.label}</td>
                              <td>{row.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {section.table.note && <p className="gd-note">{section.table.note}</p>}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {detail?.steps && (
        <section className="section gd-section" id="passo-a-passo">
          <div className="container">
            <h2 className="gd-section-title">{detail.steps.title}</h2>
            {detail.steps.paragraphs?.map((paragraph) => (
              <p className="gd-copy" key={paragraph}>
                {paragraph}
              </p>
            ))}
            <div className="gd-steps-grid">
              {detail.steps.cards?.map((card, index) => (
                <article className="gd-step-card" key={card.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {detail?.checklist && (
        <section className="section gd-section gd-section--alt" id="checklist">
          <div className="container">
            <div className="gd-highlight-box">
              <h2 className="gd-section-title">{detail.checklist.title}</h2>
              {detail.checklist.paragraphs?.map((paragraph) => (
                <p className="gd-copy" key={paragraph}>
                  {paragraph}
                </p>
              ))}
              {detail.checklist.items && (
                <ul className="gd-checklist">
                  {detail.checklist.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      )}

      {(detail?.safety || detail?.contact) && (
        <section className="section gd-section" id="seguranca">
          <div className="container gd-safety-grid">
            {[detail.safety, detail.contact].filter(Boolean).map((section) => (
              <article className="gd-safety-card" key={section!.title}>
                <h2>{section!.title}</h2>
                {section!.paragraphs?.map((paragraph) => (
                  <p className="gd-copy" key={paragraph}>
                    {paragraph}
                  </p>
                ))}
                {section!.items && (
                  <ul className="gd-list">
                    {section!.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                {section!.ctaLabel && section!.href && (
                  <Link className="ghost-link" href={section!.href}>
                    {section!.ctaLabel}
                  </Link>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {detail?.faqs && detail.faqs.length > 0 && (
        <section className="section gd-faq" id="faq">
          <div className="container">
            <div className="gd-faq-head">
              <h2>Perguntas frequentes</h2>
              <p>Tire dúvidas sobre crédito, contemplação, sorteio, lance e uso da carta.</p>
            </div>
            <div className="gd-faq-list">
              {detail.faqs.map((item) => (
                <details className="gd-faq-item" key={item.question}>
                  <summary>
                    <span>{item.question}</span>
                    <svg aria-hidden="true" className="nav-chevron" viewBox="0 0 12 8">
                      <path d="M1 1.5 6 6.5 11 1.5" />
                    </svg>
                  </summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="gd-cta">
        <div className="container gd-cta-inner">
          <div>
            <h2>Pronto para simular com a Multiplic Consórcios?</h2>
            <p>Compare crédito, prazo e parcela em poucos passos e fale com um consultor quando quiser.</p>
          </div>
          <div className="gd-cta-actions">
            <Link className="primary-button primary-button--light" href="/#simulador">
              Simular agora
            </Link>
            <a className="secondary-button" href={whatsappHref} rel="noreferrer" target="_blank">
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>

      {detail?.crossSell && otherCategories.length > 0 && (
        <section className="section gd-cross">
          <div className="container">
            <h2 className="gd-section-title">Outras conquistas com consórcio</h2>
            <div className="gd-cross-grid">
              {otherCategories.map((category) => (
                <Link className="gd-cross-card" href={`/guias/${category.slug}`} key={category.slug}>
                  <span className="gd-cross-icon" aria-hidden="true">
                    <CategoryIcon name={category.icon} />
                  </span>
                  <strong>{category.label}</strong>
                  <p>{category.copy}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
