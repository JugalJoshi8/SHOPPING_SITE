import { validateEmail, addEvents} from './../../services/Utils';

export default class Input {
    constructor(props) {
        this.parent = props.parent;
        this.type = props.type;
        this.value = props.value;
        this.minlength = props.minlength;
        this.maxlength = props.maxlength;
        this.props = props;
        this.render();
        if(this.type !== 'submit') {
            addEvents({
                'input': {
                    'focus': e => {
                        this.input.classList.remove('invalid');
                        this.label.classList.remove('label--hidden');
                    },
                    'blur': e => {
                        this.checkForValidation();
                        this.label.classList.add('label--hidden');
                    }
                }
            }, this.parent);
        }
        return this;
    }

    val() {
        return this.input.value;
    }

    isValid() {
        if (this.type === 'email' && !validateEmail(this.input.value)) {
            return false;
        }
        if (this.minlength && this.input.value.length < this.minlength) {
            return false;
        }
        if (this.maxlength && this.input.value.length > this.maxlength) {
            return false;
        }
        if(this.input.value.trim().length < 1) {
            return false;
        }
        if(this.type === 'confirm-password' && this.input.value !== this.props.passwordInput.val()) {
            return false;
        }
        return true;
    }

    checkForValidation() {
        if (this.isValid()) {
            this.input.classList.remove('invalid');
            this.invalidInput.classList.add('hide');
            return true;
        }
        else {
            this.input.classList.add('invalid');
            this.invalidInput.classList.remove('hide');
            return false;
        }

    }

    render() {
        let markup = null;
        switch (this.type) {
            case 'first-name':
                markup = `
                <label id = label-${this.type} class = 'label--hidden label' for="${this.type}">First Name</label>
                <input class = 'bold-txt input block mb1 p1' placeholder = 'First Name' id = ${this.type} name = 'first-name' type="text">
                <div class = 'invalid-${this.type} hide mb1'>Please Enter First Name</div>
                `;
                break;
            case 'last-name':
                markup = `
                <label id = label-${this.type} class = 'label--hidden label' for="${this.type}">Last Name</label>
                <input class = 'bold-txt input block mb1 p1' placeholder = 'Last Name' id = ${this.type} name = 'last-name' type="text">
                <div class = 'invalid-${this.type} hide mb1'>Please Enter Last Name</div>
                `;
                break;
            case 'email':
                markup = `
                <label id = label-${this.type} class = 'label--hidden label' for="${this.type}">Email</label>
                <input class = 'bold-txt input block mb1 p1' placeholder = 'Email' id = ${this.type} name = 'email' type="email">
                <div class = 'invalid-${this.type} hide mb1'>Please Enter Valid Email</div>
                `;
                break;
            case 'password':
                markup = `
                    <label id = label-${this.type} class = 'label--hidden label' for="${this.type}" >Password</label>
                    <input  id = ${this.type} name = 'password' class = 'p1 input mb1 bold-txt' placeholder = 'Password' type="password">
                    <div class = 'invalid-${this.type} hide mb1'>Password must be between 6-14 characters</div>
                `;
                break;
            case 'confirm-password':
                markup = `
                    <label id = label-${this.type} class = 'label--hidden label' for="${this.type}" name = 'password'>Confirm Password</label>
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
        this.parent.innerHTML = markup
        this.input = this.parent.querySelector(`#${this.type}`);
        this.invalidInput = this.parent.querySelector(`.invalid-${this.type}`);
        this.label = this.parent.querySelector(`#label-${this.type}`);
        if (this.minlength) {
            this.input.setAttribute('minlength', this.minlength);
        }
        if (this.maxlength) {
            this.input.setAttribute('maxlength', this.maxlength);
        }
        return this.input;
    }
}