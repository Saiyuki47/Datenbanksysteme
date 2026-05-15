import { useState } from 'react'
import { pvTables } from '../data/pvTables'
import { nwTables } from '../data/nwTables'
import { uniTables } from '../data/uniTables'
import { schemaData } from '../data/schema'
import type { TableData } from '../data/pvTables'

type DbTag = 'pv' | 'nw' | 'uni'
type Filter = 'all' | DbTag

interface TableEntry { db: DbTag; name: string; data: TableData }

// Build stub TableData for tables in schemaData without real data
function stubFromSchema(tableName: string): TableData {
  const cols = schemaData.filter(r => r.t === tableName).map(r => r.c)
  return { name: tableName, columns: cols, rows: [] }
}

function buildEntries(): TableEntry[] {
  const entries: TableEntry[] = []
  const coveredPV = new Set(Object.keys(pvTables))
  const coveredNW = new Set(Object.keys(nwTables))

  // Pine Valley tables with data
  for (const [name, data] of Object.entries(pvTables)) {
    entries.push({ db: 'pv', name, data })
  }
  // Pine Valley tables in schema but without data
  const pvSchemaNames = [...new Set(schemaData.filter(r => r.db === 'pv').map(r => r.t))]
  for (const name of pvSchemaNames) {
    if (!coveredPV.has(name)) entries.push({ db: 'pv', name, data: stubFromSchema(name) })
  }

  // Northwind tables with data
  for (const [name, data] of Object.entries(nwTables)) {
    entries.push({ db: 'nw', name, data })
  }
  // Northwind tables in schema but without data
  const nwSchemaNames = [...new Set(schemaData.filter(r => r.db === 'nw').map(r => r.t))]
  for (const name of nwSchemaNames) {
    if (!coveredNW.has(name)) entries.push({ db: 'nw', name, data: stubFromSchema(name) })
  }

  // University DB tables
  for (const [name, data] of Object.entries(uniTables)) {
    entries.push({ db: 'uni', name, data })
  }

  return entries
}

const allEntries = buildEntries()

const FILTER_LABELS: Record<Filter, string> = {
  all: 'Alle',
  pv: 'Pine Valley',
  nw: 'Northwind',
  uni: 'Uni-DB',
}

export default function Schema() {
  const [filter, setFilter] = useState<Filter>('pv')
  const [openTables, setOpenTables] = useState<Set<string>>(new Set())

  const visible = allEntries.filter(e => filter === 'all' || e.db === filter)

  const toggle = (key: string) => {
    setOpenTables(prev => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })
  }

  const expandAll = () => setOpenTables(new Set(visible.map(e => e.name)))
  const collapseAll = () => setOpenTables(new Set())

  return (
    <div>
      <div className="section-header">
        <h2>Datenbankschema</h2>
        <p>Alle Tabellen aller Datenbanken mit ihren Daten.</p>
      </div>

      <div className="filter-row">
        {(['pv', 'nw', 'uni', 'all'] as Filter[]).map(f => (
          <button
            key={f}
            className={`filter-btn${filter === f ? ' on' : ''}`}
            onClick={() => { setFilter(f); setOpenTables(new Set()) }}
          >
            {FILTER_LABELS[f]}
          </button>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '6px' }}>
          <button className="filter-btn" onClick={expandAll}>Alle aufklappen</button>
          <button className="filter-btn" onClick={collapseAll}>Alle zuklappen</button>
        </div>
      </div>

      {visible.map(({ db, name, data }) => {
        const isOpen = openTables.has(name)
        const hasData = data.rows.length > 0
        return (
          <div key={`${db}-${name}`} className="card schema-data-card">
            <button className="schema-data-toggle" onClick={() => toggle(name)}>
              <span className="schema-data-arrow">{isOpen ? '▼' : '▶'}</span>
              <span className="schema-data-name">{name}</span>
              <span className={`schema-db-badge schema-db-badge--${db}`}>{db.toUpperCase()}</span>
              <span className="schema-data-meta">
                {data.columns.length} Spalten{hasData ? ` · ${data.rows.length} Zeilen` : ' · keine Daten'}
              </span>
            </button>
            {isOpen && (
              hasData ? (
                <div className="ub-table-scroll schema-data-table-wrap">
                  <table className="ub-table">
                    <thead>
                      <tr>{data.columns.map(col => <th key={col}>{col}</th>)}</tr>
                    </thead>
                    <tbody>
                      {data.rows.map((row, i) => (
                        <tr key={i}>
                          {row.map((cell, j) => (
                            <td key={j}>{cell ?? <span className="ub-null">NULL</span>}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="schema-no-data">
                  <p className="schema-no-data-cols">
                    {data.columns.join(', ')}
                  </p>
                  <p className="schema-no-data-hint">Keine Daten in dieser Datenbank gespeichert.</p>
                </div>
              )
            )}
          </div>
        )
      })}
    </div>
  )
}
