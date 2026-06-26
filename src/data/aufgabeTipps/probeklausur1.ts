import type { TippSection } from '../../types'

export const probeklausur1Tipps: Record<string, TippSection[]> = {
  // ── Probeklausur 1 – Aufgabe 1 (SQL auf Relation T) ──────────────────────
  // Relation T(A,B,C,D), 12 Zeilen:
  // (1,10,rot,40) (2,10,blau,30) (3,20,grün,20) (4,120,violett,0) (5,50,gelb,20)
  // (6,80,blau,10) (7,30,grün,40) (8,10,violett,100) (9,40,rot,30) (10,50,blau,50)
  // (11,90,rot,40) (12,140,gelb,10)

  'probeklausur1-1': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'GROUP BY <Spalte> fasst alle Zeilen mit demselben Wert in dieser Spalte zu EINER Gruppe zusammen. COUNT(*) zählt, wie viele Zeilen in jeder Gruppe liegen. Hier wird nach Spalte C (der Farbe) gruppiert → das Ergebnis hat eine Zeile pro Farbe samt Anzahl.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: 'Alle 12 Zeilen ihrer Farbe C zuordnen und zählen:\n• rot: Zeilen 1, 9, 11 → 3\n• blau: Zeilen 2, 6, 10 → 3\n• grün: Zeilen 3, 7 → 2\n• violett: Zeilen 4, 8 → 2\n• gelb: Zeilen 5, 12 → 2\nKontrolle: 3+3+2+2+2 = 12 (alle Zeilen).',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'SELECT C, COUNT(*)\nFROM T\nGROUP BY C;\n\n-- Ergebnis (Reihenfolge beliebig):\n-- rot 3, blau 3, grün 2, violett 2, gelb 2',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Ohne GROUP BY liefert COUNT(*) die Gesamtzahl aller Zeilen (12). Jede Spalte im SELECT muss entweder im GROUP BY stehen oder aggregiert sein. Ohne ORDER BY ist die Zeilenreihenfolge beliebig.',
    },
  ],

  'probeklausur1-2': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'SUM(B) bildet die Summe der Spalte B je Gruppe. HAVING filtert NACH der Gruppierung – wie WHERE, aber auf aggregierten Werten (Summen). Hier: je Farbe C die Summen SUM(B) und SUM(D) bilden und nur die Gruppen behalten, bei denen SUM(B) genau 30 größer ist als SUM(D).',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: 'Je Farbe SUM(B) und SUM(D) berechnen, dann SUM(B) = SUM(D)+30 prüfen:\n• rot: B=10+40+90=140, D=40+30+40=110 → 140 = 110+30 ✓\n• blau: B=10+80+50=140, D=30+10+50=90 → 140 ≠ 120 ✗\n• grün: B=20+30=50, D=20+40=60 → 50 ≠ 90 ✗\n• violett: B=120+10=130, D=0+100=100 → 130 = 100+30 ✓\n• gelb: B=50+140=190, D=20+10=30 → 190 ≠ 60 ✗',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'SELECT C, SUM(B), SUM(D)\nFROM T\nGROUP BY C\nHAVING SUM(B) = SUM(D) + 30;\n\n-- Ergebnis: violett (130, 100), rot (140, 110)',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'WHERE kann keine Aggregatfunktionen (SUM, COUNT) enthalten – dafür ist HAVING da. Die Zwischenrechnung je Gruppe sauber aufschreiben, sonst schleichen sich Rechenfehler ein.',
    },
  ],

  'probeklausur1-3': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Wichtig ist die Reihenfolge der Auswertung: zuerst WHERE (filtert einzelne Zeilen VOR der Gruppierung), dann GROUP BY (gruppiert), dann HAVING (filtert ganze Gruppen). Hier: nur Zeilen mit D > 30 zählen, je Farbe gruppieren und nur Farben mit mindestens 2 solcher Zeilen behalten.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. WHERE D > 30 → übrig bleiben: Z.1 (D=40, rot), Z.7 (40, grün), Z.8 (100, violett), Z.10 (50, blau), Z.11 (40, rot)\n2. GROUP BY C zählt: rot=2, grün=1, violett=1, blau=1\n3. HAVING COUNT(*) >= 2 → nur rot bleibt.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'SELECT C, COUNT(*)\nFROM T\nWHERE D > 30\nGROUP BY C\nHAVING COUNT(*) >= 2;\n\n-- Ergebnis: rot 2\n-- Reihenfolge: FROM → WHERE → GROUP BY → HAVING → SELECT',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'WHERE und HAVING verwechseln: „WHERE COUNT(*) >= 2" ist ein Fehler. Achtung > vs. >=: D > 30 schließt D = 30 (Zeile 3) aus. Immer erst die WHERE-gefilterten Zeilen notieren, dann gruppieren.',
    },
  ],

  'probeklausur1-4': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'FROM T T1, T T2 verbindet die Tabelle T mit sich selbst (Self-Join) und bildet das kartesische Produkt: jede der 12 Zeilen wird mit jeder der 12 Zeilen kombiniert (12×12 = 144 Paare). WHERE T1.B = T2.D behält nur Paare, bei denen der B-Wert der einen Zeile gleich dem D-Wert der anderen ist. COUNT(*) zählt diese Treffer.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: 'Trick: nicht alle 144 Paare prüfen, sondern Häufigkeiten zählen. Treffer für Wert v = (Anzahl B=v) × (Anzahl D=v).\nB-Werte: 10→3×, 20→1, 30→1, 40→1, 50→2, 80→1, 90→1, 120→1, 140→1\nD-Werte: 0→1, 10→2, 20→2, 30→2, 40→3, 50→1, 100→1\nNur gemeinsame Werte zählen: 10:3·2=6, 20:1·2=2, 30:1·2=2, 40:1·3=3, 50:2·1=2 → Summe 15.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'SELECT COUNT(*)\nFROM T T1, T T2\nWHERE T1.B = T2.D;\n\n-- Ergebnis: 15',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Werte, die nur in B oder nur in D vorkommen (z. B. 80, 90, 120 in B; 0, 100 in D), liefern keine Treffer. Die Häufigkeitsmethode ist deutlich schneller und sicherer als das Durchgehen aller 144 Paare.',
    },
  ],

  'probeklausur1-5': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Man kann auch nach einem berechneten Ausdruck gruppieren – nicht nur nach einer rohen Spalte. LENGTH(C) ist die Anzahl der Zeichen des Farbnamens. GROUP BY LENGTH(C) fasst also alle Farben gleicher Namenslänge zu einer Gruppe zusammen.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Länge je Farbe: rot=3, blau=4, grün=4 (ü zählt als EIN Zeichen), gelb=4, violett=7\n2. Zeilen je Länge zählen:\n   • Länge 3: nur rot (Z.1,9,11) → 3\n   • Länge 4: blau(3) + grün(2) + gelb(2) → 7\n   • Länge 7: violett (Z.4,8) → 2\nKontrolle: 3+7+2 = 12.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'SELECT LENGTH(C), COUNT(*)\nFROM T\nGROUP BY LENGTH(C);\n\n-- Ergebnis: 3→3, 4→7, 7→2',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Das „ü" in grün als ein Zeichen zählen (Länge 4), nicht als zwei. Es wird nach Länge gruppiert, nicht nach der Farbe selbst – verschiedene Farben können in derselben Gruppe landen.',
    },
  ],

  'probeklausur1-6': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Eine Unterabfrage (Klammer hinter IN) ist eine eigenständige SELECT-Abfrage, die ZUERST ausgewertet wird. Sie liefert eine Wertemenge. Die äußere Abfrage gibt dann alle Zeilen aus, deren Spalte in dieser Menge liegt (B IN {…}).',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Unterabfrage SELECT B FROM T WHERE 2*A > D auswerten:\n   • Z.4: 2·4=8 > 0 ✓ → B=120\n   • Z.6: 2·6=12 > 10 ✓ → B=80\n   • Z.12: 2·12=24 > 10 ✓ → B=140\n   (alle anderen: 2*A ist nicht größer als D)\n   → Menge {80, 120, 140}\n2. Äußere Abfrage: Zeilen mit B ∈ {80,120,140} → genau Z.4, 6, 12.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'SELECT A, B, D\nFROM T\nWHERE B IN (SELECT B FROM T WHERE 2*A > D);\n\n-- Ergebnis: (4,120,0), (6,80,10), (12,140,10)',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Erst die Unterabfrage komplett auswerten, dann die äußere. Die Unterabfrage liefert eine Menge (Duplikate egal). Sie ist hier unabhängig von der äußeren Zeile (nicht korreliert).',
    },
  ],

  // ── Probeklausur 1 – Aufgabe 2 (Relationenalgebra) ────────────────────────
  // V(A,B): (1,gelb)(2,grün)(2,blau)(3,blau)(3,gelb)(3,rot)(4,grün)(4,rot)(5,orange)(6,rot)(6,grün)
  // W(B,C,D): (gelb,120,15)(grün,220,30)(rot,130,45)(orange,110,45)(magenta,100,60)

  'probeklausur1-21': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Relationenalgebra ist die mathematische Schreibweise hinter SQL. Übersetzungsregeln: FROM A, B = Kreuzprodukt (A × B); WHERE mit Gleichheit zweier Tabellen = Join (⋈); WHERE mit einseitiger Bedingung = Selektion σ (Zeilenauswahl); SELECT bestimmter Spalten = Projektion π; SELECT * = KEINE Projektion. σ = Selektion (sigma), π = Projektion (pi), ⋈ = Join.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: 'SQL: SELECT * FROM V, W WHERE V.B = W.B AND V.A < 4\n1. FROM V, W → V × W\n2. V.B = W.B → Verbund über B: V ⋈[V.B=W.B] W\n3. V.A < 4 → Selektion σ[V.A < 4]\n4. SELECT * → keine Projektion\nZusammen: σ[V.A < 4] ( V ⋈[V.B=W.B] W )',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'σ[V.A < 4] ( V ⋈[V.B = W.B] W )\n\nGleichwertig nur mit Kreuzprodukt:\nσ[V.B = W.B ∧ V.A < 4] ( V × W )',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'SELECT * heißt KEINE Projektion (häufiger Fehler: trotzdem ein π schreiben). Die beiden Bedingungen mit ∧ (UND) verbinden, nicht mit ∨ (ODER).',
    },
  ],

  'probeklausur1-22': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'SELECT B FROM V wählt nur die Spalte B aus – das ist die Projektion π[B](V). Das SQL-Schlüsselwort UNION (Vereinigung zweier Ergebnismengen) entspricht dem Mengenoperator ∪ der Relationenalgebra.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. (SELECT B FROM V) → π[B](V)\n2. (SELECT B FROM W) → π[B](W)\n3. UNION → ∪\nErgebnis: π[B](V) ∪ π[B](W)',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'π[B] (V)  ∪  π[B] (W)',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Nicht den falschen Mengenoperator nehmen: ∩ (Schnitt) oder × (Kreuzprodukt) statt ∪ (Vereinigung). UNION entfernt – wie ∪ – automatisch Duplikate.',
    },
  ],

  'probeklausur1-23': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Zentraler Unterschied: Relationenalgebra arbeitet auf MENGEN (keine doppelten Tupel erlaubt). SQL arbeitet auf MULTIMENGEN (Bags, Duplikate bleiben erhalten). π[B](V) entfernt Duplikate automatisch; SELECT B FROM V behält sie.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. π[B](V): die VERSCHIEDENEN B-Werte → { gelb, grün, blau, rot, orange } = 5 Zeilen\n2. SELECT B FROM V: ALLE 11 B-Werte mit Duplikaten (grün, blau, rot u. a. mehrfach)\n3. Antwort: Nein, nicht gleich – sie unterscheiden sich in der Zeilenzahl.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: '-- SQL-Entsprechung der RA-Projektion (entfernt Duplikate):\nSELECT DISTINCT B FROM V;\n\n-- Ohne DISTINCT: 11 Zeilen mit Duplikaten',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: '„Ja, gleich" ohne Begründung. Immer erklären: RA = mengenbasiert (Duplikate weg), SQL = multimengenbasiert (Duplikate bleiben). Erst SELECT DISTINCT macht SQL mengenwertig.',
    },
  ],

  // ── Probeklausur 1 – Aufgabe 3 (NULL-Werte) ──────────────────────────────
  // V(A,B,C,D), „–" = NULL:
  // 1:(4,10,110) 2:(–,110,–) 3:(8,30,70) 4:(–,–,30) 5:(16,60,60) 6:(–,90,90) 7:(64,–,90) 8:(128,110,120)

  'probeklausur1-31': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'NULL bedeutet „unbekannt". Regeln der 3-wertigen Logik: jede RECHNUNG mit NULL ergibt NULL; jeder VERGLEICH mit NULL ergibt UNKNOWN (weder wahr noch falsch). Die WHERE-Klausel übernimmt nur Zeilen, deren Bedingung TRUE ist – UNKNOWN zählt wie FALSE und fällt weg.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: 'Bedingung (B·20) > (D/2) je Zeile (B/D = die jeweiligen Werte):\n• Z.1: 4·20=80 > 110/2=55 ✓\n• Z.2: B=NULL → UNKNOWN → weg\n• Z.3: 8·20=160 > 70/2=35 ✓\n• Z.4: B=NULL → UNKNOWN → weg\n• Z.5: 16·20=320 > 60/2=30 ✓\n• Z.6: B=NULL → UNKNOWN → weg\n• Z.7: 64·20=1280 > 90/2=45 ✓\n• Z.8: 128·20=2560 > 120/2=60 ✓\nErgebnis A: {1, 3, 5, 7, 8}.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'SELECT A FROM V WHERE (B*20) > (D/2);\n\nNULL · 20 = NULL → NULL > 55 = UNKNOWN → Zeile fällt weg',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'NULL-Zeilen nicht als „0 > x" werten – das Ergebnis ist UNKNOWN, nicht FALSE. WHERE behandelt UNKNOWN aber wie FALSE: die Zeile kommt nicht ins Ergebnis.',
    },
  ],

  'probeklausur1-32': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Bei OR genügt es, wenn EINE Teilbedingung TRUE ist. In der 3-wertigen Logik gilt: UNKNOWN OR TRUE = TRUE, aber UNKNOWN OR FALSE = UNKNOWN. Hier: B = C ist in keiner Zeile erfüllt (und bei NULL ohnehin UNKNOWN), es bleibt also effektiv nur C > 90.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: 'Bedingung B = C OR C > 90 (C-Werte: Z1=10, Z2=110, Z3=30, Z4=NULL, Z5=60, Z6=90, Z7=NULL, Z8=110):\n• Z.2: C=110 > 90 ✓\n• Z.8: C=110 > 90 ✓\n• Z.6: C=90 ist NICHT > 90 → nein\n• Z.7: C=NULL → UNKNOWN → weg\n• B=C trifft nirgends zu\nErgebnis A: {2, 8}.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'SELECT A FROM V WHERE B = C OR C > 90;\n\n-- Ergebnis: 2, 8',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Grenzwert beachten: C = 90 ist nicht > 90. NULL > 90 ist UNKNOWN, nicht FALSE – fällt aber trotzdem weg.',
    },
  ],

  'probeklausur1-33': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Klassische Falle: Der korrekte Test auf einen Nullwert ist IS NULL. Der Vergleich „= NULL" ergibt IMMER UNKNOWN – sogar dort, wo der Wert tatsächlich NULL ist. „B = NULL" kann also nie TRUE werden und trägt nichts bei.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: 'Bedingung D IS NULL OR B = NULL:\n• B = NULL → immer UNKNOWN → liefert keine Zeile\n• D IS NULL → wahr nur, wo D ein Nullwert ist: das ist nur Zeile 2\nErgebnis A: {2}.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: '-- Falsch (immer UNKNOWN):  WHERE B = NULL\n-- Korrekt:                 WHERE B IS NULL\n\n-- Diese Aufgabe liefert: A = 2',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Nicht „B = NULL" gedanklich zu „B IS NULL" verbessern – die Abfrage steht so da und liefert wirklich nur {2}. Mit B IS NULL wären es zusätzlich Z.4 und Z.6 → {2,4,6}.',
    },
  ],

  'probeklausur1-34': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Zwei Teilabfragen werden mit UNION zu einer gemeinsamen Spalte X vereinigt (AS X benennt die Spalte um). UNION entfernt Duplikate. ORDER BY X sortiert das Gesamtergebnis aufsteigend. Zeilen, deren Wert wegen NULL nicht berechenbar ist, erfüllen die Bedingung nicht.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: 'Teil 1: SELECT A WHERE A·B < D (B=NULL → UNKNOWN → weg):\n• Z.1: 1·4=4 < 110 ✓ → A=1\n• Z.3: 3·8=24 < 70 ✓ → A=3\n(Z.5/7/8: 80<60, 448<90, 1024<120 falsch) → {1,3}\nTeil 2: SELECT B WHERE A·D > C:\n• Z.1: 1·110=110 > 10 → B=4\n• Z.3: 3·70=210 > 30 → B=8\n• Z.5: 5·60=300 > 60 → B=16\n• Z.8: 8·120=960 > 110 → B=128\n(Z.6: 6·90>90 wäre wahr, dort B=NULL) → {4,8,16,128}\nUNION + sortiert: 1, 3, 4, 8, 16, 128.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: '(SELECT A AS X FROM V WHERE A*B < D)\nUNION\n(SELECT B AS X FROM V WHERE A*D > C)\nORDER BY X;\n\n-- Ergebnis: 1, 3, 4, 8, 16, 128',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Rechnungen mit NULL ergeben NULL → die Bedingung wird UNKNOWN → Zeile fällt weg. Beide Teilergebnisse zusammenwerfen UND danach sortieren (ORDER BY gilt für das gesamte UNION).',
    },
  ],

  'probeklausur1-35': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Self-Join: V wird unter zwei Aliasnamen V1 und V2 mit sich selbst kombiniert. Zwei Bedingungen müssen GLEICHZEITIG gelten: V1.C = V2.D (verbindet die Zeilen) UND V1.B >= V2.A (Filter). Ist V1.B NULL, wird V1.B >= V2.A zu UNKNOWN → das Paar fällt weg.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: 'Zuerst V1.C = V2.D suchen (C-Werte vs. D-Werte), dann V1.B >= V2.A prüfen:\n• V1=3 (B=8,C=30) & V2=4 (D=30): 8 >= 4 ✓ → (3,4)\n• V1=5 (B=16,C=60) & V2=5 (D=60): 16 >= 5 ✓ → (5,5)\n• V1=8 (B=128,C=110) & V2=1 (D=110): 128 >= 1 ✓ → (8,1)\n• V1=2 (B=NULL,C=110) & V2=1: NULL >= 1 → UNKNOWN → weg\n• V1=6 (B=NULL,C=90) & V2=6/7 (D=90): UNKNOWN → weg\nErgebnis (V1.A, V2.A): (8,1), (3,4), (5,5).',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'SELECT V1.A, V2.A\nFROM V V1, V V2\nWHERE V1.B >= V2.A AND V1.C = V2.D;\n\n-- Ergebnis: (8,1), (3,4), (5,5)',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Erst über die Verbund-Bedingung V1.C = V2.D die passenden Zeilen finden, das spart Arbeit. Paare mit V1.B = NULL fallen wegen UNKNOWN weg – leicht zu übersehen.',
    },
  ],

  'probeklausur1-36': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Diese Teilaufgabe ist laut Anmerkungen NICHT klausurrelevant: Sie nutzt die alte Oracle-Schreibweise „(+)" für einen äußeren Verbund. V2.D(+) heißt, V2 ist die optionale Seite – das entspricht einem LEFT OUTER JOIN von V1 zu V2 über V1.C = V2.D.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: 'Kann übersprungen werden. Zum Verständnis: Alle V1-Zeilen mit A < 6 bleiben erhalten; fehlt ein Partner V2 (kein V2.D = V1.C), werden V2.A und V2.D mit NULL aufgefüllt. SUMME = V1.B + V2.D ist NULL, sobald ein Summand NULL ist.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: '-- Moderne Schreibweise statt Oracle (+):\nSELECT V1.A, V2.A, V1.B + V2.D AS SUMME\nFROM V V1\nLEFT JOIN V V2 ON V1.C = V2.D\nWHERE V1.A < 6\nORDER BY V1.A;',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Nicht klausurrelevant. Die „(+)"-Syntax ist veraltet; heute nimmt man LEFT/RIGHT/FULL OUTER JOIN.',
    },
  ],

  // ── Probeklausur 1 – Aufgabe 4 (Integritätsbedingungen X1/X2) ─────────────
  // X1(A,B,C,D): (1,blau,2,16)(3,rot,4,32)(5,gelb,8,64)(9,orange,12,256)(12,gelb,16,128)
  // X2(A,B,C,D,E): (3,4,1,13,128)(3,4,3,15,64)(9,12,2,14,32)(12,16,–,14,16)(9,12,5,14,16)

  'probeklausur1-40': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Integritätsbedingungen (Constraints) sichern die Datenqualität. Vier Typen: PRIMARY KEY = eindeutig UND nicht NULL; UNIQUE = Wert darf nicht doppelt vorkommen; CHECK = eine Bedingung muss gelten; FOREIGN KEY (FK) = der Wert muss in der referenzierten Tabelle als Schlüssel existieren (oder NULL sein).',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: 'Jedes INSERT der Reihe nach prüfen:\n1. PK verletzt? (Wert schon da oder NULL)\n2. UNIQUE verletzt?\n3. CHECK-Bedingungen erfüllt?\n4. Alle FK-Werte in der Zieltabelle vorhanden?\nLaut Aufgabe wird maximal EINE Bedingung verletzt – bei Treffer aufhören.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'X1-Constraints:\n• X1_CO_1: PRIMARY KEY (A, C)\n• X1_CO_2: LENGTH(B) ∈ {3,4,6,7}\n• X1_CO_3: D ∈ {1,2,4,8,16,32,64,128,256}\n• X1_CO_4: UNIQUE (D)',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'CHECK prüft, ob ein Wert ERLAUBT ist; UNIQUE prüft, ob er schon VORKOMMT – nicht verwechseln. FK heißt: der Wert muss in der Zieltabelle existieren, nicht nur „gültig aussehen".',
    },
  ],

  'probeklausur1-41': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'INSERT INTO X1 VALUES (1, \'magenta\', 45, 128). UNIQUE (D) bedeutet: kein D-Wert darf doppelt vorkommen. In X1 hat die Zeile (12, gelb, 16, 128) bereits D = 128.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. PK (A,C) = (1,45): so noch nicht vorhanden ✓\n2. LENGTH(\'magenta\') = 7 ∈ {3,4,6,7} ✓\n3. D = 128 ist ein erlaubter Wert ✓\n4. ABER D = 128 existiert bereits → UNIQUE X1_CO_4 verletzt ✗',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'INSERT INTO X1 VALUES (1, \'magenta\', 45, 128)\n→ verletzt X1_CO_4 (UNIQUE D)',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'D = 128 ist zwar ein erlaubter CHECK-Wert (X1_CO_3 ✓), verletzt aber die Eindeutigkeit. CHECK und UNIQUE sind zwei verschiedene Prüfungen.',
    },
  ],

  'probeklausur1-42': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'INSERT INTO X1 VALUES (4, \'orange\', 32, 512). CHECK X1_CO_3 erlaubt für D nur die Zweierpotenzen {1, 2, 4, 8, 16, 32, 64, 128, 256}. 512 steht nicht in dieser Liste.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. PK (A,C) = (4,32): neu ✓\n2. LENGTH(\'orange\') = 6 ∈ {3,4,6,7} ✓\n3. D = 512 ∉ {1,…,256} → CHECK X1_CO_3 verletzt ✗',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'INSERT INTO X1 VALUES (4, \'orange\', 32, 512)\n→ verletzt X1_CO_3 (D nicht in der erlaubten Menge)',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: '512 wäre die nächste Zweierpotenz nach 256, fehlt aber in der Liste. UNIQUE wäre erfüllt (512 noch frei), der CHECK scheitert zuerst.',
    },
  ],

  'probeklausur1-43': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'INSERT INTO X1 VALUES (11, \'orange\', 14, 8). Alle vier X1-Constraints durchprüfen; ist keiner verletzt, ist das INSERT zulässig.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. PK (A,C) = (11,14): neu ✓\n2. LENGTH(\'orange\') = 6 ✓\n3. D = 8 ∈ {1,2,4,8,…} ✓\n4. D = 8 noch nicht vergeben (UNIQUE) ✓\n→ keine Verletzung',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'INSERT INTO X1 VALUES (11, \'orange\', 14, 8)\n→ keine Verletzung (zulässig)',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Wirklich alle vier Constraints prüfen, bevor man „zulässig" sagt – nicht nach den ersten dreien aufhören.',
    },
  ],

  'probeklausur1-44': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'INSERT INTO X1 VALUES (10, \'gruen\', 15, 4). CHECK X1_CO_2 verlangt LENGTH(B) ∈ {3,4,6,7}. \'gruen\' (ASCII, ohne ü) hat 5 Zeichen.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. PK (A,C) = (10,15): neu ✓\n2. LENGTH(\'gruen\') = 5 ∉ {3,4,6,7} → CHECK X1_CO_2 verletzt ✗',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'INSERT INTO X1 VALUES (10, \'gruen\', 15, 4)\n→ verletzt X1_CO_2 (LENGTH(B) = 5)',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: '\'gruen\' hat 5 Buchstaben – im Gegensatz zu \'grün\' (4 Zeichen). Auf die genaue Schreibweise achten.',
    },
  ],

  'probeklausur1-45': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'INSERT INTO X2 VALUES (1, 2, 3, 12, 256). X2 verweist per Fremdschlüssel auf X1: X2_CO_2 prüft das Paar (A,B) gegen X1(A,C); X2_CO_3 prüft E gegen X1(D). X2_CO_4 verlangt D BETWEEN 12 AND 16 (12 ≤ D ≤ 16).',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. PK (A,E) = (1,256): neu ✓\n2. FK (A,B) = (1,2): X1 hat Zeile (1, blau, 2, …) mit (A=1,C=2) ✓\n3. FK E = 256: kommt in X1.D vor ✓\n4. D = 12 ∈ [12,16] ✓\n→ keine Verletzung',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'INSERT INTO X2 VALUES (1, 2, 3, 12, 256)\n→ keine Verletzung (zulässig)',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'X2_CO_2 vergleicht (A,B) aus X2 mit (A,C) aus X1 – nicht mit (A,B). Genau auf die referenzierten Spalten achten.',
    },
  ],

  'probeklausur1-46': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'INSERT INTO X2 VALUES (2, 9, NULL, 16, 128). FK X2_CO_2: das Paar (A,B) = (2,9) müsste als (A,C) in X1 vorkommen. X1 hat die (A,C)-Paare (1,2), (3,4), (5,8), (9,12), (12,16) – (2,9) fehlt.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. PK (A,E) = (2,128): neu ✓\n2. FK (A,B) = (2,9): nicht unter den (A,C)-Paaren von X1 → X2_CO_2 verletzt ✗',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'INSERT INTO X2 VALUES (2, 9, NULL, 16, 128)\n→ verletzt X2_CO_2 (FK (A,B) → X1(A,C))',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'C = NULL in X2 ist erlaubt (keine NOT-NULL-Pflicht auf C). Der zusammengesetzte FK (A,B) muss als komplettes Paar in X1 existieren.',
    },
  ],

  'probeklausur1-47': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'INSERT INTO X2 VALUES (3, 4, 3, 1, 256). CHECK X2_CO_4 verlangt D BETWEEN 12 AND 16 (inklusiv). D = 1 liegt außerhalb.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. PK (A,E) = (3,256): neu ✓\n2. FK (A,B) = (3,4): in X1 als (A=3,C=4) vorhanden ✓\n3. FK E = 256: in X1.D ✓\n4. D = 1 ∉ [12,16] → CHECK X2_CO_4 verletzt ✗',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'INSERT INTO X2 VALUES (3, 4, 3, 1, 256)\n→ verletzt X2_CO_4 (D nicht zwischen 12 und 16)',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'BETWEEN ist inklusiv (12 und 16 sind erlaubt). D = 1 ist klar außerhalb.',
    },
  ],

  'probeklausur1-48': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'INSERT INTO X2 VALUES (9, 12, 3, 14, 32). PK X2_CO_1 ist (A, E): dieses Paar muss eindeutig sein. X2 enthält bereits die Zeile (9, 12, 2, 14, 32) mit (A=9, E=32).',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. PK (A,E) = (9,32): existiert bereits → X2_CO_1 verletzt ✗',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'INSERT INTO X2 VALUES (9, 12, 3, 14, 32)\n→ verletzt X2_CO_1 (PK (A,E) doppelt)',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Den Datenbestand genau lesen: (9,12,2,14,32) ist schon da → (A=9, E=32) ist kein neues Paar. Der PK besteht nur aus A und E, nicht aus allen Spalten.',
    },
  ],

  'probeklausur1-49': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'INSERT INTO X2 VALUES (5, 8, 3, 13, 256). Alle X2-Constraints prüfen; ist keiner verletzt, ist das INSERT zulässig.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. PK (A,E) = (5,256): neu ✓\n2. FK (A,B) = (5,8): in X1 als (A=5,C=8) ✓\n3. FK E = 256: in X1.D ✓\n4. D = 13 ∈ [12,16] ✓\n→ keine Verletzung',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'INSERT INTO X2 VALUES (5, 8, 3, 13, 256)\n→ keine Verletzung (zulässig)',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Alle vier Constraints durchgehen, nicht vorzeitig abbrechen.',
    },
  ],

  'probeklausur1-50': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'INSERT INTO X2 VALUES (5, 8, NULL, 12, 512). FK X2_CO_3: E muss als D-Wert in X1 vorkommen. X1.D = {16, 32, 64, 256, 128} – 512 fehlt.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. PK (A,E) = (5,512): neu ✓\n2. FK (A,B) = (5,8): in X1 ✓\n3. FK E = 512: nicht in X1.D → X2_CO_3 verletzt ✗',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'INSERT INTO X2 VALUES (5, 8, NULL, 12, 512)\n→ verletzt X2_CO_3 (FK E → X1(D))',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Der PK (5,512) wäre zulässig, aber der FK auf E = 512 scheitert: der Wert muss in X1.D EXISTIEREN, nicht nur erlaubt aussehen.',
    },
  ],
}
