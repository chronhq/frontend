import React from 'react';

import StoryList from '../../containers/StoryList/StoryList';
import DashboardFooter from '../../containers/DashboardFooter/DashboardFooter';
import DashboardSearch from '../../containers/DashboardSearch/DashboardSearch';
import CurrentStory from '../../containers/CurrentStory/CurrentStory';
import DashboardFeed from '../../containers/DashboardFeed/DashboardFeed';

import './Dashboard.less';

class Dashboard extends React.Component {
  state = {
    hidden: false,
    isStorySelected: true
  }

  changeUi() {
    this.setState(state => ({ isStorySelected: !state.isStorySelected }));
  }

  render() {
    return (
      <div className={`dashboard layer-4 ${this.state.hidden && 'dashboard__hidden'}`}>
        <DashboardSearch />
        <CurrentStory
          isStorySelected={this.state.isStorySelected}
          changeUi={() => this.changeUi()}
        />
        {this.state.isStorySelected
          ? <DashboardFeed />
          : <StoryList changeUi={() => this.changeUi()} />
        }
        <DashboardFooter />
        <button type='button' className='dashboard-hide layer-2' onClick={() => this.setState(state => ({ hidden: !state.hidden }))}>
          <i className={`lnr lnr-chevron-${this.state.hidden ? 'right' : 'left'}`} aria-hidden='true' title='show panel' />
        </button>
      </div>
    );
  }
}

export default Dashboard;
