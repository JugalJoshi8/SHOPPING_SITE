import shoppingService from './../../services/ShoppingService';
import ShoppingHeader from './../shopping-header/ShoppingHeader';
import ShoppingFooter from './../shopping-footer/ShoppingFooter';
import Product from './../product/Product';
import {addEvents} from './../../services/Utils';
import CartDetails from './../cart-details/CartDetails';

export default class Products {
    constructor(props) {
        this.props = props;
        this.parent = props.parent;
        this.shoppingService = shoppingService;
        this.addProductToCart = this.addProductToCart.bind(this);
        this.onCartClick = this.onCartClick.bind(this);
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
                    handler: e => this.onCategorySelect(e, true)
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

    addProductToCart(product) {
        this.shoppingService.addItemToCart(product);
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
        this.onCategorySelect(e, false);
        this.categorySelect.innerText = e.target.innerHTML;
        this.categoryOptions.querySelectorAll('li').forEach(li => li.setAttribute('aria-selected', false));
        e.target.setAttribute('aria-selected', true);
        this.hideCategoryDropdown();
    }

    onCategorySelect(e, navClick) {
        if(Array.from(e.target.classList).indexOf('selected') > -1) {
            e.target.classList.remove('selected');
            this.filteredProducts = this.products;

        }
        else {
            const listItems = navClick ? this.categoryListItems : this.categoryDropdownItems; 
            Array.from(listItems).forEach(li => li.classList.remove('selected'));
            e.target.classList.add('selected');
            const categoryId = e.target.getAttribute('category-id');
            this.filteredProducts = this.products.filter(product => product.category === categoryId);
        }
        this.productCntr.innerHTML = '';
        this.filteredProducts.forEach(product => {
            new Product({parent: this.productCntr, product, addProductToCart: this.addProductToCart});
        });
    }

    onCartClick() {
        this.cartDetails.show();
    }

    render() {
        const markup = `
            <article class = 'products flex flex--v'>
                <section id = 'header-cntr'></section>
                <div aria-haspopup="listbox" id = 'category-select' tabindex="0" aria-autocomplete="none" class = 'button button--primary category__select' role="combobox" aria-owns="category-list" aria-expanded="false" aria-labelledby="category-select">Select a Category</div>
                <div class = 'category-options'>
                    <ul  role="listbox" id = 'category-list' class = 'category-list' aria-label = 'Select a Category'>
                        ${this.categories.map(category => `<li role="option" category-id = ${category.id} class = "light-bg p1 lg-txt category-list__option bold-txt">${category.name}</li>`).join('')}
                    </ul>
                </div>
                <article class = 'flex flex--ast flex1 o-auto'>
                    <nav class = 'flex1 products__nav'>
                        <ul class = 'category-list' role="listbox">
                            ${this.categories.map(category => `<li category-id = ${category.id} class = "category-list__item bold-txt">${category.name}</li>`).join('')}
                        </ul>
                    </nav>
                    <section class = 'flex5'>
                        <section id = 'product-cntr' class = 'flex'></section>
                        <footer class = 'center-txt pl0 light-bg' ></footer>
                    <section>
                </article>
                <article id = 'cart-details-cntr'>
                </article>
            </article>
        `;
        this.parent.innerHTML = markup;
        this.productCntr = this.parent.querySelector('#product-cntr');
        this.categorySelect = this.parent.querySelector('#category-select');
        this.categoryOptions = this.parent.querySelector('#category-list');
        this.categoryDropdownItems = this.parent.querySelectorAll('#category-list>li');
        this.categoryListItems = this.parent.querySelectorAll('.category-list__item');
        new ShoppingHeader({...this.props, parent: this.parent.querySelector('#header-cntr'), onCartClick: this.onCartClick});
        new ShoppingFooter({parent: this.parent.querySelector('footer')});
        this.filteredProducts.forEach((product, index) => {
            new Product({parent: this.productCntr, product, addProductToCart: this.addProductToCart, key: index});
        });
        this.cartDetailsCntr = this.parent.querySelector('#cart-details-cntr');
        this.cartDetails = new CartDetails({parent: this.cartDetailsCntr});

    }
}