from flask import Flask, render_template, request, redirect, jsonify
import pyodbc
# session is a dict (key,value), session saves the values until the browser is closed (NOTE: session values are saved even after killing the flask server!!!)
from flask import session
from flask_session import Session

from app.models import Stock


def register_routes(app, repository):

    @app.route("/")
    def home():
        return render_template("index.html", name = session.get("name")) # retrieve from session

    @app.route("/login", methods = ["GET", "POST"])
    def login():
        if request.method == "POST": # if methods =["POST"], then we need request.form() instead of request.args()
            session["name"] = request.form.get("name") # save to session  
            return redirect("/")
        return render_template("login.html")

    @app.route("/logout")
    def logout():
        session.clear() # clear session
        return redirect("/")


    @app.route("/stocks/<username>") #username is included in URL
    def stocks(username):
        return render_template("stocks.html", stocks = repository.get_stocks(), username = username)

    @app.route("/form")
    def form():
        return render_template("form.html", symbols = repository.get_symbols())

    @app.route("/submit", methods=["POST"])
    def submit():
        # validation should be on backend, not frontend. Because, html can be changed by the hacker
        if request.form.get("symbol") not in repository.get_symbols():
            return render_template("error.html" , message = "symbol"), 400
        else:
            symbol = request.form.get("symbol") #if the method is post, we dont see the args in URL, this is good especially for passwords
        # validate date format
        start_date = request.form.get("start_date")
        end_date = request.form.get("end_date")
        try:
            Stock.validate_date(start_date) and Stock.validate_date(end_date)
        except ValueError:
            return render_template("error.html" , message = "date format (YYYY-MM-DD)"), 400

        return render_template(
            "stock.html",
            symbol=symbol,
            start_date=start_date,
            end_date=end_date,
            stocks = repository.get_stock(symbol, start_date, end_date),
        )

    @app.route("/portfolio", methods = ["POST", "GET"])
    def portfolio():

        if "portfolio" not in session:
            session["portfolio"] = []
        # POST
        if request.method == "POST":
            symbol = request.form.get("symbol") #symbol is passed from hidden html <input>
            if symbol not in session["portfolio"]:
                session["portfolio"].append(symbol)
            return redirect("/portfolio")
        #GET
        return render_template("portfolio.html", portfolio_symbols = session["portfolio"], name = session.get("name"), 
                               index = Stock.get_index())
    
    @app.route("/symbols")
    def get_symbols():
        symbols = repository.get_symbols()
        return jsonify(symbols)