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

function tokenizeSql(text: string, lineIndex: number): ReactNode[] {
  const nodes: ReactNode[] = []
  let lastIndex = 0

  text.replace(KW_REGEX, (match, ...args) => {
    const index = args[args.length - 2] as number
    if (index > lastIndex) {
      nodes.push(text.slice(lastIndex, index))
    }
    nodes.push(
      <span key={`kw-${lineIndex}-${index}`} className="kw">
        {match.toUpperCase()}
      </span>,
    )
    lastIndex = index + match.length
    return match
  })

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex))
  }

  return nodes
}

export function highlightSQL(sql: string): ReactNode[] {
  const lines = sql.split('\n')

  return lines.flatMap((line, lineIndex) => {
    const commentIndex = line.indexOf('--')
    const nodes: ReactNode[] = []

    if (commentIndex === -1) {
      nodes.push(...tokenizeSql(line, lineIndex))
    } else {
      nodes.push(...tokenizeSql(line.slice(0, commentIndex), lineIndex))
      nodes.push(
        <span key={`cm-${lineIndex}`} className="cm">
          {line.slice(commentIndex)}
        </span>,
      )
    }

    if (lineIndex < lines.length - 1) {
      nodes.push('\n')
    }

    return nodes
  })
}
