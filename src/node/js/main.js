var accessToken = OAuth.getAccessToken();

if (accessToken) {
    let query = '{ User(name: "moizalicious"){ id name about avatar { large medium } } }';
    let query2 = '{ Viewer { id name about } }';
    let query3 = '{ Media(onList: true) { id } }';
    let query4 = '{Page { pageInfo { hasNextPage } media(onList: true) { id title { english romaji } mediaListEntry { id status score } } } } ';

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

    let Anilist = new AnilistInterface('https://graphql.anilist.co', accessToken);
    Anilist.request(query4, function (data) {
        console.log(data);
    }, function (error) {
        console.error(error);
    });
} else {
    window.location.replace('../index.html');
}
