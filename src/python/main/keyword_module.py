from main.sentiment_module import sentiment
from main.utils import AnilistUtils

def extract_keywords(user_data):
    anilist_user_data = user_data['anilistData']
    anilist_keywords = extract_anilist_keywords(anilist_user_data)
    return anilist_keywords

def extract_anilist_keywords(anilist_user_data):
    animelist = anilist_user_data['animelist']
    animelist = AnilistUtils.removeUnscoredEntries(animelist)
    animelist = AnilistUtils.removeDuplicateMediaTitles(animelist)
    
    mangalist = anilist_user_data['mangalist']
    mangalist = AnilistUtils.removeUnscoredEntries(mangalist)
    mangalist = AnilistUtils.removeDuplicateMediaTitles(mangalist)

    for anime in animelist:
        print(anime)
    for manga in mangalist:
        print(manga)

    reviews = anilist_user_data['reviews']
    reviews = AnilistUtils.removeDuplicateMediaTitles(reviews)
    reviews = AnilistUtils.removeUnwantedUserIds(reviews)

    for review in reviews:
        print(review)

    keywords = {
        'userId': anilist_user_data['userId'],
        'animelist': animelist,
        'mangalist': mangalist,
        'reviews': reviews
    }

    return keywords
