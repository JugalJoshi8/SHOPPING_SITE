import shoppingService from './../../services/ShoppingService';
import ShoppingHeader from './../shopping-header/ShoppingHeader';
import ShoppingFooter from './../shopping-footer/ShoppingFooter';
import Product from './../product/Product';
import { addEvents } from './../../services/Utils';
import CartDetails from './../cart-details/CartDetails';
import serviceHandler from './../service-handler/ServiceHandler';

class Products {
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
                return { name: category.name, id: category.id }
            });
            this.render();
            addEvents({
                '.category-list__item': {
                    name: 'click',
                    handler: e => this.onCategorySelect(e, true)
                },
                '#category-select': {
                    click: e => this.onCategoryDropdownClick(e, true),
                    keydown: e => this.onCategoryDropdownClick(e)
                },
                '.category-list__option': {
                    name: 'click',
                    handler: e => this.onCategoryDropdownSelect(e)
                },
                '.products': {
                    name: 'click',
                    handler: e => this.hideCategoryDropdown()
                },
                '#category-list': {
                    name: 'keydown',
                    handler: e => this.changeSelectedOption(e)
                }
            }, this.parent);
        });
    }

    changeSelectedOption(e) {
        e.stopPropagation();
        const keyCode = e.keyCode;
        const currentSelected = this.categoryOptions.querySelector('.selected');
        let nextSelected;
        if(keyCode === 40 || keyCode === 38 || keyCode === 36 || keyCode === 35) {
            //down arrow key
            if(keyCode === 40) {
                nextSelected = currentSelected.nextElementSibling ;
            }
            //up arrow key
            else if(keyCode === 38) {
                nextSelected = currentSelected.previousElementSibling ;
            }
             // home key
            else if(keyCode === 36) {
                nextSelected = this.categoryOptions.children[0]
            }
            // end key
            else {
                nextSelected = this.categoryOptions.children[this.categoryOptions.children.length - 1]
            }
            if(nextSelected) {
                currentSelected.classList.remove('selected');
                nextSelected.classList.add('selected');
                this.categoryOptions.setAttribute('aria-activedescendant', nextSelected.getAttribute('id'));
            }
        }
        // enter key
        else if(keyCode === 13) {
            this.onCategoryDropdownSelect({target: currentSelected});
        }
        // escape key
        else if(keyCode === 27) {
            this.hideCategoryDropdown();
        }
        
    }

    onCategoryDropdownClick(e, isClick) {
        e.stopPropagation();
        const isExpanded = this.categorySelect.getAttribute('aria-expanded');
        if (isExpanded === "true") {
            this.hideCategoryDropdown();
        }
        else if (isClick || e.keyCode === 32 || e.keyCode === 13) {
            this.categorySelect.setAttribute('aria-expanded', true);
            this.categoryOptions.classList.add('show-options');
            this.categoryOptions.setAttribute('tabindex', '0');
            this.categoryOptions.focus();
            const selectedOption = this.categoryOptions.querySelector('.selected') || this.categoryOptions.children[0];
            selectedOption.classList.add('selected');
            this.categoryOptions.setAttribute('aria-activedescendant', selectedOption.getAttribute('id'));
        }
    }

    addProductToCart(product) {
        this.shoppingService.addItemToCart(product);
    }

    hideCategoryDropdown() {
        if (this.categorySelect.getAttribute('aria-expanded')) {
            this.categorySelect.setAttribute('aria-expanded', false);
            this.categoryOptions.classList.remove('show-options');
             this.categoryOptions.setAttribute('tabindex', '-1');
            this.categorySelect.focus();
        }
    }

    onCategoryDropdownSelect(e) {
        e.stopPropagation && e.stopPropagation();
        this.onCategorySelect(e, false);
        this.hideCategoryDropdown();
    }

    onCategorySelect(e, navClick) {
        if (e.target.getAttribute('aria-selected') === "true") {
            e.target.classList.remove('selected');
            this.filteredProducts = this.products;
            e.target.setAttribute('aria-selected', "false");
            this.categorySelect.innerHTML = 'Select a Category';
        }
        else {
            Array.from(this.categoryOptions.querySelectorAll('li')).forEach(li => li.setAttribute('aria-selected', 'false'));
            e.target.setAttribute('aria-selected', true);
            this.categorySelect.innerHTML = e.target.innerHTML;
            const listItems = navClick ? this.categoryListItems : this.categoryDropdownItems;
            Array.from(listItems).forEach(li => li.classList.remove('selected'));
            e.target.classList.add('selected');
            const categoryId = e.target.getAttribute('category-id');
            this.filteredProducts = this.products.filter(product => product.category === categoryId);
        }
        this.productCntr.innerHTML = '';
        this.filteredProducts.forEach(product => {
            new Product({ parent: this.productCntr, product, addProductToCart: this.addProductToCart });
        });
        this.categoryOptions.setAttribute('tabindex', '-1');
        this.categorySelect.focus();
    }

    onCartClick() {
        this.cartDetails.show();
    }

    render() {
        const markup = `
            <article class = 'products flex flex--v'>
                <section id = 'header-cntr'></section>
                <label id = 'category-label'>Select a Category</label>
                <div tabindex = "0" aria-haspopup="listbox" id = 'category-select' aria-autocomplete="none" class = 'button button--primary category__select' aria-expanded="false" aria-labelledby = "category-label category-select">Select a Category</div>
                <div class = 'category-options' role="region" aria-live="polite">
                    <ul  tabindex="-1" role="listbox" id = 'category-list' class = 'category-list' aria-labelledby = "category-label">
                        ${this.categories.map(category => `<li id = ${category.id} role="option" category-id = ${category.id} class = "light-bg p1 lg-txt category-list__option bold-txt">${category.name}</li>`).join('')}
                    </ul>
                </div>
                <article class = 'flex flex--ast flex1 o-auto'>
                    <nav class = 'flex1 products__nav'>
                        <ul class = 'category-list' role="listbox">
                            ${this.categories.map(category => `<li><button category-id = ${category.id} class = "category-list__item bold-txt">${category.name}</button></li>`).join('')}
                        </ul>
                    </nav>
                    <section class = 'flex5'>
                        <section id = 'product-cntr' class = 'flex'></section>
                        <footer class = 'center-txt pl0 light-bg' ></footer>
                    <section>
                </article>
                <article role="region" id = 'cart-details-cntr' aria-live="polite">
                </article>
            </article>
        `;
        this.parent.innerHTML = markup;
        this.productCntr = this.parent.querySelector('#product-cntr');
        this.categorySelect = this.parent.querySelector('#category-select');
        this.categoryOptions = this.parent.querySelector('#category-list');
        this.categoryDropdownItems = this.parent.querySelectorAll('#category-list>li');
        this.categoryListItems = this.parent.querySelectorAll('.category-list__item');
        new ShoppingHeader({ ...this.props, parent: this.parent.querySelector('#header-cntr'), onCartClick: this.onCartClick });
        new ShoppingFooter({ parent: this.parent.querySelector('footer') });
        this.filteredProducts.forEach((product, index) => {
            new Product({ parent: this.productCntr, product, addProductToCart: this.addProductToCart, key: index });
        });
        this.cartDetailsCntr = this.parent.querySelector('#cart-details-cntr');
        this.cartDetails = new CartDetails({ parent: this.cartDetailsCntr });

    }
}

export default serviceHandler(Products);