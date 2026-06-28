from flask import Flask 
# session is a dict (key,value), session saves the values until the browser is closed (NOTE: session values are saved even after killing the flask server!!!)
from flask import session
from flask_session import Session

from .repository.factorydb import create_repository
from .settings import REPOSITORY_NAME, REPOSITORY_SETTINGS

def create_app():

    app = Flask(__name__)

    # add session
    app.config["SESSION_PERMANENT"] = False
    app.config["SESSION_TYPE"] = "filesystem" #save it on server side
    Session(app) # initialize app with session

    # add database
    repository = create_repository(REPOSITORY_NAME, REPOSITORY_SETTINGS)

    # add routes
    from .routes import register_routes
    register_routes(app, repository)

    return app

