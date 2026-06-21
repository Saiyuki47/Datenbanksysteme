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
function linkify(text: string) {
  const parts = text.split(/(https?:\/\/[^\s)]+)/g)
  return parts.map((part, i) =>
    /^https?:\/\//.test(part) ? (
      <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="dz-inline-link">
        {part}
      </a>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  )
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
    return <iframe className="dz-pdf" src={url} title={file.name} />
  }
  if (file.typ === 'image') {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer">
        <img className="dz-img" src={url} alt={file.name} loading="lazy" />
      </a>
    )
  }
  if (file.typ === 'video') {
    return <video className="dz-video" src={url} controls preload="metadata" />
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
    return <iframe className="dz-office" src={officeViewerSrc(file.path)} title={file.name} allowFullScreen />
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

  const weeks = [...byWeek.values()].sort((a, b) => a.num - b.num)
  return { weeks, leftovers }
}

type WeekKey = number | 'extra'

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
const TAB_KEYS: WeekKey[] = [...WEEKS.map(w => w.num), ...(LEFTOVERS.length ? ['extra' as const] : [])]
const DEFAULT_KEY: WeekKey = WEEKS.find(w => w.num === 1)?.num ?? TAB_KEYS[0] ?? 'extra'

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
  const [active, setActive] = useState<WeekKey>(DEFAULT_KEY)
  const q = query.trim().toLowerCase()

  const results = q ? ALL_FILES.filter(r => r.file.name.toLowerCase().includes(q)) : []
  const activeWeek = typeof active === 'number' ? WEEKS.find(w => w.num === active) : undefined

  return (
    <div>
      <div className="section-header">
        <h2>Dateien</h2>
        <p>Alle Moodle-Materialien nach Wochen. Wähle oben eine Woche – darunter siehst du direkt die Vorlesung und die Übung.</p>
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
      ) : (
        <>
          {/* One sub-tab per week, plus the leftover category */}
          <div className="filter-row dz-subtabs">
            {WEEKS.map(w => (
              <button
                type="button"
                key={w.num}
                className={`filter-btn${active === w.num ? ' on' : ''}`}
                onClick={() => setActive(w.num)}
              >
                Woche {w.num}
              </button>
            ))}
            {LEFTOVERS.length > 0 && (
              <button
                type="button"
                className={`filter-btn${active === 'extra' ? ' on' : ''}`}
                onClick={() => setActive('extra')}
              >
                Weitere Materialien
              </button>
            )}
          </div>

          {/* Selected week: lecture first, then exercise – shown directly, no folders to open */}
          <div className="dz-week-content">
            {activeWeek?.vorlesung && (
              <FolderSection folder={activeWeek.vorlesung} displayName={cap(activeWeek.vorlesung.name)} variant="vorlesung" />
            )}
            {activeWeek?.uebung && (
              <FolderSection folder={activeWeek.uebung} displayName={cap(activeWeek.uebung.name)} variant="uebung" />
            )}
            {active === 'extra' &&
              LEFTOVERS.map(folder => (
                <FolderSection key={folder.path} folder={folder} displayName={folder.name} variant="extra" />
              ))}
          </div>
        </>
      )}
    </div>
  )
}
