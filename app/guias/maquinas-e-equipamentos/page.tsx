import { GuidePageContent, getGuideMetadata } from '@/components/guide-page'

const slug = 'maquinas-e-equipamentos'

export const metadata = getGuideMetadata(slug)

export default function Page() {
  return <GuidePageContent slug={slug} />
}
