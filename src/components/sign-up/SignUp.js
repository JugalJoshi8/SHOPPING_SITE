
import ShoppingHeader from './../shopping-header/ShoppingHeader';
import ShoppingFooter from './../shopping-footer/ShoppingFooter';
import Input from './../input/Input';
import { addEvents } from './../../services/Utils';

export default class SignUp {
    constructor(props) {
        this.parent = props.parent;
        this.props = props;
        this.render();
        this.onFormSubmit = this.onFormSubmit.bind(this);
        addEvents({
            '.signup-form': {
                'name': 'submit',
                'handler': this.onFormSubmit
            }
        }, this.parent);
    }

    onFormSubmit(e) {
        e.preventDefault();
        let isFormValid = true;
        this.inputs.forEach(input => {
            const isInputValid = input.checkForValidation();
            isFormValid = isFormValid && isInputValid;
        });
        if (isFormValid) {
            this.props.onLoginSuccess();
        }
    }

    render() {
        const markup = `
            <div class = 'signup flex flex--v' >
               <div id = header-cntr></div>
               <div class="signup__content flex p2 flex--jc flex--v">
                <div class = 'mr3'>
                    <div class = 'lg-txt bold-txt mb1'>Signup</div>
                    <div>We do not share your personal details with anyone.</div>
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
            </div>
            `;
        this.parent.innerHTML = markup;
        new ShoppingHeader({ parent: this.parent.querySelector('#header-cntr'), onSignIn: _ => this.props.onSignIn() });
        new ShoppingFooter({ parent: this.parent.querySelector('footer') });
        this.inputs = [];
        this.inputs.push(new Input({ type: 'first-name', parent: this.parent.querySelector('.first-name-cntr') }));
        this.inputs.push(new Input({ type: 'last-name', parent: this.parent.querySelector('.last-name-cntr') }));
        this.inputs.push(new Input({ type: 'email', parent: this.parent.querySelector('.email-cntr') }));
        const passwordInput = new Input({ type: 'password', parent: this.parent.querySelector('.password-cntr'), minlength: 6, maxlength: 14 })
        this.inputs.push(passwordInput);
        this.inputs.push(new Input({ type: 'confirm-password', parent: this.parent.querySelector('.confirm-password-cntr'), minlength: 6, maxlength: 14, passwordInput }));
        new Input({ type: 'submit', parent: this.parent.querySelector('.submit-cntr'), value: 'Signup' });
    }
}