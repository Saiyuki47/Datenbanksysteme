import { lazy, Suspense } from 'react'
import { Header, GlobalSearch, Tabs, tabDefs, STANDARD_TAB_REIHENFOLGE, useTheme, useHashTab } from 'lernseiten-ui'
import { quizFragen } from './data/quiz'
import { karteikarten } from './data/karteikarten'

const Referenz = lazy(() => import('./components/Referenz'))
const Hilfsmittel = lazy(() => import('./components/Hilfsmittel'))
const Schema = lazy(() => import('./components/Schema'))
const Uebungsblaetter = lazy(() => import('./components/Uebungsblaetter'))
const Dateien = lazy(() => import('./components/Dateien'))
const Quiz = lazy(() => import('lernseiten-ui').then(m => ({ default: m.Quiz })))
const Flashcards = lazy(() => import('lernseiten-ui').then(m => ({ default: m.Flashcards })))

// Tab-IDs, -Reihenfolge und -Icons sind über alle Lernseiten vereinheitlicht;
// die Tab-Leiste kommt zentral aus lernseiten-ui (tabDefs). 'schema' ist der
// DB-Sonderfall und hängt als letzter Tab hinten an.
const TABS = [...STANDARD_TAB_REIHENFOLGE, 'schema'] as const
export type TabId = (typeof TABS)[number]
const tabs = tabDefs(TABS)

// Alten Tab-Hash auf die vereinheitlichte ID umleiten (Lesezeichen/Deep-Links).
if (typeof window !== 'undefined') {
  const teile = window.location.hash.replace(/^#/, '').split('/')
  if (teile[0] === 'themen') {
    teile[0] = 'referenz'
    history.replaceState(null, '', '#' + teile.join('/'))
  }
}

function App() {
  const [activeTab, setActiveTab] = useHashTab(TABS, 'uebung')
  const { theme, toggle } = useTheme()

  return (
    <>
      <Header logo={<>Datenbanksysteme</>} subtitle="Pine Valley & Northwind Datenbank" current="datenbanken" theme={theme} onToggleTheme={toggle} />
      <div className="container">
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="no-print" style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.75rem' }}>
          <GlobalSearch loadIndex={() => import('./data/searchIndex').then(m => m.searchIndex)} onNavigate={t => setActiveTab(t as TabId)} />
        </div>
        <Suspense fallback={<div className="card"><p className="quiz-hint">Lädt …</p></div>}>
          {activeTab === 'referenz' && <Referenz />}
          {activeTab === 'hilfsmittel' && <Hilfsmittel />}
          {activeTab === 'schema' && <Schema />}
          {activeTab === 'quiz' && <Quiz fragen={quizFragen} />}
          {activeTab === 'uebung' && <Uebungsblaetter />}
          {activeTab === 'moodle' && <Dateien />}
          {activeTab === 'karten' && <Flashcards cards={karteikarten} />}
        </Suspense>
      </div>
    </>
  )
}

export default App
