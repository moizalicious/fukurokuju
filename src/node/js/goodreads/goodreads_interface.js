let xml2JsonParser = new X2JS();

class GoodreadsInterface {

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

        fetch(this.backendURL + PythonRoute.REQUEST_GOODREADS, options).then(function(response) {
            return response.json();
        }).then(function(value) {
            var jsonObject = xml2JsonParser.xml_str2json(value);
            return jsonObject;
        }).then(dataCallback).catch(showError);
    }

}
