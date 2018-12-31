import CartItem from './../cart-item/CartItem';
import shoppingService from './../../services/ShoppingService';


export default class CartDetails {
    constructor(props) {
        this.props = props;
        this.render();
    }

    render() {
        const items = shoppingService.cartItems;
        const markup = `
            <div class = 'cart-overlay'>
                <div class = 'cart-dtls'>
                    <header class="cart-dtls__header light-txt black-bg pt1 pb1 pl1 pr1 flex flex--jsb">
                        <h2 class = 'light-txt lg-txt bold-txt'>My Cart ${items.length ? (items.length > 1 ? `<span class = 'md-txt normal-txt'>(${items.length} items)</span>` : '<span class = "md-txt normal-txt">(1 item)</span>') : ''}</h2>
                        <button aria-label = 'Close Cart Details' class = 'closeButton'>
                        </button>
                    </header>
                    <ul class = 'cart-items pt1 pb1'>
                    </ul>
                </div>
            </div>
        `;
        this.props.parent.innerHTML = markup;
        this.cartItems = this.props.parent.querySelector('.cart-items');
        items.forEach((item, index) => {
            new CartItem({parent: this.cartItems, item, key: index});
        });
    }
}