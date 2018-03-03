import React from 'react';
import { observer, inject } from 'mobx-react';
import { observable, action, computed } from 'mobx';

import './Carousel.less';

// Data for carousel
const carouselSlidesData = [
  {
    key: '0',
    overlay: 'overlay-none',
    content:
      'Добро пожаловать в демо-версию мультимедийного атласа "Хронист", благодаря которому вы сами выбираете типы данных, которые хотите отобразить и сами настраиваете хронологию, которая вам интересна. Наша команда верит, что изучение истории становится очень занимательным, когда вы изучаете не один регион, а всю планету. История всего мира взаимосвязана и здесь вы сможете самостоятельно находить и изучать эти взаимосвязи.'
  }, {
    key: '1',
    overlay: 'overlay-none',
    content:
    'В демо версии вы найдёте лишь небольшую активную часть карты (она обозначена цветом) и отрезок времени, который сможете использовать. Мы планируем, что хронология будет начинаться от разделения материков и доходить до XXI века. В дальнейшем мы усложним интерфейс: добавим в хронологию этапы в зависимости от регионов, возможность ввода собственных данных и, таким образом, создания собственных курсов, экспорт данных в удобные форматы для создания интерактивной презентации при помощи пары кликов, и многое другое. ',
  }, {
    key: '2',
    overlay: 'overlay-legend',
    content:
      'Легенда находится на боковой панели, но вы также можете получить краткую справку по территориям и городам, просто кликнув на них.  ',
  }, {
    key: '3',
    overlay: 'overlay-timeline',
    content:
      'Следить за изменениями можно перемещая указатель по временной шкале как самостоятельно, так и при помощи кнопок управления.',
  }, {
    key: '4',
    overlay: 'overlay-feed',
    content:
      'Мы также работаем над добавлением «слоёв». Слой - это набор данных определённого типа - население, стихийные бедствия, религиозные направления, политическое устройство и тд. Сейчас мы предлагаем всего два слоя: города и политические границы. Слой «изобретения» по умолчанию включен и отображается как лента событий. При наведении курсора на событие оно отмечается в городе, в котором произошло. Изобретения также можно выделить щелчком и экспортировать в текстовый формат. Их также можно будет сортировать, экспортировать в различном варианте и переходить к полной версии со ссылками на научные материалы.  ',
  }, {
    key: '5',
    overlay: 'overlay-home',
    content:
      'Вы можете вернуться к интро, нажав "домой" на боковой панели.',
  }
];

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
//         <span className="fa fa-2x fa-angle-left" />
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
//         <span className="fa fa-2x fa-angle-right" />
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
        <p className="carousel-slide__content">{this.props.slide.content}</p>

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
@observer
class Carousel extends React.Component {
  @computed get overlay() {
    return this.props.slides[this.activeIndex].overlay;
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
      this.activeIndex = this.props.slides.length;
    } else {
      this.activeIndex -= 1;
    }
  }

  goToNextSlide(e) {
    e.preventDefault();
    if (this.activeIndex === this.props.slides.length - 1) {
      this.activeIndex = 0;
    } else {
      this.activeIndex += 1;
    }
  }

  render() {
    return (
      <div className='overlay'>
        <div className="carousel">

          <ul className="carousel__slides">
            {this.props.slides.map((slide, index) => (
              <CarouselSlide
                key={`slide_${slide.key}`}
                index={index}
                activeIndex={this.activeIndex}
                slide={slide}
              />))}
          </ul>

          <ul className="carousel__indicators">
            {this.props.slides.map((slide, index) => (
              <CarouselIndicator
                key={`indicator_${slide.key}`}
                index={index}
                activeIndex={this.activeIndex}
                onClick={() => this.goToSlide(index)}
              />))}
          </ul>

          <div>
            <button onClick={() => this.props.cb()} className='btn btn-primary'> Закрыть </button>
            <button onClick={e => this.goToNextSlide(e)} className='btn btn-primary'> Далее </button>
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

// Render Carousel component
@inject('store')
@observer
class Intro extends React.Component {
  @action closeIntro() {
    this.props.store.flags.flags.runtime.intro = false;
  }
  render() {
    return this.props.store.flags.flags.runtime.intro === true
      ? <Carousel slides={carouselSlidesData} cb={() => this.closeIntro()} />
      : '';
  }
}

export default Intro;
