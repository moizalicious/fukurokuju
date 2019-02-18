from flask import Flask
app = Flask("PCDRS")

@app.route("/")
def hello():
    return "Hello World!"
