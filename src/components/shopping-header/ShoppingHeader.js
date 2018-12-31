import { addEvents } from './../../services/Utils';
import shoppingService from './../../services/ShoppingService';
export default class ShoppingHeader {

    constructor(props) {
        this.parent = props.parent;
        this.props = props;
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

    updateCart(length) {
        this.cartItems.innerHTML = length;
    }

    render() {
        const markup = `
       <div class = 'shopping-header'>     
       <header>
                <div class=logo></div>
                <nav>
                    <ul>
                        <li id = 'home' route = '/homepage'>Home</li>
                        <li id = 'products' route = '/products'>Products</li>
                    </ul>
                </nav>
                <div class = cartBtnCntnr>
                    <div class = btnCntnr>
                        <button id = 'sign-in' route = '/login' class = cart__button>Signin</button>
                        <button id = 'register' route = '/signup' class = cart__button>Register</button>
                    </div>
                    <div class = 'cart' id = 'cart'>
                        <div class = cartImage></div>
                        <div><span id = 'cartItems'>${shoppingService.cartItemsLength || 0}</span> items</div>
                    </div>
                </div>
            </header>
            </div>
       `;
        this.parent.innerHTML = markup;
        this.cartItems = this.parent.querySelector('#cartItems');
    }
}