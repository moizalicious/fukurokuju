var i = 0;
var rowNo = 0;

class EbayUtils {

    static handleEbayItemRequest(response) {

        if ($('#recommendations').hasClass('d-flex')) {
            $('#recommendations').removeClass('d-flex');
            $('#recommendations').html('');
        }

        // console.log(response);
        var items = response.findItemsAdvancedResponse[0].searchResult[0].item;
        // console.log(items);
        if (items) {
            items.forEach(function (item) {
                if ((i % 3) == 0) {
                    $('#recommendations').append('<div id="row' + rowNo + '" class="row p-3"></div>');
                }

                var imageURL = '';
                if (item.pictureURLSuperSize) {
                    imageURL = item.pictureURLSuperSize;
                } else if (item.pictureURLLarge) {
                    imageURL = item.pictureURLLarge;
                } else {
                    imageURL = item.galleryURL;
                }

                $('#row' + rowNo).append(
                    '<div class="col">' +
                    '<div class="card" style="width: 18rem;">' +
                    '<img src="' + imageURL + '" class="card-img-top" alt="' + imageURL + '">' +
                    '<div class="card-body">' +
                    '<h5 class="card-title">' + item.title[0] + '</h5>' +
                    '<a href="' + item.viewItemURL[0] + '" class="btn btn-primary w-100" target="_blank">View Item</a>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                );

                if ((i % 3) == 2) {
                    rowNo++;
                }

                i++;
            });
        }

        if ($('#getRecommendationsButton').is(':disabled')) {
            $('#getRecommendationsButton').prop('disabled', false);
        }
    }

}
