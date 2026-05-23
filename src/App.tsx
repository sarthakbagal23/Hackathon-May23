import { Routes, Route } from 'react-router-dom'
import { Nav } from '@/components/layout/Nav'
import Home from '@/pages/Home'
import Chat from '@/pages/Chat'
import PickList from '@/pages/PickList'
import Strategy from '@/pages/Strategy'

function App() {
  return (
    <div className="min-h-screen bg-frc-navy text-frc-text flex flex-col">
      <Nav />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/pick-list" element={<PickList />} />
          <Route path="/strategy" element={<Strategy />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
