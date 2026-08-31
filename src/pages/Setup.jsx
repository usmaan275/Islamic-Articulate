import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const TEAM_OPTIONS = [1, 2, 3, 4]
const TIME_PRESETS = [30, 45, 60, 90, 120]
const DEFAULT_ROUND_TIME = 60
const DEFAULT_MAX_SKIPS = 3

export default function Setup() {
  const navigate = useNavigate()

  const [teamCount, setTeamCount] = useState(2)
  // Always holds all 4 slots — inactive ones just aren't sent when the game starts
  const [teamNames, setTeamNames] = useState(['Team 1', 'Team 2', 'Team 3', 'Team 4'])

  const [timeMode, setTimeMode] = useState('preset') // 'preset' | 'custom'
  const [roundTime, setRoundTime] = useState(DEFAULT_ROUND_TIME)

  const [skipsEnabled, setSkipsEnabled] = useState(false)
  const [maxSkips, setMaxSkips] = useState(DEFAULT_MAX_SKIPS)

  function handleTeamNameChange(index, value) {
    setTeamNames(prev => {
      const next = [...prev]
      next[index] = value
      return next
    })
  }

  function handleTimeSelectChange(e) {
    const value = e.target.value
    if (value === 'custom') {
      setTimeMode('custom')
    } else {
      setTimeMode('preset')
      setRoundTime(Number(value))
    }
  }

  function handleCustomTimeChange(e) {
    const value = e.target.value
    setRoundTime(value === '' ? '' : Number(value))
  }

  function handleStart() {
    const finalTeamNames = teamNames
      .slice(0, teamCount)
      .map((name, i) => (name.trim() === '' ? `Team ${i + 1}` : name.trim()))
    const finalRoundTime =
      roundTime && Number(roundTime) > 0 ? Number(roundTime) : DEFAULT_ROUND_TIME
    const finalMaxSkips =
      skipsEnabled && Number(maxSkips) >= 0 ? Number(maxSkips) : null

    navigate('/game', {
      state: {
        teams: teamCount,
        teamNames: finalTeamNames,
        roundTime: finalRoundTime,
        maxSkips: finalMaxSkips,
      },
    })
  }

  return (
    <div className="screen center">
      <h2>Game Setup</h2>

      <div className="setup-container">
        <section className="setup-section">
          <p className="setup-label">Number of teams</p>
          <div className="team-count-grid">
            {TEAM_OPTIONS.map(n => (
              <button
                key={n}
                type="button"
                className={n === teamCount ? 'toggle active' : 'toggle'}
                onClick={() => setTeamCount(n)}
              >
                {n}
              </button>
            ))}
          </div>

          <div className="team-names">
            {teamNames.map((name, i) => (
              <input
                key={i}
                type="text"
                className={i >= teamCount ? 'inactive' : ''}
                value={name}
                placeholder={`Team ${i + 1}`}
                onChange={e => handleTeamNameChange(i, e.target.value)}
                disabled={i >= teamCount}
              />
            ))}
          </div>
        </section>

        <section className="setup-section">
          <p className="setup-label">Time per round</p>
          <div className="setup-row">
            <select
              value={timeMode === 'custom' ? 'custom' : roundTime}
              onChange={handleTimeSelectChange}
            >
              {TIME_PRESETS.map(t => (
                <option key={t} value={t}>{t}s</option>
              ))}
              <option value="custom">Custom</option>
            </select>

            <input
              className={`number-input${timeMode === 'custom' ? '' : ' inactive'}`}
              type="number"
              inputMode="numeric"
              value={roundTime}
              onChange={handleCustomTimeChange}
              placeholder="60"
              disabled={timeMode !== 'custom'}
              tabIndex={timeMode === 'custom' ? 0 : -1}
              aria-hidden={timeMode !== 'custom'}
            />
          </div>
        </section>

        <section className="setup-section">
          <p className="setup-label">Skips per round</p>
          <div className="setup-row">
            <label className="skip-toggle">
              <input
                type="checkbox"
                checked={skipsEnabled}
                onChange={e => setSkipsEnabled(e.target.checked)}
              />
              Limit skips
            </label>

            <input
              className={`number-input${skipsEnabled ? '' : ' inactive'}`}
              type="number"
              inputMode="numeric"
              min={0}
              value={maxSkips}
              onChange={e => setMaxSkips(e.target.value)}
              placeholder="..."
              disabled={!skipsEnabled}
              tabIndex={skipsEnabled ? 0 : -1}
              aria-hidden={!skipsEnabled}
            />
          </div>
        </section>

        <button className="start-button" onClick={handleStart}>
          Start Game
        </button>
      </div>
    </div>
  )
}
