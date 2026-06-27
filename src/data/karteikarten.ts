import type { FlashCard } from 'lernseiten-ui'
import { aufgaben } from './aufgaben'
import { quizFragen } from './quiz'
import { themen } from './themen'

// Karteikarten werden aus vorhandenen Inhalten abgeleitet: SQL-Aufgaben
// (Frage → Musterlösung), Quizfragen (Frage → Erklärung) und Themen
// (Titel → Kurzbeschreibung). So bleibt nur eine Quelle zu pflegen.
// Bei Bedarf hier eigene Karten ergänzen.
export const karteikarten: FlashCard[] = [
  ...aufgaben.map(a => ({
    id: `a-${a.id}`,
    front: a.text,
    back: a.sql,
    tag: a.title,
  })),
  ...quizFragen.map((q, i) => ({
    id: `q-${i}`,
    front: q.frage,
    back: q.erklaerung,
    tag: q.quelle,
  })),
  ...themen.map(t => ({
    id: `t-${t.id}`,
    front: t.title,
    back: t.subtitle,
    tag: 'Thema',
  })),
]
