export interface GuideCardItem {
  title: string
  body: string
}

export interface GuideKeyValue {
  label: string
  value: string
}

export interface GuideTable {
  headers: [string, string]
  rows: GuideKeyValue[]
  note?: string
}

export interface GuidePageSection {
  title: string
  paragraphs?: string[]
  items?: string[]
  cards?: GuideCardItem[]
  table?: GuideTable
}

export interface GuidePageDetail {
  breadcrumbLabel: string
  heroTagline: string
  heroIntro?: string[]
  anchors?: { id: string; label: string }[]
  compareBanner?: { title: string; subtitle: string; ctaLabel: string }
  howItWorks?: GuidePageSection
  comparison?: GuidePageSection
  creditCard?: GuidePageSection & {
    cardLabel?: string
    cardValue?: string
    facts?: GuideKeyValue[]
  }
  raffle?: GuidePageSection & { ctaLabel?: string; note?: string }
  bidding?: {
    title: string
    intro?: string
    livre: GuideCardItem
    fixo: GuideCardItem
    note?: string
  }
  advantages?: GuidePageSection
  rate?: {
    value: string
    label: string
    title: string
    body: string
    ctaLabel: string
  }
  faqs?: { question: string; answer: string }[]
  steps?: GuidePageSection
  checklist?: GuidePageSection
  safety?: GuidePageSection & { ctaLabel?: string; href?: string }
  contact?: GuidePageSection & { ctaLabel?: string; href?: string }
  crossSell?: boolean
}

export interface GuidePage {
  slug: string
  title: string
  eyebrow: string
  description: string
  sections: GuidePageSection[]
  detail?: GuidePageDetail
}

export interface GuideCategory {
  slug: string
  label: string
  copy: string
  icon: string
}
