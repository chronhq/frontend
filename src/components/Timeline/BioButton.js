import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { inject, observer } from 'mobx-react';

const tooltip = text => (
  <Tooltip id='tooltip'><strong>{text}</strong></Tooltip>
);

@inject('store')
@observer
class BioButton extends React.Component {
  bioToggle() {
    const isBioOn = this.props.store.flags.flags.runtime.BioIsOpen;
    this.props.store.flags.set({ runtime: { BioIsOpen: !isBioOn } });
  }

  render() {
    return (
      <OverlayTrigger placement='bottom' delayShow={150} delayHide={5} overlay={tooltip('Информация об авторе')} >
        <button onClick={() => this.bioToggle()}>
          <i className='fa fa-user-circle' aria-hidden='true' />
        </button>
      </OverlayTrigger>
    );
  }
}

export default BioButton;
