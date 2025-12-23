import React, { useState, useEffect } from 'react'
import Board from '../components/Board'
import CardOverlay from '../components/CardOverlay'
import cards from '../data/cards'

export default function Game() {
  const teamCount = 2 // can be from route state
  const [positions, setPositions] = useState(Array(teamCount).fill(0))
  const [currentTeam, setCurrentTeam] = useState(0)
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [overlayVisible, setOverlayVisible] = useState(false)
  const [points, setPoints] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)

  const boardCategories = ['Being', 'Surah', 'Quality', 'Random', 'Fiqh', 'Any']

  const currentPosition = positions[currentTeam]
  const currentCategory = boardCategories[currentPosition % boardCategories.length]

  const currentCard = cards[currentCardIndex]

  // Start round
  const startRound = () => {
    const randomStart = Math.floor(Math.random() * cards.length)
    setCurrentCardIndex(randomStart)
    setOverlayVisible(true)
    setPoints(0)
    setTimeLeft(30)
  }

  // Timer effect
  useEffect(() => {
    if (!overlayVisible) return
    if (timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [overlayVisible, timeLeft])

  // Move to next card
  const nextCard = (correct = false) => {
    if (correct) setPoints((prev) => prev + 1)
    const nextIndex = (currentCardIndex + 1) % cards.length
    setCurrentCardIndex(nextIndex)
  }

  // Skip allowed infinitely
  const handleSkip = () => nextCard(false)

  // End round
  const endRound = () => {
    const newPositions = [...positions]
    newPositions[currentTeam] += points
    setPositions(newPositions)

    setCurrentTeam((prev) => (prev + 1) % teamCount)
    setOverlayVisible(false)
    setPoints(0)
    setTimeLeft(30)
  }

  // Auto end round when timer reaches 0
  useEffect(() => {
    if (overlayVisible && timeLeft <= 0) endRound()
  }, [timeLeft, overlayVisible])

  return (
    <div className="screen">
      <Board positions={positions} teamCount={teamCount} />
      <div className="bottom">
        <p>
          Team {currentTeam + 1}'s turn. Time left: {timeLeft}s
        </p>
        {!overlayVisible && <button onClick={startRound}>Start Round</button>}
      </div>

      {overlayVisible && (
        <CardOverlay
          card={currentCard}
          category={currentCategory}
          onNext={() => nextCard(true)}
          onSkip={handleSkip}
        />
      )}
    </div>
  )
}
