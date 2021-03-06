import { addEvents } from './../../services/Utils';
import shoppingService from './../../services/ShoppingService';
export default class ShoppingHeader {

    constructor(props) {
        this.parent = props.parent;
        this.props = props;
        this.onCartUpdate = this.onCartUpdate.bind(this);
        shoppingService.addCartSubscriber(this.onCartUpdate);
        this.render();
        addEvents({
            '#register': {
                name: 'click',
                handler: _ => this.props.onRegister && this.props.onRegister()
            },
            '#sign-in': {
                name: 'click',
                handler: _ => this.props.onSignIn && this.props.onSignIn()
            },
            '#home': {
                name: 'click',
                handler: _ => this.props.onHomeClick && this.props.onHomeClick()
            },
            '#products': {
                name: 'click',
                handler: _ => this.props.onProductsClick && this.props.onProductsClick()
            },
            '#cart': {
                name: 'click',
                handler: _ => this.props.onCartClick()
            }
        }, this.parent);
    }

    onCartUpdate({cartItemsLength}) {
        this.cartItems.innerHTML = cartItemsLength;
        this.itemsTxt.innerHTML = cartItemsLength == 1 ? ' item' : ' items'; 
    }

    render() {
        const markup = `
       <div class = 'shopping-header'>     
       <header role="banner">
                <div class=logo></div>
                <nav>
                    <ul>
                        <li><button class = 'md-txt' tabindex = 0 role = 'link' id = 'home' route = '/homepage'>Home</button></li>
                        <li><button class = 'md-txt' tabindex = 0 role = 'link' id = 'products' route = '/products'>Products</button></li>
                    </ul>
                </nav>
                <div class = cart-btn-cntnr>
                    <div class = btn-cntnr>
                        <button class = 'md-txt' id = 'sign-in' route = '/login' class = cart__button>Signin</button>
                        <button class = 'md-txt' id = 'register' route = '/signup' class = cart__button>Register</button>
                    </div>
                    <button class = 'cart' id = 'cart'>
                        <div class = cart-image></div>
                        <div><span id = 'cartItems'>${shoppingService.cartItemsLength || 0}</span><span id = 'itemsTxt'> items</span></div>
                    </button>
                </div>
            </header>
            </div>
       `;
        this.parent.innerHTML = markup;
        this.cartItems = this.parent.querySelector('#cartItems');
        this.itemsTxt = this.parent.querySelector('#itemsTxt');
    }
}