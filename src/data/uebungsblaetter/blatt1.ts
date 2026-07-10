import type { Uebungsblatt } from '../../types'

export const blatt1: Uebungsblatt = {
  id: 'blatt1',
  nr: '1',
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
        'Fallstudie – Pine Valley Furniture Company (PVFC).\n\n' +
        'a) Betrachten Sie Figure 1-2 (PVFC Fallstudie Teil 1): das alte File Processing System. Was sieht auf den ersten Blick problematisch aus?\n\n' +
        'b) Lesen Sie die Fallstudie (Teil 2) zur Entwicklung einer Datenbankanwendung und fassen Sie Ihren zugeteilten Abschnitt auf dem Etherpad zusammen.',
    },
    {
      nr: 3,
      referenz: ['db-grundlagen'],
      titel: 'Hausaufgabe 1',
      text:
        'Grundlage für die Strukturierung der Daten ist das Datenbankmodell.\n\n' +
        'a) Erläutern Sie den Unterschied zwischen dem relationalen Modell und Graphdatenbanken und nennen Sie für beide je zwei typische Einsatzgebiete.\n\n' +
        'b) Man unterscheidet Modelle mit festem Schema und schemalose Modelle.\n' +
        '(a) Was versteht man unter einem Datenbankschema?\n' +
        '(b) Welche Vor-/Nachteile hat eine solche Vorgabe für Entwickler und Anwender?',
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
        'Bei unkontrolliertem parallelem Zugriff können Probleme auftreten (Beispiel: zwei Kunden A und B bestellen gleichzeitig dasselbe Produkt). ' +
        'A bestellt y Stück, B bestellt z Stück; nach beiden Bestellungen sollte die verfügbare Menge x′ = x − y − z betragen.\n\n' +
        'Konstruieren Sie mit den Operationen lesen, berechnen und schreiben einen Ablauf, bei dem diese Eigenschaft verletzt wird, und erläutern Sie die Problematik.',
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
