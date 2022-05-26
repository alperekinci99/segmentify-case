class Request {

    constructor() {
        this.xhr = new XMLHttpRequest();
    }

    get(url, callback) {
        this.xhr.open("GET", url);
        this.xhr.onload = function () {
            if (this.status === 200) {
                callback(JSON.parse(this.responseText));
            }
        }
        this.xhr.send();
    }
}

const request = new Request();
request.get("./product-list.json", function (response) {

    // Ürün Kategorileri
    const categories = response.responses[0][0].params.userCategories;
    getLists(categories);

    // Ürünler
    const products = response.responses[0][0].params.recommendedProducts;

    let prodKey = Object.keys(products);

    let indis = 0;
    let keyValue = prodKey[indis];
    let urunler = products[keyValue];
    urunler.forEach(function (urun) {
        getProd(keyValue, urun);
    });

});