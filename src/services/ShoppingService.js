import ajaxService from './AJAXService';
export default class ShoppingService {
    constructor(url) {

    }

    getBanners() {
        return ajaxService.get('banners');
    }

    getCategories() {
        return ajaxService.get('categories');
    }

    getHomePageInfo() {
        return Promise.all([this.getBanners(), this.getCategories()]);
    }

    getProducts() {
        return ajaxService.get('products');
    }
}