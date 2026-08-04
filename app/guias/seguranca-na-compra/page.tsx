import { GuidePageContent, getGuideMetadata } from '@/components/guide-page'

const slug = 'seguranca-na-compra'

export const metadata = getGuideMetadata(slug)

export default function Page() {
  return <GuidePageContent slug={slug} />
}
