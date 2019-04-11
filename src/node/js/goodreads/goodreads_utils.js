class GoodreadsUtils {

    static handleGoodreadsUserReviewsResponse(response) {
        if (response.GoodreadsResponse) {
            goodreadsReviews = response.GoodreadsResponse.reviews.review;
            goodreadsData.reviews = goodreadsReviews;
            Backend.request(PythonRoute.GET_GOODREADS_KEYWORDS, goodreadsData, function(response) {
                if (response[0]) {
                    response.forEach(function (title) {
                        title = title.replace(regex, '%20');
                        Ebay.request(EbayRoute.GET_ITEMS + title, EbayUtils.handleEbayItemRequest);
                    });
                } else {
                    showError(response);
                }
            });
        } else {
            showError(response);
        }
    }

}
