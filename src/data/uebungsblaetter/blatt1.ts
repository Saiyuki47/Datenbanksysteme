import type { Uebungsblatt } from '../../types'

export const blatt1: Uebungsblatt = {
  id: 'blatt1',
  nr: '1',
  pdf: 'dateien_aus_moodle/übung 1/Übungsblatt 1.pdf',
  loesungPdf: 'dateien_aus_moodle/übung 1/Übungsblatt 1 Lösung.pdf',
  typ: 'Gruppen- & Hausaufgaben',
  beschreibung:
    'Grundlagen: Nachteile reiner Dateiverwaltung, Datenmodelle (relational vs. Graph), ' +
    'das Datenbankschema und die Problematik des parallelen Datenzugriffs.',
  tasks: [
    {
      nr: 1,
      referenz: ['db-grundlagen'],
      titel: 'Gruppenaufgabe 1',
      text:
        'Wenn zur Verwaltung von Daten lediglich auf Dateisysteme zurückgegriffen würde, würden sich diverse Nachteile ergeben. ' +
        'Nennen und erläutern Sie diese Nachteile kurz und geben Sie für jeden Nachteil ein Beispiel anhand des nachfolgenden Anwendungsfalls.\n\n' +
        'Anwendungsfall: Eine kleine Bibliothek speichert Daten über ihre Bücher, ihre Leser und den Status ausgeliehener Bücher. ' +
        'Für die Datenverwaltung wird dabei eine Tabellenverarbeitungssoftware genutzt. Die drei untenstehenden Tabellen zeigen einen ' +
        'beispielhaften Auszug aus den Tabellen, den Sie für einige der Beispiele heranziehen können. Denken Sie auch darüber hinaus: ' +
        'Wie werden die Daten gesichert? Wer hat Zugriff auf die Daten? etc.',
      tabellen: [
        {
          titel: 'Buch',
          columns: ['Buchtitel', 'Kopien', 'Leihfrist', 'Format', 'Einkaufspreis'],
          rows: [
            ['Grundlagen der Wirtschaftsinformatik', '9', '5', 'Paperback', '20,00'],
            ['Datenbanksysteme', '6', '2', 'Paperback', '44,00'],
            ['Datenbanksysteme', '2', '5', 'Gebunden', '60,00'],
            ['XML Ge-Packt', '3', '2', 'Taschenbuch', '10,50'],
          ],
        },
        {
          titel: 'Leser',
          columns: ['Name', 'Vorname', 'Adresse', 'Geburtsdatum', 'Anmerkung'],
          rows: [
            ['Meier', 'Petra', 'Schneiderstr. 2, 36039 Fulda', '10.02.1962', 'OK'],
            ['Müller', 'Georg', 'Schnittstr. 1, 36037 Fulda', '15.06.1968', 'OK'],
            ['Müller', 'Karla', 'Teststr. 3, 36043 Fulda', '25.09.1999', 'Gesperrt'],
            ['Mustermann', 'Max', 'Musterstr. 10, 36037 Fulda', '18.12.1990', 'OK'],
          ],
        },
        {
          titel: 'Ausleihe',
          columns: ['Titel', 'Leihfrist', 'Ausleihe', 'Rückgabe', 'Name'],
          rows: [
            ['Grundlagen der Wirtschaftsinformatik', '5', '01.04.2021', '', 'Müller'],
            ['Datenbanksysteme', '2', '29.03.2021', '17.04.2021', 'Meier'],
            ['Einführung in XML', '5', '28.03.2021', '17.04.2021', 'Mustermann'],
          ],
        },
      ],
      loesung: [
        {
          art: 'unterpunkt',
          label: 'Redundanz und Inkonsistenz',
          text: 'Wenn Daten in Dateien gespeichert werden, dann müssen sie oft mehrfach und damit redundant gespeichert werden. Änderungen führen zu Inkonsistenzen.',
          punkte: ['Beispiel: Eine Namensänderung eines Lesers in Tabelle „Leser" muss auch manuell in anderen Tabellen (hier „Ausleihe") angepasst werden. Auch die Leihfrist wird sowohl in Tabelle „Buch" als auch in Tabelle „Ausleihe" gespeichert, sodass Änderungen zu inkonsistenten Daten führen würden.'],
        },
        {
          art: 'unterpunkt',
          label: 'Beschränkte Zugriffsmöglichkeiten',
          text: 'Es ist unter Umständen schwierig, Informationen aus einer Datei mit anderen logisch zusammengehörenden Daten aus einer anderen Datei zu verknüpfen.',
          punkte: ['Beispiel: Angenommen es wird eine Liste der Leser inklusive deren Adresse und Leihfristende der aktuell von ihnen ausgeliehenen Bücher benötigt, um die Leser postalisch auf das Fristende ihrer Ausleihen hinzuweisen. Für die Liste müssen die Informationen aus den Tabellen „Leser" und „Ausleihe" manuell verknüpft werden, was bei einer großen Datenmenge einen großen Aufwand darstellt.'],
        },
        {
          art: 'unterpunkt',
          label: 'Probleme im Mehrbenutzerbetrieb',
          text: 'Probleme bei gleichzeitigem Bearbeiten einer Datei, vor allem Speicherprobleme, können auftreten.',
          punkte: ['Beispiel: Zwei Bibliotheksmitarbeitende arbeiten gleichzeitig an der Tabelle Ausleihe, um zum einen eine Rückgabe und zum anderen eine neue Ausleihe einzutragen oder im Extremfall sogar gleichzeitig an denselben Daten. Es ist unklar, welche Dateiversion den gültigen Zustand enthält.'],
        },
        {
          art: 'unterpunkt',
          label: 'Verlust von Daten',
          text: 'Dateien werden nicht automatisch gesichert, um bei Problemen einen gültigen Zustand herstellen zu können.',
          punkte: ['Beispiel: Sicherungskopien der Daten müssten von den Bibliotheksmitarbeitenden manuell zu bestimmten Zeitpunkten als periodische Backups angefertigt werden, um bei Problemen einen gültigen Zustand der Daten zu erhalten.'],
        },
        {
          art: 'unterpunkt',
          label: 'Integritätsverletzung',
          text: 'Es gibt zahlreiche Integritätsbedingungen, die ggf. erfüllt sein müssen. Wenn die Speicherung in Dateien erfolgt, ist die Kontrolle schwierig, da dafür verschiedene Dateien verknüpft werden müssen.',
          punkte: ['Beispiel: Wenn Leser häufig die Ausleihfrist überschreiten, werden sie als gesperrt markiert (Tabelle „Leser"). Trotzdem können fälschlicherweise in der Tabelle „Ausleihe" neue Ausleihen für die betroffene Person eingetragen werden. Auch beim Anlegen von Daten müssen bestimmte Bedingungen erfüllt werden, so muss für einen neuen Leser eine Adresse zwingend hinterlegt werden, was jedoch von einer einfachen Tabelle nicht geprüft wird.'],
        },
        {
          art: 'unterpunkt',
          label: 'Sicherheitsprobleme',
          text: 'Nicht alle Benutzer sollen Zugriff auf alle gespeicherten Daten haben. Der Zugriff auf Daten kann jedoch nicht angemessen kontrolliert werden.',
          punkte: ['Beispiel: Leser der Bibliothek sollen einen Einblick in den Bücherbestand (Titel, Anzahl der Kopien, Leihfrist der Tabelle „Bücher") haben und die späteste Rückgabe ausgeliehener Bücher einsehen können (Tabelle „Ausleihe"). Aus Datenschutzgründen soll für sie jedoch nicht einsehbar sein, wer die Bücher ausgeliehen hat (Name Tabelle „Ausleihe").'],
        },
        {
          art: 'unterpunkt',
          label: 'Hohe Entwicklungskosten für Anwendungsprogramme',
          text: 'Für jede Anwendung müsste ein neues Speichersystem und Abfragesprachen/-möglichkeiten entwickelt werden.',
          punkte: ['Beispiel: Soll den Lesern ein Online-Tool zur Einsicht in den Bücherbestand und in ihre aktuell ausgeliehenen Bücher zur Verfügung gestellt werden, muss ein neues Speichersystem und eine Abfragesprache entwickelt werden.'],
        },
      ],
    },
    {
      nr: 2,
      referenz: ['db-grundlagen'],
      titel: 'Gruppenaufgabe 2',
      text:
        'Fallstudie - Pine Valley Furniture Company\n\n' +
        'a) Schauen Sie sich die Grafik Figure 1-2 von PVFC Fallstudie Teil 1 an. Diese zeigt das alte File Processing System der PVFC. Denken Sie an die gesammelten Nachteile von Dateiverwaltungssystemen (GA1). Was sieht an dem alten System bereits auf den ersten Blick problematisch aus?\n\n' +
        'b) Lesen Sie zunächst die gesamte Fallstudie PVFC Fallstudie Teil 2 zur Entwicklung einer Datenbankanwendung für die Pine Valley Furniture Company. Lesen Sie dann den Ihnen zugeteilten Abschnitt genau und fassen Sie diesen Abschnitt in wenigen Stichpunkten auf dem Etherpad zusammen.',
      svg: `<svg viewBox="0 0 980 316" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Figure 1-2: Altes File-Processing-System bei Pine Valley Furniture mit den Abteilungen Orders, Accounting und Payroll">
  <defs>
    <marker id="pvfc-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" style="fill:var(--text2)"/>
    </marker>
  </defs>
  <text class="dgm-text" x="490" y="16" text-anchor="middle" style="font-weight:700">Figure 1-2 — Altes File-Processing-System (Pine Valley Furniture)</text>
  <text class="dgm-text dgm-text--sm" x="160" y="38" text-anchor="middle" style="font-weight:700">Orders Department</text>
  <text class="dgm-text dgm-text--sm" x="495" y="38" text-anchor="middle" style="font-weight:700">Accounting Department</text>
  <text class="dgm-text dgm-text--sm" x="825" y="38" text-anchor="middle" style="font-weight:700">Payroll Department</text>
  <ellipse class="dgm-shape" cx="70" cy="90" rx="36" ry="30"/>
  <text class="dgm-text" x="70" y="94" text-anchor="middle" style="font-size:10px">Program A</text>
  <ellipse class="dgm-shape" cx="160" cy="90" rx="36" ry="30"/>
  <text class="dgm-text" x="160" y="94" text-anchor="middle" style="font-size:10px">Program B</text>
  <ellipse class="dgm-shape" cx="250" cy="90" rx="36" ry="30"/>
  <text class="dgm-text" x="250" y="94" text-anchor="middle" style="font-size:10px">Program C</text>
  <line class="dgm-line" x1="70" y1="120" x2="120" y2="165" marker-start="url(#pvfc-arr)" marker-end="url(#pvfc-arr)"/>
  <line class="dgm-line" x1="160" y1="120" x2="160" y2="165" marker-start="url(#pvfc-arr)" marker-end="url(#pvfc-arr)"/>
  <line class="dgm-line" x1="250" y1="120" x2="200" y2="165" marker-start="url(#pvfc-arr)" marker-end="url(#pvfc-arr)"/>
  <rect class="dgm-shape" x="100" y="165" width="120" height="46" rx="3"/>
  <text class="dgm-text" x="160" y="184" text-anchor="middle" style="font-size:10px">Order Filling</text>
  <text class="dgm-text" x="160" y="198" text-anchor="middle" style="font-size:10px">System</text>
  <line class="dgm-line" x1="120" y1="211" x2="70" y2="250" marker-start="url(#pvfc-arr)" marker-end="url(#pvfc-arr)"/>
  <line class="dgm-line" x1="160" y1="211" x2="160" y2="250" marker-start="url(#pvfc-arr)" marker-end="url(#pvfc-arr)"/>
  <line class="dgm-line" x1="200" y1="211" x2="250" y2="250" marker-start="url(#pvfc-arr)" marker-end="url(#pvfc-arr)"/>
  <path class="dgm-shape" style="fill:var(--blue);fill-opacity:.16" d="M36,250 V300 A34,9 0 0 0 104,300 V250 Z"/>
  <ellipse class="dgm-shape" style="fill:var(--blue);fill-opacity:.16" cx="70" cy="250" rx="34" ry="9"/>
  <text class="dgm-text" x="70" y="271" text-anchor="middle" style="font-size:9px">Customer</text>
  <text class="dgm-text" x="70" y="283" text-anchor="middle" style="font-size:9px">Master</text>
  <text class="dgm-text" x="70" y="295" text-anchor="middle" style="font-size:9px">File</text>
  <path class="dgm-shape" style="fill:var(--text2);fill-opacity:.13" d="M126,250 V300 A34,9 0 0 0 194,300 V250 Z"/>
  <ellipse class="dgm-shape" style="fill:var(--text2);fill-opacity:.13" cx="160" cy="250" rx="34" ry="9"/>
  <text class="dgm-text" x="160" y="271" text-anchor="middle" style="font-size:9px">Inventory</text>
  <text class="dgm-text" x="160" y="283" text-anchor="middle" style="font-size:9px">Master</text>
  <text class="dgm-text" x="160" y="295" text-anchor="middle" style="font-size:9px">File</text>
  <path class="dgm-shape" d="M216,250 V300 A34,9 0 0 0 284,300 V250 Z"/>
  <ellipse class="dgm-shape" cx="250" cy="250" rx="34" ry="9"/>
  <text class="dgm-text" x="250" y="271" text-anchor="middle" style="font-size:9px">Back</text>
  <text class="dgm-text" x="250" y="283" text-anchor="middle" style="font-size:9px">Order</text>
  <text class="dgm-text" x="250" y="295" text-anchor="middle" style="font-size:9px">File</text>
  <ellipse class="dgm-shape" cx="430" cy="90" rx="36" ry="30"/>
  <text class="dgm-text" x="430" y="94" text-anchor="middle" style="font-size:10px">Program A</text>
  <ellipse class="dgm-shape" cx="560" cy="90" rx="36" ry="30"/>
  <text class="dgm-text" x="560" y="94" text-anchor="middle" style="font-size:10px">Program B</text>
  <line class="dgm-line" x1="430" y1="120" x2="470" y2="165" marker-start="url(#pvfc-arr)" marker-end="url(#pvfc-arr)"/>
  <line class="dgm-line" x1="560" y1="120" x2="520" y2="165" marker-start="url(#pvfc-arr)" marker-end="url(#pvfc-arr)"/>
  <rect class="dgm-shape" x="450" y="165" width="90" height="46" rx="3"/>
  <text class="dgm-text" x="495" y="184" text-anchor="middle" style="font-size:10px">Invoicing</text>
  <text class="dgm-text" x="495" y="198" text-anchor="middle" style="font-size:10px">System</text>
  <line class="dgm-line" x1="470" y1="211" x2="430" y2="250" marker-start="url(#pvfc-arr)" marker-end="url(#pvfc-arr)"/>
  <line class="dgm-line" x1="520" y1="211" x2="560" y2="250" marker-start="url(#pvfc-arr)" marker-end="url(#pvfc-arr)"/>
  <path class="dgm-shape" style="fill:var(--text2);fill-opacity:.13" d="M396,250 V300 A34,9 0 0 0 464,300 V250 Z"/>
  <ellipse class="dgm-shape" style="fill:var(--text2);fill-opacity:.13" cx="430" cy="250" rx="34" ry="9"/>
  <text class="dgm-text" x="430" y="271" text-anchor="middle" style="font-size:9px">Inventory</text>
  <text class="dgm-text" x="430" y="283" text-anchor="middle" style="font-size:9px">Pricing</text>
  <text class="dgm-text" x="430" y="295" text-anchor="middle" style="font-size:9px">File</text>
  <path class="dgm-shape" style="fill:var(--blue);fill-opacity:.16" d="M526,250 V300 A34,9 0 0 0 594,300 V250 Z"/>
  <ellipse class="dgm-shape" style="fill:var(--blue);fill-opacity:.16" cx="560" cy="250" rx="34" ry="9"/>
  <text class="dgm-text" x="560" y="271" text-anchor="middle" style="font-size:9px">Customer</text>
  <text class="dgm-text" x="560" y="283" text-anchor="middle" style="font-size:9px">Master</text>
  <text class="dgm-text" x="560" y="295" text-anchor="middle" style="font-size:9px">File</text>
  <ellipse class="dgm-shape" cx="760" cy="90" rx="36" ry="30"/>
  <text class="dgm-text" x="760" y="94" text-anchor="middle" style="font-size:10px">Program A</text>
  <ellipse class="dgm-shape" cx="890" cy="90" rx="36" ry="30"/>
  <text class="dgm-text" x="890" y="94" text-anchor="middle" style="font-size:10px">Program B</text>
  <line class="dgm-line" x1="760" y1="120" x2="800" y2="165" marker-start="url(#pvfc-arr)" marker-end="url(#pvfc-arr)"/>
  <line class="dgm-line" x1="890" y1="120" x2="850" y2="165" marker-start="url(#pvfc-arr)" marker-end="url(#pvfc-arr)"/>
  <rect class="dgm-shape" x="780" y="165" width="90" height="46" rx="3"/>
  <text class="dgm-text" x="825" y="184" text-anchor="middle" style="font-size:10px">Payroll</text>
  <text class="dgm-text" x="825" y="198" text-anchor="middle" style="font-size:10px">System</text>
  <line class="dgm-line" x1="825" y1="211" x2="825" y2="250" marker-start="url(#pvfc-arr)" marker-end="url(#pvfc-arr)"/>
  <path class="dgm-shape" d="M791,250 V300 A34,9 0 0 0 859,300 V250 Z"/>
  <ellipse class="dgm-shape" cx="825" cy="250" rx="34" ry="9"/>
  <text class="dgm-text" x="825" y="271" text-anchor="middle" style="font-size:9px">Employee</text>
  <text class="dgm-text" x="825" y="283" text-anchor="middle" style="font-size:9px">Master</text>
  <text class="dgm-text" x="825" y="295" text-anchor="middle" style="font-size:9px">File</text>
</svg>`,
      fallstudie: {
        titel: '📄 Fallstudie Teil 2 – Zusammenfassung (aufklappen)',
        pdfs: [
          { label: 'Teil 1 (Figure 1-2) als PDF', pfad: 'dateien_aus_moodle/übung 1/PVFC_Teil1.pdf' },
          { label: 'Teil 2 (Fallstudie) als PDF', pfad: 'dateien_aus_moodle/übung 1/PVFC_Teil2.pdf' },
        ],
        bloecke: [
          {
            art: 'text',
            text: 'Quelle: Modern Database Management (Hoffer, 2016), Kapitel 1 – „Database Environment and Development Process" (Ausschnitt). Kurzfassung in eigenen Worten; das vollständige Original steht in der oben verlinkten PDF.',
          },
          {
            art: 'text',
            text: 'Worum geht es? Am Beispiel von Pine Valley Furniture (PVFC) wird gezeigt, wie aus dem alten Dateisystem eine Datenbank-Anwendung entsteht. Ende der 1990er stieg PVFC auf einen Datenbank-Ansatz um: zuvor getrennte Dateien wurden in eine gemeinsame Datenbankstruktur integriert, ein DBMS bildet die Schnittstelle für alle Anwendungen. Ein LAN verbindet die Arbeitsplätze mit einem Datenbank-Server (Figure 1-13); später kamen Intranet und Web-Zugriff (z. B. Auftragserfassung) hinzu.',
          },
          {
            art: 'unterpunkt',
            label: 'Datenbank-Evolution',
            text: 'Produktmanagerin Helen Jarvis (Home-Office-Möbel) braucht direkten, einfachen Zugriff auf Verkaufsdaten für spontane (Ad-hoc-)Analysen. Systemanalyst Chris Martin soll ihr ein Marketing-Support-System bauen – als eigenständige Datenbank, damit die unvorhersehbaren Abfragen die operativen Systeme nicht ausbremsen. Chris kombiniert Prototyping mit dem klassischen Lebenszyklus und nutzt MS Access.',
          },
          {
            art: 'unterpunkt',
            label: 'Projektplanung',
            text: 'Chris interviewt Helen zu ihren Zielen und Datenobjekten. Daraus zeichnet er ein konzeptuelles Datenmodell (ER, Figure 1-14) mit den Entitäten CUSTOMER, ORDER, ORDER LINE, PRODUCT und PRODUCT LINE sowie INVOICE und PAYMENT und listet die zugehörigen Attribute (Tabelle 1-6).',
          },
          {
            art: 'unterpunkt',
            label: 'Anforderungsanalyse',
            text: 'Chris geht die Entitäten, Beziehungen und Geschäftsregeln durch – z. B. „jeder Kunde platziert beliebig viele Bestellungen, jede Bestellung gehört zu genau einem Kunden" (1:N). Gemeinsam mit Helen verfeinert er die Attribute (Tabelle 1-7, u. a. Vorjahres- und aktuelle Verkaufsziele).',
          },
          {
            art: 'unterpunkt',
            label: 'Datenbank-Entwurf',
            text: 'Aus dem Datenmodell mit Schlüsseln (Figure 1-15) werden Relationen/Tabellen (Figure 1-16: Customer, Product, Order, Order Line mit Beispieldaten), per SQL CREATE TABLE angelegt (Figures 1-17/1-18). Primär- und Fremdschlüssel verbinden die Tabellen; Chris legt zusätzlich Indizes an (Primärschlüssel automatisch, plus Sekundärschlüssel wie das Bestelldatum).',
          },
          {
            art: 'unterpunkt',
            label: 'Nutzung der Datenbank',
            text: 'Helen stellt vor allem Ad-hoc-Abfragen; für wiederkehrende Fragen baut Chris vorgefertigte Abfragen, Formulare und Berichte (z. B. „Umsatz je Produkt gegen Jahresziel" per SQL-Abfrage, Figures 1-19/1-20). Nach rund einem Dutzend Iterationen ist der Prototyp gut genug, um als fertige Anwendung zu dienen.',
          },
          {
            art: 'unterpunkt',
            label: 'Administration',
            text: 'Die Daten werden wöchentlich aus den operativen Datenbanken in Helens Access-Datenbank übernommen (ein C#-Programm extrahiert per SQL, ein Visual-Basic-Programm baut die Access-Tabellen neu auf – sonntags automatisiert). Das System wird ins Architektur-Modell des Unternehmens aufgenommen, damit Formatänderungen auffallen.',
          },
          {
            art: 'unterpunkt',
            label: 'Zukunft',
            text: 'Die operativen Datenbanken decken das Tagesgeschäft ab, sind aber für Entscheidungsunterstützung schlecht geeignet (z. B. „Wer sind unsere 10 größten Kunden?"). Dafür braucht es eine eigene Datenbank mit historischen, verdichteten Daten – ein Data Warehouse bzw. Data Mart – samt OLAP-Auswertungswerkzeugen.',
          },
        ],
      },
    },
    {
      nr: 3,
      referenz: ['db-grundlagen'],
      titel: 'Hausaufgabe 1',
      text:
        'Grundlage für die Strukturierung der Daten und ihrer Beziehungen zueinander ist das Datenbankmodell.\n\n' +
        'a) Erläutern Sie nach einer kurzen Internetrecherche den Unterschied zwischen dem Relationalen Modell und Graphdatenbanken. Nennen Sie für beide Modelle auch je zwei typische Einsatzgebiete.\n' +
        'b) Im Datenbankbereich unterscheidet man zwischen Modellen, welche ein festes Schema voraussetzen und anderen, die kein Schema benötigen.\n' +
        'a. Was versteht unter einem Datenbankschema?\n' +
        'b. Was sind Vorteile/Nachteile einer solchen Vorgabe für Entwickler und Anwender des Datenbanksystems?',
      loesung: [
        {
          art: 'unterpunkt',
          label: 'a) Relationales Modell',
          text: 'Speichert Daten in einer Tabellenstruktur. Jede Zeile ist ein Datensatz und besteht aus mehreren Attributswerten (Eigenschaften), den Spalten der Tabelle.',
          punkte: ['Beispiele: CMS (Content-Management-System), Bibliotheksverwaltung'],
        },
        {
          art: 'unterpunkt',
          label: 'a) Graphdatenbanken',
          text: 'Speichert Daten in einer Graphstruktur, um vernetzte Datenstrukturen darzustellen. Ein Graph besteht dabei aus Knoten und Kanten (Verbindungen). Eignet sich vor allem, wenn die Verbindungen im Vordergrund stehen, zum Beispiel Ermittlung des kürzesten Wegs von A nach B.',
          punkte: ['Beispiele: Datenspeicherung in der Bioinformatik/Medizin, Speicherung von inhärent graphstrukturierten Daten wie etwa U-Bahn-Netze, Soziale Medien, Empfehlungsnetzwerke.'],
        },
        {
          art: 'unterpunkt',
          label: 'b) a) Datenbankschema',
          text: 'Ein Datenbankschema ist eine formale Beschreibung der Struktur von Daten. Es legt fest, welche Daten in welcher Form (Wertebereiche) gespeichert werden, welche Beziehungen zwischen den Daten bestehen (Fremdschlüsselbeziehungen) und welche Integritätsbedingungen zur Sicherstellung der Konsistenz festgelegt werden.',
        },
        {
          art: 'unterpunkt',
          label: 'b) b) Vor-/Nachteile für Entwickler/Anwender',
          text: 'Ein Schema erlaubt i. A. mehr Optimierungsmöglichkeiten, da mehr Informationen und dadurch mehr „Constraints" über die Daten bekannt sind. Das Datenbanksystem kann so Anfragen schneller bearbeiten. Es sorgt für sauber und einheitlich abgelegte Daten und bietet Garantien über die Vollständigkeit und das Format der vorhandenen Daten. Allerdings geht bei Festlegung eines Schemas Flexibilität verloren. Die Daten mancher Anwendungsfälle lassen sich nur schwer in ein vordefiniertes Schema bringen, manchmal sind die zu speichernden Daten auch nicht im Vorhinein klar. Neue Daten, die abgelegt werden müssen, würden dann oft eine aufwendige Schemaänderung notwendig machen.',
        },
      ],
    },
    {
      nr: 4,
      referenz: ['db-grundlagen'],
      titel: 'Hausaufgabe 2',
      text:
        'Bei unkontrolliertem parallelem Zugriff auf Daten können Probleme auftreten. Ein Beispiel hierfür ist das gleichzeitige Bestellen eines Produktes durch zwei Kunden A und B. Das Produkt ist vor den Bestellungen x-mal verfügbar. Wenn A ein Produkt y-mal bestellt und B das gleiche Produkt z-mal bestellt, sollte nach Abschluss beider Bestellungen die nun verfügbare Menge des Produktes x′ = x - y - z betragen.\n\n' +
        'Aufgabe\n' +
        'Konstruieren Sie einen Ablauf zweier gleichzeitiger Produktbestellungen, bei dem die Eigenschaft, dass die verfügbare Menge des Produkts nach dem Abschluss der zwei Bestellungen der tatsächlich noch verfügbaren Menge (x′ = x - y - z) entspricht, verletzt ist. Nutzen Sie dafür die einzelnen Operationen lesen (z.B. A liest Produktverfügbarkeit …), berechnen (z.B. A berechnet neue Produktverfügbarkeit …) und schreiben (z.B. A schreibt neue Produktverfügbarkeit …). Erläutern Sie daran, worin die Problematik des parallelen Datenzugriffs besteht.',
      loesung: [
        {
          art: 'text',
          text: 'Ein Produkt ist 10-mal verfügbar. A bestellt das Produkt 2-mal, parallel bestellt B das Produkt 5-mal:',
        },
        {
          art: 'liste',
          punkte: [
            'A liest Produktverfügbarkeit x  (x_a = 10)',
            'A berechnet neue Produktverfügbarkeit x − y  (x′_a = 10 − 2 = 8)',
            'B liest Produktverfügbarkeit x  (x_b = 10)',
            'B berechnet neue Produktverfügbarkeit x − z  (x′_b = 10 − 5 = 5)',
            'B schreibt neue Produktverfügbarkeit x′  (x′ = 5)',
            'A schreibt neue Produktverfügbarkeit x′  (x′ = 8)',
          ],
        },
        {
          art: 'unterpunkt',
          label: 'Problem',
          text: 'Nach Abschluss der Bestellungen entspricht die nun verfügbare Produktmenge nicht der vorherigen Menge abzüglich der von A und B bestellten Menge.',
        },
        {
          art: 'unterpunkt',
          label: 'Grund',
          text: 'Das Anpassen der Produktverfügbarkeit bei einer Bestellung besteht aus den Operationen Lesen, Berechnen und Schreiben. Werden diese nicht als eine Einheit ausgeführt, können bei parallelen Datenzugriffen beispielsweise Änderungen verloren gehen (hier: A überschreibt Änderungen von B, da A einen Wert gelesen hat, bevor B eine Änderung vorgenommen hat).',
        },
      ],
    },
  ],
}
