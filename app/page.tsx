import Image from "next/image";
import Link from "next/link";

import { SimulatorForm } from "@/components/simulator-form";
import { SiteHeader } from "@/components/site-header";
import { longFaqs } from "@/lib/site-content";

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

            <div className="trust-row">
              <div className="trust-card">
                <strong>Sem entrada</strong>
                <span>planejamento por consórcio</span>
              </div>
              <div className="trust-card">
                <strong>Sem juros</strong>
                <span>taxas conforme contrato</span>
              </div>
              <div className="trust-card">
                <strong>Especialista</strong>
                <span>atendimento especializado</span>
              </div>
            </div>
          </div>

          <div className="hero-simulator-wrap" id="simulador">
            <div className="hero-visual-card" aria-hidden="true">
              <div className="visual-house">
                <span />
                <i />
              </div>
              <div className="visual-car" />
              <div className="promo-card">
                <small>Planos em análise</small>
                <strong>compare crédito ou parcela</strong>
              </div>
            </div>
            <SimulatorForm />
          </div>
        </div>
      </section>

      <section className="section" id="como-funciona">
        <div className="container">
          <span className="section-kicker">Como funciona</span>
          <h2 className="section-title">
            Uma jornada objetiva para decidir melhor.
          </h2>
          <p className="section-copy">
            A Multiplic Consórcios combina simulação objetiva, captura de
            contato e atendimento consultivo para transformar intenção em uma
            proposta mais clara.
          </p>

          <div className="benefit-grid">
            {benefits.map((benefit) => (
              <article className="benefit-card" key={benefit.number}>
                <span>{benefit.number}</span>
                <h3>{benefit.title}</h3>
                <p>{benefit.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container comparison-band">
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
        <div className="container faq-grid">
          <div>
            <span className="section-kicker">Perguntas frequentes</span>
            <h2 className="section-title">O essencial antes de avançar.</h2>
            <p className="section-copy">
              Respostas rápidas para entender a lógica do consórcio antes de
              falar com o atendimento.
            </p>
          </div>

          <div className="faq-list">
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
        <div className="container footer-grid">
          <div>
            <Image
              alt="Multiplic Consórcios"
              className="footer-logo"
              height={872}
              src="/brand/logo-horizontal.png"
              width={3537}
            />
            <p>
              Multiplic Consórcios oferece simulação e atendimento consultivo
              para quem quer planejar crédito com mais clareza.
            </p>
          </div>

          <div className="footer-registry">
            <strong>Dados cadastrais</strong>
            <span>CNPJ 23.974.875/0001-90</span>
            <span>MULTIPLIC CORRETORA DE SEGUROS LTDA</span>
            <span>Matriz · Aberta em 08/01/2016</span>
            <span>Situação cadastral informada: ativa</span>
          </div>

          <div className="footer-note">
            Valores apresentados são estimativas sujeitas à tabela vigente,
            análise, disponibilidade de grupo e regras comerciais aplicáveis.
          </div>
        </div>
      </footer>
    </main>
  );
}
