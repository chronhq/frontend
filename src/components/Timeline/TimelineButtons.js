import React from 'react';
import './TimelineButtons.less';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BioButton from './BioButton';

const tooltip = text => (
  <Tooltip id='tooltip'><strong>{text}</strong></Tooltip>
);

const ReturnButton = () => (
  <OverlayTrigger placement='bottom' delayShow={150} delayHide={5} overlay={tooltip('Домой')} >
    <Link to='/'>
      <button>
        <i className='fa fa-reply' aria-hidden='true' />
      </button>
    </Link>
  </OverlayTrigger>
);

const TimelineButtons = (cb) => (
  <div className='timeline__buttons'>
    <BioButton />
    <ReturnButton />
  </div>
);

export default TimelineButtons;
