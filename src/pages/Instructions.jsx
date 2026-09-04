import { useNavigate } from 'react-router-dom'

export default function Instructions() {
  const navigate = useNavigate()

  return (
    <div className="screen instructions">
      <h2>How to Play 🕌</h2>

      <p>
        Islamic Articulate is a fun and fast-paced word description game!
      </p>
      <p>
        If you know what <strong>Charades</strong> is, you’ll understand this game very
        easily. <strong>Articulate</strong> is similar — but instead of acting,
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
            <li>Say the word in another language</li>
          </ul>
        </li>

        <li>
          However you <strong>are allowed</strong> to:
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

        <li>
          Although we've listed these rules, feel free to adapt them to your group's preferences and have fun 😊
        </li>
      </ul>

      <h3>Setup 👥</h3>
      <p>Before you start, the setup screen lets you customise:</p>
      <ul>
        <li>
          <strong>Number of teams</strong> – choose <strong>1 to 4</strong> teams:
          <ul>
            <li><strong>1 Team</strong> – Practice mode. Just you and friends, no competition, just halal fun 😄</li>
            <li><strong>2 Teams</strong> – Classic competitive mode. May the best team win 🏆</li>
            <li><strong>3 Teams</strong> – Often the most enjoyable… and often, <strong>three is Sunnah</strong> 🙂</li>
            <li><strong>4 Teams</strong> – More people, more barakah ✨ Big energy, lots of chaos.</li>
          </ul>
        </li>
        <li>
          <strong>Team names</strong> – rename each team from the default "Team 1", "Team 2", etc. to whatever you like.
        </li>
        <li>
          <strong>Time per round</strong> – pick a preset (30s, 45s, 60s, 90s, 120s) or enter a custom time. Default is 60 seconds.
        </li>
        <li>
          <strong>Skip limit</strong> – by default skips are unlimited, but you can turn on a limit and set exactly how many skips each team gets per round.
        </li>
      </ul>

      <h3>Game Flow 🎮</h3>
      <ul>
        <li>Teams take turns, one round at a time, using the time and skip settings chosen at setup.</li>
        <li>One player describes while the rest of the team guesses.</li>
        <li>
          For every correct guess, press <strong>Correct</strong> to earn a point
          and move to the next card.
        </li>
        <li>
          If a word feels too difficult, press <strong>Skip</strong> — the button shows
          how many skips you have left if a limit is set.
        </li>
        <li>
          On a laptop, you can also use the keyboard: <strong>Enter</strong> for
          Correct and <strong>'S'</strong> for Skip.
        </li>
        <li>
          Skipped cards give <strong>no points</strong>.
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
          <strong>Nature</strong> – Anything mentioned in the Qur’an, such as animals,
          plants, celestial bodies, etc. 🌿
        </li>
        <li>
          <strong>Surah</strong> – The name of a chapter from the Qur’an. The card
          shows the Arabic name, with the English translation in brackets. Players may
          guess either one 📖
        </li>
        <li>
          <strong>Action</strong> – A verb-based word (ending in -ing) rooted in an
          action or concept found in the Qur'an, such as "praising" or "worshipping",
          ranging from everyday deeds to more nuanced ones.
        </li>
        <li>
          <strong>Random</strong> – A mixture of characteristics or attributes (masdar
          nouns like "mercy" or adjectives like "kind"), common Arabic fiqh terms,
          random objects mentioned in the Qur’an, etc.
        </li>
        <li>
          <strong>Any</strong> – A special space where a random category is chosen
          each time you draw a card 🎲
        </li>
      </ul>

      <h3>Winning the Game 🏁</h3>
      <p>
        There are <strong>24 spaces</strong> on the board. The first team to cross
        the final space doesn't win outright — every other team gets a chance to
        catch up. Once the round comes back around to everyone, whoever has the
        <strong> highest score</strong> wins, even if that's not the team that crossed
        first. A tie is shared by all teams on the highest score.
      </p>
      <p>
        At the end, you'll see a full leaderboard of every team's score, with the
        option to play again or head back home.
      </p>

      <p>
        Play with good intentions, have fun, and remember — teamwork and good
        character always win 💚
      </p>

      <button className="back-button" onClick={() => navigate('/')}>Back</button>
    </div>
  )
}
