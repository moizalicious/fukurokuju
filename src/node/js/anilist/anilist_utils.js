const regex = / /gm;

class AnilistUtils {

    static handleAnilistUserReviewsResponse(response) {
        var userId = 0;
        if (response.data.Page.reviews[0]) {
            anilistReviews = anilistReviews.concat(response.data.Page.reviews);
            userId = response.data.Page.reviews[0].userId;
        }

        var currentPage = response.data.Page.pageInfo.currentPage;
        var hasNextPage = response.data.Page.pageInfo.hasNextPage;

        if (hasNextPage) {
            currentPage++;
            Anilist.request(AnilistQuery.GET_USER_REVIEWS, { page: currentPage, userId: userId }, handleAnilistUserReviewsResponse);
        } else {
            anilistData.reviews = anilistReviews;
            Backend.request(PythonRoute.GET_ANILIST_KEYWORDS, anilistData, function (response) {
                if (response[0]) {
                    response.forEach(function (title) {
                        title = title.replace(regex, '%20');
                        Ebay.request(EbayRoute.GET_ITEMS + title, EbayUtils.handleEbayItemRequest);

                    });
                } else {
                    console.error(response);
                }
            });
        }
    }

    static filterMediaListCollection(MediaListCollection) {
        var media = [];
        MediaListCollection.lists.forEach(function (list) {
            media = media.concat(list.entries);
        });
        return media;
    }

}
