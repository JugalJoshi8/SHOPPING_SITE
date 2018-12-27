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
                },
                '#category-select': {
                    name: 'click',
                    handler: e => this.onCategoryDropdownClick(e)
                },
                '.category-list__option': {
                    name: 'click',
                    handler: e => this.onCategoryDropdownSelect(e)
                },
                '.products': {
                    name: 'click',
                    handler: e => this.hideCategoryDropdown()
                }
            }, this.parent);
        });
    }

    hideCategoryDropdown() {
        if(this.categorySelect.getAttribute('aria-expanded')) {
            this.categorySelect.setAttribute('aria-expanded', false);
            this.categoryOptions.classList.remove('show-options');
        }
    }

    onCategoryDropdownClick(e) {
        e.stopPropagation();
        const isExpanded = this.categorySelect.getAttribute('aria-expanded');
        if(isExpanded === "false") {
            this.categorySelect.setAttribute('aria-expanded', true);
            this.categoryOptions.classList.add('show-options');
        }
        else {
            this.hideCategoryDropdown();
        }
    }

    onCategoryDropdownSelect(e) {
        e.stopPropagation();
        this.hideCategoryDropdown();
        this.onCategorySelect(e);
        this.categorySelect.innerText = e.target.innerHTML;
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
                <div id = 'category-select' tabindex="0" aria-autocomplete="none" class = 'button button--primary category__select' role="combobox" aria-owns="category-list" aria-expanded="false" aria-label="Select a Category">Select a Category</div>
                <div class = 'category-options'>
                    <ul id = 'category-list' class = 'category-list'>
                        ${this.categories.map(category => `<li role="option" category-id = ${category.id} class = "light-bg p1 lg-txt category-list__option bold-txt">${category.name}</li>`).join('')}
                    </ul>
                </div>
                <article class = 'flex flex--ast'>
                    <nav class = 'flex1 products__nav'>
                        <ul class = 'category-list' role="listbox">
                            ${this.categories.map(category => `<li category-id = ${category.id} class = "category-list__item bold-txt">${category.name}</li>`).join('')}
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
        this.categorySelect = this.parent.querySelector('#category-select');
        this.categoryOptions = this.parent.querySelector('#category-list');
        new ShoppingHeader({...this.props, parent: this.parent.querySelector('#header-cntr')});
        new ShoppingFooter({parent: this.parent.querySelector('footer')});
        this.filteredProducts.forEach(product => {
            new Product({parent: this.productCntr, product});
        });
    }
}