import type { Uebungsblatt } from '../../types'

export const blatt10: Uebungsblatt = {
  id: 'blatt10',
  nr: '10',
  typ: 'Gruppen- & Hausaufgaben',
  beschreibung:
    'Integritätsbedingungen (Constraints): Primärschlüssel, NOT NULL, CHECK, UNIQUE und Fremdschlüssel mit ' +
    'referenzieller Aktion (ON DELETE SET NULL / CASCADE / NO ACTION). Welche Bedingungen aus dem ER-Modell ' +
    'stammen und welche erst im Schema entstehen, dazu praktische DDL-Operationen und Fehleranalysen.',
  tasks: [
    {
      nr: 1,
      titel: 'Gruppenaufgabe 1 – Constraints von Professoren & Assistenten',
      text:
        'a) Benennen und erläutern Sie die Integritätsbedingungen der Tabellen Professoren und Assistenten. ' +
        'b) Worin unterscheiden sich ON DELETE SET NULL (Assistenten.Boss) und ON DELETE CASCADE (hören)?',
      loesung: [
        {
          art: 'code',
          titel: 'Universitätsschema mit Constraints (Referenz)',
          text:
            'CREATE TABLE Studenten (\n' +
            '  MatrNr   INTEGER PRIMARY KEY,\n' +
            '  Name     VARCHAR(30) NOT NULL,\n' +
            '  Semester INTEGER CHECK (Semester BETWEEN 1 AND 13));\n\n' +
            'CREATE TABLE Professoren (\n' +
            '  PersNr INTEGER PRIMARY KEY,\n' +
            '  Name   VARCHAR(30) NOT NULL,\n' +
            "  Rang   CHARACTER(2) CHECK (Rang IN ('C2','C3','C4')),\n" +
            '  Raum   INTEGER UNIQUE);\n\n' +
            'CREATE TABLE Assistenten (\n' +
            '  PersNr     INTEGER PRIMARY KEY,\n' +
            '  Name       VARCHAR(30) NOT NULL,\n' +
            '  Fachgebiet VARCHAR(30),\n' +
            '  Boss       INTEGER,\n' +
            '  FOREIGN KEY (Boss) REFERENCES Professoren ON DELETE SET NULL);\n\n' +
            'CREATE TABLE hören (\n' +
            '  MatrNr INTEGER REFERENCES Studenten   ON DELETE CASCADE,\n' +
            '  VorlNr INTEGER REFERENCES Vorlesungen ON DELETE CASCADE,\n' +
            '  PRIMARY KEY (MatrNr, VorlNr));\n\n' +
            'CREATE TABLE prüfen (\n' +
            '  MatrNr INTEGER REFERENCES Studenten   ON DELETE CASCADE,\n' +
            '  VorlNr INTEGER REFERENCES Vorlesungen,\n' +
            '  PersNr INTEGER REFERENCES Professoren ON DELETE SET NULL,\n' +
            '  Note   NUMERIC(2,1) CHECK (Note BETWEEN 0.7 AND 5.0),\n' +
            '  PRIMARY KEY (MatrNr, VorlNr));',
        },
        {
          art: 'unterpunkt',
          label: 'a) Professoren',
          text: 'Vier Integritätsbedingungen:',
          punkte: [
            'PRIMARY KEY (PersNr): PersNr muss eindeutig und nicht NULL sein.',
            'NOT NULL (Name): Name darf nicht leer sein.',
            "CHECK (Rang IN ('C2','C3','C4')): Rang darf nur diese drei Werte annehmen.",
            'UNIQUE (Raum): Jeder Raum darf höchstens einem Professor zugewiesen sein.',
          ],
        },
        {
          art: 'unterpunkt',
          label: 'a) Assistenten',
          text: 'Drei Integritätsbedingungen:',
          punkte: [
            'PRIMARY KEY (PersNr): eindeutig und nicht NULL.',
            'NOT NULL (Name).',
            'FOREIGN KEY (Boss) REFERENCES Professoren ON DELETE SET NULL: Boss muss als PersNr in Professoren existieren; wird der referenzierte Professor gelöscht, wird Boss auf NULL gesetzt (der Assistent bleibt erhalten).',
          ],
        },
        {
          art: 'unterpunkt',
          label: 'b) SET NULL vs. CASCADE',
          text: 'Beide legen fest, was beim Löschen einer referenzierten Zeile passiert:',
          punkte: [
            'ON DELETE SET NULL (Assistenten.Boss): Wird der Professor gelöscht, wird der Fremdschlüssel-Wert (Boss) der referenzierenden Zeilen auf NULL gesetzt – die Zeilen bleiben bestehen.',
            'ON DELETE CASCADE (hören.MatrNr/VorlNr): Wird der referenzierte Student bzw. die Vorlesung gelöscht, werden die referenzierenden Zeilen in hören ebenfalls gelöscht.',
          ],
        },
      ],
    },
    {
      nr: 2,
      titel: 'Gruppenaufgabe 2 – ER-Modell vs. Schema',
      text:
        'Welche Integritätsbedingungen sind bereits durch die ER-Modellierung festgelegt und welche entstehen erst im ' +
        'Relationenschema (CREATE TABLE)?',
      loesung: [
        {
          art: 'unterpunkt',
          label: 'Bereits im ER-Modell',
          text: 'Aus dem ER-Modell ergeben sich Schlüssel und Beziehungsstruktur:',
          punkte: [
            'Die Schlüssel der Entitytypen (MatrNr, PersNr, VorlNr) werden zu Primärschlüsseln.',
            'Die N:M-Beziehungen (hören, voraussetzen, prüfen) erhalten als Schlüssel das Tupel aus den Fremdschlüsseln beider beteiligter Entitytypen (bei hören also (MatrNr, VorlNr)).',
            'Die Funktionalitäten der Beziehungen (z. B. lesen 1:N → Fremdschlüssel gelesenVon in Vorlesungen; arbeitenFür N:1 → Fremdschlüssel Boss in Assistenten).',
          ],
        },
        {
          art: 'unterpunkt',
          label: 'Erst im Schema (CREATE TABLE)',
          text: 'Diese Bedingungen sind im ER-Modell nicht enthalten und werden erst beim Anlegen festgelegt:',
          punkte: [
            'Wertebereichs-CHECKs: Semester BETWEEN 1 AND 13, Rang IN (C2,C3,C4), Note BETWEEN 0.7 AND 5.0.',
            'UNIQUE: Raum (jedem Professor ein eigenes Büro).',
            'NOT NULL (z. B. Name).',
            'Die referenziellen Aktionen ON DELETE SET NULL / CASCADE.',
          ],
        },
        {
          art: 'text',
          text:
            'Feinheiten: Bei hören/voraussetzen ist ON DELETE CASCADE sinnvoll, weil MatrNr/VorlNr Teil des ' +
            'Primärschlüssels und damit implizit NOT NULL sind (NULL-Belegungen wären auch fachlich unsinnig). Bei prüfen ' +
            'sorgt ON DELETE SET NULL für PersNr dafür, dass eine gelöschte Prüferin/ein Prüfer die Prüfung nicht entfernt ' +
            '(die Prüfung bleibt ohne Prüferinformation), während der VorlNr-Fremdschlüssel ohne Aktion das Löschen ' +
            'abgeprüfter Vorlesungen verhindert.',
        },
      ],
    },
    {
      nr: 3,
      titel: 'Gruppenaufgabe 3 – DDL-Operationen auf der Uni-DB',
      text:
        'Führen Sie die Anweisungen auf der Universitätsdatenbank (Schema aus Übung 7, schema_rn.sql – NICHT das Schema ' +
        'aus Gruppenaufgabe 1) aus und erklären Sie das Verhalten.',
      loesung: [
        {
          art: 'unterpunkt',
          label: '1) Assistent mit Boss = 1111 einfügen',
          text: 'Schlägt fehl: Der Fremdschlüssel Boss → Professoren verlangt einen existierenden Professor mit PersNr 1111 – den gibt es nicht.',
        },
        {
          art: 'unterpunkt',
          label: '2) Erst Professor 1111 anlegen, dann Assistent',
          text: 'Funktioniert nun: Nach dem INSERT des Professors mit PersNr 1111 existiert der referenzierte Wert, der Boss-Fremdschlüssel ist erfüllt.',
        },
        { art: 'code', text: "INSERT INTO Professoren VALUES (1111, 'Neu', 'C3', 999);\nINSERT INTO Assistenten VALUES (3999, 'Neu', 'KI', 1111);" },
        {
          art: 'unterpunkt',
          label: '3) Neuen Professor und Assistenten wieder löschen',
          text: 'Erst den Assistenten löschen, dann den Professor (oder den Professor zuerst – dann setzt ON DELETE SET NULL den Boss des Assistenten auf NULL).',
        },
        { art: 'code', text: 'DELETE FROM Assistenten WHERE PersNr = 3999;\nDELETE FROM Professoren WHERE PersNr = 1111;' },
        {
          art: 'unterpunkt',
          label: '4) DROP TABLE Vorlesungen',
          text: 'Schlägt fehl: hören, prüfen und voraussetzen referenzieren Vorlesungen über Fremdschlüssel. Solange diese Referenzen bestehen, lässt sich die Tabelle nicht löschen.',
        },
        {
          art: 'unterpunkt',
          label: '5) DELETE Vorlesung 5041 (Ethik)',
          text: 'Schlägt fehl: In hören und voraussetzen ist ON DELETE CASCADE definiert, in prüfen aber NICHT (der VorlNr-Fremdschlüssel hat keine Aktion). prüfen enthält ein Tupel mit VorlNr 5041 → das Default-Verhalten blockiert das Löschen, um „dangling references" zu vermeiden.',
        },
        {
          art: 'unterpunkt',
          label: '6) Constraints von prüfen anzeigen',
          text: 'Im SQL Developer: Tabelle prüfen → Reiter „Constraints" (oder per Abfrage von USER_CONSTRAINTS). prüfen hat: PK (MatrNr, VorlNr), FK auf Studenten (ON DELETE CASCADE), FK auf Vorlesungen, FK auf Professoren (ON DELETE SET NULL), CHECK Note 0,7–5,0.',
        },
        {
          art: 'unterpunkt',
          label: '7) DROP TABLE prüfen',
          text: 'Funktioniert: Keine andere Tabelle referenziert prüfen, also blockiert kein Fremdschlüssel.',
        },
        {
          art: 'unterpunkt',
          label: '8) prüfen mit VorlNr ON DELETE CASCADE neu anlegen',
          text: 'Tabelle neu erstellen, dabei den Fremdschlüssel auf Vorlesungen mit ON DELETE CASCADE definieren, dann mit daten.sql (Übung 7) neu befüllen.',
        },
        {
          art: 'code',
          text:
            'CREATE TABLE prüfen (\n' +
            '  MatrNr INTEGER REFERENCES Studenten   ON DELETE CASCADE,\n' +
            '  VorlNr INTEGER REFERENCES Vorlesungen ON DELETE CASCADE,\n' +
            '  PersNr INTEGER REFERENCES Professoren ON DELETE SET NULL,\n' +
            '  Note   NUMERIC(2,1) CHECK (Note BETWEEN 0.7 AND 5.0),\n' +
            '  PRIMARY KEY (MatrNr, VorlNr)\n' +
            ');',
        },
        {
          art: 'unterpunkt',
          label: '9) DELETE Vorlesung 5041 (erneut)',
          text: 'Funktioniert jetzt: Durch ON DELETE CASCADE in allen drei referenzierenden Tabellen (hören, voraussetzen, prüfen) werden die abhängigen Tupel beim Löschen der Vorlesung mitgelöscht.',
        },
        { art: 'code', text: 'DELETE FROM Vorlesungen WHERE VorlNr = 5041;' },
      ],
    },
    {
      nr: 4,
      titel: 'Hausaufgabe 1 – Operationen: erlaubt oder nicht?',
      text:
        'Beurteilen Sie für das Schema aus Gruppenaufgabe 1 und die Beispieldaten, ob die Operationen ausgeführt werden ' +
        'können:\n' +
        "(1) DELETE FROM Vorlesungen WHERE Titel = 'Ethik';\n" +
        '(2) INSERT INTO prüfen VALUES (24002, 5001, 2138, 2.0);\n' +
        '(3) INSERT INTO prüfen VALUES (28106, 5001, 2127, 4.3);\n' +
        '(4) DROP TABLE Studenten;',
      loesung: [
        {
          art: 'unterpunkt',
          label: '(1) Ethik löschen – schlägt fehl',
          text: 'Ethik ist VorlNr 5041 und wird in hören, voraussetzen und prüfen referenziert. In hören und voraussetzen ist ON DELETE CASCADE definiert (die Tupel würden mitgelöscht). In prüfen ist der VorlNr-Fremdschlüssel aber OHNE referenzielle Aktion – das Default-Verhalten verhindert „dangling references" und blockiert daher das Löschen (entspricht ON DELETE NO ACTION).',
        },
        {
          art: 'unterpunkt',
          label: '(2) Insert (…, 2138, …) – schlägt fehl',
          text: 'Es gibt keinen Professor mit PersNr 2138 (höchste ist 2137). Da prüfen.PersNr mit REFERENCES Professoren definiert ist, prüft das Insert die Existenz – der Fremdschlüssel wird verletzt.',
        },
        {
          art: 'unterpunkt',
          label: '(3) Insert (28106, 5001, …) – schlägt fehl',
          text: 'Der Primärschlüssel von prüfen ist (MatrNr, VorlNr). Das Tupel (28106, 5001) existiert bereits in prüfen → Primärschlüssel-Verletzung (die Note 4.3 selbst läge mit BETWEEN 0.7 AND 5.0 im erlaubten Bereich).',
        },
        {
          art: 'unterpunkt',
          label: '(4) DROP TABLE Studenten – schlägt fehl',
          text: 'prüfen und hören definieren REFERENCES-Constraints auf Studenten, die das Löschen der Tabelle verhindern – auch dann, wenn die Constraints CASCADE/SET NULL nutzen oder die Tabelle Studenten leer ist. Man könnte alle Studenten-Zeilen löschen, nicht aber die Tabelle selbst.',
        },
      ],
    },
    {
      nr: 5,
      titel: 'Hausaufgabe 2 – Constraint-Verstöße bei INSERTs (Tabellen R & S)',
      text:
        'Gegeben die Tabellen R und S mit ihren Constraints (siehe unten) und der aktuellen Ausprägung. Geben Sie für jede ' +
        'INSERT-Anweisung an, ob sie ausgeführt werden kann (OK) oder gegen welche benannte Bedingung sie verstößt. Jede ' +
        'Anweisung wird für sich betrachtet.',
      tabellen: [
        { titel: 'R', columns: ['A', 'B', 'C', 'D'], rows: [['1', 'blau', '2', '16'], ['3', 'rot', '4', '32'], ['5', 'gelb', '8', '64'], ['9', 'orange', '12', '256'], ['12', 'gelb', '16', '128']] },
        { titel: 'S', columns: ['A', 'B', 'C', 'D', 'E'], rows: [['3', '4', '1', '13', '128'], ['3', '4', '3', '15', '64'], ['9', '12', '2', '14', '32'], ['12', '16', null, '14', '16'], ['9', '12', '5', '14', '16']] },
      ],
      loesung: [
        {
          art: 'code',
          titel: 'Tabellendefinitionen',
          text:
            'CREATE TABLE R (A INT, B VARCHAR(64), C INT, D INT,\n' +
            '  CONSTRAINT CR1 PRIMARY KEY (A, C),\n' +
            '  CONSTRAINT CR2 CHECK (LENGTH(B) IN (3,4,6,7)),\n' +
            '  CONSTRAINT CR3 CHECK (D IN (1,2,4,8,16,32,64,128,256)),\n' +
            '  CONSTRAINT CR4 UNIQUE (D));\n\n' +
            'CREATE TABLE S (A INT, B INT, C INT, D INT, E INT,\n' +
            '  CONSTRAINT CS1 PRIMARY KEY (A, E),\n' +
            '  CONSTRAINT CS2 FOREIGN KEY (E) REFERENCES R(D),\n' +
            '  CONSTRAINT CS3 CHECK (D BETWEEN 12 AND 16));',
        },
        {
          art: 'tabelle',
          titel: 'Ergebnis je INSERT',
          columns: ['INSERT-Anweisung', 'Ergebnis'],
          rows: [
            ["a) R VALUES (1, 'magenta', 45, 512)", 'Verstoß CR3 (D = 512 nicht in der erlaubten Werteliste)'],
            ["b) R VALUES (4, 'orange', 32, 256)", 'Verstoß CR4 (D = 256 existiert bereits – UNIQUE)'],
            ["c) R VALUES (11, 'magenta', 14, 8)", 'OK'],
            ["d) R VALUES (10, 'gruen', 15, 4)", "Verstoß CR2 (LENGTH('gruen') = 5 ∉ {3,4,6,7})"],
            ['e) S VALUES (1, 2, 3, 12, 256)', 'OK (E = 256 existiert als D in R, D = 12 ∈ [12,16])'],
            ['f) S VALUES (3, 4, 3, 1, 256)', 'Verstoß CS3 (D = 1 nicht zwischen 12 und 16)'],
            ['g) S VALUES (9, 12, 3, 14, 32)', 'Verstoß CS1 (PK (A,E) = (9,32) existiert bereits)'],
          ],
        },
        {
          art: 'text',
          text:
            'Vorgehen je INSERT: alle Constraints prüfen – Primärschlüssel (eindeutig?), CHECK (Wert im erlaubten Bereich/' +
            'Länge?), UNIQUE (Wert schon da?), Fremdschlüssel (Zielwert existiert?). Schon ein verletzter Constraint ' +
            'verhindert das Einfügen.',
        },
      ],
    },
  ],
}
