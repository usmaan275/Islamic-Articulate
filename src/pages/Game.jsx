import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Board from '../components/Board'
import CardOverlay from '../components/CardOverlay'
import cards from '../data/cards'

const REAL_CATEGORIES = ['Figure', 'Nature', 'Surah', 'Action', 'Random']
const BOARD_CATEGORIES = [...REAL_CATEGORIES, 'Any']
const WIN_POSITION = 24
const DEFAULT_ROUND_TIME = 60

export default function Game() {
  const location = useLocation()
  const navigate = useNavigate()
  const teamCount = location.state?.teams || 2
  const teamNames =
    location.state?.teamNames ||
    Array.from({ length: teamCount }, (_, i) => `Team ${i + 1}`)
  const roundTime = location.state?.roundTime || DEFAULT_ROUND_TIME
  const maxSkips = location.state?.maxSkips ?? null // null = unlimited

  const [positions, setPositions] = useState(Array(teamCount).fill(0))
  const [currentTeam, setCurrentTeam] = useState(0)

  const [overlayVisible, setOverlayVisible] = useState(false)
  const [points, setPoints] = useState(0)
  const [timeLeft, setTimeLeft] = useState(roundTime)
  const [skipsUsed, setSkipsUsed] = useState(0)

  const [activeCategory, setActiveCategory] = useState(null)
  const [currentCard, setCurrentCard] = useState(null)

  const [finalStretch, setFinalStretch] = useState(false)
  const [winners, setWinners] = useState(null)

  // 🔥 Per-category used card memory
  const [usedCards, setUsedCards] = useState({
    Figure: new Set(),
    Nature: new Set(),
    Surah: new Set(),
    Action: new Set(),
    Random: new Set(),
  })

  const currentPosition = positions[currentTeam]

  const [boardStartIndex] = useState(
    () => Math.floor(Math.random() * BOARD_CATEGORIES.length)
  )
  const boardCategory = 
    BOARD_CATEGORIES[(currentPosition + boardStartIndex) % BOARD_CATEGORIES.length] 

  /* ------------------ HELPERS ------------------ */

  const getUnusedCard = (category) => {
    const used = usedCards[category]
    const available = cards.filter(card => !used.has(card.id))

    if (available.length === 0) {
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
    if (winners !== null) return

    const category =
      boardCategory === 'Any'
        ? REAL_CATEGORIES[Math.floor(Math.random() * REAL_CATEGORIES.length)]
        : boardCategory

    setActiveCategory(category)
    setCurrentCard(getUnusedCard(category))

    setOverlayVisible(true)
    setPoints(0)
    setSkipsUsed(0)
    setTimeLeft(roundTime)
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

  const nextCard = (correct = false, skipped = false) => {
    if (!currentCard || !activeCategory) return

    if (correct) setPoints(prev => prev + 1)
    if (skipped) setSkipsUsed(prev => prev + 1)

    setUsedCards(prev => {
      const next = { ...prev }
      const updated = new Set(next[activeCategory])
      updated.add(currentCard.id)
      next[activeCategory] = updated
      return next
    })

    let nextCategory = activeCategory
    if (boardCategory === 'Any') {
      nextCategory =
        REAL_CATEGORIES[Math.floor(Math.random() * REAL_CATEGORIES.length)]
      setActiveCategory(nextCategory)
    }

    setCurrentCard(getUnusedCard(nextCategory))
  }

  const skipDisabled = maxSkips !== null && skipsUsed >= maxSkips
  const skipsLeft = maxSkips === null ? null : Math.max(maxSkips - skipsUsed, 0)

  const handleSkip = () => {
    if (skipDisabled) return
    nextCard(false, true)
  }
  const handleCorrect = () => nextCard(true, false)

  /* ------------------ END ROUND ------------------ */

  const endRound = () => {
    const newPositions = [...positions]
    newPositions[currentTeam] += points
    setPositions(newPositions)

    const crossedFinish = newPositions[currentTeam] >= WIN_POSITION
    const stretchActive = finalStretch || crossedFinish
    if (crossedFinish && !finalStretch) {
      setFinalStretch(true)
    }

    const isLastInRotation = currentTeam === teamCount - 1

    if (stretchActive && isLastInRotation) {
      const maxScore = Math.max(...newPositions)
      const winningTeams = newPositions
        .map((score, i) => ({ score, i }))
        .filter(t => t.score === maxScore)
        .map(t => t.i)

      setWinners(winningTeams)
      setOverlayVisible(false)
      return
    }

    const nextTeam = (currentTeam + 1) % teamCount
    setCurrentTeam(nextTeam)
    setOverlayVisible(false)
    setPoints(0)
    setSkipsUsed(0)
    setTimeLeft(roundTime)
    setActiveCategory(null)
    setCurrentCard(null)
  }

  /* ------------------ AUTO END ROUND ------------------ */

  useEffect(() => {
    if (overlayVisible && timeLeft <= 0) {
      endRound()
    }
  }, [timeLeft, overlayVisible])

  /* ------------------ WINNER SCREEN ACTIONS ------------------ */

  const goHome = () => navigate('/')
  const playAgain = () => navigate('/setup')

  /* ------------------ RENDER ------------------ */

  return (
    <div className="screen">
      <Board positions={positions} teamCount={teamCount} startIndex={boardStartIndex} />

      <div className="bottom">
        {winners === null ? (
          <>
            <p>
              {teamNames[currentTeam]}'s turn next!
            </p>
            {finalStretch && <p className="final-stretch-note">🏁 Final round!</p>}
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
          skipsLeft={skipsLeft}
          skipDisabled={skipDisabled}
        />
      )}

      {winners !== null && (
        <div className="winner-screen">
          <div className="leaderboard">
            <h2 className="leaderboard-title">
              {winners.length > 1
                ? '🎉 It\'s a Tie! 🎉'
                : `🎉 ${teamNames[winners[0]]} Wins! 🎉`}
            </h2>
            <ol className="leaderboard-list">
              {positions
                .map((score, i) => ({ score, i }))
                .sort((a, b) => b.score - a.score)
                .map(({ score, i }, rank) => (
                  <li
                    key={i}
                    className={`leaderboard-row${winners.includes(i) ? ' winner-row' : ''}`}
                  >
                    <span className="leaderboard-rank">{rank + 1}</span>
                    <span className="leaderboard-name">{teamNames[i]}</span>
                    <span className="leaderboard-score">{score} pts</span>
                  </li>
                ))}
            </ol>

            <div className="winner-actions">
              <button className="secondary-btn" onClick={goHome}>Home</button>
              <button onClick={playAgain}>Play Again</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
