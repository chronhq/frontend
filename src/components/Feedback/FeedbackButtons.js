import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup } from 'react-bootstrap';

class FeedbackButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFeedback: true
    };
  }

  componentDidMount() {
    console.log(...this.props);
  }

  toggle() {
    this.props.onClose();
  }

  render() {
    return (
      <div className='export-buttons'>
        <ButtonGroup >
          <Button bsStyle='default' onClick={() => this.toggle()}><i className='fa fa-exchange fa-fw' /> Сообщить об ошибке </Button>
          <a
            href='https://chronist.ru/faq'
            target='_blank'
            rel='noopener noreferrer'
          >
            <Button><i className='fa fa-question fa-fw' /> FAQ </Button>
          </a>
        </ButtonGroup>
      </div>
    );
  }
}

FeedbackButtons.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default FeedbackButtons;
