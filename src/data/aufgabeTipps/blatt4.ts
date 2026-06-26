import type { TippSection } from '../../types'

export const blatt4Tipps: Record<string, TippSection[]> = {
  // ── Blatt 4 (ER → Relationenschema & Verfeinerung) ────────────────────────

  'blatt4-1': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Beim Überführen bekommt zunächst JEDER Entitytyp UND jeder Beziehungstyp eine eigene Relation. Danach verfeinert man: Relationen mit GLEICHEM Schlüssel werden zusammengefasst. Der Schlüssel einer Beziehungsrelation richtet sich nach der Funktionalität.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Pro Entity-/Beziehungstyp eine Relation anlegen.\n2. Schlüssel der Beziehung bestimmen: 1:N/N:1 → Schlüssel der N-Seite; 1:1 → Schlüssel einer der beiden Seiten (Variante wählen); N:M → zusammengesetzter Schlüssel beider Seiten.\n3. Zusammenfassen, wenn Beziehungsrelation und Entity-Relation denselben Schlüssel haben (nur bei 1:1/1:N/N:1).',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'a) N:1: herstellen{FGNr,Name} + Auto{FGNr} → Auto{FGNr,Name}.\nb) N:M: vormerken{ISBN,LeserNr} – keine Zusammenfassung möglich.\nc) 1:1: Variante mit Schlüssel der „Pflicht"-Seite (Stadt) wählen → vermeidet NULL-Werte.\nd) schwache Entität: Raum{GebNr,RaumNr}, liegt_in fällt mit Raum zusammen.',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'N:M-Beziehungen NICHT zusammenfassen (eigener zusammengesetzter Schlüssel!). Bei 1:1 die Variante mit weniger NULL-Werten wählen. Bei schwachen Entitäten den Schlüssel des Eigentümers in den Schlüssel aufnehmen (GebNr + RaumNr).',
    },
  ],

  'blatt4-2': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Konkretes Beispiel mit einer ternären Beziehung (mieten: Vermieter 1, Wohnung N, Mieter 1) und einer schwachen Entität (Wohnung, identifiziert über Haus + Nummer via liegt_in). Erst je Entity/Beziehung eine Relation, dann gleichschlüsselige zusammenfassen.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Schwache Entität Wohnung: Schlüssel = Haus-Adresse + Nummer.\n2. liegt_in hat denselben Schlüssel wie Wohnung → einrechnen.\n3. mieten ist ternär: Schlüssel über zwei Entitäten ((Wohnung, Mieter) bestimmt den Vermieter) → bleibt eigenständig.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'Wohnung{«HausAdresse», «Nummer», Größe}; mieten{«HausAdresse», «Nummer», «MieterName», VermieterName}. liegt_in fällt mit Wohnung zusammen.',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Den Eigentümerschlüssel (Haus-Adresse) in den Schlüssel der schwachen Entität aufnehmen. mieten als ternäre Beziehung NICHT in eine Entity-Relation einrechnen (Schlüssel über zwei Entitäten).',
    },
  ],

  'blatt4-3': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Standardfall einer 1:N-Beziehung A —1— R —N— B. Die Beziehungsrelation R erhält als Schlüssel den Schlüssel der N-Seite, weil jede B-Instanz an höchstens einem R-Tupel beteiligt ist.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. A{a}, B{b}, R{a,b,r} anlegen.\n2. Schlüssel von R = b (N-Seite ist B).\n3. R hat denselben Schlüssel wie B → R in B aufnehmen.\n4. Ergebnis: A{a}, B{b,a,r}.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'initial:  A{«a»}, B{«b»}, R{a,«b»,r}\nverfeinert:  A{«a»}, B{«b», a, r}',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Den Schlüssel von R nicht auf die 1-Seite (a) legen – die N-Seite (b) bestimmt das Tupel eindeutig. Das Fremdschlüssel-Attribut a wandert beim Zusammenfassen mit in die B-Relation.',
    },
  ],

  'blatt4-4': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Mehrere Beziehungen an einem Entitytyp und eine ternäre Beziehung (verbindet mit zwei Rollen von/nach desselben Typs Bahnhöfe). Erst alle Relationen bilden, dann 1:N-/N:1-Beziehungen in die passende Entity-Relation einrechnen.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Funktionalitäten: liegt_in N:1, Start/Ziel jeweils Bahnhöfe 1 : N Züge, verbindet ternär (von 1, nach 1, Zug N).\n2. Partielle Funktionen von verbindet: (Zug,von)→nach und (Zug,nach)→von → Schlüssel (ZugNr,VonBahnhof) bzw. (ZugNr,NachBahnhof).\n3. Zusammenfassen: liegt_in → Bahnhöfe, Start → Züge, Ziel → Züge. verbindet bleibt eigenständig.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'Bahnhöfe{Name,AnzahlGleise,SName,Bundesland}; Züge{ZugNr,Länge,StartBahnhof,ZielBahnhof}; verbindet{VonBahnhof,NachBahnhof,ZugNr,Abfahrt,Ankunft}.',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Start/Ziel (Endpunkte des Zuges) nicht mit verbindet (einzelne Teilstrecken) verwechseln. verbindet ist N:M-artig und darf NICHT in Bahnhöfe/Züge eingerechnet werden. Die zwei Rollen von/nach erzeugen zwei Bahnhof-Attribute in verbindet.',
    },
  ],
}
