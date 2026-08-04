'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function SignContractForm() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSignContract() {
    setError('')
    setIsSubmitting(true)

    const response = await fetch('/api/contracts/sign', {
      method: 'POST',
    })

    setIsSubmitting(false)

    if (response.ok) {
      router.push('/afiliados/contrato?assinado=1')
      return
    }

    const payload = (await response.json()) as { error?: string }
    setError(payload.error ?? 'Não foi possível assinar o contrato.')
  }

  return (
    <div className="contract-actions">
      <div>
        <strong>Assinatura eletrônica</strong>
        <p className="section-copy">
          Ao confirmar, sua conta Google autenticada será usada como identidade
          da assinatura e a confirmação será enviada por e-mail via Resend.
        </p>
        {error ? <p className="field-error">{error}</p> : null}
      </div>

      <button
        className="primary-button"
        disabled={isSubmitting}
        onClick={handleSignContract}
        type="button"
      >
        {isSubmitting ? 'Assinando...' : 'Assinar contrato'}
      </button>
    </div>
  )
}
