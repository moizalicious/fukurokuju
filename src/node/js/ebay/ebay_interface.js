class EbayInterface {

    constructor(url, backendURL) {
        this.url = url;
        this.backendURL = backendURL;
    }

    request(route, dataCallback) {
        var body = {
            route: this.url + route
        };

        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        };

        fetch(this.backendURL + PythonRoute.REQUEST_EBAY, options).then(function(response) {
            return response.json();
        }).then(function(value) {
            var result = JSON.parse(value);
            return result;
        }).then(dataCallback).catch(showError);
    }

}
