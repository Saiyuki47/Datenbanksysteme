import type { TippSection } from '../../types'

export const blatt6Tipps: Record<string, TippSection[]> = {
  // ── Blatt 6 (Relationale Algebra: Anfragen & Optimierung) ─────────────────

  'blatt6-1': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Aus einem verfeinerten Schema liest man das ER-Diagramm „rückwärts": jeder Fremdschlüssel ist eine Beziehung. Wichtig: Verfeinerung fasst 1:1/1:N/N:1 in Entity-Relationen zusammen – nur N:M-Beziehungen (hier Hat_Zugriff_Auf) behalten eine eigene Relation. Bei den Anfragen gilt: σ filtert, π wählt Spalten, ⋈ verknüpft, γ aggregiert.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. FK MitarbeiterID in Notebook → besitzt (1:1); AbtNr in Mitarbeiter → arbeitet_in (N:1); AbtNr in Server → benutzt_von (1:N); ServerID in Serveranwendung → existieren_auf (N:1); eigene Relation Hat_Zugriff_Auf → N:M.\n2. Anfragen: Filter früh ansetzen, dann joinen, am Ende projizieren.\n3. „kein Notebook" → Differenz oder Anti-Semi-Join; „wie viele … je …" → γ mit count(*).',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: "a) σ[Marke='Acer' ∧ RAM>6](Notebook).\nd) π[…](σ[Geburtsjahr>2001](Mitarbeiter)) − π[…](σ[…](Mitarbeiter ⋈ Notebook)).\ne) γ[Bezeichnung; count(*)→AnzahlMitarbeiter](Mitarbeiter ⋈ Abteilung).",
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Nicht jede Beziehung des ER-Diagramms ist im verfeinerten Schema als eigene Relation sichtbar. „kein/ohne" lässt sich nicht mit einfacher Selektion ausdrücken – Differenz/Anti-Join nutzen. Bei der Aggregation das Gruppierungsattribut (Bezeichnung) angeben.',
    },
  ],

  'blatt6-2': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: '„oder" über ganze Spalten ist eine Vereinigung (∪). Ein Self-Join (eine Tabelle mit sich selbst) braucht Umbenennung (ρ), damit man die zwei Kopien (M1, M2) unterscheiden kann. Bei gleichnamigen Attributen in zwei Relationen ist ein Theta-Join (mit expliziter Bedingung) statt des natürlichen Joins nötig.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. a) π[Festplattenkapazität] beider Tabellen vereinigen.\n2. b) Abteilung ⋈ Server, dann Theta-Join mit Serveranwendung über ServerID, filtern auf Name=SalesForceCRM.\n3. c) ρ[M1](Mitarbeiter) × ρ[M2](Mitarbeiter), σ auf gleiche AbtNr und ungleiche ID, dann die vier Namensspalten projizieren.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'c) σ[M1.AbtNr=M2.AbtNr ∧ M1.ID≠M2.ID] ( ρ[M1](Mitarbeiter) × ρ[M2](Mitarbeiter) ). Besser „<" statt „≠", um (Tom,Lisa) und (Lisa,Tom) nicht doppelt zu erhalten.',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Beim Self-Join die Umbenennung (ρ) nicht vergessen, sonst sind die Spalten nicht unterscheidbar. Bei Server/Serveranwendung den Theta-Join über ServerID erzwingen (gleichnamige Spalten ServerID/Name!). „≠" lässt Spiegelpaare zu – „<" vermeidet sie.',
    },
  ],

  'blatt6-3': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Mehrfach-Joins über die Universitätsdatenbank. Man verkettet die Tabellen entlang ihrer gemeinsamen Schlüssel (Studenten–hören–Vorlesungen; Assistenten–Vorlesungen über Boss=gelesenVon; Vorlesungen–voraussetzen über VorlNr=Vorgänger).',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: "1. (1): σ[Name='Theophrastos'](Studenten) ⋈ hören ⋈ Vorlesungen, dann π[VorlNr,Titel].\n2. (2): Assistenten ⋈[Boss=gelesenVon] Vorlesungen, dann ⋈[VorlNr=Vorgänger] voraussetzen (Nachfolger existiert), σ[SWS=4], π[Name].",
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: '„hat eine Nachfolgervorlesung" ⇒ Join mit voraussetzen über VorlNr = Vorgänger. „hält Vorlesung" ⇒ Boss/gelesenVon = PersNr der/des Professor:in.',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Die richtige Join-Spalte wählen: gelesenVon (Vorlesung→Professor) vs. Boss (Assistent→Professor) vs. Vorgänger/Nachfolger (voraussetzen). σ[SWS=4] und der Bezug zu Nachfolgern dürfen nicht verlorengehen.',
    },
  ],

  'blatt6-4': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Praktische Einrichtung: einen SQL-Client installieren, eine individuelle Verbindung anlegen und mit zwei Skripten das Universitätsschema erzeugen (DDL) und befüllen (DML).',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. SQL-Client installieren (SQL Developer/DBeaver/DataGrip).\n2. Verbindung anlegen: Host zeus.informatik.hs-fulda.de, Port 1521, SID zeuspdb1, eigene Kennung.\n3. schema_rn.sql, dann daten.sql ausführen.\n4. Screenshots (Verbindung „Erfolgreich" + Tabellen/Daten) abgeben.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'Test der Daten: SELECT * FROM pruefen; Zum Zurücksetzen einfach beide Skripte erneut nacheinander ausführen.',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Reihenfolge beachten: erst schema_rn.sql (Tabellen), dann daten.sql (Daten). Bei „Tabelle existiert bereits" zuerst das Schema-Skript erneut laufen lassen.',
    },
  ],
}
