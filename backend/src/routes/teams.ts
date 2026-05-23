import { Router } from 'express'
import type { Request, Response } from 'express'
import { isSupabaseConnected, supabase } from '../lib/supabase.js'

const router = Router()

const demoTeams = [
  { teamNumber: 1833, nickname: "BEAN", eventKey: "2026gacmp", matchCount: 12, totalPoints: 245, autoPoints: 68, teleopPoints: 145, endgamePoints: 32, fuelTotalOPR: 18.5, autoFuel: 42, teleopFuel: 125, totalFuel: 167, climbSuccessRate: 92, climbL1Rate: 8, climbL2Rate: 33, climbL3Rate: 50, autoClimbRate: 25, defenseEffectiveness: 78, shotOnTheMoveRate: 65, shotStationaryRate: 35, accuracyScore: 88, foulsPerMatch: 0.3, breakdownRate: 0, roles: ['Cycler', 'Defense'] },
  { teamNumber: 254, nickname: "The Cheesy Poofs", eventKey: "2026gacmp", matchCount: 12, totalPoints: 310, autoPoints: 75, teleopPoints: 180, endgamePoints: 45, fuelTotalOPR: 28.0, autoFuel: 55, teleopFuel: 195, totalFuel: 250, climbSuccessRate: 100, climbL1Rate: 0, climbL2Rate: 8, climbL3Rate: 92, autoClimbRate: 42, defenseEffectiveness: 45, shotOnTheMoveRate: 80, shotStationaryRate: 20, accuracyScore: 95, foulsPerMatch: 0.1, breakdownRate: 0, roles: ['Cycler', 'Passer'] },
  { teamNumber: 1114, nickname: "Simbotics", eventKey: "2026gacmp", matchCount: 11, totalPoints: 278, autoPoints: 70, teleopPoints: 160, endgamePoints: 48, fuelTotalOPR: 24.0, autoFuel: 50, teleopFuel: 165, totalFuel: 215, climbSuccessRate: 91, climbL1Rate: 0, climbL2Rate: 9, climbL3Rate: 82, autoClimbRate: 36, defenseEffectiveness: 55, shotOnTheMoveRate: 75, shotStationaryRate: 25, accuracyScore: 92, foulsPerMatch: 0.2, breakdownRate: 8, roles: ['Cycler', 'Passer', 'Thief'] },
  { teamNumber: 1678, nickname: "Citrus Circuits", eventKey: "2026gacmp", matchCount: 12, totalPoints: 262, autoPoints: 65, teleopPoints: 155, endgamePoints: 42, fuelTotalOPR: 22.0, autoFuel: 48, teleopFuel: 150, totalFuel: 198, climbSuccessRate: 83, climbL1Rate: 17, climbL2Rate: 0, climbL3Rate: 67, autoClimbRate: 30, defenseEffectiveness: 60, shotOnTheMoveRate: 60, shotStationaryRate: 40, accuracyScore: 89, foulsPerMatch: 0.4, breakdownRate: 0, roles: ['Cycler', 'Passer'] },
  { teamNumber: 195, nickname: "Cyber Knights", eventKey: "2026gacmp", matchCount: 10, totalPoints: 190, autoPoints: 45, teleopPoints: 118, endgamePoints: 27, fuelTotalOPR: 14.5, autoFuel: 30, teleopFuel: 100, totalFuel: 130, climbSuccessRate: 70, climbL1Rate: 20, climbL2Rate: 40, climbL3Rate: 10, autoClimbRate: 10, defenseEffectiveness: 85, shotOnTheMoveRate: 40, shotStationaryRate: 60, accuracyScore: 72, foulsPerMatch: 1.2, breakdownRate: 10, roles: ['Defense', 'Clean-up'] },
  { teamNumber: 33, nickname: "Killer Bees", eventKey: "2026gacmp", matchCount: 12, totalPoints: 220, autoPoints: 58, teleopPoints: 132, endgamePoints: 30, fuelTotalOPR: 16.8, autoFuel: 38, teleopFuel: 118, totalFuel: 156, climbSuccessRate: 80, climbL1Rate: 8, climbL2Rate: 42, climbL3Rate: 30, autoClimbRate: 15, defenseEffectiveness: 68, shotOnTheMoveRate: 55, shotStationaryRate: 45, accuracyScore: 80, foulsPerMatch: 0.5, breakdownRate: 0, roles: ['Cycler', 'Defense', 'Clean-up'] },
]

// Convert snake_case Supabase row to camelCase for frontend
function mapRow(row: any) {
  return {
    teamNumber: row.team_number, nickname: row.nickname, eventKey: row.event_key,
    matchCount: row.match_count, totalPoints: row.total_points, autoPoints: row.auto_points,
    teleopPoints: row.teleop_points, endgamePoints: row.endgame_points,
    fuelTotalOPR: row.fuel_mopr, autoFuel: row.auto_fuel, teleopFuel: row.teleop_fuel,
    totalFuel: row.total_fuel, climbSuccessRate: row.climb_rate, climbL1Rate: row.climb_l1,
    climbL2Rate: row.climb_l2, climbL3Rate: row.climb_l3, autoClimbRate: row.auto_climb_rate,
    defenseEffectiveness: row.defense, accuracyScore: row.accuracy,
    shotOnTheMoveRate: row.shot_on_the_move_rate || 0, shotStationaryRate: row.shot_stationary_rate || 0,
    foulsPerMatch: row.fouls, breakdownRate: row.breakdown, roles: row.roles,
    notes: row.notes,
  }
}

router.get('/', async (_req: Request, res: Response) => {
  try {
    if (isSupabaseConnected && supabase) {
      const { data, error } = await supabase.from('teams').select('*')
      if (error) throw error
      const teams = data ? data.map(mapRow) : demoTeams
      res.json({ teams })
      return
    }
    res.json({ teams: demoTeams })
  } catch (err) {
    res.json({ teams: demoTeams, warning: 'Using demo data (Supabase unavailable)' })
  }
})

router.get('/:teamNumber', async (req: Request, res: Response) => {
  const num = parseInt(req.params.teamNumber)
  const team = demoTeams.find(t => t.teamNumber === num) || null
  res.json({ team })
})

export default router
