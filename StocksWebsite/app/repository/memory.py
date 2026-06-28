from ..models import Stock

def _load_sample_repository():
    repository = [
        {"symbol": "AMZN", "price": 410, "date": "2024-09-15"},
        {"symbol": "AMZN", "price": 400, "date": "2024-12-15"},
        {"symbol": "GOOG", "price": 200, "date": "2023-01-15"},
        {"symbol": "GOOG", "price": 210, "date": "2023-06-15"},
        {"symbol": "MSFT", "price": 300, "date": "2024-01-15"},
        {"symbol": "MSFT", "price": 310, "date": "2024-06-15"}
    ]
    return repository

class Repository():

    def __init__(self, settings):
        self.name = "memory"
        self.repository = _load_sample_repository() # a list of dictionaries
        self.stocks = []

    def get_symbols(self):
        symbols = []
        for item in self.repository:
            if item["symbol"] not in symbols:
                symbols.append(item["symbol"])
        return symbols

    def get_stocks(self):
        stocks = [] # a list of objects
        stocks = [Stock(item["symbol"], item["price"], item["date"]) for item in self.repository]
        return stocks

    def get_stock(self, symbol, start_date, end_date): 
        # stocks = a list of objects from Repository where symbol == MSFT, etc
        stocks = []
        stocks = [Stock(item["symbol"], item["price"], item["date"]) 
                  for item in self.repository if 
                  (item["symbol"] == symbol and start_date<item['date']<end_date)]
        return stocks



