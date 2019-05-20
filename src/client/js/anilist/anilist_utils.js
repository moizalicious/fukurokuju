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
                    response.forEach(function(keyword) {
                        console.log(keyword);
                        if ($('#keywords').html() == '<li class="list-group-item text-center">Obtaining Keywords...</li>') {
                            $('#keywords').html('');
                        }

                        var source = keyword.stats.source;
                        var score = 'N/A';
                        if (keyword.stats.entryScore != '') {
                            score = keyword.stats.entryScore;
                        }
                        var sentiment = 'N/A';
                        if (keyword.stats.notesSentiment != '') {
                            sentiment = keyword.stats.notesSentiment;
                        } else if (keyword.stats.reviewSentiment != '') {
                            sentiment = keyword.stats.reviewSentiment;
                        }
                        $('#keywords').append('<li class="list-group-item text-center" tabindex="0" ' +
                        'role="button" data-toggle="popover" data-placement="bottom" ' +
                        'data-trigger="focus" title="Keyword Information" ' +
                        'data-content="Source: '+source+', Score: '+score+', Sentiment: '+sentiment+'">' + 
                        keyword.title+'</li>');
                        $('[data-toggle="popover"]').popover();

                        var title = keyword.title.replace(regex, '%20');
                        Ebay.request(EbayRoute.GET_ITEMS + title, EbayUtils.handleEbayItemRequest);
                    });
                } else {
                    showError(response);
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
