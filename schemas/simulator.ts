import { z } from 'zod'

export const simulatorSchema = z.object({
  consortiumType: z.string().min(1, 'Escolha o tipo de consórcio.'),
  simulationMode: z.enum(['credit', 'installment']),
  creditValue: z.coerce
    .number({ invalid_type_error: 'Informe o valor da carta.' })
    .min(30000, 'O valor mínimo sugerido é R$ 30.000.'),
  monthlyBudget: z.coerce
    .number({ invalid_type_error: 'Informe a parcela desejada.' })
    .min(300, 'A parcela mínima sugerida é R$ 300.'),
  planPreference: z.string().min(1, 'Informe o prazo ou parcela desejada.'),
  name: z.string().min(2, 'Informe seu nome.'),
  whatsapp: z
    .string()
    .min(10, 'Informe um WhatsApp válido.')
    .regex(/^[0-9()\-\s+]+$/, 'Use apenas números, espaços e símbolos do telefone.'),
})

export type SimulatorFormValues = z.infer<typeof simulatorSchema>
