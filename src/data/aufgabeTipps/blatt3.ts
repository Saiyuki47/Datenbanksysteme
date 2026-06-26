import type { TippSection } from '../../types'

export const blatt3Tipps: Record<string, TippSection[]> = {
  // ── Blatt 3 (Funktionalität & (min,max)-Notation) ─────────────────────────

  'blatt3-1': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Funktionalität und (min,max) beschreiben dieselbe Beziehung aus verschiedenen Blickwinkeln. Die Funktionalität steht NEBEN dem Entitytyp, auf den sie zeigt; die (min,max)-Angabe steht AM Entitytyp, dessen Teilnahme sie begrenzt. Deshalb wirken die Angaben „über Kreuz". „*" = beliebig viele.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Die (min,max)-Angabe hat als min immer 0 (eine Funktionalität erzwingt keine Pflicht-Teilnahme).\n2. Für max: Steht bei F auf der GEGENüberliegenden Seite eine 1 → max = 1; steht dort N/M → max = *.\n3. So entsteht: 1:1 → (0,1)/(0,1); 1:N → (0,*)/(0,1); N:1 → (0,1)/(0,*); N:M → (0,*)/(0,*).',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'F1 : F2  →  (min1,max1) (min2,max2)\n1 : 1  →  (0,1) (0,1)\n1 : N  →  (0,*) (0,1)\nN : 1  →  (0,1) (0,*)\nN : M  →  (0,*) (0,*)',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Die Seiten nicht vertauschen – die (min,max) der einen Seite hängt von der Funktionalität der ANDEREN Seite ab. min ist hier nie 1: aus einer reinen Funktionalität folgt keine „mindestens eins"-Pflicht. (min,max) ist die feinere Notation.',
    },
  ],

  'blatt3-2': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Die (min,max)-Angabe an einem Entitytyp E sagt: Wie oft darf EIN konkreter E-Wert in der Beziehungstabelle vorkommen? min = wie oft mindestens, max = wie oft höchstens. „mindestens eine" → min = 1, „höchstens eine" → max = 1.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. „Ein Übungsleiter betreut mindestens einmal" → Übungsleiter (1,*).\n2. „Eine Gruppe wird mind. einmal, höchstens 25-mal betreut" → Übungsgruppe (1,25).\n3. „Ein Student wird höchstens einmal betreut" → Student max = 1, min = 0 → (0,1).',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'betreuen: Übungsleiter (1,*) – Übungsgruppe (1,25) – Student (0,1).\nTabellen-Test: In der Beziehungstabelle steht dieselbe MatrNr nur EINMAL (→ Student max 1), eine GruppenNr höchstens 25-mal (→ (1,25)), ein Übungsleiter-Name beliebig oft (→ (1,*)).',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Bei ternären Beziehungen jede der drei Seiten einzeln betrachten. „höchstens eine" betrifft das max (=1), nicht das min. Die (min,max) am Entitytyp anschreiben, dessen Vorkommen sie beschränkt – nicht verwechseln.',
    },
  ],

  'blatt3-3': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Bei mehr als zwei beteiligten Entitytypen (n > 2) sind Funktionalitäten und (min,max) NICHT ineinander überführbar. Funktionalitäten legen partielle Funktionen über KOMBINATIONEN (Paare) fest, (min,max) beschränkt das Vorkommen EINZELNER Entitäten in der Beziehungstabelle.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Funktionalität N:1:1 [1] lesen: jede „1"-Seite ist durch die übrigen bestimmt → Prof×Student→Thema und Thema×Student→Prof.\n2. (min,max) [2] lesen: (0,1) bei Doktoranden/Thema, (0,*) bei Prof → einzelne partielle Funktionen Doktorand→Prof, Doktorand→Thema, Thema→Doktorand, Thema→Prof.\n3. Mit einer Beispieltabelle zeigen, welche Tupel jeweils (un)zulässig sind.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: '[1] betreuen: Professoren × Studenten → Seminarthemen;  Seminarthemen × Studenten → Professoren.\n[2] betreuen: Doktoranden → Professoren;  Doktoranden → Themen;  Themen → Doktoranden;  Themen → Professoren.',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Nicht annehmen, die Notationen seien austauschbar. [1] (Funktionalität) lässt sich NICHT als (min,max) ausdrücken (dort wäre alles (0,*)), [2] ((min,max)) nicht als Funktionalität (dort wäre es 1:1:1 über Paare). Genau das ist die Aussage „unvergleichbar".',
    },
  ],

  'blatt3-4': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Textbedingungen werden direkt in (min,max) übersetzt und danach auf grobe Funktionalitäten reduziert. „mindestens k" → min = k; „höchstens einer" → max = 1; „fast alle haben …" → min = 0 (nicht alle), max = 1.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. „mind. drei Personen je Fahrzeug" → hat_Fahrerlaubnis: Fahrzeug-Seite (3,*), Fahrer-Seite (0,*).\n2. „Fahrzeug höchstens 1 Abteilung, Abteilung mind. 1 Fahrzeug" → gehört: Fahrzeug (0,1), Abteilung (1,*).\n3. „fast alle Fahrzeuge eine Garage, jede Garage belegt" → steht_in: Fahrzeug (0,1), Einzelgarage (1,1).\n4. Vergröbern: (3,*)→M, (0,*)→N, (0,1)→1-Seite usw.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: '(min,max): Fahrer (0,*) – (3,*) Fahrzeug | Fahrzeug (0,1) – (1,*) Abteilung | Fahrzeug (0,1) – (1,1) Einzelgarage.\nFunktionalität: hat_Fahrerlaubnis N:M | gehört N:1 | steht_in 1:1.',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: '„fast alle" ist NICHT (1,1) – weil eben nicht jedes Fahrzeug eine Garage hat, bleibt min = 0. Beim Vergröbern geht die Pflichtangabe (das min) verloren: (3,*) und (0,*) werden beide nur zu „N/M".',
    },
  ],

  'blatt3-5': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Ein vorgegebenes ER-Diagramm wird mit dem Text abgeglichen und um vergessene Elemente ergänzt: Schlüssel, Kardinalitäten, schwache Entität (wenn ein Schlüssel nur „lokal" eindeutig ist) und eine Generalisierung (IS-A), wenn eine Obermenge in disjunkte Untertypen zerfällt.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Schlüssel markieren: FLC, FHC, KDNR (voll), FNR (partiell → Flug ist schwach).\n2. anbieten als identifizierende Beziehung Fluglinie (0,*) – (1,1) Flug.\n3. Vielflieger (0,*) – (1,3) mit Status; Lieblingsgesellschaft (0,*) – (1,1).\n4. Start/Ziel: Flug (1,1) – (1,*) Flughafen.\n5. Kunde IS-A Person/Firma (disjunkt).',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'Schwache Entität = Doppelrechteck, identifizierende Beziehung = Doppelraute, partieller Schlüssel gestrichelt/lokal. „teilnehmen an 1–3 Programmen" → (1,3). „genau eine Lieblingsgesellschaft" → (1,1). Generalisierung: Untertypen erben die Schlüssel/Attribute des Obertyps.',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'FNR ist NICHT global eindeutig (verschiedene Linien nutzen gleiche Nummern) → Flug muss schwach sein, sonst falsch. „1–3 Programme" ist (1,3), nicht (0,*). Start- und Zielflughafen sind ZWEI getrennte Beziehungen. Generalisierung (IS-A) nicht mit einer normalen Beziehung verwechseln.',
    },
  ],
}
