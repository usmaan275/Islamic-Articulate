import { useNavigate } from 'react-router-dom'

export default function TeamSelect() {
  const navigate = useNavigate()

  function startGame(num) {
    navigate('/game', { state: { teams: num } })
  }

  return (
    <div className="screen center">
      <h2>Select Teams</h2>
      {[2, 3, 4].map(n => (
        <button key={n} onClick={() => startGame(n)}>
          {n}
        </button>
      ))}
    </div>
  )
}