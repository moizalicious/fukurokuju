let Anilist = new AnilistInterface('https://graphql.anilist.co');
let Goodreads = new GoodreadsInterface('https://www.goodreads.com', 'http://127.0.0.1:5000');
let Ebay = new EbayInterface('http://svcs.ebay.com', 'http://127.0.0.1:5000');
let Backend = new PythonInterface('http://127.0.0.1:5000');

var anilistData = {};
var anilistReviews = [];
var goodreadsData = {};
var goodreadsReviews = [];

function onGetRecommendationsClick() {
    flush();

    var anilistId = document.getElementById('anilistId').value;
    var goodreadsId = document.getElementById('goodreadsId').value;
    if (anilistId != '' && goodreadsId != '') {
        $('#getRecommendationsButton').prop('disabled', true);
        console.log('AnilistId - ' + anilistId);
        console.log('GoodreadsId - ' + goodreadsId);
        getAnilistAndGoodreadsData(anilistId, goodreadsId);
    } else if (anilistId != '') {
        $('#getRecommendationsButton').prop('disabled', true);
        console.log('AnilistId - ' + anilistId);
        getAnilistData(anilistId);
    } else if (goodreadsId != '') {
        $('#getRecommendationsButton').prop('disabled', true);
        console.log('GoodreadsId - ' + goodreadsId);
        getGoodreadsData(goodreadsId);
    } else {
        showWarning('You have not entered your Anilist or Goodreads credentials');
    }
}

function getAnilistAndGoodreadsData(anilistId, goodreadsId) {
    getAnilistData(anilistId);
    getGoodreadsData(goodreadsId);
}

function getAnilistData(anilistId) {
    Anilist.request(AnilistQuery.GET_USER_INFO, { name: anilistId }, function (response) {
        var userId = response.data.User.id;
        anilistData.userId = userId;
        Anilist.request(AnilistQuery.GET_ANIME_SCORES_AND_NOTES, { userId: userId }, function (response) {
            anilistData.animelist = AnilistUtils.filterMediaListCollection(response.data.MediaListCollection);
            Anilist.request(AnilistQuery.GET_MANGA_SCORES_AND_NOTES, { userId: userId }, function (response) {
                anilistData.mangalist = AnilistUtils.filterMediaListCollection(response.data.MediaListCollection);
                Anilist.request(AnilistQuery.GET_USER_REVIEWS, { page: 1, userId: userId }, AnilistUtils.handleAnilistUserReviewsResponse);
            });
        });
    });
}

function getGoodreadsData(goodreadsId) {
    Goodreads.request(GoodreadsRoute.GET_REVIEW_LIST + goodreadsId, GoodreadsUtils.handleGoodreadsUserReviewsResponse);
}

function flush() {
    anilistData = {};
    anilistReviews = [];
    goodreadsData = {};
    goodreadsReviews = [];
    $('#recommendations').html('');
}

// Goodreads.request(GoodreadsRoute.GET_REVIEW_LIST + '87521241', function(response) {
//     console.log(response);
// });


// Ebay.request(EbayRoute.GET_ITEMS + 'code%20geass', function(response) {
//     console.log(response);
// });
