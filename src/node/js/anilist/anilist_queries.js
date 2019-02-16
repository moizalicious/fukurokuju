var AnilistQuery = {
    GET_VIEWER_MEDIA_SCORES_AND_NOTES:
        `query($pageNo: Int) {
        Page(page: $pageNo) {
          pageInfo {
            currentPage
            hasNextPage
          }
          media(onList: true) {
            id
            title {
              english
              romaji
            }
            mediaListEntry {
              id
              status
              score
              notes
            }
          }
        }
      }`,
    GET_VIEWER_REVIEWS: '{ Page { pageInfo { total perPage currentPage lastPage hasNextPage } reviews { body(asHtml: false) } } }',
    GET_VIEWER_ID: '{ Viewer { id } }',
    GET_ALL_SCORES_AND_NOTES_ANIME: 
    `query($userID: Int){
        MediaListCollection(userId: $userID type: ANIME) {
          lists {
            name
            entries {
              media {
                title {
                  english
                  romaji
                }
                coverImage {
                  extraLarge
                  large
                  medium
                  color
                }
              }
              score
              notes
            }
          }
        }
      }`
}

Object.freeze(AnilistQuery);
