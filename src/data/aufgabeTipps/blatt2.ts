import type { TippSection } from '../../types'

export const blatt2Tipps: Record<string, TippSection[]> = {
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
}
