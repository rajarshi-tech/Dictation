import App from '../App'
import { JsonLd } from '../components/JsonLd'
import { SEO } from '../components/SEO'

export function Home() {
  return <>
    <SEO title="The Dictation — Text-to-Speech Player for Dictation & Shorthand Practice" description="Paste your text, customize playback speed, and practice dictation locally in your browser. 100% private audio player for typing, shorthand, and language practice." path="/" />
    <JsonLd data={{ '@context': 'https://schema.org', '@type': 'WebApplication', name: 'The Dictation', applicationCategory: 'EducationalApplication', operatingSystem: 'Any', url: 'https://thedictation.com/', description: 'Paste your text, customize playback speed, and practice dictation locally in your browser.' }} />
    <App />
  </>
}
