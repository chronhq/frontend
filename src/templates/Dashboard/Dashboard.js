import React from 'react';

import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';

import StoryList from '../../containers/StoryList/StoryList';
import DashboardFooter from '../../containers/DashboardFooter/DashboardFooter';
import DashboardSearch from '../../containers/DashboardSearch/DashboardSearch';
import CurrentStory from '../../containers/CurrentStory/CurrentStory';
import DashboardFeed from '../../containers/DashboardFeed/DashboardFeed';

import './Dashboard.less';

@inject('store')
@observer
class Dashboard extends React.Component {
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

  changeUI = () => {
    this.view.changeUI();
  }

  toggle = () => {
    this.view.toggle();
  }

  render() {
    return (
      <div className={`dashboard layer-4 ${this.hidden && 'dashboard__hidden'}`}>
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
        <button type='button' className='dashboard-hide layer-2' onClick={this.toggle}>
          <i className={`lnr lnr-chevron-${this.chevron}`} aria-hidden='true' title='show panel' />
        </button>
      </div>
    );
  }
}

export default Dashboard;
