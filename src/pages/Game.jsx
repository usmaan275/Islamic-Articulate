import React, { useState, useEffect } from 'react'
import Board from '../components/Board'
import CardOverlay from '../components/CardOverlay'
import cards from '../data/cards'

const REAL_CATEGORIES = ['Figure', 'Surah', 'Quality', 'Random', 'Fiqh']
const BOARD_CATEGORIES = [...REAL_CATEGORIES, 'Any']
const WIN_POSITION = 23

export default function Game() {
  const teamCount = 2

  const [positions, setPositions] = useState(Array(teamCount).fill(0))
  const [currentTeam, setCurrentTeam] = useState(0)

  const [overlayVisible, setOverlayVisible] = useState(false)
  const [points, setPoints] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)

  const [activeCategory, setActiveCategory] = useState(null)
  const [winner, setWinner] = useState(null)

  // 🔥 CATEGORY INDEXES
  const [categoryIndexes, setCategoryIndexes] = useState({
    Figure: 0,
    Surah: 0,
    Quality: 0,
    Random: 0,
    Fiqh: 0,
  })

  const [hasInitialised, setHasInitialised] = useState(false)

  const currentPosition = positions[currentTeam]
  const boardCategory =
    BOARD_CATEGORIES[currentPosition % BOARD_CATEGORIES.length]

  /* CURRENT CARD BASED ON ACTIVE CATEGORY */
  const currentCard =
    activeCategory !== null
      ? cards[categoryIndexes[activeCategory]]
      : null

  const incrementCategoryOnce = (category) => {
    if (!category) return

    setCategoryIndexes((prev) => ({
      ...prev,
      [category]: (prev[category] + 1) % cards.length,
    }))
  }
  
  /* START ROUND */
  const startRound = () => {
    if (winner !== null) return

    // 🔥 One-time random pivot
    if (!hasInitialised) {
      const pivot = Math.floor(Math.random() * cards.length)
      setCategoryIndexes({
        Figure: pivot,
        Surah: pivot + 23,
        Quality: pivot + 46,
        Random: pivot + 69,
        Fiqh: pivot + 92,
      })
      setHasInitialised(true)
    }

    if (boardCategory === 'Any') {
      setActiveCategory(
        REAL_CATEGORIES[Math.floor(Math.random() * REAL_CATEGORIES.length)]
      )
    } else {
      setActiveCategory(boardCategory)
    }

    setOverlayVisible(true)
    setPoints(0)
    setTimeLeft(60)
  }

  /* TIMER */
  useEffect(() => {
    if (!overlayVisible || timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [overlayVisible, timeLeft])

  /* NEXT CARD */
  const nextCard = (correct = false) => {
    if (correct) setPoints((prev) => prev + 1)

    setCategoryIndexes((prev) => ({
      ...prev,
      [activeCategory]:
        (prev[activeCategory] + 1) % cards.length,
    }))

    // 🔥 Any changes category EVERY card
    if (boardCategory === 'Any') {
      setActiveCategory(
        REAL_CATEGORIES[Math.floor(Math.random() * REAL_CATEGORIES.length)]
      )
    }
  }

  const handleSkip = () => nextCard(false)
  const handleCorrect = () => nextCard(true)

  /* END ROUND */
  const endRound = () => {
    // 🔥 ensure fresh card next round
    incrementCategoryOnce(activeCategory)

    const newPositions = [...positions]
    newPositions[currentTeam] += points

    if (newPositions[currentTeam] >= WIN_POSITION) {
      setPositions(newPositions)
      setWinner(currentTeam)
      setOverlayVisible(false)
      return
    }

    setPositions(newPositions)
    setCurrentTeam((prev) => (prev + 1) % teamCount)
    setOverlayVisible(false)
    setPoints(0)
    setTimeLeft(60)
    setActiveCategory(null)
  }

  /* AUTO END ROUND */
  useEffect(() => {
    if (overlayVisible && timeLeft <= 0) {
      endRound()
    }
  }, [timeLeft, overlayVisible])

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

      {overlayVisible && activeCategory && currentCard && (
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
