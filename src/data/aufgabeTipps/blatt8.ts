import type { TippSection } from '../../types'

export const blatt8Tipps: Record<string, TippSection[]> = {
  // ── Blatt 8 (Northwind / SQL-Tutorial) ────────────────────────────────────

  'blatt8-1': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Northwind ist Microsofts klassische Beispiel-Handelsdatenbank (Firma „Northwind Traders", Lebensmittel-Im-/Export). Im Diagramm zeigt ein Schlüsselsymbol den Primärschlüssel; Linien sind Fremdschlüssel-Beziehungen mit 1 und ∞ für die 1- bzw. N-Seite.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Tabellen überfliegen (Customers, Orders, Products, …) → Vertriebsdomäne erkennen.\n2. Symbole deuten: Schlüssel = PK, Linie = FK, 1…∞ = 1:N.\n3. Mit der Verbindung DBNORTHWIND verbinden (Tabellen sind dort bereits aufgesetzt).',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'Beispielbeziehung: Customers (1) ──< Orders (∞): ein Kunde hat viele Bestellungen; Orders.CustomerID ist FK auf Customers.CustomerID.',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Das ∞-Zeichen markiert die N-Seite, nicht „beliebig/unbekannt". Benutzername und Passwort der Verbindung DBNORTHWIND sind gleichnamig.',
    },
  ],

  'blatt8-2': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Einfache SELECTs: Spaltenauswahl, Sortierung (ORDER BY), Zeilenfilter (WHERE) mit Vergleichsoperatoren (=, <>, <, >, <=, >=), NULL-Prüfung (IS NULL) und Wortoperatoren (BETWEEN, IN, LIKE, NOT).',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Gewünschte Spalten in SELECT.\n2. Filter in WHERE; Strings/Daten in einfache Anführungszeichen.\n3. NULL mit IS NULL / IS NOT NULL (nicht mit =) prüfen.\n4. Muster mit LIKE (% = beliebig viele Zeichen, _ = genau eines).\n5. ORDER BY am Schluss (ASC/DESC).',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: "WHERE LastName BETWEEN 'J' AND 'M'; WHERE SupplierID IN (1,3,4); WHERE ShipPostalCode LIKE '02389%'; WHERE ReportsTo IS NULL.",
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'NULL niemals mit = vergleichen. AND bindet stärker als OR → bei Mischung klammern. In Oracle Datumsliterale wie \'19-May-1997\'. WHERE kommt vor ORDER BY.',
    },
  ],

  'blatt8-3': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Fortgeschrittene SELECTs: berechnete Felder (mit AS benennen), Aggregatfunktionen (COUNT/SUM/AVG/MIN/MAX), Gruppieren mit GROUP BY und Filtern der Gruppen mit HAVING, dazu Funktionen (FLOOR, CEIL, TO_CHAR, LOWER …).',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Berechnung in SELECT, Ergebnis per AS benennen.\n2. „pro …" → GROUP BY; Bedingung über Aggregat → HAVING (nicht WHERE).\n3. Jede Nicht-Aggregat-Spalte im SELECT muss ins GROUP BY.\n4. Oracle-Funktionen nutzen (CEIL statt CEILING, || zum Verketten, TO_CHAR für Datum).',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'SELECT CustomerID, COUNT(OrderID) AS NumOrders FROM Orders GROUP BY CustomerID HAVING COUNT(OrderID) > 15 ORDER BY NumOrders DESC;',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Gruppieren nach dem Primärschlüssel + Aggregat ist sinnlos (jede Gruppe = 1 Zeile) – das ist die „ridiculous query"; ohne Aggregat lösbar. Aggregat-Bedingungen gehören in HAVING, nicht in WHERE. In HAVING keine Aliase verwenden.',
    },
  ],
}
