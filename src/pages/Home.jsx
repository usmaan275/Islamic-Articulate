import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="screen center">
      <h1>Islamic Articulate</h1>
      <button onClick={() => navigate('/teams')}>Play</button>
      <button onClick={() => navigate('/instructions')}>Instructions</button>
    </div>
  )
}