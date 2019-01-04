import ajaxService from './../../services/AJAXService';
import Spinner from './../spinner/Spinner';

const serviceHandler = (component) => {
    return class {
        constructor(props) {
            this.props = props;
            this.parent = props.parent;
            this.reqIntceptor = ajaxService.interceptors.request.use((request) => {
                this.spinner.classList.remove('hide');
                return request;
            });

            this.resIntceptor = ajaxService.interceptors.response.use((response) => {
                this.spinner.classList.add('hide');
                return response;
            }, () => {
                this.spinner.classList.add('hide');
            });
            const markup = `
                <div id = 'router'>
                    <div class = 'hide' id = 'spinner'></div>
                    <div id = 'component'></div>
                </div>
            `;
            this.parent.innerHTML = markup;
            this.spinner = this.parent.querySelector('#spinner');
            this.component = this.parent.querySelector('#component');
            new component({...this.props, parent: this.component});
            new Spinner({...this.props, parent: this.spinner});
        }
    }
}

export default serviceHandler;