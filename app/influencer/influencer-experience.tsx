'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { SiteFooter } from '@/components/site-footer'

import { Confetti } from './confetti'
import styles from './influencer.module.css'

type Step = 'landing' | 'contract' | 'success'
type ContactKind = 'whatsapp' | 'email'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function formatWhatsapp(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11)

  if (digits.length <= 2) return digits
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

const stats = [
  { value: 'R$ 0', label: 'de juros no consórcio' },
  { value: '1%', label: 'da carta de crédito pra você' },
  { value: '3x', label: 'parcelas iguais de comissão' },
]

const commissionExamples = [
  { asset: 'Carro popular', credit: 'R$ 80 mil', commission: 'R$ 800' },
  { asset: 'Carro premium', credit: 'R$ 250 mil', commission: 'R$ 2.500' },
  { asset: 'Apartamento', credit: 'R$ 500 mil', commission: 'R$ 5.000' },
  { asset: 'Casa alto padrão', credit: 'R$ 1 milhão', commission: 'R$ 10.000' },
]

const commissionSteps = [
  {
    title: '1/3 da comissão',
    copy: 'Após a confirmação do pagamento da 1ª parcela do consorciado e da adesão regular da cota.',
  },
  {
    title: '1/3 da comissão',
    copy: 'Após a confirmação do pagamento da 2ª parcela do consorciado.',
  },
  {
    title: '1/3 da comissão',
    copy: 'Após a confirmação do pagamento da 12ª parcela, com a cota ativa e regular.',
  },
]

const financingPains = [
  'Juros que fazem você pagar até 2 casas para levar 1.',
  'Entrada alta, score alto e análise de crédito travando tudo.',
  'Parcela inicial pesada, que compromete a renda por 30 anos.',
  'Se atrasar, o imóvel é a garantia — e o risco é seu.',
]

const consortiumWins = [
  'Sem juros: você paga o bem + taxa de administração.',
  'Parcela que cabe no bolso e pode ser planejada hoje.',
  'Lance ou sorteio podem antecipar sua carta de crédito.',
  'Carta de crédito é dinheiro à vista — poder de negociação.',
  'Serve para casa, apartamento, terreno, reforma ou carro.',
]

const dreamCards = [
  {
    title: 'Você vai precisar de uma casa',
    copy: 'Alugando ou não, moradia é um custo certo no seu futuro. Consórcio transforma esse custo em patrimônio.',
  },
  {
    title: 'E também de um carro',
    copy: 'Trocar de carro sem juros abusivos é possível quando o planejamento começa antes da necessidade.',
  },
  {
    title: 'Comece pequeno, hoje',
    copy: 'O valor da parcela pode ser menor que um aluguel. O tempo trabalha a favor de quem começa antes.',
  },
  {
    title: 'Realize antes do previsto',
    copy: 'Com lance, muita gente é contemplada nos primeiros meses e antecipa o sonho.',
  },
]

const partnerCards = [
  {
    title: 'Você indica',
    copy: 'Link e cupom exclusivos no seu perfil, stories ou bio. Nada de burocracia.',
  },
  {
    title: 'A gente atende',
    copy: 'Nosso time consultivo conversa com o seguidor, simula e conduz a contratação.',
  },
  {
    title: 'Você recebe 1%',
    copy: 'A remuneração é 1% do valor nominal inicial da carta de crédito contratada pelo seu seguidor, paga em 3 parcelas iguais.',
  },
  {
    title: 'Sem custo nenhum',
    copy: 'Você não paga nada para ser parceiro. Só divulga o que já acredita.',
  },
]


const CONTRACT_PDF_URL = '/contratos/contrato-influenciadores-multiplic-2026.pdf'

const clauses = [
  {
    title: '1. Partes',
    copy: 'Contrato de prestação de serviços de divulgação e indicação entre a Multiplic Corretora de Seguros LTDA (CNPJ 23.974.875/0001-90) e o influenciador parceiro.',
  },
  {
    title: '2. Objeto',
    copy: 'Você divulga a Multiplic por link, cupom ou materiais aprovados e encaminha interessados aos canais oficiais. A contratação é feita entre o cliente e a administradora.',
  },
  {
    title: '3. Remuneração de 1%',
    copy: 'Você recebe 1% do valor nominal inicial da carta de crédito contratada pelo cliente indicado e atribuído a você.',
  },
  {
    title: '4. Pagamento em 3 parcelas',
    copy: 'A comissão é dividida em 3 parcelas iguais, pagas após o consorciado quitar a 1ª, a 2ª e a 12ª parcela do consórcio, com a cota regular.',
  },
  {
    title: '5. Indicação rastreável',
    copy: 'Só gera comissão a indicação registrada por link, cupom ou formulário oficial. Leads já existentes, duplicados ou fraudulentos não são remunerados.',
  },
  {
    title: '6. Limites de atuação',
    copy: 'Você não vende, não negocia cotas, não recebe valores de clientes e não coleta documentos. Toda análise individual é feita pela equipe da Multiplic.',
  },
  {
    title: '7. Publicidade responsável',
    copy: 'Conteúdo aprovado previamente, com identificação de publicidade (#publi) e sem promessa de contemplação, lucro ou rentabilidade garantidos.',
  },
  {
    title: '8. Vigência e aceite',
    copy: 'Prazo indeterminado, rescindível por qualquer parte com aviso de 30 dias. Ao tocar em "Assinar contrato", você declara ter lido e aceito o contrato completo.',
  },
]

export function InfluencerExperience({
  prefilledEmail = '',
}: {
  prefilledEmail?: string
}) {
  const hasPrefilledEmail = EMAIL_PATTERN.test(prefilledEmail)

  const [step, setStep] = useState<Step>('landing')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [contactKind, setContactKind] = useState<ContactKind>('whatsapp')
  const [contact, setContact] = useState('')
  const [contactError, setContactError] = useState('')
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  const contactDigits = contact.replace(/\D/g, '')
  const isContactValid = hasPrefilledEmail
    ? true
    : contactKind === 'email'
      ? EMAIL_PATTERN.test(contact.trim())
      : contactDigits.length === 11

  function handleContactKind(kind: ContactKind) {
    setContactKind(kind)
    setContact('')
    setContactError('')
  }

  function handleContactChange(value: string) {
    setContact(contactKind === 'whatsapp' ? formatWhatsapp(value) : value)
    if (contactError) setContactError('')
  }

  function handleStartSigning() {
    if (hasPrefilledEmail) {
      void handleSignContract()
      return
    }

    setContactError('')
    setIsContactModalOpen(true)
  }

  async function handleSignContract() {
    if (!isContactValid) {
      setContactError(
        contactKind === 'email'
          ? 'Informe um e-mail válido para receber o contrato.'
          : 'Informe um WhatsApp válido com DDD (11 dígitos).',
      )
      return
    }

    setIsSubmitting(true)

    const payload = hasPrefilledEmail
      ? { contactKind: 'email' as const, contact: prefilledEmail.trim() }
      : contactKind === 'email'
        ? { contactKind, contact: contact.trim() }
        : { contactKind, contact: contactDigits }

    try {
      await fetch('/api/influencer/parceria', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, signedAt: new Date().toISOString() }),
      })
    } catch {
      // A confirmação continua para o parceiro mesmo se o registro falhar.
    }

    setIsSubmitting(false)
    setIsContactModalOpen(false)
    setStep('success')
  }

  return (
    <div className={styles.shell}>
      <div className={styles.page}>
        <header className={styles.topBar}>
          <Link href="/">
            <Image
              alt="Multiplic Consórcios"
              className={styles.logo}
              height={872}
              priority
              src="/brand/logo-horizontal-branco.png"
              width={3537}
            />
          </Link>
          <span className={styles.badge}>Parceria influencer</span>
        </header>

        <section className={styles.hero}>
          <div className={styles.heroGlow} />
          <Image
            alt="Casa em neon representando a conquista do imóvel próprio"
            className={styles.heroImage}
            height={600}
            priority
            src="/influencer/hero.svg"
            width={800}
          />
          <h1 className={styles.title}>
            Ajude seu público a sair do aluguel{' '}
            <span className={styles.neon}>e ganhe 1% de cada carta contratada.</span>
          </h1>
          <p className={styles.lead}>
            Consórcio é o jeito sem juros de conquistar casa ou carro. Você indica,
            a Multiplic atende e você recebe 1% do valor da carta de crédito
            contratada.
          </p>

          <div className={styles.statRow}>
            {stats.map((stat) => (
              <div className={styles.stat} key={stat.label}>
                <strong className={styles.statValue}>{stat.value}</strong>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <span className={`${styles.eyebrow} ${styles.eyebrowWarn}`}>
            O problema
          </span>
          <h2 className={styles.sectionTitle}>
            Por que financiar virou quase impossível
          </h2>
          <Image
            alt="Porta fechada representando as barreiras do financiamento"
            className={styles.sectionImage}
            height={500}
            src="/influencer/financiamento.svg"
            width={800}
          />
          <ul className={styles.bullets}>
            {financingPains.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <span className={styles.eyebrow}>A conta dos juros</span>
          <h2 className={styles.sectionTitle}>
            No financiamento, você paga a casa duas vezes
          </h2>
          <Image
            alt="Gráfico comparando o custo do financiamento com o do consórcio"
            className={styles.sectionImage}
            height={500}
            src="/influencer/juros.svg"
            width={800}
          />
          <ul className={`${styles.bullets} ${styles.bulletsGood}`}>
            {consortiumWins.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <span className={styles.eyebrow}>O planejamento</span>
          <h2 className={styles.sectionTitle}>
            O sonho de amanhã começa com a decisão de hoje
          </h2>
          <Image
            alt="Trajetória de planejamento até a casa e o carro"
            className={styles.sectionImage}
            height={500}
            src="/influencer/planejamento.svg"
            width={800}
          />
          <div className={styles.cards}>
            {dreamCards.map((card, index) => (
              <article className={styles.card} key={card.title}>
                <span className={styles.cardIndex}>{index + 1}</span>
                <h3>{card.title}</h3>
                <p>{card.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <span className={styles.eyebrow}>Seu papel</span>
          <h2 className={styles.sectionTitle}>
            Sua audiência confia em você. Isso vale muito.
          </h2>
          <Image
            alt="Comissão de 1% da carta de crédito paga em três parcelas"
            className={styles.sectionImage}
            height={500}
            src="/influencer/ganhos.svg"
            width={800}
          />
          <div className={styles.cards}>
            {partnerCards.map((card, index) => (
              <article className={styles.card} key={card.title}>
                <span className={styles.cardIndex}>{index + 1}</span>
                <h3>{card.title}</h3>
                <p>{card.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <span className={styles.eyebrow}>A regra do 1%</span>
          <h2 className={styles.sectionTitle}>
            Você ganha 1% da carta de crédito. Simples assim.
          </h2>
          <p className={styles.lead}>
            Nada de tabela confusa: a remuneração total é 1% do valor nominal
            inicial da carta de crédito contratada pelo seu seguidor. Quanto
            maior o sonho que você ajuda a realizar, maior o seu ganho.
          </p>

          <div className={styles.moneyBox}>
            <span className={styles.eyebrow}>Remuneração total</span>
            <p className={styles.moneyValue}>1% da carta</p>
            <p className={styles.moneyNote}>
              dividida em 3 parcelas iguais, conforme a Cláusula 9 do contrato
            </p>
          </div>

          <div className={styles.cards}>
            {commissionSteps.map((item, index) => (
              <article className={styles.card} key={item.copy}>
                <span className={styles.cardIndex}>{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>

          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Bem</th>
                <th scope="col">Carta de crédito</th>
                <th scope="col">Você recebe</th>
              </tr>
            </thead>
            <tbody>
              {commissionExamples.map((example) => (
                <tr key={example.asset}>
                  <td>{example.asset}</td>
                  <td>{example.credit}</td>
                  <td className={styles.tableHighlight}>{example.commission}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className={styles.footnote}>
            O percentual incide apenas sobre o valor nominal inicial da carta,
            sem incidir sobre taxa de administração, fundo de reserva, seguro ou
            outros encargos. Só geram remuneração indicações rastreáveis e
            operações válidas e regulares: leads já existentes na base,
            cadastros duplicados, fraudulentos ou cotas canceladas não geram
            comissão.
          </p>
        </section>
      </div>

      <SiteFooter className={styles.footer} />

      <div className={styles.ctaBar}>
        <div className={styles.ctaInner}>
          <button
            className={styles.cta}
            onClick={() => setStep('contract')}
            type="button"
          >
            Fechar parceria
          </button>
        </div>
      </div>

      {step === 'contract' ? (
        <div className={styles.fullscreen} role="dialog" aria-modal="true">
          <header className={styles.fullHeader}>
            <h2 className={styles.fullTitle}>Contrato de parceria</h2>
            <button
              aria-label="Fechar contrato"
              className={styles.closeButton}
              onClick={() => setStep('landing')}
              type="button"
            >
              ×
            </button>
          </header>

          <div className={styles.contractBody}>
            <div className={styles.contractInner}>
              <h3 className={styles.contractHeading}>
                Contrato de Prestação de Serviços de Divulgação e Indicação
              </h3>
              <p className={styles.contractMeta}>
                Multiplic Corretora de Seguros LTDA · Programa de Influenciadores 2026
              </p>

              {clauses.map((clause) => (
                <section className={styles.clause} key={clause.title}>
                  <h3>{clause.title}</h3>
                  <p>{clause.copy}</p>
                </section>
              ))}

              <Link
                className={styles.pdfLink}
                href={CONTRACT_PDF_URL}
                target="_blank"
              >
                Abrir contrato completo em PDF
              </Link>

              {hasPrefilledEmail ? (
                <p className={styles.contactConfirm}>
                  Vamos enviar a via assinada para{' '}
                  <strong className={styles.neon}>{prefilledEmail.trim()}</strong>.
                </p>
              ) : null}

            </div>
          </div>

          <div className={styles.signBar}>
            <button
              className={styles.signButton}
              disabled={isSubmitting}
              onClick={handleStartSigning}
              type="button"
            >
              {isSubmitting ? 'Assinando...' : 'Assinar contrato'}
            </button>
            <p className={styles.signHint}>
              Assinatura eletrônica com registro de data e hora.
            </p>
          </div>

          {isContactModalOpen ? (
            <div
              aria-labelledby="contato-titulo"
              aria-modal="true"
              className={styles.modalOverlay}
              onClick={() => setIsContactModalOpen(false)}
              role="dialog"
            >
              <form
                className={styles.modal}
                onClick={(event) => event.stopPropagation()}
                onSubmit={(event) => {
                  event.preventDefault()
                  void handleSignContract()
                }}
              >
                <button
                  aria-label="Fechar"
                  className={styles.modalClose}
                  onClick={() => setIsContactModalOpen(false)}
                  type="button"
                >
                  ×
                </button>

                <h3 className={styles.modalTitle} id="contato-titulo">
                  Quase lá! <span className={styles.neon}>Como falamos com você?</span>
                </h3>
                <p className={styles.modalCopy}>
                  Escolha onde quer receber a via assinada e os próximos passos da
                  parceria.
                </p>

                <div className={styles.contactSwitch} role="radiogroup">
                  <button
                    aria-checked={contactKind === 'whatsapp'}
                    className={
                      contactKind === 'whatsapp'
                        ? `${styles.contactOption} ${styles.contactOptionActive}`
                        : styles.contactOption
                    }
                    onClick={() => handleContactKind('whatsapp')}
                    role="radio"
                    type="button"
                  >
                    WhatsApp
                  </button>
                  <button
                    aria-checked={contactKind === 'email'}
                    className={
                      contactKind === 'email'
                        ? `${styles.contactOption} ${styles.contactOptionActive}`
                        : styles.contactOption
                    }
                    onClick={() => handleContactKind('email')}
                    role="radio"
                    type="button"
                  >
                    E-mail
                  </button>
                </div>

                {contactKind === 'whatsapp' ? (
                  <input
                    aria-label="Seu WhatsApp com DDD"
                    autoComplete="tel-national"
                    autoFocus
                    className={styles.contactInput}
                    enterKeyHint="done"
                    inputMode="tel"
                    maxLength={15}
                    name="tel"
                    onChange={(event) => handleContactChange(event.target.value)}
                    placeholder="(11) 99999-9999"
                    type="tel"
                    value={contact}
                  />
                ) : (
                  <input
                    aria-label="Seu e-mail"
                    autoComplete="email"
                    autoFocus
                    className={styles.contactInput}
                    enterKeyHint="done"
                    inputMode="email"
                    name="email"
                    onChange={(event) => handleContactChange(event.target.value)}
                    placeholder="voce@email.com"
                    type="email"
                    value={contact}
                  />
                )}

                {contactError ? (
                  <p className={styles.contactError}>{contactError}</p>
                ) : (
                  <p className={styles.contactHint}>
                    Use o preenchimento automático do seu celular para ir mais rápido.
                  </p>
                )}

                <button
                  className={styles.signButton}
                  disabled={isSubmitting || !isContactValid}
                  type="submit"
                >
                  {isSubmitting ? 'Assinando...' : 'Confirmar e assinar'}
                </button>
              </form>
            </div>
          ) : null}
        </div>
      ) : null}

      {step === 'success' ? (
        <div className={styles.fullscreen} role="dialog" aria-modal="true">
          <Confetti className={styles.confetti} />
          <div className={styles.successBody}>
            <div className={styles.successInner}>
              <Image
                alt="Celebração da parceria fechada com a Multiplic Consórcios"
                className={styles.successImage}
                height={600}
                priority
                src="/influencer/celebracao.svg"
                width={800}
              />
              <h2 className={styles.successTitle}>
                Parabéns! Você é <span className={styles.neon}>parceiro Multiplic</span>
              </h2>
              <p className={styles.successCopy}>
                Seu contrato foi assinado. Em breve alguém da nossa equipe entra
                em contato para passar todos os detalhes da parceria.
              </p>

              <ul className={styles.successPills}>
                <li className={styles.pill}>
                  <span className={styles.pillCheck} aria-hidden="true">✓</span>
                  Contrato assinado
                </li>
                <li className={styles.pill}>
                  <span className={styles.pillCheck} aria-hidden="true">✓</span>
                  Link e cupom exclusivos a caminho
                </li>
                <li className={styles.pill}>
                  <span className={styles.pillCheck} aria-hidden="true">✓</span>
                  1% da carta em 3 parcelas iguais
                </li>
              </ul>

              <p className={styles.successNext}>
                Enquanto isso, aprenda tudo sobre consórcio no nosso Academy e
                venda com muito mais confiança.
              </p>

              <Link className={styles.cta} href="/academy">
                Acessar o Multiplic Academy
              </Link>

              <Link className={styles.ctaGhost} href="/">
                Voltar ao site
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
