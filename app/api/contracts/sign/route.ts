import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

import {
  affiliateContractVersion,
  type AffiliateContractSignature,
} from '@/lib/contract'
import { getBackendApiUrl } from '@/lib/api'
import { authOptions } from '@/lib/auth'

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

  try {
    const backendResponse = await fetch(`${getBackendApiUrl()}/contracts/sign`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, name }),
    })

    const payload = (await backendResponse.json()) as {
      error?: string
      signature?: AffiliateContractSignature
    }

    if (!backendResponse.ok || !payload.signature) {
      return NextResponse.json(
        { error: payload.error ?? 'Não foi possível assinar o contrato.' },
        { status: backendResponse.status },
      )
    }

    const response = NextResponse.json({
      success: true,
      signature: {
        ...payload.signature,
        contractVersion: payload.signature.contractVersion ?? affiliateContractVersion,
      },
    })

    response.cookies.set({
      name: 'multcon_affiliate_contract_signature',
      value: Buffer.from(JSON.stringify(payload.signature)).toString('base64url'),
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
    })

    return response
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Não foi possível assinar o contrato.'

    return NextResponse.json({ error: message }, { status: 502 })
  }
}
