
import ShoppingHeader from './../shopping-header/ShoppingHeader';
import ShoppingFooter from './../shopping-footer/ShoppingFooter';
import Input from './../input/Input'; 

export default class SignUp {
    constructor(props) {
        this.parent = props.parent;
        this.props = props;
        this.render();
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
        this.parent.append(markup);
        new ShoppingHeader({parent: $('#header-cntr'), onSignIn: _ => this.props.onSignIn()});
        new ShoppingFooter({parent: $('footer')});
        this.inputs = [];
        this.inputs.push(new Input({type: 'first-name', parent: $('.first-name-cntr')}));
        this.inputs.push(new Input({type: 'last-name', parent: $('.last-name-cntr')}));
        this.inputs.push(new Input({type: 'email', parent: $('.email-cntr')}));
        const passwordInput = new Input({type: 'password', parent: $('.password-cntr'), minlength: 6, maxlength: 14})
        this.inputs.push(passwordInput);
        this.inputs.push(new Input({type: 'confirm-password', parent: $('.confirm-password-cntr'), minlength: 6, maxlength: 14, passwordInput}));
        new Input({type: 'submit', parent: $('.submit-cntr'), value: 'Signup'});
        $('.signup-form').on('submit', e => {
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