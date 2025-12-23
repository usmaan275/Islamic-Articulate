import React from 'react'

export default function CardOverlay({ card, category, onNext, onSkip }) {
  if (!card) return null

  // Top 5 words
  const topWords = [card.Being, card.Surah, card.Quality, card.Random, card.Fiqh]

  // Main word depends on the current category
  const mainWord =
    category === 'Any'
      ? topWords[Math.floor(Math.random() * topWords.length)]
      : card[category]

  return (
    <div className="card-overlay">
      <div className="card">
        <div className="top-words">
          {topWords.map((word, idx) => (
            <span key={idx}>{word}</span>
          ))}
        </div>

        <div className="main-word">{mainWord}</div>

        <div className="card-buttons">
          <button onClick={onSkip}>Skip</button>
          <button onClick={onNext}>Correct</button>
        </div>
      </div>
    </div>
  )
}
