import type { TippSection } from '../../types'

export const probeklausur2Tipps: Record<string, TippSection[]> = {
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
