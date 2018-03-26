import React from 'react';
import { OverlayTrigger, Tooltip, ButtonToolbar, Button } from 'react-bootstrap';
import { inject, observer } from 'mobx-react';
import { computed, action } from 'mobx';

const tooltip = text => (
  <Tooltip id="tooltip"><strong>{text}</strong></Tooltip>
);

const FatButton = ({ text, cb, icon }) => (
  <OverlayTrigger placement='left' delayHide={0} overlay={tooltip(text)} >
    <Button bsStyle='default' onClick={() => cb()}><i className={`lnr ${icon}`} /> </Button>
  </OverlayTrigger>
);

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
      <div className={this.iconBarAlign} >
        <ButtonToolbar>
          <FatButton text={this.tooltips.intro} icon='lnr-home' cb={() => this.openIntro()} />
          <FatButton text={this.tooltips.search} icon='lnr-magnifier' cb={() => this.toggle('search')} />
          <FatButton text={this.tooltips.feed} icon='lnr-list' cb={() => this.toggle('feed')} />
          <FatButton text={this.tooltips.settings} icon='lnr-layers' cb={() => this.toggle('settings')} />

          {(process.env.NODE_ENV !== 'production') &&
            <FatButton text={this.tooltips.debug} icon='lnr-cog' cb={() => this.toggle('align')} />
          }
        </ButtonToolbar>
        <h3 className='vertical--logo'> ХРОНИСТ </h3>
      </div>
    );
  }
}
