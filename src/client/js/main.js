let Anilist = new AnilistInterface('https://graphql.anilist.co');
let Goodreads = new GoodreadsInterface('https://www.goodreads.com', 'http://127.0.0.1:5000');
let Ebay = new EbayInterface('http://svcs.ebay.com', 'http://127.0.0.1:5000');
let Backend = new PythonInterface('http://127.0.0.1:5000');

var anilistData = {};
var anilistReviews = [];
var goodreadsData = {};
var goodreadsReviews = [];

function checkIfSignedIn() {
    var username = sessionStorage.getItem('email');
    var anilistId = sessionStorage.getItem('anilistId');
    var goodreadsId = sessionStorage.getItem('goodreadsId');
    if (username && anilistId && goodreadsId) {
        //TODO
    } else {
        window.location.replace('../../');
    }
}
checkIfSignedIn();

function onGetRecommendationsClick() {
    flush();

    var anilistId = document.getElementById('anilistId').value;
    var goodreadsId = document.getElementById('goodreadsId').value;
    if (anilistId != '' && goodreadsId != '') {
        $('#getRecommendationsButton').prop('disabled', true);
        showLoadingPanel();
        getAnilistAndGoodreadsData(anilistId, goodreadsId);
    } else if (anilistId != '') {
        $('#getRecommendationsButton').prop('disabled', true);
        showLoadingPanel();
        getAnilistData(anilistId);
    } else if (goodreadsId != '') {
        $('#getRecommendationsButton').prop('disabled', true);
        showLoadingPanel();
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
}
