import { GuidePageContent, getGuideMetadata } from '@/components/guide-page'

const slug = 'consorcio-agro'

export const metadata = getGuideMetadata(slug)

export default function Page() {
  return <GuidePageContent slug={slug} />
}
