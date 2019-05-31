from main.filtering_module import getTopAnilistEntries, getTopGoodreadsEntries
from main.utils import AnilistUtils, GoodreadsUtils

def extractAnilistKeywords(anilist_user_data):
    # Get anime list data, remove unscored entries and duplicate media titles
    animelist = anilist_user_data['animelist']
    animelist = AnilistUtils.removeUnscoredEntries(animelist)
    animelist = AnilistUtils.removeDuplicateMediaTitles(animelist)
    
    # Get manga list data, remove unscored entries and duplicate media titles
    mangalist = anilist_user_data['mangalist']
    mangalist = AnilistUtils.removeUnscoredEntries(mangalist)
    mangalist = AnilistUtils.removeDuplicateMediaTitles(mangalist)

    # Get reviews, remove duplicate media titles and unwated user id's
    reviews = anilist_user_data['reviews']
    reviews = AnilistUtils.removeDuplicateMediaTitles(reviews)
    reviews = AnilistUtils.removeUnwantedUserIds(reviews)

    # Get information that is both reviewed and scored
    reviewed_and_scored = AnilistUtils.mergeReviewedAndScoredLists(animelist, mangalist, reviews)

    # Remove review_and_scored information from original lists
    animelist = AnilistUtils.removeDuplicateAnimeEntries(animelist, reviewed_and_scored)
    mangalist = AnilistUtils.removeDuplicateMangaEntries(mangalist, reviewed_and_scored)
    reviews = AnilistUtils.removeDuplicateReviews(reviews, reviewed_and_scored)
    
    keywords = getTopAnilistEntries(animelist, mangalist, reviews, reviewed_and_scored)

    return keywords

def extractGoodreadsKeywords(goodreads_user_data):
    # Get Goodreads review information and remove unwanted information
    reviews = goodreads_user_data['reviews']
    reviews = GoodreadsUtils.removeUnwantedInformation(reviews)

    keywords = getTopGoodreadsEntries(reviews)

    return keywords
