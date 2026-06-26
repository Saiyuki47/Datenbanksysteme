import type { Uebungsblatt } from '../../types'

export const blatt5: Uebungsblatt = {
  id: 'blatt5',
  nr: '5',
  typ: 'Gruppen- & Hausaufgaben',
  beschreibung:
    'Relationale Algebra: Auswerten von Ausdrücken (Selektion σ, Projektion π, Vereinigung ∪, Schnitt ∩, Differenz −, ' +
    'Kreuzprodukt ×, Theta-/natürlicher Join ⋈, Umbenennung ρ), Formulieren von Anfragen auf dem Universitätsschema ' +
    'sowie auf einer Dichter-Datenbank (geprüfte Vorlesungen über drei Join-Varianten).',
  tasks: [
    {
      nr: 1,
      titel: 'Gruppenaufgabe 1 – Ausdrücke auswerten',
      text:
        'Gegeben die Relationen u, v und z. Geben Sie die Ergebnisrelationen der Ausdrücke a)–i) in Tabellenform an:\n\n' +
        'a) σ[A=a](u)  b) π[A,B](v)  c) u ∪ v  d) u ∩ v  e) u − v  f) u × z  ' +
        'g) u ⋈[u.B=v.B] v  h) u ⋈ v  i) ρ[RelationZ](z) bzw. ρ[SpalteE←E](z)',
      tabellen: [
        { titel: 'Relation u', columns: ['A', 'B', 'C'], rows: [['a', '2', 'a'], ['b', '3', 'b'], ['c', '1', 'c'], ['a', '2', 'd']] },
        { titel: 'Relation v', columns: ['A', 'B', 'C'], rows: [['a', '2', 'a'], ['a', '1', 'c'], ['b', '3', 'b']] },
        { titel: 'Relation z', columns: ['E', 'F', 'G'], rows: [['5', 'q', '4'], ['7', 'p', '2']] },
      ],
      loesung: [
        {
          art: 'tabelle',
          titel: 'a) σ[A=a](u) – Selektion: Zeilen mit A = a',
          columns: ['A', 'B', 'C'],
          rows: [['a', '2', 'a'], ['a', '2', 'd']],
        },
        {
          art: 'tabelle',
          titel: 'b) π[A,B](v) – Projektion auf A, B (Duplikate entfallen)',
          columns: ['A', 'B'],
          rows: [['a', '2'], ['a', '1'], ['b', '3']],
        },
        {
          art: 'tabelle',
          titel: 'c) u ∪ v – Vereinigung (Duplikate nur einmal)',
          columns: ['A', 'B', 'C'],
          rows: [['a', '2', 'a'], ['b', '3', 'b'], ['c', '1', 'c'], ['a', '2', 'd'], ['a', '1', 'c']],
        },
        {
          art: 'tabelle',
          titel: 'd) u ∩ v – Schnitt (Tupel in BEIDEN)',
          columns: ['A', 'B', 'C'],
          rows: [['a', '2', 'a'], ['b', '3', 'b']],
        },
        {
          art: 'tabelle',
          titel: 'e) u − v – Differenz (in u, nicht in v)',
          columns: ['A', 'B', 'C'],
          rows: [['c', '1', 'c'], ['a', '2', 'd']],
        },
        {
          art: 'tabelle',
          titel: 'f) u × z – Kreuzprodukt (4 × 2 = 8)',
          columns: ['A', 'B', 'C', 'E', 'F', 'G'],
          rows: [
            ['a', '2', 'a', '5', 'q', '4'],
            ['a', '2', 'a', '7', 'p', '2'],
            ['b', '3', 'b', '5', 'q', '4'],
            ['b', '3', 'b', '7', 'p', '2'],
            ['c', '1', 'c', '5', 'q', '4'],
            ['c', '1', 'c', '7', 'p', '2'],
            ['a', '2', 'd', '5', 'q', '4'],
            ['a', '2', 'd', '7', 'p', '2'],
          ],
        },
        {
          art: 'tabelle',
          titel: 'g) u ⋈[u.B=v.B] v – Theta-Join (gleiche Spaltennamen → mit u./v. unterschieden)',
          columns: ['u.A', 'u.B', 'u.C', 'v.A', 'v.B', 'v.C'],
          rows: [
            ['a', '2', 'a', 'a', '2', 'a'],
            ['b', '3', 'b', 'b', '3', 'b'],
            ['c', '1', 'c', 'a', '1', 'c'],
            ['a', '2', 'd', 'a', '2', 'a'],
          ],
        },
        {
          art: 'tabelle',
          titel: 'h) u ⋈ v – natürlicher Join über alle gemeinsamen Spalten (A,B,C) = Tupel in beiden',
          columns: ['A', 'B', 'C'],
          rows: [['a', '2', 'a'], ['b', '3', 'b']],
        },
        {
          art: 'tabelle',
          titel: 'i) ρ[RelationZ](z) und ρ[SpalteE←E](z) – Umbenennung (nur Namen, keine Werte)',
          columns: ['SpalteE', 'F', 'G'],
          rows: [['5', 'q', '4'], ['7', 'p', '2']],
        },
        {
          art: 'text',
          text:
            'Hinweis: Beim natürlichen Join (h) wird über ALLE gleichnamigen Spalten verbunden – da u und v dasselbe Schema ' +
            '(A,B,C) haben, entspricht das Ergebnis genau dem Schnitt (d). ρ benennt nur Relation bzw. Spalte um, die Werte ' +
            'bleiben gleich.',
        },
      ],
    },
    {
      nr: 2,
      titel: 'Gruppenaufgabe 2 – Anfragen in relationaler Algebra (Uni-Schema)',
      text:
        'Formulieren Sie die folgenden Anfragen in relationaler Algebra (Schema: Studenten, Vorlesungen[gelesenVon], ' +
        'Professoren, Assistenten[Boss], prüfen):\n\n' +
        'a) Namen der Studierenden  b) Vorlesungen mit 4 SWS  c) AssistentInnen der Fachgebiete „Ideenlehre"/„Sprachtheorie"  ' +
        'd) Namen unter Studierenden oder ProfessorInnen  e) Studierende mit Note 2 in einer Prüfung  ' +
        'f) Vorlesung (Titel) + lesende ProfessorIn (Name)  g) Vorlesungen von Augustinus  ' +
        'h) AssistentInnen, deren Chef eine 4-SWS-Vorlesung hält.',
      loesung: [
        { art: 'code', titel: 'a) Namen aller Studierenden', text: 'π[Name] ( Studenten )' },
        { art: 'code', titel: 'b) Vorlesungen mit 4 SWS', text: "σ[SWS = 4] ( Vorlesungen )" },
        { art: 'code', titel: 'c) AssistentInnen zweier Fachgebiete', text: "π[Name] ( σ[Fachgebiet='Ideenlehre' ∨ Fachgebiet='Sprachtheorie'] ( Assistenten ) )" },
        { art: 'code', titel: 'd) Namen unter Studierenden oder ProfessorInnen', text: 'π[Name] ( Studenten )  ∪  π[Name] ( Professoren )' },
        { art: 'code', titel: 'e) Studierende mit Note 2', text: 'π[Name] ( Studenten ⋈ σ[Note = 2] ( prüfen ) )' },
        { art: 'code', titel: 'f) Vorlesung + lesende ProfessorIn', text: 'π[Titel, Name] ( Vorlesungen ⋈[gelesenVon = PersNr] Professoren )' },
        { art: 'code', titel: 'g) Vorlesungen von Augustinus', text: "π[Titel] ( Vorlesungen ⋈[gelesenVon = PersNr] σ[Name='Augustinus'] (Professoren) )" },
        { art: 'code', titel: 'h) AssistentInnen mit 4-SWS-Chef', text: "π[Name] ( σ[SWS = 4] (Vorlesungen) ⋈[gelesenVon = Boss] Assistenten )" },
      ],
    },
    {
      nr: 3,
      titel: 'Hausaufgabe 1 – „Welche Vorlesungen wurden geprüft?" (drei Join-Varianten)',
      text:
        'Formulieren Sie „Welche Vorlesungen (Titel) wurden bereits geprüft?" auf dem Uni-Schema mit a) einem natürlichen ' +
        'Join, b) dem Kartesischen Produkt, c) einem Theta-Join.',
      loesung: [
        {
          art: 'code',
          titel: 'a) Natürlicher Join (über das gemeinsame Attribut VorlNr)',
          text: 'π[Titel] ( Vorlesungen ⋈ prüfen )',
        },
        {
          art: 'code',
          titel: 'b) Kartesisches Produkt + Selektion',
          text: 'π[Titel] ( σ[Vorlesungen.VorlNr = prüfen.VorlNr] ( Vorlesungen × prüfen ) )',
        },
        {
          art: 'code',
          titel: 'c) Theta-Join',
          text: 'π[Titel] ( Vorlesungen ⋈[Vorlesungen.VorlNr = prüfen.VorlNr] prüfen )',
        },
        {
          art: 'tabelle',
          titel: 'Ergebnis (in prüfen stehen VorlNr 5001, 5041, 4630)',
          columns: ['Titel'],
          rows: [['Grundzüge'], ['Ethik'], ['Die 3 Kritiken']],
        },
        {
          art: 'text',
          text:
            'Alle drei Varianten liefern dasselbe Ergebnis. Der natürliche Join verbindet automatisch über das gemeinsame ' +
            'Attribut VorlNr; beim Kartesischen Produkt muss man die Gleichheit per Selektion nachziehen; der Theta-Join ' +
            'fasst beides zusammen. π[Titel] entfernt Duplikate.',
        },
      ],
    },
    {
      nr: 4,
      titel: 'Hausaufgabe 2 – Dichter-Datenbank',
      text:
        'Formulieren Sie in relationaler Algebra und geben Sie die Ergebnisrelation an.\n\n' +
        'a) Dramen (TITEL) von „Schiller"  b) SchauspielerInnen (PNR), die „Faust" oder „Wallenstein" gespielt haben  ' +
        'c) SchauspielerInnen (PNR) mit einer Heldenrolle  d) SchauspielerInnen (PNR), die NUR „Faust" oder „Wallenstein" ' +
        'spielten  e) SchauspielerInnen (NAME), deren Wohnort (W_ORT) ein Geburtsort (G_ORT) eines Dichters ist. ' +
        '(„oder" = und/oder.)',
      tabellen: [
        { titel: 'DICHTER', columns: ['AUTOR', 'G_ORT', 'G_JAHR'], rows: [['Schiller', 'Marbach', '1759'], ['Goethe', 'Frankfurt', '1749'], ['Kleist', 'Kamenz', '1777'], ['Lessing', 'Frankfurt', '1729']] },
        { titel: 'DRAMA', columns: ['TITEL', 'U_ORT', 'U_JAHR', 'AUTOR'], rows: [['Maria Stuart', 'Weimar', '1800', 'Schiller'], ['Wallenstein', 'Jena', '1799', 'Schiller'], ['Tell', 'Weimar', '1804', 'Schiller'], ['Iphigenie', 'Mannheim', '1783', 'Goethe'], ['Faust', 'Frankfurt', '1790', 'Goethe'], ['Zerbrochene Krug', 'Weimar', '1806', 'Kleist'], ['Nathan', 'Bonn', '1779', 'Lessing']] },
        { titel: 'ROLLE', columns: ['FIGUR', 'TITEL', 'R_GESCHLECHT'], rows: [['Faust', 'Faust', 'Held'], ['Mephisto', 'Faust', 'Schurke'], ['Gretchen', 'Faust', 'Opfer'], ['Wallenstein', 'Wallenstein', 'Held'], ['Piccolomini', 'Wallenstein', 'Schurke'], ['Tell', 'Tell', 'Held'], ['Geßler', 'Tell', 'Schurke'], ['Maria Stuart', 'Maria Stuart', 'Held'], ['Elisabeth', 'Maria Stuart', 'Schurke'], ['Iphigenie', 'Iphigenie', 'Held'], ['Nathan', 'Nathan', 'Held']] },
        { titel: 'SCHAUSPIELER', columns: ['PNR', 'W_ORT', 'NAME'], rows: [['1', 'Frankfurt', 'Schön'], ['2', 'Frankfurt', 'Müller'], ['3', 'Dresden', 'Beck'], ['4', 'Jena', 'Schiller'], ['5', 'Berlin', 'George'], ['6', 'Frankfurt', 'Mann'], ['7', 'Marbach', 'Krug'], ['8', 'Bonn', 'Platte']] },
        { titel: 'DARSTELLER', columns: ['PNR', 'FIGUR', 'A_ORT', 'A_JAHR', 'THEATER'], rows: [['1', 'Faust', 'Jena', '1991', 'Schillertheater'], ['1', 'Wallenstein', 'Frankfurt', '1992', 'Schauspiel'], ['2', 'Faust', 'Fulda', '1990', 'Schloßtheater'], ['2', 'Nathan', 'Fulda', '1991', 'Schloßtheater'], ['2', 'Mephisto', 'Frankfurt', '1992', 'TAT'], ['2', 'Tell', 'Jena', '1993', 'Schillertheater'], ['4', 'Iphigenie', 'Berlin', '1991', 'Theater des Westens'], ['4', 'Gretchen', 'Kaiserslautern', '1993', 'Pfalztheater'], ['4', 'Maria Stuart', 'Jena', '1992', 'Schillertheater'], ['5', 'Tell', 'Berlin', '1991', 'Theater des Westens'], ['5', 'Piccolomini', 'Kaiserslautern', '1992', 'Pfalztheater']] },
      ],
      loesung: [
        { art: 'code', titel: 'a) Dramen von Schiller', text: "π[TITEL] ( σ[AUTOR = 'Schiller'] ( DRAMA ) )" },
        { art: 'tabelle', titel: 'a) Ergebnis', columns: ['TITEL'], rows: [['Maria Stuart'], ['Wallenstein'], ['Tell']] },
        { art: 'code', titel: 'b) gespielte Figur Faust oder Wallenstein', text: "π[PNR] ( σ[FIGUR = 'Faust' ∨ FIGUR = 'Wallenstein'] ( DARSTELLER ) )" },
        { art: 'tabelle', titel: 'b) Ergebnis', columns: ['PNR'], rows: [['1'], ['2']] },
        {
          art: 'code',
          titel: 'c) hat eine Heldenrolle gespielt',
          text: "π[PNR] ( DARSTELLER ⋈[DARSTELLER.FIGUR = ROLLE.FIGUR] σ[R_GESCHLECHT = 'Held'] ( ROLLE ) )",
        },
        { art: 'tabelle', titel: 'c) Ergebnis', columns: ['PNR'], rows: [['1'], ['2'], ['4'], ['5']] },
        {
          art: 'unterpunkt',
          label: 'd) NUR Faust oder Wallenstein gespielt',
          text: '„Nur" verlangt eine Differenz: alle, die Faust/Wallenstein spielten, MINUS alle, die etwas anderes spielten.',
        },
        {
          art: 'code',
          text:
            "π[PNR] ( σ[FIGUR='Faust' ∨ FIGUR='Wallenstein'] (DARSTELLER) )\n" +
            "   −\n" +
            "π[PNR] ( σ[FIGUR≠'Faust' ∧ FIGUR≠'Wallenstein'] (DARSTELLER) )",
        },
        { art: 'tabelle', titel: 'd) Ergebnis', columns: ['PNR'], rows: [['1']] },
        { art: 'code', titel: 'e) Wohnort = Geburtsort eines Dichters', text: 'π[NAME] ( SCHAUSPIELER ⋈[W_ORT = G_ORT] DICHTER )' },
        { art: 'tabelle', titel: 'e) Ergebnis', columns: ['NAME'], rows: [['Schön'], ['Müller'], ['Mann'], ['Krug']] },
      ],
    },
  ],
}
