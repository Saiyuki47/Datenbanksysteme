import type { FlashCard } from 'lernseiten-ui'
import { aufgaben } from './aufgaben'
import { quizFragen } from './quiz'
import { themen } from './themen'

// Karteikarten werden aus vorhandenen Inhalten abgeleitet: SQL-Aufgaben
// (Frage → Musterlösung), Quizfragen (Frage → Erklärung) und Themen
// (Titel → Kurzbeschreibung). So bleibt nur eine Quelle zu pflegen.
// Bei Bedarf hier eigene Karten ergänzen.

// Aufgaben-IDs, die NICHT als Karteikarte erscheinen sollen: reine
// Pine-Valley-Schema-Trivia (z. B. „Postleitzahl des Kunden von Bestellung
// 1008", „Produkte auf Bestellung 1008"). Solche Aufgaben sind nur mit
// Auswendiglernen des konkreten Pine-Valley-Schemas lösbar und nicht
// klausurrelevant. Im Übungsblatt-Tab (Blatt 0) bleiben sie samt Schema-
// und Ergebnistabellen erhalten.
const ausgeschlosseneAufgaben = new Set(['a3', 'a4'])

// Für sonst gute Query-Aufgaben, deren Aufgabentext die betroffenen Tabellen/
// Spalten nicht nennt, wird hier ein eigenständiger Karten-Vordertext ergänzt –
// so ist die Karte ohne Kenntnis des Pine-Valley-Schemas lösbar.
const aufgabenFrontUeberschreibung: Record<string, string> = {
  a1:
    'Tabelle CUSTOMER_T (Spalte CUSTOMERCITY): Gib alle eindeutigen Städte, ' +
    'in denen Kunden registriert sind, alphabetisch sortiert aus.',
  a2:
    'Tabelle CUSTOMER_T (Spalten CUSTOMERNAME, CUSTOMERCITY, CUSTOMERSTATE): ' +
    'Gib die Namen der Kunden aus, die in der Stadt "Clearwater" und im ' +
    'Bundesstaat "FL" sind.',
}

export const karteikarten: FlashCard[] = [
  ...aufgaben.reduce<FlashCard[]>((karten, a) => {
    if (ausgeschlosseneAufgaben.has(a.id)) return karten
    karten.push({
      id: `a-${a.id}`,
      front: aufgabenFrontUeberschreibung[a.id] ?? a.text,
      back: a.sql,
      tag: a.title,
    })
    return karten
  }, []),
  ...quizFragen.map((q, i) => ({
    id: `q-${i}`,
    front: q.frage,
    back: q.erklaerung,
    tag: q.quelle,
  })),
  ...themen.map(t => ({
    id: `t-${t.id}`,
    front: t.title,
    back: t.subtitle,
    tag: 'Thema',
  })),
]
