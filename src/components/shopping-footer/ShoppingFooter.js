export default class ShoppingFooter {
    constructor({parent}) {
        this.parent = parent;
        this.render();
    }

    render() {
        const markup = `
            <div class = 'shopping-footer pt1 pb1'>
                Copyright &copy; 2011-${new Date().getFullYear()} Sabka Bazaar Grocery Supplies Pvt Ltd
            </div>
        `;
        this.parent.innerHTML = markup;
    }
}