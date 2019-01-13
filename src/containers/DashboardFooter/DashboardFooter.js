/*
 * Chron.
 * Copyright (c) 2019 Alisa Belyaeva, Ata Ali Kilicli, Amaury Martiny,
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
import { action, computed } from 'mobx';

import './DashboardFooter.less';

@inject('store')
@observer
class DashboardFooter extends React.Component {
  @action openFeedback() {
    this.props.store.feedback.year = this.props.store.year.now;
    this.props.store.flags.runtime.set('feedback', true);
  }

  @computed get dashboard() {
    return this.props.store.i18n.data.dashboard;
  }

  render() {
    return (
      <div className='dashboard-footer'>
        <button
          type='button'
          onClick={() => console.log('news not available')}
        >
          {this.dashboard.news}
        </button>
        <a href='https://github.com/chronhq/frontend' target='_blank' rel='noopener noreferrer'>
          {this.dashboard.about}
        </a>
        <button
          type='button'
          onClick={() => console.log('show license')}
        >
          {this.dashboard.license}
        </button>
        <button
          type='button'
          onClick={() => this.openFeedback()}
        >
          {this.dashboard.report}
        </button>
      </div>
    );
  }
}

export default DashboardFooter;
