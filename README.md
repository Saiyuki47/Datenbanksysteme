# Datenbanksysteme

Interaktive Lernseite für **Datenbanksysteme 1** (SQL, relationale Algebra,
Entwurfstheorie/Normalisierung) mit den Beispieldatenbanken *Pine Valley* und
*Northwind*. Baut auf der geteilten UI-Engine [`lernseiten-ui`](https://github.com/Saiyuki47/lernseiten-ui).

## Tabs

| Tab | Beschreibung |
|-----|-------------|
| **Übungsblätter** | Aufgaben & Musterlösungen nach Blatt geordnet, mit Tipps, SQL-Highlighting und Ergebnistabellen |
| **Referenz** | Erklärte Themen-Karten (relationale Algebra, Integrität, funktionale Abhängigkeiten, Normalformen …) |
| **Schema** | Tabellen-/Beziehungsübersicht der verwendeten Datenbanken |
| **Moodle** | Datei-Browser über die Kursmaterialien mit Inline-Vorschau |
| **Quiz** | Quiz mit Fortschritt, Feedback und Auswertung |
| **Karteikarten** | Spaced-Repetition-Lernkarten (SM-2) |

## Quickstart

```bash
npm install
npm run dev
```

## Struktur

Alle Inhalte liegen in `src/data/` (Übungsblätter, Quiz, Themen, Schema,
Karteikarten, Suchindex). Der Moodle-Datei-Baum `src/data/dateien.ts` wird von
`scripts/generate-dateien.mjs` aus `public/dateien_aus_moodle/` erzeugt
(automatisch über `predev`/`prebuild`) und ist daher **nicht** eingecheckt.

## Tech Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) als Build-Tool
- [`lernseiten-ui`](https://github.com/Saiyuki47/lernseiten-ui) für Quiz, Referenz, Suche, Karteikarten & Basis-CSS
