import React from 'react';
import { inject, observer } from 'mobx-react';
import { computed, action } from 'mobx';

import VerticalLogo from '../../components/Logos/VerticalLogo';
import FatButton from '../../components/FatButton/FatButton';

@inject('store')
@observer
class CollapsedView extends React.Component {
  @computed get tooltips() {
    return this.props.store.i18n.data.tooltips;
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
    // this.isOpen = !(this.currentTab === name && this.isOpen === true);
    if (this.currentTab === name) {
      this.currentTab = '';
      this.isOpen = false;
    } else {
      this.currentTab = name;
      this.isOpen = true;
    }
  }

  @action handleReturn() {
    this.props.store.effects.course.enableCourseSelection();
    this.props.history.push('/');
  }

  render() {
    return (
      <div className={this.iconBarAlign}>
        <FatButton
          text={this.tooltips.back}
          icon='lnr-home'
          cb={() => this.handleReturn()}
          name='home'
          disabled={false}
        />
        <FatButton
          text={this.tooltips.settings}
          icon='lnr-cog'
          cb={() => this.toggle('settings')}
          name='settings'
          active={this.props.store.flags.flags.runtime.SidePanelTab === 'settings'}
          disabled={false}
        />
        <FatButton
          text={this.tooltips.layers}
          icon='lnr-layers'
          cb={() => this.toggle('layerscontrol')}
          name='layerscontrol'
          active={this.props.store.flags.flags.runtime.SidePanelTab === 'layerscontrol'}
          disabled={false}
        />
        <FatButton
          text={this.tooltips.soon}
          icon='lnr-magnifier'
          // cb={() => this.toggle('search')}
          cb={() => console.log('Option not available yet')}
          name='search'
          active={this.props.store.flags.flags.runtime.SidePanelTab === 'search'}
          disabled
        />
        <FatButton
          text={this.tooltips.soon}
          icon='lnr-pencil'
          cb={() => console.log('Option not available yet')}
          // cb={() => this.toggle('edit')}
          name='search'
          active={this.props.store.flags.flags.runtime.SidePanelTab === 'search'}
          disabled
        />
        <FatButton
          text={this.tooltips.soon}
          icon='lnr-upload'
          cb={() => console.log('Option not available yet')}
          // cb={() => this.toggle('export')}
          name='export'
          active={this.props.store.flags.flags.runtime.SidePanelTab === 'export'}
          disabled
        />
        {(process.env.NODE_ENV !== 'production')
          && (
            <FatButton
              text={this.tooltips.debug}
              icon='lnr-bug'
              cb={() => this.toggle('align')}
              name='align'
              active={this.props.store.flags.flags.runtime.SidePanelTab === 'align'}
              disabled={false}
            />
          )
        }
        <VerticalLogo logo={this.props.store.i18n.logo} />
      </div>
    );
  }
}

export default CollapsedView;
