import { GuidePageContent, getGuideMetadata } from '@/components/guide-page'

const slug = 'construcao-e-reforma'

export const metadata = getGuideMetadata(slug)

export default function Page() {
  return <GuidePageContent slug={slug} />
}
