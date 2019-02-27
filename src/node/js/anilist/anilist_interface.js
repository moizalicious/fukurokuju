class AnilistInterface {

    constructor(url) {
        this.url = url;
        // this.accessToken = accessToken;
    }

    request(query, dataCallback) {
        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'//,
                // 'Authorization': 'Bearer ' + this.accessToken
            },
            body: JSON.stringify({
                query: query
            })
        };

        fetch(this.url, options).then(function(response) {
            return response.json();
        }).then(dataCallback).catch(toErrorPage);
    }

    requestWithVariables(query, variables, dataCallback) {
        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'//,
                // 'Authorization': 'Bearer ' + this.accessToken
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
