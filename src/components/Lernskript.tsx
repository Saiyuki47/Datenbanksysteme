import type { CSSProperties, ReactNode } from 'react'
import { lernskript, type SkriptBlock } from '../data/lernskript'

// Stabiler Schlüssel für einen Block (das Array ist statisch).
function blockKey(b: SkriptBlock): string {
  return JSON.stringify(b)
}

// Minimaler Inline-Fettdruck: **Text** → <strong>Text</strong>.
function renderInline(text: string): ReactNode[] {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part))
}

const kapId = (id: string) => `skript-kap-${id}`

const frageBox: CSSProperties = {
  borderLeft: '3px solid var(--blue, #2563eb)',
  padding: '0.1rem 0 0.1rem 0.75rem',
  margin: '0.6rem 0',
}
const frageQ: CSSProperties = { fontWeight: 700, color: 'var(--blue, #2563eb)', margin: '0 0 0.2rem' }
const defBox: CSSProperties = {
  background: 'var(--bg2)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius, 8px)',
  padding: '0.55rem 0.8rem',
  margin: '0.6rem 0',
}

function Block({ block }: { block: SkriptBlock }) {
  switch (block.art) {
    case 'frage':
      return (
        <div style={frageBox}>
          <p style={frageQ}>{block.q}</p>
          <p className="themen-text" style={{ margin: 0 }}>{block.a}</p>
        </div>
      )
    case 'def':
      return (
        <p className="themen-text" style={defBox}>
          <strong>{block.begriff}:</strong> {block.text}
        </p>
      )
    case 'text':
      return <p className="themen-text">{block.text}</p>
    case 'merk':
      return (
        <div className="themen-merksatz">
          <span className="themen-merksatz-icon" aria-hidden="true">💡</span>
          <p>{block.text}</p>
        </div>
      )
    case 'liste':
      return (
        <div>
          {block.titel && <p className="themen-code-label">{block.titel}</p>}
          <ul className="themen-liste">
            {block.punkte.map(p => <li key={p}>{renderInline(p)}</li>)}
          </ul>
        </div>
      )
    case 'code':
      return (
        <div className="themen-code-wrap">
          {block.titel && <p className="themen-code-label">{block.titel}</p>}
          <pre className="themen-algebra">{block.text}</pre>
        </div>
      )
    case 'svg':
      return (
        <div className="themen-code-wrap">
          {block.titel && <p className="themen-code-label">{block.titel}</p>}
          {/* eslint-disable-next-line react-doctor/no-danger -- statisches, im Repo definiertes SVG-Diagramm (block.svg), kein User-Input */}
          <div className="ub-diagram" dangerouslySetInnerHTML={{ __html: block.svg }} />
        </div>
      )
    case 'tabelle':
      return (
        <div className="themen-tabelle">
          {block.titel && <p className="themen-code-label">{block.titel}</p>}
          <div className="ub-table-scroll">
            <table className="ub-table">
              <thead>
                <tr>{block.columns.map(c => <th key={c}>{c}</th>)}</tr>
              </thead>
              <tbody>
                {block.rows.map((row, r) => (
                  <tr key={r}>{row.map((cell, c) => <td key={c}>{cell}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )
    default:
      return null
  }
}

export default function Lernskript() {
  const scrollTo = (id: string) => {
    document.getElementById(kapId(id))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div>
      <div className="section-header">
        <h2>Lern-Skript</h2>
        <p>Der gesamte Kurs kompakt – kapitelweise nach der Vorlesung, zum Durchlesen und Wiederholen.</p>
      </div>

      {/* Inhaltsverzeichnis */}
      <div className="card">
        <p className="themen-code-label">Inhalt</p>
        <ol className="themen-liste" style={{ listStyle: 'none', paddingLeft: 0, margin: 0 }}>
          {lernskript.map(kap => (
            <li key={kap.id} style={{ margin: '0.15rem 0' }}>
              <button
                type="button"
                onClick={() => scrollTo(kap.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  color: 'var(--blue, #2563eb)',
                  font: 'inherit',
                  textAlign: 'left',
                }}
              >
                {kap.nr}. {kap.titel}
              </button>
            </li>
          ))}
        </ol>
      </div>

      {/* Kapitel */}
      {lernskript.map(kap => (
        <div key={kap.id} id={kapId(kap.id)} className="card" style={{ scrollMarginTop: '1rem' }}>
          <h3 className="ub-title">{kap.nr}. {kap.titel}</h3>
          {kap.abschnitte.map(abschnitt => (
            <section key={abschnitt.titel} className="themen-section">
              <h4 className="themen-section-heading">{abschnitt.titel}</h4>
              {abschnitt.blocks.map(block => (
                <Block key={blockKey(block)} block={block} />
              ))}
            </section>
          ))}
        </div>
      ))}
    </div>
  )
}
