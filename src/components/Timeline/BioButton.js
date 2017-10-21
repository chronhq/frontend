import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setFlagsAction } from 'flag';

const tooltip = text => (
  <Tooltip id='tooltip'><strong>{text}</strong></Tooltip>
);


// this.props.setFlagsAction({ CourseSelection: false, ...uiSettings.flags });
class BioButton extends React.Component {
  bioToggle() {
    this.props.setFlagsAction({ UI: { Bio: !this.props.isBioOn } });
  }

  render() {
    return (
      <OverlayTrigger placement='bottom' delayHide={0} overlay={tooltip('Информация об авторе')} >
        <button onClick={() => this.bioToggle()}>
          <i className='fa fa-user-circle' aria-hidden='true' />
        </button>
      </OverlayTrigger>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isBioOn: state.flags.UI.Bio
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFlagsAction: bindActionCreators(setFlagsAction, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BioButton);
