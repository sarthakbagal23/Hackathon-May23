import { Router } from 'express'
import type { Request, Response } from 'express'
import { getChatResponse } from '../lib/gemini.js'

const router = Router()

const fallbackResponses: Record<string, string> = {
  rules: `There are 504 Fuel game pieces per match in the 2026 REBUILT game. Fuel (5.91in yellow foam balls) score 1 point each when deposited into an active hub. Hubs are active during Auto and Endgame, and alternate during Teleop shifts based on which alliance wins Auto. Check the official 2026 Game Manual for the full rules.`,
  strategy: `Based on your robot's capabilities, here's a match strategy:

**Auto (0-20s):** Score Fuel into the nearest active hub. If you can auto-climb, prioritize that for bonus points. Move to a strategic position near the Trench or Neutral Zone.

**Teleop Shifts 1&2 (20-100s):** If your hub is active, play offense - score Fuel aggressively. If inactive, play defense on the opponent's highest scorer or coordinate with partners for passing plays.

**Shifts 3&4 (100-140s):** Same logic. Track which alliance has energize/supercharge potential. If you're close to 100 Fuel, prioritize scoring to secure the RP.

**Endgame (140-160s):** Both hubs are active. Score remaining Fuel, then prioritize climbing. L3 gives 12 points. Start your climb with at least 10 seconds remaining.`,
  code: `Here's a basic WPILib Java tank drive snippet:

\`\`\`java
// Tank Drive - put this in your Robot.java or relevant subsystem
public class DriveSubsystem extends SubsystemBase {
  private final PWMSparkMax leftMotor = new PWMSparkMax(1); // [FILL_IN_YOUR_VALUES]
  private final PWMSparkMax rightMotor = new PWMSparkMax(2);
  private final DifferentialDrive drive = new DifferentialDrive(leftMotor, rightMotor);

  public void tankDrive(double leftSpeed, double rightSpeed) {
    drive.tankDrive(leftSpeed, rightSpeed);
  }

  @Override
  public void periodic() {
    // Update drive logic here if needed
  }
}
\`\`\`

Make sure to add the correct motor controller imports and CAN IDs.`,
  checklist: `Here's a rookie checklist for your first season:

1. **Pre-Season:** Build a team website, drum up parent support, and establish a regular meeting schedule.
2. **Kickoff:** Watch the game reveal live as a team. Set up a shared drive and communication channel.
3. **Build Season:** Focus on a Minimum Viable Robot. Don't overcomplicate. Practice driving EVERY DAY.
4. **Competition:** Arrive early, inspect your robot, and have backup parts. Scout every match.
5. **Awards:** Consider Chairman's and Engineering Inspiration. Document everything.`,
  scouting: `Based on your robot and the scouted alliance pool, here's my analysis:

1. **BEAN (1833)** - Top compatibility. High fuel OPR, reliable L3 climbs. Excellent offense partner.
2. **The Cheesy Poofs (254)** - Elite offensive power. Their 92% L3 climb rate is unmatched. Pick if you need pure scoring.
3. **Simbotics (1114)** - Balanced cycler/thief. Good at fuel volume and disrupting opponents.
4. **Citrus Circuits (1678)** - Solid passer/cycler. Lower fouls, consistent performer.
5. **Killer Bees (33)** - Good all-around. Defense role capability makes them flexible.

**Red flags:** Cyber Knights (195) has 1.2 fouls/match and 10% breakdown rate. Use cautiously.`,
}

const defaultFallback = `I'm Maneuver 2026, your FRC strategy assistant. The AI service is temporarily unavailable, but I'm here with pre-loaded knowledge. Try asking in one of the specific modes (Rules, Strategy, Code, Checklist, or Scouting) for targeted help.`

router.post('/', async (req: Request, res: Response) => {
  try {
    const { mode, messages } = req.body
    if (!mode || !Array.isArray(messages)) {
      res.status(400).json({ error: 'Missing mode or messages' })
      return
    }
    try {
      const { text, model: usedModel } = await getChatResponse(mode, messages)
      res.json({ response: text, source: 'groq', model: usedModel })
    } catch (aiError) {
      const errMsg = aiError instanceof Error ? aiError.message : String(aiError)
      console.error('All Gemini models failed:', errMsg)
      const fallback = fallbackResponses[mode] || defaultFallback
      res.json({ response: fallback, source: 'static-fallback', error: errMsg })
    }
  } catch (err) {
    res.status(500).json({ error: 'AI request failed', detail: String(err) })
  }
})

export default router
