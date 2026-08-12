import Image from 'next/image'
import Link from 'next/link'

const footerGroups = [
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

export function SiteFooter({ className }: { className?: string }) {
  return (
    <footer className={className ? `site-footer ${className}` : 'site-footer'}>
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
            Multiplic Consórcios oferece simulação e atendimento consultivo para
            quem quer planejar crédito com mais clareza.
          </p>
          <Link className="secondary-button" href="/#simulador">
            Simular agora
          </Link>
        </div>

        {footerGroups.map((group) => (
          <div className="footer-links" key={group.label}>
            <strong>{group.label}</strong>
            <ul>
              {group.items.map((item) => (
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
  )
}
