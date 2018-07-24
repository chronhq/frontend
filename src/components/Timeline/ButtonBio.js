import React from 'react';
import { inject, observer } from 'mobx-react';
import { Tooltip } from '../Input';

// #TODO localization tooltip

@inject('store')
@observer
class BioButton extends React.Component {
  bioToggle() {
    const isBioOn = this.props.store.flags.flags.runtime.BioIsOpen;
    this.props.store.flags.set({ runtime: { BioIsOpen: !isBioOn } });
  }

  render() {
    return (
      <Tooltip content='Информация об авторе' placement='bottom'>
        <button onClick={() => this.bioToggle()} type='button'>
          <span className='lnr lnr-user' />
        </button>
      </Tooltip>
    );
  }
}

export default BioButton;
