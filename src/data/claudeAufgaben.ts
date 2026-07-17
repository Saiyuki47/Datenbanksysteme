import type { LoesungBlock, NamedTable, TippSection } from '../types'

// KI-generierte Übungsaufgaben – je eine pro Aufgabenart der Original-Übungsblätter.
// WICHTIG: Diese Aufgaben stammen NICHT vom Dozenten, sondern wurden von einer KI
// (Claude) zum zusätzlichen Lernen und Üben erstellt. Alle Inhalte sind eigens
// erdacht; die Uni-Beispieldaten folgen dem im Kurs genutzten Universitätsschema.

/** Eine Relation/Tabelle im „Gegeben"-Block einer Aufgabe. */
export interface SchemaRelation {
  /** Relations- bzw. Tabellenname, z. B. „Professoren". */
  name: string
  /** Attribute in der Reihenfolge des Schemas. */
  attribute: string[]
  /** Attribute des Primärschlüssels – werden unterstrichen (Kursnotation). */
  pk?: string[]
  /** Zusatz unter der Relation, z. B. Fremdschlüssel oder Constraints. */
  hinweis?: string
}

export interface ClaudeAufgabe {
  nr: number
  /** Aufgabenart (Kategorie), wie sie in den Übungsblättern vorkommt. */
  art: string
  titel: string
  text: string
  /**
   * Gegebenes Schema, das VOR der Frage steht – je Relation eine eigene Zeile,
   * statt alles in einer Fließtext-Kette aufzuzählen.
   */
  schema?: { titel?: string; relationen: SchemaRelation[] }
  /** Optionale Angaben, die mit der Aufgabe gezeigt werden. */
  code?: string
  gegeben?: NamedTable[]
  svg?: string
  tipps: TippSection[]
  loesung: LoesungBlock[]
  /** Deep-Links zu passenden Referenz-Themen. */
  referenz?: string[]
}

export const claudeAufgaben: ClaudeAufgabe[] = [
  // ─────────────────────────────────────────────────────────────
  {
    nr: 1,
    art: 'DB-Grundlagen & Datenmodelle',
    titel: 'Vom Datei-Chaos zum DBMS',
    text:
      'Ein kleiner Sportverein verwaltet seine Mitglieder bisher in mehreren getrennten Excel-Dateien – eine Datei pro Abteilung (Fußball, Schwimmen, Turnen).\n\n' +
      'a) Nennen Sie zwei konkrete Nachteile dieser reinen Dateiverwaltung und geben Sie jeweils an, was ein DBMS besser macht.\n' +
      'b) Frau Meyer ist sowohl in der Fußball- als auch in der Schwimmabteilung. Erklären Sie am Beispiel ihres Umzugs das Problem, das dabei auftritt, und wie ein DBMS es vermeidet.',
    referenz: ['db-grundlagen'],
    tipps: [
      { icon: '💡', titel: 'Ansatz', inhalt: 'Denke an die klassische Nachteilsliste der Dateiverwaltung: Redundanz/Inkonsistenz, beschränkte Zugriffe, Integrität, Mehrbenutzer, Sicherheit.' },
      { icon: '🔍', titel: 'Teil b)', inhalt: 'Dieselbe Person steht in ZWEI Dateien – was passiert, wenn nur eine geändert wird?' },
    ],
    loesung: [
      {
        art: 'liste',
        punkte: [
          'a) Redundanz & Inkonsistenz: Ein Mitglied in mehreren Abteilungen steht mehrfach gespeichert; wird nur eine Kopie geändert, widersprechen sich die Dateien. Im DBMS liegen die Stammdaten zentral nur einmal.',
          'a) Beschränkte Zugriffsmöglichkeiten: „Welche Mitglieder sind in mehr als einer Abteilung?" lässt sich über getrennte Dateien nur mühsam beantworten. Im DBMS beantwortet ein SQL-JOIN das sofort.',
        ],
      },
      {
        art: 'text',
        text: 'b) Frau Meyer steht in der Fußball- UND der Schwimmdatei. Beim Umzug wird ihre Adresse z. B. nur in der Fußballdatei aktualisiert. Jetzt existieren zwei verschiedene Adressen für dieselbe Person – die Daten sind inkonsistent. Ein DBMS speichert die Mitglieder-Stammdaten zentral einmal; eine Adressänderung wirkt sofort für alle Abteilungen, Widersprüche entstehen gar nicht erst.',
      },
    ],
  },
  // ─────────────────────────────────────────────────────────────
  {
    nr: 2,
    art: 'ER-Diagramm entwerfen',
    titel: 'Bibliotheks-Ausleihe modellieren',
    schema: {
      titel: 'Gegebene Entitytypen',
      relationen: [
        { name: 'Buch', attribute: ['ISBN', 'Titel'], pk: ['ISBN'] },
        { name: 'Leser', attribute: ['LeserNr', 'Name'], pk: ['LeserNr'] },
      ],
    },
    text:
      'Eine Bibliothek verwaltet Bücher und Leser (siehe oben). Modellieren Sie den folgenden Sachverhalt als ER-Diagramm (Entitytypen als Rechtecke, Beziehung als Raute mit Funktionalität, Schlüsselattribute unterstreichen):\n\n' +
      '• Ein Leser kann mehrere Bücher ausleihen; ein Buch ist zu einem Zeitpunkt von höchstens einem Leser ausgeliehen.\n' +
      '• Zu jeder Ausleihe wird ein Rückgabedatum gespeichert.',
    referenz: ['er-modell'],
    tipps: [
      { icon: '💡', titel: 'Funktionalität', inhalt: '„Ein Leser mehrere Bücher, ein Buch höchstens ein Leser" – das ist eine 1:N-Beziehung. Frage: Wie viele Bücher pro Leser, wie viele Leser pro Buch?' },
      { icon: '🔍', titel: 'Beziehungsattribut', inhalt: 'Das Rückgabedatum gehört zu keiner der beiden Entitäten allein – es hängt an der Beziehung „ausleihen".' },
    ],
    loesung: [
      {
        art: 'text',
        text: 'Leser (1) —ausleihen— (N) Buch. Ein Leser leiht viele Bücher (N), ein Buch ist von höchstens einem Leser ausgeliehen (1). Das Rückgabedatum ist ein Attribut der Beziehung „ausleihen".',
      },
      {
        art: 'svg',
        titel: 'ER-Diagramm (Musterlösung)',
        svg: `<svg viewBox="0 0 640 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Leser 1 ausleihen N Buch mit Beziehungsattribut Rueckgabedatum">
  <line class="dgm-line" x1="150" y1="70" x2="230" y2="70"/>
  <line class="dgm-line" x1="340" y1="70" x2="420" y2="70"/>
  <line class="dgm-line" x1="285" y1="105" x2="285" y2="150"/>
  <rect class="dgm-shape" x="40" y="48" width="110" height="44" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="95" y="75" text-anchor="middle">Leser</text>
  <polygon class="dgm-shape" points="230,70 285,36 340,70 285,104"/>
  <text class="dgm-text dgm-text--sm" x="285" y="74" text-anchor="middle">ausleihen</text>
  <rect class="dgm-shape" x="420" y="48" width="110" height="44" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="475" y="75" text-anchor="middle">Buch</text>
  <ellipse class="dgm-shape" cx="35" cy="120" rx="40" ry="16"/>
  <text class="dgm-key" x="35" y="125" text-anchor="middle">LeserNr</text>
  <ellipse class="dgm-shape" cx="120" cy="140" rx="34" ry="16"/>
  <text class="dgm-text dgm-text--sm" x="120" y="145" text-anchor="middle">Name</text>
  <ellipse class="dgm-shape" cx="540" cy="120" rx="34" ry="16"/>
  <text class="dgm-key" x="540" y="125" text-anchor="middle">ISBN</text>
  <ellipse class="dgm-shape" cx="455" cy="140" rx="32" ry="16"/>
  <text class="dgm-text dgm-text--sm" x="455" y="145" text-anchor="middle">Titel</text>
  <ellipse class="dgm-shape" cx="285" cy="170" rx="52" ry="16"/>
  <text class="dgm-text dgm-text--sm" x="285" y="175" text-anchor="middle">Rückgabedatum</text>
  <text class="dgm-card" x="212" y="62">1</text>
  <text class="dgm-card" x="352" y="62">N</text>
</svg>`,
      },
    ],
  },
  // ─────────────────────────────────────────────────────────────
  {
    nr: 3,
    art: 'Funktionalitäten & (min,max) bestimmen',
    titel: 'Online-Shop: Bestellungen & Artikel',
    text:
      'Gegeben sind die Regeln eines Online-Shops:\n' +
      '• Ein Kunde gibt beliebig viele Bestellungen auf; jede Bestellung gehört zu genau einem Kunden (Beziehung gibt_auf).\n' +
      '• Jede Bestellung enthält mindestens einen Artikel; ein Artikel kann in beliebig vielen Bestellungen (auch in gar keiner) vorkommen (Beziehung enthält).\n\n' +
      'a) Geben Sie für gibt_auf und enthält je die grobe Funktionalität (1:1, 1:N, N:1, N:M) an.\n' +
      'b) Geben Sie für beide Beziehungen die (min,max)-Angaben an allen beteiligten Entitäten an.',
    referenz: ['er-modell', 'min-max'],
    tipps: [
      { icon: '💡', titel: 'Funktionalität', inhalt: '„Beliebig viele" heißt N/viele, „genau einer" heißt 1. „Mindestens einer" beeinflusst nur das min der (min,max), nicht die grobe Funktionalität.' },
      { icon: '⚠️', titel: 'min bestimmen', inhalt: 'min = 1, wenn die Teilnahme Pflicht ist („muss/mindestens"), sonst min = 0 („kann/beliebig, auch keine").' },
    ],
    loesung: [
      {
        art: 'text',
        text: 'a) grobe Funktionalitäten:',
      },
      {
        art: 'liste',
        punkte: [
          'gibt_auf (Kunde – Bestellung): Kunde 1 : N Bestellung (ein Kunde viele Bestellungen, jede Bestellung genau ein Kunde).',
          'enthält (Bestellung – Artikel): Bestellung N : M Artikel (eine Bestellung viele Artikel, ein Artikel in vielen Bestellungen).',
        ],
      },
      {
        art: 'text',
        text: 'b) (min,max) an den Entitäten:',
      },
      {
        art: 'liste',
        punkte: [
          'gibt_auf: Kunde (0,*) – ein Kunde kann 0 bis beliebig viele Bestellungen haben. Bestellung (1,1) – jede Bestellung gehört zu genau einem Kunden.',
          'enthält: Bestellung (1,*) – jede Bestellung enthält mindestens einen, höchstens beliebig viele Artikel. Artikel (0,*) – ein Artikel kommt in 0 bis beliebig vielen Bestellungen vor.',
        ],
      },
    ],
  },
  // ─────────────────────────────────────────────────────────────
  {
    nr: 4,
    art: 'ER → Relationenschema (Überführung & Verfeinerung)',
    titel: 'Autoren & Bücher ins Schema überführen',
    schema: {
      titel: 'Gegebene Entitytypen (aus dem ER-Diagramm)',
      relationen: [
        { name: 'Autor', attribute: ['AutorID', 'Name'], pk: ['AutorID'] },
        { name: 'Buch', attribute: ['ISBN', 'Titel'], pk: ['ISBN'] },
      ],
    },
    text:
      'Zwischen Autor und Buch besteht die Beziehung schreiben: Ein Autor schreibt mehrere Bücher, ein Buch kann von mehreren Autoren geschrieben werden (N:M).\n\n' +
      'a) Überführen Sie das ER-Diagramm initial in ein Relationenschema (je eine Relation, Primärschlüssel unterstrichen bzw. mit «…» markiert).\n' +
      'b) Ist eine Verfeinerung (Zusammenfassen von Relationen) möglich? Begründen Sie.',
    referenz: ['er-zu-schema'],
    tipps: [
      { icon: '💡', titel: 'Regel', inhalt: 'Jeder Entitytyp → eine Relation. Jeder Beziehungstyp → eine Relation aus den Schlüsseln der beteiligten Entitäten (+ eigene Beziehungsattribute).' },
      { icon: '⚠️', titel: 'Verfeinern bei N:M?', inhalt: 'Zusammenfassen ist nur bei GLEICHEM Schlüssel erlaubt. Welchen Schlüssel hat die Beziehungsrelation bei N:M?' },
    ],
    loesung: [
      {
        art: 'code',
        titel: 'a) Initiales Schema',
        text:
          'Autor:      {[ «AutorID»: integer, Name: varchar ]}\n' +
          'Buch:       {[ «ISBN»: integer, Titel: varchar ]}\n' +
          'schreiben:  {[ «AutorID»: integer, «ISBN»: integer ]}',
      },
      {
        art: 'text',
        text: 'b) Keine Verfeinerung möglich. Bei einer N:M-Beziehung hat die Beziehungsrelation schreiben den zusammengesetzten Schlüssel (AutorID, ISBN). Dieser stimmt mit keinem Schlüssel der Entity-Relationen überein (Autor hat AutorID, Buch hat ISBN). Zusammenfassen ist nur bei gleichem Schlüssel erlaubt – schreiben bleibt daher eine eigene Relation.',
      },
    ],
  },
  // ─────────────────────────────────────────────────────────────
  {
    nr: 5,
    art: 'Relationale Algebra – Ausdruck auswerten',
    titel: 'Ergebnisrelationen bestimmen',
    text:
      'Gegeben sind die Relationen R und S (siehe Tabellen). Bestimmen Sie die Ergebnisrelationen der folgenden Ausdrücke in Tabellenform:\n\n' +
      'a) σ[B > 20](R)\n' +
      'b) π[A](R)\n' +
      'c) R ⋈ S   (natürlicher Join über die gemeinsame Spalte A)',
    gegeben: [
      { titel: 'R', columns: ['A', 'B'], rows: [['1', '10'], ['2', '30'], ['3', '25']] },
      { titel: 'S', columns: ['A', 'C'], rows: [['1', 'x'], ['3', 'y'], ['4', 'z']] },
    ],
    referenz: ['relationale-algebra'],
    tipps: [
      { icon: '💡', titel: 'σ und π', inhalt: 'σ wählt Zeilen nach Bedingung, π wählt Spalten (und entfernt Duplikate).' },
      { icon: '🔍', titel: 'Natürlicher Join', inhalt: 'Der natürliche Join verbindet nur Zeilen mit gleichem Wert in der gemeinsamen Spalte A; die Spalte A erscheint im Ergebnis nur einmal.' },
    ],
    loesung: [
      { art: 'tabelle', titel: 'a) σ[B > 20](R) – nur Zeilen mit B > 20', columns: ['A', 'B'], rows: [['2', '30'], ['3', '25']] },
      { art: 'tabelle', titel: 'b) π[A](R) – nur Spalte A', columns: ['A'], rows: [['1'], ['2'], ['3']] },
      { art: 'tabelle', titel: 'c) R ⋈ S – Verbund über A (nur A = 1 und A = 3 passen)', columns: ['A', 'B', 'C'], rows: [['1', '10', 'x'], ['3', '25', 'y']] },
    ],
  },
  // ─────────────────────────────────────────────────────────────
  {
    nr: 6,
    art: 'Relationale Algebra – Anfrage formulieren (+ Operatorbaum)',
    titel: 'Anfrage auf dem Universitätsschema',
    schema: {
      titel: 'Universitätsschema',
      relationen: [
        { name: 'Professoren', attribute: ['PersNr', 'Name', 'Rang', 'Raum'], pk: ['PersNr'] },
        {
          name: 'Vorlesungen',
          attribute: ['VorlNr', 'Titel', 'SWS', 'gelesenVon'],
          pk: ['VorlNr'],
          hinweis: 'gelesenVon → Professoren.PersNr',
        },
      ],
    },
    text:
      'Formulieren Sie in relationaler Algebra: „Titel aller Vorlesungen, die von einem Professor mit Rang C4 gelesen werden." Geben Sie zusätzlich den (optimierten) Operatorbaum an.',
    referenz: ['relationale-algebra'],
    tipps: [
      { icon: '💡', titel: 'Verknüpfung', inhalt: 'gelesenVon in Vorlesungen ist ein Fremdschlüssel auf PersNr in Professoren – darüber joinen.' },
      { icon: '🔍', titel: 'Optimierung', inhalt: 'Selektion σ[Rang=C4] möglichst früh (nah an den Blättern) ausführen, dann joinen, zuletzt π[Titel].' },
    ],
    loesung: [
      {
        art: 'code',
        titel: 'Relationale Algebra',
        text: "π[Titel] ( σ[Rang = 'C4'](Professoren) ⋈[PersNr = gelesenVon] Vorlesungen )",
      },
      {
        art: 'svg',
        titel: 'Operatorbaum (von unten nach oben auswerten)',
        svg: `<svg viewBox="0 0 520 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Operatorbaum: Projektion Titel ueber Join ueber Selektion Rang C4 auf Professoren und Vorlesungen">
  <line class="dgm-line" x1="250" y1="49" x2="250" y2="90"/>
  <line class="dgm-line" x1="220" y1="124" x2="130" y2="185"/>
  <line class="dgm-line" x1="300" y1="124" x2="400" y2="185"/>
  <line class="dgm-line" x1="130" y1="219" x2="130" y2="255"/>
  <rect class="dgm-shape" x="205" y="15" width="90" height="34" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="250" y="37" text-anchor="middle">π[Titel]</text>
  <rect class="dgm-shape" x="150" y="90" width="200" height="34" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="250" y="112" text-anchor="middle">⋈[PersNr = gelesenVon]</text>
  <rect class="dgm-shape" x="50" y="185" width="160" height="34" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="130" y="207" text-anchor="middle">σ[Rang = 'C4']</text>
  <rect class="dgm-shape" x="55" y="255" width="150" height="34" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="130" y="277" text-anchor="middle">Professoren</text>
  <rect class="dgm-shape" x="320" y="185" width="150" height="34" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="395" y="207" text-anchor="middle">Vorlesungen</text>
</svg>`,
      },
    ],
  },
  // ─────────────────────────────────────────────────────────────
  {
    nr: 7,
    art: 'SQL – Anfrage formulieren',
    titel: 'SQL auf dem Universitätsschema',
    schema: {
      titel: 'Universitätsschema (Auszug)',
      relationen: [
        { name: 'Studenten', attribute: ['MatrNr', 'Name', 'Semester'], pk: ['MatrNr'] },
        {
          name: 'hören',
          attribute: ['MatrNr', 'VorlNr'],
          pk: ['MatrNr', 'VorlNr'],
          hinweis: 'MatrNr → Studenten.MatrNr,  VorlNr → Vorlesungen.VorlNr',
        },
        {
          name: 'Vorlesungen',
          attribute: ['VorlNr', 'Titel', 'SWS', 'gelesenVon'],
          pk: ['VorlNr'],
          hinweis: 'gelesenVon → Professoren.PersNr',
        },
        { name: 'Professoren', attribute: ['PersNr', 'Name', 'Rang', 'Raum'], pk: ['PersNr'] },
      ],
    },
    text:
      'Formulieren Sie in SQL: „Namen der Studierenden, die mindestens eine Vorlesung von Professor „Kant" hören." (ohne Duplikate)',
    referenz: ['grundabfrage', 'joins'],
    tipps: [
      { icon: '💡', titel: 'Join-Kette', inhalt: 'Studenten → hören → Vorlesungen → Professoren über die passenden Schlüssel verbinden.' },
      { icon: '⚠️', titel: 'Duplikate', inhalt: 'Hört ein Student mehrere Kant-Vorlesungen, käme sein Name mehrfach – mit DISTINCT unterdrücken.' },
    ],
    loesung: [
      {
        art: 'code',
        titel: 'SQL',
        text:
          "SELECT DISTINCT s.Name\n" +
          "FROM Studenten s, hören h, Vorlesungen v, Professoren p\n" +
          "WHERE s.MatrNr = h.MatrNr\n" +
          "  AND h.VorlNr = v.VorlNr\n" +
          "  AND v.gelesenVon = p.PersNr\n" +
          "  AND p.Name = 'Kant';",
      },
      {
        art: 'text',
        text: 'Statt des impliziten Joins (Tabellen im FROM, Bedingungen im WHERE) geht auch der explizite Join (… JOIN … ON …). DISTINCT ist nötig, weil ein Student mehrere Kant-Vorlesungen hören könnte.',
      },
    ],
  },
  // ─────────────────────────────────────────────────────────────
  {
    nr: 8,
    art: 'SQL – Ergebnis von Hand bestimmen',
    titel: 'Ergebnistabelle einer GROUP-BY-Abfrage',
    text:
      'Gegeben ist die Tabelle Verkauf (siehe unten). Bestimmen Sie „von Hand" das Ergebnis der folgenden Abfrage:\n\n' +
      'SELECT Produkt, SUM(Menge) AS Summe\nFROM Verkauf\nGROUP BY Produkt\nHAVING SUM(Menge) >= 10;',
    gegeben: [
      {
        titel: 'Verkauf',
        columns: ['Produkt', 'Menge'],
        rows: [['Apfel', '4'], ['Birne', '3'], ['Apfel', '7'], ['Kirsche', '12'], ['Birne', '2']],
      },
    ],
    referenz: ['gruppieren'],
    tipps: [
      { icon: '💡', titel: 'Reihenfolge', inhalt: 'Erst nach Produkt gruppieren, dann je Gruppe SUM(Menge) bilden, zuletzt mit HAVING die Gruppen filtern.' },
      { icon: '⚠️', titel: 'WHERE vs. HAVING', inhalt: 'HAVING filtert GRUPPEN (nach dem Aggregat), nicht einzelne Zeilen – Birne mit Summe 5 fällt hier raus.' },
    ],
    loesung: [
      {
        art: 'text',
        text: 'Gruppensummen: Apfel = 4 + 7 = 11, Birne = 3 + 2 = 5, Kirsche = 12. HAVING SUM(Menge) >= 10 behält nur Apfel (11) und Kirsche (12); Birne (5) fällt weg.',
      },
      { art: 'tabelle', titel: 'Ergebnis', columns: ['Produkt', 'Summe'], rows: [['Apfel', '11'], ['Kirsche', '12']] },
    ],
  },
  // ─────────────────────────────────────────────────────────────
  {
    nr: 9,
    art: 'DDL & Integritätsbedingungen (Constraints)',
    titel: 'CREATE TABLE mit Constraints',
    schema: {
      titel: 'Zu erstellende Tabellen',
      relationen: [
        {
          name: 'Konto',
          attribute: ['KontoNr', 'Inhaber', 'Saldo'],
          pk: ['KontoNr'],
          hinweis: 'Inhaber darf nicht NULL sein · Saldo muss ≥ 0 sein',
        },
        {
          name: 'Buchung',
          attribute: ['BuchungsNr', 'KontoNr', 'Betrag'],
          pk: ['BuchungsNr'],
          hinweis: 'KontoNr → Konto.KontoNr · wird ein Konto gelöscht, sollen seine Buchungen mitgelöscht werden',
        },
      ],
    },
    text:
      'Schreiben Sie für die beiden oben angegebenen Tabellen die CREATE-TABLE-Anweisungen mit den passenden Integritätsbedingungen.',
    referenz: ['create-table', 'integritaetsbedingungen'],
    tipps: [
      { icon: '💡', titel: 'Constraints', inhalt: 'PRIMARY KEY, NOT NULL, CHECK(Bedingung) und FOREIGN KEY … REFERENCES … ON DELETE … sind die passenden Bausteine.' },
      { icon: '🔍', titel: 'Mitlöschen', inhalt: '„Buchungen mitlöschen" ist genau ON DELETE CASCADE.' },
    ],
    loesung: [
      {
        art: 'code',
        titel: 'Lösung',
        text:
          'CREATE TABLE Konto (\n' +
          '  KontoNr  INTEGER      PRIMARY KEY,\n' +
          '  Inhaber  VARCHAR(50)  NOT NULL,\n' +
          '  Saldo    NUMERIC      CHECK (Saldo >= 0)\n' +
          ');\n\n' +
          'CREATE TABLE Buchung (\n' +
          '  BuchungsNr INTEGER PRIMARY KEY,\n' +
          '  KontoNr    INTEGER REFERENCES Konto(KontoNr) ON DELETE CASCADE,\n' +
          '  Betrag     NUMERIC\n' +
          ');',
      },
    ],
  },
  // ─────────────────────────────────────────────────────────────
  {
    nr: 10,
    art: 'Constraints – Operation erlaubt oder nicht?',
    titel: 'Sind diese Operationen ausführbar?',
    schema: {
      titel: 'Gegebene Tabellen',
      relationen: [
        { name: 'Kunde', attribute: ['KNr'], pk: ['KNr'] },
        {
          name: 'Bestellung',
          attribute: ['BNr', 'KNr'],
          pk: ['BNr'],
          hinweis: 'KNr → Kunde.KNr · Standard-Verhalten NO ACTION (kein CASCADE)',
        },
      ],
    },
    text:
      'Aktuelle Ausprägung: Kunde enthält KNr 1 und 2; Bestellung enthält (BNr 100, KNr 1).\n\n' +
      'Entscheiden Sie für jede Operation, ob sie ausführbar ist, und begründen Sie:\n' +
      "a) INSERT INTO Bestellung VALUES (101, 2);\n" +
      "b) INSERT INTO Bestellung VALUES (102, 5);\n" +
      "c) DELETE FROM Kunde WHERE KNr = 1;\n" +
      "d) DELETE FROM Kunde WHERE KNr = 2;",
    referenz: ['referenzielle-integritaet'],
    tipps: [
      { icon: '💡', titel: 'Fremdschlüssel-Regel', inhalt: 'Ein Fremdschlüsselwert muss als Schlüssel in der referenzierten Tabelle existieren (referenzielle Integrität).' },
      { icon: '⚠️', titel: 'Löschen', inhalt: 'Ohne CASCADE blockiert das DBMS das Löschen einer Zeile, solange sie noch referenziert wird.' },
    ],
    loesung: [
      {
        art: 'liste',
        punkte: [
          'a) Ausführbar. KNr 2 existiert in Kunde – der Fremdschlüssel ist gültig.',
          'b) NICHT ausführbar. KNr 5 existiert nicht in Kunde → Verletzung der referenziellen Integrität.',
          'c) NICHT ausführbar. Kunde 1 wird noch von Bestellung 100 referenziert; ohne ON DELETE CASCADE blockiert das DBMS das Löschen.',
          'd) Ausführbar. Kunde 2 wird von keiner Bestellung referenziert und darf gelöscht werden.',
        ],
      },
    ],
  },
  // ─────────────────────────────────────────────────────────────
  {
    nr: 11,
    art: 'Funktionale Abhängigkeiten prüfen',
    titel: 'Gelten diese FDs in der Ausprägung?',
    text:
      'Gegeben ist die folgende Ausprägung der Relation r(A, B, C). Prüfen Sie, ob die angegebenen funktionalen Abhängigkeiten in DIESER Ausprägung verletzt werden. Geben Sie bei Verletzung ein Gegenbeispiel an.\n\n' +
      'a) A → B\n' +
      'b) B → C\n' +
      'c) C → A',
    gegeben: [
      {
        titel: 'r(A, B, C)',
        columns: ['A', 'B', 'C'],
        rows: [['a1', 'b1', 'c1'], ['a2', 'b1', 'c1'], ['a3', 'b2', 'c1'], ['a1', 'b1', 'c2']],
      },
    ],
    referenz: ['funktionale-abhaengigkeiten'],
    tipps: [
      { icon: '💡', titel: 'Was heißt A → B?', inhalt: 'Zwei Zeilen mit gleichem A-Wert müssen auch gleiche B-Werte haben. Verletzt = zwei Zeilen links gleich, rechts verschieden.' },
      { icon: '🔍', titel: 'Systematisch', inhalt: 'Suche je FD nach zwei Zeilen mit gleichem linken Wert und vergleiche die rechte Seite.' },
    ],
    loesung: [
      {
        art: 'liste',
        punkte: [
          'a) A → B: gilt. Die beiden A = a1-Zeilen haben beide B = b1 – kein Widerspruch.',
          'b) B → C: gilt NICHT. Zeilen 1 und 4 haben beide B = b1, aber C = c1 bzw. C = c2 → Gegenbeispiel.',
          'c) C → A: gilt NICHT. Zeilen 1, 2 und 3 haben alle C = c1, aber A = a1, a2, a3 → Gegenbeispiel (z. B. Zeile 1 vs. 2).',
        ],
      },
      {
        art: 'text',
        text: 'Hinweis: Eine Ausprägung kann eine FD nur WIDERLEGEN (Gegenbeispiel) oder nahelegen – endgültig „gilt" folgt erst aus der Semantik der Daten.',
      },
    ],
  },
  // ─────────────────────────────────────────────────────────────
  {
    nr: 12,
    art: 'Normalisierung – Attributhülle, Schlüssel, Fc & 3NF',
    titel: 'Von den FDs zur 3NF-Zerlegung',
    schema: {
      titel: 'Gegebene Relation',
      // Kein pk: Das Bestimmen der Schlüssel ist genau Teilaufgabe b).
      relationen: [{ name: 'R', attribute: ['A', 'B', 'C', 'D'] }],
    },
    text:
      'Funktionale Abhängigkeiten:\n' +
      'A → B\n' +
      'B → C\n' +
      'A → D\n\n' +
      'a) Berechnen Sie die Attributhülle {A}⁺.\n' +
      'b) Bestimmen Sie alle Kandidatenschlüssel von R.\n' +
      'c) Geben Sie die kanonische Überdeckung Fc an.\n' +
      'd) Zerlegen Sie R mit dem Synthesealgorithmus in 3NF.',
    referenz: ['attributhuelle-schluessel', 'normalformen'],
    tipps: [
      { icon: '💡', titel: 'Hülle', inhalt: 'Starte mit {A} und nimm die rechte Seite jeder FD hinzu, deren linke Seite schon in der Hülle liegt – bis sich nichts mehr ändert.' },
      { icon: '🔍', titel: 'Schlüssel', inhalt: 'A kommt in keiner rechten FD-Seite vor → A muss in jedem Schlüssel sein. Reicht {A} allein (also {A}⁺ = alle Attribute)?' },
      { icon: '⚠️', titel: 'Fc', inhalt: 'Rechtsreduktion: A → C ist ableitbar (A → B → C), taucht hier aber gar nicht direkt auf. Prüfe, ob eine FD überflüssig/reduzierbar ist, und fasse gleiche linke Seiten zusammen.' },
    ],
    loesung: [
      {
        art: 'tabelle',
        titel: 'a) {A}⁺ schrittweise',
        columns: ['Schritt', 'anwendbare FD', 'Hülle danach'],
        rows: [
          ['Start', '–', '{A}'],
          ['1', 'A → B', '{A, B}'],
          ['2', 'A → D', '{A, B, D}'],
          ['3', 'B → C', '{A, B, C, D}'],
        ],
      },
      {
        art: 'text',
        text: 'a) {A}⁺ = {A, B, C, D} = alle Attribute.',
      },
      {
        art: 'text',
        text: 'b) Da {A}⁺ = alle Attribute, ist {A} ein Superschlüssel; weil {A} nur ein Attribut ist, ist es minimal → {A} ist der einzige Kandidatenschlüssel. (A steht in keiner rechten Seite, muss also in jedem Schlüssel sein; B, C, D sind jeweils von A abhängig, keiner davon bestimmt A.)',
      },
      {
        art: 'code',
        titel: 'c) Kanonische Überdeckung Fc',
        text:
          'Linksreduktion: alle linken Seiten sind einelementig – nichts zu reduzieren.\n' +
          'Rechtsreduktion: keine rechte Seite ist überflüssig (B, C, D werden je gebraucht).\n' +
          'Gleiche linke Seiten zusammenfassen: A → B und A → D  ⇒  A → BD.\n\n' +
          'Fc = { A → BD,  B → C }',
      },
      {
        art: 'text',
        text: 'd) Synthese: je FD in Fc eine Relation. R1(A, B, D) aus A → BD, R2(B, C) aus B → C. R1 enthält den Kandidatenschlüssel {A} → keine zusätzliche Schlüsselrelation nötig; keine Relation ist in einer anderen enthalten. Ergebnis (3NF, verlustlos & abhängigkeitserhaltend): R1(«A», B, D) und R2(«B», C).',
      },
    ],
  },
]
