import type { TippSection } from '../../types'

export const blatt5Tipps: Record<string, TippSection[]> = {
  // ── Blatt 5 (Relationale Algebra) ─────────────────────────────────────────

  'blatt5-1': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Jeder Operator hat eine feste Wirkung: σ wählt Zeilen, π wählt Spalten (Duplikate weg), ∪ vereinigt, ∩ schneidet, − bildet die Differenz, × alle Tupel-Paare, ⋈[Bed] ist × + Selektion (Theta-Join), der natürliche Join ⋈ verbindet über alle gleichnamigen Spalten, ρ benennt Relation/Spalte um.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. σ/π wie gehabt.\n2. ∩ = Tupel in beiden, − = in u, nicht in v.\n3. u ⋈[u.B=v.B] v: aus u×v nur Zeilen mit u.B=v.B (gleiche Spaltennamen mit u./v. unterscheiden).\n4. u ⋈ v (natürlich): über alle gemeinsamen Spalten – bei gleichem Schema = Schnitt.\n5. ρ ändert nur Namen, nicht die Werte.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'u(4 Zeilen) × z(2) = 8. u ∩ v = {(a,2,a),(b,3,b)}. u − v = {(c,1,c),(a,2,d)}. u ⋈ v = u ∩ v (gleiches Schema).',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'π entfernt Duplikate. Bei ∪/∩/− müssen beide Relationen dasselbe Schema haben. Natürlicher Join (⋈ ohne Bedingung) verbindet über ALLE gleichnamigen Spalten – nicht mit dem Theta-Join verwechseln. ρ verändert keine Werte.',
    },
  ],

  'blatt5-2': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Aus einer deutschen Frage wird ein Algebra-Ausdruck: „welche Spalten?" → π, „mit Bedingung" → σ, „verknüpft über gemeinsames Attribut" → ⋈, „oder (zwei Mengen)" → ∪.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Quell-Relation(en) bestimmen.\n2. Filter (σ) ansetzen; Verknüpfungen (⋈) über das gemeinsame Attribut (gelesenVon=PersNr, gelesenVon=Boss, Note in prüfen).\n3. Am Ende mit π auf die gefragten Attribute reduzieren.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: "e) π[Name](Studenten ⋈ σ[Note=2](prüfen)).\nf) π[Titel,Name](Vorlesungen ⋈[gelesenVon=PersNr] Professoren).\nh) σ[SWS=4](Vorlesungen) ⋈[gelesenVon=Boss] Assistenten.",
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Join-Bedingung über das richtige Attributpaar wählen. „oder" zwischen Mengen ist ∪, „oder" innerhalb einer Bedingung ist ∨. Für „Note 2" über prüfen mit Studenten verbinden (gemeinsame MatrNr).',
    },
  ],

  'blatt5-3': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Dieselbe Frage („Welche Vorlesungen wurden geprüft?") in drei Join-Varianten: natürlicher Join (über gemeinsames Attribut VorlNr), Kartesisches Produkt + Selektion, und Theta-Join. Alle liefern dasselbe Ergebnis.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Vorlesungen und prüfen über VorlNr verbinden.\n2. natürlich: Vorlesungen ⋈ prüfen.\n3. ×: σ[Vorlesungen.VorlNr=prüfen.VorlNr](Vorlesungen × prüfen).\n4. Theta: Vorlesungen ⋈[VorlNr=VorlNr] prüfen. Am Ende π[Titel].',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'π[Titel](Vorlesungen ⋈ prüfen). In prüfen stehen VorlNr 5001/5041/4630 → Grundzüge, Ethik, Die 3 Kritiken.',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Beim Kartesischen Produkt die Verbundbedingung per Selektion NICHT vergessen. Der natürliche Join verbindet automatisch über VorlNr (das einzige gemeinsame Attribut). π[Titel] entfernt Duplikate.',
    },
  ],

  'blatt5-4': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Anfragen auf der Dichter-DB. Besonders „nur X": „nur X" heißt „X und nichts anderes" und wird über die Mengen-Differenz (−) gelöst: (alle, die X taten) minus (alle, die etwas ≠ X taten).',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. a/b: σ + π auf DRAMA bzw. DARSTELLER.\n2. c: DARSTELLER mit ROLLE über FIGUR joinen, σ[R_GESCHLECHT=\'Held\'].\n3. d: Differenz – (Faust∨Wallenstein) − (FIGUR≠Faust ∧ FIGUR≠Wallenstein).\n4. e: SCHAUSPIELER ⋈[W_ORT=G_ORT] DICHTER, dann π[NAME].',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: "d) π[PNR](σ[FIGUR='Faust'∨'Wallenstein'](DARSTELLER)) − π[PNR](σ[FIGUR≠'Faust'∧≠'Wallenstein'](DARSTELLER)) → {1}. Spieler 2 fällt raus (spielte auch Nathan/Tell/Mephisto).",
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: '„nur" NICHT mit einfacher Selektion lösen (das ergibt „mindestens"). Bei der Differenz auf PNR projizieren, bevor man subtrahiert. Join-Richtung W_ORT = G_ORT beachten.',
    },
  ],
}
