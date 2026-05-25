'use client'

import { useState } from 'react'
import {
  type Tab,
  RobotifyNav,
  DashboardOverview,
  GameRulesChat,
  StrategyBuilder,
  CodeSnippets,
  RookieChecklist,
  SmartScouting,
} from '@/components/frc-components'

export default function RobotifyApp() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard')

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-950 via-black to-blue-950 flex flex-col">
      <RobotifyNav activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 px-6 pb-6 overflow-hidden">
        {activeTab === 'dashboard' && <DashboardOverview onTabChange={setActiveTab} />}
        {activeTab === 'rules' && <GameRulesChat />}
        {activeTab === 'strategy' && <StrategyBuilder />}
        {activeTab === 'code' && <CodeSnippets />}
        {activeTab === 'checklist' && <RookieChecklist />}
        {activeTab === 'scouting' && <SmartScouting />}
      </main>
    </div>
  )
}
