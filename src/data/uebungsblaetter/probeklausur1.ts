import type { Uebungsblatt } from '../../types'

export const probeklausur1: Uebungsblatt = {
  id: 'probeklausur1',
  nr: 'P1',
  titel: 'Probeklausur 1',
  typ: 'Probeklausur',
  beschreibung:
    'Probeklausur Datenbanksysteme 2 (WS 07/08). Aufgaben: SQL-Anfragen auf Relation T, ' +
    'Relationenalgebra auf den Relationen V und W, SQL-Anfragen auf Relation V (mit Nullwerten) ' +
    'sowie Integritätsbedingungen. Die Relationen stehen jeweils oben bei der Aufgabe; die Lösungen ' +
    'mit ausführlicher Erklärung lassen sich pro Teilaufgabe einblenden.',
  anmerkung: {
    titel: 'Anmerkungen zur Probeklausur',
    punkte: [
      'Aufgabe 5 (Algebraische Optimierung) ist nicht relevant.',
      'Aufgabe 3f ist ebenfalls nicht relevant: Es handelt sich um eine alte Join-Syntax (Oracle „(+)"), ' +
        'die man so nicht mehr benutzt. Sie wurde damals für linke und rechte Joins erweitert – allerdings in jeder ' +
        'Datenbank etwas anders. Mit der neuen, einheitlichen JOIN-Syntax (LEFT/RIGHT/FULL OUTER JOIN) ist das ' +
        'inzwischen vernünftig vereinheitlicht.',
      'Mit den Tabellendefinitionen aus Aufgabe 4 als Skript können Sie die Statements auch selbst ausprobieren.',
    ],
  },
  tasks: [
    {
      nr: 0,
      titel: 'Aufgabe 1 (SQL-Anfragen)',
      text:
        'Tragen Sie die Ergebnisse der folgenden SQL-Anfragen bezüglich der unten stehenden Relation T ein. ' +
        'Klappen Sie zu jeder Teilaufgabe die Lösung auf.',
      tabellen: [
        {
          titel: 'Relation T',
          columns: ['A', 'B', 'C', 'D'],
          rows: [
            ['1', '10', 'rot', '40'],
            ['2', '10', 'blau', '30'],
            ['3', '20', 'grün', '20'],
            ['4', '120', 'violett', '0'],
            ['5', '50', 'gelb', '20'],
            ['6', '80', 'blau', '10'],
            ['7', '30', 'grün', '40'],
            ['8', '10', 'violett', '100'],
            ['9', '40', 'rot', '30'],
            ['10', '50', 'blau', '50'],
            ['11', '90', 'rot', '40'],
            ['12', '140', 'gelb', '10'],
          ],
        },
      ],
    },
    {
      nr: 1,
      titel: '1a) GROUP BY mit COUNT(*) (2 Punkte)',
      text: 'Zähle die Zeilen je Farbe C.',
      sqlQuery: 'SELECT C, COUNT(*)\nFROM T\nGROUP BY C',
      loesung: [
        {
          art: 'text',
          text: 'GROUP BY C bildet eine Gruppe pro Farbwert. COUNT(*) zählt die Anzahl der Zeilen je Gruppe. Wir gehen die 12 Zeilen durch und ordnen jede ihrer Farbe zu:',
        },
        {
          art: 'liste',
          punkte: [
            'rot: Zeilen 1, 9, 11 → 3',
            'blau: Zeilen 2, 6, 10 → 3',
            'grün: Zeilen 3, 7 → 2',
            'violett: Zeilen 4, 8 → 2',
            'gelb: Zeilen 5, 12 → 2',
          ],
        },
        {
          art: 'tabelle',
          titel: 'Ergebnis (Reihenfolge der Zeilen ist beliebig)',
          columns: ['C', 'COUNT(*)'],
          rows: [
            ['violett', '2'],
            ['blau', '3'],
            ['grün', '2'],
            ['rot', '3'],
            ['gelb', '2'],
          ],
        },
        {
          art: 'text',
          text: 'Kontrolle: 3 + 3 + 2 + 2 + 2 = 12 = Gesamtzahl der Zeilen. Eine Sortierung ist nicht vorgegeben (kein ORDER BY), daher zählt die Reihenfolge nicht.',
        },
      ],
    },
    {
      nr: 2,
      titel: '1b) GROUP BY mit HAVING auf Summen (2 Punkte)',
      text: 'Gib je Farbe SUM(B) und SUM(D) aus, aber nur dort, wo SUM(B) = SUM(D) + 30 gilt.',
      sqlQuery: 'SELECT C, SUM(B), SUM(D)\nFROM T\nGROUP BY C\nHAVING SUM(B) = SUM(D) + 30',
      loesung: [
        {
          art: 'text',
          text: 'Zuerst je Farbe SUM(B) und SUM(D) berechnen, danach mit HAVING nur die Gruppen behalten, deren B-Summe genau um 30 größer ist als ihre D-Summe.',
        },
        {
          art: 'tabelle',
          titel: 'Zwischenrechnung je Gruppe (HAVING-Prüfung in der letzten Spalte)',
          columns: ['C', 'SUM(B)', 'SUM(D)', 'SUM(D)+30', 'B = D+30 ?'],
          rows: [
            ['rot', '10+40+90 = 140', '40+30+40 = 110', '140', '✓'],
            ['blau', '10+80+50 = 140', '30+10+50 = 90', '120', '✗'],
            ['grün', '20+30 = 50', '20+40 = 60', '90', '✗'],
            ['violett', '120+10 = 130', '0+100 = 100', '130', '✓'],
            ['gelb', '50+140 = 190', '20+10 = 30', '60', '✗'],
          ],
        },
        {
          art: 'text',
          text: 'Nur rot (140 = 110 + 30) und violett (130 = 100 + 30) erfüllen die HAVING-Bedingung.',
        },
        {
          art: 'tabelle',
          titel: 'Ergebnis',
          columns: ['C', 'SUM(B)', 'SUM(D)'],
          rows: [
            ['violett', '130', '100'],
            ['rot', '140', '110'],
          ],
        },
      ],
    },
    {
      nr: 3,
      titel: '1c) WHERE vor GROUP BY, dann HAVING (2 Punkte)',
      text: 'Zähle je Farbe nur die Zeilen mit D > 30 und behalte nur Gruppen mit mindestens 2 solcher Zeilen.',
      sqlQuery: 'SELECT C, COUNT(*)\nFROM T\nWHERE D > 30\nGROUP BY C\nHAVING COUNT(*) >= 2',
      loesung: [
        {
          art: 'text',
          text: 'Wichtig ist die Reihenfolge: WHERE filtert die Zeilen VOR der Gruppierung, HAVING filtert die Gruppen NACH der Gruppierung.',
        },
        {
          art: 'text',
          text: 'Schritt 1 – WHERE D > 30 lässt nur diese Zeilen übrig:',
        },
        {
          art: 'liste',
          punkte: [
            'Zeile 1: D = 40, C = rot',
            'Zeile 7: D = 40, C = grün',
            'Zeile 8: D = 100, C = violett',
            'Zeile 10: D = 50, C = blau',
            'Zeile 11: D = 40, C = rot',
          ],
        },
        {
          art: 'text',
          text: 'Schritt 2 – GROUP BY C + COUNT(*) auf diesen 5 Zeilen: rot = 2, grün = 1, violett = 1, blau = 1.',
        },
        {
          art: 'text',
          text: 'Schritt 3 – HAVING COUNT(*) >= 2 behält nur Gruppen mit mindestens 2 Zeilen, also nur rot.',
        },
        {
          art: 'tabelle',
          titel: 'Ergebnis',
          columns: ['C', 'COUNT(*)'],
          rows: [['rot', '2']],
        },
      ],
    },
    {
      nr: 4,
      titel: '1d) Self-Join / Kartesisches Produkt (2 Punkte)',
      text: 'Zähle alle Paare (T1, T2), bei denen der B-Wert der einen Zeile gleich dem D-Wert der anderen Zeile ist.',
      sqlQuery: 'SELECT COUNT(*)\nFROM T T1, T T2\nWHERE T1.B = T2.D',
      loesung: [
        {
          art: 'text',
          text: 'T1, T2 ist ein kartesisches Produkt (jede Zeile mit jeder), die WHERE-Klausel behält nur die Paare mit T1.B = T2.D. Die Zahl der Treffer berechnet man am einfachsten über die Häufigkeiten der Werte: für jeden Wert v gilt Treffer = (Anzahl B = v) × (Anzahl D = v).',
        },
        {
          art: 'text',
          text: 'Häufigkeiten der B-Werte: 10 → 3 (Z.1,2,8), 20 → 1, 30 → 1, 40 → 1, 50 → 2, 80 → 1, 90 → 1, 120 → 1, 140 → 1.',
        },
        {
          art: 'text',
          text: 'Häufigkeiten der D-Werte: 0 → 1, 10 → 2, 20 → 2, 30 → 2, 40 → 3, 50 → 1, 100 → 1.',
        },
        {
          art: 'tabelle',
          titel: 'Nur Werte, die in B UND in D vorkommen, tragen bei',
          columns: ['Wert v', 'Anzahl B = v', 'Anzahl D = v', 'Paare (Produkt)'],
          rows: [
            ['10', '3', '2', '6'],
            ['20', '1', '2', '2'],
            ['30', '1', '2', '2'],
            ['40', '1', '3', '3'],
            ['50', '2', '1', '2'],
          ],
        },
        {
          art: 'text',
          text: 'Summe: 6 + 2 + 2 + 3 + 2 = 15. (Werte wie 0, 80, 90, 100, 120, 140 kommen jeweils nur in einer der beiden Spalten vor und liefern daher keine Paare.)',
        },
        {
          art: 'tabelle',
          titel: 'Ergebnis',
          columns: ['COUNT(*)'],
          rows: [['15']],
        },
      ],
    },
    {
      nr: 5,
      titel: '1e) GROUP BY auf einer Funktion (2 Punkte)',
      text: 'Gruppiere nach der Länge des Farbnamens LENGTH(C) und zähle die Zeilen je Länge.',
      sqlQuery: 'SELECT LENGTH(C), COUNT(*)\nFROM T\nGROUP BY LENGTH(C)',
      loesung: [
        {
          art: 'text',
          text: 'Gruppiert wird nicht nach der Farbe selbst, sondern nach der Zeichenanzahl des Farbnamens. Zuerst die Längen bestimmen:',
        },
        {
          art: 'liste',
          punkte: [
            'rot → 3 Zeichen',
            'blau → 4 Zeichen',
            'grün → 4 Zeichen (das ü zählt als ein Zeichen)',
            'gelb → 4 Zeichen',
            'violett → 7 Zeichen',
          ],
        },
        {
          art: 'text',
          text: 'Jetzt die Zeilen je Länge zählen: Länge 3 = nur rot (Z.1,9,11) → 3. Länge 4 = blau (3) + grün (2) + gelb (2) → 7. Länge 7 = violett (Z.4,8) → 2.',
        },
        {
          art: 'tabelle',
          titel: 'Ergebnis (Reihenfolge beliebig)',
          columns: ['LENGTH(C)', 'COUNT(*)'],
          rows: [
            ['7', '2'],
            ['3', '3'],
            ['4', '7'],
          ],
        },
        {
          art: 'text',
          text: 'Kontrolle: 2 + 3 + 7 = 12 Zeilen.',
        },
      ],
    },
    {
      nr: 6,
      titel: '1f) Unterabfrage mit IN (2 Punkte)',
      text: 'Gib A, B, D aller Zeilen aus, deren B-Wert in der Ergebnismenge der Unterabfrage (SELECT B FROM T WHERE 2*A > D) vorkommt.',
      sqlQuery: 'SELECT A, B, D\nFROM T\nWHERE B IN (\n  SELECT B FROM T WHERE 2*A > D\n)',
      loesung: [
        {
          art: 'text',
          text: 'Schritt 1 – die Unterabfrage zuerst: für jede Zeile prüfen, ob 2*A > D, und von den Treffern den B-Wert sammeln.',
        },
        {
          art: 'liste',
          punkte: [
            'Zeile 4: 2·4 = 8 > 0  ✓ → B = 120',
            'Zeile 6: 2·6 = 12 > 10  ✓ → B = 80',
            'Zeile 12: 2·12 = 24 > 10  ✓ → B = 140',
            'Alle anderen Zeilen: 2*A ist nicht größer als D (z. B. Zeile 1: 2 > 40 ist falsch).',
          ],
        },
        {
          art: 'text',
          text: 'Die Unterabfrage liefert also die B-Menge { 120, 80, 140 }.',
        },
        {
          art: 'text',
          text: 'Schritt 2 – die äußere Abfrage: alle Zeilen, deren B in { 80, 120, 140 } liegt. Das sind genau die Zeilen 4, 6 und 12 (kein anderer B-Wert kommt in der Menge vor).',
        },
        {
          art: 'tabelle',
          titel: 'Ergebnis',
          columns: ['A', 'B', 'D'],
          rows: [
            ['4', '120', '0'],
            ['6', '80', '10'],
            ['12', '140', '10'],
          ],
        },
      ],
    },

    // ---- Aufgabe 2 (Relationenalgebra) ----
    {
      nr: 20,
      titel: 'Aufgabe 2 (Relationenalgebra)',
      text:
        'Gegeben seien die folgenden zwei Relationen V und W. Formulieren Sie die SQL-Ausdrücke als ' +
        'Folge von Operationen der Relationenalgebra.\n\n' +
        'Notation: σ = Selektion (Auswahl von Zeilen), π = Projektion (Auswahl von Spalten), ' +
        '× = Kreuzprodukt, ⋈ = (Theta-/Equi-)Join, ∪ = Vereinigung.',
      tabellen: [
        {
          titel: 'Relation V',
          columns: ['A', 'B'],
          rows: [
            ['1', 'gelb'],
            ['2', 'grün'],
            ['2', 'blau'],
            ['3', 'blau'],
            ['3', 'gelb'],
            ['3', 'rot'],
            ['4', 'grün'],
            ['4', 'rot'],
            ['5', 'orange'],
            ['6', 'rot'],
            ['6', 'grün'],
          ],
        },
        {
          titel: 'Relation W',
          columns: ['B', 'C', 'D'],
          rows: [
            ['gelb', '120', '15'],
            ['grün', '220', '30'],
            ['rot', '130', '45'],
            ['orange', '110', '45'],
            ['magenta', '100', '60'],
          ],
        },
      ],
    },
    {
      nr: 21,
      titel: '2a) SQL → Relationenalgebra (3 Punkte)',
      text: 'Formulieren Sie den folgenden SQL-Ausdruck als Folge von Operationen der Relationenalgebra.',
      sqlQuery: 'SELECT *\nFROM V, W\nWHERE V.B = W.B AND V.A < 4',
      loesung: [
        {
          art: 'text',
          text: 'Den SQL-Ausdruck Schritt für Schritt übersetzen: FROM V, W ist das Kreuzprodukt V × W. Die Bedingung V.B = W.B verbindet die beiden Relationen (Join über die gemeinsame Spalte B). Die Bedingung V.A < 4 ist eine reine Zeilen-Auswahl (Selektion). SELECT * bedeutet, dass alle Spalten übernommen werden – es ist also KEINE Projektion nötig.',
        },
        {
          art: 'unterpunkt',
          label: 'Lösung',
          text: 'σ[V.A < 4] ( V ⋈[V.B = W.B] W )',
          punkte: [
            'Gleichwertig mit explizitem Join: σ[V.A < 4] ( V ⋈[V.B=W.B] W )',
            'Gleichwertig nur mit Kreuzprodukt: σ[V.B = W.B ∧ V.A < 4] ( V × W )',
            'Gleichwertig mit getrennten Selektionen: σ[V.B = W.B] ( σ[V.A < 4] ( V × W ) )',
          ],
        },
        {
          art: 'text',
          text: 'Typische Fehler (laut Bewertung): eine überflüssige Projektion ergänzen, obwohl SELECT * keine vorsieht (−1), und die beiden Bedingungen mit ODER (∨) statt UND (∧) verknüpfen (−1).',
        },
      ],
    },
    {
      nr: 22,
      titel: '2b) SQL → Relationenalgebra (3 Punkte)',
      text: 'Formulieren Sie den folgenden SQL-Ausdruck als Folge von Operationen der Relationenalgebra.',
      sqlQuery: '(SELECT B FROM V)\nUNION\n(SELECT B FROM W)',
      loesung: [
        {
          art: 'text',
          text: 'SELECT B FROM V wählt nur die Spalte B aus V → das ist die Projektion π[B](V). Ebenso ist SELECT B FROM W die Projektion π[B](W). Das SQL-Schlüsselwort UNION entspricht dem Vereinigungsoperator ∪ der Mengenlehre.',
        },
        {
          art: 'unterpunkt',
          label: 'Lösung',
          text: 'π[B] (V) ∪ π[B] (W)',
        },
        {
          art: 'text',
          text: 'Typischer Fehler (laut Bewertung): den falschen Mengenoperator verwenden, z. B. Durchschnitt (∩) oder Kreuzprodukt (×) statt Vereinigung (∪) (−2).',
        },
      ],
    },
    {
      nr: 23,
      titel: '2c) SELECT B FROM V  vs.  π[B](V) (3 Punkte)',
      text:
        'Liefert die SQL-Anfrage SELECT B FROM V die gleichen Ergebnisse wie die Abfrage π[B](V) der ' +
        'Relationenalgebra? Begründen Sie Ihre Antwort.',
      sqlQuery: 'SELECT B FROM V',
      loesung: [
        {
          art: 'unterpunkt',
          label: 'Antwort',
          text: 'Nein, die Ergebnisse sind im Allgemeinen nicht gleich.',
        },
        {
          art: 'text',
          text: 'Begründung: Die Relationenalgebra arbeitet auf Mengen – eine Relation enthält per Definition keine doppelten Tupel. π[B](V) entfernt Duplikate also automatisch und liefert die 5 verschiedenen Werte { gelb, grün, blau, rot, orange }.',
        },
        {
          art: 'text',
          text: 'SQL arbeitet dagegen auf Multimengen (Bags): SELECT B FROM V behält Duplikate und liefert alle 11 B-Werte (z. B. „grün", „blau", „rot" mehrfach). Die beiden Ergebnisse unterscheiden sich somit in der Anzahl der Zeilen.',
        },
        {
          art: 'unterpunkt',
          label: 'Vergleichbare SQL-Anfrage',
          text: 'Um π[B](V) in SQL nachzubilden, muss man Duplikate explizit entfernen: SELECT DISTINCT B FROM V.',
        },
      ],
    },

    // ---- Aufgabe 3 (SQL-Anfragen auf Relation V mit Nullwerten) ----
    {
      nr: 30,
      titel: 'Aufgabe 3 (SQL-Anfragen)',
      text:
        'Tragen Sie die Ergebnisse der folgenden SQL-Anfragen ein. Nullwerte in der Tabelle sind durch einen ' +
        'Bindestrich (–) dargestellt. Achten Sie besonders auf die Drei-wertige Logik (NULL → UNKNOWN) und ' +
        'auf den Unterschied zwischen IS NULL und = NULL.',
      tabellen: [
        {
          titel: 'Relation V',
          columns: ['A', 'B', 'C', 'D'],
          rows: [
            ['1', '4', '10', '110'],
            ['2', '–', '110', '–'],
            ['3', '8', '30', '70'],
            ['4', '–', '–', '30'],
            ['5', '16', '60', '60'],
            ['6', '–', '90', '90'],
            ['7', '64', '–', '90'],
            ['8', '128', '110', '120'],
          ],
        },
      ],
    },
    {
      nr: 31,
      titel: '3a) Rechnung in der WHERE-Klausel (2 Punkte)',
      text: 'Gib A aller Zeilen aus, für die (B·20) > (D/2) gilt.',
      sqlQuery: 'SELECT A\nFROM V\nWHERE (B*20) > (D/2)',
      loesung: [
        {
          art: 'text',
          text: 'Für jede Zeile B·20 mit D/2 vergleichen. Ist B NULL (Zeilen 2, 4, 6), liefert die Rechnung NULL und der Vergleich wird UNKNOWN – diese Zeilen fallen weg.',
        },
        {
          art: 'tabelle',
          titel: 'Zeilenweise Prüfung',
          columns: ['A', 'B·20', 'D/2', 'B·20 > D/2 ?'],
          rows: [
            ['1', '80', '55', '✓'],
            ['2', 'NULL', '–', 'UNKNOWN → nein'],
            ['3', '160', '35', '✓'],
            ['4', 'NULL', '15', 'UNKNOWN → nein'],
            ['5', '320', '30', '✓'],
            ['6', 'NULL', '45', 'UNKNOWN → nein'],
            ['7', '1280', '45', '✓'],
            ['8', '2560', '60', '✓'],
          ],
        },
        {
          art: 'tabelle',
          titel: 'Ergebnis',
          columns: ['A'],
          rows: [['1'], ['3'], ['5'], ['7'], ['8']],
        },
      ],
    },
    {
      nr: 32,
      titel: '3b) OR-Verknüpfung (2 Punkte)',
      text: 'Gib A aller Zeilen aus, für die B = C ODER C > 90 gilt.',
      sqlQuery: 'SELECT A\nFROM V\nWHERE B = C OR C > 90',
      loesung: [
        {
          art: 'text',
          text: 'Eine Zeile zählt, sobald eine der beiden Bedingungen wahr ist. B = C ist in keiner Zeile erfüllt (und bei NULL ohnehin UNKNOWN). Es bleibt also C > 90.',
        },
        {
          art: 'liste',
          punkte: [
            'Zeile 2: C = 110 > 90 → ✓',
            'Zeile 8: C = 110 > 90 → ✓',
            'Zeile 6: C = 90 – nicht > 90 → nein; Zeile 7: C = NULL → UNKNOWN → nein.',
          ],
        },
        {
          art: 'tabelle',
          titel: 'Ergebnis',
          columns: ['A'],
          rows: [['2'], ['8']],
        },
      ],
    },
    {
      nr: 33,
      titel: '3c) IS NULL vs. = NULL (2 Punkte)',
      text: 'Gib A aller Zeilen aus, für die D IS NULL ODER B = NULL gilt.',
      sqlQuery: 'SELECT A\nFROM V\nWHERE D IS NULL OR B = NULL',
      loesung: [
        {
          art: 'text',
          text: 'Der zweite Teil B = NULL ist eine klassische Falle: Ein Vergleich mit = NULL ergibt IMMER UNKNOWN (nie wahr) – auch dort, wo B tatsächlich NULL ist. Korrekt wäre B IS NULL. Damit trägt B = NULL nichts bei und es zählt nur D IS NULL.',
        },
        {
          art: 'text',
          text: 'D IS NULL ist nur in Zeile 2 wahr (nur dort ist D ein Nullwert).',
        },
        {
          art: 'tabelle',
          titel: 'Ergebnis',
          columns: ['A'],
          rows: [['2']],
        },
        {
          art: 'text',
          text: 'Hinweis: Hätte dort B IS NULL gestanden, kämen zusätzlich die Zeilen 2, 4 und 6 in Frage – das Ergebnis wäre dann { 2, 4, 6 } gewesen.',
        },
      ],
    },
    {
      nr: 34,
      titel: '3d) UNION zweier Unterabfragen (2 Punkte)',
      text: 'Vereinige die beiden Spalten unter dem gemeinsamen Namen X und sortiere aufsteigend.',
      sqlQuery:
        '(SELECT A AS X FROM V WHERE A*B < D)\nUNION\n(SELECT B AS X FROM V WHERE A*D > C)\nORDER BY X',
      loesung: [
        {
          art: 'text',
          text: 'Beide Teilabfragen getrennt auswerten, dann mit UNION vereinigen (Duplikate entfallen) und nach X sortieren.',
        },
        {
          art: 'unterpunkt',
          label: 'Teil 1: SELECT A WHERE A·B < D',
          text: 'NULL bei B (Zeilen 2, 4, 6) → UNKNOWN. Es bleiben:',
          punkte: [
            'Zeile 1: A·B = 1·4 = 4 < 110 → A = 1',
            'Zeile 3: A·B = 3·8 = 24 < 70 → A = 3',
            'Zeilen 5/7/8: 80<60, 448<90, 1024<120 sind alle falsch.',
          ],
        },
        {
          art: 'unterpunkt',
          label: 'Teil 2: SELECT B WHERE A·D > C',
          text: 'Liefert die B-Werte folgender Zeilen:',
          punkte: [
            'Zeile 1: 1·110 = 110 > 10 → B = 4',
            'Zeile 3: 3·70 = 210 > 30 → B = 8',
            'Zeile 5: 5·60 = 300 > 60 → B = 16',
            'Zeile 8: 8·120 = 960 > 110 → B = 128',
            'Zeile 6: 6·90 = 540 > 90 wäre wahr, dort ist B aber NULL.',
          ],
        },
        {
          art: 'text',
          text: 'Vereinigung { 1, 3 } ∪ { 4, 8, 16, 128 } und aufsteigend sortiert ergibt das Ergebnis. (Den NULL-Wert aus Zeile 6 führt die Musterlösung nicht als eigene Ergebniszeile auf.)',
        },
        {
          art: 'tabelle',
          titel: 'Ergebnis',
          columns: ['X'],
          rows: [['1'], ['3'], ['4'], ['8'], ['16'], ['128']],
        },
      ],
    },
    {
      nr: 35,
      titel: '3e) Self-Join (2 Punkte)',
      text: 'Bilde alle Paare (V1, V2) mit V1.B ≥ V2.A UND V1.C = V2.D und gib V1.A und V2.A aus.',
      sqlQuery: 'SELECT V1.A, V2.A\nFROM V V1, V V2\nWHERE V1.B >= V2.A AND V1.C = V2.D',
      loesung: [
        {
          art: 'text',
          text: 'Am schnellsten zuerst die Verbindungsbedingung V1.C = V2.D auswerten (welche V2-Zeile passt zu welcher V1-Zeile), danach V1.B ≥ V2.A prüfen. Ist V1.B NULL, wird der Vergleich UNKNOWN und das Paar fällt weg.',
        },
        {
          art: 'tabelle',
          titel: 'Paare mit V1.C = V2.D, danach V1.B ≥ V2.A geprüft',
          columns: ['V1 (A,B,C)', 'V2 (A,D)', 'V1.B ≥ V2.A ?', 'Treffer?'],
          rows: [
            ['V1=3 (B=8, C=30)', 'V2=4 (D=30)', '8 ≥ 4 ✓', '(3, 4)'],
            ['V1=5 (B=16, C=60)', 'V2=5 (D=60)', '16 ≥ 5 ✓', '(5, 5)'],
            ['V1=8 (B=128, C=110)', 'V2=1 (D=110)', '128 ≥ 1 ✓', '(8, 1)'],
            ['V1=2 (B=NULL, C=110)', 'V2=1 (D=110)', 'NULL ≥ 1 → UNKNOWN', '–'],
            ['V1=6 (B=NULL, C=90)', 'V2=6,7 (D=90)', 'NULL ≥ 6/7 → UNKNOWN', '–'],
          ],
        },
        {
          art: 'tabelle',
          titel: 'Ergebnis',
          columns: ['V1.A', 'V2.A'],
          rows: [
            ['8', '1'],
            ['3', '4'],
            ['5', '5'],
          ],
        },
      ],
    },
    {
      nr: 36,
      titel: '3f) Outer Join (+), berechnete Spalte, ORDER BY (8 Punkte)',
      hinweis: 'nicht relevant',
      text:
        'Achtung: V1.C = V2.D(+) ist die Oracle-Schreibweise für einen LEFT OUTER JOIN – alle Zeilen von V1 ' +
        'bleiben erhalten, fehlt ein Partner in V2, wird mit NULL aufgefüllt.',
      sqlQuery:
        'SELECT V1.A, V2.A, V1.B + V2.D AS SUMME\nFROM V V1, V V2\nWHERE V1.C = V2.D(+) AND V1.A < 6\nORDER BY V1.A',
      loesung: [
        {
          art: 'text',
          text: 'Das (+) steht an V2.D, also ist V2 die „optionale" Seite: jede V1-Zeile mit V1.A < 6 bleibt erhalten, auch wenn kein V2 mit V2.D = V1.C existiert (dann sind V2.A und V2.D NULL). SUMME = V1.B + V2.D ist NULL, sobald einer der Summanden NULL ist. Am Ende nach V1.A sortieren.',
        },
        {
          art: 'tabelle',
          titel: 'Zeilenweise (nur V1.A < 6)',
          columns: ['V1.A (B, C)', 'Partner V2 (D = C)', 'V2.A', 'SUMME = V1.B + V2.D'],
          rows: [
            ['1 (B=4, C=10)', 'kein Partner (kein D=10)', '–', '4 + NULL = –'],
            ['2 (B=NULL, C=110)', 'V2=1 (D=110)', '1', 'NULL + 110 = –'],
            ['3 (B=8, C=30)', 'V2=4 (D=30)', '4', '8 + 30 = 38'],
            ['4 (B=NULL, C=NULL)', 'kein Partner (C ist NULL)', '–', 'NULL + NULL = –'],
            ['5 (B=16, C=60)', 'V2=5 (D=60)', '5', '16 + 60 = 76'],
          ],
        },
        {
          art: 'tabelle',
          titel: 'Ergebnis (sortiert nach V1.A)',
          columns: ['V1.A', 'V2.A', 'SUMME'],
          rows: [
            ['1', '–', '–'],
            ['2', '1', '–'],
            ['3', '4', '38'],
            ['4', '–', '–'],
            ['5', '5', '76'],
          ],
        },
      ],
    },

    // ---- Aufgabe 4 (Integritätsbedingungen) ----
    {
      nr: 40,
      titel: 'Aufgabe 4 (Integritätsbedingungen)',
      text:
        'Gegeben seien die folgenden Tabellendefinitionen mit Integritätsbedingungen. ' +
        'Die nachfolgenden INSERT-Anweisungen werden jeweils einzeln auf dem ursprünglichen Datenbestand ' +
        '(Tabellen X1 und X2 unten) geprüft: Welche Bedingung wird verletzt? Es wird maximal eine Bedingung verletzt, sonst „keine".\n\n' +
        'Die Bedingungen kurz:\n' +
        '• X1_CO_1: PRIMARY KEY (A, C) – Kombination eindeutig und nicht NULL\n' +
        '• X1_CO_2: LENGTH(B) ∈ {3, 4, 6, 7}\n' +
        '• X1_CO_3: D ∈ {1, 2, 4, 8, 16, 32, 64, 128, 256}\n' +
        '• X1_CO_4: D eindeutig (UNIQUE)\n' +
        '• X2_CO_1: PRIMARY KEY (A, E)\n' +
        '• X2_CO_2: FOREIGN KEY (A, B) → X1(A, C)\n' +
        '• X2_CO_3: FOREIGN KEY (E) → X1(D)\n' +
        '• X2_CO_4: D zwischen 12 und 16 (inkl.)',
      sqlQuery: `CREATE TABLE X1 (
  A INT,
  B VARCHAR(64),
  C INT,
  D INT,
  CONSTRAINT X1_CO_1 PRIMARY KEY (A, C),
  CONSTRAINT X1_CO_2 CHECK (LENGTH(B) IN (3,4,6,7)),
  CONSTRAINT X1_CO_3 CHECK (D IN (1,2,4,8,16,32,64,128,256)),
  CONSTRAINT X1_CO_4 UNIQUE (D)
);

CREATE TABLE X2 (
  A INT,
  B INT,
  C INT,
  D INT,
  E INT,
  CONSTRAINT X2_CO_1 PRIMARY KEY (A,E),
  CONSTRAINT X2_CO_2 FOREIGN KEY (A,B) REFERENCES X1(A,C),
  CONSTRAINT X2_CO_3 FOREIGN KEY (E) REFERENCES X1(D),
  CONSTRAINT X2_CO_4 CHECK (D BETWEEN 12 AND 16)
);`,
      tabellen: [
        {
          titel: 'X1 (Datenbestand)',
          columns: ['A', 'B', 'C', 'D'],
          rows: [
            ['1', 'blau', '2', '16'],
            ['3', 'rot', '4', '32'],
            ['5', 'gelb', '8', '64'],
            ['9', 'orange', '12', '256'],
            ['12', 'gelb', '16', '128'],
          ],
        },
        {
          titel: 'X2 (Datenbestand)',
          columns: ['A', 'B', 'C', 'D', 'E'],
          rows: [
            ['3', '4', '1', '13', '128'],
            ['3', '4', '3', '15', '64'],
            ['9', '12', '2', '14', '32'],
            ['12', '16', '–', '14', '16'],
            ['9', '12', '5', '14', '16'],
          ],
        },
      ],
    },
    {
      nr: 41,
      titel: '4a) INSERT in X1',
      text: 'Verletzt diese Anweisung eine Bedingung?',
      sqlQuery: "INSERT INTO X1 VALUES (1, 'magenta', 45, 128)",
      loesung: [
        {
          art: 'unterpunkt',
          label: 'X1_CO_4 verletzt (UNIQUE D)',
          text: 'D = 128 existiert bereits in der Zeile (12, gelb, 16, 128). Da D eindeutig sein muss, ist die UNIQUE-Bedingung verletzt.',
          punkte: [
            'PK (A, C) = (1, 45): neu ✓',
            "LENGTH('magenta') = 7 ∈ {3,4,6,7} ✓",
            'D = 128 ∈ erlaubte Werte ✓ – verletzt aber die Eindeutigkeit',
          ],
        },
      ],
    },
    {
      nr: 42,
      titel: '4b) INSERT in X1',
      text: 'Verletzt diese Anweisung eine Bedingung?',
      sqlQuery: "INSERT INTO X1 VALUES (4, 'orange', 32, 512)",
      loesung: [
        {
          art: 'unterpunkt',
          label: 'X1_CO_3 verletzt (CHECK auf D)',
          text: 'D = 512 ist keine der erlaubten Zweierpotenzen {1, 2, 4, …, 256} → CHECK-Bedingung verletzt.',
          punkte: [
            'PK (A, C) = (4, 32): neu ✓',
            "LENGTH('orange') = 6 ∈ {3,4,6,7} ✓",
            'D = 512 noch nicht vergeben (UNIQUE wäre erfüllt), scheitert aber am CHECK',
          ],
        },
      ],
    },
    {
      nr: 43,
      titel: '4c) INSERT in X1',
      text: 'Verletzt diese Anweisung eine Bedingung?',
      sqlQuery: "INSERT INTO X1 VALUES (11, 'orange', 14, 8)",
      loesung: [
        {
          art: 'unterpunkt',
          label: 'keine Verletzung',
          text: 'Alle Bedingungen sind erfüllt:',
          punkte: [
            'PK (A, C) = (11, 14): neu ✓',
            "LENGTH('orange') = 6 ∈ {3,4,6,7} ✓",
            'D = 8 ∈ erlaubte Werte ✓',
            'D = 8 noch nicht vergeben (UNIQUE) ✓',
          ],
        },
      ],
    },
    {
      nr: 44,
      titel: '4d) INSERT in X1',
      text: 'Verletzt diese Anweisung eine Bedingung?',
      sqlQuery: "INSERT INTO X1 VALUES (10, 'gruen', 15, 4)",
      loesung: [
        {
          art: 'unterpunkt',
          label: 'X1_CO_2 verletzt (CHECK auf LENGTH(B))',
          text: "LENGTH('gruen') = 5 ist nicht in {3, 4, 6, 7} → CHECK-Bedingung verletzt.",
          punkte: [
            'PK (A, C) = (10, 15): neu ✓',
            'D = 4 ∈ erlaubte Werte ✓ und noch nicht vergeben ✓',
          ],
        },
      ],
    },
    {
      nr: 45,
      titel: '4e) INSERT in X2',
      text: 'Verletzt diese Anweisung eine Bedingung?',
      sqlQuery: 'INSERT INTO X2 VALUES (1, 2, 3, 12, 256)',
      loesung: [
        {
          art: 'unterpunkt',
          label: 'keine Verletzung',
          text: 'Alle Bedingungen sind erfüllt:',
          punkte: [
            'PK (A, E) = (1, 256): neu ✓',
            'FK (A, B) = (1, 2) existiert in X1 als (A, C) ✓',
            'FK E = 256 existiert in X1.D ✓',
            'D = 12 ∈ [12, 16] ✓',
          ],
        },
      ],
    },
    {
      nr: 46,
      titel: '4f) INSERT in X2',
      text: 'Verletzt diese Anweisung eine Bedingung?',
      sqlQuery: 'INSERT INTO X2 VALUES (2, 9, NULL, 16, 128)',
      loesung: [
        {
          art: 'unterpunkt',
          label: 'X2_CO_2 verletzt (FOREIGN KEY (A,B) → X1(A,C))',
          text: '(A, B) = (2, 9) kommt in X1 nicht als (A, C) vor (X1 hat nur (1,2), (3,4), (5,8), (9,12), (12,16)) → Fremdschlüssel verletzt.',
          punkte: [
            'PK (A, E) = (2, 128): neu ✓',
            'FK E = 128 existiert in X1.D ✓',
            'D = 16 ∈ [12, 16] ✓',
            'C = NULL ist erlaubt (keine NOT-NULL-Bedingung auf C)',
          ],
        },
      ],
    },
    {
      nr: 47,
      titel: '4g) INSERT in X2',
      text: 'Verletzt diese Anweisung eine Bedingung?',
      sqlQuery: 'INSERT INTO X2 VALUES (3, 4, 3, 1, 256)',
      loesung: [
        {
          art: 'unterpunkt',
          label: 'X2_CO_4 verletzt (CHECK D BETWEEN 12 AND 16)',
          text: 'D = 1 liegt nicht im Bereich [12, 16] → CHECK-Bedingung verletzt.',
          punkte: [
            'PK (A, E) = (3, 256): neu ✓',
            'FK (A, B) = (3, 4) existiert in X1 als (A, C) ✓',
            'FK E = 256 existiert in X1.D ✓',
          ],
        },
      ],
    },
    {
      nr: 48,
      titel: '4h) INSERT in X2',
      text: 'Verletzt diese Anweisung eine Bedingung?',
      sqlQuery: 'INSERT INTO X2 VALUES (9, 12, 3, 14, 32)',
      loesung: [
        {
          art: 'unterpunkt',
          label: 'X2_CO_1 verletzt (PRIMARY KEY (A,E))',
          text: '(A, E) = (9, 32) existiert bereits in der Zeile (9, 12, 2, 14, 32) → Primärschlüssel nicht eindeutig.',
          punkte: [
            'FK (A, B) = (9, 12) existiert in X1 als (A, C) ✓',
            'FK E = 32 existiert in X1.D ✓',
            'D = 14 ∈ [12, 16] ✓',
          ],
        },
      ],
    },
    {
      nr: 49,
      titel: '4i) INSERT in X2',
      text: 'Verletzt diese Anweisung eine Bedingung?',
      sqlQuery: 'INSERT INTO X2 VALUES (5, 8, 3, 13, 256)',
      loesung: [
        {
          art: 'unterpunkt',
          label: 'keine Verletzung',
          text: 'Alle Bedingungen sind erfüllt:',
          punkte: [
            'PK (A, E) = (5, 256): neu ✓',
            'FK (A, B) = (5, 8) existiert in X1 als (A, C) ✓',
            'FK E = 256 existiert in X1.D ✓',
            'D = 13 ∈ [12, 16] ✓',
          ],
        },
      ],
    },
    {
      nr: 50,
      titel: '4j) INSERT in X2',
      text: 'Verletzt diese Anweisung eine Bedingung?',
      sqlQuery: 'INSERT INTO X2 VALUES (5, 8, NULL, 12, 512)',
      loesung: [
        {
          art: 'unterpunkt',
          label: 'X2_CO_3 verletzt (FOREIGN KEY (E) → X1(D))',
          text: 'E = 512 kommt in X1.D nicht vor (X1.D = {16, 32, 64, 256, 128}) → Fremdschlüssel verletzt.',
          punkte: [
            'PK (A, E) = (5, 512): neu ✓',
            'FK (A, B) = (5, 8) existiert in X1 als (A, C) ✓',
            'D = 12 ∈ [12, 16] ✓',
          ],
        },
      ],
    },

    // ---- Aufgabe 5 (Algebraische Optimierung) ----
    {
      nr: 60,
      titel: 'Aufgabe 5 (Algebraische Optimierung) (11 Punkte)',
      hinweis: 'nicht relevant',
      text:
        'Gegeben ist die bekannte Datenbank mit Abteilungen (ABT), Mitarbeitern (PERS), Projekten (PROJ) ' +
        'und Mitarbeit in Projekten (PM). Geben Sie im Operatorbaum je Knoten die erwartete Zeilenzahl ' +
        '(Tupel) und die Spaltenzahl an.\n\n' +
        'Annahmen: ABT hat 20 verschiedene A-ORT-Werte, PROJ hat 150 verschiedene P-ORT-Werte. ' +
        'Alle Werte sind statistisch unabhängig, gleichverteilt und kommen gleich häufig vor.\n\n' +
        'Operatorbaum (von unten nach oben):\n' +
        '1)  σ[A-ORT=\'F\'] (ABT)        und        PERS ⋈ PM\n' +
        '2)  ( σ[A-ORT=\'F\'] (ABT) )  ⋈  ( PERS ⋈ PM )      (Verbund über ANR)\n' +
        '3)  σ[P-ORT=\'HH\'] (PROJ)\n' +
        '4)  [ Ergebnis aus 2) ]  ⋈  σ[P-ORT=\'HH\'] (PROJ)   (Verbund über JNR)\n' +
        '5)  π[PNR, NAME, ANR, JNR] ( … )',
      tabellen: [
        {
          titel: 'Schema (Primärschlüssel zuerst)',
          columns: ['Relation', 'Attribute', 'Tupel'],
          rows: [
            ['ABT', 'ANR, BUDGET, A-ORT', 'M/4'],
            ['PERS', 'PNR, NAME, BERUF, GEHALT, ALTER, ANR', 'M'],
            ['PM', 'JNR, PNR, DAUER, ANTEIL', '5·M'],
            ['PROJ', 'JNR, BEZEICHNUNG, SUMME, P-ORT', 'N'],
          ],
        },
      ],
      loesung: [
        {
          art: 'text',
          text:
            'Regeln: Spalten – Selektion ändert nichts, Projektion = Anzahl der projizierten Attribute, ' +
            '(natürlicher) Join = Summe der Spalten minus die eine gemeinsame Verbund-Spalte. ' +
            'Zeilen – Selektion auf einen von k gleichverteilten Werten behält den Anteil 1/k; ein Join über ' +
            'einen Fremdschlüssel behält vom Mengen-seitigen Teilbaum nur den Anteil, der zu den verbleibenden ' +
            'Schlüsselwerten des anderen Teilbaums passt.',
        },
        {
          art: 'unterpunkt',
          label: '1a) σ[A-ORT=\'F\'] (ABT) → M/80 Zeilen, 3 Spalten',
          text: 'ABT hat M/4 Tupel und 3 Spalten. A-ORT hat 20 gleichverteilte Werte ⇒ Anteil 1/20: (M/4)·(1/20) = M/80. Spalten unverändert = 3.',
        },
        {
          art: 'unterpunkt',
          label: '1b) PERS ⋈ PM → 5·M Zeilen, 9 Spalten',
          text: 'PM hat 5·M Tupel, PNR ist in PERS Schlüssel, also findet jede PM-Zeile genau einen Mitarbeiter ⇒ 5·M Zeilen. Spalten = 6 (PERS) + 4 (PM) − 1 (gemeinsames PNR) = 9.',
        },
        {
          art: 'unterpunkt',
          label: '2) σ(ABT) ⋈ (PERS ⋈ PM) → M/4 Zeilen, 11 Spalten',
          text: 'Verbund über ANR. Die M/80 selektierten Abteilungen sind 1/20 aller M/4 Abteilungen; von den 5·M Zeilen des rechten Teilbaums bleibt also 1/20: 5·M·(1/20) = M/4. Spalten = 3 + 9 − 1 (gemeinsames ANR) = 11.',
        },
        {
          art: 'unterpunkt',
          label: '3) σ[P-ORT=\'HH\'] (PROJ) → N/150 Zeilen, 4 Spalten',
          text: 'PROJ hat N Tupel und 4 Spalten. P-ORT hat 150 gleichverteilte Werte ⇒ Anteil 1/150: N·(1/150) = N/150. Spalten unverändert = 4.',
        },
        {
          art: 'unterpunkt',
          label: '4) (…) ⋈ σ(PROJ) → M/600 Zeilen, 14 Spalten',
          text: 'Verbund über JNR. Die N/150 selektierten Projekte sind 1/150 aller N Projekte; von den M/4 Zeilen des linken Teilbaums bleibt 1/150: (M/4)·(1/150) = M/600. Spalten = 11 + 4 − 1 (gemeinsames JNR) = 14.',
        },
        {
          art: 'unterpunkt',
          label: '5) π[PNR, NAME, ANR, JNR] (…) → M/600 Zeilen, 4 Spalten',
          text: 'Eine Projektion ändert die Zeilenzahl nicht ⇒ M/600. Spalten = 4 (die vier projizierten Attribute).',
        },
        {
          art: 'tabelle',
          titel: 'Zusammenfassung (Wurzel ganz unten)',
          columns: ['Knoten', 'Zeilen', 'Spalten'],
          rows: [
            ["σ[A-ORT='F'] (ABT)", 'M/80', '3'],
            ['PERS ⋈ PM', '5·M', '9'],
            ['σ(ABT) ⋈ (PERS ⋈ PM)', 'M/4', '11'],
            ["σ[P-ORT='HH'] (PROJ)", 'N/150', '4'],
            ['(…) ⋈ σ(PROJ)', 'M/600', '14'],
            ['π[PNR, NAME, ANR, JNR] (…)', 'M/600', '4'],
          ],
        },
      ],
    },
  ],
}
