
import ShoppingHeader from './../shopping-header/ShoppingHeader';
import ShoppingFooter from './../shopping-footer/ShoppingFooter';
import Input from './../input/Input'; 
import SignUp from './../sign-up/SignUp';

export default class Login {
    constructor(props) {
        this.parent = props.parent;
        this.props = props;
        this.render();
    }

    onRegister() {

    }

    render() {
        const markup = `
            <div class = 'login flex flex--v' >
               <div id = header-cntr></div>
               <div class="login__content flex p2 flex--jc flex--v">
                <div class = 'mr3'>
                    <div class = 'lg-txt bold-txt mb1'>Login</div>
                    <div>Get access to your Orders, Wishlist and Recommendations</div>
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
            </div>
            `;
        this.parent.append(markup);
        new ShoppingHeader({parent: $('#header-cntr'), onRegister: _ => this.props.onRegister()});
        new ShoppingFooter({parent: $('footer')});
        this.inputs = [];
        this.inputs.push(new Input({type: 'email', parent: $('.email-cntr')}));
        this.inputs.push(new Input({type: 'password', parent: $('.password-cntr'), minlength: 6, maxlength: 14}));
        new Input({type: 'submit', parent: $('.submit-cntr'), value: 'Login'});
        $('.login-form').on('submit', e => {
            e.preventDefault();
            let isFormValid = true;
            this.inputs.forEach(input => {
                const isInputValid = input.checkForValidation();
                isFormValid = isFormValid && isInputValid;
            });
            if(isFormValid) {
                this.props.onLoginSuccess();
            }
        })
    }
}