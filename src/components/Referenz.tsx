import { lazy, Suspense } from 'react'
import { useHashSubTab } from 'lernseiten-ui'
import Themen from './Themen'

// Zweites Hash-Segment (#referenz/<sub>) steuert den Untertab. „themen" ist der
// Fallback – dadurch landen die Aufgaben-Deep-Links (#referenz/<themaId>)
// weiterhin im Themen-Tab und scrollen dort zur Karte.
const Lernskript = lazy(() => import('./Lernskript'))
const Klausurfallen = lazy(() => import('./Klausurfallen'))
const SUBS = ['themen', 'skript', 'fallen'] as const

const TABS: { id: (typeof SUBS)[number]; label: string }[] = [
  { id: 'themen', label: '📖 Themen' },
  { id: 'skript', label: '📝 Lern-Skript' },
  { id: 'fallen', label: '⚠️ Klausur-Fallen' },
]

export default function Referenz() {
  const [sub, setSub] = useHashSubTab(SUBS, 'themen')
  return (
    <div>
      <div className="hilf-fs-switch" role="tablist" aria-label="Referenz-Ansicht wählen">
        {TABS.map(t => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={sub === t.id}
            className={`hilf-fs-tab${sub === t.id ? ' active' : ''}`}
            onClick={() => setSub(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      {sub === 'themen' ? (
        <Themen />
      ) : (
        <Suspense fallback={<div className="card"><p className="quiz-hint">Lädt …</p></div>}>
          {sub === 'skript' ? <Lernskript /> : <Klausurfallen />}
        </Suspense>
      )}
    </div>
  )
}
