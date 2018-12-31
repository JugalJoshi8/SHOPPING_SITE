import CartItem from './../cart-item/CartItem';
import shoppingService from './../../services/ShoppingService';
import {addEvents} from './../../services/Utils';


export default class CartDetails {
    constructor(props) {
        this.props = props;
        shoppingService.addCartSubscriber(this.onCartUpdate.bind(this));
        this.render();
        addEvents({
            '.closeButton': {
                'name': 'click',
                'handler': _ => this.overlay.classList.add('scale0')
            }
        }, this.props.parent);
        this.overlay.classList.add('scale0');
        
    }

    show() {
        this.overlay.classList.remove('scale0');
    }

    onCartUpdate({cartItems, cartItemsLength, changedItem, totalPrice}) {
        if(changedItem) {
            this.cartHeader.innerHTML = `My Cart ${cartItemsLength ? (cartItemsLength > 1 ? `<span class = 'md-txt normal-txt'>(${cartItemsLength} items)</span>` : '<span class = "md-txt normal-txt">(1 item)</span>') : ''}`;
        }
        else {
            this.cartItems.innerHTML = '';
            cartItems.forEach((item, index) => {
                new CartItem({parent: this.cartItems, item, key: index});
            });
        }
    }

    render() {
        const items = shoppingService.cartItems;
        const totalPrice = shoppingService.totalPrice;
        const markup = `
            <div class = 'cart-overlay'>
                <div class = 'cart-dtls'>
                    <header class="cart-dtls__header light-txt black-bg pt1 pb1 pl1 pr1 flex flex--jsb">
                        <h2 class = 'cart-header light-txt lg-txt bold-txt'>My Cart ${items.length ? (items.length > 1 ? `<span class = 'md-txt normal-txt'>(${items.length} items)</span>` : '<span class = "md-txt normal-txt">(1 item)</span>') : ''}</h2>
                        <button aria-label = 'Close Cart Details' class = 'closeButton'>
                        </button>
                    </header>
                    <ul class = 'cart-items pt1'>
                    </ul>
                    <div class = 'cart-dtls__cheap ml1 mr1 mb1 pt1 pb1 white-bg'>Tou won't find it cheaper anywhere</div>
                    <div class = 'white-bg dark-txt p1 cart-dtls__checkout'>
                        <div class = 'mb1'>Promo code can be applied on payment page</div>
                        <button class = 'button button--primary flex flex--jsb'>
                            <div class = 'pl1'>Proceed to Checkout</div>
                            <div class = 'pr1 total-price'>Rs.${totalPrice}<span class = 'pl1'>></span></div>
                        </button>
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
    }
}