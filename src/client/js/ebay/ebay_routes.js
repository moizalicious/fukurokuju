var EbayRoute = {
    GET_ITEMS: '/services/search/FindingService/v1?OPERATION-NAME=findItemsAdvanced&SERVICE-VERSION=1.0.0&SECURITY-APPNAME='+EBAY_CLIENT_ID+'&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&paginationInput.entriesPerPage=10&itemFilter.name=HideDuplicateItems&itemFilter.value=true&outputSelector(0)=PictureURLSuperSize&outputSelector(1)=PictureURLLarge&categoryId=1&keywords='
};

Object.freeze(EbayRoute);

// Anime Collectobiles Category 1345
// Collectibles - 1
// Japanese Anime - 1