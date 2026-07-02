import type { Thema } from '../themen'

export const thema: Thema = {
  id: 'normalformen',
  nr: 0,
  title: 'Normalformen: 1NF, 2NF & 3NF',
  subtitle:
    'Warum man Tabellen normalisiert und wie 1NF, 2NF und 3NF Redundanz sowie Update-, ' +
    'Einfüge- und Lösch-Anomalien schrittweise beseitigen.',
  sections: [
    {
      heading: 'Worum geht es?',
      blocks: [
        {
          art: 'text',
          text:
            'Normalisierung ist ein systematisches Vorgehen, um ein Relationenschema so zu ' +
            'entwerfen, dass Redundanz und die daraus folgenden Anomalien vermieden werden. ' +
            'Schlecht entworfene Tabellen speichern dieselbe Information mehrfach; jede solche ' +
            'Wiederholung ist eine Gelegenheit für Inkonsistenz.',
        },
        {
          art: 'text',
          text:
            'Betrachten wir die Tabelle Student/Course/Room: Steht jeder Kurs immer im selben ' +
            'Raum, so wird der Raum bei jedem Studenten des Kurses erneut abgespeichert — ' +
            'redundante Information. Genau daraus entstehen drei Anomalien.',
        },
        {
          art: 'liste',
          punkte: [
            'Update-Anomalie: Ändert man den Raum nur bei einem Tupel (z. B. Joe: CS145→C12, ' +
              'während Mary und Sam CS145→B01 behalten), werden die Daten inkonsistent.',
            'Lösch-Anomalie: Verlassen alle Studenten einen Kurs, geht der Zusammenhang ' +
              'zwischen Kurs und Raum verloren — man weiß nicht mehr, in welchem Raum der Kurs stattfindet.',
            'Einfüge-Anomalie: Für einen Kurs kann kein Raum gebucht werden, solange kein ' +
              'Student existiert (CS229→C12 ließe sich ohne Student gar nicht eintragen).',
          ],
        },
        {
          art: 'text',
          text:
            'Die klassische Normalisierung ist einfüge- bzw. änderungsorientiert („Best ' +
            'Practices"). Bei reinen Analyse-Systemen sind kontrollierte Redundanzen manchmal ' +
            'gewollt und die strenge Normalisierung gilt dort nicht.',
        },
        {
          art: 'merksatz',
          text:
            'DB-Design beruht auf funktionalen Abhängigkeiten, um Anomalien zu vermeiden: ' +
            'Finde alle FDs und eliminiere die „schlechten" durch verlustlose Zerlegung.',
        },
      ],
    },
    {
      heading: '1. Normalform (1NF) — nur atomare Werte',
      blocks: [
        {
          art: 'text',
          text:
            '1NF-Constraint: Alle Tabellen sind „flach" — jeder Attributwert ist atomar. Es gibt ' +
            'keine weitere Struktur in den Feldern, also keine Mengen bzw. mehrwertigen ' +
            'Attribute und keine Wiederholungsgruppen („repeating groups").',
        },
        {
          art: 'tabelle',
          titel: 'Verletzt 1NF: Courses ist eine Menge (nicht atomar)',
          columns: ['Student', 'Courses'],
          rows: [
            ['Mary', '{CS145, CS229}'],
            ['Joe', '{CS145, CS106}'],
          ],
        },
        {
          art: 'text',
          text:
            'Behebung: Die Menge wird in mehrere Zeilen mit je einem atomaren Wert aufgelöst. ' +
            'Aus einem Tupel mit einer zweielementigen Menge werden zwei Tupel.',
        },
        {
          art: 'tabelle',
          titel: 'In 1NF: ein Kurs pro Zeile',
          columns: ['Student', 'Course'],
          rows: [
            ['Mary', 'CS145'],
            ['Mary', 'CS229'],
            ['Joe', 'CS145'],
            ['Joe', 'CS106'],
          ],
        },
        {
          art: 'text',
          text:
            'Auch der scheinbare „Ausweg", die Kurse auf feste Spalten Course_1, Course_2, … zu ' +
            'verteilen, verletzt die 1NF — das ist eine Wiederholungsgruppe. Korrekt ist immer ' +
            'die Auflösung in Zeilen wie oben.',
        },
        {
          art: 'tabelle',
          titel: 'Ebenfalls verletzt: Wiederholungsgruppe Course_1/Course_2',
          columns: ['Student', 'Course_1', 'Course_2'],
          rows: [
            ['Mary', 'CS145', 'CS229'],
            ['Joe', 'CS145', 'CS106'],
          ],
        },
      ],
    },
    {
      heading: '2. Normalform (2NF) — keine partielle Abhängigkeit',
      blocks: [
        {
          art: 'text',
          text:
            'Eine Relation ist in 2NF, wenn sie in 1NF ist und zusätzlich kein ' +
            'Nichtschlüsselattribut nur von einem Teil eines zusammengesetzten Schlüssels ' +
            'funktional abhängt. Solche Abhängigkeiten heißen partielle Abhängigkeiten. Relevant ' +
            'ist das nur bei zusammengesetzten (mehrspaltigen) Schlüsseln.',
        },
        {
          art: 'merksatz',
          text:
            'Ein Nichtschlüsselattribut muss vom GESAMTEN Schlüssel abhängen — nie nur von einem ' +
            'Teil davon.',
        },
        {
          art: 'text',
          text:
            'Beispiel: hören(MatrNr, VorlNr, StudentName, Titel) mit dem zusammengesetzten ' +
            'Schlüssel {MatrNr, VorlNr}. Es gelten {MatrNr} → {StudentName} und {VorlNr} → ' +
            '{Titel}. Beide Nichtschlüsselattribute hängen jeweils nur von einem Teil des ' +
            'Schlüssels ab — partielle Abhängigkeiten, also nicht 2NF. Der Studentenname wird ' +
            'für jede belegte Vorlesung wiederholt (Redundanz).',
        },
        {
          art: 'tabelle',
          titel: 'Verletzt 2NF: Name/Titel partiell abhängig',
          columns: ['MatrNr', 'VorlNr', 'StudentName', 'Titel'],
          rows: [
            ['26120', '5001', 'Fichte', 'Grundzüge'],
            ['26120', '5041', 'Fichte', 'Ethik'],
            ['25403', '5001', 'Jonas', 'Grundzüge'],
          ],
        },
        {
          art: 'text',
          text:
            'Behebung durch Zerlegung: Jedes Nichtschlüsselattribut wandert zu dem Schlüsselteil, ' +
            'von dem es voll abhängt. In der Beziehungstabelle bleibt dann nur der zusammengesetzte ' +
            'Schlüssel übrig.',
        },
        {
          art: 'liste',
          punkte: [
            'hören(MatrNr, VorlNr) — nur noch der zusammengesetzte Schlüssel.',
            'Studenten(MatrNr, StudentName) — Name hängt voll von MatrNr ab.',
            'Vorlesungen(VorlNr, Titel) — Titel hängt voll von VorlNr ab.',
          ],
        },
      ],
    },
    {
      heading: '3. Normalform (3NF) — keine transitive Abhängigkeit',
      blocks: [
        {
          art: 'text',
          text:
            'Eine Relation ist in 3NF, wenn sie in 2NF ist und kein Nichtschlüsselattribut ' +
            'transitiv vom Schlüssel abhängt. Transitiv heißt: Schlüssel → X → A, wobei X selbst ' +
            'kein Schlüssel ist. Ein Nichtschlüsselattribut darf also nicht über ein anderes ' +
            'Nichtschlüsselattribut vom Schlüssel abhängen.',
        },
        {
          art: 'text',
          text:
            'Folien-Definition (3NF als Erweiterung von BCNF): Eine FD X → A ist „gut", wenn X ' +
            'ein (Super-)Schlüssel ist ODER wenn A Teil eines Kandidatenschlüssels ist. Nur wenn ' +
            'beides nicht gilt, ist X → A eine „schlechte" FD und die Tabelle muss zerlegt werden. ' +
            'Man zerlegt also nur bei „unprotected dependencies" — Abhängigkeiten von ' +
            'Nichtschlüssel- zu Nichtschlüsselattributen oder zu Teilen eines Schlüssels.',
        },
        {
          art: 'text',
          text:
            'Beispiel: Professoren(PersNr, Name, Raum, Rang) mit Schlüssel {PersNr}. Nimmt man ' +
            'an, ein Raum sei genau einer Rang-Kategorie zugeordnet, so gelten {PersNr} → {Raum} ' +
            'und {Raum} → {Rang}. Damit hängt Rang transitiv über Raum vom Schlüssel ab — nicht ' +
            '3NF. Die Rang-Information wird für jeden Professor im selben Raum wiederholt.',
        },
        {
          art: 'tabelle',
          titel: 'Verletzt 3NF: Rang transitiv über Raum abhängig',
          columns: ['PersNr', 'Name', 'Raum', 'Rang'],
          rows: [
            ['2125', 'Sokrates', '226', 'C4'],
            ['2126', 'Russel', '232', 'C4'],
            ['2127', 'Kopernikus', '310', 'C3'],
          ],
        },
        {
          art: 'text',
          text:
            'Behebung: Die transitiv bestimmte Information wird in eine eigene Tabelle ' +
            'ausgelagert, deren Schlüssel das „mittlere" Attribut X ist.',
        },
        {
          art: 'liste',
          punkte: [
            'Professoren(PersNr, Name, Raum) — Schlüssel PersNr.',
            'Raeume(Raum, Rang) — Schlüssel Raum; Rang hängt jetzt direkt vom Schlüssel ab.',
          ],
        },
        {
          art: 'text',
          text:
            'Klassisches Folien-Beispiel für den Fall „A ist Teil eines Kandidatenschlüssels": ' +
            'PLZverzeichnis(Straße, Ort, BLand, PLZ) mit den FDs {Straße, Ort, BLand} → {PLZ} und ' +
            '{PLZ} → {Ort, BLand}. Die erste linke Seite ist ein Superschlüssel (gut); bei der ' +
            'zweiten zeigt PLZ auf Ort und BLand, die Teil eines Kandidatenschlüssels sind — nach ' +
            '3NF ebenfalls „gut", also KEINE Zerlegung. Genau hier ist 3NF toleranter als BCNF und ' +
            'bleibt dafür abhängigkeitserhaltend.',
        },
      ],
    },
    {
      heading: 'Vergleich & Verhältnis zu BCNF',
      blocks: [
        {
          art: 'tabelle',
          titel: 'Die drei Normalformen im Überblick',
          columns: ['Normalform', 'Zusätzliche Bedingung', 'Eliminiert'],
          rows: [
            [
              '1NF',
              'Alle Attributwerte atomar (keine Mengen/Wiederholungsgruppen)',
              'nicht-flache Tabellen',
            ],
            [
              '2NF',
              '1NF + keine partielle Abhängigkeit eines Nichtschlüsselattributs von einem Teil ' +
                'des zusammengesetzten Schlüssels',
              'Redundanz durch Teil-Schlüssel-Abhängigkeit',
            ],
            [
              '3NF',
              '2NF + keine transitive Abhängigkeit (X → A gut, wenn X Superschlüssel ODER A Teil ' +
                'eines Kandidatenschlüssels)',
              'Redundanz durch Nichtschlüssel→Nichtschlüssel',
            ],
            [
              'BCNF',
              'Für JEDE nicht-triviale FD X → A ist X ein Superschlüssel (keine Ausnahme für ' +
                'Schlüsselattribute)',
              'alle „schlechten" FDs',
            ],
          ],
        },
        {
          art: 'text',
          text:
            'BCNF ist strenger als 3NF: BCNF verlangt, dass die linke Seite jeder nicht-trivialen ' +
            'FD ein Superschlüssel ist — ohne die 3NF-Ausnahme „A ist Teil eines ' +
            'Kandidatenschlüssels". BCNF entfernt daher alle „schlechten" FDs, kann aber die ' +
            'Abhängigkeitserhaltung verletzen (vgl. PLZ- und {Unit}→{Company}-Beispiel). 3NF ist ' +
            'ein bewusster Kompromiss: etwas mehr Restredundanz, dafür bleiben alle FDs erhalten ' +
            '— „a tradeoff for insert performance".',
        },
        {
          art: 'merksatz',
          text:
            'Für funktionale Abhängigkeiten ist BCNF die „eigentliche" Normalform; 3NF ist die ' +
            'praxistaugliche Abschwächung, wenn Abhängigkeitserhaltung wichtiger ist. Details ' +
            'zum BCNF-Zerlegungsalgorithmus siehe Karte „bcnf-zerlegung".',
        },
      ],
    },
  ],
}
