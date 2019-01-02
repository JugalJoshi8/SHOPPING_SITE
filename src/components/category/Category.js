export default class Category {
    constructor(props) {
        this.props = props;
        this.category = props.category;
        this.render();
    }

    render() {
        const markup = `
            <section class = 'category flex flex--ac flex--jsa half-shadow'>
                <img class = 'category__img' src = dist${this.category.imageUrl} alt = '${this.category.name}'>
                <div class = 'category__details flex flex--v flex--ac'>
                    <h1 class = 'mb1 lg-txt bold-txt'>${this.category.name}</h2>
                    <h2 class = 'mb2 center-txt normal-txt md-txt'>${this.category.description}</h2>
                    <button class = 'button button--primary bold-txt lg-txt'>Explore ${this.category.key}</button>
                </div>
            </section>
        `;
        this.props.parent.innerHTML += markup;
    }
}