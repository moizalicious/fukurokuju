import io
import json

fileData = io.open("main/res/data/anilist/reviews.json", encoding="latin-1").read()
reviews = json.loads(fileData)

positive = {'reviews': []}
negative = {'reviews': []}
neutral = {'reviews': []}

for review in reviews['reviews']:
    if review['score'] >= 70:
        positive['reviews'].append(review)
    elif review['score'] < 50:
        negative['reviews'].append(review)
    elif review['score'] >= 50 and review['score'] < 70:
        neutral['reviews'].append(review)

print('No. of Positive Reviews: ', len(positive['reviews']))
print('No. of Negative Reviews: ', len(negative['reviews']))
print('No. of Neutral Reviews: ', len(neutral['reviews']))

with open('main/res/data/anilist/positive.json', 'w') as positiveFile:
    positiveFile.write(json.dumps(positive))
with open('main/res/data/anilist/negative.json', 'w') as negativeFile:
    negativeFile.write(json.dumps(negative))
with open('main/res/data/anilist/neutral.json', 'w') as neutralFile:
    neutralFile.write(json.dumps(neutral))
