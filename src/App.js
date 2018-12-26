import Login from './components/login/Login';
import SignUp from './components/sign-up/SignUp';
import HomePage from './components/home-page/HomePage';
import './styles/styles.scss';

class App {
  constructor({parent}) {
    this.parent = parent;
    this.render();
  }

  onLoginSuccess() {
    this.childContainer.innerHTML = '';
    new HomePage({parent: this.childContainer});
  }

  onRegister() {
    this.childContainer.innerHTML = '';
    new SignUp({parent: this.childContainer, onLoginSuccess: _ => this.onLoginSuccess(),  onSignIn: _ => this.onSignIn()});
  }

  onSignIn() {
    this.childContainer.innerHTML = '';
    new Login({parent: this.childContainer, onLoginSuccess: _ => this.onLoginSuccess(), onRegister: _ => this.onRegister()});
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
    new Login({parent: this.childContainer, onLoginSuccess: _ => this.onLoginSuccess(), onRegister: _ => this.onRegister()});
  }
}

export default App;
