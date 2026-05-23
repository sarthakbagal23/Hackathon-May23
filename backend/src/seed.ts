import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials. Set SUPABASE_URL and SUPABASE_SERVICE_KEY in .env')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const demoTeams = [
  { team_number: 1833, nickname: "BEAN", event_key: "2026gacmp", match_count: 12, total_points: 245, auto_points: 68, teleop_points: 145, endgame_points: 32, fuel_mopr: 18.5, auto_fuel: 42, teleop_fuel: 125, total_fuel: 167, climb_rate: 92, climb_l1: 8, climb_l2: 33, climb_l3: 50, auto_climb_rate: 25, defense: 78, accuracy: 88, fouls: 0.3, breakdown: 0, roles: ['Cycler', 'Defense'], notes: '' },
  { team_number: 254, nickname: "The Cheesy Poofs", event_key: "2026gacmp", match_count: 12, total_points: 310, auto_points: 75, teleop_points: 180, endgame_points: 45, fuel_mopr: 28.0, auto_fuel: 55, teleop_fuel: 195, total_fuel: 250, climb_rate: 100, climb_l1: 0, climb_l2: 8, climb_l3: 92, auto_climb_rate: 42, defense: 45, accuracy: 95, fouls: 0.1, breakdown: 0, roles: ['Cycler', 'Passer'], notes: '' },
  { team_number: 1114, nickname: "Simbotics", event_key: "2026gacmp", match_count: 11, total_points: 278, auto_points: 70, teleop_points: 160, endgame_points: 48, fuel_mopr: 24.0, auto_fuel: 50, teleop_fuel: 165, total_fuel: 215, climb_rate: 91, climb_l1: 0, climb_l2: 9, climb_l3: 82, auto_climb_rate: 36, defense: 55, accuracy: 92, fouls: 0.2, breakdown: 8, roles: ['Cycler', 'Passer', 'Thief'], notes: '' },
  { team_number: 1678, nickname: "Citrus Circuits", event_key: "2026gacmp", match_count: 12, total_points: 262, auto_points: 65, teleop_points: 155, endgame_points: 42, fuel_mopr: 22.0, auto_fuel: 48, teleop_fuel: 150, total_fuel: 198, climb_rate: 83, climb_l1: 17, climb_l2: 0, climb_l3: 67, auto_climb_rate: 30, defense: 60, accuracy: 89, fouls: 0.4, breakdown: 0, roles: ['Cycler', 'Passer'], notes: '' },
  { team_number: 195, nickname: "Cyber Knights", event_key: "2026gacmp", match_count: 10, total_points: 190, auto_points: 45, teleop_points: 118, endgame_points: 27, fuel_mopr: 14.5, auto_fuel: 30, teleop_fuel: 100, total_fuel: 130, climb_rate: 70, climb_l1: 20, climb_l2: 40, climb_l3: 10, auto_climb_rate: 10, defense: 85, accuracy: 72, fouls: 1.2, breakdown: 10, roles: ['Defense', 'Clean-up'], notes: 'Red flag: high fouls and breakdown rate' },
  { team_number: 33, nickname: "Killer Bees", event_key: "2026gacmp", match_count: 12, total_points: 220, auto_points: 58, teleop_points: 132, endgame_points: 30, fuel_mopr: 16.8, auto_fuel: 38, teleop_fuel: 118, total_fuel: 156, climb_rate: 80, climb_l1: 8, climb_l2: 42, climb_l3: 30, auto_climb_rate: 15, defense: 68, accuracy: 80, fouls: 0.5, breakdown: 0, roles: ['Cycler', 'Defense', 'Clean-up'], notes: '' },
  { team_number: 148, nickname: "Robowrangers", event_key: "2026gacmp", match_count: 11, total_points: 234, auto_points: 60, teleop_points: 140, endgame_points: 34, fuel_mopr: 17.5, auto_fuel: 40, teleop_fuel: 128, total_fuel: 168, climb_rate: 85, climb_l1: 15, climb_l2: 35, climb_l3: 35, auto_climb_rate: 22, defense: 50, accuracy: 82, fouls: 0.3, breakdown: 9, roles: ['Passer', 'Cycler'], notes: '' },
  { team_number: 2168, nickname: "Aluminum Falcons", event_key: "2026gacmp", match_count: 10, total_points: 152, auto_points: 35, teleop_points: 95, endgame_points: 22, fuel_mopr: 10.2, auto_fuel: 20, teleop_fuel: 85, total_fuel: 105, climb_rate: 55, climb_l1: 25, climb_l2: 20, climb_l3: 10, auto_climb_rate: 5, defense: 40, accuracy: 65, fouls: 2.0, breakdown: 20, roles: ['Clean-up', 'Defense'], notes: 'Red flag: high fouls and breakdown rate' },
  { team_number: 469, nickname: "Las Guerrillas", event_key: "2026gacmp", match_count: 11, total_points: 198, auto_points: 52, teleop_points: 120, endgame_points: 26, fuel_mopr: 15.0, auto_fuel: 35, teleop_fuel: 108, total_fuel: 143, climb_rate: 72, climb_l1: 18, climb_l2: 36, climb_l3: 18, auto_climb_rate: 18, defense: 58, accuracy: 77, fouls: 0.8, breakdown: 5, roles: ['Passer', 'Cycler'], notes: '' },
  { team_number: 5406, nickname: "Chaos", event_key: "2026gacmp", match_count: 12, total_points: 275, auto_points: 72, teleop_points: 158, endgame_points: 45, fuel_mopr: 23.0, auto_fuel: 52, teleop_fuel: 168, total_fuel: 220, climb_rate: 95, climb_l1: 5, climb_l2: 0, climb_l3: 90, auto_climb_rate: 38, defense: 48, accuracy: 91, fouls: 0.1, breakdown: 8, roles: ['Cycler', 'Passer', 'Thief'], notes: '' },
  { team_number: 6328, nickname: "Mechanical Memories", event_key: "2026gacmp", match_count: 9, total_points: 165, auto_points: 40, teleop_points: 98, endgame_points: 27, fuel_mopr: 11.5, auto_fuel: 25, teleop_fuel: 88, total_fuel: 113, climb_rate: 60, climb_l1: 30, climb_l2: 20, climb_l3: 10, auto_climb_rate: 8, defense: 35, accuracy: 60, fouls: 1.5, breakdown: 11, roles: ['Clean-up', 'Defense'], notes: 'Red flag: high breakdown rate' },
  { team_number: 2910, nickname: "Jack in the Bot", event_key: "2026gacmp", match_count: 12, total_points: 248, auto_points: 62, teleop_points: 148, endgame_points: 38, fuel_mopr: 19.0, auto_fuel: 44, teleop_fuel: 132, total_fuel: 176, climb_rate: 88, climb_l1: 12, climb_l2: 28, climb_l3: 48, auto_climb_rate: 29, defense: 62, accuracy: 86, fouls: 0.3, breakdown: 0, roles: ['Cycler', 'Passer'], notes: '' },
]

async function seed() {
  console.log('Seeding Supabase database...')
  for (const team of demoTeams) {
    const { error } = await supabase.from('teams').upsert(team, { onConflict: 'team_number' })
    if (error) {
      console.warn(`Failed to insert team ${team.team_number}:`, error.message)
    } else {
      console.log(`  - Team ${team.team_number}: ${team.nickname}`)
    }
  }
  console.log('Seeding complete.')
}

seed().catch(err => {
  console.error('Seed failed:', err)
  process.exit(1)
})
