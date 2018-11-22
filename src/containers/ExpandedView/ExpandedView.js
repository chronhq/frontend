import React from 'react';
import { inject, observer } from 'mobx-react';
import { computed } from 'mobx';

import Settings from '../ExpandedViewModules/Settings';

import LayerControl from '../ExpandedViewModules/LayerControl';
import AnimationTestTools from '../ExpandedViewModules/AnimationTestTools';

const Empty = () => ('');

@inject('store')
@observer
class ExpandedView extends React.Component {
  @computed get alignPanel() {
    return this.props.store.flags.runtime.get('alignPanel');
  }

  @computed get sidePanelTab() {
    return this.props.store.flags.runtime.get('SidePanelTab');
  }

  @computed get isOpen() {
    return this.props.store.flags.runtime.get('SidePanelIsOpen');
  }

  @computed get sideNavAlign() {
    return this.alignPanel === 'left'
      ? 'sidenav--left sidenav'
      : 'sidenav--right sidenav';
  }

  @computed get component() {
    switch (this.sidePanelTab) {
      case 'settings':
        return Settings;
      case 'align':
        return AnimationTestTools;
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

export default ExpandedView;
