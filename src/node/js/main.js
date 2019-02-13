var accessToken = OAuth.getAccessToken();

if (accessToken) {
    let query = '{ User(name: "moizalicious"){ id name about avatar { large medium } } }';
    let query2 = '{ Viewer { id name about } }';
    let query3 = '{ Media(onList: true) { id } }';

    let Anilist = new Fetch('https://graphql.anilist.co?query=', accessToken);
    Anilist.post(query3, function(data) {
        console.log(data);
    });
} else {
    window.location.replace('../index.html');
}
