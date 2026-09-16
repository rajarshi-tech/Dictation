import type { ReactNode } from 'react'
import { SEO } from '../components/SEO'

type InfoPageProps = {
  title: string
  description: string
  path: string
  eyebrow: string
  children: ReactNode
}

export function InfoPage({ title, description, path, eyebrow, children }: InfoPageProps) {
  return <main className="info-page">
    <SEO title={title} description={description} path={path} />
    <div className="info-intro"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p></div>
    <div className="info-content">{children}</div>
  </main>
}
