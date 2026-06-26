import type { Uebungsblatt } from '../../types'

export const blatt4: Uebungsblatt = {
  id: 'blatt4',
  nr: '4',
  typ: 'Gruppen- & Hausaufgaben',
  beschreibung:
    'Vom ER-Diagramm zum Relationenschema: initiale Überführung (je Entity- und Beziehungstyp eine Relation) und ' +
    'anschließende Verfeinerung durch Zusammenfassen von Relationen mit gleichem Schlüssel. Dazu partielle Funktionen ' +
    'bei ternären Beziehungen und der Zusammenhang zu Funktionalitätsangaben.',
  anmerkung: {
    titel: 'Notation der Relationenschemata',
    punkte: [
      '{[ … ]} ist die Attributliste einer Relation.',
      '«Attribut» kennzeichnet den Primärschlüssel (im Skript unterstrichen).',
      'Wichtige Regel beim Verfeinern: Relationen mit GLEICHEM Schlüssel darf man zusammenfassen – aber nur diese und keine anderen!',
    ],
  },
  tasks: [
    {
      nr: 1,
      titel: 'Gruppenaufgabe 1 – ER → Schema + Verfeinerung',
      text:
        'Überführen Sie die ER-Diagramme a)–d) jeweils in ein Relationenschema und verfeinern Sie es. Geben Sie ' +
        'Wertebereiche an und unterstreichen Sie Primärschlüssel. Welche Regel gilt beim Verfeinern?',
      loesung: [
        {
          art: 'text',
          text:
            'Regel beim Verfeinern: Relationen mit gleichem Schlüssel kann man zusammenfassen – aber nur diese und keine ' +
            'anderen. Konkret werden Relationen binärer Beziehungstypen in die Entity-Relation aufgenommen, wenn sie ' +
            'denselben Schlüssel haben (das ist bei 1:1, 1:N und N:1 der Fall, NICHT bei N:M).',
        },
        {
          art: 'unterpunkt',
          label: 'a) herstellen (Auto N : 1 Hersteller)',
          text: 'Initialer Entwurf, danach Verfeinerung (herstellen hat denselben Schlüssel FGNr wie Auto → zusammenfassen):',
        },
        {
          art: 'svg',
          titel: 'a) ER-Diagramm',
          svg: `<svg viewBox="0 0 560 180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Auto herstellen Hersteller">
  <line class="dgm-line" x1="150" y1="62" x2="218" y2="62"/>
  <line class="dgm-line" x1="342" y1="62" x2="410" y2="62"/>
  <line class="dgm-line" x1="95" y1="84" x2="95" y2="116"/>
  <line class="dgm-line" x1="465" y1="84" x2="465" y2="116"/>
  <rect class="dgm-shape" x="40" y="40" width="110" height="44" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="95" y="67" text-anchor="middle">Auto</text>
  <polygon class="dgm-shape" points="218,62 280,28 342,62 280,96"/>
  <text class="dgm-text dgm-text--sm" x="280" y="66" text-anchor="middle">herstellen</text>
  <rect class="dgm-shape" x="410" y="40" width="110" height="44" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="465" y="67" text-anchor="middle">Hersteller</text>
  <ellipse class="dgm-shape" cx="95" cy="134" rx="36" ry="16"/>
  <text class="dgm-key" x="95" y="139" text-anchor="middle">FGNr</text>
  <ellipse class="dgm-shape" cx="465" cy="134" rx="36" ry="16"/>
  <text class="dgm-key" x="465" y="139" text-anchor="middle">Name</text>
  <text class="dgm-card" x="172" y="54">N</text>
  <text class="dgm-card" x="382" y="54">1</text>
</svg>`,
        },
        {
          art: 'code',
          titel: 'a) initial → verfeinert',
          text:
            'Auto:        {[ «FGNr»: integer ]}\n' +
            'Hersteller:  {[ «Name»: String ]}\n' +
            'herstellen:  {[ «FGNr»: integer, Name: String ]}\n' +
            '\n' +
            '→ Verfeinerung (Auto + herstellen, Schlüssel FGNr):\n' +
            'Auto:        {[ «FGNr»: integer, Name: String ]}\n' +
            'Hersteller:  {[ «Name»: String ]}',
        },
        {
          art: 'unterpunkt',
          label: 'b) vormerken (Buchtitel N : M Ausleiher)',
          text: 'Bei N:M bekommt die Beziehungsrelation einen zusammengesetzten Schlüssel – sie hat mit keiner Entity-Relation denselben Schlüssel, eine Verfeinerung ist daher nicht möglich.',
        },
        {
          art: 'svg',
          titel: 'b) ER-Diagramm',
          svg: `<svg viewBox="0 0 560 180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Buchtitel vormerken Ausleiher">
  <line class="dgm-line" x1="150" y1="62" x2="218" y2="62"/>
  <line class="dgm-line" x1="342" y1="62" x2="410" y2="62"/>
  <line class="dgm-line" x1="95" y1="84" x2="95" y2="116"/>
  <line class="dgm-line" x1="465" y1="84" x2="465" y2="116"/>
  <rect class="dgm-shape" x="40" y="40" width="110" height="44" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="95" y="67" text-anchor="middle">Buchtitel</text>
  <polygon class="dgm-shape" points="218,62 280,28 342,62 280,96"/>
  <text class="dgm-text dgm-text--sm" x="280" y="66" text-anchor="middle">vormerken</text>
  <rect class="dgm-shape" x="410" y="40" width="110" height="44" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="465" y="67" text-anchor="middle">Ausleiher</text>
  <ellipse class="dgm-shape" cx="95" cy="134" rx="36" ry="16"/>
  <text class="dgm-key" x="95" y="139" text-anchor="middle">ISBN</text>
  <ellipse class="dgm-shape" cx="465" cy="134" rx="36" ry="16"/>
  <text class="dgm-key" x="465" y="139" text-anchor="middle">LeserNr</text>
  <text class="dgm-card" x="172" y="54">N</text>
  <text class="dgm-card" x="382" y="54">M</text>
</svg>`,
        },
        {
          art: 'code',
          titel: 'b) initial (Verfeinerung nicht möglich)',
          text:
            'Buchtitel:  {[ «ISBN»: integer ]}\n' +
            'Ausleiher:  {[ «LeserNr»: integer ]}\n' +
            'vormerken:  {[ «ISBN»: integer, «LeserNr»: integer ]}\n' +
            '\n' +
            '→ Verfeinerung: nicht möglich – kein gleicher Schlüssel vorhanden.',
        },
        {
          art: 'unterpunkt',
          label: 'c) Bürgermeister (Stadt 1 : 1 Bürger)',
          text: 'Bei 1:1 gibt es zwei Varianten (Schlüssel der Beziehung = Name ODER SVNr). Variante 1 (Beziehung zu Stadt) ist vorzuziehen, weil Variante 2 viele NULL-Werte in der Bürger-Tabelle erzeugt (nicht jeder Bürger ist Bürgermeister).',
        },
        {
          art: 'svg',
          titel: 'c) ER-Diagramm',
          svg: `<svg viewBox="0 0 560 180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Stadt Bürgermeister Bürger">
  <line class="dgm-line" x1="150" y1="62" x2="210" y2="62"/>
  <line class="dgm-line" x1="350" y1="62" x2="410" y2="62"/>
  <line class="dgm-line" x1="95" y1="84" x2="95" y2="116"/>
  <line class="dgm-line" x1="465" y1="84" x2="465" y2="116"/>
  <rect class="dgm-shape" x="40" y="40" width="110" height="44" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="95" y="67" text-anchor="middle">Stadt</text>
  <polygon class="dgm-shape" points="210,62 280,24 350,62 280,100"/>
  <text class="dgm-text dgm-text--sm" x="280" y="66" text-anchor="middle">Bürgermeister</text>
  <rect class="dgm-shape" x="410" y="40" width="110" height="44" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="465" y="67" text-anchor="middle">Bürger</text>
  <ellipse class="dgm-shape" cx="95" cy="134" rx="36" ry="16"/>
  <text class="dgm-key" x="95" y="139" text-anchor="middle">Name</text>
  <ellipse class="dgm-shape" cx="465" cy="134" rx="36" ry="16"/>
  <text class="dgm-key" x="465" y="139" text-anchor="middle">SVNr</text>
  <text class="dgm-card" x="172" y="54">1</text>
  <text class="dgm-card" x="382" y="54">1</text>
</svg>`,
        },
        {
          art: 'code',
          titel: 'c) initial → verfeinert (Variante 1 bevorzugt)',
          text:
            'Stadt:         {[ «Name»: String ]}\n' +
            'Bürger:        {[ «SVNr»: integer ]}\n' +
            'Bürgermeister: {[ «Name»: String, SVNr: integer ]}   (Variante 1, Schlüssel Name)\n' +
            '\n' +
            '→ Verfeinerung (Stadt + Bürgermeister):\n' +
            'Stadt:   {[ «Name»: String, SVNr: integer ]}\n' +
            'Bürger:  {[ «SVNr»: integer ]}',
        },
        {
          art: 'unterpunkt',
          label: 'd) liegt_in (Gebäude 1 : N Raum, identifizierend)',
          text: 'Raum ist eine schwache Entität: RaumNr ist nur innerhalb eines Gebäudes eindeutig, der Schlüssel ist daher (GebNr, RaumNr). liegt_in hat denselben Schlüssel wie Raum → zusammenfassen.',
        },
        {
          art: 'svg',
          titel: 'd) ER-Diagramm',
          svg: `<svg viewBox="0 0 560 180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Gebäude liegt_in Raum">
  <line class="dgm-line" x1="150" y1="62" x2="210" y2="62"/>
  <line class="dgm-line" x1="350" y1="62" x2="410" y2="62"/>
  <line class="dgm-line" x1="95" y1="84" x2="95" y2="116"/>
  <line class="dgm-line" x1="465" y1="84" x2="465" y2="116"/>
  <rect class="dgm-shape" x="40" y="40" width="110" height="44" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="95" y="67" text-anchor="middle">Gebäude</text>
  <polygon class="dgm-shape" points="210,62 280,24 350,62 280,100"/>
  <polygon class="dgm-shape" points="222,62 280,33 338,62 280,91"/>
  <text class="dgm-text dgm-text--sm" x="280" y="66" text-anchor="middle">liegt_in</text>
  <rect class="dgm-shape" x="410" y="40" width="110" height="44" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="465" y="67" text-anchor="middle">Raum</text>
  <ellipse class="dgm-shape" cx="95" cy="134" rx="36" ry="16"/>
  <text class="dgm-key" x="95" y="139" text-anchor="middle">GebNr</text>
  <ellipse class="dgm-shape" cx="465" cy="134" rx="36" ry="16"/>
  <text class="dgm-key" x="465" y="139" text-anchor="middle">RaumNr</text>
  <text class="dgm-card" x="172" y="54">1</text>
  <text class="dgm-card" x="382" y="54">N</text>
</svg>`,
        },
        {
          art: 'code',
          titel: 'd) initial → verfeinert',
          text:
            'Gebäude:  {[ «GebNr»: integer ]}\n' +
            'Raum:     {[ «GebNr»: integer, «RaumNr»: integer ]}\n' +
            'liegt_in: {[ «GebNr»: integer, «RaumNr»: integer ]}\n' +
            '\n' +
            '→ Verfeinerung (Raum + liegt_in):\n' +
            'Gebäude:  {[ «GebNr»: integer ]}\n' +
            'Raum:     {[ «GebNr»: integer, «RaumNr»: integer ]}',
        },
      ],
    },
    {
      nr: 2,
      titel: 'Gruppenaufgabe 2 – Vermieter / Wohnung / Haus',
      text:
        'Überführen Sie das ER-Modell in ein relationales Schema und verfeinern Sie es. mieten ist eine ternäre Beziehung ' +
        '(Vermieter 1, Wohnung N, Mieter 1); Wohnung ist eine schwache Entität, die über die identifizierende Beziehung ' +
        'liegt_in zum Haus gehört (Nummer ist nur innerhalb eines Hauses eindeutig).',
      loesung: [
        {
          art: 'svg',
          titel: 'ER-Modell',
          svg: `<svg viewBox="0 0 860 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Vermieter Wohnung Haus">
  <line class="dgm-line" x1="150" y1="93" x2="216" y2="93"/>
  <line class="dgm-line" x1="324" y1="93" x2="410" y2="93"/>
  <line class="dgm-line" x1="270" y1="127" x2="270" y2="230"/>
  <line class="dgm-line" x1="530" y1="93" x2="588" y2="93"/>
  <line class="dgm-line" x1="692" y1="93" x2="730" y2="93"/>
  <line class="dgm-line" x1="80" y1="116" x2="65" y2="135"/>
  <line class="dgm-line" x1="120" y1="116" x2="140" y2="135"/>
  <line class="dgm-line" x1="450" y1="116" x2="440" y2="135"/>
  <line class="dgm-line" x1="510" y1="116" x2="525" y2="135"/>
  <line class="dgm-line" x1="780" y1="116" x2="780" y2="135"/>
  <line class="dgm-line" x1="250" y1="276" x2="235" y2="285"/>
  <line class="dgm-line" x1="300" y1="276" x2="320" y2="285"/>
  <rect class="dgm-shape" x="30" y="70" width="120" height="46" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="90" y="97" text-anchor="middle">Vermieter</text>
  <polygon class="dgm-shape" points="215,93 270,59 325,93 270,127"/>
  <text class="dgm-text dgm-text--sm" x="270" y="97" text-anchor="middle">mieten</text>
  <rect class="dgm-shape" x="410" y="70" width="120" height="46" rx="3"/>
  <rect class="dgm-shape" x="414" y="74" width="112" height="38" rx="2"/>
  <text class="dgm-text dgm-text--sm" x="470" y="97" text-anchor="middle">Wohnung</text>
  <polygon class="dgm-shape" points="588,93 640,61 692,93 640,125"/>
  <polygon class="dgm-shape" points="598,93 640,67 682,93 640,119"/>
  <text class="dgm-text dgm-text--sm" x="640" y="97" text-anchor="middle">liegt_in</text>
  <rect class="dgm-shape" x="730" y="70" width="100" height="46" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="780" y="97" text-anchor="middle">Haus</text>
  <rect class="dgm-shape" x="210" y="230" width="120" height="46" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="270" y="257" text-anchor="middle">Mieter</text>
  <ellipse class="dgm-shape" cx="60" cy="150" rx="32" ry="16"/>
  <text class="dgm-key" x="60" y="155" text-anchor="middle">Name</text>
  <ellipse class="dgm-shape" cx="150" cy="150" rx="36" ry="16"/>
  <text class="dgm-text dgm-text--sm" x="150" y="155" text-anchor="middle">Adresse</text>
  <ellipse class="dgm-shape" cx="430" cy="150" rx="34" ry="16"/>
  <text class="dgm-key" x="430" y="155" text-anchor="middle">Nummer</text>
  <ellipse class="dgm-shape" cx="530" cy="150" rx="32" ry="16"/>
  <text class="dgm-text dgm-text--sm" x="530" y="155" text-anchor="middle">Größe</text>
  <ellipse class="dgm-shape" cx="780" cy="150" rx="36" ry="16"/>
  <text class="dgm-key" x="780" y="155" text-anchor="middle">Adresse</text>
  <ellipse class="dgm-shape" cx="230" cy="300" rx="32" ry="16"/>
  <text class="dgm-key" x="230" y="305" text-anchor="middle">Name</text>
  <ellipse class="dgm-shape" cx="330" cy="300" rx="40" ry="16"/>
  <text class="dgm-text dgm-text--sm" x="330" y="305" text-anchor="middle">Geburtsjahr</text>
  <text class="dgm-card" x="162" y="85">1</text>
  <text class="dgm-card" x="360" y="85">N</text>
  <text class="dgm-card" x="282" y="175">1</text>
  <text class="dgm-card" x="548" y="85">N</text>
  <text class="dgm-card" x="700" y="85">1</text>
</svg>`,
        },
        {
          art: 'unterpunkt',
          label: 'a) Relationales Schema (initial)',
          text: 'Je Entitytyp eine Relation; Wohnung ist schwach (Schlüssel = Haus-Adresse + Nummer). mieten ist ternär – sein Schlüssel umfasst zwei Entitäten (z. B. Wohnung + Mieter), da (Wohnung, Mieter) den Vermieter bestimmt.',
        },
        {
          art: 'code',
          text:
            'Vermieter: {[ «Name», Adresse ]}\n' +
            'Mieter:    {[ «Name», Geburtsjahr ]}\n' +
            'Haus:      {[ «Adresse» ]}\n' +
            'Wohnung:   {[ «HausAdresse», «Nummer», Größe ]}\n' +
            'liegt_in:  {[ «HausAdresse», «Nummer» ]}\n' +
            'mieten:    {[ «HausAdresse», «Nummer», «MieterName», VermieterName ]}',
        },
        {
          art: 'unterpunkt',
          label: 'b) Verfeinerung',
          text: 'liegt_in hat denselben Schlüssel wie Wohnung → zusammenfassen. mieten bleibt eigenständig (Schlüssel über zwei Entitäten, nicht in eine Entity-Relation einrechenbar).',
        },
        {
          art: 'code',
          text:
            'Vermieter: {[ «Name», Adresse ]}\n' +
            'Mieter:    {[ «Name», Geburtsjahr ]}\n' +
            'Haus:      {[ «Adresse» ]}\n' +
            'Wohnung:   {[ «HausAdresse», «Nummer», Größe ]}\n' +
            'mieten:    {[ «HausAdresse», «Nummer», «MieterName», VermieterName ]}',
        },
      ],
    },
    {
      nr: 3,
      titel: 'Hausaufgabe 1 – abstrakte 1:N-Beziehung (Altklausur)',
      text:
        'Überführen Sie das abstrakte Diagramm A —1— R —N— B (mit Attributen a, b, r) in ein Schema und verfeinern Sie es.',
      loesung: [
        {
          art: 'svg',
          titel: 'A : R : B (1:N)',
          svg: `<svg viewBox="0 0 560 190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="abstrakte 1:N-Beziehung">
  <line class="dgm-line" x1="150" y1="55" x2="218" y2="55"/>
  <line class="dgm-line" x1="342" y1="55" x2="410" y2="55"/>
  <line class="dgm-line" x1="95" y1="77" x2="95" y2="109"/>
  <line class="dgm-line" x1="465" y1="77" x2="465" y2="109"/>
  <line class="dgm-line" x1="280" y1="89" x2="280" y2="119"/>
  <rect class="dgm-shape" x="40" y="33" width="110" height="44" rx="4"/>
  <text class="dgm-text" x="95" y="60" text-anchor="middle">A</text>
  <polygon class="dgm-shape" points="218,55 280,21 342,55 280,89"/>
  <text class="dgm-text dgm-text--sm" x="280" y="59" text-anchor="middle">R</text>
  <rect class="dgm-shape" x="410" y="33" width="110" height="44" rx="4"/>
  <text class="dgm-text" x="465" y="60" text-anchor="middle">B</text>
  <ellipse class="dgm-shape" cx="95" cy="127" rx="30" ry="16"/>
  <text class="dgm-key" x="95" y="132" text-anchor="middle">a</text>
  <ellipse class="dgm-shape" cx="465" cy="127" rx="30" ry="16"/>
  <text class="dgm-key" x="465" y="132" text-anchor="middle">b</text>
  <ellipse class="dgm-shape" cx="280" cy="137" rx="30" ry="16"/>
  <text class="dgm-text dgm-text--sm" x="280" y="142" text-anchor="middle">r</text>
  <text class="dgm-card" x="172" y="47">1</text>
  <text class="dgm-card" x="382" y="47">N</text>
</svg>`,
        },
        {
          art: 'unterpunkt',
          label: 'a) Relationales Schema (initial)',
          text: 'Je Entitytyp eine Relation, dazu eine Relation für die Beziehung. Bei 1:N erhält die Beziehungsrelation den Schlüssel der N-Seite (hier b):',
        },
        {
          art: 'code',
          text:
            'A:  {[ «a» ]}            (1)\n' +
            'B:  {[ «b» ]}            (2)\n' +
            'R:  {[ a, «b», r ]}      (3)',
        },
        {
          art: 'unterpunkt',
          label: 'b) Verfeinerung',
          text: 'Bei 1:N/N:1/1:1 darf die Beziehungsrelation in die Entity-Relation mit gleichem Schlüssel aufgenommen werden. R (Schlüssel b) wird in B (Schlüssel b) aufgenommen:',
        },
        {
          art: 'code',
          text:
            'A:  {[ «a» ]}            (1)\n' +
            'B:  {[ «b», a, r ]}      (2)',
        },
      ],
    },
    {
      nr: 4,
      titel: 'Hausaufgabe 2 – Zugverbindungen',
      text:
        'Gegeben das ER-Modell mit Bahnhöfe, Städte, Züge und den Beziehungen liegt_in, Start, Ziel und der ternären ' +
        'Beziehung verbindet (Teilstrecken; von/nach sind zwei Rollen von Bahnhöfe).\n\n' +
        'a) Ergänzen Sie Funktionalitäten und geben Sie für verbindet die geltenden partiellen Funktionen an. ' +
        'b) Überführen Sie das Modell in ein relationales Schema. c) Verfeinern Sie es durch Eliminierung von Relationen.',
      loesung: [
        {
          art: 'unterpunkt',
          label: 'a) Funktionalitäten',
          text: 'liegt_in: Bahnhöfe N : 1 Städte. Start: Bahnhöfe 1 : N Züge. Ziel: Bahnhöfe 1 : N Züge. verbindet: von 1, nach 1, Züge N – die ternäre Beziehung verhält sich wie eine Komposition von N:M-Beziehungen.',
          punkte: [
            'Partielle Funktionen von verbindet: (Zug, vonBahnhof) → nachBahnhof  und  (Zug, nachBahnhof) → vonBahnhof.',
            'Damit sind (ZugNr, VonBahnhof) und (ZugNr, NachBahnhof) zwei mögliche Schlüssel der verbindet-Relation.',
          ],
        },
        {
          art: 'svg',
          titel: 'a) ER-Modell mit Funktionalitäten',
          svg: `<svg viewBox="0 0 800 580" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Zugverbindungen ER-Modell">
  <line class="dgm-line" x1="300" y1="143" x2="395" y2="143"/>
  <line class="dgm-line" x1="505" y1="143" x2="580" y2="143"/>
  <line class="dgm-line" x1="180" y1="166" x2="110" y2="278"/>
  <line class="dgm-line" x1="110" y1="342" x2="262" y2="440"/>
  <line class="dgm-line" x1="222" y1="166" x2="238" y2="272"/>
  <line class="dgm-line" x1="262" y1="166" x2="278" y2="272"/>
  <line class="dgm-line" x1="260" y1="348" x2="300" y2="440"/>
  <line class="dgm-line" x1="290" y1="166" x2="420" y2="276"/>
  <line class="dgm-line" x1="420" y1="344" x2="358" y2="440"/>
  <line class="dgm-line" x1="170" y1="120" x2="150" y2="98"/>
  <line class="dgm-line" x1="170" y1="135" x2="130" y2="135"/>
  <line class="dgm-line" x1="700" y1="125" x2="700" y2="120"/>
  <line class="dgm-line" x1="700" y1="161" x2="700" y2="166"/>
  <line class="dgm-line" x1="250" y1="476" x2="182" y2="470"/>
  <line class="dgm-line" x1="250" y1="486" x2="182" y2="515"/>
  <line class="dgm-line" x1="368" y1="450" x2="438" y2="425"/>
  <line class="dgm-line" x1="368" y1="466" x2="452" y2="466"/>
  <rect class="dgm-shape" x="170" y="120" width="130" height="46" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="235" y="147" text-anchor="middle">Bahnhöfe</text>
  <polygon class="dgm-shape" points="395,143 450,111 505,143 450,175"/>
  <text class="dgm-text dgm-text--sm" x="450" y="147" text-anchor="middle">liegt_in</text>
  <rect class="dgm-shape" x="580" y="120" width="120" height="46" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="640" y="147" text-anchor="middle">Städte</text>
  <polygon class="dgm-shape" points="60,310 110,276 160,310 110,344"/>
  <text class="dgm-text dgm-text--sm" x="110" y="314" text-anchor="middle">Start</text>
  <polygon class="dgm-shape" points="202,310 260,272 318,310 260,348"/>
  <text class="dgm-text dgm-text--sm" x="260" y="314" text-anchor="middle">verbindet</text>
  <polygon class="dgm-shape" points="362,310 420,276 478,310 420,344"/>
  <text class="dgm-text dgm-text--sm" x="420" y="314" text-anchor="middle">Ziel</text>
  <rect class="dgm-shape" x="250" y="440" width="120" height="46" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="310" y="467" text-anchor="middle">Züge</text>
  <ellipse class="dgm-shape" cx="120" cy="92" rx="34" ry="15"/>
  <text class="dgm-key" x="120" y="97" text-anchor="middle">Name</text>
  <ellipse class="dgm-shape" cx="88" cy="135" rx="42" ry="15"/>
  <text class="dgm-text dgm-text--sm" x="88" y="140" text-anchor="middle">AnzahlGleise</text>
  <ellipse class="dgm-shape" cx="730" cy="110" rx="34" ry="15"/>
  <text class="dgm-key" x="730" y="115" text-anchor="middle">Name</text>
  <ellipse class="dgm-shape" cx="738" cy="176" rx="42" ry="15"/>
  <text class="dgm-text dgm-text--sm" x="738" y="181" text-anchor="middle">Bundesland</text>
  <ellipse class="dgm-shape" cx="148" cy="468" rx="34" ry="15"/>
  <text class="dgm-key" x="148" y="473" text-anchor="middle">ZugNr</text>
  <ellipse class="dgm-shape" cx="148" cy="518" rx="32" ry="15"/>
  <text class="dgm-text dgm-text--sm" x="148" y="523" text-anchor="middle">Länge</text>
  <ellipse class="dgm-shape" cx="472" cy="418" rx="34" ry="15"/>
  <text class="dgm-text dgm-text--sm" x="472" y="423" text-anchor="middle">Abfahrt</text>
  <ellipse class="dgm-shape" cx="486" cy="466" rx="34" ry="15"/>
  <text class="dgm-text dgm-text--sm" x="486" y="471" text-anchor="middle">Ankunft</text>
  <text class="dgm-text dgm-text--sm" x="230" y="200">von</text>
  <text class="dgm-text dgm-text--sm" x="285" y="200">nach</text>
  <text class="dgm-card" x="345" y="135">N</text>
  <text class="dgm-card" x="540" y="135">1</text>
  <text class="dgm-card" x="155" y="210">1</text>
  <text class="dgm-card" x="150" y="400">N</text>
  <text class="dgm-card" x="218" y="215">1</text>
  <text class="dgm-card" x="292" y="215">1</text>
  <text class="dgm-card" x="268" y="400">N</text>
  <text class="dgm-card" x="370" y="215">1</text>
  <text class="dgm-card" x="392" y="400">N</text>
</svg>`,
        },
        {
          art: 'unterpunkt',
          label: 'b) Relationales Schema (initial)',
          text: 'Drei Entity-Relationen und vier Beziehungs-Relationen:',
        },
        {
          art: 'code',
          text:
            'Städte:    {[ «Name», Bundesland ]}                       (1)\n' +
            'Bahnhöfe:  {[ «Name», AnzahlGleise ]}                     (2)\n' +
            'Züge:      {[ «ZugNr», Länge ]}                           (3)\n' +
            '\n' +
            'liegt_in:  {[ «BName», SName, Bundesland ]}               (4)\n' +
            'Start:     {[ «ZugNr», BName ]}                           (5)\n' +
            'Ziel:      {[ «ZugNr», BName ]}                           (6)\n' +
            'verbindet: {[ «VonBahnhof», «NachBahnhof», «ZugNr»,       (7)\n' +
            '             Abfahrt, Ankunft ]}',
        },
        {
          art: 'unterpunkt',
          label: 'c) Verfeinerung',
          text: 'Beziehungs-Relationen mit gleichem Schlüssel werden zusammengefasst: (4)→(2), (5)→(3), (6)→(3). verbindet bleibt eigenständig (N:M-artig).',
        },
        {
          art: 'code',
          text:
            'Städte:    {[ «Name», Bundesland ]}\n' +
            'Bahnhöfe:  {[ «Name», AnzahlGleise, SName, Bundesland ]}\n' +
            'Züge:      {[ «ZugNr», Länge, StartBahnhof, ZielBahnhof ]}\n' +
            'verbindet: {[ «VonBahnhof», NachBahnhof, «ZugNr», Abfahrt, Ankunft ]}',
        },
        {
          art: 'text',
          text:
            'Hinweis: Die Zugnummer ist je Verbindung eindeutig (Rückfahrt = andere Nummer). Daher sind sowohl ' +
            '(ZugNr, VonBahnhof) als auch (ZugNr, NachBahnhof) mögliche Schlüssel von verbindet. Start/Ziel bezeichnen ' +
            'die Endpunkte, von/nach einzelne Streckenabschnitte.',
        },
      ],
    },
  ],
}
