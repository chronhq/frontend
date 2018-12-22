import React from 'react';

import StoryList from '../../containers/StoryList/StoryList';
import DashboardFooter from '../../containers/DashboardFooter/DashboardFooter';
import DashboardSearch from '../../containers/DashboardSearch/DashboardSearch';
import CurrentStory from '../../containers/CurrentStory/CurrentStory';

import './Dashboard.less';

class Dashboard extends React.Component {
  state = {
    hidden: false
  }

  render() {
    return (
      <div className={`dashboard layer-4 ${this.state.hidden && 'dashboard__hidden'}`}>
        <DashboardSearch />
        <CurrentStory />
        <StoryList />
        <DashboardFooter />
        <button type='button' className='dashboard-hide layer-2' onClick={() => this.setState(state => ({ hidden: !state.hidden }))}>
          <i className={`lnr lnr-chevron-${this.state.hidden ? 'right' : 'left'}`} aria-hidden='true' title='show panel' />
        </button>
      </div>
    );
  }
}

export default Dashboard;
