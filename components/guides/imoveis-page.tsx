import Link from 'next/link'

import { CategoryIcon, TrustIcon } from '@/components/icons'
import { SiteHeader } from '@/components/site-header'
import type { GuidePage } from './types'

const highlightIcons = ['check', 'spark', 'shield', 'chat', 'clock', 'lock'] as const

function Illustration() {
  return (
    <div className="gd-illustration-wrap">
      <CategoryIcon name="home" />
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
  slug: "consorcio-de-imoveis",
  title: "Consórcio de Imóveis — Comprar imóvel novo ou usado",
  eyebrow: "Produtos",
  description: "Com o consórcio de imóveis você compra qualquer imóvel sem juros. Não é empréstimo e nem financiamento. E ainda bem.",
  sections: [],
  detail: {
    breadcrumbLabel: "Imóveis",
    heroTagline: "Com o consórcio de imóveis você compra qualquer imóvel sem juros. Não é empréstimo e nem financiamento. E ainda bem.",
    heroIntro: [
      "A Multiplic Consórcios é a maneira mais inteligente e econômica para você realizar o seu sonho e programar a compra de um imóvel novo, usado ou na planta em qualquer lugar do Brasil.",
    ],
    anchors: [
      {
        id: "comparativo-destaque",
        label: "Comparativo",
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
    compareBanner: {
      title: "Com a Multiplic Consórcios é muito mais barato",
      subtitle: "Compare o consórcio da Multiplic Consórcios com o financiamento e comprove.",
      ctaLabel: "Simule seu consórcio",
    },
    comparison: {
      title: "Quando você não tem o valor à vista para fazer a compra de um bem ou serviço, existem duas formas de conseguir alcançar aquela meta: consórcio ou financiamento.",
      cards: [
        {
          title: "1",
          body: "Apesar de terem o mesmo objetivo em facilitar a sua aquisição, cada uma tem suas particularidades, vantagens e desvantagens. Mesmo com uma certa burocracia de documentos, o financiamento tende a fazer a entrega do bem mais rápido.",
        },
        {
          title: "2",
          body: "Por sua vez, o consórcio funciona como uma compra planejada, ou seja, você pode comprar uma cota de imóvel com o valor que mais se enquadra no seu planejamento mensal e participa de sorteios mensais de contemplação.",
        },
        {
          title: "3",
          body: "Assim, se for sorteado, garante uma carta de crédito no valor contratado e garante a compra do imóvel à vista. Entretanto, a maior diferença entre consórcio e financiamento está no custo de aquisição de cada um.",
        },
        {
          title: "4",
          body: "No financiamento você paga altas taxas de juros que podem até triplicar o valor da compra, o consórcio é isento de juros. Ao comprar um consórcio de imóveis você garante economia, planejamento e facilidade, e ainda paga parcelas que cabem no seu bolso.",
        },
      ],
    },
    creditCard: {
      title: "Como funciona a carta de crédito imobiliário?",
      paragraphs: [
        "Após a contemplação você recebe uma carta de crédito imobiliário com o valor do consórcio de imóveis contratado para poder fazer a aquisição do bem.",
        "A carta de crédito imobiliário contemplada é um documento de validação de compra. Com ela você consegue autenticar e validar sua compra com o pagamento à vista.",
      ],
      cardLabel: "Carta de crédito",
      cardValue: "Imóvel novo, usado ou na planta",
      facts: [
        {
          label: "Pagamento",
          value: "À vista",
        },
        {
          label: "Uso",
          value: "Compra do imóvel",
        },
        {
          label: "Contemplação",
          value: "Sorteio ou lance",
        },
      ],
    },
    raffle: {
      title: "Como é feito o sorteio de consórcio e as assembleias?",
      paragraphs: [
        "Os sorteios são realizados através da extração da Loteria Federal imediatamente anterior à data da assembleia do grupo. Comprando a sua cota agora, você garante a sua vaga, participa do próximo sorteio e já pode ser contemplado.",
      ],
      cards: [
        {
          title: "Quantas pessoas são contempladas no consórcio por mês?",
          body: "No consórcio de imóveis, são contempladas uma ou mais pessoas mensalmente.",
        },
        {
          title: "Quantas pessoas fazem parte de um grupo de consórcio?",
          body: "No consórcio da Multiplic Consórcios você pode conseguir a carta de crédito de forma mais rápida através de sorteio ou do lance fixo e lance livre.",
        },
      ],
      ctaLabel: "Simule seu consórcio",
    },
    bidding: {
      title: "Como funciona o lance de consórcio?",
      intro: "Existem duas modalidades de lance no consórcio de imóveis: lance fixo e lance livre. Ambos funcionam como uma oportunidade extra para tentar acelerar a contemplação da sua carta de crédito.",
      livre: {
        title: "Lance Livre",
        body: "É para quem tem uma reserva própria e pode ofertar um valor maior à vista. Nesse caso, não existe limite e o maior percentual ofertado vence e, consequentemente, recebe o crédito. Para quem tem como objetivo comprar um imóvel, por exemplo, existe a opção de usar o saldo do FGTS na oferta de lance.",
      },
      fixo: {
        title: "Lance Fixo",
        body: "Consiste na oferta de um percentual fixo, estabelecido pela administradora em conjunto com o grupo. Se duas ou mais pessoas ofertarem o lance nessa mesma modalidade, o critério de desempate será a cota cuja numeração for mais próxima da sorteada no período.",
      },
      note: "As regras e percentuais de lances variam conforme o produto e o plano contratado. Vale lembrar que só paga o lance quem for o ganhador ou ganhadora. Todo o valor pago como lance é abatido do saldo devedor, conforme as regras do contrato. Dica: uma forma de fazer o pagamento do lance é utilizar também uma parte do crédito. Essa modalidade é chamada de lance embutido (facilitado), e serve para compor o valor ofertado com recursos próprios. Dessa forma, se você for o vencedor, o percentual do lance embutido utilizado será descontado do valor do crédito que você irá receber.",
    },
    advantages: {
      title: "Vantagens do consórcio",
      paragraphs: [
        "O consórcio de imóveis da Multiplic Consórcios conta com inúmeras vantagens, como a possibilidade de compra planejada e economia por não pagar juros. Mas existem novas opções e vantagens. Por exemplo:",
      ],
      cards: [
        {
          title: "Sem juros, sem entrada",
          body: "Conta com parcelas personalizadas e cabe em qualquer orçamento.",
        },
        {
          title: "Compre o que quiser",
          body: "Possibilidade de comprar diferentes bens ou mesmo contratar serviços variados.",
        },
        {
          title: "Aumente as chances",
          body: "Permite ofertar lances para acelerar a contemplação.",
        },
        {
          title: "Ganhe dinheiro",
          body: "Use a carta de crédito na compra do bem ou realize sua venda para lucrar com ágio na negociação.",
        },
      ],
    },
    rate: {
      value: "0,08% ao mês*",
      label: "Taxa mensal a partir de",
      title: "Taxa de administração do plano",
      body: "Consulte com a Multiplic Consórcios as condições vigentes do plano, a taxa de administração aplicável e todos os custos previstos em contrato antes de contratar.",
      ctaLabel: "Fazer simulação gratuita",
    },
    faqs: [
      {
        question: "Como funciona um consórcio de imóveis?",
        answer: "O consórcio de imóveis é a categoria dedicada àqueles que buscam realizar o sonho do imóvel próprio ou mesmo procuram uma forma de aumentar o seu patrimônio. Com a carta de crédito imobiliário você pode fazer a compra de um imóvel novo, usado, usar o valor para reforma de um imóvel próprio ou mesmo adquirir um terreno para construção sem juros ou mesmo a necessidade de entrada.",
      },
      {
        question: "Como funciona a carta de crédito imobiliário?",
        answer: "Dentro do consórcio de imóveis, a carta de crédito desempenha um papel crucial ao permitir a compra de diversos tipos de propriedades, incluindo imóveis novos, usados, na planta ou até mesmo terrenos para construção. Além disso, assim como em outras modalidades de consórcio, a carta de crédito contemplada no consórcio imobiliário pode ser utilizada para adquirir um imóvel.",
      },
      {
        question: "Para que serve a carta de crédito de imóvel?",
        answer: "A carta de crédito é o valor que o consorciado tem disponível para adquirir o bem desejado após a contemplação. No caso do consórcio imobiliário, você pode usá-la para comprar casas, apartamentos, imóveis comerciais (novos ou usados), além de reformar, construir, adquirir terrenos ou até quitar um financiamento imobiliário.",
      },
    ],
    crossSell: true,
  },
}

export default function ImoveisPage() {
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
