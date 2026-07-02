import type { Thema } from '../themen'

export const thema: Thema = {
  id: 'referentielle-integritaet',
  nr: 0,
  title: 'Referentielle Integrität & Fremdschlüssel',
  subtitle:
    'Fremdschlüssel verweisen auf Tupel einer anderen Relation. Referentielle Integrität sorgt dafür, ' +
    'dass diese Verweise nie ins Leere zeigen – und legt fest, was beim Ändern oder Löschen passiert.',
  sections: [
    {
      heading: 'Worum geht es?',
      blocks: [
        {
          art: 'text',
          text:
            'Ein FREMDSCHLÜSSEL ist ein Attribut, das auf ein Tupel einer (meist anderen) Relation verweist. ' +
            'Beispiel aus der Vorlesung: gelesenVon in Vorlesungen verweist auf ein Tupel in Professoren – ' +
            'es sagt, WELCHER Professor die Vorlesung hält. Damit werden zwei Tabellen dauerhaft verknüpft.',
        },
        {
          art: 'text',
          text:
            'REFERENTIELLE INTEGRITÄT ist die Regel dahinter: Ein Fremdschlüssel muss auf ein EXISTIERENDES ' +
            'Tupel verweisen ODER einen Nullwert enthalten. Er darf nie auf etwas zeigen, das es gar nicht ' +
            '(mehr) gibt. Die Datenbank überwacht das automatisch und weist Operationen zurück, die diese ' +
            'Regel verletzen würden.',
        },
        {
          art: 'merksatz',
          text:
            'Merke: Fremdschlüssel müssen auf existierende Tupel verweisen ODER NULL sein. Ein „hängender" ' +
            'Verweis auf ein gelöschtes Tupel ist verboten.',
        },
      ],
    },
    {
      heading: 'Die drei Schlüsselarten in SQL',
      blocks: [
        {
          art: 'text',
          text:
            'Man unterscheidet drei Arten von Schlüsseln, die in SQL jeweils ein eigenes Schlüsselwort haben. ' +
            'Kandidatenschlüssel identifizieren ein Tupel eindeutig; einer von ihnen wird zum Primärschlüssel ' +
            'gewählt; Fremdschlüssel stellen die Verbindung zu einer anderen Relation her.',
        },
        {
          art: 'tabelle',
          titel: 'Schlüsselarten und ihr SQL-Schlüsselwort',
          columns: ['Schlüsselart', 'SQL', 'Bedeutung'],
          rows: [
            ['Kandidatenschlüssel', 'unique', 'Werte sind eindeutig (NULL bleibt erlaubt).'],
            ['Primärschlüssel', 'primary key', 'Ein ausgewählter Kandidatenschlüssel: eindeutig UND nicht NULL.'],
            ['Fremdschlüssel', 'foreign key / references', 'Verweist auf ein existierendes Tupel einer Relation (oder ist NULL).'],
          ],
        },
        {
          art: 'sql',
          titel: 'Grundform (aus der Vorlesung)',
          code:
            'create table R (\n  A integer primary key,\n  ...\n)\n\ncreate table S (\n  ...,\n  B integer references R\n)',
        },
        {
          art: 'text',
          text:
            'R ist hier die unabhängige Relation; S verweist über B auf R. Der Fremdschlüssel references R ' +
            'zeigt standardmäßig auf den Primärschlüssel von R. Solange nichts weiter angegeben ist, ' +
            'überwacht die Datenbank die referentielle Integrität und weist verletzende Änderungen zurück.',
        },
      ],
    },
    {
      heading: 'Was passiert beim Ändern/Löschen referenzierter Daten?',
      blocks: [
        {
          art: 'text',
          text:
            'Heikel wird es, wenn ein Tupel in R geändert oder gelöscht wird, auf das ein Tupel in S noch ' +
            'verweist – z. B. update R set A = A_neu where … oder delete from R where … Dann würde der Verweis ' +
            'in S plötzlich ins Leere zeigen. Beim Anlegen des Fremdschlüssels legt man fest, wie die ' +
            'Datenbank darauf reagiert.',
        },
        {
          art: 'liste',
          punkte: [
            'Default (ohne Angabe): Zurückweisen der Änderungs-/Löschoperation, solange noch Verweise darauf existieren.',
            'on delete/update cascade – Propagieren: Die Änderung/Löschung wird auf die verweisenden Tupel in S weitergereicht.',
            'on delete/update set null – Die Verweise in S werden auf einen Nullwert gesetzt.',
          ],
        },
        {
          art: 'tabelle',
          titel: 'Die drei Aktionen gegenübergestellt',
          columns: ['Aktion', 'SQL-Angabe', 'Was mit dem verweisenden Tupel in S passiert'],
          rows: [
            ['Zurückweisen (Default)', '(keine Angabe) / restrict / no action', 'Nichts – die Operation auf R wird abgelehnt, solange S noch verweist.'],
            ['Kaskadieren (Propagieren)', 'on delete cascade / on update cascade', 'Wird mitgelöscht bzw. mitgeändert (Wert wandert nach).'],
            ['Auf Null setzen', 'on delete set null / on update set null', 'Bleibt erhalten, der Fremdschlüssel wird auf NULL gesetzt.'],
          ],
        },
        {
          art: 'merksatz',
          text:
            'Kurz: Ohne Angabe zurückweisen, cascade reicht durch, set null kappt den Verweis. ' +
            'Alle drei halten die referentielle Integrität ein – sie tun es nur auf unterschiedliche Weise.',
        },
      ],
    },
    {
      heading: 'Vorher/Nachher: die drei Aktionen am Beispiel',
      blocks: [
        {
          art: 'text',
          text:
            'Ausgangslage (aus der Vorlesung): R enthält u. a. das Tupel mit Wert κ1, und S verweist mit ' +
            'seinem Fremdschlüssel auf genau dieses κ1. Jetzt wird in R dieses Tupel geändert bzw. gelöscht:',
        },
        {
          art: 'sql',
          titel: 'Die auslösenden Operationen auf R',
          code: "update R set A = 'κ1' where A = κ1\n\ndelete from R where A = κ1",
        },
        {
          art: 'beispiel',
          titel: 'a) on delete/update cascade – Propagieren',
          sql:
            'create table S (\n  ...,\n  B integer references R on update cascade\n)\n\ncreate table S (\n  ...,\n  B integer references R on delete cascade\n)',
          erklaerung:
            'Bei update wandert der neue Wert κ1′ auch in S nach (S verweist danach auf κ1′). Bei delete ' +
            'wird das verweisende Tupel in S gleich mitgelöscht. Die Änderung wird also durchgereicht.',
        },
        {
          art: 'beispiel',
          titel: 'b) on delete/update set null – Verweis kappen',
          sql:
            'create table S (\n  ...,\n  B integer references R on update set null\n)\n\ncreate table S (\n  ...,\n  B integer references R on delete set null\n)',
          erklaerung:
            'Das Tupel in S bleibt bestehen, aber sein Fremdschlüssel B wird auf NULL gesetzt (in der Folie ' +
            'als B = --- dargestellt). So verweist S auf nichts mehr – und das ist laut Definition erlaubt.',
        },
        {
          art: 'beispiel',
          titel: 'c) Default – Zurückweisen',
          sql: 'create table S (\n  ...,\n  B integer references R\n)',
          erklaerung:
            'Ohne Zusatz lehnt die Datenbank das update bzw. delete auf R ab, solange S noch auf κ1 verweist. ' +
            'Erst wenn kein Tupel mehr darauf zeigt, ist die Operation auf R erlaubt.',
        },
      ],
    },
    {
      heading: 'Das Universitätsschema mit referentieller Integrität',
      blocks: [
        {
          art: 'text',
          text:
            'So sehen die create-table-Anweisungen des Kemper-Universitätsschemas mit Fremdschlüsseln aus. ' +
            'Beachte, wie jede Beziehung eine passende Aktion bekommt: Professoren sollen nicht gelöscht ' +
            'werden können, ohne dass die Datenbank reagiert – also set null bei den Verweisen auf sie.',
        },
        {
          art: 'sql',
          titel: 'Vorlesungen & Assistenten → Professoren (set null)',
          code:
            'create table Vorlesungen (\n  VorlNr    integer primary key,\n  Titel     varchar(30),\n  SWS       integer,\n  gelesenVon integer references Professoren on delete set null\n)\n\ncreate table Assistenten (\n  PersNr    integer primary key,\n  Name      varchar(30) not null,\n  Fachgebiet varchar(30),\n  Boss      integer,\n  foreign key (Boss) references Professoren on delete set null\n)',
        },
        {
          art: 'text',
          text:
            'Wird ein Professor gelöscht, bleiben seine Vorlesungen und seine Assistenten erhalten; nur ' +
            'gelesenVon bzw. Boss werden auf NULL gesetzt – die Vorlesung hat dann vorübergehend keinen ' +
            'zugeordneten Professor.',
        },
        {
          art: 'sql',
          titel: 'hören → Studenten/Vorlesungen (cascade)',
          code:
            'create table hören (\n  MatrNr integer references Studenten on delete cascade,\n  VorlNr integer references Vorlesungen on delete cascade,\n  primary key (MatrNr, VorlNr)\n)',
        },
        {
          art: 'text',
          text:
            'Bei den Beziehungstabellen ist cascade sinnvoll: Wird ein Student gelöscht, sollen auch seine ' +
            'hören-Einträge verschwinden – ein Hörer-Eintrag ohne zugehörigen Studenten wäre sinnlos.',
        },
        {
          art: 'sql',
          titel: 'prüfen – drei Fremdschlüssel mit unterschiedlichen Aktionen',
          code:
            'create table prüfen (\n  MatrNr integer references Studenten on delete cascade,\n  VorlNr integer references Vorlesungen,\n  PersNr integer references Professoren on delete set null,\n  Note   numeric(2,1) check (Note between 0.7 and 5.0),\n  primary key (MatrNr, VorlNr)\n)',
        },
        {
          art: 'text',
          text:
            'prüfen zeigt alle drei Varianten auf einmal: Studenten → cascade (Prüfung verschwindet mit dem ' +
            'Studenten), Vorlesungen → Default/Zurückweisen (keine Angabe), Professoren → set null (der ' +
            'Prüfer-Verweis wird gekappt, die Prüfung mit Note bleibt aber erhalten).',
        },
      ],
    },
    {
      heading: 'Sonderfall & Warnung: kaskadierendes Löschen',
      blocks: [
        {
          art: 'text',
          text:
            'on delete cascade kann eine Kettenreaktion auslösen. Verweist B kaskadierend auf A und C ' +
            'kaskadierend auf B, so reißt das Löschen eines A-Tupels alles hinter sich her. In der Vorlesung ' +
            'wird das an einem Vorlesungs-Voraussetzungsbaum gezeigt: Löscht man „Sokrates" bzw. eine ' +
            'grundlegende Vorlesung, verschwinden über die Kette alle darauf aufbauenden Einträge.',
        },
        {
          art: 'sql',
          titel: 'Kaskade über zwei Stufen',
          code:
            'create table Vorlesungen (\n  ...,\n  gelesenVon integer references Professoren on delete cascade\n)\n\ncreate table hören (\n  ...,\n  VorlNr integer references Vorlesungen on delete cascade\n)',
        },
        {
          art: 'merksatz',
          text:
            'Warnung aus der Vorlesung: Kaskadierendes Löschen „hört sich vernünftig an, zerstört aber jede ' +
            'Art von Lineage" – ein einziges delete kann unbeabsichtigt sehr viele Tupel mitlöschen. Cascade ' +
            'darum bewusst und sparsam einsetzen.',
        },
      ],
    },
  ],
}
