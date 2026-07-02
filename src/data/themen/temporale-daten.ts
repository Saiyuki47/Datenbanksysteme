import type { Thema } from '../themen'

export const thema: Thema = {
  id: 'temporale-daten',
  nr: 0,
  title: 'Temporale Daten',
  subtitle:
    'Nicht nur den AKTUELLEN Zustand speichern, sondern auch, wie die Daten früher aussahen bzw. ' +
    'ab wann sie fachlich gelten. In der Vorlesung nur am Rande und stark herstellerspezifisch.',
  sections: [
    {
      heading: 'Worum geht es?',
      blocks: [
        {
          art: 'text',
          text:
            'Eine normale Tabelle kennt nur den JETZT-Zustand: Ändert oder löscht man eine Zeile, ist der alte ' +
            'Wert weg. Temporale Daten bewahren stattdessen auch die HISTORISCHEN Zustände auf – man kann also ' +
            'fragen, wie eine Zeile zu einem früheren Zeitpunkt aussah oder in welchem Zeitraum ein Wert galt.',
        },
        {
          art: 'text',
          text:
            'Man unterscheidet zwei Zeitachsen: die Transaktionszeit (transaction time) – WANN stand ein Wert in ' +
            'der Datenbank? – und die Anwendungszeit (application time) – AB WANN und BIS WANN gilt ein Wert ' +
            'fachlich in der realen Welt? Beide werden über je zwei Zeitstempel (von-Zeitpunkt und bis-Zeitpunkt) ' +
            'als Intervall abgebildet.',
        },
        {
          art: 'merksatz',
          text:
            'Vorlesungshinweis: Das meiste ist herstellerspezifisch – vor allem MS SQL Server. Die ' +
            'system-versionierten Tabellen scheinen nur für MS SQL zu existieren.',
        },
      ],
    },
    {
      heading: 'System-versionierte Daten – Transaktionszeit',
      blocks: [
        {
          art: 'text',
          text:
            'Bei system-versionierten Tabellen führt die Datenbank die Versionierung AUTOMATISCH. Man legt zwei ' +
            'Zeitstempel-Spalten für Beginn und Ende der Gültigkeit an; das System pflegt sie selbst und schiebt ' +
            'bei jeder Änderung die bisherige Zeile in eine zugehörige Historientabelle. Der Zeitbezug ist die ' +
            'Transaktionszeit: „von wann bis wann stand dieser Wert so in der Datenbank".',
        },
        {
          art: 'sql',
          titel: 'System-versionierte Tabelle (MS SQL Server)',
          code:
            'CREATE TABLE Studiengebuehren (\n' +
            '  Land VARCHAR(30) PRIMARY KEY,\n' +
            '  Betrag INT,\n' +
            '  GueltigVon DATETIME2 GENERATED ALWAYS AS ROW START,\n' +
            '  GueltigBis DATETIME2 GENERATED ALWAYS AS ROW END,\n' +
            '  PERIOD FOR SYSTEM_TIME (GueltigVon, GueltigBis)\n' +
            ')\nWITH (SYSTEM_VERSIONING = ON)',
        },
        {
          art: 'text',
          text:
            'Abgefragt wird ein früherer Zustand mit FOR SYSTEM_TIME AS OF <Zeitpunkt>. In SQL Server ist dabei ' +
            'ein cast auf das Datum nötig. Beispiel: der Zustand der Relation, wie er nach Abschaffung der ' +
            'Studiengebühren in Bayern galt.',
        },
        {
          art: 'beispiel',
          titel: 'Beispiel – Zustand zu einem früheren Zeitpunkt (AS OF)',
          sql:
            "SELECT Land, Betrag\n" +
            "FROM Studiengebuehren\n" +
            "FOR SYSTEM_TIME AS OF CAST('2013-01-01' AS DATETIME2)",
          erklaerung:
            'FOR SYSTEM_TIME AS OF liefert die Zeilen so, wie sie zum genannten Zeitpunkt in der Datenbank ' +
            'standen – nicht den heutigen Stand. In SQL Server benötigt das genannte Datum ein CAST auf einen ' +
            'Datums-/Zeittyp (cast for date).',
          ergebnis: { columns: ['Land', 'Betrag'], rows: [['Bayern', '500']] },
        },
      ],
    },
    {
      heading: 'Anwendungszeit – fachliche Gültigkeit',
      blocks: [
        {
          art: 'text',
          text:
            'Die Anwendungszeit (application time) beschreibt die FACHLICHE Gültigkeit in der realen Welt und wird ' +
            'EXPLIZIT kontrolliert: Man setzt von- und bis-Zeitpunkt selbst und drückt so einen bewusst gewählten ' +
            'Zustand der Datenbasis aus – etwa „dieser Preis gilt vom 01.01. bis zum 30.06.". Das ist unabhängig ' +
            'davon, wann die Zeile tatsächlich eingetragen wurde.',
        },
        {
          art: 'beispiel',
          titel: 'Beispiel – Gültigkeitsintervall selbst setzen',
          sql:
            "INSERT INTO Preis (Artikel, Betrag, GiltVon, GiltBis)\n" +
            "VALUES ('Buch', 20, DATE '2025-01-01', DATE '2025-06-30')",
          erklaerung:
            'Beginn und Ende der fachlichen Gültigkeit werden hier von Hand angegeben. Über solche Intervalle ' +
            'lässt sich später gezielt abfragen, welcher Wert an einem bestimmten Tag galt.',
        },
        {
          art: 'merksatz',
          text:
            'Vorlesungshinweis (not in MS SQL Server): Die automatische Erzeugung der Zeitintervalle für die ' +
            'Anwendungszeit gibt es in MS SQL Server nicht – dort wird die Anwendungszeit explizit kontrolliert.',
        },
        {
          art: 'tabelle',
          titel: 'Transaktionszeit vs. Anwendungszeit',
          columns: ['', 'Transaktionszeit', 'Anwendungszeit'],
          rows: [
            ['Frage', 'Wann stand der Wert in der DB?', 'Ab wann gilt der Wert fachlich?'],
            ['Pflege', 'automatisch (system-versioniert)', 'explizit / von Hand kontrolliert'],
            ['Hersteller', 'scheint nur MS SQL Server', 'Automatik not in MS SQL Server'],
          ],
        },
      ],
    },
  ],
}
