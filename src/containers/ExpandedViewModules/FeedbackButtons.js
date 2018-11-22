import React from 'react';

import { observer, inject } from 'mobx-react';
import { action } from 'mobx';

@inject('store')
@observer
class FeedbackButtons extends React.Component {
  @action openFeedback() {
    this.props.store.feedback.year = this.props.store.year.now;
    this.props.store.flags.runtime.set('feedback', true);
  }


  render() {
    return (
      <div className='export-buttons'>
        <button type="button" onClick={() => this.openFeedback()}>
          {this.props.store.i18n.data.buttons.mistake}
        </button>
        <a
          href='https://chronist.ru/faq'
          className='decorless'
          target='_blank'
          rel='noopener noreferrer'
        >
          <button type="button">
            {this.props.store.i18n.data.buttons.faq}
          </button>
        </a>
      </div>
    );
  }
}

export default FeedbackButtons;
