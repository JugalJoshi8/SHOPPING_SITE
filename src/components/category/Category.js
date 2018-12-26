export default class Category {
    constructor(props) {
        this.props = props;
        this.category = props.category;
        this.render();
    }

    render() {
        const markup = `
            <section class = 'category flex flex--ac p2 flex--jsa'>
                <img class = 'category__img' src = dist${this.category.imageUrl} alt = '${this.category.name}'>
                <div class = 'category__details flex flex--v flex--ac'>
                    <h2 class = 'mb1'>${this.category.name}</h2>
                    <h3 class = 'mb2 normal-txt'>${this.category.description}</h2>
                    <button class = 'button button--primary bold-txt lg-txt'>Explore ${this.category.key}</button>
                </div>
            </section>
        `;
        this.props.parent.innerHTML += markup;
    }
}