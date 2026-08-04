import { GuidePageContent, getGuideMetadata } from '@/components/guide-page'

const slug = 'be-a-ba-do-consorcio'

export const metadata = getGuideMetadata(slug)

export default function Page() {
  return <GuidePageContent slug={slug} />
}
