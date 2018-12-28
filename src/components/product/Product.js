import {addEvents} from './../../services/Utils';

export default class Product {
    constructor(props) {
        this.props = props;
        this.render();
        addEvents({
            'button': {
                name: 'click',
                handler: _ => this.props.addProductToCart(this.props.product)
            }
        }, this.props.parent);
    }

    render() {
        const product = this.props.product;
        const markup = `
            <div class = 'product flex flex--v p1 mb2'>
                <h2 class = 'product__name dark-txt lg-txt'>${product.name}</h2>
                <div class = 'product__desc'>
                    <img class = 'product__img' src = 'dist${product.imageURL}' alt = '${product.name}'>
                    <div class = 'flex flex--jsb flex--v'>
                        <h3 class = 'md-txt light-dark-txt mb1'>${product.description}</h3>
                        <button class = 'button button--primary product__buy-btn product__buy-btn--mobile'>Buy Now @ Rs.${product.price}</button>                        
                    </div>
                </div>
                <div class = 'flex flex--jsb flex--ac'>
                    <div class = 'product__price'>MRP ${product.price}</div>
                    <button class = 'button button--primary product__buy-btn bold-txt'>
                        <span class = 'small-txt'>Buy Now</span>
                        <span class = 'large-txt'>Buy Now @ Rs.${product.price}</span>
                    </button>
                </div>
            </div>
        `;
        this.props.parent.innerHTML += markup;
    }
}