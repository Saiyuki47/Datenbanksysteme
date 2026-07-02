import type { Thema } from '../themen'

export const thema: Thema = {
  id: 'verlustlosigkeit-abhaengigkeit',
  nr: 0,
  title: 'Verlustlosigkeit & Abhängigkeitserhaltung',
  subtitle:
    'Warum eine gute Zerlegung zwei Dinge leisten muss: sich per Join wieder ' +
    'zusammensetzen lassen (verlustfrei) und alle FDs prüfbar halten (abhängigkeitserhaltend).',
  sections: [
    {
      heading: 'Worum geht es?',
      blocks: [
        {
          art: 'text',
          text:
            'Beim Normalisieren zerlegen wir eine Relation R nach „bad" funktionalen ' +
            'Abhängigkeiten in kleinere Teilrelationen R1, R2, … Eine Zerlegung von ' +
            'R(A₁,…,Aₙ, B₁,…,Bₘ, C₁,…,Cₚ) bildet dabei zwei Projektionen: ' +
            'R1(A₁,…,Aₙ, B₁,…,Bₘ) und R2(A₁,…,Aₙ, C₁,…,Cₚ). Der gemeinsame ' +
            'Attributsatz {A₁,…,Aₙ} bleibt in beiden Teilen erhalten und dient später als Join-Spalte.',
        },
        {
          art: 'text',
          text:
            'Damit so eine Zerlegung „richtig" ist, reicht es nicht, irgendwie zu ' +
            'zerteilen. Zwei Eigenschaften müssen zusammenkommen: (1) Verlustlosigkeit ' +
            '(Lossless Join) — wir dürfen keine Information verlieren; und (2) ' +
            'Abhängigkeitserhaltung (Dependency Preservation) — wir müssen alle FDs weiterhin ' +
            'lokal prüfen können. Die BCNF-Zerlegung garantiert nur die erste; die 3NF-Synthese beide.',
        },
        {
          art: 'liste',
          punkte: [
            'Verlustlos / Lossless: R lässt sich per natürlichem Join wieder aus R1 und R2 gewinnen (R = R1 ⋈ R2).',
            'Abhängigkeitserhaltend / Dependency Preserving: jede FD ist in genau einer Teilrelation prüfbar, ohne die Tabellen erst wieder zusammenzujoinen.',
            'Ziel: beide Eigenschaften gleichzeitig — sonst drohen Datenverlust (verlustreich) oder unbemerkte Constraint-Verletzungen beim Einfügen.',
          ],
        },
      ],
    },
    {
      heading: '1) Verlustlosigkeit / Lossless Join',
      blocks: [
        {
          art: 'text',
          text:
            'Eine Zerlegung von R in (R1, R2) heißt verlustfrei (lossless), falls ' +
            'R = R1 ⋈ R2 gilt — der natürliche Join der Teile liefert exakt die ' +
            'Ausgangsrelation zurück, kein Tupel zu wenig und keines zu viel. Der Join ' +
            '„ist sicher" und erhält damit die Information.',
        },
        {
          art: 'merksatz',
          text:
            'Hinreichendes Kriterium: Die Zerlegung von R in (R1, R2) ist verlustfrei, ' +
            'wenn der gemeinsame Attributsatz (R1 ∩ R2) eine der beiden Teilrelationen ' +
            'funktional bestimmt: (R1 ∩ R2) → R1 ODER (R1 ∩ R2) → R2. Anders gesagt: die ' +
            'gemeinsamen Attribute sind Schlüssel (mindestens einer) der beiden Teilrelationen.',
        },
        {
          art: 'text',
          text:
            'Es braucht also nur auf EINER Seite eine FD zu geben — diese Seite ist dann ' +
            'eine Funktion der gemeinsamen Attribute. Für R(A…,B…,C…) mit R1(A…,B…) und ' +
            'R2(A…,C…) genügt {A…} → {B…} (oder {A…} → {C…}); {A…} → {C…} muss NICHT ' +
            'zusätzlich gelten. Das ist hinreichend, aber nicht das einzige mögliche Kriterium.',
        },
        {
          art: 'text',
          text:
            'Verlustreiches Gegenbeispiel (Folien): Produkte(Name, Price, Category) mit ' +
            'der FD {Name} → {Price}. Zerlegt man UNGÜNSTIG in R1(Name, Category) und ' +
            'R2(Price, Category), so ist die gemeinsame Spalte {Category}. Aber {Category} ' +
            'bestimmt weder Name noch Price — die FD {Name} → {Price} geht verloren. ' +
            'Ausgangstabelle:',
        },
        {
          art: 'tabelle',
          titel: 'R = Produkte(Name, Price, Category) — Original',
          columns: ['Name', 'Price', 'Category'],
          rows: [
            ['Gizmo', '19.99', 'Gadget'],
            ['OneClick', '24.99', 'Camera'],
            ['Gizmo', '19.99', 'Camera'],
          ],
        },
        {
          art: 'tabelle',
          titel: 'R1 = π[Name, Category](R)',
          columns: ['Name', 'Category'],
          rows: [
            ['Gizmo', 'Gadget'],
            ['OneClick', 'Camera'],
            ['Gizmo', 'Camera'],
          ],
        },
        {
          art: 'tabelle',
          titel: 'R2 = π[Price, Category](R)',
          columns: ['Price', 'Category'],
          rows: [
            ['19.99', 'Gadget'],
            ['24.99', 'Camera'],
            ['19.99', 'Camera'],
          ],
        },
        {
          art: 'algebra',
          titel: 'Rejoin über die gemeinsame Spalte Category',
          text: 'R1 ⋈ R2   (natürlicher Join über {Category})',
        },
        {
          art: 'tabelle',
          titel: 'R1 ⋈ R2 — liefert MEHR Tupel als das Original (verlustreich!)',
          columns: ['Name', 'Price', 'Category'],
          rows: [
            ['Gizmo', '19.99', 'Gadget'],
            ['OneClick', '24.99', 'Camera'],
            ['OneClick', '19.99', 'Camera'],
            ['Gizmo', '24.99', 'Camera'],
            ['Gizmo', '19.99', 'Camera'],
          ],
        },
        {
          art: 'text',
          text:
            'Der Join erzeugt die Phantom-Tupel (OneClick, 19.99, Camera) und ' +
            '(Gizmo, 24.99, Camera): über Category = Camera wird alles mit allem ' +
            'kombiniert. Wir können das Original NICHT mehr rekonstruieren — genau das ' +
            'ist ein verlustreicher (lossy) Join. Die verlorene FD {Name} → {Price} war die Ursache.',
        },
        {
          art: 'text',
          text:
            'Richtig zerlegt man stattdessen entlang der FD: R1(Name, Price) und ' +
            'R2(Name, Category). Jetzt ist die gemeinsame Spalte {Name}, und wegen ' +
            '{Name} → {Price} gilt (R1 ∩ R2) = {Name} → {Name, Price} = R1. Der Join ' +
            'über Name liefert exakt das Original zurück (das Duplikat wird von der ' +
            'Mengensemantik eliminiert) — verlustfrei.',
        },
      ],
    },
    {
      heading: 'Beispiel: SSN-Zerlegung (verlustfrei)',
      blocks: [
        {
          art: 'text',
          text:
            'Aus den Folien: Personen(Name, SSN, PhoneNumber, City) mit den FDs ' +
            '{SSN} → {Name, City} und Schlüssel {SSN, PhoneNumber}. Die FD ' +
            '{SSN} → {Name, City} ist „bad" (SSN allein ist kein Superkey), also zerlegen wir.',
        },
        {
          art: 'tabelle',
          titel: 'Original',
          columns: ['Name', 'SSN', 'PhoneNumber', 'City'],
          rows: [
            ['Fred', '123-45-6789', '206-555-1234', 'Seattle'],
            ['Fred', '123-45-6789', '206-555-6543', 'Seattle'],
            ['Joe', '987-65-4321', '908-555-2121', 'Madison'],
            ['Joe', '987-65-4321', '908-555-1234', 'Madison'],
          ],
        },
        {
          art: 'tabelle',
          titel: 'R1(Name, SSN, City)',
          columns: ['Name', 'SSN', 'City'],
          rows: [
            ['Fred', '123-45-6789', 'Seattle'],
            ['Joe', '987-65-4321', 'Madison'],
          ],
        },
        {
          art: 'tabelle',
          titel: 'R2(SSN, PhoneNumber)',
          columns: ['SSN', 'PhoneNumber'],
          rows: [
            ['123-45-6789', '206-555-1234'],
            ['123-45-6789', '206-555-6543'],
            ['987-65-4321', '908-555-2121'],
            ['987-65-4321', '908-555-1234'],
          ],
        },
        {
          art: 'text',
          text:
            'Gemeinsame Spalte ist {SSN}. Wegen {SSN} → {Name, City} gilt ' +
            '(R1 ∩ R2) = {SSN} → R1, also verlustfrei: der Join über SSN reproduziert ' +
            'das Original tupelgenau. Zugleich verschwindet die Redundanz (Name/City ' +
            'standen vorher pro Telefonnummer wiederholt da), und R1 wie R2 sind in BCNF.',
        },
      ],
    },
    {
      heading: '2) Abhängigkeitserhaltung / Dependency Preservation',
      blocks: [
        {
          art: 'text',
          text:
            'Eine verlustfreie Zerlegung ist notwendig, aber nicht hinreichend für einen ' +
            'guten Entwurf. Zusätzlich wollen wir, dass sich die funktionalen ' +
            'Abhängigkeiten sauber auf die Teilrelationen aufteilen: Jede FD soll ' +
            'vollständig innerhalb EINER Teilrelation liegen (nur in R1 oder nur in R2), ' +
            'nie über beide Tabellen hinweg. Dann kann das DBMS jede FD lokal beim ' +
            'Einfügen/Ändern prüfen.',
        },
        {
          art: 'merksatz',
          text:
            'Abhängigkeitserhaltend heißt: Die Menge aller FDs bleibt aus den FDs der ' +
            'Teilrelationen ableitbar — jede Regel ist in einer einzelnen Tabelle ' +
            'prüfbar. Geht das nicht, müsste man für jeden Insert erst per Join das ' +
            'ursprüngliche R rekonstruieren und dort den globalen Constraint prüfen — teuer und fehleranfällig.',
        },
        {
          art: 'text',
          text:
            'PLZ-Beispiel aus Kemper: PLZverzeichnis(Strasse, Ort, BLand, PLZ) mit den ' +
            'beiden FDs {PLZ} → {Ort, BLand} und {Strasse, Ort, BLand} → {PLZ}. Die FD ' +
            '{PLZ} → {Ort, BLand} ist „bad" (PLZ ist kein Superkey), eine BCNF-Zerlegung ' +
            'spaltet daher in:',
        },
        {
          art: 'tabelle',
          titel: 'Zerlegung entlang {PLZ} → {Ort, BLand}',
          columns: ['Teilrelation', 'Attribute', 'lokal prüfbare FD'],
          rows: [
            ['R1', '{PLZ, Ort, BLand}', '{PLZ} → {Ort, BLand}  ✓'],
            ['R2', '{Strasse, PLZ}', '(keine der beiden FDs vollständig)'],
          ],
        },
        {
          art: 'text',
          text:
            'Diese Zerlegung ist verlustfrei (gemeinsame Spalte {PLZ} bestimmt R1), ' +
            'ABER: Die FD {Strasse, Ort, BLand} → {PLZ} liegt jetzt über beide Tabellen ' +
            'verteilt (Strasse steckt in R2, Ort/BLand in R1). Sie lässt sich in keiner ' +
            'einzelnen Teilrelation prüfen. Fügt man zwei Zeilen ein, die zusammen ' +
            'dieselbe (Strasse, Ort, BLand) auf verschiedene PLZ abbilden, bemerkt das ' +
            'DBMS die Verletzung erst nach einem Join — die Zerlegung ist NICHT abhängigkeitserhaltend.',
        },
      ],
    },
    {
      heading: 'BCNF vs. 3NF — der Trade-off (Unit/Company-Beispiel)',
      blocks: [
        {
          art: 'text',
          text:
            'Zweites durchgerechnetes Beispiel für einen FD-Verlust: ' +
            'R(Company, Product, Unit) mit den FDs {Company, Product} → {Unit} und ' +
            '{Unit} → {Company}. Schlüssel ist {Company, Product}. Die FD ' +
            '{Unit} → {Company} ist „bad" ({Unit}⁺ = {Unit, Company} ist kein Superkey), ' +
            'also zerlegt BCNF nach dieser FD.',
        },
        {
          art: 'tabelle',
          titel: 'R(Company, Product, Unit) — Original',
          columns: ['Unit', 'Company', 'Product'],
          rows: [
            ['Galaga99', 'UW', 'Databases'],
            ['Bingo', 'UW', 'Databases'],
          ],
        },
        {
          art: 'text',
          text:
            'BCNF-Zerlegung nach {Unit} → {Company}: R1(Unit, Company) und ' +
            'R2(Unit, Product). Beide sind in BCNF, alle LOKALEN FDs sind intakt:',
        },
        {
          art: 'tabelle',
          titel: 'R1(Unit, Company)',
          columns: ['Unit', 'Company'],
          rows: [
            ['Galaga99', 'UW'],
            ['Bingo', 'UW'],
          ],
        },
        {
          art: 'tabelle',
          titel: 'R2(Unit, Product)',
          columns: ['Unit', 'Product'],
          rows: [
            ['Galaga99', 'Databases'],
            ['Bingo', 'Databases'],
          ],
        },
        {
          art: 'text',
          text:
            'Gemeinsame Spalte ist {Unit}, und wegen {Unit} → {Company} ist die ' +
            'Zerlegung verlustfrei. ABER die FD {Company, Product} → {Unit} spannt über ' +
            'beide Tabellen (Company in R1, Product in R2) und ist lokal nicht mehr ' +
            'prüfbar. Joint man R1 und R2 wieder zusammen, entstehen Zeilen wie ' +
            '(UW, Databases, Galaga99) UND (UW, Databases, Bingo) — dieselbe ' +
            '(Company, Product) mit zwei verschiedenen Units. Die FD ' +
            '{Company, Product} → {Unit} ist verletzt: BCNF ist hier NICHT abhängigkeitserhaltend.',
        },
        {
          art: 'text',
          text:
            'Genau deshalb gibt es die 3NF. Die 3NF lockert das BCNF-Kriterium: Bei einer ' +
            'nicht-trivialen FD X → A muss X ein Superkey sein ODER A darf Teil eines ' +
            'Kandidatenschlüssels sein. Im Beispiel zeigt {Unit} → {Company} in einen ' +
            'Kandidatenschlüssel ({Company} ist Teil des Schlüssels {Company, Product}) — ' +
            'also gilt die FD in 3NF als „gut" und man zerlegt NICHT. Damit bleiben beide ' +
            'FDs in R erhalten und lokal prüfbar. Analog beim PLZ-Beispiel: {PLZ} → {Ort, BLand} ' +
            'zeigt in einen Kandidatenschlüssel, also lässt die 3NF-Synthese die Tabelle intakt.',
        },
        {
          art: 'merksatz',
          text:
            'Trade-off: BCNF ist immer verlustfrei und redundanzfrei, aber gelegentlich ' +
            'NICHT abhängigkeitserhaltend. Die 3NF-Synthese liefert stets eine Zerlegung, ' +
            'die verlustfrei UND abhängigkeitserhaltend ist — zum Preis, dass minimale ' +
            'Restredundanz erlaubt bleibt. Faustregel: BCNF ist die Standard-Normalform ' +
            'für FDs; wenn man dabei eine FD verlieren würde, weicht man auf 3NF aus (ein ' +
            'Trade-off zugunsten der Insert-Performance).',
        },
        {
          art: 'liste',
          punkte: [
            'Reihenfolge im Entwurf: „bad" FDs bestimmen → verlustfrei zerlegen → Abhängigkeitserhaltung prüfen.',
            'Verlustfreiheit-Check (R1, R2): Ist (R1 ∩ R2) Schlüssel von R1 oder von R2? Dann verlustfrei.',
            'Abhängigkeitserhaltungs-Check: Liegt jede FD komplett in einer Teilrelation? Dann erhalten.',
            'BCNF verlustfrei, ggf. FD-Verlust → auf 3NF ausweichen, wenn A Teil eines Kandidatenschlüssels ist.',
          ],
        },
      ],
    },
  ],
}
