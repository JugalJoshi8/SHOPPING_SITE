import CartItem from './../cart-item/CartItem';
import shoppingService from './../../services/ShoppingService';
import {addEvents} from './../../services/Utils';


export default class CartDetails {
    constructor(props) {
        this.props = props;
        shoppingService.addCartSubscriber(this.onCartUpdate.bind(this));
        this.render();
        addEvents({
            '.close-button, #checkout, #start-shopping': {
                'name': 'click',
                'handler': _ =>  { 
                    this.overlay.classList.add('scale0');
                    this.overlay.setAttribute('aria-hidden', 'true');
                    this.previousActiveElement && this.previousActiveElement.focus();
                }
            }
        }, this.props.parent);
        //this.overlay.classList.add('scale0');
        
    }

    show() {
        this.previousActiveElement = document.activeElement;
        this.overlay.classList.remove('scale0');
        this.overlay.setAttribute('aria-hidden', 'false');
        this.closeBtn.focus();
    }

    onCartUpdate({cartItems, cartItemsLength, changedItem, totalPrice}) {
        if(!changedItem) {
            this.cartItems.innerHTML = '';
            cartItems.forEach((item, index) => {
                new CartItem({parent: this.cartItems, item, key: index});
            });
        }
        this.cartHeader.innerHTML = `My Cart ${cartItemsLength ? (cartItemsLength > 1 ? `<span class = 'md-txt normal-txt'>(${cartItemsLength} items)</span>` : '<span class = "md-txt normal-txt">(1 item)</span>') : ''}`;
        if(cartItemsLength) {
            this.cart.classList.remove('hide');
            this.emptyCart.classList.add('hide');
        }
        else {
            this.cart.classList.add('hide');
            this.emptyCart.classList.remove('hide');
        }
        this.totalPrice.innerHTML = 'Rs.' + totalPrice;
    }

    render() {
        const items = shoppingService.cartItems;
        const cartItemsLength = shoppingService.cartItemsLength;
        const totalPrice = shoppingService.totalPrice;
        const markup = `
            <div role = 'dialog' class = 'cart-overlay scale0 aria-hidden = true'>
                <div class = 'cart-dtls flex flex--v'>
                    <header class="cart-dtls__header pt1 pb1 pl1 pr1 flex flex--jsb">
                        <h1 class = 'cart-header lg-txt bold-txt'>My Cart ${cartItemsLength ? (cartItemsLength > 1 ? `<span class = 'md-txt normal-txt'>(${cartItemsLength} items)</span>` : '<span class = "md-txt normal-txt">(1 item)</span>') : ''}</h2>
                        <button aria-label = 'Close Cart Details' class = 'close-button'>
                        </button>
                    </header>
                    <div id = 'full-cart' class = 'flex flex1 flex--v'>
                        <div class = 'flex1 o-auto'>
                            <ul class = 'cart-items pt1 flex1'>
                            </ul>
                            <div class = 'cart-dtls__cheap ml1 mr1 mb1 pt1 pb1 white-bg'>You won't find it cheaper anywhere</div>
                        </div>
                        <div class = 'white-bg dark-txt p1 cart-dtls__checkout center-txt'>
                            <div class = 'mb1'>Promo code can be applied on payment page</div>
                            <button id = 'checkout' class = 'button button--primary flex flex--jsb'>
                                <div class = 'pl1'>Proceed to Checkout</div>
                                <div class = 'pr1 flex flex--ac'><span class = 'total-price'>Rs.${totalPrice}</span><span class = 'ml1 right-arrow'></span></div>
                            </button>
                        </div>
                    </div>
                    <div id = 'empty-cart' class = 'flex flex1 flex--v p1 white-bg'>
                        <div class = 'flex1 flex flex--v flex--jc center-txt'>
                            <h2 class = 'bold-txt lg-xt dark-txt'>No items in your cart</h2>
                            <h3 class = 'md-txt light-dark-txt'>Your favourite items are just a click away</h3>
                        </div>
                        <button id = 'start-shopping' class = 'button button--primary'>Start Shopping</button>
                    </div>
                </div>
            </div>
        `;
        this.props.parent.innerHTML = markup;
        this.cartItems = this.props.parent.querySelector('.cart-items');
        items.forEach((item, index) => {
            new CartItem({parent: this.cartItems, item, key: index});
        });
        this.cartHeader = this.props.parent.querySelector('.cart-header');
        this.overlay = this.props.parent.querySelector('.cart-overlay');
        this.totalPrice = this.props.parent.querySelector('.total-price');
        this.cart = this.props.parent.querySelector('#full-cart');
        this.emptyCart = this.props.parent.querySelector('#empty-cart');
        this.closeBtn = this.props.parent.querySelector('.close-button');
        if(items.length) {
            this.cart.classList.remove('hide');
            this.emptyCart.classList.add('hide');
        }
        else {
            this.cart.classList.add('hide');
            this.emptyCart.classList.remove('hide');
        }
        // stop intial load animation
        setTimeout(_ => {
            this.overlay.classList.add('animate');
        }, 100);
    }
}