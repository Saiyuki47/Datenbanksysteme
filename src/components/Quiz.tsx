import React, { useState, useCallback } from 'react'
import { quizData } from '../data/quiz'

type QuizState = 'playing' | 'answered' | 'finished'

export default function Quiz() {
  const [qi, setQi] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [quizState, setQuizState] = useState<QuizState>('playing')

  const q = quizData[qi]!
  const progress = Math.round((qi / quizData.length) * 100)
  const isAnswered = quizState === 'answered'

  const handleAnswer = useCallback((idx: number) => {
    if (quizState !== 'playing') return
    setSelected(idx)
    setQuizState('answered')
    if (idx === q.ans) setScore(s => s + 1)
  }, [quizState, q.ans])

  const handleNext = useCallback(() => {
    if (qi + 1 >= quizData.length) {
      setQuizState('finished')
    } else {
      setQi(i => i + 1)
      setSelected(null)
      setQuizState('playing')
    }
  }, [qi])

  const handleReset = useCallback(() => {
    setQi(0)
    setScore(0)
    setSelected(null)
    setQuizState('playing')
  }, [])

  const header = (
    <div className="section-header">
      <h2>Quiz-Modus</h2>
      <p>Teste dein SQL-Wissen mit {quizData.length} Fragen.</p>
    </div>
  )

  if (quizState === 'finished') {
    const pct = Math.round((score / quizData.length) * 100)
    const msg =
      score >= 7
        ? 'Ausgezeichnet! Du beherrschst SQL sehr gut.'
        : score >= 5
        ? 'Gut! Noch ein bisschen Übung.'
        : 'Schau nochmal ins Cheatsheet und die Aufgaben!'
    return (
      <div>
        {header}
        <div className="card">
          <div className="progress-wrap">
            <div className="progress-bar progress-bar--full" />
          </div>
          <div className="result-box">
            <div className="result-score">{score}/{quizData.length}</div>
            <p className="result-label">{pct}% richtig &mdash; {msg}</p>
            <button type="button" className="nav-btn" onClick={handleReset}>↺ Nochmal starten</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {header}
      <div className="card">
        <div className="progress-wrap">
          <div className="progress-bar" style={{ '--bar-w': `${progress}%` } as React.CSSProperties} />
        </div>
        <p className="quiz-num">Frage {qi + 1} / {quizData.length}</p>
        <p className="quiz-q">{q.q}</p>
        <div className="options">
          {q.opts.map((opt, i) => {
            let cls = 'opt-btn'
            if (isAnswered) {
              if (i === q.ans) cls += ' correct'
              else if (i === selected) cls += ' wrong'
            }
            return (
              <button
                type="button"
                key={`${qi}-${opt}`}
                className={cls}
                disabled={isAnswered}
                onClick={() => handleAnswer(i)}
              >
                {opt}
              </button>
            )
          })}
        </div>
        <p
          className={`quiz-feedback${isAnswered ? (selected === q.ans ? ' quiz-feedback--correct' : ' quiz-feedback--wrong') : ''}`}
        >
          {isAnswered
            ? (selected === q.ans ? '✓ Richtig! ' : '✗ Nicht ganz. ') + q.exp
            : ''}
        </p>
        <div className="quiz-nav">
          <span className="score-pill">{score} / {qi} richtig</span>
          <button type="button" className="nav-btn" disabled={!isAnswered} onClick={handleNext}>
            Weiter →
          </button>
        </div>
      </div>
    </div>
  )
}
