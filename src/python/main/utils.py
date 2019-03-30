
class AnilistUtils:

    def removeDuplicateMangaEntries(mangalist, reviewed_and_scored):
        for entry in reviewed_and_scored:
            if entry['type'] == 'MANGA':
                for manga in mangalist:
                    if entry['title'] == manga['title']:
                        mangalist.remove(manga)
        return mangalist

    def removeDuplicateAnimeEntries(animelist, reviewed_and_scored):
        for entry in reviewed_and_scored:
            if entry['type'] == 'ANIME':
                for anime in animelist:
                    if entry['title'] == anime['title']:
                        animelist.remove(anime)
        return animelist

    def removeDuplicateReviews(reviews, reviewed_and_scored):
        for entry in reviewed_and_scored:
            for review in reviews:
                if entry['title'] == review['title']:
                    reviews.remove(review)
        return reviews

    def mergeReviewedAndScoredLists(animelist, mangalist, reviews):
        reviewed_and_scored = []
        for review in reviews:
            if review['type'] == 'ANIME':
                for anime in animelist:
                    if review['title'] == anime['title']:
                        entry = {}
                        entry['title'] = review['title']
                        entry['type'] = review['type']
                        entry['animeScore'] = anime['score']
                        entry['reviewScore'] = review['score']
                        entry['body'] = review['body']
                        entry['notes'] = anime['notes']
                        reviewed_and_scored.append(entry)
            elif review['type'] == 'MANGA':
                for manga in mangalist:
                    if review['title'] == manga['title']:
                        entry = {}
                        entry['title'] = review['title']
                        entry['type'] = review['type']
                        entry['animeScore'] = manga['score']
                        entry['reviewScore'] = review['score']
                        entry['body'] = review['body']
                        entry['notes'] = manga['notes']
                        reviewed_and_scored.append(entry)
        return reviewed_and_scored

    def removeUnwantedUserIds(reviews):
        for review in reviews:
            del review['userId']
        return reviews

    def removeDuplicateMediaTitles(list):
        media_list = []
        for entry in list:
            entry['title'] = getMediaTitle(entry['media'])
            if 'type' in entry['media']:
                entry['type'] = entry['media']['type']
            del entry['media']
            media_list.append(entry)
        return media_list

    def removeUnscoredEntries(list):
        scored_entries = []
        for entry in list:
            if entry['score'] != 0 or entry['notes'] != None:
                scored_entries.append(entry)
        return scored_entries

def getMediaTitle(media):
    title = ''
    if media['title']['english'] != None:
        title = media['title']['english']
    elif media['title']['romaji'] != None:
        title = media['title']['romaji']
    return title
