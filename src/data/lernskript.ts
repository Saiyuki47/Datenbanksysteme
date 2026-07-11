// Kompaktes Lern-Skript für die gesamte Datenbanksysteme-Vorlesung – im Stil
// eines durchgehenden Lernzettels (Frage→Antwort, Definitionen, Merksätze,
// Tabellen, kurze Code-/Algebra-Beispiele), kapitelweise nach der Vorlesung
// (Kapitel 1–6 + Anhang „Wichtiges zum Merken"). Inhalt aus den
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
            art: 'frage',
            q: 'Was ist eine IS-A-Beziehung (Generalisierung)?',
            a: 'Ein Obertyp wird in Untertypen spezialisiert (z. B. Kunde → Person / Firma). Die Untertypen erben die Attribute des Obertyps.',
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
  // ===========================================================================
  {
    id: 'merken',
    nr: '★',
    titel: 'Wichtiges zum Merken',
    abschnitte: [
      {
        titel: 'Kompakt-Spickzettel',
        blocks: [
          {
            art: 'liste',
            titel: 'SQL',
            punkte: [
              'Klauselreihenfolge: SELECT – FROM – WHERE – GROUP BY – HAVING – ORDER BY.',
              'WHERE filtert Zeilen (vor Gruppierung), HAVING filtert Gruppen (nach Aggregaten).',
              'NULL: immer IS (NOT) NULL, nie = NULL. AND bindet stärker als OR.',
              'Kreuzprodukt = Join ohne Bedingung. LEFT/RIGHT/FULL JOIN füllen mit NULL.',
            ],
          },
          {
            art: 'liste',
            titel: 'ER & Schema',
            punkte: [
              'Funktionalität ↔ (min,max) „über Kreuz" (siehe Tabelle in Kap. 2).',
              'ER→Schema: Entitytyp = Relation; Beziehung = Relation aus den Schlüsseln.',
              'Verfeinern nur bei GLEICHEM Schlüssel; N:M behält eigene Relation.',
            ],
          },
          {
            art: 'liste',
            titel: 'Normalisierung',
            punkte: [
              'Attributhülle A⁺: FDs anwenden, bis stabil. Superschlüssel ⇔ A⁺ = alle Attribute.',
              'Kanonische Überdeckung: Links- → Rechtsreduktion → leere Seiten streichen → zusammenfassen.',
              'BCNF: jede nicht-triviale FD hat einen Superschlüssel links; verlustlos, aber ggf. nicht abhängigkeitserhaltend.',
              '3NF-Synthese: verlustlos UND abhängigkeitserhaltend.',
            ],
          },
          {
            art: 'liste',
            titel: 'Integrität',
            punkte: [
              'ON DELETE: NO ACTION (blockt) · CASCADE (löscht mit) · SET NULL (setzt NULL).',
              'DROP TABLE scheitert, solange ein Fremdschlüssel die Tabelle referenziert.',
            ],
          },
        ],
      },
    ],
  },
]
