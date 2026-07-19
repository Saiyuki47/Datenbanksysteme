import { Fragment, useState } from 'react'
import { dateienTree } from '../data/dateien'
import type { DateiFile, DateiFolder } from '../data/dateien'
import { highlightSQL } from '../utils/sqlHighlight'

// Build the public URL for a file. encodeURI (not encodeURIComponent) escapes
// spaces and umlauts while leaving path-safe characters like "," "(" ")" raw –
// Vite's dev static server only matches files when those are left unencoded.
function fileUrl(path: string): string {
  return import.meta.env.BASE_URL + encodeURI(path)
}

// Office formats the Microsoft Online viewer can render in an <iframe>.
const OFFICE_VIEWER_EXT = new Set(['pptx', 'ppt', 'docx', 'doc', 'xlsx', 'xls'])

// True when served from a host the Microsoft viewer cannot reach (localhost / LAN).
// The viewer fetches the file itself, so it only works on a public URL (GitHub Pages).
function isLocalHost(): boolean {
  const h = window.location.hostname
  return (
    h === 'localhost' ||
    h === '127.0.0.1' ||
    h === '0.0.0.0' ||
    h === '[::1]' ||
    h.endsWith('.local') ||
    /^(10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(h)
  )
}

// Embed URL for the official Microsoft Office Online viewer. `src` must be the
// absolute, public URL of the file, encoded as a query parameter.
function officeViewerSrc(path: string): string {
  const absolute = new URL(fileUrl(path), window.location.href).href
  return `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(absolute)}`
}

const TYPE_LABEL: Record<DateiFile['typ'], string> = {
  pdf: 'PDF',
  image: 'Bild',
  video: 'Video',
  office: 'Office',
  archive: 'Archiv',
  text: 'Text',
  link: 'Link',
  other: 'Datei',
}

// Turn raw text into React nodes, making any http(s) URLs clickable.
// Each part is keyed by its character offset in the source text – a stable,
// unique identifier (parts never overlap), not the array index.
function linkify(text: string) {
  const parts = text.split(/(https?:\/\/[^\s)]+)/g)
  let offset = 0
  return parts.map(part => {
    const key = `${offset}:${part}`
    offset += part.length
    return /^https?:\/\//.test(part) ? (
      <a key={key} href={part} target="_blank" rel="noopener noreferrer" className="dz-inline-link">
        {part}
      </a>
    ) : (
      <Fragment key={key}>{part}</Fragment>
    )
  })
}

function countFiles(folder: DateiFolder): number {
  return folder.files.length + folder.folders.reduce((n, f) => n + countFiles(f), 0)
}

function ReadmeNote({ file }: { file: DateiFile }) {
  return (
    <div className="dz-readme">
      <div className="dz-readme-head">
        <span className="dz-readme-icon">ℹ️</span>
        <span className="dz-readme-name">{file.name}</span>
      </div>
      {file.text && <div className="dz-readme-body">{linkify(file.text)}</div>}
    </div>
  )
}

function FilePreview({ file }: { file: DateiFile }) {
  const url = fileUrl(file.path)

  if (file.typ === 'pdf') {
    // Our own, same-origin PDF. Locked down: no scripts, so the embedded document
    // cannot run code; allow-same-origin lets the browser PDF viewer load the file,
    // allow-popups/-downloads keep links and the download button working.
    return (
      <iframe
        className="dz-pdf"
        src={url}
        title={file.name}
        sandbox="allow-same-origin allow-popups allow-downloads"
      />
    )
  }
  if (file.typ === 'image') {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer">
        <img className="dz-img" src={url} alt={file.name} loading="lazy" />
      </a>
    )
  }
  if (file.typ === 'video') {
    // eslint-disable-next-line react-doctor/media-has-caption -- hochgeladene Vorlesungsvideos ohne verfügbare Untertiteldatei
    return <video className="dz-video" src={url} controls preload="metadata" aria-label={file.name} />
  }
  if (file.typ === 'text' && file.text != null) {
    const isSql = file.ext === 'sql'
    return (
      <pre className={`dz-text${isSql ? ' dz-text--sql' : ''}`}>
        {isSql ? highlightSQL(file.text) : linkify(file.text)}
      </pre>
    )
  }
  if (file.typ === 'office' && OFFICE_VIEWER_EXT.has(file.ext)) {
    if (isLocalHost()) {
      return (
        <div className="dz-office-note">
          Die Office-Vorschau funktioniert nur auf der veröffentlichten Seite (z.&nbsp;B. GitHub
          Pages), nicht lokal – Microsofts Viewer muss die Datei über eine öffentliche URL
          erreichen. Lade die Datei herunter oder öffne die veröffentlichte Seite.
        </div>
      )
    }
    // Microsoft's official Office Online viewer (trusted, cross-origin). It is a
    // full web app, so it needs allow-scripts; and because it is cross-origin it
    // needs allow-same-origin to use its OWN officeapps.live.com origin (cookies /
    // session) – it can never reach our origin. We grant only the minimal extra
    // tokens (popups/forms) the viewer uses.
    return (
      <iframe
        className="dz-office"
        src={officeViewerSrc(file.path)}
        title={file.name}
        // eslint-disable-next-line react-doctor/iframe-missing-sandbox -- MS Office Online Viewer: braucht allow-scripts + allow-same-origin für seine EIGENE Origin (officeapps.live.com), erreicht unsere Origin nie
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        allowFullScreen
      />
    )
  }
  return null
}

function FileRow({ file }: { file: DateiFile }) {
  const [open, setOpen] = useState(false)
  const url = fileUrl(file.path)

  // Files we can render inline get a toggle; everything else gets an open/download link.
  const officeViewable = file.typ === 'office' && OFFICE_VIEWER_EXT.has(file.ext)
  const previewable =
    file.typ === 'pdf' ||
    file.typ === 'image' ||
    file.typ === 'video' ||
    (file.typ === 'text' && file.text != null) ||
    officeViewable

  if (file.typ === 'link' && file.url) {
    return (
      <div className="dz-file dz-file--link">
        <span className="dz-badge dz-badge--link">Link</span>
        <span className="dz-file-name">{file.name}</span>
        <a href={file.url} target="_blank" rel="noopener noreferrer" className="dz-action">
          {file.url} ↗
        </a>
      </div>
    )
  }

  return (
    <div className="dz-file">
      <div className="dz-file-head">
        <span className={`dz-badge dz-badge--${file.typ}`}>{file.ext.toUpperCase() || TYPE_LABEL[file.typ]}</span>
        {previewable ? (
          <button type="button" className="dz-file-toggle" onClick={() => setOpen(o => !o)}>
            <span className="dz-arrow">{open ? '▼' : '▶'}</span>
            <span className="dz-file-name">{file.name}</span>
          </button>
        ) : (
          <span className="dz-file-name dz-file-name--static">{file.name}</span>
        )}
        <span className="dz-size">{file.sizeLabel}</span>
        <a href={url} target="_blank" rel="noopener noreferrer" className="dz-action" download={file.typ === 'office' || file.typ === 'archive' ? file.name : undefined}>
          {file.typ === 'office' || file.typ === 'archive' ? 'Herunterladen ↓' : 'Öffnen ↗'}
        </a>
      </div>
      {previewable && open && <FilePreview file={file} />}
    </div>
  )
}

// Renders a folder's contents inline – no accordion, nothing to expand. First any
// readmes (as notes), then the folder's own files, then nested subfolders (each with
// its own sub-heading). Recursive so deep structures (Altklausuren) flatten cleanly.
function FolderContent({ folder }: { folder: DateiFolder }) {
  const readmes = folder.files.filter(f => f.isReadme)
  const files = folder.files.filter(f => !f.isReadme)

  return (
    <div className="dz-content">
      {readmes.map(r => <ReadmeNote key={r.path} file={r} />)}
      {files.map(f => <FileRow key={f.path} file={f} />)}
      {folder.folders.map(sub => (
        <div className="dz-subfolder" key={sub.path}>
          <h4 className="dz-subfolder-title">
            <span className="dz-folder-icon">📁</span>
            {sub.name}
            <span className="dz-folder-count">{countFiles(sub)}</span>
          </h4>
          <FolderContent folder={sub} />
        </div>
      ))}
    </div>
  )
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

// Rohen Ordnernamen lesbar machen (Bindestriche/Unterstriche → Leerzeichen).
const prettify = (s: string) => cap(s.replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim())

interface Week {
  num: number
  vorlesung?: DateiFolder
  uebung?: DateiFolder
}

// Group the top-level folders into weeks by their number ("vorlesung 1" + "übung 1"
// → Woche 1). Folders without a number (Altklausuren, Escape Game) become leftovers.
function groupIntoWeeks(folders: DateiFolder[]): { weeks: Week[]; leftovers: DateiFolder[] } {
  const byWeek = new Map<number, Week>()
  const leftovers: DateiFolder[] = []

  for (const folder of folders) {
    const m = folder.name.match(/^(vorlesung|übung)\s+(\d+)/i)
    if (!m) {
      leftovers.push(folder)
      continue
    }
    const num = parseInt(m[2], 10)
    const week = byWeek.get(num) ?? { num }
    if (/^vorlesung/i.test(folder.name)) week.vorlesung = folder
    else week.uebung = folder
    byWeek.set(num, week)
  }

  const weeks = Array.from(byWeek.values()).sort((a, b) => a.num - b.num)
  return { weeks, leftovers }
}

// Kachel-Design (Option D): eine Karte pro Woche, dazu je eine für die
// „Weiteren Materialien". `open` merkt sich, welche Karte gerade geöffnet ist.
type OpenKey = { kind: 'week'; num: number } | { kind: 'leftover'; path: string }

type LeafCat = 'material' | 'uebung' | 'loesung' | 'klausur' | 'sonstiges'

const CARD_STYLE: Record<LeafCat, { color: string; dim: string; emoji: string; tag: string }> = {
  material:  { color: 'var(--blue)',  dim: 'var(--blue-dim)',  emoji: '📘', tag: 'Material' },
  uebung:    { color: 'var(--green)', dim: 'var(--green-dim)', emoji: '✏️', tag: 'Übung' },
  loesung:   { color: 'var(--amber)', dim: 'var(--amber-dim)', emoji: '✅', tag: 'Lösung' },
  klausur:   { color: 'var(--red)',   dim: 'var(--red-dim)',   emoji: '🎓', tag: 'Klausur' },
  sonstiges: { color: 'var(--text2)', dim: 'var(--bg3)',       emoji: '📁', tag: 'Sonstiges' },
}

// Rät den Kategorie-Typ eines „Weiteren Materialien"-Ordners aus seinem Namen.
function leafCat(name: string): LeafCat {
  const n = name.toLowerCase()
  if (/klausur|pr[üu]fung|exam|probeklausur/.test(n)) return 'klausur'
  if (/l[öo]sung|lsg/.test(n)) return 'loesung'
  if (/[üu]bung|aufgabe|escape|training|blatt/.test(n)) return 'uebung'
  if (/orga|readme|verschieden|share|sonstig/.test(n)) return 'sonstiges'
  return 'material'
}

function CategoryCard({ emoji, color, dim, name, tag, meta, onOpen }: { emoji: string; color: string; dim: string; name: string; tag: string; meta: string; onOpen: () => void }) {
  return (
    <button type="button" className="dz-card" onClick={onOpen}>
      <span className="dz-card-icon" style={{ color, background: dim }} aria-hidden="true">{emoji}</span>
      <span className="dz-card-name">{name}</span>
      <span className="dz-card-tag" style={{ color, background: dim }}>{tag}</span>
      <span className="dz-card-meta">{meta}</span>
    </button>
  )
}

interface FileHit {
  file: DateiFile
  trail: string[]
}

// Flatten every file in the tree with the trail of folder names leading to it –
// used for the cross-week search results.
function collectAllFiles(folder: DateiFolder, trail: string[]): FileHit[] {
  const out: FileHit[] = []
  for (const f of folder.files) {
    if (!f.isReadme) out.push({ file: f, trail })
  }
  for (const sub of folder.folders) {
    out.push(...collectAllFiles(sub, [...trail, cap(sub.name)]))
  }
  return out
}

// The tree is static, so derive everything once at module scope.
const { weeks: WEEKS, leftovers: LEFTOVERS } = groupIntoWeeks(dateienTree.folders)
const PINNED = dateienTree.files.filter(f => !f.isReadme)
const ALL_FILES = collectAllFiles(dateienTree, [])

// Reihenfolge der Extra-Kacheln: die beiden Altklausuren-Ordner zusammen,
// das Escape-Game (Spaß-Extra) zuletzt. Unbekannte hängen sich alphabetisch an.
const LEFTOVER_ORDER = ['Übung - Altklausuren', 'Altklausuren_Datenbanksysteme_share', 'Übung Escape Game']
const rankLeftover = (name: string) => {
  const i = LEFTOVER_ORDER.indexOf(name)
  return i === -1 ? Number.MAX_SAFE_INTEGER : i
}
const SORTED_LEFTOVERS = [...LEFTOVERS].sort(
  (a, b) => rankLeftover(a.name) - rankLeftover(b.name) || a.name.localeCompare(b.name, 'de'),
)

// Datei-/Ordner-Zusammenfassung für die Kachel-Unterzeile.
function weekMeta(w: Week): string {
  const parts: string[] = []
  if (w.vorlesung) parts.push('Vorlesung')
  if (w.uebung) parts.push('Übung')
  const total = (w.vorlesung ? countFiles(w.vorlesung) : 0) + (w.uebung ? countFiles(w.uebung) : 0)
  parts.push(`${total} ${total === 1 ? 'Datei' : 'Dateien'}`)
  return parts.join(' · ')
}

function folderMeta(folder: DateiFolder): string {
  const total = countFiles(folder)
  const subs = folder.folders.length
  const parts = [`${total} ${total === 1 ? 'Datei' : 'Dateien'}`]
  if (subs > 0) parts.push(`${subs} Ordner`)
  return parts.join(' · ')
}

function FolderSection({ folder, displayName, variant }: { folder: DateiFolder; displayName: string; variant: 'vorlesung' | 'uebung' | 'extra' }) {
  return (
    <section className="dz-section">
      <h3 className={`dz-folder-title dz-folder-title--${variant}`}>
        {displayName}
        <span className="dz-folder-count">{countFiles(folder)}</span>
      </h3>
      <FolderContent folder={folder} />
    </section>
  )
}

export default function Dateien() {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState<OpenKey | null>(null)
  const q = query.trim().toLowerCase()

  const results = q ? ALL_FILES.filter(r => r.file.name.toLowerCase().includes(q)) : []
  const openWeek = open?.kind === 'week' ? WEEKS.find(w => w.num === open.num) : undefined
  const openLeftover = open?.kind === 'leftover' ? LEFTOVERS.find(f => f.path === open.path) : undefined

  return (
    <div>
      <div className="section-header">
        <h2>Moodle</h2>
        <p>Alle Moodle-Materialien nach Wochen. Wähle eine Kachel – darunter siehst du direkt die Vorlesung und die Übung.</p>
      </div>

      {/* Kursübersicht stays pinned at the very top, viewable like any file */}
      {PINNED.length > 0 && (
        <div className="dz-pinned">
          {PINNED.map(f => <FileRow key={f.path} file={f} />)}
        </div>
      )}

      <input
        type="search"
        className="dz-search"
        aria-label="Alle Dateien durchsuchen"
        placeholder="Alle Dateien durchsuchen…"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />

      {q ? (
        results.length === 0 ? (
          <p className="dz-empty">Keine Dateien gefunden für „{query}".</p>
        ) : (
          <div className="dz-content">
            {results.map(({ file, trail }) => (
              <div key={file.path}>
                {trail.length > 0 && <p className="dz-crumb">{trail.join(' / ')}</p>}
                <FileRow file={file} />
              </div>
            ))}
          </div>
        )
      ) : openWeek ? (
        <div className="dz-week-content">
          <button type="button" className="dz-back" onClick={() => setOpen(null)}>← Alle Kategorien</button>
          {openWeek.vorlesung && (
            <FolderSection folder={openWeek.vorlesung} displayName={cap(openWeek.vorlesung.name)} variant="vorlesung" />
          )}
          {openWeek.uebung && (
            <FolderSection folder={openWeek.uebung} displayName={cap(openWeek.uebung.name)} variant="uebung" />
          )}
        </div>
      ) : openLeftover ? (
        <div className="dz-week-content">
          <button type="button" className="dz-back" onClick={() => setOpen(null)}>← Alle Kategorien</button>
          <FolderSection folder={openLeftover} displayName={prettify(openLeftover.name)} variant="extra" />
        </div>
      ) : (
        <div>
          <section className="dz-group">
            <div className="dz-group-head">
              <span className="dz-group-title">Nach Wochen</span>
              <span className="dz-group-count">{WEEKS.length}</span>
              <span className="dz-group-rule" />
            </div>
            <div className="dz-cards">
              {WEEKS.map(w => (
                <CategoryCard
                  key={`w${w.num}`}
                  emoji={CARD_STYLE.material.emoji}
                  color={CARD_STYLE.material.color}
                  dim={CARD_STYLE.material.dim}
                  name={`Woche ${w.num}`}
                  tag="Woche"
                  meta={weekMeta(w)}
                  onOpen={() => setOpen({ kind: 'week', num: w.num })}
                />
              ))}
            </div>
          </section>

          {SORTED_LEFTOVERS.length > 0 && (
            <section className="dz-group">
              <div className="dz-group-head">
                <span className="dz-group-title">Weitere Materialien</span>
                <span className="dz-group-count">{SORTED_LEFTOVERS.length}</span>
                <span className="dz-group-rule" />
              </div>
              <div className="dz-cards">
                {SORTED_LEFTOVERS.map(folder => {
                  const s = CARD_STYLE[leafCat(folder.name)]
                  return (
                    <CategoryCard
                      key={folder.path}
                      emoji={s.emoji}
                      color={s.color}
                      dim={s.dim}
                      name={prettify(folder.name)}
                      tag={s.tag}
                      meta={folderMeta(folder)}
                      onOpen={() => setOpen({ kind: 'leftover', path: folder.path })}
                    />
                  )
                })}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  )
}
