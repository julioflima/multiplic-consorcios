import { GuidePageContent, getGuideMetadata } from '@/components/guide-page'

const slug = 'investir-em-imoveis'

export const metadata = getGuideMetadata(slug)

export default function Page() {
  return <GuidePageContent slug={slug} />
}
