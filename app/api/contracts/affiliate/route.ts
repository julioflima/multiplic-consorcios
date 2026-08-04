import { buildAffiliateContractPdf } from '@/lib/contract'
import { getBackendApiUrl } from '@/lib/api'

export async function GET() {
  try {
    const backendResponse = await fetch(
      `${getBackendApiUrl()}/contracts/affiliate`,
    )

    if (backendResponse.ok) {
      return new Response(await backendResponse.arrayBuffer(), {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'inline; filename="contrato-afiliado-multcon.pdf"',
          'Cache-Control': 'public, max-age=3600',
        },
      })
    }
  } catch {
    // Fall back to local generation so the PDF remains available if the API is down.
  }

  return new Response(buildAffiliateContractPdf(), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="contrato-afiliado-multcon.pdf"',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
