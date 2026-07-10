import type { Uebungsblatt } from '../../types'

export const blatt9: Uebungsblatt = {
  id: 'blatt9',
  nr: '9',
  typ: 'Gruppen- & Hausaufgaben',
  beschreibung:
    'SQL-Ergebnisse „von Hand" bestimmen (Uni-Schema und abstrakte Tabellen T1/T2 mit Selektion, GROUP BY/HAVING, ' +
    'Joins, Subqueries und Outer Joins) sowie Subqueries/Joins/Outer Joins aus dem Northwind-Tutorial (Teil 3).',
  anmerkung: {
    titel: 'Hinweis',
    punkte: [
      'SQL in Oracle-Syntax; Stringvergleiche sind case-sensitiv (z. B. \'m\' ≠ \'M\').',
      'AND bindet stärker als OR – bei gemischten Bedingungen auf die Auswertungsreihenfolge achten.',
    ],
  },
  tasks: [
    {
      nr: 1,
      referenz: ['grundabfrage', 'gruppieren', 'joins'],
      titel: 'Gruppenaufgabe 1 – SQL-Anfragen auswerten (Uni-Schema)',
      text:
        'Bestimmen Sie die Ergebnisse der folgenden Anfragen „von Hand" und prüfen Sie sie im SQL Developer.',
      tabellen: [
        { titel: 'Studenten', columns: ['MatrNr', 'Name', 'Semester'], rows: [['24002', 'Xenokrates', '18'], ['25403', 'Jonas', '12'], ['26120', 'Fichte', '10'], ['26830', 'Aristoxenos', '8'], ['27550', 'Schopenhauer', '6'], ['28106', 'Carnap', '3'], ['29120', 'Theophrastos', '2'], ['29555', 'Feuerbach', '2']] },
        { titel: 'Vorlesungen', columns: ['VorlNr', 'Titel', 'SWS', 'gelesenVon'], rows: [['5001', 'Grundzüge', '4', '2137'], ['5041', 'Ethik', '4', '2125'], ['5043', 'Erkenntnistheorie', '3', '2126'], ['5049', 'Mäeutik', '2', '2125'], ['4052', 'Logik', '4', '2125'], ['5052', 'Wissenschaftstheorie', '3', '2126'], ['5216', 'Bioethik', '2', '2126'], ['5259', 'Der Wiener Kreis', '2', '2133'], ['5022', 'Glaube und Wissen', '2', '2134'], ['4630', 'Die 3 Kritiken', '4', '2137']] },
        { titel: 'Professoren', columns: ['PersNr', 'Name', 'Rang', 'Raum'], rows: [['2125', 'Sokrates', 'C4', '226'], ['2126', 'Russel', 'C4', '232'], ['2127', 'Kopernikus', 'C3', '310'], ['2133', 'Popper', 'C3', '52'], ['2134', 'Augustinus', 'C3', '309'], ['2136', 'Curie', 'C4', '36'], ['2137', 'Kant', 'C4', '7']] },
        { titel: 'prüfen', columns: ['MatrNr', 'VorlNr', 'PersNr', 'Note'], rows: [['28106', '5001', '2126', '1'], ['25403', '5041', '2125', '2'], ['27550', '4630', '2137', '2']] },
      ],
      sqlQuery:
        '-- a)\nSELECT Name\nFROM Studenten\nWHERE Semester > 10;\n\n' +
        '-- b)\nSELECT count(*)\nFROM Vorlesungen\nWHERE SWS = 3;\n\n' +
        '-- c)\nSELECT count(*)\nFROM Professoren, Vorlesungen;\n\n' +
        '-- d)\nSELECT SWS, count(*)\nFROM Vorlesungen\nGROUP BY SWS\nHAVING count(*) > 2;\n\n' +
        '-- e)\nSELECT Name, Titel\nFROM Professoren prof, Vorlesungen v, pruefen p\nWHERE prof.PersNr = p.PersNr AND p.VorlNr = v.VorlNr AND SWS = 4\nORDER BY Name;',
    },
    {
      nr: 2,
      referenz: ['subqueries', 'joins'],
      titel: 'Gruppenaufgabe 2 – Tutorial Teil 3: Subqueries & Joins',
      text:
        'Bestimmen Sie die verdeckten SQL-Statements aus Teil 3 (bis Seite 13): Subqueries und (Inner) Joins. ' +
        'Nachfolgend die Musterlösungen der Übungen.',
      loesung: [
        {
          art: 'code',
          titel: 'Subqueries 1 – Produkte dreier Lieferanten',
          text: "SELECT ProductName, SupplierID\nFROM Products\nWHERE SupplierID IN (\n  SELECT SupplierID FROM Suppliers\n  WHERE CompanyName IN ('Exotic Liquids', 'Grandma Kelly''s Homestead', 'Tokyo Traders')\n);",
        },
        {
          art: 'code',
          titel: 'Subqueries 2 – Produkte der Kategorie Seafood',
          text: "SELECT ProductName\nFROM Products\nWHERE CategoryID = (\n  SELECT CategoryID FROM Categories WHERE CategoryName = 'Seafood'\n);",
        },
        {
          art: 'code',
          titel: 'Subqueries 3 – Firmen mit Produkten in CategoryID 8',
          text: 'SELECT CompanyName\nFROM Suppliers\nWHERE SupplierID IN (\n  SELECT SupplierID FROM Products WHERE CategoryID = 8\n);',
        },
        {
          art: 'code',
          titel: 'Subqueries 4 – Firmen mit Seafood-Produkten (verschachtelt)',
          text: "SELECT CompanyName\nFROM Suppliers\nWHERE SupplierID IN (\n  SELECT SupplierID FROM Products\n  WHERE CategoryID = (SELECT CategoryID FROM Categories WHERE CategoryName = 'Seafood')\n);",
        },
        {
          art: 'code',
          titel: 'Joins 1 – Mitarbeiter & Bestellungen (verspätet versandt)',
          text: 'SELECT e.FirstName, e.LastName, o.OrderID\nFROM Employees e\n  JOIN Orders o ON (e.EmployeeID = o.EmployeeID)\nWHERE o.RequiredDate < o.ShippedDate\nORDER BY e.LastName, e.FirstName;',
        },
        {
          art: 'code',
          titel: 'Joins 2 – bestellte Gesamtmenge je Produkt (< 200)',
          text: 'SELECT p.ProductName, SUM(od.Quantity) AS TotalUnits\nFROM Order_Details od\n  JOIN Products p ON (p.ProductID = od.ProductID)\nGROUP BY p.ProductName\nHAVING SUM(od.Quantity) < 200;',
        },
        {
          art: 'code',
          titel: 'Joins 3 – Bestellungen je Kunde seit 1996 (> 15)',
          text: "SELECT c.CompanyName, COUNT(o.OrderID) AS NumOrders\nFROM Customers c\n  JOIN Orders o ON (c.CustomerID = o.CustomerID)\nWHERE OrderDate > '31-Dec-1996'\nGROUP BY c.CompanyName\nHAVING COUNT(o.OrderID) > 15\nORDER BY NumOrders DESC;",
        },
        {
          art: 'code',
          titel: 'Joins 4 – Positionen über 10.000 $ (3-Tabellen-Join)',
          text: 'SELECT c.CompanyName, o.OrderID,\n       od.UnitPrice * od.Quantity * (1 - od.Discount) AS TotalPrice\nFROM Order_Details od\n  JOIN Orders o    ON (o.OrderID = od.OrderID)\n  JOIN Customers c ON (c.CustomerID = o.CustomerID)\nWHERE od.UnitPrice * od.Quantity * (1 - od.Discount) > 10000\nORDER BY TotalPrice DESC;',
        },
      ],
    },
    {
      nr: 3,
      referenz: ['grundabfrage', 'gruppieren'],
      titel: 'Gruppenaufgabe 3 – Ergebnisse auf T1/T2 bestimmen',
      text: 'Bestimmen Sie die Ergebnisse der Anfragen a)–c) auf den Tabellen T1 und T2.',
      tabellen: [
        { titel: 'T1', columns: ['A', 'B', 'C', 'D'], rows: [['1', 'blau', '10', 'X'], ['2', 'blau', '40', 'X'], ['3', 'rosa', '30', 'S'], ['4', 'orange', '10', 'M'], ['5', 'orange', '20', 'M'], ['6', 'orange', '50', 'X'], ['7', 'orange', '50', 'X'], ['8', 'magenta', '50', 'S'], ['9', 'magenta', '40', 'S'], ['10', 'violett', '10', 'XXL'], ['11', 'violett', '20', 'XXL'], ['12', 'violett', '10', 'M']] },
        { titel: 'T2', columns: ['E', 'B', 'C'], rows: [['2', 'blau', '20'], ['4', 'blau', '40'], ['4', 'blau', '50'], ['6', 'orange', '20'], ['6', 'orange', '50'], ['8', 'orange', '50']] },
      ],
      sqlQuery:
        "-- a)\nSELECT A FROM T1\nWHERE A >= 9 AND D = 'S' OR C = 20\n\n" +
        '-- b)\nSELECT A, E FROM T1, T2\nWHERE A = 3*E\n\n' +
        '-- c)\nSELECT B, COUNT(*) FROM T1\nWHERE C > 30\nGROUP BY B',
    },
    {
      nr: 4,
      referenz: ['joins', 'mengen'],
      titel: 'Hausaufgabe 1 – Tutorial Teil 3: Outer Joins & Unions',
      text:
        'Bestimmen Sie die letzten vier verdeckten Statements ab Seite 14 (Outer Joins): Left Join, Right Join, Full Outer ' +
        'Join und die Union-Übung.',
      loesung: [
        {
          art: 'unterpunkt',
          label: 'Outer Joins – Idee',
          text: 'Ein Inner Join liefert nur Zeilen mit Treffern in BEIDEN Tabellen. LEFT JOIN behält zusätzlich alle Zeilen der linken Tabelle (rechts ggf. NULL), RIGHT JOIN alle der rechten, FULL JOIN alle beider Tabellen.',
        },
        {
          art: 'code',
          titel: 'Left Join (alle Städte mit Mitarbeitern)',
          text: 'SELECT COUNT(DISTINCT e.EmployeeID) AS numEmployees,\n       COUNT(DISTINCT c.CustomerID) AS numCompanies,\n       e.City, c.City\nFROM Employees e\n  LEFT JOIN Customers c ON (e.City = c.City)\nGROUP BY e.City, c.City\nORDER BY numEmployees DESC;',
        },
        {
          art: 'code',
          titel: 'Right Join (alle Städte mit Kunden)',
          text: 'SELECT COUNT(DISTINCT e.EmployeeID) AS numEmployees,\n       COUNT(DISTINCT c.CustomerID) AS numCompanies,\n       e.City, c.City\nFROM Employees e\n  RIGHT JOIN Customers c ON (e.City = c.City)\nGROUP BY e.City, c.City\nORDER BY numEmployees DESC;',
        },
        {
          art: 'code',
          titel: 'Full Outer Join (alle Städte beider Tabellen)',
          text: 'SELECT COUNT(DISTINCT e.EmployeeID) AS numEmployees,\n       COUNT(DISTINCT c.CustomerID) AS numCompanies,\n       e.City, c.City\nFROM Employees e\n  FULL JOIN Customers c ON (e.City = c.City)\nGROUP BY e.City, c.City\nORDER BY numEmployees DESC;',
        },
        {
          art: 'code',
          titel: 'Union – Kontakt & Telefon aller Personen (Oracle)',
          text: "SELECT FirstName || ' ' || LastName AS Contact, HomePhone AS Phone\nFROM Employees\nUNION\nSELECT ContactName, Phone FROM Customers\nUNION\nSELECT ContactName, Phone FROM Suppliers\nORDER BY Contact;",
        },
        {
          art: 'text',
          text:
            'UNION entfernt Duplikate (mit UNION ALL bleiben sie erhalten). Regeln: gleiche Spaltenanzahl, gleiche ' +
            'Reihenfolge, kompatible Datentypen; in Oracle darf ORDER BY nur Spalten nutzen, die in jedem SELECT denselben Namen haben.',
        },
      ],
    },
    {
      nr: 5,
      referenz: ['gruppieren', 'joins', 'subqueries'],
      titel: 'Hausaufgabe 2 – Ergebnisse auf T1/T2 bestimmen',
      text: 'Bestimmen Sie die Ergebnisse der Anfragen a)–g) auf den Tabellen T1 und T2 (siehe Gruppenaufgabe 3).',
      sqlQuery:
        "-- a)\nSELECT B FROM T1\nWHERE A > 7 AND (D = 'm' OR D = 'XXL')\n\n" +
        '-- b)\nSELECT COUNT(*) FROM T2, T2\n\n' +
        '-- c)\nSELECT D, COUNT(D) AS ANZAHL FROM T1\nWHERE A > 6\nGROUP BY D\n\n' +
        '-- d)\nSELECT COUNT(*) FROM T1 JOIN T2 ON T1.A = T2.E\n\n' +
        "-- e)\nSELECT B, COUNT(*), MIN(C) FROM T1\nWHERE D IN ('X','XXL')\nGROUP BY B HAVING COUNT(*) >= 2\n\n" +
        '-- f)\nSELECT DISTINCT B FROM T1\nWHERE C IN (SELECT C FROM T2 WHERE E > 4)\n\n' +
        '-- g)\nSELECT COUNT(*) FROM T1 LEFT OUTER JOIN T2 ON T1.A = T2.E;',
      loesung: [
        {
          art: 'text',
          text: 'Hinweis: Stringvergleiche sind case-sensitiv – in a) ist \'m\' ≠ \'M\', daher zählt Zeile A = 12 (D = \'M\') nicht mit.',
        },
        { art: 'tabelle', titel: 'a) SELECT B … WHERE A > 7 AND (D = \'m\' OR D = \'XXL\')', columns: ['B'], rows: [['violett'], ['violett']] },
        { art: 'tabelle', titel: 'b) SELECT COUNT(*) FROM T2, T2', columns: ['COUNT(*)'], rows: [['36']] },
        { art: 'tabelle', titel: 'c) SELECT D, COUNT(D) AS ANZAHL … WHERE A > 6 GROUP BY D', columns: ['D', 'ANZAHL'], rows: [['X', '1'], ['S', '2'], ['M', '1'], ['XXL', '2']] },
        { art: 'tabelle', titel: 'd) SELECT COUNT(*) FROM T1 JOIN T2 ON T1.A = T2.E', columns: ['COUNT(*)'], rows: [['6']] },
        { art: 'tabelle', titel: 'e) SELECT B, COUNT(*), MIN(C) … WHERE D IN (\'X\',\'XXL\') GROUP BY B HAVING COUNT(*) >= 2', columns: ['B', 'COUNT(*)', 'MIN(C)'], rows: [['blau', '2', '10'], ['orange', '2', '50'], ['violett', '2', '10']] },
        { art: 'tabelle', titel: 'f) SELECT DISTINCT B … WHERE C IN (SELECT C FROM T2 WHERE E > 4)', columns: ['B'], rows: [['orange'], ['magenta'], ['violett']] },
        { art: 'tabelle', titel: 'g) SELECT COUNT(*) FROM T1 LEFT OUTER JOIN T2 ON T1.A = T2.E', columns: ['COUNT(*)'], rows: [['14']] },
      ],
    },
  ],
}
