import {addEvents} from './../../services/Utils';
export default class ShoppingHeader {

    constructor(props) {
        this.parent = props.parent;
        this.props = props;
        this.render();
        addEvents({
            '#register': {
                name: 'click',
                handler: _ => this.props.onRegister && this.props.onRegister()
            },
            '#sign-in': {
                name: 'click',
                handler: _ => this.props.onSignIn && this.props.onSignIn() 
            }
        }, this.parent);
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
                        <button id = 'sign-in' class = cart__button>Signin</button>
                        <button id = 'register' class = cart__button>Register</button>
                    </div>
                    <div class = cart>
                        <div class = cartImage></div>
                        <div>0 items</div>
                    </div>
                </div>
            </header>
       `;
       this.parent.innerHTML = markup;
    }
}