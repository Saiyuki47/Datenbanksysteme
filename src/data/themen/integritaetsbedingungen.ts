import type { Thema } from '../themen'

export const thema: Thema = {
  id: 'integritaetsbedingungen',
  nr: 0,
  title: 'Integritätsbedingungen: CHECK, Domänen & Schlüssel',
  subtitle:
    'Statische Bedingungen an den Zustand der Datenbasis: Datentypen und NOT NULL, ' +
    'Schlüssel (PRIMARY KEY, UNIQUE) und frei formulierte Wertebereichsregeln mit CHECK.',
  sections: [
    {
      heading: 'Worum geht es?',
      blocks: [
        {
          art: 'text',
          text:
            'Integritätsbedingungen legen fest, welche Daten in der Datenbank überhaupt erlaubt sind – ' +
            'sie sichern die Datenqualität. Man unterscheidet statische Integritätsbedingungen, die eine ' +
            'Bedingung an den ZUSTAND der Datenbasis stellen (jeder gültige Zustand muss sie erfüllen), von ' +
            'dynamischen Integritätsbedingungen, die Bedingungen an ZUSTANDSÜBERGÄNGE stellen (z. B. „ein Rang ' +
            'darf nie sinken"). Dieses Thema behandelt die statischen Bedingungen.',
        },
        {
          art: 'text',
          text:
            'Zu den Integritätsbedingungen zählen laut Vorlesung: Schlüssel, Beziehungskardinalitäten, ' +
            'Attributdomänen und die Inklusion bei Generalisierung. Das DBMS überwacht sie automatisch: Eine ' +
            'Einfüge- oder Änderungsoperation, die eine Bedingung verletzen würde, wird zurückgewiesen.',
        },
        {
          art: 'merksatz',
          text:
            'Statische Integritätsbedingung = Bedingung an den Zustand der Datenbasis. ' +
            'Dynamische Integritätsbedingung = Bedingung an Zustandsübergänge.',
        },
      ],
    },
    {
      heading: 'Datentypen und NOT NULL (Attributdomänen)',
      blocks: [
        {
          art: 'text',
          text:
            'Schon der Datentyp einer Spalte ist eine Integritätsbedingung: Er schränkt die Attributdomäne, ' +
            'also den erlaubten Wertebereich, ein. Typische Typen in der Vorlesung sind integer (Ganzzahl), ' +
            'varchar(30) (Text mit bis zu 30 Zeichen), character(2) (genau 2 Zeichen) und numeric(2,1) ' +
            '(Dezimalzahl mit 2 Stellen, davon 1 nach dem Komma).',
        },
        {
          art: 'text',
          text:
            'Mit not null erzwingt man zusätzlich, dass die Spalte immer einen Wert enthält – ein Nullwert ist ' +
            'dann verboten. Das ist z. B. für den Namen einer Person sinnvoll.',
        },
        {
          art: 'tabelle',
          titel: 'Datentypen aus dem Universitätsschema',
          columns: ['Typ', 'Bedeutung', 'Beispielspalte'],
          rows: [
            ['integer', 'Ganzzahl', 'PersNr, SWS'],
            ['varchar(30)', 'Text bis 30 Zeichen', 'Name, Fachgebiet, Titel'],
            ['character(2)', 'genau 2 Zeichen', 'Rang'],
            ['numeric(2,1)', 'Dezimalzahl, 1 Nachkommastelle', 'Note'],
          ],
        },
      ],
    },
    {
      heading: 'Schlüssel: PRIMARY KEY, UNIQUE, FOREIGN KEY',
      blocks: [
        {
          art: 'text',
          text:
            'Schlüssel sind die wichtigste Klasse von Integritätsbedingungen. In SQL werden die drei ' +
            'Schlüsselarten so ausgedrückt:',
        },
        {
          art: 'tabelle',
          titel: 'Schlüssel in SQL',
          columns: ['Begriff', 'SQL', 'Bedeutung'],
          rows: [
            ['Primärschlüssel', 'primary key', 'identifiziert jede Zeile eindeutig – eindeutig UND nicht NULL'],
            ['Kandidatenschlüssel', 'unique', 'Werte müssen eindeutig sein (ein Nullwert bleibt erlaubt)'],
            ['Fremdschlüssel', 'foreign key … references', 'Wert muss in der referenzierten Relation existieren oder NULL sein'],
          ],
        },
        {
          art: 'text',
          text:
            'Der Fremdschlüssel stellt die referentielle Integrität her (was mit den referenzierten Daten bei ' +
            'einer Änderung passiert – on delete cascade / set null – behandelt das Thema „Referentielle ' +
            'Integrität"). Hier interessiert nur: foreign key verweist auf einen Schlüssel einer anderen ' +
            'Relation.',
        },
        {
          art: 'merksatz',
          text:
            'primary key = unique + not null. Deshalb braucht man beim Primärschlüssel kein zusätzliches ' +
            'not null zu schreiben.',
        },
      ],
    },
    {
      heading: 'Wertebereiche mit CHECK einschränken',
      blocks: [
        {
          art: 'text',
          text:
            'Über den Datentyp hinaus formuliert man mit einer check-Klausel eine eigene, frei wählbare Regel für ' +
            'die erlaubten Werte einer Spalte. Zwei besonders häufige Formen:',
        },
        {
          art: 'liste',
          punkte: [
            'Wertebereichseinschränkung mit between: der Wert muss in einem Zahlenbereich (inklusive der Grenzen) liegen.',
            'Aufzählungstyp mit in: der Wert muss aus einer festen Liste erlaubter Werte stammen.',
          ],
        },
        {
          art: 'sql',
          titel: 'Wertebereichseinschränkung (aus der Vorlesung)',
          code: 'check Semester between 1 and 13',
        },
        {
          art: 'sql',
          titel: 'Aufzählungstyp (aus der Vorlesung)',
          code: "check Rang in ('C2', 'C3', 'C4')",
        },
        {
          art: 'text',
          text:
            'Bei jeder Änderung und jedem Einfügen wird die check-Klausel ausgewertet. Die Operation wird nur ' +
            'durchgeführt, wenn der check TRUE ergibt – andernfalls wird sie zurückgewiesen. Komplexere ' +
            'Konsistenzbedingungen werden von den Systemen nur selten oder gar nicht unterstützt.',
        },
      ],
    },
    {
      heading: 'Spaltenbedingung vs. Tabellenbedingung',
      blocks: [
        {
          art: 'text',
          text:
            'Eine Integritätsbedingung kann direkt HINTER einer Spalte stehen (Spaltenbedingung) oder als eigene ' +
            'Zeile am Ende der Tabellendefinition (Tabellenbedingung). Bezieht sich eine Bedingung auf MEHRERE ' +
            'Spalten – etwa ein zusammengesetzter Primärschlüssel –, muss sie als Tabellenbedingung geschrieben ' +
            'werden.',
        },
        {
          art: 'text',
          text:
            'Beispiel: Bei hören besteht der Primärschlüssel aus MatrNr UND VorlNr. Deshalb steht er nicht hinter ' +
            'einer einzelnen Spalte, sondern als Tabellenbedingung primary key (MatrNr, VorlNr) am Ende.',
        },
      ],
    },
    {
      heading: 'Vollständiges Beispiel: create table Professoren',
      blocks: [
        {
          art: 'text',
          text:
            'Das Universitätsschema fasst mehrere dieser Bedingungen zusammen. Hier alle als Spaltenbedingung ' +
            'notiert: PersNr ist Primärschlüssel, der Name darf nicht fehlen, der Rang ist auf drei Werte ' +
            'beschränkt, und das Raum-Attribut ist eindeutig.',
        },
        {
          art: 'sql',
          titel: 'Professoren (aus der Vorlesung)',
          code:
            'create table Professoren (\n' +
            '  PersNr  integer      primary key,\n' +
            '  Name    varchar(30)  not null,\n' +
            "  Rang    character(2)  check (Rang in ('C2', 'C3', 'C4')),\n" +
            '  Raum    integer      unique\n' +
            ')',
        },
        {
          art: 'liste',
          punkte: [
            'PersNr integer primary key – Ganzzahl, identifiziert jeden Professor eindeutig.',
            'Name varchar(30) not null – Text bis 30 Zeichen, darf nicht NULL sein.',
            "Rang character(2) check (Rang in ('C2','C3','C4')) – genau 2 Zeichen, aber nur diese drei Werte erlaubt.",
            'Raum integer unique – jede Raumnummer höchstens einmal (Kandidatenschlüssel).',
          ],
        },
      ],
    },
    {
      heading: 'Beispiel: create table Assistenten',
      blocks: [
        {
          art: 'text',
          text:
            'Bei den Assistenten kommt ein Fremdschlüssel hinzu: Boss verweist auf einen Professor. Weil sich ' +
            'diese Bedingung als foreign key … references formulieren lässt, steht sie hier als Tabellenbedingung ' +
            'am Ende.',
        },
        {
          art: 'sql',
          titel: 'Assistenten (aus der Vorlesung)',
          code:
            'create table Assistenten (\n' +
            '  PersNr      integer      primary key,\n' +
            '  Name        varchar(30)  not null,\n' +
            '  Fachgebiet  varchar(30),\n' +
            '  Boss        integer,\n' +
            '  foreign key (Boss) references Professoren on delete set null\n' +
            ')',
        },
        {
          art: 'text',
          text:
            'Fachgebiet hat keine not-null-Bedingung und darf daher fehlen (NULL). Der Fremdschlüssel Boss darf ' +
            'ebenfalls NULL sein oder muss auf eine existierende PersNr in Professoren verweisen.',
        },
      ],
    },
    {
      heading: 'Beispiel: CHECK auf einem Zahlbereich (Note)',
      blocks: [
        {
          art: 'text',
          text:
            'Die Relation prüfen zeigt ein between-check auf einer Dezimalzahl: Eine Note muss zwischen 0.7 und ' +
            '5.0 liegen. Der Primärschlüssel (MatrNr, VorlNr) ist zusammengesetzt und steht deshalb als ' +
            'Tabellenbedingung.',
        },
        {
          art: 'sql',
          titel: 'prüfen (Auszug, aus der Vorlesung)',
          code:
            'create table prüfen (\n' +
            '  MatrNr  integer  references Studenten on delete cascade,\n' +
            '  VorlNr  integer  references Vorlesungen,\n' +
            '  PersNr  integer  references Professoren on delete set null,\n' +
            '  Note    numeric(2,1)  check (Note between 0.7 and 5.0),\n' +
            '  primary key (MatrNr, VorlNr)\n' +
            ')',
        },
        {
          art: 'merksatz',
          text:
            'Das DBMS garantiert automatisch: die Datentypen/Domänen, not null, die Eindeutigkeit von primary ' +
            'key und unique, jede check-Bedingung und die referentielle Integrität der Fremdschlüssel. Bei jeder ' +
            'Einfügung oder Änderung wird geprüft – bei Verletzung wird die Operation zurückgewiesen.',
        },
      ],
    },
  ],
}
