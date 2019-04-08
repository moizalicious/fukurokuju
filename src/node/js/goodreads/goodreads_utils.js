class GoodreadsUtils {

    static handleGoodreadsUserReviewsResponse(response) {
        if (response.GoodreadsResponse) {
            goodreadsReviews = response.GoodreadsResponse.reviews.review;
            goodreadsData.reviews = goodreadsReviews;
            Backend.request(PythonRoute.GET_GOODREADS_KEYWORDS, goodreadsData, function(response) {
                // NOTE - This is where the keywords come in, must be obtained and sent for eBay items
                if (response[0]) {
                    response.forEach(function (title) {
                        title = title.replace(regex, '%20');
                        Ebay.request(EbayRoute.GET_ITEMS + title, EbayUtils.handleEbayItemRequest);
                    });
                } else {
                    console.error(response);
                }
            });
        } else {
            console.log(response);
        }
    }

}
