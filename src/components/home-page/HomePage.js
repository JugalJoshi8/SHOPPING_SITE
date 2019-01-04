import shoppingService from './../../services/ShoppingService';
import ShoppingHeader from './../shopping-header/ShoppingHeader';
import ShoppingFooter from './../shopping-footer/ShoppingFooter';
import Carousel from './../carousel/Carousel';
import Banner from './../banner/Banner';
import Category from './../category/Category';
import CartDetails from './../cart-details/CartDetails';
import serviceHandler from './../service-handler/ServiceHandler';

 class HomePage {
    constructor(props) {
        this.props = props;
        this.parent = props.parent;
        this.shoppingService = shoppingService;
        this.onCartClick = this.onCartClick.bind(this);
        this.shoppingService.getHomePageInfo().then(res => {
            this.banners = res[0].data;
            this.categories = res[1].data;
            this.render();
        });
    }

    onCartClick() {
        this.cartDetails.show();
    }

    render() {
        const markup = `
            <article id = 'home-page' class = 'flex flex--v'>
                <section id = 'header-cntr'></section>
                <div class = 'o-auto flex1'>
                    <section id = 'carousel-cntr'></section>
                    <section id = 'category-cntr'></section>
                    <footer class = 'center-txt pl1 light-bg' ></footer>
                </div>
                <article role="region" id = 'cart-details-cntr' aria-live="polite">
                </article>
            </article>
        `;
        this.parent.innerHTML = markup;
        this.categoryCntr = this.parent.querySelector('#category-cntr');
        new ShoppingHeader({...this.props, parent: this.parent.querySelector('#header-cntr'), onCartClick: this.onCartClick});
        new ShoppingFooter({parent: this.parent.querySelector('footer')});
        new Carousel({parent: this.parent.querySelector('#carousel-cntr'), items: this.banners, itemComponent:  Banner});
        this.categories.forEach(category => {
            if(category.enabled) {
                new Category({parent: this.categoryCntr, category});
            }
        });
        this.cartDetailsCntr = this.parent.querySelector('#cart-details-cntr');
        this.cartDetails = new CartDetails({parent: this.cartDetailsCntr});
    }
}

export default serviceHandler(HomePage);