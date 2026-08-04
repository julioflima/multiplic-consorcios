import Image from 'next/image'
import Link from 'next/link'

import { navGroups, standaloneNavItems } from '@/lib/site-content'

export function SiteHeader() {
  return (
    <header className="container site-header">
      <Link className="brand-link" href="/">
        <Image
          alt="Multiplic Consórcios"
          className="brand-logo"
          height={872}
          priority
          src="/brand/logo-horizontal-branco.png"
          width={3537}
        />
      </Link>

      <nav className="header-actions" aria-label="Navegação principal">
        {navGroups.map((group) => (
          <div className="nav-group" key={group.label}>
            <button className="nav-link nav-trigger" type="button">
              {group.label}
              <span aria-hidden="true">⌄</span>
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
    </header>
  )
}
