import type { Uebungsblatt } from '../../types'

export const blatt11: Uebungsblatt = {
  id: 'blatt11',
  nr: '11',
  typ: 'Gruppenaufgaben',
  beschreibung:
    'Funktionale Abhängigkeiten (FDs) und Normalisierung: FDs prüfen (inkl. trivialer FDs), Attributhülle und ' +
    'Kandidatenschlüssel berechnen, die kanonische Überdeckung bestimmen und mit dem Synthesealgorithmus in die ' +
    'dritte Normalform (3NF) überführen.',
  anmerkung: {
    titel: 'Synthesealgorithmus (3NF) – Kurzfassung',
    punkte: [
      '1. Kanonische Überdeckung Fc bestimmen: a) Linksreduktion, b) Rechtsreduktion, c) FDs mit leerer rechter Seite entfernen, d) FDs mit gleicher linker Seite zusammenfassen.',
      '2. Für jede FD α → β ein Schema Rα = α ∪ β erzeugen (mit den zugehörigen FDs).',
      '3. Enthält kein Schema einen Kandidatenschlüssel, ein Schema nur aus einem Kandidatenschlüssel ergänzen.',
      '4. Schemata, die vollständig in einem anderen enthalten sind, eliminieren.',
    ],
  },
  tasks: [
    {
      nr: 1,
      titel: 'Gruppenaufgabe 1 – Funktionale Abhängigkeiten prüfen',
      text:
        'Erläutern Sie den Begriff der funktionalen Abhängigkeit und prüfen Sie für die gegebene Relation r(A,B,C,D), ' +
        'ob die FDs a)–f) gelten (und ob sie trivial sind): a) A→B  b) AB→B  c) AB→C  d) C→D  e) D→D  f) A→ABCD.',
      tabellen: [
        {
          titel: 'r(A, B, C, D)',
          columns: ['', 'A', 'B', 'C', 'D'],
          rows: [
            ['t', 'a₁', 'b₁', 'c₁', 'd₁'],
            ['p', 'a₂', 'b₂', 'c₁', 'd₂'],
            ['q', 'a₂', 'b₂', 'c₁', 'd₂'],
            ['r', 'a₃', 'b₂', 'c₁', 'd₂'],
            ['s', 'a₄', 'b₃', 'c₁', 'd₁'],
          ],
        },
      ],
      loesung: [
        {
          art: 'text',
          text:
            'Funktionale Abhängigkeit: A → B („A bestimmt B funktional") bedeutet – haben zwei Tupel bei A denselben ' +
            'Wert, dann auch bei B. Anhand der Ausprägung lässt sich eine FD widerlegen (Gegenbeispiel finden), aber nie ' +
            'endgültig beweisen – nur die Ausprägung wird geprüft. Trivial heißt eine FD α → β, wenn β ⊆ α (die rechte ' +
            'Seite in der linken enthalten ist).',
        },
        {
          art: 'liste',
          punkte: [
            'a) A → B: gilt. Jedem A-Wert ist genau ein B-Wert zugeordnet (a₁→b₁, a₂→b₂, a₃→b₂, a₄→b₃).',
            'b) AB → B: gilt – trivial, da B sowohl links als auch rechts steht.',
            'c) AB → C: gilt. C ist überall c₁, also eindeutig bestimmt.',
            'd) C → D: gilt NICHT. C ist immer c₁, D nimmt aber verschiedene Werte an (d₁ und d₂) → Gegenbeispiel.',
            'e) D → D: gilt – trivial (D links und rechts).',
            'f) A → ABCD: gilt. Jeder A-Wert bestimmt das gesamte Tupel eindeutig (A ist hier ein Schlüssel).',
          ],
        },
      ],
    },
    {
      nr: 2,
      titel: 'Gruppenaufgabe 2 – Hülle, Schlüssel & kanonische Überdeckung',
      text: 'R = {A,B,C,D} mit A→BC, B→C, AB→D. Berechnen Sie A⁺, alle Kandidatenschlüssel und die kanonische Überdeckung.',
      loesung: [
        {
          art: 'tabelle',
          titel: 'Attributhülle von A',
          columns: ['Betrachtete FD', 'Ergebnis'],
          rows: [
            ['(Start)', '{A}'],
            ['A → BC', '{A, B, C}'],
            ['AB → D', '{A, B, C, D}'],
          ],
        },
        {
          art: 'unterpunkt',
          label: 'Kandidatenschlüssel',
          text: 'A⁺ = {A,B,C,D} = alle Attribute → {A} ist Superschlüssel und minimal → Kandidatenschlüssel. Da A in keiner FD auf der rechten Seite vorkommt, gibt es keinen weiteren Kandidatenschlüssel.',
        },
        {
          art: 'unterpunkt',
          label: 'Kanonische Überdeckung',
          text: 'Schritte:',
          punkte: [
            'Linksreduktion: AB → D → A → D (B ist über A→B ableitbar, also überflüssig).',
            'Rechtsreduktion: A → BC → A → B (C ist über B→C ableitbar).',
            'Zwischenstand: A → B, B → C, A → D.',
            'Keine FD mit leerer rechter Seite.',
            'Gleiche linke Seiten zusammenfassen: A → B und A → D → A → BD.',
          ],
        },
        { art: 'code', titel: 'Ergebnis Fc', text: 'A → BD\nB → C' },
      ],
    },
    {
      nr: 3,
      titel: 'Gruppenaufgabe 3 – Ist die kanonische Überdeckung eindeutig?',
      text: 'Ist die kanonische Überdeckung Fc einer FD-Menge F eindeutig? Begründen Sie.',
      loesung: [
        {
          art: 'text',
          text:
            'Nein, Fc ist NICHT eindeutig. Der Algorithmus legt nicht fest, in welcher Reihenfolge die FDs (insbesondere ' +
            'bei der Rechtsreduktion) bearbeitet werden – je nach Reihenfolge können unterschiedliche, aber äquivalente ' +
            'Überdeckungen entstehen.',
        },
        {
          art: 'code',
          titel: 'Beispiel: F = { A → BC, B → AC }',
          text:
            'Erste FD zuerst rechtsreduziert →  Fc = { A → B,  B → AC }\n' +
            'Zweite FD zuerst rechtsreduziert →  Fc = { A → BC, B → A }',
        },
        { art: 'text', text: 'Beide Ergebnisse sind gültige kanonische Überdeckungen – also ist Fc nicht eindeutig.' },
      ],
    },
    {
      nr: 4,
      titel: 'Hausaufgabe 1 – Hülle, Schlüssel, Fc & 3NF-Synthese',
      text:
        'R = {A,B,C,D,E,F} mit A→BC, C→DA, E→ABC, F→CD, CD→BEF. Berechnen Sie A⁺, alle Kandidatenschlüssel, die ' +
        'kanonische Überdeckung und überführen Sie mit dem Synthesealgorithmus in 3NF.',
      loesung: [
        {
          art: 'tabelle',
          titel: 'Attributhülle von A',
          columns: ['Schritt', 'Betrachtete FD', 'Ergebnis'],
          rows: [
            ['init', '', '{A}'],
            ['1', 'A → BC', '{A, B, C}'],
            ['2', 'C → DA', '{A, B, C, D}'],
            ['3', 'CD → BEF', '{A, B, C, D, E, F}'],
          ],
        },
        {
          art: 'unterpunkt',
          label: 'Kandidatenschlüssel',
          text: 'A⁺ = alle → {A} ist Kandidatenschlüssel. Aus {C} und {E} lässt sich A direkt folgern (C→DA, E→ABC), aus {F} über F→CD→C ebenfalls. Da alle einelementig (= minimal) sind, sind {A}, {C}, {E}, {F} Kandidatenschlüssel. {B} und {D} sind nicht einmal Superschlüssel; {CD} wäre Superschlüssel, aber nicht minimal.',
        },
        {
          art: 'unterpunkt',
          label: 'Kanonische Überdeckung',
          text: 'Links- dann Rechtsreduktion:',
          punkte: [
            'Linksreduktion: nur CD → BEF hat mehrere linke Attribute. C ist NICHT überflüssig (D⁺ = {D}), D aber schon (C⁺ = {A,B,C,D,E,F} ⊇ {B,E,F}) → CD → BEF reduziert zu C → BEF.',
            'Rechtsreduktion: A → BC → A → C (B über A→C→…→B); C → DA → C → ∅ (D und A jeweils ableitbar); E → ABC → E → A (B,C über A ableitbar); F → CD bleibt; C → BEF bleibt.',
            'FDs mit leerer rechter Seite entfernen: C → ∅ fällt weg.',
            'Keine gleichen linken Seiten zum Zusammenfassen.',
          ],
        },
        { art: 'code', titel: 'Ergebnis Fc', text: 'A → C\nE → A\nF → CD\nC → BEF' },
        {
          art: 'unterpunkt',
          label: '3NF – Synthese',
          text: 'Für jede FD aus Fc ein Schema (Schlüssel unterstrichen). R₁ enthält die Kandidatenschlüssel A und C, daher ist kein Zusatzschema nötig; kein Schema ist in einem anderen enthalten.',
        },
        {
          art: 'code',
          text: 'R₁ = { «A», C }      (aus A → C)\nR₂ = { «E», A }      (aus E → A)\nR₃ = { «F», C, D }   (aus F → CD)\nR₄ = { «C», B, E, F } (aus C → BEF)',
        },
      ],
    },
    {
      nr: 5,
      titel: 'Hausaufgabe 2 – Synthese: AssisBossDiplomanden → 3NF',
      text:
        'Schema {PersNr, Name, Fachgebiet, BossPersNr, BossName, MatrNr, SName, Semester, SWohnOrt} mit:\n' +
        '(1) PersNr → Name, Fachgebiet, BossPersNr, BossName\n' +
        '(2) BossPersNr → BossName\n' +
        '(3) MatrNr → PersNr, Name, Fachgebiet, BossPersNr, BossName, SName, Semester, SWohnOrt.\n\n' +
        'Bestimmen Sie Kandidatenschlüssel, kanonische Überdeckung und das 3NF-Schema (Synthesealgorithmus).',
      loesung: [
        {
          art: 'unterpunkt',
          label: '1) Kandidatenschlüssel',
          text: 'Schlüsselattribute können nur die auf einer linken Seite vorkommenden Attribute sein: {PersNr, BossPersNr, MatrNr}. Wegen (3) gilt MatrNr → PersNr, BossPersNr → … also bestimmt MatrNr alles. {MatrNr} ist damit der einzige Kandidatenschlüssel.',
        },
        {
          art: 'unterpunkt',
          label: '2) Kanonische Überdeckung',
          text: 'Linksreduktion: bereits linksreduziert (alle FDs mit einem Attribut links). Rechtsreduktion:',
          punkte: [
            '(1) PersNr → Name, Fachgebiet, BossPersNr (BossName entfällt – über (2) BossPersNr → BossName ableitbar).',
            '(2) BossPersNr → BossName (bleibt).',
            '(3) MatrNr → SName, Semester, SWohnOrt, PersNr (alle übrigen Attribute folgen transitiv über das reduzierte (1) und (2)).',
            'Keine leeren rechten Seiten, keine gleichen linken Seiten.',
          ],
        },
        {
          art: 'code',
          titel: 'Ergebnis Fc',
          text:
            '(4) PersNr     → Name, Fachgebiet, BossPersNr\n' +
            '(5) BossPersNr → BossName\n' +
            '(6) MatrNr     → SName, Semester, SWohnOrt, PersNr',
        },
        {
          art: 'unterpunkt',
          label: '3) + 4) Relationales 3NF-Schema',
          text: 'Je FD ein Schema; MatrNr (Kandidatenschlüssel) steckt bereits in „Studenten", daher kein Zusatzschema; kein Schema ist in einem anderen enthalten.',
        },
        {
          art: 'code',
          text:
            'Assistenten = { «PersNr», Name, Fachgebiet, BossPersNr }   (aus 4)\n' +
            'Boss        = { «BossPersNr», BossName }                    (aus 5)\n' +
            'Studenten   = { «MatrNr», SName, Semester, SWohnOrt, PersNr } (aus 6)',
        },
      ],
    },
  ],
}
