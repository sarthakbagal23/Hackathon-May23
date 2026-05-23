import { Link } from 'react-router-dom'
import { Zap, MessageSquare, ListOrdered, BarChart3, ChevronRight, Trophy, Target, Code2, ClipboardCheck, Search } from 'lucide-react'

export default function Home() {
  const cards = [
    { to: '/chat', icon: <MessageSquare />, label: 'AI Assistant', desc: 'Five modes of AI help for rookies', accent: 'text-frc-yellow' },
    { to: '/pick-list', icon: <ListOrdered />, label: 'Pick List', desc: 'Build alliance pick lists with scouting data', accent: 'text-frc-green' },
    { to: '/strategy', icon: <BarChart3 />, label: 'Strategy Table', desc: 'Full scouting breakdown & presets', accent: 'text-frc-red' },
  ]

  const modes = [
    { icon: <Target />, label: 'Rules Q&A', desc: 'REBUILT game rules, answered simply' },
    { icon: <Zap />, label: 'Strategy Builder', desc: 'Custom match plans for your robot' },
    { icon: <Code2 />, label: 'Code Snippets', desc: 'WPILib Java & Python examples' },
    { icon: <ClipboardCheck />, label: 'Rookie Checklist', desc: 'Everything a first-year team needs' },
    { icon: <Search />, label: 'Scouting Analysis', desc: 'Rank & analyze other teams' },
  ]

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-frc-navy via-frc-slate to-frc-charcoal" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,214,0,0.08),transparent_50%)]" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-frc-yellow/10 border border-frc-yellow/30 text-xs font-medium text-frc-yellow tracking-wide uppercase">
            <Zap className="w-3.5 h-3.5" /> FRC REBUILT 2026
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
            Maneuver <span className="text-frc-yellow">2026</span>
          </h1>
          <p className="text-lg sm:text-xl text-frc-muted max-w-2xl mx-auto mb-8 leading-relaxed">
            The strategy suite every rookie team deserves. Build smarter, scout harder, and climb higher.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Link
              to="/chat"
              className="inline-flex items-center gap-2 px-6 py-3 bg-frc-yellow text-frc-navy font-semibold rounded-xl hover:brightness-110 transition-all glow-yellow"
            >
              Launch AI Assistant <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              to="/pick-list"
              className="inline-flex items-center gap-2 px-6 py-3 glass text-frc-text font-medium rounded-xl glass-hover transition-all"
            >
              Build Pick List <ListOrdered className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {cards.map((c) => (
              <Link key={c.to} to={c.to} className="group glass rounded-2xl p-5 text-left transition-all duration-300 glass-hover hover:-translate-y-0.5">
                <div className={`mb-3 ${c.accent}`}>{c.icon}</div>
                <h3 className="text-white font-semibold mb-1">{c.label}</h3>
                <p className="text-sm text-frc-muted">{c.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Five AI Modes</h2>
          <p className="text-frc-muted">Every tool a rookie team needs, in one chat.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {modes.map((m) => (
            <div key={m.label} className="glass rounded-2xl p-5 text-center transition-all duration-300 glass-hover hover:-translate-y-0.5">
              <div className="flex justify-center mb-3 text-frc-yellow">{m.icon}</div>
              <h3 className="text-white font-semibold text-sm mb-1">{m.label}</h3>
              <p className="text-xs text-frc-muted">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
        <div className="glass rounded-3xl p-6 sm:p-10 border border-frc-yellow/20">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-2xl bg-frc-yellow/10 border border-frc-yellow/30 flex items-center justify-center">
                <Trophy className="w-8 h-8 text-frc-yellow" />
              </div>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-xl font-bold text-white mb-1">Model Team Inspiration</h3>
              <p className="text-sm text-frc-muted">
                Team <span className="text-frc-yellow font-semibold">BEAN 1833</span> from Cumming, Georgia went <span className="text-frc-yellow font-semibold">60-8-0</span> in 2026 and ranked #1 in the Peachtree District. Strategy, scouting, and smart design win championships.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
