// Keywords ordered longest-first so multi-word phrases match before single words
const KEYWORDS = [
  'FETCH FIRST', 'ROWS ONLY',
  'IS NOT NULL', 'IS NULL',
  'FULL OUTER JOIN', 'INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN',
  'GROUP BY', 'ORDER BY',
  'SELECT', 'DISTINCT', 'FROM', 'WHERE', 'AND', 'OR', 'NOT',
  'JOIN', 'ON', 'HAVING', 'ASC', 'DESC', 'AS', 'IN', 'IS',
  'BETWEEN', 'LIKE', 'COUNT', 'SUM', 'AVG', 'MIN', 'MAX',
  'ROUND', 'NVL', 'UPPER', 'LOWER', 'TRIM', 'SUBSTR', 'TO_DATE',
]

const KW_PATTERN = KEYWORDS.map(k => k.replace(/\s+/g, '\\s+')).join('|')
const KW_REGEX = new RegExp(`\\b(${KW_PATTERN})\\b`, 'gi')

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function applyKeywords(escaped: string): string {
  return escaped.replace(KW_REGEX, m => `<span class="kw">${m.toUpperCase()}</span>`)
}

export function highlightSQL(sql: string): string {
  return sql
    .split('\n')
    .map(line => {
      const ci = line.indexOf('--')
      if (ci === -1) return applyKeywords(escapeHtml(line))
      return (
        applyKeywords(escapeHtml(line.slice(0, ci))) +
        `<span class="cm">${escapeHtml(line.slice(ci))}</span>`
      )
    })
    .join('\n')
}
