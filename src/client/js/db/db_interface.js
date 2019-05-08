class DBInterface {

    constructor(url) {
        this.url = url;
    }

    get(path, callback) {
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
            .catch(function (error) {
                console.error(error);
            });
    }

    put(path, value, callback) {
        var options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: value
        };

        fetch(this.url + path, options)
            .then(function (response) {
                return response.json();
            })
            .then(callback)
            .catch(function (error) {
                console.error(error);
            });
    }

    post(path, value, callback) {
        var options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: value
        };

        fetch(this.url + path, options)
            .then(function (response) {
                return response.json();
            })
            .then(callback)
            .catch(function (error) {
                console.error(error);
            });
    }

}

let Database = new DBInterface('http://localhost:3000');
