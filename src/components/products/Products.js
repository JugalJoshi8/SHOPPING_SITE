import ShoppingService from './../../services/ShoppingService';
import ShoppingHeader from './../shopping-header/ShoppingHeader';
import ShoppingFooter from './../shopping-footer/ShoppingFooter';
import Product from './../product/Product';

export default class HomePage {
    constructor(props) {
        this.props = props;
        this.parent = props.parent;
        this.shoppingService = new ShoppingService();
        this.shoppingService.getProducts().then(res => {
            this.products = res.data;
            this.render();
            console.log(this.products);
        });
    }

    render() {
        const markup = `
            <article id = 'home-page'>
                <section id = 'header-cntr'></section>
                <section id = 'carousel-cntr'></section>
                <section id = 'product-cntr' class = 'flex'></section>
                <footer class = 'pr5 pl5 center-txt' ></footer>
            </article>
        `;
        this.parent.innerHTML = markup;
        this.productCntr = this.parent.querySelector('#product-cntr');
        new ShoppingHeader({...this.props, parent: this.parent.querySelector('#header-cntr')});
        new ShoppingFooter({parent: this.parent.querySelector('footer')});
        this.products.forEach(product => {
            new Product({parent: this.productCntr, product});
        });
    }
}