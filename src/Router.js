export default class Router {
    constructor(routes, props){
        this.routes = routes;
        this.props = props;
        this.parent = props.parent;
        this.showComponent();
        window.onpopstate = () => this.showComponent();
    } 

    showComponent() {
        const currentPath = window.location.pathname;
        const route = this.routes.find(route => route.path === currentPath);
        if(route) {
            this.props.parent.innerHTML = '';
            new route.component({...this.props});
        }   
    }
}