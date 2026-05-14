import type { CheatCard } from '../types'

export const cheatCards: CheatCard[] = [
  {
    title: 'Grundstruktur (SELECT)',
    code: `SELECT spalte1, spalte2
FROM tabelle
WHERE bedingung
GROUP BY spalte
HAVING aggregat_bed.
ORDER BY spalte ASC|DESC;`,
  },
  {
    title: 'JOIN-Typen',
    code: `INNER JOIN t2 ON t1.id=t2.id
LEFT  JOIN t2 ON t1.id=t2.id
RIGHT JOIN t2 ON t1.id=t2.id
FULL OUTER JOIN t2 ON ...`,
  },
  {
    title: 'Aggregatfunktionen',
    code: `COUNT(*)      -- Anzahl Zeilen
SUM(spalte)   -- Summe
AVG(spalte)   -- Durchschnitt
MIN(spalte)   -- Minimum
MAX(spalte)   -- Maximum`,
  },
  {
    title: 'WHERE-Operatoren',
    code: `= <> < > <= >=
BETWEEN x AND y
IN (a, b, c)
LIKE 'A%'    -- beginnt mit A
IS NULL / IS NOT NULL
AND / OR / NOT`,
  },
  {
    title: 'Subqueries',
    code: `SELECT * FROM t
WHERE id IN (
  SELECT id
  FROM t2
  WHERE bedingung
);`,
  },
  {
    title: 'Oracle-Funktionen',
    code: `UPPER(str) / LOWER(str)
TRIM(str)
SUBSTR(str, pos, len)
ROUND(n, stellen)
NVL(wert, ersatz)
TO_DATE('01.01.24','DD.MM.YY')`,
  },
  {
    title: 'GROUP BY Regeln',
    code: `-- Alle nicht-aggregierten
-- Spalten im SELECT müssen
-- in GROUP BY stehen

SELECT land, COUNT(*)
FROM customers
GROUP BY land
HAVING COUNT(*) > 5;`,
  },
  {
    title: 'DISTINCT vs GROUP BY',
    code: `-- Duplikate entfernen:
SELECT DISTINCT city FROM t;

-- Gleichwertig:
SELECT city
FROM t
GROUP BY city;`,
  },
]
