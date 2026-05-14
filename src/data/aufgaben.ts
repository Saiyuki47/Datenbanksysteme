import type { AufgabeItem } from '../types'

export const aufgaben: AufgabeItem[] = [
  {
    id: 'a1',
    db: 'pv',
    difficulty: 'easy',
    title: '1. Aus welchen Städten kommen die Kunden?',
    text: 'Gib alle eindeutigen Städte aus, in denen Pine Valley-Kunden registriert sind. Sortiere alphabetisch.',
    sql: `SELECT DISTINCT CUSTOMERCITY
FROM CUSTOMER_T
ORDER BY CUSTOMERCITY;`,
  },
  {
    id: 'a2',
    db: 'pv',
    difficulty: 'easy',
    title: '2. Welche Kunden sind aus Clearwater, Florida?',
    text: 'Filtere auf Stadt "Clearwater" und Bundesstaat "FL".',
    sql: `SELECT CUSTOMERNAME
FROM CUSTOMER_T
WHERE CUSTOMERCITY = 'Clearwater'
  AND CUSTOMERSTATE = 'FL';`,
  },
  {
    id: 'a3',
    db: 'pv',
    difficulty: 'med',
    title: '3. Was ist die Postleitzahl des Kunden von Bestellung 1008?',
    text: 'Verknüpfe ORDER_T mit CUSTOMER_T über die gemeinsame CUSTOMERID.',
    sql: `SELECT C.CUSTOMERPOSTALCODE
FROM CUSTOMER_T C
  JOIN ORDER_T O ON C.CUSTOMERID = O.CUSTOMERID
WHERE O.ORDERID = 1008;`,
  },
  {
    id: 'a4',
    db: 'pv',
    difficulty: 'med',
    title: '4. Welche Produktbeschreibungen stehen auf Bestellung 1008?',
    text: 'Verknüpfe ORDERLINE_T mit PRODUCT_T über die PRODUCTID.',
    sql: `SELECT P.PRODUCTDESCRIPTION
FROM PRODUCT_T P
  JOIN ORDERLINE_T OL ON P.PRODUCTID = OL.PRODUCTID
WHERE OL.ORDERID = 1008;`,
  },
  {
    id: 'a5',
    db: 'nw',
    difficulty: 'easy',
    title: '5. Welche Produkte sind nicht mehr erhältlich?',
    text: 'Filtere PRODUCTS nach DISCONTINUED = 1 und sortiere alphabetisch.',
    sql: `SELECT PRODUCTNAME
FROM PRODUCTS
WHERE DISCONTINUED = 1
ORDER BY PRODUCTNAME;`,
  },
  {
    id: 'a6',
    db: 'nw',
    difficulty: 'med',
    title: '6. Welche Mitarbeiter haben einen Vorgesetzten (REPORTSTO)?',
    text: 'Gib Vor- und Nachname aller Mitarbeiter aus, die REPORTSTO gesetzt haben. Sortiere nach REPORTSTO.',
    sql: `SELECT FIRSTNAME, LASTNAME, REPORTSTO
FROM EMPLOYEES
WHERE REPORTSTO IS NOT NULL
ORDER BY REPORTSTO, LASTNAME;`,
  },
  {
    id: 'a7',
    db: 'nw',
    difficulty: 'med',
    title: '7. Gesamtumsatz pro Bestellung aus ORDERDETAILS',
    text: 'Berechne UNITPRICE × QUANTITY × (1 – DISCOUNT) pro ORDERID, runde auf 2 Dezimalstellen, sortiere absteigend.',
    sql: `SELECT ORDERID,
       ROUND(SUM(UNITPRICE * QUANTITY * (1 - DISCOUNT)), 2) AS GESAMTBETRAG
FROM ORDERDETAILS
GROUP BY ORDERID
ORDER BY GESAMTBETRAG DESC;`,
  },
  {
    id: 'a8',
    db: 'nw',
    difficulty: 'hard',
    title: '8. Welcher Mitarbeiter hat die meisten Bestellungen bearbeitet?',
    text: 'Verknüpfe EMPLOYEES und ORDERS, zähle Bestellungen pro Mitarbeiter, gib nur den mit der höchsten Anzahl aus.',
    sql: `SELECT E.FIRSTNAME, E.LASTNAME,
       COUNT(O.ORDERID) AS ANZAHL_BESTELLUNGEN
FROM EMPLOYEES E
  JOIN ORDERS O ON E.EMPLOYEEID = O.EMPLOYEEID
GROUP BY E.EMPLOYEEID, E.FIRSTNAME, E.LASTNAME
ORDER BY ANZAHL_BESTELLUNGEN DESC
FETCH FIRST 1 ROWS ONLY; -- Oracle-Syntax`,
  },
]
