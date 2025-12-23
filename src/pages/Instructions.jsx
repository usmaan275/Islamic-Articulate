import { useNavigate } from 'react-router-dom'

export default function Instructions() {
  const navigate = useNavigate()

  return (
    <div className="screen">
      <h2>How to Play</h2>
      <p>
        Describe the word without saying it. Your team must guess correctly
        before time runs out. Each correct answer moves your team forward.
      </p>

      <button onClick={() => navigate('/')}>Back</button>
    </div>
  )
}