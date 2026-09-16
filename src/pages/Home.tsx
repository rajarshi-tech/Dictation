import App from '../App'
import { JsonLd } from '../components/JsonLd'
import { SEO } from '../components/SEO'

export function Home() {
  return <>
    <SEO title="Dictation | Local text-to-speech practice" description="A focused, private dictation workspace using your browser's native speech voices." path="/" />
    <JsonLd data={{ '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Dictation', applicationCategory: 'EducationalApplication', operatingSystem: 'Any', url: 'https://yourdomain.com/', description: 'A local browser-based dictation and text-to-speech practice tool.' }} />
    <App />
  </>
}
