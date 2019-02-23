/*
 * Chron.
 * Copyright (c) 2019 Alisa Belyaeva, Ata Ali Kilicli, Amaury Martiny,
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
import { computed } from 'mobx';

import Button, { BUTTON_TYPE } from '../../components/Button/Button';
import './Article.less';

@inject('store')
@observer
class Article extends React.Component {
  @computed get isOpen() {
    return this.props.store.flags.runtime.get('article');
  }


  @computed get timeline() {
    return this.props.store.data.narrations.data;
  }

  @computed get tick() {
    return this.props.store.year.tick;
  }

  closeFeedback(e) {
    e.stopPropagation();
    this.props.store.flags.runtime.set('article', false);
  }

  handleOverlay(e) {
    if (e.keyCode === 13) {
      this.closeFeedback(e);
    }
  }

  clickOutside(e) {
    if (!this.modal || this.modal.contains(e.target)) {
      return;
    }
    this.closeFeedback(e);
  }

  render() {
    if (this.isOpen === false) {
      return null;
    }
    const data = this.timeline[this.tick];
    return (
      <div
        className='black-overlay'
        role='button'
        tabIndex='0'
        onClick={e => this.clickOutside(e)}
        onKeyUp={e => this.handleOverlay(e)}
      >
        <div
          className='article'
          ref={(ref) => { this.modal = ref; }}
        >
          <Button
            btnType={BUTTON_TYPE.CLOSE}
            onClick={e => this.closeFeedback(e)}
          >
            <span className="lnr lnr-cross" />
          </Button>
          <div className='article--title'>
            <b>
              {data ? data.title : ''}
            </b>
          </div>
          <div className='article--body--container'>
            <div className='article--body'>
              {data ? data.description : ''}
              {(data && data.img)
                ? (
                  <img
                    className='article--body'
                    src={data.img}
                    alt=''
                  />
                )
                : ''
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Article;
