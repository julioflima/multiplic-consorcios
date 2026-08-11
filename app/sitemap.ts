import type { MetadataRoute } from 'next'

import { SITE_URL } from '@/lib/seo'

const guideSlugs = [
  'be-a-ba-do-consorcio',
  'consorcio-de-caminhoes',
  'consorcio-de-carro',
  'como-comprar-com-consorcio',
  'construcao-e-reforma',
  'consorcio-de-imoveis',
  'consorcio-de-moto',
  'quem-somos',
  'seguranca-na-compra',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/academy`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  const guideRoutes: MetadataRoute.Sitemap = guideSlugs.map((slug) => ({
    url: `${SITE_URL}/guias/${slug}`,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...guideRoutes]
}
