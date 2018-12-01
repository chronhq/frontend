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
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { computed, action } from 'mobx';

import FatButton from '../../components/FatButton/FatButton';

import './TimelineButtons.less';

@inject('store')
@observer
class TimelineButtons extends React.Component {
  @computed get tooltips() {
    return this.props.store.i18n.data.tooltips;
  }

  @computed get isMin() {
    return this.props.store.flags.runtime.get('TimelineIsMinified');
  }

  @computed get tip() {
    return this.isMin
      ? this.tooltips.expand
      : this.tooltips.collapse;
  }

  @action handleReturn() {
    this.props.store.courseSelection.cleanup();
    this.props.history.push('/');
  }

  toggleTimepanel() {
    this.props.store.flags.runtime.toggle('TimelineIsMinified');
  }

  bioToggle() {
    this.props.store.flags.runtime.toggle('BioIsOpen');
  }

  // #TODO localization tooltip for BioButton
  render() {
    return (
      <div className='timeline__control control__home'>
        {this.isMin ? null : (
          <FatButton
            text={this.tooltips.back}
            icon='lnr-home'
            cb={() => this.handleReturn()}
            name='home'
            disabled={false}
          />
        )}
        {this.isMin ? null : (
          <FatButton
            text='Информация об авторе'
            icon='lnr-user'
            cb={() => this.bioToggle()}
            name='bio'
            disabled={false}
          />
        )}
        <FatButton
          text={this.tip}
          icon='lnr-menu'
          cb={() => this.toggleTimepanel()}
          name='hamburger'
          disabled={false}
        />
      </div>
    );
  }
}

export default withRouter(TimelineButtons);
