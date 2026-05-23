import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X, Zap, ExternalLink } from 'lucide-react'

const navItems = [
  { path: '/', label: 'Dashboard' },
  { path: '/chat', label: 'AI Assistant' },
  { path: '/pick-list', label: 'Pick List' },
  { path: '/strategy', label: 'Strategy' },
]

export function Nav() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 glass border-b border-frc-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2 group">
            <Zap className="w-6 h-6 text-frc-yellow group-hover:scale-110 transition-transform" />
            <span className="text-lg font-bold text-frc-text group-hover:text-frc-yellow transition-colors">
              Maneuver 2026
            </span>
            <span className="hidden sm:inline text-[10px] px-2 py-0.5 bg-frc-yellow/10 text-frc-yellow rounded-full border border-frc-yellow/30">
              REBUILT
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === item.path
                    ? 'text-frc-yellow bg-frc-yellow/10 border border-frc-yellow/30'
                    : 'text-frc-muted hover:text-frc-text hover:bg-white/5'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://www.frc-maneuver.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-frc-muted hover:text-frc-yellow hover:bg-frc-yellow/10 transition-all duration-200"
            >
              Maneuver App
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-frc-border/50 bg-frc-charcoal/95 backdrop-blur-xl">
          <div className="px-4 py-2 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  location.pathname === item.path
                    ? 'text-frc-yellow bg-frc-yellow/10'
                    : 'text-frc-muted hover:text-frc-text hover:bg-white/5'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://www.frc-maneuver.com/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-1 px-4 py-3 rounded-lg text-sm font-medium text-frc-muted hover:text-frc-yellow hover:bg-frc-yellow/10 transition-all"
            >
              Maneuver App
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
