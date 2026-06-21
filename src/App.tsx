import { useState } from 'react'
import Header from './components/Header'
import Tabs from './components/Tabs'
import Cheatsheet from './components/Cheatsheet'
import Schema from './components/Schema'
import Quiz from './components/Quiz'
import Uebungsblaetter from './components/Uebungsblaetter'
import Dateien from './components/Dateien'
import { useTheme } from './hooks/useTheme'

export type TabId = 'cheat' | 'schema' | 'quiz' | 'uebung' | 'dateien'

function App() {
  const [activeTab, setActiveTab] = useState<TabId>('uebung')
  const { theme, toggle } = useTheme()

  return (
    <>
      <Header theme={theme} onToggleTheme={toggle} />
      <div className="container">
        <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
        {activeTab === 'cheat' && <Cheatsheet />}
        {activeTab === 'schema' && <Schema />}
        {activeTab === 'quiz' && <Quiz />}
        {activeTab === 'uebung' && <Uebungsblaetter />}
        {activeTab === 'dateien' && <Dateien />}
      </div>
    </>
  )
}

export default App
