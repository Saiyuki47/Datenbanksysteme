import { useState, type CSSProperties } from 'react'
import { useDoneTracker } from 'lernseiten-ui'
import { uebungsblaetter } from '../data/uebungsblaetter'
import { aufgaben } from '../data/aufgaben'
import { highlightSQL } from '../utils/sqlHighlight'
import { pvTables } from '../data/pvTables'
import { nwTables } from '../data/nwTables'
import { uniTables } from '../data/uniTables'
import { aufgabeTipps } from '../data/aufgabeTipps'
import type { TableData } from '../data/pvTables'
import type { DbType, LoesungBlock, UebungsblattTask } from '../types'

// Stable, content-derived key for a solution block. The blocks array is static
// (built once per task, never reordered or filtered), but we still key by content
// instead of the array index so identity stays correct no matter what.
function blockKey(block: LoesungBlock): string {
  return JSON.stringify(block)
}

// Immutable toggle of a key inside a Set-state (open/closed accordions).
function toggleInSet(setter: (fn: (prev: Set<string>) => Set<string>) => void, key: string) {
  setter(prev => {
    const next = new Set(prev)
    if (next.has(key)) next.delete(key)
    else next.add(key)
    return next
  })
}

// Renders a text-based (theory) solution: paragraphs, bullet lists, labelled
// sub-points and the occasional table (e.g. the Lost-Update schedule).
function LoesungView({ blocks }: { blocks: LoesungBlock[] }) {
  return (
    <div className="ub-loesung">
      {blocks.map(block => {
        const k = blockKey(block)
        if (block.art === 'text') {
          return <p key={k} className="ub-loesung-text">{block.text}</p>
        }
        if (block.art === 'liste') {
          return (
            <ul key={k} className="ub-loesung-liste">
              {block.punkte.map((p, j) => <li key={j}>{p}</li>)}
            </ul>
          )
        }
        if (block.art === 'unterpunkt') {
          return (
            <div key={k} className="ub-loesung-up">
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
            <div key={k} className="ub-loesung-code-wrap">
              {block.titel && <p className="ub-loesung-tab-title">{block.titel}</p>}
              <pre className="ub-loesung-code">{block.text}</pre>
            </div>
          )
        }
        if (block.art === 'svg') {
          return (
            <div key={k} className="ub-loesung-code-wrap">
              {block.titel && <p className="ub-loesung-tab-title">{block.titel}</p>}
              {/* eslint-disable-next-line react-doctor/no-danger -- statisches, im Repo definiertes SVG-Diagramm (block.svg), kein User-Input */}
              <div className="ub-diagram" dangerouslySetInnerHTML={{ __html: block.svg }} />
            </div>
          )
        }
        // tabelle
        return (
          <div key={k} className="ub-loesung-tabelle">
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

// For a task that shows a given SQL query, find the result table whose values the
// student is meant to work out: either an explicit queryResult or the final
// "Ergebnis…" table inside the (text) solution. Returns just the shape we need to
// render a blank copy of it with the question.
function getResultTable(task: UebungsblattTask): { columns: string[]; rowCount: number } | undefined {
  if (task.queryResult) {
    return { columns: task.queryResult.columns, rowCount: task.queryResult.rows.length }
  }
  if (task.loesung) {
    // Take the LAST "Ergebnis" table – tasks may have intermediate tables first.
    for (let i = task.loesung.length - 1; i >= 0; i--) {
      const b = task.loesung[i]
      if (b.art === 'tabelle' && b.titel?.startsWith('Ergebnis')) {
        return { columns: b.columns, rowCount: b.rows.length }
      }
    }
  }
  return undefined
}

// Blank version of a query's result table, shown with the question so the student
// can fill it in. Same columns and number of rows as the solution, but no values.
function EmptyResultTable({ columns, rowCount }: { columns: string[]; rowCount: number }) {
  return (
    <div className="ub-result-section">
      <p className="ub-result-label">Ergebnis (zum Ausfüllen):</p>
      <div className="ub-table-scroll">
        <table className="ub-table ub-result-table ub-result-empty">
          <thead>
            <tr>{columns.map(col => <th key={col}>{col}</th>)}</tr>
          </thead>
          <tbody>
            {Array.from({ length: rowCount }, (_, r) => (
              <tr key={r}>
                {columns.map((_, c) => <td key={c}>{' '}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function Uebungsblaetter() {
  const [selectedId, setSelectedId] = useState(uebungsblaetter[0]?.id ?? '')
  const [openIds, setOpenIds] = useState<Set<string>>(new Set())
  const [openTables, setOpenTables] = useState<Set<string>>(new Set())
  const [openHints, setOpenHints] = useState<Set<string>>(new Set())
  const { done, toggle: toggleDone, ratio } = useDoneTracker()

  const blatt = uebungsblaetter.find(b => b.id === selectedId)

  // Fortschritt pro Blatt: gleicher Schlüssel wie bei Lösung/Tipps (`${blatt.id}-${task.nr}`).
  const taskKeys = blatt ? blatt.tasks.map(t => `${blatt.id}-${t.nr}`) : []
  const verstanden = taskKeys.filter(k => done.has(k)).length
  const pct = Math.round(ratio(taskKeys) * 100)

  const toggleSolution = (key: string) => toggleInSet(setOpenIds, key)
  const toggleTable = (key: string) => toggleInSet(setOpenTables, key)
  const toggleHint = (key: string) => toggleInSet(setOpenHints, key)

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
            {taskKeys.length > 0 && (
              <>
                <div className="progress-wrap" style={{ marginTop: '0.75rem' }}>
                  <div className="progress-bar" style={{ '--bar-w': `${pct}%` } as CSSProperties} />
                </div>
                <p className="ub-desc" style={{ marginTop: '0.4rem' }}>
                  {verstanden} / {taskKeys.length} Aufgaben verstanden ({pct}%)
                </p>
              </>
            )}
          </div>

          {/* Lecturer note / remarks box */}
          {blatt.anmerkung && (
            <div className="ub-anmerkung">
              <p className="ub-anmerkung-title">
                {blatt.anmerkung.titel ?? 'Anmerkung'}
              </p>
              <ul className="ub-anmerkung-liste">
                {blatt.anmerkung.punkte.map(p => <li key={p}>{p}</li>)}
              </ul>
            </div>
          )}

          {/* Tasks */}
          {blatt.tasks.map(task => {
            const aufgabe = aufgaben.find(a => a.id === task.aufgabeId)
            const key = `${blatt.id}-${task.nr}`
            const isOpen = openIds.has(key)
            // Blank result table shown with the question (only for query tasks
            // whose answer is a result table the student should fill in).
            const resultTable = task.sqlQuery ? getResultTable(task) : undefined

            return (
              <div key={key} className="card">
                <div className="ub-task-head">
                  <p className="ub-task-nr">{task.titel ?? `Aufgabe ${task.nr}`}</p>
                  {task.hinweis && <span className="ub-task-hinweis">{task.hinweis}</span>}
                </div>
                <p className="q-title ub-question">{task.text}</p>

                {/* ER / structural diagram shown with the question */}
                {task.svg && (
                  // eslint-disable-next-line react-doctor/no-danger -- statisches, im Repo definiertes SVG-Diagramm (task.svg), kein User-Input
                  <div className="ub-diagram" dangerouslySetInnerHTML={{ __html: task.svg }} />
                )}

                {/* Given SQL query (the exam question), always visible */}
                {task.sqlQuery && (
                  <div className="sql-block visible">
                    {highlightSQL(task.sqlQuery)}
                  </div>
                )}

                {/* Blank result table to fill in (shown with the question) */}
                {resultTable && (
                  <EmptyResultTable columns={resultTable.columns} rowCount={resultTable.rowCount} />
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
                      {openHints.has(key) ? '▼ Tipp verbergen' : '▶ Tipp anzeigen'}
                    </button>
                    {openHints.has(key) && (
                      <div className="tipp-accordion">
                        {aufgabeTipps[key].map(hint => (
                          <details key={hint.titel} className="tipp-section">
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

                {/* Solution (linked aufgabe with SQL + result) */}
                {aufgabe && (
                  <>
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
                )}

                {/* Text-based (theory) solution */}
                {task.loesung && task.loesung.length > 0 && (
                  <>
                    <button type="button" className="toggle-btn" onClick={() => toggleSolution(key)}>
                      {isOpen ? '▼ Lösung verbergen' : '▶ Lösung anzeigen'}
                    </button>
                    {isOpen && <LoesungView blocks={task.loesung} />}
                  </>
                )}

                {/* Fortschritt: Aufgabe als verstanden markieren */}
                <button
                  type="button"
                  className="toggle-btn"
                  onClick={() => toggleDone(key)}
                  style={done.has(key) ? { color: 'var(--green, #2ea043)', borderColor: 'var(--green, #2ea043)' } : undefined}
                >
                  {done.has(key) ? '✓ Verstanden' : '○ Als verstanden markieren'}
                </button>
              </div>
            )
          })}
        </>
      )}
    </div>
  )
}

