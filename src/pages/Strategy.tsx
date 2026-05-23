import { useState, useMemo, useEffect } from 'react'
import { Search, ArrowUp, ArrowDown, Loader2 } from 'lucide-react'

interface ApiTeam {
  teamNumber: number
  nickname: string
  eventKey: string
  matchCount: number
  totalPoints: number
  autoPoints: number
  teleopPoints: number
  endgamePoints: number
  fuelTotalOPR: number
  autoFuel: number
  teleopFuel: number
  totalFuel: number
  climbSuccessRate: number
  accuracyScore: number
  defenseEffectiveness: number
}

type ColumnKey = 'teamNumber' | 'totalPoints' | 'autoPoints' | 'teleopPoints' | 'endgamePoints' | 'totalFuel' | 'fuelTotalOPR' | 'climbSuccessRate' | 'accuracyScore' | 'defenseEffectiveness'

interface ColumnDef { key: ColumnKey; label: string; accessor: (t: ApiTeam) => number; format?: (v: number) => string }

const columns: ColumnDef[] = [
  { key: 'teamNumber', label: 'Team', accessor: t => t.teamNumber, format: v => String(Math.round(v)) },
  { key: 'totalPoints', label: 'Total Pts', accessor: t => t.totalPoints },
  { key: 'autoPoints', label: 'Auto', accessor: t => t.autoPoints },
  { key: 'teleopPoints', label: 'Teleop', accessor: t => t.teleopPoints },
  { key: 'endgamePoints', label: 'Endgame', accessor: t => t.endgamePoints },
  { key: 'totalFuel', label: 'Fuel', accessor: t => t.totalFuel },
  { key: 'fuelTotalOPR', label: 'mOPR', accessor: t => t.fuelTotalOPR, format: v => v.toFixed(1) },
  { key: 'climbSuccessRate', label: 'Climb %', accessor: t => t.climbSuccessRate, format: v => `${Math.round(v)}%` },
  { key: 'accuracyScore', label: 'Accuracy', accessor: t => t.accuracyScore, format: v => `${Math.round(v)}%` },
  { key: 'defenseEffectiveness', label: 'Defense', accessor: t => t.defenseEffectiveness, format: v => `${Math.round(v)}%` },
]

const presets: Record<string, string[]> = {
  essential: ['teamNumber', 'totalPoints', 'fuelTotalOPR', 'climbSuccessRate'],
  auto: ['teamNumber', 'autoPoints', 'totalFuel', 'accuracyScore'],
  teleop: ['teamNumber', 'teleopPoints', 'fuelTotalOPR', 'defenseEffectiveness'],
  endgame: ['teamNumber', 'endgamePoints', 'climbSuccessRate', 'totalPoints'],
  full: columns.map(c => c.key),
}

export default function Strategy() {
  const [teams, setTeams] = useState<ApiTeam[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/teams')
      .then(r => r.json())
      .then(data => {
        setTeams(data.teams || [])
        setLoading(false)
      })
      .catch(err => {
        setError(String(err))
        setLoading(false)
      })
  }, [])

  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<{ key: ColumnKey; dir: 'asc' | 'desc' } | null>(null)
  const [visibleCols, setVisibleCols] = useState<string[]>(presets.essential)
  const [preset, setPreset] = useState<string>('essential')

  const visibleColumns = useMemo(() => columns.filter(c => visibleCols.includes(c.key)), [visibleCols])

  const sorted = useMemo(() => {
    let t = [...teams]
    if (search.trim()) {
      const q = search.toLowerCase()
      t = t.filter(team => String(team.teamNumber).includes(q) || team.nickname.toLowerCase().includes(q))
    }
    if (sort) {
      const col = columns.find(c => c.key === sort.key)
      if (col) {
        t.sort((a, b) => {
          const av = col.accessor(a), bv = col.accessor(b)
          return sort.dir === 'asc' ? av - bv : bv - av
        })
      }
    }
    return t
  }, [search, sort, teams])

  const applyPreset = (p: string) => {
    setPreset(p)
    setVisibleCols(presets[p] || presets.essential)
  }

  const toggleCol = (key: ColumnKey) => {
    setVisibleCols(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key])
    setPreset('custom')
  }

  if (loading) return <div className="flex items-center justify-center h-[calc(100vh-3.5rem)] text-frc-muted"><Loader2 className="w-6 h-6 animate-spin mr-2" /> Loading teams...</div>

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <div className="flex items-center gap-3 mb-4">
        <h1 className="text-2xl font-bold text-white">Strategy Overview</h1>
        <span className="text-xs px-2 py-0.5 rounded-full bg-frc-green/10 text-frc-green border border-frc-green/30">{sorted.length} teams</span>
      </div>
      {error && <p className="text-red-400 text-sm mb-2">Error loading teams: {error}</p>}

      <div className="glass rounded-2xl p-4 mb-4 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 items-start">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-frc-muted" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search team number or name..."
              className="w-full bg-white/5 border border-frc-border/50 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-frc-muted outline-none focus:border-frc-yellow/50 transition-colors"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {Object.keys(presets).filter(p => p !== 'full').map(p => (
              <button key={p} onClick={() => applyPreset(p)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${preset === p ? 'bg-frc-yellow/10 border-frc-yellow/40 text-frc-yellow' : 'bg-white/5 border-frc-border/30 text-frc-muted hover:text-white'}`}>
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="text-xs text-frc-muted flex flex-wrap gap-2">
          <span>Columns:</span>
          {columns.map(c => (
            <button key={c.key} onClick={() => toggleCol(c.key)}
              className={`px-2 py-0.5 rounded border text-[11px] transition-all ${visibleCols.includes(c.key) ? 'bg-frc-yellow/10 border-frc-yellow/40 text-frc-yellow' : 'border-frc-border/30 text-frc-muted hover:text-white'}`}>
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="glass rounded-2xl border border-frc-border/30 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-frc-border/30">
              <th className="text-left px-4 py-3 text-xs font-semibold text-frc-muted uppercase tracking-wider w-40">Nickname</th>
              {visibleColumns.map(col => (
                <th key={col.key} className="text-right px-3 py-3 text-xs font-semibold text-frc-muted uppercase tracking-wider cursor-pointer hover:text-white transition-colors"
                  onClick={() => setSort(prev => ({ key: col.key, dir: prev?.key === col.key && prev.dir === 'desc' ? 'asc' : 'desc' }))}>
                  <div className="flex items-center justify-end gap-1">
                    {col.label}
                    {sort?.key === col.key ? (sort.dir === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />) : ''}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((team, i) => (
              <tr key={team.teamNumber} className={`border-b border-frc-border/20 hover:bg-white/5 transition-colors ${i % 2 === 0 ? 'bg-white/[0.02]' : ''}`}>
                <td className="px-4 py-3">
                  <div className="text-white font-medium text-xs">{team.nickname}</div>
                  <div className="text-frc-muted text-[10px]">{team.teamNumber}</div>
                </td>
                {visibleColumns.map(col => (
                  <td key={col.key} className="px-3 py-3 text-right text-frc-text">
                    {col.format ? col.format(col.accessor(team)) : col.accessor(team)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
