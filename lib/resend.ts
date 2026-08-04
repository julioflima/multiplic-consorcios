import type { AffiliateContractSignature } from './contract'

interface ResendEmailPayload {
  from: string
  to: string[]
  subject: string
  html: string
}

export async function sendContractSignedEmail(
  signature: AffiliateContractSignature,
) {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM

  if (!apiKey || !from) {
    throw new Error('Resend is not configured.')
  }

  const payload: ResendEmailPayload = {
    from,
    to: [signature.email],
    subject: 'Contrato de afiliado Multcon assinado',
    html: `
      <div style="font-family: Arial, sans-serif; color: #12213b; line-height: 1.6;">
        <h1>Contrato assinado com sucesso</h1>
        <p>Olá, ${signature.name}.</p>
        <p>Confirmamos a assinatura eletrônica do seu contrato de parceria comercial com a Multcon, uma plataforma da Multiplic Seguros.</p>
        <p><strong>Versão:</strong> ${signature.contractVersion}<br /><strong>Data:</strong> ${new Date(
          signature.signedAt,
        ).toLocaleString('pt-BR')}</p>
        <p>Agora você pode prosseguir para configurar seu cupom e link de afiliado.</p>
      </div>
    `,
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const details = await response.text()
    throw new Error(`Resend email failed: ${details}`)
  }
}
