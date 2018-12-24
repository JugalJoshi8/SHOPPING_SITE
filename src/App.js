import Login from './components/login/Login';
import './styles/styles.scss';

class App {
  constructor({parent}) {
    this.parent = parent;
    this.render();
  }

  render() {
    const markup =  `
        <div class="app">
          <div id="login-cntr">
          </div>
        </div>
    `;
    this.parent.append(markup);
    new Login({parent: $('#login-cntr')});
  }
}

export default App;
