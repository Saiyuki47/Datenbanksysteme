import type { SearchItem } from 'lernseiten-ui'
import { uebungsblaetter } from './uebungsblaetter'
import { quizFragen } from './quiz'
import { themen } from './themen'
import { schemaData } from './schema'

// Such-Index aus den Inhalten der Seite. Jeder Treffer kennt seinen Ziel-Tab,
// damit die globale Suche direkt dorthin springen kann. Die Tab-Werte müssen
// gültige TabId-Werte sein ('uebung' | 'themen' | 'schema' | 'moodle' | 'quiz').
export const searchIndex: SearchItem[] = [
  ...uebungsblaetter.flatMap(b =>
    b.tasks.map(t => ({
      label: `${t.titel ?? `Aufgabe ${t.nr}`}: ${t.text}`,
      snippet: b.titel ?? `Übungsblatt ${b.nr}`,
      tab: 'uebung',
      keywords: b.typ,
    })),
  ),
  ...quizFragen.map(q => ({
    label: q.frage,
    snippet: 'Quizfrage',
    tab: 'quiz',
    keywords: q.quelle ?? '',
  })),
  ...themen.map(t => ({
    label: t.title,
    snippet: t.subtitle,
    tab: 'themen',
    keywords: `Thema ${t.nr}`,
  })),
  // Schema: ein Eintrag pro Tabelle (Spalten als Stichwörter).
  ...Array.from(new Set(schemaData.map(r => r.t))).map(table => {
    const cols = schemaData.filter(r => r.t === table)
    return {
      label: table,
      snippet: `Tabelle (${cols.length} Spalten)`,
      tab: 'schema',
      keywords: cols.map(c => c.c).join(' '),
    }
  }),
]
