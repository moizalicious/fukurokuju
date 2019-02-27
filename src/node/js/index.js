let Anilist = new AnilistInterface('https://graphql.anilist.co');
let Backend = new PythonInterface('http://127.0.0.1:5000');

function onGetRecommendationClick() {
    var anilistId = document.getElementById('anilistId').value;
    if (anilistId == '') {
        console.error('You have not entered a Anilist Id');
    } else {
        console.log('AnilistId - ' + anilistId);
        Anilist.requestWithVariables(AnilistQuery.GET_USER_INFO, { name: anilistId }, function(response) {
            var userId = response.data.User.id;
            sessionStorage.setItem('userId', userId);
            sessionStorage.setItem('userName', response.data.User.name);

            Anilist.requestWithVariables(AnilistQuery.GET_ANIME_SCORES_AND_NOTES, { userId: userId }, function(response) {
                console.log(response.data);
                Anilist.requestWithVariables(AnilistQuery.GET_MANGA_SCORES_AND_NOTES, { userId: userId }, function(response) {
                    console.log(response.data);
                    Anilist.requestWithVariables(AnilistQuery.GET_USER_REVIEWS, { page: 1, userId: userId }, function(response) {
                        console.log(response.data);
                        Backend.request('/anilist_top_liked', response.data, function(response) {
                            console.log('Response From Backend');
                            console.log(response);
                        });
                    });
                });
            });
            
            console.log('Get Complete');
        });
    }
}
