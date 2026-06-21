export type DbType = 'pv' | 'nw'
export type Difficulty = 'easy' | 'med' | 'hard'

export interface SchemaRow {
  t: string
  c: string
  ty: string
  nn: boolean
  db: DbType
}

export interface QuizQuestion {
  q: string
  opts: string[]
  ans: number
  exp: string
}

export interface AufgabeItem {
  id: string
  db: DbType
  difficulty: Difficulty
  title: string
  text: string
  sql: string
}

export interface CheatCard {
  title: string
  code: string
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

export interface UebungsblattTask {
  nr: number
  titel?: string
  text: string
  aufgabeId?: string
  relevantTables?: string[]
  queryResult?: QueryResult
  loesung?: LoesungBlock[]
}

export interface Uebungsblatt {
  id: string
  nr: string
  typ: string
  beschreibung?: string
  db?: DbType
  tasks: UebungsblattTask[]
}
