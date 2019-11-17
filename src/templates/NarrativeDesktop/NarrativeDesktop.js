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

import './NarrativeDesktop.less';
import FreePinsWidget from '../../containers/Widgets/FreePinsSummer';
import LoadingWidget from '../../containers/Widgets/LoadingSummer';
import SideBar from '../SideBar/SideBarSummer';
import StoryList from '../../containers/StoryList/StoryListSummer';
import TimeControls from '../../containers/TimeControls/TimeControls';
import WinterNarration from '../../containers/WinterNarration/WinterNarration';

const Controls = () => (
  <div className='narrative-desktop-controls'>
    <div className='narrative-desktop-controls-grid'>
      <TimeControls />
      <LoadingWidget />
      <FreePinsWidget />
    </div>
  </div>
);

class NarrativeDesktop extends React.Component {
  render() {
    return (
      <div>
        <WinterNarration />
        <Controls />
        <SideBar />
        <StoryList />
      </div>
    );
  }
}

export default NarrativeDesktop;
