export default class Banner {
    constructor(props) {
        this.banner = props.item;
        this.parent = props.parent;
        this.props = props;
        this.render();
    }

    render() {
        
        const markup = `
            <div class = 'banner' id = 'banner-${this.props.key}'>
                <img class = 'banner__img' src = dist${this.banner.bannerImageUrl} alt ='${this.banner.bannerImageAlt}'>
            </div>
        `;
        this.parent.innerHTML += markup;
    }
}