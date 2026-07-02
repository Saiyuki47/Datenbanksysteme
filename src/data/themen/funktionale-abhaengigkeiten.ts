import type { Thema } from '../themen'

export const thema: Thema = {
  id: 'funktionale-abhaengigkeiten',
  nr: 0,
  title: 'Funktionale Abhängigkeiten (FDs)',
  subtitle:
    'Was X → Y genau bedeutet, warum „schlechte" FDs Redundanz und Anomalien erzeugen und ' +
    'wie man verletzte FDs aus einer Tabelle abliest – die Grundlage der Entwurfstheorie.',
  sections: [
    {
      heading: 'Worum geht es?',
      blocks: [
        {
          art: 'text',
          text:
            'Datenbank-Entwurf (Normalisierung) beruht auf funktionalen Abhängigkeiten (engl. functional ' +
            'dependencies, FDs), um Anomalien zu vermeiden. Eine FD beschreibt eine feste Beziehung ' +
            'zwischen Attributen: „Wenn zwei Zeilen in gewissen Spalten übereinstimmen, dann stimmen sie ' +
            'auch in gewissen anderen Spalten überein." Solche Regeln macht man sichtbar, um daraus ein ' +
            'redundanzarmes Schema abzuleiten.',
        },
        {
          art: 'text',
          text:
            'Das typische Vorgehen: (1) mit einem gegebenen relationalen Schema starten, (2) die ' +
            'funktionalen Abhängigkeiten bestimmen, (3) daraus ein verbessertes Schema mit weniger ' +
            'Anomalien ableiten. Diese Karte behandelt Schritt 1–2 (was FDs sind, wie man sie erkennt); ' +
            'Attributhülle, Schlüsselbestimmung und die BCNF-Zerlegung bauen darauf auf.',
        },
      ],
    },
    {
      heading: 'Motivation: schlechtes Design erzeugt Anomalien',
      blocks: [
        {
          art: 'text',
          text:
            'Betrachten wir eine Tabelle, in der pro Kurs (Course) festgehalten wird, in welchem Raum ' +
            '(Room) er stattfindet. Findet jeder Kurs immer im selben Raum statt, so steht diese ' +
            'Information redundant in jeder Zeile:',
        },
        {
          art: 'tabelle',
          titel: 'Enrollment (Student, Course, Room)',
          columns: ['Student', 'Course', 'Room'],
          rows: [
            ['Mary', 'CS145', 'B01'],
            ['Joe', 'CS145', 'B01'],
            ['Sam', 'CS145', 'B01'],
          ],
        },
        {
          art: 'text',
          text:
            'Der Raum B01 hängt allein vom Kurs CS145 ab, wird aber in jeder Zeile wiederholt. Genau diese ' +
            'Redundanz führt zu drei klassischen Anomalien:',
        },
        {
          art: 'liste',
          punkte: [
            'Update-Anomalie: Ändert man den Raum nur in EINER Zeile (z. B. Joe → C12), entstehen ' +
              'widersprüchliche Daten – für denselben Kurs stehen plötzlich zwei Räume da.',
            'Lösch-Anomalie: Verlassen alle Studenten den Kurs, verschwinden alle Zeilen – und mit ihnen ' +
              'die Information, in welchem Raum CS145 stattfindet.',
            'Einfüge-Anomalie: Man kann keinen Raum für einen Kurs eintragen, solange kein Student ' +
              'eingeschrieben ist (der Primärschlüssel Student fehlt).',
          ],
        },
        {
          art: 'text',
          text:
            'Zerlegt man die Tabelle dagegen in Student(Student, Course) und Raumplan(Course, Room), sind ' +
            'alle drei Anomalien beseitigt. Die Ursache des Problems ist die FD {Course} → {Room} – und ' +
            'sie ist hier eine „schlechte" FD (siehe unten). Ziel der Entwurfstheorie ist es, alle FDs zu ' +
            'finden und die schlechten durch Zerlegung zu eliminieren.',
        },
      ],
    },
    {
      heading: 'Definition: X → Y',
      blocks: [
        {
          art: 'text',
          text:
            'Gegeben seien zwei Attributmengen X = {A₁, …, Aₘ} und Y = {B₁, …, Bₙ} einer Relation R. Man ' +
            'sagt X → Y („X bestimmt Y" bzw. „Y ist funktional abhängig von X"), wenn für JEDES Paar von ' +
            'Tupeln t_i, t_j aus R gilt:',
        },
        {
          art: 'algebra',
          titel: 'Formale Definition',
          text:
            'wenn  t_i[A₁] = t_j[A₁]  ∧  …  ∧  t_i[Aₘ] = t_j[Aₘ]\ndann   t_i[B₁] = t_j[B₁]  ∧  …  ∧  t_i[Bₙ] = t_j[Bₙ]',
        },
        {
          art: 'text',
          text:
            'In Worten: Stimmen zwei Tupel in ALLEN X-Attributen überein, so müssen sie auch in ALLEN ' +
            'Y-Attributen übereinstimmen. Anschaulich: Wählt man in der X-Spalte einen Wert aus, ist der ' +
            'zugehörige Y-Wert dadurch eindeutig festgelegt – zu jedem X-Wert gehört genau ein Y-Wert.',
        },
        {
          art: 'svg',
          titel: 'Anschauliche Darstellung',
          svg: `<svg viewBox="0 0 540 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Anschauliche Darstellung der funktionalen Abhaengigkeit X bestimmt Y">
  <rect class="dgm-shape" x="60" y="30" width="180" height="150" rx="4"/>
  <rect class="dgm-shape" x="300" y="30" width="180" height="150" rx="4"/>
  <text class="dgm-text" x="150" y="22" text-anchor="middle">X = A₁ … Aₘ</text>
  <text class="dgm-text" x="390" y="22" text-anchor="middle">Y = B₁ … Bₙ</text>
  <line class="dgm-line" x1="60" y1="90" x2="480" y2="90"/>
  <line class="dgm-line" x1="60" y1="130" x2="480" y2="130"/>
  <text class="dgm-text dgm-text--sm" x="150" y="75" text-anchor="middle">gleiche Werte</text>
  <text class="dgm-text dgm-text--sm" x="150" y="118" text-anchor="middle">gleiche Werte</text>
  <text class="dgm-text dgm-text--sm" x="390" y="75" text-anchor="middle">⇒ gleich!</text>
  <text class="dgm-text dgm-text--sm" x="390" y="118" text-anchor="middle">⇒ gleich!</text>
  <text class="dgm-lbl" x="40" y="75" text-anchor="middle">t_i</text>
  <text class="dgm-lbl" x="40" y="118" text-anchor="middle">t_j</text>
  <text class="dgm-card" x="270" y="200" text-anchor="middle">stimmen t_i, t_j links überein, dann auch rechts</text>
</svg>`,
        },
        {
          art: 'merksatz',
          text:
            'X → Y heißt: „gleiches X erzwingt gleiches Y". Merke: X → Y sagt nichts darüber aus, ob ' +
            'gleiches Y auch gleiches X erzwingt – die Umkehrung Y → X ist eine ganz andere Aussage.',
        },
      ],
    },
    {
      heading: 'FD als Constraint: gilt auf einer Instanz – oder nicht',
      blocks: [
        {
          art: 'text',
          text:
            'Eine Ausprägung (Instanz) eines Schemas ist ein Multiset von Tupeln, die dem Schema ' +
            'entsprechen – also schlicht eine konkrete Tabelle. Eine FD ist ein Constraint, das auf einer ' +
            'Instanz gilt oder nicht gilt. Zum Prüfen sucht man ein GEGENBEISPIEL: zwei Zeilen, die links ' +
            '(X) gleich, rechts (Y) aber verschieden sind – dann ist die FD verletzt.',
        },
        {
          art: 'merksatz',
          text:
            'Wichtige Asymmetrie: An EINER Instanz kann man nur zeigen, dass eine FD VERLETZT ist (durch ' +
            'ein Gegenbeispiel). Dass eine FD GILT, lässt sich an einer einzelnen Instanz nie beweisen – ' +
            'man müsste jede mögliche Instanz prüfen. Ob eine FD Teil des Schemas ist, ergibt sich aus der ' +
            'Bedeutung der Daten, nicht aus einer einzelnen Tabelle.',
        },
        {
          art: 'text',
          text:
            'Beispiel-Instanz einer Mitarbeitertabelle. Wir prüfen daran mehrere FDs:',
        },
        {
          art: 'tabelle',
          titel: 'Mitarbeiter (EmpID, Name, Phone, Position)',
          columns: ['EmpID', 'Name', 'Phone', 'Position'],
          rows: [
            ['E0045', 'Smith', '1234', 'Clerk'],
            ['E3542', 'Mike', '9876', 'Salesrep'],
            ['E1111', 'Smith', '9876', 'Salesrep'],
            ['E9999', 'Mary', '1234', 'Lawyer'],
          ],
        },
        {
          art: 'liste',
          punkte: [
            'EmpID → {Name, Phone, Position} gilt: Jede EmpID kommt nur einmal vor, also gibt es gar kein ' +
              'Paar mit gleichem EmpID – die Bedingung ist nie verletzt.',
            '{Position} → {Phone} gilt auf dieser Instanz: Die beiden Zeilen mit Position „Salesrep" ' +
              '(E3542, E1111) haben beide Phone 9876; alle anderen Positionen kommen nur einmal vor.',
            '{Phone} → {Position} gilt NICHT: Phone 1234 tritt zweimal auf (E0045, E9999), einmal mit ' +
              'Position „Clerk", einmal mit „Lawyer" – gleiches Phone, verschiedene Position → Gegenbeispiel, ' +
              'FD verletzt.',
          ],
        },
      ],
    },
    {
      heading: 'Triviale FDs',
      blocks: [
        {
          art: 'text',
          text:
            'Eine FD X → Y heißt trivial, wenn Y ⊆ X ist (die rechte Seite ganz in der linken enthalten ' +
            'ist). Solche FDs gelten IMMER, auf jeder Instanz, ohne dass man etwas prüfen müsste: Stimmen ' +
            'zwei Tupel in allen X-Attributen überein, dann natürlich auch in einer Teilmenge davon.',
        },
        {
          art: 'liste',
          punkte: [
            '{A, B} → {A} ist trivial – ebenso {A, B} → {B} und {A, B} → {A, B}.',
            'Allgemein: {A₁, …, Aₘ} → {A_j} gilt für jedes j = 1, …, m (das ist die „Reduktion" der ' +
              'Armstrong-Regeln).',
            'Nicht-triviale FDs (z. B. {Course} → {Room}) sind die interessanten – nur sie tragen ' +
              'echte Information über die Daten und sind für den Entwurf relevant.',
          ],
        },
      ],
    },
    {
      heading: '„Good" vs. „Bad" FDs',
      blocks: [
        {
          art: 'text',
          text:
            'Nicht jede FD ist gleich problematisch. Die Unterscheidung entscheidet, ob eine FD Redundanz ' +
            'erzeugt. Zurück zur Mitarbeitertabelle oben:',
        },
        {
          art: 'liste',
          punkte: [
            'EmpID → {Name, Phone, Position} ist eine GOOD FD: EmpID ist eindeutig/identifizierend, also ' +
              'ein Schlüssel. Es entsteht nur minimale Redundanz und es drohen keine Anomalien.',
            '{Position} → {Phone} ist eine BAD FD: Position ist KEIN Schlüssel und wiederholt sich. ' +
              'Dadurch steht dieselbe Positions-Phone-Kombination mehrfach in der Tabelle → Redundanz und ' +
              'die Gefahr von Update-, Lösch- und Einfüge-Anomalien.',
          ],
        },
        {
          art: 'merksatz',
          text:
            'Faustregel: Eine FD X → A ist GUT, wenn X ein (Super-)Schlüssel der Relation ist – dann darf X ' +
            'alles bestimmen. Sie ist SCHLECHT, wenn X kein Superschlüssel ist, sich also wiederholen kann. ' +
            'Genau das ist die Idee hinter der BCNF-Bedingung. Ziel des Entwurfs: alle FDs finden und die ' +
            'schlechten durch Zerlegung eliminieren.',
        },
        {
          art: 'text',
          text:
            'Auch die Anomalien aus dem Motivationsbeispiel erklären sich damit: {Course} → {Room} ist eine ' +
            'bad FD, weil Course kein Schlüssel der Enrollment-Tabelle ist (der Schlüssel wäre {Student, ' +
            'Course}). Die Zerlegung entlang dieser FD hat die Anomalien beseitigt.',
        },
      ],
    },
    {
      heading: 'FDs aus einer Tabelle ablesen',
      blocks: [
        {
          art: 'text',
          text:
            'Um verletzte FDs zu finden, geht man spaltenweise vor: Für eine vermutete FD X → Y sortiert ' +
            'bzw. gruppiert man gedanklich nach X und schaut, ob innerhalb jeder X-Gruppe der Y-Wert ' +
            'konstant ist. Zwei Zeilen mit gleichem X, aber verschiedenem Y sind ein Gegenbeispiel – die ' +
            'FD ist dann verletzt.',
        },
        {
          art: 'text',
          text:
            'Umgekehrt findet man KANDIDATEN für gültige FDs, indem man nach Spalten sucht, deren Wert ' +
            'einen anderen Spaltenwert eindeutig festlegt (z. B. eine ID → alle übrigen Attribute). Bei ' +
            'der folgenden Instanz soll man mindestens drei FDs finden, die verletzt werden:',
        },
        {
          art: 'tabelle',
          titel: 'Instanz einer Relation R(A, B, C, D, E)',
          columns: ['A', 'B', 'C', 'D', 'E'],
          rows: [
            ['1', '2', '4', '3', '6'],
            ['3', '2', '5', '1', '8'],
            ['1', '4', '4', '5', '7'],
            ['1', '2', '4', '3', '6'],
            ['3', '2', '5', '1', '8'],
          ],
        },
        {
          art: 'liste',
          punkte: [
            'A → B verletzt: Zeile 1 hat A = 1, B = 2; Zeile 3 hat A = 1, B = 4 – gleiches A, verschiedenes ' +
              'B. (Ebenso A → D und A → E, z. B. D = 3 vs. D = 5.)',
            'B → A verletzt: Zeile 1 hat B = 2, A = 1; Zeile 2 hat B = 2, A = 3 – gleiches B, verschiedenes ' +
              'A. (Ebenso B → C und B → D über dasselbe Zeilenpaar.)',
            'D → E gilt hier dagegen: Für jeden D-Wert ist E konstant (D = 3 ⇒ E = 6, D = 1 ⇒ E = 8, ' +
              'D = 5 ⇒ E = 7). Man beachte: „gilt auf dieser Instanz" ≠ „gilt im Schema".',
          ],
        },
        {
          art: 'merksatz',
          text:
            'Die Zahl möglicher FDs ist sehr groß. In Klausuren genügt es meist, für jede verlangte ' +
            'verletzte FD EIN konkretes Gegenbeispiel (zwei Zeilennummern) anzugeben – das ist der schnellste ' +
            'und wasserdichte Nachweis.',
        },
      ],
    },
  ],
}
