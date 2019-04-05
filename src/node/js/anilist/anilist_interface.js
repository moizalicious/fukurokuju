class AnilistInterface {

    constructor(url) {
        this.url = url;
    }

    request(query, variables, dataCallback) {
        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        };

        fetch(this.url, options).then(function(response) {
            return response.json();
        }).then(dataCallback).catch(toErrorPage);
    }

}
