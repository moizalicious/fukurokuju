var EbayRoute = {
    GET_ITEMS: '/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&SECURITY-APPNAME='+EBAY_CLIENT_ID+'&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&paginationInput.entriesPerPage=10&keywords='
};

Object.freeze(EbayRoute);
