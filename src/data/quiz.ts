import type { QuizQuestion } from '../types'

export const quizData: QuizQuestion[] = [
  {
    q: 'Welches Schlüsselwort entfernt Duplikate aus dem Ergebnis?',
    opts: ['DISTINCT', 'UNIQUE', 'NODUPE', 'FILTER'],
    ans: 0,
    exp: 'SELECT DISTINCT gibt jeden Wert nur einmal aus.',
  },
  {
    q: 'Mit welchem JOIN erhält man NUR Zeilen, die in BEIDEN Tabellen vorkommen?',
    opts: ['LEFT JOIN', 'FULL OUTER JOIN', 'INNER JOIN', 'CROSS JOIN'],
    ans: 2,
    exp: 'INNER JOIN gibt nur Zeilen zurück, für die in beiden Tabellen eine Übereinstimmung existiert.',
  },
  {
    q: 'Welche Klausel filtert Ergebnisse NACH einem GROUP BY?',
    opts: ['WHERE', 'FILTER', 'HAVING', 'QUALIFY'],
    ans: 2,
    exp: 'HAVING filtert aggregierte Gruppen. WHERE filtert Einzelzeilen vor der Aggregation.',
  },
  {
    q: 'Welche Funktion zählt alle Zeilen einer Tabelle?',
    opts: ['SUM(*)', 'TOTAL(*)', 'COUNT(*)', 'NUM(*)'],
    ans: 2,
    exp: 'COUNT(*) zählt alle Zeilen inkl. NULL-Werte.',
  },
  {
    q: 'Wie lautet die korrekte Tabelle für Bestellpositionen in Pine Valley?',
    opts: ['ORDERDETAILS', 'ORDER_ITEMS_T', 'ORDERLINE_T', 'ORDERS_T'],
    ans: 2,
    exp: 'Pine Valley nutzt ORDERLINE_T mit den Spalten ORDERID und PRODUCTID.',
  },
  {
    q: 'Welcher Operator prüft, ob ein Wert in einer Liste vorkommt?',
    opts: ['CONTAINS', 'IN', 'WITHIN', 'LIKE'],
    ans: 1,
    exp: 'IN (a, b, c) prüft, ob ein Wert in der angegebenen Menge liegt.',
  },
  {
    q: 'Was bewirkt ORDER BY spalte DESC?',
    opts: ['Aufsteigend sortieren', 'Zufällige Reihenfolge', 'Absteigend sortieren', 'Duplikate entfernen'],
    ans: 2,
    exp: 'DESC = descending = absteigend, von groß nach klein bzw. Z–A.',
  },
  {
    q: 'Welche Tabelle verbindet Employees und Territories in Northwind?',
    opts: ['EMPLOYEETERRITORIES', 'TERRITORIES', 'REGION', 'EMPLOYEES_T'],
    ans: 0,
    exp: 'EMPLOYEETERRITORIES ist die Verknüpfungstabelle zwischen EMPLOYEES und TERRITORIES.',
  },
]
