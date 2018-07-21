import React from 'react';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import BioButton from './BioButton';
import './TimelineButtons.less';

@inject('store')
@observer
class ReturnButton extends React.Component {
  handleClick() {
    this.props.store.effects.course.toggleCourseSelection(true);
    this.props.history.push('/');
  }

  render() {
    return (
      <button onClick={() => this.handleClick()}>
        <i className='fa fa-reply' aria-hidden='true' />
      </button>
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
