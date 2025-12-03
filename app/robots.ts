import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://aliiqbal208.vercel.app'
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
