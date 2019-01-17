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
import { observer, inject } from 'mobx-react';
import { computed } from 'mobx';

const stringLimit = 512;

@inject('store')
@observer
class TrucatePart extends React.Component {
  state = {
    showButton: false,
    blockHover: true
  }

  @computed get dashboard() {
    return this.props.store.i18n.data.dashboard;
  }

  toggleArticle(e) {
    e.stopPropagation();
    // set data for showing within model or somehow else
    this.props.store.flags.runtime.set('article', true);
  }

  hideButton() {
    if (!this.state.blockHover) {
      setTimeout(() => this.setState({ showButton: false }), 300);
    }
  }

  render() {
    return (
      <React.Fragment>
        <div
          className='truncate--text'
          onMouseOver={() => this.setState({ showButton: true })}
          onFocus={() => this.setState({ showButton: true })}
          onMouseOut={() => this.hideButton()}
          onBlur={() => this.hideButton()}
        >
          {this.props.string.substring(0, stringLimit)}
        </div>
        <button
          onClick={e => this.toggleArticle(e)}
          type='button'
          onMouseOver={() => this.setState({ blockHover: true })}
          onFocus={() => this.setState({ blockHover: true })}
          onMouseOut={() => this.setState({ blockHover: false })}
          onBlur={() => this.setState({ blockHover: false })}
          className={this.state.showButton ? 'truncate--expand' : 'truncate--expand truncate--expand__hidden'}
        >
          {this.dashboard.expand}
        </button>
      </React.Fragment>
    );
  }
}

const truncateText = string => ((string.length < stringLimit)
  ? <div>{string}</div>
  : <TrucatePart string={string} />
);

export default truncateText;
