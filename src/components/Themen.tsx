import { Referenz, type ReferenzKarte } from 'lernseiten-ui'
import { themen } from '../data/themen'
import { highlightSQL } from '../utils/sqlHighlight'
import type { ThemaBlock, ErgebnisTabelle } from '../data/themen'

// Stable, content-derived key for a block (the blocks array is static).
function blockKey(block: ThemaBlock): string {
  return JSON.stringify(block)
}

function ResultTable({ ergebnis }: { ergebnis: ErgebnisTabelle }) {
  return (
    <div className="themen-beispiel-result">
      <p className="themen-result-label">Ergebnis</p>
      <div className="ub-table-scroll">
        <table className="ub-table ub-result-table">
          <thead>
            <tr>{ergebnis.columns.map(col => <th key={col}>{col}</th>)}</tr>
          </thead>
          <tbody>
            {ergebnis.rows.map((row, r) => (
              <tr key={r}>
                {row.map((cell, c) => <td key={c}>{cell}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function BlockView({ block }: { block: ThemaBlock }) {
  switch (block.art) {
    case 'text':
      return <p className="themen-text">{block.text}</p>
    case 'liste':
      return (
        <ul className="themen-liste">
          {block.punkte.map(p => <li key={p}>{p}</li>)}
        </ul>
      )
    case 'merksatz':
      return (
        <div className="themen-merksatz">
          <span className="themen-merksatz-icon" aria-hidden="true">💡</span>
          <p>{block.text}</p>
        </div>
      )
    case 'sql':
      return (
        <div className="themen-code-wrap">
          {block.titel && <p className="themen-code-label">{block.titel}</p>}
          <div className="sql-block visible">{highlightSQL(block.code)}</div>
        </div>
      )
    case 'beispiel':
      return (
        <div className="themen-beispiel">
          {block.titel && <p className="themen-beispiel-titel">{block.titel}</p>}
          <div className="sql-block visible">{highlightSQL(block.sql)}</div>
          <p className="themen-beispiel-text">{block.erklaerung}</p>
          {block.ergebnis && <ResultTable ergebnis={block.ergebnis} />}
        </div>
      )
    case 'algebra':
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
    case 'uebersetzung':
      return (
        <div className="themen-uebersetzung">
          <div className="themen-ueb-col">
            <p className="themen-code-label">SQL</p>
            <div className="sql-block visible">{highlightSQL(block.sql)}</div>
          </div>
          <div className="themen-ueb-arrow" aria-hidden="true">≡</div>
          <div className="themen-ueb-col">
            <p className="themen-code-label">Relationale Algebra</p>
            <pre className="themen-algebra">{block.algebra}</pre>
          </div>
          {block.hinweis && <p className="themen-ueb-hinweis">{block.hinweis}</p>}
        </div>
      )
    case 'tabelle':
      return (
        <div className="themen-tabelle">
          {block.titel && <p className="themen-code-label">{block.titel}</p>}
          <div className="ub-table-scroll">
            <table className="ub-table">
              <thead>
                <tr>{block.columns.map(col => <th key={col}>{col}</th>)}</tr>
              </thead>
              <tbody>
                {block.rows.map((row, r) => (
                  <tr key={r}>
                    {row.map((cell, c) => <td key={c}>{cell}</td>)}
                  </tr>
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

// Jedes Thema = eine Referenz-Karte; der Inhalt (Abschnitte + SQL/Tabellen/…)
// wird als fertige Node über die gemeinsame Referenz-Komponente gelegt
// (Inhaltsverzeichnis + Scroll-Spy + Deep-Link kommen von dort).
const karten: ReferenzKarte[] = themen.map(thema => ({
  id: thema.id,
  titel: `${thema.nr}. ${thema.title}`,
  inhaltNode: (
    <>
      {thema.subtitle && <p className="themen-card-subtitle">{thema.subtitle}</p>}
      {thema.sections.map(section => (
        <section key={section.heading} className="themen-section">
          <h4 className="themen-section-heading">{section.heading}</h4>
          {section.blocks.map(block => (
            <BlockView key={blockKey(block)} block={block} />
          ))}
        </section>
      ))}
    </>
  ),
}))

export default function Themen() {
  return (
    <Referenz
      karten={karten}
      tab="themen"
      intro="Alle SQL-Befehle aus den Übungsblättern, von Grund auf erklärt – ein Thema pro Karte."
    />
  )
}
