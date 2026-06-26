import type { Uebungsblatt } from '../../types'

export const blatt7: Uebungsblatt = {
  id: 'blatt7',
  nr: '7',
  typ: 'Gruppen- & Hausaufgaben',
  beschreibung:
    'SQL: Aufbau und Reihenfolge der SELECT-Klauseln, Übersetzung der Algebra-Anfragen nach SQL, Operatorbaum-' +
    'Optimierung mit zugehörigem SQL, Mehrtabellen-Joins (inkl. Self-Join) sowie Daten­definition/-manipulation ' +
    '(CREATE, DROP, INSERT, DELETE, UPDATE).',
  tasks: [
    {
      nr: 1,
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
      titel: 'Gruppenaufgabe 2 – Algebra-Anfragen als SQL',
      text:
        'Formulieren Sie die Algebra-Anfragen aus Blatt 5 nun als SQL und beschreiben Sie den Zusammenhang zwischen ' +
        'beiden.\n\n' +
        'a) Namen der Studierenden  b) Vorlesungen mit 4 SWS  c) AssistentInnen der Fachgebiete „Ideenlehre"/„Sprachtheorie"  ' +
        'd) Namen unter Studierenden oder ProfessorInnen  e) Vorlesung (Titel) mit lesender ProfessorIn (Name)  ' +
        'f) Vorlesungen von Augustinus  g) AssistentInnen, deren Chef eine 4-SWS-Vorlesung hält.',
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
      titel: 'Gruppenaufgabe 3 – Operatorbaum optimieren + SQL',
      text:
        'Der Ausdruck π[Name] σ[VorlNr=Nachfolger] ( σ[SWS=2] (Professoren ⋈[PersNr=gelesenVon] Vorlesungen) × voraussetzen ) ' +
        'beantwortet: „Welche ProfessorInnen halten 2-SWS-Vorlesungen, für die es vorausgesetzte Vorlesungen gibt?"\n\n' +
        'a) Zeichnen Sie den Operatorbaum. b) Optimieren Sie ihn. c) Geben Sie das passende SQL an.',
      loesung: [
        {
          art: 'svg',
          titel: 'a) ursprünglicher Operatorbaum',
          svg: `<svg viewBox="0 0 780 600" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Operatorbaum a">
  <line class="dgm-line" x1="330" y1="55" x2="330" y2="100"/>
  <line class="dgm-line" x1="330" y1="132" x2="330" y2="180"/>
  <line class="dgm-line" x1="330" y1="210" x2="180" y2="260"/>
  <line class="dgm-line" x1="330" y1="210" x2="540" y2="260"/>
  <line class="dgm-line" x1="180" y1="292" x2="180" y2="340"/>
  <line class="dgm-line" x1="180" y1="372" x2="110" y2="425"/>
  <line class="dgm-line" x1="180" y1="372" x2="270" y2="425"/>
  <rect class="dgm-shape" x="290" y="25" width="80" height="30" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="330" y="45" text-anchor="middle">π[Name]</text>
  <rect class="dgm-shape" x="230" y="100" width="200" height="32" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="330" y="120" text-anchor="middle">σ[VorlNr = Nachfolger]</text>
  <rect class="dgm-shape" x="310" y="180" width="40" height="30" rx="5"/>
  <text class="dgm-text" x="330" y="201" text-anchor="middle">×</text>
  <rect class="dgm-shape" x="130" y="260" width="100" height="32" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="180" y="280" text-anchor="middle">σ[SWS=2]</text>
  <rect class="dgm-shape" x="70" y="340" width="220" height="32" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="180" y="360" text-anchor="middle">⋈[PersNr = gelesenVon]</text>
  <rect class="dgm-shape" x="55" y="425" width="110" height="30" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="110" y="445" text-anchor="middle">Professoren</text>
  <rect class="dgm-shape" x="210" y="425" width="120" height="30" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="270" y="445" text-anchor="middle">Vorlesungen</text>
  <rect class="dgm-shape" x="480" y="260" width="120" height="30" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="540" y="280" text-anchor="middle">voraussetzen</text>
</svg>`,
        },
        {
          art: 'liste',
          punkte: [
            'Selektion σ[SWS=2] nach unten zur Tabelle Vorlesungen verschieben (frühe Selektion – SWS gehört zu Vorlesungen).',
            'Kreuzprodukt × mit der darüberliegenden Selektion σ[VorlNr=Nachfolger] zu einem Join ⋈[VorlNr=Nachfolger] zusammenfassen.',
            'Optional: an den Blättern Projektionen einfügen (nur benötigte Attribute weitertragen).',
          ],
        },
        {
          art: 'svg',
          titel: 'b) optimierter Operatorbaum',
          svg: `<svg viewBox="0 0 780 560" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Operatorbaum b">
  <line class="dgm-line" x1="340" y1="55" x2="340" y2="100"/>
  <line class="dgm-line" x1="340" y1="132" x2="210" y2="185"/>
  <line class="dgm-line" x1="340" y1="132" x2="550" y2="185"/>
  <line class="dgm-line" x1="210" y1="217" x2="140" y2="280"/>
  <line class="dgm-line" x1="210" y1="217" x2="320" y2="275"/>
  <line class="dgm-line" x1="320" y1="307" x2="320" y2="355"/>
  <rect class="dgm-shape" x="300" y="25" width="80" height="30" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="340" y="45" text-anchor="middle">π[Name]</text>
  <rect class="dgm-shape" x="235" y="100" width="210" height="32" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="340" y="120" text-anchor="middle">⋈[VorlNr = Nachfolger]</text>
  <rect class="dgm-shape" x="100" y="185" width="220" height="32" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="210" y="205" text-anchor="middle">⋈[PersNr = gelesenVon]</text>
  <rect class="dgm-shape" x="85" y="280" width="110" height="30" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="140" y="300" text-anchor="middle">Professoren</text>
  <rect class="dgm-shape" x="270" y="275" width="100" height="32" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="320" y="295" text-anchor="middle">σ[SWS=2]</text>
  <rect class="dgm-shape" x="260" y="355" width="120" height="30" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="320" y="375" text-anchor="middle">Vorlesungen</text>
  <rect class="dgm-shape" x="490" y="185" width="120" height="30" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="550" y="205" text-anchor="middle">voraussetzen</text>
</svg>`,
        },
        {
          art: 'code',
          titel: 'c) SQL',
          text: 'SELECT DISTINCT p.Name\nFROM Professoren p, Vorlesungen v, voraussetzen vs\nWHERE p.PersNr = v.gelesenVon\n  AND v.SWS = 2\n  AND v.VorlNr = vs.Nachfolger;',
        },
      ],
    },
    {
      nr: 4,
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
