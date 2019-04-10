class EbayUtils {

    static handleEbayItemRequest(response) {
        var items = response.findItemsByKeywordsResponse[0].searchResult[0].item;
        console.log(items);
        items.forEach(function (item) {
            $('#recommendations').append(
                '<div class="card" style="width: 18rem;">' +
                '<img src="' + item.galleryURL[0] + '" class="card-img-top" alt="' + item.galleryURL[0] + '">' +
                '<div class="card-body">' +
                '<h5 class="card-title">' + item.title[0] + '</h5>' +
                '<p class="card-text">Ebay Item</p>' +
                '<a href="' + item.viewItemURL[0] + '" class="btn btn-primary">See Item</a>' +
                '</div>' +
                '</div>'
            );
        });
    }

}
