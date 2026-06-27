import { useState } from 'react'
import Header from './components/Header'
import Tabs from './components/Tabs'
import Themen from './components/Themen'
import Schema from './components/Schema'
import Uebungsblaetter from './components/Uebungsblaetter'
import Dateien from './components/Dateien'
import { Quiz, useTheme } from 'lernseiten-ui'
import { quizFragen } from './data/quiz'

export type TabId = 'uebung' | 'themen' | 'schema' | 'moodle' | 'quiz'

function App() {
  const [activeTab, setActiveTab] = useState<TabId>('uebung')
  const { theme, toggle } = useTheme()

  return (
    <>
      <Header theme={theme} onToggleTheme={toggle} />
      <div className="container">
        <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
        {activeTab === 'themen' && <Themen />}
        {activeTab === 'schema' && <Schema />}
        {activeTab === 'quiz' && <Quiz fragen={quizFragen} />}
        {activeTab === 'uebung' && <Uebungsblaetter />}
        {activeTab === 'moodle' && <Dateien />}
      </div>
    </>
  )
}

export default App
