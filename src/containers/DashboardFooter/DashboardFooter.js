import React from 'react';
import { observer, inject } from 'mobx-react';
import { action } from 'mobx';

import './DashboardFooter.less';

@inject('store')
@observer
class DashboardFooter extends React.Component {
  @action openFeedback() {
    this.props.store.feedback.year = this.props.store.year.now;
    this.props.store.flags.runtime.set('feedback', true);
  }

  render() {
    return (
      <div className='dashboard-footer'>
        <button
          type='button'
          onClick={() => console.log('news not available')}
        >
          {'News'}
        </button>
        <a href='https://github.com/chronhq/frontend' target='_blank' rel='noopener noreferer'>
          {'About us'}
        </a>
        <button
          type='button'
          onClick={() => console.log('show license')}
        >
          {'License'}
        </button>
        <button
          type='button'
          onClick={() => this.openFeedback()}
        >
          {'Report error'}
        </button>
      </div>
    );
  }
}

export default DashboardFooter;
