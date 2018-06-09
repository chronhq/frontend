import React from 'react';
import { inject, observer } from 'mobx-react';
import { computed } from 'mobx';

import Settings from '../Settings';
import Feed from '../Feed';
import ControlButtons from '../../components/TimePanel/ControlButtons';
import LayerControl from './LayerControl';
import AlignToggler from '../../components/AlignToggler';
import SearchPanel from './SearchPanel';

const AlignDebug = () => (
  <div>
    <AlignToggler />
    <ControlButtons />
  </div>
);

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
      case 'search':
        return SearchPanel;
      case 'feed':
        return Feed;
      case 'settings':
        return Settings;
      case 'align':
        return AlignDebug;
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
      <div className={this.sideNavAlign} >
        <Component />
      </div>
    );
  }
}
