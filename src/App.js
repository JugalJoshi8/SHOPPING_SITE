import Login from './components/login/Login';
import SignUp from './components/sign-up/SignUp';
import HomePage from './components/home-page/HomePage';
import Products from './components/products/Products';
import './styles/styles.scss';

class App {
  constructor({parent}) {
    this.parent = parent;
    this.render();
  }

  onLoginSuccess() {
    this.childContainer.innerHTML = '';
    new HomePage(this.childProps);
  }

  onRegister() {
    this.childContainer.innerHTML = '';
    new SignUp(this.childProps);
  }

  onSignIn() {
    this.childContainer.innerHTML = '';
    new Login(this.childProps);
  }

  onProductsClick() {
    this.childContainer.innerHTML = '';
    new Products(this.childProps);
  }

  onHomeClick() {
    this.childContainer.innerHTML = '';
    new HomePage(this.childProps);
  }

  render() {
    const markup =  `
        <div class="app">
          <div id="child-cntr">
          </div>
        </div>
    `;
    this.parent.innerHTML = markup;
    this.childContainer = document.querySelector('#child-cntr');
    this.childProps = {
      parent: this.childContainer,
      onLoginSuccess: _ => this.onLoginSuccess(),
      onRegister: _ => this.onRegister(),
      onSignIn: _ => this.onSignIn(),
      onProductsClick: _ => this.onProductsClick(),
      onHomeClick:  _ => this.onHomeClick()
    }
    //new Login({parent: this.childContainer, onLoginSuccess: _ => this.onLoginSuccess(), onRegister: _ => this.onRegister()});
    //this.onLoginSuccess();
    this.onProductsClick();
  }
}

export default App;
