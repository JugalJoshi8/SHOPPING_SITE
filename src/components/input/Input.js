import { validateEmail} from './../../utils/Utils';

export default class Input {
    constructor(props) {
        this.parent = props.parent;
        this.type = props.type;
        this.value = props.value;
        this.minlength = props.minlength;
        this.maxlength = props.maxlength;
        this.props = props;
        this.render();
        return this;
    }

    val() {
        return this.input.val();
    }

    isValid() {
        if (this.type === 'email' && !validateEmail(this.input.val())) {
            return false;
        }
        if (this.minlength && this.input.val().length < this.minlength) {
            return false;
        }
        if (this.maxlength && this.input.val().length > this.maxlength) {
            return false;
        }
        if(this.input.val().trim().length < 1) {
            return false;
        }
        if(this.type === 'confirm-password' && this.input.val() !== this.props.passwordInput.val()) {
            return false;
        }
        return true;
    }

    checkForValidation() {
        if (this.isValid()) {
            this.input.removeClass('invalid');
            this.invalidInput.addClass('hide');
            return true;
        }
        else {
            this.input.addClass('invalid');
            this.invalidInput.removeClass('hide');
            return false;
        }

    }

    render() {
        let markup = null;
        switch (this.type) {
            case 'first-name':
                markup = `
                <label class = 'hidden-label' for="first-name">First Name</label>
                <input class = 'bold-txt input block mb1 p1' placeholder = 'First Name' id = ${this.type} name = 'first-name' type="text">
                <div class = 'invalid-${this.type} hide mb1'>Please Enter First Name</div>
                `;
                break;
            case 'last-name':
                markup = `
                <label class = 'hidden-label' for="last-name">Last Name</label>
                <input class = 'bold-txt input block mb1 p1' placeholder = 'Last Name' id = ${this.type} name = 'last-name' type="text">
                <div class = 'invalid-${this.type} hide mb1'>Please Enter Last Name</div>
                `;
                break;
            case 'email':
                markup = `
                <label class = 'hidden-label' for="email">Email</label>
                <input class = 'bold-txt input block mb1 p1' placeholder = 'Email' id = ${this.type} name = 'email' type="email">
                <div class = 'invalid-${this.type} hide mb1'>Please Enter Valid Email</div>
                `;
                break;
            case 'password':
                markup = `
                    <label class = 'hidden-label' for="password" >Password</label>
                    <input  id = ${this.type} name = 'password' class = 'p1 input mb1 bold-txt' placeholder = 'Password' type="password">
                    <div class = 'invalid-${this.type} hide mb1'>Password must be between 6-14 characters</div>
                `;
                break;
            case 'confirm-password':
                markup = `
                    <label class = 'hidden-label' for="confirm-password" name = 'password'>Confirm Password</label>
                    <input  id = ${this.type} name = 'confirm-password' class = 'p1 input mb1 bold-txt' placeholder = 'Confirm Password' type="password">
                    <div class = 'invalid-${this.type} hide mb1'>Passwords do not match</div>
                `;
                break;
            case 'submit':
                markup = `
                <input class = 'input block white-txt bold-txt mt1' type = 'submit' value = '${this.value}'>
                `;
                break;
            default:
                break;
        }
        this.parent.append(markup);
        this.input = $(`#${this.type}`);
        this.invalidInput = $(`.invalid-${this.type}`);
        if (this.minlength) {
            this.input.attr('minlength', this.minlength);
        }
        if (this.maxlength) {
            this.input.attr('maxlength', this.maxlength);
        }
        this.input.on('focus', e => {
            this.input.removeClass('invalid');
        });
        this.input.on('blur', e => {
            this.checkForValidation();
        });
        return this.input;
    }
}