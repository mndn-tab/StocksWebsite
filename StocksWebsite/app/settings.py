# You can set values of REPOSITORY_NAME and REPOSITORY_SETTINGS in .env file, or set them in code here.

from os import environ

REPOSITORY_NAME = environ.get('REPOSITORY_NAME', 'sqldb')

if REPOSITORY_NAME == 'sqldb':
    REPOSITORY_SETTINGS = {
        'SQL_DRIVER': environ.get('SQL_DRIVER', "{SQL Server}"),
        'SQL_SERVER': environ.get('SQL_SERVER', "THINKM\SQLEXPRESS"),
        'SQL_DATABASE': environ.get('SQL_DATABASE', "Stocks"),
    }
elif REPOSITORY_NAME == 'memory':
    REPOSITORY_SETTINGS = {}
else:
    raise ValueError('Unknown repository.')
    