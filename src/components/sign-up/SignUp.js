
import ShoppingHeader from './../shopping-header/ShoppingHeader';
import ShoppingFooter from './../shopping-footer/ShoppingFooter';
import Input from './../input/Input';
import { addEvents } from './../../services/Utils';
import router from './../../Router';
import CartDetails from './../cart-details/CartDetails';

export default class SignUp {
    constructor(props) {
        this.parent = props.parent;
        this.props = props;
        this.onCartClick = this.onCartClick.bind(this);
        this.render();
        this.onFormSubmit = this.onFormSubmit.bind(this);
        addEvents({
            '.signup-form': {
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
        if (isFormValid) {
            router.showRouteComponent('/homepage');
        }
    }

    render() {
        const markup = `
            <section class = 'signup flex flex--v' >
               <div id = header-cntr></div>
               <div class="signup__content flex p2 flex--jc flex--v">
                <div class = 'mr3'>
                    <h1 class = 'xl-txt bold-txt mb1 dark-txt'>Signup</h1>
                    <h2 class = 'md-txt bold-txt dark-txt'>We do not share your personal details with anyone.</h2>
                </div>
                <form class = 'signup-form'>
                    <div class = 'first-name-cntr'>
                    
                    </div>
                    <div class = 'last-name-cntr'>
                    
                    </div>
                    <div class = 'email-cntr'>
                    
                    </div>
                    <div class = 'password-cntr'>
                    
                    </div>
                    <div class = 'confirm-password-cntr'>
                    
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
        new ShoppingHeader({ ...this.props, parent: this.parent.querySelector('#header-cntr'), onCartClick: this.onCartClick});
        new ShoppingFooter({ parent: this.parent.querySelector('footer') });
        this.inputs = [];
        this.inputs.push(new Input({ type: 'first-name', parent: this.parent.querySelector('.first-name-cntr') }));
        this.inputs.push(new Input({ type: 'last-name', parent: this.parent.querySelector('.last-name-cntr') }));
        this.inputs.push(new Input({ type: 'email', parent: this.parent.querySelector('.email-cntr') }));
        const passwordInput = new Input({ type: 'password', parent: this.parent.querySelector('.password-cntr'), minlength: 6, alphanumeric: true, noSpaces: true })
        this.inputs.push(passwordInput);
        this.inputs.push(new Input({ type: 'confirm-password', parent: this.parent.querySelector('.confirm-password-cntr'), minlength: 6, alphanumeric: true, noSpaces: true, passwordInput }));
        new Input({ type: 'submit', parent: this.parent.querySelector('.submit-cntr'), value: 'Signup' });
        this.cartDetailsCntr = this.parent.querySelector('#cart-details-cntr');
        this.cartDetails = new CartDetails({ parent: this.cartDetailsCntr });
    }
}