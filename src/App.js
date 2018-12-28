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

  render() {
    const markup = `
        <div id = 'app' class="app p1">
          <div id="child-cntr">
          </div>
        </div>
    `;
    this.parent.innerHTML = markup;
    this.childContainer = document.querySelector('#child-cntr');
    this.childProps = {
      parent: this.childContainer
    }
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
