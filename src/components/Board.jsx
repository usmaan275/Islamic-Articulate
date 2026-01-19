export default function Board({ positions, teamCount, startIndex }) {
  const sectionLabels = ['Figure', 'Surah', 'Quality', 'Random', 'Fiqh', 'Any']
  const sectionColors = ['#facc15', '#a7f3d0', '#93c5fd', '#5273d0ff', '#a78bfa', '#ffffff']

  return (
    <div className="board">
      {[...Array(24)].map((_, i) => {
        const sectionIndex = (i + startIndex) % sectionLabels.length
        const label = sectionLabels[sectionIndex]
        const bgColor = sectionColors[sectionIndex]

        return (
          <div className="space" key={i} style={{ backgroundColor: bgColor }}>
            <div className="space-label">{label}</div>
            {positions.map((pos, idx) =>
              pos === i ? (
                <div
                  className="team-marker"
                  key={idx}
                  style={{ bottom: `${0.5 + idx * 5}dvh`, backgroundColor: 'red', color: 'white' }} // stack vertically
                >
                  {idx + 1}
                </div>
              ) : null
            )}
          </div>
        )
      })}
    </div>
  )
}
