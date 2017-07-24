import React from 'react';
import PropTypes from 'prop-types';

import SetProjectionContainer from './SetProjectionContainer';
import SetLayerVisibility from './SetLayerVisibility';
import FeedbackButtons from '../../components/Feedback/FeedbackButtons';
import SetOwnershipColorGrouping from './SetOwnershipColorGrouping';

class Settings extends React.Component {
  render() {
    return (
      <div className='projectionSettings center'>
        <h3> Настройка проекции </h3>
        <SetProjectionContainer />
        <hr />
        <SetLayerVisibility />
        <br />
        <h3> Группировка территорий </h3>
        <SetOwnershipColorGrouping />
        <FeedbackButtons onClose={this.props.onClose} />
      </div>
    );
  }
}

Settings.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Settings;
