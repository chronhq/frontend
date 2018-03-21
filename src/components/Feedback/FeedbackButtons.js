import React from 'react';
// import PropTypes from 'prop-types';
import { Button, ButtonGroup } from 'react-bootstrap';
import { observer, inject } from 'mobx-react';

@inject('store')
@observer
class FeedbackButtons extends React.Component {
  openFeedback() {
    this.props.store.flags.flags.runtime.feedback = true;
  }

  render() {
    return (
      <div className='export-buttons'>
        <ButtonGroup >
          <Button bsStyle='default' onClick={() => this.openFeedback()}>
            <i className='fa fa-exchange fa-fw' />
            {this.props.store.i18n.buttons.mistake} 
          </Button>
          <a
            href='https://chronist.ru/faq'
            target='_blank'
            rel='noopener noreferrer'
          >
            <Button>
              <i className='fa fa-question fa-fw' />
              {this.props.store.i18n.buttons.faq}
            </Button>
          </a>
        </ButtonGroup>
      </div>
    );
  }
}

export default FeedbackButtons;
