export interface TableData {
  name: string
  columns: string[]
  rows: (string | number | null)[][]
}

const CUSTOMER_T: TableData = {
  name: 'CUSTOMER_T',
  columns: ['CUSTOMERID', 'CUSTOMERNAME', 'CUSTOMERADDRESS', 'CUSTOMERCITY', 'CUSTOMERSTATE', 'CUSTOMERPOSTALCODE'],
  rows: [
    [1, 'Contemporary Casuals', '1355 S Hines Blvd', 'Gainesville', 'FL', '32601-2871'],
    [2, 'Value Furniture', '15145 S.W. 17th St.', 'Plano', 'TX', '75094-7743'],
    [3, 'Home Furnishings', '1900 Allard Ave.', 'Albany', 'NY', '12209-1125'],
    [4, 'Eastern Furniture', '1925 Beltline Rd.', 'Carteret', 'NJ', '07008-3188'],
    [5, 'Impressions', '5585 Westcott Ct.', 'Sacramento', 'CA', '94206-4056'],
    [6, 'Furniture Gallery', '325 Flatiron Dr.', 'Boulder', 'CO', '80514-4432'],
    [7, 'Period Furniture', '394 Rainbow Dr.', 'Seattle', 'WA', '97954-5589'],
    [8, 'California Classics', '816 Peach Rd.', 'Santa Clara', 'CA', '96915-7754'],
    [9, 'M and H Casual Furniture', '3709 First Street', 'Clearwater', 'FL', '34620-2314'],
    [10, 'Seminole Interiors', '2400 Rocky Point Dr.', 'Seminole', 'FL', '34646-4423'],
    [11, 'American Euro Lifestyles', '2424 Missouri Ave N.', 'Prospect Park', 'NJ', '07508-5621'],
    [12, 'Battle Creek Furniture', '345 Capitol Ave. SW', 'Battle Creek', 'MI', '49015-3401'],
    [13, 'Heritage Furnishings', '66789 College Ave.', 'Carlisle', 'PA', '17013-8834'],
    [14, 'Kaneohe Homes', '112 Kiowai St.', 'Kaneohe', 'HI', '96744-2537'],
    [15, 'Mountain Scenes', '4132 Main Street', 'Ogden', 'UT', '84403-4432'],
  ],
}

const ORDER_T: TableData = {
  name: 'ORDER_T',
  columns: ['ORDERID', 'CUSTOMERID', 'ORDERDATE'],
  rows: [
    [1001, 1, '21-OCT-18'],
    [1002, 8, '21-OCT-18'],
    [1003, 15, '22-OCT-18'],
    [1004, 5, '22-OCT-18'],
    [1005, 3, '24-OCT-18'],
    [1006, 2, '24-OCT-18'],
    [1007, 11, '27-OCT-18'],
    [1008, 12, '30-OCT-18'],
    [1009, 4, '05-NOV-18'],
    [1010, 1, '05-NOV-18'],
  ],
}

const ORDERLINE_T: TableData = {
  name: 'ORDERLINE_T',
  columns: ['ORDERID', 'PRODUCTID', 'ORDEREDQUANTITY'],
  rows: [
    [1001, 1, 2],
    [1001, 2, 2],
    [1001, 4, 1],
    [1002, 3, 5],
    [1003, 3, 3],
    [1004, 6, 2],
    [1004, 8, 2],
    [1005, 4, 3],
    [1006, 4, 1],
    [1006, 5, 2],
    [1006, 7, 2],
    [1007, 1, 3],
    [1007, 2, 2],
    [1008, 3, 3],
    [1008, 8, 3],
    [1009, 4, 2],
    [1009, 7, 3],
    [1010, 8, 10],
  ],
}

const PRODUCT_T: TableData = {
  name: 'PRODUCT_T',
  columns: ['PRODUCTID', 'PRODUCTLINEID', 'PRODUCTDESCRIPTION', 'PRODUCTFINISH', 'PRODUCTSTANDARDPRICE'],
  rows: [
    [1, 1, 'End Table', 'Cherry', 175],
    [2, 2, 'Coffee Table', 'Natural Ash', 200],
    [3, 2, 'Computer Desk', 'Natural Ash', 375],
    [4, 3, 'Entertainment Center', 'Natural Maple', 650],
    [5, 1, 'Writers Desk', 'Cherry', 325],
    [6, 2, '8-Drawer Desk', 'White Ash', 750],
    [7, 2, 'Dining Table', 'Natural Ash', 800],
    [8, 3, 'Computer Desk', 'Walnut', 250],
  ],
}

const PRODUCTLINE_T: TableData = {
  name: 'PRODUCTLINE_T',
  columns: ['PRODUCTLINEID', 'PRODUCTLINENAME'],
  rows: [
    [1, 'Cherry Tree'],
    [2, 'Scandinavia'],
    [3, 'Country Look'],
  ],
}

const EMPLOYEE_T: TableData = {
  name: 'EMPLOYEE_T',
  columns: ['EMPLOYEEID', 'EMPLOYEENAME', 'EMPLOYEECITY', 'EMPLOYEESTATE'],
  rows: [
    ['123-44-345', 'Jim Jason', null, 'TN'],
    ['454-56-768', 'Robert Lewis', 'Nashville', 'TN'],
  ],
}

const SALESPERSON_T: TableData = {
  name: 'SALESPERSON_T',
  columns: ['SALESPERSONID', 'SALESPERSONNAME', 'SALESPERSONPHONE', 'TERRITORYID'],
  rows: [
    [1, 'Doug Henny', '8134445555', 1],
    [2, 'Robert Lewis', '8139264006', 2],
    [3, 'William Strong', '5053821212', 3],
    [4, 'Julie Dawson', '4355346677', 4],
    [5, 'Jacob Winslow', '2238973498', 5],
  ],
}

const TERRITORY_T: TableData = {
  name: 'TERRITORY_T',
  columns: ['TERRITORYID', 'TERRITORYNAME'],
  rows: [
    [1, 'SouthEast'],
    [2, 'SouthWest'],
    [3, 'NorthEast'],
    [4, 'NorthWest'],
    [5, 'Central'],
  ],
}

export const pvTables: Record<string, TableData> = {
  CUSTOMER_T,
  ORDER_T,
  ORDERLINE_T,
  PRODUCT_T,
  PRODUCTLINE_T,
  EMPLOYEE_T,
  SALESPERSON_T,
  TERRITORY_T,
}
