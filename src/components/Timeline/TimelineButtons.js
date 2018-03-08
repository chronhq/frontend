import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import BioButton from './BioButton';
import './TimelineButtons.less';

const tooltip = text => (
  <Tooltip id='tooltip'><strong>{text}</strong></Tooltip>
);
@inject('store')
@observer
class ReturnButton extends React.Component {
  handleClick() {
    this.props.store.effects.course.toggleCourseSelection(true);
    this.props.history.push('/');
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

const ReturnButtonMagic = withRouter(ReturnButton);

const TimelineButtons = () => (
  <div className='timeline__buttons'>
    <BioButton />
    <ReturnButtonMagic />
  </div>
);

export default TimelineButtons;
