import React from 'react';
import { inject, observer } from 'mobx-react';
import { computed } from 'mobx';

import Settings from '../Settings';
import Feed from '../Feed';
import ControlButtons from '../../components/TimePanel/ControlButtons';
import AlignToggler from '../../components/AlignToggler';

const SearchPanel = () => (
  <div className='search'>
    <h3> Поиск </h3>
    <div className="row">
      <div className="col-md-12"><input type="text" disabled className="search" placeholder="Поиск" /></div>
    </div>
    <p> В скором времени в этой вкладке появится возможность
      быстрого поиска по изобретениям и персонам.
    </p>
  </div>
);

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
