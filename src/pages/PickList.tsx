import { useState, useMemo, useEffect } from 'react'
import { Search, ArrowUp, ArrowDown, Plus, X, Shield, Flame, Target, Loader2 } from 'lucide-react'
import type { TeamStats } from '@/types/index'

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
  climbL1Rate: number
  climbL2Rate: number
  climbL3Rate: number
  autoClimbRate: number
  defenseEffectiveness: number
  shotOnTheMoveRate: number
  shotStationaryRate: number
  accuracyScore: number
  foulsPerMatch: number
  breakdownRate: number
  roles: string[]
}

type SortKey = 'teamNumber' | 'fuelTotalOPR' | 'climbSuccessRate' | 'defenseEffectiveness' | 'autoFuel' | 'totalPoints'
type SortConfig = { key: SortKey; dir: 'asc' | 'desc' }

const sortOptions: { value: SortKey; label: string }[] = [
  { value: 'teamNumber', label: 'Team Number' },
  { value: 'fuelTotalOPR', label: 'Fuel mOPR' },
  { value: 'climbSuccessRate', label: 'Climb %' },
  { value: 'defenseEffectiveness', label: 'Defense' },
  { value: 'autoFuel', label: 'Auto Fuel' },
  { value: 'totalPoints', label: 'Total Points' },
]

const filterDefs = [
  { id: 'hasClimb', label: 'Has Climb', predicate: (t: ApiTeam) => t.climbSuccessRate > 0 },
  { id: 'climb50', label: 'Climb ≥50%', predicate: (t: ApiTeam) => t.climbSuccessRate >= 50 },
  { id: 'climb3', label: 'Climb L3', predicate: (t: ApiTeam) => t.climbL3Rate > 0 },
  { id: 'hasAuto', label: 'Has Auto', predicate: (t: ApiTeam) => t.autoClimbRate > 0 || t.autoFuel > 0 },
  { id: 'onMove', label: 'On-Move Shooter', predicate: (t: ApiTeam) => t.shotOnTheMoveRate > t.shotStationaryRate },
  { id: 'defense', label: 'Defense Role', predicate: (t: ApiTeam) => t.defenseEffectiveness >= 50 },
  { id: 'highAcc', label: 'Accuracy ≥80%', predicate: (t: ApiTeam) => t.accuracyScore >= 80 },
  { id: 'reliable', label: 'Reliable', predicate: (t: ApiTeam) => t.breakdownRate < 10 },
]

export default function PickList() {
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
  const [sort, setSort] = useState<SortConfig>({ key: 'fuelTotalOPR', dir: 'desc' })
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [picked, setPicked] = useState<ApiTeam[]>([])

  const available = useMemo(() => {
    let t = teams.filter(team => !picked.some(p => p.teamNumber === team.teamNumber))
    if (search.trim()) {
      const q = search.toLowerCase()
      t = t.filter(team => String(team.teamNumber).includes(q) || team.nickname.toLowerCase().includes(q))
    }
    for (const fid of activeFilters) {
      const f = filterDefs.find(f => f.id === fid)
      if (f) t = t.filter(f.predicate)
    }
    const k = sort.key
    t = [...t].sort((a, b) => {
      const av = k === 'teamNumber' ? a.teamNumber : k === 'fuelTotalOPR' ? a.fuelTotalOPR : k === 'climbSuccessRate' ? a.climbSuccessRate : k === 'defenseEffectiveness' ? a.defenseEffectiveness : k === 'autoFuel' ? a.autoFuel : a.totalPoints
      const bv = k === 'teamNumber' ? b.teamNumber : k === 'fuelTotalOPR' ? b.fuelTotalOPR : k === 'climbSuccessRate' ? b.climbSuccessRate : k === 'defenseEffectiveness' ? b.defenseEffectiveness : k === 'autoFuel' ? b.autoFuel : b.totalPoints
      return sort.dir === 'asc' ? (av - bv) : (bv - av)
    })
    return t
  }, [search, sort, activeFilters, picked, teams])

  const toggleFilter = (id: string) => {
    setActiveFilters(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  const addToPickList = (team: ApiTeam) => {
    if (!picked.some(p => p.teamNumber === team.teamNumber)) {
      setPicked(prev => [...prev, team])
    }
  }

  const removeFromPickList = (team: ApiTeam) => {
    setPicked(prev => prev.filter(p => p.teamNumber !== team.teamNumber))
  }

  if (loading) return <div className="flex items-center justify-center h-[calc(100vh-3.5rem)] text-frc-muted"><Loader2 className="w-6 h-6 animate-spin mr-2" /> Loading teams...</div>

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 h-[calc(100vh-3.5rem)]">
      <div className="flex items-center gap-3 mb-4">
        <h1 className="text-2xl font-bold text-white">Alliance Pick List</h1>
        <span className="text-xs px-2 py-0.5 rounded-full bg-frc-green/10 text-frc-green border border-frc-green/30">{teams.length} teams</span>
      </div>
      {error && <p className="text-red-400 text-sm mb-2">Error loading teams: {error}</p>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100%-2rem)] min-h-0">
        <div className="lg:col-span-2 flex flex-col gap-3 h-full min-h-0">
          <div className="glass rounded-2xl p-4 space-y-3 flex-shrink-0">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-frc-muted" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search team number or name..."
                  className="w-full bg-white/5 border border-frc-border/50 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-frc-muted outline-none focus:border-frc-yellow/50 transition-colors"
                />
              </div>
              <div className="flex gap-2">
                {sortOptions.map(s => (
                  <button key={s.value} onClick={() => setSort(prev => ({ key: s.value, dir: prev.key === s.value && prev.dir === 'desc' ? 'asc' : 'desc' }))}
                    className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all ${sort.key === s.value ? 'border-frc-yellow/50 text-frc-yellow bg-frc-yellow/10' : 'border-frc-border/30 text-frc-muted hover:text-white'}`}>
                    {s.label} {sort.key === s.value ? (sort.dir === 'asc' ? <ArrowUp className="inline w-3 h-3" /> : <ArrowDown className="inline w-3 h-3" />) : ''}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {filterDefs.map(f => (
                <button key={f.id} onClick={() => toggleFilter(f.id)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${activeFilters.includes(f.id) ? 'bg-frc-yellow/10 border-frc-yellow/40 text-frc-yellow' : 'bg-white/5 border-frc-border/30 text-frc-muted hover:text-white'}`}>
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 min-h-0">
            {available.map(team => (
              <div key={team.teamNumber} className="glass rounded-xl p-4 flex items-center gap-4 group glass-hover transition-all">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-frc-yellow/10 border border-frc-yellow/30 flex items-center justify-center">
                  <span className="text-lg font-bold text-frc-yellow">{team.teamNumber}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-white truncate">{team.nickname}</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-frc-yellow/10 text-frc-yellow border border-frc-yellow/30">
                      <TeamFuelOPR team={team} />
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-frc-muted">
                    <span className="flex items-center gap-1"><Target className="w-3 h-3" /> {team.totalFuel} fuel</span>
                    <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> {team.climbSuccessRate}% climb</span>
                    <span className="flex items-center gap-1"><Flame className="w-3 h-3" /> {team.totalPoints} pts</span>
                    <span className="flex items-center gap-1">Acc: {team.accuracyScore}%</span>
                  </div>
                </div>
                <button onClick={() => addToPickList(team)} className="flex-shrink-0 p-2 rounded-xl bg-frc-yellow/10 border border-frc-yellow/30 text-frc-yellow hover:bg-frc-yellow/20 transition-all opacity-0 group-hover:opacity-100">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 h-full min-h-0">
          <div className="glass rounded-2xl p-4">
            <h2 className="text-sm font-semibold text-white mb-3">My Pick List ({picked.length})</h2>
            <div className="space-y-2">
              {picked.length === 0 && <p className="text-xs text-frc-muted text-center py-4">Click + to add teams</p>}
              {picked.map((team, i) => (
                <div key={team.teamNumber} className="flex items-center gap-2 glass rounded-lg p-2 pr-1">
                  <span className="text-xs text-frc-yellow font-bold w-5">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-white font-medium truncate">{team.nickname}</div>
                    <div className="text-[10px] text-frc-muted"><TeamFuelOPR team={team} /> mOPR · {team.climbSuccessRate}% climb</div>
                  </div>
                  <button onClick={() => removeFromPickList(team)} className="p-1 rounded hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TeamFuelOPR({ team }: { team: ApiTeam }) {
  return <>{team.fuelTotalOPR.toFixed(1)}</>
}
