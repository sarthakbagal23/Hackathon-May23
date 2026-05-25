'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Target,
  Code,
  Search,
  Send,
  ChevronDown,
  ChevronRight,
  Copy,
  Check,
  Loader2,
  Bot,
  User,
  Zap,
  Trophy,
  BookOpen,
  ClipboardCheck,
  LayoutDashboard,
  Bell,
  ArrowRight,
  Sparkles,
  Flame,
  MessageSquare,
  Lightbulb,
  ListChecks,
  BarChart3,
  PenLine,
  Trash2,
  Database,
  Plus,
} from 'lucide-react'

// ─── types ──────────────────────────────────────────────────────────────────

export type Tab = 'dashboard' | 'rules' | 'strategy' | 'code' | 'checklist' | 'scouting'

// ─── animation variants ──────────────────────────────────────────────────────

const fadeIn = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
}

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const slideIn = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
}

// ─── Nav ───────────────────────────────────────────────────────────────────

const TABS: { id: Tab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'rules',     label: 'Game Rules', icon: BookOpen },
  { id: 'strategy',  label: 'Strategy',   icon: Target },
  { id: 'code',      label: 'Code',       icon: Code },
  { id: 'checklist', label: 'Checklist',  icon: ClipboardCheck },
  { id: 'scouting',  label: 'Scouting',   icon: Search },
]

interface NavProps { activeTab: Tab; onTabChange: (t: Tab) => void }

export function RobotifyNav({ activeTab, onTabChange }: NavProps) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/5">
      <div className="px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
        {/* Logo */}
        <div className="flex items-center gap-2.5 min-w-fit shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-blue-600 flex items-center justify-center shadow-lg shadow-red-500/20">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-white tracking-tight leading-none">Robotify</p>
            <p className="text-[10px] text-white/30 mt-0.5 font-mono tracking-wider">2026 REBUILT</p>
          </div>
        </div>

        {/* Tabs */}
        <nav className="flex items-center gap-0.5 bg-white/[0.03] rounded-xl p-0.5 border border-white/[0.06] overflow-x-auto scrollbar-hide">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-200 shrink-0',
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-red-500 to-blue-600 text-white shadow-lg shadow-red-500/10'
                  : 'text-white/40 hover:text-white/70',
              )}
            >
              <tab.icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* Bell */}
        <div className="hidden sm:flex items-center gap-2 min-w-fit shrink-0">
          <button className="p-2 rounded-lg hover:bg-white/5 transition-colors text-white/40 hover:text-white/70">
            <Bell className="w-4 h-4" />
          </button>
          <div className="w-7 h-7 rounded-md bg-gradient-to-br from-red-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold">B</div>
        </div>
      </div>
    </header>
  )
}

// ─── Dashboard Overview ───────────────────────────────────────────────────

const QUICK_ACTIONS: { tab: Tab; icon: React.ComponentType<{ className?: string }>; label: string; desc: string; color: string }[] = [
  { tab: 'rules',     icon: BookOpen,      label: 'Rules Q&A',        desc: 'Ask anything about REBUILT', color: 'from-red-500/15 to-red-500/5 border-red-500/15' },
  { tab: 'strategy',  icon: Target,        label: 'Strategy Builder', desc: 'Generate your match plan',   color: 'from-blue-500/15 to-blue-500/5 border-blue-500/15' },
  { tab: 'code',      icon: Code,          label: 'Code Snippets',    desc: 'WPILib Java & Python',       color: 'from-red-500/15 to-red-500/5 border-red-500/15' },
  { tab: 'checklist', icon: ClipboardCheck, label: 'Rookie Checklist',  desc: 'Season prep & pit guide',    color: 'from-blue-500/15 to-blue-500/5 border-blue-500/15' },
  { tab: 'scouting',  icon: Search,        label: 'Smart Scouting',   desc: 'AI-ranked alliance picks',   color: 'from-red-500/15 to-red-500/5 border-red-500/15' },
]

export function DashboardOverview({ onTabChange }: { onTabChange: (t: Tab) => void }) {
  return (
    <motion.div className="p-4 sm:p-6" initial="hidden" animate="visible" variants={stagger}>
      {/* Hero Card */}
      <motion.div variants={fadeIn} className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-5 sm:p-7 mb-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-red-500/50 via-blue-500/50 to-transparent" />
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-white">Welcome back, Team BEAN 1833</h2>
            <p className="text-xs text-white/40 mt-1 font-mono tracking-wide">2026 REBUILT SEASON · PEACHTREE DISTRICT · #1 RANKED</p>
          </div>
          <div className="flex items-center gap-3 bg-white/[0.03] rounded-xl px-4 py-2.5 border border-white/[0.08]">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-semibold text-white">60 – 8 – 0</span>
            <span className="text-xs text-white/30 font-mono">W–L–T</span>
          </div>
        </div>
      </motion.div>

      {/* Stats Bar */}
      <motion.div variants={fadeIn} className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Win Rate',        value: '88%',       sub: '60 wins · 8 losses' },
          { label: 'District Rank',  value: '#1',        sub: 'Peachtree' },
          { label: 'Avg Score',      value: '284',       sub: 'pts per match' },
          { label: 'Climb Success',  value: '92%',       sub: 'L3 traversal rate' },
        ].map((s) => (
          <div key={s.label} className="rounded-xl bg-white/[0.03] border border-white/[0.08] p-4">
            <p className="text-[10px] text-white/30 uppercase tracking-widest font-mono mb-1.5">{s.label}</p>
            <p className="text-2xl font-bold text-white">{s.value}</p>
            <p className="text-xs text-white/30 mt-0.5">{s.sub}</p>
          </div>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={fadeIn} className="mb-6">
        <h3 className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-3 font-mono">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {QUICK_ACTIONS.map((a) => (
            <motion.button
              key={a.tab}
              onClick={() => onTabChange(a.tab)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className={cn(
                'text-left p-4 rounded-xl border bg-gradient-to-br transition-all',
                a.color,
              )}
            >
              <a.icon className="w-5 h-5 text-white/60 mb-2.5" />
              <p className="text-sm font-semibold text-white">{a.label}</p>
              <p className="text-[11px] text-white/30 mt-0.5 leading-snug">{a.desc}</p>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Activity */}
        <motion.div variants={fadeIn} className="lg:col-span-2 rounded-xl bg-white/[0.03] border border-white/[0.08] p-5">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-yellow-400/60" />
            <h3 className="text-sm font-semibold text-white">Recent Activity</h3>
          </div>
          <div className="space-y-3">
            {[
              { label: 'Generated match strategy for Week 6', time: '2h ago', icon: Target, color: 'text-blue-400' },
              { label: 'Analyzed 5 new scouting entries', time: '5h ago', icon: Search, color: 'text-red-400' },
              { label: 'Checked REBUILT rule update', time: '1d ago', icon: BookOpen, color: 'text-yellow-400' },
            ].map((a, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                <a.icon className={cn('w-4 h-4', a.color)} />
                <div className="flex-1">
                  <p className="text-sm text-white/80">{a.label}</p>
                  <p className="text-xs text-white/30 mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Mini Stats + CTA */}
        <motion.div variants={fadeIn} className="rounded-xl bg-white/[0.03] border border-white/[0.08] p-5">
          <h3 className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-4 font-mono">TEAM OVERVIEW</h3>
          <div className="space-y-3 mb-5">
            {[
              { label: 'L3 Climb Rate', value: '82%', barColor: 'bg-gradient-to-r from-red-500 to-blue-500' },
              { label: 'Auto Accuracy',   value: '76%', barColor: 'bg-blue-500' },
              { label: 'Fuel per Match',  value: '5.2/s', barColor: 'bg-red-500' },
            ].map((s) => (
              <div key={s.label}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-white/50">{s.label}</span>
                  <span className="text-white font-mono">{s.value}</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className={cn('h-full rounded-full', s.barColor)} style={{ width: s.value.replace('%', '').replace('5.2', '85').replace('/s', '') + '%' }} />
                </div>
              </div>
            ))}
          </div>
          <motion.button
            onClick={() => onTabChange('scouting')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-red-500 to-blue-600 text-white text-sm font-medium flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-red-500/20 transition-all"
          >
            <ArrowRight className="w-4 h-4" /> Open Scouting
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
}

// ─── Shared chat fetch helper ─────────────────────────────────────────────

async function fetchAI(mode: string, messages: { role: string; content: string }[]): Promise<string> {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mode, messages }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error ?? `HTTP ${res.status}`)
  return data.response as string
}

// ─── Message type ─────────────────────────────────────────────────────────

type Msg = { role: 'user' | 'assistant'; content: string }

// ─── Game Rules Chat ─────────────────────────────────────────────────────

const EXAMPLE_QUESTIONS = [
  'How do ranking points work?',
  'What is a legal climb?',
  'Can we score in auto without crossing?',
  'How does the hub activate/deactivate?',
]

export function GameRulesChat() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: 'assistant', content: "Hey! I'm your REBUILT rules expert. Ask me anything about 2026 game rules, scoring, or penalties." },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const handleSend = async (text = input) => {
    const trimmed = text.trim()
    if (!trimmed || loading) return
    const userMsg: Msg = { role: 'user', content: trimmed }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)
    try {
      const history = [...messages, userMsg].map((m) => ({ role: m.role, content: m.content }))
      const reply = await fetchAI('rules', history)
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
    } catch (err) {
      setMessages((prev) => [...prev, { role: 'assistant', content: `Error: ${err instanceof Error ? err.message : String(err)}` }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-[calc(100dvh-5rem)] flex flex-col p-4 sm:p-6">
      <div className="flex-1 bg-white/[0.03] border border-white/[0.08] rounded-2xl flex flex-col overflow-hidden">
        <div className="p-5 border-b border-white/[0.08] flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-blue-600 flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">Game Rules Q&A</h2>
            <p className="text-xs text-white/40">Ask anything about 2026 REBUILT rules</p>
          </div>
        </div>

        <div className="flex-1 p-5 space-y-4 overflow-y-auto">
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={cn('flex gap-3', msg.role === 'user' && 'flex-row-reverse')}
              >
                <div className={cn(
                  'w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5',
                  msg.role === 'assistant' ? 'bg-gradient-to-br from-red-500 to-blue-600' : 'bg-white/10',
                )}>
                  {msg.role === 'assistant' ? <Bot className="w-3.5 h-3.5 text-white" /> : <User className="w-3.5 h-3.5 text-white/60" />}
                </div>
                <div className={cn(
                  'px-4 py-2.5 rounded-2xl text-sm max-w-[80%] leading-relaxed',
                  msg.role === 'assistant' ? 'bg-white/[0.04] text-white/80 rounded-tl-sm' : 'bg-blue-500/15 text-white/90 rounded-tr-sm',
                )}>
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-red-500 to-blue-600 flex items-center justify-center">
                <Loader2 className="w-3.5 h-3.5 text-white animate-spin" />
              </div>
              <div className="px-4 py-2.5 rounded-2xl bg-white/[0.04] text-white/40 text-sm">Thinking…</div>
            </motion.div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="p-5 border-t border-white/[0.08] space-y-3">
          <div className="flex gap-2 flex-wrap">
            {EXAMPLE_QUESTIONS.map((q) => (
              <button key={q} onClick={() => handleSend(q)} className="px-3 py-1.5 rounded-lg bg-white/[0.04] text-white/40 text-xs hover:bg-white/[0.08] hover:text-white/60 transition-colors border border-white/[0.06]">
                {q}
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask a rules question…"
              className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/15 transition-colors"
            />
            <button onClick={() => handleSend()} disabled={loading || !input.trim()} className="w-11 h-11 rounded-xl bg-gradient-to-r from-red-500 to-blue-600 flex items-center justify-center hover:opacity-90 disabled:opacity-40 transition-opacity shrink-0">
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Strategy Builder ──────────────────────────────────────────────────────

export function StrategyBuilder() {
  const [capabilities, setCapabilities] = useState({
    canShoot: false, bps: 3, autoScore: false, climbLevel: 'none', defense: 'none',
  })
  const [strategy, setStrategy] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const generateStrategy = async () => {
    setLoading(true)
    setStrategy(null)
    const prompt = `My robot capabilities:
- Can shoot fuel: ${capabilities.canShoot ? 'Yes' : 'No'}
- Balls per second: ${capabilities.bps}
- Auto scoring: ${capabilities.autoScore ? 'Yes' : 'No'}
- Climb level: ${capabilities.climbLevel}
- Defense: ${capabilities.defense}

Generate a detailed match strategy for the 2026 REBUILT season.`
    try {
      const reply = await fetchAI('strategy', [{ role: 'user', content: prompt }])
      setStrategy(reply)
    } catch (err) {
      setStrategy(`Error: ${err instanceof Error ? err.message : String(err)}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 sm:p-6 h-[calc(100dvh-5rem)] overflow-y-auto">
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-1">
          <div className="p-5 border-b border-white/[0.08]">
            <div className="flex items-center gap-3">
              <Target className="w-5 h-5 text-blue-400" />
              <div>
                <h2 className="text-sm font-semibold text-white">Strategy Builder</h2>
                <p className="text-xs text-white/40 mt-0.5">Input your robot capabilities for an AI-generated match plan</p>
              </div>
            </div>
          </div>
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Can shoot fuel?', key: 'canShoot' as const, type: 'checkbox' },
                { label: 'Auto scoring?', key: 'autoScore' as const, type: 'checkbox' },
              ].map((item) => (
                <label key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] cursor-pointer hover:bg-white/[0.05] transition-colors">
                  <span className="text-sm text-white/70">{item.label}</span>
                  <input
                    type="checkbox"
                    checked={capabilities[item.key] as boolean}
                    onChange={(e) => setCapabilities({ ...capabilities, [item.key]: e.target.checked })}
                    className="w-5 h-5 accent-blue-500"
                  />
                </label>
              ))}
              <div className="col-span-2 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="flex justify-between mb-3">
                  <span className="text-sm text-white/70">Balls per second</span>
                  <span className="text-sm text-white font-mono">{capabilities.bps}</span>
                </div>
                <input type="range" min="1" max="10" value={capabilities.bps} onChange={(e) => setCapabilities({ ...capabilities, bps: parseInt(e.target.value) })} className="w-full accent-blue-500" />
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <span className="text-sm text-white/70 block mb-3">Climb level</span>
                <select value={capabilities.climbLevel} onChange={(e) => setCapabilities({ ...capabilities, climbLevel: e.target.value })} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white focus:outline-none">
                  <option value="none">No climb</option>
                  <option value="L1">Level 1 (3 pts)</option>
                  <option value="L2">Level 2 (6 pts)</option>
                  <option value="L3">Level 3 (12 pts)</option>
                </select>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <span className="text-sm text-white/70 block mb-3">Defense capability</span>
                <div className="flex gap-2">
                  {(['none', 'light', 'heavy'] as const).map((level) => (
                    <button key={level} onClick={() => setCapabilities({ ...capabilities, defense: level })}
                      className={cn('flex-1 py-2 rounded-lg text-sm capitalize transition-colors',
                        capabilities.defense === level ? 'bg-gradient-to-r from-red-500 to-blue-600 text-white' : 'bg-white/[0.04] text-white/50 hover:bg-white/[0.08]')}
                    >
                      {level === 'none' ? "Can't defend" : level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button onClick={generateStrategy} disabled={loading} className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-500 to-blue-600 text-white font-medium flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 transition-opacity">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Target className="w-5 h-5" />}
              {loading ? 'Generating strategy…' : 'Generate Match Strategy'}
            </button>
          </div>
        </div>

        {strategy && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-5">
            <p className="text-[10px] text-white/30 uppercase tracking-widest font-mono mb-3">AI-Generated Strategy</p>
            <pre className="text-sm text-white/80 whitespace-pre-wrap font-sans leading-relaxed">{strategy}</pre>
          </motion.div>
        )}
      </div>
    </div>
  )
}

// ─── Code Snippets ──────────────────────────────────────────────

export function CodeSnippets() {
  const [language, setLanguage] = useState<'java' | 'python'>('java')
  const [copied, setCopied] = useState(false)
  const [selectedSnippet, setSelectedSnippet] = useState(0)
  const [aiQuery, setAiQuery] = useState('')
  const [aiResult, setAiResult] = useState<string | null>(null)
  const [aiLoading, setAiLoading] = useState(false)

  const snippets = [
    {
      title: 'Tank Drive', description: 'Basic tank drive control',
      java: `// Tank Drive - WPILib Java
public class DriveSubsystem extends SubsystemBase {
  private final CANSparkMax leftMotor = new CANSparkMax(1, MotorType.kBrushless);
  private final CANSparkMax rightMotor = new CANSparkMax(2, MotorType.kBrushless);
  private final DifferentialDrive drive;

  public DriveSubsystem() {
    rightMotor.setInverted(true);
    drive = new DifferentialDrive(leftMotor, rightMotor);
  }

  public void tankDrive(double left, double right) {
    drive.tankDrive(left, right);
  }
}`,
      python: `# Tank Drive - WPILib Python
class DriveSubsystem(commands2.SubsystemBase):
    def __init__(self):
        super().__init__()
        self.left = CANSparkMax(1, CANSparkMax.MotorType.kBrushless)
        self.right = CANSparkMax(2, CANSparkMax.MotorType.kBrushless)
        self.right.setInverted(True)
        self.drive = wpilib.drive.DifferentialDrive(self.left, self.right)

    def tank_drive(self, left: float, right: float):
        self.drive.tankDrive(left, right)`,
    },
    {
      title: 'PID Shooter', description: 'Velocity-controlled shooter',
      java: `// PID Shooter - WPILib Java
public class Shooter extends SubsystemBase {
  private static final double kP = 0.0005;
  private static final double kFF = 0.000175;
  private final CANSparkMax motor = new CANSparkMax(3, MotorType.kBrushless);
  private final SparkMaxPIDController pid = motor.getPIDController();

  public Shooter() {
    pid.setP(kP);
    pid.setFF(kFF);
  }

  public void setVelocity(double rpm) {
    pid.setReference(rpm, ControlType.kVelocity);
  }
}`,
      python: `# PID Shooter - WPILib Python
class Shooter(commands2.SubsystemBase):
    kP = 0.0005
    kFF = 0.000175

    def __init__(self):
        super().__init__()
        self.motor = CANSparkMax(3, CANSparkMax.MotorType.kBrushless)
        self.pid = self.motor.getPIDController()
        self.pid.setP(self.kP)
        self.pid.setFF(self.kFF)

    def set_velocity(self, rpm: float):
        self.pid.setReference(rpm, CANSparkMax.ControlType.kVelocity)`,
    },
    {
      title: 'Auto Routine', description: 'Simple autonomous sequence',
      java: `// Auto Routine - WPILib Java
public class SimpleAuto extends SequentialCommandGroup {
  public SimpleAuto(DriveSubsystem drive, Shooter shooter) {
    addCommands(
      new DriveForTime(drive, 0.5, 2.0),
      new InstantCommand(() -> shooter.setVelocity(3000)),
      new WaitCommand(1.0),
      new ShootCommand(shooter).withTimeout(3.0),
      new InstantCommand(() -> shooter.setVelocity(0))
    );
  }
}`,
      python: `# Auto Routine - WPILib Python
class SimpleAuto(commands2.SequentialCommandGroup):
    def __init__(self, drive: DriveSubsystem, shooter: Shooter):
        super().__init__(
            DriveForTime(drive, 0.5, 2.0),
            commands2.InstantCommand(lambda: shooter.set_velocity(3000)),
            commands2.WaitCommand(1.0),
            ShootCommand(shooter).withTimeout(3.0),
            commands2.InstantCommand(lambda: shooter.set_velocity(0))
        )`,
    },
  ]

  const copyCode = () => {
    navigator.clipboard.writeText(snippets[selectedSnippet][language])
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const askAI = async () => {
    if (!aiQuery.trim() || aiLoading) return
    setAiLoading(true)
    setAiResult(null)
    try {
      const reply = await fetchAI('code', [{ role: 'user', content: aiQuery }])
      setAiResult(reply)
    } catch (err) {
      setAiResult(`Error: ${err instanceof Error ? err.message : String(err)}`)
    } finally {
      setAiLoading(false)
    }
  }

  return (
    <div className="p-4 sm:p-6 h-[calc(100dvh-5rem)]">
      <div className="flex gap-4 h-full min-h-0">
        <div className="flex-1 flex flex-col bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-white/[0.08] flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-white">Code Snippets</h2>
              <p className="text-xs text-white/40 mt-0.5">Copy-paste ready WPILib code</p>
            </div>
            <div className="flex gap-1 bg-white/[0.03] rounded-lg p-1 border border-white/[0.06]">
              {(['java', 'python'] as const).map((l) => (
                <button key={l} onClick={() => setLanguage(l)}
                  className={cn('px-3 py-1.5 rounded-md text-xs transition-colors capitalize font-medium',
                    language === l ? 'bg-red-500 text-white' : 'text-white/40 hover:text-white/70')}
                >
                  {l === 'java' ? 'Java' : 'Python'}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 flex overflow-hidden min-h-0">
            <div className="w-48 border-r border-white/[0.08] p-3 space-y-1 overflow-y-auto shrink-0">
              {snippets.map((s, i) => (
                <button key={i} onClick={() => setSelectedSnippet(i)}
                  className={cn('w-full text-left p-3 rounded-xl transition-colors text-sm', selectedSnippet === i ? 'bg-white/[0.08] text-white' : 'text-white/40 hover:text-white/70 hover:bg-white/[0.04]')}
                >
                  <p className="font-medium">{s.title}</p>
                  <p className="text-xs text-white/30 mt-0.5">{s.description}</p>
                </button>
              ))}
            </div>
            <div className="flex-1 p-5 flex flex-col min-h-0 overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-white/30 font-mono">{snippets[selectedSnippet].title}</p>
                <button onClick={copyCode} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] text-white/50 text-xs hover:bg-white/[0.08] hover:text-white transition-colors border border-white/[0.06]">
                  {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <pre className="flex-1 p-4 rounded-xl bg-black/30 border border-white/[0.06] text-xs text-white/60 overflow-auto font-mono leading-relaxed">
                {snippets[selectedSnippet][language]}
              </pre>
            </div>
          </div>
        </div>

        <div className="w-72 hidden md:flex flex-col bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden shrink-0">
          <div className="p-5 border-b border-white/[0.08]">
            <h3 className="text-sm font-semibold text-white">Ask for Custom Code</h3>
            <p className="text-xs text-white/40 mt-0.5">Get AI-written WPILib code for your robot</p>
          </div>
          <div className="flex-1 p-4 overflow-y-auto min-h-0">
            {aiResult ? (
              <pre className="text-xs text-white/60 whitespace-pre-wrap font-sans leading-relaxed">{aiResult}</pre>
            ) : (
              <p className="text-sm text-white/20 text-center mt-8">Ask the AI to write any FRC code for you</p>
            )}
          </div>
          <div className="p-4 border-t border-white/[0.08] space-y-3">
            <textarea
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              placeholder="e.g. Write a PID climber subsystem in Java..."
              className="w-full h-24 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/15 resize-none"
            />
            <button onClick={askAI} disabled={aiLoading || !aiQuery.trim()}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-red-500 to-blue-600 text-white text-sm font-medium flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-40 transition-opacity">
              {aiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Code className="w-4 h-4" />}
              {aiLoading ? 'Writing…' : 'Generate Code'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Rookie Checklist ──────────────────────────────────────────

type CheckItem = { text: string; done: boolean }
type CheckSection = { title: string; expanded: boolean; items: CheckItem[] }

const INITIAL_SECTIONS: CheckSection[] = [
  { title: "Chairman's Award Prep", expanded: true, items: [
    { text: "Research what Chairman's Award recognizes", done: false },
    { text: 'Document team impact on community', done: false },
    { text: 'Write executive summary (1 page)', done: false },
    { text: 'Prepare 3-minute presentation', done: false },
    { text: 'Practice Q&A with judges', done: false },
  ]},
  { title: 'Pit Setup & Logistics', expanded: false, items: [
    { text: 'Designate pit crew members', done: true },
    { text: 'Create tool inventory list', done: true },
    { text: 'Label all tools and parts', done: false },
    { text: 'Pack spare parts kit', done: false },
    { text: 'Create pit layout diagram', done: false },
  ]},
  { title: 'Match Day Logistics', expanded: false, items: [
    { text: 'Assign drive team roles', done: true },
    { text: 'Create scouting rotation schedule', done: false },
    { text: 'Write pre-match checklist', done: false },
    { text: 'Establish pit-to-queue communication', done: false },
  ]},
  { title: 'Scouting Basics', expanded: false, items: [
    { text: 'Define what data to collect', done: false },
    { text: 'Train scouts on form usage', done: false },
    { text: 'Set up data compilation process', done: false },
    { text: 'Create analysis template', done: false },
  ]},
  { title: 'Alliance Selection', expanded: false, items: [
    { text: 'Understand selection process', done: false },
    { text: 'Prepare pick list criteria', done: false },
    { text: 'Practice alliance partner talks', done: false },
  ]},
]

export function RookieChecklist() {
  const [sections, setSections] = useState<CheckSection[]>(INITIAL_SECTIONS)
  const totalItems = sections.flatMap((s) => s.items).length
  const completedItems = sections.flatMap((s) => s.items).filter((i) => i.done).length
  const progress = Math.round((completedItems / totalItems) * 100)

  const toggleItem = (si: number, ii: number) => {
    setSections((prev) => prev.map((s, sIdx) => sIdx !== si ? s : { ...s, items: s.items.map((item, iIdx) => iIdx !== ii ? item : { ...item, done: !item.done }) }))
  }
  const toggleSection = (i: number) => {
    setSections((prev) => prev.map((s, idx) => idx !== i ? s : { ...s, expanded: !s.expanded }))
  }

  return (
    <div className="p-4 sm:p-6 h-[calc(100dvh-5rem)] overflow-y-auto">
      <div className="max-w-2xl mx-auto">
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-1 mb-4">
          <div className="p-5 border-b border-white/[0.08]">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-white">Rookie Season Checklist</h2>
              <span className="text-2xl font-bold text-blue-400 font-mono">{progress}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div className="h-full bg-gradient-to-r from-red-500 to-blue-500" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.5 }} />
            </div>
            <p className="text-xs text-white/30 mt-2">{completedItems} of {totalItems} tasks completed</p>
          </div>
          <div className="p-5 space-y-2">
            {sections.map((section, si) => (
              <div key={si} className="rounded-xl border border-white/[0.06] overflow-hidden">
                <button onClick={() => toggleSection(si)} className="w-full flex items-center justify-between p-4 bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
                  <span className="text-sm text-white font-medium">{section.title}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-white/30 font-mono">{section.items.filter((i) => i.done).length}/{section.items.length}</span>
                    {section.expanded ? <ChevronDown className="w-4 h-4 text-white/30" /> : <ChevronRight className="w-4 h-4 text-white/30" />}
                  </div>
                </button>
                {section.expanded && (
                  <div className="p-2 space-y-0.5">
                    {section.items.map((item, ii) => (
                      <button key={ii} onClick={() => toggleItem(si, ii)} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/[0.04] transition-colors text-left">
                        <div className={cn('w-5 h-5 rounded border-2 flex items-center justify-center transition-colors shrink-0', item.done ? 'bg-blue-500 border-blue-500' : 'border-white/20')}>
                          {item.done && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <span className={cn('text-sm transition-colors', item.done ? 'text-white/30 line-through' : 'text-white/70')}>{item.text}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Supabase / Scouting Setup ─────────────────────────────────────────────────

interface ScoutingEntry {
  id?: string
  team_number: string
  team_name: string
  match_number: string
  auto_fuel: number
  climb_level: string
  bps: number
  reliability: number
  defense: string
  notes: string
  created_at?: string
}

// ─── Smart Scouting ──────────────────────────────────────────────────────

export function SmartScouting() {
  const [entries, setEntries] = useState<ScoutingEntry[]>([])
  const [loading, setLoading] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const [view, setView] = useState<'database' | 'form'>('database')
  const [analysis, setAnalysis] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [dbConnected, setDbConnected] = useState(true)

  // Form state
  const [form, setForm] = useState<ScoutingEntry>({
    team_number: '',
    team_name: '',
    match_number: '',
    auto_fuel: 0,
    climb_level: 'None',
    bps: 1,
    reliability: 3,
    defense: 'None',
    notes: '',
  })

  const fetchEntries = useCallback(async () => {
    try {
      const res = await fetch('/api/scouting')
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      if (data.entries) {
        setEntries(data.entries)
      }
    } catch {
      setDbConnected(false)
      // fallback to temp data
      setEntries(DEMO_TEAMS)
    }
  }, [])

  useEffect(() => { fetchEntries() }, [fetchEntries])

  const saveEntry = async () => {
    if (!form.team_number.trim()) return
    setLoading(true)
    try {
      const res = await fetch('/api/scouting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          team_number: form.team_number,
          team_name: form.team_name || 'Unknown',
          match_number: form.match_number || 'Q1',
          auto_fuel: Number(form.auto_fuel) || 0,
          climb_level: form.climb_level || 'None',
          bps: Number(form.bps) || 1,
          reliability: Number(form.reliability) || 3,
          defense: form.defense || 'None',
          notes: form.notes || '',
        }),
      })
      if (!res.ok) throw new Error('Save failed')
      const data = await res.json()
      if (data.entry) {
        setEntries((prev) => [data.entry, ...prev])
      }
      setForm({ team_number: '', team_name: '', match_number: '', auto_fuel: 0, climb_level: 'None', bps: 1, reliability: 3, defense: 'None', notes: '' })
      setView('database')
    } catch {
      const fakeEntry: ScoutingEntry = {
        id: crypto.randomUUID(),
        team_number: form.team_number,
        team_name: form.team_name || 'Unknown',
        match_number: form.match_number || 'Q1',
        auto_fuel: Number(form.auto_fuel) || 0,
        climb_level: form.climb_level || 'None',
        bps: Number(form.bps) || 1,
        reliability: Number(form.reliability) || 3,
        defense: form.defense || 'None',
        notes: form.notes || '',
        created_at: new Date().toISOString(),
      }
      setEntries((prev) => [fakeEntry, ...prev])
      setForm({ team_number: '', team_name: '', match_number: '', auto_fuel: 0, climb_level: 'None', bps: 1, reliability: 3, defense: 'None', notes: '' })
      setDbConnected(false)
      setView('database')
    } finally {
      setLoading(false)
    }
  }

  const runAnalysis = async () => {
    if (entries.length === 0) return
    setAnalyzing(true)
    const prompt = `I am Team BEAN 1833. My robot: L3 climber, 5 BPS fuel shooter, good auto. Here are the teams I've scouted:

${entries.map((t) => `Team ${t.team_number} (${t.team_name}): Auto fuel ${t.auto_fuel}, Climb ${t.climb_level}, BPS ${t.bps}/s, Reliability ${t.reliability}/5, Defense: ${t.defense}. Notes: ${t.notes}`).join('\n')}

Give me an AI-ranked alliance pick list with reasoning for each choice.`
    try {
      const reply = await fetchAI('scouting', [{ role: 'user', content: prompt }])
      setAnalysis(reply)
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setAnalyzing(false)
    }
  }

  return (
    <div className="p-4 sm:p-6 h-[calc(100dvh-5rem)] flex flex-col overflow-hidden">
      <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] flex-1 flex flex-col overflow-hidden">
        <div className="p-5 border-b border-white/[0.08] flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-red-400" />
              <h2 className="text-sm font-semibold text-white">Smart Scouting</h2>
            </div>
            <p className="text-xs text-white/40 mt-0.5">{entries.length} teams scouted · Powered by Robotify AI</p>
          </div>
          <div className="flex gap-1 bg-white/[0.03] rounded-lg p-0.5 border border-white/[0.06]">
            {(['database', 'form'] as const).map((v) => (
              <button key={v} onClick={() => setView(v)}
                className={cn('px-3 py-1.5 rounded-md text-xs transition-colors', view === v ? 'bg-white/[0.08] text-white' : 'text-white/40 hover:text-white/70')}
              >
                {v === 'database' ? 'Database' : 'Scout Form'}
              </button>
            ))}
          </div>
        </div>

        {view === 'database' ? (
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-auto p-4">
              {!dbConnected && (
                <div className="mb-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-200 text-xs flex items-center gap-2">
                  <Database className="w-3.5 h-3.5" />
                  Supabase not configured. Add SUPABASE_URL and SUPABASE_ANON_KEY to .env.local to persist scouting data.
                </div>
              )}
              <table className="w-full text-sm">
                <thead className="sticky top-0">
                  <tr className="text-left text-xs text-white/30 border-b border-white/[0.08]">
                    {['Team', 'Number', 'Fuel', 'Climb', 'BPS', 'Rel', 'Defense', 'Notes'].map((h) => (
                      <th key={h} className="p-3 font-medium font-mono">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {entries.map((e, i) => (
                    <tr key={e.id || i} className="border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors">
                      <td className="p-3 text-white font-medium">{e.team_name}</td>
                      <td className="p-3 text-white/60 font-mono">{e.team_number}</td>
                      <td className="p-3 text-white/60">{e.auto_fuel}</td>
                      <td className="p-3">
                        <span className={cn('px-2 py-0.5 rounded text-xs font-medium', e.climb_level === 'L3' ? 'bg-blue-500/20 text-blue-400' : 'bg-white/10 text-white/50')}>{e.climb_level}</span>
                      </td>
                      <td className="p-3 text-white/60">{e.bps}</td>
                      <td className="p-3">
                        <div className="flex gap-0.5">
                          {[1,2,3,4,5].map((n) => <div key={n} className={cn('w-1.5 h-1.5 rounded-full', n <= e.reliability ? 'bg-green-500' : 'bg-white/10')} />)}
                        </div>
                      </td>
                      <td className="p-3">
                        <span className={cn('px-2 py-0.5 rounded text-xs', e.defense === 'Heavy' ? 'bg-red-500/20 text-red-400' : e.defense === 'Light' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-white/10 text-white/40')}>{e.defense}</span>
                      </td>
                      <td className="p-3 text-white/30 max-w-[180px] truncate">{e.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-white/[0.08] shrink-0">
              <button onClick={runAnalysis} disabled={analyzing || entries.length === 0}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-500 to-blue-600 text-white font-medium flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 transition-opacity"
              >
                {analyzing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                {analyzing ? 'Analyzing teams…' : 'Analyze with AI'}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-auto p-4">
            <div className="max-w-lg mx-auto space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <label className="text-xs text-white/30 font-mono block mb-2">Team Number</label>
                  <input
                    value={form.team_number} onChange={(e) => setForm({ ...form, team_number: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/15"
                    placeholder="e.g. 1833"
                  />
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <label className="text-xs text-white/30 font-mono block mb-2">Team Name</label>
                  <input
                    value={form.team_name} onChange={(e) => setForm({ ...form, team_name: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/15"
                    placeholder="e.g. BEAN"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <label className="text-xs text-white/30 font-mono block mb-2">Match Number</label>
                  <input
                    value={form.match_number} onChange={(e) => setForm({ ...form, match_number: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/15"
                    placeholder="e.g. Q15"
                  />
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <label className="text-xs text-white/30 font-mono block mb-2">Auto Fuel Scored</label>
                  <input
                    type="number" value={form.auto_fuel} onChange={(e) => setForm({ ...form, auto_fuel: parseInt(e.target.value) || 0 })}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/15"
                  />
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <label className="text-xs text-white/30 font-mono block mb-3">Climb Level</label>
                <div className="flex gap-2">
                  {['None', 'L1', 'L2', 'L3'].map((l) => (
                    <button key={l} onClick={() => setForm({ ...form, climb_level: l })}
                      className={cn('flex-1 py-2 rounded-lg text-sm transition-colors', form.climb_level === l ? 'bg-blue-500/20 text-blue-400 border border-blue-500/20' : 'bg-white/[0.04] text-white/40 hover:bg-white/[0.08]')}
                    >{l}</button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <label className="text-xs text-white/30 font-mono block mb-2">Balls Per Second</label>
                  <input
                    type="number" value={form.bps} onChange={(e) => setForm({ ...form, bps: parseInt(e.target.value) || 1 })}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/15"
                  />
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <label className="text-xs text-white/30 font-mono block mb-2">Reliability (1-5)</label>
                  <input
                    type="number" min={1} max={5} value={form.reliability} onChange={(e) => setForm({ ...form, reliability: Math.min(5, Math.max(1, parseInt(e.target.value) || 3)) })}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/15"
                  />
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <label className="text-xs text-white/30 font-mono block mb-3">Defense</label>
                <div className="flex gap-2">
                  {['None', 'Light', 'Heavy'].map((d) => (
                    <button key={d} onClick={() => setForm({ ...form, defense: d })}
                      className={cn('flex-1 py-2 rounded-lg text-sm transition-colors', form.defense === d ? 'bg-blue-500/20 text-blue-400 border border-blue-500/20' : 'bg-white/[0.04] text-white/40 hover:bg-white/[0.08]')}
                    >{d}</button>
                  ))}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <label className="text-xs text-white/30 font-mono block mb-2">Notes</label>
                <textarea
                  value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/15 resize-none h-20"
                  placeholder="Strategy observations…"
                />
              </div>
              <button onClick={saveEntry} disabled={loading || !form.team_number.trim()}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-500 to-blue-600 text-white font-medium flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 transition-opacity"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
                {loading ? 'Saving…' : 'Save Scout Entry'}
              </button>
            </div>
          </div>
        )}

        {/* Analysis overlay */}
        {analysis && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur flex items-center justify-center p-8 z-10">
            <div className="bg-neutral-900 rounded-2xl border border-white/[0.08] max-w-2xl w-full overflow-hidden flex flex-col max-h-[80%]">
              <div className="p-5 border-b border-white/[0.08] flex items-center justify-between shrink-0">
                <h3 className="text-sm font-semibold text-white">AI Alliance Pick List</h3>
                <button onClick={() => setAnalysis(null)} className="text-white/30 hover:text-white text-xs">Close</button>
              </div>
              <div className="p-5 overflow-auto">
                <pre className="text-sm text-white/70 whitespace-pre-wrap font-sans leading-relaxed">{analysis}</pre>
              </div>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-200 text-xs">{error}</div>
      )}
    </div>
  )
}

// ─── demo fallback data ──────────────────────────────────────────────────────

const DEMO_TEAMS: ScoutingEntry[] = [
  { team_number: '254',  team_name: 'Cheesy Poofs', match_number: 'Q1', auto_fuel: 8, climb_level: 'L3', bps: 7, reliability: 5, defense: 'Light', notes: 'Best shooter in pool' },
  { team_number: '3476', team_name: 'Code Orange',  match_number: 'Q2', auto_fuel: 5, climb_level: 'L3', bps: 5, reliability: 4, defense: 'None',  notes: '1 breakdown, recovered fast' },
  { team_number: '1690', team_name: 'Orbit',        match_number: 'Q3', auto_fuel: 3, climb_level: 'L2', bps: 4, reliability: 5, defense: 'Heavy', notes: 'Defensive specialist' },
  { team_number: '118',  team_name: 'Robonauts',    match_number: 'Q4', auto_fuel: 6, climb_level: 'L2', bps: 6, reliability: 4, defense: 'Light', notes: 'Consistent cycles' },
  { team_number: '2056', team_name: 'OP Robotics',  match_number: 'Q5', auto_fuel: 4, climb_level: 'L3', bps: 5, reliability: 5, defense: 'None',  notes: 'Reliable partner' },
]
