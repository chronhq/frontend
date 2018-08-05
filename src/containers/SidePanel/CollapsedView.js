import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { computed, action } from 'mobx';
import { Tooltip } from '../../components/Input';
import ButtonReturn from '../../components/Timeline/ButtonReturn';

import logoRu from '../../img/name_logo.svg';
import logoEn from '../../img/name_logo_eng.svg';

@inject('store')
@observer
class FatButton extends React.Component {
  get classes() {
    let classes = [];
    if (this.props.name === this.props.store.flags.flags.runtime.SidePanelTab) {
      classes.push('active');
    }
    if (this.props.disabled === true) {
      classes.push('disabled');
    }
    return classes.join(' ');
  }

  render() {
    return (
      <Tooltip placement='left' content={this.props.text}>
        <button
          onClick={() => this.props.cb()}
          className={this.classes}
          type='button'
          // disabled={this.props.disabled}
        >
          <i className={`lnr ${this.props.icon}`} />
        </button>
      </Tooltip>
    );
  }
}

@inject('store')
@observer
class VerticalLogo extends React.Component {
  get logo() {
    switch (this.props.store.i18n.lng) {
      case 'ru':
        return logoRu;
      default:
        return logoEn;
    }
  }

  render() {
    return (
      <div className='vertical--logo'>
        <img src={this.logo} alt='logo' />
      </div>
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
        <ButtonReturn />
        <FatButton
          text={this.tooltips.settings}
          icon='lnr-cog'
          cb={() => this.toggle('settings')}
          name='settings'
          disabled={false}
        />
        <FatButton
          text={this.tooltips.layers}
          icon='lnr-layers'
          cb={() => this.toggle('layerscontrol')}
          name='layerscontrol'
          disabled={false}
        />
        <FatButton
          text={this.tooltips.soon}
          icon='lnr-magnifier'
          // cb={() => this.toggle('search')}
          cb={() => console.log('Option not available yet')}
          name='search'
          disabled={true}
        />
        <FatButton
          text={this.tooltips.soon}
          icon='lnr-pencil'
          cb={() => console.log('Option not available yet')}
          // cb={() => this.toggle('edit')}
          name='search'
          disabled={true}
        />
        <FatButton
          text={this.tooltips.soon}
          icon='lnr-upload'
          cb={() => console.log('Option not available yet')}
          // cb={() => this.toggle('export')}
          name='export'
          disabled={true}
        />
        {(process.env.NODE_ENV !== 'production')
          && <FatButton
            text={this.tooltips.debug}
            icon='lnr-bug'
            cb={() => this.toggle('align')}
            name='align'
            disabled={false}
          />
        }
        <VerticalLogo />
      </div>
    );
  }
}
