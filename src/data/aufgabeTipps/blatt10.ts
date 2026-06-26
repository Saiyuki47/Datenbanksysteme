import type { TippSection } from '../../types'

export const blatt10Tipps: Record<string, TippSection[]> = {
  // ── Blatt 10 (Integritätsbedingungen / Constraints) ───────────────────────

  'blatt10-1': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Constraints sichern die Datenintegrität: PRIMARY KEY (eindeutig + nicht null), NOT NULL, CHECK (erlaubte Werte), UNIQUE (keine Doppelung) und FOREIGN KEY (Verweis muss existieren). Beim FK legt ON DELETE fest, was beim Löschen des Verweisziels passiert.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Jede Spalte/Zeile im CREATE TABLE durchgehen und Constraints benennen.\n2. FK-Aktion beachten: SET NULL setzt den Verweis auf NULL, CASCADE löscht die abhängigen Zeilen mit.\n3. Professoren: PK PersNr, NOT NULL Name, CHECK Rang, UNIQUE Raum. Assistenten: PK, NOT NULL Name, FK Boss → Professoren (SET NULL).',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: "Rang CHARACTER(2) CHECK (Rang IN ('C2','C3','C4')); Raum INTEGER UNIQUE; FOREIGN KEY (Boss) REFERENCES Professoren ON DELETE SET NULL.",
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'SET NULL (Verweis wird NULL, Zeile bleibt) nicht mit CASCADE (Zeile wird gelöscht) verwechseln. UNIQUE erlaubt mehrere NULLs, ist aber nicht der Primärschlüssel. PK ist automatisch NOT NULL.',
    },
  ],

  'blatt10-2': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Das ER-Modell legt Schlüssel und Beziehungsstruktur fest (→ Primärschlüssel, Fremdschlüssel, zusammengesetzte Schlüssel der N:M-Beziehungen). Wertebereiche, UNIQUE, NOT NULL und referenzielle Aktionen kommen erst im Relationenschema dazu.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Aus dem ER ableitbar: PKs (MatrNr, PersNr, VorlNr), FK-Struktur (gelesenVon, Boss), zusammengesetzte Schlüssel (hören = (MatrNr,VorlNr)).\n2. Erst im Schema: CHECK (Semester 1–13, Rang, Note 0,7–5,0), UNIQUE (Raum), NOT NULL, ON DELETE-Aktionen.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'ER: „prüfen ist N:M“ ⇒ Schlüssel (MatrNr,VorlNr). Schema-Zusatz: Note CHECK (0.7–5.0), prüfen.PersNr ON DELETE SET NULL.',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Wertebereichs- und UNIQUE-Bedingungen sind NICHT im ER-Modell sichtbar – sie werden erst beim Anlegen ergänzt. Die ON-DELETE-Aktionen sind eine reine Schema-Entscheidung.',
    },
  ],

  'blatt10-3': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Fremdschlüssel verhindern „dangling references": Eine referenzierte Zeile/Tabelle kann nicht gelöscht werden, solange Verweise darauf bestehen – außer es ist ON DELETE CASCADE/SET NULL definiert.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Einfügen in der richtigen Reihenfolge (erst Professor 1111, dann Assistent mit Boss=1111).\n2. DROP/DELETE scheitert, wenn eine andere Tabelle referenziert (hören/prüfen/voraussetzen → Vorlesungen).\n3. Constraints im SQL Developer (Reiter „Constraints") ansehen.\n4. Verhalten ändern: prüfen mit VorlNr … ON DELETE CASCADE neu anlegen und mit daten.sql neu befüllen.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'VorlNr INTEGER REFERENCES Vorlesungen ON DELETE CASCADE → Löschen der Vorlesung 5041 entfernt nun auch die prüfen-Zeilen.',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Ohne CASCADE in prüfen blockiert der VorlNr-FK das Löschen der Vorlesung (auch wenn hören/voraussetzen CASCADE haben). Eine Tabelle lässt sich nicht droppen, solange sie referenziert wird. Daten nach dem Neuaufbau wieder einspielen.',
    },
  ],

  'blatt10-4': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Jede DML/DDL-Operation wird gegen alle Constraints geprüft. Eine Operation schlägt fehl, wenn sie einen PK doppelt belegt, einen FK ins Leere zeigt oder eine referenzierte Zeile/Tabelle ohne passende Aktion entfernen würde.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. DELETE/DROP: Gibt es Verweise darauf? Welche ON-DELETE-Aktion? Ohne Aktion → blockiert.\n2. INSERT: Existiert der Fremdschlüsselwert? Ist der Primärschlüssel noch frei? Liegt der Wert im CHECK-Bereich?',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'Ethik (5041) löschen scheitert an prüfen (VorlNr-FK ohne CASCADE). INSERT mit PersNr 2138 scheitert (kein solcher Professor). INSERT (28106,5001,…) scheitert (PK bereits vorhanden).',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'CASCADE in EINER referenzierenden Tabelle reicht nicht – blockiert eine ANDERE ohne Aktion, scheitert die ganze Operation. DROP TABLE scheitert an Referenzen selbst bei leerer Tabelle. PK-Duplikate immer prüfen.',
    },
  ],

  'blatt10-5': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Jede INSERT-Anweisung wird gegen ALLE Constraints der Tabelle geprüft: Primärschlüssel (CR1/CS1), CHECK-Bedingungen (CR2 Länge, CR3 Werteliste, CS3 Bereich), UNIQUE (CR4) und Fremdschlüssel (CS2). Ein einziger verletzter Constraint verhindert das Einfügen.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. PK: ist die Kombination (A,C) bzw. (A,E) noch frei?\n2. CHECK: liegt der Wert im erlaubten Bereich / hat B die erlaubte Länge?\n3. UNIQUE: ist D schon vergeben?\n4. FK: existiert der Zielwert (E als D in R)?',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: "LENGTH('gruen') = 5 ∉ {3,4,6,7} → CR2. D = 256 schon vorhanden → CR4. (A,E) = (9,32) schon vorhanden → CS1.",
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Jede Anweisung EINZELN betrachten (vorherige Einfügungen gelten als zurückgesetzt). UNIQUE(D) erlaubt jeden D-Wert nur einmal. FK verlangt, dass E als D-Wert in R existiert.',
    },
  ],
}
