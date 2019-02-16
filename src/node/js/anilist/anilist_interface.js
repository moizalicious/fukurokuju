class AnilistInterface {

    constructor(url, accessToken) {
        this.url = url;
        this.accessToken = accessToken;
    }

    request(query, dataCallback, errorCallback) {
        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + this.accessToken
            },
            body: JSON.stringify({
                query: query
            })
        };

        fetch(this.url, options).then(function(response) {
            return response.json();
            // TODO can replace the errorCallback with a generic error function.
        }).then(dataCallback).catch(errorCallback);
    }

    requestWithVariables(query, variables, dataCallback, errorCallback) {
        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + this.accessToken
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        };

        fetch(this.url, options).then(function(response) {
            return response.json();
        }).then(dataCallback).catch(errorCallback);
    }

}
