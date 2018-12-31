import { addEvents } from './services/Utils';
import shoppingService from './services/ShoppingService';

export default class Router {
    constructor(routes, props) {
        this.routes = routes;
        this.props = props;
        this.parent = props.parent;
        this.showRouteComponent();
        window.onpopstate = () => this.showRouteComponent();
        addEvents({
            '#child-cntr': {
                name: 'click',
                handler: e => {
                    if (e && e.target && e.target.getAttribute('route')) {
                        this.showRouteComponent(e.target.getAttribute('route'))
                    }
                }
            }
        }, document.querySelector('#app'))
    }

    showRouteComponent(path) {
        const currentPath = path || window.location.pathname;
        const route = this.routes.find(route => route.path === currentPath);
        if (route) {
            this.props.parent.innerHTML = '';
            // remove subscribers from previous route
            shoppingService.removeSubscribers();
            new route.component({ ...this.props });
        }
        if(path) {
            window.history.pushState({}, null, path);
        }
    }
}