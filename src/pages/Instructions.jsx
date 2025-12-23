import { useNavigate } from 'react-router-dom'

export default function Instructions() {
  const navigate = useNavigate()

  return (
    <div className="screen instructions">
      <h2>How to Play</h2>

      <p>
        Islamic Articulate is a team game. One player describes a word while
        their team tries to guess it — without saying the word itself or any
        part of it.
      </p>

      <h3>Game Flow</h3>
      <ul>
        <li>Split into 2–4 teams.</li>
        <li>Teams take turns, one round at a time.</li>
        <li>Each round lasts <strong>60 seconds</strong>.</li>
        <li>
          For every correct guess, press <strong>Correct</strong> to earn a
          point and move to the next card.
        </li>
        <li>
          You may skip as many cards as you like, but skipped cards give no
          points.
        </li>
        <li>
          When time runs out, your team moves forward on the board by the number
          of points scored.
        </li>
      </ul>

      <h3>The Board & Categories</h3>
      <p>
        Each space on the board belongs to a category. The category you land on
        determines which word must be described.
      </p>

      <ul>
        <li>
          <strong>Figure</strong> – Prophets, Sahabah, angels, Qur’anic
          characters, and important Islamic historical figures.
        </li>
        <li>
          <strong>Surah</strong> – Names of chapters from the Qur’an, shown with
          their English meanings.
        </li>
        <li>
          <strong>Quality</strong> – Attributes and qualities, such as mercy,
          patience, strength, or anger.
        </li>
        <li>
          <strong>Random</strong> – Objects, animals, food, places, and natural
          things mentioned in the Qur’an.
        </li>
        <li>
          <strong>Fiqh</strong> – Islamic legal and worship terms commonly found
          in fiqh books.
        </li>
        <li>
          <strong>Any</strong> – A random category is chosen for every single
          card during the round.
        </li>
      </ul>

      <h3>Winning the Game</h3>
      <p>
        The first team to reach the end of the board wins the game.
      </p><p></p>

      <button onClick={() => navigate('/')}>Back</button>
    </div>
  )
}
