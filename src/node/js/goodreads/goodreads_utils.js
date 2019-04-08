class GoodreadsUtils {

    static handleGoodreadsUserReviewsResponse(response) {
        if (response.GoodreadsResponse) {
            goodreadsReviews = response.GoodreadsResponse.reviews.review;
            goodreadsData.reviews = goodreadsReviews;
            userData.goodreadsData = goodreadsData;
            console.log(userData);
            Backend.request(PythonRoute.GET_KEYWORDS, userData, function(response) {
                console.log(response);
                // TODO - do ebay request here
            });
        } else {
            console.log(response);
        }
    }

}
