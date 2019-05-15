function checkIfSignedIn() {
    var username = sessionStorage.getItem('email');
    var anilistId = sessionStorage.getItem('anilistId');
    var goodreadsId = sessionStorage.getItem('goodreadsId');
    if (username && anilistId && goodreadsId) {
        window.location.replace('/html/main');
    }
}

$(document).ready(function () {
    checkIfSignedIn();
});

function onLoginClick() {
    var email = $('#loginEmail').val();
    var password = $('#loginPassword').val();

    if (email == undefined || email == '') {
        console.log('Email cannot be empty');
    } else if (password == undefined || password == '') {
        console.log('Password field cannot be empty');
    } else {
        Database.get('/users?email=' + email + '&password=' + password, function (data) {
            console.log(data);
            if (data.length == 1) {
                sessionStorage.setItem('email', data[0].email);
                sessionStorage.setItem('anilistId', data[0].anilistId);
                sessionStorage.setItem('goodreadsId', data[0].goodreadsId);
                window.location.replace('/html/main');
            } else if (data.length > 1) {
                showError('Multiple Inputs of the same credentials found');
            } else {
                showWarning('Invalid Login Information, Please Try Again');
            }
        }, function (error) {
            showError(error);
        });
    }
}

function onSignupClick() {
    var email = $('#signupEmail').val();
    var password = $('#signupPassword').val();
    var confirmPassword = $('#signupConfirmPassword').val();
    var anilistId = $('#signupAnilistId').val();
    var goodreadsId = $('#signupGoodreadsId').val();

    if (email == undefined || email == '') {
        console.log('email field cannot be empty');
    } else if (password == undefined || password == '') {
        console.log('Password field cannot be empty');
    } else if (confirmPassword == undefined || confirmPassword == '') {
        console.log('Password field cannot be empty');
    } else if ((anilistId == undefined || anilistId == '') && (goodreadsId == undefined || goodreadsId == '')) {
        console.log('anilist/goodreads field cannot be empty');
    } else {
        if (password == confirmPassword) {
            Database.get('/users?email=' + email, function (data) {
                if (data[0]) {
                    showWarning('A user with the given email address already exists, please try another one');
                } else {
                    var user = {
                        email: email,
                        password: password,
                        anilistId: anilistId,
                        goodreadsId: goodreadsId
                    };
                    Database.post('/users', user, function (data) {
                        if (data) {
                            sessionStorage.setItem('email', data.email);
                            sessionStorage.setItem('anilistId', data.anilistId);
                            sessionStorage.setItem('goodreadsId', data.goodreadsId);
                            window.location.replace('/html/main');
                        }
                    }, function (error) {
                        showError(error);
                    });
                }
            }, function (error) {
                showError(error);
            });
        } else {
            showWarning('Passwords Do Not Match');
        }
    }
}
