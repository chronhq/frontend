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
import * as React from 'react';

import SideBar from '../../containers/SideBar/SideBar';
import ControlButtons from '../../containers/TimeControls/TimeControls';
import StoryList from '../../containers/StoryList/StoryList';

import './NarrativeMobileBar.less';

class NarrativeMobileBar extends React.Component {
  state = {
    isHidden: false,
  }

  unHide() {
    this.setState((state) => ({ isHidden: !state.isHidden }));
  }

  render() {
    return (
      <div className={this.state.isHidden ? 'narrative-mobile-bar' : 'narrative-mobile-bar narrative-mobile-bar__hidden'}>
        <div className='narrative-mobile-bar__timecontrol'>
          <button
            type='button'
            className='narrative-mobile-bar__chevron'
            onClick={() => this.unHide()}
          >
            <i
              className={`icon icon-chevron-${this.state.isHidden ? 'down' : 'up'}`}
              aria-hidden='true'
              title='Open Panel'
            />
          </button>
          <ControlButtons />
          <button
            type='button'
            className='narrative-mobile-bar__dumpbutton'
            onClick={() => this.unHide()}
          >
            <i
              className={`icon icon-chevron-${this.state.isHidden ? 'down' : 'up'}`}
              aria-hidden='true'
              title='Open Panel'
            />
          </button>
        </div>
        <div className='narrative-mobile-bar-hiddenpart'>
          <div className='narrative-mobile-bar__layers'>
            <SideBar />
          </div>
          <div className='narrative-mobile-bar__stories'>
            <StoryList />
          </div>
        </div>
      </div>
    );
  }
}

export default NarrativeMobileBar;
