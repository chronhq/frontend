import React from 'react';
import './TimelineButtons.less';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BioButton from './BioButton';
import { withRouter } from 'react-router-dom'
import { setFlagsAction } from 'flag';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const tooltip = text => (
  <Tooltip id='tooltip'><strong>{text}</strong></Tooltip>
);

class ReturnButton extends React.Component {
  handleClick() {
    this.props.setFlagsAction({ CourseSelection: true });
    this.props.history.push('/');
    console.log('magic');
  }

  render() {
    return (
      <OverlayTrigger placement='bottom' delayShow={150} delayHide={5} overlay={tooltip('Домой')} >
        <button onClick={() => this.handleClick()}>
          <i className='fa fa-reply' aria-hidden='true' />
        </button>
      </OverlayTrigger>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setFlagsAction: bindActionCreators(setFlagsAction, dispatch),
  }
}

const ReturnButtonMagic = connect(null, mapDispatchToProps)(withRouter(ReturnButton));

const TimelineButtons = (cb) => (
  <div className='timeline__buttons'>
    <BioButton />
    <ReturnButtonMagic />
  </div>
);



export default TimelineButtons;
