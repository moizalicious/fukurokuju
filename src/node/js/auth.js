// import GraphQLClient from 'graphql-request'


// const client = new GraphQLClient('https://graphql.anilist.co', {
//     headers: {
//         'Authorization': 'Bearer ' + accessToken,
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//     },
// })

// // const query = `{
// //   Movie(title: "Inception") {
// //     releaseDate
// //     actors {
// //       name
// //     }
// //   }
// // }`

// var query = `{
//     User(name: "moizalicious") {
//         id
//         name
//         about
//         avatar {
//             large
//             medium
//         }
//     }
// }`;


// client.request(query).then(data => console.log(data))

var accessToken = getAccessToken();

if (accessToken) {
    var query = '{ User(name: "moizalicious"){ id name about avatar { large medium } } }';
    var query2 = '{ Viewer { id name } }';

    // var url = 'https://graphql.anilist.co',
    //     options = {
    //         method: 'POST',
    //         headers: {
    //             'Authorization': 'Bearer ' + accessToken,
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             query: query
    //         })
    //     };

    // fetch(url, options).then(handleResponse/*, handleError*/);

    $.ajax({
        type: 'POST',
        url: 'https://graphql.anilist.co?query='+query2,
        contentType: 'application/json',
        headers: {
            Authorization: 'Bearer ' + accessToken
        },
        // data: query,
        success: function (response) {
            console.log(response);
        }
    });

} else {
    window.location.replace('../index.html');
}

function getParameterByName(name) {
    var match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

function getAccessToken() {
    return getParameterByName('access_token');
}

function handleResponse(response) {
    console.log(response);
}
