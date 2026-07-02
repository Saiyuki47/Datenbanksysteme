// Topic explainers ("Themen") shown as full-width cards, each taught from
// scratch. Built from small blocks: text, lists, highlighted SQL, worked
// examples (with optional result table), relational-algebra snippets,
// SQL↔algebra pairs and small reference tables.

import { thema as relationaleAlgebra } from './themen/relationale-algebra'
import { thema as referentielleIntegritaet } from './themen/referentielle-integritaet'
import { thema as integritaetsbedingungen } from './themen/integritaetsbedingungen'
import { thema as trigger } from './themen/trigger'
import { thema as temporaleDaten } from './themen/temporale-daten'
import { thema as funktionaleAbhaengigkeiten } from './themen/funktionale-abhaengigkeiten'
import { thema as attributhuelleSchluessel } from './themen/attributhuelle-schluessel'
import { thema as normalformen } from './themen/normalformen'
import { thema as bcnfZerlegung } from './themen/bcnf-zerlegung'
import { thema as verlustlosigkeitAbhaengigkeit } from './themen/verlustlosigkeit-abhaengigkeit'

export interface ErgebnisTabelle {
  columns: string[]
  rows: string[][]
}

export type ThemaBlock =
  | { art: 'text'; text: string }
  | { art: 'liste'; punkte: string[] }
  | { art: 'merksatz'; text: string }
  // Highlighted SQL on its own.
  | { art: 'sql'; titel?: string; code: string }
  // A worked example: SQL, an explanation, and optionally the result table.
  | { art: 'beispiel'; titel?: string; sql: string; erklaerung: string; ergebnis?: ErgebnisTabelle }
  // Plain monospaced relational-algebra expression.
  | { art: 'algebra'; titel?: string; text: string }
  // Side-by-side "this SQL ≡ that algebra" pair, optionally with a note.
  | { art: 'uebersetzung'; sql: string; algebra: string; hinweis?: string }
  | { art: 'tabelle'; titel?: string; columns: string[]; rows: string[][] }
  // Inline SVG diagram (ER diagram, decomposition tree, …); reuses the .dgm-* styles.
  | { art: 'svg'; titel?: string; svg: string }

export interface ThemaSection {
  heading: string
  blocks: ThemaBlock[]
}

export interface Thema {
  id: string
  nr: number
  title: string
  subtitle: string
  sections: ThemaSection[]
}

// The relation T (from Probeklausur 1) is reused as a running example.
const T_TABELLE: ThemaBlock = {
  art: 'tabelle',
  titel: 'Beispiel-Relation T (aus Probeklausur 1)',
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
}

const bestehende: Thema[] = [
  // ---------------------------------------------------------------------------
  {
    id: 'grundabfrage',
    nr: 1,
    title: 'Die Grundabfrage: SELECT, FROM und WHERE',
    subtitle:
      'Das Herzstück jeder SQL-Anfrage. Welche Spalten (SELECT), aus welcher Tabelle (FROM), ' +
      'und welche Zeilen sollen es sein (WHERE)?',
    sections: [
      {
        heading: 'Die drei Bausteine',
        blocks: [
          {
            art: 'text',
            text:
              'Fast jede Abfrage hat dieselbe Grundform: SELECT bestimmt, WELCHE SPALTEN ausgegeben werden, ' +
              'FROM nennt die TABELLE, aus der gelesen wird, und WHERE filtert die ZEILEN nach einer Bedingung. ' +
              'WHERE ist optional – ohne WHERE bekommt man alle Zeilen.',
          },
          {
            art: 'sql',
            titel: 'Grundform',
            code: 'SELECT spalte1, spalte2\nFROM tabelle\nWHERE bedingung',
          },
          {
            art: 'text',
            text:
              'Mit SELECT * bekommt man alle Spalten. Alle folgenden Beispiele arbeiten auf der Relation T:',
          },
          T_TABELLE,
        ],
      },
      {
        heading: 'Beispiele',
        blocks: [
          {
            art: 'beispiel',
            titel: 'Beispiel 1 – alle Spalten, alle Zeilen',
            sql: 'SELECT *\nFROM T',
            erklaerung:
              'Der Stern * steht für „alle Spalten". Ohne WHERE werden alle 12 Zeilen von T unverändert ausgegeben.',
          },
          {
            art: 'beispiel',
            titel: 'Beispiel 2 – Spalten auswählen und Zeilen filtern',
            sql: 'SELECT A, C\nFROM T\nWHERE D > 30',
            erklaerung:
              'WHERE D > 30 behält nur Zeilen, deren D größer als 30 ist; SELECT A, C gibt davon nur die Spalten A und C aus.',
            ergebnis: {
              columns: ['A', 'C'],
              rows: [['1', 'rot'], ['7', 'grün'], ['8', 'violett'], ['10', 'blau'], ['11', 'rot']],
            },
          },
          {
            art: 'beispiel',
            titel: 'Beispiel 3 – mit zwei Spalten rechnen',
            sql: 'SELECT A, B, D\nFROM T\nWHERE B > D',
            erklaerung:
              'In der Bedingung darf man Spalten miteinander vergleichen und sogar rechnen (+ − * /). Hier bleiben die Zeilen, in denen B größer als D ist.',
            ergebnis: {
              columns: ['A', 'B', 'D'],
              rows: [
                ['4', '120', '0'],
                ['5', '50', '20'],
                ['6', '80', '10'],
                ['9', '40', '30'],
                ['11', '90', '40'],
                ['12', '140', '10'],
              ],
            },
          },
          {
            art: 'beispiel',
            titel: 'Beispiel 4 – Text vergleichen (aus Blatt 0)',
            sql: "SELECT CUSTOMERNAME\nFROM CUSTOMER_T\nWHERE CUSTOMERCITY = 'Clearwater'\n  AND CUSTOMERSTATE = 'FL'",
            erklaerung:
              'Textwerte stehen in einfachen Anführungszeichen. Mit AND müssen beide Bedingungen gleichzeitig gelten – gesucht sind also Kunden in Clearwater UND im Bundesstaat FL.',
            ergebnis: { columns: ['CUSTOMERNAME'], rows: [['M and H Casual Furniture']] },
          },
        ],
      },
      {
        heading: 'Vergleichsoperatoren',
        blocks: [
          {
            art: 'tabelle',
            titel: 'In WHERE erlaubte Vergleiche',
            columns: ['Operator', 'Bedeutung'],
            rows: [
              ['=', 'gleich'],
              ['<> (oder !=)', 'ungleich'],
              ['<  /  >', 'kleiner / größer'],
              ['<=  /  >=', 'kleiner-gleich / größer-gleich'],
            ],
          },
          {
            art: 'merksatz',
            text:
              'Merke: SELECT = Spalten (senkrecht), WHERE = Zeilen (waagerecht), FROM = Quelle. Zahlen ohne, ' +
              'Text mit einfachen Anführungszeichen.',
          },
        ],
      },
    ],
  },
  // ---------------------------------------------------------------------------
  {
    id: 'sortieren',
    nr: 2,
    title: 'Sortieren, Duplikate & Top-N: ORDER BY, DISTINCT, FETCH FIRST',
    subtitle: 'Wie man das Ergebnis ordnet, doppelte Zeilen entfernt und nur die ersten Treffer behält.',
    sections: [
      {
        heading: 'DISTINCT – doppelte Zeilen entfernen',
        blocks: [
          {
            art: 'text',
            text:
              'SQL gibt standardmäßig auch doppelte Zeilen aus. DISTINCT direkt hinter SELECT entfernt Duplikate, ' +
              'sodass jede Kombination nur einmal erscheint.',
          },
          {
            art: 'beispiel',
            titel: 'Beispiel – verschiedene Farben',
            sql: 'SELECT DISTINCT C\nFROM T',
            erklaerung:
              'Ohne DISTINCT käme jede der 12 Zeilen mit ihrer Farbe; DISTINCT lässt nur die fünf verschiedenen Farbwerte übrig.',
            ergebnis: { columns: ['C'], rows: [['rot'], ['blau'], ['grün'], ['violett'], ['gelb']] },
          },
        ],
      },
      {
        heading: 'ORDER BY – das Ergebnis sortieren',
        blocks: [
          {
            art: 'text',
            text:
              'ORDER BY kommt ganz am Ende und sortiert die Ausgabe. ASC heißt aufsteigend (Standard), DESC ' +
              'absteigend. Man kann nach mehreren Spalten sortieren (erst die erste, bei Gleichstand die nächste).',
          },
          {
            art: 'beispiel',
            titel: 'Beispiel – absteigend nach D',
            sql: 'SELECT A, D\nFROM T\nWHERE D > 30\nORDER BY D DESC',
            erklaerung:
              'Erst filtern (D > 30), dann nach D absteigend sortieren. Die drei Zeilen mit D = 40 stehen ohne weitere Vorgabe in beliebiger Reihenfolge.',
            ergebnis: {
              columns: ['A', 'D'],
              rows: [['8', '100'], ['10', '50'], ['1', '40'], ['7', '40'], ['11', '40']],
            },
          },
          {
            art: 'beispiel',
            titel: 'Beispiel – DISTINCT + ORDER BY (aus Blatt 0)',
            sql: 'SELECT DISTINCT CUSTOMERCITY\nFROM CUSTOMER_T\nORDER BY CUSTOMERCITY',
            erklaerung:
              'Häufige Kombination: erst Duplikate entfernen, dann alphabetisch sortieren – hier alle Städte, aus denen Kunden kommen, jede einmal und von A bis Z.',
          },
        ],
      },
      {
        heading: 'FETCH FIRST – nur die ersten N Zeilen (Top-N)',
        blocks: [
          {
            art: 'text',
            text:
              'Um nur die größten/kleinsten Treffer zu bekommen, sortiert man passend und schneidet mit ' +
              'FETCH FIRST n ROWS ONLY ab (das ist die SQL-Standard- bzw. Oracle-Schreibweise; andere Systeme ' +
              'nutzen LIMIT). Wichtig: zuerst ORDER BY, sonst ist „die erste Zeile" zufällig.',
          },
          {
            art: 'beispiel',
            titel: 'Beispiel – der Top-Mitarbeiter (aus Blatt 0)',
            sql:
              'SELECT E.FIRSTNAME, E.LASTNAME,\n       COUNT(O.ORDERID) AS ANZAHL\nFROM EMPLOYEES E\n  JOIN ORDERS O ON E.EMPLOYEEID = O.EMPLOYEEID\nGROUP BY E.EMPLOYEEID, E.FIRSTNAME, E.LASTNAME\nORDER BY ANZAHL DESC\nFETCH FIRST 1 ROWS ONLY',
            erklaerung:
              'Pro Mitarbeiter die Bestellungen zählen, absteigend sortieren und nur die oberste Zeile behalten – also den Mitarbeiter mit den meisten Bestellungen.',
          },
        ],
      },
    ],
  },
  // ---------------------------------------------------------------------------
  {
    id: 'logik',
    nr: 3,
    title: 'Bedingungen verknüpfen: AND, OR, NOT',
    subtitle: 'Mehrere Bedingungen kombinieren – und die wichtige Vorrangregel „AND vor OR".',
    sections: [
      {
        heading: 'Die drei Verknüpfungen',
        blocks: [
          {
            art: 'liste',
            punkte: [
              'AND – beide Bedingungen müssen wahr sein.',
              'OR – mindestens eine der beiden muss wahr sein.',
              'NOT – kehrt eine Bedingung um (aus wahr wird falsch).',
            ],
          },
          {
            art: 'beispiel',
            titel: 'Beispiel – OR',
            sql: "SELECT A\nFROM T\nWHERE C = 'rot' OR C = 'blau'",
            erklaerung: 'Eine Zeile zählt, sobald die Farbe rot ODER blau ist.',
            ergebnis: { columns: ['A'], rows: [['1'], ['2'], ['6'], ['9'], ['10'], ['11']] },
          },
        ],
      },
      {
        heading: 'Vorrang: AND bindet stärker als OR',
        blocks: [
          {
            art: 'text',
            text:
              'Stehen AND und OR in derselben Bedingung, wird zuerst AND ausgewertet – wie „mal vor plus" in der ' +
              'Mathematik. a AND b OR c bedeutet also (a AND b) OR c. Wer es anders meint, muss klammern.',
          },
          {
            art: 'beispiel',
            titel: 'Beispiel – ohne Klammern',
            sql: "SELECT A\nFROM T\nWHERE A > 6 AND C = 'rot' OR C = 'blau'",
            erklaerung:
              'Gelesen als (A > 6 AND C = rot) OR (C = blau). Der erste Teil trifft auf die rot-Zeilen mit A > 6 zu (A = 9, 11), der zweite auf alle blau-Zeilen (A = 2, 6, 10).',
            ergebnis: { columns: ['A'], rows: [['2'], ['6'], ['9'], ['10'], ['11']] },
          },
          {
            art: 'merksatz',
            text:
              'Diese Vorrangregel ist ein Klausur-Klassiker (z. B. Probeklausur 2, Aufgabe 4a und die CHECK-Bedingung ' +
              'CS8). Im Zweifel immer klammern – das macht die Absicht eindeutig.',
          },
        ],
      },
    ],
  },
  // ---------------------------------------------------------------------------
  {
    id: 'null',
    nr: 4,
    title: 'NULL und die dreiwertige Logik',
    subtitle:
      'NULL bedeutet „unbekannt / kein Wert". Das verändert Vergleiche grundlegend – die häufigste Fehlerquelle in Klausuren.',
    sections: [
      {
        heading: 'Was ist NULL?',
        blocks: [
          {
            art: 'text',
            text:
              'NULL ist kein Wert wie 0 oder ein leerer Text, sondern steht für „nicht vorhanden / unbekannt". ' +
              'Sobald NULL in einem Vergleich auftaucht, ist das Ergebnis nicht wahr oder falsch, sondern ein drittes: ' +
              'UNKNOWN (unbekannt).',
          },
          {
            art: 'text',
            text:
              'Die WHERE-Klausel behält eine Zeile nur, wenn die Bedingung WAHR ist. UNKNOWN reicht nicht – die ' +
              'Zeile fällt also weg, genau wie bei FALSE.',
          },
        ],
      },
      {
        heading: 'IS NULL statt = NULL',
        blocks: [
          {
            art: 'text',
            text:
              'Ob ein Wert NULL ist, prüft man NIE mit = oder <>, sondern mit IS NULL bzw. IS NOT NULL. ' +
              'Der Vergleich = NULL ergibt nämlich immer UNKNOWN – sogar dort, wo der Wert wirklich NULL ist.',
          },
          {
            art: 'beispiel',
            titel: 'Beispiel – die <> NULL-Falle (aus Probeklausur 2)',
            sql: 'SELECT COUNT(*)\nFROM T\nWHERE B <> NULL',
            erklaerung:
              'Man könnte „alle Zeilen, deren B nicht NULL ist" erwarten. Tatsächlich ergibt B <> NULL für jede Zeile UNKNOWN, also wird KEINE Zeile ausgewählt – das Ergebnis ist 0. Korrekt wäre WHERE B IS NOT NULL gewesen.',
            ergebnis: { columns: ['COUNT(*)'], rows: [['0']] },
          },
          {
            art: 'beispiel',
            titel: 'Beispiel – IS NOT NULL richtig genutzt (aus Blatt 0)',
            sql: 'SELECT FIRSTNAME, LASTNAME\nFROM EMPLOYEES\nWHERE REPORTSTO IS NOT NULL',
            erklaerung:
              'Gibt alle Mitarbeiter aus, die einen Vorgesetzten haben (deren REPORTSTO also gefüllt, nicht NULL ist).',
          },
        ],
      },
      {
        heading: 'Dreiwertige Logik (TRUE, FALSE, UNKNOWN)',
        blocks: [
          {
            art: 'liste',
            punkte: [
              'TRUE AND UNKNOWN = UNKNOWN, FALSE AND UNKNOWN = FALSE.',
              'TRUE OR UNKNOWN = TRUE, FALSE OR UNKNOWN = UNKNOWN.',
              'WHERE behält nur Zeilen mit TRUE; UNKNOWN und FALSE fliegen raus.',
              'Sonderfall CHECK: Ein CHECK gilt als erfüllt bei TRUE ODER UNKNOWN – er schlägt nur bei FALSE fehl (siehe Thema „CREATE TABLE").',
            ],
          },
          {
            art: 'merksatz',
            text:
              'Faustregel: Rechnet oder vergleicht man mit NULL, kommt NULL bzw. UNKNOWN heraus. Auf NULL prüft ' +
              'man ausschließlich mit IS NULL / IS NOT NULL.',
          },
        ],
      },
    ],
  },
  // ---------------------------------------------------------------------------
  {
    id: 'aggregate',
    nr: 5,
    title: 'Aggregatfunktionen: COUNT, SUM, MAX, MIN, AVG',
    subtitle: 'Funktionen, die viele Zeilen zu EINEM Wert zusammenfassen – zählen, summieren, Größtwert usw.',
    sections: [
      {
        heading: 'Was eine Aggregatfunktion macht',
        blocks: [
          {
            art: 'text',
            text:
              'Eine Aggregatfunktion verdichtet eine ganze Spalte zu einem einzigen Wert. Ohne GROUP BY (nächstes ' +
              'Thema) liefert sie genau eine Ergebniszeile über die ganze Tabelle.',
          },
          {
            art: 'liste',
            punkte: [
              'COUNT(*) – zählt die Zeilen. COUNT(spalte) zählt nur die Zeilen, in denen die Spalte nicht NULL ist.',
              'SUM(spalte) – Summe, AVG(spalte) – Durchschnitt (nur für Zahlen).',
              'MAX(spalte) / MIN(spalte) – größter / kleinster Wert.',
              'Zusatzfunktionen aus den Blättern: LENGTH(text) – Zeichenanzahl, ROUND(zahl, n) – auf n Stellen runden.',
            ],
          },
          T_TABELLE,
        ],
      },
      {
        heading: 'Beispiele',
        blocks: [
          {
            art: 'beispiel',
            titel: 'Beispiel – zählen',
            sql: 'SELECT COUNT(*)\nFROM T',
            erklaerung: 'Zählt alle Zeilen von T.',
            ergebnis: { columns: ['COUNT(*)'], rows: [['12']] },
          },
          {
            art: 'beispiel',
            titel: 'Beispiel – mehrere Kennzahlen auf einmal (mit Alias AS)',
            sql: 'SELECT SUM(B) AS SUMME, MAX(B) AS MAXIMUM, MIN(B) AS MINIMUM\nFROM T',
            erklaerung:
              'Man darf mehrere Aggregate in einem SELECT kombinieren. Mit AS gibt man der Ergebnisspalte einen lesbaren Namen. (AVG(B) wäre hier 650 / 12 ≈ 54,17.)',
            ergebnis: { columns: ['SUMME', 'MAXIMUM', 'MINIMUM'], rows: [['650', '140', '10']] },
          },
          {
            art: 'beispiel',
            titel: 'Beispiel – Funktion in der Berechnung (aus Blatt 0)',
            sql:
              'SELECT ORDERID,\n       ROUND(SUM(UNITPRICE * QUANTITY * (1 - DISCOUNT)), 2) AS GESAMTBETRAG\nFROM ORDERDETAILS\nGROUP BY ORDERID',
            erklaerung:
              'Innerhalb von SUM darf man rechnen; ROUND(…, 2) rundet die Summe auf zwei Nachkommastellen. So entsteht der Gesamtbetrag je Bestellung.',
          },
        ],
      },
    ],
  },
  // ---------------------------------------------------------------------------
  {
    id: 'gruppieren',
    nr: 6,
    title: 'Gruppieren mit GROUP BY und HAVING',
    subtitle: 'Zeilen in Gruppen einteilen, je Gruppe rechnen (GROUP BY) und Gruppen filtern (HAVING).',
    sections: [
      {
        heading: 'GROUP BY – je Gruppe ein Ergebnis',
        blocks: [
          {
            art: 'text',
            text:
              'GROUP BY teilt die Zeilen anhand einer Spalte in Gruppen mit gleichem Wert. Jede Aggregatfunktion ' +
              'im SELECT wird dann PRO GRUPPE berechnet – aus „zähle alle Zeilen" wird „zähle je Farbe".',
          },
          {
            art: 'beispiel',
            titel: 'Beispiel – Zeilen je Farbe zählen',
            sql: 'SELECT C, COUNT(*)\nFROM T\nGROUP BY C',
            erklaerung:
              'Eine Gruppe je Farbwert C, COUNT(*) zählt die Zeilen darin. Kontrolle: 3 + 3 + 2 + 2 + 2 = 12.',
            ergebnis: {
              columns: ['C', 'COUNT(*)'],
              rows: [['rot', '3'], ['blau', '3'], ['grün', '2'], ['violett', '2'], ['gelb', '2']],
            },
          },
          {
            art: 'text',
            text:
              'Im SELECT dürfen neben den Aggregaten nur die Spalten stehen, nach denen gruppiert wird. Man darf ' +
              'auch nach mehreren Spalten gruppieren (z. B. GROUP BY EMPLOYEEID, FIRSTNAME, LASTNAME aus Blatt 0).',
          },
        ],
      },
      {
        heading: 'HAVING – Gruppen filtern',
        blocks: [
          {
            art: 'text',
            text:
              'WHERE filtert einzelne Zeilen VOR der Gruppierung. Um GRUPPEN nach ihrem Aggregatwert zu filtern ' +
              '(z. B. „nur Gruppen mit mindestens 2 Zeilen"), braucht man HAVING – denn auf Aggregate kann WHERE ' +
              'noch nicht zugreifen.',
          },
          {
            art: 'beispiel',
            titel: 'Beispiel – WHERE, GROUP BY und HAVING zusammen',
            sql: 'SELECT C, COUNT(*)\nFROM T\nWHERE D > 30\nGROUP BY C\nHAVING COUNT(*) >= 2',
            erklaerung:
              'Schritt 1: WHERE D > 30 lässt die Zeilen 1, 7, 8, 10, 11 übrig. Schritt 2: nach Farbe gruppieren – rot = 2, grün/violett/blau = je 1. Schritt 3: HAVING behält nur Gruppen mit mindestens 2 Zeilen, also rot.',
            ergebnis: { columns: ['C', 'COUNT(*)'], rows: [['rot', '2']] },
          },
          {
            art: 'beispiel',
            titel: 'Beispiel – HAVING mit Summen',
            sql: 'SELECT C, SUM(B), SUM(D)\nFROM T\nGROUP BY C\nHAVING SUM(B) = SUM(D) + 30',
            erklaerung:
              'Je Farbe SUM(B) und SUM(D) bilden, dann nur die Gruppen behalten, deren B-Summe genau um 30 über der D-Summe liegt – das trifft auf violett (130 = 100 + 30) und rot (140 = 110 + 30) zu.',
            ergebnis: { columns: ['C', 'SUM(B)', 'SUM(D)'], rows: [['violett', '130', '100'], ['rot', '140', '110']] },
          },
          {
            art: 'merksatz',
            text:
              'Auswertungsreihenfolge: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY. ' +
              'Kurz: WHERE filtert Zeilen, HAVING filtert Gruppen.',
          },
        ],
      },
    ],
  },
  // ---------------------------------------------------------------------------
  {
    id: 'joins',
    nr: 7,
    title: 'Tabellen verbinden: Joins, Kreuzprodukt & Self-Join',
    subtitle: 'Wie man Daten aus mehreren Tabellen zusammenführt – und warum man dabei eine Bedingung braucht.',
    sections: [
      {
        heading: 'Kreuzprodukt – jede Zeile mit jeder',
        blocks: [
          {
            art: 'text',
            text:
              'Nennt man in FROM zwei Tabellen, OHNE sie zu verbinden, entsteht das Kreuzprodukt: jede Zeile der ' +
              'einen wird mit jeder Zeile der anderen kombiniert. Bei m und n Zeilen sind das m · n Zeilen – ' +
              'meist viel zu viele und selten gewollt.',
          },
          {
            art: 'beispiel',
            titel: 'Beispiel – Kreuzprodukt zählen (aus Probeklausur 2)',
            sql: 'SELECT COUNT(*)\nFROM T1, T2',
            erklaerung: 'T1 hat 12 Zeilen, T2 hat 6 Zeilen. Ohne Verbindungsbedingung entstehen 12 · 6 = 72 Zeilen.',
            ergebnis: { columns: ['COUNT(*)'], rows: [['72']] },
          },
        ],
      },
      {
        heading: 'Join – nur die zusammenpassenden Zeilen',
        blocks: [
          {
            art: 'text',
            text:
              'Ein Join verbindet zwei Tabellen über eine Bedingung und behält nur die Zeilenpaare, die zusammenpassen ' +
              '(z. B. gleiche ID). Es gibt zwei gleichwertige Schreibweisen:',
          },
          {
            art: 'liste',
            punkte: [
              'Implizit: FROM A, B WHERE A.x = B.y – Tabellen mit Komma, Bedingung im WHERE.',
              'Explizit: FROM A JOIN B ON A.x = B.y – mit dem Schlüsselwort JOIN … ON. Lesbarer und heute üblich.',
            ],
          },
          {
            art: 'beispiel',
            titel: 'Beispiel – expliziter Join mit Tabellen-Aliasen (aus Blatt 0)',
            sql:
              'SELECT C.CUSTOMERPOSTALCODE\nFROM CUSTOMER_T C\n  JOIN ORDER_T O ON C.CUSTOMERID = O.CUSTOMERID\nWHERE O.ORDERID = 1008',
            erklaerung:
              'CUSTOMER_T und ORDER_T werden über die gemeinsame CUSTOMERID verbunden. C und O sind Tabellen-Aliase (Kurznamen), damit man C.CUSTOMERID statt CUSTOMER_T.CUSTOMERID schreiben kann. WHERE grenzt auf Bestellung 1008 ein.',
            ergebnis: { columns: ['CUSTOMERPOSTALCODE'], rows: [['49015-3401']] },
          },
        ],
      },
      {
        heading: 'Self-Join – eine Tabelle mit sich selbst',
        blocks: [
          {
            art: 'text',
            text:
              'Manchmal verbindet man eine Tabelle MIT SICH SELBST, etwa um Zeilen miteinander zu vergleichen. Dann ' +
              'gibt man ihr zwei verschiedene Aliase (z. B. T1 und T2) und behandelt sie wie zwei Tabellen.',
          },
          {
            art: 'beispiel',
            titel: 'Beispiel – Self-Join auf T (aus Probeklausur 1)',
            sql: 'SELECT COUNT(*)\nFROM T T1, T T2\nWHERE T1.B = T2.D',
            erklaerung:
              'T tritt zweimal auf, als T1 und T2. Gezählt werden alle Paare, bei denen der B-Wert der einen Zeile gleich dem D-Wert der anderen ist – das ergibt 15 Paare.',
            ergebnis: { columns: ['COUNT(*)'], rows: [['15']] },
          },
          {
            art: 'merksatz',
            text:
              'Ein Join ist immer „Kreuzprodukt + Bedingung". Fehlt die Verbindungsbedingung, bekommt man aus Versehen ' +
              'das volle Kreuzprodukt.',
          },
        ],
      },
    ],
  },
  // ---------------------------------------------------------------------------
  {
    id: 'subqueries',
    nr: 8,
    title: 'Unterabfragen (Subqueries) mit IN',
    subtitle: 'Eine Abfrage in einer Abfrage: zuerst eine Werteliste berechnen, dann damit weiterfiltern.',
    sections: [
      {
        heading: 'IN mit fester Liste',
        blocks: [
          {
            art: 'text',
            text:
              'IN prüft, ob ein Wert in einer Liste vorkommt. spalte IN (w1, w2, …) ist eine Kurzform für ' +
              'spalte = w1 OR spalte = w2 OR …',
          },
          {
            art: 'beispiel',
            titel: 'Beispiel – Wert aus einer Liste',
            sql: "SELECT A\nFROM T\nWHERE C IN ('rot', 'blau')",
            erklaerung: 'Behält die Zeilen, deren Farbe rot oder blau ist – dasselbe wie C = rot OR C = blau.',
            ergebnis: { columns: ['A'], rows: [['1'], ['2'], ['6'], ['9'], ['10'], ['11']] },
          },
        ],
      },
      {
        heading: 'IN mit einer Unterabfrage',
        blocks: [
          {
            art: 'text',
            text:
              'Statt einer festen Liste darf rechts von IN eine ganze SELECT-Anfrage stehen – die Unterabfrage. ' +
              'Sie wird ZUERST ausgewertet und liefert eine Spalte von Werten; die äußere Abfrage filtert dann damit.',
          },
          {
            art: 'beispiel',
            titel: 'Beispiel – Unterabfrage (aus Probeklausur 1)',
            sql: 'SELECT A, B, D\nFROM T\nWHERE B IN (\n  SELECT B FROM T WHERE 2 * A > D\n)',
            erklaerung:
              'Schritt 1 – innere Abfrage: Zeilen mit 2·A > D sind 4, 6 und 12; ihre B-Werte sind {120, 80, 140}. Schritt 2 – äußere Abfrage: alle Zeilen, deren B in dieser Menge liegt. Das sind genau die Zeilen 4, 6 und 12.',
            ergebnis: { columns: ['A', 'B', 'D'], rows: [['4', '120', '0'], ['6', '80', '10'], ['12', '140', '10']] },
          },
          {
            art: 'merksatz',
            text: 'Unterabfragen liest man von INNEN nach AUSSEN: erst das Klammer-SELECT, dann die äußere Anfrage.',
          },
        ],
      },
    ],
  },
  // ---------------------------------------------------------------------------
  {
    id: 'mengen',
    nr: 9,
    title: 'Mengenoperationen: UNION',
    subtitle: 'Die Ergebnisse zweier Abfragen zu einem zusammenführen.',
    sections: [
      {
        heading: 'UNION – zwei Ergebnisse vereinigen',
        blocks: [
          {
            art: 'text',
            text:
              'UNION hängt die Ergebnisse zweier SELECT-Anfragen untereinander und entfernt dabei Duplikate. ' +
              'Voraussetzung: Beide Anfragen liefern die GLEICHE Anzahl Spalten mit zueinander passenden Datentypen.',
          },
          {
            art: 'beispiel',
            titel: 'Beispiel – Farben aus zwei Relationen (aus Probeklausur 1)',
            sql: '(SELECT B FROM V)\nUNION\n(SELECT B FROM W)',
            erklaerung:
              'V liefert die Farben gelb, grün, blau, rot, orange; W liefert gelb, grün, rot, orange, magenta. UNION vereinigt beide und entfernt doppelte – übrig bleiben sechs verschiedene Farben.',
            ergebnis: {
              columns: ['B'],
              rows: [['gelb'], ['grün'], ['blau'], ['rot'], ['orange'], ['magenta']],
            },
          },
        ],
      },
      {
        heading: 'Gemeinsamer Spaltenname (AS) und Sortierung',
        blocks: [
          {
            art: 'text',
            text:
              'Damit die vereinigte Spalte einen einheitlichen Namen hat, gibt man beiden Teilen mit AS denselben ' +
              'Alias. Ein ORDER BY steht nur EINMAL ganz am Ende und sortiert das Gesamtergebnis.',
          },
          {
            art: 'sql',
            titel: 'Schema (aus Probeklausur 1, Aufgabe 3d)',
            code:
              '(SELECT A AS X FROM V WHERE A * B < D)\nUNION\n(SELECT B AS X FROM V WHERE A * D > C)\nORDER BY X',
          },
          {
            art: 'merksatz',
            text:
              'UNION entfernt Duplikate. Die verwandten Operationen INTERSECT (Schnittmenge) und EXCEPT/MINUS ' +
              '(Differenz) funktionieren analog, kamen in den Blättern aber nur in der relationalen Algebra (∩, −) vor.',
          },
        ],
      },
    ],
  },
  // ---------------------------------------------------------------------------
  {
    id: 'create-table',
    nr: 10,
    title: 'Tabellen definieren: CREATE TABLE & Integritätsbedingungen',
    subtitle:
      'Wie eine Tabelle samt Spalten, Datentypen und Regeln (Constraints) angelegt wird, die die Datenqualität sichern.',
    sections: [
      {
        heading: 'CREATE TABLE und Datentypen',
        blocks: [
          {
            art: 'text',
            text:
              'CREATE TABLE legt eine neue Tabelle an. Pro Spalte gibt man einen Namen und einen Datentyp an, ' +
              'z. B. INT (Ganzzahl) oder VARCHAR(n) (Text mit bis zu n Zeichen). Anschließend folgen die ' +
              'Integritätsbedingungen (Constraints), die festlegen, welche Daten überhaupt erlaubt sind.',
          },
          {
            art: 'sql',
            titel: 'Beispiel (aus Probeklausur 1, Aufgabe 4)',
            code:
              'CREATE TABLE X1 (\n  A INT,\n  B VARCHAR(64),\n  C INT,\n  D INT,\n  CONSTRAINT X1_CO_1 PRIMARY KEY (A, C),\n  CONSTRAINT X1_CO_2 CHECK (LENGTH(B) IN (3,4,6,7)),\n  CONSTRAINT X1_CO_3 CHECK (D IN (1,2,4,8,16,32,64,128,256)),\n  CONSTRAINT X1_CO_4 UNIQUE (D)\n)',
          },
        ],
      },
      {
        heading: 'Die wichtigsten Constraints',
        blocks: [
          {
            art: 'tabelle',
            titel: 'Integritätsbedingungen',
            columns: ['Constraint', 'Bedeutung'],
            rows: [
              ['PRIMARY KEY (…)', 'Primärschlüssel: eindeutig UND nicht NULL. Identifiziert jede Zeile.'],
              ['UNIQUE (…)', 'Werte müssen eindeutig sein (NULL ist hier aber erlaubt).'],
              ['FOREIGN KEY (…) REFERENCES T(…)', 'Fremdschlüssel: der Wert muss in der referenzierten Tabelle vorkommen (oder NULL sein).'],
              ['CHECK (bedingung)', 'Eine frei formulierte Regel, die jede Zeile erfüllen muss.'],
            ],
          },
          {
            art: 'text',
            text:
              'In CHECK-Bedingungen sind u. a. IN (Wert in einer Liste) und BETWEEN a AND b (Wert im Bereich a bis b, ' +
              'inklusive) praktisch. Der Fremdschlüssel verknüpft zwei Tabellen dauerhaft.',
          },
          {
            art: 'sql',
            titel: 'Fremdschlüssel und Bereichsprüfung (aus Probeklausur 2)',
            code:
              'CREATE TABLE X2 (\n  A INT, B INT, C INT, D INT, E INT,\n  CONSTRAINT X2_CO_1 PRIMARY KEY (A, E),\n  CONSTRAINT X2_CO_2 FOREIGN KEY (A, B) REFERENCES X1(A, C),\n  CONSTRAINT X2_CO_3 FOREIGN KEY (E) REFERENCES X1(D),\n  CONSTRAINT X2_CO_4 CHECK (D BETWEEN 12 AND 16)\n)',
          },
          {
            art: 'merksatz',
            text:
              'Achtung NULL-Falle bei CHECK: Ein CHECK gilt als erfüllt, wenn er TRUE ODER UNKNOWN ergibt – er ' +
              'schlägt nur bei FALSE fehl. Deshalb kann z. B. CHECK (D = NULL) nie verletzt werden.',
          },
        ],
      },
    ],
  },
  // ---------------------------------------------------------------------------
  {
    id: 'insert',
    nr: 11,
    title: 'Daten einfügen: INSERT INTO … VALUES',
    subtitle: 'Wie neue Zeilen in eine Tabelle geschrieben werden – und worauf die Constraints dabei achten.',
    sections: [
      {
        heading: 'Die Grundform',
        blocks: [
          {
            art: 'text',
            text:
              'INSERT INTO tabelle VALUES (…) fügt eine neue Zeile ein. Die Werte stehen in der REIHENFOLGE der ' +
              'Spalten aus der Tabellendefinition. Text in einfachen Anführungszeichen, Zahlen ohne, fehlende Werte ' +
              'als NULL.',
          },
          {
            art: 'beispiel',
            titel: 'Beispiel – neue Zeile in X1 (aus Probeklausur 1)',
            sql: "INSERT INTO X1 VALUES (1, 'magenta', 45, 128)",
            erklaerung:
              'Setzt A = 1, B = magenta, C = 45, D = 128. Beim Einfügen prüft die Datenbank alle Constraints von X1 – hier scheitert es z. B., falls D = 128 schon existiert (UNIQUE).',
          },
          {
            art: 'beispiel',
            titel: 'Beispiel – mit NULL (aus Probeklausur 2)',
            sql: 'INSERT INTO S VALUES (7, NULL, 5)',
            erklaerung:
              'D wird ausdrücklich auf NULL gesetzt (kein Wert). Ob das erlaubt ist, hängt von den Constraints ab – ein NULL im Primärschlüssel wäre z. B. verboten.',
          },
          {
            art: 'merksatz',
            text:
              'Tipp: Sicherer als die reine VALUES-Form ist die Variante mit Spaltenliste, z. B. ' +
              'INSERT INTO X1 (A, C) VALUES (1, 45) – dann ist die Zuordnung eindeutig und reihenfolgeunabhängig.',
          },
        ],
      },
    ],
  },
  // ---------------------------------------------------------------------------
  {
    id: 'sql-zu-algebra',
    nr: 12,
    title: 'SQL-Abfragen als relationale Algebra darstellen',
    subtitle:
      'Von Grund auf: Was relationale Algebra überhaupt ist, die fünf Grundoperatoren und ' +
      'wie man jede SELECT-FROM-WHERE-Abfrage Schritt für Schritt übersetzt.',
    sections: [
      {
        heading: 'Worum geht es überhaupt?',
        blocks: [
          {
            art: 'text',
            text:
              'Eine „Relation" ist nichts anderes als eine Tabelle: Die Zeilen heißen Tupel, die Spalten ' +
              'heißen Attribute. Die relationale Algebra ist ein kleiner Werkzeugkasten aus Operatoren, ' +
              'die jeweils eine oder zwei Tabellen nehmen und daraus eine neue Tabelle berechnen – im ' +
              'Grunde ein „Taschenrechner für Tabellen".',
          },
          {
            art: 'text',
            text:
              'SQL ist die Sprache, die man tatsächlich tippt; die relationale Algebra ist die Mathematik ' +
              'dahinter. Jede SQL-Abfrage lässt sich als Kette solcher Operatoren ausdrücken – genau das ' +
              'macht die Datenbank intern auch. In Klausuren wird oft verlangt, eine SQL-Anfrage in diese ' +
              'Algebra zu übersetzen.',
          },
          {
            art: 'merksatz',
            text:
              'Jeder Operator nimmt eine oder zwei Tabellen und liefert wieder eine Tabelle. Deshalb darf ' +
              'man Operatoren beliebig ineinander schachteln.',
          },
        ],
      },
      {
        heading: 'Die Bausteine: fünf Operatoren',
        blocks: [
          {
            art: 'text',
            text:
              'Mit diesen fünf Operatoren kommt man bei den allermeisten Aufgaben aus. Jeder hat ein ' +
              'eigenes Symbol und eine direkte Entsprechung in SQL.',
          },
          {
            art: 'text',
            text:
              '1) Selektion σ (sigma) – wählt ZEILEN aus. σ[Bedingung](R) behält genau die Zeilen von R, ' +
              'welche die Bedingung erfüllen. SQL-Entsprechung: die WHERE-Klausel.',
          },
          {
            art: 'text',
            text:
              '2) Projektion π (pi) – wählt SPALTEN aus. π[Spalten](R) behält nur die genannten Spalten. ' +
              'SQL-Entsprechung: die Spaltenliste hinter SELECT. Achtung: π entfernt automatisch doppelte ' +
              'Zeilen (Mengensemantik).',
          },
          {
            art: 'text',
            text:
              '3) Kreuzprodukt × (kartesisches Produkt) – kombiniert JEDE Zeile von R mit JEDER Zeile von S. ' +
              'Hat R 10 und S 6 Zeilen, hat R × S 60 Zeilen. SQL-Entsprechung: zwei Tabellen in FROM ohne ' +
              'Verbindungsbedingung.',
          },
          {
            art: 'text',
            text:
              '4) Verbund / Join ⋈ – verbindet nur die ZUSAMMENPASSENDEN Zeilen zweier Tabellen. ' +
              'R ⋈[Bedingung] S ist nichts anderes als ein Kreuzprodukt mit anschließender Selektion auf die ' +
              'Verbindungsbedingung. SQL-Entsprechung: FROM R, S WHERE R.x = S.y (bzw. JOIN … ON).',
          },
          {
            art: 'text',
            text:
              '5) Mengenoperationen ∪ ∩ − – verknüpfen zwei gleich aufgebaute Tabellen: Vereinigung ∪ ' +
              '(SQL: UNION), Schnittmenge ∩ (INTERSECT) und Differenz − (EXCEPT bzw. MINUS).',
          },
          {
            art: 'merksatz',
            text:
              'Eselsbrücke: σ schneidet Zeilen heraus (waagerecht), π schneidet Spalten heraus (senkrecht). ' +
              'σ wie „selektieren", π wie „projizieren".',
          },
        ],
      },
      {
        heading: 'Das Grundrezept: SELECT – FROM – WHERE übersetzen',
        blocks: [
          {
            art: 'text',
            text:
              'Die klassische SQL-Form lässt sich fast wörtlich übersetzen. Man liest sie dabei von innen ' +
              'nach außen: zuerst die Quelle aus FROM bauen, dann mit WHERE filtern, zuletzt mit SELECT die ' +
              'Spalten auswählen.',
          },
          {
            art: 'uebersetzung',
            sql: 'SELECT spalten\nFROM tabellen\nWHERE bedingung',
            algebra: 'π[spalten] ( σ[bedingung] ( tabellen ) )',
          },
          {
            art: 'liste',
            punkte: [
              'FROM A, B  →  A × B (Kreuzprodukt). Steht in WHERE eine Verbindungsbedingung, wird daraus ein Join ⋈.',
              'WHERE bedingung  →  σ[bedingung]( … ). Dabei wird AND zu ∧ und OR zu ∨.',
              'SELECT spalten  →  π[spalten]( … ).',
              'SELECT *  →  KEINE Projektion (das π einfach weglassen).',
              'SELECT DISTINCT spalten  →  π[spalten]( … ) – denn π entfernt Duplikate ohnehin.',
            ],
          },
          {
            art: 'merksatz',
            text:
              'Reihenfolge von innen nach außen: zuerst FROM (× / ⋈), dann WHERE (σ), zuletzt SELECT (π).',
          },
        ],
      },
      {
        heading: 'Beispiel 1 – eine einzige Tabelle',
        blocks: [
          {
            art: 'text',
            text:
              'Gegeben sei die Tabelle Studenten(MatrNr, Name, Semester). Gesucht sind die Namen aller ' +
              'Studenten ab dem 12. Semester.',
          },
          {
            art: 'uebersetzung',
            sql: 'SELECT Name\nFROM Studenten\nWHERE Semester >= 12',
            algebra: 'π[Name] ( σ[Semester ≥ 12] ( Studenten ) )',
            hinweis: 'Erst filtern (σ), dann auf die Spalte einschränken (π) – von innen nach außen gelesen.',
          },
        ],
      },
      {
        heading: 'Beispiel 2 – zwei Tabellen verbinden (Join)',
        blocks: [
          {
            art: 'text',
            text:
              'Gegeben seien zwei Relationen V(A, B) und W(B, C, D). Die folgende Abfrage verbindet beide ' +
              'über die gemeinsame Spalte B und filtert zusätzlich nach V.A < 4.',
          },
          {
            art: 'text',
            text:
              'Die WHERE-Klausel enthält zwei verschiedene Dinge: V.B = W.B ist die Verbindungsbedingung ' +
              '(sie macht aus dem Kreuzprodukt einen Join), V.A < 4 ist ein echter Zeilenfilter. Weil SELECT * ' +
              'alle Spalten übernimmt, ist KEINE Projektion nötig.',
          },
          {
            art: 'uebersetzung',
            sql: 'SELECT *\nFROM V, W\nWHERE V.B = W.B AND V.A < 4',
            algebra: 'σ[V.A < 4] ( V ⋈[V.B = W.B] W )',
          },
          {
            art: 'algebra',
            titel: 'Gleichwertig nur mit Kreuzprodukt',
            text: 'σ[V.B = W.B ∧ V.A < 4] ( V × W )',
          },
          {
            art: 'merksatz',
            text:
              'Ein Join ist immer „Kreuzprodukt + Selektion". Wer sich mit der ⋈-Schreibweise unsicher ist, ' +
              'darf jederzeit auf × und σ ausweichen – das Ergebnis ist dasselbe.',
          },
        ],
      },
      {
        heading: 'Häufige Stolperfallen',
        blocks: [
          {
            art: 'liste',
            punkte: [
              'SELECT * bedeutet „alle Spalten" und damit KEINE Projektion. Trotzdem ein π zu schreiben, gilt als Fehler.',
              'AND wird zu ∧, OR zu ∨ – diese beiden nicht vertauschen.',
              'π arbeitet mengenbasiert und entfernt Duplikate; SQL behält (ohne DISTINCT) Duplikate. Deshalb entspricht π genau SELECT DISTINCT.',
              'Mehrere Tabellen in FROM ohne Verbindungsbedingung ergeben das (oft riesige) Kreuzprodukt – meist ein Versehen.',
              'Im Zweifel jeden Join als × gefolgt von σ schreiben; das ist immer korrekt.',
            ],
          },
          {
            art: 'tabelle',
            titel: 'Spickzettel: SQL ↔ relationale Algebra',
            columns: ['SQL', 'Relationale Algebra', 'Bedeutung'],
            rows: [
              ['WHERE bedingung', 'σ[bedingung]', 'Zeilen filtern'],
              ['SELECT spalten', 'π[spalten]', 'Spalten auswählen'],
              ['SELECT DISTINCT spalten', 'π[spalten]', 'Spalten auswählen, Duplikate entfernen'],
              ['FROM A, B', 'A × B', 'alle Kombinationen (Kreuzprodukt)'],
              ['FROM A, B WHERE A.x = B.y', 'A ⋈[A.x = B.y] B', 'passende Zeilen verbinden (Join)'],
              ['UNION', '∪', 'Vereinigung zweier Tabellen'],
              ['INTERSECT', '∩', 'Schnittmenge'],
              ['EXCEPT / MINUS', '−', 'Differenz'],
            ],
          },
        ],
      },
    ],
  },
  // ---------------------------------------------------------------------------
  {
    id: 'er-modell',
    nr: 13,
    title: 'ER-Modell: die Grundbausteine',
    subtitle:
      'Wie man Daten VOR der Tabelle modelliert: Entitätstypen, Attribute, Schlüssel, Beziehungen ' +
      'und Kardinalitäten.',
    sections: [
      {
        heading: 'Wozu ein ER-Modell?',
        blocks: [
          {
            art: 'text',
            text:
              'Bevor man Tabellen anlegt, skizziert man die Miniwelt: Welche Objekte gibt es, welche ' +
              'Eigenschaften haben sie, und wie hängen sie zusammen? Das Entity-Relationship-Modell (ER) ist ' +
              'die Standard-Zeichnung dafür. Aus ihm leitet man später das relationale Schema – also die ' +
              'Tabellen – ab (siehe Thema 14).',
          },
        ],
      },
      {
        heading: 'Die Symbole im Überblick',
        blocks: [
          {
            art: 'text',
            text:
              'Das folgende Diagramm zeigt „Ein Student besucht eine Vorlesung". In der Klausur sind die ' +
              'Bauteile mit A–F markiert – hier lernst du, was sie bedeuten.',
          },
          {
            art: 'svg',
            svg: `<svg viewBox="0 0 720 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ER-Diagramm: Student besucht Vorlesung (n:m)">
  <line class="dgm-line" x1="95" y1="66" x2="178" y2="145"/>
  <line class="dgm-line" x1="200" y1="66" x2="200" y2="145"/>
  <line class="dgm-line" x1="312" y1="66" x2="232" y2="145"/>
  <line class="dgm-line" x1="430" y1="66" x2="492" y2="145"/>
  <line class="dgm-line" x1="535" y1="66" x2="530" y2="145"/>
  <line class="dgm-line" x1="645" y1="66" x2="568" y2="145"/>
  <line class="dgm-line" x1="260" y1="171" x2="305" y2="171"/>
  <line class="dgm-line" x1="415" y1="171" x2="470" y2="171"/>
  <ellipse class="dgm-shape" cx="95" cy="48" rx="50" ry="20"/>
  <text class="dgm-key" x="95" y="53" text-anchor="middle">MatrNr</text>
  <ellipse class="dgm-shape" cx="200" cy="48" rx="42" ry="20"/>
  <text class="dgm-text" x="200" y="53" text-anchor="middle">Name</text>
  <ellipse class="dgm-shape" cx="312" cy="48" rx="56" ry="20"/>
  <text class="dgm-text" x="312" y="53" text-anchor="middle">Geburtstag</text>
  <ellipse class="dgm-shape" cx="430" cy="48" rx="40" ry="20"/>
  <text class="dgm-text" x="430" y="53" text-anchor="middle">Nr</text>
  <ellipse class="dgm-shape" cx="535" cy="48" rx="42" ry="20"/>
  <text class="dgm-text" x="535" y="53" text-anchor="middle">Titel</text>
  <ellipse class="dgm-shape" cx="645" cy="48" rx="48" ry="20"/>
  <text class="dgm-text" x="645" y="53" text-anchor="middle">Credits</text>
  <rect class="dgm-shape" x="140" y="145" width="120" height="52" rx="3"/>
  <text class="dgm-text" x="200" y="177" text-anchor="middle">Student</text>
  <rect class="dgm-shape" x="470" y="145" width="120" height="52" rx="3"/>
  <text class="dgm-text" x="530" y="177" text-anchor="middle">Vorlesung</text>
  <polygon class="dgm-shape" points="305,171 360,141 415,171 360,201"/>
  <text class="dgm-text dgm-text--sm" x="360" y="175" text-anchor="middle">besucht</text>
  <text class="dgm-card" x="282" y="162" text-anchor="middle">N</text>
  <text class="dgm-card" x="440" y="162" text-anchor="middle">M</text>
  <text class="dgm-lbl" x="282" y="191" text-anchor="middle">E</text>
  <text class="dgm-lbl" x="440" y="191" text-anchor="middle">F</text>
  <text class="dgm-lbl" x="200" y="229" text-anchor="middle">A</text>
  <text class="dgm-lbl" x="360" y="229" text-anchor="middle">B</text>
  <text class="dgm-lbl" x="95" y="16" text-anchor="middle">C</text>
  <text class="dgm-lbl" x="200" y="16" text-anchor="middle">D</text>
</svg>`,
          },
          {
            art: 'tabelle',
            titel: 'Was die Bauteile bedeuten',
            columns: ['Element', 'Form', 'Bedeutung'],
            rows: [
              ['A — Student', 'Rechteck', 'Entitätstyp: eine Klasse gleichartiger Objekte (alle Studenten).'],
              ['B — besucht', 'Raute', 'Beziehungstyp: verbindet Entitätstypen (wer besucht was).'],
              ['C — MatrNr', 'unterstrichenes Oval', 'Schlüsselattribut: identifiziert eine Entität eindeutig.'],
              ['D — Name', 'Oval', 'Attribut: beschreibt die Entität, identifiziert aber nicht eindeutig.'],
              ['E, F', 'Angaben an den Kanten', 'Kardinalität: wie viele Entitäten je Seite in Beziehung stehen (hier N:M).'],
            ],
          },
          {
            art: 'text',
            text:
              'Entitätstyp vs. Entität: Der Typ ist die Schablone („Student" mit MatrNr, Name, Geburtstag); eine ' +
              'konkrete Ausprägung – ein bestimmter Student wie „Max Mustermann, MatrNr 12345" – heißt Entität.',
          },
        ],
      },
      {
        heading: 'Kardinalitäten: 1:1, 1:n, n:m',
        blocks: [
          {
            art: 'text',
            text: 'Die Kardinalität (Funktionalität) gibt an, wie viele Entitäten der einen Seite mit der anderen in Beziehung stehen.',
          },
          {
            art: 'liste',
            punkte: [
              '1:1 – jeder Seite ist genau eine der anderen zugeordnet (z. B. Person ↔ Personalausweis).',
              '1:n – einer Seite sind mehrere zugeordnet, umgekehrt aber nur eine (z. B. eine Abteilung hat viele Mitarbeiter; jeder Mitarbeiter gehört zu genau einer Abteilung).',
              'n:m – beide Seiten „viele" (z. B. ein Student besucht mehrere Vorlesungen, eine Vorlesung wird von mehreren Studenten besucht).',
            ],
          },
          {
            art: 'merksatz',
            text:
              'Faustregel: Heißt es „mehrere … können mehrere …" für beide Richtungen, ist es n:m. Ist eine Seite ' +
              'auf „genau eines" beschränkt, hat man 1:n bzw. 1:1.',
          },
        ],
      },
    ],
  },
  // ---------------------------------------------------------------------------
  {
    id: 'min-max',
    nr: 14,
    title: '(min,max)-Notation',
    subtitle:
      'Eine genauere Kardinalitätsangabe: wie oft jede einzelne Entität mindestens und höchstens an einer ' +
      'Beziehung teilnimmt.',
    sections: [
      {
        heading: 'Wie man [min,max] liest',
        blocks: [
          {
            art: 'text',
            text:
              'Ein [min,max] an der Seite eines Entitätstyps bedeutet: JEDE EINZELNE Entität dieses Typs nimmt an ' +
              'mindestens min und höchstens max Beziehungen teil. (Achtung: Die Angabe steht an der Seite der ' +
              'Entität, deren Teilnahme sie beschreibt.)',
          },
          {
            art: 'svg',
            svg: `<svg viewBox="0 0 560 170" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ER-Diagramm: Kneipe VERKAUFT Bier mit (min,max)-Notation">
  <line class="dgm-line" x1="150" y1="90" x2="228" y2="90"/>
  <line class="dgm-line" x1="332" y1="90" x2="410" y2="90"/>
  <rect class="dgm-shape" x="40" y="65" width="110" height="50" rx="3"/>
  <text class="dgm-text" x="95" y="95" text-anchor="middle">Kneipe</text>
  <rect class="dgm-shape" x="410" y="65" width="110" height="50" rx="3"/>
  <text class="dgm-text" x="465" y="95" text-anchor="middle">Bier</text>
  <polygon class="dgm-shape" points="228,90 280,60 332,90 280,120"/>
  <text class="dgm-text dgm-text--sm" x="280" y="94" text-anchor="middle">VERKAUFT</text>
  <text class="dgm-card" x="189" y="80" text-anchor="middle">[0,3]</text>
  <text class="dgm-card" x="371" y="80" text-anchor="middle">[0,2]</text>
</svg>`,
          },
          {
            art: 'text',
            text:
              'An der KNEIPE-Seite steht [0,3]: jede Kneipe verkauft zwischen 0 und 3 Biere. An der BIER-Seite ' +
              '[0,2]: jedes Bier wird in 0 bis 2 Kneipen verkauft.',
          },
          {
            art: 'merksatz',
            text:
              'min = 0 heißt „darf auch an gar keiner Beziehung teilnehmen" (optional); max = n heißt „beliebig ' +
              'viele, keine Obergrenze".',
          },
        ],
      },
      {
        heading: 'Die Werte aus den Daten bestimmen',
        blocks: [
          {
            art: 'text',
            text:
              'Um [min,max] zu prüfen oder herzuleiten, schaut man in die gespeicherten Daten: Für jede Entität ' +
              'zählt man ihre Beziehungen. min ist die kleinste, max die größte vorkommende Anzahl.',
          },
          {
            art: 'liste',
            punkte: [
              'PietsPub kommt in VERKAUFT gar nicht vor → verkauft 0 Biere → min muss 0 sein.',
              'OskarsOase und SamsSpelunke verkaufen je 3 Biere → max ist 3.',
              'Also gilt an der KNEIPE-Seite [0,3] (in der Klausur stand fälschlich [0,2]).',
            ],
          },
          {
            art: 'merksatz',
            text:
              'Klausur-Trick: Eine Angabe [1,…] ist schon falsch, sobald nur EINE Entität an null Beziehungen ' +
              'teilnimmt – dann muss die Untergrenze 0 sein. Genau das wird in Probeklausur 2, Aufgabe 3 mehrfach geprüft.',
          },
          {
            art: 'text',
            text:
              'Zusammenhang mit der einfachen 1/n/m-Notation: (min,max) ist feiner, weil es zusätzlich die ' +
              'Untergrenze festhält – also ob die Teilnahme Pflicht (min ≥ 1) oder optional (min = 0) ist. Das ' +
              'drückt die einfache 1/n/m-Notation nicht aus.',
          },
        ],
      },
    ],
  },
  // ---------------------------------------------------------------------------
  {
    id: 'er-zu-schema',
    nr: 15,
    title: 'Vom ER-Modell zum relationalen Schema',
    subtitle: 'Die festen Regeln, um ein ER-Diagramm in Tabellen zu überführen – inklusive Verfeinerung bei 1:N.',
    sections: [
      {
        heading: 'Die Standard-Überführung',
        blocks: [
          {
            art: 'text',
            text:
              'Aus einem ER-Diagramm macht man nach festen Regeln Relationen (Tabellen). Schreibweise: „A: {[a]}" ' +
              'heißt „Relation A mit dem Attribut a"; unterstrichene Attribute bilden den Primärschlüssel.',
          },
          {
            art: 'liste',
            punkte: [
              'Jeder Entitätstyp wird zu einer eigenen Relation; sein Schlüsselattribut wird Primärschlüssel.',
              'Jede Beziehung wird – zunächst – ebenfalls zu einer eigenen Relation. Sie bekommt die Schlüssel ALLER beteiligten Entitätstypen als Fremdschlüssel plus ihre eigenen Beziehungsattribute; die Fremdschlüssel zusammen bilden ihren Primärschlüssel.',
            ],
          },
          {
            art: 'svg',
            titel: 'Beispiel: A —1:N— R — B (aus Probeklausur 2)',
            svg: `<svg viewBox="0 0 560 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ER-Diagramm: A 1:N R B">
  <line class="dgm-line" x1="180" y1="95" x2="228" y2="95"/>
  <line class="dgm-line" x1="332" y1="95" x2="380" y2="95"/>
  <line class="dgm-line" x1="125" y1="165" x2="125" y2="120"/>
  <line class="dgm-line" x1="280" y1="165" x2="280" y2="122"/>
  <line class="dgm-line" x1="435" y1="165" x2="435" y2="120"/>
  <rect class="dgm-shape" x="70" y="70" width="110" height="50" rx="3"/>
  <text class="dgm-text" x="125" y="100" text-anchor="middle">A</text>
  <rect class="dgm-shape" x="380" y="70" width="110" height="50" rx="3"/>
  <text class="dgm-text" x="435" y="100" text-anchor="middle">B</text>
  <polygon class="dgm-shape" points="228,95 280,68 332,95 280,122"/>
  <text class="dgm-text" x="280" y="100" text-anchor="middle">R</text>
  <ellipse class="dgm-shape" cx="125" cy="185" rx="40" ry="20"/>
  <text class="dgm-key" x="125" y="190" text-anchor="middle">a</text>
  <ellipse class="dgm-shape" cx="280" cy="185" rx="40" ry="20"/>
  <text class="dgm-text" x="280" y="190" text-anchor="middle">r</text>
  <ellipse class="dgm-shape" cx="435" cy="185" rx="40" ry="20"/>
  <text class="dgm-key" x="435" y="190" text-anchor="middle">b</text>
  <text class="dgm-card" x="204" y="86" text-anchor="middle">1</text>
  <text class="dgm-card" x="356" y="86" text-anchor="middle">N</text>
</svg>`,
          },
          {
            art: 'algebra',
            titel: 'Standard-Schema (drei Relationen)',
            text: 'A: {[a]}\nB: {[b]}\nR: {[a, b, r]}',
          },
          {
            art: 'text',
            text:
              'a und b sind die Schlüssel von A und B. In R bilden a und b zusammen den Schlüssel; r ist das ' +
              'Beziehungsattribut (es hängt im Diagramm an der Raute).',
          },
        ],
      },
      {
        heading: 'Verfeinerung bei 1:N',
        blocks: [
          {
            art: 'text',
            text:
              'Bei einer 1:N-Beziehung ist eine eigene Relation für die Beziehung überflüssig. Man verschmilzt R ' +
              'in die Relation auf der N-Seite (hier B): B bekommt den Schlüssel der 1-Seite (a) als Fremdschlüssel ' +
              'und zusätzlich das Beziehungsattribut r.',
          },
          {
            art: 'algebra',
            titel: 'Verfeinertes Schema (nur zwei Relationen)',
            text: 'A: {[a]}\nB: {[a, b, r]}     (Primärschlüssel bleibt b; a ist Fremdschlüssel zu A)',
          },
          {
            art: 'text',
            text:
              'Warum die N-Seite? Bei 1:N gehört zu jedem B genau ein A, also passt a als einzelner Wert in jede ' +
              'B-Zeile. Umgekehrt müsste A mehrere b-Werte aufnehmen – das kann ein einzelnes Attribut nicht.',
          },
          {
            art: 'merksatz',
            text:
              'Faustregel: 1:N → die Beziehung wandert in die N-Seite. n:m → die Beziehung braucht IMMER eine eigene ' +
              'Tabelle, z. B. besucht(MatrNr, Nr) für „Student besucht Vorlesung".',
          },
        ],
      },
    ],
  },
  // ---------------------------------------------------------------------------
  {
    id: 'normalisierung-bcnf',
    nr: 16,
    title: 'Normalisierung & BCNF',
    subtitle:
      'Funktionale Abhängigkeiten, Attributhülle, Schlüssel und die BCNF-Zerlegung – Werkzeuge gegen Redundanz im Schema.',
    sections: [
      {
        heading: 'Funktionale Abhängigkeiten (FDs)',
        blocks: [
          {
            art: 'text',
            text:
              'Eine funktionale Abhängigkeit X → Y („X bestimmt Y") heißt: Zeilen mit gleichen X-Werten müssen auch ' +
              'gleiche Y-Werte haben. Beispiel: MatrNr → Name – zu einer Matrikelnummer gehört genau ein Name. FDs ' +
              'sind die Grundlage, um ein redundanzarmes Tabellendesign zu finden.',
          },
          {
            art: 'text',
            text: 'Als durchgehendes Beispiel dient die Relation R(A, B, C, D) mit diesen vier FDs:',
          },
          { art: 'algebra', titel: 'Gegebene FDs', text: 'AD → BC\nA  → D\nBC → AD\nD  → B' },
          {
            art: 'text',
            text:
              'Vereinfacht man sie (die sogenannte kanonische Überdeckung – überflüssige Attribute und Regeln ' +
              'werden entfernt), bleibt eine handlichere, gleichwertige Menge:',
          },
          { art: 'algebra', titel: 'Kanonische Überdeckung', text: 'A  → CD\nBC → A\nD  → B' },
        ],
      },
      {
        heading: 'Attributhülle X⁺',
        blocks: [
          {
            art: 'text',
            text:
              'Die Attributhülle {X}⁺ ist die Menge aller Attribute, die X bestimmt. Man berechnet sie, indem man ' +
              'die FDs wiederholt anwendet, bis nichts Neues mehr hinzukommt.',
          },
          {
            art: 'liste',
            punkte: [
              '{A}⁺: Start {A}; mit A → CD kommen C und D dazu; mit D → B kommt B dazu → {A, B, C, D}. A bestimmt also alles.',
              '{B}⁺ = {B}: Keine FD hat allein B (oder eine Teilmenge davon) auf der linken Seite → es kommt nichts hinzu.',
            ],
          },
          {
            art: 'merksatz',
            text:
              'X ist ein Superschlüssel, wenn {X}⁺ alle Attribute der Relation ergibt. Ein Kandidatenschlüssel ist ' +
              'ein MINIMALER Superschlüssel (keine echte Teilmenge ist schon Schlüssel).',
          },
        ],
      },
      {
        heading: 'Kandidatenschlüssel',
        blocks: [
          {
            art: 'text',
            text:
              'Man rechnet die Hüllen der Attributmengen durch und behält die minimalen, deren Hülle die ganze ' +
              'Relation ergibt. Für R(A, B, C, D) sind das drei Kandidatenschlüssel:',
          },
          {
            art: 'tabelle',
            titel: 'Kandidatenschlüssel von R(A, B, C, D)',
            columns: ['Schlüssel', 'Hülle', 'Begründung'],
            rows: [
              ['[A]', '{A, B, C, D}', 'A bestimmt alles (siehe oben).'],
              ['[B, C]', '{A, B, C, D}', 'über BC → A und A → CD wird alles erreicht.'],
              ['[C, D]', '{A, B, C, D}', 'D → B und mit C zusammen ergibt sich A.'],
            ],
          },
          {
            art: 'text',
            text: 'B allein scheidet aus, weil {B}⁺ = {B} ist – B bestimmt nichts weiter.',
          },
        ],
      },
      {
        heading: 'Boyce-Codd-Normalform (BCNF)',
        blocks: [
          {
            art: 'text',
            text:
              'BCNF-Bedingung: Für JEDE nichttriviale FD X → Y muss die linke Seite X ein Superschlüssel sein. Wir ' +
              'prüfen die kanonische Überdeckung:',
          },
          {
            art: 'liste',
            punkte: [
              'A → CD: {A}⁺ = {A, B, C, D} → A ist Superschlüssel ✓',
              'BC → A: {B, C}⁺ = {A, B, C, D} → BC ist Superschlüssel ✓',
              'D → B: {D}⁺ = {B, D} ≠ {A, B, C, D} → D ist KEIN Superschlüssel ✗ → BCNF-Verletzung!',
            ],
          },
          {
            art: 'text',
            text:
              'Zerlegt wird entlang der verletzenden FD D → B: R1 bekommt die Hülle {D}⁺ = {B, D}, R2 die linke ' +
              'Seite D plus die übrigen Attribute, also {A, C, D}.',
          },
          {
            art: 'svg',
            titel: 'Zerlegung entlang D → B',
            svg: `<svg viewBox="0 0 540 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="BCNF-Zerlegung von R in R1 und R2">
  <line class="dgm-line" x1="270" y1="58" x2="140" y2="122"/>
  <line class="dgm-line" x1="270" y1="58" x2="400" y2="122"/>
  <rect class="dgm-shape" x="195" y="22" width="150" height="36" rx="5"/>
  <text class="dgm-text" x="270" y="45" text-anchor="middle">R(A, B, C, D)</text>
  <rect class="dgm-shape" x="80" y="122" width="120" height="36" rx="5"/>
  <text class="dgm-text" x="140" y="145" text-anchor="middle">R1(B, D)</text>
  <rect class="dgm-shape" x="330" y="122" width="140" height="36" rx="5"/>
  <text class="dgm-text" x="400" y="145" text-anchor="middle">R2(A, C, D)</text>
  <text class="dgm-text dgm-text--sm" x="140" y="184" text-anchor="middle">{D}⁺ = {B, D}</text>
  <text class="dgm-text dgm-text--sm" x="400" y="184" text-anchor="middle">{A}⁺ = {A, C, D}</text>
  <text class="dgm-card" x="270" y="212" text-anchor="middle">zerlegt entlang D → B (D ist kein Superschlüssel)</text>
</svg>`,
          },
          {
            art: 'merksatz',
            text:
              'Die BCNF-Zerlegung ist verlustfrei, aber nicht immer abhängigkeitserhaltend: Hier verteilt sich ' +
              'BC → A auf beide Relationen (B in R1, A und C in R2) und lässt sich in keiner allein mehr prüfen – ' +
              'die Abhängigkeit geht verloren.',
          },
        ],
      },
    ],
  },
]

// Neue Themen (je eine Datei in ./themen/) in Stoff-Reihenfolge einsortiert;
// die bestehenden 16 Karten bleiben unverändert. nr wird aus der Position vergeben.
export const themen: Thema[] = [
  ...bestehende.slice(0, 11),          // SQL-Grundlagen (grundabfrage … insert)
  relationaleAlgebra,                  // relationale Algebra: Operatoren
  ...bestehende.slice(11, 15),         // sql-zu-algebra, er-modell, min-max, er-zu-schema
  referentielleIntegritaet,            // — Kapitel 5: Datenintegrität —
  integritaetsbedingungen,
  trigger,
  temporaleDaten,
  funktionaleAbhaengigkeiten,          // — Kapitel 6: Entwurfstheorie —
  attributhuelleSchluessel,
  normalformen,
  bcnfZerlegung,
  verlustlosigkeitAbhaengigkeit,
  ...bestehende.slice(15),             // normalisierung-bcnf (bestehende Zusammenfassung/Capstone)
].map((t, i) => ({ ...t, nr: i + 1 }))
