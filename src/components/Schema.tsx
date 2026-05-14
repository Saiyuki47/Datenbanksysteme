import { useState } from 'react'
import { schemaData, PK_COLS } from '../data/schema'
import type { DbType } from '../types'

type Filter = 'all' | DbType

const FILTER_LABELS: Record<Filter, string> = {
  all: 'Alle Tabellen',
  pv: 'Pine Valley (_T)',
  nw: 'Northwind',
}

export default function Schema() {
  const [filter, setFilter] = useState<Filter>('all')

  const rows = schemaData.filter(r => filter === 'all' || r.db === filter)
  const processedRows = rows.map((r, i) => ({
    ...r,
    isNew: i === 0 || r.t !== rows[i - 1]?.t,
    isPK: PK_COLS.has(r.c) && (i === 0 || r.t !== rows[i - 1]?.t),
  }))

  return (
    <div>
      <div className="section-header">
        <h2>Datenbankschema</h2>
        <p>
          Tabellen und Spalten beider Datenbanken.{' '}
          <span className="schema-legend-pk">PK</span>
          {' '}= Primärschlüssel,{' '}
          <span className="schema-legend-nn">●</span>
          {' '}= NOT NULL.
        </p>
      </div>

      <div className="filter-row">
        {(['all', 'pv', 'nw'] as Filter[]).map(f => (
          <button
            key={f}
            className={`filter-btn${filter === f ? ' on' : ''}`}
            onClick={() => setFilter(f)}
          >
            {FILTER_LABELS[f]}
          </button>
        ))}
      </div>

      <div className="card card--flush">
        <div className="schema-wrap">
          <table className="schema-table">
            <thead>
              <tr>
                <th className="schema-col-table">Tabelle</th>
                <th>Spalte</th>
                <th>Typ</th>
                <th className="schema-col-center">NN</th>
              </tr>
            </thead>
            <tbody>
              {processedRows.map((r, i) => (
                <tr key={`${r.t}-${r.c}-${i}`}>
                  <td>{r.isNew ? <span className="tname">{r.t}</span> : null}</td>
                  <td className="col-mono">
                    {r.c}
                    {r.isPK && <span className="pk-badge">PK</span>}
                  </td>
                  <td className="type-mono">{r.ty}</td>
                  <td className="schema-col-center">
                    {r.nn && <span className="nn-dot" title="NOT NULL" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
