import React from 'react';
// import PropTypes from 'prop-types';
// import { Button, ButtonGroup } from 'react-bootstrap';
import { observer, inject } from 'mobx-react';

@inject('store')
@observer
class FeedbackButtons extends React.Component {
  openFeedback() {
    this.props.store.feedback.year = this.props.store.year.now;
    this.props.store.flags.flags.runtime.feedback = true;
  }


  render() {
    return (
      <div className='export-buttons'>
        <button type="button" onClick={() => this.openFeedback()}>
          {this.props.store.i18n.buttons.mistake}
        </button>
        <a
          href='https://chronist.ru/faq'
          className='decorless'
          target='_blank'
          rel='noopener noreferrer'
        >
          <button type="button">
            {this.props.store.i18n.buttons.faq}
          </button>
        </a>
      </div>
    );
  }
}

export default FeedbackButtons;
