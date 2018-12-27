import ajaxService from './AJAXService';
export default class ShoppingService {
    constructor(url) {

    }

    getBanners() {
        return ajaxService.get('banners');
    }

    getCategories() {
        return this.categories || ajaxService.get('categories').then(res => {
            this.categories = res.data;
            return res;
        });
    }

    getHomePageInfo() {
        return Promise.all([this.getBanners(), this.getCategories()]);
    }

    getProducts() {
        return ajaxService.get('products');
    }

    getProductsPageInfo() {
        return Promise.all([this.getProducts(), this.getCategories()]);
    }
}