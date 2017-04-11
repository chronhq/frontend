import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.less';
import 'slick-carousel/slick/slick-theme.less';
import './Intro.less';


class Intro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      whichSlide: 0,
    };
  }


  close(e) {
    e.preventDefault();
    // remain open
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  nextClick = (e) => {
    // console.log(`Next click event. event is ${e}`);
    this.setState({ whichSlide: e });
  }

  next() {
    this.slider.slickNext();
  }

  render() {
    if (this.props.isOpen === false) {
      return null;
    }

    const settings = {
      dots: true,
      autoplay: false,
      autoplaySpeed: 8000,
      arrows: false,
      adaptiveHeight: false,
      fade: true,
      infinite: true,
      lazyLoad: true,
      speed: 500,
      beforeChange: this.nextClick,
      slidesToShow: 1,
      slidesToScroll: 1,
      pauseOnHover: true
    };

    const SlideSalutation = 'Вы попали в демо-версию сервиса "Хронист", который создаётся для того, чтобы помочь в учёбе, исследованиях или просто весело и с пользой провести время.';
    const SlideDemo = 'В демо версии вы найдёте лишь небольшую активную часть карты (она обозначена цветом) и отрезок времени, который сможете использовать. Мы постоянно работаем над расширением нашей базы и в сентябре откроем карту целиком (вы всегда можете проследить сколько данных мы добавили, счётчик есть на главной странице). ';
    const SlideLegend = 'Легенда находится на боковой панели.';
    const SlideAll = '«Хронист» - это мультимедийный атлас, благодаря которому вы сами выбираете типы данных, которые нужно отобразить, и сами настраиваете хронологию, которая вам интересна. Мы хотим показать, что изучение истории становится очень занимательным, когда вы изучаете не один регион, а всю планету. Что история всего мира взаимосвязана и вы можете самостоятельно находить и изучать эти взаимосвязи.';
    const SlideTimeControl = 'Следить за изменениями можно перемещая указатель по временной шкале как самостоятельно, так и при помощи кнопок управления.';
    const SlideSurvey = 'Нам важно, чтобы вы оценили свой опыт от использования сервиса. Пожалуйста, после тестирования заполните небольшую анкету, которая сделает продукт лучше.';
    const SlideLayers = 'Мы также работаем над добавлением «слоёв». Слой - это набор данных определённого типа - население, стихийные бедствия, религиозные направления, политическое устройство и тд. Сейчас мы предлагаем всего два слоя: города и политические границы. Слой «изобретения» по умолчанию включен и отображается как лента событий. При наведении курсора на событие оно отмечается в городе, в котором произошло. Изобретения также можно выделить щелчком и экспортировать в текстовый формат. Их также можно будет сортировать, экспортировать в различном варианте и переходить к полной версии со ссылками на научные материалы.  ';
    const SlideInventions = 'Слой «изобретения» по умолчанию включен и отображается как лента событий. При наведении курсора на событие оно отмечается в городе, в котором произошло. Изобретения также можно выделить щелчком и экспортировать в текстовый формат.';
    const SlideInvetionsAgain = 'В скором времени «изобретения» переместятся в другую вкладку, их можно будет отключать и накладывать на другие слои. В таком случае, вероятно, некоторые явления приобретут причинно-следственную связь. Их также можно будет сортировать, экспортировать в различном варианте и переходить к полной версии со ссылками на научные материалы.';
    const SlideHome = 'Вы можете вернуться к интро, нажав "домой" на боковой панели.';

    const highlightDiv = {
      backgroundColor: 'rgba(0,0,0,0.0)',
      borderColor: '#9ecaed',
      boxShadow: 'inset 0 0 10px #9ecaed',
      outline: 'none',
    };

    return (
      <div className='overlay'>
        <div style={this.state.whichSlide === 0 ? highlightDiv : null} className='overlay-iconbar' />
        <div style={this.state.whichSlide === 0 ? highlightDiv : null} className='overlay-timeline' />
        <div style={this.state.whichSlide === 2 ? highlightDiv : null} className='overlay-legend' />
        <div style={this.state.whichSlide === 3 ? highlightDiv : null} className='overlay-timecontrol' />
        <div style={this.state.whichSlide === 4 ? highlightDiv : null} className='overlay-invention' />
        <div style={this.state.whichSlide === 4 ? highlightDiv : null} className='overlay-feed' />
        <div style={this.state.whichSlide === 5 ? highlightDiv : null} className='overlay-survey' />
        <div style={this.state.whichSlide === 6 ? highlightDiv : null} className='overlay-home' />

        <div className='row'>
          <div className='containter center'>
            <div className='slider'>
              <Slider class='text-center' ref={c => this.slider = c } {...settings}>
                <div><h4> {SlideSalutation} </h4></div>
                <div><h4> {SlideDemo} </h4></div>
                <div><h4> {SlideLegend} </h4></div>
                <div><h4> {SlideTimeControl} </h4></div>
                <div><h4> {SlideLayers} </h4></div>
                <div><h4> {SlideSurvey} </h4></div>
                <div><h4> {SlideHome} </h4></div>
              </Slider>
              <button onClick={e => this.close(e)} className='btn btn-primary'> Закрыть </button>
              <button onClick={e => this.next()} className='btn btn-primary'> Далее </button>
            </div>
          </div>
        </div>
        <div className='icon-bar-spots'>
          { this.state.whichSlide === 9 ? <svg height="100" width="100">
            <circle cx="75" cy="25" r="12" fill="yellow" opacity='0.2' />
            <circle cx="75" cy="25" r="24" fill="yellow" opacity='0.1' />
            <circle cx="75" cy="25" r="40" stroke="yellow" strokeWidth="1" opacity='1' fill='transparent' />
          </svg>
        : null }
        </div>

      </div>
    );
  }
}

Intro.propTypes = {
  onClose: React.PropTypes.func.isRequired,
  isOpen: React.PropTypes.bool.isRequired,
};

export default Intro;
