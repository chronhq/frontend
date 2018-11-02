import React from 'react';

import FeedbackButtons from './FeedbackButtons';
import SetLocalization from './SetLocalization';

class Settings extends React.Component {
  render() {
    return (
      <div className='sidepanel--content'>
        <h3>
          { ' Настройки' }
        </h3>
        <SetLocalization />
        <FeedbackButtons onClose={this.props.onClose} />
      </div>
    );
  }
}

export default Settings;
