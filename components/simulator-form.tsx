'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import type { SimulatorFormValues } from '@/schemas/simulator'

import { simulatorSchema } from '@/schemas/simulator'

const formatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0,
})

function calculateEstimatedInstallment(creditValue: number) {
  const administrationFactor = 1.18
  const termInMonths = 180

  return (creditValue * administrationFactor) / termInMonths
}

export function SimulatorForm() {
  const [simulation, setSimulation] = useState<SimulatorFormValues | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SimulatorFormValues>({
    resolver: zodResolver(simulatorSchema),
    defaultValues: {
      consortiumType: 'auto',
      creditValue: 120000,
      planPreference: 'parcela menor',
      name: '',
      whatsapp: '',
    },
  })

  function handleSimulationSubmit(values: SimulatorFormValues) {
    setSimulation(values)
  }

  const estimatedInstallment = simulation
    ? calculateEstimatedInstallment(simulation.creditValue)
    : null

  return (
    <form className="simulator-card" onSubmit={handleSubmit(handleSimulationSubmit)}>
      <h2>Simule agora</h2>
      <p>
        Uma prévia consultiva baseada nas tabelas vigentes da Porto Seguro.
      </p>

      <div className="form-grid">
        <div className="field">
          <label htmlFor="consortiumType">Tipo de consórcio</label>
          <select id="consortiumType" {...register('consortiumType')}>
            <option value="auto">Automóvel</option>
            <option value="imovel">Imóvel</option>
            <option value="servico">Serviços</option>
            <option value="pesado">Veículo pesado</option>
          </select>
          {errors.consortiumType?.message ? (
            <p className="field-error">{errors.consortiumType.message}</p>
          ) : null}
        </div>

        <div className="field">
          <label htmlFor="creditValue">Valor da carta</label>
          <input
            id="creditValue"
            inputMode="numeric"
            min="30000"
            step="1000"
            type="number"
            {...register('creditValue')}
          />
          {errors.creditValue?.message ? (
            <p className="field-error">{errors.creditValue.message}</p>
          ) : null}
        </div>

        <div className="field">
          <label htmlFor="planPreference">Objetivo</label>
          <select id="planPreference" {...register('planPreference')}>
            <option value="parcela menor">Menor parcela</option>
            <option value="credito maior">Maior crédito</option>
            <option value="contemplacao">Estratégia de contemplação</option>
            <option value="prazo curto">Prazo mais curto</option>
          </select>
          {errors.planPreference?.message ? (
            <p className="field-error">{errors.planPreference.message}</p>
          ) : null}
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

        <button className="primary-button" type="submit">
          Ver minha simulação
        </button>
      </div>

      {simulation && estimatedInstallment ? (
        <div className="simulation-result">
          <strong>
            Prévia: carta de {formatter.format(simulation.creditValue)}
          </strong>
          <span>
            Parcela estimada a partir de {formatter.format(estimatedInstallment)}
            /mês. Valores sujeitos à tabela Porto Seguro vigente, análise e
            regras comerciais.
          </span>
        </div>
      ) : null}
    </form>
  )
}
