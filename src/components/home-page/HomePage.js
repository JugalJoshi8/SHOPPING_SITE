import ShoppingService from './../../services/ShoppingService';
import ShoppingHeader from './../shopping-header/ShoppingHeader';
import ShoppingFooter from './../shopping-footer/ShoppingFooter';
import Carousel from './../carousel/Carousel';
import Banner from './../banner/Banner';

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
            <div id = 'home-page'>
                <div id = 'header-cntr'></div>
                <div id = 'carousel-cntr'></div>
                <footer class = 'pr5 pl5' ></footer>
            </div>
        `;
        this.parent.innerHTML = markup;
        new ShoppingHeader({parent: this.parent.querySelector('#header-cntr'), onRegister: _ => this.props.onRegister()});
        new ShoppingFooter({parent: this.parent.querySelector('footer')});
        new Carousel({parent: this.parent.querySelector('#carousel-cntr'), items: this.banners, itemComponent:  Banner});
    }
}