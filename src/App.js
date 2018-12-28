import Login from './components/login/Login';
import SignUp from './components/sign-up/SignUp';
import HomePage from './components/home-page/HomePage';
import Products from './components/products/Products';
import Router from './Router';
import './styles/styles.scss';

class App {
  constructor({ parent }) {
    this.parent = parent;
    this.render();
  }

  onLoginSuccess() {
    this.onHomeClick();
  }

  onRegister() {
    window.history.pushState({}, null, 'signup');
    this.router.showComponent();
  }

  onSignIn() {
    window.history.pushState({}, null, 'login');
    this.router.showComponent();
  }

  onProductsClick() {
    window.history.pushState({}, null, 'products');
    this.router.showComponent();
  }

  onHomeClick() {
    window.history.pushState({}, null, 'homepage');
    this.router.showComponent();
  }

  render() {
    const markup = `
        <div class="app p1">
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
      onHomeClick: _ => this.onHomeClick()
    }
    //new Login({parent: this.childContainer, onLoginSuccess: _ => this.onLoginSuccess(), onRegister: _ => this.onRegister()});
    //this.onLoginSuccess();
    //this.onProductsClick();
    const routes = [
      {
        path: '/',
        component: Login
      },
      {
        path: '/login',
        component: Login
      },
      {
        path: '/signup',
        component: SignUp
      },
      {
        path: '/homepage',
        component: HomePage
      },
      {
        path: '/products',
        component: Products
      }
    ];
    this.router = new Router(routes, this.childProps);
  }
}

export default App;
