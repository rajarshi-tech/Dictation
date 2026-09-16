import { NavLink, Outlet } from 'react-router-dom'
import { Footer } from './Footer'

export function Layout() {
  return <div className="site-shell">
    <header className="site-header">
      <NavLink className="site-brand" to="/"><span className="brand-mark">D</span><strong>DICTATION</strong></NavLink>
      <nav className="site-nav" aria-label="Main navigation">
        <NavLink to="/about">ABOUT</NavLink>
        <NavLink to="/contact">CONTACT</NavLink>
      </nav>
    </header>
    <Outlet />
    <Footer />
  </div>
}
