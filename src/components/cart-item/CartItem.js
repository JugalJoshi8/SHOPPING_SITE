import { addEvents } from './../../services/Utils';
import shoppingService from './../../services/ShoppingService';

export default class CartItem {
    constructor(props) {
        this.props = props;
        this.render();
        addEvents({
            '.decreaseButton': {
                name: 'click',
                handler: _ => this.decreaseItem()
            },
            '.increaseButton': {
                name: 'click',
                handler: _ => this.increaseItem()
            }
        }, this.element);
    }

    decreaseItem() {
        shoppingService.decreaseItemQuantity(this.props.item);
        this.updateCart();
    }

    increaseItem() {
        shoppingService.increaseItemQuantity(this.props.item);
        this.updateCart();
    }

    updateCart() {
        const item = this.props.item;
        this.quantity.innerHTML = item.quantity;
        this.total.innerHTML = 'Rs.' + (item.price * item.quantity);
        if (item.quantity === 0) {
            this.element.parentNode.removeChild(this.element);
        }
    }

    render() {
        const item = this.props.item;
        const markup = `
            <li class = 'flex cart-item white-bg p2 mb1 flex--ac' id = 'cart-item${this.props.key}'>
                <img class = 'mr1' src = 'dist${item.imageURL}' alt = '${item.name}'>
                <div class = 'flex flex--v flex1'>
                    <h3 class = 'mb1'>${item.name}</h3> 
                    <div class = 'flex dark-txt'>
                        <button aria-label = 'decrease item quantity' class = 'decreaseButton mr1'></button>
                        <div class = 'quantity mr1'>${item.quantity}</div>
                        <button aria-label = 'increase item quantity' class = 'increaseButton mr1'></button>
                        <div class = 'mr1'>&#10006;</div>
                        <div>Rs.${item.price}</div>
                        <div class = 'lg-txt cart-item__total'>
                            Rs.${item.price * item.quantity}
                        </div>
                    </div>
                </div> 

            </li>
        `;
        this.props.parent.insertAdjacentHTML('beforeend', markup);
        this.element = this.props.parent.querySelector(`#cart-item${this.props.key}`);
        this.quantity = this.element.querySelector('.quantity');
        this.total = this.element.querySelector('.cart-item__total');
        this.decreaseBtn = this.element.querySelector('.decreaseButton');
    }
}