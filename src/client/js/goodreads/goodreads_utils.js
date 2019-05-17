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

                        $('#keywords').append('<li class="list-group-item text-center" tabindex="0" ' +
                        'role="button" data-toggle="popover" data-placement="bottom" ' +
                        'data-trigger="focus" title="Keyword Information" ' +
                        'data-content="'+JSON.stringify(keyword.stats).replace(/"/g, '')+'">' + 
                        keyword.title+'</li>');
                        $('[data-toggle="popover"]').popover();

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
