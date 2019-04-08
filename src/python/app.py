from flask import Flask, jsonify, request
from flask_cors import CORS
from main.keyword_module import extractAnilistKeywords, extractGoodreadsKeywords
import requests

app = Flask(__name__)
CORS(app)

@app.route('/get_anilist_keywords', methods=['POST'])
def getAnilistKeywords():
    anilist_user_data = request.get_json()
    keywords = extractAnilistKeywords(anilist_user_data)
    return jsonify(keywords)

@app.route('/get_goodreads_keywords', methods=['POST'])
def getGoodreadsKeywords():
    goodreads_user_data = request.get_json()
    keywords = extractGoodreadsKeywords(goodreads_user_data)
    return jsonify(keywords)

@app.route('/request_goodreads', methods=['POST'])
def requestGoodreads():
    body = request.get_json()
    response = requests.get(body['route'])
    return jsonify(response.text)

@app.route('/request_ebay', methods=['POST'])
def requestEbay():
    body = request.get_json()
    response = requests.get(body['route'])
    return jsonify(response.text)

if __name__ == '__main__':
    app.run(debug=True)
