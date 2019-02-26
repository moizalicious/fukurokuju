from flask import Flask, jsonify, request
from flask_cors import CORS
from main.vader import sentiment

app = Flask(__name__)
CORS(app)

@app.route('/get_top_rated', methods=['POST'])
def getTopRated():
    some_json = request.get_json()
    response = []
    for review in some_json:
        response.append( (review['media']['title']['english'], sentiment(review['body']) ) )

    return jsonify(response)
    # if 'hello' in some_json:
    #     print(some_json['hello'])
    # else:
    #     print('Damn You')
    # return jsonify(some_json)

if __name__ == '__main__':
    app.run(debug=True)
