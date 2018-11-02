import React from 'react';
import { observer, inject } from 'mobx-react';
import { computed, action } from 'mobx';
import { Tooltip } from '../Input';


// will be removed and replaced with FatButton Component
@inject('store')
@observer
class ButtonMenu extends React.Component {
  @computed get tooltips() {
    return this.props.store.i18n.tooltips;
  }

  @computed get tip() {
    return this.props.store.flags.flags.runtime.TimelineIsMinified
      ? this.tooltips.expand
      : this.tooltips.collapse;
  }

  @computed get isMin() {
    return this.props.store.flags.flags.runtime.TimelineIsMinified;
  }

  @action toggleTimepanel() {
    this.props.store.flags.flags.runtime.TimelineIsMinified = !this.isMin;
  }

  render() {
    return (
      <Tooltip content={this.tip} placement='bottom'>
        <button onClick={() => this.toggleTimepanel()} type='button'>
          <span className='lnr lnr-menu' />
        </button>
      </Tooltip>
    );
  }
}

export default ButtonMenu;
