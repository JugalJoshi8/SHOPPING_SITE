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
    this.childContainer.empty();
    new HomePage({parent: $('#child-cntr')});
  }

  onRegister() {
    this.childContainer.empty();
    new SignUp({parent: $('#child-cntr'), onLoginSuccess: _ => this.onLoginSuccess(),  onSignIn: _ => this.onSignIn()});
  }

  onSignIn() {
    this.childContainer.empty();
    new Login({parent: $('#child-cntr'), onLoginSuccess: _ => this.onLoginSuccess(), onRegister: _ => this.onRegister()});
  }

  render() {
    const markup =  `
        <div class="app">
          <div id="child-cntr">
          </div>
        </div>
    `;
    this.parent.append(markup);
    this.childContainer = $('#child-cntr');
    new Login({parent: $('#child-cntr'), onLoginSuccess: _ => this.onLoginSuccess(), onRegister: _ => this.onRegister()});
  }
}

export default App;
