import type { Thema } from '../themen'

export const thema: Thema = {
  id: 'relationale-algebra',
  nr: 0,
  title: 'Relationale Algebra: die Operatoren',
  subtitle:
    'Der vollständige Werkzeugkasten – jeder Operator einzeln: was er tut, wann man ihn ' +
    'braucht und ein durchgerechnetes Beispiel auf dem Uni-Schema.',
  sections: [
    // -------------------------------------------------------------------------
    {
      heading: 'Worum geht es?',
      blocks: [
        {
          art: 'text',
          text:
            'Die relationale Algebra ist eine Sammlung von Operatoren, die jeweils eine oder zwei ' +
            'Relationen (Tabellen) nehmen und daraus wieder eine Relation berechnen. Weil das Ergebnis ' +
            'jedes Operators selbst wieder eine Relation ist, darf man sie beliebig ineinander ' +
            'schachteln und zu großen Ausdrücken zusammensetzen – genau das tut eine Datenbank intern ' +
            'bei jeder Anfrage.',
        },
        {
          art: 'text',
          text:
            'Diese Karte ist die OPERATOR-REFERENZ: sie stellt jeden einzelnen Operator ausführlich vor. ' +
            'Wie man eine fertige SQL-Abfrage Schritt für Schritt in Algebra übersetzt (SELECT → π, ' +
            'WHERE → σ, FROM → × / ⋈), steht in der eigenen Karte „SQL-Abfragen als relationale ' +
            'Algebra darstellen".',
        },
        {
          art: 'text',
          text:
            'Alle Beispiele arbeiten auf dem bekannten Uni-Schema: Professoren(PersNr, Name, Rang, Raum), ' +
            'Studenten(MatrNr, Name, Semester), Vorlesungen(VorlNr, Titel, SWS, gelesenVon) und ' +
            'hören(MatrNr, VorlNr).',
        },
        {
          art: 'tabelle',
          titel: 'Die Operatoren im Überblick',
          columns: ['Operator', 'Symbol', 'Argumente', 'macht kurz'],
          rows: [
            ['Selektion', 'σ[Bed](R)', '1', 'wählt Zeilen aus'],
            ['Projektion', 'π[Attr](R)', '1', 'wählt Spalten aus, entfernt Duplikate'],
            ['Umbenennung', 'ρ', '1', 'benennt Relation/Attribute um'],
            ['Kreuzprodukt', 'R × S', '2', 'jede Zeile mit jeder'],
            ['Verbund (Join)', 'R ⋈ S', '2', 'passende Zeilen verbinden'],
            ['Äußerer Join', '⟕ ⟖ ⟗', '2', 'Join, der auch partnerlose Zeilen behält'],
            ['Vereinigung', 'R ∪ S', '2', 'beide Mengen zusammen'],
            ['Durchschnitt', 'R ∩ S', '2', 'gemeinsame Zeilen'],
            ['Differenz', 'R − S', '2', 'in R, aber nicht in S'],
            ['Division', 'R ÷ S', '2', '„zu allen" – Allquantor'],
          ],
        },
        {
          art: 'merksatz',
          text:
            'Die „volle" Algebra besteht aus σ, π, ρ, ×, ∪ und − – alle anderen Operatoren (⋈, ∩, ÷, ' +
            'äußere Joins) sind Abkürzungen, die sich aus diesen sechs zusammensetzen lassen.',
        },
      ],
    },
    // -------------------------------------------------------------------------
    {
      heading: 'Selektion σ und Projektion π',
      blocks: [
        {
          art: 'text',
          text:
            'Selektion und Projektion sind die beiden einfachsten Operatoren und arbeiten auf EINER ' +
            'Relation. Die Selektion σ[Bedingung](R) behält genau die ZEILEN von R, welche die Bedingung ' +
            'erfüllen – man braucht sie immer dann, wenn man Tupel nach einem Kriterium herausfiltern will. ' +
            'In der Bedingung sind Vergleiche (=, ≠, <, >, ≤, ≥) erlaubt, verknüpft mit ∧ (und), ∨ (oder) ' +
            'sowie ¬ (nicht).',
        },
        {
          art: 'algebra',
          titel: 'Selektion – Studenten in einem höheren Semester',
          text: 'σ[Semester > 10] (Studenten)',
        },
        {
          art: 'beispiel',
          titel: 'Ergebnis der Selektion',
          sql: 'σ[Semester > 10] (Studenten)',
          erklaerung:
            'Von den acht Studenten erfüllen nur zwei die Bedingung Semester > 10: Xenokrates (18) und ' +
            'Jonas (12). Alle Spalten bleiben erhalten, nur die Zeilen werden gefiltert.',
          ergebnis: {
            columns: ['MatrNr', 'Name', 'Semester'],
            rows: [
              ['24002', 'Xenokrates', '18'],
              ['25403', 'Jonas', '12'],
            ],
          },
        },
        {
          art: 'text',
          text:
            'Die Projektion π[Attribute](R) macht das Gegenstück: sie behält nur die genannten SPALTEN und ' +
            'wirft alle anderen weg. Man braucht sie, wenn nur bestimmte Attribute interessieren. Wichtig: ' +
            'π arbeitet MENGENBASIERT und entfernt danach automatisch doppelte Zeilen – das entspricht in ' +
            'SQL dem SELECT DISTINCT.',
        },
        {
          art: 'algebra',
          titel: 'Projektion – welche Ränge gibt es?',
          text: 'π[Rang] (Professoren)',
        },
        {
          art: 'beispiel',
          titel: 'Ergebnis der Projektion (Duplikate entfernt)',
          sql: 'π[Rang] (Professoren)',
          erklaerung:
            'In Professoren stehen sieben Zeilen mit den Rängen C4, C4, C3, C3, C3, C4, C4. Nach dem ' +
            'Herausprojizieren der Spalte Rang wären das sieben Werte – π entfernt aber die Duplikate, ' +
            'sodass nur die zwei VERSCHIEDENEN Ränge übrig bleiben.',
          ergebnis: {
            columns: ['Rang'],
            rows: [['C4'], ['C3']],
          },
        },
        {
          art: 'merksatz',
          text:
            'Eselsbrücke: σ schneidet ZEILEN heraus (waagerecht), π schneidet SPALTEN heraus (senkrecht). ' +
            'σ wie „selektieren", π wie „projizieren". Nur π entfernt Duplikate.',
        },
      ],
    },
    // -------------------------------------------------------------------------
    {
      heading: 'Umbenennung ρ',
      blocks: [
        {
          art: 'text',
          text:
            'Die Umbenennung ρ (rho) ändert Namen – entweder den Namen einer ganzen Relation oder den ' +
            'Namen einzelner Attribute. Sie ändert keine Daten. Man braucht sie in zwei typischen ' +
            'Situationen: (1) wenn man dieselbe Relation ZWEIMAL in einem Ausdruck verwendet (Self-Join) ' +
            'und die beiden Kopien auseinanderhalten muss, und (2) wenn zwei Relationen für einen ' +
            'Mengenoperator oder natürlichen Verbund passend benannte Attribute brauchen.',
        },
        {
          art: 'liste',
          punkte: [
            'ρ[V1](voraussetzen) – nennt die Relation voraussetzen für diesen Ausdruck in V1 um.',
            'ρ[Vorgänger ← Voraussetzung](R) – benennt das Attribut Voraussetzung in Vorgänger um.',
          ],
        },
        {
          art: 'text',
          text:
            'Beispiel aus der Vorlesung: In voraussetzen(Vorgänger, Nachfolger) sollen die INDIREKTEN ' +
            'Voraussetzungen 2. Stufe der Vorlesung 5216 gefunden werden – also die Vorgänger der ' +
            'Vorgänger. Dazu muss man voraussetzen mit sich selbst verbinden und die beiden Kopien über ρ ' +
            'in V1 und V2 umbenennen, damit man V1.Nachfolger = V2.Vorgänger schreiben kann.',
        },
        {
          art: 'algebra',
          titel: 'Indirekte Voraussetzungen 2. Stufe von 5216',
          text:
            'π[V1.Vorgänger] (\n' +
            '   σ[V2.Nachfolger = 5216 ∧ V1.Nachfolger = V2.Vorgänger] (\n' +
            '      ρ[V1](voraussetzen) × ρ[V2](voraussetzen)\n' +
            '   )\n' +
            ')',
        },
        {
          art: 'beispiel',
          titel: 'Ergebnis',
          sql:
            'π[V1.Vorgänger] ( σ[V2.Nachfolger = 5216 ∧ V1.Nachfolger = V2.Vorgänger] ' +
            '( ρ[V1](voraussetzen) × ρ[V2](voraussetzen) ) )',
          erklaerung:
            'In voraussetzen gilt: 5216 hat den direkten Vorgänger 5041 (V2), und 5041 hat wiederum den ' +
            'Vorgänger 5001 (V1). Über die beiden umbenannten Kopien wird die Kette 5001 → 5041 → 5216 ' +
            'zusammengesetzt; als indirekter Vorgänger 2. Stufe bleibt 5001 übrig.',
          ergebnis: {
            columns: ['Vorgänger'],
            rows: [['5001']],
          },
        },
      ],
    },
    // -------------------------------------------------------------------------
    {
      heading: 'Kreuzprodukt × und Verbund (Join) ⋈',
      blocks: [
        {
          art: 'text',
          text:
            'Das Kreuzprodukt (kartesisches Produkt) R × S kombiniert JEDE Zeile von R mit JEDER Zeile von S ' +
            'und hängt deren Spalten aneinander. Hat R zum Beispiel 7 und S 12 Zeilen, hat R × S bereits ' +
            '7 · 12 = 84 Zeilen. Für sich allein liefert es meist ein riesiges, unbrauchbares ' +
            'Zwischenergebnis – man braucht es fast nie pur, sondern als Zwischenschritt für den Join.',
        },
        {
          art: 'text',
          text:
            'Der natürliche Verbund (Join) R ⋈ S ist die wichtigste Verknüpfung zweier Relationen: er ' +
            'kombiniert nur die ZUSAMMENPASSENDEN Zeilen. „Passend" heißt beim natürlichen Verbund: die ' +
            'Tupel stimmen in ALLEN GLEICHNAMIGEN Attributen überein; die gemeinsame Spalte erscheint im ' +
            'Ergebnis nur EINMAL. Formal ist der Join ein Kreuzprodukt mit anschließender Selektion auf ' +
            'Gleichheit der gemeinsamen Attribute:',
        },
        {
          art: 'algebra',
          titel: 'Natürlicher Verbund – formale Definition',
          text:
            'Für R(A₁…Aₘ, B₁…Bₖ) und S(B₁…Bₖ, C₁…Cₙ):\n' +
            'R ⋈ S = π[A₁…Aₘ, B₁…Bₖ, C₁…Cₙ] ( σ[R.B₁ = S.B₁ ∧ … ∧ R.Bₖ = S.Bₖ] (R × S) )',
        },
        {
          art: 'text',
          text:
            'Beispiel: Welcher Student hört welche Vorlesung – mit den vollen Daten aus beiden Relationen? ' +
            'Man verbindet Studenten und hören (gemeinsames Attribut MatrNr) und das Ergebnis mit ' +
            'Vorlesungen (gemeinsames Attribut VorlNr). Weil das Ergebnis wieder eine Relation ist, kann ' +
            'man Joins verketten (Drei-Wege-Join).',
        },
        {
          art: 'algebra',
          titel: 'Drei-Wege-Join',
          text: '(Studenten ⋈ hören) ⋈ Vorlesungen',
        },
        {
          art: 'beispiel',
          titel: 'Ergebnis (Ausschnitt)',
          sql: '(Studenten ⋈ hören) ⋈ Vorlesungen',
          erklaerung:
            'Jede Zeile von hören wird mit „ihrem" Studenten (über MatrNr) und „ihrer" Vorlesung (über ' +
            'VorlNr) zusammengeführt. MatrNr und VorlNr erscheinen dabei jeweils nur einmal. Es entsteht ' +
            'eine breite Tabelle mit Student, gehörter Vorlesung und deren Details.',
          ergebnis: {
            columns: ['MatrNr', 'Name', 'Semester', 'VorlNr', 'Titel', 'SWS', 'gelesenVon'],
            rows: [
              ['26120', 'Fichte', '10', '5001', 'Grundzüge', '4', '2137'],
              ['25403', 'Jonas', '12', '5022', 'Glaube und Wissen', '2', '2134'],
              ['28106', 'Carnap', '3', '5052', 'Wissenschaftstheorie', '3', '2126'],
            ],
          },
        },
        {
          art: 'text',
          text:
            'Sollen die Tupel nicht auf Gleichheit, sondern über eine BELIEBIGE Bedingung θ (z. B. < oder ≠) ' +
            'verbunden werden, nimmt man den Theta-Join R ⋈[θ] S. Er ist einfach das Kreuzprodukt gefolgt ' +
            'von einer Selektion mit θ – und die allgemeinste Form des Joins.',
        },
        {
          art: 'uebersetzung',
          sql: 'R ⋈[θ] S',
          algebra: 'σ[θ] (R × S)',
          hinweis:
            'Der natürliche Verbund ist der Spezialfall, bei dem θ die Gleichheit ALLER gleichnamigen ' +
            'Attribute ist (und die doppelte Spalte danach wegprojiziert wird).',
        },
        {
          art: 'merksatz',
          text:
            'Ein Join ist immer „Kreuzprodukt + Selektion". Wer bei ⋈ unsicher ist, darf jederzeit auf ' +
            'σ(R × S) ausweichen – das Ergebnis ist dasselbe, nur größer aufgeschrieben.',
        },
      ],
    },
    // -------------------------------------------------------------------------
    {
      heading: 'Äußere Joins ⟕ ⟖ ⟗',
      blocks: [
        {
          art: 'text',
          text:
            'Beim normalen (inneren) Join fallen Zeilen, die keinen Partner finden, komplett weg. Manchmal ' +
            'will man sie aber BEHALTEN und die fehlenden Spalten mit Null-Werten auffüllen – etwa um zu ' +
            'sehen, welche Zeilen KEINEN Partner haben. Dafür gibt es die äußeren (outer) Joins. Sie ' +
            'unterscheiden sich nur darin, von welcher Seite die partnerlosen Zeilen gerettet werden.',
        },
        {
          art: 'tabelle',
          titel: 'Die drei äußeren Joins',
          columns: ['Operator', 'Symbol', 'behält zusätzlich'],
          rows: [
            ['Linker äußerer Join', 'R ⟕ S', 'alle partnerlosen Zeilen von R (links)'],
            ['Rechter äußerer Join', 'R ⟖ S', 'alle partnerlosen Zeilen von S (rechts)'],
            ['Voller äußerer Join', 'R ⟗ S', 'partnerlose Zeilen BEIDER Seiten'],
          ],
        },
        {
          art: 'text',
          text:
            'Zur Veranschaulichung die beiden kleinen Relationen L(A, B, C) und R(C, D, E) aus der ' +
            'Vorlesung, die im gemeinsamen Attribut C verbunden werden. Nur die Zeile mit C = c1 passt in ' +
            'beiden Relationen zusammen.',
        },
        {
          art: 'tabelle',
          titel: 'L(A, B, C)',
          columns: ['A', 'B', 'C'],
          rows: [
            ['a1', 'b1', 'c1'],
            ['a2', 'b2', 'c2'],
          ],
        },
        {
          art: 'tabelle',
          titel: 'R(C, D, E)',
          columns: ['C', 'D', 'E'],
          rows: [
            ['c1', 'd1', 'e1'],
            ['c3', 'd2', 'e2'],
          ],
        },
        {
          art: 'beispiel',
          titel: 'Linker äußerer Join L ⟕ R',
          sql: 'L ⟕ R',
          erklaerung:
            'Der innere Join liefert nur die Zeile c1. Der LINKE äußere Join behält zusätzlich die ' +
            'partnerlose linke Zeile a2/b2/c2 und füllt deren rechte Spalten (D, E) mit Null „−" auf.',
          ergebnis: {
            columns: ['A', 'B', 'C', 'D', 'E'],
            rows: [
              ['a1', 'b1', 'c1', 'd1', 'e1'],
              ['a2', 'b2', 'c2', '−', '−'],
            ],
          },
        },
        {
          art: 'beispiel',
          titel: 'Rechter äußerer Join L ⟖ R',
          sql: 'L ⟖ R',
          erklaerung:
            'Spiegelbildlich: zusätzlich zur passenden Zeile c1 bleibt die partnerlose RECHTE Zeile ' +
            'c3/d2/e2 erhalten; ihre linken Spalten (A, B) werden mit Null aufgefüllt.',
          ergebnis: {
            columns: ['A', 'B', 'C', 'D', 'E'],
            rows: [
              ['a1', 'b1', 'c1', 'd1', 'e1'],
              ['−', '−', 'c3', 'd2', 'e2'],
            ],
          },
        },
        {
          art: 'beispiel',
          titel: 'Voller äußerer Join L ⟗ R',
          sql: 'L ⟗ R',
          erklaerung:
            'Der volle äußere Join vereint beides: die passende Zeile c1 UND die partnerlosen Zeilen ' +
            'beider Seiten (c2 von links, c3 von rechts), jeweils mit Null aufgefüllt.',
          ergebnis: {
            columns: ['A', 'B', 'C', 'D', 'E'],
            rows: [
              ['a1', 'b1', 'c1', 'd1', 'e1'],
              ['a2', 'b2', 'c2', '−', '−'],
              ['−', '−', 'c3', 'd2', 'e2'],
            ],
          },
        },
        {
          art: 'merksatz',
          text:
            'links / rechts / voll = „welche partnerlosen Zeilen dürfen bleiben?". Die fehlenden Spalten ' +
            'der geretteten Zeilen werden immer mit Null-Werten gefüllt.',
        },
      ],
    },
    // -------------------------------------------------------------------------
    {
      heading: 'Mengenoperationen ∪, ∩ und −',
      blocks: [
        {
          art: 'text',
          text:
            'Weil Relationen Mengen von Tupeln sind, gibt es die klassischen Mengenoperationen: ' +
            'Vereinigung R ∪ S (alle Tupel aus R und S), Durchschnitt R ∩ S (nur die Tupel, die in BEIDEN ' +
            'vorkommen) und Differenz R − S (die Tupel aus R, die NICHT in S sind). Duplikate werden dabei ' +
            'entfernt.',
        },
        {
          art: 'merksatz',
          text:
            'Wichtige Voraussetzung: ∪, ∩ und − sind nur auf Relationen mit GLEICHEM SCHEMA anwendbar – ' +
            'gleiche Anzahl und gleiche Bedeutung der Attribute. Passt das nicht, muss man vorher mit π ' +
            'die richtigen Spalten wählen und mit ρ passend umbenennen.',
        },
        {
          art: 'text',
          text:
            'Beispiel aus der Vorlesung: Finde die PersNr aller C4-Professoren, die MINDESTENS EINE ' +
            'Vorlesung halten. Das ist die Schnittmenge aus „hält eine Vorlesung" (die vorkommenden Werte ' +
            'von gelesenVon) und „ist C4-Professor". Damit beide Seiten dasselbe Schema {PersNr} haben, ' +
            'muss gelesenVon zuerst in PersNr umbenannt werden.',
        },
        {
          art: 'algebra',
          titel: 'C4-Professoren, die eine Vorlesung halten',
          text:
            'π[PersNr] ( ρ[PersNr ← gelesenVon] (Vorlesungen) )\n' +
            '   ∩\n' +
            'π[PersNr] ( σ[Rang = C4] (Professoren) )',
        },
        {
          art: 'beispiel',
          titel: 'Ergebnis der Schnittmenge',
          sql:
            'π[PersNr] ( ρ[PersNr ← gelesenVon] (Vorlesungen) ) ∩ ' +
            'π[PersNr] ( σ[Rang = C4] (Professoren) )',
          erklaerung:
            'C4-Professoren sind Sokrates (2125), Russel (2126), Curie (2136) und Kant (2137). Eine ' +
            'Vorlesung halten laut gelesenVon 2137, 2125, 2126, 2133, 2134. Der Durchschnitt sind die ' +
            'PersNr, die in beiden Mengen liegen: 2125, 2126, 2137 – also Sokrates, Russel und Kant. ' +
            'Curie (2136) hält keine Vorlesung und fällt heraus.',
          ergebnis: {
            columns: ['PersNr'],
            rows: [['2125'], ['2126'], ['2137']],
          },
        },
        {
          art: 'text',
          text:
            'Durchschnitt und die (nicht in der Grundalgebra enthaltenen) Operatoren lassen sich auf die ' +
            'Differenz zurückführen. Für den Durchschnitt gilt: R ∩ S = R − (R − S).',
        },
      ],
    },
    // -------------------------------------------------------------------------
    {
      heading: 'Division ÷ – der „zu allen"-Operator',
      blocks: [
        {
          art: 'text',
          text:
            'Die Division R ÷ S beantwortet Fragen mit dem Wörtchen „ALLE": Welche Werte in R sind mit ' +
            'JEDEM Tupel aus S kombiniert? Sie ist das Gegenstück zum Kreuzprodukt (deshalb „Division"). ' +
            'Das Schema von S muss dabei eine Teilmenge des Schemas von R sein; das Ergebnis hat das ' +
            'Schema R − S (die übrigen Attribute).',
        },
        {
          art: 'text',
          text:
            'Formal: Ein Tupel t liegt genau dann im Ergebnis R ÷ S, wenn es zu JEDEM Tupel tₛ aus S ein ' +
            'passendes Tupel in R gibt, das t mit tₛ kombiniert. Die klassische Anwendung ist „Finde die ' +
            'Studenten, die ALLE vierstündigen Vorlesungen hören".',
        },
        {
          art: 'text',
          text:
            'Vorgehen: Zuerst die Divisor-Menge S bilden – hier die VorlNr aller Vorlesungen mit SWS = 4. ' +
            'Dann hören durch diese Menge teilen. Übrig bleiben die MatrNr, die mit JEDER dieser VorlNr in ' +
            'hören auftauchen.',
        },
        {
          art: 'algebra',
          titel: 'Studenten, die alle 4-SWS-Vorlesungen hören',
          text:
            'S := π[VorlNr] ( σ[SWS = 4] (Vorlesungen) )\n' +
            'hören ÷ S',
        },
        {
          art: 'text',
          text:
            'Wie die Division Schritt für Schritt „rechnet", zeigt am besten ein kleines Beispiel mit einer ' +
            'Relation R(M, V) und dem Divisor S(V):',
        },
        {
          art: 'tabelle',
          titel: 'R(M, V)',
          columns: ['M', 'V'],
          rows: [
            ['m1', 'v1'],
            ['m1', 'v2'],
            ['m1', 'v3'],
            ['m2', 'v2'],
            ['m2', 'v3'],
          ],
        },
        {
          art: 'beispiel',
          titel: 'R ÷ S mit S = {v1, v2}',
          sql: 'R ÷ S',
          erklaerung:
            'Gesucht sind die M-Werte, die mit JEDEM V aus S = {v1, v2} in R vorkommen. m1 hat v1 UND v2 ' +
            '(sogar noch v3) – m1 zählt also. m2 hat nur v2, aber kein v1 – m2 fällt heraus. Ergebnis: {m1}.',
          ergebnis: {
            columns: ['M'],
            rows: [['m1']],
          },
        },
        {
          art: 'text',
          text:
            'Auf dem echten Uni-Schema angewandt: Vorlesungen mit SWS = 4 sind Grundzüge (5001), Ethik ' +
            '(5041), Logik (4052) und Die 3 Kritiken (4630). Da in hören kein einziger Student mit ALLEN ' +
            'vieren auftaucht (4630 hat z. B. gar keine Hörer), ist das Ergebnis hier die LEERE Menge – ' +
            'das ist ein völlig korrektes Divisions-Ergebnis.',
        },
        {
          art: 'text',
          text:
            'Die Division ist kein Grundoperator, sondern lässt sich mit Differenz, Kreuzprodukt und ' +
            'Projektion ausdrücken:',
        },
        {
          art: 'algebra',
          titel: 'Division über die Grundoperatoren',
          text: 'R ÷ S = π[R−S](R) − π[R−S] ( ( π[R−S](R) × S ) − R )',
        },
        {
          art: 'merksatz',
          text:
            'Merke: Immer wenn eine Frage „… die ALLE …" verlangt (Allquantor), ist die Division der ' +
            'passende Operator. Das Ergebnis-Schema ist R − S.',
        },
      ],
    },
  ],
}
