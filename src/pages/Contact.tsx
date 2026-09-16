import { useState, type FormEvent } from 'react'
import { InfoPage } from './InfoPage'

export function Contact() {
  const [sent, setSent] = useState(false)
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSent(true) }

  return <InfoPage title="Contact" description="Share feedback, report a browser issue, or suggest a useful improvement for Dictation." path="/contact" eyebrow="CONTACT / 04">
    <form className="contact-form" onSubmit={handleSubmit}>
      <label htmlFor="contact-name">NAME<input id="contact-name" name="name" required /></label>
      <label htmlFor="contact-email">EMAIL<input id="contact-email" name="email" type="email" required /></label>
      <label htmlFor="contact-message">MESSAGE<textarea id="contact-message" name="message" rows={7} required /></label>
      <button className="button button-main" type="submit">SEND FEEDBACK</button>
      {sent && <p className="form-status" role="status">Thanks. Your feedback is ready to be reviewed. This demo form does not transmit data from your device.</p>}
    </form>
  </InfoPage>
}
