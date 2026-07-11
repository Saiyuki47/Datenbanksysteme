import { useEffect } from 'react'

// Hilfsmittel-Tab: der DB-Spickzettel – ein druckbares Klausur-/Lern-Hilfsblatt
// über den GESAMTEN Kurs, gegliedert in drei thematische A4-Seiten:
//   1) ER-Modell & Relationales Schema
//   2) Relationale Algebra & SQL
//   3) Integrität & Entwurfstheorie
// Inhalte sind aus den Referenz-Karten/Vorlesungen verdichtet – gleiche
// Begriffe und Formulierungen wie im Kurs. Das Uni-Schema hat weiter seinen Tab.

interface Zeile {
  /** Optionales Label vor der Formel/dem Code. */
  l?: string
  /** Inhalt in Monospace (Algebra/SQL/Regel). */
  f: string
}

interface Box {
  t: string
  r?: Zeile[]
  /** Optionale kleine Tabelle (z. B. Funktionalität ↔ (min,max)). */
  tab?: { head: string[]; rows: string[][] }
}

interface Seite {
  titel: string
  boxen: Box[]
}

const SEITEN: Seite[] = [
  // ───────────────────────── Seite 1 ─────────────────────────
  {
    titel: 'ER-Modell & Relationales Schema',
    boxen: [
      {
        t: 'ER-Bausteine',
        r: [
          { l: 'Entitytyp', f: 'Rechteck – „Ding" der realen Welt (Student, Vorlesung)' },
          { l: 'Attribut', f: 'Ellipse; Schlüsselattribut wird unterstrichen' },
          { l: 'Beziehung', f: 'Raute – verbindet Entitytypen, darf eigene Attribute haben' },
          { l: 'schwach', f: 'Doppelrahmen: nur mit identifizierender Beziehung eindeutig' },
          { l: 'IS-A', f: 'Generalisierung: Untertypen erben die Attribute des Obertyps' },
        ],
      },
      {
        t: 'Funktionalität ↔ (min,max)',
        tab: {
          head: ['F1 : F2', '(min1,max1)', '(min2,max2)'],
          rows: [
            ['1 : 1', '(0,1)', '(0,1)'],
            ['1 : N', '(0,*)', '(0,1)'],
            ['N : 1', '(0,1)', '(0,*)'],
            ['N : M', '(0,*)', '(0,*)'],
          ],
        },
        r: [
          { f: '(min,max) = wie oft ein konkreter Wert in der Beziehungstabelle min./max. vorkommen darf' },
          { f: 'Achtung: Funktionalität und (min,max) stehen ÜBER KREUZ' },
        ],
      },
      {
        t: 'Ternäre Beziehung / partielle Funktion',
        r: [
          { f: 'Funktionalität legt partielle Funktionen über PAARE fest: Prof × Student → Thema' },
          { f: 'Daumenregel: Entität mit „1" steht rechts vom Pfeil, die übrigen links' },
          { f: 'n > 2: Funktionalität und (min,max) sind unvergleichbar (drücken verschiedenes aus)' },
        ],
      },
      {
        t: 'ER → Relationales Schema',
        r: [
          { l: 'Entitytyp', f: '→ eigene Relation (Attribute + Schlüssel)' },
          { l: 'Beziehung', f: '→ Relation aus den Schlüsseln der Beteiligten + Beziehungsattributen' },
        ],
      },
      {
        t: 'Verfeinern (Zusammenfassen)',
        r: [
          { f: 'Relationen mit GLEICHEM Schlüssel zusammenfassen – aber nur diese!' },
          { f: '1:N / N:1 / 1:1: Beziehungsrelation in die Entity-Relation aufnehmen' },
          { f: 'N:M: behält immer eine eigene Relation' },
        ],
      },
      {
        t: 'Schlüsselarten',
        r: [
          { l: 'Super', f: 'bestimmt ein Tupel eindeutig ({X}⁺ = alle Attribute)' },
          { l: 'Kandidat', f: 'minimaler Superschlüssel – kein Attribut weglassbar' },
          { l: 'Primär', f: 'gewählter Kandidatenschlüssel; nie NULL' },
          { l: 'Fremd', f: 'verweist auf den PK einer (anderen) Relation' },
        ],
      },
    ],
  },
  // ───────────────────────── Seite 2 ─────────────────────────
  {
    titel: 'Relationale Algebra & SQL',
    boxen: [
      {
        t: 'Relationale Algebra',
        r: [
          { l: 'σ[Bed](R)', f: 'Selektion: wählt ZEILEN (waagerecht)' },
          { l: 'π[Attr](R)', f: 'Projektion: wählt SPALTEN, entfernt Duplikate' },
          { l: 'ρ', f: 'Umbenennung von Relation/Attributen' },
          { l: '×', f: 'Kreuzprodukt: alle Kombinationen (m·n)' },
          { l: 'R ⋈ S', f: 'Join = π(σ[R.b=S.b](R × S)); natürlich = über gleichnamige Spalten' },
          { l: '∪ ∩ −', f: 'Vereinigung · Schnitt · Differenz (gleiches Schema)' },
          { f: 'Basis: σ, π, ρ, ×, ∪, − — der Rest ist ableitbar' },
        ],
      },
      {
        t: 'SQL-Grundgerüst',
        r: [
          { f: 'SELECT [DISTINCT] … FROM … WHERE … GROUP BY … HAVING … ORDER BY …' },
          { l: 'Auswertung', f: 'FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY' },
          { l: 'Brücke', f: 'WHERE ≙ σ · SELECT ≙ π · FROM mehrerer Tabellen ≙ × / ⋈' },
        ],
      },
      {
        t: 'Zeilen filtern, NULL & Sortieren',
        r: [
          { l: 'NULL', f: 'immer IS NULL / IS NOT NULL – niemals = NULL' },
          { l: 'Logik', f: 'AND bindet stärker als OR → bei Mischung klammern' },
          { l: 'ORDER BY', f: 'spalte [ASC|DESC]; „ORDER BY 1" = nach 1. Spalte' },
          { l: 'DISTINCT', f: 'entfernt doppelte Ergebniszeilen' },
        ],
      },
      {
        t: 'Aggregation & Gruppierung',
        r: [
          { f: 'COUNT · SUM · AVG · MIN · MAX' },
          { l: 'NULL', f: 'COUNT(*) zählt alle Zeilen; COUNT(spalte) ignoriert NULL' },
          { l: 'GROUP BY', f: 'eine Ergebniszeile je Gruppe' },
          { l: 'HAVING', f: 'filtert GRUPPEN (nach Aggregat); WHERE filtert ZEILEN davor' },
        ],
      },
      {
        t: 'Joins',
        r: [
          { f: 'R [INNER] JOIN S ON R.b = S.b – nur Paare mit Partner' },
          { f: 'R NATURAL JOIN S – über alle gleichnamigen Spalten' },
          { f: 'LEFT / RIGHT / FULL OUTER JOIN – behält partnerlose Tupel (NULL-aufgefüllt)' },
        ],
      },
      {
        t: 'Unteranfragen & Mengen',
        r: [
          { f: 'x IN (SELECT …) / x NOT IN (…)' },
          { f: 'EXISTS (SELECT … WHERE außen.k = innen.k) – korreliert' },
          { f: 'x > ALL (…) / x > ANY (…)' },
          { l: 'UNION', f: 'vereinigt + entfernt Duplikate (UNION ALL behält sie)' },
        ],
      },
      {
        t: 'Daten definieren & ändern',
        r: [
          { f: 'CREATE TABLE t (spalte TYP constraints, …);' },
          { f: 'INSERT INTO t (spalten) VALUES (…);' },
          { l: 'UPDATE', f: 'UPDATE t SET spalte = wert WHERE … (ohne WHERE: ALLE!)' },
          { l: 'DELETE', f: 'DELETE FROM t WHERE … (ohne WHERE: leert die Tabelle)' },
        ],
      },
    ],
  },
  // ───────────────────────── Seite 3 ─────────────────────────
  {
    titel: 'Integrität & Entwurfstheorie',
    boxen: [
      {
        t: 'Integritätsbedingungen',
        r: [
          { l: 'primary key', f: '= unique + not null' },
          { l: 'foreign key', f: 'references Ziel(pk) – existierendes Tupel ODER NULL' },
          { l: 'on delete', f: 'default: zurückweisen · cascade: mitlöschen · set null: Verweis kappen' },
          { l: 'check', f: 'statische Bedingung an den Zustand; unique / not null analog' },
        ],
      },
      {
        t: 'Trigger',
        r: [
          { f: 'CREATE TRIGGER n BEFORE UPDATE ON t FOR EACH ROW WHEN (bed) BEGIN … END' },
          { l: ':old / :new', f: 'Zeile VOR / NACH der Änderung (nur BEFORE kann :new ändern)' },
          { l: 'vs. CHECK', f: 'Übergang alt → neu prüfen geht nur mit Trigger, nicht mit CHECK' },
        ],
      },
      {
        t: 'Attributhülle {X}⁺',
        r: [
          { f: '{X}⁺ = alles, was X funktional bestimmt („Was folgt aus X?")' },
          { l: 'Rezept', f: 'Start Hülle = X. Solange FD L → R mit L ⊆ Hülle: R aufnehmen. Bis stabil.' },
          { f: 'Reihenfolge der FD-Anwendung egal – Ergebnis immer gleich' },
        ],
      },
      {
        t: 'Kanonische Überdeckung Fc',
        r: [
          { f: '1) rechte Seiten vereinzeln: X → AB ⇒ X → A, X → B' },
          { f: '2) Linksreduktion: linkes Attribut streichen, wenn rechte Seite in {Rest}⁺ liegt' },
          { f: '3) überflüssige FD streichen (A auch ohne sie in {X}⁺); gleiche linke Seiten vereinen' },
        ],
      },
      {
        t: 'Normalformen',
        r: [
          { l: '1NF', f: 'alle Attributwerte atomar (keine Mengen/Wiederholungen)' },
          { l: '2NF', f: '1NF + kein Nichtschlüsselattr. hängt von einem TEIL eines Schlüssels ab' },
          { l: '3NF', f: '2NF + keine transitive Abh.: X → A gut, wenn X Superschlüssel ODER A Schlüsselattr.' },
          { l: 'BCNF', f: 'linke Seite JEDER nichttrivialen FD ist Superschlüssel (strenger als 3NF)' },
        ],
      },
      {
        t: 'BCNF-Zerlegung',
        r: [
          { f: '1) finde bad FD: X mit X⁺ ≠ X und X⁺ ≠ [alle Attribute]' },
          { f: '2) keine → R ist BCNF, fertig' },
          { f: '3) zerlege R1 = X⁺, R2 = X ∪ Rest; rekursiv weiter' },
          { f: 'immer verlustlos, kann aber Abhängigkeitstreue verlieren' },
        ],
      },
      {
        t: '3NF-Synthese',
        r: [
          { f: '1) kanonische Überdeckung Fc bilden' },
          { f: '2) je FD X → Y eine Relation mit X ∪ Y' },
          { f: '3) enthält keine Relation einen Kandidatenschlüssel → eine mit Schlüssel ergänzen' },
          { f: '4) Relationen, die in einer anderen enthalten sind, streichen' },
          { f: 'Ergebnis: 3NF, verlustlos UND abhängigkeitstreu' },
        ],
      },
      {
        t: 'Verlustlosigkeit & Abhängigkeitstreue',
        r: [
          { l: 'verlustfrei', f: '(R1,R2) verlustfrei, wenn R1 ∩ R2 → R1 oder R1 ∩ R2 → R2' },
          { l: 'treu', f: 'jede FD auf einem Teil allein prüfbar (keine FD „zerreißt")' },
        ],
      },
    ],
  },
]

function SpickzettelSeite({ seite, nr }: { seite: Seite; nr: number }) {
  return (
    <div className="hm-page">
      <p className="hm-page-head">
        <span className="hm-page-nr">Seite {nr}</span>
        <span className="hm-page-titel">{seite.titel}</span>
      </p>
      <div className="hm-grid">
        {seite.boxen.map(box => (
          <section key={box.t} className="hm-box">
            <h4>{box.t}</h4>
            {box.tab && (
              <table className="hm-tab">
                <thead>
                  <tr>{box.tab.head.map(h => <th key={h}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {box.tab.rows.map(row => (
                    <tr key={row.join('|')}>{row.map((c, i) => <td key={i}>{c}</td>)}</tr>
                  ))}
                </tbody>
              </table>
            )}
            {box.r && (
              <ul>
                {box.r.map(zeile => (
                  <li key={zeile.f}>
                    {zeile.l && <span className="hm-label">{zeile.l}</span>}
                    <span className="hm-code">{zeile.f}</span>
                  </li>
                ))}
              </ul>
            )}
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
          Der DB-Spickzettel: das Wichtigste aus dem gesamten Kurs auf drei A4-Seiten – ER-Modell &
          Schema, Algebra & SQL, Integrität & Entwurfstheorie. Zum Lernen und zum Ausdrucken.
        </p>
      </div>
      <div className="filter-row no-print" style={{ marginBottom: '0.9rem' }}>
        <button type="button" className="filter-btn" onClick={() => window.print()}>
          🖨️ Drucken (3 Seiten A4)
        </button>
      </div>
      {SEITEN.map((seite, i) => (
        <SpickzettelSeite key={seite.titel} seite={seite} nr={i + 1} />
      ))}
    </div>
  )
}

// Theme-fähige Styles + Druck-Regeln.
const HM_CSS = `
.hm-page{margin:0 0 1.4rem}
.hm-page-head{display:flex;align-items:center;gap:.6rem;margin:0 0 .6rem;padding-bottom:.35rem;border-bottom:2px solid var(--blue)}
.hm-page-nr{font-size:.72rem;font-weight:700;letter-spacing:.03em;text-transform:uppercase;background:var(--blue);color:#fff;padding:.12rem .5rem;border-radius:5px}
.hm-page-titel{font-size:.95rem;font-weight:700;color:var(--text)}
.hm-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:.7rem;align-items:start}
.hm-box{border:1px solid var(--border2);border-left:3px solid var(--blue);border-radius:8px;background:var(--bg2);padding:.5rem .7rem;break-inside:avoid}
.hm-box h4{margin:0 0 .4rem;font-size:.85rem;font-weight:700;color:var(--blue)}
.hm-box ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:.28rem}
.hm-box li{font-size:.78rem;line-height:1.45;color:var(--text)}
.hm-label{display:inline-block;margin-right:.4rem;padding:0 .35rem;border-radius:4px;background:var(--bg3);color:var(--text2);font-size:.72rem;font-weight:600;white-space:nowrap}
.hm-code{font-family:var(--font-mono,monospace);font-size:.76rem;color:var(--text)}
.hm-tab{width:100%;border-collapse:collapse;margin:0 0 .4rem;font-size:.75rem}
.hm-tab th,.hm-tab td{border:1px solid var(--border2);padding:.15rem .4rem;text-align:center;color:var(--text)}
.hm-tab th{background:var(--bg3);font-weight:700}
.hm-tab td{font-family:var(--font-mono,monospace)}
@media print{
  header,.tabs,.no-print,.site-nav{display:none!important}
  body{background:#fff}
  .container{max-width:none;padding:0}
  .hm-page{break-after:page;margin:0}
  .hm-page:last-child{break-after:auto}
  .hm-page-head{border-bottom:1.5pt solid #000}
  .hm-page-nr{background:#000;color:#fff}
  .hm-page-titel{color:#000}
  .hm-grid{grid-template-columns:1fr 1fr;gap:8pt}
  .hm-box{border:.75pt solid #999;border-left:2pt solid #000;background:#fff;padding:4pt 6pt}
  .hm-box h4{color:#000;font-size:9.5pt;margin-bottom:2pt}
  .hm-box li{color:#000;font-size:7.8pt;line-height:1.32}
  .hm-label{background:#eee;color:#333}
  .hm-code{color:#000}
  .hm-tab{font-size:7.5pt}
  .hm-tab th,.hm-tab td{border:.5pt solid #999;color:#000}
  .hm-tab th{background:#eee}
}
`

function injectCss() {
  if (typeof document === 'undefined') return
  const existing = document.getElementById('db-hilfsmittel-css')
  if (existing) existing.remove()
  const s = document.createElement('style')
  s.id = 'db-hilfsmittel-css'
  s.textContent = HM_CSS
  document.head.appendChild(s)
}
