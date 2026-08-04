import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { guidePages } from '@/lib/site-content'

import { SiteHeader } from './site-header'

export function getGuideMetadata(slug: string): Metadata {
  const page = guidePages.find((item) => item.slug === slug)

  if (!page) return {}

  return {
    title: `${page.title} | Multiplic Consórcios`,
    description: page.description,
  }
}

export function GuidePageContent({ slug }: { slug: string }) {
  const page = guidePages.find((item) => item.slug === slug)

  if (!page) notFound()

  return (
    <main className="page-shell guide-shell">
      <SiteHeader />

      <section className="guide-hero">
        <div className="container guide-hero-grid">
          <div>
            <span className="section-kicker">{page.eyebrow}</span>
            <h1 className="guide-title">{page.title}</h1>
            <p>{page.description}</p>
            <Link className="primary-button" href="/#simulador">
              Simular agora
            </Link>
          </div>

          <aside className="guide-card">
            <strong>Resumo rápido</strong>
            <span>
              Conteúdo original da Multiplic Consórcios para ajudar você a
              comparar possibilidades antes da proposta.
            </span>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container guide-content">
          {page.sections.map((section) => (
            <article key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
