const CATEGORIES_URL = "http://localhost:3000/categories";                        // "https://japceibal.github.io/emercado-api/cats/cat.json"
const PUBLISH_PRODUCT_URL = "http://localhost:3000/publish";                      // "https://japceibal.github.io/emercado-api/sell/publish.json"
const PRODUCTS_URL = "http://localhost:3000/products/";                           // "https://japceibal.github.io/emercado-api/cats_products/"
const PRODUCT_INFO_URL = "http://localhost:3000/products-info/";                  // "https://japceibal.github.io/emercado-api/products/"
const PRODUCT_INFO_COMMENTS_URL = "http://localhost:3000/products-comments/";     // "https://japceibal.github.io/emercado-api/products_comments/"
const CART_INFO_URL = "http://localhost:3000/usercart";                           // "https://japceibal.github.io/emercado-api/user_cart/"
const CART_BUY_URL = "http://localhost:3000/usercart/buy";                        // "https://japceibal.github.io/emercado-api/cart/buy.json"
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}