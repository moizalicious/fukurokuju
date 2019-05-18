let Anilist = new AnilistInterface('https://graphql.anilist.co');
let Goodreads = new GoodreadsInterface('https://www.goodreads.com', 'http://127.0.0.1:5000');
let Ebay = new EbayInterface('http://svcs.ebay.com', 'http://127.0.0.1:5000');
let Backend = new PythonInterface('http://127.0.0.1:5000');

var anilistData = {};
var anilistReviews = [];
var goodreadsData = {};
var goodreadsReviews = [];

function checkIfSignedIn() {
    var email = sessionStorage.getItem('email');
    var anilistId = sessionStorage.getItem('anilistId');
    var goodreadsId = sessionStorage.getItem('goodreadsId');
    if (email && (anilistId || goodreadsId)) {
        $('#anilistId').val(anilistId);
        $('#anilistIdText').val(anilistId);
        $('#goodreadsId').val(goodreadsId);
        $('#goodreadsIdText').val(goodreadsId);
        $('#navbarDropdownMenuLink').text(email);
    } else {
        window.location.replace('../../');
    }
}

$(document).ready(function () {
    checkIfSignedIn();
    var recommendationPanelHeight = $('#recommendations').outerHeight();
    $('#recommendations').css('max-height', recommendationPanelHeight + 'px');
    showNoContentPanel();
    $('#anilistIdText').on('change paste keyup', function () {
        $('#saveChanges').attr('disabled', false);
    });
    $('#goodreadsIdText').on('change paste keyup', function () {
        $('#saveChanges').attr('disabled', false);
    });
});

function onGetRecommendationsClick() {
    flush();

    var anilistId = sessionStorage.getItem('anilistId');
    var goodreadsId = sessionStorage.getItem('goodreadsId');
    if (anilistId != '' && goodreadsId != '') {
        $('#getRecommendationsButton').prop('disabled', true);
        showLoadingPanel();
        $('#keywords').html('<li class="list-group-item text-center">Obtaining Keywords...</li>');
        getAnilistAndGoodreadsData(anilistId, goodreadsId);
    } else if (anilistId != '') {
        $('#getRecommendationsButton').prop('disabled', true);
        showLoadingPanel();
        $('#keywords').html('<li class="list-group-item text-center">Obtaining Keywords...</li>');
        getAnilistData(anilistId);
    } else if (goodreadsId != '') {
        $('#getRecommendationsButton').prop('disabled', true);
        showLoadingPanel();
        $('#keywords').html('<li class="list-group-item text-center">Obtaining Keywords...</li>');
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

function logout() {
    sessionStorage.clear();
    window.location.replace('../../');
}

function showNoContentPanel() {
    if (!$('#recommendations').hasClass('d-flex')) {
        $('#recommendations').addClass('d-flex');
    }
    $('#recommendations').html(
        '<div class="d-flex flex-column align-items-center justify-content-center flex-grow-1" style="color:#7f8c8d">' +
        '<h3>Nothing To See Here</h3>' +
        '<p><i>Click On The "Get Recommendations" Button To See Recommended Items</i></p>' +
        '</div>'
    );
}

function showLoadingPanel() {
    if (!$('#recommendations').hasClass('d-flex')) {
        $('#recommendations').addClass('d-flex');
    }
    $('#recommendations').html(
        '<div class="d-flex flex-column align-items-center justify-content-center flex-grow-1" style="color:#7f8c8d">' +
        '<div class="spinner-border text-primary" role="status">' +
        '<span class="sr-only">Loading...</span>' +
        '</div>' +
        '<h3 class="mt-3">Loading Items...</h3>' +
        '</div>'
    );
}

function onSaveChangesClick() {
    var anilistId = $('#anilistIdText').val();
    var goodreadsId = $('#goodreadsIdText').val();

    if (anilistId || goodreadsId) {
        Database.get('/users?email=' + btoa(sessionStorage.getItem('email')), function (data) {
            if (data[0]) {
                var user = {
                    id: data[0].id,
                    email: data[0].email,
                    password: data[0].password,
                    anilistId: btoa(anilistId),
                    goodreadsId: btoa(goodreadsId)
                };
                Database.put('/users/' + data[0].id, user, function (data) {
                    if (data) {
                        sessionStorage.setItem('email', atob(data.email));
                        sessionStorage.setItem('anilistId', atob(data.anilistId));
                        sessionStorage.setItem('goodreadsId', atob(data.goodreadsId));
                        $('#anilistId').val(atob(data.anilistId));
                        $('#goodreadsId').val(atob(data.goodreadsId));
                        $('#saveChanges').attr('disabled', true);
                    } else {
                        showError('Something went wrong');
                    }
                }, function (error) {
                    showError(error);
                });
            } else {
                showError('Something went wrong');
            }
        }, function (error) {
            showError(error);
        });
    } else {
        showWarning('Atleast One Field Needs To Be Filled');
        $('#anilistIdText').val(sessionStorage.getItem('anilistId'));
        $('#goodreadsIdText').val(sessionStorage.getItem('goodreadsId'));
    }
}

function openAnilistUserAccount() {
    var anilistId = $('#anilistId').val();
    if (anilistId != '' && anilistId == null && anilistId != undefined) {
        window.open('https://anilist.co/user/' + anilistId, '_blank');
    }
}

function openGoodreadsUserAccount() {

}
