from main.sentiment_module import sentiment
from main.filtering_module import get_top_entries

def extract_keywords(user_data):
    anilist_user_data = user_data['anilistUser']
    anilist_keywords = extract_anilist_keywords(anilist_user_data)
    return user_data

def extract_anilist_keywords(anilist_user_data):
    animelist = anilist_user_data['animelist']
    animelist = get_top_entries(animelist)
    mangalist = anilist_user_data['mangalist']
    mangalist = get_top_entries(mangalist)

    for anime in animelist:
        print('Anime: ', anime['media']['title'], 'Score: ', anime['score'])

    for manga in mangalist:
        print('Manga: ', manga['media']['title'], 'Score: ', manga['score'])

    reviews = anilist_user_data['reviews']

    for review in reviews:
        sentiment_value = sentiment(review['body'])
        print('Review Title: ', review['media']['title'], 'Compound Value: ', sentiment_value['compound'], 'Score: ', review['score'])
