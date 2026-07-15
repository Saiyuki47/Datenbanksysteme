import type { Uebungsblatt } from '../../types'

export const blatt7: Uebungsblatt = {
  id: 'blatt7',
  nr: '7',
  pdf: 'dateien_aus_moodle/übung 7/Übungsblatt 7.pdf',
  typ: 'Gruppen- & Hausaufgaben',
  beschreibung:
    'SQL: Aufbau und Reihenfolge der SELECT-Klauseln, Übersetzung der Algebra-Anfragen nach SQL, Operatorbaum-' +
    'Optimierung mit zugehörigem SQL, Mehrtabellen-Joins (inkl. Self-Join) sowie Daten­definition/-manipulation ' +
    '(CREATE, DROP, INSERT, DELETE, UPDATE).',
  tasks: [
    {
      nr: 1,
      referenz: ['grundabfrage', 'gruppieren'],
      titel: 'Gruppenaufgabe 1 – Reihenfolge der SELECT-Klauseln',
      text:
        'In welcher Reihenfolge stehen die Klauseln SELECT, FROM, WHERE, GROUP BY, HAVING und ORDER BY in einem ' +
        'SELECT-Statement, und welche Funktion hat jede?',
      loesung: [
        {
          art: 'tabelle',
          titel: 'Syntaktische Reihenfolge im SELECT-Statement',
          columns: ['Klausel', 'Funktion'],
          rows: [
            ['SELECT', 'Selektion (Auswahl) der Spalten'],
            ['FROM', 'Angabe der Basistabellen'],
            ['WHERE', 'Selektion der Zeilen'],
            ['GROUP BY', 'Gruppierung der Zeilen'],
            ['HAVING', 'Selektion der Gruppen'],
            ['ORDER BY', 'Sortieren der Ergebnismenge'],
          ],
        },
        {
          art: 'text',
          text:
            'Merkhilfe: Geschrieben wird in der Reihenfolge SELECT–FROM–WHERE–GROUP BY–HAVING–ORDER BY. ' +
            'LOGISCH ausgewertet wird aber anders: zuerst FROM, dann WHERE, GROUP BY, HAVING, dann SELECT und zuletzt ' +
            'ORDER BY. Daher kann man in WHERE noch keine SELECT-Aliase verwenden, in ORDER BY dagegen schon.',
        },
      ],
    },
    {
      nr: 2,
      referenz: ['sql-zu-algebra'],
      titel: 'Gruppenaufgabe 2 – Algebra-Anfragen als SQL',
      text:
        'Formulieren Sie die Algebra-Anfragen aus Blatt 5 nun als SQL und beschreiben Sie den Zusammenhang zwischen ' +
        'beiden.\n\n' +
        'a) Namen der Studierenden\n' +
        'b) Vorlesungen mit 4 SWS\n' +
        'c) AssistentInnen der Fachgebiete „Ideenlehre"/„Sprachtheorie"\n' +
        'd) Namen unter Studierenden oder ProfessorInnen\n' +
        'e) Vorlesung (Titel) mit lesender ProfessorIn (Name)\n' +
        'f) Vorlesungen von Augustinus\n' +
        'g) AssistentInnen, deren Chef eine 4-SWS-Vorlesung hält.',
      loesung: [
        { art: 'code', titel: 'a)', text: 'SELECT Name\nFROM Studenten;' },
        { art: 'code', titel: 'b)', text: 'SELECT *\nFROM Vorlesungen\nWHERE SWS = 4;' },
        { art: 'code', titel: 'c)', text: "SELECT Name\nFROM Assistenten\nWHERE Fachgebiet = 'Ideenlehre'\n   OR Fachgebiet = 'Sprachtheorie';" },
        { art: 'code', titel: 'd) – „oder" über Spalten ⇒ UNION', text: 'SELECT Name FROM Studenten\nUNION\nSELECT Name FROM Professoren;' },
        { art: 'code', titel: 'e) – impliziter Join über WHERE', text: 'SELECT Titel, Name\nFROM Vorlesungen, Professoren\nWHERE Vorlesungen.gelesenVon = Professoren.PersNr;' },
        { art: 'code', titel: 'f)', text: "SELECT Titel\nFROM Vorlesungen, Professoren\nWHERE gelesenVon = PersNr\n  AND Name = 'Augustinus';" },
        { art: 'code', titel: 'g) – DISTINCT gegen Duplikate', text: 'SELECT DISTINCT Name\nFROM Assistenten, Vorlesungen\nWHERE Assistenten.Boss = Vorlesungen.gelesenVon\n  AND SWS = 4;' },
        {
          art: 'text',
          text:
            'Zusammenhang: σ wird zur WHERE-Klausel, π zur SELECT-Spaltenliste, ⋈ zum (impliziten) Join über die ' +
            'WHERE-Bedingung, ∪ zu UNION. Jeder Algebra-Operator hat also ein direktes SQL-Pendant.',
        },
      ],
    },
    {
      nr: 3,
      referenz: ['relationale-algebra'],
      titel: 'Gruppenaufgabe 3 – Operatorbaum optimieren + SQL',
      text:
        'Der Ausdruck π[Name] σ[VorlNr=Nachfolger] ( σ[SWS=2] (Professoren ⋈[PersNr=gelesenVon] Vorlesungen) × voraussetzen ) ' +
        'beantwortet: „Welche ProfessorInnen halten 2-SWS-Vorlesungen, für die es vorausgesetzte Vorlesungen gibt?"\n\n' +
        'a) Zeichnen Sie den Operatorbaum.\n' +
        'b) Optimieren Sie ihn.\n' +
        'c) Geben Sie das passende SQL an.',
    },
    {
      nr: 4,
      referenz: ['joins'],
      titel: 'Hausaufgabe 1 – Mehrtabellen-Joins in SQL',
      text:
        'Formulieren Sie auf dem Universitätsschema in SQL:\n' +
        'a) Studierende (Name, MatrNr), die Prof. Sokrates aus Vorlesungen kennen.\n' +
        'b) Studierende, die eine Vorlesung hören, die auch Fichte hört.\n' +
        'c) AssistentInnen (PersNr, Name) von ProfessorInnen, die Fichte unterrichtet haben.\n' +
        'd) ProfessorInnen (PersNr, Name), die Xenokrates aus Vorlesungen kennt.\n' +
        'e) Vorlesungen (Titel), die von Studierenden im Grundstudium (1.–4. Semester) gehört werden.',
      loesung: [
        {
          art: 'code',
          titel: 'a) Kette Studenten–hören–Vorlesungen–Professoren',
          text: "SELECT s.Name, s.MatrNr\nFROM Studenten s, hoeren h, Vorlesungen v, Professoren p\nWHERE s.MatrNr   = h.MatrNr\n  AND h.VorlNr   = v.VorlNr\n  AND v.gelesenVon = p.PersNr\n  AND p.Name     = 'Sokrates';",
        },
        {
          art: 'code',
          titel: 'b) Self-Join: dieselbe Vorlesung wie Fichte',
          text: "SELECT DISTINCT s1.Name, s1.MatrNr\nFROM Studenten s1, Studenten s2, hoeren h1, hoeren h2\nWHERE s1.MatrNr  = h1.MatrNr\n  AND s2.MatrNr  = h2.MatrNr\n  AND h1.VorlNr  = h2.VorlNr\n  AND s1.MatrNr != s2.MatrNr\n  AND s2.Name    = 'Fichte';",
        },
        {
          art: 'code',
          titel: 'c) AssistentInnen der ProfessorInnen, die Fichte unterrichteten',
          text: "SELECT a.Name, a.PersNr\nFROM Assistenten a, Professoren p, Vorlesungen v, hoeren h, Studenten s\nWHERE a.Boss     = p.PersNr\n  AND p.PersNr   = v.gelesenVon\n  AND v.VorlNr   = h.VorlNr\n  AND h.MatrNr   = s.MatrNr\n  AND s.Name     = 'Fichte';",
        },
        {
          art: 'code',
          titel: 'd) ProfessorInnen, die Xenokrates aus Vorlesungen kennt',
          text: "SELECT p.PersNr, p.Name\nFROM Professoren p, hoeren h, Vorlesungen v, Studenten s\nWHERE p.PersNr   = v.gelesenVon\n  AND v.VorlNr   = h.VorlNr\n  AND h.MatrNr   = s.MatrNr\n  AND s.Name     = 'Xenokrates';",
        },
        {
          art: 'code',
          titel: 'e) Vorlesungen, gehört im Grundstudium (BETWEEN)',
          text: 'SELECT v.Titel\nFROM Vorlesungen v, hoeren h, Studenten s\nWHERE v.VorlNr = h.VorlNr\n  AND h.MatrNr = s.MatrNr\n  AND s.Semester BETWEEN 1 AND 4;',
        },
        {
          art: 'text',
          text:
            'Hinweis: Statt des impliziten Joins (Tabellen in FROM, Bedingungen in WHERE) ist überall auch der explizite ' +
            'Join (… JOIN … ON …) möglich. DISTINCT unterdrückt Duplikate, die durch die Joins entstehen können.',
        },
      ],
    },
    {
      nr: 5,
      referenz: ['create-table', 'insert'],
      titel: 'Hausaufgabe 2 – DDL & DML',
      text:
        'Formulieren Sie für das Universitätsschema:\n' +
        'a) Tabelle Abschlussarbeiten (Nummer, Titel, Abgabedatum) erstellen.\n' +
        'b) Diese Tabelle wieder löschen.\n' +
        'c) Student „Platon" mit MatrNr 1234 einfügen.\n' +
        'd) Diesen Studenten wieder löschen.\n' +
        'e) Besoldung der Professoren von C3 auf C4 ändern.',
      loesung: [
        {
          art: 'code',
          titel: 'a) CREATE TABLE',
          text: 'CREATE TABLE Abschlussarbeiten (\n  ArbeitNr     INTEGER      NOT NULL,\n  Titel        VARCHAR(50)  NOT NULL,\n  Abgabedatum  DATE\n);',
        },
        { art: 'code', titel: 'b) DROP TABLE', text: 'DROP TABLE Abschlussarbeiten;' },
        { art: 'code', titel: 'c) INSERT', text: "INSERT INTO Studenten (MatrNr, Name, Semester)\nVALUES (1234, 'Platon', 1);" },
        { art: 'code', titel: 'd) DELETE', text: 'DELETE FROM Studenten\nWHERE MatrNr = 1234;' },
        { art: 'code', titel: 'e) UPDATE (C3 → C4)', text: "UPDATE Professoren\nSET Rang = 'C4'\nWHERE Rang = 'C3';" },
      ],
    },
  ],
}
