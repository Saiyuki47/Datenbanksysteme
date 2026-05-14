import { useState } from 'react'
import { aufgaben } from '../data/aufgaben'
import { highlightSQL } from '../utils/sqlHighlight'

const DIFF_LABEL: Record<string, string> = {
  easy: 'Einfach',
  med: 'Mittel',
  hard: 'Schwer',
}

export default function Aufgaben() {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set())

  const toggle = (id: string) => {
    setOpenIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div>
      <div className="section-header">
        <h2>Aufgaben mit Musterlösung</h2>
        <p>Klicke auf "Lösung anzeigen" nach eigenen Überlegungen.</p>
      </div>

      {aufgaben.map(a => {
        const isOpen = openIds.has(a.id)
        return (
          <div key={a.id} className="card">
            <div className="badge-row">
              <span className={`badge ${a.db === 'pv' ? 'badge-pv' : 'badge-nw'}`}>
                {a.db === 'pv' ? 'Pine Valley' : 'Northwind'}
              </span>
              <span className={`badge badge-${a.difficulty}`}>
                {DIFF_LABEL[a.difficulty]}
              </span>
            </div>
            <p className="q-title">{a.title}</p>
            <p className="q-text">{a.text}</p>
            <button className="toggle-btn" onClick={() => toggle(a.id)}>
              {isOpen ? '▼ Lösung verbergen' : '▶ Lösung anzeigen'}
            </button>
            {isOpen && (
              <div
                className="sql-block visible"
                dangerouslySetInnerHTML={{ __html: highlightSQL(a.sql) }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
