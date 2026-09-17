import { InfoPage } from './InfoPage'

export function About() {
  return <InfoPage title="A quieter way to practice" description="Dictation is a focused text-to-speech workspace designed for writing along without staring at the screen. Paste any text to guide your reading practice, language learning, transcription, shorthand, and careful listening. It is completely private and runs at your own pace." path="/about" eyebrow="ABOUT / 01">
    <section><h2>Built for deliberate listening</h2><p>Paste a passage, divide it into sentence-sized chunks, and let your browser read each chunk at a pace you control. Repetitions and pauses make it easier to practice spelling, pronunciation, transcription, and comprehension without losing your place.</p></section>
    <section><h2>Local by design</h2><p>Dictation uses the native Web Speech API already available in your browser. Speech is generated on your device through the operating system's installed voices. Your passage is not uploaded to an application server, and the tool does not need an account or a cloud processing service.</p></section>
    <section><h2>Small tool, useful habits</h2><p>This project started from a simple need: make repeated listening feel calm, visible, and adjustable. The interface keeps the passage, controls, and queue together so the work stays in front of you.</p></section>
  </InfoPage>
}
