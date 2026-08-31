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

  return (
    <div className="card-overlay">
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
          onClick={onSkip}
          disabled={skipDisabled}
        >
          Skip{skipsLeft !== null ? ` (${skipsLeft})` : ''}
        </button>
        <button className="correct-btn" onClick={onNext}>
          Correct
        </button>
      </div>
    </div>
  )
}