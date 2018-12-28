import ajaxService from './AJAXService';
export default class ShoppingService {
    constructor(url) {
        this.cartProducts = [];
    }

    getBanners() {
        return ajaxService.get('banners');
    }

    getCategories() {
        return this.categories || ajaxService.get('categories').then(res => {
            this.categories = res.data;
            return res;
        });
    }

    getHomePageInfo() {
        return Promise.all([this.getBanners(), this.getCategories()]);
    }

    getProducts() {
        return ajaxService.get('products');
    }

    getProductsPageInfo() {
        return Promise.all([this.getProducts(), this.getCategories()]);
    }

    getCartIProducts() {
        return this.cartProducts;
    }

    addProductToCart(item) {
        ajaxService.post('/addToCart', item)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
}