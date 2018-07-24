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
      <Tooltip
        content={this.props.text}
        placement={(this.props.store.flags.flags.runtime.alignPanel === 'left') ? 'right' : 'left'}
      >
        <button onClick={() => this.props.cb()}>
          <i className={`lnr ${this.props.icon}`} />
          {' '}
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


// const FatButton = ({ text, cb, icon }) => (
//   <Tooltip content={text} placement={this.props.store.flags.flags.runtime.alignPanel}>
//     <button onClick={() => cb()}><i className={`lnr ${icon}`} /> </button>
//   </Tooltip>
// );

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

  @action openIntro() {
    this.props.store.flags.flags.runtime.intro = true;
  }

  @action toggle(name) {
    this.isOpen = !(this.currentTab === name && this.isOpen === true);
    this.currentTab = name;
  }

  render() {
    return (
      <div className={this.iconBarAlign}>
        <FatButton text={this.tooltips.intro} icon='lnr-home' cb={() => this.openIntro()} />
        <FatButton text={this.tooltips.search} icon='lnr-magnifier' cb={() => this.toggle('search')} />
        <FatButton text={this.tooltips.feed} icon='lnr-list' cb={() => this.toggle('feed')} />
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
