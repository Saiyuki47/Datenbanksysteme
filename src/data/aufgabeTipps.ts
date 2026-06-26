import type { TippSection } from '../types'

// Ziel jeder Tipp-Gruppe: Die vier Abschnitte (Konzept, Vorgehensweise,
// Syntax/Beispiel, Häufige Fehler) sollen zusammen ausreichen, um die Aufgabe
// OHNE Vorwissen vollständig zu lösen. Deshalb werden die relevanten Daten
// direkt im Tipp wiederholt und jeder Schritt mit konkreten Zahlen vorgerechnet.

export const aufgabeTipps: Record<string, TippSection[]> = {

  // ── Blatt 0 (SQL auf Pine Valley Furniture) ────────────────────────────────

  'blatt0-1': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Eine SQL-Abfrage holt Daten aus einer Tabelle. Grundform: SELECT <Spalte> FROM <Tabelle> – das gibt die Werte einer Spalte aus. Die Kundendaten stehen in der Tabelle CUSTOMER_T, die Stadt in der Spalte CUSTOMERCITY. Weil mehrere Kunden in derselben Stadt wohnen können, würde dieselbe Stadt mehrfach erscheinen. Das Schlüsselwort DISTINCT entfernt solche Dubletten, sodass jede Stadt nur einmal vorkommt.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Wo stehen die Kunden? → Tabelle CUSTOMER_T\n2. Welche Spalte ist die Stadt? → CUSTOMERCITY\n3. Jede Stadt nur einmal? → DISTINCT direkt hinter SELECT setzen\n4. Fertige Abfrage: SELECT DISTINCT CUSTOMERCITY FROM CUSTOMER_T',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'SELECT DISTINCT CUSTOMERCITY\nFROM CUSTOMER_T;\n\n-- Ergebnis: eine Zeile je Stadt (z. B. Boulder, Clearwater, Seattle, …).\n-- Eine Sortierung ist nicht verlangt → Reihenfolge beliebig.',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Ohne DISTINCT erscheint jede Stadt so oft, wie es dort Kunden gibt. Tabellen- und Spaltennamen müssen exakt stimmen (CUSTOMER_T, CUSTOMERCITY). Ein Semikolon am Ende schließt die Anweisung ab.',
    },
  ],

  'blatt0-2': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Mit einer WHERE-Klausel filtert man Zeilen: SELECT … FROM … WHERE <Bedingung> behält nur die Zeilen, bei denen die Bedingung wahr ist. Text wird in einfache Anführungszeichen gesetzt (\'Clearwater\'). Mehrere Bedingungen verknüpft AND – dann müssen ALLE erfüllt sein. Hier: Stadt = Clearwater UND Bundesstaat = Florida. Florida wird als Kürzel \'FL\' gespeichert.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Tabelle: CUSTOMER_T\n2. Ausgabe: CUSTOMERNAME (der Kundenname)\n3. Bedingungen: CUSTOMERCITY = \'Clearwater\' AND CUSTOMERSTATE = \'FL\'\n4. Es passt genau ein Kunde.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: "SELECT CUSTOMERNAME\nFROM CUSTOMER_T\nWHERE CUSTOMERCITY = 'Clearwater'\n  AND CUSTOMERSTATE = 'FL';\n\n-- Ergebnis: M and H Casual Furniture",
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Text-Werte ohne Anführungszeichen führen zu Fehlern. Groß-/Kleinschreibung beachten: \'clearwater\' ≠ \'Clearwater\'. AND (beide Bedingungen) nicht mit OR (eine reicht) verwechseln.',
    },
  ],

  'blatt0-3': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Die gesuchte Information ist auf zwei Tabellen verteilt: Die Bestellung 1008 steht in ORDER_T, die Postleitzahl aber in CUSTOMER_T. Beide Tabellen haben eine gemeinsame Spalte, die Kundennummer (ORDER_T.CUSTOMERID zeigt auf CUSTOMER_T.CUSTOMERID). Ein JOIN verbindet Zeilen beider Tabellen, die in dieser Spalte denselben Wert haben. Danach grenzt WHERE auf die Bestellung 1008 ein.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Bestellung 1008 → ORDER_T (enthält CUSTOMERID)\n2. Postleitzahl → CUSTOMER_T.CUSTOMERPOSTALCODE\n3. ORDER_T und CUSTOMER_T über CUSTOMERID verbinden (JOIN … ON)\n4. WHERE ORDERID = 1008 → es bleibt genau ein Kunde.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'SELECT c.CUSTOMERPOSTALCODE\nFROM ORDER_T o\n  JOIN CUSTOMER_T c ON o.CUSTOMERID = c.CUSTOMERID\nWHERE o.ORDERID = 1008;\n\n-- Ergebnis: 49015-3401\n-- (o und c sind Kurznamen/Aliase für die Tabellen)',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Die ON-Bedingung beim JOIN nicht vergessen – ohne sie entsteht das kartesische Produkt (jede Bestellung mit jedem Kunden). Bei gleichnamigen Spalten (CUSTOMERID gibt es in beiden Tabellen) das Tabellen-Kürzel davorsetzen.',
    },
  ],

  'blatt0-4': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Welche Produkte zu einer Bestellung gehören, steht in ORDERLINE_T (eine Zeile je Bestellposition, mit ORDERID und PRODUCTID). Der Produkt-TEXT (die Beschreibung) steht aber in PRODUCT_T. Über die gemeinsame Spalte PRODUCTID verbindet ein JOIN beide Tabellen. Mit WHERE ORDERID = 1008 bleiben nur die Positionen dieser einen Bestellung.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Positionen der Bestellung 1008 → ORDERLINE_T WHERE ORDERID = 1008\n2. Beschreibung dazuholen → JOIN PRODUCT_T über PRODUCTID\n3. Ausgabe: PRODUCTDESCRIPTION\n4. Es ergeben sich zwei Positionen mit demselben Produkt.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'SELECT p.PRODUCTDESCRIPTION\nFROM ORDERLINE_T ol\n  JOIN PRODUCT_T p ON ol.PRODUCTID = p.PRODUCTID\nWHERE ol.ORDERID = 1008;\n\n-- Ergebnis: Computer Desk, Computer Desk (zwei Zeilen)',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Ohne WHERE-Filter bekommt man die Produkte ALLER Bestellungen. Dass „Computer Desk" doppelt erscheint, ist korrekt – es sind zwei Bestellpositionen. Jeder JOIN braucht seine eigene ON-Bedingung.',
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

  // ── Blatt 2 (Entity-Relationship-Modellierung) ─────────────────────────────

  'blatt2-1': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Die Funktionalität einer Beziehung sagt, wie viele Entitäten der einen Seite mit einer Entität der anderen Seite verbunden sein dürfen (1:1, 1:N, N:1, N:M; N:1 ist nur 1:N rückwärts). Zu jedem Typ gehören: ein ER-Beispiel, die Konsistenzbedingung in Worten und die geltenden partiellen Funktionen. Eine partielle Funktion E1 → E2 heißt: jeder E1-Wert legt höchstens einen E2-Wert fest.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Je Richtung fragen: „Wie viele B gehören zu EINEM A?" → höchstens eins = 1, mehrere = N/M.\n2. Konsistenzbedingung als Satz formulieren (z. B. „Jedes Land hat höchstens eine Hauptstadt …").\n3. Partielle Funktionen ablesen: Steht auf einer Seite „1", ist die andere → diese Seite eine Funktion.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: '1:1 – Land ↔ Hauptstadt: Land → Hauptstadt UND Hauptstadt → Land.\n1:N – Abteilung – Mitarbeiter: Mitarbeiter → Abteilung.\nN:1 – wie 1:N (Mitarbeiter → Abteilung).\nN:M – Student ↔ Vorlesung: KEINE partielle Funktion (kann Attribut wie „Note" tragen).',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: '1:N und N:1 sind dieselbe Beziehung. Partielle Funktion zeigt immer auf die „1"-Seite (die N-Seite bestimmt die 1-Seite). Bei N:M gibt es KEINE partielle Funktion. Nur N:M-Beziehungen tragen sinnvoll eigene Attribute.',
    },
  ],

  'blatt2-2': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Ein ER-Diagramm wird aus einer Textbeschreibung entwickelt: Substantive werden meist zu Entitäten, ihre Eigenschaften zu Attributen, Tätigkeitswörter („verschreibt", „verkauft", „stellt her") zu Beziehungen. Eine schwache Entität (Doppelrechteck) hat keinen eigenen vollständigen Schlüssel – hier Drug, weil der Handelsname nur innerhalb EINES Unternehmens eindeutig ist.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Entitäten + Schlüssel sammeln: Patient(ssn), Doctor(Phy_ssn), Pharmacy(name), Pharm_co(Name), Drug(Trade_name – partiell).\n2. Beziehungen aus den Sätzen ableiten und Kardinalität bestimmen: Primärarzt N:1, Sell N:M (mit price), Make N:1 (identifizierend), Contract N:M (mit Datum/Text), Prescription ternär (Patient-Doctor-Drug, mit date/quantity).\n3. Attribute an Beziehungen hängen, wo sie hingehören (price → Sell, nicht Drug).\n4. Einschränkungen prüfen: „nur letztes Rezept" → date NICHT im Schlüssel.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'Notation: Rechteck = Entität, Doppelrechteck = schwache Entität, Raute = Beziehung, Doppelraute = identifizierende Beziehung, Ellipse = Attribut (unterstrichen = Schlüssel).\nTeil 2: fester Preis → price wird Attribut von Drug.\nTeil 3: jedes Rezept separat → date in den Schlüssel von Prescription (oder Entität Prescription_no, dann quartär).',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'price gehört an die Beziehung Sell (variiert je Apotheke), nicht an Drug. Make muss eine identifizierende (Doppel-)Beziehung sein, weil Drug schwach ist. Prescription ist ternär – nicht in mehrere binäre Beziehungen zerlegen, sonst Semantikverlust. „Genau ein Primärarzt" ⇒ N:1, nicht N:M.',
    },
  ],

  'blatt2-3': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Auch hier gilt: Substantive → Entitäten, Verben → Beziehungen. Wichtig ist, „Titel" und „Exemplar" zu trennen (ein Buchtitel hat mehrere physische Exemplare). Vernetzen sich Entitäten desselben Typs (LinkedIn-Personen untereinander), ist das eine rekursive Beziehung (beide Linien gehen zum selben Rechteck).',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: 'a) Bibliothek: schreiben (Autor N:M Buchtitel), zugeordnet (Buchtitel 1:N Buchexemplar), ausleihen (Ausleiher 1:N Buchexemplar), vormerken (Ausleiher M:N Buchtitel).\nb) Autos: herstellen (Auto N:1 Hersteller), eingetragen (Auto N:1 Fahrzeughalter).\nc) LinkedIn: vernetzen (Person N:M Person), folgen (Person N:M Unternehmen), administrieren (Person N:M Unternehmen), Arbeitgeber (Person N:1 Unternehmen).',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: '„höchstens einen" / „genau einen" ⇒ 1-Seite. „mehrere" / „ein oder mehrere" ⇒ N- bzw. M-Seite.\nBeispiel b): „Auto hat höchstens einen Halter, Halter hat mehrere Autos" ⇒ Auto N : 1 Fahrzeughalter.\nSchlüssel kennzeichnen: E-Mail (Person), Name (Unternehmen) unterstreichen.',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Buchtitel ≠ Buchexemplar – sonst lässt sich „mehrere Kopien eines Titels" nicht abbilden. „Aktueller Arbeitgeber" ist N:1 (eine Person, ein Arbeitgeber), während „folgen" und „administrieren" N:M sind. Die rekursive vernetzen-Beziehung mit beiden Enden am selben Entitytyp nicht vergessen.',
    },
  ],

  'blatt2-4': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'In einer ternären Beziehung kann jede der drei Entitäten einmal das „Ziel" (rechte Seite) einer partiellen Funktion A × B → C sein. Da die Reihenfolge auf der linken Seite egal ist, gibt es genau 3 mögliche partielle Funktionen.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Alle 3 Funktionen aufschreiben (je eine Entität als Ziel).\n2. Für jede in Worte fassen, welche Einschränkung sie bedeutet.\n3. Funktionalität „1" bei einer Entität ⇔ diese Entität ist Ziel einer geltenden Funktion.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: '(8) ÜL × ÜGr → Student\n(9) ÜL × Student → ÜGr\n(10) ÜGr × Student → ÜL\nUnter 1:1:N: ÜGr=1 ⇒ (9), ÜL=1 ⇒ (10), Student=N ⇒ (8) gilt nicht.',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Nicht mehr als 3 Funktionen zählen (Reihenfolge links zählt nicht). „N" bei einer Entität heißt: sie ist NICHT bestimmt, die zugehörige Funktion (mit ihr als Ziel) gilt nicht.',
    },
  ],

  'blatt2-5': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Funktionalität und partielle Funktion sind zwei Sichten auf dieselbe Einschränkung. Die Entität rechts vom Pfeil einer geltenden partiellen Funktion ist „bestimmt" und bekommt die Funktionalität „1".',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Gegeben A × C → B: B steht rechts → B bekommt „1".\n2. Die übrigen Entitäten (A, C) bekommen N bzw. M.\n3. Rückrichtung: aus den „1"-Annotationen die partiellen Funktionen rekonstruieren (jede „1"-Entität ist ein Ziel).',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'A × C → B   ⇒   A: N, C: M, B: 1.\nDaumenregel: „rechts vom Pfeil ⇒ 1". Zur sicheren Bestimmung immer erst alle möglichen partiellen Funktionen aufstellen.',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Die „1" gehört an die bestimmte (rechte) Entität, nicht an die linken. Bei mehreren geltenden Funktionen können mehrere Entitäten „1" sein. Ohne explizites Aufstellen der Funktionen verschätzt man sich leicht.',
    },
  ],

  'blatt2-6': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Dasselbe Stück Realität lässt sich oft auf mehrere Arten modellieren (ternäre Beziehung vs. mehrere binäre, Beziehung vs. Entitytyp, Attribut vs. Entitytyp). Die Entwürfe unterscheiden sich darin, welche Konsistenzbedingungen sie zusichern und welche Informationen sie ausdrücken können (Ausdrucksstärke).',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: 'Für jede Alternative prüfen: (1) Bleiben dieselben Informationseinheiten abbildbar? (2) Werden Konsistenzbedingungen weiterhin erzwungen? (3) Wird die reale Welt sinnvoll wiedergegeben? Dann Vor- und Nachteile gegenüberstellen.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'Ternär N:M:1 „Studenten × Vorlesungen → Professoren" sichert zu: pro (Student, Vorlesung) höchstens ein Prüfer. Zwei binäre N:M-Beziehungen verlieren genau diese Zusicherung. Die (min,max)-Notation kann bei der Entitytyp-Variante „genau einmal beteiligt" erzwingen.',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Eine ternäre Beziehung ist nicht ohne Weiteres durch zwei binäre ersetzbar – das führt zu Semantikverlust und möglichen Inkonsistenzen. Ein eigener Entitytyp lohnt nur, wenn das Konzept genug eigenständige Information trägt; sonst kostet er nur zusätzliche Joins.',
    },
  ],

  // ── Blatt 3 (Funktionalität & (min,max)-Notation) ─────────────────────────

  'blatt3-1': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Funktionalität und (min,max) beschreiben dieselbe Beziehung aus verschiedenen Blickwinkeln. Die Funktionalität steht NEBEN dem Entitytyp, auf den sie zeigt; die (min,max)-Angabe steht AM Entitytyp, dessen Teilnahme sie begrenzt. Deshalb wirken die Angaben „über Kreuz". „*" = beliebig viele.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Die (min,max)-Angabe hat als min immer 0 (eine Funktionalität erzwingt keine Pflicht-Teilnahme).\n2. Für max: Steht bei F auf der GEGENüberliegenden Seite eine 1 → max = 1; steht dort N/M → max = *.\n3. So entsteht: 1:1 → (0,1)/(0,1); 1:N → (0,*)/(0,1); N:1 → (0,1)/(0,*); N:M → (0,*)/(0,*).',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'F1 : F2  →  (min1,max1) (min2,max2)\n1 : 1  →  (0,1) (0,1)\n1 : N  →  (0,*) (0,1)\nN : 1  →  (0,1) (0,*)\nN : M  →  (0,*) (0,*)',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Die Seiten nicht vertauschen – die (min,max) der einen Seite hängt von der Funktionalität der ANDEREN Seite ab. min ist hier nie 1: aus einer reinen Funktionalität folgt keine „mindestens eins"-Pflicht. (min,max) ist die feinere Notation.',
    },
  ],

  'blatt3-2': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Die (min,max)-Angabe an einem Entitytyp E sagt: Wie oft darf EIN konkreter E-Wert in der Beziehungstabelle vorkommen? min = wie oft mindestens, max = wie oft höchstens. „mindestens eine" → min = 1, „höchstens eine" → max = 1.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. „Ein Übungsleiter betreut mindestens einmal" → Übungsleiter (1,*).\n2. „Eine Gruppe wird mind. einmal, höchstens 25-mal betreut" → Übungsgruppe (1,25).\n3. „Ein Student wird höchstens einmal betreut" → Student max = 1, min = 0 → (0,1).',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'betreuen: Übungsleiter (1,*) – Übungsgruppe (1,25) – Student (0,1).\nTabellen-Test: In der Beziehungstabelle steht dieselbe MatrNr nur EINMAL (→ Student max 1), eine GruppenNr höchstens 25-mal (→ (1,25)), ein Übungsleiter-Name beliebig oft (→ (1,*)).',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Bei ternären Beziehungen jede der drei Seiten einzeln betrachten. „höchstens eine" betrifft das max (=1), nicht das min. Die (min,max) am Entitytyp anschreiben, dessen Vorkommen sie beschränkt – nicht verwechseln.',
    },
  ],

  'blatt3-3': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Bei mehr als zwei beteiligten Entitytypen (n > 2) sind Funktionalitäten und (min,max) NICHT ineinander überführbar. Funktionalitäten legen partielle Funktionen über KOMBINATIONEN (Paare) fest, (min,max) beschränkt das Vorkommen EINZELNER Entitäten in der Beziehungstabelle.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Funktionalität N:1:1 [1] lesen: jede „1"-Seite ist durch die übrigen bestimmt → Prof×Student→Thema und Thema×Student→Prof.\n2. (min,max) [2] lesen: (0,1) bei Doktoranden/Thema, (0,*) bei Prof → einzelne partielle Funktionen Doktorand→Prof, Doktorand→Thema, Thema→Doktorand, Thema→Prof.\n3. Mit einer Beispieltabelle zeigen, welche Tupel jeweils (un)zulässig sind.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: '[1] betreuen: Professoren × Studenten → Seminarthemen;  Seminarthemen × Studenten → Professoren.\n[2] betreuen: Doktoranden → Professoren;  Doktoranden → Themen;  Themen → Doktoranden;  Themen → Professoren.',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Nicht annehmen, die Notationen seien austauschbar. [1] (Funktionalität) lässt sich NICHT als (min,max) ausdrücken (dort wäre alles (0,*)), [2] ((min,max)) nicht als Funktionalität (dort wäre es 1:1:1 über Paare). Genau das ist die Aussage „unvergleichbar".',
    },
  ],

  'blatt3-4': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Textbedingungen werden direkt in (min,max) übersetzt und danach auf grobe Funktionalitäten reduziert. „mindestens k" → min = k; „höchstens einer" → max = 1; „fast alle haben …" → min = 0 (nicht alle), max = 1.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. „mind. drei Personen je Fahrzeug" → hat_Fahrerlaubnis: Fahrzeug-Seite (3,*), Fahrer-Seite (0,*).\n2. „Fahrzeug höchstens 1 Abteilung, Abteilung mind. 1 Fahrzeug" → gehört: Fahrzeug (0,1), Abteilung (1,*).\n3. „fast alle Fahrzeuge eine Garage, jede Garage belegt" → steht_in: Fahrzeug (0,1), Einzelgarage (1,1).\n4. Vergröbern: (3,*)→M, (0,*)→N, (0,1)→1-Seite usw.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: '(min,max): Fahrer (0,*) – (3,*) Fahrzeug | Fahrzeug (0,1) – (1,*) Abteilung | Fahrzeug (0,1) – (1,1) Einzelgarage.\nFunktionalität: hat_Fahrerlaubnis N:M | gehört N:1 | steht_in 1:1.',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: '„fast alle" ist NICHT (1,1) – weil eben nicht jedes Fahrzeug eine Garage hat, bleibt min = 0. Beim Vergröbern geht die Pflichtangabe (das min) verloren: (3,*) und (0,*) werden beide nur zu „N/M".',
    },
  ],

  'blatt3-5': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Ein vorgegebenes ER-Diagramm wird mit dem Text abgeglichen und um vergessene Elemente ergänzt: Schlüssel, Kardinalitäten, schwache Entität (wenn ein Schlüssel nur „lokal" eindeutig ist) und eine Generalisierung (IS-A), wenn eine Obermenge in disjunkte Untertypen zerfällt.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Schlüssel markieren: FLC, FHC, KDNR (voll), FNR (partiell → Flug ist schwach).\n2. anbieten als identifizierende Beziehung Fluglinie (0,*) – (1,1) Flug.\n3. Vielflieger (0,*) – (1,3) mit Status; Lieblingsgesellschaft (0,*) – (1,1).\n4. Start/Ziel: Flug (1,1) – (1,*) Flughafen.\n5. Kunde IS-A Person/Firma (disjunkt).',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'Schwache Entität = Doppelrechteck, identifizierende Beziehung = Doppelraute, partieller Schlüssel gestrichelt/lokal. „teilnehmen an 1–3 Programmen" → (1,3). „genau eine Lieblingsgesellschaft" → (1,1). Generalisierung: Untertypen erben die Schlüssel/Attribute des Obertyps.',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'FNR ist NICHT global eindeutig (verschiedene Linien nutzen gleiche Nummern) → Flug muss schwach sein, sonst falsch. „1–3 Programme" ist (1,3), nicht (0,*). Start- und Zielflughafen sind ZWEI getrennte Beziehungen. Generalisierung (IS-A) nicht mit einer normalen Beziehung verwechseln.',
    },
  ],

  // ── Blatt 4 (ER → Relationenschema & Verfeinerung) ────────────────────────

  'blatt4-1': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Beim Überführen bekommt zunächst JEDER Entitytyp UND jeder Beziehungstyp eine eigene Relation. Danach verfeinert man: Relationen mit GLEICHEM Schlüssel werden zusammengefasst. Der Schlüssel einer Beziehungsrelation richtet sich nach der Funktionalität.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Pro Entity-/Beziehungstyp eine Relation anlegen.\n2. Schlüssel der Beziehung bestimmen: 1:N/N:1 → Schlüssel der N-Seite; 1:1 → Schlüssel einer der beiden Seiten (Variante wählen); N:M → zusammengesetzter Schlüssel beider Seiten.\n3. Zusammenfassen, wenn Beziehungsrelation und Entity-Relation denselben Schlüssel haben (nur bei 1:1/1:N/N:1).',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'a) N:1: herstellen{FGNr,Name} + Auto{FGNr} → Auto{FGNr,Name}.\nb) N:M: vormerken{ISBN,LeserNr} – keine Zusammenfassung möglich.\nc) 1:1: Variante mit Schlüssel der „Pflicht"-Seite (Stadt) wählen → vermeidet NULL-Werte.\nd) schwache Entität: Raum{GebNr,RaumNr}, liegt_in fällt mit Raum zusammen.',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'N:M-Beziehungen NICHT zusammenfassen (eigener zusammengesetzter Schlüssel!). Bei 1:1 die Variante mit weniger NULL-Werten wählen. Bei schwachen Entitäten den Schlüssel des Eigentümers in den Schlüssel aufnehmen (GebNr + RaumNr).',
    },
  ],

  'blatt4-2': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Konkretes Beispiel mit einer ternären Beziehung (mieten: Vermieter 1, Wohnung N, Mieter 1) und einer schwachen Entität (Wohnung, identifiziert über Haus + Nummer via liegt_in). Erst je Entity/Beziehung eine Relation, dann gleichschlüsselige zusammenfassen.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Schwache Entität Wohnung: Schlüssel = Haus-Adresse + Nummer.\n2. liegt_in hat denselben Schlüssel wie Wohnung → einrechnen.\n3. mieten ist ternär: Schlüssel über zwei Entitäten ((Wohnung, Mieter) bestimmt den Vermieter) → bleibt eigenständig.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'Wohnung{«HausAdresse», «Nummer», Größe}; mieten{«HausAdresse», «Nummer», «MieterName», VermieterName}. liegt_in fällt mit Wohnung zusammen.',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Den Eigentümerschlüssel (Haus-Adresse) in den Schlüssel der schwachen Entität aufnehmen. mieten als ternäre Beziehung NICHT in eine Entity-Relation einrechnen (Schlüssel über zwei Entitäten).',
    },
  ],

  'blatt4-3': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Standardfall einer 1:N-Beziehung A —1— R —N— B. Die Beziehungsrelation R erhält als Schlüssel den Schlüssel der N-Seite, weil jede B-Instanz an höchstens einem R-Tupel beteiligt ist.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. A{a}, B{b}, R{a,b,r} anlegen.\n2. Schlüssel von R = b (N-Seite ist B).\n3. R hat denselben Schlüssel wie B → R in B aufnehmen.\n4. Ergebnis: A{a}, B{b,a,r}.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'initial:  A{«a»}, B{«b»}, R{a,«b»,r}\nverfeinert:  A{«a»}, B{«b», a, r}',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Den Schlüssel von R nicht auf die 1-Seite (a) legen – die N-Seite (b) bestimmt das Tupel eindeutig. Das Fremdschlüssel-Attribut a wandert beim Zusammenfassen mit in die B-Relation.',
    },
  ],

  'blatt4-4': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Mehrere Beziehungen an einem Entitytyp und eine ternäre Beziehung (verbindet mit zwei Rollen von/nach desselben Typs Bahnhöfe). Erst alle Relationen bilden, dann 1:N-/N:1-Beziehungen in die passende Entity-Relation einrechnen.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Funktionalitäten: liegt_in N:1, Start/Ziel jeweils Bahnhöfe 1 : N Züge, verbindet ternär (von 1, nach 1, Zug N).\n2. Partielle Funktionen von verbindet: (Zug,von)→nach und (Zug,nach)→von → Schlüssel (ZugNr,VonBahnhof) bzw. (ZugNr,NachBahnhof).\n3. Zusammenfassen: liegt_in → Bahnhöfe, Start → Züge, Ziel → Züge. verbindet bleibt eigenständig.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'Bahnhöfe{Name,AnzahlGleise,SName,Bundesland}; Züge{ZugNr,Länge,StartBahnhof,ZielBahnhof}; verbindet{VonBahnhof,NachBahnhof,ZugNr,Abfahrt,Ankunft}.',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Start/Ziel (Endpunkte des Zuges) nicht mit verbindet (einzelne Teilstrecken) verwechseln. verbindet ist N:M-artig und darf NICHT in Bahnhöfe/Züge eingerechnet werden. Die zwei Rollen von/nach erzeugen zwei Bahnhof-Attribute in verbindet.',
    },
  ],

  // ── Blatt 5 (Relationale Algebra) ─────────────────────────────────────────

  'blatt5-1': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Jeder Operator hat eine feste Wirkung: σ wählt Zeilen, π wählt Spalten (Duplikate weg), ∪ vereinigt, ∩ schneidet, − bildet die Differenz, × alle Tupel-Paare, ⋈[Bed] ist × + Selektion (Theta-Join), der natürliche Join ⋈ verbindet über alle gleichnamigen Spalten, ρ benennt Relation/Spalte um.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. σ/π wie gehabt.\n2. ∩ = Tupel in beiden, − = in u, nicht in v.\n3. u ⋈[u.B=v.B] v: aus u×v nur Zeilen mit u.B=v.B (gleiche Spaltennamen mit u./v. unterscheiden).\n4. u ⋈ v (natürlich): über alle gemeinsamen Spalten – bei gleichem Schema = Schnitt.\n5. ρ ändert nur Namen, nicht die Werte.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'u(4 Zeilen) × z(2) = 8. u ∩ v = {(a,2,a),(b,3,b)}. u − v = {(c,1,c),(a,2,d)}. u ⋈ v = u ∩ v (gleiches Schema).',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'π entfernt Duplikate. Bei ∪/∩/− müssen beide Relationen dasselbe Schema haben. Natürlicher Join (⋈ ohne Bedingung) verbindet über ALLE gleichnamigen Spalten – nicht mit dem Theta-Join verwechseln. ρ verändert keine Werte.',
    },
  ],

  'blatt5-2': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Aus einer deutschen Frage wird ein Algebra-Ausdruck: „welche Spalten?" → π, „mit Bedingung" → σ, „verknüpft über gemeinsames Attribut" → ⋈, „oder (zwei Mengen)" → ∪.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Quell-Relation(en) bestimmen.\n2. Filter (σ) ansetzen; Verknüpfungen (⋈) über das gemeinsame Attribut (gelesenVon=PersNr, gelesenVon=Boss, Note in prüfen).\n3. Am Ende mit π auf die gefragten Attribute reduzieren.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: "e) π[Name](Studenten ⋈ σ[Note=2](prüfen)).\nf) π[Titel,Name](Vorlesungen ⋈[gelesenVon=PersNr] Professoren).\nh) σ[SWS=4](Vorlesungen) ⋈[gelesenVon=Boss] Assistenten.",
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Join-Bedingung über das richtige Attributpaar wählen. „oder" zwischen Mengen ist ∪, „oder" innerhalb einer Bedingung ist ∨. Für „Note 2" über prüfen mit Studenten verbinden (gemeinsame MatrNr).',
    },
  ],

  'blatt5-3': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Dieselbe Frage („Welche Vorlesungen wurden geprüft?") in drei Join-Varianten: natürlicher Join (über gemeinsames Attribut VorlNr), Kartesisches Produkt + Selektion, und Theta-Join. Alle liefern dasselbe Ergebnis.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Vorlesungen und prüfen über VorlNr verbinden.\n2. natürlich: Vorlesungen ⋈ prüfen.\n3. ×: σ[Vorlesungen.VorlNr=prüfen.VorlNr](Vorlesungen × prüfen).\n4. Theta: Vorlesungen ⋈[VorlNr=VorlNr] prüfen. Am Ende π[Titel].',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'π[Titel](Vorlesungen ⋈ prüfen). In prüfen stehen VorlNr 5001/5041/4630 → Grundzüge, Ethik, Die 3 Kritiken.',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Beim Kartesischen Produkt die Verbundbedingung per Selektion NICHT vergessen. Der natürliche Join verbindet automatisch über VorlNr (das einzige gemeinsame Attribut). π[Titel] entfernt Duplikate.',
    },
  ],

  'blatt5-4': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Anfragen auf der Dichter-DB. Besonders „nur X": „nur X" heißt „X und nichts anderes" und wird über die Mengen-Differenz (−) gelöst: (alle, die X taten) minus (alle, die etwas ≠ X taten).',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. a/b: σ + π auf DRAMA bzw. DARSTELLER.\n2. c: DARSTELLER mit ROLLE über FIGUR joinen, σ[R_GESCHLECHT=\'Held\'].\n3. d: Differenz – (Faust∨Wallenstein) − (FIGUR≠Faust ∧ FIGUR≠Wallenstein).\n4. e: SCHAUSPIELER ⋈[W_ORT=G_ORT] DICHTER, dann π[NAME].',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: "d) π[PNR](σ[FIGUR='Faust'∨'Wallenstein'](DARSTELLER)) − π[PNR](σ[FIGUR≠'Faust'∧≠'Wallenstein'](DARSTELLER)) → {1}. Spieler 2 fällt raus (spielte auch Nathan/Tell/Mephisto).",
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: '„nur" NICHT mit einfacher Selektion lösen (das ergibt „mindestens"). Bei der Differenz auf PNR projizieren, bevor man subtrahiert. Join-Richtung W_ORT = G_ORT beachten.',
    },
  ],

  // ── Blatt 6 (Relationale Algebra: Anfragen & Optimierung) ─────────────────

  'blatt6-1': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Aus einem verfeinerten Schema liest man das ER-Diagramm „rückwärts": jeder Fremdschlüssel ist eine Beziehung. Wichtig: Verfeinerung fasst 1:1/1:N/N:1 in Entity-Relationen zusammen – nur N:M-Beziehungen (hier Hat_Zugriff_Auf) behalten eine eigene Relation. Bei den Anfragen gilt: σ filtert, π wählt Spalten, ⋈ verknüpft, γ aggregiert.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. FK MitarbeiterID in Notebook → besitzt (1:1); AbtNr in Mitarbeiter → arbeitet_in (N:1); AbtNr in Server → benutzt_von (1:N); ServerID in Serveranwendung → existieren_auf (N:1); eigene Relation Hat_Zugriff_Auf → N:M.\n2. Anfragen: Filter früh ansetzen, dann joinen, am Ende projizieren.\n3. „kein Notebook" → Differenz oder Anti-Semi-Join; „wie viele … je …" → γ mit count(*).',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: "a) σ[Marke='Acer' ∧ RAM>6](Notebook).\nd) π[…](σ[Geburtsjahr>2001](Mitarbeiter)) − π[…](σ[…](Mitarbeiter ⋈ Notebook)).\ne) γ[Bezeichnung; count(*)→AnzahlMitarbeiter](Mitarbeiter ⋈ Abteilung).",
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Nicht jede Beziehung des ER-Diagramms ist im verfeinerten Schema als eigene Relation sichtbar. „kein/ohne" lässt sich nicht mit einfacher Selektion ausdrücken – Differenz/Anti-Join nutzen. Bei der Aggregation das Gruppierungsattribut (Bezeichnung) angeben.',
    },
  ],

  'blatt6-2': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: '„oder" über ganze Spalten ist eine Vereinigung (∪). Ein Self-Join (eine Tabelle mit sich selbst) braucht Umbenennung (ρ), damit man die zwei Kopien (M1, M2) unterscheiden kann. Bei gleichnamigen Attributen in zwei Relationen ist ein Theta-Join (mit expliziter Bedingung) statt des natürlichen Joins nötig.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. a) π[Festplattenkapazität] beider Tabellen vereinigen.\n2. b) Abteilung ⋈ Server, dann Theta-Join mit Serveranwendung über ServerID, filtern auf Name=SalesForceCRM.\n3. c) ρ[M1](Mitarbeiter) × ρ[M2](Mitarbeiter), σ auf gleiche AbtNr und ungleiche ID, dann die vier Namensspalten projizieren.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'c) σ[M1.AbtNr=M2.AbtNr ∧ M1.ID≠M2.ID] ( ρ[M1](Mitarbeiter) × ρ[M2](Mitarbeiter) ). Besser „<" statt „≠", um (Tom,Lisa) und (Lisa,Tom) nicht doppelt zu erhalten.',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Beim Self-Join die Umbenennung (ρ) nicht vergessen, sonst sind die Spalten nicht unterscheidbar. Bei Server/Serveranwendung den Theta-Join über ServerID erzwingen (gleichnamige Spalten ServerID/Name!). „≠" lässt Spiegelpaare zu – „<" vermeidet sie.',
    },
  ],

  'blatt6-3': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Mehrfach-Joins über die Universitätsdatenbank. Man verkettet die Tabellen entlang ihrer gemeinsamen Schlüssel (Studenten–hören–Vorlesungen; Assistenten–Vorlesungen über Boss=gelesenVon; Vorlesungen–voraussetzen über VorlNr=Vorgänger).',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: "1. (1): σ[Name='Theophrastos'](Studenten) ⋈ hören ⋈ Vorlesungen, dann π[VorlNr,Titel].\n2. (2): Assistenten ⋈[Boss=gelesenVon] Vorlesungen, dann ⋈[VorlNr=Vorgänger] voraussetzen (Nachfolger existiert), σ[SWS=4], π[Name].",
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: '„hat eine Nachfolgervorlesung" ⇒ Join mit voraussetzen über VorlNr = Vorgänger. „hält Vorlesung" ⇒ Boss/gelesenVon = PersNr der/des Professor:in.',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Die richtige Join-Spalte wählen: gelesenVon (Vorlesung→Professor) vs. Boss (Assistent→Professor) vs. Vorgänger/Nachfolger (voraussetzen). σ[SWS=4] und der Bezug zu Nachfolgern dürfen nicht verlorengehen.',
    },
  ],

  'blatt6-4': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Praktische Einrichtung: einen SQL-Client installieren, eine individuelle Verbindung anlegen und mit zwei Skripten das Universitätsschema erzeugen (DDL) und befüllen (DML).',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. SQL-Client installieren (SQL Developer/DBeaver/DataGrip).\n2. Verbindung anlegen: Host zeus.informatik.hs-fulda.de, Port 1521, SID zeuspdb1, eigene Kennung.\n3. schema_rn.sql, dann daten.sql ausführen.\n4. Screenshots (Verbindung „Erfolgreich" + Tabellen/Daten) abgeben.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'Test der Daten: SELECT * FROM pruefen; Zum Zurücksetzen einfach beide Skripte erneut nacheinander ausführen.',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Reihenfolge beachten: erst schema_rn.sql (Tabellen), dann daten.sql (Daten). Bei „Tabelle existiert bereits" zuerst das Schema-Skript erneut laufen lassen.',
    },
  ],

  // ── Blatt 7 (SQL: SELECT, DDL/DML, Joins) ─────────────────────────────────

  'blatt7-1': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Ein SELECT-Statement hat eine feste Klauselreihenfolge. Geschrieben: SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY. Wichtig ist der Unterschied: WHERE filtert einzelne Zeilen (vor der Gruppierung), HAVING filtert Gruppen (nach GROUP BY).',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: 'Reihenfolge merken und jede Klausel zuordnen: SELECT=Spalten, FROM=Tabellen, WHERE=Zeilen, GROUP BY=Gruppen bilden, HAVING=Gruppen filtern, ORDER BY=sortieren.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'SELECT … FROM … WHERE … GROUP BY … HAVING … ORDER BY …\nLogische Auswertung dagegen: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY.',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'WHERE und HAVING verwechseln: Aggregatbedingungen (z. B. COUNT(*) > 3) gehören in HAVING, nicht in WHERE. SELECT-Spaltenaliase sind in WHERE noch nicht bekannt (erst in ORDER BY).',
    },
  ],

  'blatt7-2': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Jeder Algebra-Operator hat ein SQL-Pendant: σ → WHERE, π → SELECT-Spaltenliste, ⋈ → Join (implizit über WHERE oder explizit per JOIN…ON), ∪ → UNION. „oder" innerhalb einer Bedingung ist OR, „oder" über ganze Ergebnismengen ist UNION.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. π-Attribute → SELECT.\n2. Quelltabellen → FROM.\n3. σ-Bedingung → WHERE.\n4. ⋈ → Join-Bedingung in WHERE (z. B. gelesenVon = PersNr).\n5. ∪ → zwei SELECTs mit UNION verbinden.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: "e) SELECT Titel, Name FROM Vorlesungen, Professoren WHERE gelesenVon = PersNr;\ng) SELECT DISTINCT Name FROM Assistenten, Vorlesungen WHERE Boss = gelesenVon AND SWS = 4;",
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Die Join-Bedingung im WHERE nicht vergessen – sonst entsteht ein Kreuzprodukt. Texte in einfache Anführungszeichen. „oder" als UNION (Mengen) vs. OR (eine Bedingung) unterscheiden. DISTINCT gegen Duplikate setzen.',
    },
  ],

  'blatt7-3': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Algebra-Optimierung (heuristische Regeln): Selektionen so früh wie möglich (nahe an die Blätter), Kreuzprodukt + Selektion zu einem Join verschmelzen, nur benötigte Spalten weitertragen. Ziel: Zwischenergebnisse klein halten.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. σ[SWS=2] nach unten zur Tabelle Vorlesungen schieben (SWS gehört zu Vorlesungen).\n2. × + σ[VorlNr=Nachfolger] zu ⋈[VorlNr=Nachfolger] zusammenfassen.\n3. SQL: alle Join-Bedingungen in WHERE, v.SWS=2 und v.VorlNr=vs.Nachfolger.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'Regeln: σ[A](R × S) = σ[A](R) ⋈ S (A nur in R); σ[Bed](R × S) = R ⋈[Bed] S.\nSQL: SELECT DISTINCT p.Name FROM Professoren p, Vorlesungen v, voraussetzen vs WHERE p.PersNr=v.gelesenVon AND v.SWS=2 AND v.VorlNr=vs.Nachfolger;',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Eine Selektion nur dann zu einem Blatt schieben, wenn ihre Bedingung allein dieses Blatt betrifft. „für die es vorausgesetzte Vorlesungen gibt" ⇒ Join VorlNr = Nachfolger (in voraussetzen).',
    },
  ],

  'blatt7-4': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Mehrere Tabellen werden über ihre Schlüssel verkettet (Studenten–hoeren–Vorlesungen–Professoren). Ein Self-Join (eine Tabelle zweimal mit Aliasen s1/s2) findet Paare, die etwas gemeinsam haben (z. B. dieselbe Vorlesung).',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Den Pfad durch die Tabellen festlegen und alle Join-Bedingungen in WHERE schreiben.\n2. Endbedingung anhängen (z. B. p.Name = Sokrates).\n3. Self-Join: dieselbe Tabelle mit zwei Aliasen, über die gemeinsame VorlNr verbinden und s1 ≠ s2 fordern.\n4. „1.–4. Semester" → Semester BETWEEN 1 AND 4.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: "b) FROM Studenten s1, Studenten s2, hoeren h1, hoeren h2 WHERE s1.MatrNr=h1.MatrNr AND s2.MatrNr=h2.MatrNr AND h1.VorlNr=h2.VorlNr AND s1.MatrNr!=s2.MatrNr AND s2.Name='Fichte'.",
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Alle Join-Bedingungen angeben (n Tabellen ⇒ meist n−1 Verbindungen), sonst Kreuzprodukt. Beim Self-Join Aliase verwenden und s1.MatrNr ≠ s2.MatrNr fordern. DISTINCT gegen doppelte Treffer.',
    },
  ],

  'blatt7-5': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'DDL ändert die Struktur (CREATE/DROP TABLE), DML ändert die Daten (INSERT/UPDATE/DELETE). Jede Anweisung hat eine feste Form.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. CREATE TABLE name (Spalte Typ [NOT NULL], …).\n2. DROP TABLE name.\n3. INSERT INTO tab (Spalten) VALUES (Werte).\n4. DELETE FROM tab WHERE …\n5. UPDATE tab SET Spalte = Wert WHERE …',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: "CREATE TABLE Abschlussarbeiten (ArbeitNr INTEGER NOT NULL, Titel VARCHAR(50) NOT NULL, Abgabedatum DATE);\nUPDATE Professoren SET Rang='C4' WHERE Rang='C3';",
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Bei DELETE/UPDATE die WHERE-Klausel nicht vergessen – sonst werden ALLE Zeilen betroffen! Bei INSERT müssen Spaltenliste und VALUES zusammenpassen. Datentypen sinnvoll wählen (INTEGER, VARCHAR(n), DATE).',
    },
  ],

  // ── Blatt 8 (Northwind / SQL-Tutorial) ────────────────────────────────────

  'blatt8-1': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Northwind ist Microsofts klassische Beispiel-Handelsdatenbank (Firma „Northwind Traders", Lebensmittel-Im-/Export). Im Diagramm zeigt ein Schlüsselsymbol den Primärschlüssel; Linien sind Fremdschlüssel-Beziehungen mit 1 und ∞ für die 1- bzw. N-Seite.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Tabellen überfliegen (Customers, Orders, Products, …) → Vertriebsdomäne erkennen.\n2. Symbole deuten: Schlüssel = PK, Linie = FK, 1…∞ = 1:N.\n3. Mit der Verbindung DBNORTHWIND verbinden (Tabellen sind dort bereits aufgesetzt).',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'Beispielbeziehung: Customers (1) ──< Orders (∞): ein Kunde hat viele Bestellungen; Orders.CustomerID ist FK auf Customers.CustomerID.',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Das ∞-Zeichen markiert die N-Seite, nicht „beliebig/unbekannt". Benutzername und Passwort der Verbindung DBNORTHWIND sind gleichnamig.',
    },
  ],

  'blatt8-2': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Einfache SELECTs: Spaltenauswahl, Sortierung (ORDER BY), Zeilenfilter (WHERE) mit Vergleichsoperatoren (=, <>, <, >, <=, >=), NULL-Prüfung (IS NULL) und Wortoperatoren (BETWEEN, IN, LIKE, NOT).',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Gewünschte Spalten in SELECT.\n2. Filter in WHERE; Strings/Daten in einfache Anführungszeichen.\n3. NULL mit IS NULL / IS NOT NULL (nicht mit =) prüfen.\n4. Muster mit LIKE (% = beliebig viele Zeichen, _ = genau eines).\n5. ORDER BY am Schluss (ASC/DESC).',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: "WHERE LastName BETWEEN 'J' AND 'M'; WHERE SupplierID IN (1,3,4); WHERE ShipPostalCode LIKE '02389%'; WHERE ReportsTo IS NULL.",
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'NULL niemals mit = vergleichen. AND bindet stärker als OR → bei Mischung klammern. In Oracle Datumsliterale wie \'19-May-1997\'. WHERE kommt vor ORDER BY.',
    },
  ],

  'blatt8-3': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Fortgeschrittene SELECTs: berechnete Felder (mit AS benennen), Aggregatfunktionen (COUNT/SUM/AVG/MIN/MAX), Gruppieren mit GROUP BY und Filtern der Gruppen mit HAVING, dazu Funktionen (FLOOR, CEIL, TO_CHAR, LOWER …).',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Berechnung in SELECT, Ergebnis per AS benennen.\n2. „pro …" → GROUP BY; Bedingung über Aggregat → HAVING (nicht WHERE).\n3. Jede Nicht-Aggregat-Spalte im SELECT muss ins GROUP BY.\n4. Oracle-Funktionen nutzen (CEIL statt CEILING, || zum Verketten, TO_CHAR für Datum).',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'SELECT CustomerID, COUNT(OrderID) AS NumOrders FROM Orders GROUP BY CustomerID HAVING COUNT(OrderID) > 15 ORDER BY NumOrders DESC;',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Gruppieren nach dem Primärschlüssel + Aggregat ist sinnlos (jede Gruppe = 1 Zeile) – das ist die „ridiculous query"; ohne Aggregat lösbar. Aggregat-Bedingungen gehören in HAVING, nicht in WHERE. In HAVING keine Aliase verwenden.',
    },
  ],

  // ── Blatt 9 (Subqueries, Joins, Outer Joins, Unions; Anfragen auswerten) ──

  'blatt9-1': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Anfragen „im Kopf" auswerten: WHERE filtert Zeilen, count(*) zählt Zeilen, ohne WHERE bei zwei Tabellen entsteht das Kreuzprodukt, GROUP BY bildet Gruppen und HAVING filtert diese. Sonderfall „> 10" = echt größer.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Bedingung exakt nehmen: Semester > 10 schließt 10 aus.\n2. count(*) = Anzahl passender Zeilen; zwei Tabellen ohne WHERE → Zeilen1 × Zeilen2.\n3. GROUP BY SWS, dann HAVING count(*) > 2 anwenden.\n4. e) Joins über WHERE nachvollziehen und sortieren.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'c) 7 Professoren × 10 Vorlesungen = 70. d) SWS=4 (4 Vorl.) und SWS=2 (4 Vorl.) bleiben, SWS=3 (nur 2) fällt raus. e) prüfen ⋈ Vorlesungen ⋈ Professoren, SWS=4, ORDER BY Name.',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: '„> 10" ist nicht „>= 10" (Fichte = 10 fällt raus). Aggregatbedingungen gehören in HAVING, nicht in WHERE. Ohne Verbundbedingung entsteht ein Kreuzprodukt.',
    },
  ],

  'blatt9-2': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Eine Subquery ist eine in eine andere eingebettete SELECT-Abfrage; sie liefert Werte, auf die die äußere Abfrage filtert (= bei einem Wert, IN bei mehreren). Ein Join verknüpft Tabellen über gemeinsame Schlüssel und liefert Spalten aus mehreren Tabellen.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Subquery: erst die innere Frage lösen (z. B. CategoryID von Seafood), dann mit = oder IN außen filtern.\n2. Join: Tabellen in FROM, Verbindungen in ON/WHERE, am Ende projizieren/aggregieren.\n3. Aliase verwenden; bei „pro …" GROUP BY + HAVING.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'Subquery: WHERE CategoryID = (SELECT CategoryID FROM Categories WHERE CategoryName = Seafood).\nJoin: FROM Customers c JOIN Orders o ON (c.CustomerID = o.CustomerID).',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Bei einem Subquery-Ergebnis mit mehreren Zeilen IN statt = nutzen. Apostroph im String verdoppeln (Grandma Kelly\'\'s Homestead). Join-Bedingung nicht vergessen, sonst Kreuzprodukt.',
    },
  ],

  'blatt9-3': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Anfragen auf abstrakten Tabellen T1/T2 auswerten. Wichtig: AND bindet stärker als OR; eine Bedingung wie A = 3*E wirkt wie ein Join über das Kreuzprodukt; GROUP BY zählt je Gruppe.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: "1. a) klammern: (A>=9 AND D='S') OR C=20.\n2. b) für jede T1/T2-Kombi prüfen, ob A = 3·E.\n3. c) erst C>30 filtern, dann je B zählen.",
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: "a) {9} ∪ {5,11} = 5,9,11. b) E=4 kommt in T2 zweimal vor → (12,4) erscheint doppelt.",
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'AND/OR-Präzedenz beachten (AND zuerst). Doppelte T2-Zeilen erzeugen doppelte Join-Treffer. WHERE filtert VOR GROUP BY.',
    },
  ],

  'blatt9-4': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Outer Joins behalten auch Zeilen ohne Partner: LEFT JOIN alle Zeilen der linken Tabelle, RIGHT JOIN alle der rechten, FULL JOIN alle beider (fehlende Werte werden NULL). UNION setzt Ergebnismengen untereinander zusammen.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Welche Seite soll vollständig bleiben? → LEFT/RIGHT/FULL wählen.\n2. Restliche Abfrage wie beim Inner Join (ON, GROUP BY, ORDER BY).\n3. UNION: zwei/drei gleichartige SELECTs untereinander, am Ende ein ORDER BY.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'FROM Employees e LEFT JOIN Customers c ON (e.City = c.City). Union: SELECT … FROM Employees UNION SELECT … FROM Customers ORDER BY Contact.',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'LEFT/RIGHT nicht verwechseln (welche Tabelle vollständig?). FULL JOIN wird nicht von jeder DB unterstützt. Bei UNION müssen Spaltenanzahl/-reihenfolge/-typen passen; in Oracle ORDER BY nur über überall gleich benannte Spalten.',
    },
  ],

  'blatt9-5': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Weitere Auswertungen auf T1/T2: GROUP BY/HAVING, Inner Join, Subquery und Outer Join. Stringvergleiche sind case-sensitiv (\'m\' ≠ \'M\').',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. a) D=\'m\' trifft nichts → nur D=\'XXL\' zählt.\n2. d) Inner Join: Treffer A=E zählen.\n3. e) je B zählen + MIN(C), HAVING count>=2.\n4. g) Left Join = Treffer + alle partnerlosen linken Zeilen.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'd) A=2(1)+A=4(2)+A=6(2)+A=8(1) = 6. g) 6 Treffer + 8 partnerlose T1-Zeilen = 14.',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: '\'m\' ≠ \'M\' (case-sensitiv) – häufige Falle. Left Outer Join behält ALLE linken Zeilen (auch ohne Partner, mit NULLs). HAVING filtert Gruppen, WHERE einzelne Zeilen.',
    },
  ],

  // ── Blatt 10 (Integritätsbedingungen / Constraints) ───────────────────────

  'blatt10-1': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Constraints sichern die Datenintegrität: PRIMARY KEY (eindeutig + nicht null), NOT NULL, CHECK (erlaubte Werte), UNIQUE (keine Doppelung) und FOREIGN KEY (Verweis muss existieren). Beim FK legt ON DELETE fest, was beim Löschen des Verweisziels passiert.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Jede Spalte/Zeile im CREATE TABLE durchgehen und Constraints benennen.\n2. FK-Aktion beachten: SET NULL setzt den Verweis auf NULL, CASCADE löscht die abhängigen Zeilen mit.\n3. Professoren: PK PersNr, NOT NULL Name, CHECK Rang, UNIQUE Raum. Assistenten: PK, NOT NULL Name, FK Boss → Professoren (SET NULL).',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: "Rang CHARACTER(2) CHECK (Rang IN ('C2','C3','C4')); Raum INTEGER UNIQUE; FOREIGN KEY (Boss) REFERENCES Professoren ON DELETE SET NULL.",
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'SET NULL (Verweis wird NULL, Zeile bleibt) nicht mit CASCADE (Zeile wird gelöscht) verwechseln. UNIQUE erlaubt mehrere NULLs, ist aber nicht der Primärschlüssel. PK ist automatisch NOT NULL.',
    },
  ],

  'blatt10-2': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Das ER-Modell legt Schlüssel und Beziehungsstruktur fest (→ Primärschlüssel, Fremdschlüssel, zusammengesetzte Schlüssel der N:M-Beziehungen). Wertebereiche, UNIQUE, NOT NULL und referenzielle Aktionen kommen erst im Relationenschema dazu.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Aus dem ER ableitbar: PKs (MatrNr, PersNr, VorlNr), FK-Struktur (gelesenVon, Boss), zusammengesetzte Schlüssel (hören = (MatrNr,VorlNr)).\n2. Erst im Schema: CHECK (Semester 1–13, Rang, Note 0,7–5,0), UNIQUE (Raum), NOT NULL, ON DELETE-Aktionen.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'ER: „prüfen ist N:M“ ⇒ Schlüssel (MatrNr,VorlNr). Schema-Zusatz: Note CHECK (0.7–5.0), prüfen.PersNr ON DELETE SET NULL.',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Wertebereichs- und UNIQUE-Bedingungen sind NICHT im ER-Modell sichtbar – sie werden erst beim Anlegen ergänzt. Die ON-DELETE-Aktionen sind eine reine Schema-Entscheidung.',
    },
  ],

  'blatt10-3': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Fremdschlüssel verhindern „dangling references": Eine referenzierte Zeile/Tabelle kann nicht gelöscht werden, solange Verweise darauf bestehen – außer es ist ON DELETE CASCADE/SET NULL definiert.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Einfügen in der richtigen Reihenfolge (erst Professor 1111, dann Assistent mit Boss=1111).\n2. DROP/DELETE scheitert, wenn eine andere Tabelle referenziert (hören/prüfen/voraussetzen → Vorlesungen).\n3. Constraints im SQL Developer (Reiter „Constraints") ansehen.\n4. Verhalten ändern: prüfen mit VorlNr … ON DELETE CASCADE neu anlegen und mit daten.sql neu befüllen.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'VorlNr INTEGER REFERENCES Vorlesungen ON DELETE CASCADE → Löschen der Vorlesung 5041 entfernt nun auch die prüfen-Zeilen.',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Ohne CASCADE in prüfen blockiert der VorlNr-FK das Löschen der Vorlesung (auch wenn hören/voraussetzen CASCADE haben). Eine Tabelle lässt sich nicht droppen, solange sie referenziert wird. Daten nach dem Neuaufbau wieder einspielen.',
    },
  ],

  'blatt10-4': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Jede DML/DDL-Operation wird gegen alle Constraints geprüft. Eine Operation schlägt fehl, wenn sie einen PK doppelt belegt, einen FK ins Leere zeigt oder eine referenzierte Zeile/Tabelle ohne passende Aktion entfernen würde.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. DELETE/DROP: Gibt es Verweise darauf? Welche ON-DELETE-Aktion? Ohne Aktion → blockiert.\n2. INSERT: Existiert der Fremdschlüsselwert? Ist der Primärschlüssel noch frei? Liegt der Wert im CHECK-Bereich?',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'Ethik (5041) löschen scheitert an prüfen (VorlNr-FK ohne CASCADE). INSERT mit PersNr 2138 scheitert (kein solcher Professor). INSERT (28106,5001,…) scheitert (PK bereits vorhanden).',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'CASCADE in EINER referenzierenden Tabelle reicht nicht – blockiert eine ANDERE ohne Aktion, scheitert die ganze Operation. DROP TABLE scheitert an Referenzen selbst bei leerer Tabelle. PK-Duplikate immer prüfen.',
    },
  ],

  'blatt10-5': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Jede INSERT-Anweisung wird gegen ALLE Constraints der Tabelle geprüft: Primärschlüssel (CR1/CS1), CHECK-Bedingungen (CR2 Länge, CR3 Werteliste, CS3 Bereich), UNIQUE (CR4) und Fremdschlüssel (CS2). Ein einziger verletzter Constraint verhindert das Einfügen.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. PK: ist die Kombination (A,C) bzw. (A,E) noch frei?\n2. CHECK: liegt der Wert im erlaubten Bereich / hat B die erlaubte Länge?\n3. UNIQUE: ist D schon vergeben?\n4. FK: existiert der Zielwert (E als D in R)?',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: "LENGTH('gruen') = 5 ∉ {3,4,6,7} → CR2. D = 256 schon vorhanden → CR4. (A,E) = (9,32) schon vorhanden → CS1.",
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Jede Anweisung EINZELN betrachten (vorherige Einfügungen gelten als zurückgesetzt). UNIQUE(D) erlaubt jeden D-Wert nur einmal. FK verlangt, dass E als D-Wert in R existiert.',
    },
  ],

  // ── Blatt 11 (Funktionale Abhängigkeiten & Normalisierung) ────────────────

  'blatt11-1': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'A → B heißt: gleiche A-Werte erzwingen gleiche B-Werte. Eine Ausprägung kann eine FD nur widerlegen (Gegenbeispiel), nie beweisen. Trivial ist A → B, wenn B in A enthalten ist (rechte Seite ⊆ linke Seite).',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Für A → B: Tupel mit gleichem A suchen; weichen die B-Werte ab → FD gilt nicht.\n2. Trivialität prüfen: steht die rechte Seite schon links?\n3. Konstante Spalten (z. B. C immer c₁) werden von allem bestimmt.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'C → D gilt NICHT, wenn C konstant ist, D aber variiert (c₁→d₁ und c₁→d₂). D → D und AB → B sind trivial.',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Eine FD nicht „beweisen" wollen – die Ausprägung zeigt nur, ob sie verletzt wird. Triviale FDs (rechte Seite ⊆ linke) erkennen. Konstante Spalten sind immer funktional bestimmt.',
    },
  ],

  'blatt11-2': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Die Attributhülle X⁺ ist die Menge aller Attribute, die aus X über die FDs ableitbar sind. Ist X⁺ = alle Attribute, ist X ein Superschlüssel; ist X dabei minimal, ein Kandidatenschlüssel. Die kanonische Überdeckung ist eine minimale, äquivalente FD-Menge.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Hülle: mit {X} starten, FDs anwenden, deren linke Seite enthalten ist, bis nichts mehr dazukommt.\n2. Kandidatenschlüssel: Attribute, die nie rechts vorkommen, müssen im Schlüssel sein.\n3. Fc: Linksreduktion → Rechtsreduktion → leere RHS entfernen → gleiche LHS zusammenfassen.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'A⁺: {A} →(A→BC) {A,B,C} →(AB→D) {A,B,C,D}. Fc von {A→BC, B→C, AB→D}: A→BD, B→C.',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Bei der Hülle alle anwendbaren FDs nutzen, nicht zu früh stoppen. Reihenfolge Fc: erst LINKS-, dann RECHTSreduktion. Ein Attribut, das nie rechts steht, gehört zwingend in jeden Schlüssel.',
    },
  ],

  'blatt11-4': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Mehrere Kandidatenschlüssel sind möglich, wenn sich Attribute gegenseitig bestimmen (Zyklus). Der Synthesealgorithmus baut aus der kanonischen Überdeckung eine verlustlose, abhängigkeitserhaltende 3NF-Zerlegung.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. A⁺ berechnen → Superschlüssel? 2. Alle minimalen Schlüssel finden (hier {A},{C},{E},{F}). 3. Fc bestimmen. 4. Je FD ein Schema Rα = α∪β. 5. Schema mit Kandidatenschlüssel sicherstellen; enthaltene Schemata streichen.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'Fc = {A→C, E→A, F→CD, C→BEF} → R₁{A,C}, R₂{E,A}, R₃{F,C,D}, R₄{C,B,E,F}. R₁ enthält Schlüssel → fertig.',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Bei der Linksreduktion mit Hüllen-Tests sauber prüfen, welches Attribut wirklich überflüssig ist. Erst NACH Fc die Schemata bilden. Kandidatenschlüssel-Schema und Eliminierungs-Schritt nicht vergessen.',
    },
  ],

  'blatt11-3': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Die kanonische Überdeckung ist nicht eindeutig: Der Algorithmus lässt offen, in welcher Reihenfolge die FDs (v. a. bei der Rechtsreduktion) bearbeitet werden. Verschiedene Reihenfolgen liefern verschiedene, aber äquivalente Fc.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: 'Ein Gegenbeispiel mit zwei sich gegenseitig bestimmenden FDs konstruieren und beide Bearbeitungsreihenfolgen durchspielen.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'F = {A→BC, B→AC}: je nach Reihenfolge Fc = {A→B, B→AC} ODER Fc = {A→BC, B→A}.',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Nicht behaupten, Fc sei eindeutig. Wichtig: Die verschiedenen Ergebnisse sind äquivalent (decken dieselben FDs ab), nur nicht identisch.',
    },
  ],

  'blatt11-5': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Realistisches Synthese-Beispiel: aus den FDs Kandidatenschlüssel und Fc bestimmen und das Schema in 3NF-Relationen zerlegen (je FD ein Schema).',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Schlüssel: MatrNr bestimmt (via FD 3) alles → einziger Kandidatenschlüssel {MatrNr}.\n2. Rechtsreduktion: BossName aus (1) streichen (über (2) ableitbar); (3) auf SName, Semester, SWohnOrt, PersNr reduzieren.\n3. Je FD ein Schema; Studenten enthält den Schlüssel MatrNr.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'Assistenten{PersNr, Name, Fachgebiet, BossPersNr}; Boss{BossPersNr, BossName}; Studenten{MatrNr, SName, Semester, SWohnOrt, PersNr}.',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Transitiv ableitbare Attribute (BossName, die Assistentendaten in (3)) bei der Rechtsreduktion entfernen, sonst entstehen redundante Schemata. Den Kandidatenschlüssel im Endschema prüfen.',
    },
  ],

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

  // ── Probeklausur 2 – Aufgabe 1 (ER-Begriffe) ─────────────────────────────

  'probeklausur2-1': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Ein ER-Diagramm (Entity-Relationship) modelliert die Miniwelt mit festen Symbolen: Rechteck/Kasten = Entitätstyp (eine Klasse von Objekten), Raute = Beziehungstyp, Oval = Attribut, unterstrichenes Oval = Schlüsselattribut. Objekt A ist hier der Kasten „Student".',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: 'A ist ein Kasten → also ein Entitätstyp. Es ist NICHT eine „Entität": Eine Entität wäre ein konkretes Objekt (z. B. „Max Mustermann, MatrNr 12345"); der Kasten beschreibt die ganze Klasse.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'Antwort: A ist ein Entitätstyp (Entity-Typ).\n\nEntitätstyp = Klasse/Schablone („Student")\nEntität = konkretes Objekt („Max, MatrNr 12345")',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Entitätstyp ≠ Entität. Der Kasten steht für den Typ, nicht für eine einzelne Instanz.',
    },
  ],

  'probeklausur2-2': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Eine Raute im ER-Diagramm ist immer ein Beziehungstyp (Relationship): Sie verknüpft zwei (oder mehr) Entitätstypen. Objekt B ist die Raute „besucht" zwischen Student und Vorlesung.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: 'B ist eine Raute → Beziehungstyp / Beziehung / Relationship. „besucht" hält fest, welcher Student welche Vorlesung besucht.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'Antwort: B ist eine Beziehung (Beziehungstyp).\n\nWeitere Beispiele für Beziehungen: „arbeitet_in", „hat_bestellt".',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Nicht mit „Relation" im Sinne einer Datenbanktabelle verwechseln. Im ER-Modell heißt die Raute Beziehungstyp.',
    },
  ],

  'probeklausur2-3': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Attribute werden als Ovale gezeichnet. Ist ein Attribut UNTERSTRICHEN, ist es ein Schlüsselattribut: Sein Wert identifiziert eine Entität eindeutig. Objekt C ist das unterstrichene Oval „MatrNr".',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: 'C ist unterstrichen → Schlüsselattribut. Die Matrikelnummer gehört zu genau einem Studenten und identifiziert ihn eindeutig.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'Antwort: C ist ein Schlüsselattribut.\n\nErkennungsmerkmal: Unterstreichung im ER-Diagramm (z. B. MatrNr, ISBN, ArtikelNr).',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Im ER-Modell sagt man „Schlüsselattribut", nicht „Primärschlüssel" (das ist der relationale Begriff).',
    },
  ],

  'probeklausur2-4': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Ein Oval OHNE Unterstreichung ist ein gewöhnliches Attribut: Es beschreibt die Entität, identifiziert sie aber nicht eindeutig. Objekt D ist das nicht unterstrichene Oval „Name".',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: 'D ist nicht unterstrichen → (normales) Attribut. „Name" beschreibt den Studenten, ist aber nicht eindeutig (mehrere Studenten können „Müller" heißen).',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'Antwort: D ist ein (normales) Attribut.\n\nWeitere Beispiele: Geburtstag, Titel, Credits.',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Der Unterschied zum Schlüsselattribut ist allein die Unterstreichung.',
    },
  ],

  'probeklausur2-5': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Die Funktionalität (Kardinalität) einer Beziehung sagt, wie viele Entitäten der einen Seite mit wie vielen der anderen verbunden sind. Typen: 1:1, 1:N und n:m. n:m (viele-zu-viele) heißt: beide Seiten können mehrere Partner haben. E und F sind die beiden Kanten der Beziehung „besucht".',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: 'Beide Richtungen prüfen:\n1. Ein Student kann MEHRERE Vorlesungen besuchen → Vorlesungs-Seite „viele"\n2. Eine Vorlesung wird von MEHREREN Studenten besucht → Studenten-Seite „viele"\n→ beide Seiten „viele" ⇒ n:m.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'Antwort: n : m.\n\n1:1 – ein Chef ↔ eine Sekretärin\n1:N – eine Abteilung ↔ viele Mitarbeiter\nn:m – viele Studenten ↔ viele Vorlesungen',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Immer BEIDE Richtungen prüfen. Nur wenn beide Seiten „viele" zulassen, ist es n:m.',
    },
  ],

  // ── Probeklausur 2 – Aufgabe 2 (ER → Schema) ─────────────────────────────

  'probeklausur2-11': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Überführung ER → relationales Schema (Standardregel): Jeder Entitätstyp wird zu einer eigenen Relation (Tabelle). Jede Beziehung wird – zunächst – ebenfalls zu einer eigenen Relation, die die Schlüssel aller beteiligten Entitätstypen als Fremdschlüssel plus ihre eigenen Beziehungsattribute enthält. Schreibweise „A: {[a]}" = Relation A mit Attribut a; unterstrichen = Primärschlüssel.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: 'Gegeben: Entitätstyp A (Schlüssel a), Entitätstyp B (Schlüssel b), Beziehung R (Attribut r).\n1. A → Relation A: {[a]}\n2. B → Relation B: {[b]}\n3. R → Relation R: {[a, b, r]} mit Primärschlüssel (a, b)',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'A: {[a]}\nB: {[b]}\nR: {[a, b, r]}   -- Schlüssel (a,b); a→A, b→B als FK; r = Beziehungsattribut',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Das Beziehungsattribut r gehört in die Beziehungsrelation R, nicht in A oder B. Der Primärschlüssel von R ist das Paar (a, b).',
    },
  ],

  'probeklausur2-12': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Verfeinerung bei einer 1:N-Beziehung: Eine eigene Beziehungsrelation ist unnötig. Man bettet die Beziehung in die Relation auf der N-Seite ein – diese bekommt den Schlüssel der 1-Seite als Fremdschlüssel plus das Beziehungsattribut. Grund: Bei 1:N gehört zu jedem B genau ein A, das passt als einzelner Wert in jede B-Zeile.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: 'Hier ist A die 1-Seite, B die N-Seite.\n1. R in B einbauen: B bekommt den FK a (von A) und das Attribut r\n2. Ergebnis: A: {[a]}, B: {[a, b, r]}\n3. Der Primärschlüssel von B bleibt b (nicht (a,b)); a ist nur Fremdschlüssel.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'A: {[a]}\nB: {[a, b, r]}   -- b = PK; a = FK zu A; r = Beziehungsattribut\n\n-- R entfällt als eigene Relation',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Die Einbettung geht in die N-Seite (B), nicht in die 1-Seite. Würde man R in A einbauen, müsste A mehrere b-Werte halten – das geht in einem Attribut nicht. Der PK von B bleibt b.',
    },
  ],

  // ── Probeklausur 2 – Aufgabe 3 (min,max-Notation) ────────────────────────
  // Kneipen: PietsPub, OskarsOase, SamsSpelunke
  // BESTSELLER: OskarsOase→Klecksex, SamsSpelunke→Montcroix (PietsPub fehlt)

  'probeklausur2-21': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: '(min,max)-Notation: Die Angabe [min,max] an der Seite eines Entitätstyps sagt, an WIE VIELEN Beziehungen jede einzelne Entität dieses Typs teilnimmt – mindestens min, höchstens max. Hier geht es um BESTSELLER, BIER-Seite [0,n].',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: 'min = 0: ein Bier MUSS kein Bestseller sein → immer erlaubt.\nmax = n: beliebig viele → keine Obergrenze → immer erlaubt.\n→ [0,n] ist korrekt (kann durch keine Ausprägung widerlegt werden).',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'Antwort: korrekt.\n\n[0,n] = „mindestens 0, höchstens unbegrenzt viele" – trivial immer erfüllt.',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: '[0,n] ist nie falsch. Die eigentliche Klausurfrage ist meist, ob eine SPEZIFISCHERE Angabe (z. B. [0,2]) besser passt – hier aber wird nur nach Korrektheit gefragt.',
    },
  ],

  'probeklausur2-22': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'BESTSELLER, KNEIPE-Seite [1,1] würde bedeuten: JEDE Kneipe hat genau einen Bestseller. Maßgeblich sind die gespeicherten Werte: In BESTSELLER stehen OskarsOase→Klecksex und SamsSpelunke→Montcroix. PietsPub kommt NICHT vor.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. PietsPub hat keinen Bestseller → 0 Beziehungen → min muss 0 sein, nicht 1\n2. Jede Kneipe hat höchstens einen Bestseller → max = 1\n→ [1,1] ist falsch; korrekt wäre [0,1].',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'BESTSELLER:\nOskarsOase   → Klecksex\nSamsSpelunke → Montcroix\n(PietsPub fehlt → min = 0)\n→ korrekt: [0,1]',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Wenn auch nur EINE Entität gar nicht in der Beziehung vorkommt, muss min = 0 sein. Immer alle Entitäten prüfen, nicht nur die vorkommenden.',
    },
  ],

  'probeklausur2-23': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'VERKAUFT, KNEIPE-Seite [0,2] würde bedeuten: jede Kneipe verkauft höchstens 2 Biere. Laut gespeicherten Werten verkaufen OskarsOase und SamsSpelunke aber je 3 Biere, PietsPub gar keins.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. PietsPub: 0 verkaufte Biere → min = 0 (stimmt)\n2. OskarsOase = 3, SamsSpelunke = 3 → höchste Anzahl ist 3 → max muss 3 sein\n→ [0,2] ist falsch; korrekt wäre [0,3].',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'VERKAUFT (Kneipe-Seite):\nPietsPub → 0,  OskarsOase → 3,  SamsSpelunke → 3\n→ korrekt: [0,3]',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'max immer aus dem GRÖSSTEN tatsächlich vorkommenden Wert ablesen, nicht schätzen.',
    },
  ],

  'probeklausur2-24': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'VERKAUFT, BIER-Seite [1,n] würde bedeuten: jedes Bier wird in mindestens einer Kneipe verkauft. Gegenbeispiel aus den Daten: das Bier Meerdinger kommt in VERKAUFT gar nicht vor.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Meerdinger: in 0 Kneipen verkauft → min muss 0 sein, nicht 1\n2. Ein Bier wird in höchstens 2 Kneipen verkauft → max = 2\n→ [1,n] ist falsch; korrekt wäre [0,2] (allgemeiner: [0,n]).',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'VERKAUFT (Bier-Seite):\nMeerdinger → 0 Kneipen (min = 0)\nmax = 2 Kneipen je Bier\n→ korrekt: [0,2]',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'min = 1 behauptet, ALLE Biere seien irgendwo im Verkauf – ein einziges fehlendes Bier (Meerdinger) widerlegt das.',
    },
  ],

  'probeklausur2-25': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'BRAUT, BIER-Seite [1,2] würde bedeuten: jedes Bier wird von mindestens einer Brauerei gebraut. Gegenbeispiel: Meerdinger und Klecksdry kommen in BRAUT nicht vor.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Meerdinger und Klecksdry: von 0 Brauereien gebraut → min muss 0 sein\n2. Ein Bier wird von höchstens 2 Brauereien gebraut → max = 2\n→ [1,2] ist falsch; korrekt wäre [0,2].',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'BRAUT (Bier-Seite):\nMeerdinger → 0,  Klecksdry → 0  (min = 0)\nmax = 2 Brauereien je Bier\n→ korrekt: [0,2]',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Auch hier gilt: kommt eine Entität gar nicht in der Beziehung vor, muss min = 0 sein.',
    },
  ],

  'probeklausur2-26': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'BRAUT, BRAUEREI-Seite [2,4] bedeutet: jede Brauerei braut mindestens 2 und höchstens 4 Biere. Die gespeicherten Werte bestätigen das.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Klecks braut 2 Biere → min = 2 stimmt\n2. Rotstift braut 4 Biere → max = 4 stimmt\n3. Es gibt nur diese beiden Brauereien, beide liegen zwischen 2 und 4\n→ [2,4] ist korrekt.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'BRAUT (Brauerei-Seite):\nKlecks → 2 Biere (min = 2)\nRotstift → 4 Biere (max = 4)\n→ [2,4] korrekt ✓',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Wenn min und max exakt zu den Daten passen und es kein Gegenbeispiel gibt, ist die Angabe korrekt.',
    },
  ],

  'probeklausur2-27': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Die Anmerkungen fassen das Grundprinzip aller (min,max)-Fragen zusammen: NICHT raten, sondern die korrekten Werte aus der konkreten Ausprägung der Beziehungstabelle ablesen.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: 'Systematisch je Beziehungsseite:\n1. Alle Entitäten des Typs auflisten (z. B. alle 3 Kneipen)\n2. Für jede zählen, an wie vielen Beziehungen sie teilnimmt\n3. min = kleinste, max = größte dieser Anzahlen',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'Kneipen: PietsPub, OskarsOase, SamsSpelunke\nBiere: Klecksport, Klecksex, Meerdinger, Klecksdry, Montcroix, Warstone\nBrauereien: Klecks, Rotstift\nBESTSELLER: OskarsOase→Klecksex, SamsSpelunke→Montcroix',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Entitäten, die in der Beziehungstabelle gar nicht auftauchen, haben 0 Beziehungen → min = 0. Das ist die häufigste Fehlerquelle (z. B. PietsPub, Meerdinger).',
    },
  ],

  // ── Probeklausur 2 – Aufgabe 4 (SQL-Select) ──────────────────────────────
  // T1(A,B,C,D): (1,blau,10,X)(2,blau,40,X)(3,rosa,30,S)(4,orange,10,M)(5,orange,20,M)
  //   (6,orange,50,X)(7,orange,50,X)(8,magenta,50,S)(9,magenta,40,S)(10,violett,10,XXL)
  //   (11,violett,20,XXL)(12,violett,10,M)
  // T2(E,B,C): (2,blau,20)(4,blau,40)(4,blau,50)(6,orange,20)(6,orange,50)(8,orange,50)

  'probeklausur2-31': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'WHERE filtert Zeilen. Wichtig ist der Operatorvorrang: AND bindet STÄRKER als OR. Die Bedingung A > 6 AND D = \'S\' OR C = 30 wird daher gelesen als (A > 6 AND D = \'S\') OR (C = 30). Eine Zeile kommt ins Ergebnis, sobald einer der beiden OR-Teile wahr ist.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Teil (A > 6 AND D = \'S\'): A > 6 sind Zeilen 7–12; davon D = \'S\' nur Zeile 8 und 9 (beide magenta, D=S) → A = 8, 9\n2. Teil (C = 30): nur Zeile 3 (rosa, C=30) → A = 3\n3. Vereinigung: A ∈ {3, 8, 9}.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: "SELECT A FROM T1\nWHERE A > 6 AND D = 'S' OR C = 30;\n\n-- Ergebnis: 3, 8, 9",
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Den AND-vor-OR-Vorrang übersehen. Die Bedingung NICHT als A > 6 AND (D = \'S\' OR C = 30) lesen – setze gedanklich die Klammern um den AND-Teil.',
    },
  ],

  'probeklausur2-32': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Hier ist das OR ausdrücklich geklammert: A > 3 UND (D = \'M\' ODER D = \'S\'). DISTINCT entfernt am Ende doppelte B-Werte, sodass jede Farbe nur einmal erscheint.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. A > 3 und D ∈ {M, S}: Zeile 4 (orange, M), 5 (orange, M), 8 (magenta, S), 9 (magenta, S), 12 (violett, M)\n2. B-Werte dieser Zeilen: orange, orange, magenta, magenta, violett\n3. DISTINCT → { orange, magenta, violett }.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: "SELECT DISTINCT B FROM T1\nWHERE A > 3 AND (D = 'M' OR D = 'S');\n\n-- Ergebnis: violett, magenta, orange",
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Ohne DISTINCT erschienen orange und magenta doppelt. Die Klammer um das OR ist nötig, sonst greift der AND-vor-OR-Vorrang.',
    },
  ],

  'probeklausur2-33': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'FROM T1, T2 bildet das Kreuzprodukt (jede T1-Zeile mit jeder T2-Zeile). WHERE 2*A = E behält nur passende Paare. Achtung: Kommt ein E-Wert in T2 mehrfach vor, entstehen entsprechend mehrere Treffer.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: 'E-Werte in T2: 2, 4, 4, 6, 6, 8. Passendes A = E/2 suchen:\n• E=2 → A=1 (1×) → (1,2)\n• E=4 → A=2, in T2 zweimal → (2,4), (2,4)\n• E=6 → A=3, zweimal → (3,6), (3,6)\n• E=8 → A=4 (1×) → (4,8)',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'SELECT A, E FROM T1, T2\nWHERE 2 * A = E;\n\n-- Ergebnis: (1,2),(2,4),(2,4),(3,6),(3,6),(4,8)',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Die doppelten T2-Zeilen (E=4 und E=6 je zweimal) übersehen → es sind 6 Ergebniszeilen, nicht 4.',
    },
  ],

  'probeklausur2-34': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'FROM T1, T2 ohne WHERE ergibt das volle Kreuzprodukt: jede Zeile von T1 mit jeder Zeile von T2 kombiniert. COUNT(*) zählt diese Kombinationen.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: 'T1 hat 12 Zeilen, T2 hat 6 Zeilen → 12 · 6 = 72.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'SELECT COUNT(*) FROM T1, T2;\n\n-- Ergebnis: 72',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Das Kreuzprodukt MULTIPLIZIERT die Zeilenzahlen (12·6), es addiert sie nicht.',
    },
  ],

  'probeklausur2-35': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'GROUP BY B bildet eine Gruppe je Farbe in Spalte B; COUNT(*) zählt die Zeilen je Gruppe.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: 'Farben in T1 zählen:\n• blau: Z.1, 2 → 2\n• rosa: Z.3 → 1\n• orange: Z.4, 5, 6, 7 → 4\n• magenta: Z.8, 9 → 2\n• violett: Z.10, 11, 12 → 3\nKontrolle: 2+1+4+2+3 = 12.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'SELECT B, COUNT(*) FROM T1\nGROUP BY B;\n\n-- Ergebnis: blau 2, rosa 1, orange 4, magenta 2, violett 3',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Ohne GROUP BY liefert COUNT(*) die Gesamtzahl 12. Reihenfolge ohne ORDER BY beliebig.',
    },
  ],

  'probeklausur2-36': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Reihenfolge: WHERE filtert die Zeilen VOR der Gruppierung. Erst C > 30 anwenden, dann nach Spalte D gruppieren und je Gruppe zählen.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. C > 30 → übrig: Z.2 (C=40, D=X), Z.6 (50, X), Z.7 (50, X), Z.8 (50, S), Z.9 (40, S)\n2. GROUP BY D: X = 3 (Z.2,6,7), S = 2 (Z.8,9).',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'SELECT D, COUNT(*) FROM T1\nWHERE C > 30\nGROUP BY D;\n\n-- Ergebnis: X 3, S 2',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'C = 30 (Zeile 3) ist NICHT > 30 und fällt weg. Auf > vs. >= achten.',
    },
  ],

  'probeklausur2-37': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Volle Pipeline: WHERE (Zeilen filtern) → GROUP BY (gruppieren) → HAVING (ganze Gruppen filtern) → MAX(C) je Gruppe. HAVING wirkt auf aggregierten Werten (z. B. COUNT), WHERE nicht. D IN (\'S\',\'M\') heißt D ist \'S\' oder \'M\'.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. WHERE D ∈ {S, M}: Z.3 (rosa, S), 4 (orange, M), 5 (orange, M), 8 (magenta, S), 9 (magenta, S), 12 (violett, M)\n2. Gruppen + Anzahl: rosa 1, orange 2, magenta 2, violett 1\n3. HAVING COUNT(*) >= 2 → orange, magenta\n4. MAX(C): orange = max(10,20) = 20; magenta = max(50,40) = 50.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: "SELECT B, MAX(C) FROM T1\nWHERE D IN ('S','M')\nGROUP BY B\nHAVING COUNT(*) >= 2;\n\n-- Ergebnis: magenta 50, orange 20",
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'COUNT(*) kann nicht in WHERE stehen – dafür ist HAVING da. Erst die WHERE-gefilterten Zeilen notieren, dann gruppieren.',
    },
  ],

  'probeklausur2-38': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Verbund über T1.A = T2.E (Kreuzprodukt + Filter). Da A in T1 eindeutig ist, liefert jede T2-Zeile höchstens einen Treffer.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: 'E-Werte in T2 mit passendem A in T1:\n• E=2 → A=2 existiert → 1\n• E=4 (in T2 zweimal) → A=4 existiert → 2\n• E=6 (zweimal) → A=6 existiert → 2\n• E=8 → A=8 existiert → 1\nSumme: 1+2+2+1 = 6.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'SELECT COUNT(*) FROM T1, T2\nWHERE T1.A = T2.E;\n\n-- Ergebnis: 6',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Doppelte E-Werte in T2 zählen doppelt. E-Werte ohne passendes A in T1 liefern keinen Treffer (hier kommen alle vor: 2,4,6,8).',
    },
  ],

  'probeklausur2-39': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Verbund über ZWEI Bedingungen, die gleichzeitig gelten müssen: T1.B = T2.B (gleiche Farbe) UND T1.A = T2.E. Ausgegeben werden A und die Farbe T1.B.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: 'Je T2-Zeile (E, B) die T1-Zeile mit A = E suchen und Farbe vergleichen:\n• (2, blau) → A=2 ist blau ✓ → (2, blau)\n• (4, blau) → A=4 ist orange ✗\n• (6, orange) → A=6 ist orange ✓ → (6, orange)\n• (6, orange) → A=6 ist orange ✓ → (6, orange)\n• (8, orange) → A=8 ist magenta ✗',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'SELECT A, T1.B FROM T1, T2\nWHERE T1.B = T2.B AND T1.A = T2.E;\n\n-- Ergebnis: (2,blau), (6,orange), (6,orange)',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Beide Bedingungen prüfen, nicht nur eine. Beide T2-Zeilen mit E=6 passen → (6,orange) erscheint zweimal.',
    },
  ],

  'probeklausur2-310': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Eine IN-Unterabfrage: Die innere SELECT-Abfrage wird zuerst ausgewertet und liefert eine Wertemenge. Die äußere Abfrage gibt die Zeilen aus, deren Spalte C in dieser Menge liegt. DISTINCT entdoppelt am Ende die Farben.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Unterabfrage SELECT C FROM T2 WHERE E > 4: T2-Zeilen mit E > 4 sind die drei orange-Zeilen (E=6,6,8) mit C = 20, 50, 50 → Menge { 20, 50 }\n2. Äußere Abfrage: T1-Zeilen mit C ∈ {20,50}: Z.5 (orange,20), 11 (violett,20), 6 (orange,50), 7 (orange,50), 8 (magenta,50)\n3. DISTINCT B → { orange, violett, magenta }.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'SELECT DISTINCT B FROM T1\nWHERE C IN (SELECT C FROM T2 WHERE E > 4);\n\n-- Ergebnis: violett, magenta, orange',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Erst die Unterabfrage komplett auswerten, dann die äußere. Die Menge enthält Werte (Duplikate egal).',
    },
  ],

  'probeklausur2-311': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'NULL-Falle: Jeder Vergleich mit NULL über „<>" (oder „=") ergibt UNKNOWN – nie TRUE. Die WHERE-Klausel übernimmt nur Zeilen mit TRUE, daher wird KEINE Zeile ausgewählt – obwohl alle B-Werte gefüllt sind.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. B <> NULL ist für jede Zeile UNKNOWN\n2. WHERE übernimmt nur TRUE → keine Zeile\n3. COUNT(*) zählt 0 Zeilen → Ergebnis 0.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: '-- Falsch (immer UNKNOWN):  WHERE B <> NULL   → 0\n-- Korrekt:                 WHERE B IS NOT NULL → 12\n\n-- Diese Aufgabe liefert: 0',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Erwarten, dass 12 herauskommt, weil alle B gefüllt sind. Für NULL-Tests IMMER IS (NOT) NULL statt = / <> verwenden.',
    },
  ],

  // ── Probeklausur 2 – Aufgabe 5 (Integritätsbedingungen S/R) ──────────────
  // S(A,D,E): (1,3,–)(3,1,1)(4,3,3)(2,4,4)(8,8,8)(9,9,9)   S.A = {1,2,3,4,8,9}
  // R(A,B,C,F,G): (2,1,–,–,5)(3,4,2,1,–)(2,2,3,4,4)(4,1,–,–,4)(1,3,3,4,–)
  //   R.(A,B) = {(2,1),(3,4),(2,2),(4,1),(1,3)}
  // CS1 PK(A); CS2 UNIQUE(E); CS3 CHECK((D+E)<=10 OR (A+D)=2*E); CS4 CHECK(D=NULL);
  // CS5 FK(E)->S(A); CS6 CHECK(2*E>=2*D); CS7 PK(A,B);
  // CS8 CHECK((B<G) OR (A=2) AND (A=C)); CS9 CHECK((A!=C) OR (A=1));
  // CS10 FK(B)->S(A); CS11 FK(C,F)->R(A,B)

  'probeklausur2-41': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Wichtigste Regel: Ein CHECK-Constraint gilt als ERFÜLLT, wenn der Ausdruck TRUE ODER UNKNOWN ergibt – er schlägt nur bei FALSE fehl (anders als WHERE, das nur TRUE durchlässt). Folge: CS4 = CHECK (D = NULL) ist NIE verletzbar, weil „= NULL" immer UNKNOWN ergibt. PRIMARY KEY ist immer eindeutig UND NOT NULL. Ein FK-Wert muss in der Zieltabelle existieren oder NULL sein.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: 'Je INSERT der Reihe nach prüfen:\n1. PK verletzt? (NULL oder Wert schon da)\n2. UNIQUE verletzt?\n3. CHECKs: nur FALSE = Verletzung; TRUE/UNKNOWN = OK\n4. FK-Wert vorhanden (oder NULL)?\nMaximal eine Bedingung wird verletzt.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'Vorhandene Werte: S.A = {1,2,3,4,8,9};  R.(A,B) = {(2,1),(3,4),(2,2),(4,1),(1,3)}\n\nCS8 = (B<G) OR (A=2) AND (A=C)  →  AND bindet STÄRKER: (B<G) OR ((A=2) AND (A=C))',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'CS4 (D = NULL) nie als Verletzung angeben. NULL-FK ist erlaubt, NULL im PK nicht. In CS8 bindet AND stärker als OR.',
    },
  ],

  'probeklausur2-42': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'INSERT INTO S VALUES (5, 4, 4) → A=5, D=4, E=4. CS2 ist UNIQUE (E): kein E-Wert darf doppelt sein. In S hat die Zeile (A=2, D=4, E=4) bereits E = 4.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. CS1 (PK A=5): neu ✓\n2. CS2 (UNIQUE E=4): E=4 existiert schon → verletzt ✗\n3. (CS3: 4+4=8 ≤ 10 ✓; CS6: 2·4 ≥ 2·4 ✓ – nur CS2 scheitert)',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'INSERT INTO S VALUES (5, 4, 4)\n→ verletzt CS2 (UNIQUE E)',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'UNIQUE-Verletzung gilt, auch wenn der A-Wert (Schlüssel) neu ist.',
    },
  ],

  'probeklausur2-43': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'INSERT INTO S VALUES (7, NULL, 5) → A=7, D=NULL, E=5. CS5 ist FK (E) → S(A): der E-Wert muss als A-Wert in S vorkommen. S.A = {1,2,3,4,8,9} enthält keine 5.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. CS1 (PK A=7): neu ✓\n2. CS2 (E=5): noch nicht vergeben ✓\n3. CS3/CS6: enthalten D=NULL → UNKNOWN → gelten als erfüllt ✓\n4. CS5 (FK E=5): 5 ∉ S.A → verletzt ✗',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'INSERT INTO S VALUES (7, NULL, 5)\n→ verletzt CS5 (FK E → S(A))',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'D = NULL macht CS3 und CS6 zu UNKNOWN → erfüllt, keine Verletzung. Nur der konkrete E-Wert scheitert am FK.',
    },
  ],

  'probeklausur2-44': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'INSERT INTO S VALUES (5, 2, NULL) → A=5, D=2, E=NULL. Mehrere NULL-Regeln greifen: UNIQUE lässt mehrere NULL zu; ein NULL-Fremdschlüssel ist erlaubt; CHECKs mit NULL ergeben UNKNOWN → gelten als erfüllt.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. CS1 (PK A=5): neu ✓\n2. CS2 (UNIQUE E=NULL): NULL verletzt UNIQUE nicht ✓\n3. CS5 (FK E=NULL): NULL-FK erlaubt ✓\n4. CS3/CS6: E=NULL → UNKNOWN → erfüllt ✓\n→ keine Verletzung (OK)',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'INSERT INTO S VALUES (5, 2, NULL)\n→ keine Verletzung (zulässig)',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'NULL in UNIQUE-Spalten und als FK ist erlaubt; CHECKs mit NULL → UNKNOWN → nicht verletzt.',
    },
  ],

  'probeklausur2-45': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'INSERT INTO S VALUES (NULL, 2, 2) → A=NULL. CS1 ist PRIMARY KEY (A), und ein Primärschlüssel ist immer NOT NULL.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. CS1 (PK A): A = NULL → verletzt die NOT-NULL-Pflicht des Primärschlüssels ✗',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'INSERT INTO S VALUES (NULL, 2, 2)\n→ verletzt CS1 (PK A, NULL nicht erlaubt)',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Primärschlüssel sind implizit NOT NULL – auch ohne expliziten NOT-NULL-Zusatz.',
    },
  ],

  'probeklausur2-46': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'INSERT INTO S VALUES (12, 3, 2) → A=12, D=3, E=2. CS6 ist CHECK (2*E >= 2*D). 2·2 = 4, 2·3 = 6 → 4 ≥ 6 ist FALSE.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. CS1 (PK A=12): neu ✓\n2. CS2 (E=2): neu ✓\n3. CS3: (3+2)=5 ≤ 10 → TRUE → erfüllt ✓\n4. CS5 (FK E=2): 2 ∈ S.A ✓\n5. CS6: 4 ≥ 6 = FALSE → verletzt ✗',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'INSERT INTO S VALUES (12, 3, 2)\n→ verletzt CS6 (2·E ≥ 2·D)',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'CS3 ist hier erfüllt (5 ≤ 10 → TRUE). Nur CS6 schlägt fehl – jede CHECK-Bedingung einzeln prüfen.',
    },
  ],

  'probeklausur2-47': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'INSERT INTO S VALUES (7, 6, 7) → A=7, D=6, E=7. CS3 ist CHECK ((D+E) <= 10 OR (A+D) = 2*E). Bei OR muss EINE Hälfte TRUE sein; verletzt ist CS3 nur, wenn BEIDE FALSE sind.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Teil 1: (D+E) = 6+7 = 13 ≤ 10 → FALSE\n2. Teil 2: (A+D) = 13, 2·E = 14 → 13 = 14 → FALSE\n3. FALSE OR FALSE = FALSE → CS3 verletzt ✗',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'INSERT INTO S VALUES (7, 6, 7)\n→ verletzt CS3 ((D+E) ≤ 10 OR (A+D) = 2·E)',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'CS5 (FK E=7) ist hier zwar auch verletzt (7 ∉ S.A), aber CS3 wird in Definitionsreihenfolge zuerst getroffen → Antwort CS3.',
    },
  ],

  'probeklausur2-48': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'INSERT INTO R VALUES (3, 8, 1, 3, 12) → A=3, B=8, C=1, F=3, G=12. R hat den PK (A,B) (CS7), zwei CHECKs (CS8, CS9) und zwei FKs (CS10 auf S.A, CS11 auf R.(A,B)). Alle prüfen.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. CS7 (PK (3,8)): neu ✓\n2. CS8: (B<G) = (8<12) = TRUE → erfüllt ✓\n3. CS9: (A≠C) = (3≠1) = TRUE → erfüllt ✓\n4. CS10 (FK B=8): 8 ∈ S.A ✓\n5. CS11 (FK (C,F)=(1,3)): (1,3) ∈ R.(A,B) ✓\n→ keine Verletzung (OK)',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'INSERT INTO R VALUES (3, 8, 1, 3, 12)\n→ keine Verletzung (zulässig)',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'CS11 verweist auf R selbst: (C,F)=(1,3) muss als (A,B)-Paar in R vorkommen – das tut es (Zeile (1,3,…)).',
    },
  ],

  'probeklausur2-49': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'INSERT INTO R VALUES (2, 4, 2, 2, NULL) → A=2, B=4, C=2, F=2, G=NULL. CS9 ist CHECK ((A != C) OR (A = 1)). Beide Hälften FALSE → CS9 verletzt.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. CS7 (PK (2,4)): neu ✓\n2. CS8: (B<G) = (4<NULL) = UNKNOWN, ABER (A=2) AND (A=C) = TRUE AND (2=2) = TRUE → UNKNOWN OR TRUE = TRUE → erfüllt ✓\n3. CS9: (A≠C) = (2≠2) = FALSE; (A=1) = FALSE → FALSE OR FALSE = FALSE → verletzt ✗',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'INSERT INTO R VALUES (2, 4, 2, 2, NULL)\n→ verletzt CS9 ((A≠C) OR (A=1))',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'CS8 ist trotz G=NULL erfüllt, weil der AND-Teil TRUE ist (UNKNOWN OR TRUE = TRUE). Nur CS9 scheitert.',
    },
  ],

  'probeklausur2-50': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'INSERT INTO R VALUES (3, 9, 1, 3, 4) → A=3, B=9, C=1, F=3, G=4. CS8 = (B<G) OR ((A=2) AND (A=C)). AND bindet stärker als OR.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. CS7 (PK (3,9)): neu ✓\n2. CS8: (B<G) = (9<4) = FALSE; (A=2) = (3=2) = FALSE → AND-Teil FALSE; FALSE OR FALSE = FALSE → verletzt ✗',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'INSERT INTO R VALUES (3, 9, 1, 3, 4)\n→ verletzt CS8 ((B<G) OR (A=2) AND (A=C))',
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
      inhalt: 'INSERT INTO R VALUES (NULL, NULL, 3, 4, 9) → A=NULL, B=NULL. CS7 ist PRIMARY KEY (A, B): beide Schlüsselspalten müssen NOT NULL sein.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. CS7 (PK (A,B)): A = NULL (und B = NULL) → verletzt die NOT-NULL-Pflicht des Primärschlüssels ✗',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'INSERT INTO R VALUES (NULL, NULL, 3, 4, 9)\n→ verletzt CS7 (PK (A,B), NULL nicht erlaubt)',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Bei zusammengesetztem PK müssen ALLE Schlüsselattribute NOT NULL sein.',
    },
  ],

  'probeklausur2-52': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'INSERT INTO R VALUES (7, 2, 3, 8, 9) → A=7, B=2, C=3, F=8, G=9. CS11 ist FK (C, F) → R(A, B): das Paar (C,F) = (3,8) muss als (A,B)-Paar in R vorkommen.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. CS7 (PK (7,2)): neu ✓\n2. CS8: (B<G) = (2<9) = TRUE ✓\n3. CS9: (A≠C) = (7≠3) = TRUE ✓\n4. CS10 (FK B=2): 2 ∈ S.A ✓\n5. CS11 (FK (3,8)): (3,8) ∉ R.(A,B) = {(2,1),(3,4),(2,2),(4,1),(1,3)} → verletzt ✗',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'INSERT INTO R VALUES (7, 2, 3, 8, 9)\n→ verletzt CS11 (FK (C,F) → R(A,B))',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'CS11 ist ein selbstreferenzierender FK (R auf R). R.(A,B) genau aus dem Datenbestand ablesen.',
    },
  ],

  'probeklausur2-53': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'INSERT INTO R VALUES (4, 5, 2, 1, 7) → A=4, B=5, C=2, F=1, G=7. CS10 ist FK (B) → S(A): der B-Wert muss als A-Wert in S vorkommen. S.A = {1,2,3,4,8,9} enthält keine 5.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. CS7 (PK (4,5)): neu ✓\n2. CS8: (B<G) = (5<7) = TRUE ✓\n3. CS9: (A≠C) = (4≠2) = TRUE ✓\n4. CS10 (FK B=5): 5 ∉ S.A → verletzt ✗',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'INSERT INTO R VALUES (4, 5, 2, 1, 7)\n→ verletzt CS10 (FK B → S(A))',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'CS11: (C,F) = (2,1) wäre erfüllt ((2,1) ∈ R.(A,B)). CS10 scheitert früher am B-Wert.',
    },
  ],

  // ── Probeklausur 2 – Aufgabe 6 (Relationale Algebra) ─────────────────────

  'probeklausur2-61': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Relationenalgebra-Operatoren: σ (Selektion = Zeilen auswählen), π (Projektion = Spalten auswählen), ⋈ (Join = zwei Relationen über eine Bedingung verbinden). Komplexe Anfragen baut man von INNEN nach AUSSEN auf. Datenbank: Studenten(MatrNr, Name, Semester), hören(MatrNr, VorlNr), Vorlesungen(VorlNr, …, gelesenVon), Professoren(PersNr, Name); gelesenVon zeigt auf PersNr.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Sokrates auswählen: σ[Name=\'Sokrates\'] (Professoren)\n2. seine Vorlesungen: Vorlesungen ⋈[gelesenVon = PersNr] (…), dann nur die Nummern: π[VorlNr](…)\n3. Hörer dieser Vorlesungen: ⋈ hören (über VorlNr)\n4. Studierendendaten: ⋈ Studenten (über MatrNr)\n5. Dauerstudenten: σ[Semester ≥ 12](…)',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: "σ[Semester ≥ 12] (\n  Studenten ⋈ (\n    hören ⋈ π[VorlNr] (\n      Vorlesungen ⋈[gelesenVon = PersNr]\n        σ[Name = 'Sokrates'] (Professoren)\n    )\n  )\n)",
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Die Projektion π[VorlNr] nicht vergessen (sonst bleiben alle Professoren-Spalten erhalten). Der Verbund Vorlesungen⋈Professoren ist ein Theta-/Equi-Join über gelesenVon = PersNr (unterschiedliche Spaltennamen).',
    },
  ],

  'probeklausur2-62': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Ein Operatorbaum ist die Baumdarstellung desselben Algebra-Ausdrucks: Blätter = Basisrelationen (Tabellen), innere Knoten = Operatoren, Wurzel = die zuletzt ausgeführte Operation. Ausgewertet wird von den Blättern (unten) zur Wurzel (oben).',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Wurzel: σ[Semester ≥ 12]\n2. darunter ⋈ (über MatrNr) mit Studenten als linkem Blatt\n3. rechts ⋈ (über VorlNr) mit hören als linkem Blatt\n4. rechts π[VorlNr]\n5. darunter ⋈[gelesenVon = PersNr]\n6. Blätter: Vorlesungen und σ[Name=\'Sokrates\'](Professoren)',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: "σ[Semester ≥ 12]\n└─ ⋈ (MatrNr)\n   ├─ Studenten\n   └─ ⋈ (VorlNr)\n      ├─ hören\n      └─ π[VorlNr]\n         └─ ⋈[gelesenVon = PersNr]\n            ├─ Vorlesungen\n            └─ σ[Name = 'Sokrates']\n               └─ Professoren",
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Die Wurzel ist die LETZTE Operation (σ[Semester≥12]); die Blätter werden ZUERST ausgewertet. Bei einem Join ist die Reihenfolge links/rechts egal.',
    },
  ],

  // ── Probeklausur 2 – Aufgabe 7 (BCNF / Normalisierung) ───────────────────
  // R(A,B,C,D), FDs: AD→BC, A→D, BC→AD, D→B

  'probeklausur2-71': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Eine funktionale Abhängigkeit (FD) X→Y heißt: gleiche X-Werte erzwingen gleiche Y-Werte. Die kanonische Überdeckung ist die minimale gleichwertige FD-Menge. Sie entsteht in zwei Schritten: (1) Linksreduktion (überflüssige Attribute LINKS streichen), (2) Rechtsreduktion (überflüssige Attribute RECHTS streichen). Hilfsmittel ist die Attributhülle {X}⁺ = alle Attribute, die X bestimmt. Gegeben: AD→BC, A→D, BC→AD, D→B.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Linksreduktion AD→BC: Reicht A allein? Aus A→D und A→A folgt A→AD, mit AD→BC also A→BC. Ja → AD→BC wird zu A→BC.\n2. Rechtsreduktion A→BC: A→B ist redundant (A→D, D→B per Transitivität) → bleibt A→C; mit A→D zusammengefasst: A→CD.\n3. BC→AD: das D rechts ist redundant (BC→A, A→D ⇒ BC→D) → bleibt BC→A.\nErgebnis: A→CD, BC→A, D→B.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'Ausgangsmenge: AD→BC, A→D, BC→AD, D→B\n\nKanonische Überdeckung Fc:\nA  → CD\nBC → A\nD  → B',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Reihenfolge einhalten: erst Links-, dann Rechtsreduktion. Bei der Rechtsreduktion darf die gerade geprüfte FD selbst NICHT zum Nachweis benutzt werden.',
    },
  ],

  'probeklausur2-72': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Die Attributhülle {X}⁺ ist die Menge aller Attribute, die sich aus X mit den FDs herleiten lassen. Berechnung: mit {X} starten und FDs wiederholt anwenden, bis nichts Neues mehr hinzukommt. Genutzt werden die FDs der kanonischen Überdeckung: A→CD, BC→A, D→B.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '{A}⁺: Start {A}; A→CD bringt C, D → {A,C,D}; D→B bringt B → {A,B,C,D}. Fertig (alle Attribute).\n{B}⁺: Start {B}; keine FD hat eine linke Seite, die nur aus B besteht (B steht immer mit C: BC→A) → {B} bleibt.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: '{A}⁺ = {A, B, C, D}   → A bestimmt alles\n{B}⁺ = {B}            → B bestimmt nichts außer sich selbst',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Nur die FDs der kanonischen Überdeckung nutzen. In jeder Runde alle anwendbaren FDs prüfen, bis sich die Menge nicht mehr ändert.',
    },
  ],

  'probeklausur2-73': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Ein Kandidatenschlüssel ist eine MINIMALE Attributmenge, deren Hülle die gesamte Relation ergibt ({X}⁺ = {A,B,C,D}). „Minimal" heißt: keine echte Teilmenge ist selbst schon Schlüssel. Man testet Attributmengen aufsteigend nach Größe.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Einzelattribute: {A}⁺ = {A,B,C,D} ✓; {B}⁺ = {B} ✗; {C}⁺ = {C} ✗; {D}⁺ = {B,D} ✗\n2. Paare (ohne A, da A schon Schlüssel): {B,C}⁺ = {A,B,C,D} ✓; {C,D}⁺ = {A,B,C,D} ✓\n3. Drei Kandidatenschlüssel: A, BC, CD (z. B. {A,B} ist nicht minimal, weil A allein reicht).',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: '{A}⁺  = {A,B,C,D} → Kandidatenschlüssel\n{B,C}⁺ = {A,B,C,D} → Kandidatenschlüssel\n{C,D}⁺ = {A,B,C,D} → Kandidatenschlüssel\n→ 3 Schlüssel: [A], [B,C], [C,D]',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Auf Minimalität achten: {A,B} ist KEIN Kandidatenschlüssel (B ist überflüssig, A reicht allein).',
    },
  ],

  'probeklausur2-74': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'BCNF (Boyce-Codd-Normalform): Für JEDE nichttriviale FD X→Y muss die linke Seite X ein Superschlüssel sein ({X}⁺ = gesamte Relation). Eine FD, die das verletzt, nutzt man zum Zerlegen. Geprüft werden die FDs der kanonischen Überdeckung A→CD, BC→A, D→B.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. BCNF prüfen: A→CD ✓ ({A}⁺=alles); BC→A ✓ ({B,C}⁺=alles); D→B ✗ ({D}⁺={B,D} ≠ alles)\n2. Zerlegen entlang der verletzenden FD D→B:\n   • R1 = Hülle {D}⁺ = R1(B, D)\n   • R2 = linke Seite D + restliche Attribute = R2(A, C, D)',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'R1(B, D)      -- enthält {D}⁺ = {B, D}\nR2(A, C, D)   -- D + die nicht abgespaltenen Attribute\n\nNicht abhängigkeitserhaltend: BC→A liegt weder ganz in R1 noch ganz in R2 (B in R1; C, A in R2) → die FD geht verloren.',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'R1 bekommt die Hülle der verletzenden FD ({D}⁺ = {B,D}); R2 = linke Seite + alle nicht abgespaltenen Attribute. Bonus: BC→A wird zerrissen → die Zerlegung ist nicht abhängigkeitserhaltend.',
    },
  ],
}
