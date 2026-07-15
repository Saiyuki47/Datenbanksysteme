import type { Uebungsblatt } from '../../types'

export const blatt3: Uebungsblatt = {
  id: 'blatt3',
  nr: '3',
  pdf: 'dateien_aus_moodle/übung 3/Übungsblatt 3.pdf',
  typ: 'Gruppen- & Hausaufgaben',
  beschreibung:
    'Funktionalitäten und (min,max)-Notation: Umrechnung zwischen beiden Notationen, ihr Zusammenhang mit der ' +
    'tabellarischen Ausprägung und – bei n-stelligen Beziehungen (n > 2) – ihre unvergleichbare Ausdruckskraft. ' +
    'Dazu zwei größere ER-Modelle (Fahrzeugverwaltung und Vielfliegerprogramm).',
  tasks: [
    {
      nr: 1,
      referenz: ['min-max', 'er-modell'],
      titel: 'Gruppenaufgabe 1 – Funktionalität ↔ (min,max)',
      text:
        'Die Beziehungstypen 1:1, 1:N, N:1 und N:M können bei binären Beziehungen auch mittels (min,max)-Notation ausgedrückt werden.\n' +
        'Geben Sie für eine abstrakte binäre Beziehung R zwischen den beiden Entitytypen E1 und E2 jeweils die (min1,max1)- und (min2,max2)-Wertepaare an, die sich aus den (gröberen) Funktionalitätsangaben F1 und F2 herleiten lassen.',
      loesung: [
        {
          art: 'text',
          text:
            'Wichtig: Die beiden Notationen lesen die Beziehung „andersherum". Eine Funktionalität steht NEBEN dem ' +
            'Entitytyp, auf den sie sich bezieht; die (min,max)-Angabe steht dagegen am Entitytyp, dessen Teilnahme sie ' +
            'beschränkt. Deshalb „kreuzen" sich die Angaben. „*" bedeutet „beliebig viele (unbeschränkt)".',
        },
        {
          art: 'tabelle',
          titel: 'Umrechnungstabelle',
          columns: ['F1 : F2', '(min1, max1)', '(min2, max2)'],
          rows: [
            ['1 : 1', '(0, 1)', '(0, 1)'],
            ['1 : N', '(0, *)', '(0, 1)'],
            ['N : 1', '(0, 1)', '(0, *)'],
            ['N : M', '(0, *)', '(0, *)'],
          ],
        },
        {
          art: 'text',
          text:
            'Das min ist hier überall 0, weil aus einer reinen Funktionalitätsangabe keine Pflicht-Teilnahme („mindestens ' +
            'eins") ableitbar ist – die (min,max)-Notation ist insofern feiner. Faustregel: Steht bei F eine 1, wird die ' +
            'GEGENüberliegende max-Angabe zu 1; steht ein N/M, wird sie zu *.',
        },
      ],
    },
    {
      nr: 2,
      referenz: ['er-modell', 'min-max'],
      titel: 'Gruppenaufgabe 2 – Übungssystem',
      text:
        'a) Angenommen das hier modellierte Übungssystem entspricht dem Übungssystem des Moduls Datenbanken.\n' +
        'Bestimmen Sie die (min,max)-Beziehungen so, dass folgende Einschränkungen modelliert werden:\n' +
        '• Ein Übungsleiter betreut mindestens einmal (einen Studenten in einer Übungsgruppe).\n' +
        '• In einer Übungsgruppe wird mindestens einmal und maximal 25-mal (ein Student von einem Übungsleiter) betreut.\n' +
        '• Ein Student wird höchstens einmal (von einem Übungsleiter in einer Übungsgruppe) betreut.\n\n' +
        'b) Betrachten Sie nun die folgende Ausprägung der Beziehung betreuen. Welchen Zusammenhang gibt es zwischen der (min,max)-Notation und der Ausprägung?',
      loesung: [
        {
          art: 'unterpunkt',
          label: 'a) (min,max)-Angaben',
          text: 'Übungsleiter: (1,*), Übungsgruppe: (1,25), Student: (0,1). min = 1 bei Übungsleiter und Übungsgruppe erzwingt „mindestens einmal"; max = 25 bei der Übungsgruppe begrenzt sie auf höchstens 25 Betreuungen; max = 1 bei Student erzwingt, dass ein Student höchstens einmal betreut wird.',
        },
        {
          art: 'svg',
          titel: 'a) betreuen mit (min,max)-Angaben',
          svg: `<svg viewBox="0 0 720 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ternäre Beziehung betreuen">
  <line class="dgm-line" x1="240" y1="103" x2="305" y2="103"/>
  <line class="dgm-line" x1="415" y1="103" x2="520" y2="103"/>
  <line class="dgm-line" x1="360" y1="141" x2="360" y2="230"/>
  <line class="dgm-line" x1="160" y1="126" x2="185" y2="158"/>
  <line class="dgm-line" x1="600" y1="126" x2="625" y2="158"/>
  <line class="dgm-line" x1="360" y1="276" x2="385" y2="296"/>
  <rect class="dgm-shape" x="80" y="80" width="160" height="46" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="160" y="107" text-anchor="middle">Übungsleiter</text>
  <polygon class="dgm-shape" points="305,103 360,65 415,103 360,141"/>
  <text class="dgm-text dgm-text--sm" x="360" y="107" text-anchor="middle">betreuen</text>
  <rect class="dgm-shape" x="520" y="80" width="160" height="46" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="600" y="107" text-anchor="middle">Übungsgruppe</text>
  <rect class="dgm-shape" x="280" y="230" width="160" height="46" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="360" y="257" text-anchor="middle">Student</text>
  <ellipse class="dgm-shape" cx="215" cy="172" rx="36" ry="16"/>
  <text class="dgm-key" x="215" y="177" text-anchor="middle">Name</text>
  <ellipse class="dgm-shape" cx="655" cy="172" rx="40" ry="16"/>
  <text class="dgm-key" x="655" y="177" text-anchor="middle">GruppenNr</text>
  <ellipse class="dgm-shape" cx="415" cy="310" rx="36" ry="16"/>
  <text class="dgm-key" x="415" y="315" text-anchor="middle">MatrNr</text>
  <text class="dgm-card" x="252" y="95">(1,*)</text>
  <text class="dgm-card" x="450" y="95">(1,25)</text>
  <text class="dgm-card" x="372" y="185">(0,1)</text>
</svg>`,
        },
        {
          art: 'unterpunkt',
          label: 'b) Zusammenhang mit der Ausprägung',
          text: 'In Bezug auf die tabellarische Repräsentation der Beziehung sagen die (min,max)-Angaben gerade aus, wie oft ein konkreter Wert, etwa der Name der Übungsleiterin Barckmann, minimal und maximal vorkommen darf. Die (min,max)-Angaben lassen sich also leicht herleiten, indem man sich die tabellarische Repräsentation einer Beziehung vorstellt und überlegt, welche Einschränkungen für die Wiederholung eines konkreten Werts in dieser Repräsentation gelten sollen. Dadurch, dass im Beispiel keine Matrikelnummer mehrfach vorkommt, wird etwa die Einschränkung modelliert, dass ein Student nicht mehrere Übungen besuchen darf.',
        },
      ],
    },
    {
      nr: 3,
      referenz: ['min-max'],
      titel: 'Gruppenaufgabe 3 – Funktionalität vs. (min,max) bei n > 2',
      text:
        'Zeigen Sie anhand der nachfolgenden Beispiele [1] und [2], dass die Ausdruckskraft der Funktionalitätsangaben (1:1, 1:N, N:1, N:M) und der (min,max)-Angaben bei n-stelligen Beziehungen mit n > 2 unvergleichbar ist.\n\n' +
        'a) Umwandlung Funktionalitätenangaben [1] in (min,max)-Notation\n' +
        '• Geben Sie die in [1] geltenden partiellen Funktionen an.\n' +
        '• Formulieren Sie die Konsistenzbedingungen, die mit den Funktionalitätsangaben ausgedrückt werden.\n' +
        '• Notieren Sie Ausprägungen, die entsprechend den Konsistenzbedingungen zulässig sind und solche, die nicht zulässig sind.\n' +
        '• Leiten Sie aus den gültigen Ausprägungen die entsprechenden (min,max)-Notationen ab.\n' +
        '• Zeigen Sie nun am Beispiel, dass die abgeleiteten (min,max)-Notationen nicht mit den zuvor festgelegten Konsistenzbedingungen bzw. partiellen Funktionen vereinbar sind.\n\n' +
        'b) Umwandlung (min,max)-Notation [2] in Funktionalitätenangaben\n' +
        '• Geben Sie die in [2] geltenden partiellen Funktionen an.\n' +
        '• Formulieren Sie die Konsistenzbedingungen, die mit den (min,max)-Notationen ausgedrückt werden.\n' +
        '• Notieren Sie Ausprägungen, die entsprechend den Konsistenzbedingungen zulässig sind und solche, die nicht zulässig sind.\n' +
        '• Leiten Sie aus den gültigen Ausprägungen die entsprechenden Funktionalitätsangaben für die Beziehung ab.\n' +
        '• Zeigen Sie nun am Beispiel, dass die abgeleiteten Funktionalitätsangaben nicht mit den zuvor festgelegten Konsistenzbedingungen bzw. partiellen Funktionen übereinstimmen.\n\n' +
        '[1] betreuen(Studenten, Professoren, Seminarthemen), Funktionalitäten N : 1 : 1, Beziehungsattribut Note.\n' +
        '[2] betreuen(Doktoranden, Professoren, Promotionsthemen), (min,max)-Angaben (0,1) / (0,*) / (0,1), Beziehungsattribut Note.',
      loesung: [
        {
          art: 'unterpunkt',
          label: '[1] Funktionalitäten N : 1 : 1',
          text: 'Die Funktionalitäten legen zwei partielle Funktionen fest (jede „1"-Seite ist durch die übrigen Entitäten bestimmt):',
        },
        {
          art: 'code',
          text:
            'betreuen: Professoren × Studenten  → Seminarthemen\n' +
            'betreuen: Seminarthemen × Studenten → Professoren',
        },
        {
          art: 'liste',
          punkte: [
            'Damit gilt: Ein Student bearbeitet bei einem Professor nur EIN Seminarthema.',
            'Und: Ein Student bearbeitet ein Thema nur bei EINEM Professor.',
            'Erlaubt bleibt: Ein Professor vergibt dasselbe Thema an mehrere (N) Studenten (z. B. in verschiedenen Jahrgängen).',
          ],
        },
        {
          art: 'svg',
          titel: '[1] betreuen mit Funktionalitäten (N, 1, 1)',
          svg: `<svg viewBox="0 0 760 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ternäre Beziehung betreuen Beispiel 1">
  <line class="dgm-line" x1="230" y1="95" x2="325" y2="95"/>
  <line class="dgm-line" x1="435" y1="95" x2="560" y2="95"/>
  <line class="dgm-line" x1="380" y1="131" x2="560" y2="263"/>
  <line class="dgm-line" x1="355" y1="123" x2="340" y2="162"/>
  <rect class="dgm-shape" x="70" y="72" width="160" height="46" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="150" y="99" text-anchor="middle">Studenten</text>
  <polygon class="dgm-shape" points="325,95 380,59 435,95 380,131"/>
  <text class="dgm-text dgm-text--sm" x="380" y="99" text-anchor="middle">betreuen</text>
  <rect class="dgm-shape" x="560" y="72" width="170" height="46" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="645" y="99" text-anchor="middle">Professoren</text>
  <rect class="dgm-shape" x="560" y="240" width="180" height="46" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="650" y="267" text-anchor="middle">Seminarthemen</text>
  <ellipse class="dgm-shape" cx="320" cy="178" rx="34" ry="16"/>
  <text class="dgm-text dgm-text--sm" x="320" y="183" text-anchor="middle">Note</text>
  <text class="dgm-card" x="262" y="86">N</text>
  <text class="dgm-card" x="248" y="112">(0,*)</text>
  <text class="dgm-card" x="498" y="86">1</text>
  <text class="dgm-card" x="478" y="112">(0,*)</text>
  <text class="dgm-card" x="470" y="218">1</text>
  <text class="dgm-card" x="468" y="244">(0,*)</text>
</svg>`,
        },
        {
          art: 'text',
          text:
            'Die zugehörige (min,max)-Notation müsste hier überall (0,*) lauten, weil jeder Student, jeder Professor und ' +
            'jedes Thema in mehreren Tupeln vorkommen darf. Damit lassen sich die obigen Bedingungen aber NICHT mehr ' +
            'erzwingen – es wäre sogar erlaubt, dass ein Student bei einem Professor dasselbe Thema zweimal bearbeitet. ' +
            'Also: [1] ist als Funktionalität, aber nicht als (min,max) ausdrückbar.',
        },
        {
          art: 'tabelle',
          titel: 'betreuen – zulässige (oben) und unzulässige (unten) Tupel',
          columns: ['Studenten', 'Professoren', 'Seminarthemen', 'zulässig?'],
          rows: [
            ['A', 'Scheich', 'Big Data', '✓'],
            ['A', 'James', 'Data Science', '✓'],
            ['B', 'Scheich', 'Big Data', '✓'],
            ['A', 'Scheich', 'noSQL', '✗ (verletzt Prof × Student → Thema)'],
            ['A', 'James', 'Big Data', '✗ (verletzt Thema × Student → Prof)'],
          ],
        },
        {
          art: 'unterpunkt',
          label: '[2] (min,max)-Angaben (0,1) / (0,*) / (0,1)',
          text: 'Hier wird die Betreuung von Promotionen modelliert: ein Promotionsthema wird höchstens einmal vergeben, ein Doktorand promoviert höchstens einmal, ein Professor kann mehrere betreuen. Die (min,max)-Angaben legen vier partielle Funktionen fest:',
        },
        {
          art: 'code',
          text:
            'betreuen: Doktoranden → Professoren\n' +
            'betreuen: Doktoranden → Themen\n' +
            'betreuen: Themen      → Doktoranden\n' +
            'betreuen: Themen      → Professoren',
        },
        {
          art: 'svg',
          titel: '[2] betreuen mit (min,max)-Angaben',
          svg: `<svg viewBox="0 0 760 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ternäre Beziehung betreuen Beispiel 2">
  <line class="dgm-line" x1="230" y1="95" x2="325" y2="95"/>
  <line class="dgm-line" x1="435" y1="95" x2="560" y2="95"/>
  <line class="dgm-line" x1="380" y1="131" x2="560" y2="263"/>
  <line class="dgm-line" x1="355" y1="123" x2="340" y2="162"/>
  <rect class="dgm-shape" x="70" y="72" width="160" height="46" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="150" y="99" text-anchor="middle">Doktoranden</text>
  <polygon class="dgm-shape" points="325,95 380,59 435,95 380,131"/>
  <text class="dgm-text dgm-text--sm" x="380" y="99" text-anchor="middle">betreuen</text>
  <rect class="dgm-shape" x="560" y="72" width="170" height="46" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="645" y="99" text-anchor="middle">Professoren</text>
  <rect class="dgm-shape" x="560" y="240" width="180" height="46" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="650" y="260" text-anchor="middle">Promotions-</text>
  <text class="dgm-text dgm-text--sm" x="650" y="276" text-anchor="middle">themen</text>
  <ellipse class="dgm-shape" cx="320" cy="178" rx="34" ry="16"/>
  <text class="dgm-text dgm-text--sm" x="320" y="183" text-anchor="middle">Note</text>
  <text class="dgm-card" x="262" y="86">1</text>
  <text class="dgm-card" x="248" y="112">(0,1)</text>
  <text class="dgm-card" x="498" y="86">1</text>
  <text class="dgm-card" x="478" y="112">(0,*)</text>
  <text class="dgm-card" x="470" y="218">1</text>
  <text class="dgm-card" x="468" y="244">(0,1)</text>
</svg>`,
        },
        {
          art: 'text',
          text:
            'Als reine Funktionalität wäre betreuen hier eine 1:1:1-Beziehung und würde drei partielle Funktionen über ' +
            'PAARE festlegen (Doktoranden × Themen → Professoren usw.). Das bildet aber NICHT dieselben Zusammenhänge ' +
            'ab wie die vier (min,max)-Funktionen über einzelne Entitäten. Also: [2] ist als (min,max), aber nicht als ' +
            'Funktionalität ausdrückbar. Fazit: Beide Notationen sind bei n > 2 unvergleichbar.',
        },
      ],
    },
    {
      nr: 4,
      referenz: ['er-modell', 'min-max'],
      titel: 'Hausaufgabe 1 – Fahrzeugverwaltung',
      text:
        'Gegeben ist das folgende ER-Modell der Fahrzeugverwaltung einer Firma (Fahrer —hat_Fahrerlaubnis— Fahrzeug, Fahrzeug —gehört— Abteilung, Fahrzeug —steht_in— Einzelgarage; die Attribute wurden aus Einfachheitsgründen weggelassen).\n\n' +
        'Es gelten folgende Bedingungen, ansonsten gibt es keine Einschränkungen:\n' +
        '• Jedes Fahrzeug gehört zu höchstens einer Abteilung, wobei aber jede Abteilung mindestens ein Fahrzeug hat.\n' +
        '• Für fast alle Fahrzeuge gibt es eine (fest zugeordnete) Einzelgarage. Jede dieser Garagen ist belegt.\n' +
        '• Für jedes Fahrzeug muss es mindestens drei Personen mit einer entsprechenden Fahrerlaubnis geben.\n\n' +
        'a) Wie lauten die entsprechenden Funktionalitäten (1:1, 1:N, N:1, N:M)?\n' +
        'b) Geben Sie gemäß der obigen Bedingungen geeignete Funktionalitäten in der (min, max)-Notation an.',
      loesung: [
        {
          art: 'unterpunkt',
          label: 'a) grobe Funktionalitäten',
          text: 'Auf die Funktionalitäten 1/N/M „vergröbert" (nur „eins" vs. „viele", ohne Pflichtangaben):',
          punkte: [
            'hat_Fahrerlaubnis: Fahrer N : M Fahrzeug',
            'gehört: Fahrzeug N : 1 Abteilung',
            'steht_in: Fahrzeug 1 : 1 Einzelgarage',
          ],
        },
        {
          art: 'svg',
          titel: 'a) ER-Modell mit Funktionalitäten',
          svg: `<svg viewBox="0 0 820 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Fahrzeugverwaltung Funktionalitäten">
  <line class="dgm-line" x1="140" y1="82" x2="168" y2="82"/>
  <line class="dgm-line" x1="292" y1="82" x2="360" y2="82"/>
  <line class="dgm-line" x1="470" y1="82" x2="520" y2="82"/>
  <line class="dgm-line" x1="620" y1="82" x2="690" y2="82"/>
  <line class="dgm-line" x1="415" y1="104" x2="415" y2="196"/>
  <line class="dgm-line" x1="415" y1="264" x2="415" y2="320"/>
  <rect class="dgm-shape" x="30" y="60" width="110" height="44" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="85" y="87" text-anchor="middle">Fahrer</text>
  <polygon class="dgm-shape" points="168,82 230,44 292,82 230,120"/>
  <text class="dgm-text dgm-text--sm" x="230" y="79" text-anchor="middle">hat_Fahr-</text>
  <text class="dgm-text dgm-text--sm" x="230" y="93" text-anchor="middle">erlaubnis</text>
  <rect class="dgm-shape" x="360" y="60" width="110" height="44" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="415" y="87" text-anchor="middle">Fahrzeug</text>
  <polygon class="dgm-shape" points="520,82 570,48 620,82 570,116"/>
  <text class="dgm-text dgm-text--sm" x="570" y="86" text-anchor="middle">gehört</text>
  <rect class="dgm-shape" x="690" y="60" width="110" height="44" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="745" y="87" text-anchor="middle">Abteilung</text>
  <polygon class="dgm-shape" points="365,230 415,196 465,230 415,264"/>
  <text class="dgm-text dgm-text--sm" x="415" y="234" text-anchor="middle">steht_in</text>
  <rect class="dgm-shape" x="355" y="320" width="120" height="44" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="415" y="347" text-anchor="middle">Einzelgarage</text>
  <text class="dgm-card" x="150" y="72">N</text>
  <text class="dgm-card" x="306" y="72">M</text>
  <text class="dgm-card" x="486" y="72">N</text>
  <text class="dgm-card" x="636" y="72">1</text>
  <text class="dgm-card" x="425" y="155">1</text>
  <text class="dgm-card" x="425" y="298">1</text>
</svg>`,
        },
        {
          art: 'unterpunkt',
          label: 'b) (min,max)-Notation',
          text: 'Die Bedingungen lassen sich direkt übersetzen:',
          punkte: [
            'hat_Fahrerlaubnis: Fahrer (0,*) — (3,*) Fahrzeug → „mindestens drei Personen je Fahrzeug" ergibt min = 3 auf der Fahrzeug-Seite.',
            'gehört: Fahrzeug (0,1) — (1,*) Abteilung → Fahrzeug in höchstens einer Abteilung (max 1), Abteilung hat mindestens ein Fahrzeug (min 1).',
            'steht_in: Fahrzeug (0,1) — (1,1) Einzelgarage → „fast alle" Fahrzeuge haben eine Garage (also nicht alle → min 0, max 1), jede Garage ist belegt (genau eines → (1,1)).',
          ],
        },
        {
          art: 'svg',
          titel: 'b) ER-Modell mit (min,max)-Angaben',
          svg: `<svg viewBox="0 0 820 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Fahrzeugverwaltung min-max">
  <line class="dgm-line" x1="140" y1="82" x2="168" y2="82"/>
  <line class="dgm-line" x1="292" y1="82" x2="360" y2="82"/>
  <line class="dgm-line" x1="470" y1="82" x2="520" y2="82"/>
  <line class="dgm-line" x1="620" y1="82" x2="690" y2="82"/>
  <line class="dgm-line" x1="415" y1="104" x2="415" y2="196"/>
  <line class="dgm-line" x1="415" y1="264" x2="415" y2="320"/>
  <rect class="dgm-shape" x="30" y="60" width="110" height="44" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="85" y="87" text-anchor="middle">Fahrer</text>
  <polygon class="dgm-shape" points="168,82 230,44 292,82 230,120"/>
  <text class="dgm-text dgm-text--sm" x="230" y="79" text-anchor="middle">hat_Fahr-</text>
  <text class="dgm-text dgm-text--sm" x="230" y="93" text-anchor="middle">erlaubnis</text>
  <rect class="dgm-shape" x="360" y="60" width="110" height="44" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="415" y="87" text-anchor="middle">Fahrzeug</text>
  <polygon class="dgm-shape" points="520,82 570,48 620,82 570,116"/>
  <text class="dgm-text dgm-text--sm" x="570" y="86" text-anchor="middle">gehört</text>
  <rect class="dgm-shape" x="690" y="60" width="110" height="44" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="745" y="87" text-anchor="middle">Abteilung</text>
  <polygon class="dgm-shape" points="365,230 415,196 465,230 415,264"/>
  <text class="dgm-text dgm-text--sm" x="415" y="234" text-anchor="middle">steht_in</text>
  <rect class="dgm-shape" x="355" y="320" width="120" height="44" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="415" y="347" text-anchor="middle">Einzelgarage</text>
  <text class="dgm-card" x="142" y="72">(0,*)</text>
  <text class="dgm-card" x="296" y="72">(3,*)</text>
  <text class="dgm-card" x="476" y="72">(0,1)</text>
  <text class="dgm-card" x="624" y="72">(1,*)</text>
  <text class="dgm-card" x="425" y="155">(0,1)</text>
  <text class="dgm-card" x="425" y="298">(1,1)</text>
</svg>`,
        },
      ],
    },
    {
      nr: 5,
      referenz: ['er-modell', 'min-max'],
      titel: 'Hausaufgabe 2 – Vielfliegerprogramm (Altklausur)',
      text:
        '(Altklausuraufgabe)\n\n' +
        'Nachfolgend finden Sie ein ER-Diagramm, welches einen Teil der Informationen zu den Vielfliegerprogrammen mehrerer Fluglinien (Fluggesellschaften), z.B. der Lufthansa, British Airways, Air France, etc. darstellt. Im folgenden Text sind die relevanten Sachverhalte und Regeln beschrieben, die zu dem ER-Diagramm geführt haben.\n' +
        'Analysieren Sie den folgenden Text sehr sorgfältig und vergleichen Sie ihn mit dem ER-Diagramm. Bei der Umsetzung des Textes wurden im Diagramm einige Angaben vergessen.\n\n' +
        'Ergänzen Sie fehlende Angaben/Elemente im ER-Diagramm!\n\n' +
        'Fluglinien werden eindeutig über einen Flugliniencode (FLC) identifiziert. Relevant sind darüber hinaus das Land und der Name der Fluglinie. Fluglinien bieten viele Flüge an. Jeder Flug wird von genau einer Fluglinie angeboten. Für jeden Flug soll auch der Typ (z.B. A380, B737, B747, etc.) des eingesetzten Flugzeugs und die Anzahl der Sitzplätze abgespeichert werden. Jede Fluglinie vergibt für jeden der von ihr angebotenen Flüge jeweils eine eindeutige Zahl, die Flugnummer (FNR). Unterschiedliche Fluggesellschaften können dieselben Zahlen verwenden. Daher ist zur weltweit eindeutigen Identifikation eines Fluges zusätzlich noch der Code der Fluglinie nötig. D.h. Flüge können nur von in der Datenbank erfassten Fluggesellschaften durchgeführt werden.\n' +
        'Wichtige Informationen für jeden Flug sind Startflughafen und Zielflughafen. In unserer Miniwelt gibt es nur Nonstop-Flüge, d.h. solche, die einen Startflughafen ohne Zwischenlandungen mit einem Zielflughafen verbinden. Nur Flughäfen, von denen wenigstens ein Flug startet und auf denen wenigstens ein Flug landet, sollen in die Datenbank aufgenommen werden. Jeder Flughafen hat einen weltweit eindeutigen Flughafencode (FHC). Wichtige Informationen sind auch dessen Name und der Ort des Flughafens.\n' +
        'In der Datenbank werden nur Passagiere abgespeichert, die am Vielfliegerprogramm von wenigstens einer Fluglinie teilnehmen. Kein Passagier nimmt am Vielfliegerprogramm von mehr als 3 Fluggesellschaften teil. Jeder Teilnahme am Vielfliegerprogramm ist ein Status zugeordnet, z.B. Gold, Silber, Bronze. Es gibt Fluglinien, an deren Vielfliegerprogrammen zeitweise keine Passagiere teilnehmen.\n' +
        'Jeder Passagier hat genau eine Lieblingsfluggesellschaft.\n' +
        'Passagiere werden in unserer Miniwelt als Kunden bezeichnet. Zu jedem Kunden sind dessen Kundennummer (KDNR), sein Name und seine Adresse zu speichern. Die Kundennummer ist weltweit eindeutig. Die Passagiere (Kunden) werden in zwei disjunkte Gruppen aufgeteilt, und zwar Personen und Firmen. Zusätzliche Eigenschaften von Firmen sind der Firmensitz und die Firmengröße. Zusätzliche Eigenschaften von Personen sind Alter und Sternzeichen.',
      loesung: [
        {
          art: 'unterpunkt',
          label: 'Was ergänzt werden muss',
          text: 'Aus dem Text ergeben sich die folgenden Korrekturen/Ergänzungen:',
          punkte: [
            'Flug ist eine schwache Entität (Doppelrechteck): FNR ist nur innerhalb einer Fluglinie eindeutig (partieller Schlüssel), daher ist anbieten eine identifizierende Beziehung.',
            'anbieten: Fluglinie (0,*) — (1,1) Flug (jeder Flug genau einer Fluglinie).',
            'Vielflieger: Fluglinie (0,*) — (1,3) Kunde, Attribut Status (jeder Kunde nimmt an 1–3 Programmen teil; es gibt Fluglinien ohne Teilnehmer → min 0).',
            'Lieblingsgesellschaft: Fluglinie (0,*) — (1,1) Kunde (jeder Kunde genau eine Lieblingsgesellschaft).',
            'Start und Ziel: Flug (1,1) — (1,*) Flughafen (jeder Flug hat genau einen Start- und einen Zielflughafen; nur Flughäfen mit mind. einem Start bzw. Ziel werden erfasst).',
            'Generalisierung Kunde → Person / Firma als IS-A (disjunkt: ein Kunde ist entweder Person oder Firma).',
            'Schlüssel: FLC (Fluglinie), FNR (partiell, Flug), FHC (Flughafen), KDNR (Kunde).',
          ],
        },
        {
          art: 'svg',
          titel: 'Vollständiges ER-Diagramm Vielfliegerprogramm',
          svg: `<svg viewBox="0 0 980 730" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ER-Diagramm Vielfliegerprogramm">
  <line class="dgm-line" x1="120" y1="170" x2="180" y2="192"/>
  <line class="dgm-line" x1="118" y1="205" x2="180" y2="205"/>
  <line class="dgm-line" x1="120" y1="240" x2="180" y2="218"/>
  <line class="dgm-line" x1="280" y1="180" x2="430" y2="138"/>
  <line class="dgm-line" x1="550" y1="120" x2="720" y2="182"/>
  <line class="dgm-line" x1="320" y1="205" x2="422" y2="205"/>
  <line class="dgm-line" x1="538" y1="205" x2="680" y2="205"/>
  <line class="dgm-line" x1="480" y1="243" x2="480" y2="272"/>
  <line class="dgm-line" x1="250" y1="230" x2="250" y2="294"/>
  <line class="dgm-line" x1="250" y1="366" x2="250" y2="420"/>
  <line class="dgm-line" x1="222" y1="470" x2="192" y2="528"/>
  <line class="dgm-line" x1="288" y1="470" x2="330" y2="528"/>
  <line class="dgm-line" x1="175" y1="594" x2="220" y2="640"/>
  <line class="dgm-line" x1="340" y1="594" x2="300" y2="640"/>
  <line class="dgm-line" x1="860" y1="172" x2="820" y2="192"/>
  <line class="dgm-line" x1="865" y1="205" x2="820" y2="205"/>
  <line class="dgm-line" x1="865" y1="240" x2="820" y2="220"/>
  <line class="dgm-line" x1="750" y1="230" x2="750" y2="292"/>
  <line class="dgm-line" x1="722" y1="345" x2="668" y2="440"/>
  <line class="dgm-line" x1="778" y1="345" x2="838" y2="440"/>
  <line class="dgm-line" x1="630" y1="490" x2="618" y2="522"/>
  <line class="dgm-line" x1="690" y1="490" x2="708" y2="525"/>
  <line class="dgm-line" x1="820" y1="490" x2="808" y2="522"/>
  <line class="dgm-line" x1="880" y1="490" x2="898" y2="525"/>
  <line class="dgm-line" x1="130" y1="430" x2="190" y2="440"/>
  <line class="dgm-line" x1="120" y1="460" x2="185" y2="455"/>
  <line class="dgm-line" x1="130" y1="492" x2="190" y2="470"/>
  <line class="dgm-line" x1="200" y1="690" x2="170" y2="710"/>
  <line class="dgm-line" x1="260" y1="690" x2="260" y2="712"/>
  <line class="dgm-line" x1="320" y1="690" x2="350" y2="710"/>
  <ellipse class="dgm-shape" cx="82" cy="160" rx="34" ry="16"/>
  <text class="dgm-key" x="82" y="165" text-anchor="middle">FLC</text>
  <ellipse class="dgm-shape" cx="76" cy="205" rx="34" ry="16"/>
  <text class="dgm-text dgm-text--sm" x="76" y="210" text-anchor="middle">Land</text>
  <ellipse class="dgm-shape" cx="82" cy="250" rx="34" ry="16"/>
  <text class="dgm-text dgm-text--sm" x="82" y="255" text-anchor="middle">Name</text>
  <rect class="dgm-shape" x="180" y="180" width="140" height="50" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="250" y="209" text-anchor="middle">Fluglinie</text>
  <polygon class="dgm-shape" points="410,120 480,80 550,120 480,160"/>
  <text class="dgm-text dgm-text--sm" x="480" y="117" text-anchor="middle">Lieblings-</text>
  <text class="dgm-text dgm-text--sm" x="480" y="131" text-anchor="middle">gesellschaft</text>
  <polygon class="dgm-shape" points="422,205 480,167 538,205 480,243"/>
  <text class="dgm-text dgm-text--sm" x="480" y="209" text-anchor="middle">Vielflieger</text>
  <ellipse class="dgm-shape" cx="480" cy="288" rx="34" ry="16"/>
  <text class="dgm-text dgm-text--sm" x="480" y="293" text-anchor="middle">Status</text>
  <rect class="dgm-shape" x="680" y="180" width="140" height="50" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="750" y="209" text-anchor="middle">Kunde</text>
  <ellipse class="dgm-shape" cx="908" cy="166" rx="36" ry="16"/>
  <text class="dgm-key" x="908" y="171" text-anchor="middle">KDNR</text>
  <ellipse class="dgm-shape" cx="912" cy="205" rx="34" ry="16"/>
  <text class="dgm-text dgm-text--sm" x="912" y="210" text-anchor="middle">Name</text>
  <ellipse class="dgm-shape" cx="912" cy="244" rx="36" ry="16"/>
  <text class="dgm-text dgm-text--sm" x="912" y="249" text-anchor="middle">Adresse</text>
  <polygon class="dgm-shape" points="200,330 250,296 300,330 250,364"/>
  <polygon class="dgm-shape" points="210,330 250,303 290,330 250,357"/>
  <text class="dgm-text dgm-text--sm" x="250" y="334" text-anchor="middle">anbieten</text>
  <rect class="dgm-shape" x="185" y="420" width="130" height="50" rx="3"/>
  <rect class="dgm-shape" x="190" y="425" width="120" height="40" rx="2"/>
  <text class="dgm-text dgm-text--sm" x="250" y="449" text-anchor="middle">Flug</text>
  <ellipse class="dgm-shape" cx="86" cy="415" rx="34" ry="16"/>
  <text class="dgm-key" x="86" y="420" text-anchor="middle">FNR</text>
  <ellipse class="dgm-shape" cx="80" cy="455" rx="32" ry="16"/>
  <text class="dgm-text dgm-text--sm" x="80" y="460" text-anchor="middle">Typ</text>
  <ellipse class="dgm-shape" cx="86" cy="495" rx="40" ry="16"/>
  <text class="dgm-text dgm-text--sm" x="86" y="500" text-anchor="middle">Sitzplätze</text>
  <polygon class="dgm-shape" points="127,560 175,526 223,560 175,594"/>
  <text class="dgm-text dgm-text--sm" x="175" y="564" text-anchor="middle">Start</text>
  <polygon class="dgm-shape" points="292,560 340,526 388,560 340,594"/>
  <text class="dgm-text dgm-text--sm" x="340" y="564" text-anchor="middle">Ziel</text>
  <rect class="dgm-shape" x="190" y="640" width="140" height="50" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="260" y="669" text-anchor="middle">Flughafen</text>
  <ellipse class="dgm-shape" cx="135" cy="710" rx="32" ry="16"/>
  <text class="dgm-key" x="135" y="715" text-anchor="middle">FHC</text>
  <ellipse class="dgm-shape" cx="260" cy="715" rx="34" ry="16"/>
  <text class="dgm-text dgm-text--sm" x="260" y="720" text-anchor="middle">Name</text>
  <ellipse class="dgm-shape" cx="385" cy="710" rx="30" ry="16"/>
  <text class="dgm-text dgm-text--sm" x="385" y="715" text-anchor="middle">Ort</text>
  <polygon class="dgm-shape" points="750,292 786,320 750,348 714,320"/>
  <text class="dgm-text dgm-text--sm" x="750" y="324" text-anchor="middle">IS-A</text>
  <rect class="dgm-shape" x="600" y="440" width="120" height="50" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="660" y="469" text-anchor="middle">Person</text>
  <rect class="dgm-shape" x="790" y="440" width="120" height="50" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="850" y="469" text-anchor="middle">Firma</text>
  <ellipse class="dgm-shape" cx="610" cy="538" rx="32" ry="16"/>
  <text class="dgm-text dgm-text--sm" x="610" y="543" text-anchor="middle">Alter</text>
  <ellipse class="dgm-shape" cx="716" cy="540" rx="40" ry="17"/>
  <text class="dgm-text dgm-text--sm" x="716" y="538" text-anchor="middle">Stern-</text>
  <text class="dgm-text dgm-text--sm" x="716" y="551" text-anchor="middle">zeichen</text>
  <ellipse class="dgm-shape" cx="800" cy="538" rx="40" ry="16"/>
  <text class="dgm-text dgm-text--sm" x="800" y="543" text-anchor="middle">Firmensitz</text>
  <ellipse class="dgm-shape" cx="906" cy="540" rx="40" ry="17"/>
  <text class="dgm-text dgm-text--sm" x="906" y="538" text-anchor="middle">Firmen-</text>
  <text class="dgm-text dgm-text--sm" x="906" y="551" text-anchor="middle">größe</text>
  <text class="dgm-card" x="338" y="145">(0,*)</text>
  <text class="dgm-card" x="588" y="140">(1,1)</text>
  <text class="dgm-card" x="352" y="197">(0,*)</text>
  <text class="dgm-card" x="600" y="197">(1,3)</text>
  <text class="dgm-card" x="262" y="262">(0,*)</text>
  <text class="dgm-card" x="262" y="398">(1,1)</text>
  <text class="dgm-card" x="150" y="512">(1,1)</text>
  <text class="dgm-card" x="352" y="512">(1,1)</text>
  <text class="dgm-card" x="150" y="622">(1,*)</text>
  <text class="dgm-card" x="352" y="622">(1,*)</text>
</svg>`,
        },
        {
          art: 'text',
          text:
            'Lesehilfe IS-A: Die Untertypen Person und Firma erben alle Attribute von Kunde (KDNR, Name, Adresse) und ' +
            'ergänzen eigene (Person: Alter, Sternzeichen; Firma: Firmensitz, Firmengröße). „Disjunkt" heißt: jeder Kunde ' +
            'ist genau eines von beidem.',
        },
      ],
    },
  ],
}
