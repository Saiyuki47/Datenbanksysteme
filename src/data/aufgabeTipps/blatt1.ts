import type { TippSection } from '../../types'

export const blatt1Tipps: Record<string, TippSection[]> = {
  // ── Blatt 1 (Grundlagen / Theorie) ────────────────────────────────────────

  'blatt1-1': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Ein DBMS löst genau die Nachteile reiner Dateiverwaltung. Die 7 Standardnachteile sind: Redundanz & Inkonsistenz, beschränkter Datenzugriff, Datenisolation, Integritätsprobleme, Atomarität, Mehrbenutzerbetrieb, Sicherheit.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Jeden der 7 Nachteile kurz erklären\n2. Zu jedem Nachteil ein konkretes Beispiel aus dem Bibliotheks-Anwendungsfall nennen\n3. Über den Anwendungsfall hinaus denken: Datensicherung, Zugriffskontrolle',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'Redundanz: Buchtitel steht in "Buch" und "Ausleihe" → Änderung an einer Stelle führt zu Widerspruch.\nMehrbenutzerbetrieb: Zwei Bibliothekare verleihen gleichzeitig das letzte Exemplar.',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Nicht nur benennen – auch erläutern und ein Beispiel geben. Redundanz und Inkonsistenz sind verwandt, aber zu trennen: Redundanz ist die Ursache, Inkonsistenz die Folge.',
    },
  ],

  'blatt1-2': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Das alte File-Processing-System von PVFC hat dieselben Grundprobleme wie in Aufgabe 1: jede Anwendung pflegt eigene Dateien, was Redundanz und fehlende Integration erzeugt.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: 'a) Figure 1-2 analysieren: Welche Anwendungen haben eigene Dateien? Wo entstehen Redundanz und Inkonsistenz?\nb) Den zugeteilten Abschnitt des Fallstudien-Textes lesen und in Stichpunkten auf dem Etherpad zusammenfassen.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'Kernprobleme: getrennte Dateien je Anwendungsbereich, keine zentrale Verwaltung, Daten werden mehrfach gehalten (z. B. Kundendaten in Bestell- und Rechnungssystem).',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Teil b) ist eine kollaborative Aufgabe – jede Gruppe fasst nur ihren Abschnitt zusammen. Der Inhalt hängt vom zugeteilten Abschnitt ab.',
    },
  ],

  'blatt1-3': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Relationales Modell: Daten in Tabellen, Beziehungen über Fremdschlüssel, Abfragen per SQL/JOIN.\nGraphdatenbank: Knoten (Entitäten) + Kanten (Beziehungen) direkt gespeichert → effizient für stark vernetzte Daten.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: 'a) Unterschied + je 2 Einsatzgebiete pro Modell\nb.a) Schema = formale Strukturbeschreibung (Bauplan)\nb.b) Vorteile (Integrität, Konsistenz) vs. Nachteile (weniger flexibel, Migrationen) für Entwickler und Anwender',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'Relationale DB: ERP, Bankensysteme, Lagerverwaltung\nGraph-DB: soziale Netzwerke, Empfehlungssysteme, Betrugserkennung\nSchema: welche Tabellen, Attribute, Datentypen, Constraints – der "Bauplan" der Datenbank.',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Schema ≠ Daten: das Schema ist der Bauplan, die konkreten Einträge sind die Ausprägung. Tief verknüpfte Daten per JOIN im relationalen Modell sind teuer – das ist der Hauptvorteil von Graphdatenbanken.',
    },
  ],

  'blatt1-4': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Lost Update: Beide Transaktionen lesen denselben Ausgangswert x. Jede berechnet ihren neuen Wert unabhängig. Die zweite Schreiboperation überschreibt die erste – die Änderung von T1 geht verloren.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Ablauf mit den Operationen lesen, berechnen, schreiben aufstellen\n2. Beide Transaktionen verzahnen: T1 liest, T2 liest, T1 schreibt, T2 schreibt\n3. Endstand zeigen: x − z statt x − y − z\n4. Erklären: T2 hatte noch den alten Wert x gelesen',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'T1: liest x → berechnet x−y → schreibt x−y\nT2: liest x → berechnet x−z → schreibt x−z\nEndstand: x−z (korrekt wäre x−y−z)',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Der Ablauf muss die kritische Verzahnung zeigen: T2 muss VOR dem Schreibvorgang von T1 lesen. Abhilfe: Nebenläufigkeitskontrolle (Sperren/Locks) → Serialisierung der Zugriffe.',
    },
  ],
}
