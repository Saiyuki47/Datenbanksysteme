import type { TippSection } from '../../types'
import { blatt0Tipps } from './blatt0'
import { blatt1Tipps } from './blatt1'
import { blatt2Tipps } from './blatt2'
import { blatt3Tipps } from './blatt3'
import { blatt4Tipps } from './blatt4'
import { blatt5Tipps } from './blatt5'
import { blatt6Tipps } from './blatt6'
import { blatt7Tipps } from './blatt7'
import { blatt8Tipps } from './blatt8'
import { blatt9Tipps } from './blatt9'
import { blatt10Tipps } from './blatt10'
import { blatt11Tipps } from './blatt11'
import { probeklausur1Tipps } from './probeklausur1'
import { probeklausur2Tipps } from './probeklausur2'

// Ziel jeder Tipp-Gruppe: Die vier Abschnitte (Konzept, Vorgehensweise,
// Syntax/Beispiel, Häufige Fehler) sollen zusammen ausreichen, um die Aufgabe
// OHNE Vorwissen vollständig zu lösen. Deshalb werden die relevanten Daten
// direkt im Tipp wiederholt und jeder Schritt mit konkreten Zahlen vorgerechnet.
//
// Aufgeteilt pro Blatt / Probeklausur (siehe Nachbardateien); hier zusammengeführt.
export const aufgabeTipps: Record<string, TippSection[]> = {
  ...blatt0Tipps,
  ...blatt1Tipps,
  ...blatt2Tipps,
  ...blatt3Tipps,
  ...blatt4Tipps,
  ...blatt5Tipps,
  ...blatt6Tipps,
  ...blatt7Tipps,
  ...blatt8Tipps,
  ...blatt9Tipps,
  ...blatt10Tipps,
  ...blatt11Tipps,
  ...probeklausur1Tipps,
  ...probeklausur2Tipps,
}
