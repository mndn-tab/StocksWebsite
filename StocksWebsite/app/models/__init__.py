# This is Repository pattern, this separates database logic from business objects
#A stock object for use in the application views and repository.

from datetime import datetime

class Stock():
    INDEX = "SPX" # class(or static) variable

    def __init__(self, symbol, price, date):
        self.symbol = symbol
        self.price = price
        self.date = date

    @classmethod
    def get_index(cls):
        return cls.INDEX

    @staticmethod
    def validate_date(date):
        return datetime.strptime(date, "%Y-%m-%d")
