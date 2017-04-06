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

  render() {
    if (this.props.isOpen === false) {
      return null;
    }

    const settings = {
      dots: true,
      autoplay: true,
      autoplaySpeed: 4000,
      arrows: false,
      fade: true,
      infinite: true,
      lazyLoad: true,
      speed: 500,
      beforeChange: this.nextClick,
      slidesToShow: 1,
      slidesToScroll: 1,
      pauseOnHover: false
    };

    const SlideSalutation = 'Вы попали в демо-версию сервиса "Хронист", который создаётся для того, чтобы помочь в учёбе, исследованиях или просто весело и с пользой провести время.';
    const SlideInventions = 'Слой «изобретения» по умолчанию включен и отображается как лента событий. При наведении курсора на событие оно отмечается в городе, в котором произошло. Изобретения также можно выделить щелчком и экспортировать в текстовый формат.';
    const SlideSurvey = 'Нам важно, чтобы вы оценили свой опыт от использования сервиса. Пожалуйста, после тестирования заполните небольшую анкету, которая сделает продукт лучше.';
    const SlideLayers = 'Мы также работаем над добавлением «слоёв». Слой - это набор данных определённого типа - население, стихийные бедствия, религиозные направления, политическое устройство и тд. Сейчас мы предлагаем всего два слоя: города и политические границы. ';
    const SlideInvetionsAgain = 'В скором времени «изобретения» переместятся в другую вкладку, их можно будет отключать и накладывать на другие слои. В таком случае, вероятно, некоторые явления приобретут причинно-следственную связь. Их также можно будет сортировать, экспортировать в различном варианте и переходить к полной версии со ссылками на научные материалы.';

    const highlightDiv = {
      backgroundColor: 'rgba(0,0,0,0.0)',
      borderColor: '#9ecaed',
      boxShadow: 'inset 0 0 10px #9ecaed',
      outline: 'none',
    };

    return (
      <div className='overlay'>
        <div style={this.state.whichSlide === 1 ? highlightDiv : null} className='overlay-survey' />
        <div style={this.state.whichSlide === 2 ? highlightDiv : null} className='overlay-iconbar' />
        <div style={this.state.whichSlide === 3 ? highlightDiv : null} className='overlay-timeline' />

        <div className='row'>
          <div className='containter center'>
            <div className='slider'>
              <Slider class='text-center' {...settings}>
                <div><h5> {SlideSalutation} </h5></div>
                <div><h5> {SlideSurvey} </h5></div>
                <div><h5> {SlideLayers} </h5></div>
                <div><h5> {SlideInventions} </h5></div>
                <div><h5> {SlideInvetionsAgain} </h5></div>
              </Slider>

                  <button onClick={e => this.close(e)} className='btn btn-primary'> OK </button>
              </div>
          </div>
        </div>
        <div className='icon-bar-spots'>
          { this.state.whichSlide === 5 ? <svg height="100" width="100">
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
