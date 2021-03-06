
import ShoppingHeader from './../shopping-header/ShoppingHeader';
import ShoppingFooter from './../shopping-footer/ShoppingFooter';
import Input from './../input/Input'; 
import {addEvents} from './../../services/Utils';
import router from './../../Router';
import CartDetails from './../cart-details/CartDetails';

export default class Login {
    constructor(props) {
        this.parent = props.parent;
        this.props = props;
        this.onCartClick = this.onCartClick.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.render();
        addEvents({
            '.login-form' : {
                'name': 'submit',
                'handler': this.onFormSubmit
            }
        }, this.parent);
    }

    onCartClick() {
        this.cartDetails.show();
    }

    onFormSubmit(e) {
        e.preventDefault();
        let isFormValid = true;
        this.inputs.forEach(input => {
            const isInputValid = input.checkForValidation();
            isFormValid = isFormValid && isInputValid;
        });
        if(isFormValid) {
           router.showRouteComponent('/homepage');
        }
    }

    render() {
        const markup = `
            <section class = 'login flex flex--v' >
               <div id = header-cntr></div>
               <div class="login__content flex p2 flex--jc flex--v">
                <div class = 'mr3'>
                    <h1 class = 'xl-txt bold-txt mb1 dark-txt'>Login</h1>
                    <h2 class = 'md-txt bold-txt dark-txt'>Get access to your Orders, Wishlist and Recommendations</h2>
                </div>
                <form class = 'login-form'>
                    <div class = 'email-cntr'>
                    
                    </div>
                    <div class = 'password-cntr'>
                    
                    </div>
                    <div class = 'submit-cntr'>
                    
                    </div>
                </form>
               </div>
               <footer class = 'pr5 pl5' ></footer>
               <article role="region" id = 'cart-details-cntr' aria-live="polite">
                </article>
            </section>
            `;
        this.parent.innerHTML = markup;
        new ShoppingHeader({...this.props, parent: this.parent.querySelector('#header-cntr'), onCartClick: this.onCartClick});
        new ShoppingFooter({parent: this.parent.querySelector('footer')});
        this.inputs = [];
        this.inputs.push(new Input({type: 'email', parent: this.parent.querySelector('.email-cntr')}));
        this.inputs.push(new Input({type: 'password', parent: this.parent.querySelector('.password-cntr'), minlength: 6, alphanumeric: true, noSpaces: true}));
        new Input({type: 'submit', parent: this.parent.querySelector('.submit-cntr'), value: 'Login'});
        this.cartDetailsCntr = this.parent.querySelector('#cart-details-cntr');
        this.cartDetails = new CartDetails({ parent: this.cartDetailsCntr });
    }
}