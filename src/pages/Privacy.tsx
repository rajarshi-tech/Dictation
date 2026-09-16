import { InfoPage } from './InfoPage'

export function Privacy() {
  return <InfoPage title="Privacy policy" description="Your text stays on your device. Dictation does not collect, store, or transmit your passages." path="/privacy" eyebrow="PRIVACY / 02">
    <section><h2>What we process</h2><p>Dictation processes the text you enter in your browser so it can split passages into chunks and send speech instructions to your device's native text-to-speech engine. This processing happens on-device.</p></section>
    <section><h2>What we do not collect</h2><p>There are no user accounts, external speech servers, analytics profiles, or application logs for your passages. We do not sell, share, or retain the text you enter.</p></section>
    <section><h2>Saved settings</h2><p>Your playback preferences and selected voice may be stored in your browser's local storage so the tool opens with the same setup next time. You can remove these values by clearing this site's local storage in your browser settings.</p></section>
  </InfoPage>
}
