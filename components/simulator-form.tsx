'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'

import type { SimulatorFormValues } from '@/schemas/simulator'

import { simulatorSchema } from '@/schemas/simulator'

const formatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0,
})

const planFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
})

const consortiumTypes = [
  {
    value: 'imovel',
    label: 'Imóvel',
    icon: 'home',
    min: 60000,
    max: 900000,
    term: 203,
  },
  {
    value: 'auto',
    label: 'Carro',
    icon: 'car',
    min: 30000,
    max: 240000,
    term: 84,
  },
  {
    value: 'moto',
    label: 'Moto',
    icon: 'moto',
    min: 12000,
    max: 80000,
    term: 72,
  },
  {
    value: 'pesado',
    label: 'Pesados',
    icon: 'truck',
    min: 80000,
    max: 600000,
    term: 100,
  },
]

const planMix = [
  {
    label: 'Parcela reduzida',
    badge: 'Mais leve',
    tone: 'gold',
    creditFactor: 1,
    fee: 0.21,
    termDelta: -8,
  },
  {
    label: 'Plano integral',
    badge: 'Mais previsível',
    tone: 'blue',
    creditFactor: 0.92,
    fee: 0.14,
    termDelta: 0,
  },
  {
    label: 'Crédito ampliado',
    badge: 'Mais crédito',
    tone: 'gold',
    creditFactor: 1.08,
    fee: 0.19,
    termDelta: 0,
  },
  {
    label: 'Contemplação estratégica',
    badge: 'Mais estratégia',
    tone: 'blue',
    creditFactor: 0.82,
    fee: 0.16,
    termDelta: -16,
  },
]

function calculateEstimatedInstallment(creditValue: number, termInMonths: number) {
  const administrationFactor = 1.18

  return (creditValue * administrationFactor) / termInMonths
}

function clampValue(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function AssetIcon({ name }: { name: string }) {
  if (name === 'home') {
    return (
      <svg aria-hidden="true" viewBox="0 0 72 52">
        <path d="M8 44h56M16 44V23l20-14 20 14v21M25 44V30h14v14M44 44V29h8v15M22 25h7M43 25h7" />
      </svg>
    )
  }

  if (name === 'car') {
    return (
      <svg aria-hidden="true" viewBox="0 0 72 52">
        <path d="M9 36h6m42 0h6M19 36h34l-5-13H24l-5 13ZM25 36a6 6 0 1 0 0 12 6 6 0 0 0 0-12ZM47 36a6 6 0 1 0 0 12 6 6 0 0 0 0-12ZM28 23l3-8h12l5 8" />
      </svg>
    )
  }

  if (name === 'moto') {
    return (
      <svg aria-hidden="true" viewBox="0 0 72 52">
        <path d="M18 39a7 7 0 1 0 0 .1M54 39a7 7 0 1 0 0 .1M25 38h13l8-14h8M35 25h-9l7 13M42 24l-5-7h9M51 20h9" />
      </svg>
    )
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 72 52">
      <path d="M8 37h36V17H8v20ZM44 37h15v-9l-7-8h-8v17ZM18 37a6 6 0 1 0 0 12 6 6 0 0 0 0-12ZM53 37a6 6 0 1 0 0 12 6 6 0 0 0 0-12ZM14 24h20M14 30h16" />
    </svg>
  )
}

export function SimulatorForm() {
  const [simulation, setSimulation] = useState<SimulatorFormValues | null>(null)
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(0)
  const {
    register,
    handleSubmit,
    control,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<SimulatorFormValues>({
    resolver: zodResolver(simulatorSchema),
    defaultValues: {
      consortiumType: 'auto',
      simulationMode: 'credit',
      creditValue: 120000,
      monthlyBudget: 1200,
      planPreference: 'parcela menor',
      name: '',
      whatsapp: '',
    },
  })

  const [consortiumType, simulationMode, creditValue, monthlyBudget] = useWatch({
    control,
    name: ['consortiumType', 'simulationMode', 'creditValue', 'monthlyBudget'],
  })
  const [step, setStep] = useState(0)
  const selectedType =
    consortiumTypes.find((type) => type.value === consortiumType) ?? consortiumTypes[1]

  const projectedCredit =
    simulationMode === 'credit'
      ? clampValue(Number(creditValue), selectedType.min, selectedType.max)
      : clampValue(
          (Number(monthlyBudget) * selectedType.term) / 1.18,
          selectedType.min,
          selectedType.max,
        )

  const plans = useMemo(
    () =>
      planMix.map((plan) => {
        const credit = Math.round(projectedCredit * plan.creditFactor)
        const term = selectedType.term + plan.termDelta
        return {
          ...plan,
          credit,
          installment: calculateEstimatedInstallment(credit, term),
          term,
        }
      }),
    [projectedCredit, selectedType.term],
  )

  function handleSimulationSubmit(values: SimulatorFormValues) {
    setSimulation(values)
  }

  const selectedPlan = plans[selectedPlanIndex] ?? plans[0]
  const progress = ((step + 1) / 4) * 100

  function goToValueStep(typeValue: string) {
    const type = consortiumTypes.find((item) => item.value === typeValue)
    if (!type) return

    setValue('consortiumType', type.value, { shouldValidate: true })
    setValue(
      'creditValue',
      clampValue(Number(creditValue), type.min, type.max),
      { shouldValidate: true },
    )
    setStep(1)
  }

  async function goToPlanStep() {
    const valid = await trigger(
      simulationMode === 'credit' ? 'creditValue' : 'monthlyBudget',
    )
    if (valid) setStep(2)
  }

  function choosePlan(index: number) {
    const plan = plans[index]
    setSelectedPlanIndex(index)
    setValue('planPreference', plan.label, { shouldValidate: true })
    setStep(3)
  }

  return (
    <form className="simulator-card" onSubmit={handleSubmit(handleSimulationSubmit)}>
      <div className="simulator-progress" aria-label="Progresso do simulador">
        <div>
          <span>Etapa {step + 1} de 4</span>
          <b>
            {step === 0
              ? 'Bem'
              : step === 1
                ? 'Valor'
                : step === 2
                  ? 'Plano'
                  : 'Contato'}
          </b>
        </div>
        <i>
          <span style={{ width: `${progress}%` }} />
        </i>
      </div>

      <div className="simulator-heading">
        <span>{String(step + 1).padStart(2, '0')}</span>
        <div>
          <h2>
            {step === 0
              ? 'Qual conquista você quer planejar?'
              : step === 1
                ? 'Como você prefere simular?'
                : step === 2
                  ? 'Escolha um cenário para avançar'
                  : 'Para onde enviamos sua proposta?'}
          </h2>
          <p>
            {step === 0
              ? 'Comece pelo tipo de consórcio para calibrar faixas, prazo e valores.'
              : step === 1
                ? 'Parta do crédito desejado ou da parcela que cabe no orçamento.'
                : step === 2
                  ? 'Compare parcela, crédito, prazo e taxa antes de falar com um consultor.'
                  : 'Seu consultor recebe o contexto da simulação para ajustar a proposta.'}
          </p>
        </div>
      </div>

      <input type="hidden" {...register('consortiumType')} />
      <input type="hidden" {...register('simulationMode')} />
      <input type="hidden" {...register('planPreference')} />

      {step === 0 ? (
        <fieldset className="asset-picker">
          <legend>Escolha seu bem:</legend>
          <div className="asset-options">
            {consortiumTypes.map((type) => (
              <button
                aria-pressed={consortiumType === type.value}
                className="asset-option"
                data-active={consortiumType === type.value}
                key={type.value}
                onClick={() => goToValueStep(type.value)}
                type="button"
              >
                <span>
                  <AssetIcon name={type.icon} />
                </span>
                <b>{type.label}</b>
              </button>
            ))}
          </div>
          {errors.consortiumType?.message ? (
            <p className="field-error">{errors.consortiumType.message}</p>
          ) : null}
        </fieldset>
      ) : null}

      {step === 1 ? (
        <section className="value-lab" aria-label="Valor para simulação">
          <div className="mode-switch" role="group" aria-label="Simular por">
            <button
              className="mode-button"
              data-active={simulationMode === 'credit'}
              onClick={() => setValue('simulationMode', 'credit')}
              type="button"
            >
              Crédito desejado
            </button>
            <button
              className="mode-button"
              data-active={simulationMode === 'installment'}
              onClick={() => setValue('simulationMode', 'installment')}
              type="button"
            >
              Parcela ideal
            </button>
          </div>

          <div className="value-readout">
            <small>{selectedType.label}</small>
            <strong>
              {simulationMode === 'credit'
                ? formatter.format(Number(creditValue))
                : planFormatter.format(Number(monthlyBudget))}
            </strong>
            <span>
              {simulationMode === 'credit'
                ? 'Ajuste o valor da carta de crédito.'
                : `Estimativa de crédito: ${formatter.format(projectedCredit)}.`}
            </span>
          </div>

          {simulationMode === 'credit' ? (
            <div className="range-field">
              <input
                aria-label="Valor da carta"
                max={selectedType.max}
                min={selectedType.min}
                step="1000"
                type="range"
                {...register('creditValue')}
              />
              <div>
                <span>{formatter.format(selectedType.min)}</span>
                <span>{formatter.format(selectedType.max)}</span>
              </div>
              {errors.creditValue?.message ? (
                <p className="field-error">{errors.creditValue.message}</p>
              ) : null}
            </div>
          ) : (
            <div className="range-field">
              <input
                aria-label="Parcela desejada"
                max="8000"
                min="300"
                step="50"
                type="range"
                {...register('monthlyBudget')}
              />
              <div>
                <span>R$ 300</span>
                <span>R$ 8.000</span>
              </div>
              {errors.monthlyBudget?.message ? (
                <p className="field-error">{errors.monthlyBudget.message}</p>
              ) : null}
            </div>
          )}

          <div className="wizard-actions">
            <button className="ghost-button" onClick={() => setStep(0)} type="button">
              Voltar
            </button>
            <button className="primary-button" onClick={() => void goToPlanStep()} type="button">
              Ver planos
            </button>
          </div>
        </section>
      ) : null}

      {step === 2 ? (
        <>
          <div className="proposal-summary">
            <div>
              <small>Prévia para {selectedType.label.toLowerCase()}</small>
              <strong>{formatter.format(projectedCredit)}</strong>
              <span>Escolha o cenário que faz mais sentido para você.</span>
            </div>
            <b>{simulationMode === 'credit' ? 'por crédito' : 'por parcela'}</b>
          </div>

          <div className="plan-preview" aria-live="polite">
            {plans.map((plan, index) => (
              <button
                aria-pressed={selectedPlanIndex === index}
                className="plan-card"
                data-active={selectedPlanIndex === index}
                data-tone={plan.tone}
                key={plan.label}
                onClick={() => choosePlan(index)}
                type="button"
              >
                <span>{plan.badge}</span>
                <h3>{plan.label}</h3>
                <small>Parcela mensal</small>
                <strong>{planFormatter.format(plan.installment)}</strong>
                <div className="plan-credit">
                  <small>Crédito</small>
                  <b>{planFormatter.format(plan.credit)}</b>
                </div>
                <footer>
                  <span>
                    Prazo: <b>{plan.term} meses</b>
                  </span>
                  <span>
                    Taxa mensal: <b>{plan.fee.toFixed(2).replace('.', ',')}%</b>
                  </span>
                </footer>
              </button>
            ))}
          </div>

          <div className="wizard-actions">
            <button className="ghost-button" onClick={() => setStep(1)} type="button">
              Voltar
            </button>
          </div>
        </>
      ) : null}

      {step === 3 ? (
        <div className="form-grid">
          <div className="proposal-summary contact-summary">
            <div>
              <small>Plano selecionado</small>
              <strong>{planFormatter.format(selectedPlan.installment)}/mês</strong>
              <span>
                {selectedPlan.label} · {formatter.format(selectedPlan.credit)} ·{' '}
                {selectedPlan.term} meses
              </span>
            </div>
            <b>{selectedType.label}</b>
          </div>

          <div className="field">
            <label htmlFor="name">Nome</label>
            <input id="name" placeholder="Seu nome" {...register('name')} />
            {errors.name?.message ? (
              <p className="field-error">{errors.name.message}</p>
            ) : null}
          </div>

          <div className="field">
            <label htmlFor="whatsapp">WhatsApp</label>
            <input
              id="whatsapp"
              inputMode="tel"
              placeholder="(11) 99999-9999"
              {...register('whatsapp')}
            />
            {errors.whatsapp?.message ? (
              <p className="field-error">{errors.whatsapp.message}</p>
            ) : null}
          </div>

          <div className="wizard-actions">
            <button className="ghost-button" onClick={() => setStep(2)} type="button">
              Voltar
            </button>
            <button className="primary-button" type="submit">
              Receber minha proposta
            </button>
          </div>
        </div>
      ) : null}

      {simulation ? (
        <div className="simulation-result">
          <strong>
            Prévia pronta para {simulation.name}: carta de{' '}
            {formatter.format(projectedCredit)}
          </strong>
          <span>
            Comparamos planos por prazo, taxa e parcela. Um consultor pode
            ajustar a proposta com as tabelas Porto Seguro vigentes.
          </span>
        </div>
      ) : null}
    </form>
  )
}
