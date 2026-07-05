import { lazy, Suspense } from 'react'
import Tabs from './components/Tabs'
import { Header, GlobalSearch, useTheme, useHashTab } from 'lernseiten-ui'
import { quizFragen } from './data/quiz'
import { karteikarten } from './data/karteikarten'

const Themen = lazy(() => import('./components/Themen'))
const Hilfsmittel = lazy(() => import('./components/Hilfsmittel'))
const Schema = lazy(() => import('./components/Schema'))
const Uebungsblaetter = lazy(() => import('./components/Uebungsblaetter'))
const Dateien = lazy(() => import('./components/Dateien'))
const Quiz = lazy(() => import('lernseiten-ui').then(m => ({ default: m.Quiz })))
const Flashcards = lazy(() => import('lernseiten-ui').then(m => ({ default: m.Flashcards })))

// Tab-IDs sind über alle Lernseiten vereinheitlicht (uebung/referenz/
// hilfsmittel/moodle/quiz/karten); 'schema' ist der DB-Sonderfall und steht
// als letzter Tab (Karteikarten dafür an vierter Stelle – bewusste Abweichung
// von der sonstigen „Karteikarten zuletzt"-Reihenfolge).
export type TabId = 'uebung' | 'referenz' | 'hilfsmittel' | 'karten' | 'moodle' | 'quiz' | 'schema'

const TABS: readonly TabId[] = ['uebung', 'referenz', 'hilfsmittel', 'karten', 'moodle', 'quiz', 'schema']

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
        <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.75rem' }}>
          <GlobalSearch loadIndex={() => import('./data/searchIndex').then(m => m.searchIndex)} onNavigate={t => setActiveTab(t as TabId)} />
        </div>
        <Suspense fallback={<div className="card"><p className="quiz-hint">Lädt …</p></div>}>
          {activeTab === 'referenz' && <Themen />}
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
