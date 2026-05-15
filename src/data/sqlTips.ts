export interface SqlTip {
  keyword: string
  description: string
  example: string
}

export const SQL_TIPS: SqlTip[] = [
  {
    keyword: 'DISTINCT',
    description:
      'Entfernt doppelte Zeilen aus dem Ergebnis. Nur eindeutige Werte werden zurückgegeben.',
    example: `SELECT DISTINCT CITY
FROM CUSTOMERS;
-- Jede Stadt erscheint nur einmal`,
  },
  {
    keyword: 'ORDER BY',
    description:
      'Sortiert das Ergebnis nach einer oder mehreren Spalten. Standard ist aufsteigend (ASC), mit DESC wird absteigend sortiert.',
    example: `SELECT NAME, PRICE
FROM PRODUCTS
ORDER BY PRICE DESC;
-- Teuerste Produkte zuerst`,
  },
  {
    keyword: 'AND',
    description:
      'Verknüpft zwei Bedingungen in der WHERE-Klausel. Beide Bedingungen müssen gleichzeitig wahr sein.',
    example: `SELECT *
FROM CUSTOMERS
WHERE CITY = 'Berlin'
  AND COUNTRY = 'Germany';`,
  },
  {
    keyword: 'OR',
    description:
      'Verknüpft zwei Bedingungen in der WHERE-Klausel. Mindestens eine Bedingung muss wahr sein.',
    example: `SELECT *
FROM PRODUCTS
WHERE CATEGORYID = 1
   OR CATEGORYID = 2;`,
  },
  {
    keyword: 'JOIN',
    description:
      'Verbindet zwei Tabellen anhand einer gemeinsamen Spalte (z. B. einem Fremdschlüssel). Mit ON wird die Verknüpfungsbedingung angegeben. Nur Zeilen, die in beiden Tabellen einen Treffer haben, erscheinen im Ergebnis (INNER JOIN).',
    example: `SELECT C.CUSTOMERNAME, O.ORDERID
FROM CUSTOMER_T C
  JOIN ORDER_T O ON C.CUSTOMERID = O.CUSTOMERID;
-- Tabellen-Alias C und O kürzen die Tabellennamen ab`,
  },
  {
    keyword: 'IS NOT NULL',
    description:
      'Prüft, ob ein Feld einen Wert enthält (nicht leer ist). NULL bedeutet „kein Wert vorhanden".',
    example: `SELECT FIRSTNAME, LASTNAME
FROM EMPLOYEES
WHERE REPORTSTO IS NOT NULL;
-- Nur Mitarbeiter mit einem Vorgesetzten`,
  },
  {
    keyword: 'IS NULL',
    description:
      'Prüft, ob ein Feld keinen Wert enthält. NULL bedeutet „kein Wert vorhanden".',
    example: `SELECT FIRSTNAME, LASTNAME
FROM EMPLOYEES
WHERE REPORTSTO IS NULL;
-- Nur Mitarbeiter ohne Vorgesetzten`,
  },
  {
    keyword: 'GROUP BY',
    description:
      'Fasst mehrere Zeilen zu Gruppen zusammen — eine Gruppe pro eindeutigem Wert der angegebenen Spalte(n). Wird zusammen mit Aggregatfunktionen wie SUM, COUNT oder AVG verwendet.',
    example: `SELECT CATEGORYID, COUNT(*) AS ANZAHL
FROM PRODUCTS
GROUP BY CATEGORYID;
-- Anzahl Produkte pro Kategorie`,
  },
  {
    keyword: 'AS',
    description:
      'Gibt einer Spalte oder einem berechneten Ausdruck im Ergebnis einen eigenen Namen (Alias). Der Alias erscheint als Spaltenüberschrift.',
    example: `SELECT UNITPRICE * QUANTITY AS GESAMTPREIS
FROM ORDERDETAILS;`,
  },
  {
    keyword: 'SUM',
    description:
      'Aggregatfunktion: Addiert alle Werte einer Spalte innerhalb einer Gruppe (oder über alle Zeilen).',
    example: `SELECT SUM(UNITPRICE * QUANTITY) AS UMSATZ
FROM ORDERDETAILS
WHERE ORDERID = 10248;`,
  },
  {
    keyword: 'COUNT',
    description:
      'Aggregatfunktion: Zählt die Anzahl der Zeilen. COUNT(*) zählt alle Zeilen, COUNT(spalte) ignoriert NULL-Werte.',
    example: `SELECT EMPLOYEEID, COUNT(*) AS BESTELLUNGEN
FROM ORDERS
GROUP BY EMPLOYEEID;`,
  },
  {
    keyword: 'AVG',
    description:
      'Aggregatfunktion: Berechnet den Durchschnitt aller Werte einer Spalte.',
    example: `SELECT AVG(UNITPRICE) AS DURCHSCHNITTSPREIS
FROM PRODUCTS;`,
  },
  {
    keyword: 'ROUND',
    description:
      'Rundet eine Zahl auf die angegebene Anzahl von Dezimalstellen.',
    example: `SELECT ROUND(3.14159, 2) FROM DUAL;
-- Ergebnis: 3.14`,
  },
  {
    keyword: 'FETCH FIRST',
    description:
      'Begrenzt die Anzahl der zurückgegebenen Zeilen (Oracle-Syntax). Standard-SQL verwendet LIMIT, Oracle ab Version 12c nutzt FETCH FIRST n ROWS ONLY.',
    example: `SELECT PRODUCTNAME, UNITPRICE
FROM PRODUCTS
ORDER BY UNITPRICE DESC
FETCH FIRST 5 ROWS ONLY;
-- Die 5 teuersten Produkte`,
  },
  {
    keyword: 'HAVING',
    description:
      'Filtert Gruppen nach einer Bedingung — wie WHERE, aber für Aggregate. HAVING kommt immer nach GROUP BY.',
    example: `SELECT CATEGORYID, COUNT(*) AS ANZ
FROM PRODUCTS
GROUP BY CATEGORYID
HAVING COUNT(*) > 5;
-- Nur Kategorien mit mehr als 5 Produkten`,
  },
  {
    keyword: 'IN',
    description:
      'Prüft, ob ein Wert in einer Liste von Werten enthalten ist. Kurzform für mehrere OR-Bedingungen.',
    example: `SELECT PRODUCTNAME
FROM PRODUCTS
WHERE CATEGORYID IN (1, 2, 3);`,
  },
  {
    keyword: 'LIKE',
    description:
      'Sucht nach einem Muster in einem Textwert. % steht für beliebig viele Zeichen, _ für genau ein Zeichen.',
    example: `SELECT COMPANYNAME
FROM CUSTOMERS
WHERE COMPANYNAME LIKE 'A%';
-- Alle Firmen, die mit A beginnen`,
  },
  {
    keyword: 'BETWEEN',
    description:
      'Prüft, ob ein Wert in einem Bereich liegt (inklusive der Grenzen).',
    example: `SELECT PRODUCTNAME, UNITPRICE
FROM PRODUCTS
WHERE UNITPRICE BETWEEN 10 AND 20;`,
  },
]

type DetectionRule = { keyword: string; pattern: RegExp }

const DETECTION_RULES: DetectionRule[] = [
  { keyword: 'DISTINCT',       pattern: /\bDISTINCT\b/i },
  { keyword: 'ORDER BY',       pattern: /\bORDER\s+BY\b/i },
  { keyword: 'AND',            pattern: /\bAND\b/i },
  { keyword: 'OR',             pattern: /\bOR\b/i },
  { keyword: 'JOIN',           pattern: /\bJOIN\b/i },
  { keyword: 'IS NOT NULL',    pattern: /\bIS\s+NOT\s+NULL\b/i },
  { keyword: 'IS NULL',        pattern: /\bIS\s+NULL\b(?!\s*--)/i },
  { keyword: 'GROUP BY',       pattern: /\bGROUP\s+BY\b/i },
  { keyword: 'AS',             pattern: /\bAS\s+\w/i },
  { keyword: 'SUM',            pattern: /\bSUM\s*\(/i },
  { keyword: 'COUNT',          pattern: /\bCOUNT\s*\(/i },
  { keyword: 'AVG',            pattern: /\bAVG\s*\(/i },
  { keyword: 'ROUND',          pattern: /\bROUND\s*\(/i },
  { keyword: 'FETCH FIRST',    pattern: /\bFETCH\s+FIRST\b/i },
  { keyword: 'HAVING',         pattern: /\bHAVING\b/i },
  { keyword: 'IN',             pattern: /\bIN\s*\(/i },
  { keyword: 'LIKE',           pattern: /\bLIKE\b/i },
  { keyword: 'BETWEEN',        pattern: /\bBETWEEN\b/i },
]

const tipMap = new Map(SQL_TIPS.map(t => [t.keyword, t]))

export function detectTips(sql: string): SqlTip[] {
  // Remove single-line comments before matching
  const cleaned = sql.replace(/--[^\n]*/g, '')
  return DETECTION_RULES
    .filter(rule => rule.pattern.test(cleaned))
    .map(rule => tipMap.get(rule.keyword))
    .filter((t): t is SqlTip => t !== undefined)
}
