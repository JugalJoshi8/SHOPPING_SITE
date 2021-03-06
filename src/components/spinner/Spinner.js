
export default class Spinner {
    constructor(props) {
        this.parent = props.parent;
        this.render();
    }

    render() {
        const markup = `
            <div class = 'loader-parent'>
                <div class = 'backdrop'></div>
                <div class = 'loader'></div>
            </div>
        `;
        this.parent.innerHTML = markup;
    }
}
