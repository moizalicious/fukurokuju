class Fetch {
    constructor(url, accessToken) {
        this.url = url;
        this.accessToken = accessToken;
    }

    // TODO change from ajax to FETCH(); look at https://anilist.gitbook.io/anilist-apiv2-docs/overview/graphql/pagination
    post(query, callback) {
        $.ajax({
            type: 'POST',
            url: this.url + query,
            contentType: 'application/json',
            headers: {
                Authorization: 'Bearer ' + this.accessToken
            },
            success: callback
        });
    }
}
