// Klausur-Fallen: nicht-intuitive Stolperfallen, die man extra lernen muss –
// zusammengetragen aus den Übungsblättern, Probeklausuren und Altklausuren.
// Jede Falle: worum es geht (falle), ein „so nicht / sondern so" (falsch/richtig)
// oder ein Beispiel, und ein Merksatz.

export interface Falle {
  titel: string
  /** Warum es eine Falle ist. */
  falle: string
  /** Optionales „So nicht". */
  falsch?: string
  /** Optionales „Sondern so". */
  richtig?: string
  /** Optionales neutrales Beispiel (Monospace). */
  beispiel?: string
  /** Kernbotschaft zum Merken. */
  merke?: string
}

export interface FalleGruppe {
  id: string
  icon: string
  titel: string
  fallen: Falle[]
}

export const klausurFallen: FalleGruppe[] = [
  // ===========================================================================
  {
    id: 'sql',
    icon: '🗃️',
    titel: 'SQL',
    fallen: [
      {
        titel: 'NULL nie mit „=" vergleichen',
        falle: 'Jeder Vergleich mit NULL ergibt „unbekannt" (weder wahr noch falsch). Eine Bedingung x = NULL ist damit nie erfüllt und liefert KEINE Zeilen.',
        falsch: 'WHERE Chef = NULL',
        richtig: 'WHERE Chef IS NULL      -- bzw. IS NOT NULL',
        merke: 'NULL = „unbekannt" → dreiwertige Logik (wahr / falsch / unbekannt). Nur IS (NOT) NULL prüft auf NULL.',
      },
      {
        titel: 'NOT IN mit NULL in der Unterabfrage',
        falle: 'Enthält die Unterabfrage auch nur EIN NULL, liefert „x NOT IN (…)" GAR KEINE Zeilen – weil „x ≠ NULL" zu „unbekannt" wird und damit nie wahr ist.',
        beispiel: "SELECT Name FROM Mitarbeiter\nWHERE PersNr NOT IN (SELECT Chef FROM Mitarbeiter)\n-- leer, sobald ein Chef NULL ist!",
        richtig: 'NULL ausschließen (… WHERE Chef IS NOT NULL) oder NOT EXISTS verwenden.',
        merke: 'NOT IN + NULL = Falle. NOT EXISTS ist NULL-sicher.',
      },
      {
        titel: 'AND bindet stärker als OR',
        falle: 'A AND B OR C wird als (A AND B) OR C ausgewertet – nicht als A AND (B OR C). Ohne Klammern leicht falsch.',
        beispiel: "SELECT A FROM T1\nWHERE A >= 9 AND D = 'S' OR C = 20\n-- =  (A>=9 UND D='S')  ODER  C=20",
        merke: 'Bei gemischten AND/OR immer klammern.',
      },
      {
        titel: 'String-Vergleich ist case-sensitiv',
        falle: "In (Oracle-)SQL ist 'm' ≠ 'M'. Ein Wert wird nur gefunden, wenn die Groß-/Kleinschreibung exakt stimmt.",
        beispiel: "WHERE D = 'm'   -- findet KEINE Zeile mit D = 'M'",
        merke: "Genau auf Groß-/Kleinschreibung achten; ggf. UPPER(x)/LOWER(x) verwenden.",
      },
      {
        titel: 'Fehlende Join-Bedingung → Kreuzprodukt',
        falle: 'Mehrere Tabellen in FROM ohne Verbundbedingung ergeben das volle Kreuzprodukt: jede Zeile mit jeder (m · n Zeilen) – meist viel zu viele.',
        beispiel: 'SELECT COUNT(*) FROM T2, T2      -- = 6 · 6 = 36',
        merke: 'Bei n Tabellen im FROM die (n−1) Verbundbedingungen nicht vergessen.',
      },
      {
        titel: 'Aggregat-Bedingung: HAVING, nicht WHERE',
        falle: 'WHERE filtert einzelne Zeilen VOR der Gruppierung und darf keine Aggregatfunktion enthalten. Bedingungen über Aggregate gehören in HAVING (nach der Gruppierung).',
        falsch: 'SELECT City FROM … WHERE COUNT(*) > 2 GROUP BY City',
        richtig: 'SELECT City FROM … GROUP BY City HAVING COUNT(*) > 2',
        merke: 'WHERE = Zeilen (vorher), HAVING = Gruppen (nachher).',
      },
      {
        titel: 'COUNT(*) vs. COUNT(spalte)',
        falle: 'COUNT(*) zählt ALLE Zeilen (inkl. NULL). COUNT(spalte) ignoriert NULL-Werte – die beiden liefern bei NULLs unterschiedliche Zahlen.',
        beispiel: 'COUNT(*)          -- zählt jede Zeile\nCOUNT(Chef)       -- ohne die NULL-Chefs\nCOUNT(DISTINCT x) -- nur verschiedene Werte',
        merke: 'Bei NULL-behafteten Spalten genau überlegen, was gezählt werden soll.',
      },
      {
        titel: 'GROUP BY: SELECT-Spalten müssen gruppiert oder aggregiert sein',
        falle: 'Jede nicht-aggregierte Spalte im SELECT muss auch im GROUP BY stehen, sonst ist die Anfrage ungültig.',
        falsch: 'SELECT Name, COUNT(*) FROM … GROUP BY City',
        richtig: 'SELECT City, COUNT(*) FROM … GROUP BY City',
      },
      {
        titel: 'LEFT OUTER JOIN zählt partnerlose Zeilen mit',
        falle: 'Bei COUNT(*) über einen LEFT JOIN werden auch die Zeilen der linken Tabelle OHNE Partner mitgezählt (rechts NULL) – das Ergebnis ist größer als beim Inner Join.',
        beispiel: 'SELECT COUNT(*) FROM T1 LEFT OUTER JOIN T2 ON T1.A = T2.E\n-- = Treffer + partnerlose T1-Zeilen  (z. B. 14 statt 6)',
        merke: 'Outer Join = Inner-Treffer + aufgefüllte partnerlose Zeilen.',
      },
      {
        titel: 'Schreib- ≠ Auswertungsreihenfolge',
        falle: 'Geschrieben: SELECT–FROM–WHERE–GROUP BY–HAVING–ORDER BY. Logisch ausgewertet: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY. Deshalb kann ein in SELECT vergebenes Alias in WHERE noch nicht benutzt werden (in ORDER BY schon).',
        merke: 'SELECT wird fast zuletzt ausgewertet – Aliase erst ab ORDER BY nutzbar.',
      },
      {
        titel: 'UNION entfernt Duplikate',
        falle: 'UNION vereinigt zwei Ergebnisse und entfernt dabei doppelte Zeilen (Zähl-Falle). Sollen Duplikate bleiben, braucht man UNION ALL.',
        merke: 'UNION = ohne Duplikate, UNION ALL = mit. ORDER BY bei UNION nur mit Spalten, die in jedem SELECT gleich heißen.',
      },
    ],
  },
  // ===========================================================================
  {
    id: 'er',
    icon: '🔷',
    titel: 'ER-Modell',
    fallen: [
      {
        titel: 'Funktionalität ↔ (min,max) stehen „über Kreuz"',
        falle: 'Die Funktionalität steht an der Entität selbst, die (min,max)-Angabe beschreibt aber die GEGENSEITE. Die max-Angabe bei E1 gehört zur (min,max) von E2 – die häufigste Verwechslung.',
        beispiel: '1 : N   →   Seite 1: (0,*)   ·   Seite N: (0,1)',
        merke: 'Funktionalität = „wie viele Partner?"; (min,max) = „wie oft darf ein konkreter Wert vorkommen?" – Angaben tauschen die Seite.',
      },
      {
        titel: 'Partielle Funktion: die „1" steht rechts vom Pfeil',
        falle: 'Bei ternären Beziehungen leitet man die Funktionalitäten aus den geltenden partiellen Funktionen ab. Die Entität, die RECHTS vom Pfeil steht, bekommt eine „1".',
        beispiel: 'Professoren × Studenten → Seminarthemen\n⇒ an „Seminarthemen" eine 1',
        merke: 'Erst partielle Funktionen aufstellen, dann annotieren – nicht raten.',
      },
      {
        titel: 'n > 2: Funktionalität und (min,max) unvergleichbar',
        falle: 'Bei drei- und mehrstelligen Beziehungen drücken Funktionalität (über PAARE von Entitäten) und (min,max) (über EINZELNE Entitäten) VERSCHIEDENES aus – sie sind nicht ineinander umrechenbar.',
        merke: 'Manche Bedingungen sind nur als Funktionalität, andere nur als (min,max) ausdrückbar.',
      },
      {
        titel: 'Schwache Entität braucht den fremden Schlüssel',
        falle: 'Der eigene (partielle) Schlüssel einer schwachen Entität – im Diagramm gestrichelt unterstrichen – ist NICHT der ganze Primärschlüssel. Relational übernimmt sie den Schlüssel der starken Entität als Fremdschlüssel; der Primärschlüssel besteht dann aus zwei Spalten: Fremdschlüssel + eigener partieller Schlüssel.',
        beispiel: 'Raum(GebNr, RaumNr, Fläche)\nPK = (GebNr, RaumNr)   -- zwei Spalten\nGebNr = FK → Gebäude    (RaumNr allein nicht eindeutig)',
        merke: 'Gestrichelte Unterstreichung = partieller Schlüssel, nicht der volle PK. PK der schwachen Entität = FK der starken Entität + partieller Schlüssel.',
      },
    ],
  },
  // ===========================================================================
  {
    id: 'schema',
    icon: '➡️',
    titel: 'ER → Schema',
    fallen: [
      {
        titel: 'N:M-Beziehung niemals zusammenfassen',
        falle: 'Beim Verfeinern darf man Relationen nur bei GLEICHEM Schlüssel zusammenfassen – und das gilt nur für 1:N / N:1 / 1:1. Eine N:M-Beziehung behält IMMER ihre eigene Relation.',
        merke: 'Zusammenfassen nur bei gleichem Schlüssel; N:M bleibt eigenständig.',
      },
      {
        titel: '1:1 zusammenfassen – Variante mit weniger NULL wählen',
        falle: 'Bei 1:1 kann die Beziehungsrelation in BEIDE Entity-Relationen aufgenommen werden. Falsch gewählt entstehen viele NULL-Werte.',
        beispiel: 'Stadt+Bürgermeister zusammen (wenige NULL)  statt  Bürger+Bürgermeister (viele NULL)',
        merke: 'Die Variante mit den wenigsten NULL-Werten ist vorzuziehen.',
      },
    ],
  },
  // ===========================================================================
  {
    id: 'algebra',
    icon: '∑',
    titel: 'Relationale Algebra',
    fallen: [
      {
        titel: 'Natürlicher Join über ALLE gleichnamigen Spalten',
        falle: 'Der natürliche Join verbindet über JEDE gleichnamige Spalte. Haben zwei Relationen ungewollt zwei gleiche Spaltennamen (z. B. ServerID UND Name), verbindet er über beide – meist falsch.',
        richtig: 'In dem Fall einen Theta-Join mit expliziter Bedingung nehmen (⋈[R.ServerID = S.ServerID]).',
        merke: 'Bei mehreren gleichnamigen Spalten: Theta-Join statt natürlichem Join.',
      },
      {
        titel: '„nur" verlangt eine Differenz',
        falle: 'Eine Anfrage wie „SchauspielerInnen, die NUR Faust oder Wallenstein spielten" ist KEIN einfaches σ – man muss ausschließen, dass sie noch etwas anderes gespielt haben.',
        beispiel: 'π[PNR](σ[FIGUR=Faust ∨ FIGUR=Wallenstein](D))\n   −\nπ[PNR](σ[FIGUR≠Faust ∧ FIGUR≠Wallenstein](D))',
        merke: '„nur/alle/kein" → oft Differenz oder Division, nicht bloß Selektion.',
      },
      {
        titel: 'Join = Kreuzprodukt + Bedingung',
        falle: 'Ohne Verbundbedingung ist ein „Join" ein volles Kreuzprodukt. Ein Theta-Join ist per Definition σ[Bed](R × S).',
        merke: 'Fehlt die Bedingung, bekommt man aus Versehen alle Kombinationen.',
      },
    ],
  },
  // ===========================================================================
  {
    id: 'integritaet',
    icon: '🔒',
    titel: 'Integrität',
    fallen: [
      {
        titel: 'DROP TABLE scheitert bei referenzierendem Fremdschlüssel',
        falle: 'Solange eine ANDERE Tabelle die Tabelle per Fremdschlüssel referenziert, lässt sie sich NICHT löschen – auch nicht bei ON DELETE CASCADE und selbst dann nicht, wenn die Tabelle leer ist.',
        beispiel: 'DROP TABLE Studenten;  -- Fehler, weil prüfen/hören FK auf Studenten haben',
        merke: 'Zeilen löschen (DELETE) geht; die Tabelle löschen erst, wenn keine FK sie mehr referenzieren.',
      },
      {
        titel: 'ON DELETE ohne Angabe = zurückweisen',
        falle: 'Ohne referenzielle Aktion blockiert das DBMS das Löschen einer referenzierten Zeile (NO ACTION), um „dangling references" zu vermeiden – es kaskadiert NICHT automatisch.',
        beispiel: 'DELETE Vorlesung „Ethik"  → scheitert, wenn prüfen sie ohne CASCADE referenziert',
        merke: 'Default ≠ CASCADE. CASCADE / SET NULL muss man explizit angeben.',
      },
      {
        titel: 'INSERT: FK- und PK-Verletzungen',
        falle: 'Ein INSERT scheitert, wenn (a) ein referenziertes Tupel fehlt (Fremdschlüssel) oder (b) der Primärschlüssel schon existiert (Duplikat). Bei benannten Constraints angeben, WELCHER verletzt wird.',
        beispiel: 'INSERT INTO prüfen VALUES (…, 2138, …)\n-- scheitert: Professor 2138 existiert nicht (FK-Verletzung)',
        merke: 'INSERT prüft alle Constraints; genau sagen, welcher (CR1, CS2, …) greift.',
      },
      {
        titel: 'CHECK prüft nur Zustände – Übergänge nur mit Trigger',
        falle: 'Ein CHECK-Constraint prüft immer nur EINEN Zustand. Eine Regel über den Übergang alt → neu (z. B. „Gehalt darf nicht sinken") lässt sich NICHT als CHECK, sondern nur mit einem Trigger (:old/:new) ausdrücken.',
        merke: 'Vorher-Nachher-Vergleich ⇒ Trigger, nicht CHECK.',
      },
    ],
  },
  // ===========================================================================
  {
    id: 'normalisierung',
    icon: '📐',
    titel: 'Normalisierung & FDs',
    fallen: [
      {
        titel: 'Attribut ohne rechte FD-Seite muss in JEDEN Schlüssel',
        falle: 'Kommt ein Attribut in KEINER rechten Seite einer FD vor, kann es durch nichts bestimmt werden – es muss in JEDEM Kandidatenschlüssel enthalten sein.',
        merke: 'Erst diese „Muss-Attribute" finden, dann von klein nach groß die Hülle testen.',
      },
      {
        titel: 'Kanonische Überdeckung ist nicht eindeutig',
        falle: 'Je nach Reihenfolge von Links- und Rechtsreduktion können unterschiedliche – aber äquivalente – Fc herauskommen. „Die eine" kanonische Überdeckung gibt es nicht.',
        merke: 'Reihenfolge einhalten: erst Links-, dann Rechtsreduktion, dann leere/gleiche zusammenfassen.',
      },
      {
        titel: 'BCNF ist verlustlos, aber nicht immer abhängigkeitstreu',
        falle: 'Die BCNF-Zerlegung ist IMMER verlustlos, kann aber die Abhängigkeitstreue verlieren (eine FD „zerreißt"). Nur die 3NF-Synthese garantiert BEIDES.',
        merke: 'Verlustlosigkeit ⊇ immer; Abhängigkeitstreue nur bei 3NF-Synthese sicher.',
      },
      {
        titel: '3NF ist milder als BCNF',
        falle: '3NF erlaubt eine „schlechte" FD X → A ausnahmsweise, wenn A ein PRIMATTRIBUT ist (Teil eines Kandidatenschlüssels). BCNF verbietet auch das. Diese Ausnahme wird leicht übersehen.',
        merke: 'BCNF: linke Seite JEDER nichttrivialen FD ist Superschlüssel – ohne 3NF-Ausnahme.',
      },
      {
        titel: 'FD kann man widerlegen, aber nicht beweisen',
        falle: 'Aus einer konkreten Ausprägung (Tabelleninhalt) lässt sich eine FD nur WIDERLEGEN (zwei Zeilen als Gegenbeispiel), nie beweisen – FDs folgen aus der Bedeutung der Daten, nicht aus einem Beispiel.',
        merke: 'Gegenbeispiel gefunden ⇒ FD gilt nicht. Kein Gegenbeispiel ⇒ trotzdem nicht bewiesen.',
      },
    ],
  },
  // ===========================================================================
  {
    id: 'grundlagen',
    icon: '⚙️',
    titel: 'Grundlagen',
    fallen: [
      {
        titel: 'Lost Update hängt von der Verzahnung ab',
        falle: 'Ob eine Änderung verloren geht, hängt von der REIHENFOLGE aus lesen/berechnen/schreiben ab. Kritisch wird es, wenn beide Transaktionen den Ausgangswert lesen, BEVOR eine von beiden schreibt.',
        beispiel: 'A liest x · B liest x · A schreibt x−y · B schreibt x−z\n⇒ A-Änderung geht verloren, Endstand x−z statt x−y−z',
        merke: 'Abhilfe: Isolation (Sperren) → Zugriffe serialisieren.',
      },
    ],
  },
]
