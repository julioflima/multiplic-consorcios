'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const navGroups = [
  {
    label: 'Escolha o seu sonho',
    items: [
      { label: 'Imóveis', href: '/guias/consorcio-de-imoveis' },
      { label: 'Carros', href: '/guias/consorcio-de-carro' },
      { label: 'Motos', href: '/guias/consorcio-de-moto' },
      { label: 'Pesados', href: '/guias/consorcio-de-caminhoes' },
      { label: 'Reformas', href: '/guias/construcao-e-reforma' },
    ],
  },
  {
    label: 'O que é consórcio?',
    items: [
      { label: 'Bê-á-bá do consórcio', href: '/guias/be-a-ba-do-consorcio' },
      { label: 'Como comprar?', href: '/guias/como-comprar-com-consorcio' },
    ],
  },
  {
    label: 'Precisa de ajuda?',
    items: [
      { label: 'Quem somos', href: '/guias/quem-somos' },
      { label: 'Segurança na compra', href: '/guias/seguranca-na-compra' },
    ],
  },
]

const standaloneNavItems = [{ label: 'Simular', href: '/#simulador' }]

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <header className="site-header">
        <div className="container site-header-inner">
          <Link className="brand-link" href="/" onClick={() => setMenuOpen(false)}>
            <Image
              alt="Multiplic Consórcios"
              className="brand-logo"
              height={872}
              priority
              src="/brand/logo-horizontal-preto.png"
              width={3539}
            />
          </Link>

          <nav className="header-actions" aria-label="Navegação principal">
            {navGroups.map((group) => (
              <div className="nav-group" key={group.label}>
                <button className="nav-link nav-trigger" type="button">
                  {group.label}
                  <svg aria-hidden="true" className="nav-chevron" viewBox="0 0 12 8">
                    <path d="M1 1.5 6 6.5 11 1.5" />
                  </svg>
                </button>
                <div className="nav-panel">
                  {group.items.map((item) => (
                    <Link href={item.href} key={item.href}>
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            {standaloneNavItems.map((item) =>
              item.label === 'Simular' ? (
                <Link className="secondary-button" href={item.href} key={item.href}>
                  {item.label}
                </Link>
              ) : (
                <Link className="nav-link" href={item.href} key={item.href}>
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <button
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            className={`menu-toggle${menuOpen ? ' is-open' : ''}`}
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className={`mobile-nav${menuOpen ? ' is-open' : ''}`}>
        <nav className="mobile-nav-list" aria-label="Navegação mobile">
          {navGroups.map((group) => (
            <details className="mobile-nav-group" key={group.label}>
              <summary>{group.label}</summary>
              <div>
                {group.items.map((item) => (
                  <Link href={item.href} key={item.href} onClick={() => setMenuOpen(false)}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </details>
          ))}

          {standaloneNavItems.map((item) => (
            <Link
              className={item.label === 'Simular' ? 'secondary-button' : 'mobile-nav-link'}
              href={item.href}
              key={item.href}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}
