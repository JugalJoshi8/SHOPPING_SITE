export default class HomePage {
    constructor(props) {
        this.props = props;
        this.render();
    }

    render() {
        const markup = `
            <div>Home Page</div>
        `;
        this.props.parent.innerHTML = markup;
    }
}