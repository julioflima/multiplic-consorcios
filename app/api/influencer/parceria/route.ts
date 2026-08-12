import { NextResponse } from 'next/server'
import { z } from 'zod'

const WEBHOOK_URL =
  process.env.INFLUENCER_WEBHOOK_URL ??
  'https://services.leadconnectorhq.com/hooks/VMB8GS9dWC42opXRMV6h/webhook-trigger/2605ed56-9b80-4634-872f-26f7fe2f6f21'

const partnershipSchema = z
  .object({
    signedAt: z.string().datetime().nullable().optional(),
    contactKind: z.enum(['whatsapp', 'email']),
    contact: z.string().trim().min(1, 'Informe um contato válido.'),
  })
  .refine(
    (data) =>
      data.contactKind === 'email'
        ? z.string().email().safeParse(data.contact).success
        : data.contact.replace(/\D/g, '').length === 11,
    { message: 'Informe um contato válido.', path: ['contact'] },
  )

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const parsed = partnershipSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? 'Dados inválidos.' },
      { status: 400 },
    )
  }

  const isEmail = parsed.data.contactKind === 'email'

  const signature = {
    signedAt: parsed.data.signedAt ?? new Date().toISOString(),
    contactKind: parsed.data.contactKind,
    email: isEmail ? parsed.data.contact.toLowerCase() : '',
    whatsapp: isEmail ? '' : parsed.data.contact.replace(/\D/g, ''),
    source: 'influencer-landing',
  }

  console.info('[influencer] nova parceria assinada', signature)

  await sendToWebhook(signature)

  return NextResponse.json({ ok: true, signature }, { status: 201 })
}

async function sendToWebhook(signature: {
  signedAt: string
  email: string
  whatsapp: string
  source: string
}) {
  if (!WEBHOOK_URL) return

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        whatsapp: signature.whatsapp,
        email: signature.email,
        signedAt: signature.signedAt,
        source: signature.source,
      }),
      signal: AbortSignal.timeout(8000),
    })

    if (!response.ok) {
      console.error(
        '[influencer] webhook respondeu com erro',
        response.status,
        await response.text().catch(() => ''),
      )
    }
  } catch (error) {
    console.error('[influencer] falha ao enviar webhook', error)
  }
}
