import React, { useState, useEffect } from 'react'
import Board from '../components/Board'
import CardOverlay from '../components/CardOverlay'
import cards from '../data/cards'

const REAL_CATEGORIES = ['Being', 'Surah', 'Quality', 'Random', 'Fiqh']
const BOARD_CATEGORIES = [...REAL_CATEGORIES, 'Any']
const WIN_POSITION = 23

export default function Game() {
  const teamCount = 2

  const [positions, setPositions] = useState(Array(teamCount).fill(0))
  const [currentTeam, setCurrentTeam] = useState(0)

  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [overlayVisible, setOverlayVisible] = useState(false)

  const [points, setPoints] = useState(0)
  const [timeLeft, setTimeLeft] = useState(5)

  const [activeCategory, setActiveCategory] = useState(null)
  const [winner, setWinner] = useState(null)

  const currentPosition = positions[currentTeam]
  const boardCategory =
    BOARD_CATEGORIES[currentPosition % BOARD_CATEGORIES.length]

  const currentCard = cards[currentCardIndex]

  /* START ROUND */
  const startRound = () => {
    if (winner !== null) return

    const randomStart = Math.floor(Math.random() * cards.length)
    setCurrentCardIndex(randomStart)

    if (boardCategory === 'Any') {
      const randomCategory =
        REAL_CATEGORIES[Math.floor(Math.random() * REAL_CATEGORIES.length)]
      setActiveCategory(randomCategory)
    } else {
      setActiveCategory(boardCategory)
    }

    setOverlayVisible(true)
    setPoints(0)
    setTimeLeft(5)
  }

  /* TIMER */
  useEffect(() => {
    if (!overlayVisible) return
    if (timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [overlayVisible, timeLeft])

  /* NEXT CARD */
  const nextCard = (correct = false) => {
    if (correct) setPoints((prev) => prev + 1)
  
    setCurrentCardIndex((prev) => (prev + 1) % cards.length)
  
    // 🔥 Any = new random category every card
    if (boardCategory === 'Any') {
      setActiveCategory(REAL_CATEGORIES[Math.floor(Math.random() * REAL_CATEGORIES.length)])
    }
  }  

  const handleSkip = () => nextCard(false)
  const handleCorrect = () => nextCard(true)

  /* END ROUND */
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
    setCurrentTeam((prev) => (prev + 1) % teamCount)
    setOverlayVisible(false)
    setPoints(0)
    setTimeLeft(5)
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

      {overlayVisible && activeCategory && (
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
