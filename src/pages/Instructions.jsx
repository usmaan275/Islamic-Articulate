import { useNavigate } from 'react-router-dom'

export default function Instructions() {
  const navigate = useNavigate()

  return (
    <div className="screen instructions">
      <h2>How to Play 🕌</h2>
  
      <p>
        If you know what <strong>Charades</strong> is, you’ll feel right at home.
        <br />
        <strong>Islamic Articulate</strong> is similar — but instead of acting,
        you <strong>describe words using only speech</strong>.
      </p>
  
      <p>
        You will be given a <strong>random word</strong>, and your goal is to help
        your teammates guess it <strong>without saying the word itself</strong>.
        Think clearly, speak quickly, and trust your team 🤝
      </p>
  
      <h3>Describing the Word (Important Rules ⚠️)</h3>
      <ul>
        <li>
          While describing the word, you <strong>must not</strong>:
          <ul>
            <li>Say the word itself</li>
            <li>Say any <strong>part</strong> of the word</li>
            <li>Spell it out</li>
            <li>Use rhyming words</li>
            <li>Use translations of the word</li>
          </ul>
        </li>

        <li>
          However you <strong>are</strong> allowed to:
          <ul>
            <li>Explain what it is used for</li>
            <li>Describe its meaning or purpose</li>
            <li>Break up the word and describe it in parts</li>
            <li>Give examples or scenarios (as long as they don’t break the rules)</li>
          </ul>
        </li>

        <li>
          Your teammates can shout out as many guesses as they like until time runs out ⏳
        </li>
      </ul>
  
      <h3>Teams 👥</h3>
      <p>You can choose from <strong>four team options</strong>:</p>
      <ul>
        <li>
          <strong>1 Team</strong> – Practice mode. Just you and friends, no
          competition, just halal fun 😄
        </li>
        <li>
          <strong>2 Teams</strong> – Classic competitive mode. May the best team
          win 🏆
        </li>
        <li>
          <strong>3 Teams</strong> – Often the most enjoyable… and hey,
          <strong> three is Sunnah</strong> 🙂
        </li>
        <li>
          <strong>4 Teams</strong> – More people, more barakah ✨ Big energy, lots
          of chaos.
        </li>
      </ul>
  
      <h3>Game Flow 🎮</h3>
      <ul>
        <li>Each round lasts <strong>60 seconds</strong>.</li>
        <li>One player describes while the rest of the team guesses.</li>
        <li>
          For every correct guess, press <strong>Correct</strong> to earn a point
          and move to the next card.
        </li>
        <li>
          If a word feels too difficult, press <strong>Skip</strong>.
        </li>
        <li>
          Skipped cards give <strong>no points</strong>, but you’re welcome to make
          your own house rules — like limiting skips if you’re feeling confident
          😏
        </li>
        <li>
          When time runs out, your team moves forward on the board by the number of
          points scored.
        </li>
      </ul>
  
      <h3>Categories (Islamic Edition ☪️)</h3>
      <p>
        This is an <strong>Islamic version of Articulate</strong>, so every word
        belongs to one of the following categories:
      </p>
  
      <ul>
        <li>
          <strong>Figure</strong> – This can be the name of a person connected to
          Islam. It may include prophets, companions, angels, famous scholars, or
          individuals mentioned in Islamic history — whether as role models or as
          lessons.
        </li>
        <li>
          <strong>Surah</strong> – The name of a chapter from the Qur’an. The card
          shows the Arabic name, with the English meaning in brackets. Players may
          guess either one 📖
        </li>
        <li>
          <strong>Quality</strong> – A characteristic or attribute found in people.
          This could be a masdar (noun form) like mercy or patience, or an adjective
          like kind or angry.
        </li>
        <li>
          <strong>Random</strong> – Anything mentioned in the Qur’an that doesn’t
          fit the other categories, such as animals, nature, food, or objects 🌿
        </li>
        <li>
          <strong>Fiqh</strong> – Islamic legal and worship-related terms. Most are
          action-based words, with a few important Arabic fiqh terms included as
          well.
        </li>
        <li>
          <strong>Any</strong> – A special space where a random category is chosen
          each time you draw a card 🎲
        </li>
      </ul>
  
      <h3>Winning the Game 🏁</h3>
      <p>
        There are <strong>24 spaces</strong> on the board. The first team to reach
        or cross the final space wins the game.
      </p>
  
      <p>
        Play with good intentions, have fun, and remember — teamwork and good
        character always win 💚
      </p>
  
      <button className="back-button" onClick={() => navigate('/')}>Back</button>
    </div>
  )
}
