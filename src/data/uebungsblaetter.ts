import type { Uebungsblatt } from '../types'

export const uebungsblaetter: Uebungsblatt[] = [
  {
    id: 'blatt0',
    nr: '0',
    typ: 'Hausaufgabe',
    db: 'pv',
    beschreibung:
      'Aufgaben der letzten Folie „Additional Sample Queries" des Videos zu Kapitel 1. ' +
      'Geben Sie für die nachfolgenden Fragen das entsprechende SQL-Statement an. ' +
      'Das Ergebnis der SQL-Statements müssen Sie nicht angeben. ' +
      'Die Statements sollten auf der Beispieldatenbank funktionieren, auf die Sie mit der Datenbankverbindung DBMS zugreifen können.',
    tasks: [
      {
        nr: 1,
        text: 'From which cities do Pine Valley\'s customers come?',
        aufgabeId: 'a1',
        relevantTables: ['CUSTOMER_T'],
        queryResult: {
          columns: ['CUSTOMERCITY'],
          rows: [
            ['Albany'],
            ['Battle Creek'],
            ['Boulder'],
            ['Carlisle'],
            ['Carteret'],
            ['Clearwater'],
            ['Gainesville'],
            ['Kaneohe'],
            ['Ogden'],
            ['Plano'],
            ['Prospect Park'],
            ['Sacramento'],
            ['Santa Clara'],
            ['Seattle'],
            ['Seminole'],
          ],
        },
      },
      {
        nr: 2,
        text: 'What are the names of customers who are in Clearwater Florida?',
        aufgabeId: 'a2',
        relevantTables: ['CUSTOMER_T'],
        queryResult: {
          columns: ['CUSTOMERNAME'],
          rows: [['M and H Casual Furniture']],
        },
      },
      {
        nr: 3,
        text: 'What is the postal code of the customer who placed order 1008?',
        aufgabeId: 'a3',
        relevantTables: ['CUSTOMER_T', 'ORDER_T'],
        queryResult: {
          columns: ['CUSTOMERPOSTALCODE'],
          rows: [['49015-3401']],
        },
      },
      {
        nr: 4,
        text: 'What are the descriptions of products on order 1008?',
        aufgabeId: 'a4',
        relevantTables: ['ORDERLINE_T', 'PRODUCT_T'],
        queryResult: {
          columns: ['PRODUCTDESCRIPTION'],
          rows: [['Computer Desk'], ['Computer Desk']],
        },
      },
    ],
  },
  {
    id: 'blatt1',
    nr: '1',
    typ: 'Gruppen- & Hausaufgaben',
    beschreibung:
      'Grundlagen: Nachteile reiner Dateiverwaltung, Datenmodelle (relational vs. Graph), ' +
      'das Datenbankschema und die Problematik des parallelen Datenzugriffs.',
    tasks: [
      {
        nr: 1,
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
            art: 'text',
            text: 'Bei reiner Dateiverwaltung speichert und pflegt jede Anwendung ihre Daten in eigenen Dateien. Ein DBMS löst genau die folgenden Nachteile:',
          },
          {
            art: 'unterpunkt',
            label: '1. Redundanz & Inkonsistenz',
            text: 'Gleiche Daten werden mehrfach gespeichert und können widersprüchlich werden.',
            punkte: ['Beispiel: Der Buchtitel steht in „Buch" und in „Ausleihe" (z. B. „Datenbanksysteme"). Wird er nur an einer Stelle geändert, stimmen die Tabellen nicht mehr überein.'],
          },
          {
            art: 'unterpunkt',
            label: '2. Beschränkter Datenzugriff',
            text: 'Ohne flexible Abfragesprache muss für jede neue Auswertung ein eigenes Programm geschrieben werden.',
            punkte: ['Beispiel: Die Frage „Welche Ausleihen sind noch nicht zurückgegeben und überfällig?" erfordert ein neues Programm statt einer einfachen Abfrage.'],
          },
          {
            art: 'unterpunkt',
            label: '3. Datenisolation',
            text: 'Daten liegen verstreut in mehreren Dateien/Formaten und lassen sich schwer kombinieren.',
            punkte: ['Beispiel: Um „Welche Bücher hat Leser Müller ausgeliehen?" zu beantworten, müssen die getrennten Dateien Buch, Leser und Ausleihe zusammengeführt werden.'],
          },
          {
            art: 'unterpunkt',
            label: '4. Integritätsprobleme',
            text: 'Konsistenzbedingungen lassen sich kaum durchsetzen.',
            punkte: ['Beispiel: Der gesperrte Leser (Karla Müller, Anmerkung „Gesperrt") dürfte nichts ausleihen; auch dass die Leihfrist in „Ausleihe" zur Leihfrist des Buches passt, kann ein Dateisystem nicht erzwingen.'],
          },
          {
            art: 'unterpunkt',
            label: '5. Atomarität & Datensicherung',
            text: 'Mehrschrittige Operationen sind nicht „alles-oder-nichts"; nach einem Absturz bleibt ein inkonsistenter Zustand, und Backup/Recovery fehlt.',
            punkte: ['Beispiel: Bei einer Rückgabe muss in „Ausleihe" das Rückgabedatum gesetzt UND in „Buch" die Kopienzahl erhöht werden. Stürzt das System dazwischen ab, stimmt der Bestand nicht. (→ „Wie werden die Daten gesichert?")'],
          },
          {
            art: 'unterpunkt',
            label: '6. Probleme im Mehrbenutzerbetrieb',
            text: 'Gleichzeitige Zugriffe führen ohne Synchronisation zu Anomalien (z. B. Lost Update).',
            punkte: ['Beispiel: Zwei Bibliothekare verleihen gleichzeitig das letzte Exemplar eines Buches – beide buchen erfolgreich, die Kopienzahl wird falsch (siehe Hausaufgabe 2).'],
          },
          {
            art: 'unterpunkt',
            label: '7. Sicherheit & Zugriffsschutz',
            text: 'Es lässt sich kaum steuern, wer welche Daten sehen oder ändern darf.',
            punkte: ['Beispiel: Ein normaler Leser sollte nicht die Adressen und Geburtsdaten anderer Leser sehen können – im Dateisystem ist ein so feiner Zugriffsschutz kaum umsetzbar. (→ „Wer hat Zugriff auf die Daten?")'],
          },
        ],
      },
      {
        nr: 2,
        titel: 'Gruppenaufgabe 2',
        text:
          'Fallstudie – Pine Valley Furniture Company (PVFC).\n\n' +
          'a) Betrachten Sie Figure 1-2 (PVFC Fallstudie Teil 1): das alte File Processing System. Was sieht auf den ersten Blick problematisch aus?\n\n' +
          'b) Lesen Sie die Fallstudie (Teil 2) zur Entwicklung einer Datenbankanwendung und fassen Sie Ihren zugeteilten Abschnitt auf dem Etherpad zusammen.',
        loesung: [
          {
            art: 'unterpunkt',
            label: 'a) Probleme des alten Systems',
            text: 'Das File Processing System nutzt für jede Anwendung (z. B. Auftragsbearbeitung, Rechnungsstellung, Lohnbuchhaltung) eigene, getrennte Dateien:',
            punkte: [
              'Redundanz: dieselben Daten (z. B. Kunden- und Produktdaten) werden in mehreren Dateien doppelt gehalten.',
              'Inkonsistenz: Änderungen in einer Datei werden in den anderen nicht nachgezogen → widersprüchliche Daten.',
              'Keine Integration / Datenisolation: jede Anwendung „kennt" nur ihre eigenen Dateien; bereichsübergreifende Auswertungen sind schwer.',
              'Hoher Pflegeaufwand und Abhängigkeit von einzelnen Programmen (jede Datei hat ihr eigenes Format/Programm).',
            ],
          },
          {
            art: 'text',
            text: 'Kurz: Es sind genau die Nachteile aus Gruppenaufgabe 1 – allen voran Redundanz und die daraus folgende Inkonsistenz.',
          },
          {
            art: 'unterpunkt',
            label: 'b) Lese-/Zusammenfassungsaufgabe',
            text: 'Dies ist eine kollaborative Aufgabe: Teil 2 der Fallstudie beschreibt, wie PVFC von der reinen Dateiverwaltung auf einen Datenbankansatz umgestellt wird (Anforderungen, Datenmodell/ER-Modell, Tabellen). Jede Gruppe fasst ihren zugeteilten Abschnitt in wenigen Stichpunkten auf dem Etherpad zusammen – der konkrete Inhalt hängt vom zugeteilten Abschnitt ab.',
          },
        ],
      },
      {
        nr: 3,
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
            text: 'Daten werden in Tabellen (Relationen) aus Zeilen und Spalten mit festem Schema abgelegt; Beziehungen entstehen über Fremdschlüssel und werden per JOIN (SQL) ausgewertet (Basis: Mengenlehre/relationale Algebra).',
            punkte: ['Einsatzgebiete: betriebliche/transaktionale Systeme (ERP, Banken, Lagerverwaltung, die Bibliothek selbst); Reporting/Auswertungen über strukturierte Daten.'],
          },
          {
            art: 'unterpunkt',
            label: 'a) Graphdatenbank',
            text: 'Daten werden als Knoten (Entitäten) und Kanten (Beziehungen) gespeichert; Beziehungen sind „erstklassig" und direkt abgelegt, wodurch sich stark vernetzte Daten sehr effizient durchlaufen lassen (Abfragesprachen z. B. Cypher).',
            punkte: ['Einsatzgebiete: soziale Netzwerke (Freund-von-Freund), Empfehlungssysteme, Betrugserkennung, Wissens-/Netzwerkgraphen.'],
          },
          {
            art: 'text',
            text: 'Kernunterschied: Das relationale Modell speichert Beziehungen implizit über Fremdschlüssel (tiefe Verknüpfungen → viele teure JOINs), die Graphdatenbank speichert sie explizit als Kanten (schnelles Traversieren vernetzter Daten).',
          },
          {
            art: 'unterpunkt',
            label: 'b.a) Was ist ein Datenbankschema?',
            text: 'Das Schema ist die formale Beschreibung der Struktur der Datenbank: welche Tabellen/Collections es gibt, ihre Attribute, Datentypen, Constraints und Beziehungen. Es wird beim Entwurf festgelegt (Bauplan); die konkreten Daten (die Ausprägung) müssen sich daran halten.',
          },
          {
            art: 'unterpunkt',
            label: 'b.b) Festes Schema – Entwickler',
            text: 'Vorteile: Die DB garantiert Integrität/Konsistenz (Typ- und Constraint-Prüfung); die klare Struktur erleichtert zuverlässige Abfragen, und der Optimierer kann das Schema nutzen. Nachteile: weniger flexibel – Schemaänderungen (Migrationen) sind aufwendig, heterogene oder sich schnell ändernde Daten sind schwerer abzubilden.',
          },
          {
            art: 'unterpunkt',
            label: 'b.b) Festes Schema – Anwender',
            text: 'Vorteile: vorhersehbare, konsistente Daten → verlässliche Anwendungen und hohe Datenqualität. Nachteile: Eingaben müssen dem Schema entsprechen; unstrukturierte/abweichende Daten lassen sich nicht einfach ablegen. (Schemalose Modelle sind dafür flexibler, verlagern die Konsistenzprüfung aber in die Anwendung.)',
          },
        ],
      },
      {
        nr: 4,
        titel: 'Hausaufgabe 2',
        text:
          'Bei unkontrolliertem parallelem Zugriff können Probleme auftreten (Beispiel: zwei Kunden A und B bestellen gleichzeitig dasselbe Produkt). ' +
          'A bestellt y Stück, B bestellt z Stück; nach beiden Bestellungen sollte die verfügbare Menge x′ = x − y − z betragen.\n\n' +
          'Konstruieren Sie mit den Operationen lesen, berechnen und schreiben einen Ablauf, bei dem diese Eigenschaft verletzt wird, und erläutern Sie die Problematik.',
        loesung: [
          {
            art: 'text',
            text: 'Problematischer Ablauf (x = Anfangsbestand). Beide Transaktionen lesen x, bevor eine von beiden schreibt:',
          },
          {
            art: 'tabelle',
            titel: 'Verzahnter Ablauf (Lost Update)',
            columns: ['Schritt', 'Transaktion A (bestellt y)', 'Transaktion B (bestellt z)', 'gespeicherte Menge'],
            rows: [
              ['1', 'liest x  (a = x)', '', 'x'],
              ['2', '', 'liest x  (b = x)', 'x'],
              ['3', 'berechnet a = x − y', '', 'x'],
              ['4', '', 'berechnet b = x − z', 'x'],
              ['5', 'schreibt a → x − y', '', 'x − y'],
              ['6', '', 'schreibt b → x − z', 'x − z'],
            ],
          },
          {
            art: 'text',
            text: 'Endstand: x − z. Korrekt wäre x − y − z. Da B noch den ursprünglichen Wert x gelesen hatte, überschreibt der Schreibvorgang in Schritt 6 die Änderung von A – die Bestellung von A geht verloren („Lost Update").',
          },
          {
            art: 'unterpunkt',
            label: 'Worin besteht die Problematik?',
            text: 'Ohne Synchronisation greifen beide Transaktionen auf denselben Ausgangswert zu und überschreiben sich gegenseitig; die Datenbank wird inkonsistent (der Bestand ist zu hoch). Abhilfe schafft Nebenläufigkeitskontrolle: Transaktionen mit Isolation (z. B. Sperren/Locks), sodass die Zugriffe serialisiert werden und das korrekte Ergebnis x − y − z entsteht.',
          },
        ],
      },
    ],
  },
  {
    id: 'probeklausur1',
    nr: 'P1',
    titel: 'Probeklausur 1',
    typ: 'Probeklausur',
    beschreibung:
      'Probeklausur Datenbanksysteme 2 (WS 07/08). Aufgaben: SQL-Anfragen auf Relation T, ' +
      'Relationenalgebra auf den Relationen V und W, SQL-Anfragen auf Relation V (mit Nullwerten) ' +
      'sowie Integritätsbedingungen. Die Relationen stehen jeweils oben bei der Aufgabe; die Lösungen ' +
      'mit ausführlicher Erklärung lassen sich pro Teilaufgabe einblenden.',
    anmerkung: {
      titel: 'Anmerkungen zur Probeklausur',
      punkte: [
        'Aufgabe 5 (Algebraische Optimierung) ist nicht relevant.',
        'Aufgabe 3f ist ebenfalls nicht relevant: Es handelt sich um eine alte Join-Syntax (Oracle „(+)"), ' +
          'die man so nicht mehr benutzt. Sie wurde damals für linke und rechte Joins erweitert – allerdings in jeder ' +
          'Datenbank etwas anders. Mit der neuen, einheitlichen JOIN-Syntax (LEFT/RIGHT/FULL OUTER JOIN) ist das ' +
          'inzwischen vernünftig vereinheitlicht.',
        'Mit den Tabellendefinitionen aus Aufgabe 4 als Skript können Sie die Statements auch selbst ausprobieren.',
      ],
    },
    tasks: [
      {
        nr: 0,
        titel: 'Aufgabe 1 (SQL-Anfragen)',
        text:
          'Tragen Sie die Ergebnisse der folgenden SQL-Anfragen bezüglich der unten stehenden Relation T ein. ' +
          'Klappen Sie zu jeder Teilaufgabe die Lösung auf.',
        tabellen: [
          {
            titel: 'Relation T',
            columns: ['A', 'B', 'C', 'D'],
            rows: [
              ['1', '10', 'rot', '40'],
              ['2', '10', 'blau', '30'],
              ['3', '20', 'grün', '20'],
              ['4', '120', 'violett', '0'],
              ['5', '50', 'gelb', '20'],
              ['6', '80', 'blau', '10'],
              ['7', '30', 'grün', '40'],
              ['8', '10', 'violett', '100'],
              ['9', '40', 'rot', '30'],
              ['10', '50', 'blau', '50'],
              ['11', '90', 'rot', '40'],
              ['12', '140', 'gelb', '10'],
            ],
          },
        ],
      },
      {
        nr: 1,
        titel: 'a) GROUP BY mit COUNT(*) (2 Punkte)',
        text: 'Zähle die Zeilen je Farbe C.',
        sqlQuery: 'SELECT C, COUNT(*)\nFROM T\nGROUP BY C',
        loesung: [
          {
            art: 'text',
            text: 'GROUP BY C bildet eine Gruppe pro Farbwert. COUNT(*) zählt die Anzahl der Zeilen je Gruppe. Wir gehen die 12 Zeilen durch und ordnen jede ihrer Farbe zu:',
          },
          {
            art: 'liste',
            punkte: [
              'rot: Zeilen 1, 9, 11 → 3',
              'blau: Zeilen 2, 6, 10 → 3',
              'grün: Zeilen 3, 7 → 2',
              'violett: Zeilen 4, 8 → 2',
              'gelb: Zeilen 5, 12 → 2',
            ],
          },
          {
            art: 'tabelle',
            titel: 'Ergebnis (Reihenfolge der Zeilen ist beliebig)',
            columns: ['C', 'COUNT(*)'],
            rows: [
              ['violett', '2'],
              ['blau', '3'],
              ['grün', '2'],
              ['rot', '3'],
              ['gelb', '2'],
            ],
          },
          {
            art: 'text',
            text: 'Kontrolle: 3 + 3 + 2 + 2 + 2 = 12 = Gesamtzahl der Zeilen. Eine Sortierung ist nicht vorgegeben (kein ORDER BY), daher zählt die Reihenfolge nicht.',
          },
        ],
      },
      {
        nr: 2,
        titel: 'b) GROUP BY mit HAVING auf Summen (2 Punkte)',
        text: 'Gib je Farbe SUM(B) und SUM(D) aus, aber nur dort, wo SUM(B) = SUM(D) + 30 gilt.',
        sqlQuery: 'SELECT C, SUM(B), SUM(D)\nFROM T\nGROUP BY C\nHAVING SUM(B) = SUM(D) + 30',
        loesung: [
          {
            art: 'text',
            text: 'Zuerst je Farbe SUM(B) und SUM(D) berechnen, danach mit HAVING nur die Gruppen behalten, deren B-Summe genau um 30 größer ist als ihre D-Summe.',
          },
          {
            art: 'tabelle',
            titel: 'Zwischenrechnung je Gruppe (HAVING-Prüfung in der letzten Spalte)',
            columns: ['C', 'SUM(B)', 'SUM(D)', 'SUM(D)+30', 'B = D+30 ?'],
            rows: [
              ['rot', '10+40+90 = 140', '40+30+40 = 110', '140', '✓'],
              ['blau', '10+80+50 = 140', '30+10+50 = 90', '120', '✗'],
              ['grün', '20+30 = 50', '20+40 = 60', '90', '✗'],
              ['violett', '120+10 = 130', '0+100 = 100', '130', '✓'],
              ['gelb', '50+140 = 190', '20+10 = 30', '60', '✗'],
            ],
          },
          {
            art: 'text',
            text: 'Nur rot (140 = 110 + 30) und violett (130 = 100 + 30) erfüllen die HAVING-Bedingung.',
          },
          {
            art: 'tabelle',
            titel: 'Ergebnis',
            columns: ['C', 'SUM(B)', 'SUM(D)'],
            rows: [
              ['violett', '130', '100'],
              ['rot', '140', '110'],
            ],
          },
        ],
      },
      {
        nr: 3,
        titel: 'c) WHERE vor GROUP BY, dann HAVING (2 Punkte)',
        text: 'Zähle je Farbe nur die Zeilen mit D > 30 und behalte nur Gruppen mit mindestens 2 solcher Zeilen.',
        sqlQuery: 'SELECT C, COUNT(*)\nFROM T\nWHERE D > 30\nGROUP BY C\nHAVING COUNT(*) >= 2',
        loesung: [
          {
            art: 'text',
            text: 'Wichtig ist die Reihenfolge: WHERE filtert die Zeilen VOR der Gruppierung, HAVING filtert die Gruppen NACH der Gruppierung.',
          },
          {
            art: 'text',
            text: 'Schritt 1 – WHERE D > 30 lässt nur diese Zeilen übrig:',
          },
          {
            art: 'liste',
            punkte: [
              'Zeile 1: D = 40, C = rot',
              'Zeile 7: D = 40, C = grün',
              'Zeile 8: D = 100, C = violett',
              'Zeile 10: D = 50, C = blau',
              'Zeile 11: D = 40, C = rot',
            ],
          },
          {
            art: 'text',
            text: 'Schritt 2 – GROUP BY C + COUNT(*) auf diesen 5 Zeilen: rot = 2, grün = 1, violett = 1, blau = 1.',
          },
          {
            art: 'text',
            text: 'Schritt 3 – HAVING COUNT(*) >= 2 behält nur Gruppen mit mindestens 2 Zeilen, also nur rot.',
          },
          {
            art: 'tabelle',
            titel: 'Ergebnis',
            columns: ['C', 'COUNT(*)'],
            rows: [['rot', '2']],
          },
        ],
      },
      {
        nr: 4,
        titel: 'd) Self-Join / Kartesisches Produkt (2 Punkte)',
        text: 'Zähle alle Paare (T1, T2), bei denen der B-Wert der einen Zeile gleich dem D-Wert der anderen Zeile ist.',
        sqlQuery: 'SELECT COUNT(*)\nFROM T T1, T T2\nWHERE T1.B = T2.D',
        loesung: [
          {
            art: 'text',
            text: 'T1, T2 ist ein kartesisches Produkt (jede Zeile mit jeder), die WHERE-Klausel behält nur die Paare mit T1.B = T2.D. Die Zahl der Treffer berechnet man am einfachsten über die Häufigkeiten der Werte: für jeden Wert v gilt Treffer = (Anzahl B = v) × (Anzahl D = v).',
          },
          {
            art: 'text',
            text: 'Häufigkeiten der B-Werte: 10 → 3 (Z.1,2,8), 20 → 1, 30 → 1, 40 → 1, 50 → 2, 80 → 1, 90 → 1, 120 → 1, 140 → 1.',
          },
          {
            art: 'text',
            text: 'Häufigkeiten der D-Werte: 0 → 1, 10 → 2, 20 → 2, 30 → 2, 40 → 3, 50 → 1, 100 → 1.',
          },
          {
            art: 'tabelle',
            titel: 'Nur Werte, die in B UND in D vorkommen, tragen bei',
            columns: ['Wert v', 'Anzahl B = v', 'Anzahl D = v', 'Paare (Produkt)'],
            rows: [
              ['10', '3', '2', '6'],
              ['20', '1', '2', '2'],
              ['30', '1', '2', '2'],
              ['40', '1', '3', '3'],
              ['50', '2', '1', '2'],
            ],
          },
          {
            art: 'text',
            text: 'Summe: 6 + 2 + 2 + 3 + 2 = 15. (Werte wie 0, 80, 90, 100, 120, 140 kommen jeweils nur in einer der beiden Spalten vor und liefern daher keine Paare.)',
          },
          {
            art: 'tabelle',
            titel: 'Ergebnis',
            columns: ['COUNT(*)'],
            rows: [['15']],
          },
        ],
      },
      {
        nr: 5,
        titel: 'e) GROUP BY auf einer Funktion (2 Punkte)',
        text: 'Gruppiere nach der Länge des Farbnamens LENGTH(C) und zähle die Zeilen je Länge.',
        sqlQuery: 'SELECT LENGTH(C), COUNT(*)\nFROM T\nGROUP BY LENGTH(C)',
        loesung: [
          {
            art: 'text',
            text: 'Gruppiert wird nicht nach der Farbe selbst, sondern nach der Zeichenanzahl des Farbnamens. Zuerst die Längen bestimmen:',
          },
          {
            art: 'liste',
            punkte: [
              'rot → 3 Zeichen',
              'blau → 4 Zeichen',
              'grün → 4 Zeichen (das ü zählt als ein Zeichen)',
              'gelb → 4 Zeichen',
              'violett → 7 Zeichen',
            ],
          },
          {
            art: 'text',
            text: 'Jetzt die Zeilen je Länge zählen: Länge 3 = nur rot (Z.1,9,11) → 3. Länge 4 = blau (3) + grün (2) + gelb (2) → 7. Länge 7 = violett (Z.4,8) → 2.',
          },
          {
            art: 'tabelle',
            titel: 'Ergebnis (Reihenfolge beliebig)',
            columns: ['LENGTH(C)', 'COUNT(*)'],
            rows: [
              ['7', '2'],
              ['3', '3'],
              ['4', '7'],
            ],
          },
          {
            art: 'text',
            text: 'Kontrolle: 2 + 3 + 7 = 12 Zeilen.',
          },
        ],
      },
      {
        nr: 6,
        titel: 'f) Unterabfrage mit IN (2 Punkte)',
        text: 'Gib A, B, D aller Zeilen aus, deren B-Wert in der Ergebnismenge der Unterabfrage (SELECT B FROM T WHERE 2*A > D) vorkommt.',
        sqlQuery: 'SELECT A, B, D\nFROM T\nWHERE B IN (\n  SELECT B FROM T WHERE 2*A > D\n)',
        loesung: [
          {
            art: 'text',
            text: 'Schritt 1 – die Unterabfrage zuerst: für jede Zeile prüfen, ob 2*A > D, und von den Treffern den B-Wert sammeln.',
          },
          {
            art: 'liste',
            punkte: [
              'Zeile 4: 2·4 = 8 > 0  ✓ → B = 120',
              'Zeile 6: 2·6 = 12 > 10  ✓ → B = 80',
              'Zeile 12: 2·12 = 24 > 10  ✓ → B = 140',
              'Alle anderen Zeilen: 2*A ist nicht größer als D (z. B. Zeile 1: 2 > 40 ist falsch).',
            ],
          },
          {
            art: 'text',
            text: 'Die Unterabfrage liefert also die B-Menge { 120, 80, 140 }.',
          },
          {
            art: 'text',
            text: 'Schritt 2 – die äußere Abfrage: alle Zeilen, deren B in { 80, 120, 140 } liegt. Das sind genau die Zeilen 4, 6 und 12 (kein anderer B-Wert kommt in der Menge vor).',
          },
          {
            art: 'tabelle',
            titel: 'Ergebnis',
            columns: ['A', 'B', 'D'],
            rows: [
              ['4', '120', '0'],
              ['6', '80', '10'],
              ['12', '140', '10'],
            ],
          },
        ],
      },

      // ---- Aufgabe 2 (Relationenalgebra) ----
      {
        nr: 20,
        titel: 'Aufgabe 2 (Relationenalgebra)',
        text:
          'Gegeben seien die folgenden zwei Relationen V und W. Formulieren Sie die SQL-Ausdrücke als ' +
          'Folge von Operationen der Relationenalgebra.\n\n' +
          'Notation: σ = Selektion (Auswahl von Zeilen), π = Projektion (Auswahl von Spalten), ' +
          '× = Kreuzprodukt, ⋈ = (Theta-/Equi-)Join, ∪ = Vereinigung.',
        tabellen: [
          {
            titel: 'Relation V',
            columns: ['A', 'B'],
            rows: [
              ['1', 'gelb'],
              ['2', 'grün'],
              ['2', 'blau'],
              ['3', 'blau'],
              ['3', 'gelb'],
              ['3', 'rot'],
              ['4', 'grün'],
              ['4', 'rot'],
              ['5', 'orange'],
              ['6', 'rot'],
              ['6', 'grün'],
            ],
          },
          {
            titel: 'Relation W',
            columns: ['B', 'C', 'D'],
            rows: [
              ['gelb', '120', '15'],
              ['grün', '220', '30'],
              ['rot', '130', '45'],
              ['orange', '110', '45'],
              ['magenta', '100', '60'],
            ],
          },
        ],
      },
      {
        nr: 21,
        titel: 'a) SQL → Relationenalgebra (3 Punkte)',
        text: 'Formulieren Sie den folgenden SQL-Ausdruck als Folge von Operationen der Relationenalgebra.',
        sqlQuery: 'SELECT *\nFROM V, W\nWHERE V.B = W.B AND V.A < 4',
        loesung: [
          {
            art: 'text',
            text: 'Den SQL-Ausdruck Schritt für Schritt übersetzen: FROM V, W ist das Kreuzprodukt V × W. Die Bedingung V.B = W.B verbindet die beiden Relationen (Join über die gemeinsame Spalte B). Die Bedingung V.A < 4 ist eine reine Zeilen-Auswahl (Selektion). SELECT * bedeutet, dass alle Spalten übernommen werden – es ist also KEINE Projektion nötig.',
          },
          {
            art: 'unterpunkt',
            label: 'Lösung',
            text: 'σ[V.A < 4] ( V ⋈[V.B = W.B] W )',
            punkte: [
              'Gleichwertig mit explizitem Join: σ[V.A < 4] ( V ⋈[V.B=W.B] W )',
              'Gleichwertig nur mit Kreuzprodukt: σ[V.B = W.B ∧ V.A < 4] ( V × W )',
              'Gleichwertig mit getrennten Selektionen: σ[V.B = W.B] ( σ[V.A < 4] ( V × W ) )',
            ],
          },
          {
            art: 'text',
            text: 'Typische Fehler (laut Bewertung): eine überflüssige Projektion ergänzen, obwohl SELECT * keine vorsieht (−1), und die beiden Bedingungen mit ODER (∨) statt UND (∧) verknüpfen (−1).',
          },
        ],
      },
      {
        nr: 22,
        titel: 'b) SQL → Relationenalgebra (3 Punkte)',
        text: 'Formulieren Sie den folgenden SQL-Ausdruck als Folge von Operationen der Relationenalgebra.',
        sqlQuery: '(SELECT B FROM V)\nUNION\n(SELECT B FROM W)',
        loesung: [
          {
            art: 'text',
            text: 'SELECT B FROM V wählt nur die Spalte B aus V → das ist die Projektion π[B](V). Ebenso ist SELECT B FROM W die Projektion π[B](W). Das SQL-Schlüsselwort UNION entspricht dem Vereinigungsoperator ∪ der Mengenlehre.',
          },
          {
            art: 'unterpunkt',
            label: 'Lösung',
            text: 'π[B] (V) ∪ π[B] (W)',
          },
          {
            art: 'text',
            text: 'Typischer Fehler (laut Bewertung): den falschen Mengenoperator verwenden, z. B. Durchschnitt (∩) oder Kreuzprodukt (×) statt Vereinigung (∪) (−2).',
          },
        ],
      },
      {
        nr: 23,
        titel: 'c) SELECT B FROM V  vs.  π[B](V) (3 Punkte)',
        text:
          'Liefert die SQL-Anfrage SELECT B FROM V die gleichen Ergebnisse wie die Abfrage π[B](V) der ' +
          'Relationenalgebra? Begründen Sie Ihre Antwort.',
        sqlQuery: 'SELECT B FROM V',
        loesung: [
          {
            art: 'unterpunkt',
            label: 'Antwort',
            text: 'Nein, die Ergebnisse sind im Allgemeinen nicht gleich.',
          },
          {
            art: 'text',
            text: 'Begründung: Die Relationenalgebra arbeitet auf Mengen – eine Relation enthält per Definition keine doppelten Tupel. π[B](V) entfernt Duplikate also automatisch und liefert die 5 verschiedenen Werte { gelb, grün, blau, rot, orange }.',
          },
          {
            art: 'text',
            text: 'SQL arbeitet dagegen auf Multimengen (Bags): SELECT B FROM V behält Duplikate und liefert alle 11 B-Werte (z. B. „grün", „blau", „rot" mehrfach). Die beiden Ergebnisse unterscheiden sich somit in der Anzahl der Zeilen.',
          },
          {
            art: 'unterpunkt',
            label: 'Vergleichbare SQL-Anfrage',
            text: 'Um π[B](V) in SQL nachzubilden, muss man Duplikate explizit entfernen: SELECT DISTINCT B FROM V.',
          },
        ],
      },

      // ---- Aufgabe 3 (SQL-Anfragen auf Relation V mit Nullwerten) ----
      {
        nr: 30,
        titel: 'Aufgabe 3 (SQL-Anfragen)',
        text:
          'Tragen Sie die Ergebnisse der folgenden SQL-Anfragen ein. Nullwerte in der Tabelle sind durch einen ' +
          'Bindestrich (–) dargestellt. Achten Sie besonders auf die Drei-wertige Logik (NULL → UNKNOWN) und ' +
          'auf den Unterschied zwischen IS NULL und = NULL.',
        tabellen: [
          {
            titel: 'Relation V',
            columns: ['A', 'B', 'C', 'D'],
            rows: [
              ['1', '4', '10', '110'],
              ['2', '–', '110', '–'],
              ['3', '8', '30', '70'],
              ['4', '–', '–', '30'],
              ['5', '16', '60', '60'],
              ['6', '–', '90', '90'],
              ['7', '64', '–', '90'],
              ['8', '128', '110', '120'],
            ],
          },
        ],
      },
      {
        nr: 31,
        titel: 'a) Rechnung in der WHERE-Klausel (2 Punkte)',
        text: 'Gib A aller Zeilen aus, für die (B·20) > (D/2) gilt.',
        sqlQuery: 'SELECT A\nFROM V\nWHERE (B*20) > (D/2)',
        loesung: [
          {
            art: 'text',
            text: 'Für jede Zeile B·20 mit D/2 vergleichen. Ist B NULL (Zeilen 2, 4, 6), liefert die Rechnung NULL und der Vergleich wird UNKNOWN – diese Zeilen fallen weg.',
          },
          {
            art: 'tabelle',
            titel: 'Zeilenweise Prüfung',
            columns: ['A', 'B·20', 'D/2', 'B·20 > D/2 ?'],
            rows: [
              ['1', '80', '55', '✓'],
              ['2', 'NULL', '–', 'UNKNOWN → nein'],
              ['3', '160', '35', '✓'],
              ['4', 'NULL', '15', 'UNKNOWN → nein'],
              ['5', '320', '30', '✓'],
              ['6', 'NULL', '45', 'UNKNOWN → nein'],
              ['7', '1280', '45', '✓'],
              ['8', '2560', '60', '✓'],
            ],
          },
          {
            art: 'tabelle',
            titel: 'Ergebnis',
            columns: ['A'],
            rows: [['1'], ['3'], ['5'], ['7'], ['8']],
          },
        ],
      },
      {
        nr: 32,
        titel: 'b) OR-Verknüpfung (2 Punkte)',
        text: 'Gib A aller Zeilen aus, für die B = C ODER C > 90 gilt.',
        sqlQuery: 'SELECT A\nFROM V\nWHERE B = C OR C > 90',
        loesung: [
          {
            art: 'text',
            text: 'Eine Zeile zählt, sobald eine der beiden Bedingungen wahr ist. B = C ist in keiner Zeile erfüllt (und bei NULL ohnehin UNKNOWN). Es bleibt also C > 90.',
          },
          {
            art: 'liste',
            punkte: [
              'Zeile 2: C = 110 > 90 → ✓',
              'Zeile 8: C = 110 > 90 → ✓',
              'Zeile 6: C = 90 – nicht > 90 → nein; Zeile 7: C = NULL → UNKNOWN → nein.',
            ],
          },
          {
            art: 'tabelle',
            titel: 'Ergebnis',
            columns: ['A'],
            rows: [['2'], ['8']],
          },
        ],
      },
      {
        nr: 33,
        titel: 'c) IS NULL vs. = NULL (2 Punkte)',
        text: 'Gib A aller Zeilen aus, für die D IS NULL ODER B = NULL gilt.',
        sqlQuery: 'SELECT A\nFROM V\nWHERE D IS NULL OR B = NULL',
        loesung: [
          {
            art: 'text',
            text: 'Der zweite Teil B = NULL ist eine klassische Falle: Ein Vergleich mit = NULL ergibt IMMER UNKNOWN (nie wahr) – auch dort, wo B tatsächlich NULL ist. Korrekt wäre B IS NULL. Damit trägt B = NULL nichts bei und es zählt nur D IS NULL.',
          },
          {
            art: 'text',
            text: 'D IS NULL ist nur in Zeile 2 wahr (nur dort ist D ein Nullwert).',
          },
          {
            art: 'tabelle',
            titel: 'Ergebnis',
            columns: ['A'],
            rows: [['2']],
          },
          {
            art: 'text',
            text: 'Hinweis: Hätte dort B IS NULL gestanden, kämen zusätzlich die Zeilen 2, 4 und 6 in Frage – das Ergebnis wäre dann { 2, 4, 6 } gewesen.',
          },
        ],
      },
      {
        nr: 34,
        titel: 'd) UNION zweier Unterabfragen (2 Punkte)',
        text: 'Vereinige die beiden Spalten unter dem gemeinsamen Namen X und sortiere aufsteigend.',
        sqlQuery:
          '(SELECT A AS X FROM V WHERE A*B < D)\nUNION\n(SELECT B AS X FROM V WHERE A*D > C)\nORDER BY X',
        loesung: [
          {
            art: 'text',
            text: 'Beide Teilabfragen getrennt auswerten, dann mit UNION vereinigen (Duplikate entfallen) und nach X sortieren.',
          },
          {
            art: 'unterpunkt',
            label: 'Teil 1: SELECT A WHERE A·B < D',
            text: 'NULL bei B (Zeilen 2, 4, 6) → UNKNOWN. Es bleiben:',
            punkte: [
              'Zeile 1: A·B = 1·4 = 4 < 110 → A = 1',
              'Zeile 3: A·B = 3·8 = 24 < 70 → A = 3',
              'Zeilen 5/7/8: 80<60, 448<90, 1024<120 sind alle falsch.',
            ],
          },
          {
            art: 'unterpunkt',
            label: 'Teil 2: SELECT B WHERE A·D > C',
            text: 'Liefert die B-Werte folgender Zeilen:',
            punkte: [
              'Zeile 1: 1·110 = 110 > 10 → B = 4',
              'Zeile 3: 3·70 = 210 > 30 → B = 8',
              'Zeile 5: 5·60 = 300 > 60 → B = 16',
              'Zeile 8: 8·120 = 960 > 110 → B = 128',
              'Zeile 6: 6·90 = 540 > 90 wäre wahr, dort ist B aber NULL.',
            ],
          },
          {
            art: 'text',
            text: 'Vereinigung { 1, 3 } ∪ { 4, 8, 16, 128 } und aufsteigend sortiert ergibt das Ergebnis. (Den NULL-Wert aus Zeile 6 führt die Musterlösung nicht als eigene Ergebniszeile auf.)',
          },
          {
            art: 'tabelle',
            titel: 'Ergebnis',
            columns: ['X'],
            rows: [['1'], ['3'], ['4'], ['8'], ['16'], ['128']],
          },
        ],
      },
      {
        nr: 35,
        titel: 'e) Self-Join (2 Punkte)',
        text: 'Bilde alle Paare (V1, V2) mit V1.B ≥ V2.A UND V1.C = V2.D und gib V1.A und V2.A aus.',
        sqlQuery: 'SELECT V1.A, V2.A\nFROM V V1, V V2\nWHERE V1.B >= V2.A AND V1.C = V2.D',
        loesung: [
          {
            art: 'text',
            text: 'Am schnellsten zuerst die Verbindungsbedingung V1.C = V2.D auswerten (welche V2-Zeile passt zu welcher V1-Zeile), danach V1.B ≥ V2.A prüfen. Ist V1.B NULL, wird der Vergleich UNKNOWN und das Paar fällt weg.',
          },
          {
            art: 'tabelle',
            titel: 'Paare mit V1.C = V2.D, danach V1.B ≥ V2.A geprüft',
            columns: ['V1 (A,B,C)', 'V2 (A,D)', 'V1.B ≥ V2.A ?', 'Treffer?'],
            rows: [
              ['V1=3 (B=8, C=30)', 'V2=4 (D=30)', '8 ≥ 4 ✓', '(3, 4)'],
              ['V1=5 (B=16, C=60)', 'V2=5 (D=60)', '16 ≥ 5 ✓', '(5, 5)'],
              ['V1=8 (B=128, C=110)', 'V2=1 (D=110)', '128 ≥ 1 ✓', '(8, 1)'],
              ['V1=2 (B=NULL, C=110)', 'V2=1 (D=110)', 'NULL ≥ 1 → UNKNOWN', '–'],
              ['V1=6 (B=NULL, C=90)', 'V2=6,7 (D=90)', 'NULL ≥ 6/7 → UNKNOWN', '–'],
            ],
          },
          {
            art: 'tabelle',
            titel: 'Ergebnis',
            columns: ['V1.A', 'V2.A'],
            rows: [
              ['8', '1'],
              ['3', '4'],
              ['5', '5'],
            ],
          },
        ],
      },
      {
        nr: 36,
        titel: 'f) Outer Join (+), berechnete Spalte, ORDER BY (8 Punkte)',
        hinweis: 'nicht relevant',
        text:
          'Achtung: V1.C = V2.D(+) ist die Oracle-Schreibweise für einen LEFT OUTER JOIN – alle Zeilen von V1 ' +
          'bleiben erhalten, fehlt ein Partner in V2, wird mit NULL aufgefüllt.',
        sqlQuery:
          'SELECT V1.A, V2.A, V1.B + V2.D AS SUMME\nFROM V V1, V V2\nWHERE V1.C = V2.D(+) AND V1.A < 6\nORDER BY V1.A',
        loesung: [
          {
            art: 'text',
            text: 'Das (+) steht an V2.D, also ist V2 die „optionale" Seite: jede V1-Zeile mit V1.A < 6 bleibt erhalten, auch wenn kein V2 mit V2.D = V1.C existiert (dann sind V2.A und V2.D NULL). SUMME = V1.B + V2.D ist NULL, sobald einer der Summanden NULL ist. Am Ende nach V1.A sortieren.',
          },
          {
            art: 'tabelle',
            titel: 'Zeilenweise (nur V1.A < 6)',
            columns: ['V1.A (B, C)', 'Partner V2 (D = C)', 'V2.A', 'SUMME = V1.B + V2.D'],
            rows: [
              ['1 (B=4, C=10)', 'kein Partner (kein D=10)', '–', '4 + NULL = –'],
              ['2 (B=NULL, C=110)', 'V2=1 (D=110)', '1', 'NULL + 110 = –'],
              ['3 (B=8, C=30)', 'V2=4 (D=30)', '4', '8 + 30 = 38'],
              ['4 (B=NULL, C=NULL)', 'kein Partner (C ist NULL)', '–', 'NULL + NULL = –'],
              ['5 (B=16, C=60)', 'V2=5 (D=60)', '5', '16 + 60 = 76'],
            ],
          },
          {
            art: 'tabelle',
            titel: 'Ergebnis (sortiert nach V1.A)',
            columns: ['V1.A', 'V2.A', 'SUMME'],
            rows: [
              ['1', '–', '–'],
              ['2', '1', '–'],
              ['3', '4', '38'],
              ['4', '–', '–'],
              ['5', '5', '76'],
            ],
          },
        ],
      },

      // ---- Aufgabe 4 (Integritätsbedingungen) ----
      {
        nr: 40,
        titel: 'Aufgabe 4 (Integritätsbedingungen)',
        text:
          'Gegeben seien die folgenden Tabellendefinitionen mit Integritätsbedingungen. ' +
          'Die nachfolgenden INSERT-Anweisungen werden jeweils einzeln auf dem ursprünglichen Datenbestand ' +
          '(Tabellen X1 und X2 unten) geprüft: Welche Bedingung wird verletzt? Es wird maximal eine Bedingung verletzt, sonst „keine".\n\n' +
          'Die Bedingungen kurz:\n' +
          '• X1_CO_1: PRIMARY KEY (A, C) – Kombination eindeutig und nicht NULL\n' +
          '• X1_CO_2: LENGTH(B) ∈ {3, 4, 6, 7}\n' +
          '• X1_CO_3: D ∈ {1, 2, 4, 8, 16, 32, 64, 128, 256}\n' +
          '• X1_CO_4: D eindeutig (UNIQUE)\n' +
          '• X2_CO_1: PRIMARY KEY (A, E)\n' +
          '• X2_CO_2: FOREIGN KEY (A, B) → X1(A, C)\n' +
          '• X2_CO_3: FOREIGN KEY (E) → X1(D)\n' +
          '• X2_CO_4: D zwischen 12 und 16 (inkl.)',
        sqlQuery: `CREATE TABLE X1 (
  A INT,
  B VARCHAR(64),
  C INT,
  D INT,
  CONSTRAINT X1_CO_1 PRIMARY KEY (A, C),
  CONSTRAINT X1_CO_2 CHECK (LENGTH(B) IN (3,4,6,7)),
  CONSTRAINT X1_CO_3 CHECK (D IN (1,2,4,8,16,32,64,128,256)),
  CONSTRAINT X1_CO_4 UNIQUE (D)
);

CREATE TABLE X2 (
  A INT,
  B INT,
  C INT,
  D INT,
  E INT,
  CONSTRAINT X2_CO_1 PRIMARY KEY (A,E),
  CONSTRAINT X2_CO_2 FOREIGN KEY (A,B) REFERENCES X1(A,C),
  CONSTRAINT X2_CO_3 FOREIGN KEY (E) REFERENCES X1(D),
  CONSTRAINT X2_CO_4 CHECK (D BETWEEN 12 AND 16)
);`,
        tabellen: [
          {
            titel: 'X1 (Datenbestand)',
            columns: ['A', 'B', 'C', 'D'],
            rows: [
              ['1', 'blau', '2', '16'],
              ['3', 'rot', '4', '32'],
              ['5', 'gelb', '8', '64'],
              ['9', 'orange', '12', '256'],
              ['12', 'gelb', '16', '128'],
            ],
          },
          {
            titel: 'X2 (Datenbestand)',
            columns: ['A', 'B', 'C', 'D', 'E'],
            rows: [
              ['3', '4', '1', '13', '128'],
              ['3', '4', '3', '15', '64'],
              ['9', '12', '2', '14', '32'],
              ['12', '16', '–', '14', '16'],
              ['9', '12', '5', '14', '16'],
            ],
          },
        ],
      },
      {
        nr: 41,
        titel: 'a) INSERT in X1',
        text: 'Verletzt diese Anweisung eine Bedingung?',
        sqlQuery: "INSERT INTO X1 VALUES (1, 'magenta', 45, 128)",
        loesung: [
          {
            art: 'unterpunkt',
            label: 'X1_CO_4 verletzt (UNIQUE D)',
            text: 'D = 128 existiert bereits in der Zeile (12, gelb, 16, 128). Da D eindeutig sein muss, ist die UNIQUE-Bedingung verletzt.',
            punkte: [
              'PK (A, C) = (1, 45): neu ✓',
              "LENGTH('magenta') = 7 ∈ {3,4,6,7} ✓",
              'D = 128 ∈ erlaubte Werte ✓ – verletzt aber die Eindeutigkeit',
            ],
          },
        ],
      },
      {
        nr: 42,
        titel: 'b) INSERT in X1',
        text: 'Verletzt diese Anweisung eine Bedingung?',
        sqlQuery: "INSERT INTO X1 VALUES (4, 'orange', 32, 512)",
        loesung: [
          {
            art: 'unterpunkt',
            label: 'X1_CO_3 verletzt (CHECK auf D)',
            text: 'D = 512 ist keine der erlaubten Zweierpotenzen {1, 2, 4, …, 256} → CHECK-Bedingung verletzt.',
            punkte: [
              'PK (A, C) = (4, 32): neu ✓',
              "LENGTH('orange') = 6 ∈ {3,4,6,7} ✓",
              'D = 512 noch nicht vergeben (UNIQUE wäre erfüllt), scheitert aber am CHECK',
            ],
          },
        ],
      },
      {
        nr: 43,
        titel: 'c) INSERT in X1',
        text: 'Verletzt diese Anweisung eine Bedingung?',
        sqlQuery: "INSERT INTO X1 VALUES (11, 'orange', 14, 8)",
        loesung: [
          {
            art: 'unterpunkt',
            label: 'keine Verletzung',
            text: 'Alle Bedingungen sind erfüllt:',
            punkte: [
              'PK (A, C) = (11, 14): neu ✓',
              "LENGTH('orange') = 6 ∈ {3,4,6,7} ✓",
              'D = 8 ∈ erlaubte Werte ✓',
              'D = 8 noch nicht vergeben (UNIQUE) ✓',
            ],
          },
        ],
      },
      {
        nr: 44,
        titel: 'd) INSERT in X1',
        text: 'Verletzt diese Anweisung eine Bedingung?',
        sqlQuery: "INSERT INTO X1 VALUES (10, 'gruen', 15, 4)",
        loesung: [
          {
            art: 'unterpunkt',
            label: 'X1_CO_2 verletzt (CHECK auf LENGTH(B))',
            text: "LENGTH('gruen') = 5 ist nicht in {3, 4, 6, 7} → CHECK-Bedingung verletzt.",
            punkte: [
              'PK (A, C) = (10, 15): neu ✓',
              'D = 4 ∈ erlaubte Werte ✓ und noch nicht vergeben ✓',
            ],
          },
        ],
      },
      {
        nr: 45,
        titel: 'e) INSERT in X2',
        text: 'Verletzt diese Anweisung eine Bedingung?',
        sqlQuery: 'INSERT INTO X2 VALUES (1, 2, 3, 12, 256)',
        loesung: [
          {
            art: 'unterpunkt',
            label: 'keine Verletzung',
            text: 'Alle Bedingungen sind erfüllt:',
            punkte: [
              'PK (A, E) = (1, 256): neu ✓',
              'FK (A, B) = (1, 2) existiert in X1 als (A, C) ✓',
              'FK E = 256 existiert in X1.D ✓',
              'D = 12 ∈ [12, 16] ✓',
            ],
          },
        ],
      },
      {
        nr: 46,
        titel: 'f) INSERT in X2',
        text: 'Verletzt diese Anweisung eine Bedingung?',
        sqlQuery: 'INSERT INTO X2 VALUES (2, 9, NULL, 16, 128)',
        loesung: [
          {
            art: 'unterpunkt',
            label: 'X2_CO_2 verletzt (FOREIGN KEY (A,B) → X1(A,C))',
            text: '(A, B) = (2, 9) kommt in X1 nicht als (A, C) vor (X1 hat nur (1,2), (3,4), (5,8), (9,12), (12,16)) → Fremdschlüssel verletzt.',
            punkte: [
              'PK (A, E) = (2, 128): neu ✓',
              'FK E = 128 existiert in X1.D ✓',
              'D = 16 ∈ [12, 16] ✓',
              'C = NULL ist erlaubt (keine NOT-NULL-Bedingung auf C)',
            ],
          },
        ],
      },
      {
        nr: 47,
        titel: 'g) INSERT in X2',
        text: 'Verletzt diese Anweisung eine Bedingung?',
        sqlQuery: 'INSERT INTO X2 VALUES (3, 4, 3, 1, 256)',
        loesung: [
          {
            art: 'unterpunkt',
            label: 'X2_CO_4 verletzt (CHECK D BETWEEN 12 AND 16)',
            text: 'D = 1 liegt nicht im Bereich [12, 16] → CHECK-Bedingung verletzt.',
            punkte: [
              'PK (A, E) = (3, 256): neu ✓',
              'FK (A, B) = (3, 4) existiert in X1 als (A, C) ✓',
              'FK E = 256 existiert in X1.D ✓',
            ],
          },
        ],
      },
      {
        nr: 48,
        titel: 'h) INSERT in X2',
        text: 'Verletzt diese Anweisung eine Bedingung?',
        sqlQuery: 'INSERT INTO X2 VALUES (9, 12, 3, 14, 32)',
        loesung: [
          {
            art: 'unterpunkt',
            label: 'X2_CO_1 verletzt (PRIMARY KEY (A,E))',
            text: '(A, E) = (9, 32) existiert bereits in der Zeile (9, 12, 2, 14, 32) → Primärschlüssel nicht eindeutig.',
            punkte: [
              'FK (A, B) = (9, 12) existiert in X1 als (A, C) ✓',
              'FK E = 32 existiert in X1.D ✓',
              'D = 14 ∈ [12, 16] ✓',
            ],
          },
        ],
      },
      {
        nr: 49,
        titel: 'i) INSERT in X2',
        text: 'Verletzt diese Anweisung eine Bedingung?',
        sqlQuery: 'INSERT INTO X2 VALUES (5, 8, 3, 13, 256)',
        loesung: [
          {
            art: 'unterpunkt',
            label: 'keine Verletzung',
            text: 'Alle Bedingungen sind erfüllt:',
            punkte: [
              'PK (A, E) = (5, 256): neu ✓',
              'FK (A, B) = (5, 8) existiert in X1 als (A, C) ✓',
              'FK E = 256 existiert in X1.D ✓',
              'D = 13 ∈ [12, 16] ✓',
            ],
          },
        ],
      },
      {
        nr: 50,
        titel: 'j) INSERT in X2',
        text: 'Verletzt diese Anweisung eine Bedingung?',
        sqlQuery: 'INSERT INTO X2 VALUES (5, 8, NULL, 12, 512)',
        loesung: [
          {
            art: 'unterpunkt',
            label: 'X2_CO_3 verletzt (FOREIGN KEY (E) → X1(D))',
            text: 'E = 512 kommt in X1.D nicht vor (X1.D = {16, 32, 64, 256, 128}) → Fremdschlüssel verletzt.',
            punkte: [
              'PK (A, E) = (5, 512): neu ✓',
              'FK (A, B) = (5, 8) existiert in X1 als (A, C) ✓',
              'D = 12 ∈ [12, 16] ✓',
            ],
          },
        ],
      },

      // ---- Aufgabe 5 (Algebraische Optimierung) ----
      {
        nr: 60,
        titel: 'Aufgabe 5 (Algebraische Optimierung) (11 Punkte)',
        hinweis: 'nicht relevant',
        text:
          'Gegeben ist die bekannte Datenbank mit Abteilungen (ABT), Mitarbeitern (PERS), Projekten (PROJ) ' +
          'und Mitarbeit in Projekten (PM). Geben Sie im Operatorbaum je Knoten die erwartete Zeilenzahl ' +
          '(Tupel) und die Spaltenzahl an.\n\n' +
          'Annahmen: ABT hat 20 verschiedene A-ORT-Werte, PROJ hat 150 verschiedene P-ORT-Werte. ' +
          'Alle Werte sind statistisch unabhängig, gleichverteilt und kommen gleich häufig vor.\n\n' +
          'Operatorbaum (von unten nach oben):\n' +
          '1)  σ[A-ORT=\'F\'] (ABT)        und        PERS ⋈ PM\n' +
          '2)  ( σ[A-ORT=\'F\'] (ABT) )  ⋈  ( PERS ⋈ PM )      (Verbund über ANR)\n' +
          '3)  σ[P-ORT=\'HH\'] (PROJ)\n' +
          '4)  [ Ergebnis aus 2) ]  ⋈  σ[P-ORT=\'HH\'] (PROJ)   (Verbund über JNR)\n' +
          '5)  π[PNR, NAME, ANR, JNR] ( … )',
        tabellen: [
          {
            titel: 'Schema (Primärschlüssel zuerst)',
            columns: ['Relation', 'Attribute', 'Tupel'],
            rows: [
              ['ABT', 'ANR, BUDGET, A-ORT', 'M/4'],
              ['PERS', 'PNR, NAME, BERUF, GEHALT, ALTER, ANR', 'M'],
              ['PM', 'JNR, PNR, DAUER, ANTEIL', '5·M'],
              ['PROJ', 'JNR, BEZEICHNUNG, SUMME, P-ORT', 'N'],
            ],
          },
        ],
        loesung: [
          {
            art: 'text',
            text:
              'Regeln: Spalten – Selektion ändert nichts, Projektion = Anzahl der projizierten Attribute, ' +
              '(natürlicher) Join = Summe der Spalten minus die eine gemeinsame Verbund-Spalte. ' +
              'Zeilen – Selektion auf einen von k gleichverteilten Werten behält den Anteil 1/k; ein Join über ' +
              'einen Fremdschlüssel behält vom Mengen-seitigen Teilbaum nur den Anteil, der zu den verbleibenden ' +
              'Schlüsselwerten des anderen Teilbaums passt.',
          },
          {
            art: 'unterpunkt',
            label: '1a) σ[A-ORT=\'F\'] (ABT) → M/80 Zeilen, 3 Spalten',
            text: 'ABT hat M/4 Tupel und 3 Spalten. A-ORT hat 20 gleichverteilte Werte ⇒ Anteil 1/20: (M/4)·(1/20) = M/80. Spalten unverändert = 3.',
          },
          {
            art: 'unterpunkt',
            label: '1b) PERS ⋈ PM → 5·M Zeilen, 9 Spalten',
            text: 'PM hat 5·M Tupel, PNR ist in PERS Schlüssel, also findet jede PM-Zeile genau einen Mitarbeiter ⇒ 5·M Zeilen. Spalten = 6 (PERS) + 4 (PM) − 1 (gemeinsames PNR) = 9.',
          },
          {
            art: 'unterpunkt',
            label: '2) σ(ABT) ⋈ (PERS ⋈ PM) → M/4 Zeilen, 11 Spalten',
            text: 'Verbund über ANR. Die M/80 selektierten Abteilungen sind 1/20 aller M/4 Abteilungen; von den 5·M Zeilen des rechten Teilbaums bleibt also 1/20: 5·M·(1/20) = M/4. Spalten = 3 + 9 − 1 (gemeinsames ANR) = 11.',
          },
          {
            art: 'unterpunkt',
            label: '3) σ[P-ORT=\'HH\'] (PROJ) → N/150 Zeilen, 4 Spalten',
            text: 'PROJ hat N Tupel und 4 Spalten. P-ORT hat 150 gleichverteilte Werte ⇒ Anteil 1/150: N·(1/150) = N/150. Spalten unverändert = 4.',
          },
          {
            art: 'unterpunkt',
            label: '4) (…) ⋈ σ(PROJ) → M/600 Zeilen, 14 Spalten',
            text: 'Verbund über JNR. Die N/150 selektierten Projekte sind 1/150 aller N Projekte; von den M/4 Zeilen des linken Teilbaums bleibt 1/150: (M/4)·(1/150) = M/600. Spalten = 11 + 4 − 1 (gemeinsames JNR) = 14.',
          },
          {
            art: 'unterpunkt',
            label: '5) π[PNR, NAME, ANR, JNR] (…) → M/600 Zeilen, 4 Spalten',
            text: 'Eine Projektion ändert die Zeilenzahl nicht ⇒ M/600. Spalten = 4 (die vier projizierten Attribute).',
          },
          {
            art: 'tabelle',
            titel: 'Zusammenfassung (Wurzel ganz unten)',
            columns: ['Knoten', 'Zeilen', 'Spalten'],
            rows: [
              ["σ[A-ORT='F'] (ABT)", 'M/80', '3'],
              ['PERS ⋈ PM', '5·M', '9'],
              ['σ(ABT) ⋈ (PERS ⋈ PM)', 'M/4', '11'],
              ["σ[P-ORT='HH'] (PROJ)", 'N/150', '4'],
              ['(…) ⋈ σ(PROJ)', 'M/600', '14'],
              ['π[PNR, NAME, ANR, JNR] (…)', 'M/600', '4'],
            ],
          },
        ],
      },
    ],
  },
  {
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
        titel: 'a) Das Objekt A beschreibt …',
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
        titel: 'b) Das Objekt B beschreibt …',
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
        titel: 'c) Das Objekt C bezeichnet man als …',
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
        titel: 'd) Das Objekt D bezeichnet man als …',
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
        titel: 'e) E und F beschreiben eine Funktionalität. Es handelt sich um …',
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
        titel: 'a) Relationales Schema (3 Punkte)',
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
        titel: 'b) Verfeinertes relationales Schema (2 Punkte)',
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
        titel: 'a) Ist der Beziehungstyp [0,n] korrekt?',
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
        titel: 'b) Ist der Beziehungstyp [1,1] korrekt?',
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
        titel: 'c) Ist der Beziehungstyp [0,2] korrekt?',
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
        titel: 'd) Ist der Beziehungstyp [1,n] korrekt?',
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
        titel: 'e) Ist der Beziehungstyp [1,2] korrekt?',
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
        titel: 'f) Ist der Beziehungstyp [2,4] korrekt?',
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
        loesung: [
          {
            art: 'text',
            text: 'Offizielle Ergebnistabellen (leere Zeilen auf dem Blatt = Platzhalter und hier weggelassen):',
          },
          { art: 'tabelle', titel: '4a)', columns: ['A'], rows: [['3'], ['8'], ['9']] },
          { art: 'tabelle', titel: '4b)', columns: ['B'], rows: [['violett'], ['magenta'], ['orange']] },
          {
            art: 'tabelle',
            titel: '4c)',
            columns: ['A', 'E'],
            rows: [['1', '2'], ['2', '4'], ['2', '4'], ['3', '6'], ['3', '6'], ['4', '8']],
          },
          { art: 'tabelle', titel: '4d)', columns: ['COUNT(*)'], rows: [['72']] },
          {
            art: 'tabelle',
            titel: '4e)',
            columns: ['B', 'COUNT(*)'],
            rows: [['violett', '3'], ['rosa', '1'], ['blau', '2'], ['magenta', '2'], ['orange', '4']],
          },
          { art: 'tabelle', titel: '4f)', columns: ['D', 'COUNT(*)'], rows: [['X', '3'], ['S', '2']] },
          { art: 'tabelle', titel: '4g)', columns: ['B', 'MAX(C)'], rows: [['magenta', '50'], ['orange', '20']] },
          { art: 'tabelle', titel: '4h)', columns: ['COUNT(*)'], rows: [['6']] },
          {
            art: 'tabelle',
            titel: '4i)',
            columns: ['A', 'T1.B'],
            rows: [['2', 'blau'], ['6', 'orange'], ['6', 'orange']],
          },
          { art: 'tabelle', titel: '4j)', columns: ['B'], rows: [['violett'], ['magenta'], ['orange']] },
          { art: 'tabelle', titel: '4k)', columns: ['COUNT(*)'], rows: [['0']] },
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
        titel: 'a) INSERT INTO S VALUES (5, 4, 4)',
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
        titel: 'b) INSERT INTO S VALUES (7, NULL, 5)',
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
        titel: 'c) INSERT INTO S VALUES (5, 2, NULL)',
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
        titel: 'd) INSERT INTO S VALUES (NULL, 2, 2)',
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
        titel: 'e) INSERT INTO S VALUES (12, 3, 2)',
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
        titel: 'f) INSERT INTO S VALUES (7, 6, 7)',
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
        titel: 'g) INSERT INTO R VALUES (3, 8, 1, 3, 12)',
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
        titel: 'h) INSERT INTO R VALUES (2, 4, 2, 2, NULL)',
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
        titel: 'i) INSERT INTO R VALUES (3, 9, 1, 3, 4)',
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
        titel: 'j) INSERT INTO R VALUES (NULL, NULL, 3, 4, 9)',
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
        titel: 'k) INSERT INTO R VALUES (7, 2, 3, 8, 9)',
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
        titel: 'l) INSERT INTO R VALUES (4, 5, 2, 1, 7)',
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
        titel: '1) In relationaler Algebra (3 Punkte)',
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
        titel: '2) Als Operatorbaum (4 Punkte)',
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
        titel: 'a) Kanonische Überdeckung (3 Punkte)',
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
        titel: 'b) Hüllen von A und B (2 Punkte)',
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
        titel: 'c) Kandidatenschlüssel (2 Punkte)',
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
        titel: 'd) Zerlegung gemäß Boyce-Codd (BCNF) (3 Punkte + 1 Bonus)',
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
  },
]

