import type { TableData } from './pvTables'

const VORLESUNGEN: TableData = {
  name: 'VORLESUNGEN',
  columns: ['VORLNR', 'TITEL', 'SWS', 'GELESENVON'],
  rows: [
    [5001, 'Grundzuege', 4, 2137],
    [5043, 'Erkenntnistheorie', 3, 2126],
    [5049, 'Maeeutik', 2, 2125],
    [4052, 'Logik', 4, 2125],
    [5052, 'Wissenschaftstheorie', 3, 2126],
    [5216, 'Bioethik', 2, 2126],
    [5259, 'Der Wiener Kreis', 2, 2133],
    [5022, 'Glaube und Wissen', 2, 2134],
    [4630, 'Die 3 Kritiken', 4, 2137],
  ],
}

const PROFESSOREN: TableData = {
  name: 'PROFESSOREN',
  columns: ['PERSNR', 'NAME', 'RANG', 'RAUM'],
  rows: [
    [1111, 'NeuProf', 'C4', 1111],
    [2125, 'Sokrates', 'C4', 226],
    [2126, 'Russel', 'C4', 232],
    [2127, 'Kopernikus', 'C3', 310],
    [2133, 'Popper', 'C3', 52],
    [2134, 'Augustinus', 'C3', 309],
    [2136, 'Curie', 'C4', 36],
    [2137, 'Kant', 'C4', 7],
  ],
}

const STUDENTEN: TableData = {
  name: 'STUDENTEN',
  columns: ['MATRNR', 'NAME', 'SEMESTER'],
  rows: [
    [24002, 'Xenokrates', 18],
    [25403, 'Jonas', 12],
    [26120, 'Fichte', 10],
    [26830, 'Aristoxenos', 8],
    [27550, 'Schopenhauer', 6],
    [28106, 'Carnap', 3],
    [29120, 'Theophrastos', 2],
    [29555, 'Feuerbach', 2],
  ],
}

const HOEREN: TableData = {
  name: 'HOEREN',
  columns: ['MATRNR', 'VORLNR'],
  rows: [
    [25403, 5022],
    [26120, 5001],
    [27550, 4052],
    [27550, 5001],
    [28106, 5052],
    [28106, 5216],
    [28106, 5259],
    [29120, 5001],
    [29120, 5049],
    [29555, 5001],
    [29555, 5022],
  ],
}

const VORAUSSETZEN: TableData = {
  name: 'VORAUSSETZEN',
  columns: ['VORGAENGER', 'NACHFOLGER'],
  rows: [
    [5001, 5043],
    [5001, 5049],
    [5043, 5052],
    [5052, 5259],
  ],
}

export const uniTables: Record<string, TableData> = {
  VORLESUNGEN,
  PROFESSOREN,
  STUDENTEN,
  HOEREN,
  VORAUSSETZEN,
}
