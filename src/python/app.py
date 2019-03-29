from flask import Flask, jsonify, request
from flask_cors import CORS
from main.keyword_module import extract_keywords

app = Flask(__name__)
CORS(app)

@app.route('/get_keywords', methods=['POST'])
def get_keywords():
    user_data = request.get_json()
    keywords = extract_keywords(user_data)
    return jsonify(keywords)


if __name__ == '__main__':
    app.run(debug=True)
