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

// --- Quiz ---
// Drei Fragetypen mit reichem Feedback. Jede Option kann begründen, warum sie
// (bei falscher Wahl) nicht stimmt; jede Frage hat eine Erklärung der Lösung.

export interface QuizOption {
  text: string
  /** Wird gezeigt, wenn diese (falsche) Option gewählt wurde: warum sie nicht stimmt. */
  warumFalsch?: string
}

interface QuizBasis {
  frage: string
  /** Erklärung der korrekten Lösung – wird nach dem Beantworten immer gezeigt. */
  erklaerung: string
  /** Optionale Quelle, z.B. "Übungsblatt 3, Aufgabe 2". */
  quelle?: string
}

/** Single-Choice: genau eine von vier Optionen ist richtig. */
export interface QuizSingle extends QuizBasis {
  art: 'single'
  optionen: QuizOption[]
  /** Index der richtigen Option. */
  richtige: number
}

/** Multiple-Select: mehrere von vier Optionen sind richtig (anklicken, dann prüfen). */
export interface QuizMulti extends QuizBasis {
  art: 'multi'
  optionen: QuizOption[]
  /** Indizes aller richtigen Optionen. */
  richtige: number[]
}

/** Zuordnung per Drag & Drop: jeder Begriff wird seinem passenden Ziel zugeordnet. */
export interface QuizZuordnung extends QuizBasis {
  art: 'zuordnung'
  /** Begriff (zieht man) und das korrekt zugehörige Ziel. Ziele müssen eindeutig sein. */
  paare: { begriff: string; ziel: string }[]
}

/** Reihenfolge: Schritte/Items per Drag in die richtige Reihenfolge bringen. */
export interface QuizReihenfolge extends QuizBasis {
  art: 'reihenfolge'
  /** Items in der KORREKTEN Reihenfolge (werden gemischt angezeigt). */
  schritte: string[]
}

/** Kategorisieren: jedes Item per Drag in seine korrekte Kategorie einsortieren. */
export interface QuizKategorien extends QuizBasis {
  art: 'kategorien'
  kategorien: string[]
  items: { text: string; kategorie: string }[]
}

/** Freie Eingabe: Antwort eintippen. Bei gesetzter Toleranz numerischer Vergleich. */
export interface QuizEingabe extends QuizBasis {
  art: 'eingabe'
  /** Akzeptierte Antworten (normalisiert verglichen). */
  loesungen: string[]
  /** Optionale numerische Toleranz; wenn gesetzt, wird als Zahl verglichen. */
  toleranz?: number
  /** Optionaler Platzhalter im Eingabefeld (z.B. Einheit). */
  platzhalter?: string
}

/** Wahr/Falsch: mehrere Aussagen, jede als wahr oder falsch markieren. */
export interface QuizWahrFalsch extends QuizBasis {
  art: 'wahrfalsch'
  aussagen: { text: string; wahr: boolean; warum?: string }[]
}

export type QuizFrage =
  | QuizSingle
  | QuizMulti
  | QuizZuordnung
  | QuizReihenfolge
  | QuizKategorien
  | QuizEingabe
  | QuizWahrFalsch

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
  aufgabeId?: string
  relevantTables?: string[]
  tabellen?: NamedTable[]
  sqlQuery?: string
  queryResult?: QueryResult
  loesung?: LoesungBlock[]
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
  tasks: UebungsblattTask[]
}
