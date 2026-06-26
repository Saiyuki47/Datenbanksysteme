import type { Uebungsblatt } from '../../types'

export const blatt2: Uebungsblatt = {
  id: 'blatt2',
  nr: '2',
  typ: 'Gruppen- & Hausaufgaben',
  beschreibung:
    'Entity-Relationship-Modellierung: binäre Beziehungstypen mit Funktionalität, Konsistenzbedingungen und partiellen ' +
    'Funktionen, ein vollständiges ER-Diagramm für eine Apothekenkette sowie mehrere kleinere ER-Modelle. Dazu partielle ' +
    'Funktionen ternärer Beziehungen und alternative Entwürfe (ternär ↔ binär, Beziehung ↔ Entitytyp, Attribut ↔ Entitytyp).',
  tasks: [
    {
      nr: 1,
      titel: 'Gruppenaufgabe 1',
      text:
        'Welche binären Beziehungstypen werden hinsichtlich ihrer Funktionalität in einem ER-Diagramm unterschieden?\n' +
        '• Finden Sie für jeden Beziehungstypen ein geeignetes Beispiel und stellen Sie dieses in einem ER-Modell dar.\n' +
        '• Drücken Sie jeweils die Konsistenzbedingungen der Beziehung in Sätzen aus.\n' +
        '• Geben Sie jeweils die in der Beziehung geltenden partiellen Funktionen an.',
      loesung: [
        {
          art: 'text',
          text:
            'Die Funktionalität (Kardinalität) einer Beziehung gibt an, mit wie vielen Entitäten der einen Seite ' +
            'eine Entität der anderen Seite in Beziehung stehen kann. Bei binären Beziehungen (genau zwei beteiligte ' +
            'Entitytypen) unterscheidet man vier Fälle. Eine partielle Funktion E1 → E2 besteht, wenn jeder Wert von E1 ' +
            'höchstens einen Wert von E2 festlegt.',
        },
        {
          art: 'unterpunkt',
          label: '1:1 (eins-zu-eins)',
          text: 'Jeder Entität der einen Seite ist höchstens eine Entität der anderen Seite zugeordnet – und umgekehrt.',
          punkte: [
            'Beispiel: Land — hat — Hauptstadt (siehe ER-Modell unten).',
            'Konsistenzbedingung: Jedes Land hat höchstens eine Hauptstadt, und jede Hauptstadt ist Hauptstadt höchstens eines Landes.',
            'Partielle Funktionen: Land → Hauptstadt UND Hauptstadt → Land (beide Richtungen sind Funktionen).',
          ],
        },
        {
          art: 'unterpunkt',
          label: '1:N (eins-zu-viele)',
          text: 'Einer Entität A können mehrere Entitäten B zugeordnet sein, jedem B aber nur genau ein A.',
          punkte: [
            'Beispiel: Abteilung — hat — Mitarbeiter.',
            'Konsistenzbedingung: Jeder Mitarbeiter gehört zu höchstens einer Abteilung; eine Abteilung kann beliebig viele Mitarbeiter haben.',
            'Partielle Funktion: Mitarbeiter → Abteilung (die „viele"-Seite bestimmt die „eins"-Seite). Abteilung → Mitarbeiter ist KEINE Funktion.',
          ],
        },
        {
          art: 'unterpunkt',
          label: 'N:1 (viele-zu-eins)',
          text: 'Dies ist dieselbe Beziehung wie 1:N, nur aus der Sicht der „vielen"-Seite gelesen. 1:N und N:1 bezeichnen also keine zwei verschiedenen Beziehungen, sondern dieselbe Beziehung in unterschiedlicher Leserichtung.',
          punkte: [
            'Beispiel: Mitarbeiter — gehört zu — Abteilung (viele Mitarbeiter zu einer Abteilung).',
            'Konsistenzbedingung: identisch zu 1:N, nur andersherum formuliert.',
            'Partielle Funktion: Mitarbeiter → Abteilung (wie bei 1:N).',
          ],
        },
        {
          art: 'unterpunkt',
          label: 'N:M (viele-zu-viele)',
          text: 'Mehrere Entitäten A können mit mehreren Entitäten B in Beziehung stehen. N:M-Beziehungen können eigene Attribute tragen (z. B. eine Note an der Beziehung „prüfen").',
          punkte: [
            'Beispiel: Student — hört — Vorlesung.',
            'Konsistenzbedingung: keine – ein Student kann beliebig viele Vorlesungen hören und eine Vorlesung beliebig viele Hörer haben.',
            'Partielle Funktionen: KEINE (weder Student → Vorlesung noch Vorlesung → Student ist eine Funktion).',
          ],
        },
        {
          art: 'svg',
          titel: 'Die drei Grundformen in Chen-Notation',
          svg: `<svg viewBox="0 0 700 330" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="1:1-, 1:N- und N:M-Beziehung">
  <line class="dgm-line" x1="136" y1="55" x2="256" y2="55"/>
  <line class="dgm-line" x1="344" y1="55" x2="454" y2="55"/>
  <line class="dgm-line" x1="150" y1="160" x2="256" y2="160"/>
  <line class="dgm-line" x1="344" y1="160" x2="454" y2="160"/>
  <line class="dgm-line" x1="150" y1="265" x2="256" y2="265"/>
  <line class="dgm-line" x1="344" y1="265" x2="454" y2="265"/>
  <rect class="dgm-shape" x="40" y="35" width="96" height="40" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="88" y="60" text-anchor="middle">Land</text>
  <polygon class="dgm-shape" points="256,55 300,29 344,55 300,81"/>
  <text class="dgm-text dgm-text--sm" x="300" y="59" text-anchor="middle">hat</text>
  <rect class="dgm-shape" x="454" y="35" width="120" height="40" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="514" y="60" text-anchor="middle">Hauptstadt</text>
  <rect class="dgm-shape" x="40" y="140" width="110" height="40" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="95" y="165" text-anchor="middle">Abteilung</text>
  <polygon class="dgm-shape" points="256,160 300,134 344,160 300,186"/>
  <text class="dgm-text dgm-text--sm" x="300" y="164" text-anchor="middle">hat</text>
  <rect class="dgm-shape" x="454" y="140" width="120" height="40" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="514" y="165" text-anchor="middle">Mitarbeiter</text>
  <rect class="dgm-shape" x="40" y="245" width="110" height="40" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="95" y="270" text-anchor="middle">Student</text>
  <polygon class="dgm-shape" points="256,265 300,239 344,265 300,291"/>
  <text class="dgm-text dgm-text--sm" x="300" y="269" text-anchor="middle">hört</text>
  <rect class="dgm-shape" x="454" y="245" width="120" height="40" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="514" y="270" text-anchor="middle">Vorlesung</text>
  <text class="dgm-card" x="168" y="48">1</text>
  <text class="dgm-card" x="424" y="48">1</text>
  <text class="dgm-card" x="168" y="153">1</text>
  <text class="dgm-card" x="424" y="153">N</text>
  <text class="dgm-card" x="168" y="258">N</text>
  <text class="dgm-card" x="424" y="258">M</text>
  <text class="dgm-lbl" x="600" y="60">1 : 1</text>
  <text class="dgm-lbl" x="600" y="165">1 : N</text>
  <text class="dgm-lbl" x="600" y="270">N : M</text>
</svg>`,
        },
      ],
    },
    {
      nr: 2,
      titel: 'Gruppenaufgabe 2 – Apothekenkette „Prescriptions-4-U"',
      text:
        'Entwerfen Sie für die Apothekenkette eine Datenbank.\n\n' +
        '1) Erstellen Sie ein ER-Diagramm: a) Entitäten und Attribute, b) Beziehungen (samt Attributen), ' +
        'c) Funktionalitäten (1:1, 1:N, N:1, N:M), d) ggf. Einschränkungen.\n' +
        '2) Wie ändert sich das Diagramm, wenn jedes Medikament in allen Apotheken zu einem festen Preis verkauft wird?\n' +
        '3) Wie ändert sich das Diagramm, wenn mehrfach verschriebene Rezepte (gleicher Arzt, gleicher Patient, gleiches Medikament) alle separat gespeichert werden sollen?',
      loesung: [
        {
          art: 'unterpunkt',
          label: 'a) Entitäten & Attribute',
          text: 'Aus den Anforderungen ergeben sich fünf Entitytypen (Schlüssel unterstrichen):',
          punkte: [
            'Patient ( ssn, name, address, age )',
            'Doctor ( Phy_ssn, name, speciality, Exp_years )',
            'Pharmacy ( name, address, Phone_num )',
            'Pharm_co (pharmazeutisches Unternehmen) ( Name, Phone_num )',
            'Drug – schwache Entität ( Trade_name, formula ): Der Handelsname identifiziert ein Medikament nur INNERHALB eines Unternehmens eindeutig, daher ist Trade_name nur ein partieller Schlüssel.',
          ],
        },
        {
          art: 'unterpunkt',
          label: 'b/c) Beziehungen & Funktionalitäten',
          text: 'Die folgenden Beziehungen verbinden die Entitäten:',
          punkte: [
            'Pri_physician: Patient — Doctor mit N:1 (jeder Patient hat genau einen Primärarzt, ein Arzt hat mehrere Patienten).',
            'Prescription (Rezept): ternäre Beziehung Patient — Doctor — Drug mit den Attributen date und quantity. Ein Arzt verschreibt mehreren Patienten Medikamente, ein Patient erhält von mehreren Ärzten Medikamente.',
            'Sell: Pharmacy — Drug mit N:M und dem Attribut price (eine Apotheke verkauft viele Medikamente, ein Medikament wird in vielen Apotheken verkauft, der Preis variiert je Apotheke).',
            'Make: Drug — Pharm_co mit N:1 – eine identifizierende Beziehung (Doppelraute), weil Drug eine schwache Entität ist und erst zusammen mit dem herstellenden Unternehmen eindeutig wird.',
            'Contract: Pharmacy — Pharm_co mit N:M und den Attributen Start_date, End_date und Text (langfristige Verträge).',
          ],
        },
        {
          art: 'unterpunkt',
          label: 'd) Einschränkungen',
          text: 'Zwei Bedingungen aus dem Text werden über die Modellierung ausgedrückt:',
          punkte: [
            'Drug ist eine schwache Entität (existenzabhängig von Pharm_co über die identifizierende Beziehung Make) – „wird ein Unternehmen gelöscht, müssen dessen Produkte nicht mehr erfasst werden".',
            'Da nur das jeweils letzte Rezept gespeichert wird, ist date KEIN Schlüsselbestandteil von Prescription; das Tripel (Patient, Doctor, Drug) bestimmt eindeutig ein Rezept.',
          ],
        },
        {
          art: 'svg',
          titel: 'ER-Diagramm der Apothekenkette',
          svg: `<svg viewBox="0 0 940 800" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ER-Diagramm Prescriptions-4-U">
  <line class="dgm-line" x1="120" y1="89" x2="180" y2="150"/>
  <line class="dgm-line" x1="215" y1="75" x2="210" y2="150"/>
  <line class="dgm-line" x1="305" y1="87" x2="245" y2="150"/>
  <line class="dgm-line" x1="102" y1="150" x2="150" y2="162"/>
  <line class="dgm-line" x1="665" y1="84" x2="720" y2="150"/>
  <line class="dgm-line" x1="760" y1="72" x2="760" y2="150"/>
  <line class="dgm-line" x1="845" y1="84" x2="800" y2="150"/>
  <line class="dgm-line" x1="843" y1="140" x2="820" y2="158"/>
  <line class="dgm-line" x1="270" y1="173" x2="398" y2="173"/>
  <line class="dgm-line" x1="542" y1="173" x2="700" y2="173"/>
  <line class="dgm-line" x1="210" y1="196" x2="425" y2="306"/>
  <line class="dgm-line" x1="760" y1="196" x2="522" y2="312"/>
  <line class="dgm-line" x1="470" y1="437" x2="470" y2="386"/>
  <line class="dgm-line" x1="608" y1="322" x2="548" y2="335"/>
  <line class="dgm-line" x1="623" y1="378" x2="546" y2="352"/>
  <line class="dgm-line" x1="593" y1="443" x2="535" y2="452"/>
  <line class="dgm-line" x1="608" y1="490" x2="535" y2="470"/>
  <line class="dgm-line" x1="90" y1="414" x2="140" y2="437"/>
  <line class="dgm-line" x1="97" y1="461" x2="120" y2="460"/>
  <line class="dgm-line" x1="95" y1="506" x2="145" y2="483"/>
  <line class="dgm-line" x1="240" y1="460" x2="268" y2="460"/>
  <line class="dgm-line" x1="372" y1="460" x2="405" y2="460"/>
  <line class="dgm-line" x1="320" y1="494" x2="320" y2="531"/>
  <line class="dgm-line" x1="470" y1="483" x2="470" y2="545"/>
  <line class="dgm-line" x1="470" y1="625" x2="470" y2="665"/>
  <line class="dgm-line" x1="425" y1="733" x2="452" y2="711"/>
  <line class="dgm-line" x1="548" y1="733" x2="510" y2="711"/>
  <line class="dgm-line" x1="180" y1="483" x2="205" y2="578"/>
  <line class="dgm-line" x1="273" y1="615" x2="410" y2="685"/>
  <line class="dgm-line" x1="117" y1="585" x2="160" y2="603"/>
  <line class="dgm-line" x1="102" y1="635" x2="158" y2="623"/>
  <line class="dgm-line" x1="118" y1="688" x2="165" y2="648"/>
  <ellipse class="dgm-shape" cx="120" cy="72" rx="36" ry="17"/>
  <ellipse class="dgm-shape" cx="215" cy="58" rx="32" ry="16"/>
  <ellipse class="dgm-shape" cx="310" cy="72" rx="36" ry="17"/>
  <ellipse class="dgm-shape" cx="60" cy="150" rx="40" ry="17"/>
  <rect class="dgm-shape" x="150" y="150" width="120" height="46" rx="4"/>
  <ellipse class="dgm-shape" cx="655" cy="68" rx="42" ry="17"/>
  <ellipse class="dgm-shape" cx="760" cy="55" rx="34" ry="16"/>
  <ellipse class="dgm-shape" cx="855" cy="68" rx="46" ry="17"/>
  <ellipse class="dgm-shape" cx="885" cy="140" rx="48" ry="17"/>
  <rect class="dgm-shape" x="700" y="150" width="120" height="46" rx="4"/>
  <polygon class="dgm-shape" points="398,173 470,133 542,173 470,213"/>
  <polygon class="dgm-shape" points="392,340 470,294 548,340 470,386"/>
  <ellipse class="dgm-shape" cx="650" cy="320" rx="36" ry="16"/>
  <ellipse class="dgm-shape" cx="665" cy="378" rx="42" ry="16"/>
  <rect class="dgm-shape" x="405" y="437" width="130" height="46" rx="3"/>
  <rect class="dgm-shape" x="410" y="442" width="120" height="36" rx="2"/>
  <ellipse class="dgm-shape" cx="635" cy="440" rx="48" ry="17"/>
  <ellipse class="dgm-shape" cx="650" cy="492" rx="42" ry="16"/>
  <ellipse class="dgm-shape" cx="70" cy="400" rx="36" ry="16"/>
  <ellipse class="dgm-shape" cx="55" cy="462" rx="42" ry="16"/>
  <ellipse class="dgm-shape" cx="75" cy="520" rx="46" ry="16"/>
  <rect class="dgm-shape" x="120" y="437" width="120" height="46" rx="4"/>
  <polygon class="dgm-shape" points="268,460 320,426 372,460 320,494"/>
  <ellipse class="dgm-shape" cx="320" cy="548" rx="34" ry="16"/>
  <polygon class="dgm-shape" points="412,585 470,545 528,585 470,625"/>
  <polygon class="dgm-shape" points="424,585 470,553 516,585 470,617"/>
  <rect class="dgm-shape" x="410" y="665" width="120" height="46" rx="4"/>
  <ellipse class="dgm-shape" cx="410" cy="748" rx="38" ry="16"/>
  <ellipse class="dgm-shape" cx="560" cy="748" rx="46" ry="16"/>
  <polygon class="dgm-shape" points="157,615 215,575 273,615 215,655"/>
  <ellipse class="dgm-shape" cx="75" cy="585" rx="48" ry="16"/>
  <ellipse class="dgm-shape" cx="60" cy="635" rx="44" ry="16"/>
  <ellipse class="dgm-shape" cx="80" cy="690" rx="34" ry="16"/>
  <text class="dgm-key" x="120" y="77" text-anchor="middle">ssn</text>
  <text class="dgm-text dgm-text--sm" x="215" y="63" text-anchor="middle">age</text>
  <text class="dgm-text dgm-text--sm" x="310" y="77" text-anchor="middle">name</text>
  <text class="dgm-text dgm-text--sm" x="60" y="155" text-anchor="middle">address</text>
  <text class="dgm-text" x="210" y="179" text-anchor="middle">Patient</text>
  <text class="dgm-key" x="655" y="73" text-anchor="middle">Phy_ssn</text>
  <text class="dgm-text dgm-text--sm" x="760" y="60" text-anchor="middle">name</text>
  <text class="dgm-text dgm-text--sm" x="855" y="73" text-anchor="middle">speciality</text>
  <text class="dgm-text dgm-text--sm" x="885" y="145" text-anchor="middle">Exp_years</text>
  <text class="dgm-text" x="760" y="179" text-anchor="middle">Doctor</text>
  <text class="dgm-text dgm-text--sm" x="470" y="177" text-anchor="middle">Pri_physician</text>
  <text class="dgm-text dgm-text--sm" x="470" y="344" text-anchor="middle">Prescription</text>
  <text class="dgm-text dgm-text--sm" x="650" y="325" text-anchor="middle">date</text>
  <text class="dgm-text dgm-text--sm" x="665" y="383" text-anchor="middle">quantity</text>
  <text class="dgm-text" x="470" y="466" text-anchor="middle">Drug</text>
  <text class="dgm-key" x="635" y="445" text-anchor="middle">Trade_name</text>
  <text class="dgm-text dgm-text--sm" x="650" y="497" text-anchor="middle">formula</text>
  <text class="dgm-key" x="70" y="405" text-anchor="middle">name</text>
  <text class="dgm-text dgm-text--sm" x="55" y="467" text-anchor="middle">address</text>
  <text class="dgm-text dgm-text--sm" x="75" y="525" text-anchor="middle">Phone_num</text>
  <text class="dgm-text" x="180" y="466" text-anchor="middle">Pharmacy</text>
  <text class="dgm-text dgm-text--sm" x="320" y="464" text-anchor="middle">Sell</text>
  <text class="dgm-text dgm-text--sm" x="320" y="553" text-anchor="middle">price</text>
  <text class="dgm-text dgm-text--sm" x="470" y="589" text-anchor="middle">Make</text>
  <text class="dgm-text" x="470" y="691" text-anchor="middle">Pharm_co</text>
  <text class="dgm-key" x="410" y="753" text-anchor="middle">Name</text>
  <text class="dgm-text dgm-text--sm" x="560" y="753" text-anchor="middle">Phone_num</text>
  <text class="dgm-text dgm-text--sm" x="215" y="619" text-anchor="middle">Contract</text>
  <text class="dgm-text dgm-text--sm" x="75" y="590" text-anchor="middle">Start_date</text>
  <text class="dgm-text dgm-text--sm" x="60" y="640" text-anchor="middle">End_date</text>
  <text class="dgm-text dgm-text--sm" x="80" y="695" text-anchor="middle">Text</text>
  <text class="dgm-card" x="285" y="166">N</text>
  <text class="dgm-card" x="675" y="166">1</text>
  <text class="dgm-card" x="290" y="250">M</text>
  <text class="dgm-card" x="645" y="250">N</text>
  <text class="dgm-card" x="480" y="415">O</text>
  <text class="dgm-card" x="248" y="452">N</text>
  <text class="dgm-card" x="384" y="452">M</text>
  <text class="dgm-card" x="480" y="515">N</text>
  <text class="dgm-card" x="480" y="650">1</text>
  <text class="dgm-card" x="160" y="540">N</text>
  <text class="dgm-card" x="345" y="650">M</text>
</svg>`,
        },
        {
          art: 'unterpunkt',
          label: 'Teil 2 – fester Preis je Medikament',
          text: 'price wird dann ein Attribut der Entität Drug statt ein Attribut der Beziehung Sell. Der Preis hängt nicht mehr von der Apotheke ab, sondern nur noch vom Medikament; die Beziehung Sell behält lediglich „welche Apotheke verkauft welches Medikament".',
        },
        {
          art: 'unterpunkt',
          label: 'Teil 3 – jedes Rezept separat speichern',
          text: 'date muss Teil des Schlüssels der Beziehung Prescription werden, damit dasselbe (Arzt, Patient, Medikament) zu unterschiedlichen Daten mehrfach gespeichert werden kann. Alternativ führt man eine eigene Entität Prescription_no (eindeutige Rezeptnummer) ein – Prescription wird dann zu einer quartären Beziehung.',
        },
      ],
    },
    {
      nr: 3,
      titel: 'Hausaufgabe 1 – ER-Diagramme zu drei Sachverhalten',
      text:
        'Erstellen Sie für jeden Sachverhalt ein ER-Diagramm (Entitäten, Beziehungen mit Funktionalitäten 1:1/1:N/N:1/N:M, ggf. Attribute).\n\n' +
        'a) (Altklausur) Bibliothek: Buchtitel und Buchexemplare; zu einem Titel mehrere Exemplare. Ausleiher leihen Buchexemplare und können Buchtitel vormerken. Jedes Buch kann einen oder mehrere Autoren haben.\n' +
        'b) Autos werden von einem Hersteller hergestellt. Autos haben höchstens einen Fahrzeughalter; auf einen Halter können mehrere Autos eingetragen sein.\n' +
        'c) LinkedIn: Personenprofile (Vorname, Nachname, eindeutige E-Mail) vernetzen sich untereinander. Unternehmensprofile (eindeutiger Name, Slogan) werden von mind. einem Personenprofil administriert; Personen können mehrere administrieren, Unternehmen folgen und eines als aktuellen Arbeitgeber angeben.',
      loesung: [
        {
          art: 'unterpunkt',
          label: 'a) Bibliothek',
          text: 'Vier Entitytypen mit den Beziehungen: schreiben (Autor N:M Buchtitel), zugeordnet (Buchtitel 1:N Buchexemplar), ausleihen (Ausleiher 1:N Buchexemplar) und vormerken (Ausleiher M:N Buchtitel).',
        },
        {
          art: 'svg',
          titel: 'a) ER-Diagramm Bibliothek',
          svg: `<svg viewBox="0 0 640 470" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ER-Diagramm Bibliothek">
  <line class="dgm-line" x1="100" y1="84" x2="100" y2="166"/>
  <line class="dgm-line" x1="100" y1="234" x2="100" y2="320"/>
  <line class="dgm-line" x1="525" y1="84" x2="525" y2="166"/>
  <line class="dgm-line" x1="525" y1="234" x2="525" y2="320"/>
  <line class="dgm-line" x1="160" y1="342" x2="255" y2="342"/>
  <line class="dgm-line" x1="365" y1="342" x2="455" y2="342"/>
  <line class="dgm-line" x1="460" y1="84" x2="350" y2="150"/>
  <line class="dgm-line" x1="120" y1="320" x2="272" y2="172"/>
  <rect class="dgm-shape" x="40" y="40" width="120" height="44" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="100" y="67" text-anchor="middle">Autor</text>
  <polygon class="dgm-shape" points="56,200 100,168 144,200 100,232"/>
  <text class="dgm-text dgm-text--sm" x="100" y="204" text-anchor="middle">schreiben</text>
  <rect class="dgm-shape" x="40" y="320" width="120" height="44" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="100" y="347" text-anchor="middle">Buchtitel</text>
  <rect class="dgm-shape" x="460" y="40" width="130" height="44" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="525" y="67" text-anchor="middle">Ausleiher</text>
  <polygon class="dgm-shape" points="481,200 525,168 569,200 525,232"/>
  <text class="dgm-text dgm-text--sm" x="525" y="204" text-anchor="middle">ausleihen</text>
  <rect class="dgm-shape" x="455" y="320" width="140" height="44" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="525" y="347" text-anchor="middle">Buchexemplar</text>
  <polygon class="dgm-shape" points="255,342 310,310 365,342 310,374"/>
  <text class="dgm-text dgm-text--sm" x="310" y="346" text-anchor="middle">zugeordnet</text>
  <polygon class="dgm-shape" points="256,150 310,118 364,150 310,182"/>
  <text class="dgm-text dgm-text--sm" x="310" y="154" text-anchor="middle">vormerken</text>
  <text class="dgm-card" x="108" y="120">N</text>
  <text class="dgm-card" x="108" y="280">M</text>
  <text class="dgm-card" x="533" y="120">1</text>
  <text class="dgm-card" x="533" y="280">N</text>
  <text class="dgm-card" x="180" y="334">1</text>
  <text class="dgm-card" x="435" y="334">N</text>
  <text class="dgm-card" x="420" y="100">M</text>
  <text class="dgm-card" x="185" y="250">N</text>
</svg>`,
        },
        {
          art: 'unterpunkt',
          label: 'b) Autos',
          text: 'Drei Entitytypen: herstellen (Auto N:1 Hersteller – ein Auto stammt von genau einem Hersteller) und eingetragen (Auto N:1 Fahrzeughalter – jedes Auto hat höchstens einen Halter, ein Halter mehrere Autos).',
        },
        {
          art: 'svg',
          titel: 'b) ER-Diagramm Autos',
          svg: `<svg viewBox="0 0 620 390" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ER-Diagramm Autos">
  <line class="dgm-line" x1="180" y1="82" x2="266" y2="82"/>
  <line class="dgm-line" x1="374" y1="82" x2="460" y2="82"/>
  <line class="dgm-line" x1="120" y1="104" x2="120" y2="206"/>
  <line class="dgm-line" x1="120" y1="274" x2="120" y2="320"/>
  <rect class="dgm-shape" x="60" y="60" width="120" height="44" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="120" y="87" text-anchor="middle">Auto</text>
  <polygon class="dgm-shape" points="266,82 320,50 374,82 320,114"/>
  <text class="dgm-text dgm-text--sm" x="320" y="86" text-anchor="middle">herstellen</text>
  <rect class="dgm-shape" x="460" y="60" width="130" height="44" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="525" y="87" text-anchor="middle">Hersteller</text>
  <polygon class="dgm-shape" points="76,240 120,208 164,240 120,272"/>
  <text class="dgm-text dgm-text--sm" x="120" y="244" text-anchor="middle">eingetragen</text>
  <rect class="dgm-shape" x="50" y="320" width="140" height="44" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="120" y="347" text-anchor="middle">Fahrzeughalter</text>
  <text class="dgm-card" x="200" y="75">N</text>
  <text class="dgm-card" x="440" y="75">1</text>
  <text class="dgm-card" x="128" y="160">N</text>
  <text class="dgm-card" x="128" y="300">1</text>
</svg>`,
        },
        {
          art: 'unterpunkt',
          label: 'c) LinkedIn',
          text: 'Zwei Entitytypen: Personenprofil (E-Mail = Schlüssel, Vorname, Nachname) und Unternehmensprofil (Name = Schlüssel, Slogan). Beziehungen: vernetzen (Personenprofil N:M mit sich selbst), folgen (Person N:M Unternehmen), administrieren (Person N:M Unternehmen) und Arbeitgeber (Person N:1 Unternehmen – pro Person höchstens ein aktueller Arbeitgeber).',
        },
        {
          art: 'svg',
          titel: 'c) ER-Diagramm LinkedIn',
          svg: `<svg viewBox="0 0 840 430" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ER-Diagramm LinkedIn">
  <line class="dgm-line" x1="200" y1="172" x2="212" y2="96"/>
  <line class="dgm-line" x1="272" y1="172" x2="258" y2="96"/>
  <line class="dgm-line" x1="100" y1="150" x2="160" y2="183"/>
  <line class="dgm-line" x1="98" y1="200" x2="160" y2="196"/>
  <line class="dgm-line" x1="100" y1="250" x2="160" y2="209"/>
  <line class="dgm-line" x1="310" y1="195" x2="382" y2="195"/>
  <line class="dgm-line" x1="468" y1="195" x2="540" y2="195"/>
  <line class="dgm-line" x1="760" y1="150" x2="720" y2="180"/>
  <line class="dgm-line" x1="765" y1="210" x2="720" y2="205"/>
  <line class="dgm-line" x1="235" y1="216" x2="390" y2="288"/>
  <line class="dgm-line" x1="630" y1="216" x2="466" y2="290"/>
  <line class="dgm-line" x1="220" y1="216" x2="395" y2="358"/>
  <line class="dgm-line" x1="645" y1="216" x2="462" y2="360"/>
  <polygon class="dgm-shape" points="191,70 235,42 279,70 235,98"/>
  <text class="dgm-text dgm-text--sm" x="235" y="74" text-anchor="middle">vernetzen</text>
  <rect class="dgm-shape" x="160" y="172" width="150" height="46" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="235" y="199" text-anchor="middle">Personenprofil</text>
  <rect class="dgm-shape" x="540" y="172" width="180" height="46" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="630" y="199" text-anchor="middle">Unternehmensprofil</text>
  <ellipse class="dgm-shape" cx="62" cy="150" rx="40" ry="17"/>
  <ellipse class="dgm-shape" cx="58" cy="200" rx="42" ry="17"/>
  <ellipse class="dgm-shape" cx="62" cy="250" rx="46" ry="17"/>
  <ellipse class="dgm-shape" cx="790" cy="150" rx="40" ry="17"/>
  <ellipse class="dgm-shape" cx="795" cy="210" rx="40" ry="17"/>
  <polygon class="dgm-shape" points="382,195 425,165 468,195 425,225"/>
  <text class="dgm-text dgm-text--sm" x="425" y="199" text-anchor="middle">folgen</text>
  <polygon class="dgm-shape" points="370,300 425,270 480,300 425,330"/>
  <text class="dgm-text dgm-text--sm" x="425" y="304" text-anchor="middle">administrieren</text>
  <polygon class="dgm-shape" points="378,370 425,342 472,370 425,398"/>
  <text class="dgm-text dgm-text--sm" x="425" y="374" text-anchor="middle">Arbeitgeber</text>
  <text class="dgm-key" x="62" y="155" text-anchor="middle">E-Mail</text>
  <text class="dgm-text dgm-text--sm" x="58" y="205" text-anchor="middle">Vorname</text>
  <text class="dgm-text dgm-text--sm" x="62" y="255" text-anchor="middle">Nachname</text>
  <text class="dgm-key" x="790" y="155" text-anchor="middle">Name</text>
  <text class="dgm-text dgm-text--sm" x="795" y="215" text-anchor="middle">Slogan</text>
  <text class="dgm-card" x="186" y="135">N</text>
  <text class="dgm-card" x="282" y="135">M</text>
  <text class="dgm-card" x="345" y="188">N</text>
  <text class="dgm-card" x="498" y="188">M</text>
  <text class="dgm-card" x="300" y="250">N</text>
  <text class="dgm-card" x="560" y="255">M</text>
  <text class="dgm-card" x="262" y="300">N</text>
  <text class="dgm-card" x="588" y="320">1</text>
</svg>`,
        },
      ],
    },
    {
      nr: 4,
      titel: 'Hausaufgabe 2 – partielle Funktionen einer ternären Beziehung',
      text:
        'Gegeben die ternäre Beziehung teilnehmen(Übungsleiter, Übungsgruppe, Student) mit Funktionalitäten 1:1:N.\n\n' +
        '• Wie viele partielle Funktionen der Form A × B → C kann es maximal geben (Reihenfolge links egal)?\n' +
        '• Nennen Sie alle und beschreiben Sie jeweils die Einschränkung.\n' +
        '• Welche gelten unter den Funktionalitäten 1:1:N (Übungsleiter 1, Übungsgruppe 1, Student N)?',
      loesung: [
        {
          art: 'text',
          text:
            'Maximal 3 partielle Funktionen: Jede der drei Entitäten kann einmal die „Ziel"-Seite (rechts vom Pfeil) sein, ' +
            'die beiden anderen bilden die linke Seite (deren Reihenfolge egal ist).',
        },
        {
          art: 'code',
          text:
            'Übungsleiter × Übungsgruppe → Student        (8)\n' +
            'Übungsleiter × Student      → Übungsgruppe   (9)\n' +
            'Übungsgruppe × Student      → Übungsleiter   (10)',
        },
        {
          art: 'liste',
          punkte: [
            '(8): Ein Übungsleiter hätte pro Übungsgruppe nur EINEN Studenten.',
            '(9): Ein Student dürfte bei einem Übungsleiter nur EINE Übungsgruppe besuchen.',
            '(10): Ein Student könnte eine Übungsgruppe nur bei EINEM Übungsleiter besuchen.',
          ],
        },
        {
          art: 'unterpunkt',
          label: 'Unter 1:1:N',
          text: 'Eine „1" bedeutet: Diese Entität ist durch die beiden anderen bestimmt. Übungsgruppe = 1 → (9) gilt; Übungsleiter = 1 → (10) gilt; Student = N → (8) gilt NICHT. Es gelten also (9) und (10) – wie im realen Übungsbetrieb (ein Student in einer Gruppe bei einem Leiter, aber ein Leiter/eine Gruppe hat viele Studenten).',
        },
      ],
    },
    {
      nr: 5,
      titel: 'Hausaufgabe 3 – Funktionalitäten aus partieller Funktion',
      text:
        'Ternäre Beziehung R(A, B, C). Es gelte nur die partielle Funktion A × C → B. Beschriften Sie das Diagramm mit ' +
        'Funktionalitäten und erklären Sie, wie man Funktionalitäten und partielle Funktionen ineinander umrechnet.',
      loesung: [
        {
          art: 'text',
          text:
            'Daumenregel: Die Entität, die RECHTS vom Pfeil einer geltenden partiellen Funktion steht, bekommt eine „1". ' +
            'Hier steht B rechts → B erhält 1; A und C erhalten N bzw. M.',
        },
        {
          art: 'svg',
          titel: 'R(A, B, C) mit A × C → B',
          svg: `<svg viewBox="0 0 620 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ternäre Beziehung A C nach B">
  <line class="dgm-line" x1="170" y1="103" x2="255" y2="103"/>
  <line class="dgm-line" x1="365" y1="103" x2="450" y2="103"/>
  <line class="dgm-line" x1="310" y1="139" x2="310" y2="240"/>
  <rect class="dgm-shape" x="60" y="80" width="110" height="46" rx="4"/>
  <text class="dgm-text" x="115" y="109" text-anchor="middle">A</text>
  <polygon class="dgm-shape" points="255,103 310,67 365,103 310,139"/>
  <text class="dgm-text dgm-text--sm" x="310" y="107" text-anchor="middle">R</text>
  <rect class="dgm-shape" x="450" y="80" width="110" height="46" rx="4"/>
  <text class="dgm-text" x="505" y="109" text-anchor="middle">B</text>
  <rect class="dgm-shape" x="255" y="240" width="110" height="46" rx="4"/>
  <text class="dgm-text" x="310" y="269" text-anchor="middle">C</text>
  <text class="dgm-card" x="200" y="95">N</text>
  <text class="dgm-card" x="420" y="95">1</text>
  <text class="dgm-card" x="322" y="195">M</text>
</svg>`,
        },
        {
          art: 'unterpunkt',
          label: 'Umrechnung in beide Richtungen',
          text: 'Von Funktionalität → partielle Funktion: Jede Entität mit „1" steht rechts vom Pfeil, die übrigen links. Von partieller Funktion → Funktionalität: Stelle alle möglichen partiellen Funktionen auf, überlege welche gelten sollen, und annotiere die jeweils rechts stehende Entität mit „1" (alle anderen mit N/M). Am sichersten ist es, immer erst die partiellen Funktionen explizit aufzustellen.',
        },
      ],
    },
    {
      nr: 6,
      titel: 'Zusatzaufgabe zum Knobeln',
      hinweis: 'kein Pflichtteil',
      text:
        'Beim konzeptuellen Entwurf bestehen Freiheitsgrade. Illustrieren Sie am Universitätsschema drei alternative Modellierungen und ihre Vor-/Nachteile:\n\n' +
        '1) Die ternäre Beziehung „prüfen" als binäre Beziehungen.\n' +
        '2) Die Beziehung „prüfen" als eigenständigen Entitytyp „Prüfungen".\n' +
        '3) Das Attribut „Raum" von Professoren als eigenständigen Entitytyp.',
      loesung: [
        {
          art: 'unterpunkt',
          label: '1) Ternär → binär',
          text: 'Die ursprüngliche ternäre Beziehung prüfen ist N:M:1 (Studenten × Vorlesungen → Professoren): Zu einem Paar (Student, Vorlesung) gibt es höchstens einen Prüfer. Ersetzt man prüfen durch zwei N:M-Beziehungen (über = Student/Vorlesung, prüft = Student/Professor), geht diese Konsistenzbedingung verloren.',
          punkte: [
            'Es tritt ein Semantikverlust auf: „welcher Professor prüft welchen Studenten in welcher Vorlesung" ist nicht mehr eindeutig abgebildet.',
            'Es können inkonsistente Zustände entstehen (Eintrag in „über" ohne passenden Eintrag in „prüft"); ggf. ist eine Konsistenzprüfung nötig.',
            'Die reale Welt wird in der Miniwelt unzureichend wiedergegeben. Das ternäre Modell ist hier ausdrucksstärker.',
          ],
        },
        {
          art: 'unterpunkt',
          label: '2) Beziehung → Entitytyp „Prüfungen"',
          text: 'prüfen wird als Entitytyp Prüfungen mit drei Beziehungen (ablegen → Student, umfasst → Vorlesung, abhalten → Professor) modelliert.',
          punkte: [
            'Auch hier Semantikverlust: Es kann eine Prüfung ohne Prüfer existieren. Will man das verhindern, braucht man die (min,max)-Notation (genau einmal in ablegen/umfasst/abhalten).',
            'Die Bedingung „Studenten × Vorlesungen → Professoren" ist nicht mehr gesichert: derselbe Student kann dieselbe Vorlesung bei zwei verschiedenen Professoren prüfen lassen.',
            'Vorteil: Manche Aspekte lassen sich genauer erfassen, z. B. dass pro Prüfung genau eine Vorlesung geprüft wird; eine Prüfung wird zum eigenständigen Objekt mit eigener Identität.',
          ],
        },
        {
          art: 'unterpunkt',
          label: '3) Attribut → Entitytyp „Raum"',
          text: 'Raum kann Attribut von Professoren bleiben oder als eigene Entität (mit Beziehung residiertIn) modelliert werden.',
          punkte: [
            'Eigene Entität Raum ist sinnvoll, wenn detaillierte Rauminformationen (Fläche, Gebäude …) gebraucht werden – z. B. für die Anwendungssicht „Gebäudetechnik".',
            'Nachteil: Will man nur die Raumdaten je Professor abfragen, ist diese Modellierung wegen des zusätzlichen Joins meist weniger effizient.',
            'Fazit: Die Wahl hängt von den Anwendungssichten ab – je mehr eigenständige Information ein Konzept trägt, desto eher lohnt ein eigener Entitytyp.',
          ],
        },
      ],
    },
  ],
}
