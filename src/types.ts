export type DbType = 'pv' | 'nw'

export interface TippSection {
  icon: string
  titel: string
  inhalt: string
}
export type Difficulty = 'easy' | 'med' | 'hard'

export interface SchemaRow {
  t: string
  c: string
  ty: string
  nn: boolean
  db: DbType
}

export interface AufgabeItem {
  id: string
  db: DbType
  difficulty: Difficulty
  title: string
  text: string
  sql: string
}

export interface QueryResult {
  columns: string[]
  rows: (string | number | null)[][]
}

// Blocks for text-based (theory) solutions, rendered in order.
export type LoesungBlock =
  | { art: 'text'; text: string }
  | { art: 'liste'; punkte: string[] }
  | { art: 'unterpunkt'; label: string; text: string; punkte?: string[] }
  | { art: 'tabelle'; titel?: string; columns: string[]; rows: (string | null)[][] }
  // Preformatted, monospaced block (e.g. relational-algebra expressions).
  | { art: 'code'; titel?: string; text: string }
  // Inline SVG diagram (e.g. operator tree, decomposition tree).
  | { art: 'svg'; titel?: string; svg: string }

// A named table shown inline with the task (e.g. the Anwendungsfall tables on the sheet).
export interface NamedTable {
  titel: string
  columns: string[]
  rows: (string | null)[][]
}

export interface UebungsblattTask {
  nr: number
  titel?: string
  text: string
  // Short red marker shown next to the title (e.g. "nicht relevant").
  hinweis?: string
  // Inline SVG diagram shown with the question (e.g. an ER diagram).
  svg?: string
  // Aufgabenstellung als verschachtelte Blöcke (Text/SVG/…) statt nur text+svg –
  // damit Teilaufgaben und ihre Abbildung gruppiert stehen können (a → Bild, b → Bild).
  // Werden NACH task.text gerendert; task.svg entfällt dann.
  statementBlocks?: LoesungBlock[]
  aufgabeId?: string
  relevantTables?: string[]
  tabellen?: NamedTable[]
  sqlQuery?: string
  queryResult?: QueryResult
  loesung?: LoesungBlock[]
  // IDs der passenden Referenz-Themen → Deep-Link-Buttons „📘 Thema" (#referenz/<id>).
  referenz?: string[]
  // Fallstudien-Zusatz: aufklappbare Zusammenfassung + PDF-Links (öffnen neuen Tab).
  fallstudie?: {
    titel: string
    bloecke: LoesungBlock[]
    // Pfad relativ zu import.meta.env.BASE_URL (wird encodeURI-kodiert).
    pdfs?: { label: string; pfad: string }[]
  }
}

export interface Uebungsblatt {
  id: string
  nr: string
  typ: string
  // Optional override for the heading/selector label (e.g. "Probeklausur 1"
  // instead of the default "Übungsblatt {nr}" / "Blatt {nr}").
  titel?: string
  beschreibung?: string
  // Highlighted note box shown above the first task (e.g. lecturer remarks).
  anmerkung?: { titel?: string; punkte: string[] }
  db?: DbType
  // Pfad zum offiziellen Übungsblatt-PDF (relativ zu BASE_URL). Wird im Kopf als
  // Link „Original-PDF öffnen" gerendert (neuer Tab) – das vollständige Original.
  pdf?: string
  // Lösungen (relativ zu BASE_URL), je als „Lösung öffnen"-Link mit eigenem Label.
  // Manche Blätter haben mehrere Lösungen (offiziell + Hausaufgaben, Northwind …).
  loesungen?: { label: string; pfad: string }[]
  tasks: UebungsblattTask[]
}
