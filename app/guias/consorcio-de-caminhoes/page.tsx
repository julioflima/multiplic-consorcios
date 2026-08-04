import { GuidePageContent, getGuideMetadata } from '@/components/guide-page'

const slug = 'consorcio-de-caminhoes'

export const metadata = getGuideMetadata(slug)

export default function Page() {
  return <GuidePageContent slug={slug} />
}
