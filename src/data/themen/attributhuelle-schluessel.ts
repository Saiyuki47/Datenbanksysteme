import type { Thema } from '../themen'

export const thema: Thema = {
  id: 'attributhuelle-schluessel',
  nr: 0,
  title: 'Attributhülle & Schlüsselbestimmung',
  subtitle:
    'Das Rechenwerkzeug hinter der Normalisierung: Aus einer Menge funktionaler Abhängigkeiten ' +
    'die Attributhülle {X}⁺ berechnen und damit Super-, Kandidatenschlüssel und die kanonische ' +
    'Überdeckung bestimmen.',
  sections: [
    {
      heading: 'Worum geht es?',
      blocks: [
        {
          art: 'text',
          text:
            'Gegeben ist ein Relationenschema R und eine Menge F funktionaler Abhängigkeiten (FDs) der ' +
            'Form X → Y („X bestimmt Y"). Daraus lassen sich weitere FDs ableiten – oft sehr viele. Die ' +
            'zentrale Frage lautet: Welche Attribute werden von einer Attributmenge X bereits festgelegt? ' +
            'Die Antwort ist die Attributhülle {X}⁺ (englisch closure).',
        },
        {
          art: 'text',
          text:
            'Mit der Attributhülle kann man alles Weitere ausrechnen, ohne mühsam FDs einzeln herzuleiten: ' +
            'ob eine FD X → Y gilt (nämlich genau dann, wenn Y ⊆ {X}⁺), welche Attributmengen Schlüssel sind ' +
            '(wenn {X}⁺ alle Attribute umfasst), und welche „Basis" (kanonische Überdeckung) die FD-Menge hat. ' +
            'Damit ist {X}⁺ das Werkzeug für die BCNF- und 3NF-Zerlegung.',
        },
        {
          art: 'merksatz',
          text:
            '{X}⁺ = die Menge ALLER Attribute, die von X funktional bestimmt werden. Kurz: „Was folgt aus X?" ' +
            'Eine FD X → Y gilt genau dann, wenn Y ⊆ {X}⁺.',
        },
      ],
    },
    {
      heading: 'Die Attributhülle {X}⁺ berechnen (Closure-Algorithmus)',
      blocks: [
        {
          art: 'text',
          text:
            'Die Hülle wird schrittweise aufgebaut: Man startet mit X selbst und fügt so lange rechte Seiten ' +
            'von FDs hinzu, wie deren linke Seite bereits vollständig enthalten ist – bis sich nichts mehr ändert ' +
            '(Fixpunkt).',
        },
        {
          art: 'algebra',
          titel: 'Closure-Algorithmus',
          text:
            'Eingabe: Attributmenge X, FD-Menge F\n' +
            'X⁺ := X\n' +
            'WIEDERHOLE bis sich X⁺ nicht mehr ändert:\n' +
            '   für jede FD  {B₁,…,Bₙ} → C  aus F:\n' +
            '      falls {B₁,…,Bₙ} ⊆ X⁺  →  füge C zu X⁺ hinzu\n' +
            'Ausgabe: X⁺',
        },
        {
          art: 'svg',
          titel: 'Fixpunkt-Iteration',
          svg: `<svg viewBox="0 0 560 150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Fixpunkt-Iteration der Attributhülle">
  <rect class="dgm-shape" x="20" y="55" width="90" height="40" rx="5"/>
  <text class="dgm-text" x="65" y="80" text-anchor="middle">X⁺ := X</text>
  <line class="dgm-line" x1="110" y1="75" x2="175" y2="75"/>
  <rect class="dgm-shape" x="175" y="45" width="200" height="60" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="275" y="70" text-anchor="middle">linke Seite ⊆ X⁺ ?</text>
  <text class="dgm-text dgm-text--sm" x="275" y="90" text-anchor="middle">dann rechte Seite dazu</text>
  <line class="dgm-line" x1="375" y1="75" x2="440" y2="75"/>
  <rect class="dgm-shape" x="440" y="55" width="100" height="40" rx="5"/>
  <text class="dgm-text" x="490" y="80" text-anchor="middle">fertig: X⁺</text>
  <line class="dgm-line" x1="275" y1="105" x2="275" y2="128"/>
  <line class="dgm-line" x1="275" y1="128" x2="65" y2="128"/>
  <line class="dgm-line" x1="65" y1="128" x2="65" y2="95"/>
  <text class="dgm-text--sm" x="170" y="122" text-anchor="middle">Änderung? wiederholen</text>
</svg>`,
        },
        {
          art: 'text',
          text:
            'Beispiel (aus der Vorlesung): R(A, B, C, D, E, F) mit den FDs {A,B} → C, {A,D} → E, {B} → D, ' +
            '{A,F} → B. Gesucht sind {A,B}⁺ und {A,F}⁺. In der Klausur werden die einzelnen Schritte samt der ' +
            'jeweils genutzten FD angegeben.',
        },
        {
          art: 'tabelle',
          titel: 'Berechnung von {A,B}⁺ Schritt für Schritt',
          columns: ['Schritt', 'Genutzte FD', 'X⁺ danach'],
          rows: [
            ['Start', '—', '{A, B}'],
            ['1', '{A,B} → C', '{A, B, C}'],
            ['2', '{B} → D', '{A, B, C, D}'],
            ['3', '{A,D} → E', '{A, B, C, D, E}'],
            ['Fixpunkt', 'keine FD mehr anwendbar', '{A, B, C, D, E}'],
          ],
        },
        {
          art: 'text',
          text:
            '{A,B}⁺ = {A, B, C, D, E}. F fehlt – {A,B} ist also KEIN Schlüssel. Nimmt man F hinzu, kommt man ' +
            'weiter, weil nun {A,F} → B greift:',
        },
        {
          art: 'tabelle',
          titel: 'Berechnung von {A,F}⁺ Schritt für Schritt',
          columns: ['Schritt', 'Genutzte FD', 'X⁺ danach'],
          rows: [
            ['Start', '—', '{A, F}'],
            ['1', '{A,F} → B', '{A, B, F}'],
            ['2', '{A,B} → C', '{A, B, C, F}'],
            ['3', '{B} → D', '{A, B, C, D, F}'],
            ['4', '{A,D} → E', '{A, B, C, D, E, F}'],
            ['Fixpunkt', 'alle Attribute erreicht', '{A, B, C, D, E, F}'],
          ],
        },
        {
          art: 'merksatz',
          text:
            '{A,F}⁺ = alle Attribute von R – also ist {A, F} ein Superschlüssel. Die Reihenfolge, in der man ' +
            'die FDs anwendet, ist egal; das Endergebnis (der Fixpunkt) ist immer dasselbe.',
        },
      ],
    },
    {
      heading: 'Ableitungsregeln: Armstrong-Axiome',
      blocks: [
        {
          art: 'text',
          text:
            'Der Closure-Algorithmus funktioniert, weil sich aus F mit wenigen Grundregeln alle gültigen FDs ' +
            'ableiten lassen – den Armstrong-Axiomen. Sie sind vollständig (mehr FDs gibt es nicht) und korrekt ' +
            '(sie erzeugen nur wahre FDs).',
        },
        {
          art: 'tabelle',
          titel: 'Die drei Armstrong-Axiome',
          columns: ['Regel', 'Bedeutung', 'Formal'],
          rows: [
            ['Reflexivität', 'Eine Menge bestimmt jede ihrer Teilmengen (triviale FDs).', 'Y ⊆ X  ⟹  X → Y'],
            ['Augmentation (Verstärkung)', 'Beide Seiten dürfen um dieselben Attribute erweitert werden.', 'X → Y  ⟹  X Z → Y Z'],
            ['Transitivität', 'FDs lassen sich verketten.', 'X → Y und Y → Z  ⟹  X → Z'],
          ],
        },
        {
          art: 'text',
          text:
            'Aus diesen drei Grundregeln folgen zwei bequeme abgeleitete Regeln, die man beim Rechnen ständig ' +
            'braucht (in der Vorlesung „Split/Combine"):',
        },
        {
          art: 'tabelle',
          titel: 'Abgeleitete Regeln (Split / Combine)',
          columns: ['Regel', 'Bedeutung', 'Formal'],
          rows: [
            ['Vereinigung (Combine)', 'Gleiche linke Seite: rechte Seiten zusammenfassen.', 'X → Y und X → Z  ⟹  X → Y Z'],
            ['Dekomposition (Split)', 'Rechte Seite in einzelne Attribute zerlegen.', 'X → Y Z  ⟹  X → Y und X → Z'],
          ],
        },
        {
          art: 'text',
          text:
            'Beispiel für eine Herleitung (Products: {Name} → {Color}, {Category} → {Dept}, {Color,Category} → ' +
            '{Price}). Frage: Gilt {Name, Category} → {Price}? Man rechnet einfach die Hülle: {Name, Category}⁺ = ' +
            '{Name, Category, Color, Dept, Price}. Weil Price darin enthalten ist, gilt die FD.',
        },
        {
          art: 'algebra',
          titel: 'Dieselbe Herleitung „von Hand" über die Regeln',
          text:
            '{Name, Category} → Name          (Reflexivität)\n' +
            '{Name, Category} → Color         (Name → Color, Augmentation + Transitivität)\n' +
            '{Name, Category} → Category      (Reflexivität)\n' +
            '{Name, Category} → {Color, Category}   (Vereinigung)\n' +
            '{Name, Category} → Price         (mit {Color,Category} → Price, Transitivität)',
        },
      ],
    },
    {
      heading: 'Superschlüssel und Kandidatenschlüssel',
      blocks: [
        {
          art: 'liste',
          punkte: [
            'Superschlüssel: eine Attributmenge X mit {X}⁺ = alle Attribute von R. X bestimmt also die ganze Zeile.',
            'Kandidatenschlüssel (Schlüssel): ein MINIMALER Superschlüssel – man kann kein Attribut mehr weglassen, ohne die Superschlüssel-Eigenschaft zu verlieren.',
            'Primärschlüssel: der eine Kandidatenschlüssel, den man als Hauptschlüssel auswählt (es kann mehrere Kandidaten geben).',
          ],
        },
        {
          art: 'algebra',
          titel: 'Schlüssel-Bestimmungsalgorithmus',
          text:
            'Für jede Attributmenge X:\n' +
            '   berechne {X}⁺\n' +
            '   falls {X}⁺ = alle Attribute  →  X ist Superschlüssel\n' +
            '   falls X zusätzlich minimal   →  X ist Kandidatenschlüssel',
        },
        {
          art: 'text',
          text:
            'Beispiel: Product(Name, Price, Category, Color) mit {Name, Category} → Price und {Category} → Color. ' +
            'Was ist der Schlüssel? Man testet {Name, Category}:',
        },
        {
          art: 'tabelle',
          titel: 'Schlüsselsuche in Product',
          columns: ['X', '{X}⁺', 'Superschlüssel?'],
          rows: [
            ['{Name, Category}', '{Name, Category, Price, Color} = alle', 'ja'],
            ['{Name}', '{Name}', 'nein'],
            ['{Category}', '{Category, Color}', 'nein'],
          ],
        },
        {
          art: 'text',
          text:
            '{Name, Category} bestimmt alle Attribute, ist also Superschlüssel. Er ist auch Kandidatenschlüssel, ' +
            'denn weder Name noch Category allein ist ein Superschlüssel – man kann kein Attribut weglassen.',
        },
        {
          art: 'text',
          text:
            'Es kann mehrere Kandidatenschlüssel geben. Klassisches Kemper-Beispiel: die Relation ' +
            'Städte(Name, BLand, Vorwahl, EW). Hier sind sowohl {Name, BLand} als auch {Name, Vorwahl} ' +
            'Kandidatenschlüssel – man spricht dann von mehreren Candidate Keys, von denen einer als ' +
            'Primärschlüssel gewählt wird.',
        },
        {
          art: 'merksatz',
          text:
            'Superschlüssel = „bestimmt alles". Kandidatenschlüssel = „bestimmt alles UND minimal". Die ' +
            'Schlüsseleigenschaft prüft man immer über die Attributhülle: {X}⁺ = alle Attribute?',
        },
      ],
    },
    {
      heading: 'Kanonische (minimale) Überdeckung',
      blocks: [
        {
          art: 'text',
          text:
            'Eine FD-Menge kann redundant sein. Die kanonische Überdeckung Fc ist eine vereinfachte FD-Menge ' +
            'mit DERSELBEN Hülle wie F (dieselben {X}⁺ für alle X), aber ohne überflüssige Attribute und FDs. ' +
            'Sie ist die „Basis" der Abhängigkeiten und der Ausgangspunkt für die Zerlegung. Achtung: Sie ist ' +
            'nicht eindeutig – es kann mehrere gültige kanonische Überdeckungen geben.',
        },
        {
          art: 'text',
          text: 'Man bringt F in drei Schritten auf die kanonische Form:',
        },
        {
          art: 'liste',
          punkte: [
            'Rechte Seiten vereinzeln: Jede FD auf X → (ein Attribut) zerlegen (Dekomposition), damit man einzeln reduzieren kann.',
            'Linksreduktion: Aus der linken Seite jedes Attribut streichen, das überflüssig ist – überflüssig heißt: die rechte Seite liegt schon in der Hülle der verkleinerten linken Seite.',
            'Überflüssige FDs weglassen: Eine FD X → A entfernen, wenn A auch ohne sie in {X}⁺ liegt (Rechtsreduktion / Redundanz). Danach FDs mit gleicher linker Seite wieder zusammenfassen (Vereinigung).',
          ],
        },
        {
          art: 'text',
          text:
            'Durchgerechnetes Beispiel (Kemper, Beispiel 1). Gegeben F über R(A, B, C, D, E, F):',
        },
        {
          art: 'algebra',
          titel: 'Ausgangsmenge F',
          text:
            'A  → B C\n' +
            'C  → D A\n' +
            'E  → A B C\n' +
            'F  → C D\n' +
            'C D → B E F',
        },
        {
          art: 'text',
          text:
            'Linksreduktion bei C D → B E F: Ist C oder D überflüssig? Wegen C → D A gilt {C}⁺ ⊇ {C, D}, also ' +
            'erreicht man B E F schon aus C allein. D ist überflüssig – die FD wird zu C → B E F. (Anschaulich: ' +
            'C D → D ist trivial und mit C → D folgt aus C bereits alles, was C D bestimmt.)',
        },
        {
          art: 'text',
          text:
            'Rechtsreduktion: In A → B C ist B überflüssig, denn A → C → … → B ist schon ableitbar; es bleibt ' +
            'A → C. Ebenso reduziert sich C → D A zu C → D (A ist über C → … → A schon erreichbar). Danach ' +
            'entfernt man die nun redundanten FDs und fasst zusammen.',
        },
        {
          art: 'algebra',
          titel: 'Kanonische Überdeckung Fc (Ergebnis)',
          text:
            'A → C\n' +
            'E → A\n' +
            'F → C D\n' +
            'C → B E F',
        },
        {
          art: 'text',
          text:
            'Kontrolle: Fc erzeugt für jede Attributkombination dieselbe Hülle wie F. Zum Beispiel bleibt ' +
            '{C}⁺ = {A, B, C, D, E, F} in beiden Mengen gleich. Aus dieser knappen Basis liest man auch die ' +
            'Schlüssel sofort ab: {A}⁺ = {C}⁺ = {E}⁺ = {F}⁺ = alle Attribute – jedes dieser vier Attribute ist ' +
            'für sich allein ein Kandidatenschlüssel.',
        },
        {
          art: 'merksatz',
          text:
            'Rezept: (1) rechte Seiten einzeln, (2) linke Seiten minimieren, (3) überflüssige FDs streichen. ' +
            'Jeder Schritt wird über die Attributhülle geprüft – ändert sich keine Hülle, war die Vereinfachung ' +
            'erlaubt.',
        },
      ],
    },
  ],
}
