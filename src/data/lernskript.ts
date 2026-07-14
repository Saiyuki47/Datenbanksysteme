// Kompaktes Lern-Skript für die gesamte Datenbanksysteme-Vorlesung – im Stil
// eines durchgehenden Lernzettels (Frage→Antwort, Definitionen, Merksätze,
// Tabellen, kurze Code-/Algebra-Beispiele), kapitelweise nach der Vorlesung
// (Kapitel 1–7). Die klausurrelevanten Fallstricke stehen im Tab „Klausur-Fallen". Inhalt aus den
// Vorlesungsfolien, Übungsblättern und den Referenz-Themen kondensiert.

export type SkriptBlock =
  // Frage → knappe Antwort (Kernformat des Lernzettels).
  | { art: 'frage'; q: string; a: string }
  | { art: 'text'; text: string }
  // Definition eines Begriffs.
  | { art: 'def'; begriff: string; text: string }
  | { art: 'liste'; titel?: string; punkte: string[] }
  // Hervorgehobener Merksatz.
  | { art: 'merk'; text: string }
  | { art: 'tabelle'; titel?: string; columns: string[]; rows: string[][] }
  // Monospace-Block (SQL, relationale Algebra, Schema).
  | { art: 'code'; titel?: string; text: string }
  // Inline-SVG-Diagramm (z. B. Beispiel-ER-Diagramm); nutzt die dgm-*-Styles.
  | { art: 'svg'; titel?: string; svg: string }

export interface SkriptAbschnitt {
  titel: string
  blocks: SkriptBlock[]
}

export interface SkriptKapitel {
  id: string
  nr: string
  titel: string
  abschnitte: SkriptAbschnitt[]
}

export const lernskript: SkriptKapitel[] = [
  // ===========================================================================
  {
    id: 'grundlagen',
    nr: '1',
    titel: 'Grundlagen',
    abschnitte: [
      {
        titel: '1.1 Warum ein Datenbanksystem?',
        blocks: [
          {
            art: 'frage',
            q: 'Welche Nachteile hat reine Dateiverwaltung (und was löst ein DBMS)?',
            a: 'Redundanz & Inkonsistenz, beschränkte Zugriffsmöglichkeiten, Datenisolation, Integritätsprobleme, Atomaritäts-/Sicherungsprobleme, Probleme im Mehrbenutzerbetrieb und Sicherheitsprobleme. Ein DBMS trennt Daten von den Anwendungen und löst genau diese Punkte zentral.',
          },
          {
            art: 'liste',
            titel: 'Die Nachteile im Einzelnen – jeweils mit Beispiel',
            punkte: [
              '**Redundanz & Inkonsistenz:** Dieselben Daten liegen mehrfach in verschiedenen Dateien; wird nur eine Kopie geändert, widersprechen sich die anderen. Beispiel: Die Kundenadresse steht in der Rechnungs- und in der Versanddatei – nach einem Umzug wird nur eine geändert, und es existieren zwei verschiedene Adressen. **Im DBMS:** Die Adresse wird zentral nur einmal gespeichert (Normalisierung), alle Anwendungen greifen darauf zu – eine Änderung wirkt sofort überall, Widersprüche entstehen gar nicht erst.',
              '**Beschränkte Zugriffsmöglichkeiten:** Für jede neue Auswertung muss erst ein Programm geschrieben werden, spontane Abfragen sind nicht möglich. Beispiel: „Welche Kunden aus Berlin haben über 1000 € Umsatz?" lässt sich nicht eben abfragen, solange kein passendes Programm dafür existiert. **Im DBMS:** Mit SQL formuliert man jede beliebige Abfrage ad hoc – auch vorher nicht vorgesehene Auswertungen, ganz ohne neues Programm.',
              '**Datenisolation:** Die Daten liegen verstreut in vielen Dateien mit unterschiedlichen Formaten, sodass zusammengehörige Daten schwer zu kombinieren sind. Beispiel: Kunden als CSV, Bestellungen als XML, Lagerbestand als Textdatei – jedes Programm muss alle Formate selbst kennen und zusammenführen. **Im DBMS:** Alle Daten liegen in einem einheitlichen Schema; ein JOIN verknüpft zusammengehörige Daten, ohne dass die Anwendung verschiedene Formate kennen muss.',
              '**Integritätsprobleme:** Konsistenzregeln stecken verstreut im Anwendungscode und müssen in jedes Programm neu eingebaut werden. Beispiel: Die Regel „Kontostand ≥ 0" muss jedes kontoändernde Programm selbst prüfen – vergisst es eines, wird die Regel verletzt. **Im DBMS:** Solche Regeln werden einmal zentral als Constraints (CHECK, Fremdschlüssel …) definiert und vom DBMS bei jeder Änderung automatisch geprüft – kein Programm kann sie umgehen.',
              '**Atomaritäts- & Sicherungsprobleme:** Stürzt das System mitten in einer Operation ab, bleibt ein halbfertiger Zustand ohne automatische Wiederherstellung. Beispiel: Bei einer Überweisung wird bei A abgebucht, dann stürzt das System vor der Gutschrift bei B ab – das Geld ist weg statt „alles oder nichts". **Im DBMS:** Transaktionen laufen atomar („alles oder nichts") mit Logging und Recovery – nach einem Absturz wird automatisch ein konsistenter Zustand wiederhergestellt.',
              '**Probleme im Mehrbenutzerbetrieb:** Greifen mehrere gleichzeitig zu, überschreiben sie sich gegenseitig (Lost Update). Beispiel: Zwei Verkäufer buchen gleichzeitig vom Bestand 10; beide lesen zuerst 10, einer zieht 2 ab, einer 5 – statt 3 steht am Ende 8 oder 5. **Im DBMS:** Die Nebenläufigkeitskontrolle (Sperren/Isolation) serialisiert die Zugriffe, sodass sich parallele Änderungen nicht überschreiben – der Endstand stimmt.',
              '**Sicherheitsprobleme:** Ohne feinkörnige Rechtevergabe kann jeder, der Zugriff auf die Datei hat, alles sehen und ändern. Beispiel: Ein Praktikant, der nur Bestellungen erfassen soll, kann auch die komplette Gehaltsdatei öffnen, weil es nur „Dateizugriff ja/nein" gibt. **Im DBMS:** Feingranulare Rechte (GRANT/REVOKE, Sichten) legen pro Nutzer/Rolle fest, wer welche Tabellen und Spalten überhaupt sehen und ändern darf.',
            ],
          },
          {
            art: 'def',
            begriff: 'DBMS / Datenbanksystem',
            text: 'Ein Datenbankmanagementsystem (DBMS) ist die Software, die einen gemeinsamen, konsistenten Datenbestand für mehrere Anwendungen/Nutzer verwaltet. Datenbanksystem (DBS) = DBMS + Datenbank.',
          },
          {
            art: 'merk',
            text: 'Ein DBMS übernimmt zentral: Konsistenz (Constraints), flexible Abfragen (SQL), Mehrbenutzerbetrieb, Sicherung/Recovery und Zugriffsschutz.',
          },
        ],
      },
      {
        titel: '1.2 Datenmodelle & Schema',
        blocks: [
          {
            art: 'frage',
            q: 'Relationales Modell vs. Graphdatenbank?',
            a: 'Relational: Daten in Tabellen (Relationen) mit festem Schema, Beziehungen implizit über Fremdschlüssel, ausgewertet per JOIN. Graph: Knoten (Entitäten) + Kanten (Beziehungen), Beziehungen explizit gespeichert → schnelles Traversieren stark vernetzter Daten.',
          },
          {
            art: 'text',
            text: 'Beispiel: drei Personen (Anna, Ben, Carla) und wer wen kennt – einmal relational in Tabellen, einmal als Graph modelliert.',
          },
          {
            art: 'tabelle',
            titel: 'Relational · Tabelle Person',
            columns: ['PersNr', 'Name'],
            rows: [
              ['1', 'Anna'],
              ['2', 'Ben'],
              ['3', 'Carla'],
            ],
          },
          {
            art: 'tabelle',
            titel: 'Relational · Tabelle kennt (von/nach = Fremdschlüssel auf PersNr)',
            columns: ['von', 'nach'],
            rows: [
              ['1', '2'],
              ['1', '3'],
              ['2', '3'],
            ],
          },
          {
            art: 'svg',
            titel: 'Graph · dieselben Daten: Personen = Knoten, „kennt" = Kanten',
            svg: `<svg viewBox="0 0 640 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Graph mit den Knoten Anna, Ben und Carla, verbunden durch kennt-Kanten">
  <defs>
    <marker id="ls12-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
      <path d="M0,0 L10,5 L0,10 z" style="fill:var(--text2)"/>
    </marker>
  </defs>
  <circle class="dgm-shape" cx="130" cy="80" r="40"/>
  <circle class="dgm-shape" cx="510" cy="80" r="40"/>
  <circle class="dgm-shape" cx="320" cy="215" r="40"/>
  <line class="dgm-line" x1="170" y1="80" x2="470" y2="80" marker-end="url(#ls12-arrow)"/>
  <line class="dgm-line" x1="163" y1="103" x2="287" y2="192" marker-end="url(#ls12-arrow)"/>
  <line class="dgm-line" x1="477" y1="103" x2="353" y2="192" marker-end="url(#ls12-arrow)"/>
  <text class="dgm-text dgm-text--sm" x="130" y="85" text-anchor="middle">Anna</text>
  <text class="dgm-text dgm-text--sm" x="510" y="85" text-anchor="middle">Ben</text>
  <text class="dgm-text dgm-text--sm" x="320" y="220" text-anchor="middle">Carla</text>
  <text class="dgm-text dgm-text--sm" x="320" y="70" text-anchor="middle">kennt</text>
  <text class="dgm-text dgm-text--sm" x="200" y="150" text-anchor="middle">kennt</text>
  <text class="dgm-text dgm-text--sm" x="440" y="150" text-anchor="middle">kennt</text>
</svg>`,
          },
          {
            art: 'liste',
            titel: 'Was man am Beispiel sieht',
            punkte: [
              '**Relational:** Die Beziehung „kennt" existiert nur als Zahlenpaare in einer eigenen Tabelle. Für „Wen kennt Anna?" muss man Person und kennt per JOIN über die Fremdschlüssel verbinden; „Freunde von Freunden" braucht noch einen weiteren JOIN.',
              '**Graph:** Jede Person ist ein Knoten, jedes „kennt" eine echte Kante. „Wen kennt Anna?" heißt einfach: den Kanten am Anna-Knoten folgen – „Freunde von Freunden" sind zwei Kanten weiter, ganz ohne JOIN. Darum sind Graphdatenbanken bei stark vernetzten Daten (soziale Netze, Wege, Empfehlungen) schneller.',
            ],
          },
          {
            art: 'text',
            text: 'Noch ein typisches Datenbank-Beispiel – ein Online-Shop mit Kunden und Bestellungen. Relational sind es zwei Tabellen; der Fremdschlüssel kunden_id verknüpft sie:',
          },
          {
            art: 'tabelle',
            titel: 'Tabelle Kunde',
            columns: ['kunden_id', 'name', 'ort'],
            rows: [
              ['1', 'Anna Schmidt', 'Fulda'],
              ['2', 'Ben Weber', 'Kassel'],
            ],
          },
          {
            art: 'tabelle',
            titel: 'Tabelle Bestellung (kunden_id = Fremdschlüssel auf Kunde)',
            columns: ['bestell_id', 'datum', 'betrag', 'kunden_id'],
            rows: [
              ['101', '01.07.26', '49,90', '1'],
              ['102', '03.07.26', '19,50', '1'],
              ['103', '05.07.26', '89,00', '2'],
            ],
          },
          {
            art: 'svg',
            titel: 'Als Graph: jede Zeile ein Knoten, der Fremdschlüssel wird zur Kante HAT_AUFGEGEBEN',
            svg: `<svg viewBox="0 0 720 430" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Graph: Kunden-Knoten mit HAT_AUFGEGEBEN-Kanten zu Bestellungs-Knoten">
  <defs>
    <marker id="ls12b-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
      <path d="M0,0 L10,5 L0,10 z" style="fill:var(--text2)"/>
    </marker>
  </defs>
  <line class="dgm-line" x1="192" y1="143" x2="506" y2="102" marker-end="url(#ls12b-arrow)"/>
  <line class="dgm-line" x1="191" y1="159" x2="507" y2="215" marker-end="url(#ls12b-arrow)"/>
  <line class="dgm-line" x1="192" y1="333" x2="506" y2="352" marker-end="url(#ls12b-arrow)"/>
  <text class="dgm-text" x="349" y="112" text-anchor="middle" style="font-size:10px;fill:var(--text2)">HAT_AUFGEGEBEN</text>
  <text class="dgm-text" x="349" y="181" text-anchor="middle" style="font-size:10px;fill:var(--text2)">HAT_AUFGEGEBEN</text>
  <text class="dgm-text" x="349" y="333" text-anchor="middle" style="font-size:10px;fill:var(--text2)">HAT_AUFGEGEBEN</text>
  <circle cx="140" cy="150" r="52" style="fill:var(--green);fill-opacity:.14;stroke:var(--green);stroke-width:1.5"/>
  <circle cx="140" cy="330" r="52" style="fill:var(--green);fill-opacity:.14;stroke:var(--green);stroke-width:1.5"/>
  <circle cx="560" cy="95" r="54" style="fill:var(--blue);fill-opacity:.14;stroke:var(--blue);stroke-width:1.5"/>
  <circle cx="560" cy="225" r="54" style="fill:var(--blue);fill-opacity:.14;stroke:var(--blue);stroke-width:1.5"/>
  <circle cx="560" cy="355" r="54" style="fill:var(--blue);fill-opacity:.14;stroke:var(--blue);stroke-width:1.5"/>
  <text x="140" y="146" text-anchor="middle" style="fill:var(--green);font-weight:700;font-size:12px">:Kunde</text>
  <text x="140" y="162" text-anchor="middle" class="dgm-text" style="font-size:10.5px">name: Anna</text>
  <text x="140" y="326" text-anchor="middle" style="fill:var(--green);font-weight:700;font-size:12px">:Kunde</text>
  <text x="140" y="342" text-anchor="middle" class="dgm-text" style="font-size:10.5px">name: Ben</text>
  <text x="560" y="83" text-anchor="middle" style="fill:var(--blue);font-weight:700;font-size:12px">:Bestellung</text>
  <text x="560" y="99" text-anchor="middle" class="dgm-text" style="font-size:10.5px">id: 101</text>
  <text x="560" y="113" text-anchor="middle" class="dgm-text" style="font-size:10.5px">betrag: 49,90</text>
  <text x="560" y="213" text-anchor="middle" style="fill:var(--blue);font-weight:700;font-size:12px">:Bestellung</text>
  <text x="560" y="229" text-anchor="middle" class="dgm-text" style="font-size:10.5px">id: 102</text>
  <text x="560" y="243" text-anchor="middle" class="dgm-text" style="font-size:10.5px">betrag: 19,50</text>
  <text x="560" y="343" text-anchor="middle" style="fill:var(--blue);font-weight:700;font-size:12px">:Bestellung</text>
  <text x="560" y="359" text-anchor="middle" class="dgm-text" style="font-size:10.5px">id: 103</text>
  <text x="560" y="373" text-anchor="middle" class="dgm-text" style="font-size:10.5px">betrag: 89,00</text>
</svg>`,
          },
          {
            art: 'text',
            text: 'Aus jeder Tabellenzeile wird ein Knoten mit einem Label (:Kunde, :Bestellung) und den Spalten als Eigenschaften. Der Fremdschlüssel kunden_id wird zur gerichteten Kante (:Kunde)-[:HAT_AUFGEGEBEN]→(:Bestellung). „Alle Bestellungen von Anna" heißt dann nur: den HAT_AUFGEGEBEN-Kanten von Annas Knoten folgen – kein JOIN über die kunden_id nötig.',
          },
          {
            art: 'def',
            begriff: 'Datenbankschema',
            text: 'Formale Beschreibung der Struktur: welche Tabellen es gibt, ihre Attribute, Datentypen, Constraints und Beziehungen (der „Bauplan"). Die konkreten Daten heißen Ausprägung und müssen zum Schema passen.',
          },
          {
            art: 'merk',
            text: 'Festes Schema (relational) = Integrität + Optimierbarkeit, aber weniger flexibel. Schemalos = flexibler, verlagert die Konsistenzprüfung aber in die Anwendung.',
          },
        ],
      },
      {
        titel: '1.3 Mehrbenutzerbetrieb',
        blocks: [
          {
            art: 'frage',
            q: 'Was ist das Lost-Update-Problem?',
            a: 'Zwei Transaktionen lesen denselben Wert x, bevor eine schreibt; die zweite überschreibt die Änderung der ersten. Beispiel: Bestand 10, A bestellt 2, B bestellt 5 – falls beide zuerst 10 lesen, geht eine Änderung verloren, Endstand ist falsch.',
          },
          {
            art: 'merk',
            text: 'Abhilfe: Nebenläufigkeitskontrolle – Transaktionen laufen isoliert (Sperren/Locks) und atomar („alles oder nichts"), Grundidee von ACID.',
          },
        ],
      },
    ],
  },
  // ===========================================================================
  {
    id: 'er-modell',
    nr: '2',
    titel: 'ER-Modell',
    abschnitte: [
      {
        titel: '2.1 Bausteine',
        blocks: [
          {
            art: 'liste',
            titel: 'Grundelemente',
            punkte: [
              'Entitytyp: „Ding" der realen Welt (Rechteck), z. B. Student.',
              'Attribut: Eigenschaft (Ellipse); Schlüsselattribut unterstrichen.',
              'Beziehungstyp: Verbindung zwischen Entitytypen (Raute), kann eigene Attribute haben.',
              'Schwache Entität: existenzabhängig, nur mit der identifizierenden Beziehung eindeutig (doppeltes Rechteck/Raute).',
            ],
          },
          {
            art: 'svg',
            titel: 'Beispiel: Professoren –(1)– liest –(N)– Vorlesungen (Schlüsselattribute unterstrichen)',
            svg: `<svg viewBox="0 0 720 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Beispiel-ER-Diagramm: Professoren liest Vorlesungen">
  <line class="dgm-line" x1="128" y1="64" x2="150" y2="120"/>
  <line class="dgm-line" x1="205" y1="64" x2="182" y2="120"/>
  <line class="dgm-line" x1="533" y1="64" x2="552" y2="120"/>
  <line class="dgm-line" x1="622" y1="64" x2="600" y2="120"/>
  <line class="dgm-line" x1="230" y1="145" x2="295" y2="145"/>
  <line class="dgm-line" x1="425" y1="145" x2="490" y2="145"/>
  <rect class="dgm-shape" x="80" y="120" width="150" height="50" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="155" y="149" text-anchor="middle">Professoren</text>
  <rect class="dgm-shape" x="490" y="120" width="170" height="50" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="575" y="149" text-anchor="middle">Vorlesungen</text>
  <polygon class="dgm-shape" points="295,145 360,107 425,145 360,183"/>
  <text class="dgm-text dgm-text--sm" x="360" y="149" text-anchor="middle">liest</text>
  <ellipse class="dgm-shape" cx="110" cy="47" rx="42" ry="17"/>
  <text class="dgm-key" x="110" y="52" text-anchor="middle">PersNr</text>
  <ellipse class="dgm-shape" cx="212" cy="47" rx="38" ry="17"/>
  <text class="dgm-text dgm-text--sm" x="212" y="52" text-anchor="middle">Name</text>
  <ellipse class="dgm-shape" cx="518" cy="47" rx="42" ry="17"/>
  <text class="dgm-key" x="518" y="52" text-anchor="middle">VorlNr</text>
  <ellipse class="dgm-shape" cx="628" cy="47" rx="38" ry="17"/>
  <text class="dgm-text dgm-text--sm" x="628" y="52" text-anchor="middle">Titel</text>
  <text class="dgm-card" x="256" y="136">1</text>
  <text class="dgm-card" x="452" y="136">N</text>
</svg>`,
          },
          {
            art: 'text',
            text: 'Rechteck = Entitytyp, Ellipse = Attribut (Schlüssel unterstrichen), Raute = Beziehungstyp; die 1 und das N geben die Funktionalität an (ein Professor liest mehrere Vorlesungen, jede Vorlesung wird von genau einem Professor gelesen).',
          },
          {
            art: 'svg',
            titel: 'Beispiel schwache Entität: Gebäude –(1)– liegt_in –(N)– Raum (Doppelrahmen = schwach, Doppelraute = identifizierend, RaumNr gestrichelt = partieller Schlüssel)',
            svg: `<svg viewBox="0 0 720 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ER-Diagramm mit schwacher Entität: Gebäude liegt_in Raum">
  <line class="dgm-line" x1="128" y1="67" x2="150" y2="125"/>
  <line class="dgm-line" x1="205" y1="67" x2="182" y2="125"/>
  <line class="dgm-line" x1="538" y1="67" x2="556" y2="125"/>
  <line class="dgm-line" x1="622" y1="67" x2="600" y2="125"/>
  <line class="dgm-line" x1="230" y1="150" x2="300" y2="150"/>
  <line class="dgm-line" x1="430" y1="150" x2="490" y2="150"/>
  <rect class="dgm-shape" x="80" y="125" width="150" height="50" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="155" y="154" text-anchor="middle">Gebäude</text>
  <rect class="dgm-shape" x="490" y="125" width="160" height="50" rx="4"/>
  <rect class="dgm-shape" x="494" y="129" width="152" height="42" rx="2"/>
  <text class="dgm-text dgm-text--sm" x="570" y="154" text-anchor="middle">Raum</text>
  <polygon class="dgm-shape" points="300,150 365,110 430,150 365,190"/>
  <polygon class="dgm-shape" points="308,150 365,116 422,150 365,184"/>
  <text class="dgm-text dgm-text--sm" x="365" y="154" text-anchor="middle">liegt_in</text>
  <ellipse class="dgm-shape" cx="110" cy="50" rx="42" ry="17"/>
  <text class="dgm-key" x="110" y="55" text-anchor="middle">GebNr</text>
  <ellipse class="dgm-shape" cx="212" cy="50" rx="38" ry="17"/>
  <text class="dgm-text dgm-text--sm" x="212" y="55" text-anchor="middle">Name</text>
  <ellipse class="dgm-shape" cx="518" cy="50" rx="44" ry="17"/>
  <text class="dgm-text dgm-text--sm" x="518" y="54" text-anchor="middle">RaumNr</text>
  <line class="dgm-line" x1="497" y1="59" x2="539" y2="59" stroke-dasharray="3 2"/>
  <ellipse class="dgm-shape" cx="628" cy="50" rx="40" ry="17"/>
  <text class="dgm-text dgm-text--sm" x="628" y="55" text-anchor="middle">Fläche</text>
  <text class="dgm-card" x="256" y="141">1</text>
  <text class="dgm-card" x="456" y="141">N</text>
</svg>`,
          },
          {
            art: 'text',
            text: 'Raum ist eine schwache Entität (Doppelrahmen): RaumNr allein ist nicht eindeutig – „Raum 101" gibt es in fast jedem Gebäude. Erst zusammen mit dem Gebäude über die identifizierende Beziehung liegt_in (Doppelraute) wird ein Raum eindeutig. Die gestrichelte Unterstreichung heißt darum ausdrücklich nicht „das ist schon der Primärschlüssel", sondern nur partieller Schlüssel: RaumNr ist bloß ein Teil davon. Weil außerdem jeder Raum zu genau einem Gebäude gehört, nimmt die schwache Seite immer voll an der Beziehung teil.',
          },
          {
            art: 'text',
            text: 'Was das für die relationale Umsetzung bedeutet: Die schwache Entität übernimmt den Schlüssel der starken Entität als Fremdschlüssel und setzt ihren Primärschlüssel aus diesem Fremdschlüssel PLUS ihrem eigenen partiellen Schlüssel zusammen. Der Primärschlüssel von Raum besteht also aus zwei Spalten – (GebNr, RaumNr) –, wobei GebNr gleichzeitig Fremdschlüssel auf Gebäude ist. Genau das drückt die gestrichelte Unterstreichung im Diagramm aus.',
          },
          {
            art: 'code',
            titel: 'Relationale Umsetzung – der Primärschlüssel von Raum ist zusammengesetzt',
            text: 'Gebäude(GebNr, Name)          PK: GebNr\nRaum(GebNr, RaumNr, Fläche)   PK: (GebNr, RaumNr)  ← zwei Spalten\n                              FK: GebNr → Gebäude(GebNr)',
          },
          {
            art: 'tabelle',
            titel: 'Beispiel-Daten: RaumNr „101" kommt mehrfach vor – erst (GebNr, RaumNr) zusammen ist eindeutig',
            columns: ['GebNr', 'RaumNr', 'Fläche'],
            rows: [
              ['G1', '101', '24 m²'],
              ['G1', '102', '30 m²'],
              ['G2', '101', '18 m²'],
              ['G2', '205', '40 m²'],
            ],
          },
          {
            art: 'merk',
            text: 'Faustregel schwache Entität: Ihr Primärschlüssel ist immer zusammengesetzt = Schlüssel der starken Entität (als Fremdschlüssel übernommen) + eigener partieller Schlüssel. Für Raum also PK = (GebNr, RaumNr) über zwei Spalten – RaumNr allein wäre nicht eindeutig.',
          },
          {
            art: 'frage',
            q: 'Was ist eine IS-A-Beziehung (Generalisierung)?',
            a: 'Ein Obertyp wird in Untertypen spezialisiert (z. B. Kunde → Person / Firma). Die Untertypen erben die Attribute des Obertyps.',
          },
          {
            art: 'svg',
            titel: 'Beispiel IS-A: Kunde wird in Person und Firma spezialisiert (beide erben KDNR/Name)',
            svg: `<svg viewBox="0 0 460 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="IS-A: Kunde spezialisiert in Person und Firma">
  <line class="dgm-line" x1="230" y1="69" x2="230" y2="100"/>
  <line class="dgm-line" x1="214" y1="138" x2="150" y2="185"/>
  <line class="dgm-line" x1="246" y1="138" x2="310" y2="185"/>
  <rect class="dgm-shape" x="160" y="25" width="140" height="44" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="230" y="51" text-anchor="middle">Kunde</text>
  <polygon class="dgm-shape" points="200,120 214,100 246,100 260,120 246,140 214,140"/>
  <text class="dgm-text dgm-text--sm" x="230" y="124" text-anchor="middle">IS-A</text>
  <polygon class="dgm-shape" points="224,101 236,101 230,93"/>
  <rect class="dgm-shape" x="70" y="185" width="130" height="44" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="135" y="211" text-anchor="middle">Person</text>
  <rect class="dgm-shape" x="260" y="185" width="130" height="44" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="325" y="211" text-anchor="middle">Firma</text>
</svg>`,
          },
          {
            art: 'text',
            text: 'Relational setzt man die Generalisierung meist so um: Der Obertyp bekommt eine eigene Relation mit den gemeinsamen Attributen (Kunde), und jeder Untertyp bekommt eine eigene Relation mit nur seinen zusätzlichen Attributen (Person, Firma). Als Schlüssel benutzt jeder Untertyp denselben Schlüssel wie der Obertyp: KDNR ist im Untertyp zugleich Primärschlüssel UND Fremdschlüssel auf Kunde. Die vollständigen Daten eines Untertyps – geerbte plus eigene Attribute – bekommt man, indem man Obertyp und Untertyp über KDNR verbindet (Kunde ⋈ Person).',
          },
          {
            art: 'code',
            titel: 'Relationale Umsetzung – Untertyp erbt den Schlüssel des Obertyps',
            text: 'Kunde(KDNR, Name)               Obertyp – gemeinsame Attribute\nPerson(KDNR, Geburtsdatum)      KDNR = PK und FK → Kunde\nFirma(KDNR, Rechtsform)         KDNR = PK und FK → Kunde',
          },
          {
            art: 'tabelle',
            titel: 'Obertyp Kunde – die gemeinsamen Attribute (KDNR, Name) für alle Kunden',
            columns: ['KDNR', 'Name'],
            rows: [
              ['K1', 'Anna Schmidt'],
              ['K2', 'Weber Bau AG'],
              ['K3', 'Ben Krause'],
            ],
          },
          {
            art: 'tabelle',
            titel: 'Untertyp Person – nur K1 und K3 sind Personen (KDNR verweist zurück auf Kunde)',
            columns: ['KDNR', 'Geburtsdatum'],
            rows: [
              ['K1', '12.05.1990'],
              ['K3', '03.11.1985'],
            ],
          },
          {
            art: 'tabelle',
            titel: 'Untertyp Firma – K2 ist eine Firma (KDNR verweist zurück auf Kunde)',
            columns: ['KDNR', 'Rechtsform'],
            rows: [
              ['K2', 'AG'],
            ],
          },
          {
            art: 'merk',
            text: 'Faustregel IS-A: Dieselbe KDNR steht im Obertyp und im Untertyp – der Untertyp erbt den Schlüssel und benutzt ihn zugleich als Fremdschlüssel auf den Obertyp. Jeder Kunde taucht in genau einem Untertyp auf; alle Attribute (geerbt + eigen) holt man per Join über KDNR (z. B. Kunde ⋈ Person ergibt KDNR, Name, Geburtsdatum).',
          },
        ],
      },
      {
        titel: '2.2 Funktionalitäten & (min,max)',
        blocks: [
          {
            art: 'frage',
            q: 'Welche Funktionalitäten gibt es bei binären Beziehungen?',
            a: '1:1, 1:N, N:1 und N:M. Die Angabe steht an der jeweiligen Entität und beschränkt, wie viele Partner auf der Gegenseite möglich sind.',
          },
          {
            art: 'svg',
            titel: 'Die vier Funktionalitäten – je als kleines ER-Beispiel (die Zahl steht am Beziehungstyp)',
            svg: `<svg viewBox="0 0 720 285" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Vier ER-Beispiele für die Funktionalitäten 1:1, 1:N, N:1 und N:M">
  <line class="dgm-line" x1="360" y1="20" x2="360" y2="270" style="opacity:.35"/>
  <line class="dgm-line" x1="15" y1="150" x2="705" y2="150" style="opacity:.35"/>
  <text class="dgm-card" x="180" y="32" text-anchor="middle">1:1</text>
  <rect class="dgm-shape" x="22" y="56" width="100" height="40" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="72" y="80" text-anchor="middle">Abteilung</text>
  <line class="dgm-line" x1="122" y1="76" x2="138" y2="76"/>
  <polygon class="dgm-shape" points="138,76 180,50 222,76 180,102"/>
  <text class="dgm-text dgm-text--sm" x="180" y="80" text-anchor="middle">leitet</text>
  <line class="dgm-line" x1="222" y1="76" x2="238" y2="76"/>
  <rect class="dgm-shape" x="238" y="56" width="100" height="40" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="288" y="80" text-anchor="middle">Manager</text>
  <text class="dgm-card" x="128" y="70" text-anchor="middle">1</text>
  <text class="dgm-card" x="232" y="70" text-anchor="middle">1</text>
  <text class="dgm-card" x="540" y="32" text-anchor="middle">1:N</text>
  <rect class="dgm-shape" x="382" y="56" width="100" height="40" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="432" y="80" text-anchor="middle">Abteilung</text>
  <line class="dgm-line" x1="482" y1="76" x2="498" y2="76"/>
  <polygon class="dgm-shape" points="498,76 540,50 582,76 540,102"/>
  <text class="dgm-text dgm-text--sm" x="540" y="80" text-anchor="middle">beschäftigt</text>
  <line class="dgm-line" x1="582" y1="76" x2="598" y2="76"/>
  <rect class="dgm-shape" x="598" y="56" width="100" height="40" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="648" y="80" text-anchor="middle">Mitarbeiter</text>
  <text class="dgm-card" x="488" y="70" text-anchor="middle">1</text>
  <text class="dgm-card" x="592" y="70" text-anchor="middle">N</text>
  <text class="dgm-card" x="180" y="182" text-anchor="middle">N:1</text>
  <rect class="dgm-shape" x="22" y="206" width="100" height="40" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="72" y="230" text-anchor="middle">Mitarbeiter</text>
  <line class="dgm-line" x1="122" y1="226" x2="138" y2="226"/>
  <polygon class="dgm-shape" points="138,226 180,200 222,226 180,252"/>
  <text class="dgm-text dgm-text--sm" x="180" y="230" text-anchor="middle">arbeitet_in</text>
  <line class="dgm-line" x1="222" y1="226" x2="238" y2="226"/>
  <rect class="dgm-shape" x="238" y="206" width="100" height="40" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="288" y="230" text-anchor="middle">Abteilung</text>
  <text class="dgm-card" x="128" y="220" text-anchor="middle">N</text>
  <text class="dgm-card" x="232" y="220" text-anchor="middle">1</text>
  <text class="dgm-card" x="540" y="182" text-anchor="middle">N:M</text>
  <rect class="dgm-shape" x="382" y="206" width="100" height="40" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="432" y="230" text-anchor="middle">Student</text>
  <line class="dgm-line" x1="482" y1="226" x2="498" y2="226"/>
  <polygon class="dgm-shape" points="498,226 540,200 582,226 540,252"/>
  <text class="dgm-text dgm-text--sm" x="540" y="230" text-anchor="middle">hört</text>
  <line class="dgm-line" x1="582" y1="226" x2="598" y2="226"/>
  <rect class="dgm-shape" x="598" y="206" width="100" height="40" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="648" y="230" text-anchor="middle">Vorlesung</text>
  <text class="dgm-card" x="488" y="220" text-anchor="middle">N</text>
  <text class="dgm-card" x="592" y="220" text-anchor="middle">M</text>
</svg>`,
          },
          {
            art: 'text',
            text: 'Die Funktionalität annotiert den Beziehungstyp (die Raute): Die Zahl an einer Seite sagt, wie viele Partner auf der Gegenseite erlaubt sind. 1:N und N:1 sind dieselbe Beziehung – nur aus Sicht der jeweils anderen Entität gelesen (eine Abteilung beschäftigt viele Mitarbeiter = jeder Mitarbeiter arbeitet in genau einer Abteilung). Nur bei N:M braucht man beim Umsetzen ins relationale Schema eine eigene Beziehungstabelle.',
          },
          {
            art: 'tabelle',
            titel: 'Funktionalität ↔ (min,max)-Notation',
            columns: ['F1 : F2', '(min1, max1)', '(min2, max2)'],
            rows: [
              ['1 : 1', '(0, 1)', '(0, 1)'],
              ['1 : N', '(0, *)', '(0, 1)'],
              ['N : 1', '(0, 1)', '(0, *)'],
              ['N : M', '(0, *)', '(0, *)'],
            ],
          },
          {
            art: 'merk',
            text: '(min,max) sagt, wie oft ein konkreter Wert in der Beziehungstabelle minimal/maximal vorkommen darf. Vorsicht: Funktionalität und (min,max) stehen „über Kreuz" – die max-Angabe bei E1 gehört zur Gegenseite.',
          },
          {
            art: 'svg',
            titel: 'Dieselben vier Beispiele in (min,max)-Notation – das Paar (min, max) steht an der Entität selbst',
            svg: `<svg viewBox="0 0 720 285" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Dieselben vier ER-Beispiele, aber mit (min,max)-Notation an den Entitäten">
  <line class="dgm-line" x1="360" y1="20" x2="360" y2="270" style="opacity:.35"/>
  <line class="dgm-line" x1="15" y1="150" x2="705" y2="150" style="opacity:.35"/>
  <text class="dgm-card" x="72" y="36" text-anchor="middle">(0,1)</text>
  <text class="dgm-card" x="288" y="36" text-anchor="middle">(0,1)</text>
  <rect class="dgm-shape" x="22" y="56" width="100" height="40" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="72" y="80" text-anchor="middle">Abteilung</text>
  <line class="dgm-line" x1="122" y1="76" x2="138" y2="76"/>
  <polygon class="dgm-shape" points="138,76 180,50 222,76 180,102"/>
  <text class="dgm-text dgm-text--sm" x="180" y="80" text-anchor="middle">leitet</text>
  <line class="dgm-line" x1="222" y1="76" x2="238" y2="76"/>
  <rect class="dgm-shape" x="238" y="56" width="100" height="40" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="288" y="80" text-anchor="middle">Manager</text>
  <text class="dgm-card" x="432" y="36" text-anchor="middle">(0,*)</text>
  <text class="dgm-card" x="648" y="36" text-anchor="middle">(0,1)</text>
  <rect class="dgm-shape" x="382" y="56" width="100" height="40" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="432" y="80" text-anchor="middle">Abteilung</text>
  <line class="dgm-line" x1="482" y1="76" x2="498" y2="76"/>
  <polygon class="dgm-shape" points="498,76 540,50 582,76 540,102"/>
  <text class="dgm-text dgm-text--sm" x="540" y="80" text-anchor="middle">beschäftigt</text>
  <line class="dgm-line" x1="582" y1="76" x2="598" y2="76"/>
  <rect class="dgm-shape" x="598" y="56" width="100" height="40" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="648" y="80" text-anchor="middle">Mitarbeiter</text>
  <text class="dgm-card" x="72" y="186" text-anchor="middle">(0,1)</text>
  <text class="dgm-card" x="288" y="186" text-anchor="middle">(0,*)</text>
  <rect class="dgm-shape" x="22" y="206" width="100" height="40" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="72" y="230" text-anchor="middle">Mitarbeiter</text>
  <line class="dgm-line" x1="122" y1="226" x2="138" y2="226"/>
  <polygon class="dgm-shape" points="138,226 180,200 222,226 180,252"/>
  <text class="dgm-text dgm-text--sm" x="180" y="230" text-anchor="middle">arbeitet_in</text>
  <line class="dgm-line" x1="222" y1="226" x2="238" y2="226"/>
  <rect class="dgm-shape" x="238" y="206" width="100" height="40" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="288" y="230" text-anchor="middle">Abteilung</text>
  <text class="dgm-card" x="432" y="186" text-anchor="middle">(0,*)</text>
  <text class="dgm-card" x="648" y="186" text-anchor="middle">(0,*)</text>
  <rect class="dgm-shape" x="382" y="206" width="100" height="40" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="432" y="230" text-anchor="middle">Student</text>
  <line class="dgm-line" x1="482" y1="226" x2="498" y2="226"/>
  <polygon class="dgm-shape" points="498,226 540,200 582,226 540,252"/>
  <text class="dgm-text dgm-text--sm" x="540" y="230" text-anchor="middle">hört</text>
  <line class="dgm-line" x1="582" y1="226" x2="598" y2="226"/>
  <rect class="dgm-shape" x="598" y="206" width="100" height="40" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="648" y="230" text-anchor="middle">Vorlesung</text>
</svg>`,
          },
          {
            art: 'text',
            text: 'Statt einer einzelnen Zahl steht hier an jeder Entität ein Paar (min, max): an wie vielen Beziehungen ein einzelnes Exemplar dieser Entität mindestens und höchstens teilnimmt (* = beliebig viele, min 0 = Teilnahme optional). Beim 1:N-Beispiel steht an »Abteilung« (0,*) – eine Abteilung beschäftigt 0 bis beliebig viele Mitarbeiter; an »Mitarbeiter« (0,1) – jeder Mitarbeiter gehört zu höchstens einer Abteilung.',
          },
          {
            art: 'text',
            text: 'Genau hier sieht man das „über Kreuz": Bei der Funktionalität stand das N (viele) auf der Mitarbeiter-Seite; als (min,max) sitzt das * dagegen bei der Abteilung, weil (min,max) die Teilnahme der Entität selbst beschreibt – nicht die der Gegenseite.',
          },
          {
            art: 'frage',
            q: 'Bei n-stelligen Beziehungen (n > 2): Funktionalität vs. (min,max)?',
            a: 'Beide Notationen sind unvergleichbar – jede kann etwas ausdrücken, das die andere nicht kann. Funktionalität ist eine Bedingung über KOMBINATIONEN von Entitäten (»dieses Paar bestimmt die dritte eindeutig«); (min,max) begrenzt, wie oft eine EINZELNE Entität in der Beziehung vorkommt. Am Beispiel »betreuen« unten wird der Unterschied konkret.',
          },
          {
            art: 'svg',
            titel: 'Ternäre Beziehung: „betreuen" verbindet drei Entitytypen',
            svg: `<svg viewBox="0 0 600 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ternäre Beziehung betreuen zwischen Studenten, Professoren und Seminarthemen">
  <line class="dgm-line" x1="170" y1="97" x2="238" y2="97"/>
  <line class="dgm-line" x1="362" y1="97" x2="430" y2="97"/>
  <line class="dgm-line" x1="300" y1="134" x2="300" y2="185"/>
  <rect class="dgm-shape" x="30" y="75" width="140" height="44" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="100" y="101" text-anchor="middle">Studenten</text>
  <rect class="dgm-shape" x="430" y="75" width="140" height="44" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="500" y="101" text-anchor="middle">Professoren</text>
  <rect class="dgm-shape" x="210" y="185" width="180" height="44" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="300" y="211" text-anchor="middle">Seminarthemen</text>
  <polygon class="dgm-shape" points="238,97 300,60 362,97 300,134"/>
  <text class="dgm-text dgm-text--sm" x="300" y="101" text-anchor="middle">betreuen</text>
</svg>`,
          },
          {
            art: 'text',
            text: 'Konkret: Ein Eintrag (Student, Professor, Thema) in »betreuen« heißt „dieser Professor betreut diesen Studenten bei diesem Seminarthema". Als Beispiel-Beziehungstabelle:',
          },
          {
            art: 'tabelle',
            titel: 'betreuen (Beispieldaten)',
            columns: ['Student', 'Professor', 'Thema'],
            rows: [
              ['Anna', 'Curie', 'Graphen'],
              ['Anna', 'Bohr', 'Optik'],
              ['Ben', 'Curie', 'Graphen'],
            ],
          },
          {
            art: 'liste',
            titel: 'Zwei Bedingungen – jede nur mit einer Notation ausdrückbar',
            punkte: [
              '**Nur mit Funktionalität:** „Ein Student bearbeitet ein bestimmtes Thema bei höchstens einem Professor." Das ist die Funktion Student × Thema → Professor – eine Bedingung über das PAAR (Student, Thema). In der Tabelle: (Anna, Graphen) hat nur Curie; ein zusätzlicher Eintrag (Anna, Graphen, Bohr) wäre damit verboten. (min,max) kann das nicht sagen, weil es sich nie auf ein Paar bezieht, sondern immer nur auf eine einzelne Entität.',
              '**Nur mit (min,max):** „Jeder Student wird in höchstens 3 Betreuungen geführt." = (0,3) an Studenten – gezählt wird, wie oft eine EINZELNE Entität vorkommt (Anna steht in 2 Zeilen, Ben in 1). Die Funktionalität kann keine Obergrenze wie „3" ausdrücken; sie kennt nur „bestimmt eindeutig" (höchstens 1) oder gar keine Schranke.',
            ],
          },
          {
            art: 'merk',
            text: 'Kern: Funktionalität = Bedingung über KOMBINATIONEN (ein Paar/Tupel bestimmt eine weitere Entität), (min,max) = Vorkommen EINZELNER Entitäten. Keine Notation ist stärker – sie beschränken verschiedene Dinge, deshalb „unvergleichbar".',
          },
        ],
      },
    ],
  },
  // ===========================================================================
  {
    id: 'rel-modell',
    nr: '3',
    titel: 'Relationales Modell & Überführung',
    abschnitte: [
      {
        titel: '3.1 Begriffe & Schlüssel',
        blocks: [
          {
            art: 'liste',
            titel: 'Grundbegriffe',
            punkte: [
              'Relation = Tabelle, Tupel = Zeile, Attribut = Spalte, Grad = Spaltenzahl, Kardinalität = Zeilenzahl.',
              'Superschlüssel: Attributmenge, die ein Tupel eindeutig bestimmt.',
              'Kandidatenschlüssel: minimaler Superschlüssel (keine Teilmenge ist noch Superschlüssel).',
              'Primärschlüssel (PK): ausgewählter Kandidatenschlüssel; darf nicht NULL sein.',
              'Fremdschlüssel (FK): Attribut(e), die auf den PK einer (anderen) Relation verweisen.',
            ],
          },
          {
            art: 'svg',
            titel: 'Beispiel-Relation »Studenten«: die ganze Tabelle ist die Relation, die Fachbegriffe stehen an den Rändern',
            svg: `<svg viewBox="0 0 720 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Beispiel-Relation Studenten mit beschrifteten Fachbegriffen Attribut, Tupel, Grad und Kardinalität">
  <rect x="300" y="70" width="150" height="136" style="fill:var(--blue);opacity:.10"/>
  <rect x="190" y="138" width="370" height="34" style="fill:var(--green);opacity:.13"/>
  <rect class="dgm-line" x="190" y="70" width="370" height="136"/>
  <line class="dgm-line" x1="300" y1="70" x2="300" y2="206"/>
  <line class="dgm-line" x1="450" y1="70" x2="450" y2="206"/>
  <line class="dgm-line" x1="190" y1="104" x2="560" y2="104"/>
  <line class="dgm-line" x1="190" y1="138" x2="560" y2="138"/>
  <line class="dgm-line" x1="190" y1="172" x2="560" y2="172"/>
  <text class="dgm-text dgm-text--sm" x="245" y="92" text-anchor="middle">MatrNr</text>
  <text class="dgm-text dgm-text--sm" x="375" y="92" text-anchor="middle">Name</text>
  <text class="dgm-text dgm-text--sm" x="505" y="92" text-anchor="middle">Semester</text>
  <text class="dgm-text dgm-text--sm" x="245" y="126" text-anchor="middle">24002</text>
  <text class="dgm-text dgm-text--sm" x="375" y="126" text-anchor="middle">Xenokrates</text>
  <text class="dgm-text dgm-text--sm" x="505" y="126" text-anchor="middle">18</text>
  <text class="dgm-text dgm-text--sm" x="245" y="160" text-anchor="middle">25403</text>
  <text class="dgm-text dgm-text--sm" x="375" y="160" text-anchor="middle">Jonas</text>
  <text class="dgm-text dgm-text--sm" x="505" y="160" text-anchor="middle">12</text>
  <text class="dgm-text dgm-text--sm" x="245" y="194" text-anchor="middle">26120</text>
  <text class="dgm-text dgm-text--sm" x="375" y="194" text-anchor="middle">Fichte</text>
  <text class="dgm-text dgm-text--sm" x="505" y="194" text-anchor="middle">10</text>
  <text class="dgm-text dgm-text--sm" x="375" y="40" text-anchor="middle" style="fill:var(--blue)">Attribut = Spalte</text>
  <text class="dgm-text" x="375" y="63" text-anchor="middle" style="fill:var(--blue)">↓</text>
  <text class="dgm-text dgm-text--sm" x="575" y="164" text-anchor="start" style="fill:var(--green)">← Tupel = Zeile</text>
  <line class="dgm-line" x1="190" y1="220" x2="560" y2="220"/>
  <line class="dgm-line" x1="190" y1="214" x2="190" y2="220"/>
  <line class="dgm-line" x1="560" y1="214" x2="560" y2="220"/>
  <line class="dgm-line" x1="375" y1="220" x2="375" y2="228"/>
  <text class="dgm-text dgm-text--sm" x="375" y="244" text-anchor="middle">Grad = 3 (Spalten)</text>
  <line class="dgm-line" x1="176" y1="104" x2="176" y2="206"/>
  <line class="dgm-line" x1="176" y1="104" x2="182" y2="104"/>
  <line class="dgm-line" x1="176" y1="206" x2="182" y2="206"/>
  <line class="dgm-line" x1="176" y1="155" x2="170" y2="155"/>
  <text class="dgm-text dgm-text--sm" x="96" y="151" text-anchor="middle">Kardinalität</text>
  <text class="dgm-text dgm-text--sm" x="96" y="167" text-anchor="middle">= 3 (Zeilen)</text>
</svg>`,
          },
          {
            art: 'text',
            text: 'Grad (Spaltenzahl) und Kardinalität (Zeilenzahl) sind hier beide 3. Achtung: „Kardinalität" meint in der relationalen Theorie die Zeilenzahl – nicht zu verwechseln mit der Kardinalität/Funktionalität einer ER-Beziehung (1:N, N:M).',
          },
          {
            art: 'text',
            text: 'Beispiel für Schlüssel – eine Studenten-Relation, in der sowohl die Matrikelnummer als auch die E-Mail eindeutig sind, der Name aber nicht:',
          },
          {
            art: 'tabelle',
            titel: 'Beispiel-Relation Student (MatrNr und Email eindeutig, Name nicht)',
            columns: ['MatrNr', 'Email', 'Name'],
            rows: [
              ['24002', 'xenokrates@uni.de', 'Xenokrates'],
              ['25403', 'jonas@uni.de', 'Jonas'],
              ['26120', 'fichte@uni.de', 'Fichte'],
            ],
          },
          {
            art: 'liste',
            titel: 'Schlüssel an diesem Beispiel',
            punkte: [
              '**Superschlüssel:** jede Attributmenge, die eine Zeile eindeutig bestimmt. Hier z. B. {MatrNr}, {Email}, aber auch {MatrNr, Name}, {Email, Name} oder {MatrNr, Email, Name} – sie alle enthalten ein eindeutiges Attribut und legen die Zeile damit eindeutig fest.',
              '**Kandidatenschlüssel:** die minimalen Superschlüssel – kein Attribut ist mehr weglassbar, ohne die Eindeutigkeit zu verlieren. Hier {MatrNr} und {Email}. {MatrNr, Name} ist keiner, weil Name überflüssig ist ({MatrNr} allein bestimmt die Zeile schon); {Name} allein ist gar kein Superschlüssel (Namen können doppelt vorkommen).',
            ],
          },
        ],
      },
      {
        titel: '3.2 ER → Relationales Schema',
        blocks: [
          {
            art: 'liste',
            titel: 'Regeln der initialen Überführung',
            punkte: [
              'Jeder Entitytyp wird eine eigene Relation (mit seinen Attributen + Schlüssel).',
              'Jeder Beziehungstyp wird eine eigene Relation aus den Schlüsseln der beteiligten Entitytypen + eigenen Beziehungsattributen.',
            ],
          },
          {
            art: 'text',
            text: 'Anmerkung: „Relation" ist dabei nur ein anderes Wort für „Tabelle" (Spalten = Attribute, Zeilen = Tupel). Was genau eine Relation, ein Tupel, ein Attribut und ein Schlüssel ist, steht oben in Abschnitt 3.1 Begriffe & Schlüssel.',
          },
          {
            art: 'merk',
            text: 'Verfeinern: Relationen mit GLEICHEM Schlüssel darf man zusammenfassen – aber nur diese! Binäre 1:N/N:1/1:1-Beziehungsrelationen werden mit der passenden Entity-Relation verschmolzen; N:M-Beziehungen behalten immer eine eigene Relation.',
          },
          {
            art: 'svg',
            titel: 'ER-Diagramm zum Beispiel (wird unten in Relationen überführt)',
            svg: `<svg viewBox="0 0 560 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ER: Auto N herstellen 1 Hersteller">
  <line class="dgm-line" x1="150" y1="57" x2="218" y2="57"/>
  <line class="dgm-line" x1="342" y1="57" x2="410" y2="57"/>
  <rect class="dgm-shape" x="30" y="35" width="120" height="44" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="90" y="61" text-anchor="middle">Auto</text>
  <rect class="dgm-shape" x="410" y="35" width="120" height="44" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="470" y="61" text-anchor="middle">Hersteller</text>
  <polygon class="dgm-shape" points="218,57 280,22 342,57 280,92"/>
  <text class="dgm-text dgm-text--sm" x="280" y="61" text-anchor="middle">herstellen</text>
  <text class="dgm-card" x="168" y="47">N</text>
  <text class="dgm-card" x="366" y="47">1</text>
</svg>`,
          },
          {
            art: 'text',
            text: 'Konkret für dieses Beispiel – Auto hat den Schlüssel FGNr, Hersteller den Schlüssel Name. Initial wird jeder Entitytyp und die Beziehung herstellen je eine eigene Tabelle:',
          },
          {
            art: 'tabelle',
            titel: 'Initial · Auto (Schlüssel: FGNr)',
            columns: ['FGNr'],
            rows: [['FG100'], ['FG101'], ['FG102']],
          },
          {
            art: 'tabelle',
            titel: 'Initial · Hersteller (Schlüssel: Name)',
            columns: ['Name'],
            rows: [['VW'], ['BMW']],
          },
          {
            art: 'tabelle',
            titel: 'Initial · herstellen (Schlüssel: FGNr)',
            columns: ['FGNr', 'Name'],
            rows: [['FG100', 'VW'], ['FG101', 'BMW'], ['FG102', 'VW']],
          },
          {
            art: 'text',
            text: 'Verfeinert: Weil herstellen 1:N ist, ist FGNr dort schon eindeutig – herstellen hat also denselben Schlüssel (FGNr) wie Auto und wird mit Auto verschmolzen. Name wird in Auto zum Fremdschlüssel auf Hersteller. Aus drei Tabellen werden zwei:',
          },
          {
            art: 'tabelle',
            titel: 'Verfeinert · Auto + herstellen (Schlüssel: FGNr, Name = Fremdschlüssel → Hersteller)',
            columns: ['FGNr', 'Name'],
            rows: [['FG100', 'VW'], ['FG101', 'BMW'], ['FG102', 'VW']],
          },
          {
            art: 'tabelle',
            titel: 'Verfeinert · Hersteller (Schlüssel: Name)',
            columns: ['Name'],
            rows: [['VW'], ['BMW']],
          },
        ],
      },
    ],
  },
  // ===========================================================================
  {
    id: 'algebra',
    nr: '4',
    titel: 'Relationale Algebra',
    abschnitte: [
      {
        titel: '4.1 Operatoren',
        blocks: [
          {
            art: 'tabelle',
            titel: 'Die Operatoren im Überblick',
            columns: ['Operator', 'Symbol', 'Bedeutung'],
            rows: [
              ['Selektion', 'σ[Bedingung](R)', 'wählt ZEILEN nach einer Bedingung aus'],
              ['Projektion', 'π[Spalten](R)', 'wählt SPALTEN aus (entfernt Duplikate)'],
              ['Kreuzprodukt', 'R × S', 'jede Zeile von R mit jeder von S (m·n)'],
              ['Theta-Join', 'R ⋈[Bed.] S', 'Kreuzprodukt + Selektion (Verbundbedingung)'],
              ['Natürlicher Join', 'R ⋈ S', 'Verbund über alle gleichnamigen Spalten'],
              ['Vereinigung', 'R ∪ S', 'Tupel aus R oder S (gleiches Schema)'],
              ['Schnitt', 'R ∩ S', 'Tupel in R UND S'],
              ['Differenz', 'R − S', 'Tupel in R, nicht in S'],
              ['Umbenennung', 'ρ[…](R)', 'benennt Relation/Spalten um'],
            ],
          },
          {
            art: 'merk',
            text: 'Jeder Operator liefert wieder eine Relation → beliebig schachtelbar. Ein Join ist immer „Kreuzprodukt + Bedingung". Früh selektieren/projizieren macht Anfragen effizienter (Optimierung des Operatorbaums).',
          },
          {
            art: 'code',
            titel: 'Beispiel',
            text: 'π[Titel] ( Vorlesungen ⋈[gelesenVon = PersNr] σ[Name=\'Augustinus\'] (Professoren) )\n→ Titel aller Vorlesungen, die Augustinus hält.',
          },
          {
            art: 'svg',
            titel: 'Derselbe Ausdruck als Operatorbaum (Blätter = Relationen, von unten nach oben auswerten)',
            svg: `<svg viewBox="0 0 560 305" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Operatorbaum zum Algebra-Beispiel">
  <line class="dgm-line" x1="270" y1="49" x2="270" y2="90"/>
  <line class="dgm-line" x1="240" y1="124" x2="140" y2="185"/>
  <line class="dgm-line" x1="300" y1="124" x2="410" y2="185"/>
  <line class="dgm-line" x1="420" y1="219" x2="420" y2="255"/>
  <rect class="dgm-shape" x="220" y="15" width="100" height="34" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="270" y="37" text-anchor="middle">π[Titel]</text>
  <rect class="dgm-shape" x="165" y="90" width="210" height="34" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="270" y="112" text-anchor="middle">⋈[gelesenVon = PersNr]</text>
  <rect class="dgm-shape" x="60" y="185" width="130" height="34" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="125" y="207" text-anchor="middle">Vorlesungen</text>
  <rect class="dgm-shape" x="330" y="185" width="180" height="34" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="420" y="207" text-anchor="middle">σ[Name = 'Augustinus']</text>
  <rect class="dgm-shape" x="355" y="255" width="130" height="34" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="420" y="277" text-anchor="middle">Professoren</text>
</svg>`,
          },
        ],
      },
    ],
  },
  // ===========================================================================
  {
    id: 'sql',
    nr: '5',
    titel: 'SQL',
    abschnitte: [
      {
        titel: '5.1 Grundabfrage & Klauselreihenfolge',
        blocks: [
          {
            art: 'code',
            titel: 'Grundform',
            text: 'SELECT spalten\nFROM tabelle\nWHERE bedingung',
          },
          {
            art: 'tabelle',
            titel: 'Reihenfolge der Klauseln (geschrieben)',
            columns: ['Klausel', 'Funktion'],
            rows: [
              ['SELECT', 'Auswahl der Spalten'],
              ['FROM', 'Angabe der Basistabellen'],
              ['WHERE', 'Selektion der Zeilen'],
              ['GROUP BY', 'Gruppierung der Zeilen'],
              ['HAVING', 'Selektion der Gruppen'],
              ['ORDER BY', 'Sortieren der Ergebnismenge'],
            ],
          },
          {
            art: 'merk',
            text: 'Logisch ausgewertet wird anders: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY. Deshalb sind SELECT-Aliase in WHERE noch nicht nutzbar, in ORDER BY schon.',
          },
        ],
      },
      {
        titel: '5.2 Filtern, Sortieren, NULL',
        blocks: [
          {
            art: 'liste',
            punkte: [
              'ORDER BY spalte [ASC|DESC] – ASC ist Standard; ORDER BY 1 sortiert nach der 1. Spalte.',
              'DISTINCT entfernt doppelte Zeilen aus dem Ergebnis.',
              'Bedingungen: AND bindet stärker als OR – bei gemischten Bedingungen klammern!',
              'Stringvergleiche sind (in Oracle) case-sensitiv: \'m\' ≠ \'M\'.',
            ],
          },
          {
            art: 'frage',
            q: 'Wie prüft man auf NULL?',
            a: 'Mit IS NULL / IS NOT NULL – NICHT mit = NULL (ergibt niemals wahr). NULL bedeutet „unbekannt"; Vergleiche mit NULL liefern „unknown" (dreiwertige Logik).',
          },
        ],
      },
      {
        titel: '5.3 Aggregation & Gruppierung',
        blocks: [
          {
            art: 'liste',
            titel: 'Aggregatfunktionen',
            punkte: [
              'COUNT(*) / COUNT(spalte), SUM, AVG, MIN, MAX.',
              'COUNT(*) zählt Zeilen inkl. NULL; COUNT(spalte) ignoriert NULL.',
            ],
          },
          {
            art: 'merk',
            text: 'GROUP BY bildet Gruppen (eine Ergebniszeile pro Gruppe), HAVING filtert GRUPPEN (nach Aggregaten) – WHERE filtert dagegen einzelne Zeilen VOR der Gruppierung.',
          },
          {
            art: 'code',
            titel: 'Beispiel',
            text: 'SELECT city, COUNT(*)\nFROM employees\nGROUP BY city\nHAVING COUNT(*) >= 2',
          },
        ],
      },
      {
        titel: '5.4 Joins',
        blocks: [
          {
            art: 'frage',
            q: 'Impliziter vs. expliziter Join?',
            a: 'Implizit: FROM A, B WHERE A.x = B.y (Tabellen mit Komma, Bedingung im WHERE). Explizit: FROM A JOIN B ON A.x = B.y. Beide sind gleichwertig; ohne Verbundbedingung entsteht das volle Kreuzprodukt (m·n Zeilen).',
          },
          {
            art: 'liste',
            titel: 'Äußere Joins (füllen die Gegenseite mit NULL)',
            punkte: [
              'LEFT (OUTER) JOIN: alle Zeilen der linken Tabelle bleiben erhalten.',
              'RIGHT (OUTER) JOIN: alle Zeilen der rechten Tabelle.',
              'FULL (OUTER) JOIN: alle Zeilen beider Tabellen.',
              'Self-Join: eine Tabelle mit sich selbst (zwei Aliase), um Zeilen zu vergleichen.',
            ],
          },
          {
            art: 'svg',
            titel: 'Join-Arten: gefärbt = welche Zeilen im Ergebnis bleiben (links R, rechts S)',
            svg: `<svg viewBox="0 0 640 165" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Join-Arten als Venn-Diagramme: INNER, LEFT, RIGHT, FULL">
  <defs><clipPath id="jvLens"><circle cx="107" cy="62" r="34"/></clipPath></defs>
  <circle cx="67" cy="62" r="34" style="fill:var(--blue);fill-opacity:.32" clip-path="url(#jvLens)"/>
  <circle cx="67" cy="62" r="34" style="fill:none;stroke:var(--text);stroke-width:1.4"/>
  <circle cx="107" cy="62" r="34" style="fill:none;stroke:var(--text);stroke-width:1.4"/>
  <text class="dgm-text dgm-text--sm" x="87" y="150" text-anchor="middle">INNER JOIN</text>
  <circle cx="225" cy="62" r="34" style="fill:var(--blue);fill-opacity:.32"/>
  <circle cx="225" cy="62" r="34" style="fill:none;stroke:var(--text);stroke-width:1.4"/>
  <circle cx="265" cy="62" r="34" style="fill:none;stroke:var(--text);stroke-width:1.4"/>
  <text class="dgm-text dgm-text--sm" x="245" y="150" text-anchor="middle">LEFT JOIN</text>
  <circle cx="423" cy="62" r="34" style="fill:var(--blue);fill-opacity:.32"/>
  <circle cx="383" cy="62" r="34" style="fill:none;stroke:var(--text);stroke-width:1.4"/>
  <circle cx="423" cy="62" r="34" style="fill:none;stroke:var(--text);stroke-width:1.4"/>
  <text class="dgm-text dgm-text--sm" x="403" y="150" text-anchor="middle">RIGHT JOIN</text>
  <circle cx="541" cy="62" r="34" style="fill:var(--blue);fill-opacity:.32"/>
  <circle cx="581" cy="62" r="34" style="fill:var(--blue);fill-opacity:.32"/>
  <circle cx="541" cy="62" r="34" style="fill:none;stroke:var(--text);stroke-width:1.4"/>
  <circle cx="581" cy="62" r="34" style="fill:none;stroke:var(--text);stroke-width:1.4"/>
  <text class="dgm-text dgm-text--sm" x="561" y="150" text-anchor="middle">FULL JOIN</text>
</svg>`,
          },
        ],
      },
      {
        titel: '5.5 Unterabfragen & Mengen',
        blocks: [
          {
            art: 'frage',
            q: 'Wie funktioniert eine Unterabfrage mit IN?',
            a: 'Die innere Abfrage liefert zuerst eine Werteliste, die äußere filtert damit: WHERE spalte IN (SELECT …). Von innen nach außen lesen.',
          },
          {
            art: 'merk',
            text: 'UNION verknüpft zwei Ergebnismengen und entfernt Duplikate (UNION ALL behält sie). Regeln: gleiche Spaltenanzahl, kompatible Datentypen, gleiche Reihenfolge.',
          },
        ],
      },
      {
        titel: '5.6 Daten definieren & ändern (DDL/DML)',
        blocks: [
          {
            art: 'code',
            titel: 'CREATE TABLE mit Constraints',
            text: 'CREATE TABLE Studenten (\n  MatrNr   INTEGER PRIMARY KEY,\n  Name     VARCHAR(30) NOT NULL,\n  Semester INTEGER CHECK (Semester BETWEEN 1 AND 13));',
          },
          {
            art: 'liste',
            titel: 'DML',
            punkte: [
              'INSERT INTO t (spalten) VALUES (…) – neue Zeile einfügen.',
              'UPDATE t SET spalte = wert WHERE … – Werte ändern (ohne WHERE ALLE Zeilen!).',
              'DELETE FROM t WHERE … – Zeilen löschen (ohne WHERE wird die Tabelle geleert).',
            ],
          },
        ],
      },
    ],
  },
  // ===========================================================================
  {
    id: 'integritaet',
    nr: '6',
    titel: 'Integrität',
    abschnitte: [
      {
        titel: '6.1 Integritätsbedingungen (Constraints)',
        blocks: [
          {
            art: 'liste',
            punkte: [
              'PRIMARY KEY: eindeutig und NOT NULL.',
              'NOT NULL: Wert muss angegeben werden.',
              'UNIQUE: Werte müssen eindeutig sein (dürfen aber NULL sein).',
              'CHECK (Bedingung): erlaubt nur Werte, die die Bedingung erfüllen.',
              'FOREIGN KEY … REFERENCES: der Wert muss als Schlüssel in der referenzierten Tabelle existieren.',
            ],
          },
        ],
      },
      {
        titel: '6.2 Referenzielle Integrität',
        blocks: [
          {
            art: 'frage',
            q: 'Was passiert beim Löschen einer referenzierten Zeile?',
            a: 'Hängt von der referenziellen Aktion des Fremdschlüssels ab.',
          },
          {
            art: 'tabelle',
            titel: 'ON DELETE …',
            columns: ['Aktion', 'Verhalten beim Löschen der referenzierten Zeile'],
            rows: [
              ['NO ACTION (Default)', 'blockiert das Löschen, wenn noch referenziert (verhindert „dangling references")'],
              ['CASCADE', 'löscht die referenzierenden Zeilen mit'],
              ['SET NULL', 'setzt den Fremdschlüssel in den referenzierenden Zeilen auf NULL'],
            ],
          },
          {
            art: 'merk',
            text: 'Eine Tabelle kann nicht per DROP TABLE gelöscht werden, solange ein Fremdschlüssel einer anderen Tabelle sie referenziert – unabhängig von CASCADE/SET NULL und selbst wenn sie leer ist.',
          },
        ],
      },
      {
        titel: '6.3 Trigger & temporale Daten',
        blocks: [
          {
            art: 'def',
            begriff: 'Trigger',
            text: 'Eine automatisch ausgelöste Aktion bei bestimmten Ereignissen (BEFORE/AFTER INSERT/UPDATE/DELETE). Nützlich, um Integritätsregeln durchzusetzen, die sich nicht als einfacher CHECK formulieren lassen.',
          },
          {
            art: 'text',
            text: 'Temporale Daten: Gültigkeitszeiträume (z. B. gültig_von / gültig_bis) modellieren die zeitliche Entwicklung von Daten.',
          },
        ],
      },
    ],
  },
  // ===========================================================================
  {
    id: 'normalisierung',
    nr: '7',
    titel: 'Funktionale Abhängigkeiten & Normalisierung',
    abschnitte: [
      {
        titel: '7.1 Funktionale Abhängigkeiten (FDs)',
        blocks: [
          {
            art: 'def',
            begriff: 'Funktionale Abhängigkeit  A → B',
            text: '„A bestimmt B funktional": Haben zwei Tupel gleiche Werte bei A, so haben sie auch gleiche Werte bei B. Ein Verstoß lässt sich an der Ausprägung zeigen; die FD selbst folgt aus der Semantik (nicht aus der Ausprägung beweisbar).',
          },
          {
            art: 'liste',
            titel: 'Armstrong-Axiome / Regeln',
            punkte: [
              'Reflexivität: B ⊆ A ⇒ A → B (triviale FD).',
              'Verstärkung (Augmentation): A → B ⇒ AC → BC.',
              'Transitivität: A → B und B → C ⇒ A → C.',
            ],
          },
        ],
      },
      {
        titel: '7.2 Attributhülle & Schlüssel',
        blocks: [
          {
            art: 'frage',
            q: 'Wie bestimmt man die Attributhülle A⁺?',
            a: 'Starte mit A⁺ = {A}. Wende wiederholt jede FD X → Y an: liegt X vollständig in A⁺, nimm Y hinzu. Wiederhole, bis sich nichts mehr ändert.',
          },
          {
            art: 'merk',
            text: 'A ist Superschlüssel ⇔ A⁺ = alle Attribute. A ist Kandidatenschlüssel ⇔ A ist Superschlüssel UND minimal. Ein Attribut, das in keiner rechten FD-Seite vorkommt, muss in JEDEM Schlüssel enthalten sein.',
          },
        ],
      },
      {
        titel: '7.3 Kanonische Überdeckung Fc',
        blocks: [
          {
            art: 'liste',
            titel: 'Berechnung (in dieser Reihenfolge)',
            punkte: [
              '1. Linksreduktion: überflüssige Attribute auf der linken FD-Seite entfernen.',
              '2. Rechtsreduktion: überflüssige Attribute auf der rechten Seite entfernen (A herausnehmen, wenn A auch ohne die FD in der Hülle liegt).',
              '3. FDs mit leerer rechter Seite streichen.',
              '4. FDs mit gleicher linker Seite zusammenfassen: A → B und A → D ⇒ A → BD.',
            ],
          },
          {
            art: 'merk',
            text: 'Die kanonische Überdeckung ist nicht eindeutig – je nach Reihenfolge der Reduktionen können unterschiedliche (äquivalente) Fc entstehen.',
          },
        ],
      },
      {
        titel: '7.4 Normalformen',
        blocks: [
          {
            art: 'tabelle',
            titel: 'Normalformen',
            columns: ['NF', 'Bedingung'],
            rows: [
              ['1NF', 'alle Attribute atomar (keine mengenwertigen Attribute)'],
              ['2NF', '1NF + kein Nichtschlüsselattribut hängt von einem TEIL eines Schlüssels ab'],
              ['3NF', '2NF + kein Nichtschlüsselattribut hängt transitiv vom Schlüssel ab'],
              ['BCNF', 'für jede nicht-triviale FD X → A ist X ein Superschlüssel'],
            ],
          },
          {
            art: 'merk',
            text: 'Ziel der Normalisierung: Redundanz und die daraus folgenden Update-, Einfüge- und Löschanomalien beseitigen.',
          },
        ],
      },
      {
        titel: '7.5 Zerlegung: BCNF & Synthese (3NF)',
        blocks: [
          {
            art: 'liste',
            titel: 'BCNF-Dekomposition',
            punkte: [
              'Finde eine FD X → A, die BCNF verletzt (X kein Superschlüssel).',
              'Zerlege R in R1 = X⁺ und R2 = X ∪ (R − X⁺).',
              'Wiederhole, bis alle Teilrelationen in BCNF sind.',
              'BCNF ist immer verlustlos, aber NICHT immer abhängigkeitserhaltend.',
            ],
          },
          {
            art: 'svg',
            titel: 'Zerlegungsbaum: R an der schlechten FD B → C aufteilen (R1 = B⁺, R2 = B ∪ Rest)',
            svg: `<svg viewBox="0 0 480 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="BCNF-Zerlegungsbaum von R(A,B,C,D) an der FD B nach C">
  <line class="dgm-line" x1="205" y1="58" x2="140" y2="138"/>
  <line class="dgm-line" x1="275" y1="58" x2="350" y2="138"/>
  <rect class="dgm-shape" x="165" y="22" width="150" height="36" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="240" y="44" text-anchor="middle">R(A, B, C, D)</text>
  <rect class="dgm-shape" x="70" y="138" width="120" height="36" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="130" y="160" text-anchor="middle">R1(B, C)</text>
  <rect class="dgm-shape" x="290" y="138" width="150" height="36" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="365" y="160" text-anchor="middle">R2(A, B, D)</text>
  <text class="dgm-card" x="118" y="128">= B⁺</text>
  <text class="dgm-card" x="356" y="128">= B ∪ Rest</text>
</svg>`,
          },
          {
            art: 'liste',
            titel: '3NF-Synthesealgorithmus',
            punkte: [
              'Bilde die kanonische Überdeckung Fc.',
              'Erzeuge für jede FD X → Y eine Relation mit den Attributen X ∪ Y.',
              'Enthält keine Relation einen Kandidatenschlüssel, füge eine Relation mit einem Schlüssel hinzu.',
              'Entferne Relationen, die in einer anderen enthalten sind.',
              'Ergebnis: 3NF, verlustlos UND abhängigkeitserhaltend.',
            ],
          },
          {
            art: 'def',
            begriff: 'Verlustlosigkeit / Abhängigkeitserhaltung',
            text: 'Verlustlos: der natürliche Join der Teilrelationen ergibt genau die Ausgangsrelation (keine „Phantom-Tupel"). Abhängigkeitserhaltend: alle FDs lassen sich auf den Teilrelationen prüfen, ohne sie erst zu verbinden.',
          },
        ],
      },
    ],
  },
]
