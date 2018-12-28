import ajaxService from './AJAXService';
class ShoppingService {
    constructor(url) {
        this.cartProducts = [];
    }

    getBanners() {
        return this.banners || ajaxService.get('banners').then(res => {
            this.banners = res;
            return res;
        });
    }

    getCategories() {
        return this.categories || ajaxService.get('categories').then(res => {
            this.categories = res;
            return res;
        });
    }

    getHomePageInfo() {
        return Promise.all([this.getBanners(), this.getCategories()]);
    }

    getProducts() {
        return this.products || ajaxService.get('products').then(res => {
            this.products = res;
            return res;
        });;
    }

    getProductsPageInfo() {
        return Promise.all([this.getProducts(), this.getCategories()]);
    }

    getCartIProducts() {
        return this.cartProducts;
    }

    addProductToCart(product) {
        return ajaxService.post('/addToCart', product)
          .then(_ => {
              this.cartProducts.push(product);
              return this.cartProducts;
          })
          .catch(_ => console.log('Error occurred when adding product to cart'));
    }
}

const shoppingService = new ShoppingService();

export default shoppingService;