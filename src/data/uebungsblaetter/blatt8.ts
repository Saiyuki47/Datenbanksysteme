import type { Uebungsblatt } from '../../types'

export const blatt8: Uebungsblatt = {
  id: 'blatt8',
  nr: '8',
  typ: 'Gruppen- & Hausaufgaben',
  beschreibung:
    'SQL-Praxis mit der Northwind-Datenbank (Webucator-Tutorial): einfache SELECTs (Spalten, Sortierung, WHERE mit ' +
    'Vergleichs- und Wortoperatoren, NULL, AND/OR) sowie fortgeschrittene SELECTs (berechnete Felder, ' +
    'Aggregatfunktionen, GROUP BY/HAVING, DISTINCT, Funktionen). SQL hier in Oracle-Syntax.',
  anmerkung: {
    titel: 'Hinweis zur Northwind-DB (Oracle)',
    punkte: [
      'Die Northwind-Tabellen stehen auch im Tab „Schema". Der Zugriff erfolgt über die bereitgestellte Verbindung „DBNORTHWIND" (Benutzer/Passwort gleichnamig).',
      'In Oracle heißt die Tabelle Order_Details (mit Unterstrich) und die Verkettung erfolgt mit ||.',
      'Es ist jeweils eine Beispiellösung angegeben; oft gibt es mehrere richtige Formulierungen.',
    ],
  },
  tasks: [
    {
      nr: 1,
      titel: 'Gruppenaufgabe 1 – Northwind-Datenbank & Notation',
      text:
        'a) Um was für eine Datenbank handelt es sich bei Northwind? b) Wofür stehen die Symbole an den Spalten und die ' +
        'Beziehungsnotation im Diagramm? c) Bauen Sie die Northwind-Datenbank in Ihrer Verbindung auf.',
      loesung: [
        {
          art: 'unterpunkt',
          label: 'a) Was ist Northwind?',
          text: 'Northwind ist eine bekannte Beispieldatenbank von Microsoft (für SQL Server / Access). Sie enthält die Verkaufsdaten von „Northwind Traders", einem fiktiven Im-/Export-Unternehmen für Spezialitäten-Lebensmittel – also eine klassische Handels-/Vertriebsdatenbank (Kunden, Bestellungen, Produkte, Lieferanten, Mitarbeiter, Versand).',
        },
        {
          art: 'unterpunkt',
          label: 'b) Notation im Diagramm',
          text: 'Die Symbole codieren Schlüssel und Beziehungen:',
          punkte: [
            'Ein Schlüssel-Symbol bzw. fett/unterstrichene Spalte = Primärschlüssel der Tabelle (z. B. CustomerID, OrderID).',
            'Eine Linie zwischen zwei Tabellen = Fremdschlüssel-Beziehung; sie verbindet das FK-Attribut mit dem PK der anderen Tabelle.',
            'Die „1" an einem Linienende und das „∞" (Unendlich-Zeichen) am anderen Ende geben die Funktionalität an: 1 : ∞ = 1:N (z. B. ein Kunde hat viele Bestellungen).',
          ],
        },
        {
          art: 'unterpunkt',
          label: 'c) Verbindung zur Northwind-DB',
          text: 'Mit der bereitgestellten Datenbankverbindung „DBNORTHWIND" verbinden (Benutzername und Passwort sind ebenfalls DBNORTHWIND). Die Northwind-Tabellen sind dort bereits aufgesetzt; man kann sie sofort abfragen. (Praktische Einrichtung.)',
        },
      ],
    },
    {
      nr: 2,
      titel: 'Gruppenaufgabe 2 – Tutorial Teil 1: Simple SELECTs',
      text:
        'Erarbeiten Sie die in den orangefarbenen Boxen verdeckten SQL-Statements von Teil 1 (Simple SELECTs). ' +
        'Nachfolgend die Musterlösungen der Übungen, gruppiert nach Abschnitt.',
      loesung: [
        {
          art: 'code',
          titel: 'Alle Spalten aller Zeilen (Exploring the Tables)',
          text:
            'SELECT * FROM Categories;\nSELECT * FROM Customers;\nSELECT * FROM Employees;\nSELECT * FROM Orders;\nSELECT * FROM Products;\nSELECT * FROM Shippers;\nSELECT * FROM Suppliers;',
        },
        {
          art: 'code',
          titel: 'Bestimmte Spalten',
          text:
            'SELECT CategoryName, Description FROM Categories;\nSELECT ContactName, CompanyName, ContactTitle, Phone FROM Customers;\nSELECT EmployeeID, Title, FirstName, LastName, Region FROM Employees;\nSELECT RegionID, RegionDescription FROM Region;\nSELECT CompanyName, Fax, Phone, HomePage FROM Suppliers;',
        },
        {
          art: 'code',
          titel: 'Sortieren (ORDER BY)',
          text:
            'SELECT CategoryName, Description FROM Categories ORDER BY CategoryName;\nSELECT ContactName, CompanyName, ContactTitle, Phone FROM Customers ORDER BY Phone;\nSELECT FirstName, LastName, HireDate FROM Employees ORDER BY HireDate DESC;\nSELECT OrderID, OrderDate, ShippedDate, CustomerID, Freight FROM Orders ORDER BY Freight DESC;\nSELECT CompanyName, Fax, Phone, HomePage, Country FROM Suppliers ORDER BY Country DESC, CompanyName;\nSELECT Title, FirstName, LastName FROM Employees ORDER BY Title ASC, LastName DESC;',
        },
        {
          art: 'code',
          titel: 'WHERE – Gleichheit/Ungleichheit',
          text:
            "SELECT CompanyName, ContactName FROM Customers WHERE City = 'Buenos Aires';\nSELECT ProductName, UnitPrice, QuantityPerUnit FROM Products WHERE UnitsInStock = 0;\nSELECT OrderDate, ShippedDate, CustomerID, Freight FROM Orders WHERE OrderDate = '19-May-1997';\nSELECT FirstName, LastName, Country FROM Employees WHERE Country <> 'USA';",
        },
        {
          art: 'code',
          titel: 'WHERE – größer/kleiner',
          text:
            "SELECT EmployeeID, OrderID, CustomerID, RequiredDate, ShippedDate FROM Orders WHERE ShippedDate > RequiredDate;\nSELECT City, CompanyName, ContactName FROM Customers WHERE City < 'C';\nSELECT OrderID, OrderDate, Freight FROM Orders WHERE Freight > 500;\nSELECT ProductName, UnitsInStock, UnitsOnOrder, ReorderLevel FROM Products WHERE UnitsInStock <= ReorderLevel;",
        },
        {
          art: 'code',
          titel: 'WHERE – NULL prüfen',
          text:
            'SELECT CompanyName, ContactName, Fax FROM Customers WHERE Fax IS NOT NULL;\nSELECT FirstName, LastName FROM Employees WHERE ReportsTo IS NULL;',
        },
        {
          art: 'code',
          titel: 'WHERE + ORDER BY',
          text:
            "SELECT CompanyName, ContactName, Fax FROM Customers WHERE Fax IS NOT NULL ORDER BY CompanyName;\nSELECT City, CompanyName, ContactName FROM Customers WHERE City < 'C' ORDER BY ContactName DESC;",
        },
        {
          art: 'code',
          titel: 'Wortoperatoren (BETWEEN, IN, LIKE, NOT)',
          text:
            "SELECT FirstName, LastName, BirthDate FROM Employees WHERE BirthDate BETWEEN '1-Jan-1950' AND '31-Dec-1959';\nSELECT ProductName, SupplierID FROM Products WHERE SupplierID IN (1, 3, 4);\nSELECT ShipPostalCode, OrderID, OrderDate FROM Orders WHERE ShipPostalCode LIKE '02389%';\nSELECT ContactName, ContactTitle, CompanyName FROM Customers WHERE NOT ContactTitle LIKE '%Sales%';",
        },
        {
          art: 'code',
          titel: 'Mehrere Bedingungen (AND/OR, Klammern)',
          text:
            "SELECT FirstName, LastName, City FROM Employees WHERE Region = 'WA' AND City <> 'Seattle';\nSELECT CompanyName, ContactTitle, City, Country FROM Customers WHERE Country = 'Mexico' OR (Country = 'Spain' AND City <> 'Madrid');",
        },
        {
          art: 'text',
          text:
            'Wichtig: AND wird vor OR ausgewertet – bei gemischten Bedingungen Klammern setzen, damit das Ergebnis ' +
            'eindeutig ist (siehe Seattle/Redmond-Beispiel im Tutorial).',
        },
      ],
    },
    {
      nr: 3,
      titel: 'Hausaufgabe 1 – Tutorial Teil 2: Advanced SELECTs',
      text:
        'Erarbeiten Sie die abzugebenden SQL-Statements aus Teil 2 (Advanced SELECTs): berechnete Felder, ' +
        'Aggregatfunktionen mit GROUP BY/HAVING und Datenmanipulations-Funktionen. Beantworten Sie zusätzlich die ' +
        'versteckte Frage zur „ridiculous query".',
      loesung: [
        {
          art: 'code',
          titel: 'Berechnete Felder (Calculations)',
          text:
            'SELECT UnitPrice, Quantity, Discount,\n       UnitPrice * Quantity * (1 - Discount) AS TotalPrice\nFROM Order_Details;\n\nSELECT FirstName || \' \' || LastName ||\n       \' can be reached at x\' || Extension || \'.\' AS ContactInfo\nFROM Employees;',
        },
        {
          art: 'code',
          titel: 'Aggregatfunktionen + GROUP BY / HAVING',
          text:
            'SELECT ProductID, SUM(Quantity) AS TotalUnits\nFROM Order_Details\nGROUP BY ProductID\nHAVING SUM(Quantity) < 200;\n\nSELECT ProductID, AVG(UnitPrice) AS AveragePrice\nFROM Products\nGROUP BY ProductID\nHAVING AVG(UnitPrice) > 70\nORDER BY AveragePrice;\n\nSELECT CustomerID, COUNT(OrderID) AS NumOrders\nFROM Orders\nGROUP BY CustomerID\nHAVING COUNT(OrderID) > 15\nORDER BY NumOrders DESC;',
        },
        {
          art: 'unterpunkt',
          label: 'Warum ist Abfrage 2 „ridiculous"?',
          text: 'In der Products-Tabelle ist ProductID der Primärschlüssel – jede Gruppe (GROUP BY ProductID) enthält also genau EINE Zeile. Der „Durchschnitt" über eine einzige Zeile ist einfach der Wert selbst. Die Aggregation ist daher überflüssig; dasselbe Ergebnis bekommt man ohne Aggregatfunktion:',
        },
        {
          art: 'code',
          text: 'SELECT ProductID, UnitPrice\nFROM Products\nWHERE UnitPrice > 70\nORDER BY UnitPrice;',
        },
        {
          art: 'code',
          titel: 'Datenmanipulations-Funktionen (Oracle)',
          text:
            'SELECT UnitsInStock, UnitPrice,\n       UnitsInStock * UnitPrice AS TotalPrice,\n       FLOOR(UnitsInStock * UnitPrice) AS TotalPriceDown,\n       CEIL(UnitsInStock * UnitPrice)  AS TotalPriceUp\nFROM Products\nORDER BY TotalPrice DESC;\n\nSELECT FLOOR((HireDate - BirthDate) / 365.25) AS HireAgeInaccurate,\n       (HireDate - BirthDate) / 365.25       AS HireAgeAccurate\nFROM Employees;\n\nSELECT FirstName, LastName, TO_CHAR(BirthDate, \'MONTH\') AS BirthMonth\nFROM Employees\nWHERE TO_CHAR(BirthDate, \'MM\') = TO_CHAR(SYSDATE, \'MM\');\n\nSELECT LOWER(ContactTitle) AS Title\nFROM Customers;',
        },
        {
          art: 'text',
          text:
            'Reihenfolge der Klauseln: SELECT – FROM – WHERE – GROUP BY – HAVING – ORDER BY. Regeln: Jede ' +
            'Nicht-Aggregat-Spalte im SELECT muss auch im GROUP BY stehen; in HAVING sind keine Aliase erlaubt, in ' +
            'ORDER BY hingegen schon.',
        },
      ],
    },
  ],
}
