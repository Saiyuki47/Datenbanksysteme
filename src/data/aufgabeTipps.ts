import type { TippSection } from '../types'

export const aufgabeTipps: Record<string, TippSection[]> = {

  // ── Blatt 0 (SQL auf Pine Valley Furniture) ────────────────────────────────

  'blatt0-1': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'SELECT DISTINCT entfernt doppelte Zeilen aus dem Ergebnis. Ohne DISTINCT erscheint jede Stadt so oft, wie es Kunden in ihr gibt.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Welche Tabelle enthält Kundenstädte? → CUSTOMER_T\n2. Welche Spalte enthält die Stadt? → CUSTOMERCITY\n3. DISTINCT verwenden, um Städte nur einmal auszugeben.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'SELECT DISTINCT spalte\nFROM tabelle;',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Vergessen von DISTINCT führt zu Duplikaten. ORDER BY ist nicht verlangt – Reihenfolge ist beliebig, solange nichts anderes angegeben ist.',
    },
  ],

  'blatt0-2': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'WHERE filtert Zeilen nach einer oder mehreren Bedingungen. Nur Zeilen, bei denen die Bedingung TRUE ergibt, landen im Ergebnis.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Welche Tabelle? → CUSTOMER_T\n2. Gesucht: CUSTOMERNAME\n3. Bedingungen: CUSTOMERCITY = \'Clearwater\' und CUSTOMERSTATE = \'FL\'',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'SELECT CUSTOMERNAME\nFROM CUSTOMER_T\nWHERE CUSTOMERCITY = \'Clearwater\'\n  AND CUSTOMERSTATE = \'FL\';',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'String-Werte müssen in einfache Anführungszeichen. Groß-/Kleinschreibung beachten: \'clearwater\' ≠ \'Clearwater\'.',
    },
  ],

  'blatt0-3': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Ein JOIN verknüpft zwei Tabellen über gemeinsame Attribute (Fremdschlüssel → Primärschlüssel). Hier verbindet ORDER_T.CUSTOMERID die Bestelltabelle mit der Kundentabelle.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Ziel: Postleitzahl des Kunden zur Bestellung 1008\n2. Bestellung 1008 liegt in ORDER_T → enthält CUSTOMERID\n3. Postleitzahl liegt in CUSTOMER_T → verknüpfe über CUSTOMERID\n4. WHERE ORDERID = 1008',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'SELECT c.CUSTOMERPOSTALCODE\nFROM ORDER_T o\n  JOIN CUSTOMER_T c ON o.CUSTOMERID = c.CUSTOMERID\nWHERE o.ORDERID = 1008;',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Die ON-Bedingung beim JOIN nicht vergessen – ohne sie entsteht ein kartesisches Produkt (alle Kombinationen). Bei gleichnamigen Spalten Tabellenpräfix angeben.',
    },
  ],

  'blatt0-4': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Mehrere JOINs können kettenweise aufgebaut werden. Die Fremdschlüssel-Kette lautet: ORDERLINE_T.ORDERID → ORDER_T, ORDERLINE_T.PRODUCTID → PRODUCT_T.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Produktbeschreibungen liegen in PRODUCT_T\n2. Welche Produkte sind auf Bestellung 1008? → ORDERLINE_T mit ORDERID = 1008\n3. Join ORDERLINE_T ⋈ PRODUCT_T über PRODUCTID\n4. Filter: WHERE ORDERID = 1008',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'SELECT p.PRODUCTDESCRIPTION\nFROM ORDERLINE_T ol\n  JOIN PRODUCT_T p ON ol.PRODUCTID = p.PRODUCTID\nWHERE ol.ORDERID = 1008;',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Bei mehreren JOINs jede ON-Bedingung separat angeben. Ohne WHERE-Filter erhält man die Produktliste aller Bestellungen.',
    },
  ],

  // ── Blatt 1 (Grundlagen / Theorie) ────────────────────────────────────────

  'blatt1-1': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Ein DBMS löst genau die Nachteile reiner Dateiverwaltung. Die 7 Standardnachteile sind: Redundanz & Inkonsistenz, beschränkter Datenzugriff, Datenisolation, Integritätsprobleme, Atomarität, Mehrbenutzerbetrieb, Sicherheit.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Jeden der 7 Nachteile kurz erklären\n2. Zu jedem Nachteil ein konkretes Beispiel aus dem Bibliotheks-Anwendungsfall nennen\n3. Über den Anwendungsfall hinaus denken: Datensicherung, Zugriffskontrolle',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'Redundanz: Buchtitel steht in "Buch" und "Ausleihe" → Änderung an einer Stelle führt zu Widerspruch.\nMehrbenutzerbetrieb: Zwei Bibliothekare verleihen gleichzeitig das letzte Exemplar.',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Nicht nur benennen – auch erläutern und ein Beispiel geben. Redundanz und Inkonsistenz sind verwandt, aber zu trennen: Redundanz ist die Ursache, Inkonsistenz die Folge.',
    },
  ],

  'blatt1-2': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Das alte File-Processing-System von PVFC hat dieselben Grundprobleme wie in Aufgabe 1: jede Anwendung pflegt eigene Dateien, was Redundanz und fehlende Integration erzeugt.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: 'a) Figure 1-2 analysieren: Welche Anwendungen haben eigene Dateien? Wo entstehen Redundanz und Inkonsistenz?\nb) Den zugeteilten Abschnitt des Fallstudien-Textes lesen und in Stichpunkten auf dem Etherpad zusammenfassen.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'Kernprobleme: getrennte Dateien je Anwendungsbereich, keine zentrale Verwaltung, Daten werden mehrfach gehalten (z. B. Kundendaten in Bestell- und Rechnungssystem).',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Teil b) ist eine kollaborative Aufgabe – jede Gruppe fasst nur ihren Abschnitt zusammen. Der Inhalt hängt vom zugeteilten Abschnitt ab.',
    },
  ],

  'blatt1-3': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Relationales Modell: Daten in Tabellen, Beziehungen über Fremdschlüssel, Abfragen per SQL/JOIN.\nGraphdatenbank: Knoten (Entitäten) + Kanten (Beziehungen) direkt gespeichert → effizient für stark vernetzte Daten.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: 'a) Unterschied + je 2 Einsatzgebiete pro Modell\nb.a) Schema = formale Strukturbeschreibung (Bauplan)\nb.b) Vorteile (Integrität, Konsistenz) vs. Nachteile (weniger flexibel, Migrationen) für Entwickler und Anwender',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'Relationale DB: ERP, Bankensysteme, Lagerverwaltung\nGraph-DB: soziale Netzwerke, Empfehlungssysteme, Betrugserkennung\nSchema: welche Tabellen, Attribute, Datentypen, Constraints – der "Bauplan" der Datenbank.',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Schema ≠ Daten: das Schema ist der Bauplan, die konkreten Einträge sind die Ausprägung. Tief verknüpfte Daten per JOIN im relationalen Modell sind teuer – das ist der Hauptvorteil von Graphdatenbanken.',
    },
  ],

  'blatt1-4': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Lost Update: Beide Transaktionen lesen denselben Ausgangswert x. Jede berechnet ihren neuen Wert unabhängig. Die zweite Schreiboperation überschreibt die erste – die Änderung von T1 geht verloren.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Ablauf mit den Operationen lesen, berechnen, schreiben aufstellen\n2. Beide Transaktionen verzahnen: T1 liest, T2 liest, T1 schreibt, T2 schreibt\n3. Endstand zeigen: x − z statt x − y − z\n4. Erklären: T2 hatte noch den alten Wert x gelesen',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'T1: liest x → berechnet x−y → schreibt x−y\nT2: liest x → berechnet x−z → schreibt x−z\nEndstand: x−z (korrekt wäre x−y−z)',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Der Ablauf muss die kritische Verzahnung zeigen: T2 muss VOR dem Schreibvorgang von T1 lesen. Abhilfe: Nebenläufigkeitskontrolle (Sperren/Locks) → Serialisierung der Zugriffe.',
    },
  ],

  // ── Probeklausur 1 – Aufgabe 1 (SQL auf Relation T) ──────────────────────

  'probeklausur1-1': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'GROUP BY C bildet eine Gruppe pro Farbwert in Spalte C. COUNT(*) zählt die Anzahl der Zeilen je Gruppe. Das Ergebnis hat eine Zeile pro Farbe.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Alle 12 Zeilen durchgehen und jede Farbe ihrer Gruppe zuordnen\n2. Je Farbe zählen: rot=3, blau=3, grün=2, violett=2, gelb=2\n3. Kontrolle: Summe = 12 = Gesamtzahl',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'SELECT C, COUNT(*)\nFROM T\nGROUP BY C;\n\n-- Alle Spalten in SELECT müssen entweder in GROUP BY stehen oder aggregiert sein.',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Ohne GROUP BY würde COUNT(*) die Gesamtzahl aller Zeilen liefern (12). Die Reihenfolge der Ergebniszeilen ist ohne ORDER BY beliebig.',
    },
  ],

  'probeklausur1-2': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'HAVING filtert Gruppen nach dem GROUP BY – analog zu WHERE, aber auf aggregierten Werten. Hier: nur Gruppen behalten, deren SUM(B) genau 30 größer als SUM(D) ist.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Je Farbe SUM(B) und SUM(D) berechnen\n2. Bedingung prüfen: SUM(B) = SUM(D) + 30?\n3. rot: 140 = 110 + 30 ✓; violett: 130 = 100 + 30 ✓',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'SELECT C, SUM(B), SUM(D)\nFROM T\nGROUP BY C\nHAVING SUM(B) = SUM(D) + 30;\n\n-- HAVING kommt immer NACH GROUP BY.',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'WHERE statt HAVING verwenden: WHERE kann keine Aggregatfunktionen enthalten. Die Zwischenrechnung je Gruppe sorgfältig aufschreiben, um Rechenfehler zu vermeiden.',
    },
  ],

  'probeklausur1-3': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Die Reihenfolge der Auswertung: WHERE filtert Zeilen VOR der Gruppierung; GROUP BY + HAVING wirken danach. Erst WHERE, dann GROUP BY, dann HAVING.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. WHERE D > 30 anwenden → 5 Zeilen übrig (D=40 rot, D=40 grün, D=100 violett, D=50 blau, D=40 rot)\n2. GROUP BY C auf diesen 5 Zeilen\n3. HAVING COUNT(*) >= 2 → nur rot (2 Zeilen)',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'SELECT C, COUNT(*)\nFROM T\nWHERE D > 30\nGROUP BY C\nHAVING COUNT(*) >= 2;\n\n-- Auswertungsreihenfolge: FROM → WHERE → GROUP BY → HAVING → SELECT',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'WHERE und HAVING verwechseln. WHERE kennt keine Aggregatfunktionen – WHERE COUNT(*) >= 2 ist ein Syntaxfehler. Immer erst WHERE-Ergebnis aufschreiben, dann gruppieren.',
    },
  ],

  'probeklausur1-4': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'FROM T T1, T T2 erzeugt das kartesische Produkt (12×12 = 144 Zeilen). WHERE T1.B = T2.D wählt nur die Paare, bei denen der B-Wert von T1 gleich dem D-Wert von T2 ist.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Häufigkeit jedes Werts in Spalte B zählen\n2. Häufigkeit jedes Werts in Spalte D zählen\n3. Für gemeinsame Werte: Treffer = Anzahl(B=v) × Anzahl(D=v)\n4. Summe: v=10: 3×2=6, v=20: 1×2=2, v=30: 1×2=2, v=40: 1×3=3, v=50: 2×1=2 → Gesamt: 15',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'SELECT COUNT(*)\nFROM T T1, T T2\nWHERE T1.B = T2.D;\n\n-- Self-Join: dieselbe Tabelle unter zwei Aliasnamen ansprechen.',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Nicht alle 144 Paare einzeln durchgehen – die Häufigkeitsmethode ist effizienter. Werte, die nur in B oder nur in D vorkommen (z.B. 80, 90, 100), liefern keine Treffer.',
    },
  ],

  'probeklausur1-5': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'GROUP BY kann auch auf einem berechneten Ausdruck wie LENGTH(C) stattfinden – nicht nur auf rohen Spalten. Alle Zeilen mit gleichem LENGTH(C) landen in derselben Gruppe.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Länge jeder Farbe bestimmen: rot=3, blau=4, grün=4, gelb=4 (ü zählt als 1), violett=7\n2. Zeilen je Länge zählen: Länge 3 → 3 Zeilen, Länge 4 → 7, Länge 7 → 2\n3. Kontrolle: 3+7+2 = 12',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'SELECT LENGTH(C), COUNT(*)\nFROM T\nGROUP BY LENGTH(C);\n\n-- LENGTH() zählt Zeichen, nicht Bytes. ü ist 1 Zeichen.',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Sonderzeichen (ü, ö, ä) zählen je nach Datenbank ggf. als mehrere Bytes, aber als 1 Zeichen. Im Kontext dieser Aufgabe gilt ü = 1 Zeichen → grün hat Länge 4.',
    },
  ],

  'probeklausur1-6': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Bei einer IN-Unterabfrage wird die innere Abfrage zuerst ausgewertet. Das Ergebnis ist eine Menge von Werten; die äußere Abfrage wählt dann alle Zeilen, deren Spalte in dieser Menge liegt.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Unterabfrage auswerten: 2*A > D → Zeilen 4, 6, 12 → B ∈ {120, 80, 140}\n2. Äußere Abfrage: Zeilen, deren B-Wert in {80, 120, 140} liegt\n3. Das sind genau die Zeilen 4, 6, 12',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'SELECT A, B, D\nFROM T\nWHERE B IN (SELECT B FROM T WHERE 2*A > D);\n\n-- Zuerst Unterabfrage, dann äußere Abfrage auswerten.',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Die Unterabfrage liefert eine Menge (Duplikate werden ignoriert). Darauf achten, dass die Unterabfrage dieselbe Tabelle T referenziert – sie ist von der äußeren unabhängig (keine korrelierte Unterabfrage).',
    },
  ],

  // ── Probeklausur 1 – Aufgabe 2 (Relationenalgebra) ────────────────────────

  'probeklausur1-21': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'SQL → Relationenalgebra: FROM = Kreuzprodukt (×), WHERE mit Gleichheitsbedingung zweier Tabellen = Join (⋈), WHERE mit einseitiger Bedingung = Selektion (σ), SELECT spalten = Projektion (π), SELECT * = keine Projektion.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. FROM V, W → V × W\n2. WHERE V.B = W.B → Equi-Join V ⋈[V.B=W.B] W\n3. WHERE V.A < 4 → σ[V.A < 4]\n4. SELECT * → keine Projektion nötig\n5. Zusammensetzen: σ[V.A < 4] ( V ⋈[V.B=W.B] W )',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'σ[V.A < 4] ( V ⋈[V.B = W.B] W )\n\nGleichwertig mit:\nσ[V.B = W.B ∧ V.A < 4] ( V × W )',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'SELECT * bedeutet KEINE Projektion (häufiger Fehler: trotzdem π schreiben). Die zwei WHERE-Bedingungen müssen mit ∧ (UND) verknüpft werden, nicht mit ∨ (ODER).',
    },
  ],

  'probeklausur1-22': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'SELECT B FROM V entspricht der Projektion π[B](V). UNION in SQL entspricht dem Mengenoperator ∪ (Vereinigung) in der Relationenalgebra.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. (SELECT B FROM V) → π[B](V)\n2. (SELECT B FROM W) → π[B](W)\n3. UNION → ∪\n4. Ergebnis: π[B](V) ∪ π[B](W)',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'π[B] (V)  ∪  π[B] (W)',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Den falschen Mengenoperator verwenden: ∩ (Schnittmenge) oder × (Kreuzprodukt) statt ∪ (Vereinigung). UNION entfernt automatisch Duplikate (wie ∪ in der Mengenlehre).',
    },
  ],

  'probeklausur1-23': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Relationenalgebra arbeitet auf Mengen (keine Duplikate). SQL arbeitet auf Multimengen (Bags, Duplikate möglich). π[B](V) entfernt Duplikate automatisch; SELECT B FROM V behält sie.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. π[B](V): Menge → { gelb, grün, blau, rot, orange } (5 Werte, keine Duplikate)\n2. SELECT B FROM V: Multimenge → alle 11 B-Werte, mit Duplikaten\n3. Antwort: Nein, sie sind nicht gleich',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: '-- SQL-Äquivalent zur RA-Projektion:\nSELECT DISTINCT B FROM V;\n\n-- Ohne DISTINCT:\nSELECT B FROM V;  -- liefert 11 Zeilen (mit Duplikaten)',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Antwort „ja, sie sind gleich" ohne Begründung. Immer erklären: RA ist mengenwertbasiert (Duplikate entfallen), SQL ist multimengenwertbasiert (Duplikate bleiben). SELECT DISTINCT macht SQL mengenwertbasiert.',
    },
  ],

  // ── Probeklausur 1 – Aufgabe 3 (NULL-Werte) ──────────────────────────────

  'probeklausur1-31': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Jede Rechenoperation mit NULL ergibt NULL. Jeder Vergleich mit NULL ergibt UNKNOWN. In der WHERE-Klausel werden nur Zeilen mit TRUE übernommen – UNKNOWN zählt wie FALSE.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Für jede Zeile B·20 und D/2 berechnen\n2. Ist B NULL (Zeilen 2, 4, 6): Ergebnis = NULL → Vergleich = UNKNOWN → Zeile fällt weg\n3. Sonst: B·20 > D/2 prüfen',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'NULL · 20 = NULL\nNULL > 55 = UNKNOWN → nicht im Ergebnis\n8 · 20 = 160 > 35 → TRUE → im Ergebnis',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'NULL-Zeilen als „Ergebnis 0 > x" oder „falsch" interpretieren – korrekt ist UNKNOWN. UNKNOWN ≠ FALSE, aber WHERE behandelt beides gleich: Zeile wird nicht übernommen.',
    },
  ],

  'probeklausur1-32': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Bei OR reicht es, wenn eine Bedingung TRUE ist. UNKNOWN OR TRUE = TRUE; UNKNOWN OR FALSE = UNKNOWN. B = C ist nie TRUE, da B und C in keiner Zeile gleich sind.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. B = C prüfen: in keiner Zeile gleich (und bei NULL ohnehin UNKNOWN)\n2. C > 90 prüfen: Zeile 2 (C=110 ✓), Zeile 8 (C=110 ✓)\n3. C = NULL (Zeile 7): UNKNOWN → fällt weg',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'Drei-wertige Logik bei OR:\nTRUE  OR UNKNOWN = TRUE\nFALSE OR UNKNOWN = UNKNOWN\nUNKNOWN OR UNKNOWN = UNKNOWN',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Zeile 6 (C=90): 90 > 90 ist FALSE, nicht TRUE. Zeile 7 (C=NULL): NULL > 90 = UNKNOWN → fällt weg. Genau auf die Grenzwerte achten (> nicht >=).',
    },
  ],

  'probeklausur1-33': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'IS NULL ist der korrekte Test auf Nullwerte. Der Vergleich „= NULL" ergibt immer UNKNOWN – auch wenn der Wert tatsächlich NULL ist. „B = NULL" kann daher niemals TRUE werden.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. B = NULL: immer UNKNOWN → trägt nichts bei\n2. D IS NULL: nur Zeile 2 hat D = NULL\n3. Ergebnis: nur Zeile 2 (A=2)',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: '-- Falsch (ergibt immer UNKNOWN):\nWHERE B = NULL\n\n-- Korrekt:\nWHERE B IS NULL',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Häufige Klausurfalle: Auf B = NULL hereinfallen und B IS NULL anwenden. Die Abfrage steht so im Code – sie liefert wirklich nur A=2. Hätte es B IS NULL geheißen, kämen A=2,4,6 heraus.',
    },
  ],

  'probeklausur1-34': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'UNION vereinigt zwei Ergebnismengen und entfernt Duplikate. ORDER BY X am Ende sortiert das kombinierte Ergebnis. NULL-Werte aus Berechnungen landen nicht als reguläre Zeilen im Ergebnis.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Teil 1 (A·B < D, B NULL → weglassen): Zeile 1 (A=1), Zeile 3 (A=3)\n2. Teil 2 (A·D > C): Zeile 1 (B=4), Zeile 3 (B=8), Zeile 5 (B=16), Zeile 8 (B=128)\n3. UNION: {1,3} ∪ {4,8,16,128} = {1,3,4,8,16,128}, aufsteigend sortiert',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: '(SELECT A AS X FROM V WHERE A*B < D)\nUNION\n(SELECT B AS X FROM V WHERE A*D > C)\nORDER BY X;',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'NULL in Berechnungen (z.B. A·NULL) ergibt NULL – diese Zeilen erfüllen keine Bedingung. Zeile 6 (B=NULL): A·D = 6·90 > 90 wäre wahr, aber B=NULL → kein B-Wert im Ergebnis.',
    },
  ],

  'probeklausur1-35': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Self-Join mit zwei Bedingungen: V1.C = V2.D (Verbund) UND V1.B >= V2.A (Filter). Ist V1.B NULL, wird V1.B >= V2.A zu UNKNOWN → das Paar fällt weg.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. V1.C = V2.D suchen: (V1=3, V2=4), (V1=5, V2=5), (V1=8, V2=1), (V1=2, V2=1), (V1=6, V2=6/7)\n2. V1.B >= V2.A prüfen – bei V1.B=NULL: UNKNOWN → weg\n3. Treffer: (3,4), (5,5), (8,1)',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'SELECT V1.A, V2.A\nFROM V V1, V V2\nWHERE V1.C = V2.D\n  AND V1.B >= V2.A;\n\n-- Paare mit V1.B=NULL fallen wegen UNKNOWN weg.',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Nicht alle V1.C = V2.D Kombinationen vergessen. Zeile 6 (B=NULL) bei V1: beide Paare mit V2=(6) und V2=(7) fallen wegen UNKNOWN weg.',
    },
  ],

  'probeklausur1-36': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Diese Teilaufgabe ist laut Anmerkungen NICHT relevant (Oracle-spezifische Join-Syntax mit (+)). Der moderne Äquivalent ist LEFT OUTER JOIN … ON.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: 'Diese Aufgabe kann übersprungen werden. Zum Verständnis: V2.D(+) bedeutet V2 ist die „optionale" Seite (LEFT JOIN von V1 zu V2 über V1.C = V2.D). Alle V1-Zeilen mit A < 6 bleiben erhalten.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: '-- Moderne Schreibweise des Oracle (+):\nSELECT V1.A, V2.A, V1.B + V2.D AS SUMME\nFROM V V1\nLEFT JOIN V V2 ON V1.C = V2.D\nWHERE V1.A < 6\nORDER BY V1.A;',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Diese Aufgabe ist nicht klausurrelevant. Die Oracle-Syntax „(+)" ist veraltet und wird in modernem SQL nicht mehr verwendet.',
    },
  ],

  // ── Probeklausur 1 – Aufgabe 4 (Integritätsbedingungen X1/X2) ─────────────

  'probeklausur1-40': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Integritätsbedingungen (Constraints) schützen die Konsistenz der Datenbank. Typen: PRIMARY KEY (eindeutig + NOT NULL), UNIQUE, CHECK (beliebige Bedingung), FOREIGN KEY (Referenzintegrität).',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: 'Für jedes INSERT systematisch prüfen:\n1. PK-Verletzung (Wert schon vorhanden oder NULL)?\n2. UNIQUE-Verletzung?\n3. CHECK-Bedingungen erfüllt?\n4. Alle FK-Werte in der referenzierten Tabelle vorhanden?\nMaximal eine Bedingung verletzt – bei Treffer sofort stoppen.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'X1-Constraints kurz:\n• X1_CO_1: PK (A, C)\n• X1_CO_2: LENGTH(B) ∈ {3,4,6,7}\n• X1_CO_3: D ∈ {1,2,4,8,16,32,64,128,256}\n• X1_CO_4: UNIQUE (D)',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Die Bedingungen der Reihe nach prüfen und bei der ersten Verletzung aufhören (maximal eine). FK-Prüfung: der Wert muss in der referenzierten Tabelle ALS Schlüssel vorkommen.',
    },
  ],

  'probeklausur1-41': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'UNIQUE D: D = 128 ist bereits in Zeile (12, gelb, 16, 128) vorhanden. Obwohl D = 128 ein erlaubter Wert ist (CHECK X1_CO_3 ✓), verletzt er die Eindeutigkeit.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. PK (A,C) = (1,45): neu ✓\n2. LENGTH(\'magenta\') = 7 ∈ {3,4,6,7} ✓\n3. D = 128 ∈ erlaubte Werte ✓\n4. D = 128 schon vorhanden → X1_CO_4 verletzt ✗',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'INSERT INTO X1 VALUES (1, \'magenta\', 45, 128)\n\nX1_CO_4: UNIQUE (D) → D = 128 bereits vorhanden → verletzt',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Nicht CHECK und UNIQUE verwechseln: CHECK prüft, ob D ein erlaubter Wert ist; UNIQUE prüft, ob D bereits vorkommt. Hier ist CHECK erfüllt, UNIQUE verletzt.',
    },
  ],

  'probeklausur1-42': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'CHECK X1_CO_3: D muss eine der Zweierpotenzen {1,2,4,8,16,32,64,128,256} sein. D = 512 ist keine gültige Zweierpotenz in dieser Liste.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. PK (A,C) = (4,32): neu ✓\n2. LENGTH(\'orange\') = 6 ∈ {3,4,6,7} ✓\n3. D = 512: nicht in {1,2,4,...,256} → X1_CO_3 verletzt ✗',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'INSERT INTO X1 VALUES (4, \'orange\', 32, 512)\n\nX1_CO_3: CHECK (D IN (1,2,4,8,16,32,64,128,256))\n512 ∉ Menge → FALSE → verletzt',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: '512 wäre die nächste Zweierpotenz nach 256, fehlt aber in der Liste. UNIQUE wäre erfüllt (512 noch nicht vergeben), aber CHECK scheitert zuerst.',
    },
  ],

  'probeklausur1-43': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Alle vier X1-Constraints prüfen. Wenn keiner verletzt ist: INSERT ist zulässig.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. PK (A,C) = (11,14): neu ✓\n2. LENGTH(\'orange\') = 6 ✓\n3. D = 8 ∈ {1,2,4,8,...,256} ✓\n4. D = 8 noch nicht vergeben (UNIQUE) ✓\n→ Keine Verletzung',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'INSERT INTO X1 VALUES (11, \'orange\', 14, 8)\n\nAlle Constraints: ✓ → zulässig',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Alle vier Constraints durchprüfen, auch wenn die ersten drei stimmen. Erst wenn alle grün sind, ist die Antwort „keine Verletzung".',
    },
  ],

  'probeklausur1-44': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'CHECK X1_CO_2: LENGTH(B) muss in {3, 4, 6, 7} liegen. \'gruen\' hat 5 Zeichen (kein ü!) und liegt damit außerhalb der erlaubten Längen.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. PK (A,C) = (10,15): neu ✓\n2. LENGTH(\'gruen\') = 5 ∉ {3,4,6,7} → X1_CO_2 verletzt ✗',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'INSERT INTO X1 VALUES (10, \'gruen\', 15, 4)\n\nX1_CO_2: CHECK (LENGTH(B) IN (3,4,6,7))\nLENGTH(\'gruen\') = 5 ∉ Menge → FALSE → verletzt',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: '\'gruen\' hat 5 Buchstaben – auf ASCII-Schreibweise achten. Im Gegensatz zu \'grün\' (4 Zeichen) hat die ASCII-Variante \'gruen\' 5 Zeichen.',
    },
  ],

  'probeklausur1-45': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Für X2-INSERTs: X2_CO_2 prüft (A,B) als Paar gegen X1(A,C). X2_CO_3 prüft E gegen X1(D). Beide FK-Werte müssen in X1 als gültige Einträge vorhanden sein.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. PK (A,E) = (1,256): neu ✓\n2. FK (A,B) = (1,2): (A=1,C=2) in X1 ✓\n3. FK E = 256: in X1.D ✓\n4. D = 12 ∈ [12,16] ✓\n→ Keine Verletzung',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'INSERT INTO X2 VALUES (1, 2, 3, 12, 256)\n\nX2_CO_2: (A,B)=(1,2) → in X1: Zeile (1,blau,2,16) hat (A=1,C=2) ✓\nX2_CO_3: E=256 → in X1.D ✓',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'FK X2_CO_2 verweist auf X1(A,C) – nicht auf X1(A,B). Das Paar (A,B) aus X2 wird mit (A,C) aus X1 verglichen.',
    },
  ],

  'probeklausur1-46': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'X2_CO_2: FOREIGN KEY (A,B) REFERENCES X1(A,C). Das Paar (A=2, B=9) muss als (A=2, C=9) in X1 vorhanden sein – das ist nicht der Fall.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. PK (A,E) = (2,128): neu ✓\n2. FK (A,B) = (2,9): X1 hat (A=2) nicht (nur A=1,3,5,9,12) → X2_CO_2 verletzt ✗',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'INSERT INTO X2 VALUES (2, 9, NULL, 16, 128)\n\nX1 Paare (A,C): (1,2),(3,4),(5,8),(9,12),(12,16)\n(2,9) fehlt → FK verletzt',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'C = NULL in X2 ist erlaubt (keine NOT NULL). FK (A,B)→X1(A,C) ist das komplexe Paar – beide Werte müssen zusammen in X1 als Zeile (mit diesen A- und C-Werten) vorhanden sein.',
    },
  ],

  'probeklausur1-47': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'X2_CO_4: CHECK (D BETWEEN 12 AND 16). D = 1 liegt nicht in [12, 16].',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. PK (A,E) = (3,256): neu ✓\n2. FK (A,B) = (3,4): in X1 ✓\n3. FK E = 256: in X1.D ✓\n4. D = 1 BETWEEN 12 AND 16 → FALSE → X2_CO_4 verletzt ✗',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'INSERT INTO X2 VALUES (3, 4, 3, 1, 256)\n\nX2_CO_4: D BETWEEN 12 AND 16\nD = 1 → FALSE → verletzt',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'BETWEEN ist inklusiv: 12 ≤ D ≤ 16. D = 1 ist klar außerhalb.',
    },
  ],

  'probeklausur1-48': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'X2_CO_1: PRIMARY KEY (A, E). Das Paar (A=9, E=32) ist bereits in X2 vorhanden (Zeile 9,12,2,14,32).',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. PK (A,E) = (9,32): bereits vorhanden → X2_CO_1 verletzt ✗',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'INSERT INTO X2 VALUES (9, 12, 3, 14, 32)\n\nX2 enthält bereits (A=9, ..., E=32) → PK-Duplikat',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Den Datenbestand sorgfältig prüfen: (9,12,2,14,32) ist vorhanden → (A=9, E=32) ist kein neues Paar.',
    },
  ],

  'probeklausur1-49': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Alle X2-Constraints prüfen. Wenn keiner verletzt ist: zulässig.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. PK (A,E) = (5,256): neu ✓\n2. FK (A,B) = (5,8): in X1 als (A=5,C=8) ✓\n3. FK E = 256: in X1.D ✓\n4. D = 13 ∈ [12,16] ✓\n→ Keine Verletzung',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'INSERT INTO X2 VALUES (5, 8, 3, 13, 256)\n\nAlle Constraints: ✓ → zulässig',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Vollständig alle 4 Constraints prüfen, nicht vorzeitig aufhören.',
    },
  ],

  'probeklausur1-50': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'X2_CO_3: FOREIGN KEY (E) REFERENCES X1(D). E = 512 muss als D-Wert in X1 vorhanden sein. X1.D = {16, 32, 64, 256, 128} – 512 fehlt.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. PK (A,E) = (5,512): neu ✓\n2. FK (A,B) = (5,8): in X1 ✓\n3. FK E = 512: nicht in X1.D → X2_CO_3 verletzt ✗',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'INSERT INTO X2 VALUES (5, 8, NULL, 12, 512)\n\nX1.D = {16,32,64,256,128}\n512 ∉ X1.D → FK verletzt',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'PK (5, 512) wäre neu und zulässig, aber der FK auf E = 512 scheitert. FK-Prüfung: der Wert muss EXISTIEREN, nicht nur gültig sein.',
    },
  ],

  // ── Probeklausur 2 – Aufgabe 1 (ER-Begriffe) ─────────────────────────────

  'probeklausur2-1': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Im ER-Modell: Kasten = Entitätstyp (Klasse von Objekten), Raute = Beziehungstyp, Oval = Attribut, unterstrichenes Oval = Schlüsselattribut.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: 'A ist ein Kasten → Entitätstyp. Nicht Entität (das wäre eine konkrete Ausprägung, z.B. „Max Mustermann").',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'Entitätstyp = Klasse/Schablone (z.B. „Student")\nEntität = konkretes Objekt (z.B. „Max, MatrNr 12345")',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Entitätstyp ≠ Entität. Der Kasten beschreibt den Typ, nicht eine konkrete Instanz.',
    },
  ],

  'probeklausur2-2': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Rauten im ER-Modell stehen für Beziehungstypen (Relationships). Sie verknüpfen zwei oder mehr Entitätstypen.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: 'B ist eine Raute → Beziehungstyp / Beziehung / Relation. „besucht" beschreibt, wie Student und Vorlesung zusammenhängen.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'Beziehungstyp (Raute): verbindet Entitätstypen\nBeispiele: „besucht", „arbeitet_in", „hat_bestellt"',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Nicht „Relation" im Sinne von Datenbanktabelle verwechseln. Im ER-Kontext heißt die Raute Beziehungstyp oder Relationship.',
    },
  ],

  'probeklausur2-3': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Unterstrichene Attribute im ER-Diagramm sind Schlüsselattribute: Sie identifizieren eine Entität eindeutig.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: 'C ist ein unterstrichenes Oval → Schlüsselattribut. MatrNr identifiziert jeden Studenten eindeutig.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'Schlüsselattribut: unterstrichen im ER-Diagramm\nBeispiele: MatrNr (Student), ISBN (Buch), ArtikelNr (Produkt)',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Nicht „Primärschlüssel" sagen (das ist der relationale Begriff). Im ER-Modell heißt es Schlüsselattribut.',
    },
  ],

  'probeklausur2-4': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Nicht unterstrichene Ovale sind gewöhnliche Attribute. Sie beschreiben die Entität, identifizieren sie aber nicht eindeutig.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: 'D ist ein nicht unterstrichenes Oval → (normales) Attribut. „Name" beschreibt den Studenten, ist aber nicht eindeutig (mehrere Studenten können denselben Namen haben).',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'Attribut (Oval, nicht unterstrichen): beschreibt Eigenschaften\nBeispiele: Name, Geburtstag, Credits, Titel',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Den Unterschied zum Schlüsselattribut beachten: das Erkennungsmerkmal ist die Unterstreichung.',
    },
  ],

  'probeklausur2-5': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Die Kardinalität gibt an, wie viele Entitäten der einen Seite mit wie vielen der anderen in Beziehung stehen. n:m = viele-zu-viele: beide Seiten können mehrere Partner haben.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Kante E (Student–besucht): Ein Student kann mehrere Vorlesungen besuchen → Vorlesungs-Seite „viele"\n2. Kante F (besucht–Vorlesung): Eine Vorlesung hat mehrere Studenten → Studenten-Seite „viele"\n3. Beide Seiten viele → n:m',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: '1:1 – Ein Chef hat genau eine Sekretärin\n1:N – Eine Abteilung hat viele Mitarbeiter\nn:m – Studenten besuchen viele Vorlesungen, Vorlesungen haben viele Studenten',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Richtung beachten: immer BEIDE Richtungen prüfen. Nur wenn BEIDE Seiten „viele" sagen können, ist es n:m.',
    },
  ],

  // ── Probeklausur 2 – Aufgabe 2 (ER → Schema) ─────────────────────────────

  'probeklausur2-11': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Standardregel: Jeder Entitätstyp → eigene Relation. Jede Beziehung → eigene Relation mit den Schlüsseln beider Entitätstypen als Fremdschlüssel, plus eigene Beziehungsattribute.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Entitätstyp A → Relation A: {[a]}\n2. Entitätstyp B → Relation B: {[b]}\n3. Beziehung R → Relation R: {[a, b, r]}, PK = (a, b)',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'A: {[a]}      -- Schlüssel: a\nB: {[b]}      -- Schlüssel: b\nR: {[a, b, r]} -- Schlüssel: (a,b); a→A, b→B als FK; r Beziehungsattribut',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Das Beziehungsattribut r gehört in die Beziehungsrelation R, nicht in A oder B. Der PK von R ist das Paar (a, b).',
    },
  ],

  'probeklausur2-12': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Bei einer 1:N-Beziehung ist eine eigene Beziehungsrelation unnötig. Der Schlüssel der 1-Seite wird als Fremdschlüssel in die N-Seite eingebettet.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. 1-Seite ist A, N-Seite ist B\n2. R in B einbauen: B bekommt FK a (von A) und das Attribut r\n3. Ergebnis: A: {[a]}, B: {[a, b, r]}, PK von B bleibt b',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'A: {[a]}\nB: {[a, b, r]}  -- b ist PK; a ist FK zu A; r ist Beziehungsattribut\n\n-- R entfällt als eigene Relation',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Die Einbettung geht in die N-Seite (B), nicht in die 1-Seite (A). Der PK von B bleibt b, nicht (a,b).',
    },
  ],

  // ── Probeklausur 2 – Aufgabe 3 (min,max-Notation) ────────────────────────

  'probeklausur2-21': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: '[0,n] bedeutet: mindestens 0, höchstens beliebig viele. Diese Angabe ist immer trivial korrekt, da sie durch keine Ausprägung widerlegt werden kann.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: 'min = 0: kein Bier muss Bestseller sein → immer möglich\nmax = n: beliebig viele → keine Obergrenze → immer möglich\n→ Korrekt',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: '(min,max) lesen: Angabe an der Seite eines Entitätstyps gibt an,\nwie viele Beziehungen DIESE Entität eingeht.\n[0,n]: mindestens 0, höchstens unbegrenzt viele',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: '[0,n] ist niemals falsch – wenn die Aufgabe fragt ob es korrekt ist, ist es immer korrekt. Die Frage ist meist, ob eine spezifischere Angabe besser passt.',
    },
  ],

  'probeklausur2-22': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: '[1,1] an KNEIPE-Seite würde bedeuten: jede Kneipe hat genau einen Bestseller. PietsPub fehlt aber in BESTSELLER → min muss 0 sein.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. BESTSELLER-Ausprägung prüfen: OskarsOase→Klecksex, SamsSpelunke→Montcroix\n2. PietsPub: kommt nicht vor → 0 Bestseller\n3. [1,1] falsch → korrekt wäre [0,1]',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'BESTSELLER:\nOskarsOase   → Klecksex\nSamsSpelunke → Montcroix\n(PietsPub fehlt → min=0)\nMax je Kneipe = 1 → max=1\n→ Korrekt: [0,1]',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Nicht vergessen: die KONKRETE Ausprägung aus den Tabellen bestimmt min und max. Wenn auch nur eine Entität gar nicht vorkommt, muss min = 0 sein.',
    },
  ],

  'probeklausur2-23': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: '[0,2] an KNEIPE-Seite von VERKAUFT würde bedeuten: jede Kneipe verkauft höchstens 2 Biere. Tatsächlich verkaufen OskarsOase und SamsSpelunke je 3 Biere.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Aus VERKAUFT-Ausprägung: PietsPub = 0 Biere, OskarsOase = 3, SamsSpelunke = 3\n2. min = 0 ✓ (PietsPub kommt nicht vor)\n3. max = 3 ✗ (nicht 2)\n→ Korrekt wäre [0,3]',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'VERKAUFT (Kneipe-Seite):\nPietsPub → 0 Biere  (min=0)\nOskarsOase → 3 Biere\nSamsSpelunke → 3 Biere  (max=3)\n→ [0,3]',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'max-Wert aus der Tabelle ablesen, nicht schätzen. Der größte tatsächlich vorkommende Wert bestimmt die Obergrenze.',
    },
  ],

  'probeklausur2-24': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: '[1,n] an BIER-Seite von VERKAUFT würde bedeuten: jedes Bier wird in mindestens einer Kneipe verkauft. Meerdinger fehlt in VERKAUFT → min muss 0 sein.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Wie oft kommt jedes Bier in VERKAUFT vor?\n2. Meerdinger: gar nicht → min = 0, nicht 1\n3. Maximale Anzahl Kneipen je Bier: höchstens 2\n→ Korrekt wäre [0,2]',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'VERKAUFT (Bier-Seite):\nMeerdinger → 0 Kneipen  (min=0, nicht 1)\nmax = 2 Kneipen je Bier\n→ [0,2] (oder allgemein [0,n])',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: '[1,n] bedeutet: ALLE Biere sind in mindestens einer Kneipe vertreten. Gegenbeispiel Meerdinger widerlegt das.',
    },
  ],

  'probeklausur2-25': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: '[1,2] an BIER-Seite von BRAUT würde bedeuten: jedes Bier wird von mindestens einer Brauerei gebraut. Meerdinger und Klecksdry fehlen in BRAUT.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Meerdinger in BRAUT? → Nein\n2. Klecksdry in BRAUT? → Nein\n3. min = 0, nicht 1\n4. max = 2 könnte stimmen (max 2 Brauereien je Bier)\n→ Korrekt wäre [0,2]',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'BRAUT (Bier-Seite):\nMeerdinger → 0 Brauereien (min=0)\nKlecksdry → 0 Brauereien\nmax = 2 Brauereien je Bier\n→ [0,2]',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Auch hier gilt: fehlt eine Entität komplett in der Beziehungsrelation, muss min = 0.',
    },
  ],

  'probeklausur2-26': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: '[2,4] an BRAUEREI-Seite von BRAUT bedeutet: jede Brauerei braut mindestens 2 und höchstens 4 Biere. Die Ausprägung bestätigt das.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Klecks braut 2 Biere → min = 2 ✓\n2. Rotstift braut 4 Biere → max = 4 ✓\n3. Beide Brauereien haben zwischen 2 und 4 Biere → [2,4] korrekt',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'BRAUT (Brauerei-Seite):\nKlecks  → 2 Biere  (min=2)\nRotstift → 4 Biere  (max=4)\n→ [2,4] korrekt ✓',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Wenn die Ausprägung genau passt (min und max aus den Daten ablesen), ist die Angabe korrekt. Hier gibt es kein Gegenbeispiel.',
    },
  ],

  'probeklausur2-27': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Die Anmerkungen erklären die Grundprinzipien für alle (min,max)-Fragen: die tatsächliche Ausprägung in den Tabellen bestimmt die korrekten Werte.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: 'Für (min,max) systematisch vorgehen:\n1. Alle Entitäten des Typs auflisten\n2. Für jede zählen, wie viele Beziehungen sie eingeht\n3. Minimum und Maximum aus diesen Zahlen ablesen',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'min = kleinste Anzahl von Beziehungen einer Entität\nmax = größte Anzahl von Beziehungen einer Entität\n\nHauptfehlerquelle: min=1, obwohl eine Entität 0 Beziehungen hat',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Entitäten, die in der Beziehungsrelation gar nicht auftauchen, haben 0 Beziehungen → min = 0. Immer alle Entitäten prüfen, nicht nur die vorkommenden.',
    },
  ],

  // ── Probeklausur 2 – Aufgabe 5 (Integritätsbedingungen S/R) ──────────────

  'probeklausur2-41': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Wichtigste Regel dieser Aufgabe: CHECK gilt als ERFÜLLT, wenn der Ausdruck TRUE ODER UNKNOWN ergibt. Ein CHECK schlägt nur bei FALSE fehl. CS4 (D = NULL) ist daher NIE verletzbar.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: 'Systematisch für jede Anweisung:\n1. PK-Verletzung? (NOT NULL + eindeutig)\n2. UNIQUE verletzt?\n3. CHECKs: FALSE → verletzt; TRUE/UNKNOWN → OK\n4. FK-Wert vorhanden (oder NULL)?',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'S.A = {1,2,3,4,8,9} (existierende A-Werte)\nR.(A,B) = {(2,1),(3,4),(2,2),(4,1),(1,3)}\n\nCS8: (B<G) OR ((A=2) AND (A=C))\n→ AND bindet stärker als OR!',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'CS4 = CHECK (D = NULL) niemals als Verletzung angeben. AND bindet stärker als OR in CS8. NULL-FK ist zulässig (kein Fehler), NULL-PK ist nicht zulässig.',
    },
  ],

  'probeklausur2-42': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'CS2: UNIQUE (E). E = 4 ist in S bereits vorhanden (Zeile A=2 hat E=4).',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: 'A=5, D=4, E=4\n1. CS1 (PK A=5): neu ✓\n2. CS2 (UNIQUE E=4): E=4 existiert bereits → verletzt ✗',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'INSERT INTO S VALUES (5, 4, 4)\n\nS enthält Zeile (A=2, D=4, E=4) → E=4 bereits vergeben\n→ CS2 verletzt',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'UNIQUE-Verletzung gilt unabhängig davon, ob der A-Wert neu ist.',
    },
  ],

  'probeklausur2-43': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'CS5: FOREIGN KEY (E) REFERENCES S(A). E = 5 muss als A-Wert in S vorkommen. S.A = {1,2,3,4,8,9} enthält keine 5.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: 'A=7, D=NULL, E=5\n1. CS1 (PK A=7): neu ✓\n2. CS2 (E=5): noch nicht vergeben ✓\n3. CS3/CS6: D=NULL → UNKNOWN → OK ✓\n4. CS5 (FK E=5): 5 ∉ S.A → verletzt ✗',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'INSERT INTO S VALUES (7, NULL, 5)\n\nS.A = {1,2,3,4,8,9} → 5 fehlt → CS5 verletzt',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'NULL in D lässt CS3 und CS6 als UNKNOWN erscheinen → gilt als erfüllt. Nur CS5 scheitert am konkreten E-Wert.',
    },
  ],

  'probeklausur2-44': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'E = NULL: UNIQUE verletzt NULL nicht (mehrere NULL-Werte sind erlaubt). FK = NULL ist zulässig. CHECKs mit NULL werden UNKNOWN → gelten als erfüllt.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: 'A=5, D=2, E=NULL\n1. CS1 (PK A=5): neu ✓\n2. CS2 (UNIQUE E=NULL): NULL verletzt UNIQUE nicht ✓\n3. CS5 (FK E=NULL): NULL-FK zulässig ✓\n4. CS3/CS6: E=NULL → UNKNOWN → OK ✓\n→ Keine Verletzung',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'INSERT INTO S VALUES (5, 2, NULL)\n\nAlle Constraints: ✓ → zulässig (OK)',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'NULL in UNIQUE-Spalten ist erlaubt. NULL-FK ist erlaubt. CHECKs mit NULL → UNKNOWN → nicht verletzt.',
    },
  ],

  'probeklausur2-45': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'PRIMARY KEY impliziert NOT NULL. A = NULL ist im Primärschlüssel verboten.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: 'A=NULL, D=2, E=2\n1. CS1 (PK A): A=NULL → NOT NULL verletzt → CS1 verletzt ✗',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'INSERT INTO S VALUES (NULL, 2, 2)\n\nPRIMARY KEY → NOT NULL Pflicht\nA=NULL → CS1 verletzt',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Primärschlüssel sind immer NOT NULL – auch ohne expliziten NOT NULL Constraint.',
    },
  ],

  'probeklausur2-46': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'CS6: CHECK (2*E >= 2*D). 2·2 = 4 ≥ 2·3 = 6 → 4 ≥ 6 ist FALSE → verletzt.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: 'A=12, D=3, E=2\n1. CS1 (PK A=12): neu ✓\n2. CS2 (E=2): neu ✓\n3. CS3: (3+2)=5 ≤ 10 → TRUE ✓\n4. CS5 (FK E=2): 2 ∈ S.A ✓\n5. CS6: 2·2=4 ≥ 2·3=6 → FALSE → verletzt ✗',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'INSERT INTO S VALUES (12, 3, 2)\n\nCS6: 2·E = 4, 2·D = 6\n4 ≥ 6 → FALSE → CS6 verletzt',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'CS3 prüfen: (D+E) = 5 ≤ 10 → TRUE → erfüllt. Nur CS6 scheitert.',
    },
  ],

  'probeklausur2-47': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'CS3: (D+E) ≤ 10 OR (A+D) = 2·E. Beide Teilbedingungen müssen FALSE sein, damit CS3 verletzt wird.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: 'A=7, D=6, E=7\n1. CS3: (6+7)=13 ≤ 10 → FALSE; (7+6)=13 = 2·7=14 → FALSE; FALSE OR FALSE = FALSE → CS3 verletzt ✗',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'INSERT INTO S VALUES (7, 6, 7)\n\nCS3 Teil 1: 13 ≤ 10 → FALSE\nCS3 Teil 2: 13 = 14 → FALSE\nFALSE OR FALSE = FALSE → verletzt',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'CS5 (FK E=7): 7 ∉ S.A ist auch verletzt, aber CS3 wird zuerst geprüft (laut Definitionsreihenfolge). Antwort: CS3.',
    },
  ],

  'probeklausur2-48': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'INSERT INTO R. CS8 mit B < G: 8 < 12 = TRUE → sofort erfüllt, der Rest des OR ist irrelevant.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: 'A=3, B=8, C=1, F=3, G=12\n1. CS7 (PK (3,8)): neu ✓\n2. CS8: 8<12 = TRUE ✓\n3. CS9: 3≠1 = TRUE ✓\n4. CS10 (FK B=8): 8 ∈ S.A ✓\n5. CS11 (FK (C,F)=(1,3)): (1,3) ∈ R.(A,B) ✓\n→ Keine Verletzung',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'INSERT INTO R VALUES (3, 8, 1, 3, 12)\n\nAlle Constraints: ✓ → zulässig (OK)',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'R.(A,B) prüfen: (1,3) ∈ {(2,1),(3,4),(2,2),(4,1),(1,3)} ✓ – das Paar ist vorhanden.',
    },
  ],

  'probeklausur2-49': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'CS9: CHECK ((A ≠ C) OR (A = 1)). A=2, C=2: beide Teilbedingungen FALSE → CS9 verletzt.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: 'A=2, B=4, C=2, F=2, G=NULL\n1. CS7 (PK (2,4)): neu ✓\n2. CS8: (B<G)=(4<NULL)=UNKNOWN; (A=2)AND(A=C)=(TRUE)AND(2=2)=TRUE → UNKNOWN OR TRUE = TRUE ✓\n3. CS9: (2≠2)=FALSE; (2=1)=FALSE → FALSE OR FALSE = FALSE → verletzt ✗',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'INSERT INTO R VALUES (2, 4, 2, 2, NULL)\n\nCS9: (A≠C) = FALSE, (A=1) = FALSE\nFALSE OR FALSE = FALSE → CS9 verletzt',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'CS8 mit G=NULL: (B<NULL)=UNKNOWN, aber (A=2)AND(A=C)=TRUE → UNKNOWN OR TRUE = TRUE → CS8 erfüllt! Nur CS9 schlägt fehl.',
    },
  ],

  'probeklausur2-50': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'CS8: (B<G) OR ((A=2) AND (A=C)). B=9, G=4: 9<4=FALSE. A=3≠2: AND-Teil FALSE. FALSE OR FALSE = FALSE → verletzt.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: 'A=3, B=9, C=1, F=3, G=4\n1. CS7 (PK (3,9)): neu ✓\n2. CS8: (9<4)=FALSE; (3=2)=FALSE → AND-Teil FALSE; FALSE OR FALSE = FALSE → verletzt ✗',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'INSERT INTO R VALUES (3, 9, 1, 3, 4)\n\nCS8 Teil 1: 9<4 = FALSE\nCS8 Teil 2: (A=2)=FALSE → AND-Teil FALSE\nFALSE OR FALSE = FALSE → CS8 verletzt',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'AND bindet stärker als OR: CS8 = (B<G) OR ((A=2) AND (A=C)). Klammern im Kopf setzen.',
    },
  ],

  'probeklausur2-51': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'CS7: PRIMARY KEY (A, B) → beide müssen NOT NULL und zusammen eindeutig sein. A=NULL und B=NULL → PK-Verletzung.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: 'A=NULL, B=NULL, C=3, F=4, G=9\n1. CS7: A=NULL → NOT NULL verletzt → CS7 verletzt ✗',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'INSERT INTO R VALUES (NULL, NULL, 3, 4, 9)\n\nCS7 (PK): NULL nicht erlaubt → verletzt',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'PK → implizit NOT NULL für alle Schlüsselattribute.',
    },
  ],

  'probeklausur2-52': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'CS11: FOREIGN KEY (C, F) REFERENCES R(A, B). Das Paar (C=3, F=8) muss als (A,B)-Paar in R vorhanden sein.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: 'A=7, B=2, C=3, F=8, G=9\n1. CS7 (PK (7,2)): neu ✓\n2. CS8: 2<9=TRUE ✓\n3. CS9: 7≠3=TRUE ✓\n4. CS10 (FK B=2): 2 ∈ S.A ✓\n5. CS11 (FK (3,8)): nicht in R.(A,B) → verletzt ✗',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'INSERT INTO R VALUES (7, 2, 3, 8, 9)\n\nR.(A,B) = {(2,1),(3,4),(2,2),(4,1),(1,3)}\n(3,8) fehlt → CS11 verletzt',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'CS11 verweist auf R selbst (selbstrefenzierender FK). R.(A,B) aus dem Datenbestand genau prüfen.',
    },
  ],

  'probeklausur2-53': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'CS10: FOREIGN KEY (B) REFERENCES S(A). B = 5 muss als A-Wert in S vorkommen. S.A = {1,2,3,4,8,9} enthält keine 5.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: 'A=4, B=5, C=2, F=1, G=7\n1. CS7 (PK (4,5)): neu ✓\n2. CS8: 5<7=TRUE ✓\n3. CS9: 4≠2=TRUE ✓\n4. CS10 (FK B=5): 5 ∉ S.A → verletzt ✗',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'INSERT INTO R VALUES (4, 5, 2, 1, 7)\n\nS.A = {1,2,3,4,8,9} → 5 fehlt → CS10 verletzt',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'CS11: (C,F)=(2,1) → (2,1) ∈ R.(A,B) ✓ – das wäre ok. CS10 scheitert früher.',
    },
  ],

  // ── Probeklausur 2 – Aufgabe 6 (Relationale Algebra) ─────────────────────

  'probeklausur2-61': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Komplexe RA-Anfragen von innen nach außen aufbauen: zuerst Sokrates finden, dann seine Vorlesungen, dann die Hörer, dann Studierendendaten ergänzen, zuletzt nach Semester filtern.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. σ[Name=\'Sokrates\'] (Professoren)\n2. ⋈[gelesenVon=PersNr] Vorlesungen → π[VorlNr]\n3. ⋈ hören (über VorlNr)\n4. ⋈ Studenten (über MatrNr)\n5. σ[Semester ≥ 12]',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'σ[Semester ≥ 12] (\n  Studenten ⋈ (\n    hören ⋈ π[VorlNr] (\n      Vorlesungen ⋈[gelesenVon=PersNr]\n        σ[Name=\'Sokrates\'](Professoren)\n    )\n  )\n)',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Die Projektion π[VorlNr] nicht vergessen (sonst bleiben alle Spalten der Professoren im Ergebnis). Der Join Vorlesungen⋈Professoren ist ein Theta-Join (unterschiedliche Attributnamen).',
    },
  ],

  'probeklausur2-62': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Ein Operatorbaum ist die Baumdarstellung des RA-Ausdrucks: Blätter = Basisrelationen, innere Knoten = Operatoren, Wurzel = zuletzt ausgeführte Operation.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Wurzel: σ[Semester ≥ 12]\n2. Darunter: ⋈ (MatrNr) mit Studenten links\n3. Rechts: ⋈ (VorlNr) mit hören links\n4. Rechts: π[VorlNr]\n5. Darunter: ⋈[gelesenVon=PersNr]\n6. Blätter: Vorlesungen und σ[Sokrates](Professoren)',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'σ[Semester ≥ 12]\n└─ ⋈ (MatrNr)\n   ├─ Studenten\n   └─ ⋈ (VorlNr)\n      ├─ hören\n      └─ π[VorlNr]\n         └─ ⋈[gelesenVon=PersNr]\n            ├─ Vorlesungen\n            └─ σ[Name=\'Sokrates\']\n               └─ Professoren',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Wurzel ist die LETZTE Operation (σ[Semester≥12]), Blätter werden ZUERST ausgewertet. Die Reihenfolge der Kinder (links/rechts) spielt bei Join keine Rolle.',
    },
  ],

  // ── Probeklausur 2 – Aufgabe 7 (BCNF / Normalisierung) ───────────────────

  'probeklausur2-71': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Kanonische Überdeckung = minimale äquivalente FD-Menge. Zwei Schritte: 1) Linksreduktion (überflüssige Attribute links eliminieren), 2) Rechtsreduktion (überflüssige Attribute rechts eliminieren).',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Linksreduktion AD→BC: D weglassbar? {A}⁺ = {A,B,C,D} ⊇ {B,C} → ja → A→BC\n2. Rechtsreduktion A→B: redundant (A→D, D→B, Transitivität) → A→C übrig\n3. BC→D: redundant (BC→A, A→D) → BC→A\n4. Ergebnis: A→CD, BC→A, D→B',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'Ausgangsmenge: AD→BC, A→D, BC→AD, D→B\n\nKanonische Überdeckung Fc:\nA  → CD\nBC → A\nD  → B',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Reihenfolge einhalten: erst Linksreduktion, dann Rechtsreduktion. Bei der Rechtsreduktion darf die zu prüfende FD selbst nicht benutzt werden.',
    },
  ],

  'probeklausur2-72': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Attributhülle {X}⁺: Menge aller Attribute, die durch X (mit den gegebenen FDs) bestimmt werden. FDs solange anwenden, bis nichts Neues mehr hinzukommt.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '{A}⁺: A→CD: +C,D → {A,C,D}; D→B: +B → {A,B,C,D} = alle ✓\n{B}⁺: keine FD hat nur B links → {B}',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: '{A}⁺ = {A, B, C, D}  → A bestimmt alles → A ist Schlüsselkandidat\n{B}⁺ = {B}            → B bestimmt nichts außer sich selbst',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Nur FDs aus der kanonischen Überdeckung verwenden (nicht die originalen). Schrittweise vorgehen und alle anwendbaren FDs in jeder Runde prüfen.',
    },
  ],

  'probeklausur2-73': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Kandidatenschlüssel = minimale Attributmenge, deren Hülle alle Attribute ergibt. Minimal = keine echte Teilmenge ist auch schon Schlüssel.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Einzel-Attribute testen: {A}⁺={A,B,C,D} ✓; {B}⁺={B} ✗; {C}⁺={C} ✗; {D}⁺={B,D} ✗\n2. Paare testen: {B,C}⁺={A,B,C,D} ✓; {C,D}⁺={A,B,C,D} ✓\n3. 3 Kandidatenschlüssel: A, BC, CD',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: '{A}⁺  = {A,B,C,D} → Kandidatenschlüssel ✓\n{B,C}⁺ = {A,B,C,D} → Kandidatenschlüssel ✓\n{C,D}⁺ = {A,B,C,D} → Kandidatenschlüssel ✓',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: '{A,B} ist kein minimaler Schlüssel (B ist überflüssig, da A allein reicht). Immer auf Minimalität achten.',
    },
  ],

  'probeklausur2-74': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'BCNF: Für jede nichttriviale FD X→Y muss X ein Superschlüssel sein. D→B verletzt BCNF (D ist kein Superschlüssel). Zerlegung entlang dieser FD.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. FDs auf BCNF prüfen: A→CD ✓ (A ist SK); BC→A ✓ (BC ist SK); D→B ✗ ({D}⁺={B,D}≠{A,B,C,D})\n2. Zerlegung entlang D→B: R1({D}⁺) = R1(B,D); R2 = D + Rest = R2(A,C,D)',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'BCNF-Zerlegung:\nR1(B, D)    -- enthält {D}⁺ = {B,D}\nR2(A, C, D) -- enthält die linke Seite D + restliche Attribute\n\nNicht abhängigkeitserhaltend: BC→A verteilt sich auf R1(B) und R2(C,A)',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'R1 enthält die Hülle der verletzenden FD ({D}⁺ = {B,D}), R2 enthält die linke Seite + alle Attribute, die NICHT abgespalten wurden. BC→A geht verloren → nicht abhängigkeitserhaltend.',
    },
  ],
}
