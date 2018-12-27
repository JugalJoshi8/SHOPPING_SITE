import ShoppingService from './../../services/ShoppingService';
import ShoppingHeader from './../shopping-header/ShoppingHeader';
import ShoppingFooter from './../shopping-footer/ShoppingFooter';
import Product from './../product/Product';
import {addEvents} from './../../services/Utils';

export default class Products {
    constructor(props) {
        this.props = props;
        this.parent = props.parent;
        this.shoppingService = new ShoppingService();
        this.shoppingService.getProductsPageInfo().then(res => {
            this.products = res[0].data;
            this.filteredProducts = [...this.products];
            this.categories = res[1].data.filter(category => category.enabled).map(category => {
                return {name: category.name, id: category.id}
            });
            this.render();
            addEvents({
                '.category-list__item': {
                    name: 'click',
                    handler: e => this.onCategorySelect(e)
                }
            }, this.parent);
        });
    }

    onCategorySelect(e) {
        const categoryId = e.target.getAttribute('category-id');
        this.filteredProducts = this.products.filter(product => product.category === categoryId);
        this.productCntr.innerHTML = '';
        this.filteredProducts.forEach(product => {
            new Product({parent: this.productCntr, product});
        });
    }

    render() {
        const markup = `
            <article id = 'home-page' class = 'products'>
                <section id = 'header-cntr'></section>
                <article class = 'flex flex--ast'>
                    <nav class = 'flex1'>
                        <ul class = 'category-list'>
                            ${this.categories.map(category => `<li category-id = ${category.id} class = "category-list__item">${category.name}</li>`).join('')}
                        </ul>
                    </nav>
                    <article class = 'flex5'>
                        <section id = 'product-cntr' class = 'flex'></section>
                        <footer class = 'center-txt pl0 light-bg' ></footer>
                    <article>
                </article>
            </article>
        `;
        this.parent.innerHTML = markup;
        this.productCntr = this.parent.querySelector('#product-cntr');
        new ShoppingHeader({...this.props, parent: this.parent.querySelector('#header-cntr')});
        new ShoppingFooter({parent: this.parent.querySelector('footer')});
        this.filteredProducts.forEach(product => {
            new Product({parent: this.productCntr, product});
        });
    }
}