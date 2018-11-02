import React from 'react';
import { inject, observer } from 'mobx-react';
import { computed, action, observable } from 'mobx';
import './Bio.less';

const photo = require('./candidat.jpg');

const info = {
  title: 'Василий Владимирович Щепкин',
  subtitle: 'старший научный сотрудник ИВР РАН, кандидат исторических наук',
  text: 'В 2011—2014 гг. принимал участие в совместном проекте ИВР РАН и Центра исследований айнов и коренных народов Университета Хоккайдо по сравнительному изучению рукописей «Хигаси эдзо ико» (из коллекции ИВР РАН) и «Эдзо сэйкэй дзусэцу» (из коллекции Токийского университета). Победитель конкурса Ассоциации японоведов на лучшую научную публикацию о Японии в 2012 г. (раздел «История», 1-е место). Участник ежегодных научных сессий ИВР РАН (2008—2012), Кюнеровских чтений МАЭ РАН (2008—2013), конференции «История и культура Японии» ИВКА РГГУ (2009—2013). Область научных интересов: история Японии, история российско-японских отношений, история внешней политики Японии, история и культура айнов, история Хоккайдо, Сахалина и Курильских островов.',
  photo
};

@inject('store')
@observer
class Bio extends React.Component {
  @action closeBio() {
    this.props.store.flags.flags.runtime.BioIsOpen = false;
  }

  render() {
    if (this.props.store.flags.flags.runtime.BioIsOpen === false) return '';
    return (
      <div className='bio__container layer-3'>
        <div className='bio__data'>
          <div className='photo'>
            <img alt='Course Author' src={info.photo} />
          </div>
          <div className='name'>
            <h2>
              {' '}
              {info.title}
              {' '}
            </h2>
            <h2>
              {' '}
              {info.subtitle}
              {' '}
            </h2>
          </div>
          <p>
            {' '}
            {info.text}
            {' '}
          </p>
          <button onClick={() => this.closeBio()} className='close-window' type='button'>
            <span className="lnr lnr-cross" />
          </button>
        </div>
      </div>
    );
  }
}

export default Bio;
