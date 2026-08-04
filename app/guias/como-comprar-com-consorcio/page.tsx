import { GuidePageContent, getGuideMetadata } from '@/components/guide-page'

const slug = 'como-comprar-com-consorcio'

export const metadata = getGuideMetadata(slug)

export default function Page() {
  return <GuidePageContent slug={slug} />
}
