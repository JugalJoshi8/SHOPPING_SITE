import {addEvents} from './../../services/Utils';

export default class Carousel {
    constructor(props) {
        this.props = props;
        this.touchPointStart = 0;
        this.touchPointEnd = 0;
        this.parent = props.parent;
        this.currentSlide = 0;
        this.totalSlides = this.props.items.length - 1;
        this.carouselWidth = 300;
        this.isSwipe = false;
        this.render();
        addEvents({
            '#prev': {
                name: 'click',
                handler: _ => this.onNavClick(true)
            },
            '#next': {
                name: 'click',
                handler: _ => this.onNavClick(false)
            },
            '.carousel': {
                'mouseenter': _ => this.stopAnimation(),
                'touchstart': e => this.stopAnimation(e),
                'touchmove': e => this.onTouchMove(e),
                'mouseleave': _ => this.startAnimation(),
                'touchend': e => this.startAnimation(e)
            }
        }, this.props.parent);
    }

    onTouchMove(e) {
        this.isSwipe = true;
        if(e && e.touches && e.touches.length) {
            this.touchPointEnd = e.touches[0].pageX;
        }
    }

    render() {
        const markup = `
        <div class = 'carousel'>   
            <div class = 'carousel-content'>
                
            </div>
            <button id = 'prev' class = 'carousel__nav carousel__nav--prev p-half bold-txt lg-txt'>PREV</button>
            <button id = 'next' class = 'carousel__nav carousel__nav--next p-half bold-txt lg-txt'>NEXT</button>
            <div class="flex slide-points">
                ${this.props.items.map(_ => '<div class = "slide-points__point m-half"></div>').join('')}
            </div>
        </div>
        `;
        this.props.parent.innerHTML = markup;
        const ItemComponent = this.props.itemComponent;
        const carouselCntr = this.parent.querySelector('.carousel-content');
        this.props.items.forEach((item, index) => {
            new ItemComponent({parent: carouselCntr, item, key: index});
        });
        this.carouselParent = this.parent.querySelector('.carousel');
        this.carousel = this.parent.querySelector('.carousel-content');
        this.prevButton = this.parent.querySelector('#prev');
        this.nextButton = this.parent.querySelector('#next');
        this.slidePoints = this.parent.querySelector('.slide-points');
        this.showHideNav();
        this.startAnimation();
    }

    onNavClick(isPrev) {
        const translateBy = this.carouselParent.offsetWidth;
        if(isPrev) {
            if(this.currentSlide === 0) {
                return;
            }
            this.currentSlide--;
        }
        else {
            if(this.currentSlide === this.props.items.length - 1) {
                return;
            }
            this.currentSlide++;
        }
        this.showHideNav();
        this.carousel.style.left = `-${this.currentSlide * translateBy}px`;
    }

    showHideNav() {
        if(this.currentSlide <= 0) {
            this.prevButton.disabled = true;
        }
        else {
            this.prevButton.disabled = false;
        }
        if(this.currentSlide >= this.totalSlides) {
            this.nextButton.disabled = true;
        }
        else {
            this.nextButton.disabled = false;
        }
        Array.from(this.slidePoints.querySelectorAll('div')).forEach(element => element.classList.remove('currentPoint'));
        this.slidePoints.querySelector(`:nth-child(${this.currentSlide + 1})`).classList.add('currentPoint')
    }

    startAnimation(e) {
        //check for touch swipe
        if(e && e.touches && this.isSwipe) {
            this.isSwipe = false;
            const touchDistance = this.touchPointEnd - this.touchPointStart;
            if(touchDistance > 50) {
                this.onNavClick(true);
            }
            else if(touchDistance < -50) {
                this.onNavClick(false);
            }
        }
        this.animationInterval = setInterval(_ => {
            const translateBy = this.carouselParent.offsetWidth;
            if(this.currentSlide >= this.totalSlides) {
                this.currentSlide = 0;
            }
            else {
                this.currentSlide++;
            }
            this.showHideNav();
            this.carousel.style.left = `-${this.currentSlide * translateBy}px`;
        }, 5000);
    }

    stopAnimation(e) {
        clearInterval(this.animationInterval);
        // check for touch swipe
        if(e && e.touches && e.touches.length) {
            this.touchPointStart = e.touches[0].pageX;
        }
    }

} 