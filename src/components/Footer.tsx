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
    <span>NO CLOUD / NO ACCOUNT / YOUR TEXT STAYS HERE</span>
    <nav aria-label="Footer navigation">
      {links.map(([label, path]) => <NavLink key={path} to={path}>{label}</NavLink>)}
    </nav>
    <span>WEB SPEECH API</span>
  </footer>
}
