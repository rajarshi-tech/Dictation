import { NavLink } from 'react-router-dom'

const links = [
  ['Home', '/'],
  ['About', '/about'],
  ['Privacy', '/privacy'],
  ['Terms', '/terms'],
  ['Contact', '/contact'],
] as const

export function Footer() {
  const currentYear = new Date().getFullYear()

  return <footer className="site-footer">
    <nav className="site-footer-navigation" aria-label="Footer navigation">
      <span className="site-footer-label">// NAV</span>
      <div className="site-footer-links">
        {links.map(([label, path]) => <NavLink key={path} to={path}>{label}</NavLink>)}
      </div>
    </nav>
    <div className="site-footer-column site-footer-meta">
      <span className="site-footer-label">// SYSTEM</span>
      <span>POWERED BY WEB SPEECH API</span>
      <span>PRIVACY FIRST / NO DATA SAVED</span>
      <span>V1.0.0</span>
    </div>
    <small className="site-footer-copyright">© {currentYear} DICTATION. ALL RIGHTS RESERVED.</small>
  </footer>
}
