var AnilistQuery = {
    GET_VIEWER_INFO: `{
        Viewer {
          id
          name
        }
      }`,
    GET_VIEWER_REVIEWS: `query($page: Int, $userId: Int){
        Page(page: $page) {
          pageInfo {
            currentPage
            hasNextPage
          }
          reviews(userId: $userId) {
            body(asHtml: false)
          }
        }
      }
      `,
    GET_ANIME_SCORES_AND_NOTES: `query($userId: Int) {
        MediaListCollection(userId: $userId, type: ANIME) {
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
      }`,
      GET_MANGA_SCORES_AND_NOTES: `query($userId: Int) {
        MediaListCollection(userId: $userId, type: MANGA) {
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
