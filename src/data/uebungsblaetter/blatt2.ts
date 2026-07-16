import type { Uebungsblatt } from '../../types'

export const blatt2: Uebungsblatt = {
  id: 'blatt2',
  nr: '2',
  pdf: 'dateien_aus_moodle/übung 2/Übungsblatt 2.pdf',
  loesungPdf: 'dateien_aus_moodle/übung 2/Übungsblatt 2 Lösung.pdf',
  typ: 'Gruppen- & Hausaufgaben',
  beschreibung:
    'Entity-Relationship-Modellierung: binäre Beziehungstypen mit Funktionalität, Konsistenzbedingungen und partiellen ' +
    'Funktionen, ein vollständiges ER-Diagramm für eine Apothekenkette sowie mehrere kleinere ER-Modelle. Dazu partielle ' +
    'Funktionen ternärer Beziehungen und alternative Entwürfe (ternär ↔ binär, Beziehung ↔ Entitytyp, Attribut ↔ Entitytyp).',
  tasks: [
    {
      nr: 1,
      referenz: ['er-modell', 'min-max'],
      titel: 'Gruppenaufgabe 1',
      text:
        'Welche binären Beziehungstypen werden hinsichtlich ihrer Funktionalität in einem ER-Diagramm unterschieden?\n' +
        '• Finden Sie für jeden Beziehungstypen ein geeignetes Beispiel und stellen Sie dieses in einem ER-Modell dar.\n' +
        '• Drücken Sie jeweils die Konsistenzbedingungen der Beziehung in Sätzen aus.\n' +
        '• Geben Sie jeweils die in der Beziehung geltenden partiellen Funktionen an.',
    },
    {
      nr: 2,
      referenz: ['er-modell'],
      titel: 'Gruppenaufgabe 2 – Apothekenkette „Prescriptions-4-U"',
      text:
        'Die Apothekenkette Prescriptions-4-U hat Sie beauftragt, eine Datenbank zur Speicherung aller für die Apothekenkette relevanten Daten zu entwerfen. Hier sind die Informationen, die Sie sammeln:\n\n' +
        '• Die Patienten werden durch die SVN (Sozialversicherungsnummer) identifiziert. Auch ihre Namen, Adressen und das Alter werden erfasst.\n' +
        '• Ärzte werden durch eine SVN identifiziert. Für jeden Arzt muss der Name, das Fachgebiet und die Jahre der Erfahrung erfasst werden.\n' +
        '• Jedes pharmazeutische Unternehmen wird durch den Namen identifiziert und hat eine Telefonnummer.\n' +
        '• Jede Apotheke hat einen Namen, der sie eindeutig identifiziert, eine Adresse und eine Telefonnummer.\n' +
        '• Für jedes Medikament müssen Handelsname und Formel gespeichert werden. Jedes Medikament wird von einem bestimmten pharmazeutischen Unternehmen hergestellt und der Handelsname identifiziert ein Medikament eindeutig unter den Produkten dieses Unternehmens. Wenn ein pharmazeutisches Unternehmen gelöscht wird, müssen dessen Produkte nicht mehr erfasst werden.\n' +
        '• Jeder Patient hat einen Primärarzt. Jeder Arzt hat mindestens einen Patienten.\n' +
        '• Jede Apotheke verkauft mehrere Medikamente und hat für jedes einen Preis. Ein Medikament kann in mehreren Apotheken verkauft werden, und der Preis kann von Apotheke zu Apotheke variieren.\n' +
        '• Ein Arzt kann einem Patienten mehrere Medikamente verschreiben. Ein Medikament kann vom Arzt mehreren Patienten verschrieben werden und ein Patient kann Medikamente von mehreren Ärzten erhalten. Jede Verschreibung ist mit einem Datum und einer Menge versehen. Wenn ein Arzt dasselbe Medikament für denselben Patienten mehr als einmal verschreibt, muss nur die jeweils letzte Verschreibung gespeichert werden.\n' +
        '• Pharmazeutische Unternehmen haben langfristige Verträge mit Apotheken. Ein pharmazeutisches Unternehmen kann mit mehreren Apotheken Verträge abschließen. Für jeden Vertrag müssen ein Start- und ein Enddatum sowie der Vertragstext gespeichert werden.\n\n' +
        '1) Erstellen Sie ein ER-Diagramm, indem Sie die folgenden Schritte abarbeiten:\n' +
        'a) Ermitteln Sie die Entitäten und deren Attribute.\n' +
        'b) Ermitteln Sie die Beziehungen zwischen den Entitäten und (falls vorhanden) die Attribute der Beziehungen.\n' +
        'c) Ermitteln Sie die Funktionalitäten der Beziehungen (1:1, 1:N, N:1, N:M).\n' +
        'd) Ermitteln Sie ggf. Einschränkungen zwischen Entitäten und Beziehungen.\n' +
        '2) Wie müsste das Diagramm verändert werden, wenn jedes Medikament von allen Apotheken zu einem festen Preis verkauft werden soll?\n' +
        '3) Wie müsste das Diagramm verändert werden, wenn die Anforderung wie folgt lautet: Falls ein Arzt ein Medikament mehrfach für den gleichen Patient verschreibt, dann sollen solche Rezepte alle separat gespeichert werden.',
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
      referenz: ['er-modell'],
      titel: 'Hausaufgabe 1 – ER-Diagramme zu drei Sachverhalten',
      text:
        'Nachfolgend werden verschiedene Sachverhalte vorgestellt. Erstellen Sie für jeden Sachverhalt ein Entity-Relationship-Diagramm, indem Sie die Entitäten, Beziehungen mit Funktionalitäten (1:1, 1:N, N:1, N:M) und ggf. Attribute identifizieren.\n\n' +
        'a) (Altklausuraufgabe) In einer Bibliothek werden folgende Daten verwaltet: Es gibt Buchtitel und Buchexemplare. Für einen Buchtitel können mehrere Exemplare vorhanden sein. Ausleiher leihen Buchexemplare. Ausleiher können Buchtitel vormerken lassen. Jedes Buch kann einen oder mehrere Autoren haben.\n' +
        'b) Autos werden von einem Hersteller hergestellt. Autos haben höchstens einen Fahrzeughalter. Auf einen Fahrzeughalter können mehrere Autos eingetragen sein.\n' +
        'c) Profile von Personen auf dem sozialen Netzwerk LinkedIn enthalten den Vornamen, Nachnamen und eine eindeutige E-Mail-Adresse. Personenprofile können sich mit anderen Personenprofilen vernetzen. Weiterhin existieren auf LinkedIn Unternehmensprofile. Diese haben einen eindeutigen Unternehmensnamen und einen Slogan. Unternehmensprofile werden von mindestens einem Personenprofil administriert. Personen können theoretisch eine oder mehrere Unternehmensprofile administrieren. Personen können Unternehmensprofilen folgen und ein Unternehmensprofil als aktuellen Arbeitgeber angeben.',
      loesung: [
        {
          art: 'unterpunkt',
          label: 'a) Bibliothek',
          text: 'Vier Entitytypen mit den Beziehungen: schreiben (Autor N:M Buchtitel), zugeordnet (Buchtitel 1:N Buchexemplar), ausleihen (Ausleiher 1:N Buchexemplar) und vormerken (Ausleiher M:N Buchtitel).',
        },
        {
          art: 'svg',
          titel: 'a) ER-Diagramm Bibliothek',
          svg: `<svg viewBox="0 0 700 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ER-Diagramm Bibliothek">
  <line class="dgm-line" x1="150" y1="90" x2="150" y2="158"/>
  <line class="dgm-line" x1="150" y1="222" x2="150" y2="310"/>
  <line class="dgm-line" x1="550" y1="90" x2="550" y2="158"/>
  <line class="dgm-line" x1="550" y1="222" x2="550" y2="310"/>
  <line class="dgm-line" x1="240" y1="335" x2="290" y2="335"/>
  <line class="dgm-line" x1="410" y1="335" x2="460" y2="335"/>
  <line class="dgm-line" x1="485" y1="90" x2="388" y2="176"/>
  <line class="dgm-line" x1="312" y1="205" x2="222" y2="310"/>
  <rect class="dgm-shape" x="60" y="40" width="180" height="50" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="150" y="70" text-anchor="middle">Autor</text>
  <rect class="dgm-shape" x="460" y="40" width="180" height="50" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="550" y="70" text-anchor="middle">Ausleiher</text>
  <polygon class="dgm-shape" points="90,190 150,158 210,190 150,222"/>
  <text class="dgm-text dgm-text--sm" x="150" y="194" text-anchor="middle">schreiben</text>
  <polygon class="dgm-shape" points="290,190 350,158 410,190 350,222"/>
  <text class="dgm-text dgm-text--sm" x="350" y="194" text-anchor="middle">vormerken</text>
  <polygon class="dgm-shape" points="490,190 550,158 610,190 550,222"/>
  <text class="dgm-text dgm-text--sm" x="550" y="194" text-anchor="middle">ausleihen</text>
  <rect class="dgm-shape" x="60" y="310" width="180" height="50" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="150" y="340" text-anchor="middle">Buchtitel</text>
  <rect class="dgm-shape" x="460" y="310" width="180" height="50" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="550" y="340" text-anchor="middle">Buchexemplar</text>
  <polygon class="dgm-shape" points="290,335 350,303 410,335 350,367"/>
  <text class="dgm-text dgm-text--sm" x="350" y="339" text-anchor="middle">zugeordnet</text>
  <text class="dgm-card" x="130" y="128">N</text>
  <text class="dgm-card" x="130" y="284">M</text>
  <text class="dgm-card" x="562" y="128">1</text>
  <text class="dgm-card" x="562" y="284">N</text>
  <text class="dgm-card" x="258" y="325">1</text>
  <text class="dgm-card" x="428" y="325">N</text>
  <text class="dgm-card" x="452" y="112">M</text>
  <text class="dgm-card" x="232" y="298">N</text>
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
      referenz: ['er-modell', 'min-max'],
      titel: 'Hausaufgabe 2 – partielle Funktionen einer ternären Beziehung',
      text:
        'Ignorieren Sie die Funktionalitätsangaben 1:1:N und beantworten Sie:\n' +
        '• Wie viele partielle Funktionen der Form A × B → C können in einer ternären Beziehung maximal auftreten? (Ignorieren Sie beim Zählen die Reihenfolge auf der linken Seite der Abbildung / links vom Pfeil.)\n' +
        '• Nennen Sie alle potenziell möglichen partiellen Funktionen in der hier gezeigten Beziehung „Übung".\n' +
        '• Nennen Sie für jede der potenziell möglichen partiellen Funktion in Textform, welche Einschränkung/Bedingung diese darstellt, falls sie gilt.\n\n' +
        'Unter Berücksichtigung der Funktionalitätsangaben 1:1:N:\n' +
        '• Welche partiellen Funktionen gelten hier tatsächlich?',
      svg: `<svg viewBox="0 0 640 270" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ternäre Beziehung teilnehmen zwischen Übungsleiter, Übungsgruppe und Student mit Funktionalitäten 1:1:N">
  <line class="dgm-line" x1="185" y1="92" x2="248" y2="92"/>
  <line class="dgm-line" x1="372" y1="92" x2="435" y2="92"/>
  <line class="dgm-line" x1="310" y1="132" x2="310" y2="205"/>
  <rect class="dgm-shape" x="35" y="70" width="150" height="44" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="110" y="97" text-anchor="middle">Übungsleiter</text>
  <polygon class="dgm-shape" points="248,92 310,52 372,92 310,132"/>
  <text class="dgm-text dgm-text--sm" x="310" y="96" text-anchor="middle">teilnehmen</text>
  <rect class="dgm-shape" x="435" y="70" width="150" height="44" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="510" y="97" text-anchor="middle">Übungsgruppe</text>
  <rect class="dgm-shape" x="235" y="205" width="150" height="44" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="310" y="232" text-anchor="middle">Student</text>
  <text class="dgm-card" x="205" y="86">1</text>
  <text class="dgm-card" x="400" y="86">1</text>
  <text class="dgm-card" x="322" y="178">N</text>
</svg>`,
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
      referenz: ['er-modell', 'min-max'],
      titel: 'Hausaufgabe 3 – Funktionalitäten aus partieller Funktion',
      text:
        'Angenommen, lediglich die partielle Funktion A × C → B gilt.\n' +
        '• Beschriften Sie die Abbildung mit den passenden Funktionalitätsangaben.\n' +
        '• Beantworten Sie nun die Frage, wie Funktionalitätsangaben aus partiellen Funktionen ermittelt werden können und umgekehrt.',
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
      referenz: ['er-modell'],
      titel: 'Zusatzaufgabe zum tieferen Verständnis',
      hinweis: 'KEINE Hausaufgabe',
      text:
        'Beim konzeptuellen Entwurf hat man gewisse Freiheitsgrade hinsichtlich der Modellierung der realen Welt. Die Anwendbarkeit alternativer Entwürfe lässt sich beispielsweise hinsichtlich der abgebildeten Informationseinheiten, des Einhaltens von Konsistenzbedingungen oder der Nützlichkeit für bestimmte Anwendungssichten unterscheiden. Unter anderem hat man folgende Alternativen, die Sie am Universitätsschema beispielhaft illustrieren sollen:\n\n' +
        '• Ternäre Beziehungen können in binäre Beziehungen transformiert werden. Betrachten Sie dazu die ternäre Beziehung prüfen. Modellieren Sie prüfen in einem alternativen Entwurf als binäre Beziehungen. Erläutern Sie Vor- und Nachteile einer solchen Transformation hinsichtlich Konsistenzbedingungen und Informationsgehalt.\n' +
        '• Ein Konzept der realen Welt kann als Beziehung oder als Entitytyp modelliert werden. Modellieren Sie die Beziehung prüfen in einem alternativen Entwurf als eigenständigen Entitytyp Prüfungen. Erläutern Sie Vor- und Nachteile dieser Transformation hinsichtlich Konsistenzbedingungen und Informationsgehalt.\n' +
        '• Ein Konzept der realen Welt kann als Entitytyp mit zugehörigem Beziehungstyp und als Attribut dargestellt werden. Ein Beispiel hierfür ist das Attribut Raum des Entitytyps Professoren in unserem Schema der Abbildung. Modellieren Sie einen alternativen Entwurf mit Raum als Entitytyp. Erläutern Sie Vor- und Nachteile der Transformation vor dem Hintergrund unterschiedlicher Anwendungssichten.',
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
