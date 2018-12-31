import ajaxService from './AJAXService';
class ShoppingService {
    constructor(url) {
        this.cartItems = [];
        this.cartItemsLength = 0;
        this.cartSubscribers = [];
        this.totalPrice = 0;
    }

    addCartSubscriber(func) {
        this.cartSubscribers.push(func);
    }

    notifyCartSubscribers(changedItem) {
        this.cartSubscribers.forEach(func => func({cartItems: this.cartItems, cartItemsLength: this.cartItemsLength, changedItem, totalPrice: this.totalPrice}));
    }

    removeSubscribers() {
        this.cartSubscribers = [];
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
              this.totalPrice += item.price;
              this.notifyCartSubscribers(existingItem);
              return this.cartItemsLength;
          })
          .catch(_ => console.log('Error occurred when adding Item to cart'));
    }

    increaseItemQuantity(item) {
        item.quantity++;
        this.cartItemsLength++;
        this.totalPrice += item.price;
        this.notifyCartSubscribers(item);
    }

    decreaseItemQuantity(item) {
        item.quantity--;
        this.cartItemsLength--;
        this.totalPrice -= item.price;
        if(item.quantity === 0) {
            this.cartItems.splice(this.cartItems.findIndex(cartItem => item.id === cartItem.id));
        }
        this.notifyCartSubscribers(item);
    }
}

const shoppingService = new ShoppingService();

export default shoppingService;