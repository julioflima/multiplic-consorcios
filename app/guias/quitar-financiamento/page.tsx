import { GuidePageContent, getGuideMetadata } from '@/components/guide-page'

const slug = 'quitar-financiamento'

export const metadata = getGuideMetadata(slug)

export default function Page() {
  return <GuidePageContent slug={slug} />
}
