/*
 * Chron.
 * Copyright (c) 2018 Alisa Belyaeva, Ata Ali Kilicli, Amaury Martiny,
 * Daniil Mordasov, Liam O’Flynn, Mikhail Orlov.
 * -----
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * -----
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * -----
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
import React from 'react';
import { inject, observer } from 'mobx-react';
import { action } from 'mobx';

import './Bio.less';

// const photo = require('./candidat.jpg');

const info = {
  title: 'Василий Владимирович Щепкин',
  subtitle: 'старший научный сотрудник ИВР РАН, кандидат исторических наук',
  text: 'В 2011—2014 гг. принимал участие в совместном проекте ИВР РАН и Центра исследований айнов и коренных народов Университета Хоккайдо по сравнительному изучению рукописей «Хигаси эдзо ико» (из коллекции ИВР РАН) и «Эдзо сэйкэй дзусэцу» (из коллекции Токийского университета). Победитель конкурса Ассоциации японоведов на лучшую научную публикацию о Японии в 2012 г. (раздел «История», 1-е место). Участник ежегодных научных сессий ИВР РАН (2008—2012), Кюнеровских чтений МАЭ РАН (2008—2013), конференции «История и культура Японии» ИВКА РГГУ (2009—2013). Область научных интересов: история Японии, история российско-японских отношений, история внешней политики Японии, история и культура айнов, история Хоккайдо, Сахалина и Курильских островов.',
  // photo
};

@inject('store')
@observer
class Bio extends React.Component {
  @action closeBio() {
    this.props.store.flags.runtime.set('BioIsOpen', false);
  }

  render() {
    if (this.props.store.flags.runtime.get('BioIsOpen') === false) return '';
    return (
      <div className='bio__container layer-3'>
        <div className='bio__data'>
          <div className='photo'>
            {info.photo ? <img alt='Course Author' src={info.photo} /> : ''}
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
