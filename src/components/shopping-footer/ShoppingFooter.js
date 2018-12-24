export default class ShoppingFooter {
    constructor({parent}) {
        this.parent = parent;
        this.render();
    }

    render() {
        const markup = `
            <div>
                Copyright &copy; 2011-${new Date().getFullYear()} Sabka Bazaar Grocery Supplies Pvt Ltd
            </div>
        `;
        this.parent.append(markup);
    }
}