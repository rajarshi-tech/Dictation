import { useEffect } from 'react'

type SEOProps = {
  title: string
  description: string
  path: string
}

const siteUrl = 'https://yourdomain.com'

export function SEO({ title, description, path }: SEOProps) {
  useEffect(() => {
    document.title = title
    const canonicalUrl = `${siteUrl}${path}`
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonicalUrl)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description)
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonicalUrl)
  }, [description, path, title])

  return null
}
