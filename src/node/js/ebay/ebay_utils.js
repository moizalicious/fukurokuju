class EbayUtils {

    static handleEbayItemRequest(response) {
        console.log(response.findItemsByKeywordsResponse[0].searchResult[0]);
    }

}
