class GoodreadsUtils {

    static handleGoodreadsUserReviewsResponse(response) {
        if (response.GoodreadsResponse) {
            goodreadsReviews = response.GoodreadsResponse.reviews.review;
            goodreadsData.reviews = goodreadsReviews;
            Backend.request(PythonRoute.GET_GOODREADS_KEYWORDS, goodreadsData, function(response) {
                if (response[0]) {
                    response.forEach(function (keyword) {
                        if ($('#keywords').html() == '<li class="list-group-item text-center">Obtaining Keywords...</li>') {
                            $('#keywords').html('');
                        }
                        $('#keywords').append('<li class="list-group-item text-center">'+keyword.title+'</li>');
                        var title = keyword.title.replace(regex, '%20');
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
