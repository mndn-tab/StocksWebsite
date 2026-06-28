import pyodbc
from app.models import Stock

#Creates a stock object from sql
def _stock_from_db(cursor):
    stocks = []
    for row in cursor.fetchall():
        stocks.append(Stock(row.symbol, row.price, row.date))  
    return stocks
 
## get a cursor object and return a list of dictionaries
#def _cursor_to_dict(cursor):
#    # Fetch column names
#    columns = [column[0] for column in cursor.description]
#    # Convert rows to a list of dictionaries
#    stocks = []
#    for row in cursor.fetchall():
#        stocks.append(dict(zip(columns, row)))  
#    return stocks

class Repository():
    #Initializes the repository with the specified settings dict.
    def __init__(self, settings):

        self.name = "sqldb"
        self.driver = settings["SQL_DRIVER"]
        self.server = settings["SQL_SERVER"]
        self.database = settings["SQL_DATABASE"]
        self.trusted_connection = "yes"

        # Establish connection with a connection string
        self.conn = pyodbc.connect(
            "Driver="+self.driver+";" 
            "Server="+self.server+";"
            "Database="+self.database+";"
            "Trusted_Connection="+self.trusted_connection+";"  # Uses Windows Login Credentials
        )
        self.cursor = self.conn.cursor()


    def close(self):
        self.cursor.close()
        self.conn.close()


    # get all the symbols in the database
    def get_symbols(self):
        query = """ select * from dbo.stock """
        rows = self.cursor.execute(query)
        symbols = []
        for row in rows:
            if row.symbol not in symbols:
                symbols.append(row.symbol)
        return symbols

    # get all the stocks in the database
    def get_stocks(self):
        # Query the database
        query = """ select * from dbo.stock """
        self.cursor.execute(query)
        return _stock_from_db(self.cursor)

    # get a specific stock
    def get_stock(self, symbol, start_date, end_date):
        # Query the database
        # Use ? instead of {symbol} to avoid SQL injection
        query = """ select * from dbo.stock where symbol = ? and date BETWEEN ? AND ?"""
        self.cursor.execute(query, symbol, start_date, end_date)
        return _stock_from_db(self.cursor)

    #TODO: complete this function to insert into database
    def add_stock (self, symbol, price, date):

        query = """ INSERT INTO stock (symbol, price, date)
                    VALUES (symbol, price, date )"""

    #TODO: complete this function to delete from database
    def delete_stock (self, symbol):
        pass