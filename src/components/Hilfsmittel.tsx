import { useEffect } from 'react'

// Hilfsmittel-Tab: der DB-Spickzettel – ein zweiseitiges, druckbares
// Klausur-Hilfsblatt (analog zu den Hilfsmittel-Tabs der anderen Lernseiten).
// Seite 1 bündelt die Entwurfstheorie-Rezepte (Attributhülle, Schlüssel,
// Normalformen, BCNF-Zerlegung, Verlustlosigkeit), Seite 2 die SQL- und
// Algebra-Kurzreferenz. Inhalte sind aus den Referenz-Karten (data/themen/*)
// verdichtet – gleiche Begriffe und Formulierungen wie in der Vorlesung.
// Das Schema selbst hat weiterhin seinen eigenen Tab.

interface Zeile {
  /** Optionales Label vor der Formel/dem Code. */
  l?: string
  /** Inhalt in Monospace (Algebra/SQL/Regel). */
  f: string
}

interface Box {
  t: string
  r: Zeile[]
}

const SEITE1: Box[] = [
  {
    t: 'Attributhülle {X}⁺',
    r: [
      { f: '{X}⁺ = alle Attribute, die X funktional bestimmt („Was folgt aus X?")' },
      { l: 'Rezept', f: 'Start: Hülle = X. Solange eine FD L → R existiert mit L ⊆ Hülle: R aufnehmen. Wiederholen, bis nichts mehr dazukommt.' },
      { f: 'Reihenfolge der FD-Anwendung ist egal – das Ergebnis ist immer dasselbe.' },
    ],
  },
  {
    t: 'Schlüssel',
    r: [
      { l: 'Superschlüssel', f: '{X}⁺ = alle Attribute von R („bestimmt alles")' },
      { l: 'Kandidatenschlüssel', f: 'minimaler Superschlüssel – kein Attribut weglassbar' },
      { l: 'Primärschlüssel', f: 'der als Hauptschlüssel gewählte Kandidat' },
      { l: 'Suche', f: 'Attribute, die in KEINER rechten FD-Seite vorkommen, müssen in jeden Schlüssel. Von klein nach groß {X}⁺ testen.' },
    ],
  },
  {
    t: 'Kanonische Überdeckung',
    r: [
      { f: '1) Rechte Seiten vereinzeln: X → AB  ⇒  X → A, X → B' },
      { f: '2) Linksreduktion: Attribut aus linker Seite streichen, wenn die rechte Seite schon in der Hülle der verkleinerten linken liegt' },
      { f: '3) Überflüssige FDs streichen: X → A weg, wenn A auch ohne sie in {X}⁺ liegt; danach gleiche linke Seiten vereinigen' },
    ],
  },
  {
    t: 'Good FD vs. Bad FD',
    r: [
      { l: 'good', f: 'X → A mit X = (Super-)Schlüssel – X bestimmt ohnehin die ganze Zeile' },
      { l: 'bad', f: 'X kein Superschlüssel → Redundanz + Update-/Insert-/Delete-Anomalien' },
    ],
  },
  {
    t: 'Normalformen',
    r: [
      { l: '1NF', f: 'alle Attributwerte atomar (keine Mengen/Wiederholungsgruppen)' },
      { l: '2NF', f: '1NF + kein Nichtschlüsselattribut hängt partiell von einem TEIL eines Schlüssels ab' },
      { l: '3NF', f: '2NF + keine transitive Abhängigkeit: X → A gut, wenn X Superschlüssel ODER A Teil eines Kandidatenschlüssels' },
      { l: 'BCNF', f: 'linke Seite JEDER nichttrivialen FD ist Superschlüssel (ohne die 3NF-Ausnahme – strenger als 3NF)' },
    ],
  },
  {
    t: 'BCNFDecomp(R)',
    r: [
      { f: '1) Finde X mit X⁺ ≠ X und X⁺ ≠ [alle Attribute]  (= bad FD)' },
      { f: '2) Keine solche Menge → R ist in BCNF, fertig' },
      { f: '3) Zerlege: R1 = X⁺ und R2 = X ∪ Rest (Rest = Attribute außerhalb X⁺); rekursiv auf R1, R2' },
      { f: 'X steht in beiden Teilen → Zerlegung verlustlos. BCNF kann aber die Abhängigkeitstreue verlieren.' },
    ],
  },
  {
    t: 'Verlustlosigkeit & Abhängigkeitstreue',
    r: [
      { l: 'verlustfrei', f: 'Zerlegung (R1, R2) ist verlustfrei, wenn R1 ∩ R2 → R1 oder R1 ∩ R2 → R2 gilt' },
      { l: 'abhängigkeitstreu', f: 'jede FD ist auf einem der Teile allein prüfbar (keine FD „zerreißt")' },
    ],
  },
]

const SEITE2: Box[] = [
  {
    t: 'Relationale Algebra – Operatoren',
    r: [
      { l: 'σ[Bed](R)', f: 'Selektion: wählt ZEILEN (waagerecht)' },
      { l: 'π[Attr](R)', f: 'Projektion: wählt SPALTEN, entfernt Duplikate (senkrecht)' },
      { l: 'ρ', f: 'Umbenennung von Relation/Attributen' },
      { l: '×', f: 'Kreuzprodukt: alle Kombinationen' },
      { l: 'R ⋈ S', f: 'Join = π(σ[R.B=S.B](R × S)) – gemeinsame Attribute einmal' },
      { l: '∪ ∩ −', f: 'Vereinigung · Durchschnitt · Differenz (gleiches Schema)' },
      { f: 'Volle Algebra: σ, π, ρ, ×, ∪, − — der Rest ist daraus ableitbar. Bei Unsicherheit: ⋈ = σ(R × S).' },
    ],
  },
  {
    t: 'SQL-Grundgerüst',
    r: [
      { f: 'SELECT [DISTINCT] … FROM … WHERE … GROUP BY … HAVING … ORDER BY …' },
      { l: 'Auswertung', f: 'FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY' },
      { l: 'Brücke', f: 'WHERE ≙ σ, SELECT ≙ π, FROM mehrerer Tabellen ≙ × / ⋈' },
      { f: 'HAVING filtert GRUPPEN (nach Aggregation), WHERE filtert ZEILEN (davor)' },
    ],
  },
  {
    t: 'Joins in SQL',
    r: [
      { f: 'R INNER JOIN S ON R.b = S.b   – nur Paare mit Partner' },
      { f: 'R NATURAL JOIN S   – über alle gleichnamigen Spalten' },
      { f: 'LEFT / RIGHT / FULL OUTER JOIN – behält partnerlose Tupel (NULL-aufgefüllt)' },
    ],
  },
  {
    t: 'Unteranfragen',
    r: [
      { f: 'x IN (SELECT …) / x NOT IN (…)' },
      { f: 'EXISTS (SELECT … WHERE außen.k = innen.k)  – korreliert' },
      { f: 'x > ALL (…) / x > ANY (…)  – Vergleich mit allen/einem' },
    ],
  },
  {
    t: 'Integritätsbedingungen',
    r: [
      { l: 'primary key', f: '= unique + not null' },
      { l: 'foreign key', f: 'references Ziel(pk) – verweist auf existierendes Tupel ODER NULL' },
      { l: 'on delete', f: 'ohne Angabe: zurückweisen (no action) · cascade: reicht durch · set null: kappt den Verweis' },
      { l: 'check', f: 'statische Bedingung an den Zustand – prüft, weist notfalls zurück' },
    ],
  },
  {
    t: 'Trigger',
    r: [
      { f: 'CREATE TRIGGER name BEFORE UPDATE ON tabelle FOR EACH ROW WHEN (bedingung) BEGIN … END' },
      { l: ':old / :new', f: 'Zeile VOR / NACH der Änderung – nur BEFORE kann :new noch anpassen' },
      { l: 'vs. CHECK', f: 'CHECK prüft einen Zustand; ein Vorher/Nachher-Vergleich (Übergang alt → neu) geht nur mit Trigger' },
    ],
  },
]

function SpickzettelSeite({ boxen, nr }: { boxen: Box[]; nr: number }) {
  return (
    <div className="hm-page">
      <p className="hm-page-head">DB-Spickzettel · Seite {nr}</p>
      <div className="hm-grid">
        {boxen.map(box => (
          <section key={box.t} className="hm-box">
            <h4>{box.t}</h4>
            <ul>
              {box.r.map(zeile => (
                <li key={zeile.f}>
                  {zeile.l && <span className="hm-label">{zeile.l}</span>}
                  <span className="hm-code">{zeile.f}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}

export default function Hilfsmittel() {
  useEffect(() => injectCss(), [])
  return (
    <div>
      <div className="section-header no-print">
        <h2>Hilfsmittel</h2>
        <p>
          Der DB-Spickzettel: Entwurfstheorie-Rezepte und SQL-/Algebra-Kurzreferenz auf zwei
          A4-Seiten – verdichtet aus den Referenz-Karten. Das Uni-Schema steht im Schema-Tab.
        </p>
      </div>
      <div className="filter-row no-print" style={{ marginBottom: '0.9rem' }}>
        <button type="button" className="filter-btn" onClick={() => window.print()}>
          🖨️ Drucken (2 Seiten A4)
        </button>
      </div>
      <SpickzettelSeite boxen={SEITE1} nr={1} />
      <SpickzettelSeite boxen={SEITE2} nr={2} />
    </div>
  )
}

// Theme-fähige Styles + Druck-Regeln (DB hatte bisher kein @media print).
const HM_CSS = `
.hm-page{margin:0 0 1.2rem}
.hm-page-head{margin:0 0 .5rem;font-size:.8rem;font-weight:600;color:var(--text2)}
.hm-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:.7rem}
.hm-box{border:1px solid var(--border2);border-radius:8px;background:var(--bg2);padding:.55rem .7rem;break-inside:avoid}
.hm-box h4{margin:0 0 .35rem;font-size:.85rem;color:var(--text)}
.hm-box ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:.3rem}
.hm-box li{font-size:.78rem;line-height:1.45;color:var(--text)}
.hm-label{display:inline-block;margin-right:.4rem;padding:0 .35rem;border-radius:4px;background:var(--bg3);color:var(--text2);font-size:.72rem;font-weight:600}
.hm-code{font-family:var(--font-mono,monospace);font-size:.76rem;color:var(--text)}
@media print{
  header,.tabs,.no-print,.site-nav{display:none!important}
  body{background:#fff}
  .container{max-width:none;padding:0}
  .hm-page{break-after:page;margin:0}
  .hm-page:last-child{break-after:auto}
  .hm-grid{grid-template-columns:1fr 1fr;gap:8pt}
  .hm-box{border:.75pt solid #999;background:#fff;padding:5pt 7pt}
  .hm-box h4{color:#000;font-size:9.5pt;margin-bottom:2pt}
  .hm-box li{color:#000;font-size:8pt;line-height:1.35}
  .hm-label{background:#eee;color:#333}
  .hm-code{color:#000}
  .hm-page-head{color:#333}
}
`

function injectCss() {
  if (typeof document === 'undefined') return
  if (document.getElementById('db-hilfsmittel-css')) return
  const s = document.createElement('style')
  s.id = 'db-hilfsmittel-css'
  s.textContent = HM_CSS
  document.head.appendChild(s)
}
