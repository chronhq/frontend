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

import { observer, inject } from 'mobx-react';
import { action } from 'mobx';

@inject('store')
@observer
class FeedbackButtons extends React.Component {
  @action openFeedback() {
    this.props.store.feedback.year = this.props.store.year.now;
    this.props.store.flags.runtime.set('feedback', true);
  }


  render() {
    return (
      <div className='export-buttons'>
        <button type="button" onClick={() => this.openFeedback()}>
          {this.props.store.i18n.data.buttons.mistake}
        </button>
        <a
          href='https://chronist.ru/faq'
          className='decorless'
          target='_blank'
          rel='noopener noreferrer'
        >
          <button type="button">
            {this.props.store.i18n.data.buttons.faq}
          </button>
        </a>
      </div>
    );
  }
}

export default FeedbackButtons;
