import type { ReactNode } from 'react'

// Keywords ordered longest-first so multi-word phrases match before single words
const KEYWORDS = [
  'FETCH FIRST', 'ROWS ONLY',
  'IS NOT NULL', 'IS NULL',
  'PRIMARY KEY', 'FOREIGN KEY',
  'FULL OUTER JOIN', 'INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN',
  'GROUP BY', 'ORDER BY',
  'CREATE', 'TABLE', 'INSERT', 'INTO', 'VALUES',
  'CONSTRAINT', 'REFERENCES', 'CHECK', 'UNIQUE', 'DEFAULT',
  'SELECT', 'DISTINCT', 'FROM', 'WHERE', 'AND', 'OR', 'NOT',
  'JOIN', 'ON', 'HAVING', 'ASC', 'DESC', 'AS', 'IN', 'IS',
  'BETWEEN', 'LIKE', 'COUNT', 'SUM', 'AVG', 'MIN', 'MAX', 'LENGTH',
  'ROUND', 'NVL', 'UPPER', 'LOWER', 'TRIM', 'SUBSTR', 'TO_DATE',
  'INT', 'VARCHAR', 'NULL',
]

const KW_PATTERN = KEYWORDS.map(k => k.replace(/\s+/g, '\\s+')).join('|')
const KW_REGEX = new RegExp(`\\b(${KW_PATTERN})\\b`, 'gi')

// `baseOffset` is the absolute character position of `text` within the whole SQL
// string. Each token is keyed by its absolute offset, which uniquely and stably
// identifies it across renders (the SQL text is static and never reorders).
function tokenizeSql(text: string, baseOffset: number): ReactNode[] {
  const nodes: ReactNode[] = []
  let lastEnd = 0

  text.replace(KW_REGEX, (match, ...args) => {
    const matchStart = args[args.length - 2] as number
    if (matchStart > lastEnd) {
      nodes.push(text.slice(lastEnd, matchStart))
    }
    nodes.push(
      <span key={`kw-${baseOffset + matchStart}`} className="kw">
        {match.toUpperCase()}
      </span>,
    )
    lastEnd = matchStart + match.length
    return match
  })

  if (lastEnd < text.length) {
    nodes.push(text.slice(lastEnd))
  }

  return nodes
}

export function highlightSQL(sql: string): ReactNode[] {
  const lines = sql.split('\n')
  const nodes: ReactNode[] = []
  let base = 0 // absolute offset of the current line within `sql`

  lines.forEach((line, lineNo) => {
    const commentStart = line.indexOf('--')

    if (commentStart === -1) {
      nodes.push(...tokenizeSql(line, base))
    } else {
      nodes.push(...tokenizeSql(line.slice(0, commentStart), base))
      nodes.push(
        <span key={`cm-${base + commentStart}`} className="cm">
          {line.slice(commentStart)}
        </span>,
      )
    }

    if (lineNo < lines.length - 1) {
      nodes.push('\n')
    }
    base += line.length + 1 // +1 for the '\n' removed by split
  })

  return nodes
}
