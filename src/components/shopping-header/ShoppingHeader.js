
export default class ShoppingHeader {

    constructor({parent}) {
        this.parent = parent;
        this.render();
    }
    render() {
       const markup = `
            <header>
                <div class=logo></div>
                <nav>
                    <ul>
                        <li>Home</li>
                        <li>Products</li>
                    </ul>
                </nav>
                <div class = cartBtnCntnr>
                    <div class = btnCntnr>
                        <button class = cart__button>Signin</button>
                        <button class = cart__button>Register</button>
                    </div>
                    <div class = cart>
                        <div class = cartImage></div>
                        <div>0 items</div>
                    </div>
                </div>
            </header>
       `;
       this.parent.append(markup);
    }
}