import type { TippSection } from '../../types'

export const blatt7Tipps: Record<string, TippSection[]> = {
  // ── Blatt 7 (SQL: SELECT, DDL/DML, Joins) ─────────────────────────────────

  'blatt7-1': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Ein SELECT-Statement hat eine feste Klauselreihenfolge. Geschrieben: SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY. Wichtig ist der Unterschied: WHERE filtert einzelne Zeilen (vor der Gruppierung), HAVING filtert Gruppen (nach GROUP BY).',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: 'Reihenfolge merken und jede Klausel zuordnen: SELECT=Spalten, FROM=Tabellen, WHERE=Zeilen, GROUP BY=Gruppen bilden, HAVING=Gruppen filtern, ORDER BY=sortieren.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'SELECT … FROM … WHERE … GROUP BY … HAVING … ORDER BY …\nLogische Auswertung dagegen: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY.',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'WHERE und HAVING verwechseln: Aggregatbedingungen (z. B. COUNT(*) > 3) gehören in HAVING, nicht in WHERE. SELECT-Spaltenaliase sind in WHERE noch nicht bekannt (erst in ORDER BY).',
    },
  ],

  'blatt7-2': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Jeder Algebra-Operator hat ein SQL-Pendant: σ → WHERE, π → SELECT-Spaltenliste, ⋈ → Join (implizit über WHERE oder explizit per JOIN…ON), ∪ → UNION. „oder" innerhalb einer Bedingung ist OR, „oder" über ganze Ergebnismengen ist UNION.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. π-Attribute → SELECT.\n2. Quelltabellen → FROM.\n3. σ-Bedingung → WHERE.\n4. ⋈ → Join-Bedingung in WHERE (z. B. gelesenVon = PersNr).\n5. ∪ → zwei SELECTs mit UNION verbinden.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: "e) SELECT Titel, Name FROM Vorlesungen, Professoren WHERE gelesenVon = PersNr;\ng) SELECT DISTINCT Name FROM Assistenten, Vorlesungen WHERE Boss = gelesenVon AND SWS = 4;",
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Die Join-Bedingung im WHERE nicht vergessen – sonst entsteht ein Kreuzprodukt. Texte in einfache Anführungszeichen. „oder" als UNION (Mengen) vs. OR (eine Bedingung) unterscheiden. DISTINCT gegen Duplikate setzen.',
    },
  ],

  'blatt7-3': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Algebra-Optimierung (heuristische Regeln): Selektionen so früh wie möglich (nahe an die Blätter), Kreuzprodukt + Selektion zu einem Join verschmelzen, nur benötigte Spalten weitertragen. Ziel: Zwischenergebnisse klein halten.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. σ[SWS=2] nach unten zur Tabelle Vorlesungen schieben (SWS gehört zu Vorlesungen).\n2. × + σ[VorlNr=Nachfolger] zu ⋈[VorlNr=Nachfolger] zusammenfassen.\n3. SQL: alle Join-Bedingungen in WHERE, v.SWS=2 und v.VorlNr=vs.Nachfolger.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'Regeln: σ[A](R × S) = σ[A](R) ⋈ S (A nur in R); σ[Bed](R × S) = R ⋈[Bed] S.\nSQL: SELECT DISTINCT p.Name FROM Professoren p, Vorlesungen v, voraussetzen vs WHERE p.PersNr=v.gelesenVon AND v.SWS=2 AND v.VorlNr=vs.Nachfolger;',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Eine Selektion nur dann zu einem Blatt schieben, wenn ihre Bedingung allein dieses Blatt betrifft. „für die es vorausgesetzte Vorlesungen gibt" ⇒ Join VorlNr = Nachfolger (in voraussetzen).',
    },
  ],

  'blatt7-4': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Mehrere Tabellen werden über ihre Schlüssel verkettet (Studenten–hoeren–Vorlesungen–Professoren). Ein Self-Join (eine Tabelle zweimal mit Aliasen s1/s2) findet Paare, die etwas gemeinsam haben (z. B. dieselbe Vorlesung).',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Den Pfad durch die Tabellen festlegen und alle Join-Bedingungen in WHERE schreiben.\n2. Endbedingung anhängen (z. B. p.Name = Sokrates).\n3. Self-Join: dieselbe Tabelle mit zwei Aliasen, über die gemeinsame VorlNr verbinden und s1 ≠ s2 fordern.\n4. „1.–4. Semester" → Semester BETWEEN 1 AND 4.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: "b) FROM Studenten s1, Studenten s2, hoeren h1, hoeren h2 WHERE s1.MatrNr=h1.MatrNr AND s2.MatrNr=h2.MatrNr AND h1.VorlNr=h2.VorlNr AND s1.MatrNr!=s2.MatrNr AND s2.Name='Fichte'.",
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Alle Join-Bedingungen angeben (n Tabellen ⇒ meist n−1 Verbindungen), sonst Kreuzprodukt. Beim Self-Join Aliase verwenden und s1.MatrNr ≠ s2.MatrNr fordern. DISTINCT gegen doppelte Treffer.',
    },
  ],

  'blatt7-5': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'DDL ändert die Struktur (CREATE/DROP TABLE), DML ändert die Daten (INSERT/UPDATE/DELETE). Jede Anweisung hat eine feste Form.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. CREATE TABLE name (Spalte Typ [NOT NULL], …).\n2. DROP TABLE name.\n3. INSERT INTO tab (Spalten) VALUES (Werte).\n4. DELETE FROM tab WHERE …\n5. UPDATE tab SET Spalte = Wert WHERE …',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: "CREATE TABLE Abschlussarbeiten (ArbeitNr INTEGER NOT NULL, Titel VARCHAR(50) NOT NULL, Abgabedatum DATE);\nUPDATE Professoren SET Rang='C4' WHERE Rang='C3';",
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Bei DELETE/UPDATE die WHERE-Klausel nicht vergessen – sonst werden ALLE Zeilen betroffen! Bei INSERT müssen Spaltenliste und VALUES zusammenpassen. Datentypen sinnvoll wählen (INTEGER, VARCHAR(n), DATE).',
    },
  ],
}
