/**
 * Base de conteúdo da Multiplic Academy.
 *
 * Para publicar uma aula nova basta colar a URL do YouTube Shorts em `url`.
 * São aceitos os formatos:
 *   https://www.youtube.com/shorts/ABC123
 *   https://youtu.be/ABC123
 *   https://www.youtube.com/watch?v=ABC123
 */

export interface AcademyLesson {
  title: string
  summary: string
  url: string
}

export interface AcademyTopic {
  slug: string
  label: string
  tagline: string
  description: string
  accent: string
  lessons: AcademyLesson[]
}

export type AcademySlideKind = 'cover' | 'lesson'

export interface AcademySlide {
  key: string
  kind: AcademySlideKind
  topicSlug: string
  topicLabel: string
  topicTagline: string
  topicDescription: string
  topicAccent: string
  topicIndex: number
  lessonsInTopic: number
  lesson: AcademyLesson | null
  videoId: string | null
  /** 0 = capa do tópico, 1..n = aulas */
  stepInTopic: number
  isLastOfTopic: boolean
  nextTopicLabel: string
}

/** Short de exemplo — troque pelas URLs reais de cada aula. */
const SAMPLE_SHORT = 'https://youtube.com/shorts/jwD9BE8swk8'

export const ACADEMY_TOPICS: AcademyTopic[] = [
  {
    slug: 'consorcio',
    label: 'Consórcio',
    tagline: 'O alicerce de tudo',
    description:
      'A mecânica do autofinanciamento coletivo: carta de crédito, fundo comum, taxa de administração e por que consórcio não é financiamento.',
    accent: '#3f79f2',
    lessons: [
      {
        title: 'O que é consórcio de verdade',
        summary: 'A lógica do autofinanciamento coletivo em 60 segundos.',
        url: SAMPLE_SHORT,
      },
      {
        title: 'Carta de crédito x financiamento',
        summary: 'Onde o seu dinheiro vai em cada modelo.',
        url: SAMPLE_SHORT,
      },
      {
        title: 'Taxa de administração sem mistério',
        summary: 'Como ler o custo real do seu plano.',
        url: SAMPLE_SHORT,
      },
      {
        title: 'Fundo de reserva e seguro',
        summary: 'O que protege o grupo e o seu bolso.',
        url: SAMPLE_SHORT,
      },
    ],
  },
  {
    slug: 'alavancagem',
    label: 'Alavancagem',
    tagline: 'Multiplicar patrimônio',
    description:
      'Estratégias de lance, uso do crédito para gerar renda e como transformar parcela em ativo que se paga sozinho.',
    accent: '#c99435',
    lessons: [
      {
        title: 'Alavancagem patrimonial na prática',
        summary: 'Transformando parcela em ativo que se paga.',
        url: SAMPLE_SHORT,
      },
      {
        title: 'Lance embutido, livre e fixo',
        summary: 'Qual usar em cada objetivo.',
        url: SAMPLE_SHORT,
      },
      {
        title: 'Escada de cartas de crédito',
        summary: 'Como escalar contemplações ao longo do tempo.',
        url: SAMPLE_SHORT,
      },
      {
        title: 'Erros que travam a alavancagem',
        summary: 'O que evitar antes da primeira contemplação.',
        url: SAMPLE_SHORT,
      },
    ],
  },
  {
    slug: 'grupo-fixo',
    label: 'Grupo Fixo',
    tagline: 'Previsibilidade total',
    description:
      'Como funciona um grupo fixo: prazo definido, número de cotas, assembleias e mais controle sobre a contemplação.',
    accent: '#4bb98b',
    lessons: [
      {
        title: 'O que é um grupo fixo',
        summary: 'Estrutura, prazo e número de cotas.',
        url: SAMPLE_SHORT,
      },
      {
        title: 'Assembleias e contemplação',
        summary: 'Sorteio e lance no dia a dia do grupo.',
        url: SAMPLE_SHORT,
      },
      {
        title: 'Grupo fixo x grupo aberto',
        summary: 'A vantagem de saber a data do fim.',
        url: SAMPLE_SHORT,
      },
    ],
  },
  {
    slug: 'imovel',
    label: 'Imóvel',
    tagline: 'Do primeiro lar ao portfólio',
    description:
      'Compra, construção, reforma e permuta com carta de crédito imobiliária — e como o aluguel pode sustentar a cota.',
    accent: '#8b6ef0',
    lessons: [
      {
        title: 'Comprar imóvel com consórcio',
        summary: 'Passo a passo da carta até a escritura.',
        url: SAMPLE_SHORT,
      },
      {
        title: 'Construir e reformar',
        summary: 'Usando o crédito em obra no seu terreno.',
        url: SAMPLE_SHORT,
      },
      {
        title: 'Renda de aluguel pagando a cota',
        summary: 'A conta que faz o imóvel se sustentar.',
        url: SAMPLE_SHORT,
      },
      {
        title: 'Documentação e garantias',
        summary: 'O que a administradora analisa na liberação.',
        url: SAMPLE_SHORT,
      },
    ],
  },
  {
    slug: 'veiculo',
    label: 'Veículo',
    tagline: 'Carro, moto e pesados',
    description:
      'Como escolher o crédito para veículo, trocar com inteligência e usar frota como ferramenta de trabalho.',
    accent: '#e2574c',
    lessons: [
      {
        title: 'Carro novo ou seminovo',
        summary: 'Onde a carta de crédito rende mais.',
        url: SAMPLE_SHORT,
      },
      {
        title: 'Moto como primeira conquista',
        summary: 'Planos curtos e parcelas baixas.',
        url: SAMPLE_SHORT,
      },
      {
        title: 'Pesados e frota',
        summary: 'Crédito que vira máquina de trabalho.',
        url: SAMPLE_SHORT,
      },
    ],
  },
]

export function extractYoutubeId(url: string): string {
  const patterns = [
    /youtube\.com\/shorts\/([\w-]{6,})/,
    /youtu\.be\/([\w-]{6,})/,
    /[?&]v=([\w-]{6,})/,
    /youtube\.com\/embed\/([\w-]{6,})/,
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }

  return url.trim()
}

export function buildAcademySlides(topics: AcademyTopic[]): AcademySlide[] {
  return topics.flatMap((topic, topicIndex) => {
    const nextTopicLabel = topics[(topicIndex + 1) % topics.length].label

    const base = {
      topicSlug: topic.slug,
      topicLabel: topic.label,
      topicTagline: topic.tagline,
      topicDescription: topic.description,
      topicAccent: topic.accent,
      topicIndex,
      lessonsInTopic: topic.lessons.length,
      nextTopicLabel,
    }

    const cover: AcademySlide = {
      ...base,
      key: `${topic.slug}-cover`,
      kind: 'cover',
      lesson: null,
      videoId: null,
      stepInTopic: 0,
      isLastOfTopic: false,
    }

    const lessons: AcademySlide[] = topic.lessons.map((lesson, lessonIndex) => ({
      ...base,
      key: `${topic.slug}-${lessonIndex}`,
      kind: 'lesson',
      lesson,
      videoId: extractYoutubeId(lesson.url),
      stepInTopic: lessonIndex + 1,
      isLastOfTopic: lessonIndex === topic.lessons.length - 1,
    }))

    return [cover, ...lessons]
  })
}

export const ACADEMY_SLIDES = buildAcademySlides(ACADEMY_TOPICS)
