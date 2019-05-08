function checkIfSignedIn() {
    var username = sessionStorage.getItem('email');
    var anilistId = sessionStorage.getItem('anilistId');
    var goodreadsId = sessionStorage.getItem('goodreadsId');
    if (username && anilistId && goodreadsId) {
        window.location.replace('/html/main');
    }
}

checkIfSignedIn();

Database.get('/users', function(data) {
    console.log(data);
});
