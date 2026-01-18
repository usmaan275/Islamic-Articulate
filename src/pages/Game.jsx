import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Board from '../components/Board'
import CardOverlay from '../components/CardOverlay'
import cards from '../data/cards'

const REAL_CATEGORIES = ['Figure', 'Surah', 'Quality', 'Random', 'Fiqh']
const BOARD_CATEGORIES = [...REAL_CATEGORIES, 'Any']
const WIN_POSITION = 23
const ROUND_TIME = 60

export default function Game() {
  const location = useLocation()
  const teamCount = location.state?.teams || 2

  const [positions, setPositions] = useState(Array(teamCount).fill(0))
  const [currentTeam, setCurrentTeam] = useState(0)

  const [overlayVisible, setOverlayVisible] = useState(false)
  const [points, setPoints] = useState(0)
  const [timeLeft, setTimeLeft] = useState(ROUND_TIME)

  const [activeCategory, setActiveCategory] = useState(null)
  const [currentCard, setCurrentCard] = useState(null)
  const [winner, setWinner] = useState(null)

  // 🔥 Per-category used card memory
  const [usedCards, setUsedCards] = useState({
    Figure: new Set(),
    Surah: new Set(),
    Quality: new Set(),
    Random: new Set(),
    Fiqh: new Set(),
  })

  const currentPosition = positions[currentTeam]
  const boardCategory =
    BOARD_CATEGORIES[currentPosition % BOARD_CATEGORIES.length]

  /* ------------------ HELPERS ------------------ */

  const getRandomUnusedCard = (category) => {
    const used = usedCards[category]
    const available = cards.filter(card => !used.has(card.id))

    if (available.length === 0) {
      // reset category memory if exhausted
      setUsedCards(prev => ({
        ...prev,
        [category]: new Set(),
      }))
      return cards[Math.floor(Math.random() * cards.length)]
    }

    return available[Math.floor(Math.random() * available.length)]
  }

  /* ------------------ START ROUND ------------------ */

  const startRound = () => {
    if (winner !== null) return

    const category =
      boardCategory === 'Any'
        ? REAL_CATEGORIES[Math.floor(Math.random() * REAL_CATEGORIES.length)]
        : boardCategory

    setActiveCategory(category)
    setCurrentCard(getRandomUnusedCard(category))

    setOverlayVisible(true)
    setPoints(0)
    setTimeLeft(ROUND_TIME)
  }

  /* ------------------ TIMER ------------------ */

  useEffect(() => {
    if (!overlayVisible || timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [overlayVisible, timeLeft])

  /* ------------------ NEXT CARD ------------------ */

  const nextCard = (correct = false) => {
    if (!currentCard || !activeCategory) return

    if (correct) setPoints(prev => prev + 1)

    // mark card as used for this category
    setUsedCards(prev => {
      const next = { ...prev }
      const updated = new Set(next[activeCategory])
      updated.add(currentCard.id)
      next[activeCategory] = updated
      return next
    })

    // Any → new category every card
    let nextCategory = activeCategory
    if (boardCategory === 'Any') {
      nextCategory =
        REAL_CATEGORIES[Math.floor(Math.random() * REAL_CATEGORIES.length)]
      setActiveCategory(nextCategory)
    }

    setCurrentCard(getRandomUnusedCard(nextCategory))
  }

  const handleSkip = () => nextCard(false)
  const handleCorrect = () => nextCard(true)

  /* ------------------ END ROUND ------------------ */

  const endRound = () => {
    const newPositions = [...positions]
    newPositions[currentTeam] += points

    if (newPositions[currentTeam] >= WIN_POSITION) {
      setPositions(newPositions)
      setWinner(currentTeam)
      setOverlayVisible(false)
      return
    }

    setPositions(newPositions)
    setCurrentTeam(prev => (prev + 1) % teamCount)

    setOverlayVisible(false)
    setPoints(0)
    setTimeLeft(ROUND_TIME)
    setActiveCategory(null)
    setCurrentCard(null)
  }

  /* ------------------ AUTO END ROUND ------------------ */

  useEffect(() => {
    if (overlayVisible && timeLeft <= 0) {
      endRound()
    }
  }, [timeLeft, overlayVisible])

  /* ------------------ RENDER ------------------ */

  return (
    <div className="screen">
      <Board positions={positions} teamCount={teamCount} />

      <div className="bottom">
        {winner === null ? (
          <>
            <p>
              Team {currentTeam + 1}'s turn — Time left: {timeLeft}s
            </p>
            {!overlayVisible && (
              <button onClick={startRound}>Start Round</button>
            )}
          </>
        ) : (
          <p>Game Over</p>
        )}
      </div>

      {overlayVisible && currentCard && activeCategory && (
        <CardOverlay
          card={currentCard}
          category={activeCategory}
          onNext={handleCorrect}
          onSkip={handleSkip}
          timeLeft={timeLeft}
        />
      )}

      {winner !== null && (
        <div className="winner-screen">
          🎉 Team {winner + 1} Wins! 🎉
        </div>
      )}
    </div>
  )
}
