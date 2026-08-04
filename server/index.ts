import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import { z } from 'zod'

import {
  affiliateContractVersion,
  buildAffiliateContractPdf,
  type AffiliateContractSignature,
} from '../lib/contract'
import { prisma } from '../lib/prisma'
import { sendContractSignedEmail } from '../lib/resend'

const app = express()
const port = Number(process.env.API_PORT ?? 4000)
const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:3000'

const signContractSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).default('Afiliado Multiplic Consórcios'),
})

app.use(
  cors({
    origin: frontendUrl,
    credentials: true,
  }),
)
app.use(express.json())

app.get('/health', (_request, response) => {
  response.json({ ok: true })
})

app.get('/contracts/affiliate', (_request, response) => {
  response
    .status(200)
    .set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="contrato-afiliado-multcon.pdf"',
      'Cache-Control': 'public, max-age=3600',
    })
    .send(buildAffiliateContractPdf())
})

app.post('/contracts/sign', async (request, response) => {
  const parsed = signContractSchema.safeParse(request.body)

  if (!parsed.success) {
    response.status(400).json({
      error: 'Dados inválidos para assinatura do contrato.',
      issues: parsed.error.flatten().fieldErrors,
    })
    return
  }

  const signature: AffiliateContractSignature = {
    contractVersion: affiliateContractVersion,
    email: parsed.data.email,
    name: parsed.data.name,
    signedAt: new Date().toISOString(),
  }

  try {
    await prisma.affiliateContractSignature.upsert({
      where: {
        email_contractVersion: {
          email: signature.email,
          contractVersion: signature.contractVersion,
        },
      },
      create: {
        contractVersion: signature.contractVersion,
        email: signature.email,
        name: signature.name,
        signedAt: new Date(signature.signedAt),
      },
      update: {
        name: signature.name,
        signedAt: new Date(signature.signedAt),
      },
    })

    await sendContractSignedEmail(signature)

    response.status(201).json({ success: true, signature })
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Não foi possível concluir a assinatura.'

    response.status(502).json({ error: message })
  }
})

app.listen(port, () => {
  console.log(`Express API listening on http://localhost:${port}`)
})
