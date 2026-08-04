import Image from 'next/image'
import Link from 'next/link'

const terms = [
  {
    eyebrow: 'Partes',
    title: 'Multiplic Consórcios e afiliado',
    copy: 'A parceria acontece entre a Multiplic Consórcios e o influenciador autenticado.',
  },
  {
    eyebrow: 'Indicação',
    title: 'Cupom e link exclusivo',
    copy: 'O afiliado divulga um link ou cupom próprio para levar seguidores até a simulação e contratação de consórcio.',
  },
  {
    eyebrow: 'Comissão',
    title: 'Em torno de 1%',
    copy: 'A comissão pode chegar a aproximadamente 1% do consórcio contratado, após validação da venda e regras da campanha.',
  },
  {
    eyebrow: 'Validação',
    title: 'Só venda confirmada gera comissão',
    copy: 'Leads, simulações, propostas canceladas ou contratos não efetivados não geram direito automático à comissão.',
  },
  {
    eyebrow: 'Assinatura',
    title: 'Contrato real em PDF',
    copy: 'Depois do login com Google, o afiliado visualiza o contrato formal em PDF e confirma a assinatura eletrônica.',
  },
  {
    eyebrow: 'Confirmação',
    title: 'E-mail via Resend',
    copy: 'Ao assinar, o sistema envia um e-mail de confirmação para o endereço autenticado do afiliado.',
  },
]

export default function AffiliatesPage() {
  return (
    <main className="affiliate-shell">
      <header className="container site-header">
        <Link href="/">
          <Image
            alt="Multiplic Consórcios"
            className="brand-logo"
            height={872}
            priority
            src="/brand/logo-horizontal-branco.png"
            width={3537}
          />
        </Link>

        <Link className="secondary-button" href="/">
          Voltar ao site
        </Link>
      </header>

      <section className="container affiliate-hero">
        <span className="eyebrow">Contrato de parceria · Multiplic Consórcios</span>
        <h1 className="affiliate-title">
          Indique consórcios com uma parceria clara antes do primeiro cupom.
        </h1>
        <p className="affiliate-copy">
          Esta landing apresenta as principais partes contratuais de forma
          simples. Para assinar, você entra com Google, lê o contrato real em
          PDF e confirma a assinatura eletrônica.
        </p>

        <div className="terms-grid">
          {terms.map((term) => (
            <article className="term-card" key={term.title}>
              <strong>{term.eyebrow}</strong>
              <h2>{term.title}</h2>
              <p>{term.copy}</p>
            </article>
          ))}
        </div>

        <Link className="primary-button" href="/api/auth/signin?callbackUrl=/afiliados/contrato">
          Assinar contrato
        </Link>
      </section>
    </main>
  )
}
