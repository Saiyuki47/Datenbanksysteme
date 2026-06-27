import Header from './components/Header'
import Tabs from './components/Tabs'
import Themen from './components/Themen'
import Schema from './components/Schema'
import Uebungsblaetter from './components/Uebungsblaetter'
import Dateien from './components/Dateien'
import { Quiz, Flashcards, GlobalSearch, useTheme, useHashTab } from 'lernseiten-ui'
import { quizFragen } from './data/quiz'
import { karteikarten } from './data/karteikarten'
import { searchIndex } from './data/searchIndex'

export type TabId = 'uebung' | 'themen' | 'schema' | 'moodle' | 'quiz' | 'karten'

const TABS: readonly TabId[] = ['uebung', 'themen', 'schema', 'moodle', 'quiz', 'karten']

function App() {
  const [activeTab, setActiveTab] = useHashTab(TABS, 'uebung')
  const { theme, toggle } = useTheme()

  return (
    <>
      <Header theme={theme} onToggleTheme={toggle} />
      <div className="container">
        <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.75rem' }}>
          <GlobalSearch index={searchIndex} onNavigate={t => setActiveTab(t as TabId)} />
        </div>
        {activeTab === 'themen' && <Themen />}
        {activeTab === 'schema' && <Schema />}
        {activeTab === 'quiz' && <Quiz fragen={quizFragen} />}
        {activeTab === 'uebung' && <Uebungsblaetter />}
        {activeTab === 'moodle' && <Dateien />}
        {activeTab === 'karten' && <Flashcards cards={karteikarten} />}
      </div>
    </>
  )
}

export default App
