import { getServerSession } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { authOptions } from '@/lib/auth'

import { SignContractForm } from './sign-contract-form'

interface ContractPageProps {
  searchParams: {
    assinado?: string
  }
}

export default async function AffiliateContractPage({
  searchParams,
}: ContractPageProps) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    redirect('/api/auth/signin?callbackUrl=/afiliados/contrato')
  }

  return (
    <main className="contract-shell">
      <header className="contract-header">
        <div className="container site-header">
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
        </div>
      </header>

      <section className="container contract-card">
        <div>
          <span className="eyebrow">PDF oficial para assinatura</span>
          <h1 className="contract-title">Contrato de afiliado Multcon</h1>
          <p className="section-copy">
            Você está autenticado como {session.user.email}. Leia o documento e
            confirme a assinatura eletrônica para receber a confirmação por
            e-mail.
          </p>
        </div>

        {searchParams.assinado === '1' ? (
          <div className="notice">
            Contrato assinado. A confirmação foi enviada para o seu e-mail.
          </div>
        ) : null}

        <div className="contract-panel">
          <iframe
            title="Contrato de afiliado Multcon"
            src="/api/contracts/affiliate"
          />
        </div>

        <SignContractForm />
      </section>
    </main>
  )
}
