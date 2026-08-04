export interface AffiliateContractSignature {
  contractVersion: string
  email: string
  name: string
  signedAt: string
}

export const affiliateContractVersion = 'multcon-afiliados-v1'

const contractLines = [
  'Contrato de Parceria Comercial Multiplic Consorcios',
  '',
  'Pelo presente instrumento, de um lado, Multiplic Consorcios, e, de outro lado, o afiliado cadastrado, ajustam uma parceria comercial para indicacao de interessados em contratar consorcios.',
  '',
  'O afiliado podera divulgar a Multiplic Consorcios por meio de link, cupom ou outros materiais autorizados, direcionando seus seguidores, contatos ou audiencia para simulacao e contratacao de consorcios.',
  '',
  'A comissao do afiliado podera corresponder a aproximadamente 1% do valor do consorcio contratado pelo indicado, desde que a contratacao seja efetivamente concluida, validada e reconhecida pela Multiplic Consorcios, conforme regras comerciais vigentes.',
  '',
  'A comissao somente sera devida apos confirmacao da contratacao, validacao dos dados do cliente indicado e cumprimento das condicoes comerciais aplicaveis. Simulacoes, leads nao convertidos, contratos cancelados ou propostas nao efetivadas nao geram direito automatico a comissao.',
  '',
  'O afiliado declara estar ciente de que nao representa legalmente a Multiplic Consorcios, nao podendo assumir obrigacoes, prometer aprovacao, garantir condicoes comerciais ou falar em nome da empresa sem autorizacao expressa.',
  '',
  'A Multiplic Consorcios podera revisar, suspender ou encerrar a parceria em caso de uso indevido da marca, divulgacao enganosa, fraude, descumprimento das regras comerciais ou qualquer conduta que prejudique a empresa, seus clientes ou parceiros.',
  '',
  'Ao assinar eletronicamente este contrato, o afiliado declara que leu, compreendeu e aceitou as condicoes da parceria comercial com a Multiplic Consorcios.',
  '',
  `Versao do contrato: ${affiliateContractVersion}`,
]

function escapePdfText(value: string) {
  return value.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)')
}

function buildContentStream() {
  const lines = contractLines.flatMap((line) => {
    if (line.length <= 96) return [line]

    const chunks: string[] = []
    const words = line.split(' ')
    let current = ''

    words.forEach((word) => {
      const next = current ? `${current} ${word}` : word
      if (next.length > 96) {
        chunks.push(current)
        current = word
        return
      }

      current = next
    })

    if (current) chunks.push(current)

    return chunks
  })

  return [
    'BT',
    '/F1 18 Tf',
    '56 780 Td',
    `(Contrato Multiplic Consorcios Afiliados) Tj`,
    '/F1 10 Tf',
    '0 -34 Td',
    ...lines.map((line) => `(${escapePdfText(line)}) Tj 0 -16 Td`),
    'ET',
  ].join('\n')
}

export function buildAffiliateContractPdf() {
  const stream = buildContentStream()
  const objects = [
    '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n',
    '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n',
    '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>\nendobj\n',
    '4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n',
    `5 0 obj\n<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}\nendstream\nendobj\n`,
  ]
  let offset = '%PDF-1.4\n'.length
  const xref = ['0000000000 65535 f ']
  const body = objects
    .map((object) => {
      xref.push(`${offset.toString().padStart(10, '0')} 00000 n `)
      offset += object.length
      return object
    })
    .join('')

  const xrefStart = offset

  return Buffer.from(
    `%PDF-1.4\n${body}xref\n0 ${objects.length + 1}\n${xref.join(
      '\n',
    )}\ntrailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`,
  )
}
