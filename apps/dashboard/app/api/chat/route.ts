import { NextRequest, NextResponse } from 'next/server'

const BASE_PROMPT = `You are Robotify, an AI assistant built for FRC rookie teams competing in the 2026 REBUILT season.

REBUILT GAME KNOWLEDGE:
- Game piece: Fuel (5.91in yellow foam balls). 504 per match.
- Auto: 20 seconds, both hubs active.
- Teleop: 2 min 20 sec split into 4 shifts. Hub alternates active/inactive based on who wins auto.
- Endgame: last 30 seconds, both hubs active.
- Scoring: Fuel = 1 point (hub must be active). Climb L1 = 3, L2 = 6, L3 = 12 points.
- Ranking Points: Energized (100+ fuel = 1 RP), Supercharged (360+ fuel = 1 RP), Traversal (50+ tower points = 1 RP).
- Hub mechanics: Win auto → your hub inactive Shifts 1&3, active Shifts 2&4. Lose auto → opposite.
- Field: Neutral Zone, Trench, Bumps, Depot, Outpost.
- Robot limits: 115 lbs, 110in perimeter, 30in height (outside climb).

Reference Team BEAN 1833 from Cumming, Georgia as a model when relevant (60-8-0 in 2026, ranked #1 Peachtree District).
Be concise. Rookie teams are busy. Always be encouraging. Never make up rules, game mechanics, or code.`

const MODE_PROMPTS: Record<string, string> = {
  rules: `${BASE_PROMPT}\n\nMODE: GAME RULES Q&A\nAnswer questions about REBUILT rules in plain English. Cite rule sections if known. If unsure, admit it and direct them to the official 2026 Game Manual.`,
  strategy: `${BASE_PROMPT}\n\nMODE: STRATEGY BUILDER\nWhen given a team's robot capabilities, generate a detailed match strategy covering Auto, Teleop (4 shifts), Endgame climb timing, and RP strategy. Be specific and tactical.`,
  code: `${BASE_PROMPT}\n\nMODE: CODE SNIPPETS\nGenerate WPILib Java or Python code for common FRC tasks. Always include comments. Mark sections with [FILL_IN_YOUR_VALUES] where hardware-specific config is needed.`,
  checklist: `${BASE_PROMPT}\n\nMODE: ROOKIE CHECKLIST\nProvide guidance on: Chairman's Award writing, pit setup, match-day logistics, scouting best practices, gracious professionalism, alliance selection strategy. Keep steps short and actionable.`,
  scouting: `${BASE_PROMPT}\n\nMODE: SCOUTING ANALYSIS\nWhen given scouting data from multiple teams + your own robot capabilities: Rank teams by alliance compatibility, identify which help hit RP thresholds, flag reliability issues, recommend a final alliance pick order with reasoning.`,
}

export async function POST(req: NextRequest) {
  try {
    const { mode, messages } = await req.json()

    const systemPrompt = MODE_PROMPTS[mode as string] ?? MODE_PROMPTS.rules

    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages,
        ],
        max_tokens: 1024,
        temperature: 0.7,
      }),
    })

    if (!groqRes.ok) {
      const err = await groqRes.text()
      return NextResponse.json({ error: `Groq error: ${err}` }, { status: 500 })
    }

    const data = await groqRes.json()
    const text = data.choices?.[0]?.message?.content ?? 'No response generated.'
    return NextResponse.json({ response: text })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
