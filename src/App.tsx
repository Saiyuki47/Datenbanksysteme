import { useState } from 'react'
import Header from './components/Header'
import Tabs from './components/Tabs'
import Aufgaben from './components/Aufgaben'
import Cheatsheet from './components/Cheatsheet'
import Schema from './components/Schema'
import Quiz from './components/Quiz'

export type TabId = 'aufgaben' | 'cheat' | 'schema' | 'quiz'

function App() {
  const [activeTab, setActiveTab] = useState<TabId>('aufgaben')

  return (
    <>
      <Header />
      <div className="container">
        <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
        {activeTab === 'aufgaben' && <Aufgaben />}
        {activeTab === 'cheat' && <Cheatsheet />}
        {activeTab === 'schema' && <Schema />}
        {activeTab === 'quiz' && <Quiz />}
      </div>
    </>
  )
}

export default App
