import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/politica-de-privacidade', '/termos-de-uso'],
    },
    sitemap: 'https://portoframe.com.br/sitemap.xml',
  }
}
