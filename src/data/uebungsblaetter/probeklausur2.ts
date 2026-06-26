import type { Uebungsblatt } from '../../types'

export const probeklausur2: Uebungsblatt = {
  id: 'probeklausur2',
  nr: 'P2',
  titel: 'Probeklausur 2',
  typ: 'Probeklausur',
  beschreibung:
    'Klausur „Grundlagen von Datenbanksystemen" (Bachelor AI, HS Fulda, WS 2018/2019, ' +
    '20. Februar 2019). Umgesetzt sind die Aufgaben 1–6: ER-Modell (Aufgabe 1 – Begriffe, ' +
    'Aufgabe 2 – Überführung ins relationale Schema und Verfeinerung, Aufgabe 3 – (min,max)-Notation), ' +
    'SQL-Anfragen (Aufgabe 4), Integritätsbedingungen (Aufgabe 5), relationale Algebra (Aufgabe 6) und ' +
    'Normalisierung/BCNF (Aufgabe 7). Die ER-Diagramme und Operatorbäume sind als gezeichnete Diagramme ' +
    'dargestellt; die Lösungen lassen sich pro Teilaufgabe einblenden.',
  anmerkung: {
    titel: 'Rahmen der Klausur',
    punkte: [
      'Bearbeitungszeit 60 Minuten, 60 Punkte = 100 %. Punkteverteilung: Aufgabe 1 = 5, ' +
        'Aufgabe 2 = 5, Aufgabe 3 = 6, Aufgabe 4 = 22, Aufgabe 5 = 12, Aufgabe 6 = 7, ' +
        'Aufgabe 7 = 10 (Σ = 60); zusätzlich maximal 8 Bonuspunkte.',
      'Alle 7 Aufgaben sind umgesetzt. Einzige Ausnahme: Bei Aufgabe 4 sind die Quelltabellen und die ' +
        'offiziellen Ergebnisse abgedruckt, die literalen SELECT-Texte lagen jedoch nicht vor.',
      'Keine Hilfsmittel erlaubt; Mobiltelefone wegpacken. Unleserliches zählt als nicht vorhanden.',
    ],
  },
  tasks: [
    // ---- Aufgabe 1 (Begriffe des ER-Modells – Teil 1) ----
    {
      nr: 0,
      titel: 'Aufgabe 1 (Begriffe des ER-Modells – Teil 1) (5 Punkte)',
      text:
        'Das folgende ER-Diagramm stellt einen kleinen Ausschnitt der aus der Vorlesung bekannten ' +
        'Universitätsdatenbank dar (die Elemente sind mit A–F beschriftet). Benennen Sie die einzelnen ' +
        'Elemente gemäß den Fragen.\n\n' +
        'Hintergrund: Ein Student kann mehrere Vorlesungen besuchen, und eine Vorlesung kann von ' +
        'mehreren Studenten besucht werden. (Je 1 Punkt)',
      svg: `<svg viewBox="0 0 720 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ER-Diagramm: Student besucht Vorlesung (n:m)">
  <line class="dgm-line" x1="95" y1="66" x2="178" y2="145"/>
  <line class="dgm-line" x1="200" y1="66" x2="200" y2="145"/>
  <line class="dgm-line" x1="312" y1="66" x2="232" y2="145"/>
  <line class="dgm-line" x1="430" y1="66" x2="492" y2="145"/>
  <line class="dgm-line" x1="535" y1="66" x2="530" y2="145"/>
  <line class="dgm-line" x1="645" y1="66" x2="568" y2="145"/>
  <line class="dgm-line" x1="260" y1="171" x2="305" y2="171"/>
  <line class="dgm-line" x1="415" y1="171" x2="470" y2="171"/>
  <ellipse class="dgm-shape" cx="95" cy="48" rx="50" ry="20"/>
  <text class="dgm-key" x="95" y="53" text-anchor="middle">MatrNr</text>
  <ellipse class="dgm-shape" cx="200" cy="48" rx="42" ry="20"/>
  <text class="dgm-text" x="200" y="53" text-anchor="middle">Name</text>
  <ellipse class="dgm-shape" cx="312" cy="48" rx="56" ry="20"/>
  <text class="dgm-text" x="312" y="53" text-anchor="middle">Geburtstag</text>
  <ellipse class="dgm-shape" cx="430" cy="48" rx="40" ry="20"/>
  <text class="dgm-text" x="430" y="53" text-anchor="middle">Nr</text>
  <ellipse class="dgm-shape" cx="535" cy="48" rx="42" ry="20"/>
  <text class="dgm-text" x="535" y="53" text-anchor="middle">Titel</text>
  <ellipse class="dgm-shape" cx="645" cy="48" rx="48" ry="20"/>
  <text class="dgm-text" x="645" y="53" text-anchor="middle">Credits</text>
  <rect class="dgm-shape" x="140" y="145" width="120" height="52" rx="3"/>
  <text class="dgm-text" x="200" y="177" text-anchor="middle">Student</text>
  <rect class="dgm-shape" x="470" y="145" width="120" height="52" rx="3"/>
  <text class="dgm-text" x="530" y="177" text-anchor="middle">Vorlesung</text>
  <polygon class="dgm-shape" points="305,171 360,141 415,171 360,201"/>
  <text class="dgm-text dgm-text--sm" x="360" y="175" text-anchor="middle">besucht</text>
  <text class="dgm-card" x="282" y="162" text-anchor="middle">N</text>
  <text class="dgm-card" x="440" y="162" text-anchor="middle">M</text>
  <text class="dgm-lbl" x="282" y="191" text-anchor="middle">E</text>
  <text class="dgm-lbl" x="440" y="191" text-anchor="middle">F</text>
  <text class="dgm-lbl" x="200" y="229" text-anchor="middle">A</text>
  <text class="dgm-lbl" x="360" y="229" text-anchor="middle">B</text>
  <text class="dgm-lbl" x="95" y="16" text-anchor="middle">C</text>
  <text class="dgm-lbl" x="200" y="16" text-anchor="middle">D</text>
</svg>`,
    },
    {
      nr: 1,
      titel: '1a) Das Objekt A beschreibt …',
      text: 'Wie heißt das Element A (der Kasten „Student")?',
      loesung: [
        {
          art: 'unterpunkt',
          label: 'Entitätstyp (Entity-Typ)',
          text:
            'Ein Kasten/Rechteck steht im ER-Modell immer für einen Entitätstyp – also eine Art bzw. ' +
            'Klasse von Objekten der Miniwelt (hier: „die Studenten" allgemein).',
        },
        {
          art: 'text',
          text:
            'Abgrenzung: Der Typ ist die Schablone (Student mit MatrNr, Name, Geburtstag); eine einzelne ' +
            'konkrete Ausprägung – ein bestimmter Student wie „Max Mustermann, MatrNr 12345" – heißt Entität. ' +
            'Gefragt ist hier der Typ.',
        },
      ],
    },
    {
      nr: 2,
      titel: '1b) Das Objekt B beschreibt …',
      text: 'Wie heißt das Element B (die Raute „besucht")?',
      loesung: [
        {
          art: 'unterpunkt',
          label: 'Eine Beziehung / Relation (Beziehungstyp)',
          text:
            'Rauten modellieren im ER-Modell Beziehungen zwischen Entitätstypen. „besucht" verknüpft die ' +
            'Entitätstypen Student und Vorlesung und hält fest, welcher Student welche Vorlesung besucht.',
        },
      ],
    },
    {
      nr: 3,
      titel: '1c) Das Objekt C bezeichnet man als …',
      text: 'Wie nennt man das Element C (das unterstrichene Attribut „MatrNr")?',
      loesung: [
        {
          art: 'unterpunkt',
          label: 'Schlüsselattribut',
          text:
            'Ein unterstrichenes Attribut ist ein Schlüsselattribut: Es identifiziert eine Entität eindeutig. ' +
            'Genau das gilt für die Matrikelnummer – sie gehört zu genau einem Studenten.',
        },
        {
          art: 'text',
          text:
            'Erkennungsmerkmal in der Klausur: Schlüsselattribute werden im ER-Diagramm unterstrichen. ' +
            'Deshalb ist gerade MatrNr (und nicht z. B. Name) als Schlüssel markiert.',
        },
      ],
    },
    {
      nr: 4,
      titel: '1d) Das Objekt D bezeichnet man als …',
      text: 'Wie nennt man das Element D (das Attribut „Name")?',
      loesung: [
        {
          art: 'unterpunkt',
          label: '(Normales) Attribut',
          text:
            'Ovale sind Attribute. Da „Name" nicht unterstrichen ist, handelt es sich um ein gewöhnliches ' +
            '(Nicht-Schlüssel-)Attribut: Es beschreibt die Entität, identifiziert sie aber nicht eindeutig ' +
            '(mehrere Studenten können denselben Namen haben).',
        },
      ],
    },
    {
      nr: 5,
      titel: '1e) E und F beschreiben eine Funktionalität. Es handelt sich um …',
      text:
        'Welche Funktionalität (Kardinalität) beschreiben die Kanten E (Student–besucht) und ' +
        'F (besucht–Vorlesung)?',
      loesung: [
        {
          art: 'unterpunkt',
          label: 'n : m (many-to-many)',
          text:
            'Die Kanten geben an, wie viele Entitäten der einen Seite mit der anderen Seite in Beziehung stehen.',
        },
        {
          art: 'liste',
          punkte: [
            'Ein Student kann mehrere Vorlesungen besuchen → auf der Vorlesungs-Seite „viele" (m).',
            'Eine Vorlesung wird von mehreren Studenten besucht → auf der Studenten-Seite „viele" (n).',
            'Beide Seiten „viele" ⇒ die Beziehung „besucht" ist n : m.',
          ],
        },
        {
          art: 'text',
          text:
            'Merkhilfe: Steht der Satz „mehrere … können mehrere …" für beide Richtungen, ist es immer n : m. ' +
            'Wäre eine Seite auf „genau eines" beschränkt, hätte man 1 : n bzw. 1 : 1.',
        },
      ],
    },

    // ---- Aufgabe 2 (Überführung in ein relationales Schema) ----
    {
      nr: 10,
      titel: 'Aufgabe 2 (Begriffe des ER-Modells – Teil 2) (5 Punkte)',
      text:
        'Überführen Sie das unten dargestellte Diagramm zuerst in ein relationales Schema und verfeinern Sie ' +
        'dieses anschließend.\n\n' +
        'Schreibweise: „A: {[a]}" steht für die Relation A mit dem Attribut a; unterstrichene Attribute ' +
        'bilden den Primärschlüssel.',
      svg: `<svg viewBox="0 0 560 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ER-Diagramm: A 1:N R B">
  <line class="dgm-line" x1="180" y1="95" x2="228" y2="95"/>
  <line class="dgm-line" x1="332" y1="95" x2="380" y2="95"/>
  <line class="dgm-line" x1="125" y1="165" x2="125" y2="120"/>
  <line class="dgm-line" x1="280" y1="165" x2="280" y2="122"/>
  <line class="dgm-line" x1="435" y1="165" x2="435" y2="120"/>
  <rect class="dgm-shape" x="70" y="70" width="110" height="50" rx="3"/>
  <text class="dgm-text" x="125" y="100" text-anchor="middle">A</text>
  <rect class="dgm-shape" x="380" y="70" width="110" height="50" rx="3"/>
  <text class="dgm-text" x="435" y="100" text-anchor="middle">B</text>
  <polygon class="dgm-shape" points="228,95 280,68 332,95 280,122"/>
  <text class="dgm-text" x="280" y="100" text-anchor="middle">R</text>
  <ellipse class="dgm-shape" cx="125" cy="185" rx="40" ry="20"/>
  <text class="dgm-key" x="125" y="190" text-anchor="middle">a</text>
  <ellipse class="dgm-shape" cx="280" cy="185" rx="40" ry="20"/>
  <text class="dgm-text" x="280" y="190" text-anchor="middle">r</text>
  <ellipse class="dgm-shape" cx="435" cy="185" rx="40" ry="20"/>
  <text class="dgm-key" x="435" y="190" text-anchor="middle">b</text>
  <text class="dgm-card" x="204" y="86" text-anchor="middle">1</text>
  <text class="dgm-card" x="356" y="86" text-anchor="middle">N</text>
</svg>`,
    },
    {
      nr: 11,
      titel: '2a) Relationales Schema (3 Punkte)',
      text: 'Geben Sie das relationale Schema (Standardüberführung, noch ohne Verfeinerung) an.',
      loesung: [
        {
          art: 'text',
          text:
            'Standardregel der Überführung: Jeder Entitätstyp wird zu einer eigenen Relation. Jede Beziehung ' +
            'wird – zunächst – ebenfalls zu einer eigenen Relation, die die Schlüssel aller beteiligten ' +
            'Entitätstypen als Fremdschlüssel sowie ihre eigenen Beziehungsattribute aufnimmt.',
        },
        {
          art: 'unterpunkt',
          label: 'Lösung',
          text: 'Drei Relationen – eine je Entitätstyp und eine für die Beziehung:',
          punkte: [
            'A: {[a]}  – Schlüssel a',
            'B: {[b]}  – Schlüssel b',
            'R: {[a, b, r]}  – a und b zusammen sind der Schlüssel; r ist das Beziehungsattribut',
          ],
        },
        {
          art: 'text',
          text:
            'Die Beziehungsrelation R bekommt die Schlüssel beider Seiten (a und b) als Fremdschlüssel; ' +
            'gemeinsam bilden sie ihren Primärschlüssel. Das an der Raute hängende Attribut r wandert in R.',
        },
      ],
    },
    {
      nr: 12,
      titel: '2b) Verfeinertes relationales Schema (2 Punkte)',
      text: 'Verfeinern Sie das Schema, indem Sie die 1 : N-Beziehung geeignet einbetten.',
      loesung: [
        {
          art: 'text',
          text:
            'Bei einer 1 : N-Beziehung ist eine eigene Relation für die Beziehung überflüssig. Man verschmilzt R ' +
            'in die Relation auf der N-Seite (hier B). B erhält dafür den Schlüssel der 1-Seite (a) als ' +
            'Fremdschlüssel und zusätzlich das Beziehungsattribut r.',
        },
        {
          art: 'unterpunkt',
          label: 'Lösung',
          text: 'Nur noch zwei Relationen, R ist in B aufgegangen:',
          punkte: [
            'A: {[a]}',
            'B: {[a, b, r]}  – Primärschlüssel bleibt b; a ist (nur) Fremdschlüssel zu A',
          ],
        },
        {
          art: 'text',
          text:
            'Warum die N-Seite? Bei 1 : N gehört zu jedem B genau ein A, also lässt sich a als einzelner Wert ' +
            'direkt in jeder B-Zeile speichern – keine Mehrfachzuordnung nötig. Würde man R umgekehrt in A ' +
            'einbauen, müsste A mehrere b-Werte aufnehmen; ein einzelnes Attribut kann das im relationalen ' +
            'Modell aber nicht. Der Schlüssel von B bleibt b, denn b identifiziert eine B-Entität weiterhin eindeutig.',
        },
      ],
    },

    // ---- Aufgabe 3 (min,max)-Notation ----
    {
      nr: 20,
      titel: 'Aufgabe 3 (Begriffe des ER-Modells – Teil 3) (6 Punkte)',
      text:
        'Auf den Aufgabenblättern finden sich 5 Relationen: KNEIPE, BIER, BRAUEREI, BRAUT und VERKAUFT. ' +
        'Das ER-Diagramm entspricht im Prinzip diesen 5 Relationen – allerdings wurden bei der Umsetzung ' +
        'Fehler gemacht, vor allem in der (min,max)-Notation. Die in den Relationen gespeicherten Werte sind ' +
        'ein korrektes Abbild der Miniwelt; beantworten Sie die Fragen auf Basis dieser gespeicherten Werte. ' +
        '(Je 1 Punkt)\n\n' +
        'So liest man (min,max): Die Angabe [min,max] an der Seite eines Entitätstyps bedeutet, dass jede ' +
        'einzelne Entität dieses Typs an mindestens min und höchstens max Beziehungen teilnimmt. Beispiel: ' +
        'VERKAUFT [0,2] an der KNEIPE-Seite heißt „jede Kneipe verkauft zwischen 0 und 2 Biere".\n\n' +
        'Hinweis: Die vollständigen Tabellen VERKAUFT und BRAUT standen auf den Aufgabenblättern. Die für die ' +
        'Lösung entscheidenden Fakten sind jeweils in der Erklärung genannt; siehe auch die „Anmerkungen zur ' +
        'Lösung" am Ende dieser Aufgabe.',
      svg: `<svg viewBox="0 0 760 430" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ER-Diagramm: Kneipe, Bier, Brauerei mit Beziehungen Verkauft, Bestseller, Braut">
  <line class="dgm-line" x1="78" y1="68" x2="112" y2="120"/>
  <line class="dgm-line" x1="186" y1="68" x2="158" y2="120"/>
  <line class="dgm-line" x1="566" y1="68" x2="592" y2="120"/>
  <line class="dgm-line" x1="678" y1="68" x2="650" y2="120"/>
  <line class="dgm-line" x1="300" y1="382" x2="340" y2="352"/>
  <line class="dgm-line" x1="420" y1="382" x2="380" y2="352"/>
  <line class="dgm-line" x1="192" y1="146" x2="305" y2="146"/>
  <line class="dgm-line" x1="360" y1="176" x2="360" y2="300"/>
  <line class="dgm-line" x1="132" y1="172" x2="132" y2="296"/>
  <line class="dgm-line" x1="192" y1="326" x2="300" y2="326"/>
  <line class="dgm-line" x1="621" y1="172" x2="621" y2="296"/>
  <line class="dgm-line" x1="566" y1="326" x2="420" y2="326"/>
  <ellipse class="dgm-shape" cx="78" cy="50" rx="38" ry="20"/>
  <text class="dgm-text dgm-text--sm" x="78" y="55" text-anchor="middle">ORT</text>
  <ellipse class="dgm-shape" cx="186" cy="50" rx="44" ry="20"/>
  <text class="dgm-key" x="186" y="55" text-anchor="middle">NAME</text>
  <ellipse class="dgm-shape" cx="566" cy="50" rx="44" ry="20"/>
  <text class="dgm-text dgm-text--sm" x="566" y="55" text-anchor="middle">NAME</text>
  <ellipse class="dgm-shape" cx="678" cy="50" rx="38" ry="20"/>
  <text class="dgm-key" x="678" y="55" text-anchor="middle">HRG</text>
  <ellipse class="dgm-shape" cx="300" cy="400" rx="50" ry="20"/>
  <text class="dgm-text dgm-text--sm" x="300" y="405" text-anchor="middle">ALKOHOL</text>
  <ellipse class="dgm-shape" cx="420" cy="400" rx="44" ry="20"/>
  <text class="dgm-key" x="420" y="405" text-anchor="middle">SORTE</text>
  <rect class="dgm-shape" x="72" y="120" width="120" height="52" rx="3"/>
  <text class="dgm-text" x="132" y="151" text-anchor="middle">KNEIPE</text>
  <rect class="dgm-shape" x="556" y="120" width="130" height="52" rx="3"/>
  <text class="dgm-text" x="621" y="151" text-anchor="middle">BRAUEREI</text>
  <rect class="dgm-shape" x="300" y="300" width="120" height="52" rx="3"/>
  <text class="dgm-text" x="360" y="331" text-anchor="middle">BIER</text>
  <polygon class="dgm-shape" points="305,146 360,116 415,146 360,176"/>
  <text class="dgm-text dgm-text--sm" x="360" y="150" text-anchor="middle">VERKAUFT</text>
  <polygon class="dgm-shape" points="68,326 132,294 196,326 132,358"/>
  <text class="dgm-text dgm-text--sm" x="132" y="330" text-anchor="middle">BESTSELLER</text>
  <polygon class="dgm-shape" points="566,326 621,296 676,326 621,356"/>
  <text class="dgm-text dgm-text--sm" x="621" y="330" text-anchor="middle">BRAUT</text>
  <text class="dgm-card" x="248" y="138" text-anchor="middle">[0,2]</text>
  <text class="dgm-card" x="384" y="240" text-anchor="middle">[1,n]</text>
  <text class="dgm-card" x="106" y="238" text-anchor="middle">[1,1]</text>
  <text class="dgm-card" x="246" y="318" text-anchor="middle">[0,n]</text>
  <text class="dgm-card" x="647" y="238" text-anchor="middle">[2,4]</text>
  <text class="dgm-card" x="493" y="318" text-anchor="middle">[1,2]</text>
</svg>`,
      tabellen: [
        {
          titel: 'Ausprägungen KNEIPE (Schlüssel NAME)',
          columns: ['NAME'],
          rows: [['PietsPub'], ['OskarsOase'], ['SamsSpelunke']],
        },
        {
          titel: 'Ausprägungen BIER (Schlüssel SORTE)',
          columns: ['SORTE'],
          rows: [
            ['Klecksport'],
            ['Klecksex'],
            ['Meerdinger'],
            ['Klecksdry'],
            ['Montcroix'],
            ['Warstone'],
          ],
        },
        {
          titel: 'Ausprägungen BRAUEREI (Schlüssel NAME)',
          columns: ['NAME'],
          rows: [['Klecks'], ['Rotstift']],
        },
      ],
    },
    {
      nr: 21,
      titel: '3a) Ist der Beziehungstyp [0,n] korrekt?',
      text: 'Beziehung BESTSELLER, BIER-Seite: [0,n].',
      loesung: [
        {
          art: 'unterpunkt',
          label: 'Korrekt',
          text:
            'Eine [0,n]-Angabe ist immer trivial erfüllt: min = 0 verlangt nichts (eine Entität darf an ' +
            'gar keiner Beziehung teilnehmen), und max = n bedeutet „beliebig viele", also keine Obergrenze.',
        },
        {
          art: 'text',
          text:
            'Da [0,n] niemals durch konkrete Werte widerlegt werden kann, ist die Angabe hier nicht zu beanstanden.',
        },
      ],
    },
    {
      nr: 22,
      titel: '3b) Ist der Beziehungstyp [1,1] korrekt?',
      text: 'Beziehung BESTSELLER, KNEIPE-Seite: [1,1].',
      loesung: [
        {
          art: 'unterpunkt',
          label: 'Nicht korrekt – richtig wäre [0,1]',
          text:
            '[1,1] würde verlangen, dass JEDE Kneipe genau einen Bestseller hat. PietsPub kommt in der ' +
            'Relation BESTSELLER aber überhaupt nicht vor – sie hat also keinen Bestseller (0).',
        },
        {
          art: 'tabelle',
          titel: 'BESTSELLER (gespeicherte Werte)',
          columns: ['Kneipe', 'Bestseller (Sorte)'],
          rows: [
            ['OskarsOase', 'Klecksex'],
            ['SamsSpelunke', 'Montcroix'],
          ],
        },
        {
          art: 'text',
          text:
            'Da PietsPub fehlt, muss die Untergrenze 0 statt 1 sein. Höchstens ein Bestseller je Kneipe bleibt ' +
            '(max = 1). Korrekt ist daher [0,1]. (Genau diese „0" taucht auch in der Verfeinerung wieder auf: ' +
            'KNEIPE muss ein verfeinerter Entitätstyp mit der zusätzlichen Beziehung BESTSELLER sein.)',
        },
      ],
    },
    {
      nr: 23,
      titel: '3c) Ist der Beziehungstyp [0,2] korrekt?',
      text: 'Beziehung VERKAUFT, KNEIPE-Seite: [0,2].',
      loesung: [
        {
          art: 'unterpunkt',
          label: 'Nicht korrekt – richtig wäre [0,3]',
          text:
            'Die Untergrenze 0 stimmt: PietsPub kommt in VERKAUFT nicht vor, verkauft also 0 Biere. Die ' +
            'Obergrenze 2 ist aber zu klein.',
        },
        {
          art: 'liste',
          punkte: [
            'PietsPub: verkauft 0 Biere (kommt in VERKAUFT nicht vor) → erfordert min = 0.',
            'OskarsOase und SamsSpelunke: verkaufen jeweils 3 Biere → erfordern max = 3.',
          ],
        },
        {
          art: 'text',
          text:
            'Da die maximale Anzahl verkaufter Biere je Kneipe 3 beträgt, muss [0,3] stehen, nicht [0,2].',
        },
      ],
    },
    {
      nr: 24,
      titel: '3d) Ist der Beziehungstyp [1,n] korrekt?',
      text: 'Beziehung VERKAUFT, BIER-Seite: [1,n].',
      loesung: [
        {
          art: 'unterpunkt',
          label: 'Nicht korrekt – richtig wäre [0,2] (bzw. allgemein [0,n])',
          text:
            'Diese Angabe zählt, in wie vielen Kneipen ein Bier verkauft wird. [1,n] würde fordern, dass JEDES ' +
            'Bier in mindestens einer Kneipe verkauft wird.',
        },
        {
          art: 'liste',
          punkte: [
            'Gegenbeispiel: Meerdinger wird in keiner der drei Kneipen verkauft → min muss 0 sein, nicht 1.',
            'Tatsächlich wird ein Bier in höchstens 2 Kneipen verkauft → konkrete Obergrenze 2.',
          ],
        },
        {
          art: 'text',
          text:
            'Korrekt ist daher [0,2]. Wer die genaue Obergrenze nicht einschränken will, kann allgemeiner [0,n] ' +
            'angeben – entscheidend für die Korrektur ist die Untergrenze 0.',
        },
      ],
    },
    {
      nr: 25,
      titel: '3e) Ist der Beziehungstyp [1,2] korrekt?',
      text: 'Beziehung BRAUT, BIER-Seite: [1,2].',
      loesung: [
        {
          art: 'unterpunkt',
          label: 'Nicht korrekt – richtig wäre [0,2] (bzw. [0,n])',
          text:
            'Diese Angabe zählt, von wie vielen Brauereien ein Bier gebraut wird. [1,2] würde fordern, dass ' +
            'jedes Bier von mindestens einer Brauerei gebraut wird.',
        },
        {
          art: 'liste',
          punkte: [
            'Gegenbeispiel: Die Biere Meerdinger und Klecksdry werden in keiner Brauerei gebraut → min muss 0 sein.',
          ],
        },
        {
          art: 'text',
          text:
            'Damit ist [1,2] falsch; korrekt ist [0,2] (oder allgemein [0,n]). Wieder ist die fehlerhafte ' +
            'Untergrenze 1 das Problem.',
        },
      ],
    },
    {
      nr: 26,
      titel: '3f) Ist der Beziehungstyp [2,4] korrekt?',
      text: 'Beziehung BRAUT, BRAUEREI-Seite: [2,4].',
      loesung: [
        {
          art: 'unterpunkt',
          label: 'Korrekt',
          text:
            'Diese Angabe zählt, wie viele Biere eine Brauerei braut. Die gespeicherten Werte passen genau:',
        },
        {
          art: 'liste',
          punkte: [
            'Jede Brauerei braut mindestens 2 Biere (Beispiel Klecks braut genau 2) → min = 2 stimmt.',
            'Jede Brauerei braut höchstens 4 Biere (Beispiel Rotstift braut 4) → max = 4 stimmt.',
          ],
        },
        {
          art: 'text',
          text: 'Da 2 ≤ Anzahl gebrauter Biere ≤ 4 für alle Brauereien gilt, ist [2,4] korrekt.',
        },
      ],
    },
    {
      nr: 27,
      titel: 'Anmerkungen zur Lösung (Aufgabe 3)',
      text:
        'Die folgenden Vorüberlegungen helfen, die Teilaufgaben a)–f) systematisch zu beantworten. ' +
        'Überlegen Sie diese Punkte zuerst und gehen Sie dann zurück zu den eigentlichen Fragen.',
      loesung: [
        {
          art: 'unterpunkt',
          label: 'Es gibt drei Entitätstypen',
          text: 'Kneipe, Bier und Brauerei.',
        },
        {
          art: 'unterpunkt',
          label: 'Die Schlüssel',
          text:
            'Name (für Kneipe), Sorte (für Bier) und Name (für Brauerei). In der Aufgabenstellung ist „Name" ' +
            'für Bier zwar etwas ungenau – Name wäre dort ein anderer Schlüsselkandidat; im Weiteren wird für Bier Sorte verwendet.',
        },
        {
          art: 'unterpunkt',
          label: 'Die Ausprägungen (mögliche Attributwerte)',
          text: 'Genau diese Werte muss man für die (min,max)-Beziehungen überprüfen:',
          punkte: [
            'Kneipe: PietsPub, OskarsOase, SamsSpelunke',
            'Bier: Klecksport, Klecksex, Meerdinger, Klecksdry, Montcroix, Warstone',
            'Brauerei: Klecks, Rotstift',
          ],
        },
        {
          art: 'unterpunkt',
          label: 'Kneipe muss eine Verfeinerung sein',
          text:
            'Der Entitätstyp Kneipe muss ursprünglich aus einem Entitätstyp Kneipe (mit den Attributen Name, ' +
            'Ort) und einer Relation BESTSELLER (mit Name und dem Bestseller-Bier) entstanden sein. Die Relation ' +
            'BESTSELLER kann nur diese Ausprägungen gehabt haben:',
        },
        {
          art: 'tabelle',
          titel: 'BESTSELLER (Sorte)',
          columns: ['Kneipe', 'Bestseller (Sorte)'],
          rows: [
            ['OskarsOase', 'Klecksex'],
            ['SamsSpelunke', 'Montcroix'],
          ],
        },
        {
          art: 'text',
          text:
            'Es ist also sofort klar, dass PietsPub in der Relation BESTSELLER nicht vorkommt – in der ' +
            '(min,max)-Notation muss daher eine 0 für die Untergrenze stehen. Genau das ist der Kern der Teilaufgabe b).',
        },
      ],
    },

    // ---- Aufgabe 4 (SQL-Select-Anweisung) ----
    {
      nr: 30,
      titel: 'Aufgabe 4 (SQL-Select-Anweisung) (22 Punkte)',
      text:
        'Tragen Sie die Ergebnisse der folgenden SQL-Anfragen (4a–4k) auf den unten stehenden Tabellen T1 und T2 ein. ' +
        'Klappen Sie zu jeder Teilaufgabe die Lösung mit der ausführlichen Herleitung auf.',
      tabellen: [
        {
          titel: 'T1 (A int, B varchar(7), C int, D varchar(3))',
          columns: ['A', 'B', 'C', 'D'],
          rows: [
            ['1', 'blau', '10', 'X'],
            ['2', 'blau', '40', 'X'],
            ['3', 'rosa', '30', 'S'],
            ['4', 'orange', '10', 'M'],
            ['5', 'orange', '20', 'M'],
            ['6', 'orange', '50', 'X'],
            ['7', 'orange', '50', 'X'],
            ['8', 'magenta', '50', 'S'],
            ['9', 'magenta', '40', 'S'],
            ['10', 'violett', '10', 'XXL'],
            ['11', 'violett', '20', 'XXL'],
            ['12', 'violett', '10', 'M'],
          ],
        },
        {
          titel: 'T2 (E int, B varchar(7), C int)',
          columns: ['E', 'B', 'C'],
          rows: [
            ['2', 'blau', '20'],
            ['4', 'blau', '40'],
            ['4', 'blau', '50'],
            ['6', 'orange', '20'],
            ['6', 'orange', '50'],
            ['8', 'orange', '50'],
          ],
        },
      ],
    },
    {
      nr: 31,
      titel: '4a) WHERE mit AND/OR (Vorrang!) (2 Punkte)',
      text: 'Gib A aller Zeilen aus.',
      sqlQuery: "SELECT A\nFROM T1\nWHERE A > 6 AND D = 'S' OR C = 30",
      loesung: [
        {
          art: 'text',
          text:
            'Achtung Operatorvorrang: AND bindet stärker als OR. Die Bedingung ist also (A > 6 AND D = ’S’) OR (C = 30).',
        },
        {
          art: 'liste',
          punkte: [
            'A > 6 AND D = ’S’: A > 6 sind die Zeilen 7–12; davon D = ’S’ nur Zeile 8 (magenta) und 9 (magenta) → A = 8, 9.',
            'C = 30: nur Zeile 3 (rosa, 30, S) → A = 3.',
            'Vereinigung beider Teile: { 3, 8, 9 }.',
          ],
        },
        { art: 'tabelle', titel: 'Ergebnis', columns: ['A'], rows: [['3'], ['8'], ['9']] },
      ],
    },
    {
      nr: 32,
      titel: '4b) DISTINCT mit Klammerung (2 Punkte)',
      text: 'Gib die verschiedenen B-Werte aus.',
      sqlQuery: "SELECT DISTINCT B\nFROM T1\nWHERE A > 3 AND (D = 'M' OR D = 'S')",
      loesung: [
        {
          art: 'text',
          text:
            'Die Klammer erzwingt: A > 3 UND (D ist ’M’ oder ’S’). Zuerst die Zeilen filtern, dann B per DISTINCT entdoppeln.',
        },
        {
          art: 'liste',
          punkte: [
            'A > 3 und D ∈ {M, S}: Zeile 4 (orange, M), 5 (orange, M), 8 (magenta, S), 9 (magenta, S), 12 (violett, M).',
            'B-Werte dieser Zeilen: orange, orange, magenta, magenta, violett.',
            'DISTINCT entfernt Duplikate → { orange, magenta, violett }.',
          ],
        },
        { art: 'tabelle', titel: 'Ergebnis', columns: ['B'], rows: [['violett'], ['magenta'], ['orange']] },
      ],
    },
    {
      nr: 33,
      titel: '4c) Kreuzprodukt mit Join-Bedingung (2 Punkte)',
      text: 'Gib alle Paare (A, E) aus.',
      sqlQuery: 'SELECT A, E\nFROM T1, T2\nWHERE 2 * A = E',
      loesung: [
        {
          art: 'text',
          text:
            'T1, T2 ist das Kreuzprodukt; behalten werden die Paare mit 2·A = E. Die E-Werte in T2 sind 2, 4, 4, 6, 6, 8. ' +
            'Für jeden E-Wert suchen wir das passende A = E/2 in T1.',
        },
        {
          art: 'liste',
          punkte: [
            'E = 2 → A = 1: einmal in T2 → (1, 2).',
            'E = 4 → A = 2: zweimal in T2 (E=4 kommt doppelt vor) → (2, 4), (2, 4).',
            'E = 6 → A = 3: zweimal in T2 → (3, 6), (3, 6).',
            'E = 8 → A = 4: einmal in T2 → (4, 8).',
          ],
        },
        {
          art: 'tabelle',
          titel: 'Ergebnis (6 Zeilen)',
          columns: ['A', 'E'],
          rows: [['1', '2'], ['2', '4'], ['2', '4'], ['3', '6'], ['3', '6'], ['4', '8']],
        },
      ],
    },
    {
      nr: 34,
      titel: '4d) Kreuzprodukt zählen (1 Punkt)',
      text: 'Wie viele Zeilen liefert das Kreuzprodukt?',
      sqlQuery: 'SELECT COUNT(*)\nFROM T1, T2',
      loesung: [
        {
          art: 'text',
          text:
            'Ohne WHERE entsteht das volle Kreuzprodukt: jede T1-Zeile wird mit jeder T2-Zeile kombiniert. ' +
            'T1 hat 12 Zeilen, T2 hat 6 Zeilen → 12 · 6 = 72.',
        },
        { art: 'tabelle', titel: 'Ergebnis', columns: ['COUNT(*)'], rows: [['72']] },
      ],
    },
    {
      nr: 35,
      titel: '4e) GROUP BY mit COUNT(*) (1 Punkt)',
      text: 'Zähle die Zeilen je Farbe B.',
      sqlQuery: 'SELECT B, COUNT(*)\nFROM T1\nGROUP BY B',
      loesung: [
        {
          art: 'text',
          text: 'Eine Gruppe je B-Wert, COUNT(*) zählt die Zeilen je Gruppe:',
        },
        {
          art: 'liste',
          punkte: [
            'blau: Zeilen 1, 2 → 2',
            'rosa: Zeile 3 → 1',
            'orange: Zeilen 4, 5, 6, 7 → 4',
            'magenta: Zeilen 8, 9 → 2',
            'violett: Zeilen 10, 11, 12 → 3',
          ],
        },
        {
          art: 'tabelle',
          titel: 'Ergebnis (Reihenfolge beliebig; Summe = 12)',
          columns: ['B', 'COUNT(*)'],
          rows: [['violett', '3'], ['rosa', '1'], ['blau', '2'], ['magenta', '2'], ['orange', '4']],
        },
      ],
    },
    {
      nr: 36,
      titel: '4f) WHERE vor GROUP BY (3 Punkte)',
      text: 'Zähle je D-Wert nur die Zeilen mit C > 30.',
      sqlQuery: 'SELECT D, COUNT(*)\nFROM T1\nWHERE C > 30\nGROUP BY D',
      loesung: [
        {
          art: 'text',
          text: 'WHERE filtert VOR der Gruppierung. C > 30 lässt nur diese Zeilen übrig:',
        },
        {
          art: 'liste',
          punkte: [
            'Zeile 2 (B=blau, C=40, D=X)',
            'Zeile 6 (C=50, D=X), Zeile 7 (C=50, D=X)',
            'Zeile 8 (C=50, D=S), Zeile 9 (C=40, D=S)',
            '(Zeile 3 hat C=30 – NICHT > 30 – und fällt weg.)',
          ],
        },
        {
          art: 'text',
          text: 'Danach GROUP BY D: X = 3 Zeilen (2, 6, 7), S = 2 Zeilen (8, 9).',
        },
        { art: 'tabelle', titel: 'Ergebnis', columns: ['D', 'COUNT(*)'], rows: [['X', '3'], ['S', '2']] },
      ],
    },
    {
      nr: 37,
      titel: '4g) WHERE, GROUP BY, HAVING, MAX (3 Punkte)',
      text: 'Gib je B den größten C-Wert aus – nur für Zeilen mit D ∈ {S, M} und nur Gruppen mit ≥ 2 Zeilen.',
      sqlQuery: "SELECT B, MAX(C)\nFROM T1\nWHERE D IN ('S', 'M')\nGROUP BY B\nHAVING COUNT(*) >= 2",
      loesung: [
        {
          art: 'text',
          text: 'Reihenfolge: erst WHERE (Zeilen filtern), dann GROUP BY, dann HAVING (Gruppen filtern), MAX je Gruppe.',
        },
        {
          art: 'liste',
          punkte: [
            'WHERE D ∈ {S, M}: Zeilen 3 (rosa, S), 4 (orange, M), 5 (orange, M), 8 (magenta, S), 9 (magenta, S), 12 (violett, M).',
            'Gruppen: rosa {3} (1), orange {4,5} (2), magenta {8,9} (2), violett {12} (1).',
            'HAVING COUNT(*) >= 2 behält nur orange und magenta.',
            'MAX(C): orange → max(10, 20) = 20; magenta → max(50, 40) = 50.',
          ],
        },
        {
          art: 'tabelle',
          titel: 'Ergebnis',
          columns: ['B', 'MAX(C)'],
          rows: [['magenta', '50'], ['orange', '20']],
        },
      ],
    },
    {
      nr: 38,
      titel: '4h) Self-Join über zwei Tabellen zählen (2 Punkte)',
      text: 'Zähle die Paare mit T1.A = T2.E.',
      sqlQuery: 'SELECT COUNT(*)\nFROM T1, T2\nWHERE T1.A = T2.E',
      loesung: [
        {
          art: 'text',
          text:
            'Für jede T2-Zeile (E-Wert) zählt, wie viele T1-Zeilen denselben A-Wert haben. Da A in T1 eindeutig ist, ' +
            'trägt jede T2-Zeile höchstens 1 Treffer bei.',
        },
        {
          art: 'liste',
          punkte: [
            'E = 2 → A = 2 existiert (1×) → 1',
            'E = 4 (2 T2-Zeilen) → A = 4 existiert → 2',
            'E = 6 (2 T2-Zeilen) → A = 6 existiert → 2',
            'E = 8 → A = 8 existiert → 1',
            'Summe: 1 + 2 + 2 + 1 = 6.',
          ],
        },
        { art: 'tabelle', titel: 'Ergebnis', columns: ['COUNT(*)'], rows: [['6']] },
      ],
    },
    {
      nr: 39,
      titel: '4i) Join über zwei Bedingungen (3 Punkte)',
      text: 'Gib A und T1.B für alle Paare mit T1.B = T2.B UND T1.A = T2.E aus.',
      sqlQuery: 'SELECT A, T1.B\nFROM T1, T2\nWHERE T1.B = T2.B AND T1.A = T2.E',
      loesung: [
        {
          art: 'text',
          text: 'Am schnellsten je T2-Zeile prüfen, ob es in T1 eine Zeile mit passendem A (= E) UND gleicher Farbe B gibt:',
        },
        {
          art: 'tabelle',
          titel: 'Prüfung je T2-Zeile (E, B)',
          columns: ['T2 (E, B)', 'T1-Zeile mit A = E', 'B gleich?', 'Treffer'],
          rows: [
            ['(2, blau)', 'A=2 → blau', 'ja', '(2, blau)'],
            ['(4, blau)', 'A=4 → orange', 'nein', '–'],
            ['(4, blau)', 'A=4 → orange', 'nein', '–'],
            ['(6, orange)', 'A=6 → orange', 'ja', '(6, orange)'],
            ['(6, orange)', 'A=6 → orange', 'ja', '(6, orange)'],
            ['(8, orange)', 'A=8 → magenta', 'nein', '–'],
          ],
        },
        {
          art: 'tabelle',
          titel: 'Ergebnis',
          columns: ['A', 'T1.B'],
          rows: [['2', 'blau'], ['6', 'orange'], ['6', 'orange']],
        },
      ],
    },
    {
      nr: 310,
      titel: '4j) Unterabfrage mit IN (2 Punkte)',
      text: 'Gib die verschiedenen B-Werte aus, deren C in der Unterabfrage vorkommt.',
      sqlQuery: 'SELECT DISTINCT B\nFROM T1\nWHERE C IN (\n  SELECT C FROM T2 WHERE E > 4\n)',
      loesung: [
        {
          art: 'text',
          text: 'Schritt 1 – Unterabfrage: SELECT C FROM T2 WHERE E > 4. T2-Zeilen mit E > 4 sind die drei orange-Zeilen (E = 6, 6, 8) mit C = 20, 50, 50 → Menge { 20, 50 }.',
        },
        {
          art: 'text',
          text: 'Schritt 2 – äußere Abfrage: T1-Zeilen mit C ∈ { 20, 50 }: Zeile 5 (orange, 20), 11 (violett, 20), 6 (orange, 50), 7 (orange, 50), 8 (magenta, 50). DISTINCT B → { orange, violett, magenta }.',
        },
        { art: 'tabelle', titel: 'Ergebnis', columns: ['B'], rows: [['violett'], ['magenta'], ['orange']] },
      ],
    },
    {
      nr: 311,
      titel: '4k) Die NULL-Falle: <> NULL (1 Punkt)',
      text: 'Zähle die Zeilen mit B <> NULL.',
      sqlQuery: 'SELECT COUNT(*)\nFROM T1\nWHERE B <> NULL',
      loesung: [
        {
          art: 'unterpunkt',
          label: 'Ergebnis: 0',
          text:
            'Klassische Falle: Jeder Vergleich mit NULL über „<>" (oder „=") ergibt UNKNOWN – nie TRUE. Die WHERE-Klausel ' +
            'selektiert aber nur bei TRUE, daher wird KEINE Zeile ausgewählt, obwohl alle B-Werte tatsächlich gefüllt sind.',
        },
        {
          art: 'text',
          text: 'Korrekt müsste es „WHERE B IS NOT NULL" heißen – das hätte 12 ergeben. So aber ist das Ergebnis 0.',
        },
        { art: 'tabelle', titel: 'Ergebnis', columns: ['COUNT(*)'], rows: [['0']] },
      ],
    },

    // ---- Aufgabe 5 (Integritätsbedingungen) ----
    {
      nr: 40,
      titel: 'Aufgabe 5 (Integritätsbedingungen) (12 Punkte)',
      text:
        'Gegeben sind die Tabellen S und R mit den Integritätsbedingungen CS1–CS11 (siehe Skript unten) sowie ' +
        'der unten abgedruckte Datenbestand. Für 12 INSERT-Anweisungen ist anzugeben, ob sie gegen genau eine ' +
        'Integritätsbedingung verstoßen (welche?) oder ob sie zulässig sind (OK). Jede Anweisung wird für sich ' +
        'auf dem ursprünglichen Datenbestand geprüft.\n\n' +
        'WICHTIGE ANMERKUNG (aus der Aufgabenstellung): Ein CHECK-Constraint gilt als ERFÜLLT, wenn der ' +
        'Ausdruck sich zu TRUE ODER zu UNKNOWN berechnet! Das ist nicht intuitiv – die WHERE-Klausel selektiert ' +
        'z. B. nur bei TRUE. Ein CHECK schlägt also nur bei FALSE fehl; ein NULL-bedingtes UNKNOWN verletzt ihn nicht.',
      sqlQuery: `CREATE TABLE S ( A INT, D INT, E INT,
  CONSTRAINT CS1 PRIMARY KEY (A),
  CONSTRAINT CS2 UNIQUE (E),
  CONSTRAINT CS3 CHECK ((D+E) <= 10 OR (A+D) = 2*E),
  CONSTRAINT CS4 CHECK (D = NULL),
  CONSTRAINT CS5 FOREIGN KEY (E) REFERENCES S(A),
  CONSTRAINT CS6 CHECK (2*E >= 2*D) );

CREATE TABLE R ( A INT, B INT, C INT, F INT, G INT,
  CONSTRAINT CS7  PRIMARY KEY (A, B),
  CONSTRAINT CS8  CHECK ((B < G) OR (A = 2) AND (A = C)),
  CONSTRAINT CS9  CHECK ((A != C) OR (A = 1)),
  CONSTRAINT CS10 FOREIGN KEY (B) REFERENCES S(A),
  CONSTRAINT CS11 FOREIGN KEY (C, F) REFERENCES R(A, B) );`,
      tabellen: [
        {
          titel: 'S (Datenbestand) – A ist Schlüssel',
          columns: ['A', 'D', 'E'],
          rows: [
            ['1', '3', null],
            ['3', '1', '1'],
            ['4', '3', '3'],
            ['2', '4', '4'],
            ['8', '8', '8'],
            ['9', '9', '9'],
          ],
        },
        {
          titel: 'R (Datenbestand) – (A, B) ist Schlüssel',
          columns: ['A', 'B', 'C', 'F', 'G'],
          rows: [
            ['2', '1', null, null, '5'],
            ['3', '4', '2', '1', null],
            ['2', '2', '3', '4', '4'],
            ['4', '1', null, null, '4'],
            ['1', '3', '3', '4', null],
          ],
        },
      ],
    },
    {
      nr: 41,
      titel: 'Vorüberlegungen & die wichtigsten Stolperfallen',
      text: 'Bevor man die 12 Anweisungen prüft, lohnt sich ein Blick auf drei Eigenheiten dieser Aufgabe.',
      loesung: [
        {
          art: 'unterpunkt',
          label: 'CHECK ist bei TRUE oder UNKNOWN erfüllt',
          text:
            'Ein CHECK schlägt nur fehl, wenn er zu FALSE auswertet. Steckt ein NULL-Wert in der Bedingung und ' +
            'macht sie zu UNKNOWN, gilt sie als erfüllt. Das ist der zentrale Trick der Aufgabe.',
        },
        {
          art: 'unterpunkt',
          label: 'CS4 = CHECK (D = NULL) ist nie verletzbar',
          text:
            'Der Vergleich „D = NULL" ergibt für jeden D-Wert UNKNOWN (man prüft NULL niemals mit „=", sondern ' +
            'mit IS NULL). Da UNKNOWN als erfüllt gilt, kann CS4 von keiner Anweisung verletzt werden – CS4 ' +
            'taucht in der Lösung deshalb nie auf.',
        },
        {
          art: 'unterpunkt',
          label: 'Primärschlüssel sind NOT NULL und eindeutig',
          text:
            'CS1 (S: PK A) und CS7 (R: PK (A,B)) verlangen eindeutige und nicht-leere Schlüsselwerte. Ein NULL ' +
            'im Schlüssel oder ein bereits vorhandener Schlüsselwert verletzt den PK.',
        },
        {
          art: 'unterpunkt',
          label: 'Self-referencing Fremdschlüssel',
          text:
            'CS5 (S.E → S.A) und CS11 (R.(C,F) → R.(A,B)) verweisen auf dieselbe Tabelle. Vorhandene Werte: ' +
            'S.A = {1, 2, 3, 4, 8, 9}; R.(A,B) = {(2,1), (3,4), (2,2), (4,1), (1,3)}. Ein FK-Wert muss dort ' +
            'vorkommen (oder NULL sein).',
        },
        {
          art: 'unterpunkt',
          label: 'Vorsicht bei CS8: AND bindet stärker als OR',
          text:
            'CS8 = (B < G) OR (A = 2) AND (A = C) liest sich als (B < G) OR ((A = 2) AND (A = C)).',
        },
      ],
    },
    {
      nr: 42,
      titel: '5a) INSERT INTO S VALUES (5, 4, 4)',
      text: 'A = 5, D = 4, E = 4. Verstoß?',
      sqlQuery: 'INSERT INTO S VALUES (5, 4, 4)',
      loesung: [
        {
          art: 'unterpunkt',
          label: 'CS2 verletzt (UNIQUE E)',
          text: 'E = 4 existiert bereits (Zeile A = 2 hat E = 4). Die Eindeutigkeit von E ist verletzt.',
          punkte: [
            'CS1 (PK A = 5): neu ✓',
            'CS3: (D+E) = 8 ≤ 10 → TRUE, also erfüllt ✓',
            'CS6: 2·E = 8 ≥ 2·D = 8 → TRUE ✓ – es scheitert allein an CS2',
          ],
        },
      ],
    },
    {
      nr: 43,
      titel: '5b) INSERT INTO S VALUES (7, NULL, 5)',
      text: 'A = 7, D = NULL, E = 5. Verstoß?',
      sqlQuery: 'INSERT INTO S VALUES (7, NULL, 5)',
      loesung: [
        {
          art: 'unterpunkt',
          label: 'CS5 verletzt (FOREIGN KEY E → S(A))',
          text: 'E = 5 müsste als A-Wert in S vorkommen. S.A = {1, 2, 3, 4, 8, 9} enthält 5 nicht → FK verletzt.',
          punkte: [
            'CS1 (PK A = 7): neu ✓',
            'CS2 (E = 5): noch nicht vergeben ✓',
            'CS3 / CS6: enthalten D = NULL → UNKNOWN → gelten als erfüllt ✓',
          ],
        },
      ],
    },
    {
      nr: 44,
      titel: '5c) INSERT INTO S VALUES (5, 2, NULL)',
      text: 'A = 5, D = 2, E = NULL. Verstoß?',
      sqlQuery: 'INSERT INTO S VALUES (5, 2, NULL)',
      loesung: [
        {
          art: 'unterpunkt',
          label: 'keine Verletzung (OK)',
          text: 'Alle Bedingungen sind erfüllt – maßgeblich ist das NULL in E:',
          punkte: [
            'CS1 (PK A = 5): neu ✓',
            'CS2 (UNIQUE E): E = NULL – NULL-Werte verletzen UNIQUE nicht ✓',
            'CS5 (FK E): E = NULL – ein NULL-Fremdschlüssel ist zulässig ✓',
            'CS3 / CS6: enthalten E = NULL → UNKNOWN → erfüllt ✓',
          ],
        },
      ],
    },
    {
      nr: 45,
      titel: '5d) INSERT INTO S VALUES (NULL, 2, 2)',
      text: 'A = NULL, D = 2, E = 2. Verstoß?',
      sqlQuery: 'INSERT INTO S VALUES (NULL, 2, 2)',
      loesung: [
        {
          art: 'unterpunkt',
          label: 'CS1 verletzt (PRIMARY KEY A)',
          text: 'A ist Primärschlüssel und damit implizit NOT NULL. A = NULL ist nicht erlaubt → PK verletzt.',
        },
      ],
    },
    {
      nr: 46,
      titel: '5e) INSERT INTO S VALUES (12, 3, 2)',
      text: 'A = 12, D = 3, E = 2. Verstoß?',
      sqlQuery: 'INSERT INTO S VALUES (12, 3, 2)',
      loesung: [
        {
          art: 'unterpunkt',
          label: 'CS6 verletzt (CHECK 2·E ≥ 2·D)',
          text: '2·E = 4, 2·D = 6 → 4 ≥ 6 ist FALSE → CS6 verletzt.',
          punkte: [
            'CS1 (PK A = 12): neu ✓',
            'CS2 (E = 2): noch nicht vergeben ✓',
            'CS3: (D+E) = 5 ≤ 10 → TRUE ✓',
            'CS5 (FK E = 2): 2 ∈ S.A ✓ – es scheitert allein an CS6',
          ],
        },
      ],
    },
    {
      nr: 47,
      titel: '5f) INSERT INTO S VALUES (7, 6, 7)',
      text: 'A = 7, D = 6, E = 7. Verstoß?',
      sqlQuery: 'INSERT INTO S VALUES (7, 6, 7)',
      loesung: [
        {
          art: 'unterpunkt',
          label: 'CS3 verletzt (CHECK (D+E) ≤ 10 OR (A+D) = 2·E)',
          text:
            'Erster Teil: (D+E) = 13 ≤ 10 → FALSE. Zweiter Teil: (A+D) = 13, 2·E = 14 → 13 = 14 → FALSE. ' +
            'FALSE OR FALSE = FALSE → CS3 verletzt.',
          punkte: [
            'CS1 (PK A = 7): neu ✓',
            'CS2 (E = 7): noch nicht vergeben ✓',
            'CS6: 2·E = 14 ≥ 2·D = 12 → TRUE ✓',
          ],
        },
        {
          art: 'text',
          text:
            'Anmerkung: Streng genommen würde auch CS5 scheitern (E = 7 ist kein A-Wert in S). Da die ' +
            'Bedingungen in Definitionsreihenfolge geprüft werden, wird CS3 zuerst getroffen und als Antwort ' +
            'genannt – passend zur Vorgabe „maximal eine Bedingung".',
        },
      ],
    },
    {
      nr: 48,
      titel: '5g) INSERT INTO R VALUES (3, 8, 1, 3, 12)',
      text: 'A = 3, B = 8, C = 1, F = 3, G = 12. Verstoß?',
      sqlQuery: 'INSERT INTO R VALUES (3, 8, 1, 3, 12)',
      loesung: [
        {
          art: 'unterpunkt',
          label: 'keine Verletzung (OK)',
          text: 'Alle Bedingungen sind erfüllt:',
          punkte: [
            'CS7 (PK (A,B) = (3,8)): neu ✓',
            'CS8: (B < G) = (8 < 12) = TRUE ✓',
            'CS9: (A ≠ C) = (3 ≠ 1) = TRUE ✓',
            'CS10 (FK B = 8): 8 ∈ S.A ✓',
            'CS11 (FK (C,F) = (1,3)): (1,3) ∈ R.(A,B) ✓',
          ],
        },
      ],
    },
    {
      nr: 49,
      titel: '5h) INSERT INTO R VALUES (2, 4, 2, 2, NULL)',
      text: 'A = 2, B = 4, C = 2, F = 2, G = NULL. Verstoß?',
      sqlQuery: 'INSERT INTO R VALUES (2, 4, 2, 2, NULL)',
      loesung: [
        {
          art: 'unterpunkt',
          label: 'CS9 verletzt (CHECK (A ≠ C) OR (A = 1))',
          text: '(A ≠ C) = (2 ≠ 2) = FALSE; (A = 1) = (2 = 1) = FALSE. FALSE OR FALSE = FALSE → CS9 verletzt.',
          punkte: [
            'CS7 (PK (2,4)): neu ✓',
            'CS8: (B < G) = (4 < NULL) = UNKNOWN, ABER (A = 2) AND (A = C) = TRUE AND (2 = 2) = TRUE → ' +
              'UNKNOWN OR TRUE = TRUE ✓',
            'CS10 (FK B = 4): 4 ∈ S.A ✓',
          ],
        },
      ],
    },
    {
      nr: 50,
      titel: '5i) INSERT INTO R VALUES (3, 9, 1, 3, 4)',
      text: 'A = 3, B = 9, C = 1, F = 3, G = 4. Verstoß?',
      sqlQuery: 'INSERT INTO R VALUES (3, 9, 1, 3, 4)',
      loesung: [
        {
          art: 'unterpunkt',
          label: 'CS8 verletzt (CHECK (B < G) OR (A = 2) AND (A = C))',
          text:
            '(B < G) = (9 < 4) = FALSE; (A = 2) = (3 = 2) = FALSE → der AND-Teil ist FALSE. ' +
            'FALSE OR FALSE = FALSE → CS8 verletzt.',
          punkte: [
            'CS7 (PK (3,9)): neu ✓',
            'CS9: (A ≠ C) = (3 ≠ 1) = TRUE ✓',
            'CS10 (FK B = 9): 9 ∈ S.A ✓; CS11 (FK (C,F) = (1,3)): (1,3) ∈ R.(A,B) ✓',
          ],
        },
      ],
    },
    {
      nr: 51,
      titel: '5j) INSERT INTO R VALUES (NULL, NULL, 3, 4, 9)',
      text: 'A = NULL, B = NULL, C = 3, F = 4, G = 9. Verstoß?',
      sqlQuery: 'INSERT INTO R VALUES (NULL, NULL, 3, 4, 9)',
      loesung: [
        {
          art: 'unterpunkt',
          label: 'CS7 verletzt (PRIMARY KEY (A, B))',
          text: '(A, B) ist Primärschlüssel und damit NOT NULL. A = NULL und B = NULL sind nicht erlaubt → PK verletzt.',
        },
      ],
    },
    {
      nr: 52,
      titel: '5k) INSERT INTO R VALUES (7, 2, 3, 8, 9)',
      text: 'A = 7, B = 2, C = 3, F = 8, G = 9. Verstoß?',
      sqlQuery: 'INSERT INTO R VALUES (7, 2, 3, 8, 9)',
      loesung: [
        {
          art: 'unterpunkt',
          label: 'CS11 verletzt (FOREIGN KEY (C, F) → R(A, B))',
          text: '(C, F) = (3, 8) müsste als (A, B)-Paar in R vorkommen. R.(A,B) = {(2,1),(3,4),(2,2),(4,1),(1,3)} enthält (3,8) nicht → FK verletzt.',
          punkte: [
            'CS7 (PK (7,2)): neu ✓',
            'CS8: (B < G) = (2 < 9) = TRUE ✓',
            'CS9: (A ≠ C) = (7 ≠ 3) = TRUE ✓',
            'CS10 (FK B = 2): 2 ∈ S.A ✓',
          ],
        },
      ],
    },
    {
      nr: 53,
      titel: '5l) INSERT INTO R VALUES (4, 5, 2, 1, 7)',
      text: 'A = 4, B = 5, C = 2, F = 1, G = 7. Verstoß?',
      sqlQuery: 'INSERT INTO R VALUES (4, 5, 2, 1, 7)',
      loesung: [
        {
          art: 'unterpunkt',
          label: 'CS10 verletzt (FOREIGN KEY B → S(A))',
          text: 'B = 5 müsste als A-Wert in S vorkommen. S.A = {1, 2, 3, 4, 8, 9} enthält 5 nicht → FK verletzt.',
          punkte: [
            'CS7 (PK (4,5)): neu ✓',
            'CS8: (B < G) = (5 < 7) = TRUE ✓',
            'CS9: (A ≠ C) = (4 ≠ 2) = TRUE ✓',
            'CS11 (FK (C,F) = (2,1)): (2,1) ∈ R.(A,B) ✓',
          ],
        },
      ],
    },

    // ---- Aufgabe 6 (Relationale Algebra) ----
    {
      nr: 60,
      titel: 'Aufgabe 6 (Relationale Algebra) (7 Punkte)',
      text:
        'Formulieren Sie die folgende Anfrage:\n\n' +
        '„Finde Sokrates’ Dauerstudenten, also Studenten, die mindestens eine Vorlesung von Sokrates ' +
        'gehört haben und schon im 12. oder noch höheren Semester sind."\n\n' +
        '1. in relationaler Algebra (3 Punkte) und 2. als Operatorbaum (4 Punkte).\n\n' +
        'Zugrunde liegt die bekannte Universitätsdatenbank: Studenten (MatrNr, Name, Semester), ' +
        'hören (MatrNr, VorlNr), Vorlesungen (VorlNr, Titel, …, gelesenVon), Professoren (PersNr, Name, …). ' +
        'In Vorlesungen verweist gelesenVon auf Professoren.PersNr.',
    },
    {
      nr: 61,
      titel: '6.1) In relationaler Algebra (3 Punkte)',
      text: 'Geben Sie die Anfrage als Folge von Operationen der Relationenalgebra an.',
      loesung: [
        {
          art: 'text',
          text:
            'Strategie: von innen nach außen. Man arbeitet sich von „Sokrates" über seine Vorlesungen zu den ' +
            'Studenten vor, die diese hören, und filtert am Schluss nach dem Semester.',
        },
        {
          art: 'liste',
          punkte: [
            'Schritt 1 – Professor Sokrates auswählen: σ[Name = ’Sokrates’] (Professoren).',
            'Schritt 2 – seine Vorlesungen finden: Join von Vorlesungen mit (1) über Vorlesungen.gelesenVon = ' +
              'Professoren.PersNr; danach nur die VorlNr behalten: π[VorlNr](…).',
            'Schritt 3 – wer hört diese Vorlesungen: Join der Vorlesungs-Nummern mit hören (über VorlNr).',
            'Schritt 4 – Studierendendaten ergänzen: Join mit Studenten (über MatrNr).',
            'Schritt 5 – Dauerstudenten herausfiltern: σ[Semester ≥ 12](…).',
          ],
        },
        {
          art: 'code',
          titel: 'Lösung (Ausdruck)',
          text:
            'σ[Semester ≥ 12] (\n' +
            '    Studenten ⋈ (\n' +
            '        hören ⋈ π[VorlNr] (\n' +
            '            Vorlesungen ⋈[gelesenVon = PersNr] (\n' +
            '                σ[Name = ’Sokrates’] (Professoren)\n' +
            '            )\n' +
            '        )\n' +
            '    )\n' +
            ')',
        },
        {
          art: 'text',
          text:
            'Die Joins Studenten⋈hören und hören⋈Vorlesungen sind natürliche Verbunde über die gemeinsamen ' +
            'Attribute MatrNr bzw. VorlNr. Der Verbund Vorlesungen⋈Professoren ist ein Theta-/Equi-Join über ' +
            'die Bedingung gelesenVon = PersNr (unterschiedliche Attributnamen). Die Selektion auf das ' +
            'Semester kann ganz außen stehen; aus Effizienzgründen würde der Optimierer σ[Semester ≥ 12] aber ' +
            'früh direkt auf Studenten schieben (Selektion nach unten ziehen).',
        },
      ],
    },
    {
      nr: 62,
      titel: '6.2) Als Operatorbaum (4 Punkte)',
      text: 'Zeichnen Sie den zugehörigen Operatorbaum.',
      loesung: [
        {
          art: 'text',
          text:
            'Der Operatorbaum bildet denselben Ausdruck als Baum ab: Blätter sind die Basisrelationen, jeder ' +
            'Operator ein innerer Knoten. Die Wurzel ist die zuletzt ausgeführte Operation (hier σ[Semester ≥ 12]), ' +
            'die Blätter werden zuerst ausgewertet.',
        },
        {
          art: 'svg',
          titel: 'Operatorbaum (Wurzel oben, Auswertung von unten nach oben)',
          svg: `<svg viewBox="0 0 720 470" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Operatorbaum der Anfrage">
  <line class="dgm-line" x1="330" y1="44" x2="330" y2="72"/>
  <line class="dgm-line" x1="330" y1="104" x2="170" y2="134"/>
  <line class="dgm-line" x1="330" y1="104" x2="430" y2="134"/>
  <line class="dgm-line" x1="430" y1="166" x2="330" y2="198"/>
  <line class="dgm-line" x1="430" y1="166" x2="520" y2="198"/>
  <line class="dgm-line" x1="520" y1="230" x2="520" y2="272"/>
  <line class="dgm-line" x1="520" y1="304" x2="430" y2="346"/>
  <line class="dgm-line" x1="520" y1="304" x2="620" y2="346"/>
  <line class="dgm-line" x1="620" y1="378" x2="620" y2="408"/>
  <rect class="dgm-shape" x="252" y="12" width="156" height="32" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="330" y="33" text-anchor="middle">σ[Semester ≥ 12]</text>
  <rect class="dgm-shape" x="310" y="72" width="40" height="32" rx="5"/>
  <text class="dgm-text" x="330" y="93" text-anchor="middle">⋈</text>
  <rect class="dgm-shape" x="122" y="134" width="96" height="32" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="170" y="155" text-anchor="middle">Studenten</text>
  <rect class="dgm-shape" x="410" y="134" width="40" height="32" rx="5"/>
  <text class="dgm-text" x="430" y="155" text-anchor="middle">⋈</text>
  <rect class="dgm-shape" x="294" y="198" width="72" height="32" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="330" y="219" text-anchor="middle">hören</text>
  <rect class="dgm-shape" x="472" y="198" width="96" height="32" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="520" y="219" text-anchor="middle">π[VorlNr]</text>
  <rect class="dgm-shape" x="420" y="272" width="200" height="32" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="520" y="293" text-anchor="middle">⋈[gelesenVon = PersNr]</text>
  <rect class="dgm-shape" x="374" y="346" width="112" height="32" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="430" y="367" text-anchor="middle">Vorlesungen</text>
  <rect class="dgm-shape" x="532" y="346" width="176" height="32" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="620" y="367" text-anchor="middle">σ[Name = ’Sokrates’]</text>
  <rect class="dgm-shape" x="564" y="408" width="112" height="32" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="620" y="429" text-anchor="middle">Professoren</text>
</svg>`,
        },
        {
          art: 'liste',
          punkte: [
            'Ganz unten rechts wird zuerst Sokrates aus Professoren selektiert.',
            'Der Equi-Join mit Vorlesungen liefert Sokrates’ Vorlesungen; π[VorlNr] reduziert auf die Nummern.',
            'Der Join mit hören ergibt die MatrNr aller Hörer dieser Vorlesungen.',
            'Der Join mit Studenten ergänzt u. a. das Semester.',
            'Die σ[Semester ≥ 12] an der Wurzel behält nur die „Dauerstudenten".',
          ],
        },
      ],
    },

    // ---- Aufgabe 7 (Normalisierung und BCNF) ----
    {
      nr: 70,
      titel: 'Aufgabe 7 (Normalisierung und BCNF) (10 Punkte)',
      text:
        'Gegeben sei die Relation R(A, B, C, D) mit den folgenden funktionalen Abhängigkeiten. ' +
        'Beantworten Sie damit die Teilaufgaben a)–d).',
      sqlQuery: 'AD → BC\nA  → D\nBC → AD\nD  → B',
      loesung: [
        {
          art: 'text',
          text:
            'Hinweis: Hier steht „→" für eine funktionale Abhängigkeit (FD). X → Y heißt: gleiche X-Werte ' +
            'erzwingen gleiche Y-Werte. Die obigen vier FDs sind die Ausgangsmenge für alle Teilaufgaben.',
        },
      ],
    },
    {
      nr: 71,
      titel: '7a) Kanonische Überdeckung (3 Punkte)',
      text: 'Bestimmen Sie die kanonische Überdeckung – zuerst Linksreduktion, dann Rechtsreduktion.',
      loesung: [
        {
          art: 'unterpunkt',
          label: 'Schritt 1 – Linksreduktion',
          text:
            'Die Linksreduktion versucht, Attribute auf der LINKEN Seite zu eliminieren. Die Frage ist jeweils: ' +
            'Kann man ein Attribut weglassen und trotzdem noch alle bestehenden Abhängigkeiten erzeugen?',
        },
        {
          art: 'text',
          text:
            'Test an AD → BC: Lässt sich das D links streichen, also gilt schon A → BC? Das ist relevant, weil ' +
            'aus AD → A (trivial) und A → BC per Transitivität wieder AD → BC folgt – A → BC wäre also ' +
            'gleichwertig (und einfacher).',
        },
        {
          art: 'text',
          text:
            'Nachweis A → BC: Aus A → D und A → A (trivial) folgt A → AD (Vereinigung/„combine"). Mit der ' +
            'gegebenen AD → BC folgt per Transitivität A → BC. Formal: {A}⁺ = {A, B, C, D} ⊇ {B, C}. Beide ' +
            'Formulierungen sind also äquivalent → wir nehmen die einfachere A → BC.',
        },
        {
          art: 'liste',
          punkte: [
            'Noch weiter in A → BC reduzieren (zu {} → BC)? Nein – das hieße, die Relation wäre überflüssig; ' +
              'C ist aber über keine andere FD erreichbar.',
            'In BC → AD das B weglassen (also C → AD)? Nein – von C allein kommt man nirgendwohin (man darf ' +
              'BC → AD benutzen, aber nicht C → AD).',
            'Stattdessen das C weglassen (also B → AD)? Nein – von B allein kommt man ebenfalls nirgendwohin.',
          ],
        },
        {
          art: 'code',
          titel: 'Ergebnis nach der Linksreduktion',
          text: 'A  → BC\nA  → D\nBC → AD\nD  → B',
        },
        {
          art: 'unterpunkt',
          label: 'Schritt 2 – Rechtsreduktion',
          text:
            'Jetzt werden überflüssige Attribute auf der RECHTEN Seite entfernt. Mit der Split-Regel zerlegt man ' +
            'dazu rechts: A → BC wird zu A → B und A → C.',
        },
        {
          art: 'text',
          text:
            'A → B ist redundant: Wir haben A → D und D → B, also per Transitivität A → B. Diese FD lässt sich ' +
            'somit aus den übrigen erzeugen und darf entfallen ({A}⁺ = {A, B, C, D} ⊇ {B}, wobei A → B selbst ' +
            'nicht mitbenutzt werden darf). Übrig bleiben A → C, A → D, BC → AD, D → B; mit Combine wieder zu A → CD.',
        },
        {
          art: 'text',
          text:
            'Auch in BC → AD ist rechts noch etwas redundant: Aus BC → A und A → D (aus A → CD) folgt per ' +
            'Transitivität BC → D. Das D rechts ist also überflüssig → BC → A. (Alternativ nachgewiesen über ' +
            '{B, C}⁺ = {A, B, C, D} ⊇ {D}.)',
        },
        {
          art: 'code',
          titel: 'Kanonische Überdeckung Fc',
          text: 'A  → CD\nBC → A\nD  → B',
        },
      ],
    },
    {
      nr: 72,
      titel: '7b) Hüllen von A und B (2 Punkte)',
      text: 'Berechnen Sie die Attributhüllen {A}⁺ und {B}⁺.',
      loesung: [
        {
          art: 'text',
          text:
            'Eine Attributhülle berechnet man, indem man die FDs wiederholt anwendet, bis nichts Neues mehr ' +
            'hinzukommt.',
        },
        {
          art: 'unterpunkt',
          label: '{A}⁺ = {A, B, C, D}',
          text:
            'Start {A}. Mit A → CD kommen C und D hinzu → {A, C, D}. Mit D → B kommt B hinzu → {A, B, C, D}. ' +
            'Damit ist die gesamte Relation erreicht; A bestimmt alles.',
        },
        {
          art: 'unterpunkt',
          label: '{B}⁺ = {B}',
          text:
            'Start {B}. Keine FD hat eine linke Seite, die nur aus B (oder einer Teilmenge von {B}) besteht – ' +
            'B steht immer nur zusammen mit C auf der linken Seite (BC → …). Es kommt also nichts hinzu.',
        },
      ],
    },
    {
      nr: 73,
      titel: '7c) Kandidatenschlüssel (2 Punkte)',
      text: 'Bestimmen Sie alle Kandidatenschlüssel der Relation R(A, B, C, D).',
      loesung: [
        {
          art: 'text',
          text:
            'Ein Kandidatenschlüssel ist eine MINIMALE Attributmenge, deren Hülle die ganze Relation ergibt ' +
            '({…}⁺ = {A, B, C, D}). Man rechnet die (nichttrivialen) Hüllen durch und behält nur die minimalen.',
        },
        {
          art: 'tabelle',
          titel: 'Hüllen der Attributmengen',
          columns: ['Attributmenge', 'Hülle', 'Bewertung'],
          rows: [
            ['{A}', '{A, B, C, D}', '➜ 1. Kandidatenschlüssel'],
            ['{A, B}', '{A, B, C, D}', 'nicht minimal (B weglassbar)'],
            ['{A, C}', '{A, B, C, D}', 'nicht minimal'],
            ['{A, D}', '{A, B, C, D}', 'nicht minimal'],
            ['{B, C}', '{A, B, C, D}', '➜ 2. Kandidatenschlüssel'],
            ['{C, D}', '{A, B, C, D}', '➜ 3. Kandidatenschlüssel'],
            ['{B, C, D}', '{A, B, C, D}', 'nicht minimal'],
            ['{A, C, D}', '{A, B, C, D}', 'nicht minimal'],
            ['{A, B, D}', '{A, B, C, D}', 'nicht minimal'],
            ['{A, B, C}', '{A, B, C, D}', 'nicht minimal'],
          ],
        },
        {
          art: 'unterpunkt',
          label: '3 Kandidatenschlüssel: [A], [B, C], [C, D]',
          text:
            'Nur diese drei Mengen sind sowohl schlüsselbildend als auch minimal (keine echte Teilmenge ist ' +
            'selbst schon Schlüssel). B allein scheidet aus (siehe {B}⁺ = {B}).',
        },
      ],
    },
    {
      nr: 74,
      titel: '7d) Zerlegung gemäß Boyce-Codd (BCNF) (3 Punkte + 1 Bonus)',
      text:
        'Führen Sie eine Zerlegung gemäß Boyce-Codd durch (auch wenn sie nicht abhängigkeitserhaltend ist). ' +
        'Bonus: Erkennen Sie, weshalb die Zerlegung nicht abhängigkeitserhaltend ist?',
      loesung: [
        {
          art: 'text',
          text:
            'BCNF-Bedingung: Für jede nichttriviale FD X → Y muss die linke Seite X ein Superschlüssel sein ' +
            '({X}⁺ = ganze Relation). Wir prüfen die FDs der kanonischen Überdeckung:',
        },
        {
          art: 'liste',
          punkte: [
            'A → CD: {A}⁺ = {A, B, C, D} → A ist Superschlüssel ✓ (BCNF-konform).',
            'BC → A: {B, C}⁺ = {A, B, C, D} → BC ist Superschlüssel ✓ (BCNF-konform).',
            'D → B: {D}⁺ = {B, D} ≠ {A, B, C, D} → D ist KEIN Superschlüssel ✗ → BCNF-Verletzung!',
          ],
        },
        {
          art: 'text',
          text:
            'Zerlegt wird also entlang der verletzenden FD D → B. Aus R(A,B,C,D) entstehen zwei Relationen: ' +
            'R1 enthält die Attribute der Hülle {D}⁺ = {B, D}; R2 enthält die linke Seite D plus die restlichen ' +
            'Attribute (alles außer dem „abgespaltenen" B), also {A, C, D}.',
        },
        {
          art: 'svg',
          titel: 'Zerlegung entlang D → B',
          svg: `<svg viewBox="0 0 540 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="BCNF-Zerlegung von R in R1 und R2">
  <line class="dgm-line" x1="270" y1="58" x2="140" y2="122"/>
  <line class="dgm-line" x1="270" y1="58" x2="400" y2="122"/>
  <rect class="dgm-shape" x="195" y="22" width="150" height="36" rx="5"/>
  <text class="dgm-text" x="270" y="45" text-anchor="middle">R(A, B, C, D)</text>
  <rect class="dgm-shape" x="80" y="122" width="120" height="36" rx="5"/>
  <text class="dgm-text" x="140" y="145" text-anchor="middle">R1(B, D)</text>
  <rect class="dgm-shape" x="330" y="122" width="140" height="36" rx="5"/>
  <text class="dgm-text" x="400" y="145" text-anchor="middle">R2(A, C, D)</text>
  <text class="dgm-text dgm-text--sm" x="140" y="184" text-anchor="middle">{D}⁺ = {B, D}</text>
  <text class="dgm-text dgm-text--sm" x="400" y="184" text-anchor="middle">{A}⁺ = {A, C, D}</text>
  <text class="dgm-card" x="270" y="212" text-anchor="middle">zerlegt entlang D → B (D ist kein Superschlüssel)</text>
</svg>`,
        },
        {
          art: 'unterpunkt',
          label: 'Bonus: Warum nicht abhängigkeitserhaltend?',
          text:
            'Die FD BC → A wird durch die Zerlegung nicht mehr „respektiert": B liegt nur in R1, C und A liegen ' +
            'nur in R2. Damit verteilt sich BC → A auf beide Relationen und lässt sich in keiner der beiden ' +
            'lokal prüfen – die Abhängigkeit geht verloren. Die Zerlegung ist daher (verlustfrei, aber) nicht ' +
            'abhängigkeitserhaltend.',
        },
      ],
    },
  ],
}
