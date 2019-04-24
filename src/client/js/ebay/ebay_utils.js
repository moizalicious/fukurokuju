var i = 0;
var rowNo = 0;

class EbayUtils {

    static handleEbayItemRequest(response) {

        if ($('#recommendations').hasClass('d-flex')) {
            $('#recommendations').removeClass('d-flex');
            $('#recommendations').html('');
        }

        var items = response.findItemsByKeywordsResponse[0].searchResult[0].item;
        console.log(items);
        if (items) {
            items.forEach(function (item) {
                if ((i % 3) == 0) {
                    $('#recommendations').append('<div id="row' + rowNo + '" class="row p-3"></div>');
                }
    
                $('#row' + rowNo).append(
                    '<div class="col">' +
                    '<div class="card" style="width: 18rem;">' +
                    '<img src="' + item.galleryURL[0] + '" class="card-img-top" alt="' + item.galleryURL[0] + '">' +
                    '<div class="card-body">' +
                    '<h5 class="card-title">' + item.title[0] + '</h5>' +
                    '<p class="card-text">Ebay Item</p>' +
                    '<a href="' + item.viewItemURL[0] + '" class="btn btn-primary">See Item</a>' +
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
