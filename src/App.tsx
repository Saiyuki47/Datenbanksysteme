import { useState } from 'react'
import Header from './components/Header'
import Tabs from './components/Tabs'
import Cheatsheet from './components/Cheatsheet'
import Schema from './components/Schema'
import Quiz from './components/Quiz'
import Uebungsblaetter from './components/Uebungsblaetter'

export type TabId = 'cheat' | 'schema' | 'quiz' | 'uebung'

function App() {
  const [activeTab, setActiveTab] = useState<TabId>('uebung')

  return (
    <>
      <Header />
      <div className="container">
        <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
        {activeTab === 'cheat' && <Cheatsheet />}
        {activeTab === 'schema' && <Schema />}
        {activeTab === 'quiz' && <Quiz />}
        {activeTab === 'uebung' && <Uebungsblaetter />}
      </div>
    </>
  )
}

export default App
