let accessToken = OAuth.getAccessToken();
let Anilist;
if (accessToken) {
    Anilist = new AnilistInterface('https://graphql.anilist.co', accessToken);
    // TODO - FIND A WAY TO USE PROMISES
    Anilist.request(AnilistQuery.GET_VIEWER_INFO, function(response) {
        let id = response.data.Viewer.id;
        Anilist.requestWithVariables(AnilistQuery.GET_ANIME_SCORES_AND_NOTES, {userId: id}, function(response) {
            console.log(response.data);

            Anilist.requestWithVariables(AnilistQuery.GET_MANGA_SCORES_AND_NOTES, {userId: id}, function(response) {
                console.log(response.data);

                Anilist.requestWithVariables(AnilistQuery.GET_VIEWER_REVIEWS, {page: 1, userId: 14669}, function(response) {
                    console.log(response.data);

                }, handleError);
            }, handleError);
        }, handleError);
    }, handleError);
} else {
    window.location.replace('../index.html');
}

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

function handleError(error) {
    console.error(error)
}
