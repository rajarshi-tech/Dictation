import { InfoPage } from './InfoPage'

export function Terms() {
  return <InfoPage title="Terms & conditions" description="Simple terms for using this free, local browser dictation tool." path="/terms" eyebrow="TERMS / 03">
    <section><h2>Acceptable use</h2><p>Use Dictation lawfully and responsibly for personal, educational, accessibility, or professional practice. You are responsible for the content you enter and for ensuring that you have the right to use it.</p></section>
    <section><h2>Availability and accuracy</h2><p>The tool is provided as-is without a guarantee of uninterrupted availability, perfect pronunciation, or transcription accuracy. Speech output depends on the browser and operating system that you use.</p></section>
    <section><h2>Voice compatibility</h2><p>Available voices, languages, pronunciation, and playback behavior vary across browsers and operating systems. Some browsers require a user interaction before speech can begin, and some installed voices may load a moment after the page opens.</p></section>
  </InfoPage>
}
