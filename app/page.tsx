import Image from "next/image";
import Link from "next/link";

import { SimulatorForm } from "@/components/simulator-form";
import { SiteHeader } from "@/components/site-header";
import { longFaqs, navGroups } from "@/lib/site-content";

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
    slug: "consorcio-de-servicos",
    label: "Serviços",
    copy: "Reformas, viagens e procedimentos.",
    icon: "spark",
  },
];

function CategoryIcon({ name }: { name: string }) {
  const paths: Record<string, string> = {
    home: "M8 44h56M16 44V23l20-14 20 14v21M25 44V30h14v14M44 44V29h8v15",
    car: "M9 36h6m42 0h6M19 36h34l-5-13H24l-5 13ZM25 36a6 6 0 1 0 0 12 6 6 0 0 0 0-12ZM47 36a6 6 0 1 0 0 12 6 6 0 0 0 0-12Z",
    moto: "M18 39a7 7 0 1 0 0 .1M54 39a7 7 0 1 0 0 .1M25 38h13l8-14h8M35 25h-9l7 13M42 24l-5-7h9",
    truck:
      "M8 37h36V17H8v20ZM44 37h15v-9l-7-8h-8v17ZM18 37a6 6 0 1 0 0 12 6 6 0 0 0 0-12ZM53 37a6 6 0 1 0 0 12 6 6 0 0 0 0-12Z",
    spark: "M36 6v18M36 48v18M6 36h18M48 36h18M14 14l13 13M45 45l13 13M58 14 45 27M27 45 14 58",
  };

  return (
    <svg aria-hidden="true" viewBox="0 0 72 52">
      <path d={paths[name] ?? paths.home} />
    </svg>
  );
}

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
              <a className="ghost-link" href="#como-funciona">
                Ver como funciona
              </a>
            </div>

            <ul className="trust-row">
              <li>
                <span className="trust-dot" />
                Sem entrada · planejamento por consórcio
              </li>
              <li>
                <span className="trust-dot" />
                Sem juros · taxas conforme contrato
              </li>
              <li>
                <span className="trust-dot" />
                Atendimento consultivo especializado
              </li>
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
