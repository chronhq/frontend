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
  constructor(props) {
    super(props);
    this.state = {
      isBioOn: false,
    };
  }

  bioToggle() {
    console.log(this.state.isBioOn);
    this.setState({ isBioOn: !this.state.isBioOn });
    this.props.setFlagsAction({ UI: { Bio: this.state.isBioOn } });
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

const mapDispatchToProps = (dispatch) => {
  return {
    setFlagsAction: bindActionCreators(setFlagsAction, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(BioButton);
