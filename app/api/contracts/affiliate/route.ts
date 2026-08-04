import { buildAffiliateContractPdf } from '@/lib/contract'

export function GET() {
  return new Response(buildAffiliateContractPdf(), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="contrato-afiliado-multcon.pdf"',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
