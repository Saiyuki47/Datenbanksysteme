import type { TippSection } from '../../types'

export const blatt11Tipps: Record<string, TippSection[]> = {
  // ── Blatt 11 (Funktionale Abhängigkeiten & Normalisierung) ────────────────

  'blatt11-1': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'A → B heißt: gleiche A-Werte erzwingen gleiche B-Werte. Eine Ausprägung kann eine FD nur widerlegen (Gegenbeispiel), nie beweisen. Trivial ist A → B, wenn B in A enthalten ist (rechte Seite ⊆ linke Seite).',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Für A → B: Tupel mit gleichem A suchen; weichen die B-Werte ab → FD gilt nicht.\n2. Trivialität prüfen: steht die rechte Seite schon links?\n3. Konstante Spalten (z. B. C immer c₁) werden von allem bestimmt.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'C → D gilt NICHT, wenn C konstant ist, D aber variiert (c₁→d₁ und c₁→d₂). D → D und AB → B sind trivial.',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Eine FD nicht „beweisen" wollen – die Ausprägung zeigt nur, ob sie verletzt wird. Triviale FDs (rechte Seite ⊆ linke) erkennen. Konstante Spalten sind immer funktional bestimmt.',
    },
  ],

  'blatt11-2': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Die Attributhülle X⁺ ist die Menge aller Attribute, die aus X über die FDs ableitbar sind. Ist X⁺ = alle Attribute, ist X ein Superschlüssel; ist X dabei minimal, ein Kandidatenschlüssel. Die kanonische Überdeckung ist eine minimale, äquivalente FD-Menge.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Hülle: mit {X} starten, FDs anwenden, deren linke Seite enthalten ist, bis nichts mehr dazukommt.\n2. Kandidatenschlüssel: Attribute, die nie rechts vorkommen, müssen im Schlüssel sein.\n3. Fc: Linksreduktion → Rechtsreduktion → leere RHS entfernen → gleiche LHS zusammenfassen.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'A⁺: {A} →(A→BC) {A,B,C} →(AB→D) {A,B,C,D}. Fc von {A→BC, B→C, AB→D}: A→BD, B→C.',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Bei der Hülle alle anwendbaren FDs nutzen, nicht zu früh stoppen. Reihenfolge Fc: erst LINKS-, dann RECHTSreduktion. Ein Attribut, das nie rechts steht, gehört zwingend in jeden Schlüssel.',
    },
  ],

  'blatt11-4': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Mehrere Kandidatenschlüssel sind möglich, wenn sich Attribute gegenseitig bestimmen (Zyklus). Der Synthesealgorithmus baut aus der kanonischen Überdeckung eine verlustlose, abhängigkeitserhaltende 3NF-Zerlegung.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. A⁺ berechnen → Superschlüssel? 2. Alle minimalen Schlüssel finden (hier {A},{C},{E},{F}). 3. Fc bestimmen. 4. Je FD ein Schema Rα = α∪β. 5. Schema mit Kandidatenschlüssel sicherstellen; enthaltene Schemata streichen.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'Fc = {A→C, E→A, F→CD, C→BEF} → R₁{A,C}, R₂{E,A}, R₃{F,C,D}, R₄{C,B,E,F}. R₁ enthält Schlüssel → fertig.',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Bei der Linksreduktion mit Hüllen-Tests sauber prüfen, welches Attribut wirklich überflüssig ist. Erst NACH Fc die Schemata bilden. Kandidatenschlüssel-Schema und Eliminierungs-Schritt nicht vergessen.',
    },
  ],

  'blatt11-3': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Die kanonische Überdeckung ist nicht eindeutig: Der Algorithmus lässt offen, in welcher Reihenfolge die FDs (v. a. bei der Rechtsreduktion) bearbeitet werden. Verschiedene Reihenfolgen liefern verschiedene, aber äquivalente Fc.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: 'Ein Gegenbeispiel mit zwei sich gegenseitig bestimmenden FDs konstruieren und beide Bearbeitungsreihenfolgen durchspielen.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'F = {A→BC, B→AC}: je nach Reihenfolge Fc = {A→B, B→AC} ODER Fc = {A→BC, B→A}.',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Nicht behaupten, Fc sei eindeutig. Wichtig: Die verschiedenen Ergebnisse sind äquivalent (decken dieselben FDs ab), nur nicht identisch.',
    },
  ],

  'blatt11-5': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Realistisches Synthese-Beispiel: aus den FDs Kandidatenschlüssel und Fc bestimmen und das Schema in 3NF-Relationen zerlegen (je FD ein Schema).',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Schlüssel: MatrNr bestimmt (via FD 3) alles → einziger Kandidatenschlüssel {MatrNr}.\n2. Rechtsreduktion: BossName aus (1) streichen (über (2) ableitbar); (3) auf SName, Semester, SWohnOrt, PersNr reduzieren.\n3. Je FD ein Schema; Studenten enthält den Schlüssel MatrNr.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'Assistenten{PersNr, Name, Fachgebiet, BossPersNr}; Boss{BossPersNr, BossName}; Studenten{MatrNr, SName, Semester, SWohnOrt, PersNr}.',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Transitiv ableitbare Attribute (BossName, die Assistentendaten in (3)) bei der Rechtsreduktion entfernen, sonst entstehen redundante Schemata. Den Kandidatenschlüssel im Endschema prüfen.',
    },
  ],
}
