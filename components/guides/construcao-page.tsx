import Link from 'next/link'

import { CategoryIcon, TrustIcon } from '@/components/icons'
import { SiteHeader } from '@/components/site-header'
import type { GuidePage } from './types'

const highlightIcons = ['check', 'spark', 'shield', 'chat', 'clock', 'lock'] as const

function Illustration() {
  return (
    <svg aria-hidden="true" className="gd-illustration-icon" fill="none" viewBox="0 0 96 96">
      <path d="M48 18v18" />
      <path d="M48 60v18" />
      <path d="M18 48h18" />
      <path d="M60 48h18" />
      <path d="m28 28 12 12" />
      <path d="m56 56 12 12" />
      <path d="m68 28-12 12" />
      <path d="M40 56 28 68" />
    </svg>
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
  slug: "construcao-e-reforma",
  title: "Consórcio para Construção e Reforma",
  eyebrow: "Produtos",
  description: "Transforme seu imóvel com a Multiplic Consórcios",
  sections: [],
  detail: {
    breadcrumbLabel: "Construção e Reforma",
    heroTagline: "Transforme seu imóvel com a Multiplic Consórcios",
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
      title: "Como funciona o consórcio para construção e reforma?",
      paragraphs: [
        "Com o consórcio para construção e reforma da Multiplic Consórcios você pode usar a carta de crédito para pagar a manutenção do seu imóvel e realizar aquela transformação dos sonhos sem afetar seu orçamento com juros abusivos. O processo é bem parecido com o do consórcio de imóvel. Depois de escolher o valor e o prazo da sua carta de crédito, você vai receber o número da sua cota de consórcio. A partir daí, paga uma parcela todo mês e tem a chance de ser contemplado por sorteio, ou ainda pode ofertar um lance fixo ou lance livre, buscando antecipar a contemplação.",
        "Não é empréstimo e nem financiamento. E ainda bem.",
        "O consórcio para construção na Multiplic Consórcios é a maneira mais inteligente e econômica para você planejar sua obra.",
      ],
    },
    compareBanner: {
      title: "Compare o consórcio da Multiplic Consórcios com o financiamento e comprove.",
      subtitle: "Quando você não tem o valor à vista para fazer a compra de um bem, contratar um serviço ou realizar alguma construção e reforma, existem duas opções para ajudar a realizar seus objetivos: consórcio ou financiamento.",
      ctaLabel: "Simule seu consórcio",
    },
    comparison: {
      title: "Consórcio x Financiamento",
      cards: [
        {
          title: "1",
          body: "Mesmo que ambas tenham o objetivo de facilitar a sua aquisição, o consórcio e o financiamento têm suas particularidades, vantagens e desvantagens. Apesar da burocracia de documentação, o financiamento tende a ser mais rápido na entrega do bem.",
        },
        {
          title: "2",
          body: "Por outro lado, o consórcio para construção e reforma é uma estratégia de compra programada, em que você escolhe uma cota de imóvel com o valor que se alinha ao seu planejamento financeiro e participa de sorteios mensais para a contemplação.",
        },
        {
          title: "3",
          body: "Ao contratar consórcio, você aguarda a contemplação (sorteio ou lance) para receber o crédito, sem prazo garantido.",
        },
      ],
    },
    creditCard: {
      title: "Como funciona a carta de crédito para construção e reforma?",
      paragraphs: [
        "Após a contemplação, obtida por sorteio ou lance, você passa por uma análise de crédito e apresenta o terreno da construção do seu imóvel, que deverá ser um terreno quitado em território nacional, ou a documentação do imóvel que será reformado.",
        "Para a conclusão do procedimento é necessário ter a planta aprovada pela prefeitura, junto com o alvará de aprovação da obra e orçamento detalhado. A partir daí você pode usar sua carta de crédito para reforma e começar a obra.",
      ],
      cardLabel: "Carta de crédito",
      cardValue: "Construção, reforma e ampliação",
      facts: [
        {
          label: "Uso da carta",
          value: "Materiais e mão de obra",
        },
        {
          label: "Documentação",
          value: "Planta, alvará e orçamento",
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
          title: "Como é feito o sorteio de consórcio e as assembleias?",
          body: "Os sorteios são realizados através da extração da Loteria Federal imediatamente anterior à data da assembleia do grupo. Todos que estiverem com o pagamento das parcelas em dia participam automaticamente dos sorteios todos os meses.",
        },
        {
          title: "Quantas pessoas são contempladas no consórcio por mês?",
          body: "Todo mês, pelo menos um participante é contemplado nos sorteios do consórcio. No entanto, se o grupo estiver em boa situação financeira e houver ofertas de lance dos participantes, é possível que aconteça mais de uma contemplação no mesmo mês.",
        },
        {
          title: "Quantas pessoas fazem parte de um grupo de consórcio?",
          body: "Na Multiplic Consórcios é possível adquirir a carta de crédito de forma mais rápida ofertando lance fixo ou lance livre.",
        },
      ],
      ctaLabel: "Simule seu consórcio",
    },
    bidding: {
      title: "Como funciona o lance de consórcio?",
      intro: "Existem duas modalidades de lance no consórcio para construção e reforma: lance fixo e lance livre. As duas funcionam como uma outra possibilidade de conquistar sua contemplação de maneira mais rápida.",
      livre: {
        title: "Lance Livre",
        body: "Esse tipo de lance é para quem tem uma reserva própria e pode ofertar um valor maior à vista. Nesse caso, não existe limite e o maior percentual ofertado vence e, consequentemente, recebe o crédito.",
      },
      fixo: {
        title: "Lance Fixo",
        body: "Este tipo de lance envolve a oferta de um percentual fixo, determinado pela administradora em conjunto com o grupo de participantes. Caso duas ou mais pessoas façam uma oferta nessa mesma categoria, o desempate será decidido pela cota cujo número estiver mais próximo do sorteado no período correspondente.",
      },
      note: "As regras e os percentuais para lances podem variar de acordo com o produto e o plano escolhido. Importante: apenas o vencedor do lance é responsável pelo pagamento, e o valor oferecido é deduzido do saldo devedor, conforme estipulado em contrato. Uma maneira de facilitar o pagamento do lance é usar parte do crédito disponível — o chamado lance embutido (ou facilitado). Se você for o contemplado, o percentual do lance embutido será descontado do valor do crédito que você receberá.",
    },
    advantages: {
      title: "Vantagens do consórcio",
      paragraphs: [
        "Conforme mencionamos anteriormente, o consórcio para construção e reforma oferece uma série de benefícios, incluindo a oportunidade de uma compra programada e a economia garantida pela ausência de juros. Por exemplo:",
      ],
      cards: [
        {
          title: "Sem entrada ou juros",
          body: "Oferece parcelas ajustáveis que se encaixam em qualquer planejamento financeiro.",
        },
        {
          title: "Acelera a contemplação",
          body: "Possibilita a oferta de lances para aumentar as chances de ser contemplado no consórcio para construir e reformar.",
        },
        {
          title: "Adquira o que desejar",
          body: "Permite a compra de uma variedade de bens ou até a contratação de diferentes serviços.",
        },
        {
          title: "Possibilidade de lucro",
          body: "Utilize a carta de crédito para adquirir o bem desejado ou venda-a para obter um lucro de ágio.",
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
        question: "Como funciona o consórcio para construção e reforma?",
        answer: "O consórcio para construção e reforma é a categoria de consórcio dedicada àqueles que buscam realizar a construção ou fazer alguma reforma em um imóvel. Com a carta de crédito para construção e reforma você pode comprar materiais de construção, contratar mão de obra, arquitetos, engenheiros ou empresas de construção, sem o perigo do orçamento acabar no meio da obra.",
      },
      {
        question: "Como funciona a carta de crédito para construir?",
        answer: "A carta de crédito para construção e reforma pode ser adquirida através da contemplação por sorteio, por lance fixo ou livre. Após a contemplação, você passa por uma análise de crédito e apresenta o terreno da construção do seu imóvel, que deverá ser um terreno quitado em território nacional. No caso de reforma, a documentação do imóvel deverá ser apresentada. Para a aprovação do procedimento, é necessário ter a planta aprovada pela prefeitura, junto com o alvará de aprovação da obra e orçamento detalhado.",
      },
      {
        question: "O que fazer para ser contemplado no consórcio para construção e reforma?",
        answer: "Além dos sorteios mensais realizados durante a assembleia, os participantes também têm a oportunidade de oferecer lances. Recomendamos que, antes de fazer sua oferta, você analise os resultados anteriores de contemplação para elaborar uma estratégia mais eficaz.",
      },
    ],
    crossSell: true,
  },
}

export default function ConstrucaoPage() {
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
