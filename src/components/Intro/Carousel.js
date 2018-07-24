import React from 'react';
import { observer, inject } from 'mobx-react';
import { observable, action, computed } from 'mobx';

import './Carousel.less';

// {
//     content:
//       'Нам важно, чтобы вы оценили свой опыт от использования сервиса.
// Пожалуйста, после тестирования заполните небольшую анкету, которая сделает продукт лучше.',
//   },

// Component for left arrow
// class CarouselLeftArrow extends Component {
//   render() {
//     return (
//       <a
//         href="#"
//         className="carousel__arrow carousel__arrow--left"
//         onClick={this.props.onClick}
//       >
//       </a>
//     );
//   }
// }

// Component for right arrow
// class CarouselRightArrow extends Component {
//   render() {
//     return (
//       <a
//         href="#"
//         className="carousel__arrow carousel__arrow--right"
//         onClick={this.props.onClick}
//       >
//       </a>
//     );
//   }
// }


// Component for carousel indicator
/* eslint-disable */
class CarouselIndicator extends React.Component {
  get className() {
    return this.props.index === this.props.activeIndex
      ? 'carousel__indicator carousel__indicator--active'
      : 'carousel__indicator';
  }
  render() {
    return (
      <li>
        <a
          className={this.className}
          onClick={this.props.onClick}
        />
      </li>
    );
  }
}
/* eslint-enable */

// Component for slide
class CarouselSlide extends React.Component {
  get className() {
    return this.props.index === this.props.activeIndex
      ? 'carousel__slide carousel__slide--active'
      : 'carousel__slide';
  }

  render() {
    return (
      <li
        className={this.className}
      >
        <p className="carousel-slide__content">
          {this.props.slide.content}
        </p>

        {/*
        <p>
          <strong className="carousel-slide__author">
            {this.props.slide.author}
          </strong>,
          {" "}
          <small className="carousel-slide__source">
            {this.props.slide.source}
          </small>
        </p>
        */}
      </li>
    );
  }
}

// Carousel component
@inject('store')
@observer
export default class Carousel extends React.Component {
  @computed get overlay() {
    return this.slides[this.activeIndex].overlay;
  }

  @computed get slides() {
    return this.props.store.i18n.intro.carousel;
  }

  @computed get buttons() {
    return this.props.store.i18n.buttons;
  }

  @action closeIntro() {
    this.props.store.flags.flags.runtime.intro = false;
  }


  @observable activeIndex = 0;

  highlightDiv = {
    backgroundColor: 'rgba(0,0,0,0.0)',
    borderColor: '#9ecaed',
    boxShadow: 'inset 0 0 10px #9ecaed',
    outline: 'none',
  };

  goToSlide(index) {
    this.activeIndex = index;
  }

  goToPrevSlide(e) {
    e.preventDefault();
    if (this.activeIndex < 1) {
      this.activeIndex = this.slides.length;
    } else {
      this.activeIndex -= 1;
    }
  }

  goToNextSlide(e) {
    e.preventDefault();
    if (this.activeIndex === this.slides.length - 1) {
      this.activeIndex = 0;
    } else {
      this.activeIndex += 1;
    }
  }

  render() {
    if (this.props.store.flags.flags.runtime.intro === false) return '';
    return (
      <div className='overlay'>
        <div className="carousel">

          <ul className="carousel__slides">
            {this.slides.map((slide, index) => (
              <CarouselSlide
                key={`slide_${slide.key}`}
                index={index}
                activeIndex={this.activeIndex}
                slide={slide}
              />))}
          </ul>

          <ul className="carousel__indicators">
            {this.slides.map((slide, index) => (
              <CarouselIndicator
                key={`indicator_${slide.key}`}
                index={index}
                activeIndex={this.activeIndex}
                onClick={() => this.goToSlide(index)}
              />))}
          </ul>

          <div>
            <button onClick={() => this.closeIntro()} className='btn btn-primary'>
              {' '}
              {this.buttons.close}
              {' '}
            </button>
            <button onClick={e => this.goToNextSlide(e)} className='btn btn-primary'>
              {' '}
              {this.buttons.next}
              {' '}
            </button>
          </div>
        </div>
        <div style={this.highlightDiv} className={this.overlay} />
        {/*
        <CarouselLeftArrow onClick={e => this.goToPrevSlide(e)} />
        <CarouselRightArrow onClick={e => this.goToNextSlide(e)} />
        activeIndex: {this.activeIndex}
      */}
      </div>
    );
  }
}
