import { useState, useRef, useEffect } from 'react'
import { Send, Loader2, Copy, Check } from 'lucide-react'
import { type Message, MODES } from '@/types/index'

export default function Chat() {
  const [mode, setMode] = useState('rules')
  const [messages, setMessages] = useState<Message[]>([
    { id: 'welcome', role: 'assistant', content: 'Welcome to Maneuver 2026 AI! Select a mode below and ask me anything. I\'m here for strategy, code, rules, and more.', mode: 'rules', timestamp: Date.now() }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const handleSend = async () => {
    if (!input.trim() || loading) return

    const userMsg: Message = { id: crypto.randomUUID(), role: 'user', content: input, mode: mode as any, timestamp: Date.now() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    const apiMessages = [...messages, userMsg].map(m => ({ role: m.role, text: m.content }))

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode, messages: apiMessages })
      })

      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      const data = await res.json()
      const assistantText = data.response || data.error || 'No response received.'

      setMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: assistantText + (data.warning ? `\n\n_(Fallback mode: ${data.warning})_` : ''),
        mode: mode as any,
        timestamp: Date.now()
      }])
    } catch (err) {
      setMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: `I'm sorry, I couldn't connect to the AI backend. Make sure the backend is running on localhost:3001.\n\nError: ${err instanceof Error ? err.message : String(err)}`,
        mode: mode as any,
        timestamp: Date.now()
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 1500)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 flex flex-col h-[calc(100vh-3.5rem)]">
      <div className="flex items-center gap-3 mb-4">
        <h1 className="text-2xl font-bold text-white">AI Assistant</h1>
        <span className="text-xs px-2 py-0.5 rounded-full bg-frc-yellow/10 text-frc-yellow border border-frc-yellow/30">Powered by Groq / Llama 3.3</span>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
        {MODES.map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
              mode === m.id
                ? 'bg-frc-yellow/10 border-frc-yellow/40 text-frc-yellow glow-yellow'
                : 'bg-white/5 border-transparent text-frc-muted hover:text-frc-text hover:bg-white/10'
            }`}
          >
            <span>{m.icon}</span>
            <span className="hidden sm:inline">{m.label}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-1 min-h-0">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed relative group ${
              msg.role === 'user'
                ? 'bg-frc-yellow/10 border border-frc-yellow/20 text-white ml-auto'
                : 'glass border border-frc-border/30 text-frc-text'
            }`}>
              {msg.role === 'assistant' && (
                <button
                  onClick={() => handleCopy(msg.id, msg.content)}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-white/10"
                >
                  {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5 text-frc-muted" />}
                </button>
              )}
              <div className="whitespace-pre-wrap">{msg.content || (msg.role === 'assistant' ? <Loader2 className="w-4 h-4 animate-spin text-frc-yellow" /> : '')}</div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="glass rounded-2xl px-4 py-3">
              <Loader2 className="w-4 h-4 animate-spin text-frc-yellow" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="flex items-center gap-2 glass rounded-2xl border border-frc-border/50 p-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
          placeholder={`Ask about ${MODES.find(m => m.id === mode)?.label.toLowerCase()}...`}
          className="flex-1 bg-transparent text-sm text-white placeholder-frc-muted px-3 py-2 outline-none"
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="flex-shrink-0 w-9 h-9 rounded-xl bg-frc-yellow text-frc-navy flex items-center justify-center hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
