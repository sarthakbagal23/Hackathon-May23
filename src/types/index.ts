export type AiMode = 'rules' | 'strategy' | 'code' | 'checklist' | 'scouting'

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  mode: AiMode
  timestamp: number
}

export interface TeamStats {
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

export interface AllianceSlot {
  allianceNumber: number
  captain: TeamStats | null
  pick1: TeamStats | null
  pick2: TeamStats | null
  backup: TeamStats | null
}

export const MODES: { id: AiMode; label: string; icon: string; description: string }[] = [
  { id: 'rules', label: 'Rules Q&A', icon: '📖', description: 'Ask about REBUILT game rules' },
  { id: 'strategy', label: 'Strategy', icon: '🎯', description: 'Build match strategy for your robot' },
  { id: 'code', label: 'Code', icon: '💻', description: 'WPILib Java & Python snippets' },
  { id: 'checklist', label: 'Checklist', icon: '✅', description: 'Rookie season guidance' },
  { id: 'scouting', label: 'Scouting', icon: '📊', description: 'Analyze & rank teams' },
]
