import React from 'react';
import { inject, observer } from 'mobx-react';
import { computed } from 'mobx';

import Settings from '../Settings';

import LayerControl from './LayerControl';
import Debug from './Debug';

const Empty = () => ('');

@inject('store')
@observer
export default class ExpandedView extends React.Component {
  @computed get alignPanel() {
    return this.props.store.flags.flags.runtime.alignPanel;
  }

  @computed get flags() {
    return this.props.store.flags.flags.runtime;
  }

  @computed get isOpen() {
    return this.props.store.flags.flags.runtime.SidePanelIsOpen;
  }

  @computed get sideNavAlign() {
    return this.alignPanel === 'left'
      ? 'sidenav--left sidenav'
      : 'sidenav--right sidenav';
  }

  @computed get component() {
    switch (this.flags.SidePanelTab) {
      case 'settings':
        return Settings;
      case 'align':
        return Debug;
      case 'layerscontrol':
        return LayerControl;
      default:
        return Empty;
    }
  }

  render() {
    if (this.isOpen === false) return '';

    const Component = this.component;
    return (
      <div className={this.sideNavAlign}>
        <Component />
      </div>
    );
  }
}
