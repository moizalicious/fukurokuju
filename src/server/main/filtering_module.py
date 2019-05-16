from main.sentiment_module import sentiment
import random

def getTopAnilistEntries(animelist, mangalist, reviews, reviewed_and_scored):
    top_reviewed_and_scored_entries = []
    for entry in reviewed_and_scored:
        sent_type = sentiment(entry['body'])
        if entry['entryScore'] >= 70 and entry['reviewScore'] >= 70 and (sent_type == 'pos' or sent_type == 'nue'):
            top_reviewed_and_scored_entries.append(entry['title'])

    top_anime_entries = []
    for anime in animelist:
        if anime['score'] and anime['notes']:
            sent_type = sentiment(anime['notes'])
            if anime['score'] >= 70:
                if sent_type == 'pos' or sent_type == 'neu':
                    top_anime_entries.append(anime['title'])
        elif anime['score']:
            if anime['score'] >= 90:
                top_anime_entries.append(anime['title'])

    top_manga_entries = []
    for manga in mangalist:
        if manga['score'] and manga['notes']:
            sent_type = sentiment(manga['notes'])
            if manga['score'] >= 70:
                if sent_type == 'pos' or sent_type == 'neu':
                    top_manga_entries.append(manga['title'])
        elif manga['score']:
            if manga['score'] >= 90:
                top_manga_entries.append(manga['title'])

    top_review_entries = []
    for review in reviews:
        sent_type = sentiment(review['body'])
        if review['score'] >= 70 and (sent_type == 'pos' or sent_type == 'neu'):
            top_review_entries.append(review['title'])

    top_entries = []
    if len(top_reviewed_and_scored_entries) >= 5:
        top_entries.extend(top_reviewed_and_scored_entries[:5])
    else:
        top_entries.extend(top_reviewed_and_scored_entries)

    top_anime_entries.extend(top_manga_entries)
    random.shuffle(top_anime_entries)
    if len(top_anime_entries) >= (5 - len(top_entries)):
        top_entries.extend(top_anime_entries[:5 - len(top_entries)])
    else:
        top_entries.extend(top_anime_entries)

    if len(top_review_entries) >= (5 - len(top_entries)):
        top_entries.extend(top_review_entries[:5 - len(top_entries)])
    else:
        top_entries.extend(top_review_entries)

    return top_entries

def getTopGoodreadsEntries(reviews):
    top_reviewed_and_rated_entries = []
    top_reviewed_entries = []
    top_rated_entries = []
    for review in reviews:
        if review['rating'] and review['body']:
            sent_type = sentiment(review['body'])
            if review['rating'] >= 4:
                if sent_type == 'pos' or sent_type == 'neu':
                    top_reviewed_and_rated_entries.append(review['title'])
            elif review['rating'] == 3:
                if sent_type == 'pos':
                    top_reviewed_and_rated_entries.append(review['title'])
        elif review['rating']:
            if review['rating'] == 5:
                top_rated_entries.append(review['title'])
        elif review['body']:
            sent_type = sentiment(review['body'])
            if sent_type == 'pos':
                top_reviewed_entries.append(review['title'])

    top_entries = []
    if len(top_reviewed_and_rated_entries) >= 5:
        top_entries.extend(top_reviewed_and_rated_entries[:5])
    else:
        top_entries.extend(top_reviewed_and_rated_entries)

    if len(top_rated_entries) >= (5 - len(top_entries)):
        top_entries.extend(top_rated_entries[:5 - len(top_entries)])
    else:
        top_entries.extend(top_rated_entries)

    if len(top_reviewed_entries) >= (5 - len(top_entries)):
        top_entries.extend(top_reviewed_entries[:5 - len(top_entries)])
    else:
        top_entries.extend(top_reviewed_entries)

    return top_entries
