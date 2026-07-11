import { lazy, Suspense } from 'react'
import { useHashSubTab } from 'lernseiten-ui'
import Themen from './Themen'

// Zweites Hash-Segment (#referenz/<sub>) steuert den Untertab. „themen" ist der
// Fallback – dadurch landen die Aufgaben-Deep-Links (#referenz/<themaId>)
// weiterhin im Themen-Tab und scrollen dort zur Karte.
const Lernskript = lazy(() => import('./Lernskript'))
const SUBS = ['themen', 'skript'] as const

export default function Referenz() {
  const [sub, setSub] = useHashSubTab(SUBS, 'themen')
  return (
    <div>
      <div className="hilf-fs-switch" role="tablist" aria-label="Referenz-Ansicht wählen">
        <button
          type="button"
          role="tab"
          aria-selected={sub === 'themen'}
          className={`hilf-fs-tab${sub === 'themen' ? ' active' : ''}`}
          onClick={() => setSub('themen')}
        >
          📖 Themen
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={sub === 'skript'}
          className={`hilf-fs-tab${sub === 'skript' ? ' active' : ''}`}
          onClick={() => setSub('skript')}
        >
          📝 Lern-Skript
        </button>
      </div>
      {sub === 'themen' ? (
        <Themen />
      ) : (
        <Suspense fallback={<div className="card"><p className="quiz-hint">Lädt …</p></div>}>
          <Lernskript />
        </Suspense>
      )}
    </div>
  )
}
