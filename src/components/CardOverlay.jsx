export default function CardOverlay({
  card,
  category,
  onNext,
  onSkip,
  timeLeft,
}) {
  return (
    <div className="card-overlay">
      <div className="card-top">
        <div><strong>Figure:</strong> {card.Figure}</div>
        <div><strong>Surah:</strong> {card.Surah}</div>
        <div><strong>Quality:</strong> {card.Quality}</div>
        <div><strong>Random:</strong> {card.Random}</div>
        <div><strong>Fiqh:</strong> {card.Fiqh}</div>
      </div>

      <div className="card-category">{category}</div>

      <div className="card-value">{card[category]}</div>

      <div className="card-timer">{timeLeft}s</div>

      <div className="card-actions">
        <button className="skip-btn" onClick={onSkip}>
          Skip
        </button>
        <button className="correct-btn" onClick={onNext}>
          Correct
        </button>
      </div>
    </div>
  )
}
