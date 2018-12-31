import ajaxService from './AJAXService';
class ShoppingService {
    constructor(url) {
        this.cartItems = [];
        this.cartItemsLength = 0;
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

    getCartItems() {
        return this.cartItems;
    }

    addItemToCart(item) {
        return ajaxService.post('/addToCart', item)
          .then(_ => {
              const existingItem = this.cartItems.find(cartItem => cartItem.id === item.id);
              if(existingItem) {
                existingItem.quantity++;
              }
              else {
                this.cartItems.push({...item, quantity: 1});

              }
              this.cartItemsLength++;
              return this.cartItemsLength;
          })
          .catch(_ => console.log('Error occurred when adding Item to cart'));
    }
}

const shoppingService = new ShoppingService();

export default shoppingService;