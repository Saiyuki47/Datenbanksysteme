import type { Thema } from '../themen'

export const thema: Thema = {
  id: 'db-grundlagen',
  nr: 0,
  title: 'Datenbanksysteme: Grundlagen',
  subtitle:
    'Warum überhaupt ein Datenbanksystem statt einfacher Dateien? Datenmodelle, das ' +
    'Datenbankschema und das Grundproblem des parallelen Zugriffs (Lost Update).',
  sections: [
    {
      heading: 'Warum eine Datenbank statt Dateien?',
      blocks: [
        {
          art: 'text',
          text:
            'Bei reiner Dateiverwaltung (z. B. jede Anwendung mit eigenen Dateien oder Tabellen-Software) ' +
            'entstehen typische Nachteile. Ein Datenbankmanagementsystem (DBMS) ist genau die Software, die ' +
            'diese Probleme löst und den Zugriff mehrerer Anwendungen/Nutzer auf einen gemeinsamen, ' +
            'konsistenten Datenbestand organisiert.',
        },
        {
          art: 'tabelle',
          titel: 'Nachteile der Dateiverwaltung → Lösung durch das DBMS',
          columns: ['Nachteil', 'Problem', 'Was das DBMS leistet'],
          rows: [
            ['Redundanz & Inkonsistenz', 'Gleiche Daten mehrfach gespeichert → widersprüchlich', 'Einmalige Speicherung, kontrollierte Redundanz'],
            ['Beschränkter Datenzugriff', 'Für jede Auswertung ein eigenes Programm nötig', 'Flexible Abfragesprache (SQL)'],
            ['Datenisolation', 'Daten verstreut in Dateien/Formaten', 'Einheitliches Modell, Verknüpfung per Join'],
            ['Integritätsprobleme', 'Konsistenzbedingungen kaum durchsetzbar', 'Constraints (Schlüssel, CHECK, Fremdschlüssel)'],
            ['Atomarität & Sicherung', 'Kein „alles-oder-nichts", kein Backup/Recovery', 'Transaktionen, Recovery nach Absturz'],
            ['Mehrbenutzerbetrieb', 'Gleichzeitige Zugriffe → Anomalien (Lost Update)', 'Nebenläufigkeitskontrolle (Sperren)'],
            ['Sicherheit & Zugriffsschutz', 'Wer darf was sehen/ändern? kaum steuerbar', 'Rechte-/Rollenverwaltung'],
          ],
        },
        {
          art: 'merksatz',
          text:
            'Ein DBMS trennt die Daten von den Anwendungen und übernimmt zentral Konsistenz, ' +
            'Mehrbenutzerbetrieb, Sicherung und Zugriffsschutz.',
        },
      ],
    },
    {
      heading: 'Datenmodelle & Datenbankschema',
      blocks: [
        {
          art: 'text',
          text:
            'Das Datenmodell legt fest, WIE Daten strukturiert werden. Zwei häufig gegenübergestellte Modelle:',
        },
        {
          art: 'liste',
          punkte: [
            'Relationales Modell: Daten in Tabellen (Relationen) aus Zeilen und Spalten mit festem Schema. Beziehungen entstehen implizit über Fremdschlüssel und werden per JOIN ausgewertet. Einsatz: betriebliche/transaktionale Systeme (ERP, Banken, Lagerverwaltung), Reporting.',
            'Graphdatenbank: Daten als Knoten (Entitäten) und Kanten (Beziehungen); Beziehungen sind „erstklassig" und direkt gespeichert → stark vernetzte Daten lassen sich sehr effizient traversieren. Einsatz: soziale Netzwerke, Empfehlungssysteme, Betrugserkennung, Wissensgraphen.',
          ],
        },
        {
          art: 'text',
          text:
            'Kernunterschied: Das relationale Modell speichert Beziehungen implizit über Fremdschlüssel (tiefe ' +
            'Verknüpfungen → viele Joins), die Graphdatenbank explizit als Kanten (schnelles Traversieren).',
        },
        {
          art: 'merksatz',
          text:
            'Das Datenbankschema ist der Bauplan: welche Tabellen es gibt, ihre Attribute, Datentypen, ' +
            'Constraints und Beziehungen. Die konkreten Daten (die Ausprägung) müssen sich an das Schema ' +
            'halten. Modelle mit festem Schema (relational) sichern Integrität und Datenqualität, sind aber ' +
            'bei Änderungen unflexibler; schemalose Modelle sind flexibler, verlagern die Konsistenzprüfung ' +
            'aber in die Anwendung.',
        },
      ],
    },
    {
      heading: 'Mehrbenutzerbetrieb: Transaktionen & das Lost-Update-Problem',
      blocks: [
        {
          art: 'text',
          text:
            'Greifen mehrere Transaktionen unsynchronisiert auf denselben Wert zu, können Änderungen verloren ' +
            'gehen. Beispiel: Bestand x, Transaktion A bestellt y Stück, B bestellt z Stück. Korrekt wäre am ' +
            'Ende x − y − z. Ein verzahnter Ablauf, bei dem beide zuerst x lesen, verletzt das:',
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
          text:
            'Endstand: x − z statt x − y − z. Da B noch den ursprünglichen Wert x gelesen hatte, überschreibt ' +
            'Schritt 6 die Änderung von A – die Bestellung von A geht verloren („Lost Update").',
        },
        {
          art: 'merksatz',
          text:
            'Abhilfe schafft Nebenläufigkeitskontrolle: Transaktionen laufen isoliert (z. B. per Sperren/Locks), ' +
            'sodass die Zugriffe serialisiert werden. Transaktionen sind zudem atomar („alles oder nichts") und ' +
            'hinterlassen einen konsistenten Zustand (Grundidee von ACID).',
        },
      ],
    },
  ],
}
