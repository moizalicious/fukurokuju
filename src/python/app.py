from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/get_json', methods=['POST'])
def hello():
    some_json = request.get_json()
    if 'hello' in some_json:
        print(some_json['hello'])
    else:
        print('Damn You')
    return jsonify(some_json)

if __name__ == '__main__':
    app.run(debug=True)
