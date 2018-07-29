import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { computed, action } from 'mobx';
import { Tooltip } from '../../components/Input';

@inject('store')
@observer
class FatButton extends React.Component {
  render() {
    return (
      <Tooltip placement='left' content={this.props.text}>
        <button onClick={() => this.props.cb()} type='button'>
          <i className={`lnr ${this.props.icon}`} />
        </button>
      </Tooltip>
    );
  }
}

FatButton.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  cb: PropTypes.func.isRequired
};

@inject('store')
@observer
export default class CollapsedView extends React.Component {
  @computed get tooltips() {
    return this.props.store.i18n.tooltips;
  }

  @computed get alignPanel() {
    return this.props.store.flags.flags.runtime.alignPanel;
  }

  @computed get iconBarAlign() {
    return this.alignPanel === 'left'
      ? 'icon-bar--left icon-bar'
      : 'icon-bar--right icon-bar';
  }

  @computed get isOpen() {
    return this.props.store.flags.flags.runtime.SidePanelIsOpen;
  }

  @computed get currentTab() {
    return this.props.store.flags.flags.runtime.SidePanelTab;
  }

  set isOpen(val) {
    this.props.store.flags.flags.runtime.SidePanelIsOpen = val;
  }

  set currentTab(val) {
    this.props.store.flags.flags.runtime.SidePanelTab = val;
  }

  @action toggle(name) {
    this.isOpen = !(this.currentTab === name && this.isOpen === true);
    this.currentTab = name;
  }

  render() {
    return (
      <div className={this.iconBarAlign}>
        <FatButton text={this.tooltips.settings} icon='lnr-cog' cb={() => this.toggle('settings')} />
        <FatButton text={this.tooltips.layers} icon='lnr-layers' cb={() => this.toggle('layerscontrol')} />

        {(process.env.NODE_ENV !== 'production')
          && <FatButton text={this.tooltips.debug} icon='lnr-bug' cb={() => this.toggle('align')} />
        }
        <h3 className='vertical--logo'>
          { ' ХРОНИСТ ' }
        </h3>
      </div>
    );
  }
}
