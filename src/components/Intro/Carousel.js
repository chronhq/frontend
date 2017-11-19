import React, { Component } from 'react';
// const { render } = ReactDOM;

import './Carousel.less';

// Data for carousel
const carouselSlidesData = [
  {
    content:
      'Добро пожаловать в демо-версию мультимедийного атласа "Хронист", благодаря которому вы сами выбираете типы данных, которые хотите отобразить и сами настраиваете хронологию, которая вам интересна. Наша команда верит, что изучение истории становится очень занимательным, когда вы изучаете не один регион, а всю планету. История всего мира взаимосвязана и здесь вы сможете самостоятельно находить и изучать эти взаимосвязи.'
    }, {
    content:
      'В демо версии вы найдёте лишь небольшую активную часть карты (она обозначена цветом) и отрезок времени, который сможете использовать. Мы планируем, что хронология будет начинаться от разделения материков и доходить до XXI века. В дальнейшем мы усложним интерфейс: добавим в хронологию этапы в зависимости от регионов, возможность ввода собственных данных и, таким образом, создания собственных курсов, экспорт данных в удобные форматы для создания интерактивной презентации при помощи пары кликов, и многое другое. ',
  }, {
    content:
      'Легенда находится на боковой панели, но вы также можете получить краткую справку по территориям и городам, просто кликнув на них.  ',
  }, {
    content:
      'Следить за изменениями можно перемещая указатель по временной шкале как самостоятельно, так и при помощи кнопок управления.',
  }, {
    content:
      'Мы также работаем над добавлением «слоёв». Слой - это набор данных определённого типа - население, стихийные бедствия, религиозные направления, политическое устройство и тд. Сейчас мы предлагаем всего два слоя: города и политические границы. Слой «изобретения» по умолчанию включен и отображается как лента событий. При наведении курсора на событие оно отмечается в городе, в котором произошло. Изобретения также можно выделить щелчком и экспортировать в текстовый формат. Их также можно будет сортировать, экспортировать в различном варианте и переходить к полной версии со ссылками на научные материалы.  ',
  }, {
    content:
      'Вы можете вернуться к интро, нажав "домой" на боковой панели.',
  }
];

// {
//     content:
//       'Нам важно, чтобы вы оценили свой опыт от использования сервиса. Пожалуйста, после тестирования заполните небольшую анкету, которая сделает продукт лучше.',
//   },

// Component for left arrow
class CarouselLeftArrow extends Component {
  render() {
    return (
      <a
        href="#"
        className="carousel__arrow carousel__arrow--left"
        onClick={this.props.onClick}
      >
        <span className="fa fa-2x fa-angle-left" />
      </a>
    );
  }
}

// Component for right arrow
class CarouselRightArrow extends Component {
  render() {
    return (
      <a
        href="#"
        className="carousel__arrow carousel__arrow--right"
        onClick={this.props.onClick}
      >
        <span className="fa fa-2x fa-angle-right" />
      </a>
    );
  }
}

// Component for carousel indicator
class CarouselIndicator extends Component {
  render() {
    return (
      <li>
        <a
          className={
            this.props.index == this.props.activeIndex
              ? "carousel__indicator carousel__indicator--active"
              : "carousel__indicator"
          }
          onClick={this.props.onClick}
        />
      </li>
    );
  }
}

// Component for slide
class CarouselSlide extends Component {
  render() {
    return (
      <li
        className={
          this.props.index == this.props.activeIndex
            ? "carousel__slide carousel__slide--active"
            : "carousel__slide"
        }
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
class Carousel extends Component {
  constructor(props) {
    super(props);

    // this.goToSlide = this.goToSlide.bind(this);
    // this.goToPrevSlide = this.goToPrevSlide.bind(this);
    // this.goToNextSlide = this.goToNextSlide.bind(this);

    this.state = {
      activeIndex: 0
    };
  }

  goToSlide(index) {
    this.setState({
      activeIndex: index
    });
  }

  goToPrevSlide(e) {
    e.preventDefault();

    let index = this.state.activeIndex;
    let { slides } = this.props;
    let slidesLength = slides.length;

    if (index < 1) {
      index = slidesLength;
    }

    --index;

    this.setState({
      activeIndex: index
    });
  }

  goToNextSlide(e) {
    e.preventDefault();

    let index = this.state.activeIndex;
    let { slides } = this.props;
    let slidesLength = slides.length - 1;

    if (index === slidesLength) {
      index = -1;
    }

    ++index;

    this.setState({
      activeIndex: index
    });
  }

  render() {

    const highlightDiv = {
      backgroundColor: 'rgba(0,0,0,0.0)',
      borderColor: '#9ecaed',
      boxShadow: 'inset 0 0 10px #9ecaed',
      outline: 'none',
    };

    return (
      <div className='overlay'>
      <div className="carousel">

        <ul className="carousel__slides">
          {this.props.slides.map((slide, index) =>
            <CarouselSlide
              key={index}
              index={index}
              activeIndex={this.state.activeIndex}
              slide={slide}
            />
          )}
        </ul>


        <ul className="carousel__indicators">
          {this.props.slides.map((slide, index) =>
            <CarouselIndicator
              key={index}
              index={index}
              activeIndex={this.state.activeIndex}
              onClick={e => this.goToSlide(index)}
            />
          )}
        </ul>
        <div>
          <button onClick={() => this.props.cb()} className='btn btn-primary'> Закрыть </button>
          <button onClick={e => this.goToNextSlide(e)} className='btn btn-primary'> Далее </button>
        </div>
      </div>
        <div style={this.state.activeIndex === 6 ? highlightDiv : null} className='overlay-iconbar' />
        <div style={this.state.activeIndex === 3 ? highlightDiv : null} className='overlay-timeline' />
        <div style={this.state.activeIndex === 2 ? highlightDiv : null} className='overlay-legend' />
        <div style={this.state.activeIndex === 7 ? highlightDiv : null} className='overlay-timecontrol' />
        <div style={this.state.activeIndex === 7 ? highlightDiv : null} className='overlay-invention' />
        <div style={this.state.activeIndex === 4 ? highlightDiv : null} className='overlay-feed' />
        <div style={this.state.activeIndex === 7 ? highlightDiv : null} className='overlay-survey' />
        <div style={this.state.activeIndex === 5 ? highlightDiv : null} className='overlay-home' />

        {/*
        <CarouselLeftArrow onClick={e => this.goToPrevSlide(e)} />
        <CarouselRightArrow onClick={e => this.goToNextSlide(e)} />
        activeIndex: {this.state.activeIndex}
      */}
      </div>
    );
  }
}

// Render Carousel component
const Intro = ({ isOpen, onClose }) => {
    return isOpen ? <Carousel slides={carouselSlidesData} cb={onClose} /> : null
}

// const Intro = ({ isOpen, onClose }) => (
//   <div><button onClick={onClose}>=== INTRO === {isOpen ? 'true' : 'false'} </button></div>
// );

export default Intro;
