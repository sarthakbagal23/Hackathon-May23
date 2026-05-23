import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

import teamsRouter from './routes/teams.js'
import chatRouter from './routes/chat.js'
import pickListsRouter from './routes/pick-lists.js'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', version: '1.0.0', timestamp: new Date().toISOString() })
})

app.use('/api/teams', teamsRouter)
app.use('/api/chat', chatRouter)
app.use('/api/pick-lists', pickListsRouter)

app.listen(PORT, () => {
  console.log(`Maneuver 2026 API running on http://localhost:${PORT}`)
})
