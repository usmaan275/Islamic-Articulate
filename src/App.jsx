import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Instructions from './pages/Instructions'
import Setup from './pages/Setup'
import Game from './pages/Game'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/instructions" element={<Instructions />} />
      <Route path="/setup" element={<Setup />} />
      <Route path="/game" element={<Game />} />
    </Routes>
  )
}