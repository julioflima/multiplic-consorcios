import { NextResponse } from 'next/server'
import { z } from 'zod'

const partnershipSchema = z.object({
  signedAt: z.string().datetime().nullable().optional(),
})

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const parsed = partnershipSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? 'Dados inválidos.' },
      { status: 400 },
    )
  }

  const signature = {
    signedAt: parsed.data.signedAt ?? new Date().toISOString(),
    source: 'influencer-landing',
  }

  console.info('[influencer] nova parceria assinada', signature)

  return NextResponse.json({ ok: true, signature }, { status: 201 })
}
