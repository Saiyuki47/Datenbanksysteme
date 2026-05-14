import { cheatCards } from '../data/cheatsheet'
import { highlightSQL } from '../utils/sqlHighlight'

export default function Cheatsheet() {
  return (
    <div>
      <div className="section-header">
        <h2>SQL Syntax-Referenz</h2>
        <p>Die wichtigsten Befehle und Operatoren auf einen Blick.</p>
      </div>
      <div className="cheat-grid">
        {cheatCards.map(card => (
          <div key={card.title} className="cheat-card">
            <h3>{card.title}</h3>
            <div
              className="cheat-code"
              dangerouslySetInnerHTML={{ __html: highlightSQL(card.code) }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
