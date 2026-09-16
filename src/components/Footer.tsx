import { NavLink } from 'react-router-dom'

const links = [
  ['Home', '/'],
  ['About', '/about'],
  ['Privacy', '/privacy'],
  ['Terms', '/terms'],
  ['Contact', '/contact'],
] as const

export function Footer() {
  return <footer className="site-footer">
    <div className="site-footer-column site-footer-reassurance">
      <span className="site-footer-label">01 / PRIVACY</span>
      <span>NO CLOUD / NO ACCOUNT</span>
      <span>LOCAL TTS ONLY</span>
    </div>
    <nav className="site-footer-navigation" aria-label="Footer navigation">
      <span className="site-footer-label">02 / NAVIGATE</span>
      <div className="site-footer-links">
        {links.map(([label, path]) => <NavLink key={path} to={path}>{label}</NavLink>)}
      </div>
    </nav>
    <div className="site-footer-column site-footer-meta">
      <span className="site-footer-label">03 / SYSTEM</span>
      <span>POWERED BY WEB SPEECH API</span>
      <span>V1.0.0 / LOCAL MODE</span>
    </div>
  </footer>
}
