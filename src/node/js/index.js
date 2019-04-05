let Anilist = new AnilistInterface('https://graphql.anilist.co');
let Goodreads = new GoodreadsInterface('https://www.goodreads.com', 'http://127.0.0.1:5000');
let Ebay = new EbayInterface('http://svcs.ebay.com', 'http://127.0.0.1:5000');
let Backend = new PythonInterface('http://127.0.0.1:5000');

var userData = {};
var anilistData = {};
var anilistReviews = [];
var goodreadsData = {};

function onGetRecommendationsClick() {
    flush();

    var anilistId = document.getElementById('anilistId').value;
    var goodreadsId = document.getElementById('goodreadsId').value;
    if (anilistId != '' && goodreadsId != '') {
        console.log('AnilistId - ' + anilistId);
        console.log('GoodreadsId - ' + goodreadsId);
        getAnilistAndGoodreadsData(anilistId, goodreadsId);
    } else if (anilistId != '') {
        console.log('AnilistId - ' + anilistId);
        getAnilistData(anilistId);
    } else if (goodreadsId != '') {
        console.log('GoodreadsId - ' + goodreadsId);
        getGoodreadsData(goodreadsId);
    } else {
        console.error('You have not entered your Anilist or Goodreads credentials');
    }

}

function getAnilistAndGoodreadsData(anilistId, goodreadsId) {
    // TODO - complete
    getAnilistData(anilistId);
}

function getAnilistData(anilistId) {
    Anilist.request(AnilistQuery.GET_USER_INFO, { name: anilistId }, function (response) {
        var userId = response.data.User.id;
        anilistData.userId = userId;
        Anilist.request(AnilistQuery.GET_ANIME_SCORES_AND_NOTES, { userId: userId }, function (response) {
            anilistData.animelist = filterMediaListCollection(response.data.MediaListCollection);
            Anilist.request(AnilistQuery.GET_MANGA_SCORES_AND_NOTES, { userId: userId }, function (response) {
                anilistData.mangalist = filterMediaListCollection(response.data.MediaListCollection);
                Anilist.request(AnilistQuery.GET_USER_REVIEWS, { page: 1, userId: userId }, handleUserReviewsResponse);
            });
        });
    });
}

function getGoodreadsData(goodreadsId) {
    Goodreads.request(GoodreadsRoute.GET_REVIEW_LIST + goodreadsId, function(response) {
        // TODO get full lists

        var title = '';
        if (response.GoodreadsResponse) {
            response.GoodreadsResponse.reviews.review.forEach(function(r) {
                if (r.rating != 0) {
                    title = r.book.title;
                }
            });
        } else {
            console.log(response);
        }

        if (title != '') {
            const regex = / /gm;
            title = title.replace(regex, '%20');
            Ebay.request(EbayRoute.GET_ITEMS + title, function(response) {
                console.log(response.findItemsByKeywordsResponse[0].searchResult[0]);
            });
        }
    });
}

function filterMediaListCollection(MediaListCollection) {
    media = [];
    MediaListCollection.lists.forEach(function (list) {
        media = media.concat(list.entries);
    });
    return media;
}

function handleUserReviewsResponse(response) {
    var userId = 0;
    if (response.data.Page.reviews[0]) {
        anilistReviews = anilistReviews.concat(response.data.Page.reviews);
        userId = response.data.Page.reviews[0].userId;
    }

    var currentPage = response.data.Page.pageInfo.currentPage;
    var hasNextPage = response.data.Page.pageInfo.hasNextPage;

    if (hasNextPage) {
        currentPage++;
        Anilist.request(AnilistQuery.GET_USER_REVIEWS, { page: currentPage, userId: userId }, handleUserReviewsResponse);
    } else {
        anilistData.reviews = anilistReviews;
        userData.anilistData = anilistData;
        Backend.request(PythonRoute.GET_KEYWORDS, userData, function (response) {
            if (response[0]) {
                var title = response[0];
                const regex = / /gm;
                title = title.replace(regex, '%20');
                Ebay.request(EbayRoute.GET_ITEMS + title, function(response) {
                    console.log(response.findItemsByKeywordsResponse[0].searchResult[0]);
                });
            }
        });
    }
}

function flush() {
    userData = {};
    anilistData = {};
    anilistReviews = [];
    goodreadsData = {};
}

// Goodreads.request(GoodreadsRoute.GET_REVIEW_LIST + '87521241', function(response) {
//     console.log(response);
// });


// Ebay.request(EbayRoute.GET_ITEMS + 'code%20geass', function(response) {
//     console.log(response);
// });
