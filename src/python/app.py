from flask import Flask, jsonify, request
from flask_cors import CORS
from main.keyword_module import extractKeywords

app = Flask(__name__)
CORS(app)

@app.route('/get_keywords', methods=['POST'])
def getKeywords():
    user_data = request.get_json()
    keywords = extractKeywords(user_data)
    return jsonify(keywords)


if __name__ == '__main__':
    app.run(debug=True)
