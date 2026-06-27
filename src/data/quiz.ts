import type { QuizFrage } from 'lernseiten-ui'

// Quizfragen zu den Übungsblättern 0–11 der Lehrveranstaltung Datenbanksysteme.
// Alle Inhalte sind aus den Lösungen der Übungsblätter abgeleitet (Probeklausuren
// sind bewusst NICHT verwendet). Sieben Fragetypen sind vertreten:
// single, multi, zuordnung, reihenfolge, kategorien, eingabe, wahrfalsch.

export const quizFragen: QuizFrage[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // Blatt 0 – Pine-Valley-SQL (Additional Sample Queries)
  // ─────────────────────────────────────────────────────────────────────────
  {
    art: 'single',
    frage:
      'Pine Valley: Welches Schlüsselwort braucht man, damit jede Stadt der Kunden (CUSTOMERCITY) nur EINMAL im Ergebnis erscheint?',
    optionen: [
      { text: 'SELECT DISTINCT CUSTOMERCITY' },
      { text: 'SELECT UNIQUE CUSTOMERCITY', warumFalsch: 'UNIQUE ist in Oracle ein Constraint-Schlüsselwort; zum Entfernen von Duplikaten in einer Abfrage dient DISTINCT.' },
      { text: 'SELECT NODUP CUSTOMERCITY', warumFalsch: 'NODUP existiert in SQL nicht.' },
      { text: 'SELECT GROUP CUSTOMERCITY', warumFalsch: 'GROUP ist keine eigenständige Klausel; GROUP BY gruppiert, entfernt aber nicht einfach Duplikate einer einzelnen Spalte.' },
    ],
    richtige: 0,
    erklaerung: 'SELECT DISTINCT CUSTOMERCITY FROM CUSTOMER_T ORDER BY CUSTOMERCITY gibt jede Stadt genau einmal aus.',
    quelle: 'Blatt 0, Aufgabe 1',
  },
  {
    art: 'single',
    frage:
      'Pine Valley: In welcher Tabelle stehen die Bestellpositionen (verbindet Bestellungen und Produkte, z. B. für „Produkte auf Bestellung 1008")?',
    optionen: [
      { text: 'ORDERLINE_T' },
      { text: 'ORDERS_T', warumFalsch: 'Im Pine-Valley-Schema heißt die Bestelltabelle ORDER_T und enthält keine einzelnen Positionen mit PRODUCTID.' },
      { text: 'ORDERDETAILS', warumFalsch: 'ORDERDETAILS gehört zum Northwind-Schema, nicht zu Pine Valley.' },
      { text: 'PRODUCT_T', warumFalsch: 'PRODUCT_T enthält die Produktstammdaten, nicht die Bestellpositionen.' },
    ],
    richtige: 0,
    erklaerung: 'ORDERLINE_T verbindet ORDER_T und PRODUCT_T über ORDERID und PRODUCTID; ein Join darüber liefert die Produktbeschreibungen einer Bestellung.',
    quelle: 'Blatt 0, Aufgabe 4',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Blatt 1 – Grundlagen: Nachteile Dateiverwaltung, Datenmodelle, paralleler Zugriff
  // ─────────────────────────────────────────────────────────────────────────
  {
    art: 'multi',
    frage: 'Welche Nachteile reiner Dateiverwaltung löst ein DBMS? (Mehrere richtig)',
    optionen: [
      { text: 'Redundanz und daraus folgende Inkonsistenz' },
      { text: 'Probleme im Mehrbenutzerbetrieb (z. B. Lost Update)' },
      { text: 'Fehlender Zugriffsschutz / Sicherheit' },
      { text: 'Garantiert höhere Schreibgeschwindigkeit als jede Datei', warumFalsch: 'Ein DBMS bringt Integrität, Mehrbenutzerfähigkeit und Sicherheit; reine Roh-Schreibgeschwindigkeit ist kein Nachteil der Dateiverwaltung, den ein DBMS „löst".' },
    ],
    richtige: [0, 1, 2],
    erklaerung: 'Zu den klassischen Nachteilen der Dateiverwaltung zählen Redundanz/Inkonsistenz, beschränkter Datenzugriff, Datenisolation, Integritätsprobleme, fehlende Atomarität, Mehrbenutzer-Anomalien und mangelnder Zugriffsschutz – genau diese adressiert ein DBMS.',
    quelle: 'Blatt 1, Gruppenaufgabe 1',
  },
  {
    art: 'wahrfalsch',
    frage: 'Datenmodelle und Schema (Blatt 1, Hausaufgabe 1):',
    aussagen: [
      { text: 'Das relationale Modell speichert Beziehungen implizit über Fremdschlüssel.', wahr: true },
      { text: 'Eine Graphdatenbank speichert Beziehungen explizit als Kanten zwischen Knoten.', wahr: true },
      { text: 'Ein Datenbankschema beschreibt die konkreten Datenwerte (die Ausprägung), nicht die Struktur.', wahr: false, warum: 'Das Schema ist der Bauplan (Tabellen, Attribute, Typen, Constraints); die konkreten Werte sind die Ausprägung.' },
      { text: 'Ein festes Schema ermöglicht dem DBMS die Garantie von Integrität und Konsistenz.', wahr: true },
    ],
    erklaerung: 'Relational = Beziehungen über Fremdschlüssel (viele JOINs), Graph = Beziehungen als Kanten (schnelles Traversieren). Das Schema ist die Struktur/der Bauplan, die Ausprägung sind die Daten. Ein festes Schema erlaubt Typ- und Constraint-Prüfung durch das DBMS.',
    quelle: 'Blatt 1, Hausaufgabe 1',
  },
  {
    art: 'reihenfolge',
    frage: 'Bringe den Ablauf, der zu einem „Lost Update" führt (zwei Bestellungen A und B auf denselben Bestand x), in die richtige Reihenfolge.',
    schritte: [
      'Transaktion A liest x',
      'Transaktion B liest x (noch denselben Wert)',
      'A berechnet x − y und schreibt das Ergebnis',
      'B berechnet x − z und schreibt das Ergebnis (überschreibt A)',
    ],
    erklaerung: 'Weil B noch den ursprünglichen Wert x gelesen hatte, überschreibt der Schreibvorgang von B die Änderung von A. Endstand x − z statt korrekt x − y − z – A geht verloren. Abhilfe: Nebenläufigkeitskontrolle (Sperren/Isolation).',
    quelle: 'Blatt 1, Hausaufgabe 2',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Blatt 2 – ER-Modellierung, Funktionalitäten, schwache Entitäten
  // ─────────────────────────────────────────────────────────────────────────
  {
    art: 'kategorien',
    frage: 'Ordne jedes Beziehungsbeispiel seiner Funktionalität (Kardinalität) zu.',
    kategorien: ['1:1', '1:N', 'N:M'],
    items: [
      { text: 'Land — hat — Hauptstadt', kategorie: '1:1' },
      { text: 'Abteilung — hat — Mitarbeiter', kategorie: '1:N' },
      { text: 'Student — hört — Vorlesung', kategorie: 'N:M' },
      { text: 'Auto — eingetragen auf — Fahrzeughalter', kategorie: '1:N' },
    ],
    erklaerung: 'Land↔Hauptstadt ist 1:1 (beidseitig Funktion). Eine Abteilung hat viele Mitarbeiter, ein Mitarbeiter aber nur eine Abteilung → 1:N. Student↔Vorlesung ist N:M. Ein Halter hat mehrere Autos, ein Auto höchstens einen Halter → 1:N.',
    quelle: 'Blatt 2, Gruppenaufgabe 1 / Hausaufgabe 1',
  },
  {
    art: 'single',
    frage: 'Bei welcher Funktionalität existiert KEINE partielle Funktion in irgendeiner Richtung?',
    optionen: [
      { text: 'N:M', },
      { text: '1:1', warumFalsch: 'Bei 1:1 sind sogar BEIDE Richtungen partielle Funktionen.' },
      { text: '1:N', warumFalsch: 'Bei 1:N ist die „viele→eins"-Richtung eine partielle Funktion (z. B. Mitarbeiter → Abteilung).' },
      { text: 'N:1', warumFalsch: 'N:1 ist dieselbe Beziehung wie 1:N, nur andersherum gelesen – eine partielle Funktion existiert.' },
    ],
    richtige: 0,
    erklaerung: 'Bei N:M (z. B. Student hört Vorlesung) ist weder Student → Vorlesung noch Vorlesung → Student eine Funktion – ein Wert bestimmt jeweils mehrere der anderen Seite.',
    quelle: 'Blatt 2, Gruppenaufgabe 1',
  },
  {
    art: 'wahrfalsch',
    frage: 'Schwache Entität „Drug" der Apothekenkette (Blatt 2, Gruppenaufgabe 2):',
    aussagen: [
      { text: 'Der Handelsname (Trade_name) identifiziert ein Medikament nur INNERHALB eines Unternehmens eindeutig.', wahr: true },
      { text: 'Drug ist über die identifizierende Beziehung „Make" existenzabhängig vom herstellenden Unternehmen (Pharm_co).', wahr: true },
      { text: 'Eine schwache Entität besitzt einen vollständigen eigenen Schlüssel ohne Bezug zu einer anderen Entität.', wahr: false, warum: 'Eine schwache Entität hat nur einen partiellen Schlüssel und wird erst zusammen mit der identifizierenden (starken) Entität eindeutig.' },
    ],
    erklaerung: 'Trade_name ist nur ein partieller Schlüssel; erst zusammen mit dem herstellenden Unternehmen wird Drug eindeutig. Die identifizierende Beziehung Make (Doppelraute) macht Drug existenzabhängig.',
    quelle: 'Blatt 2, Gruppenaufgabe 2',
  },
  {
    art: 'single',
    frage:
      'Ternäre Beziehung teilnehmen(Übungsleiter, Übungsgruppe, Student) mit Funktionalität 1:1:N. Wie viele partielle Funktionen der Form A × B → C gelten?',
    optionen: [
      { text: '2 (nämlich die, deren Ziel Übungsgruppe bzw. Übungsleiter ist)' },
      { text: '0', warumFalsch: 'Jede „1"-Seite liefert eine geltende partielle Funktion – hier gibt es zwei „1"-Seiten.' },
      { text: '1', warumFalsch: 'Es gibt zwei „1"-Annotationen (Übungsleiter und Übungsgruppe), also zwei geltende partielle Funktionen.' },
      { text: '3 (alle drei)', warumFalsch: 'Die Funktion mit Ziel Student gilt NICHT, da Student mit N annotiert ist.' },
    ],
    richtige: 0,
    erklaerung: 'Eine „1" bedeutet: Diese Entität ist durch die beiden anderen bestimmt. Übungsgruppe=1 und Übungsleiter=1 → beide zugehörigen partiellen Funktionen gelten; Student=N → die dritte (Ziel Student) gilt nicht. Maximal wären 3 möglich.',
    quelle: 'Blatt 2, Hausaufgabe 2',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Blatt 3 – Funktionalität ↔ (min,max)
  // ─────────────────────────────────────────────────────────────────────────
  {
    art: 'zuordnung',
    frage: 'Ordne jede binäre Funktionalität dem Paar ((min1,max1), (min2,max2)) zu, das aus ihr folgt.',
    paare: [
      { begriff: '1 : 1', ziel: '(0,1) und (0,1)' },
      { begriff: '1 : N', ziel: '(0,*) und (0,1)' },
      { begriff: 'N : 1', ziel: '(0,1) und (0,*)' },
      { begriff: 'N : M', ziel: '(0,*) und (0,*)' },
    ],
    erklaerung: 'Die Angaben „kreuzen" sich: Steht bei F eine 1, wird die gegenüberliegende max-Angabe 1; bei N/M wird sie *. Das min ist überall 0, weil aus reiner Funktionalität keine Pflichtteilnahme folgt.',
    quelle: 'Blatt 3, Gruppenaufgabe 1',
  },
  {
    art: 'wahrfalsch',
    frage: 'Funktionalität vs. (min,max) (Blatt 3):',
    aussagen: [
      { text: 'Aus einer reinen Funktionalitätsangabe lässt sich keine Pflicht-Teilnahme („mindestens eins") ableiten.', wahr: true },
      { text: 'Die (min,max)-Notation ist feiner als die reine Funktionalität, weil sie Mindest- und Höchstteilnahme angibt.', wahr: true },
      { text: 'Bei n-stelligen Beziehungen (n > 2) sind Funktionalitäts- und (min,max)-Angaben gleich ausdrucksstark und ineinander überführbar.', wahr: false, warum: 'Bei n > 2 sind beide Notationen unvergleichbar: Manche Bedingungen lassen sich nur als Funktionalität, andere nur als (min,max) ausdrücken.' },
    ],
    erklaerung: 'Bei binären Beziehungen ist (min,max) feiner (min=0 aus Funktionalität). Bei mehr als zwei beteiligten Entitäten ist die Ausdruckskraft beider Notationen jedoch unvergleichbar.',
    quelle: 'Blatt 3, Gruppenaufgabe 1 & 3',
  },
  {
    art: 'single',
    frage:
      'betreuen(Übungsleiter, Übungsgruppe, Student): Ein Übungsleiter betreut mindestens einmal, eine Übungsgruppe 1–25 mal, ein Student höchstens einmal. Welche (min,max) gehört zur Übungsgruppe?',
    optionen: [
      { text: '(1,25)' },
      { text: '(0,1)', warumFalsch: 'Das ist die Angabe für den Studenten (höchstens einmal, kann auch fehlen).' },
      { text: '(1,*)', warumFalsch: 'Das ist die Angabe für den Übungsleiter (mindestens einmal, beliebig oft).' },
      { text: '(0,25)', warumFalsch: 'Eine Übungsgruppe wird MINDESTENS einmal betreut, also min = 1, nicht 0.' },
    ],
    richtige: 0,
    erklaerung: 'min = 1 erzwingt „mindestens einmal", max = 25 begrenzt die Gruppe auf höchstens 25 Betreuungen → (1,25). Übungsleiter (1,*), Student (0,1).',
    quelle: 'Blatt 3, Gruppenaufgabe 2',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Blatt 4 – ER → Relationenschema, Verfeinerung
  // ─────────────────────────────────────────────────────────────────────────
  {
    art: 'single',
    frage: 'Welche Regel gilt beim Verfeinern eines Relationenschemas?',
    optionen: [
      { text: 'Relationen mit GLEICHEM Schlüssel darf man zusammenfassen – aber nur diese.' },
      { text: 'Alle Relationen mit gemeinsamen Attributen werden zusammengefasst.', warumFalsch: 'Maßgeblich ist nicht „gemeinsame Attribute", sondern der GLEICHE Schlüssel; sonst gingen Informationen verloren.' },
      { text: 'Nur Entity-Relationen, nie Beziehungs-Relationen, dürfen zusammengefasst werden.', warumFalsch: 'Gerade Beziehungs-Relationen (1:1/1:N/N:1) werden in die Entity-Relation mit gleichem Schlüssel aufgenommen.' },
      { text: 'N:M-Beziehungsrelationen werden immer in eine Entity-Relation aufgenommen.', warumFalsch: 'N:M-Relationen haben einen zusammengesetzten Schlüssel und bleiben eigenständig.' },
    ],
    richtige: 0,
    erklaerung: 'Beziehungs-Relationen von 1:1-, 1:N- und N:1-Beziehungen haben denselben Schlüssel wie eine Entity-Relation und werden in diese aufgenommen. N:M-Relationen behalten ihren zusammengesetzten Schlüssel und bleiben getrennt.',
    quelle: 'Blatt 4, Gruppenaufgabe 1',
  },
  {
    art: 'wahrfalsch',
    frage: 'Verfeinerung der Beziehungstypen (Blatt 4):',
    aussagen: [
      { text: 'Die Beziehungsrelation von „herstellen" (Auto N:1 Hersteller) wird in die Auto-Relation aufgenommen (Schlüssel FGNr).', wahr: true },
      { text: 'Die Beziehungsrelation von „vormerken" (Buchtitel N:M Ausleiher) lässt sich nicht in eine Entity-Relation einrechnen.', wahr: true },
      { text: 'Bei einer 1:N-Beziehung erhält die Beziehungsrelation den Schlüssel der „1"-Seite.', wahr: false, warum: 'Die Beziehungsrelation einer 1:N-Beziehung erhält den Schlüssel der N-Seite (sie wird dort eingerechnet).' },
    ],
    erklaerung: 'Bei N:M entsteht ein zusammengesetzter Schlüssel (kein Verfeinern möglich). Bei 1:N bekommt die Beziehungsrelation den Schlüssel der N-Seite und kann in die N-Seiten-Relation aufgenommen werden.',
    quelle: 'Blatt 4, Gruppenaufgabe 1 / Hausaufgabe 1',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Blatt 5 – Relationale Algebra
  // ─────────────────────────────────────────────────────────────────────────
  {
    art: 'zuordnung',
    frage: 'Ordne jeden Operator der relationalen Algebra seiner Bedeutung zu.',
    paare: [
      { begriff: 'σ (Sigma)', ziel: 'Selektion (Zeilen filtern)' },
      { begriff: 'π (Pi)', ziel: 'Projektion (Spalten auswählen)' },
      { begriff: '⋈', ziel: 'Join (verbinden)' },
      { begriff: 'ρ (Rho)', ziel: 'Umbenennung' },
    ],
    erklaerung: 'σ filtert Zeilen, π wählt Spalten (und entfernt Duplikate), ⋈ verbindet Relationen über eine Bedingung, ρ benennt Relation oder Spalte um (ohne die Werte zu ändern).',
    quelle: 'Blatt 5, Gruppenaufgabe 1',
  },
  {
    art: 'single',
    frage:
      'Relationen u und v haben dasselbe Schema (A,B,C). Wozu ist der natürliche Join u ⋈ v dann äquivalent?',
    optionen: [
      { text: 'zum Schnitt u ∩ v' },
      { text: 'zur Vereinigung u ∪ v', warumFalsch: 'Die Vereinigung enthält ALLE Tupel beider Relationen, der natürliche Join über identische Schemata nur die gemeinsamen.' },
      { text: 'zum Kreuzprodukt u × v', warumFalsch: 'Beim Kreuzprodukt würde jede Zeile mit jeder kombiniert; der natürliche Join verlangt Gleichheit in allen gleichnamigen Spalten.' },
      { text: 'zur Differenz u − v', warumFalsch: 'Die Differenz enthält Tupel, die nur in u stehen – das Gegenteil des gemeinsamen Anteils.' },
    ],
    richtige: 0,
    erklaerung: 'Der natürliche Join verbindet über ALLE gemeinsamen Spalten. Sind das alle Spalten (gleiches Schema), bleiben genau die Tupel, die in beiden vorkommen – das ist der Schnitt u ∩ v.',
    quelle: 'Blatt 5, Gruppenaufgabe 1',
  },
  {
    art: 'single',
    frage:
      'Welcher Algebra-Operator setzt „SchauspielerInnen, die NUR Faust oder Wallenstein gespielt haben" um?',
    optionen: [
      { text: 'die Differenz −' },
      { text: 'der Schnitt ∩', warumFalsch: 'Der Schnitt liefert gemeinsame Tupel zweier Relationen, nicht das „nur"-Kriterium.' },
      { text: 'die Vereinigung ∪', warumFalsch: 'Die Vereinigung würde gerade auch die einbeziehen, die zusätzlich anderes gespielt haben.' },
      { text: 'das Kreuzprodukt ×', warumFalsch: 'Das Kreuzprodukt kombiniert nur Tupel und drückt kein „nur" aus.' },
    ],
    richtige: 0,
    erklaerung: '„Nur" verlangt eine Differenz: alle, die Faust/Wallenstein spielten, MINUS alle, die etwas anderes spielten. Übrig bleibt PNR 1.',
    quelle: 'Blatt 5, Hausaufgabe 2 d)',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Blatt 6 – Algebra in der Praxis, Self-Join, Aggregation
  // ─────────────────────────────────────────────────────────────────────────
  {
    art: 'single',
    frage:
      'Server und Serveranwendung haben beide die Attribute ServerID UND Name. Warum darf man sie nicht natürlich joinen?',
    optionen: [
      { text: 'Der natürliche Join würde fälschlich auch über Name verbinden; nötig ist ein Theta-Join nur über ServerID.' },
      { text: 'Natürliche Joins sind in relationaler Algebra generell verboten.', warumFalsch: 'Natürliche Joins sind erlaubt; das Problem sind hier nur die zusätzlich gleichnamigen Attribute.' },
      { text: 'Weil ServerID ein Fremdschlüssel ist und Fremdschlüssel nicht gejoint werden dürfen.', warumFalsch: 'Über Fremdschlüssel wird sehr wohl gejoint; das Problem ist das zweite gleichnamige Attribut Name.' },
      { text: 'Weil ein natürlicher Join immer ein Kreuzprodukt erzeugt.', warumFalsch: 'Der natürliche Join erzeugt kein Kreuzprodukt, sondern verbindet über die gemeinsamen Attribute.' },
    ],
    richtige: 0,
    erklaerung: 'Der natürliche Join verbindet über ALLE gleichnamigen Spalten. Da Server und Serveranwendung sowohl ServerID als auch Name teilen, würde er fälschlich auch über Name verbinden. Ein Theta-Join ⋈[Serveranwendung.ServerID = Server.ServerID] verbindet gezielt nur über ServerID.',
    quelle: 'Blatt 6, Hausaufgabe 1 b)',
  },
  {
    art: 'single',
    frage:
      'Welcher Operator zählt die Mitarbeiter je Abteilung: γ[Bezeichnung; count(*) → AnzahlMitarbeiter](Mitarbeiter ⋈ Abteilung)?',
    optionen: [
      { text: 'γ – Gruppierung/Aggregation' },
      { text: 'σ – Selektion', warumFalsch: 'σ filtert nur Zeilen, aggregiert aber nicht.' },
      { text: 'π – Projektion', warumFalsch: 'π wählt Spalten aus, bildet aber keine Aggregate wie count(*).' },
      { text: '▷ – Anti-Semi-Join', warumFalsch: 'Der Anti-Semi-Join liefert partnerlose Tupel, zählt aber nichts.' },
    ],
    richtige: 0,
    erklaerung: 'γ steht für Gruppierung/Aggregation: γ[Gruppierungsattribut; Aggregatfunktion] gruppiert nach Bezeichnung und zählt mit count(*) die Mitarbeiter je Abteilung.',
    quelle: 'Blatt 6, Gruppenaufgabe 1 e)',
  },
  {
    art: 'wahrfalsch',
    frage: 'Self-Join „Mitarbeiter-Paare derselben Abteilung" (Blatt 6):',
    aussagen: [
      { text: 'Für einen Self-Join wird die Relation per ρ (z. B. ρ[M1], ρ[M2]) zweimal umbenannt.', wahr: true },
      { text: 'Mit der Bedingung „<" statt „≠" vermeidet man, dass Paare doppelt erscheinen (z. B. (Tom,Lisa) und (Lisa,Tom)).', wahr: true },
      { text: 'Beim Verfeinern verschwinden N:M-Beziehungen aus dem Schema; sie behalten keine eigene Relation.', wahr: false, warum: 'Gerade N:M-Beziehungen (z. B. Hat_Zugriff_Auf) behalten als einzige eine eigene Relation; 1:1/1:N werden eingerechnet.' },
    ],
    erklaerung: 'Der Self-Join benötigt zwei Umbenennungen der gleichen Relation. „<" statt „≠" verhindert Spiegel-Paare. Beim Verfeinern bleiben N:M-Beziehungen als eigene Relation erhalten, während 1:1/1:N in Entity-Relationen aufgehen.',
    quelle: 'Blatt 6, Gruppenaufgabe 1 / Hausaufgabe 1 c)',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Blatt 7 – SQL: Klauselreihenfolge, Algebra→SQL, Optimierung, DDL/DML
  // ─────────────────────────────────────────────────────────────────────────
  {
    art: 'reihenfolge',
    frage: 'Bringe die Klauseln eines SELECT-Statements in ihre korrekte SYNTAKTISCHE Reihenfolge.',
    schritte: ['SELECT', 'FROM', 'WHERE', 'GROUP BY', 'HAVING', 'ORDER BY'],
    erklaerung: 'Geschrieben wird SELECT–FROM–WHERE–GROUP BY–HAVING–ORDER BY. LOGISCH ausgewertet wird allerdings anders (zuerst FROM, dann WHERE, GROUP BY, HAVING, dann SELECT, zuletzt ORDER BY) – deshalb sind SELECT-Aliase in WHERE noch nicht, in ORDER BY schon verfügbar.',
    quelle: 'Blatt 7, Gruppenaufgabe 1',
  },
  {
    art: 'zuordnung',
    frage: 'Ordne jeden Algebra-Operator seinem SQL-Pendant zu.',
    paare: [
      { begriff: 'σ (Selektion)', ziel: 'WHERE-Klausel' },
      { begriff: 'π (Projektion)', ziel: 'SELECT-Spaltenliste' },
      { begriff: '⋈ (Join)', ziel: 'Join über WHERE-Bedingung' },
      { begriff: '∪ (Vereinigung)', ziel: 'UNION' },
    ],
    erklaerung: 'Jeder Algebra-Operator hat ein direktes SQL-Pendant: σ→WHERE, π→SELECT, ⋈→(impliziter) Join über WHERE bzw. JOIN…ON, ∪→UNION.',
    quelle: 'Blatt 7, Gruppenaufgabe 2',
  },
  {
    art: 'single',
    frage:
      'Was bedeutet „frühe Selektion" bei der Optimierung eines Operatorbaums (z. B. σ[SWS=2] nach unten zur Tabelle Vorlesungen schieben)?',
    optionen: [
      { text: 'Die Selektion möglichst nah an die Basistabelle verschieben, damit frühzeitig weniger Tupel verarbeitet werden.' },
      { text: 'Die Selektion an die Wurzel des Baums verschieben, damit sie zuletzt ausgeführt wird.', warumFalsch: 'Das wäre „späte" Selektion und gerade nicht das Optimierungsziel.' },
      { text: 'Alle Selektionen durch Projektionen ersetzen.', warumFalsch: 'Selektion und Projektion sind verschiedene Operatoren; ein Ersetzen ist nicht möglich.' },
      { text: 'Das Kreuzprodukt vor dem Join ausführen.', warumFalsch: 'Im Gegenteil: Kreuzprodukt + Selektion werden zu einem Join zusammengefasst.' },
    ],
    richtige: 0,
    erklaerung: 'Frühe Selektion verschiebt σ nah an die Basistabelle, sodass nachfolgende, teure Operationen (z. B. Joins) auf weniger Tupeln arbeiten. Zusätzlich werden Kreuzprodukt + darüberliegende Selektion zu einem Join zusammengefasst.',
    quelle: 'Blatt 7, Gruppenaufgabe 3',
  },
  {
    art: 'kategorien',
    frage: 'Ordne jede SQL-Anweisung ein: ändert sie das SCHEMA (DDL) oder die DATEN (DML)?',
    kategorien: ['DDL (Schema)', 'DML (Daten)'],
    items: [
      { text: 'CREATE TABLE', kategorie: 'DDL (Schema)' },
      { text: 'DROP TABLE', kategorie: 'DDL (Schema)' },
      { text: 'INSERT INTO', kategorie: 'DML (Daten)' },
      { text: 'UPDATE … SET', kategorie: 'DML (Daten)' },
    ],
    erklaerung: 'DDL (Data Definition Language) verändert die Struktur: CREATE/DROP TABLE. DML (Data Manipulation Language) verändert die Inhalte: INSERT, DELETE, UPDATE.',
    quelle: 'Blatt 7, Hausaufgabe 2',
  },
  {
    art: 'eingabe',
    frage:
      'Welches SQL-Schlüsselwort kombiniert „Namen unter Studierenden ODER ProfessorInnen" zu einer Ergebnismenge (Vereinigung über Spalten)? Tippe nur das Schlüsselwort.',
    loesungen: ['UNION'],
    platzhalter: 'Schlüsselwort',
    erklaerung: 'Ein „oder" über Spalten zweier Tabellen wird in SQL mit UNION abgebildet (entspricht der Vereinigung ∪). UNION entfernt zusätzlich Duplikate.',
    quelle: 'Blatt 7, Gruppenaufgabe 2 d)',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Blatt 8 – Northwind: Simple & Advanced SELECTs
  // ─────────────────────────────────────────────────────────────────────────
  {
    art: 'single',
    frage: 'Northwind: Welche Datenbank ist das und was modelliert sie?',
    optionen: [
      { text: 'Eine Handels-/Vertriebsdatenbank (Kunden, Bestellungen, Produkte, Lieferanten) eines fiktiven Im-/Export-Unternehmens.' },
      { text: 'Eine Universitätsdatenbank mit Studenten, Vorlesungen und Professoren.', warumFalsch: 'Das ist das Uni-Schema (Blätter 5–7, 9–11), nicht Northwind.' },
      { text: 'Eine Bibliotheksdatenbank mit Büchern und Ausleihern.', warumFalsch: 'Das Bibliotheksbeispiel stammt aus Blatt 1/2, nicht Northwind.' },
      { text: 'Eine Möbeldatenbank der Pine Valley Furniture Company.', warumFalsch: 'Pine Valley ist eine eigene Beispiel-DB (Blatt 0), nicht Northwind.' },
    ],
    richtige: 0,
    erklaerung: 'Northwind ist eine bekannte Microsoft-Beispieldatenbank: die Verkaufsdaten von „Northwind Traders", einem fiktiven Im-/Export-Unternehmen für Spezialitäten-Lebensmittel.',
    quelle: 'Blatt 8, Gruppenaufgabe 1',
  },
  {
    art: 'multi',
    frage: 'Welche dieser SQL-Bausteine filtern korrekt? (Northwind, Blatt 8 – mehrere richtig)',
    optionen: [
      { text: 'WHERE Fax IS NOT NULL  (Zeilen mit gesetztem Fax)' },
      { text: "WHERE SupplierID IN (1, 3, 4)  (Lieferanten 1, 3 oder 4)" },
      { text: "WHERE BirthDate BETWEEN '1-Jan-1950' AND '31-Dec-1959'  (Geburtsjahr in den 50ern)" },
      { text: 'WHERE Fax = NULL  (Zeilen ohne Fax)', warumFalsch: 'NULL prüft man mit IS NULL / IS NOT NULL; „= NULL" liefert nie wahr.' },
    ],
    richtige: [0, 1, 2],
    erklaerung: 'NULL-Werte prüft man mit IS [NOT] NULL – „= NULL" funktioniert nicht. IN testet Zugehörigkeit zu einer Liste, BETWEEN einen (inklusiven) Bereich.',
    quelle: 'Blatt 8, Gruppenaufgabe 2',
  },
  {
    art: 'single',
    frage:
      'In SQL gilt: WHERE Country = \'Mexico\' OR Country = \'Spain\' AND City <> \'Madrid\'. Warum braucht man hier Klammern?',
    optionen: [
      { text: 'Weil AND vor OR ausgewertet wird – ohne Klammern bindet die AND-Bedingung nur an „Spain".' },
      { text: 'Weil OR vor AND ausgewertet wird.', warumFalsch: 'Es ist umgekehrt: AND bindet stärker als OR.' },
      { text: 'Weil SQL Bedingungen strikt von rechts nach links auswertet.', warumFalsch: 'Maßgeblich ist die Operator-Präzedenz (AND vor OR), nicht eine Lese-Richtung.' },
      { text: 'Weil <> (ungleich) immer geklammert werden muss.', warumFalsch: 'Der Ungleich-Operator erfordert keine Klammern; das Problem ist die AND/OR-Präzedenz.' },
    ],
    richtige: 0,
    erklaerung: 'AND bindet stärker als OR. Ohne Klammern gehört „AND City <> \'Madrid\'" nur zu Spain. Will man „Mexico-Kunden ODER (Spanien außer Madrid)", muss man die AND-Bedingung klammern.',
    quelle: 'Blatt 8, Gruppenaufgabe 2 / Blatt 9 Hinweis',
  },
  {
    art: 'wahrfalsch',
    frage: 'Aggregatfunktionen und GROUP BY (Northwind, Blatt 8):',
    aussagen: [
      { text: 'Jede Nicht-Aggregat-Spalte im SELECT muss auch im GROUP BY stehen.', wahr: true },
      { text: 'HAVING filtert ganze Gruppen (z. B. HAVING SUM(Quantity) < 200).', wahr: true },
      { text: 'GROUP BY ProductID auf der Products-Tabelle ist sinnvoll, weil je ProductID viele Zeilen entstehen.', wahr: false, warum: 'ProductID ist Primärschlüssel von Products – jede Gruppe hat genau EINE Zeile, die Aggregation ist überflüssig („ridiculous query").' },
    ],
    erklaerung: 'Im SELECT erlaubt sind nur Aggregate oder Spalten aus dem GROUP BY. HAVING filtert Gruppen (nach der Aggregation). Da ProductID Primärschlüssel ist, enthält jede Gruppe nur eine Zeile – die Aggregation bringt nichts.',
    quelle: 'Blatt 8, Hausaufgabe 1',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Blatt 9 – SQL-Ergebnisse von Hand, Subqueries, Outer Joins
  // ─────────────────────────────────────────────────────────────────────────
  {
    art: 'eingabe',
    frage:
      'Uni-Schema: SELECT count(*) FROM Professoren, Vorlesungen; bei 7 Professoren und 10 Vorlesungen. Wie viele Zeilen liefert das Kreuzprodukt?',
    loesungen: ['70'],
    toleranz: 0,
    platzhalter: 'Anzahl',
    erklaerung: 'Ohne WHERE-Bedingung entsteht das Kreuzprodukt: 7 × 10 = 70 Zeilen.',
    quelle: 'Blatt 9, Gruppenaufgabe 1 c)',
  },
  {
    art: 'single',
    frage:
      'SELECT Name FROM Studenten WHERE Semester > 10; – warum erscheint Fichte (Semester = 10) NICHT im Ergebnis?',
    optionen: [
      { text: 'Weil „> 10" echt größer bedeutet; 10 ist nicht > 10 (man bräuchte >= 10).' },
      { text: 'Weil Fichte keine gültige MatrNr hat.', warumFalsch: 'Die MatrNr ist irrelevant; ausschlaggebend ist der Vergleich Semester > 10.' },
      { text: 'Weil Studenten standardmäßig nach Name gefiltert werden.', warumFalsch: 'Es wird nur nach Semester gefiltert; ein Name-Filter existiert nicht.' },
      { text: 'Weil 10 ein NULL-Wert ist.', warumFalsch: '10 ist ein konkreter Wert, kein NULL.' },
    ],
    richtige: 0,
    erklaerung: '„> 10" ist echt größer; Semester = 10 erfüllt das nicht. Übrig bleiben Xenokrates (18) und Jonas (12).',
    quelle: 'Blatt 9, Gruppenaufgabe 1 a)',
  },
  {
    art: 'wahrfalsch',
    frage: 'Subqueries, Outer Joins und UNION (Northwind, Blatt 9):',
    aussagen: [
      { text: 'Ein LEFT JOIN behält alle Zeilen der linken Tabelle, auch ohne Treffer rechts (dann NULL).', wahr: true },
      { text: 'Ein FULL OUTER JOIN behält alle Zeilen beider Tabellen.', wahr: true },
      { text: 'UNION ALL entfernt Duplikate, UNION behält sie.', wahr: false, warum: 'Genau umgekehrt: UNION entfernt Duplikate, mit UNION ALL bleiben sie erhalten.' },
      { text: 'Stringvergleiche sind in Oracle case-sensitiv, daher gilt \'m\' ≠ \'M\'.', wahr: true },
    ],
    erklaerung: 'LEFT/RIGHT/FULL Outer Joins behalten partnerlose Zeilen (mit NULLs). UNION entfernt Duplikate, UNION ALL nicht. Oracle-Stringvergleiche unterscheiden Groß-/Kleinschreibung.',
    quelle: 'Blatt 9, Hausaufgabe 1 / Hinweis',
  },
  {
    art: 'eingabe',
    frage:
      'T1 (12 Zeilen) LEFT OUTER JOIN T2 ON T1.A = T2.E. Es gibt 6 gematchte Treffer; die übrigen 8 T1-Zeilen haben keinen Partner. Wie viele Zeilen liefert COUNT(*)?',
    loesungen: ['14'],
    toleranz: 0,
    platzhalter: 'Anzahl',
    erklaerung: 'Der Left Outer Join behält alle T1-Zeilen: 6 gematchte + 8 partnerlose (je 1 Zeile mit NULLs) = 14.',
    quelle: 'Blatt 9, Hausaufgabe 2 g)',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Blatt 10 – Integritätsbedingungen / Constraints
  // ─────────────────────────────────────────────────────────────────────────
  {
    art: 'kategorien',
    frage: 'Ordne jeden Constraint des Universitätsschemas seinem Typ zu.',
    kategorien: ['Schlüssel/Eindeutigkeit', 'Wertebereich (CHECK)', 'Fremdschlüssel'],
    items: [
      { text: 'UNIQUE (Raum)', kategorie: 'Schlüssel/Eindeutigkeit' },
      { text: "CHECK (Rang IN ('C2','C3','C4'))", kategorie: 'Wertebereich (CHECK)' },
      { text: 'CHECK (Note BETWEEN 0.7 AND 5.0)', kategorie: 'Wertebereich (CHECK)' },
      { text: 'FOREIGN KEY (Boss) REFERENCES Professoren', kategorie: 'Fremdschlüssel' },
    ],
    erklaerung: 'PRIMARY KEY/UNIQUE sichern Eindeutigkeit, CHECK schränkt den Wertebereich ein (Rang, Note, Semester), FOREIGN KEY verlangt einen existierenden Bezugswert in der referenzierten Tabelle.',
    quelle: 'Blatt 10, Gruppenaufgabe 1',
  },
  {
    art: 'single',
    frage: 'Worin unterscheiden sich ON DELETE SET NULL und ON DELETE CASCADE beim Löschen einer referenzierten Zeile?',
    optionen: [
      { text: 'SET NULL setzt den Fremdschlüssel der referenzierenden Zeilen auf NULL (Zeilen bleiben); CASCADE löscht die referenzierenden Zeilen mit.' },
      { text: 'SET NULL löscht die referenzierenden Zeilen; CASCADE setzt sie auf NULL.', warumFalsch: 'Das ist genau vertauscht – CASCADE löscht, SET NULL nullt den Fremdschlüssel.' },
      { text: 'Beide verhindern das Löschen der referenzierten Zeile vollständig.', warumFalsch: 'Das Löschen wird gerade NICHT verhindert; nur das Verhalten in den abhängigen Zeilen unterscheidet sich.' },
      { text: 'Beide haben dieselbe Wirkung, nur unterschiedliche Namen.', warumFalsch: 'Sie unterscheiden sich klar: NULL-Setzen vs. Mitlöschen.' },
    ],
    richtige: 0,
    erklaerung: 'Bei Assistenten.Boss (SET NULL) wird beim Löschen des Professors nur Boss auf NULL gesetzt – der Assistent bleibt. Bei hören (CASCADE) werden beim Löschen von Student/Vorlesung die hören-Tupel mitgelöscht.',
    quelle: 'Blatt 10, Gruppenaufgabe 1 b)',
  },
  {
    art: 'wahrfalsch',
    frage: 'ER-Modell vs. Schema und Constraint-Verstöße (Blatt 10):',
    aussagen: [
      { text: 'Schlüssel der Entitytypen und die Beziehungsstruktur stammen schon aus dem ER-Modell.', wahr: true },
      { text: 'Wertebereichs-CHECKs, UNIQUE und referenzielle Aktionen entstehen erst im Schema (CREATE TABLE).', wahr: true },
      { text: "DELETE der Vorlesung 'Ethik' gelingt, obwohl prüfen sie ohne ON-DELETE-Aktion referenziert.", wahr: false, warum: 'Der VorlNr-Fremdschlüssel in prüfen hat keine Aktion (NO ACTION) und blockiert das Löschen, um „dangling references" zu vermeiden.' },
    ],
    erklaerung: 'Aus dem ER-Modell stammen Primärschlüssel und Beziehungsstruktur. CHECK, UNIQUE, NOT NULL und ON-DELETE-Aktionen werden erst im Schema festgelegt. Ohne referenzielle Aktion blockiert ein Fremdschlüssel das Löschen referenzierter Zeilen.',
    quelle: 'Blatt 10, Gruppenaufgabe 2 / Hausaufgabe 1',
  },
  {
    art: 'single',
    frage:
      'Tabelle R hat CONSTRAINT CR4 UNIQUE(D). Welcher INSERT verstößt gegen genau diesen Constraint, wenn D = 256 bereits existiert?',
    optionen: [
      { text: "INSERT INTO R VALUES (4, 'orange', 32, 256)" },
      { text: "INSERT INTO R VALUES (1, 'magenta', 45, 512)", warumFalsch: 'Das verletzt CR3 (512 ist kein erlaubter D-Wert), nicht den UNIQUE-Constraint.' },
      { text: "INSERT INTO R VALUES (10, 'gruen', 15, 4)", warumFalsch: "Das verletzt CR2 (LENGTH('gruen') = 5 ist nicht in {3,4,6,7})." },
      { text: "INSERT INTO R VALUES (11, 'magenta', 14, 8)", warumFalsch: 'Dieser INSERT ist OK – kein Constraint wird verletzt.' },
    ],
    richtige: 0,
    erklaerung: 'UNIQUE(D) verlangt, dass jeder D-Wert nur einmal vorkommt. D = 256 existiert bereits → der INSERT mit D = 256 verstößt gegen CR4.',
    quelle: 'Blatt 10, Hausaufgabe 2',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Blatt 11 – Funktionale Abhängigkeiten & Normalisierung
  // ─────────────────────────────────────────────────────────────────────────
  {
    art: 'single',
    frage: 'Wann heißt eine funktionale Abhängigkeit α → β „trivial"?',
    optionen: [
      { text: 'Wenn β ⊆ α (die rechte Seite in der linken enthalten ist), z. B. AB → B.' },
      { text: 'Wenn α und β keine gemeinsamen Attribute haben.', warumFalsch: 'Das ist das Gegenteil – trivial ist sie gerade, wenn rechts nichts Neues steht.' },
      { text: 'Wenn α ein Kandidatenschlüssel ist.', warumFalsch: 'Ob α Schlüssel ist, entscheidet nicht über Trivialität; trivial bezieht sich nur auf β ⊆ α.' },
      { text: 'Wenn die FD durch die Ausprägung widerlegt wird.', warumFalsch: 'Eine widerlegte FD gilt schlicht nicht; mit Trivialität hat das nichts zu tun.' },
    ],
    richtige: 0,
    erklaerung: 'Eine FD α → β ist trivial, wenn β ⊆ α. So sind z. B. AB → B und D → D trivial, weil die rechte Seite schon links enthalten ist.',
    quelle: 'Blatt 11, Gruppenaufgabe 1',
  },
  {
    art: 'reihenfolge',
    frage:
      'R={A,B,C,D}, FDs A→BC, B→C, AB→D. Bringe die Schritte der Attributhüllen-Berechnung A⁺ in die richtige Reihenfolge.',
    schritte: [
      'Start: {A}',
      'mit A → BC: {A, B, C}',
      'mit AB → D: {A, B, C, D}',
      'Ergebnis: A⁺ = {A, B, C, D} → {A} ist Kandidatenschlüssel',
    ],
    erklaerung: 'Man startet mit {A}, fügt über A→BC die Attribute B,C hinzu, dann über AB→D das Attribut D. A⁺ umfasst alle Attribute, also ist {A} ein (minimaler) Kandidatenschlüssel.',
    quelle: 'Blatt 11, Gruppenaufgabe 2',
  },
  {
    art: 'reihenfolge',
    frage: 'Bringe die Schritte zur Bestimmung der kanonischen Überdeckung Fc in die richtige Reihenfolge.',
    schritte: [
      'Linksreduktion (überflüssige Attribute auf der linken Seite entfernen)',
      'Rechtsreduktion (überflüssige Attribute auf der rechten Seite entfernen)',
      'FDs mit leerer rechter Seite entfernen',
      'FDs mit gleicher linker Seite zusammenfassen',
    ],
    erklaerung: 'Der Synthesealgorithmus bestimmt Fc in dieser Reihenfolge: erst Links-, dann Rechtsreduktion, dann leere rechte Seiten entfernen, zuletzt gleiche linke Seiten zusammenfassen.',
    quelle: 'Blatt 11, Anmerkung / Gruppenaufgabe 2',
  },
  {
    art: 'wahrfalsch',
    frage: 'Kanonische Überdeckung und 3NF-Synthese (Blatt 11):',
    aussagen: [
      { text: 'Die kanonische Überdeckung Fc ist nicht eindeutig – je nach Reihenfolge der Reduktion entstehen verschiedene, aber äquivalente Ergebnisse.', wahr: true },
      { text: 'Beim Synthesealgorithmus erzeugt man für jede FD α → β ein Schema Rα = α ∪ β.', wahr: true },
      { text: 'Eine FD lässt sich anhand einer Ausprägung endgültig BEWEISEN.', wahr: false, warum: 'Eine Ausprägung kann eine FD nur widerlegen (Gegenbeispiel), nie endgültig beweisen.' },
      { text: 'Enthält kein erzeugtes Schema einen Kandidatenschlüssel, ergänzt man ein Schema nur aus einem Kandidatenschlüssel.', wahr: true },
    ],
    erklaerung: 'Fc ist nicht eindeutig (Reihenfolge der Rechtsreduktion). Im Syntheseschritt wird je FD ein Schema gebildet; fehlt ein Kandidatenschlüssel, wird ein Schlüsselschema ergänzt; enthaltene Schemata werden eliminiert. Eine Ausprägung kann FDs nur widerlegen.',
    quelle: 'Blatt 11, Gruppenaufgabe 3 / Hausaufgabe 1',
  },
  {
    art: 'eingabe',
    frage:
      'Synthesealgorithmus: In welche Normalform überführt er ein Relationenschema? Tippe die Abkürzung (z. B. „xNF").',
    loesungen: ['3NF', 'dritte Normalform'],
    platzhalter: 'Normalform',
    erklaerung: 'Der Synthesealgorithmus erzeugt aus der kanonischen Überdeckung ein verlustfreies, abhängigkeitserhaltendes Schema in dritter Normalform (3NF).',
    quelle: 'Blatt 11, Hausaufgabe 1 & 2',
  },
]
