import type { TeamStats } from '@/types/index'

export const demoTeams: TeamStats[] = [
  {
    teamNumber: 1833, nickname: "BEAN", eventKey: "2026gacmp",
    matchCount: 12, totalPoints: 245, autoPoints: 68, teleopPoints: 145, endgamePoints: 32,
    fuelTotalOPR: 18.5, autoFuel: 42, teleopFuel: 125, totalFuel: 167,
    climbSuccessRate: 92, climbL1Rate: 8, climbL2Rate: 33, climbL3Rate: 50,
    autoClimbRate: 25, defenseEffectiveness: 78, shotOnTheMoveRate: 65, shotStationaryRate: 35,
    accuracyScore: 88, foulsPerMatch: 0.3, breakdownRate: 0, roles: ['Cycler', 'Defense']
  },
  {
    teamNumber: 254, nickname: "The Cheesy Poofs", eventKey: "2026gacmp",
    matchCount: 12, totalPoints: 310, autoPoints: 75, teleopPoints: 180, endgamePoints: 45,
    fuelTotalOPR: 28.0, autoFuel: 55, teleopFuel: 195, totalFuel: 250,
    climbSuccessRate: 100, climbL1Rate: 0, climbL2Rate: 8, climbL3Rate: 92,
    autoClimbRate: 42, defenseEffectiveness: 45, shotOnTheMoveRate: 80, shotStationaryRate: 20,
    accuracyScore: 95, foulsPerMatch: 0.1, breakdownRate: 0, roles: ['Cycler', 'Passer']
  },
  {
    teamNumber: 1114, nickname: "Simbotics", eventKey: "2026gacmp",
    matchCount: 11, totalPoints: 278, autoPoints: 70, teleopPoints: 160, endgamePoints: 48,
    fuelTotalOPR: 24.0, autoFuel: 50, teleopFuel: 165, totalFuel: 215,
    climbSuccessRate: 91, climbL1Rate: 0, climbL2Rate: 9, climbL3Rate: 82,
    autoClimbRate: 36, defenseEffectiveness: 55, shotOnTheMoveRate: 75, shotStationaryRate: 25,
    accuracyScore: 92, foulsPerMatch: 0.2, breakdownRate: 8, roles: ['Cycler', 'Passer', 'Thief']
  },
  {
    teamNumber: 1678, nickname: "Citrus Circuits", eventKey: "2026gacmp",
    matchCount: 12, totalPoints: 262, autoPoints: 65, teleopPoints: 155, endgamePoints: 42,
    fuelTotalOPR: 22.0, autoFuel: 48, teleopFuel: 150, totalFuel: 198,
    climbSuccessRate: 83, climbL1Rate: 17, climbL2Rate: 0, climbL3Rate: 67,
    autoClimbRate: 30, defenseEffectiveness: 60, shotOnTheMoveRate: 60, shotStationaryRate: 40,
    accuracyScore: 89, foulsPerMatch: 0.4, breakdownRate: 0, roles: ['Cycler', 'Passer']
  },
  {
    teamNumber: 195, nickname: "Cyber Knights", eventKey: "2026gacmp",
    matchCount: 10, totalPoints: 190, autoPoints: 45, teleopPoints: 118, endgamePoints: 27,
    fuelTotalOPR: 14.5, autoFuel: 30, teleopFuel: 100, totalFuel: 130,
    climbSuccessRate: 70, climbL1Rate: 20, climbL2Rate: 40, climbL3Rate: 10,
    autoClimbRate: 10, defenseEffectiveness: 85, shotOnTheMoveRate: 40, shotStationaryRate: 60,
    accuracyScore: 72, foulsPerMatch: 1.2, breakdownRate: 10, roles: ['Defense', 'Clean-up']
  },
  {
    teamNumber: 33, nickname: "Killer Bees", eventKey: "2026gacmp",
    matchCount: 12, totalPoints: 220, autoPoints: 58, teleopPoints: 132, endgamePoints: 30,
    fuelTotalOPR: 16.8, autoFuel: 38, teleopFuel: 118, totalFuel: 156,
    climbSuccessRate: 80, climbL1Rate: 8, climbL2Rate: 42, climbL3Rate: 30,
    autoClimbRate: 15, defenseEffectiveness: 68, shotOnTheMoveRate: 55, shotStationaryRate: 45,
    accuracyScore: 80, foulsPerMatch: 0.5, breakdownRate: 0, roles: ['Cycler', 'Defense', 'Clean-up']
  },
  {
    teamNumber: 148, nickname: "Robowrangers", eventKey: "2026gacmp",
    matchCount: 11, totalPoints: 234, autoPoints: 60, teleopPoints: 140, endgamePoints: 34,
    fuelTotalOPR: 17.5, autoFuel: 40, teleopFuel: 128, totalFuel: 168,
    climbSuccessRate: 85, climbL1Rate: 15, climbL2Rate: 35, climbL3Rate: 35,
    autoClimbRate: 22, defenseEffectiveness: 50, shotOnTheMoveRate: 50, shotStationaryRate: 50,
    accuracyScore: 82, foulsPerMatch: 0.3, breakdownRate: 9, roles: ['Passer', 'Cycler']
  },
  {
    teamNumber: 2168, nickname: "Aluminum Falcons", eventKey: "2026gacmp",
    matchCount: 10, totalPoints: 152, autoPoints: 35, teleopPoints: 95, endgamePoints: 22,
    fuelTotalOPR: 10.2, autoFuel: 20, teleopFuel: 85, totalFuel: 105,
    climbSuccessRate: 55, climbL1Rate: 25, climbL2Rate: 20, climbL3Rate: 10,
    autoClimbRate: 5, defenseEffectiveness: 40, shotOnTheMoveRate: 30, shotStationaryRate: 70,
    accuracyScore: 65, foulsPerMatch: 2.0, breakdownRate: 20, roles: ['Clean-up', 'Defense']
  },
  {
    teamNumber: 469, nickname: "Las Guerrillas", eventKey: "2026gacmp",
    matchCount: 11, totalPoints: 198, autoPoints: 52, teleopPoints: 120, endgamePoints: 26,
    fuelTotalOPR: 15.0, autoFuel: 35, teleopFuel: 108, totalFuel: 143,
    climbSuccessRate: 72, climbL1Rate: 18, climbL2Rate: 36, climbL3Rate: 18,
    autoClimbRate: 18, defenseEffectiveness: 58, shotOnTheMoveRate: 45, shotStationaryRate: 55,
    accuracyScore: 77, foulsPerMatch: 0.8, breakdownRate: 5, roles: ['Passer', 'Cycler']
  },
  {
    teamNumber: 5406, nickname: "Chaos", eventKey: "2026gacmp",
    matchCount: 12, totalPoints: 275, autoPoints: 72, teleopPoints: 158, endgamePoints: 45,
    fuelTotalOPR: 23.0, autoFuel: 52, teleopFuel: 168, totalFuel: 220,
    climbSuccessRate: 95, climbL1Rate: 5, climbL2Rate: 0, climbL3Rate: 90,
    autoClimbRate: 38, defenseEffectiveness: 48, shotOnTheMoveRate: 85, shotStationaryRate: 15,
    accuracyScore: 91, foulsPerMatch: 0.1, breakdownRate: 8, roles: ['Cycler', 'Passer', 'Thief']
  },
  {
    teamNumber: 6328, nickname: "Mechanical Memories", eventKey: "2026gacmp",
    matchCount: 9, totalPoints: 165, autoPoints: 40, teleopPoints: 98, endgamePoints: 27,
    fuelTotalOPR: 11.5, autoFuel: 25, teleopFuel: 88, totalFuel: 113,
    climbSuccessRate: 60, climbL1Rate: 30, climbL2Rate: 20, climbL3Rate: 10,
    autoClimbRate: 8, defenseEffectiveness: 35, shotOnTheMoveRate: 25, shotStationaryRate: 75,
    accuracyScore: 60, foulsPerMatch: 1.5, breakdownRate: 11, roles: ['Clean-up', 'Defense']
  },
  {
    teamNumber: 2910, nickname: "Jack in the Bot", eventKey: "2026gacmp",
    matchCount: 12, totalPoints: 248, autoPoints: 62, teleopPoints: 148, endgamePoints: 38,
    fuelTotalOPR: 19.0, autoFuel: 44, teleopFuel: 132, totalFuel: 176,
    climbSuccessRate: 88, climbL1Rate: 12, climbL2Rate: 28, climbL3Rate: 48,
    autoClimbRate: 29, defenseEffectiveness: 62, shotOnTheMoveRate: 70, shotStationaryRate: 30,
    accuracyScore: 86, foulsPerMatch: 0.3, breakdownRate: 0, roles: ['Cycler', 'Passer']
  },
]
