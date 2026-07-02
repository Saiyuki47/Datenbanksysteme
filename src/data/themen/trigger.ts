import type { Thema } from '../themen'

export const thema: Thema = {
  id: 'trigger',
  nr: 0,
  title: 'Trigger',
  subtitle:
    'Aktive Regeln, die bei INSERT, UPDATE oder DELETE automatisch Code ausführen – für ' +
    'Konsistenzbedingungen, die sich nicht als CHECK oder Fremdschlüssel ausdrücken lassen.',
  sections: [
    {
      heading: 'Worum geht es?',
      blocks: [
        {
          art: 'text',
          text:
            'Ein Trigger ist eine aktive Regel: ein Stück Code, das die Datenbank bei jeder Änderung ' +
            'einer Tabelle – also bei INSERT, UPDATE oder DELETE – automatisch ausführt. Anders als eine ' +
            'gewöhnliche Anfrage muss man einen Trigger nicht aufrufen; er „feuert" von selbst, sobald die ' +
            'auslösende Operation stattfindet.',
        },
        {
          art: 'text',
          text:
            'Man braucht Trigger für komplexere Konsistenzbedingungen, die sich NICHT als CHECK-Klausel ' +
            'oder als Fremdschlüssel formulieren lassen. Solche Bedingungen sind laut Vorlesung selten bis ' +
            'gar nicht anders unterstützt – z. B. Regeln, die den alten mit dem neuen Wert vergleichen, ' +
            'oder das Nachziehen redundanter bzw. abgeleiteter Daten.',
        },
        {
          art: 'liste',
          punkte: [
            'Statische Bedingung an EINEN Zustand (z. B. „Rang ∈ {C2, C3, C4}") → CHECK.',
            'Verweis auf ein existierendes Tupel → Fremdschlüssel (FOREIGN KEY … REFERENCES).',
            'Dynamische Bedingung an einen Zustandsübergang (alter Wert → neuer Wert) → Trigger.',
            'Redundante / abgeleitete Daten konsistent halten (z. B. bei Generalisierung) → Trigger.',
          ],
        },
      ],
    },
    {
      heading: 'Statisch oder dynamisch?',
      blocks: [
        {
          art: 'text',
          text:
            'Die Vorlesung unterscheidet statische und dynamische Integritätsbedingungen. Statische ' +
            'Bedingungen betreffen den ZUSTAND der Datenbasis (was gerade drinsteht) und werden mit CHECK, ' +
            'PRIMARY KEY, UNIQUE oder Fremdschlüsseln erzwungen. Dynamische Bedingungen betreffen ' +
            'ZUSTANDSÜBERGÄNGE – also den Schritt von alt nach neu – und genau dafür gibt es Trigger.',
        },
        {
          art: 'tabelle',
          titel: 'CHECK/FK gegen Trigger abgrenzen',
          columns: ['Mittel', 'Art', 'Wozu'],
          rows: [
            ['CHECK (bedingung)', 'statisch', 'Bedingung an einen Zeilenzustand, wird bei jeder Änderung/Einfügung geprüft'],
            ['FOREIGN KEY … REFERENCES', 'statisch', 'Verweis auf ein existierendes Tupel (oder Nullwert)'],
            ['CREATE TRIGGER …', 'dynamisch', 'Reaktion auf den Übergang alt→neu; kann alten und neuen Wert vergleichen und Werte anpassen'],
          ],
        },
        {
          art: 'merksatz',
          text:
            'Trigger vs. CHECK: Ein CHECK PRÜFT nur einen einzelnen Zustand und weist die Operation ' +
            'notfalls zurück. Ein Trigger REAGIERT auf den Übergang von altem zu neuem Wert, kann beide ' +
            'vergleichen und den neuen Wert sogar verändern. Was einen Vorher/Nachher-Vergleich braucht, ' +
            'geht nur mit einem Trigger.',
        },
      ],
    },
    {
      heading: 'Aufbau eines Triggers (Oracle-Syntax)',
      blocks: [
        {
          art: 'text',
          text:
            'Die Vorlesung benutzt die Oracle-Konventionen und -Syntax. Ein Trigger hat einen Namen, einen ' +
            'Zeitpunkt (BEFORE oder AFTER), das auslösende Ereignis (INSERT/UPDATE/DELETE), die Tabelle, ' +
            'die Granularität FOR EACH ROW (einmal pro betroffener Zeile) und optional eine WHEN-Bedingung, ' +
            'die den Rumpf nur unter bestimmten Umständen ausführt.',
        },
        {
          art: 'sql',
          titel: 'Grundgerüst',
          code:
            'CREATE TRIGGER name\nBEFORE UPDATE ON tabelle\nFOR EACH ROW\nWHEN (bedingung)\nBEGIN\n  -- Anweisungen\nEND',
        },
        {
          art: 'liste',
          punkte: [
            'BEFORE / AFTER – ob der Code VOR oder NACH der eigentlichen Änderung läuft. Nur BEFORE kann den neuen Wert noch anpassen, bevor er gespeichert wird.',
            'FOR EACH ROW – der Trigger feuert einmal für JEDE betroffene Zeile (Zeilentrigger).',
            'WHEN (bedingung) – optionaler Wächter: Der Rumpf läuft nur, wenn die Bedingung wahr ist.',
            'old / new – die beiden Bilder der Zeile: old = Wert VOR, new = Wert NACH der Änderung. Im Rumpf als Bind-Variablen :old und :new angesprochen.',
          ],
        },
        {
          art: 'merksatz',
          text:
            '„:old, :new are bind variables of the new / old images of data" – old ist der bisherige, ' +
            'new der künftige Zeilenzustand. Im Rumpf schreibt man sie mit Doppelpunkt (:old.Rang, :new.Rang); ' +
            'in der WHEN-Klausel ohne (old.Rang, new.Rang).',
        },
      ],
    },
    {
      heading: 'Beispiel: „keine Degradierung"',
      blocks: [
        {
          art: 'text',
          text:
            'Das Vorlesungsbeispiel sorgt dafür, dass ein Professor niemals zurückgestuft wird: Der Rang ' +
            'darf steigen, aber nicht sinken. Der Trigger läuft BEFORE UPDATE auf Professoren, damit er den ' +
            'neuen Wert noch korrigieren kann, bevor er gespeichert wird. Die WHEN-Klausel begrenzt das auf ' +
            'Zeilen, deren alter Rang überhaupt gesetzt war (old.Rang IS NOT NULL).',
        },
        {
          art: 'sql',
          titel: 'Datenbank-Trigger (Folie, 1:1)',
          code:
            "CREATE TRIGGER keineDegradierung\nBEFORE UPDATE ON Professoren\nFOR EACH ROW\nWHEN (old.Rang IS NOT NULL)\nBEGIN\n  IF :old.Rang = 'C3' AND :new.Rang = 'C2' THEN\n    :new.Rang := 'C3';\n  END IF;\n  IF :old.Rang = 'C4' THEN\n    :new.Rang := 'C4';\n  END IF;\n  IF :new.Rang IS NULL THEN\n    :new.Rang := :old.Rang;\n  END IF;\nEND",
        },
        {
          art: 'text',
          text:
            'Gelesen von oben nach unten: Erstens, ein Herabstufen von C3 auf C2 wird auf C3 zurückgesetzt. ' +
            'Zweitens, ein C4-Professor bleibt in jedem Fall C4 (der neue Wert wird verworfen). Drittens, ' +
            'ein UPDATE, das den Rang auf NULL setzen würde, behält den alten Rang bei. Der Trigger ' +
            'verhindert die Degradierung also nicht durch Zurückweisen, sondern indem er den neuen Wert ' +
            'still auf einen erlaubten Wert korrigiert.',
        },
        {
          art: 'beispiel',
          titel: 'Beispiel 1 – Versuch, C3 auf C2 herabzustufen',
          sql: "UPDATE Professoren\nSET Rang = 'C2'\nWHERE Name = 'Sokrates'",
          erklaerung:
            'old.Rang = C3 ist nicht NULL, also feuert der Trigger. Die erste IF-Bedingung ' +
            '(:old.Rang = C3 AND :new.Rang = C2) trifft zu und setzt :new.Rang zurück auf C3. Gespeichert ' +
            'wird C3 – die Degradierung ist unterbunden.',
          ergebnis: { columns: ['Name', 'Rang (nachher)'], rows: [['Sokrates', 'C3']] },
        },
        {
          art: 'beispiel',
          titel: 'Beispiel 2 – ein C4-Professor soll geändert werden',
          sql: "UPDATE Professoren\nSET Rang = 'C3'\nWHERE Name = 'Kant'",
          erklaerung:
            'old.Rang = C4. Die zweite IF-Bedingung (:old.Rang = C4) trifft zu und setzt :new.Rang wieder ' +
            'auf C4. Ein einmal erreichtes C4 kann also nie mehr gesenkt werden – Kant bleibt C4.',
          ergebnis: { columns: ['Name', 'Rang (nachher)'], rows: [['Kant', 'C4']] },
        },
        {
          art: 'beispiel',
          titel: 'Beispiel 3 – Beförderung von C2 auf C3',
          sql: "UPDATE Professoren\nSET Rang = 'C3'\nWHERE Name = 'Popper'",
          erklaerung:
            'old.Rang = C2, new.Rang = C3. Keine der drei IF-Bedingungen trifft zu (kein C3→C2, kein C4, ' +
            'new.Rang ist nicht NULL). :new.Rang bleibt unverändert – die Beförderung geht durch.',
          ergebnis: { columns: ['Name', 'Rang (nachher)'], rows: [['Popper', 'C3']] },
        },
      ],
    },
    {
      heading: 'Redundanz bei Generalisierung – gutes Design?',
      blocks: [
        {
          art: 'text',
          text:
            'Ein zweiter typischer Einsatz sind Trigger zur Konsistenzerhaltung REDUNDANTER Information bei ' +
            'einer Generalisierung. Wird z. B. ein abgeleiteter oder doppelt gespeicherter Wert (etwa eine ' +
            'Summe oder ein von der Oberklasse geerbtes Attribut) an einer Stelle geändert, kann ein Trigger ' +
            'die Kopie an der anderen Stelle automatisch nachziehen, damit beide nie auseinanderlaufen.',
        },
        {
          art: 'merksatz',
          text:
            'Die Vorlesung stellt bewusst die Frage „Ist das gutes Design?". Trigger können Redundanz ' +
            'konsistent halten – aber die Redundanz überhaupt erst einzuführen und dann per Trigger zu ' +
            'reparieren, ist oft ein Zeichen für ein verbesserungswürdiges Schema. Trigger sind mächtig, ' +
            'aber schwer nachvollziehbar (versteckte Logik); man setzt sie sparsam ein.',
        },
        {
          art: 'liste',
          punkte: [
            'Kaskadierendes Löschen (ON DELETE CASCADE) ist eine verwandte, deklarative Reaktion auf Änderungen – laut Folie klingt es vernünftig, zerstört aber jede Art von Lineage.',
            'Faustregel: erst mit CHECK und Fremdschlüssel versuchen; nur wenn eine Bedingung sich dort nicht ausdrücken lässt, zum Trigger greifen.',
          ],
        },
      ],
    },
  ],
}
