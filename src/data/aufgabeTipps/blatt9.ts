import type { TippSection } from '../../types'

export const blatt9Tipps: Record<string, TippSection[]> = {
  // ── Blatt 9 (Subqueries, Joins, Outer Joins, Unions; Anfragen auswerten) ──

  'blatt9-1': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Anfragen „im Kopf" auswerten: WHERE filtert Zeilen, count(*) zählt Zeilen, ohne WHERE bei zwei Tabellen entsteht das Kreuzprodukt, GROUP BY bildet Gruppen und HAVING filtert diese. Sonderfall „> 10" = echt größer.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Bedingung exakt nehmen: Semester > 10 schließt 10 aus.\n2. count(*) = Anzahl passender Zeilen; zwei Tabellen ohne WHERE → Zeilen1 × Zeilen2.\n3. GROUP BY SWS, dann HAVING count(*) > 2 anwenden.\n4. e) Joins über WHERE nachvollziehen und sortieren.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'c) 7 Professoren × 10 Vorlesungen = 70. d) SWS=4 (4 Vorl.) und SWS=2 (4 Vorl.) bleiben, SWS=3 (nur 2) fällt raus. e) prüfen ⋈ Vorlesungen ⋈ Professoren, SWS=4, ORDER BY Name.',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: '„> 10" ist nicht „>= 10" (Fichte = 10 fällt raus). Aggregatbedingungen gehören in HAVING, nicht in WHERE. Ohne Verbundbedingung entsteht ein Kreuzprodukt.',
    },
  ],

  'blatt9-2': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Eine Subquery ist eine in eine andere eingebettete SELECT-Abfrage; sie liefert Werte, auf die die äußere Abfrage filtert (= bei einem Wert, IN bei mehreren). Ein Join verknüpft Tabellen über gemeinsame Schlüssel und liefert Spalten aus mehreren Tabellen.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Subquery: erst die innere Frage lösen (z. B. CategoryID von Seafood), dann mit = oder IN außen filtern.\n2. Join: Tabellen in FROM, Verbindungen in ON/WHERE, am Ende projizieren/aggregieren.\n3. Aliase verwenden; bei „pro …" GROUP BY + HAVING.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'Subquery: WHERE CategoryID = (SELECT CategoryID FROM Categories WHERE CategoryName = Seafood).\nJoin: FROM Customers c JOIN Orders o ON (c.CustomerID = o.CustomerID).',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Bei einem Subquery-Ergebnis mit mehreren Zeilen IN statt = nutzen. Apostroph im String verdoppeln (Grandma Kelly\'\'s Homestead). Join-Bedingung nicht vergessen, sonst Kreuzprodukt.',
    },
  ],

  'blatt9-3': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Anfragen auf abstrakten Tabellen T1/T2 auswerten. Wichtig: AND bindet stärker als OR; eine Bedingung wie A = 3*E wirkt wie ein Join über das Kreuzprodukt; GROUP BY zählt je Gruppe.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: "1. a) klammern: (A>=9 AND D='S') OR C=20.\n2. b) für jede T1/T2-Kombi prüfen, ob A = 3·E.\n3. c) erst C>30 filtern, dann je B zählen.",
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: "a) {9} ∪ {5,11} = 5,9,11. b) E=4 kommt in T2 zweimal vor → (12,4) erscheint doppelt.",
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'AND/OR-Präzedenz beachten (AND zuerst). Doppelte T2-Zeilen erzeugen doppelte Join-Treffer. WHERE filtert VOR GROUP BY.',
    },
  ],

  'blatt9-4': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Outer Joins behalten auch Zeilen ohne Partner: LEFT JOIN alle Zeilen der linken Tabelle, RIGHT JOIN alle der rechten, FULL JOIN alle beider (fehlende Werte werden NULL). UNION setzt Ergebnismengen untereinander zusammen.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Welche Seite soll vollständig bleiben? → LEFT/RIGHT/FULL wählen.\n2. Restliche Abfrage wie beim Inner Join (ON, GROUP BY, ORDER BY).\n3. UNION: zwei/drei gleichartige SELECTs untereinander, am Ende ein ORDER BY.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'FROM Employees e LEFT JOIN Customers c ON (e.City = c.City). Union: SELECT … FROM Employees UNION SELECT … FROM Customers ORDER BY Contact.',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'LEFT/RIGHT nicht verwechseln (welche Tabelle vollständig?). FULL JOIN wird nicht von jeder DB unterstützt. Bei UNION müssen Spaltenanzahl/-reihenfolge/-typen passen; in Oracle ORDER BY nur über überall gleich benannte Spalten.',
    },
  ],

  'blatt9-5': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Weitere Auswertungen auf T1/T2: GROUP BY/HAVING, Inner Join, Subquery und Outer Join. Stringvergleiche sind case-sensitiv (\'m\' ≠ \'M\').',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. a) D=\'m\' trifft nichts → nur D=\'XXL\' zählt.\n2. d) Inner Join: Treffer A=E zählen.\n3. e) je B zählen + MIN(C), HAVING count>=2.\n4. g) Left Join = Treffer + alle partnerlosen linken Zeilen.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'd) A=2(1)+A=4(2)+A=6(2)+A=8(1) = 6. g) 6 Treffer + 8 partnerlose T1-Zeilen = 14.',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: '\'m\' ≠ \'M\' (case-sensitiv) – häufige Falle. Left Outer Join behält ALLE linken Zeilen (auch ohne Partner, mit NULLs). HAVING filtert Gruppen, WHERE einzelne Zeilen.',
    },
  ],
}
