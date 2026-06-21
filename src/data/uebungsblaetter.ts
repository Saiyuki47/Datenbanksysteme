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
          'Wenn zur Verwaltung von Daten lediglich auf Dateisysteme zurückgegriffen würde, ergäben sich diverse Nachteile. ' +
          'Nennen und erläutern Sie diese Nachteile kurz und geben Sie für jeden Nachteil ein Beispiel anhand des Anwendungsfalls.\n\n' +
          'Anwendungsfall: Eine kleine Bibliothek speichert Daten über ihre Bücher, ihre Leser und den Status ausgeliehener Bücher ' +
          'in drei Tabellen (Buch, Leser, Ausleihe) einer Tabellenverarbeitungssoftware.',
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
]

