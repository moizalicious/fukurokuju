
class AnilistUtils:

    def removeUnwantedUserIds(reviews):
        for review in reviews:
            del review['userId']
        return reviews

    def removeDuplicateMediaTitles(list):
        media_list = []
        for entry in list:
            entry['title'] = getMediaTitle(entry['media'])
            del entry['media']
            media_list.append(entry)
        return media_list

    def removeUnscoredEntries(list):
        scored_entries = []
        for entry in list:
            if entry['score'] != 0:
                scored_entries.append(entry)
            else:
                break
        return scored_entries

def getMediaTitle(media):
    title = ''
    if media['title']['english'] != None:
        title = media['title']['english']
    else:
        title = media['title']['romaji']
    return title
