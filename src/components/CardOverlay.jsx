import { useEffect, useRef, useState } from 'react'

export default function CardOverlay({
  card,
  category,
  onNext,
  onSkip,
  timeLeft,
  skipsLeft = null,
  skipDisabled = false,
}) {
  const urgent = timeLeft <= 10
  const [flash, setFlash] = useState(null) // 'correct' | 'skip' | null
  const flashTimeout = useRef(null)

  const triggerFlash = (type) => {
    if (flashTimeout.current) clearTimeout(flashTimeout.current)
    setFlash(null)
    // brief delay so the animation restarts even if the same key is mashed rapidly
    requestAnimationFrame(() => setFlash(type))
    flashTimeout.current = setTimeout(() => setFlash(null), 350)
  }

  const handleCorrect = () => {
    triggerFlash('correct')
    onNext()
  }

  const handleSkip = () => {
    if (skipDisabled) return
    triggerFlash('skip')
    onSkip()
  }

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.ctrlKey || e.metaKey || e.altKey) return
      if (e.key === 'Enter') {
        e.preventDefault()
        handleCorrect()
      } else if (e.key === 's' || e.key === 'S') {
        e.preventDefault()
        handleSkip()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onNext, onSkip, skipDisabled])

  useEffect(() => {
    return () => {
      if (flashTimeout.current) clearTimeout(flashTimeout.current)
    }
  }, [])

  return (
    <div className="card-overlay">
      {flash && <div className={`flash-overlay flash-${flash}`} />}

      <div className="card-top">
        <div className="card-fact">
          <span className="card-fact-label">Figure</span>
          <span className="card-fact-value">{card.Figure}</span>
        </div>
        <div className="card-fact">
          <span className="card-fact-label">Nature</span>
          <span className="card-fact-value">{card.Nature}</span>
        </div>
        <div className="card-fact">
          <span className="card-fact-label">Surah</span>
          <span className="card-fact-value">{card.Surah}</span>
        </div>
        <div className="card-fact">
          <span className="card-fact-label">Action</span>
          <span className="card-fact-value">{card.Action}</span>
        </div>
        <div className="card-fact">
          <span className="card-fact-label">Random</span>
          <span className="card-fact-value">{card.Random}</span>
        </div>
      </div>

      <div className="card-main">
        <div className="card-category">{category}</div>
        <div className="card-value">{card[category]}</div>
      </div>

      <div className={`card-timer${urgent ? ' urgent' : ''}`}>{timeLeft}s</div>

      <div className="card-actions">
        <button
          className={`skip-btn${skipDisabled ? ' disabled' : ''}`}
          onClick={handleSkip}
          disabled={skipDisabled}
        >
          Skip{skipsLeft !== null ? ` (${skipsLeft})` : ''}
        </button>
        <button className="correct-btn" onClick={handleCorrect}>
          Correct
        </button>
      </div>
    </div>
  )
}
