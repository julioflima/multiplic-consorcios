import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

import {
  affiliateContractVersion,
  type AffiliateContractSignature,
} from '@/lib/contract'
import { authOptions } from '@/lib/auth'
import { sendContractSignedEmail } from '@/lib/resend'

export async function POST() {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email
  const name = session?.user?.name ?? 'Afiliado Multcon'

  if (!email) {
    return NextResponse.json(
      { error: 'Faça login com Google para assinar o contrato.' },
      { status: 401 },
    )
  }

  const signature: AffiliateContractSignature = {
    contractVersion: affiliateContractVersion,
    email,
    name,
    signedAt: new Date().toISOString(),
  }

  try {
    await sendContractSignedEmail(signature)
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Não foi possível enviar o e-mail de confirmação.'

    return NextResponse.json({ error: message }, { status: 502 })
  }

  const response = NextResponse.json({ success: true, signature })

  response.cookies.set({
    name: 'multcon_affiliate_contract_signature',
    value: Buffer.from(JSON.stringify(signature)).toString('base64url'),
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
  })

  return response
}
