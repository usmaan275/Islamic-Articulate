import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Instructions from './pages/Instructions'
import TeamSelect from './pages/TeamSelect'
import Game from './pages/Game'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/instructions" element={<Instructions />} />
      <Route path="/teams" element={<TeamSelect />} />
      <Route path="/game" element={<Game />} />
    </Routes>
  )
}