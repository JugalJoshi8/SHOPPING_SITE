export default class Product {
    constructor(props) {
        this.props = props;
        this.render();
    }

    render() {
        const product = this.props.product;
        const markup = `
            <div class = 'product flex flex--v p1'>
                <h2 class = 'product__name dark-txt lg-txt'>${product.name}</h2>
                <img class = 'product__img mb1' src = 'dist${product.imageURL}' alt = '${product.name}'>
                <h3 class = 'md-txt light-dark-txt mb1'>${product.description}</h3>
                <div class = 'flex flex--jsp flex--ac'>
                    <div>MRP ${product.price}</div>
                    <button class = 'button button--primary product__buy-btn bold-txt'>Buy Now</button>
                </div>
            </div>
        `;
        this.props.parent.innerHTML += markup;
    }
}