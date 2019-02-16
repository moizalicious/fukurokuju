class AccessToken {
    getAccessToken() {
        return getParameterByName('access_token');
    }
}

function getParameterByName(name) {
    var match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

let OAuth = new AccessToken();
