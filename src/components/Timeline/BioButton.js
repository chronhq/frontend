import React from 'react';
// import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { inject, observer } from 'mobx-react';
import { Tooltip } from '../Input';

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
      <Tooltip content={'Информация об авторе'} >
        <button onClick={() => this.bioToggle()}>
          <i className='lnr lnr-persona' aria-hidden='true' />
        </button>
      </Tooltip>
    );
  }
}

export default BioButton;
