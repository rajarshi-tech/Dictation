import { useState, type FormEvent } from 'react'
import { InfoPage } from './InfoPage'

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('sending')

    try {
      const response = await fetch('https://formsubmit.co/ajax/rajarshiroy2005456@gmail.com', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(event.currentTarget),
      })

      if (!response.ok) throw new Error('Message delivery failed')
      event.currentTarget.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return <InfoPage title="Contact" description="Share feedback, report a browser issue, or suggest a useful improvement for Dictation." path="/contact" eyebrow="CONTACT / 04">
    <form className="contact-form" onSubmit={handleSubmit}>
      <label htmlFor="contact-name">NAME<input id="contact-name" name="name" required /></label>
      <label htmlFor="contact-email">EMAIL<input id="contact-email" name="email" type="email" required /></label>
      <label htmlFor="contact-message">MESSAGE<textarea id="contact-message" name="message" rows={7} required /></label>
      <input type="hidden" name="_subject" value="Dictation feedback" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <button className="button button-main" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'SENDING...' : 'SEND FEEDBACK'}</button>
      {status === 'sent' && <p className="form-status" role="status">Thanks. Your feedback was sent successfully.</p>}
      {status === 'error' && <p className="form-status form-status-error" role="alert">Your message could not be sent. Please try again.</p>}
    </form>
  </InfoPage>
}
