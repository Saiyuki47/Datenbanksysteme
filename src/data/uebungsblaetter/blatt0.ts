import type { Uebungsblatt } from '../../types'

export const blatt0: Uebungsblatt = {
  id: 'blatt0',
  nr: '0',
  typ: 'Hausaufgabe',
  db: 'pv',
  beschreibung:
    'Aufgaben der letzten Folie „Additional Sample Queries" des Videos zu Kapitel 1. ' +
    'Geben Sie für die nachfolgenden Fragen das entsprechende SQL-Statement an. ' +
    'Das Ergebnis der SQL-Statements müssen Sie nicht angeben. ' +
    'Die Statements sollten auf der Beispieldatenbank funktionieren, auf die Sie mit der Datenbankverbindung DBMS zugreifen können.',
  tasks: [
    {
      nr: 1,
      text: 'From which cities do Pine Valley\'s customers come?',
      aufgabeId: 'a1',
      relevantTables: ['CUSTOMER_T'],
      queryResult: {
        columns: ['CUSTOMERCITY'],
        rows: [
          ['Albany'],
          ['Battle Creek'],
          ['Boulder'],
          ['Carlisle'],
          ['Carteret'],
          ['Clearwater'],
          ['Gainesville'],
          ['Kaneohe'],
          ['Ogden'],
          ['Plano'],
          ['Prospect Park'],
          ['Sacramento'],
          ['Santa Clara'],
          ['Seattle'],
          ['Seminole'],
        ],
      },
    },
    {
      nr: 2,
      text: 'What are the names of customers who are in Clearwater Florida?',
      aufgabeId: 'a2',
      relevantTables: ['CUSTOMER_T'],
      queryResult: {
        columns: ['CUSTOMERNAME'],
        rows: [['M and H Casual Furniture']],
      },
    },
    {
      nr: 3,
      text: 'What is the postal code of the customer who placed order 1008?',
      aufgabeId: 'a3',
      relevantTables: ['CUSTOMER_T', 'ORDER_T'],
      queryResult: {
        columns: ['CUSTOMERPOSTALCODE'],
        rows: [['49015-3401']],
      },
    },
    {
      nr: 4,
      text: 'What are the descriptions of products on order 1008?',
      aufgabeId: 'a4',
      relevantTables: ['ORDERLINE_T', 'PRODUCT_T'],
      queryResult: {
        columns: ['PRODUCTDESCRIPTION'],
        rows: [['Computer Desk'], ['Computer Desk']],
      },
    },
  ],
}
