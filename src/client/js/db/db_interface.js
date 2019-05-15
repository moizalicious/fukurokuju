class DBInterface {

    constructor(url) {
        this.url = url;
    }

    get(path, callback, errorHandler) {
        var options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        fetch(this.url + path, options)
            .then(function (response) {
                return response.json();
            })
            .then(callback)
            .catch(errorHandler);
    }

    put(path, value, callback, errorHandler) {
        var options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(value)
        };

        fetch(this.url + path, options)
            .then(function (response) {
                return response.json();
            })
            .then(callback)
            .catch(errorHandler);
    }

    post(path, value, callback, errorHandler) {
        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(value)
        };

        fetch(this.url + path, options)
            .then(function (response) {
                return response.json();
            })
            .then(callback)
            .catch(errorHandler);
    }

}

let Database = new DBInterface('http://localhost:3000');
