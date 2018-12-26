import ShoppingService from './../../services/ShoppingService';
import ShoppingHeader from './../shopping-header/ShoppingHeader';
import ShoppingFooter from './../shopping-footer/ShoppingFooter';
import Carousel from './../carousel/Carousel';
import Banner from './../banner/Banner';
import Category from './../category/Category';

export default class HomePage {
    constructor(props) {
        this.props = props;
        this.parent = props.parent;
        this.shoppingService = new ShoppingService();
        this.shoppingService.getHomePageInfo().then(res => {
            this.banners = res[0].data;
            this.categories = res[1].data;
            this.render();
        });
    }

    render() {
        const markup = `
            <article id = 'home-page'>
                <section id = 'header-cntr'></section>
                <section id = 'carousel-cntr'></section>
                <section id = 'category-cntr'></section>
                <footer class = 'pr5 pl5 center-txt' ></footer>
            </article>
        `;
        this.parent.innerHTML = markup;
        this.categoryCntr = this.parent.querySelector('#category-cntr');
        new ShoppingHeader({parent: this.parent.querySelector('#header-cntr'), onRegister: _ => this.props.onRegister()});
        new ShoppingFooter({parent: this.parent.querySelector('footer')});
        new Carousel({parent: this.parent.querySelector('#carousel-cntr'), items: this.banners, itemComponent:  Banner});
        this.categories.forEach(category => {
            if(category.enabled) {
                new Category({parent: this.categoryCntr, category});
            }
        });
    }
}