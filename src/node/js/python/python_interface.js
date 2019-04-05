class PythonInterface {

    constructor(url) {
        this.url = url;
    }

    request(route, data, dataCallback) {
        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        fetch(this.url + route, options).then(function(response) {
            return response.json();
        }).then(dataCallback).catch(function(error) {
            console.error(error);
        });
    }

}
