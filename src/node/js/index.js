let Anilist = new AnilistInterface('https://graphql.anilist.co');
let Backend = new PythonInterface('http://127.0.0.1:5000');

var userData = {};
var anilistUser = {};
var reviews = [];

function onGetRecommendationsClick() {
    var anilistId = document.getElementById('anilistId').value;
    if (anilistId == '') {
        console.error('You have not entered a Anilist Id');
    } else {
        console.log('AnilistId - ' + anilistId);
        getAnilistData(anilistId);
    }
}

function getAnilistData(anilistId) {
    Anilist.request(AnilistQuery.GET_USER_INFO, { name: anilistId }, function (response) {
        var userId = response.data.User.id;
        anilistUser.id = userId;
        // sessionStorage.setItem('userId', userId);
        // sessionStorage.setItem('userName', response.data.User.name);
        Anilist.request(AnilistQuery.GET_ANIME_SCORES_AND_NOTES, { userId: userId }, function (response) {
            anilistUser.animelist = filterMediaListCollection(response.data.MediaListCollection);
            Anilist.request(AnilistQuery.GET_MANGA_SCORES_AND_NOTES, { userId: userId }, function (response) {
                anilistUser.mangalist = filterMediaListCollection(response.data.MediaListCollection);
                Anilist.request(AnilistQuery.GET_USER_REVIEWS, { page: 1, userId: userId }, handleUserReviewsResponse);
            });
        });
    });
}

function getGoodreadsData(goodreadsId) {

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
        reviews = reviews.concat(response.data.Page.reviews);
        userId = response.data.Page.reviews[0].userId;
    }

    var currentPage = response.data.Page.pageInfo.currentPage;
    var hasNextPage = response.data.Page.pageInfo.hasNextPage;

    if (hasNextPage) {
        currentPage++;
        Anilist.request(AnilistQuery.GET_USER_REVIEWS, { page: currentPage, userId: userId }, handleUserReviewsResponse);
    } else {
        anilistUser.reviews = reviews;
        userData.anilistUser = anilistUser;
        Backend.request(PythonRoute.GET_KEYWORDS, userData, function(response) {
            console.log(response);
        });
    }
}
