import { useState } from 'react'
import { uebungsblaetter } from '../data/uebungsblaetter'
import { aufgaben } from '../data/aufgaben'
import { highlightSQL } from '../utils/sqlHighlight'
import { pvTables } from '../data/pvTables'
import { nwTables } from '../data/nwTables'
import { uniTables } from '../data/uniTables'
import { detectTips } from '../data/sqlTips'
import { aufgabeTipps } from '../data/aufgabeTipps'
import type { TableData } from '../data/pvTables'
import type { DbType, LoesungBlock } from '../types'

// Renders a text-based (theory) solution: paragraphs, bullet lists, labelled
// sub-points and the occasional table (e.g. the Lost-Update schedule).
function LoesungView({ blocks }: { blocks: LoesungBlock[] }) {
  return (
    <div className="ub-loesung">
      {blocks.map((block, i) => {
        if (block.art === 'text') {
          return <p key={i} className="ub-loesung-text">{block.text}</p>
        }
        if (block.art === 'liste') {
          return (
            <ul key={i} className="ub-loesung-liste">
              {block.punkte.map((p, j) => <li key={j}>{p}</li>)}
            </ul>
          )
        }
        if (block.art === 'unterpunkt') {
          return (
            <div key={i} className="ub-loesung-up">
              <p className="ub-loesung-up-head">
                <span className="ub-loesung-label">{block.label}</span> {block.text}
              </p>
              {block.punkte && block.punkte.length > 0 && (
                <ul className="ub-loesung-liste">
                  {block.punkte.map((p, j) => <li key={j}>{p}</li>)}
                </ul>
              )}
            </div>
          )
        }
        if (block.art === 'code') {
          return (
            <div key={i} className="ub-loesung-code-wrap">
              {block.titel && <p className="ub-loesung-tab-title">{block.titel}</p>}
              <pre className="ub-loesung-code">{block.text}</pre>
            </div>
          )
        }
        // tabelle
        return (
          <div key={i} className="ub-loesung-tabelle">
            {block.titel && <p className="ub-loesung-tab-title">{block.titel}</p>}
            <div className="ub-table-scroll">
              <table className="ub-table">
                <thead>
                  <tr>{block.columns.map(col => <th key={col}>{col}</th>)}</tr>
                </thead>
                <tbody>
                  {block.rows.map((row, r) => (
                    <tr key={r}>
                      {row.map((cell, c) => <td key={c}>{cell || ''}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function getTable(db: DbType | undefined, name: string): TableData | undefined {
  if (!db) return undefined
  const map = db === 'pv' ? pvTables : db === 'nw' ? nwTables : uniTables
  return map[name]
}

export default function Uebungsblaetter() {
  const [selectedId, setSelectedId] = useState(uebungsblaetter[0]?.id ?? '')
  const [openIds, setOpenIds] = useState<Set<string>>(new Set())
  const [openTables, setOpenTables] = useState<Set<string>>(new Set())
  const [openTips, setOpenTips] = useState<Set<string>>(new Set())
  const [openHints, setOpenHints] = useState<Set<string>>(new Set())

  const blatt = uebungsblaetter.find(b => b.id === selectedId)

  const toggleSolution = (key: string) => {
    setOpenIds(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const toggleTable = (key: string) => {
    setOpenTables(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const toggleTips = (key: string) => {
    setOpenTips(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const toggleHint = (key: string) => {
    setOpenHints(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  return (
    <div>
      <div className="section-header">
        <h2>Übungsblätter</h2>
        <p>Aufgaben und Musterlösungen nach Übungsblatt geordnet.</p>
      </div>

      {/* Sheet selector */}
      {uebungsblaetter.length > 1 && (
        <div className="filter-row">
          {uebungsblaetter.map(b => (
            <button
              type="button"
              key={b.id}
              className={`filter-btn${selectedId === b.id ? ' on' : ''}`}
              onClick={() => setSelectedId(b.id)}
            >
              {b.titel ?? `Blatt ${b.nr}`}
            </button>
          ))}
        </div>
      )}

      {blatt && (
        <>
          {/* Sheet header */}
          <div className="ub-header card">
            <div className="ub-meta-row">
              <span className="ub-badge">{blatt.typ}</span>
            </div>
            <h3 className="ub-title">{blatt.titel ?? `Übungsblatt ${blatt.nr}`}</h3>
            {blatt.beschreibung && (
              <p className="ub-desc">{blatt.beschreibung}</p>
            )}
          </div>

          {/* Lecturer note / remarks box */}
          {blatt.anmerkung && (
            <div className="ub-anmerkung">
              <p className="ub-anmerkung-title">
                {blatt.anmerkung.titel ?? 'Anmerkung'}
              </p>
              <ul className="ub-anmerkung-liste">
                {blatt.anmerkung.punkte.map((p, i) => <li key={i}>{p}</li>)}
              </ul>
            </div>
          )}

          {/* Tasks */}
          {blatt.tasks.map(task => {
            const aufgabe = aufgaben.find(a => a.id === task.aufgabeId)
            const key = `${blatt.id}-${task.nr}`
            const isOpen = openIds.has(key)

            return (
              <div key={key} className="card">
                <div className="ub-task-head">
                  <p className="ub-task-nr">{task.titel ?? `Aufgabe ${task.nr}`}</p>
                  {task.hinweis && <span className="ub-task-hinweis">{task.hinweis}</span>}
                </div>
                <p className="q-title ub-question">{task.text}</p>

                {/* Given SQL query (the exam question), always visible */}
                {task.sqlQuery && (
                  <div className="sql-block visible">
                    {highlightSQL(task.sqlQuery)}
                  </div>
                )}

                {/* Anwendungsfall tables shown directly with the task */}
                {task.tabellen && task.tabellen.length > 0 && (
                  <div className="ub-tables-section">
                    {task.tabellen.map(t => (
                      <div key={t.titel} className="ub-anw-table">
                        <p className="ub-tables-label">{t.titel}</p>
                        <div className="ub-table-scroll">
                          <table className="ub-table">
                            <thead>
                              <tr>{t.columns.map(col => <th key={col}>{col}</th>)}</tr>
                            </thead>
                            <tbody>
                              {t.rows.map((row, r) => {
                                const rowKey = row.map(cell => String(cell)).join('|') || `row-${r}`
                                return (
                                  <tr key={rowKey}>
                                    {row.map((cell, c) => <td key={c}>{cell}</td>)}
                                  </tr>
                                )
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Relevant tables */}
                {task.relevantTables && task.relevantTables.length > 0 && (
                  <div className="ub-tables-section">
                    <p className="ub-tables-label">Relevante Tabellen:</p>
                    {task.relevantTables.map(tableName => {
                      const tableData = getTable(blatt.db, tableName)
                      if (!tableData) return null
                      const tKey = `${key}-${tableName}`
                      const isTableOpen = openTables.has(tKey)
                      return (
                        <div key={tableName} className="ub-table-wrap">
                          <button
                            type="button"
                            className="ub-table-toggle"
                            onClick={() => toggleTable(tKey)}
                          >
                            {isTableOpen ? '▼' : '▶'} {tableName}
                            <span className="ub-table-rowcount">({tableData.rows.length} Zeilen)</span>
                          </button>
                          {isTableOpen && (
                            <div className="ub-table-scroll">
                              <table className="ub-table">
                                <thead>
                                  <tr>
                                    {tableData.columns.map(col => (
                                      <th key={col}>{col}</th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {tableData.rows.map((row, i) => {
                                    const rowKey = row.map(cell => String(cell)).join('|') || `row-${i}`
                                    return (
                                      <tr key={rowKey}>
                                        {row.map((cell, j) => (
                                          <td key={j}>{cell ?? <span className="ub-null">NULL</span>}</td>
                                        ))}
                                      </tr>
                                    )
                                  })}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}

                {/* Structured hint accordion (4 categories) */}
                {aufgabeTipps[key] && aufgabeTipps[key].length > 0 && (
                  <div className="ub-hints-section">
                    <button type="button" className="toggle-btn toggle-btn--hints" onClick={() => toggleHint(key)}>
                      {openHints.has(key) ? '▼ Hinweise verbergen' : '▶ Hinweise anzeigen'}
                    </button>
                    {openHints.has(key) && (
                      <div className="tipp-accordion">
                        {aufgabeTipps[key].map((hint, i) => (
                          <details key={i} className="tipp-section">
                            <summary className="tipp-section-summary">
                              <span className="tipp-section-icon">{hint.icon}</span>
                              {hint.titel}
                            </summary>
                            <div className="tipp-section-body">{hint.inhalt}</div>
                          </details>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Solution */}
                {aufgabe && (() => {
                  const tips = detectTips(aufgabe.sql)
                  return (
                    <>
                      {tips.length > 0 && (
                        <div className="ub-tips-section">
                          <button type="button" className="toggle-btn toggle-btn--tips" onClick={() => toggleTips(key)}>
                            {openTips.has(key) ? '▼ Tipps verbergen' : '▶ Tipps anzeigen'}
                          </button>
                          {openTips.has(key) && (
                            <div className="ub-tips-list">
                              {tips.map(tip => (
                                <div key={tip.keyword} className="ub-tip-card">
                                  <p className="ub-tip-keyword">{tip.keyword}</p>
                                  <p className="ub-tip-desc">{tip.description}</p>
                                  <pre className="ub-tip-example">{tip.example}</pre>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                      <button type="button" className="toggle-btn" onClick={() => toggleSolution(key)}>
                        {isOpen ? '▼ Lösung verbergen' : '▶ Lösung anzeigen'}
                      </button>
                      {isOpen && (
                      <>
                        <div className="sql-block visible">
                          {highlightSQL(aufgabe.sql)}
                        </div>
                        {task.queryResult && (
                          <div className="ub-result-section">
                            <p className="ub-result-label">Ergebnis:</p>
                            <div className="ub-table-scroll">
                              <table className="ub-table ub-result-table">
                                <thead>
                                  <tr>
                                    {task.queryResult.columns.map(col => (
                                      <th key={col}>{col}</th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {task.queryResult.rows.map((row, i) => {
                                    const rowKey = row.map(cell => String(cell)).join('|') || `result-row-${i}`
                                    return (
                                      <tr key={rowKey}>
                                        {row.map((cell, j) => (
                                          <td key={j}>{cell ?? <span className="ub-null">NULL</span>}</td>
                                        ))}
                                      </tr>
                                    )
                                  })}
                                </tbody>
                              </table>
                            </div>
                            <p className="ub-result-count">{task.queryResult.rows.length} Zeile(n) gefunden</p>
                          </div>
                        )}
                      </>
                    )}
                    </>
                  )
                })()}

                {/* Text-based (theory) solution */}
                {task.loesung && task.loesung.length > 0 && (
                  <>
                    <button type="button" className="toggle-btn" onClick={() => toggleSolution(key)}>
                      {isOpen ? '▼ Lösung verbergen' : '▶ Lösung anzeigen'}
                    </button>
                    {isOpen && <LoesungView blocks={task.loesung} />}
                  </>
                )}
              </div>
            )
          })}
        </>
      )}
    </div>
  )
}

