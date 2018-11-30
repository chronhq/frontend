/*
 * Chron.
 * Copyright (c) 2018 Alisa Belyaeva, Ata Ali Kilicli, Amaury Martiny,
 * Daniil Mordasov, Liam O’Flynn, Mikhail Orlov.
 * -----
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * -----
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * -----
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
import React from 'react';
import { inject, observer } from 'mobx-react';
import { computed, action } from 'mobx';
import { withRouter } from 'react-router-dom';

import VerticalLogo from '../../components/Logos/VerticalLogo';
import FatButton from '../../components/FatButton/FatButton';

@inject('store')
@observer
class CollapsedView extends React.Component {
  @computed get tooltips() {
    return this.props.store.i18n.data.tooltips;
  }

  @computed get alignPanel() {
    return this.props.store.flags.runtime.get('alignPanel');
  }

  @computed get iconBarAlign() {
    return this.alignPanel === 'left'
      ? 'icon-bar--left icon-bar'
      : 'icon-bar--right icon-bar';
  }

  @computed get isOpen() {
    return this.props.store.flags.runtime.get('SidePanelIsOpen');
  }

  @computed get currentTab() {
    return this.props.store.flags.runtime.get('SidePanelTab');
  }

  set isOpen(val) {
    this.props.store.flags.runtime.set('SidePanelIsOpen', val);
  }

  set currentTab(val) {
    this.props.store.flags.runtime.set('SidePanelTab', val);
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
    this.props.store.courseSelection.cleanup();
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
          active={this.currentTab === 'settings'}
          disabled={false}
        />
        <FatButton
          text={this.tooltips.layers}
          icon='lnr-layers'
          cb={() => this.toggle('layerscontrol')}
          name='layerscontrol'
          active={this.currentTab === 'layerscontrol'}
          disabled={false}
        />
        <FatButton
          text={this.tooltips.soon}
          icon='lnr-magnifier'
          // cb={() => this.toggle('search')}
          cb={() => console.log('Option not available yet')}
          name='search'
          active={this.currentTab === 'search'}
          disabled
        />
        <FatButton
          text={this.tooltips.soon}
          icon='lnr-pencil'
          cb={() => console.log('Option not available yet')}
          // cb={() => this.toggle('edit')}
          name='search'
          active={this.currentTab === 'search'}
          disabled
        />
        <FatButton
          text={this.tooltips.soon}
          icon='lnr-upload'
          cb={() => console.log('Option not available yet')}
          // cb={() => this.toggle('export')}
          name='export'
          active={this.currentTab === 'export'}
          disabled
        />
        {(process.env.NODE_ENV !== 'production')
          && (
            <FatButton
              text={this.tooltips.debug}
              icon='lnr-bug'
              cb={() => this.toggle('align')}
              name='align'
              active={this.currentTab === 'align'}
              disabled={false}
            />
          )
        }
        <VerticalLogo logo={this.props.store.i18n.logo} />
      </div>
    );
  }
}

export default withRouter(CollapsedView);
