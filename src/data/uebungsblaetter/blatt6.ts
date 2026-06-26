import type { Uebungsblatt } from '../../types'

export const blatt6: Uebungsblatt = {
  id: 'blatt6',
  nr: '6',
  typ: 'Gruppen- & Hausaufgaben',
  beschreibung:
    'Relationale Algebra in der Praxis: ER-Diagramm aus einem verfeinerten Relationenschema rekonstruieren, ' +
    'komplexere Anfragen (Mehrfach-Joins, Self-Join, Aggregation, Differenz/Anti-Join) samt Operatorbäumen ' +
    'formulieren sowie den SQL-Client und die Datenbankverbindung einrichten.',
  anmerkung: {
    titel: 'Hinweis',
    punkte: [
      'Für Ausdrücke der Relationalen Algebra gibt es oft mehrere richtige Lösungen (frühe/späte Selektion oder Projektion, Reihenfolge der Joins). Angegeben ist je eine Beispiellösung.',
      'σ = Selektion, π = Projektion, ⋈ = Join, × = Kreuzprodukt, ∪ = Vereinigung, − = Differenz, ρ = Umbenennung, γ = Gruppierung/Aggregation, ▷ = Anti-Semi-Join.',
    ],
  },
  tasks: [
    {
      nr: 1,
      titel: 'Gruppenaufgabe 1 – ER-Rekonstruktion & Anfragen',
      text:
        'Gegeben das verfeinerte Schema: Mitarbeiter(MitarbeiterID, …, AbtNr), Abteilung(AbtNr, …), Server(ServerID, …, AbtNr), ' +
        'Notebook(NotebookID, …, MitarbeiterID), Serveranwendung(Anwendungskennung, …, ServerID), Hat_Zugriff_Auf(MitarbeiterID, Anwendungskennung).\n\n' +
        '(1) Rekonstruieren Sie das ER-Diagramm (nur Schlüsselattribute). (2) Formulieren Sie a)–e) in relationaler Algebra mit Operatorbaum.',
      loesung: [
        {
          art: 'unterpunkt',
          label: '(1) ER-Diagramm',
          text: 'Aus den Fremdschlüsseln ergeben sich die Beziehungen. Wichtig: Durch die Verfeinerung (Zusammenfassen) sind 1:1/1:N/N:1-Beziehungen in den Entity-Relationen „verschwunden" – nur die N:M-Beziehung Hat_Zugriff_Auf hat eine eigene Relation behalten.',
        },
        {
          art: 'svg',
          titel: 'Rekonstruiertes ER-Diagramm',
          svg: `<svg viewBox="0 0 900 540" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ER-Diagramm Mitarbeiter/Server">
  <line class="dgm-line" x1="180" y1="142" x2="205" y2="142"/>
  <line class="dgm-line" x1="295" y1="142" x2="340" y2="142"/>
  <line class="dgm-line" x1="470" y1="142" x2="510" y2="142"/>
  <line class="dgm-line" x1="610" y1="142" x2="660" y2="142"/>
  <line class="dgm-line" x1="405" y1="164" x2="405" y2="244"/>
  <line class="dgm-line" x1="405" y1="316" x2="405" y2="400"/>
  <line class="dgm-line" x1="720" y1="164" x2="720" y2="246"/>
  <line class="dgm-line" x1="720" y1="314" x2="720" y2="400"/>
  <line class="dgm-line" x1="480" y1="422" x2="500" y2="422"/>
  <line class="dgm-line" x1="620" y1="422" x2="660" y2="422"/>
  <line class="dgm-line" x1="120" y1="120" x2="120" y2="88"/>
  <line class="dgm-line" x1="405" y1="120" x2="405" y2="88"/>
  <line class="dgm-line" x1="720" y1="120" x2="720" y2="88"/>
  <line class="dgm-line" x1="405" y1="444" x2="405" y2="468"/>
  <line class="dgm-line" x1="780" y1="430" x2="820" y2="430"/>
  <rect class="dgm-shape" x="60" y="120" width="120" height="44" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="120" y="147" text-anchor="middle">Notebook</text>
  <polygon class="dgm-shape" points="205,142 250,112 295,142 250,172"/>
  <text class="dgm-text dgm-text--sm" x="250" y="146" text-anchor="middle">besitzt</text>
  <rect class="dgm-shape" x="340" y="120" width="130" height="44" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="405" y="147" text-anchor="middle">Mitarbeiter</text>
  <polygon class="dgm-shape" points="510,142 560,112 610,142 560,172"/>
  <text class="dgm-text dgm-text--sm" x="560" y="146" text-anchor="middle">arbeitet_in</text>
  <rect class="dgm-shape" x="660" y="120" width="120" height="44" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="720" y="147" text-anchor="middle">Abteilung</text>
  <polygon class="dgm-shape" points="335,280 405,244 475,280 405,316"/>
  <text class="dgm-text dgm-text--sm" x="405" y="284" text-anchor="middle">Hat_Zugriff_Auf</text>
  <rect class="dgm-shape" x="330" y="400" width="150" height="44" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="405" y="427" text-anchor="middle">Serveranwendung</text>
  <polygon class="dgm-shape" points="665,280 720,246 775,280 720,314"/>
  <text class="dgm-text dgm-text--sm" x="720" y="284" text-anchor="middle">benutzt_von</text>
  <rect class="dgm-shape" x="660" y="400" width="120" height="44" rx="4"/>
  <text class="dgm-text dgm-text--sm" x="720" y="427" text-anchor="middle">Server</text>
  <polygon class="dgm-shape" points="500,422 560,390 620,422 560,454"/>
  <text class="dgm-text dgm-text--sm" x="560" y="426" text-anchor="middle">existieren_auf</text>
  <ellipse class="dgm-shape" cx="120" cy="72" rx="48" ry="16"/>
  <text class="dgm-key" x="120" y="77" text-anchor="middle">NotebookID</text>
  <ellipse class="dgm-shape" cx="405" cy="72" rx="50" ry="16"/>
  <text class="dgm-key" x="405" y="77" text-anchor="middle">MitarbeiterID</text>
  <ellipse class="dgm-shape" cx="720" cy="72" rx="34" ry="16"/>
  <text class="dgm-key" x="720" y="77" text-anchor="middle">AbtNr</text>
  <ellipse class="dgm-shape" cx="405" cy="488" rx="60" ry="17"/>
  <text class="dgm-key" x="405" y="486" text-anchor="middle">Anwendungs-</text>
  <text class="dgm-key" x="405" y="499" text-anchor="middle">kennung</text>
  <ellipse class="dgm-shape" cx="850" cy="430" rx="40" ry="16"/>
  <text class="dgm-key" x="850" y="435" text-anchor="middle">ServerID</text>
  <text class="dgm-card" x="190" y="135">1</text>
  <text class="dgm-card" x="305" y="135">1</text>
  <text class="dgm-card" x="478" y="135">N</text>
  <text class="dgm-card" x="624" y="135">1</text>
  <text class="dgm-card" x="412" y="200">N</text>
  <text class="dgm-card" x="412" y="360">M</text>
  <text class="dgm-card" x="728" y="202">1</text>
  <text class="dgm-card" x="728" y="360">N</text>
  <text class="dgm-card" x="486" y="414">N</text>
  <text class="dgm-card" x="628" y="414">1</text>
</svg>`,
        },
        {
          art: 'code',
          titel: 'a) Acer-Notebooks mit mehr als 6 GB RAM',
          text: "σ[Marke = 'Acer' ∧ RAM > 6] ( Notebook )",
        },
        {
          art: 'svg',
          titel: 'a) Operatorbaum',
          svg: `<svg viewBox="0 0 420 150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Baum 1a">
  <line class="dgm-line" x1="210" y1="55" x2="210" y2="105"/>
  <rect class="dgm-shape" x="80" y="25" width="260" height="30" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="210" y="45" text-anchor="middle">σ[Marke='Acer' ∧ RAM&gt;6]</text>
  <rect class="dgm-shape" x="155" y="105" width="110" height="30" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="210" y="125" text-anchor="middle">Notebook</text>
</svg>`,
        },
        {
          art: 'code',
          titel: 'b) Marke des Notebooks von Max Mustermann',
          text: "π[Marke] ( σ[Vorname='Max' ∧ Nachname='Mustermann'] (Mitarbeiter) ⋈ Notebook )",
        },
        {
          art: 'svg',
          titel: 'b) Operatorbaum',
          svg: `<svg viewBox="0 0 640 330" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Baum 1b">
  <line class="dgm-line" x1="320" y1="50" x2="320" y2="100"/>
  <line class="dgm-line" x1="320" y1="130" x2="200" y2="185"/>
  <line class="dgm-line" x1="320" y1="130" x2="520" y2="185"/>
  <line class="dgm-line" x1="200" y1="217" x2="200" y2="270"/>
  <rect class="dgm-shape" x="280" y="20" width="80" height="30" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="320" y="40" text-anchor="middle">π[Marke]</text>
  <rect class="dgm-shape" x="300" y="100" width="40" height="30" rx="5"/>
  <text class="dgm-text" x="320" y="121" text-anchor="middle">⋈</text>
  <rect class="dgm-shape" x="40" y="185" width="330" height="32" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="205" y="205" text-anchor="middle">σ[Vorname='Max' ∧ Nachname='Mustermann']</text>
  <rect class="dgm-shape" x="145" y="270" width="110" height="30" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="200" y="290" text-anchor="middle">Mitarbeiter</text>
  <rect class="dgm-shape" x="465" y="185" width="110" height="30" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="520" y="205" text-anchor="middle">Notebook</text>
</svg>`,
        },
        {
          art: 'code',
          titel: 'c) Mitarbeiter mit Zugriff auf SalesForceCRM',
          text: "π[Name, Vorname] ( Mitarbeiter ⋈ Hat_Zugriff_Auf ⋈ σ[Name='SalesForceCRM'] (Serveranwendung) )",
        },
        {
          art: 'svg',
          titel: 'c) Operatorbaum',
          svg: `<svg viewBox="0 0 700 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Baum 1c">
  <line class="dgm-line" x1="350" y1="50" x2="350" y2="100"/>
  <line class="dgm-line" x1="350" y1="130" x2="210" y2="185"/>
  <line class="dgm-line" x1="350" y1="130" x2="500" y2="185"/>
  <line class="dgm-line" x1="210" y1="160" x2="110" y2="270"/>
  <line class="dgm-line" x1="210" y1="160" x2="300" y2="270"/>
  <line class="dgm-line" x1="500" y1="217" x2="500" y2="290"/>
  <rect class="dgm-shape" x="290" y="20" width="120" height="30" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="350" y="40" text-anchor="middle">π[Name, Vorname]</text>
  <rect class="dgm-shape" x="330" y="100" width="40" height="30" rx="5"/>
  <text class="dgm-text" x="350" y="121" text-anchor="middle">⋈</text>
  <rect class="dgm-shape" x="190" y="130" width="40" height="30" rx="5"/>
  <text class="dgm-text" x="210" y="151" text-anchor="middle">⋈</text>
  <rect class="dgm-shape" x="55" y="270" width="110" height="30" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="110" y="290" text-anchor="middle">Mitarbeiter</text>
  <rect class="dgm-shape" x="240" y="270" width="130" height="30" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="305" y="290" text-anchor="middle">Hat_Zugriff_Auf</text>
  <rect class="dgm-shape" x="380" y="185" width="240" height="32" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="500" y="205" text-anchor="middle">σ[Name='SalesForceCRM']</text>
  <rect class="dgm-shape" x="430" y="290" width="150" height="30" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="505" y="310" text-anchor="middle">Serveranwendung</text>
</svg>`,
        },
        {
          art: 'code',
          titel: 'd) Mitarbeiter (geb. nach 2001) ohne Notebook',
          text:
            "π[Nachname, Vorname] ( σ[Geburtsjahr > 2001] (Mitarbeiter) )\n" +
            "   −\n" +
            "π[Nachname, Vorname] ( σ[Geburtsjahr > 2001] (Mitarbeiter ⋈ Notebook) )\n" +
            "\n" +
            "alternativ mit Anti-Semi-Join:\n" +
            "π[Nachname, Vorname] ( σ[Geburtsjahr > 2001] (Mitarbeiter) ▷ Notebook )",
        },
        {
          art: 'svg',
          titel: 'd) Operatorbaum (Differenz-Variante)',
          svg: `<svg viewBox="0 0 740 470" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Baum 1d">
  <line class="dgm-line" x1="370" y1="50" x2="190" y2="100"/>
  <line class="dgm-line" x1="370" y1="50" x2="530" y2="100"/>
  <line class="dgm-line" x1="190" y1="132" x2="190" y2="178"/>
  <line class="dgm-line" x1="190" y1="210" x2="190" y2="258"/>
  <line class="dgm-line" x1="530" y1="132" x2="530" y2="178"/>
  <line class="dgm-line" x1="530" y1="210" x2="530" y2="258"/>
  <line class="dgm-line" x1="530" y1="288" x2="450" y2="338"/>
  <line class="dgm-line" x1="530" y1="288" x2="610" y2="338"/>
  <rect class="dgm-shape" x="350" y="20" width="40" height="30" rx="5"/>
  <text class="dgm-text" x="370" y="41" text-anchor="middle">−</text>
  <rect class="dgm-shape" x="110" y="100" width="160" height="32" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="190" y="120" text-anchor="middle">π[Nachname, Vorname]</text>
  <rect class="dgm-shape" x="95" y="178" width="190" height="32" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="190" y="198" text-anchor="middle">σ[Geburtsjahr &gt; 2001]</text>
  <rect class="dgm-shape" x="135" y="258" width="110" height="30" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="190" y="278" text-anchor="middle">Mitarbeiter</text>
  <rect class="dgm-shape" x="450" y="100" width="160" height="32" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="530" y="120" text-anchor="middle">π[Nachname, Vorname]</text>
  <rect class="dgm-shape" x="435" y="178" width="190" height="32" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="530" y="198" text-anchor="middle">σ[Geburtsjahr &gt; 2001]</text>
  <rect class="dgm-shape" x="510" y="258" width="40" height="30" rx="5"/>
  <text class="dgm-text" x="530" y="279" text-anchor="middle">⋈</text>
  <rect class="dgm-shape" x="395" y="338" width="110" height="30" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="450" y="358" text-anchor="middle">Mitarbeiter</text>
  <rect class="dgm-shape" x="555" y="338" width="110" height="30" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="610" y="358" text-anchor="middle">Notebook</text>
</svg>`,
        },
        {
          art: 'code',
          titel: 'e) Anzahl Mitarbeiter je Abteilung',
          text: 'γ[Bezeichnung; count(*) → AnzahlMitarbeiter] ( Mitarbeiter ⋈ Abteilung )',
        },
        {
          art: 'svg',
          titel: 'e) Operatorbaum',
          svg: `<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Baum 1e">
  <line class="dgm-line" x1="320" y1="52" x2="320" y2="110"/>
  <line class="dgm-line" x1="320" y1="140" x2="220" y2="200"/>
  <line class="dgm-line" x1="320" y1="140" x2="420" y2="200"/>
  <rect class="dgm-shape" x="130" y="20" width="380" height="32" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="320" y="40" text-anchor="middle">γ[Bezeichnung; count(*) → AnzahlMitarbeiter]</text>
  <rect class="dgm-shape" x="300" y="110" width="40" height="30" rx="5"/>
  <text class="dgm-text" x="320" y="131" text-anchor="middle">⋈</text>
  <rect class="dgm-shape" x="165" y="200" width="110" height="30" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="220" y="220" text-anchor="middle">Mitarbeiter</text>
  <rect class="dgm-shape" x="365" y="200" width="110" height="30" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="420" y="220" text-anchor="middle">Abteilung</text>
</svg>`,
        },
      ],
    },
    {
      nr: 2,
      titel: 'Hausaufgabe 1 – weitere Anfragen (gleiches Schema)',
      text:
        'Formulieren Sie für das Schema aus Gruppenaufgabe 1 in relationaler Algebra (mit Operatorbaum):\n\n' +
        'a) Welche Festplattenkapazitäten gibt es bei Notebooks oder Servern?\n' +
        'b) Welche Abteilungen benutzen einen Server, auf dem „SalesForceCRM" existiert?\n' +
        'c) Paare von Mitarbeitern (Namen), die in derselben Abteilung arbeiten (Self-Join).',
      loesung: [
        { art: 'code', titel: 'a)', text: 'π[Festplattenkapazität] (Notebook)  ∪  π[Festplattenkapazität] (Server)' },
        {
          art: 'svg',
          titel: 'a) Operatorbaum',
          svg: `<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Baum HA1a">
  <line class="dgm-line" x1="320" y1="50" x2="170" y2="105"/>
  <line class="dgm-line" x1="320" y1="50" x2="470" y2="105"/>
  <line class="dgm-line" x1="170" y1="137" x2="170" y2="200"/>
  <line class="dgm-line" x1="470" y1="137" x2="470" y2="200"/>
  <rect class="dgm-shape" x="300" y="20" width="40" height="30" rx="5"/>
  <text class="dgm-text" x="320" y="41" text-anchor="middle">∪</text>
  <rect class="dgm-shape" x="70" y="105" width="200" height="32" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="170" y="125" text-anchor="middle">π[Festplattenkapazität]</text>
  <rect class="dgm-shape" x="115" y="200" width="110" height="30" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="170" y="220" text-anchor="middle">Notebook</text>
  <rect class="dgm-shape" x="370" y="105" width="200" height="32" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="470" y="125" text-anchor="middle">π[Festplattenkapazität]</text>
  <rect class="dgm-shape" x="415" y="200" width="110" height="30" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="470" y="220" text-anchor="middle">Server</text>
</svg>`,
        },
        {
          art: 'code',
          titel: 'b)',
          text: "π[Bezeichnung] ( σ[Serveranwendung.Name='SalesForceCRM'] ( (Abteilung ⋈ Server) ⋈[Serveranwendung.ServerID = Server.ServerID] Serveranwendung ) )",
        },
        {
          art: 'svg',
          titel: 'b) Operatorbaum',
          svg: `<svg viewBox="0 0 700 470" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Baum HA1b">
  <line class="dgm-line" x1="350" y1="50" x2="350" y2="100"/>
  <line class="dgm-line" x1="350" y1="132" x2="350" y2="180"/>
  <line class="dgm-line" x1="350" y1="212" x2="220" y2="275"/>
  <line class="dgm-line" x1="350" y1="212" x2="500" y2="275"/>
  <line class="dgm-line" x1="220" y1="305" x2="140" y2="360"/>
  <line class="dgm-line" x1="220" y1="305" x2="300" y2="360"/>
  <rect class="dgm-shape" x="290" y="20" width="120" height="30" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="350" y="40" text-anchor="middle">π[Bezeichnung]</text>
  <rect class="dgm-shape" x="160" y="100" width="380" height="32" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="350" y="120" text-anchor="middle">σ[Serveranwendung.Name='SalesForceCRM']</text>
  <rect class="dgm-shape" x="185" y="180" width="330" height="32" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="350" y="200" text-anchor="middle">⋈[Serveranw.ServerID = Server.ServerID]</text>
  <rect class="dgm-shape" x="200" y="275" width="40" height="30" rx="5"/>
  <text class="dgm-text" x="220" y="296" text-anchor="middle">⋈</text>
  <rect class="dgm-shape" x="85" y="360" width="110" height="30" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="140" y="380" text-anchor="middle">Abteilung</text>
  <rect class="dgm-shape" x="245" y="360" width="110" height="30" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="300" y="380" text-anchor="middle">Server</text>
  <rect class="dgm-shape" x="425" y="275" width="150" height="30" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="500" y="295" text-anchor="middle">Serveranwendung</text>
</svg>`,
        },
        {
          art: 'text',
          text:
            'Anmerkung: Beim Join mit Serveranwendung muss ein Theta-Join über ServerID verwendet werden, weil Server ' +
            'und Serveranwendung zwei gleichnamige Attribute (ServerID und Name) haben – ein natürlicher Join würde ' +
            'fälschlich auch über Name verbinden.',
        },
        {
          art: 'code',
          titel: 'c) Mitarbeiter-Paare derselben Abteilung (Self-Join)',
          text:
            'π[M1.Vorname, M1.Nachname, M2.Vorname, M2.Nachname] (\n' +
            '  σ[M1.AbtNr = M2.AbtNr ∧ M1.MitarbeiterID ≠ M2.MitarbeiterID] (\n' +
            '    ρ[M1](Mitarbeiter) × ρ[M2](Mitarbeiter) ) )',
        },
        {
          art: 'svg',
          titel: 'c) Operatorbaum',
          svg: `<svg viewBox="0 0 720 470" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Baum HA1c">
  <line class="dgm-line" x1="360" y1="52" x2="360" y2="115"/>
  <line class="dgm-line" x1="360" y1="147" x2="360" y2="195"/>
  <line class="dgm-line" x1="360" y1="225" x2="240" y2="280"/>
  <line class="dgm-line" x1="360" y1="225" x2="480" y2="280"/>
  <line class="dgm-line" x1="240" y1="310" x2="240" y2="360"/>
  <line class="dgm-line" x1="480" y1="310" x2="480" y2="360"/>
  <rect class="dgm-shape" x="120" y="20" width="480" height="32" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="360" y="40" text-anchor="middle">π[M1.Vorname, M1.Nachname, M2.Vorname, M2.Nachname]</text>
  <rect class="dgm-shape" x="110" y="115" width="500" height="32" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="360" y="135" text-anchor="middle">σ[M1.AbtNr = M2.AbtNr ∧ M1.ID ≠ M2.ID]</text>
  <rect class="dgm-shape" x="340" y="195" width="40" height="30" rx="5"/>
  <text class="dgm-text" x="360" y="216" text-anchor="middle">×</text>
  <rect class="dgm-shape" x="185" y="280" width="110" height="30" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="240" y="300" text-anchor="middle">ρ[M1]</text>
  <rect class="dgm-shape" x="185" y="360" width="110" height="30" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="240" y="380" text-anchor="middle">Mitarbeiter</text>
  <rect class="dgm-shape" x="425" y="280" width="110" height="30" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="480" y="300" text-anchor="middle">ρ[M2]</text>
  <rect class="dgm-shape" x="425" y="360" width="110" height="30" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="480" y="380" text-anchor="middle">Mitarbeiter</text>
</svg>`,
        },
        {
          art: 'text',
          text:
            'Anmerkung: Besser als „≠" ist „<" (oder „>") in der Bedingung, um Paare doppelt zu vermeiden – z. B. ' +
            '(Tom, Lisa) UND (Lisa, Tom). Mit „≠" werden nur die trivialen Paare (Tom, Tom) ausgeschlossen.',
        },
      ],
    },
    {
      nr: 3,
      titel: 'Hausaufgabe 2 – Anfragen auf der Universitätsdatenbank',
      text:
        '(1) Geben Sie alle Vorlesungen (VorlNr, Titel) an, die der Student „Theophrastos" gehört hat.\n' +
        '(2) Geben Sie die Namen der AssistentInnen von ProfessorInnen an, die Vorlesungen mit 4 SWS halten, für die es Nachfolgervorlesungen gibt.',
      loesung: [
        {
          art: 'code',
          titel: '(1) relationale Algebra',
          text: "π[VorlNr, Titel] ( ( σ[Name='Theophrastos'] (Studenten) ⋈ hören ) ⋈ Vorlesungen )",
        },
        {
          art: 'svg',
          titel: '(1) Operatorbaum',
          svg: `<svg viewBox="0 0 680 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Baum HA2-1">
  <line class="dgm-line" x1="340" y1="50" x2="340" y2="100"/>
  <line class="dgm-line" x1="340" y1="130" x2="220" y2="185"/>
  <line class="dgm-line" x1="340" y1="130" x2="490" y2="185"/>
  <line class="dgm-line" x1="220" y1="160" x2="130" y2="270"/>
  <line class="dgm-line" x1="220" y1="160" x2="320" y2="270"/>
  <line class="dgm-line" x1="130" y1="302" x2="130" y2="350"/>
  <rect class="dgm-shape" x="280" y="20" width="120" height="30" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="340" y="40" text-anchor="middle">π[VorlNr, Titel]</text>
  <rect class="dgm-shape" x="320" y="100" width="40" height="30" rx="5"/>
  <text class="dgm-text" x="340" y="121" text-anchor="middle">⋈</text>
  <rect class="dgm-shape" x="200" y="130" width="40" height="30" rx="5"/>
  <text class="dgm-text" x="220" y="151" text-anchor="middle">⋈</text>
  <rect class="dgm-shape" x="25" y="270" width="210" height="32" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="130" y="290" text-anchor="middle">σ[Name='Theophrastos']</text>
  <rect class="dgm-shape" x="75" y="350" width="110" height="30" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="130" y="370" text-anchor="middle">Studenten</text>
  <rect class="dgm-shape" x="280" y="270" width="80" height="30" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="320" y="290" text-anchor="middle">hören</text>
  <rect class="dgm-shape" x="435" y="185" width="120" height="30" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="495" y="205" text-anchor="middle">Vorlesungen</text>
</svg>`,
        },
        {
          art: 'code',
          titel: '(2) relationale Algebra',
          text: "π[Name] ( σ[SWS=4] ( ( Assistenten ⋈[Boss = gelesenVon] Vorlesungen ) ⋈[VorlNr = Vorgänger] voraussetzen ) )",
        },
        {
          art: 'svg',
          titel: '(2) Operatorbaum',
          svg: `<svg viewBox="0 0 700 470" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Baum HA2-2">
  <line class="dgm-line" x1="350" y1="50" x2="350" y2="100"/>
  <line class="dgm-line" x1="350" y1="132" x2="350" y2="180"/>
  <line class="dgm-line" x1="350" y1="212" x2="230" y2="275"/>
  <line class="dgm-line" x1="350" y1="212" x2="510" y2="275"/>
  <line class="dgm-line" x1="230" y1="305" x2="150" y2="360"/>
  <line class="dgm-line" x1="230" y1="305" x2="320" y2="360"/>
  <rect class="dgm-shape" x="310" y="20" width="80" height="30" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="350" y="40" text-anchor="middle">π[Name]</text>
  <rect class="dgm-shape" x="305" y="100" width="90" height="32" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="350" y="120" text-anchor="middle">σ[SWS=4]</text>
  <rect class="dgm-shape" x="225" y="180" width="250" height="32" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="350" y="200" text-anchor="middle">⋈[VorlNr = Vorgänger]</text>
  <rect class="dgm-shape" x="120" y="275" width="220" height="32" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="230" y="295" text-anchor="middle">⋈[Boss = gelesenVon]</text>
  <rect class="dgm-shape" x="95" y="360" width="110" height="30" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="150" y="380" text-anchor="middle">Assistenten</text>
  <rect class="dgm-shape" x="265" y="360" width="120" height="30" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="325" y="380" text-anchor="middle">Vorlesungen</text>
  <rect class="dgm-shape" x="450" y="275" width="120" height="30" rx="5"/>
  <text class="dgm-text dgm-text--sm" x="510" y="295" text-anchor="middle">voraussetzen</text>
</svg>`,
        },
      ],
    },
    {
      nr: 4,
      titel: 'Hausaufgabe 3 – SQL-Client & Datenbankverbindung',
      hinweis: 'praktische Einrichtung',
      text:
        'a) Installieren Sie einen SQL-Client (SQL Developer, DBeaver oder DataGrip). ' +
        'b) Legen Sie eine individuelle Datenbankverbindung an und setzen Sie mit schema_rn.sql und daten.sql das ' +
        'Universitätsschema auf. c) Abgabe: Screenshots des erfolgreichen Verbindungsaufbaus und der aufgesetzten DB.',
      loesung: [
        {
          art: 'liste',
          punkte: [
            'Verbindungs-/Benutzername/Kennwort: individuelle Kennung (z. B. DBAIA01)',
            'Hostname: zeus.informatik.hs-fulda.de',
            'Port: 1521',
            'SID: zeuspdb1',
          ],
        },
        {
          art: 'text',
          text:
            'schema_rn.sql legt die Tabellen des Universitätsschemas an, daten.sql füllt sie mit den Beispieldaten – beide ' +
            'nacheinander ausführen (jederzeit wiederholbar, um den Ursprungszustand herzustellen).',
        },
        {
          art: 'liste',
          punkte: [
            'Abgabe 1: Screenshot des erfolgreichen Verbindungsaufbaus (Status „Erfolgreich" über den Test-Button).',
            'Abgabe 2: Screenshot mit allen Tabellen der Verbindung und Beispieldaten, z. B. SELECT * FROM pruefen;',
          ],
        },
        {
          art: 'text',
          text: '(Reine Einrichtungsaufgabe – keine inhaltlich „lösbare" Aufgabe; entscheidend sind die korrekten Verbindungsdaten und die Reihenfolge schema_rn.sql → daten.sql.)',
        },
      ],
    },
  ],
}
