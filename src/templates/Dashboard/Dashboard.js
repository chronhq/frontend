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

import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';

import StoryList from '../../containers/StoryList/StoryList';
import DashboardFooter from '../../containers/DashboardFooter/DashboardFooter';
import DashboardSearch from '../../containers/DashboardSearch/DashboardSearch';
import CurrentStory from '../../containers/CurrentStory/CurrentStory';
import DashboardFeed from '../../containers/DashboardFeed/DashboardFeed';
import Button, { BUTTON_TYPE } from '../../components/Button/Button';
import Tooltip from '../../components/Tooltip/Tooltip';

import './Dashboard.less';

@inject('store')
@observer
class Dashboard extends React.Component {
  @computed get msg() {
    return this.props.store.i18n.data.tooltips;
  }

  @computed get view() {
    return this.props.store.dashboard;
  }

  @computed get isStorySelected() {
    return this.view.isStorySelected;
  }

  @computed get hidden() {
    return this.view.hidden;
  }

  @computed get chevron() {
    return this.hidden ? 'right' : 'left';
  }

  @computed get flyToStyle() {
    const color = this.props.store.deck.flyToEnabled
      ? { color: 'green' }
      : {};
    return {
      transform: 'translate(40px, 40px)',
      ...color,
    };
  }

  @computed get chevronMsg() {
    return this.hidden
      ? this.msg.panelShow
      : this.msg.panelHide;
  }

  @computed get locMsg() {
    return this.props.store.deck.flyToEnabled
      ? this.msg.locationUnfollow
      : this.msg.locationFollow;
  }

  changeUI = () => {
    this.view.changeUI();
  }

  toggle = () => {
    this.view.toggle();
  }

  toggleFlyTo = () => {
    this.props.store.deck.toggleFlyTo();
  }

  render() {
    return (
      <div className={`dashboard layer-4 ${this.hidden ? 'dashboard__hidden' : ''}`}>
        <DashboardSearch />
        <CurrentStory
          isStorySelected={this.isStorySelected}
          changeUi={this.changeUI}
        />
        {this.isStorySelected
          ? <DashboardFeed />
          : <StoryList changeUi={this.changeUI} />
        }
        <DashboardFooter />
        <div className='dashboard-hide layer-2'>
          <Tooltip placement='right' content={this.chevronMsg}>
            <Button btnType={BUTTON_TYPE.ICON} onClick={this.toggle}>
              <span className={`lnr lnr-chevron-${this.chevron}`} aria-hidden='true' title={this.chevronMsg} />
            </Button>
          </Tooltip>
        </div>
        <div className='dashboard-hide layer-2' style={this.flyToStyle}>
          <Tooltip placement='right' content={this.locMsg}>
            <Button btnType={BUTTON_TYPE.ICON} onClick={this.toggleFlyTo}>
              <span className='lnr lnr-location' aria-hidden='true' title={this.locMsg} />
            </Button>
          </Tooltip>
        </div>
      </div>
    );
  }
}

export default Dashboard;
