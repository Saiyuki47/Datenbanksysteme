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
