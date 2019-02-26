let accessToken = OAuth.getAccessToken();
let Anilist;

if (accessToken) {
    Anilist = new AnilistInterface('https://graphql.anilist.co', accessToken);
    // TODO - FIND A WAY TO USE PROMISES
    Anilist.request(AnilistQuery.GET_VIEWER_INFO, function (response) {
        let id = response.data.Viewer.id;
        Anilist.requestWithVariables(AnilistQuery.GET_VIEWER_REVIEWS, { page: 1, userId: 14669 }, function (response) {
            console.log(response.data.Page.reviews);
            contactPython(response.data.Page.reviews);
        });
    });
} else {
    window.location.replace('../index.html');
}

// THIS HANDLES MULTIPLE PAGE PULLS (DO NOT ERASE)
// function handleAnilistResponse(response) {
//     var currentPage = response.data.Page.pageInfo.currentPage;
//     var hasNextPage = response.data.Page.pageInfo.hasNextPage;
//     animeScoreData = animeScoreData.concat(response.data.Page.media);
//     if (hasNextPage) {
//         currentPage++;
//         Anilist.request('{ Page(page: ' + currentPage + ') { pageInfo { total perPage currentPage lastPage hasNextPage } media(onList: true) { id title { english romaji } mediaListEntry { id status score notes } } } }', handleAnilistResponse, handleAnilistError);
//     } else {
//         console.log(animeScoreData);
//     }
// }
