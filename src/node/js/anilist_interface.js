class AnilistInterface {
    constructor(url, accessToken) {
        this.url = url;
        this.accessToken = accessToken;
    }

    // TODO change from ajax to FETCH(); look at https://anilist.gitbook.io/anilist-apiv2-docs/overview/graphql/pagination
    request(query, dataCallback, errorCallback) {
        // $.ajax({
        //     type: 'POST',
        //     url: this.url + query,
        //     contentType: 'application/json',
        //     headers: {
        //         Authorization: 'Bearer ' + this.accessToken
        //     },
        //     success: callback
        // });

        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + this.accessToken
            },
            body: JSON.stringify({
                query: query//,
                // variables: variables
            })
        };

        fetch(this.url, options).then(function(response) {
            return response.json();
        }).then(dataCallback).catch(errorCallback);
    }
}
