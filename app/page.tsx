import Image from 'next/image'
import Link from 'next/link'

import { SimulatorForm } from '@/components/simulator-form'

const benefits = [
  {
    number: '01',
    title: 'Simulação na primeira dobra',
    copy: 'A jornada segue a lógica objetiva do mycon.com.br: entender, simular e avançar sem ruído.',
  },
  {
    number: '02',
    title: 'Base Porto Seguro',
    copy: 'A proposta deve considerar as tabelas vigentes do mês para manter a conversa comercial alinhada.',
  },
  {
    number: '03',
    title: 'Atendimento consultivo',
    copy: 'O lead sai da simulação com contexto suficiente para receber uma proposta personalizada.',
  },
]

export default function HomePage() {
  return (
    <main className="page-shell">
      <header className="container site-header">
        <Link href="/">
          <Image
            alt="Multiplic Seguros"
            className="brand-logo"
            height={872}
            priority
            src="/brand/logo-horizontal-branco.png"
            width={3537}
          />
        </Link>

        <nav className="header-actions" aria-label="Navegação principal">
          <a className="nav-link" href="#simulador">
            Simulador
          </a>
          <Link className="nav-link" href="/afiliados">
            Afiliados
          </Link>
          <a className="secondary-button" href="#simulador">
            Simular
          </a>
        </nav>
      </header>

      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">Multcon · Multiplic Seguros</span>
            <h1 className="hero-title">Consórcio sem ruído, simulado em minutos.</h1>
            <p className="hero-copy">
              Uma landing page mobile first inspirada no fluxo do mycon.com.br,
              com simulador direto na hero e prévia baseada nas tabelas vigentes
              da Porto Seguro.
            </p>

            <div className="trust-row">
              <div className="trust-card">
                <strong>Porto</strong>
                <span>tabelas vigentes</span>
              </div>
              <div className="trust-card">
                <strong>Mobile</strong>
                <span>primeira jornada</span>
              </div>
              <div className="trust-card">
                <strong>Lead</strong>
                <span>pronto para atendimento</span>
              </div>
            </div>
          </div>

          <div id="simulador">
            <SimulatorForm />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">A experiência foi desenhada para converter.</h2>
          <p className="section-copy">
            A Multcon usa a força institucional da Multiplic Seguros com uma
            jornada digital objetiva: promessa clara, simulação imediata,
            captura de contato e atendimento consultivo.
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
        <div className="container affiliate-band">
          <div>
            <span className="eyebrow">Programa de afiliados</span>
            <h2 className="section-title">Influenciadores com contrato e rastreio.</h2>
            <p>
              O afiliado entende as regras, entra com Google, assina o contrato
              em PDF e recebe confirmação por e-mail antes de gerar cupom e link.
            </p>
          </div>
          <Link className="primary-button" href="/afiliados">
            Ver parceria
          </Link>
        </div>
      </section>

      <footer className="container site-footer">
        Multcon é uma plataforma da Multiplic Seguros. Valores apresentados são
        estimativas sujeitas às tabelas vigentes da Porto Seguro, análise e
        regras comerciais aplicáveis.
      </footer>
    </main>
  )
}
