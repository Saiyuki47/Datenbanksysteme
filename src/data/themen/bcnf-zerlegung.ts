import type { Thema } from '../themen'

export const thema: Thema = {
  id: 'bcnf-zerlegung',
  nr: 0,
  title: 'BCNF & Zerlegungsalgorithmus',
  subtitle:
    'Die Boyce-Codd-Normalform beseitigt Redundanz, indem sie „schlechte" funktionale ' +
    'Abhängigkeiten durch Zerlegung entfernt. Der BCNFDecomp-Algorithmus macht das systematisch.',
  sections: [
    {
      heading: 'Worum geht es? Good FD vs. Bad FD',
      blocks: [
        {
          art: 'text',
          text:
            'Grundidee der Normalisierung: Man bestimmt die funktionalen Abhängigkeiten (FDs) einer Relation, ' +
            'unterscheidet „gute" von „schlechten" FDs und zerlegt die Tabelle entlang der schlechten FDs in ' +
            'kleinere Tabellen. Am Ende ist das Schema normalisiert – ohne die Redundanzen und Anomalien, die ' +
            'von den schlechten Abhängigkeiten kommen.',
        },
        {
          art: 'text',
          text:
            'Eine FD X → A heißt „good FD", wenn X ein (Super-)Schlüssel ist – X bestimmt dann bereits ALLE ' +
            'Attribute der Relation. Ist X dagegen KEIN (Super-)Schlüssel, so legt X nur einen Teil der Attribute ' +
            'fest; die übrigen können sich wiederholen. Das erzeugt Redundanz und damit Anomalien – X → A ist eine ' +
            '„bad FD". Genau diese schlechten FDs will man eliminieren.',
        },
        {
          art: 'text',
          text:
            'Beispiel aus der Vorlesung: In einer Mitarbeiter-Tabelle EmpID, Name, Phone, Position ist ' +
            'EmpID → Name, Phone, Position eine good FD (EmpID ist Schlüssel). Aber Position → Phone ist eine ' +
            'bad FD: Position ist kein Schlüssel, mehrere Mitarbeiter mit derselben Position wiederholen dieselbe ' +
            'Telefonnummer – Redundanz, die zu Update-, Einfüge- und Löschanomalien führt.',
        },
        {
          art: 'tabelle',
          titel: 'Mitarbeiter-Tabelle – Position → Phone ist redundant (aus der Vorlesung)',
          columns: ['EmpID', 'Name', 'Phone', 'Position'],
          rows: [
            ['E0045', 'Smith', '1234', 'Clerk'],
            ['E3542', 'Mike', '9876', 'Salesrep'],
            ['E1111', 'Smith', '9876', 'Salesrep'],
            ['E9999', 'Mary', '1234', 'Lawyer'],
          ],
        },
      ],
    },
    {
      heading: 'Die BCNF-Bedingung',
      blocks: [
        {
          art: 'text',
          text:
            'BCNF ist eine einfache Bedingung, um Anomalien aus Relationen zu entfernen – oder andersherum: eine ' +
            'Relation ist in BCNF, wenn es in ihr KEINE bad FDs gibt.',
        },
        {
          art: 'merksatz',
          text:
            'Eine Relation R ist in BCNF, wenn für JEDE nichttriviale FD {A₁,…,Aₙ} → B in R gilt: ' +
            '{A₁,…,Aₙ} ist ein Superschlüssel von R. Kurz: Auf der linken Seite jeder (nichttrivialen) FD steht ' +
            'immer ein (Super-)Schlüssel.',
        },
        {
          art: 'liste',
          punkte: [
            '„Nichttrivial" heißt: die rechte Seite steckt nicht schon in der linken (X → A mit A ∉ X).',
            'Superschlüssel: eine Attributmenge, deren Hülle alle Attribute umfasst (X⁺ = alle Attribute).',
            'Anschaulich: Jede FD ist „good" – ihre linke Seite bestimmt bereits die ganze Zeile eindeutig.',
            'Der Test läuft über die Attributhülle: X ist genau dann Superschlüssel, wenn X⁺ = alle Attribute.',
          ],
        },
        {
          art: 'text',
          text:
            'Kleines Beispiel (SSN aus der Vorlesung): Die Relation Name, SSN, PhoneNumber, City hat den Schlüssel ' +
            '{SSN, PhoneNumber} – erst SSN und PhoneNumber zusammen identifizieren eine Zeile. Die FD ' +
            '{SSN} → {Name, City} ist aber bad, weil {SSN} allein KEIN Superschlüssel ist. Also ist die Relation ' +
            'NICHT in BCNF.',
        },
        {
          art: 'tabelle',
          titel: 'Name, SSN, PhoneNumber, City – Schlüssel {SSN, PhoneNumber}, {SSN} → {Name, City} ist bad',
          columns: ['Name', 'SSN', 'PhoneNumber', 'City'],
          rows: [
            ['Fred', '123-45-6789', '206-555-1234', 'Seattle'],
            ['Fred', '123-45-6789', '206-555-6543', 'Seattle'],
            ['Joe', '987-65-4321', '908-555-2121', 'Madison'],
            ['Joe', '987-65-4321', '908-555-1234', 'Madison'],
          ],
        },
      ],
    },
    {
      heading: 'Der Zerlegungsalgorithmus BCNFDecomp(R)',
      blocks: [
        {
          art: 'text',
          text:
            'Der Algorithmus sucht eine bad FD, zerlegt die Relation verlustlos entlang dieser FD und wiederholt ' +
            'das rekursiv auf beiden Teilen, bis nirgends mehr eine bad FD steckt. Die bad FD findet man rein über ' +
            'die Attributhülle: Gesucht ist eine Attributmenge X, die weder „nichts" noch „alles" bestimmt.',
        },
        {
          art: 'liste',
          punkte: [
            'Schritt 1 – Finde eine Attributmenge X mit X⁺ ≠ X UND X⁺ ≠ [alle Attribute]. ' +
              'Das ist genau eine nichttriviale bad FD (X bestimmt etwas, ist aber kein Superschlüssel).',
            'Schritt 2 – Wird KEINE solche Menge gefunden, ist R bereits in BCNF: gib R zurück (Rekursionsende).',
            'Schritt 3 – Sonst zerlege R in R1 = X⁺ und R2 = X ∪ Rest, ' +
              'wobei Rest = die Attribute, die NICHT in X⁺ liegen. (X kommt in beiden Teilen vor – das macht die Zerlegung verlustlos.)',
            'Schritt 4 – Rufe BCNFDecomp(R1) und BCNFDecomp(R2) rekursiv auf und setze die Ergebnisse zusammen.',
          ],
        },
        {
          art: 'sql',
          titel: 'BCNFDecomp(R) – Pseudocode',
          code:
            'BCNFDecomp(R):\n' +
            '  finde X mit  X⁺ ≠ X  und  X⁺ ≠ [alle Attribute]\n' +
            '  if (not found) then\n' +
            '     return R                       -- R ist in BCNF\n' +
            '  decompose R into  R1 = X⁺  and  R2 = X ∪ Rest\n' +
            '     -- Rest = Attribute, die nicht in X⁺ liegen\n' +
            '  return BCNFDecomp(R1), BCNFDecomp(R2)',
        },
        {
          art: 'merksatz',
          text:
            'Warum verlustlos? Weil X in beiden Teilen R1 und R2 vorkommt und X → (R1-Attribute) gilt, lässt sich ' +
            'R immer als R1 ⋈ R2 zurückgewinnen. BCNF-Zerlegung ist damit stets verlustlos – aber, wie unten gezeigt, ' +
            'nicht immer abhängigkeitserhaltend.',
        },
      ],
    },
    {
      heading: 'Durchgerechnetes Beispiel: R(A, B, C, D, E)',
      blocks: [
        {
          art: 'text',
          text:
            'Gegeben ist R(A, B, C, D, E) mit den FDs {A} → {B, C} und {C} → {D}. Der Schlüssel ist {A, E} ' +
            '(E kommt in keiner FD rechts vor, muss also im Schlüssel stecken; A bestimmt über die FDs B, C, D). ' +
            'Wir wenden BCNFDecomp Schritt für Schritt an.',
        },
        {
          art: 'algebra',
          titel: 'Schritt 1 – bad FD über A',
          text:
            '{A}⁺ = {A, B, C, D}   (aus A → BC und C → D)\n' +
            '{A}⁺ = {A,B,C,D} ≠ {A}          → nichttrivial\n' +
            '{A}⁺ = {A,B,C,D} ≠ {A,B,C,D,E}  → kein Superschlüssel  ⇒ bad FD\n' +
            'Zerlege:  R1 = {A}⁺ = R1(A, B, C, D)\n' +
            '          R2 = {A} ∪ Rest = R2(A, E)      (Rest = {E})',
        },
        {
          art: 'algebra',
          titel: 'Schritt 2 – R1(A, B, C, D) weiter zerlegen, R2(A, E) ist fertig',
          text:
            'R2(A, E): {A}⁺ in R2 = {A} → nur trivial, {A,E} ist Schlüssel ⇒ bereits in BCNF.\n' +
            '\n' +
            'In R1(A, B, C, D) gilt noch C → D:\n' +
            '{C}⁺ = {C, D} ≠ {C}          → nichttrivial\n' +
            '{C}⁺ = {C,D} ≠ {A,B,C,D}     → kein Superschlüssel  ⇒ bad FD\n' +
            'Zerlege R1:  R11 = {C}⁺ = R11(C, D)\n' +
            '             R12 = {C} ∪ Rest = R12(A, B, C)   (Rest = {A, B})',
        },
        {
          art: 'svg',
          titel: 'Zerlegungsbaum von R(A, B, C, D, E)',
          svg: `<svg viewBox="0 0 560 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Zerlegungsbaum: R(A,B,C,D,E) wird über A und C in R11(C,D), R12(A,B,C) und R2(A,E) zerlegt">
  <line class="dgm-line" x1="280" y1="52" x2="150" y2="120"/>
  <line class="dgm-line" x1="280" y1="52" x2="430" y2="120"/>
  <line class="dgm-line" x1="150" y1="152" x2="70" y2="228"/>
  <line class="dgm-line" x1="150" y1="152" x2="240" y2="228"/>
  <rect class="dgm-shape" x="195" y="18" width="170" height="34" rx="4"/>
  <text class="dgm-text" x="280" y="40" text-anchor="middle">R(A, B, C, D, E)</text>
  <text class="dgm-lbl" x="196" y="92" text-anchor="middle">A⁺ = ABCD</text>
  <text class="dgm-card" x="392" y="92" text-anchor="middle">Rest = E</text>
  <rect class="dgm-shape" x="80" y="120" width="140" height="34" rx="4"/>
  <text class="dgm-text" x="150" y="142" text-anchor="middle">R1(A, B, C, D)</text>
  <rect class="dgm-shape" x="365" y="120" width="130" height="34" rx="4"/>
  <text class="dgm-text" x="430" y="142" text-anchor="middle">R2(A, E)</text>
  <text class="dgm-card" x="470" y="176" text-anchor="middle">✓ BCNF</text>
  <text class="dgm-lbl" x="72" y="196" text-anchor="middle">C⁺ = CD</text>
  <text class="dgm-card" x="252" y="196" text-anchor="middle">Rest = A,B</text>
  <rect class="dgm-shape" x="20" y="228" width="100" height="34" rx="4"/>
  <text class="dgm-text" x="70" y="250" text-anchor="middle">R11(C, D)</text>
  <rect class="dgm-shape" x="175" y="228" width="130" height="34" rx="4"/>
  <text class="dgm-text" x="240" y="250" text-anchor="middle">R12(A, B, C)</text>
  <text class="dgm-card" x="70" y="284" text-anchor="middle">✓ BCNF</text>
  <text class="dgm-card" x="240" y="284" text-anchor="middle">✓ BCNF</text>
</svg>`,
        },
        {
          art: 'text',
          text:
            'Ergebnis: R11(C, D), R12(A, B, C), R2(A, E) – alle drei sind in BCNF. Hinweis: Startet man in ' +
            'Schritt 1 stattdessen mit {C} statt {A}, kommt man über einen anderen Baum zum GLEICHEN Endschema. ' +
            'Die Reihenfolge der Zerlegung ändert das BCNF-Ergebnis hier nicht.',
        },
      ],
    },
    {
      heading: 'Zweites Beispiel: Enrollment (SID, Class, Room, Time, Lat, Lng)',
      blocks: [
        {
          art: 'text',
          text:
            'Schema: SID, Class, Room, Time, Lat, Lng. FDs: Class → Room, Time (eine Vorlesung findet in genau ' +
            'einem Raum zu einer Zeit statt) und Room → Lat, Lng (ein Raum hat feste Koordinaten). Schlüssel: ' +
            '{SID, Class}. Beide FDs sind bad, weil weder Class noch Room ein Superschlüssel ist.',
        },
        {
          art: 'algebra',
          titel: 'Zwei bad FDs nacheinander eliminieren',
          text:
            'Bad FD #1:  {Class}⁺ = {Class, Room, Time, Lat, Lng} ≠ alle\n' +
            '  Zerlege:  R1(Class, Room, Time, Lat, Lng)   und   R2(SID, Class)\n' +
            '\n' +
            'Bad FD #2 (in R1):  {Room}⁺ = {Room, Lat, Lng} ≠ alle von R1\n' +
            '  Zerlege R1:  R11(Room, Lat, Lng)   und   R12(Class, Room, Time)\n' +
            '\n' +
            '⇒ BCNF-Schema:  R2(SID, Class), R12(Class, Room, Time), R11(Room, Lat, Lng)',
        },
        {
          art: 'text',
          text:
            'Hier zerlegt man zweimal: erst nach Class, dann nach Room. Auch bei umgekehrter Reihenfolge ergibt ' +
            'sich dasselbe Endschema. Alle drei Teiltabellen sind in BCNF, weil jede FD nun eine ' +
            'Schlüsselabhängigkeit ist (Class in R12, Room in R11, {SID, Class} in R2).',
        },
      ],
    },
    {
      heading: 'Achtung: BCNF ist nicht immer abhängigkeitserhaltend',
      blocks: [
        {
          art: 'text',
          text:
            'BCNF-Zerlegung ist zwar immer VERLUSTLOS (man kann R per Join rekonstruieren), aber nicht immer ' +
            'ABHÄNGIGKEITSERHALTEND – manchmal geht eine FD verloren, die sich nach der Zerlegung nicht mehr ohne ' +
            'einen Join prüfen lässt.',
        },
        {
          art: 'text',
          text:
            'Beispiel Unit, Company, Product mit den FDs {Unit} → {Company} und {Company, Product} → {Unit}; ' +
            'Schlüssel ist {Company, Product}. Die bad FD ist {Unit} → {Company}, denn {Unit}⁺ = {Unit, Company} ' +
            'ist kein Superschlüssel. Die BCNF-Zerlegung entlang dieser bad FD ergibt Tabelle(Unit, Company) und ' +
            'Tabelle(Unit, Product).',
        },
        {
          art: 'algebra',
          titel: 'Verlorene FD nach der Zerlegung',
          text:
            'R(Company, Product, Unit),  Schlüssel {Company, Product}\n' +
            'bad FD:  {Unit}⁺ = {Unit, Company} ≠ alle\n' +
            'Zerlege:  R1(Unit, Company)   und   R2(Unit, Product)\n' +
            '\n' +
            'Problem:  Die FD {Company, Product} → {Unit} steht jetzt weder in R1 noch in R2\n' +
            '          → sie ist über beide Tabellen „verteilt" und geht verloren!',
        },
        {
          art: 'text',
          text:
            'Setzt man R1 und R2 wieder per Join zusammen, können Tupel entstehen, die {Company, Product} → {Unit} ' +
            'verletzen – ganz wie beim PLZ-Beispiel (siehe Karte „Verlustlosigkeit & Abhängigkeitserhaltung"). ' +
            'Um die FD zu erzwingen, müsste man bei jedem INSERT das ursprüngliche R rekonstruieren. Das ist der ' +
            'praktische Nachteil von BCNF.',
        },
        {
          art: 'merksatz',
          text:
            'Genau hier setzt die 3NF an: Sie erlaubt eine FD X → A auch dann, wenn A Teil EINES Schlüssels ist ' +
            '(nicht nur wenn X Superschlüssel ist), und zerlegt solche Tabellen NICHT weiter. So bleibt ' +
            '{Company, Product} → {Unit} erhalten. Für FDs ist BCNF die „stärkste" Normalform; 3NF ist der ' +
            'Kompromiss, der die Abhängigkeitserhaltung rettet (auf Kosten von etwas Restredundanz).',
        },
        {
          art: 'liste',
          punkte: [
            'BCNF: X → A ist good, wenn X (Super-)Schlüssel ist. Verlustlos, aber evtl. nicht abhängigkeitserhaltend.',
            '3NF: X → A ist good, wenn X (Super-)Schlüssel ist ODER A Teil eines (Kandidaten-)Schlüssels ist.',
            'Weiter: Karte „Verlustlosigkeit & Abhängigkeitserhaltung" (Lossless-Join, Dependency Preservation) und die 3NF-Karte.',
          ],
        },
      ],
    },
  ],
}
