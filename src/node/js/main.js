var accessToken = OAuth.getAccessToken();
let Anilist = new AnilistInterface('https://graphql.anilist.co', accessToken);
var animeScoreData = [];
if (accessToken) {
    let query = '{ User(name: "moizalicious"){ id name about avatar { large medium } } }';
    let query2 = '{ Viewer { id name about } }';
    let query3 = '{ Media(onList: true) { id } }';
    let query4 = '{Page { pageInfo { hasNextPage } media(onList: true) { title { english romaji } mediaListEntry { score } } } } ';

    // Query To Get All Of The Reviews
    // {
    //     Page {
    //         pageInfo {
    //             total
    //             perPage
    //             currentPage
    //             lastPage
    //             hasNextPage
    //         }
    //         reviews {
    //             body(asHtml: false)
    //         }
    //     }
    // }

    Anilist.request(AnilistQuery.GET_ALL_SCORES_AND_NOTES_ANIME, {userID: 149937}, function(response) {
        console.log(response.data);
    }, function(error) {
        console.log(error)
    });

    // let Anilist = new AnilistInterface('https://graphql.anilist.co', accessToken);
    // Anilist.request('{ Page(page: 1) { pageInfo { total perPage currentPage lastPage hasNextPage } media(onList: true) { id title { english romaji } mediaListEntry { id status score notes } } } }',
    //  handleAnilistResponse,
    //  handleAnilistError);
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

// function handleAnilistError(error) {
//     console.error(error)
// }
