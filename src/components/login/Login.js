
import ShoppingHeader from './../shopping-header/ShoppingHeader';
import ShoppingFooter from './../shopping-footer/ShoppingFooter';
import { validateEmail} from './../../utils/Utils';

export default class Login {
    constructor({parent}) {
        this.parent = parent;
        this.render();
    }
    render() {
        const markup = `
            <div class = 'login flex flex--v' >
               <div id = header-cntr></div>
               <div class="login-content flex p2 flex--jc">
                <div class = 'mr3'>
                    <div class = 'lg-txt bold-txt mb1'>Login</div>
                    <div>Get access to your Orders, Wishlist and Recommendations</div>
                </div>
                <form class = 'login-form'>
                    <label class = 'block mb-half' for="email">Email</label>
                    <input class = 'bold-txt login-form__input block mb1 p1' placeholder = 'Email' id = 'email' name = 'email' type="email">
                    <div id = 'invalid-email' class = 'invalid-input hide mb1'>Please Enter Valid Email</div>
                    <label class = 'hidden-label' for="password" name = 'password'></label>
                    <input  id = 'password' class = 'p1 login-form__input mb1 bold-txt' placeholder = 'Password' type="password">
                    <div id = 'invalid-password' class = 'invalid-input hide mb1'>Password must be between 6-14 characters</div>
                    <input class = 'login-form__input login-form__input--submit block white-txt bold-txt mt1' type = 'submit' value = 'Login'>
                </form>
               </div>
               <footer></footer>
            </div>
            `;
        this.parent.append(markup);
        new ShoppingHeader({parent: $('#header-cntr')});
        new ShoppingFooter({parent: $('footer')});
        this.emailInput = $('#email');
        this.passwordInput = $('#password');
        this.passwordInput.attr('minlength', 6);
        this.passwordInput.attr('maxlength', 14);
        this.invalidEmail = $('#invalid-email');
        this.invalidPassword = $('#invalid-password');
        this.emailInput.on('focus', e => {
            this.emailInput.removeClass('invalid');
        });
        this.emailInput.on('blur', e => {
            if(!validateEmail(this.emailInput.val())) {
                this.emailInput.addClass('invalid');
                this.invalidEmail.removeClass('hide');
            }
            else {
                this.emailInput.removeClass('invalid');
                this.invalidEmail.addClass('hide');
            }
        });

        this.passwordInput.on('focus', e => {
            this.passwordInput.removeClass('invalid');
        });

        this.passwordInput.on('blur', e => {
            if(this.passwordInput.val().length < 6) {
                this.passwordInput.addClass('invalid');
                this.invalidPassword.removeClass('hide');
            }
            else {
                this.passwordInput.removeClass('invalid');
                this.invalidPassword.addClass('hide');
            }
        });



        $('.login-form').on('submit', e => {
            e.preventDefault();
            let isFormValid = true;
            if(!validateEmail(this.emailInput.val())) {
                this.emailInput.addClass('invalid');
                isFormValid = false;
                this.invalidEmail.removeClass('hide');
            }
            if(this.passwordInput.val().length < 6) {
                debugger;
                this.passwordInput.addClass('invalid');
                this.invalidPassword.removeClass('hide');
                isFormValid = false;
            }
        })
    }
}