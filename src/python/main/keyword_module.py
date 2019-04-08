from main.sentiment_module import sentiment
from main.filtering_module import getTopEntries
from main.utils import AnilistUtils

# def extractKeywords(user_data):
#     keywords = {}
#     if 'anilistData' in user_data:
#         anilist_user_data = user_data['anilistData']
#         keywords['anilistKeywords'] = extractAnilistKeywords(anilist_user_data)
    
#     if 'goodreadsData' in user_data:
#         goodreads_user_data = user_data['goodreadsData']
#         keywords['goodreadsKeywords'] = extractGoodreadsKeywords(goodreads_user_data)

#     return keywords

def extractAnilistKeywords(anilist_user_data):
    animelist = anilist_user_data['animelist']
    animelist = AnilistUtils.removeUnscoredEntries(animelist)
    animelist = AnilistUtils.removeDuplicateMediaTitles(animelist)
    
    mangalist = anilist_user_data['mangalist']
    mangalist = AnilistUtils.removeUnscoredEntries(mangalist)
    mangalist = AnilistUtils.removeDuplicateMediaTitles(mangalist)

    reviews = anilist_user_data['reviews']
    reviews = AnilistUtils.removeDuplicateMediaTitles(reviews)
    reviews = AnilistUtils.removeUnwantedUserIds(reviews)

    # Get information that is both reviewed and scored
    reviewed_and_scored = AnilistUtils.mergeReviewedAndScoredLists(animelist, mangalist, reviews)

    # Remove review_and_scored information from original lists
    animelist = AnilistUtils.removeDuplicateAnimeEntries(animelist, reviewed_and_scored)
    mangalist = AnilistUtils.removeDuplicateMangaEntries(mangalist, reviewed_and_scored)
    reviews = AnilistUtils.removeDuplicateReviews(reviews, reviewed_and_scored)
    # for entry in reviewed_and_scored:
    #     for review in reviews:
    #         if entry['title'] == review['title']:
    #             reviews.remove(review)
    #     if entry['type'] == 'ANIME':
    #         for anime in animelist:
    #             if entry['title'] == anime['title']:
    #                 animelist.remove(anime)
    #     elif entry['type'] == 'MANGA':
    #         for manga in mangalist:
    #             if entry['title'] == manga['title']:
    #                 mangalist.remove(manga)

    # keywords = {
    #     'userId': anilist_user_data['userId'],
    #     'animelist': animelist,
    #     'mangalist': mangalist,
    #     'reviews': reviews,
    #     'reviewedAndScored': reviewed_and_scored
    # }

    # print('Anime Rated: ', len(animelist))
    # for anime in animelist:
    #     print(anime)

    keywords = []
    if len(animelist) >= 5:
        for i in range(0, 5):
            keywords.append(animelist[i]['title'])
    elif len(animelist) < 5:
        for anime in animelist:
            keywords.append(anime['title'])

    # print(keywords)

    return keywords

def extractGoodreadsKeywords(goodreads_user_data):
    # for review in goodreads_user_data['reviews']:
    #     print('Title: ',review['book']['title'],'Rating: ',review['rating'],'Body: ',review['body'])

    keywords = []
    if len(goodreads_user_data['reviews']) >= 5:
        for i in range(0,5):
            keywords.append(goodreads_user_data['reviews'][i]['book']['title'])
    elif len(goodreads_user_data['reviews']) < 5:
        for review in goodreads_user_data['reviews']:
            keywords.append(review['book']['title'])

    return keywords
