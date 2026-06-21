// Auto-generates src/data/dateien.ts from the files under public/dateien_aus_moodle.
// Run via `node scripts/generate-dateien.mjs` (wired into predev/prebuild).
//
// Why a generator: the Moodle export has ~80 files across nested folders with
// umlauts, spaces and special characters. Hand-maintaining a manifest would be
// error-prone and would go stale whenever files are added. This walks the real
// folder, embeds the (small) text/readme/link contents, and records everything
// else as a path the browser can open from /public.

import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { join, relative, extname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const projectRoot = join(__dirname, '..')
const publicRoot = join(projectRoot, 'public')
const rootDirName = 'dateien_aus_moodle'
const rootDir = join(publicRoot, rootDirName)
const outFile = join(projectRoot, 'src', 'data', 'dateien.ts')

// Inline text contents up to this size; larger text files (e.g. the 700 KB
// Northwind INSERT script) are opened from /public instead of bloating the bundle.
const INLINE_TEXT_LIMIT = 60_000

// GitHub rejects files > 100 MB and GitHub Pages can't serve them, so leave any
// such file out of the manifest entirely (it is .gitignored too). The course
// provides an external streaming link for these instead.
const MAX_DEPLOY_BYTES = 100 * 1024 * 1024

const TEXT_EXT = new Set(['.txt', '.sql'])
const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp'])
const VIDEO_EXT = new Set(['.mp4', '.m4v', '.webm', '.mov', '.ogg'])
const OFFICE_EXT = new Set(['.pptx', '.ppt', '.docx', '.doc', '.rtf', '.xlsx', '.xls', '.odt', '.odp'])
const ARCHIVE_EXT = new Set(['.zip', '.rar', '.7z', '.tar', '.gz'])

function typeFor(ext) {
  if (ext === '.pdf') return 'pdf'
  if (IMAGE_EXT.has(ext)) return 'image'
  if (VIDEO_EXT.has(ext)) return 'video'
  if (OFFICE_EXT.has(ext)) return 'office'
  if (ARCHIVE_EXT.has(ext)) return 'archive'
  if (TEXT_EXT.has(ext)) return 'text'
  return 'other'
}

function humanSize(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

// German, number-aware comparison so "vorlesung 2" < "vorlesung 10".
function natCmp(a, b) {
  return a.localeCompare(b, 'de', { numeric: true, sensitivity: 'base' })
}

// Weight top-level entries into the natural course order:
// Kursübersicht, Vorlesungen, nummerierte Übungen, Altklausuren, Escape Game, Rest.
function topWeight(name) {
  if (/kursübersicht/i.test(name)) return 0
  if (/^vorlesung/i.test(name)) return 1
  if (/^übung\s+\d/i.test(name)) return 2
  if (/^übung\s*-\s*altklausuren/i.test(name)) return 3
  if (/^übung\s+escape/i.test(name)) return 4
  return 5
}

const URL_RE = /https?:\/\/[^\s)]+/i

function buildFile(absPath) {
  const name = basename(absPath)
  const ext = extname(absPath).toLowerCase()
  const rel = relative(publicRoot, absPath).split('\\').join('/')
  const size = statSync(absPath).size
  let typ = typeFor(ext)

  const file = {
    name,
    path: rel,
    typ,
    ext: ext.replace('.', ''),
    sizeLabel: humanSize(size),
  }

  if (/^readme/i.test(name)) file.isReadme = true

  if (typ === 'text') {
    if (size <= INLINE_TEXT_LIMIT) {
      const content = readFileSync(absPath, 'utf8').replace(/\r\n/g, '\n').trim()
      // A .txt that is essentially just a URL becomes a clickable link entry.
      const looksLikeLink =
        ext === '.txt' && !file.isReadme && /^https?:\/\/\S+$/.test(content)
      if (looksLikeLink) {
        file.typ = 'link'
        file.url = content
      } else {
        file.text = content
        const m = content.match(URL_RE)
        if (m) file.url = m[0]
      }
    } else {
      // Too big to inline – open the raw file from /public instead.
      file.tooLarge = true
    }
  }

  return file
}

function buildFolder(absPath, isRoot) {
  const entries = readdirSync(absPath, { withFileTypes: true })
  const folders = []
  const files = []

  for (const e of entries) {
    if (e.name.startsWith('.')) continue
    const child = join(absPath, e.name)
    if (e.isDirectory()) {
      folders.push(buildFolder(child, false))
    } else if (e.isFile()) {
      if (statSync(child).size > MAX_DEPLOY_BYTES) {
        console.log(`generate-dateien: skipping (> 100 MB) ${relative(publicRoot, child)}`)
        continue
      }
      files.push(buildFile(child))
    }
  }

  if (isRoot) {
    folders.sort((a, b) => topWeight(a.name) - topWeight(b.name) || natCmp(a.name, b.name))
    files.sort((a, b) => topWeight(a.name) - topWeight(b.name) || natCmp(a.name, b.name))
  } else {
    folders.sort((a, b) => natCmp(a.name, b.name))
    files.sort((a, b) => natCmp(a.name, b.name))
  }

  return { name: basename(absPath), path: relative(publicRoot, absPath).split('\\').join('/'), folders, files }
}

const tree = buildFolder(rootDir, true)

const header = `// AUTO-GENERATED by scripts/generate-dateien.mjs – do not edit by hand.
// Run \`node scripts/generate-dateien.mjs\` (or just \`npm run dev\`) to regenerate.

export type DateiTyp = 'pdf' | 'image' | 'video' | 'office' | 'archive' | 'text' | 'link' | 'other'

export interface DateiFile {
  name: string
  path: string
  typ: DateiTyp
  ext: string
  sizeLabel: string
  text?: string
  url?: string
  isReadme?: boolean
  tooLarge?: boolean
}

export interface DateiFolder {
  name: string
  path: string
  folders: DateiFolder[]
  files: DateiFile[]
}

export const dateienTree: DateiFolder = `

writeFileSync(outFile, header + JSON.stringify(tree, null, 2) + '\n', 'utf8')

const counts = (() => {
  let f = 0
  const walk = (node) => {
    f += node.files.length
    node.folders.forEach(walk)
  }
  walk(tree)
  return f
})()

console.log(`generate-dateien: wrote ${relative(projectRoot, outFile)} (${counts} Dateien)`)
