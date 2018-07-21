import React from 'react';

// import SetProjectionContainer from './SetProjectionContainer';
import SetLayerVisibility from './SetLayerVisibility';
import FeedbackButtons from '../../components/Feedback/FeedbackButtons';
import SetOwnershipColorGrouping from './SetOwnershipColorGrouping';
import SetLocalization from './SetLocalization';

class Settings extends React.Component {
  // <SetProjectionContainer />
  render() {
    return (
      <div className='sidepanel--content'>
        <h3>
          { ' Настройки' }
        </h3>
        <SetLayerVisibility />
        <SetLocalization />
        <SetOwnershipColorGrouping />
        <FeedbackButtons onClose={this.props.onClose} />
      </div>
    );
  }
}

export default Settings;
