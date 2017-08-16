import React from 'react';
import { OverlayTrigger, Button, Tooltip } from 'react-bootstrap';
// import 'ReturnUiButton.less';
import Timeline from './Timeline';

const tooltip = text => (
  <Tooltip id="tooltip"><strong>{text}</strong></Tooltip>
);

class ReturnUiButton extends React.Component {
  constructor(props) {
    super(props);
  }

  handleToggle() {
    // console.log('');
    this.props.cb(`right`);
  }

  handleNext() {
    console.log('next');
  }

  handlePrevious() {
    console.log('previous');
  }

  render() {
    return (
      <div>
        <div className='icon-bar--small'>
          <OverlayTrigger placement='left' delayHide={0} overlay={tooltip('Вернуть UI')} >
            <Button bsStyle='default' onClick={() => this.handleToggle()}><i className='fa fa-home fa-fw' /> </Button>
          </OverlayTrigger>
          <OverlayTrigger placement='left' delayHide={0} overlay={tooltip('Next')} >
            <Button bsStyle='default' onClick={() => this.handleNext()}><i className='fa fa-angle-up fa-fw' /> </Button>
          </OverlayTrigger>
          <OverlayTrigger placement='left' delayHide={0} overlay={tooltip('Previous')} >
            <Button bsStyle='default' onClick={() => this.handlePrevious()}><i className='fa fa-angle-down fa-fw' /> </Button>
          </OverlayTrigger>
        </div>
        <Timeline />
      </div>
    );
  }
}

class SomeButtons extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Button> ^ </Button>
        <Button> </Button>
      </div>

    );
  }
  // methods
}

// const ReturnUiButton = () => (<div>Shit</div>)

export default ReturnUiButton;
