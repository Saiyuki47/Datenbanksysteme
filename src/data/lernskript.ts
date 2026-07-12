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
              '**Redundanz & Inkonsistenz:** Dieselben Daten liegen mehrfach in verschiedenen Dateien; wird nur eine Kopie geändert, widersprechen sich die anderen. Beispiel: Die Kundenadresse steht in der Rechnungs- und in der Versanddatei – nach einem Umzug wird nur eine geändert, und es existieren zwei verschiedene Adressen.',
              '**Beschränkte Zugriffsmöglichkeiten:** Für jede neue Auswertung muss erst ein Programm geschrieben werden, spontane Abfragen sind nicht möglich. Beispiel: „Welche Kunden aus Berlin haben über 1000 € Umsatz?" lässt sich nicht eben abfragen, solange kein passendes Programm dafür existiert.',
              '**Datenisolation:** Die Daten liegen verstreut in vielen Dateien mit unterschiedlichen Formaten, sodass zusammengehörige Daten schwer zu kombinieren sind. Beispiel: Kunden als CSV, Bestellungen als XML, Lagerbestand als Textdatei – jedes Programm muss alle Formate selbst kennen und zusammenführen.',
              '**Integritätsprobleme:** Konsistenzregeln stecken verstreut im Anwendungscode und müssen in jedes Programm neu eingebaut werden. Beispiel: Die Regel „Kontostand ≥ 0" muss jedes kontoändernde Programm selbst prüfen – vergisst es eines, wird die Regel verletzt.',
              '**Atomaritäts- & Sicherungsprobleme:** Stürzt das System mitten in einer Operation ab, bleibt ein halbfertiger Zustand ohne automatische Wiederherstellung. Beispiel: Bei einer Überweisung wird bei A abgebucht, dann stürzt das System vor der Gutschrift bei B ab – das Geld ist weg statt „alles oder nichts".',
              '**Probleme im Mehrbenutzerbetrieb:** Greifen mehrere gleichzeitig zu, überschreiben sie sich gegenseitig (Lost Update). Beispiel: Zwei Verkäufer buchen gleichzeitig vom Bestand 10; beide lesen zuerst 10, einer zieht 2 ab, einer 5 – statt 3 steht am Ende 8 oder 5.',
              '**Sicherheitsprobleme:** Ohne feinkörnige Rechtevergabe kann jeder, der Zugriff auf die Datei hat, alles sehen und ändern. Beispiel: Ein Praktikant, der nur Bestellungen erfassen soll, kann auch die komplette Gehaltsdatei öffnen, weil es nur „Dateizugriff ja/nein" gibt.',
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
            art: 'frage',
            q: 'Bei n-stelligen Beziehungen (n > 2): Funktionalität vs. (min,max)?',
            a: 'Beide Notationen sind unvergleichbar. Funktionalitäten drücken partielle Funktionen über PAARE von Entitäten aus (z. B. Prof × Student → Thema), (min,max) beschränkt das Vorkommen EINZELNER Entitäten. Manche Bedingungen sind nur mit der einen, andere nur mit der anderen Notation ausdrückbar.',
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
            art: 'code',
            titel: 'Beispiel: Auto —N— herstellen —1— Hersteller',
            text: 'Initial:  Auto{[FGNr]}, Hersteller{[Name]}, herstellen{[FGNr, Name]}\nVerfeinert:  Auto{[FGNr, Name]}  (Auto + herstellen), Hersteller{[Name]}',
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
