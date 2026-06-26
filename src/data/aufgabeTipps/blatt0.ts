import type { TippSection } from '../../types'

export const blatt0Tipps: Record<string, TippSection[]> = {
  // ── Blatt 0 (SQL auf Pine Valley Furniture) ────────────────────────────────

  'blatt0-1': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Eine SQL-Abfrage holt Daten aus einer Tabelle. Grundform: SELECT <Spalte> FROM <Tabelle> – das gibt die Werte einer Spalte aus. Die Kundendaten stehen in der Tabelle CUSTOMER_T, die Stadt in der Spalte CUSTOMERCITY. Weil mehrere Kunden in derselben Stadt wohnen können, würde dieselbe Stadt mehrfach erscheinen. Das Schlüsselwort DISTINCT entfernt solche Dubletten, sodass jede Stadt nur einmal vorkommt.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Wo stehen die Kunden? → Tabelle CUSTOMER_T\n2. Welche Spalte ist die Stadt? → CUSTOMERCITY\n3. Jede Stadt nur einmal? → DISTINCT direkt hinter SELECT setzen\n4. Fertige Abfrage: SELECT DISTINCT CUSTOMERCITY FROM CUSTOMER_T',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'SELECT DISTINCT CUSTOMERCITY\nFROM CUSTOMER_T;\n\n-- Ergebnis: eine Zeile je Stadt (z. B. Boulder, Clearwater, Seattle, …).\n-- Eine Sortierung ist nicht verlangt → Reihenfolge beliebig.',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Ohne DISTINCT erscheint jede Stadt so oft, wie es dort Kunden gibt. Tabellen- und Spaltennamen müssen exakt stimmen (CUSTOMER_T, CUSTOMERCITY). Ein Semikolon am Ende schließt die Anweisung ab.',
    },
  ],

  'blatt0-2': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Mit einer WHERE-Klausel filtert man Zeilen: SELECT … FROM … WHERE <Bedingung> behält nur die Zeilen, bei denen die Bedingung wahr ist. Text wird in einfache Anführungszeichen gesetzt (\'Clearwater\'). Mehrere Bedingungen verknüpft AND – dann müssen ALLE erfüllt sein. Hier: Stadt = Clearwater UND Bundesstaat = Florida. Florida wird als Kürzel \'FL\' gespeichert.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Tabelle: CUSTOMER_T\n2. Ausgabe: CUSTOMERNAME (der Kundenname)\n3. Bedingungen: CUSTOMERCITY = \'Clearwater\' AND CUSTOMERSTATE = \'FL\'\n4. Es passt genau ein Kunde.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: "SELECT CUSTOMERNAME\nFROM CUSTOMER_T\nWHERE CUSTOMERCITY = 'Clearwater'\n  AND CUSTOMERSTATE = 'FL';\n\n-- Ergebnis: M and H Casual Furniture",
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Text-Werte ohne Anführungszeichen führen zu Fehlern. Groß-/Kleinschreibung beachten: \'clearwater\' ≠ \'Clearwater\'. AND (beide Bedingungen) nicht mit OR (eine reicht) verwechseln.',
    },
  ],

  'blatt0-3': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Die gesuchte Information ist auf zwei Tabellen verteilt: Die Bestellung 1008 steht in ORDER_T, die Postleitzahl aber in CUSTOMER_T. Beide Tabellen haben eine gemeinsame Spalte, die Kundennummer (ORDER_T.CUSTOMERID zeigt auf CUSTOMER_T.CUSTOMERID). Ein JOIN verbindet Zeilen beider Tabellen, die in dieser Spalte denselben Wert haben. Danach grenzt WHERE auf die Bestellung 1008 ein.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Bestellung 1008 → ORDER_T (enthält CUSTOMERID)\n2. Postleitzahl → CUSTOMER_T.CUSTOMERPOSTALCODE\n3. ORDER_T und CUSTOMER_T über CUSTOMERID verbinden (JOIN … ON)\n4. WHERE ORDERID = 1008 → es bleibt genau ein Kunde.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'SELECT c.CUSTOMERPOSTALCODE\nFROM ORDER_T o\n  JOIN CUSTOMER_T c ON o.CUSTOMERID = c.CUSTOMERID\nWHERE o.ORDERID = 1008;\n\n-- Ergebnis: 49015-3401\n-- (o und c sind Kurznamen/Aliase für die Tabellen)',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Die ON-Bedingung beim JOIN nicht vergessen – ohne sie entsteht das kartesische Produkt (jede Bestellung mit jedem Kunden). Bei gleichnamigen Spalten (CUSTOMERID gibt es in beiden Tabellen) das Tabellen-Kürzel davorsetzen.',
    },
  ],

  'blatt0-4': [
    {
      icon: '💡',
      titel: 'Konzept verstehen',
      inhalt: 'Welche Produkte zu einer Bestellung gehören, steht in ORDERLINE_T (eine Zeile je Bestellposition, mit ORDERID und PRODUCTID). Der Produkt-TEXT (die Beschreibung) steht aber in PRODUCT_T. Über die gemeinsame Spalte PRODUCTID verbindet ein JOIN beide Tabellen. Mit WHERE ORDERID = 1008 bleiben nur die Positionen dieser einen Bestellung.',
    },
    {
      icon: '🔍',
      titel: 'Vorgehensweise',
      inhalt: '1. Positionen der Bestellung 1008 → ORDERLINE_T WHERE ORDERID = 1008\n2. Beschreibung dazuholen → JOIN PRODUCT_T über PRODUCTID\n3. Ausgabe: PRODUCTDESCRIPTION\n4. Es ergeben sich zwei Positionen mit demselben Produkt.',
    },
    {
      icon: '📝',
      titel: 'Syntax / Beispiel',
      inhalt: 'SELECT p.PRODUCTDESCRIPTION\nFROM ORDERLINE_T ol\n  JOIN PRODUCT_T p ON ol.PRODUCTID = p.PRODUCTID\nWHERE ol.ORDERID = 1008;\n\n-- Ergebnis: Computer Desk, Computer Desk (zwei Zeilen)',
    },
    {
      icon: '⚠️',
      titel: 'Häufige Fehler',
      inhalt: 'Ohne WHERE-Filter bekommt man die Produkte ALLER Bestellungen. Dass „Computer Desk" doppelt erscheint, ist korrekt – es sind zwei Bestellpositionen. Jeder JOIN braucht seine eigene ON-Bedingung.',
    },
  ],
}
